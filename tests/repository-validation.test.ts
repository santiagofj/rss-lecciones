import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import { afterEach, describe, expect, test } from "vitest";

import { validateRepository } from "../src/courses/validate-repository.js";
import { selectNextLesson } from "../src/planning/next-lesson.js";

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
status: paused
language: es-AR
timezone: America/Buenos_Aires
schedule:
  type: manual
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
