import { randomUUID } from "node:crypto";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { stringify } from "yaml";
import { afterEach, describe, expect, it, vi } from "vitest";

import { saveCourseExtension, type CourseExtension } from "../src/courses/extensions.js";
import { parseFrontmatter, parseYaml } from "../src/courses/parse.js";
import { courseSchema, syllabusFrontmatterSchema } from "../src/courses/schemas.js";
import type { LoadedCourse } from "../src/courses/types.js";
import { validateRepository } from "../src/courses/validate-repository.js";
import { runGenerationBatch } from "../src/generation/run-batch.js";
import { planScheduledTasks } from "../src/generation/selection.js";
import { generateCourseExtension, selectNewGames, type ExtensionInput } from "../src/planning/continue-card-games.js";
import { completeLessonMarkdown } from "./lesson-draft-fixture.js";

const roots: string[] = [];

async function fixture(): Promise<string> {
  const root = await mkdtemp(path.join(tmpdir(), "rss-open-course-"));
  roots.push(root);
  await writeFile(path.join(root, "site.yml"), await readFile("site.yml"));
  await addCourse(root, "juegos-naipes", true);
  return root;
}

async function addCourse(root: string, slug: string, open: boolean): Promise<void> {
  const directory = path.join(root, "courses", slug);
  await mkdir(path.join(directory, "lessons"), { recursive: true });
  const parsed = parseYaml(await readFile("courses/juegos-naipes/course.yml", "utf8"), "fixture");
  const config = courseSchema.parse(parsed.value);
  config.slug = slug;
  config.id = randomUUID();
  if (open && config.continuation !== undefined) {
    config.continuation.lowWaterMark = 1;
    config.continuation.batchSize = 2;
  } else {
    delete config.continuation;
  }
  await writeFile(path.join(directory, "course.yml"), stringify(config));
  const syllabus = parseFrontmatter(await readFile("courses/juegos-naipes/syllabus.md", "utf8"), "fixture");
  const data = syllabusFrontmatterSchema.parse(syllabus.value);
  data.steps = data.steps.slice(0, 1);
  await writeFile(path.join(directory, "syllabus.md"), `---\n${stringify(data)}---\n# Prueba\n`);
  await writeFile(path.join(directory, "progress.json"), await readFile("courses/juegos-naipes/progress.json"));
}

async function repository(root: string) {
  const result = await validateRepository(root);
  if (!result.ok) throw new Error(JSON.stringify(result.issues));
  return result.repository;
}

function courseAt(courses: LoadedCourse[]): LoadedCourse {
  const course = courses.find((item) => item.config.slug === "juegos-naipes");
  if (course === undefined) throw new Error("Falta el curso de prueba");
  return course;
}

function batch(course: LoadedCourse, from = 1): CourseExtension {
  const last = course.syllabus.frontmatter.steps.at(-1);
  if (last === undefined) throw new Error("Falta el paso inicial");
  return {
    schemaVersion: 1,
    afterStepId: last.id,
    generatedAt: "2026-11-08T03:00:00Z",
    steps: [from, from + 1].map((number) => ({
      id: `game-${number}`, unitId: "mundo", topicId: `game-${number}`, title: `Juego ${number}`,
      objective: "Resolver una partida del juego de prueba", brief: "Reglas documentadas de prueba.",
      game: { key: `game-${number}`, aliases: [`Juego ${number}`], sources: [`https://example.test/rules/${number}`] },
    })),
    research: { text: "Investigación de prueba", sources: [{ title: "Reglas", url: "https://example.test/rules" }] },
  };
}

const draft = async () => ({ title: "Lección de prueba", summary: "Resumen", markdown: completeLessonMarkdown().replace("\n[[FIN_LECCION]]", "") });
const unavailable = async (): Promise<CourseExtension> => { throw new Error("Cuota temporalmente agotada"); };

afterEach(async () => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  await Promise.all(roots.splice(0).map((root) => rm(root, { recursive: true, force: true })));
});

describe("curso abierto y reserva durable", () => {
  it("no publica antes del alta y continúa a través de varios lotes sin alterar el syllabus inicial", async () => {
    const root = await fixture();
    const initial = await repository(root);
    const seed = await readFile(path.join(root, "courses/juegos-naipes/syllabus.md"), "utf8");
    expect(planScheduledTasks(initial, new Date("2026-11-08T02:59:59Z"))).toHaveLength(0);
    let number = 1;
    const extension = vi.fn(async ({ course }: ExtensionInput) => {
      const result = batch(course, number);
      number += 2;
      return result;
    });
    const result = await runGenerationBatch({ root, repository: initial, now: new Date("2026-11-11T03:00:00Z"),
      request: { kind: "scheduled" }, apiKey: "test", generateDraft: draft, extendCourse: extension });
    expect(result).toMatchObject({ saved: 4, failures: [], pending: [] });
    expect(extension).toHaveBeenCalledTimes(2);
    const final = courseAt((await repository(root)).courses);
    expect(final.lessons.map((lesson) => lesson.frontmatter.stepId)).toEqual(["brisca", "game-1", "game-2", "game-3"]);
    expect(final.progress.cursor.nextStepId).toBe("game-4");
    expect(await readFile(path.join(root, "courses/juegos-naipes/syllabus.md"), "utf8")).toBe(seed);
  });

  it("usa la reserva si falla ampliar y reconstruye un cursor nulo tras guardar un lote completo", async () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    const root = await fixture();
    const first = await runGenerationBatch({ root, repository: await repository(root), now: new Date("2026-11-08T03:00:00Z"),
      request: { kind: "scheduled" }, apiKey: "test", generateDraft: draft, extendCourse: unavailable });
    expect(first.saved).toBe(1);
    const exhausted = courseAt((await repository(root)).courses);
    expect(exhausted.progress.cursor.nextStepId).toBeNull();
    expect(planScheduledTasks(await repository(root), new Date("2026-11-09T03:00:00Z"))).toHaveLength(1);
    await saveCourseExtension(root, exhausted, batch(exhausted));
    const reopened = courseAt((await repository(root)).courses);
    expect(reopened.progress.cursor.nextStepId).toBe("game-1");
    expect(JSON.parse(await readFile(path.join(exhausted.directory, "progress.json"), "utf8")).cursor.nextStepId).toBeNull();
    await expect(saveCourseExtension(root, exhausted, batch(exhausted))).rejects.toThrow();
    expect(courseAt((await repository(root)).courses).syllabus.frontmatter.steps).toHaveLength(3);
  });

  it("deja una entrega pendiente sin reserva, publica otros cursos y recupera después", async () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    const root = await fixture();
    await runGenerationBatch({ root, repository: await repository(root), now: new Date("2026-11-08T03:00:00Z"),
      request: { kind: "scheduled" }, apiKey: "test", generateDraft: draft, extendCourse: unavailable });
    await addCourse(root, "otro", false);
    const failed = await runGenerationBatch({ root, repository: await repository(root), now: new Date("2026-11-09T03:00:00Z"),
      request: { kind: "scheduled" }, apiKey: "test", generateDraft: draft, extendCourse: unavailable });
    expect(failed.saved).toBe(1);
    expect(failed.failures).toHaveLength(1);
    expect(failed.pending).toEqual([{ kind: "scheduled", courseSlug: "juegos-naipes", generationDate: "2026-11-09" }]);
    const recovered = await runGenerationBatch({ root, repository: await repository(root), now: new Date("2026-11-09T03:00:00Z"),
      request: { kind: "scheduled" }, apiKey: "test", generateDraft: draft, extendCourse: async ({ course }) => batch(course) });
    expect(recovered).toMatchObject({ saved: 1, failures: [], pending: [] });
    expect(courseAt((await repository(root)).courses).lessons.at(-1)?.frontmatter.generationDate).toBe("2026-11-09");
  });

  it("no investiga ni genera para un curso pausado", async () => {
    const root = await fixture();
    const loaded = await repository(root);
    courseAt(loaded.courses).config.status = "paused";
    const extension = vi.fn(unavailable);
    const generate = vi.fn(draft);
    const result = await runGenerationBatch({ root, repository: loaded, now: new Date("2026-11-09T03:00:00Z"),
      request: { kind: "scheduled" }, apiKey: "test", generateDraft: generate, extendCourse: extension });
    expect(result.saved).toBe(0);
    expect(extension).not.toHaveBeenCalled();
    expect(generate).not.toHaveBeenCalled();
  });
});

const candidate = {
  key: "euchre", title: "Euchre", aliases: ["Euchre"], objective: "Jugar una partida de Euchre por parejas",
  brief: "Variante tradicional para cuatro con reglas de reparto, triunfo, turnos y puntuación, siguiendo una fuente concreta. ".repeat(3),
  category: "trick-taking" as const, traditional: true as const, minorVariant: false as const, sourceIndexes: [0],
};
const sources = [{ title: "Euchre", url: "https://www.pagat.com/euchre/euchre.html" }];

describe("investigación y control de identidades", () => {
  it("rechaza alias antiguos, exclusiones y fuentes repetidas usando todo el historial", async () => {
    const root = await fixture();
    const course = courseAt((await repository(root)).courses);
    for (let index = 1; index < 90; index += 2) course.syllabus.frontmatter.steps.push(...batch(course, index).steps);
    const selected = selectNewGames(course, [
      { ...candidate, key: "otro-nombre", aliases: ["BRISCÁ"] },
      { ...candidate, key: "poker-chino", title: "Póquer chino" },
      { ...candidate, key: "nombre-falso", aliases: ["Nombre falso"], sourceIndexes: [1] },
      candidate,
      { ...candidate, key: "segundo-euchre", aliases: ["Euchre"] },
    ], [...sources, { title: "Brisca", url: "https://www.nhfournier.es/como-jugar/brisca/#reglas" }]);
    expect(selected.map((step) => step.id)).toEqual(["euchre"]);
  });

  it("separa búsqueda de extracción JSON y conserva las fuentes reales de grounding", async () => {
    const root = await fixture();
    const loaded = await repository(root);
    const bodies: unknown[] = [];
    const fetchMock = vi.fn(async (_url: string, init: RequestInit) => {
      bodies.push(JSON.parse(String(init.body)));
      return new Response(JSON.stringify({ candidates: [{ finishReason: "STOP",
        content: { parts: [{ text: bodies.length === 1 ? "Investigación fundamentada del Euchre." : JSON.stringify({ games: [candidate] }) }] },
        ...(bodies.length === 1 ? { groundingMetadata: { groundingChunks: [{ web: { title: "Euchre", uri: sources[0]?.url } }] } } : {}),
      }] }), { status: 200 });
    });
    vi.stubGlobal("fetch", fetchMock);
    const extension = await generateCourseExtension({ course: courseAt(loaded.courses), site: loaded.site, apiKey: "test" });
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(bodies[0]).toMatchObject({ tools: [{ google_search: {} }] });
    expect(bodies[0]).not.toHaveProperty("generationConfig.responseMimeType");
    expect(bodies[1]).toMatchObject({ generationConfig: { responseMimeType: "application/json" } });
    expect(bodies[1]).not.toHaveProperty("tools");
    expect(extension.steps[0]?.game?.sources).toEqual([sources[0]?.url]);
    expect(extension.research.sources).toEqual(sources);
  });

  it("rechaza investigación sin fuentes y no sustituye esas fuentes por URLs inventadas", async () => {
    const root = await fixture();
    const loaded = await repository(root);
    const fetchMock = vi.fn(async () => new Response(JSON.stringify({ candidates: [{ finishReason: "STOP",
      content: { parts: [{ text: "Texto sin grounding" }] },
    }] }), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    await expect(generateCourseExtension({ course: courseAt(loaded.courses), site: loaded.site, apiKey: "test" })).rejects.toThrow("fuentes verificables");
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(() => selectNewGames(courseAt(loaded.courses), [{ ...candidate, sourceIndexes: [99] }], sources)).toThrow("juegos nuevos");
  });
});
