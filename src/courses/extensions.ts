import { randomUUID } from "node:crypto";
import { lstat, mkdir, readFile, readdir, rename, rm, rmdir, writeFile } from "node:fs/promises";
import path from "node:path";
import type { z } from "zod";

import { courseExtensionSchema } from "./schemas.js";
import type { LoadedCourse, ValidationIssue } from "./types.js";

export type CourseExtension = z.infer<typeof courseExtensionSchema>;
const maximumExtensionBytes = 256 * 1024;

export async function loadCourseExtensions(root: string, course: LoadedCourse): Promise<ValidationIssue[]> {
  if (course.config.continuation === undefined) return [];
  const directory = path.join(course.directory, "continuation");
  const issues: ValidationIssue[] = [];
  let names: string[];
  try {
    const stats = await lstat(directory);
    if (!stats.isDirectory() || stats.isSymbolicLink()) throw new Error("continuation debe ser un directorio regular");
    names = (await readdir(directory)).sort();
  } catch (error: unknown) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") return [];
    return [{ file: path.relative(root, directory), path: "", message: error instanceof Error ? error.message : "No se pudo leer continuation" }];
  }
  const steps = course.syllabus.frontmatter.steps;
  const boundaries = new Set([steps.length]);
  for (const name of names) {
    const file = path.join(directory, name);
    try {
      if (!/^\d{12,}\.json$/u.test(name)) throw new Error("Nombre de lote de continuación inválido");
      const stats = await lstat(file);
      if (!stats.isFile() || stats.isSymbolicLink() || stats.size > maximumExtensionBytes) {
        throw new Error("El lote debe ser un archivo regular de hasta 256 KiB");
      }
      const batch = courseExtensionSchema.parse(JSON.parse(await readFile(file, "utf8")));
      if (batch.afterStepId !== steps.at(-1)?.id || Number(name.slice(0, -5)) !== steps.length) {
        throw new Error("El lote no continúa el último paso del recorrido");
      }
      if (batch.steps.some((step) => step.game === undefined)) throw new Error("El lote contiene un juego sin identidad ni fuentes");
      steps.push(...batch.steps);
      boundaries.add(steps.length);
    } catch (error: unknown) {
      issues.push({ file: path.relative(root, file), path: "", message: error instanceof Error ? error.message : "Lote inválido" });
      break;
    }
  }
  // Añadir un lote es una sola escritura durable. Un cursor nulo de un límite
  // anterior se reconstruye desde las lecciones sin necesitar dos escrituras atómicas.
  const start = steps.findIndex((step) => step.id === course.progress.startStepId);
  const nextIndex = start + course.lessons.length;
  const lastLesson = [...course.lessons].sort((a, b) => a.frontmatter.sequence - b.frontmatter.sequence).at(-1);
  if (issues.length === 0 && start >= 0 && names.length > 0
    && course.progress.cursor.nextStepId === null && boundaries.has(nextIndex)
    && course.progress.cursor.lastLessonId === (lastLesson?.frontmatter.id ?? null)) {
    course.progress.cursor.nextStepId = steps[nextIndex]?.id ?? null;
  }
  return issues;
}

export async function saveCourseExtension(root: string, course: LoadedCourse, batch: CourseExtension): Promise<void> {
  const validated = courseExtensionSchema.parse(batch);
  const source = `${JSON.stringify(validated, null, 2)}\n`;
  if (Buffer.byteLength(source, "utf8") > maximumExtensionBytes) throw new Error("El lote supera 256 KiB");
  const work = path.join(root, ".work");
  const directory = path.join(course.directory, "continuation");
  await mkdir(work, { recursive: true });
  await mkdir(directory, { recursive: true });
  const temporary = path.join(work, `continuation-${randomUUID()}.json`);
  const position = String(course.syllabus.frontmatter.steps.length).padStart(12, "0");
  const destination = path.join(directory, `${position}.json`);
  const lock = path.join(work, `${course.config.slug}-${position}.lock`);
  await mkdir(lock);
  try {
    try {
      await lstat(destination);
      throw new Error("El lote ya existe; no se puede reemplazar");
    } catch (error: unknown) {
      if (!(error instanceof Error && "code" in error && error.code === "ENOENT")) throw error;
    }
    await writeFile(temporary, source, { encoding: "utf8", flag: "wx" });
    // Renombrar publica un archivo completo; el bloqueo impide que dos escritores
    // cooperantes reemplacen el mismo lote. No requiere privilegios de hardlinks.
    await rename(temporary, destination);
  } finally {
    await rm(temporary, { force: true });
    await rmdir(lock);
  }
}
