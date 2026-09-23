import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import { afterEach, describe, expect, test } from "vitest";

import { validateRepository } from "../src/courses/validate-repository.js";
import { buildLessonPrompt, LESSON_PROMPT_VERSION } from "../src/generation/prompt.js";
import { requestFromEnvironment, selectCourses, type GenerationRequest } from "../src/generation/selection.js";
import { writePreparedLesson } from "../src/generation/write-lesson.js";
import { selectNextLesson } from "../src/planning/next-lesson.js";
import { renderFeed } from "../src/publishing/site.js";

const temporaryDirectories: string[] = [];

async function createRoot(): Promise<string> {
  const root = await mkdtemp(path.join(tmpdir(), "rss-lecciones-"));
  temporaryDirectories.push(root);
  await mkdir(path.join(root, "courses"));
  await writeFile(
    path.join(root, "site.yml"),
    `schemaVersion: 1
site:
  id: "57f6f640-0666-4d6f-a951-9b2316294c2a"
  title: Lecciones RSS
  description: Cursos de prueba
  baseUrl: "https://example.test/rss-lecciones/"
  language: es-AR
generation:
  model: test-model
  timeoutSeconds: 120
  maxOutputTokens: 6000
  maxInputBytes: 100000
  maxLessonsPerRun: 3
`,
  );
  return root;
}

type CourseFixtureOptions = {
  id?: string;
  lesson?: boolean;
  cursorNextStepId?: string | null;
  status?: "active" | "paused";
  schedule?: "manual" | "weekdays";
};

async function createCourse(
  root: string,
  slug: string,
  options: CourseFixtureOptions = {},
): Promise<void> {
  const directory = path.join(root, "courses", slug);
  await mkdir(path.join(directory, "lessons"), { recursive: true });
  await writeFile(
    path.join(directory, "course.yml"),
    `schemaVersion: 1
id: "${options.id ?? crypto.randomUUID()}"
slug: ${slug}
title: Curso ${slug}
description: Descripción de prueba
status: ${options.status ?? "paused"}
language: es-AR
timezone: America/Buenos_Aires
schedule:
  type: ${options.schedule ?? "manual"}
feed: true
teaching:
  audience: Alumno de prueba
  instructions: Explicar con claridad y ejemplos concretos.
`,
  );
  await writeFile(
    path.join(directory, "syllabus.md"),
    `---
schemaVersion: 1
steps:
  - id: introduccion
    unitId: fundamentos
    topicId: inicio
    title: Introducción
    objective: Comprender el punto de partida
    brief: Explicar el concepto inicial
  - id: profundizacion
    unitId: fundamentos
    topicId: detalle
    title: Profundización
    objective: Aplicar el concepto inicial
    brief: Desarrollar un ejemplo práctico
  - id: practica
    unitId: fundamentos
    topicId: ejercicio
    title: Práctica
    objective: Ejercitar lo aprendido
    brief: Resolver un ejercicio
  - id: repaso
    unitId: fundamentos
    topicId: cierre
    title: Repaso
    objective: Integrar lo aprendido
    brief: Resumir el recorrido
---
# Recorrido

Temario de prueba.
`,
  );

  const hasLesson = options.lesson ?? false;
  const lessonId = "e3f8a6d1-5972-443c-bc15-c27c2c134c96";
  const defaultNextStep = hasLesson ? "profundizacion" : "introduccion";
  await writeFile(
    path.join(directory, "progress.json"),
    `${JSON.stringify({
      schemaVersion: 1,
      startStepId: "introduccion",
      learnerContext: "Contexto de prueba",
      cursor: {
        lastLessonId: hasLesson ? lessonId : null,
        nextStepId: options.cursorNextStepId === undefined
          ? defaultNextStep
          : options.cursorNextStepId,
      },
    }, null, 2)}\n`,
  );

  if (hasLesson) {
    await writeFile(
      path.join(directory, "lessons", "001-introduccion.md"),
      `---
schemaVersion: 1
id: "${lessonId}"
sequence: 1
course: ${slug}
stepId: introduccion
title: Primera lección
publishedAt: "2026-09-19T12:00:00Z"
generationDate: "2026-09-19"
summary: Resumen de la primera lección
generation:
  model: test-model
  promptVersion: "1"
  contextHash: "${"a".repeat(64)}"
---
# Primera lección

Contenido de prueba.
`,
    );
  }
}

afterEach(async () => {
  await Promise.all(
    temporaryDirectories.splice(0).map((directory) =>
      rm(directory, { recursive: true, force: true })
    ),
  );
});

async function generateFixtureLesson(
  root: string,
  request: GenerationRequest,
  now: Date,
): Promise<number> {
  const result = await validateRepository(root);
  expect(result.ok).toBe(true);
  if (!result.ok) return 0;
  const selected = selectCourses(result.repository, now, request);
  for (const course of selected) {
    await writePreparedLesson(result.repository.site, {
      course,
      draft: { title: "Lección de prueba", summary: "Resumen de prueba", markdown: "# Contenido\n\nTexto de prueba." },
      prompt: "Contexto de prueba",
      generationDate: "2026-09-23",
      publishedAt: now.toISOString(),
      ...(request.kind === "extra" ? { extraRequestId: request.requestId } : {}),
    });
  }
  return selected.length;
}

describe("lecciones extras a pedido", () => {
  const now = new Date("2026-09-23T12:00:00.000Z");

  test("sólo workflow_dispatch activa el modo extra y exige identificador de run", async () => {
    expect(requestFromEnvironment({ GITHUB_EVENT_NAME: "schedule", EXTRA_COURSE: "fullstack" }))
      .toEqual({ kind: "scheduled" });
    const root = await createRoot();
    await createCourse(root, "fullstack", { status: "active" });
    const result = await validateRepository(root);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    const request = requestFromEnvironment({ GITHUB_EVENT_NAME: "workflow_dispatch", EXTRA_COURSE: "fullstack" });
    expect(() => selectCourses(result.repository, now, request)).toThrow("GITHUB_RUN_ID válido");
  });

  test("dos pedidos nuevos avanzan dos pasos el mismo día y un rerun no avanza", async () => {
    const root = await createRoot();
    await createCourse(root, "fullstack", { status: "active", schedule: "weekdays" });
    expect(await generateFixtureLesson(root, { kind: "scheduled" }, now)).toBe(1);
    expect(await generateFixtureLesson(root, { kind: "extra", courseSlug: "fullstack", requestId: "100" }, now)).toBe(1);
    expect(await generateFixtureLesson(root, { kind: "extra", courseSlug: "fullstack", requestId: "100" }, now)).toBe(0);
    expect(await generateFixtureLesson(root, { kind: "extra", courseSlug: "fullstack", requestId: "101" }, now)).toBe(1);
    expect(await generateFixtureLesson(root, { kind: "scheduled" }, now)).toBe(0);

    const result = await validateRepository(root);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    const course = result.repository.courses[0]!;
    expect(course.lessons.map((lesson) => lesson.frontmatter.stepId)).toEqual([
      "introduccion", "profundizacion", "practica",
    ]);
    expect(course.lessons.map((lesson) => lesson.frontmatter.generation.requestId)).toEqual([
      undefined, "100", "101",
    ]);
    expect(course.lessons.every((lesson) => lesson.frontmatter.generation.promptVersion === "v2")).toBe(true);
    expect(course.progress.cursor.nextStepId).toBe("repaso");
    expect(renderFeed(result.repository.site.site.baseUrl, course).match(/<item>/g)).toHaveLength(3);
  });

  test("las extras no consumen el cupo de la lección programada", async () => {
    const root = await createRoot();
    await createCourse(root, "fullstack", { status: "active", schedule: "weekdays" });
    expect(await generateFixtureLesson(root, { kind: "extra", courseSlug: "fullstack", requestId: "200" }, now)).toBe(1);
    expect(await generateFixtureLesson(root, { kind: "scheduled" }, now)).toBe(1);
    expect(await generateFixtureLesson(root, { kind: "scheduled" }, now)).toBe(0);
    const result = await validateRepository(root);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.repository.courses[0]!.lessons.map((lesson) => lesson.frontmatter.generation.trigger)).toEqual([
      "extra", undefined,
    ]);
  });

  test("rechaza cursos desconocidos y pausados antes de generar", async () => {
    const root = await createRoot();
    await createCourse(root, "fullstack");
    const result = await validateRepository(root);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(() => selectCourses(result.repository, now, { kind: "extra", courseSlug: "otro", requestId: "300" }))
      .toThrow("No existe el curso");
    expect(() => selectCourses(result.repository, now, { kind: "extra", courseSlug: "fullstack", requestId: "300" }))
      .toThrow("está pausado");
    expect(() => selectCourses(result.repository, now, { kind: "extra", courseSlug: "../fullstack", requestId: "300" }))
      .toThrow("slug del curso manual es inválido");
  });

  test("un curso activo sin pasos pendientes rechaza el pedido extra", async () => {
    const root = await createRoot();
    await createCourse(root, "fullstack", { status: "active" });
    const result = await validateRepository(root);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    const course = result.repository.courses[0]!;
    course.progress.cursor.nextStepId = null;
    expect(() => selectCourses(result.repository, now, { kind: "extra", courseSlug: "fullstack", requestId: "301" }))
      .toThrow("no tiene pasos pendientes");
  });

  test("rechaza dos lecciones normales de una fecha y IDs extras repetidos", async () => {
    const root = await createRoot();
    await createCourse(root, "fullstack", { status: "active", schedule: "weekdays" });
    expect(await generateFixtureLesson(root, { kind: "scheduled" }, now)).toBe(1);
    let result = await validateRepository(root);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    await writePreparedLesson(result.repository.site, {
      course: result.repository.courses[0]!,
      draft: { title: "Otra normal", summary: "Resumen", markdown: "# Otra normal" },
      prompt: "Contexto",
      generationDate: "2026-09-23",
      publishedAt: now.toISOString(),
    });
    result = await validateRepository(root);
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.issues.some((issue) => issue.path === "generationDate")).toBe(true);

    const secondFile = path.join(root, "courses", "fullstack", "lessons", "002-profundizacion.md");
    const source = await readFile(secondFile, "utf8");
    await writeFile(secondFile, source.replace("  contextHash:", "  trigger: extra\n  requestId: \"400\"\n  contextHash:"));
    expect(await generateFixtureLesson(root, { kind: "extra", courseSlug: "fullstack", requestId: "401" }, now)).toBe(1);
    const thirdFile = path.join(root, "courses", "fullstack", "lessons", "003-practica.md");
    const thirdSource = await readFile(thirdFile, "utf8");
    await writeFile(thirdFile, thirdSource.replace('requestId: "401"', 'requestId: "400"'));
    result = await validateRepository(root);
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.issues.some((issue) => issue.path === "generation.requestId")).toBe(true);
  });
});

describe("validación del repositorio", () => {
  test("descubre cursos sin una lista central y selecciona el siguiente paso", async () => {
    const root = await createRoot();
    await createCourse(root, "audio-digital", { lesson: true });
    await createCourse(root, "fullstack");
    await createCourse(root, "musica-clasica");
    await createCourse(root, "cuarto-curso");

    const result = await validateRepository(root);

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.repository.courses.map((course) => course.config.slug)).toEqual([
      "audio-digital",
      "cuarto-curso",
      "fullstack",
      "musica-clasica",
    ]);
    expect(selectNextLesson(result.repository.courses[0]!)).toEqual({
      status: "ready",
      sequence: 2,
      stepId: "profundizacion",
    });
    expect(selectNextLesson(result.repository.courses[0]!)).toEqual({
      status: "ready",
      sequence: 2,
      stepId: "profundizacion",
    });
  });

  test("el prompt nuevo pide extensión y cierre sin cambiar las lecciones existentes", async () => {
    const root = await createRoot();
    await createCourse(root, "fullstack", { status: "active", lesson: true });
    const result = await validateRepository(root);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    const course = result.repository.courses[0];
    const step = course?.syllabus.frontmatter.steps[1];
    if (course === undefined || step === undefined) return;
    const prompt = buildLessonPrompt({ course, step, recentLessons: course.lessons });
    expect(LESSON_PROMPT_VERSION).toBe("v2");
    expect(prompt).toContain("entre 1000 y 1500 palabras");
    expect(prompt).toContain("[[FIN_LECCION]]");
    expect(prompt).toContain("## Comprobaciones");
    expect(course.lessons[0]?.frontmatter.generation.promptVersion).toBe("1");
  });

  test("rechaza un cursor que contradice el historial", async () => {
    const root = await createRoot();
    await createCourse(root, "audio-digital", {
      lesson: true,
      cursorNextStepId: "introduccion",
    });

    const result = await validateRepository(root);

    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.issues).toContainEqual(expect.objectContaining({
      file: "courses/audio-digital/progress.json",
      path: "cursor.nextStepId",
    }));
  });

  test("rechaza IDs de curso duplicados", async () => {
    const root = await createRoot();
    const duplicateId = "7caf40f9-41fa-4a0b-9b8e-64431e3b8028";
    await createCourse(root, "curso-a", { id: duplicateId });
    await createCourse(root, "curso-b", { id: duplicateId });

    const result = await validateRepository(root);

    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.issues.some((issue) => issue.message.includes("ID de curso repetido"))).toBe(true);
  });

  test("rechaza claves YAML duplicadas", async () => {
    const root = await createRoot();
    await createCourse(root, "audio-digital");
    await writeFile(
      path.join(root, "courses", "audio-digital", "course.yml"),
      `schemaVersion: 1
slug: audio-digital
slug: repetido
campoInventado: true
`,
    );

    const result = await validateRepository(root);

    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.issues.some((issue) => issue.message.includes("Map keys must be unique"))).toBe(true);
  });

  test("rechaza propiedades desconocidas aunque el YAML sea válido", async () => {
    const root = await createRoot();
    await createCourse(root, "audio-digital");
    const file = path.join(root, "courses", "audio-digital", "course.yml");
    const original = await readFile(file, "utf8");
    await writeFile(file, `${original}campoInventado: true\n`);

    const result = await validateRepository(root);

    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.issues).toContainEqual(expect.objectContaining({
      file: "courses/audio-digital/course.yml",
      message: expect.stringContaining("Unrecognized key"),
    }));
  });
});
