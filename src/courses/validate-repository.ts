import { lstat, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import type { Dirent } from "node:fs";

import {
  courseSchema,
  lessonFrontmatterSchema,
  progressSchema,
  siteConfigSchema,
  syllabusFrontmatterSchema,
} from "./schemas.js";
import { parseFrontmatter, parseJson, parseYaml, validateSchema } from "./parse.js";
import type {
  CourseConfig,
  Lesson,
  LoadedCourse,
  Progress,
  SiteConfig,
  Syllabus,
  ValidationIssue,
  ValidationResult,
} from "./types.js";

const maximumConfigBytes = 1024 * 1024;
const maximumMarkdownBytes = 256 * 1024;
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

type ReadResult = { text?: string; issues: ValidationIssue[] };

function relativeFile(root: string, file: string): string {
  return path.relative(root, file).replaceAll(path.sep, "/");
}

function isInside(root: string, candidate: string): boolean {
  const relative = path.relative(root, candidate);
  return relative !== "" && !relative.startsWith(`..${path.sep}`) && relative !== ".." && !path.isAbsolute(relative);
}

async function readRegularFile(
  root: string,
  file: string,
  maximumBytes: number,
): Promise<ReadResult> {
  const displayName = relativeFile(root, file);
  try {
    const stats = await lstat(file);
    if (stats.isSymbolicLink() || !stats.isFile()) {
      return { issues: [{ file: displayName, path: "", message: "debe ser un archivo regular, no un symlink" }] };
    }
    if (stats.size > maximumBytes) {
      return { issues: [{ file: displayName, path: "", message: `supera el máximo de ${maximumBytes} bytes` }] };
    }
    return { text: await readFile(file, "utf8"), issues: [] };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "no se pudo leer el archivo";
    return { issues: [{ file: displayName, path: "", message }] };
  }
}

async function readYamlConfig<T>(
  root: string,
  file: string,
  schema: Parameters<typeof validateSchema<T>>[0],
): Promise<{ value?: T; issues: ValidationIssue[] }> {
  const source = await readRegularFile(root, file, maximumConfigBytes);
  if (source.text === undefined) {
    return { issues: source.issues };
  }
  const parsed = parseYaml(source.text, relativeFile(root, file));
  if (parsed.value === undefined) {
    return { issues: parsed.issues };
  }
  return validateSchema(schema, parsed.value, relativeFile(root, file));
}

async function readJsonConfig<T>(
  root: string,
  file: string,
  schema: Parameters<typeof validateSchema<T>>[0],
): Promise<{ value?: T; issues: ValidationIssue[] }> {
  const source = await readRegularFile(root, file, maximumConfigBytes);
  if (source.text === undefined) {
    return { issues: source.issues };
  }
  const parsed = parseJson(source.text, relativeFile(root, file));
  if (parsed.value === undefined) {
    return { issues: parsed.issues };
  }
  return validateSchema(schema, parsed.value, relativeFile(root, file));
}

async function readSyllabus(
  root: string,
  file: string,
): Promise<{ value?: Syllabus; issues: ValidationIssue[] }> {
  const source = await readRegularFile(root, file, maximumMarkdownBytes);
  if (source.text === undefined) {
    return { issues: source.issues };
  }
  const parsed = parseFrontmatter(source.text, relativeFile(root, file));
  if (parsed.value === undefined || parsed.markdown === undefined) {
    return { issues: parsed.issues };
  }
  const frontmatter = validateSchema(
    syllabusFrontmatterSchema,
    parsed.value,
    relativeFile(root, file),
  );
  if (frontmatter.value === undefined) {
    return { issues: frontmatter.issues };
  }
  if (parsed.markdown.trim().length === 0) {
    return {
      issues: [{ file: relativeFile(root, file), path: "", message: "el cuerpo Markdown no puede estar vacío" }],
    };
  }
  return { value: { frontmatter: frontmatter.value, markdown: parsed.markdown }, issues: [] };
}

async function readLessons(
  root: string,
  lessonsDirectory: string,
): Promise<{ value?: Lesson[]; issues: ValidationIssue[] }> {
  const displayName = relativeFile(root, lessonsDirectory);
  let entries: Dirent[];
  try {
    const stats = await lstat(lessonsDirectory);
    if (stats.isSymbolicLink() || !stats.isDirectory()) {
      return { issues: [{ file: displayName, path: "", message: "debe ser un directorio regular, no un symlink" }] };
    }
    entries = await readdir(lessonsDirectory, { withFileTypes: true });
  } catch (error: unknown) {
    return {
      issues: [{
        file: displayName,
        path: "",
        message: error instanceof Error ? error.message : "no se pudo leer el directorio",
      }],
    };
  }

  const issues: ValidationIssue[] = [];
  const lessons: Lesson[] = [];
  for (const entry of entries.sort((left, right) => left.name.localeCompare(right.name))) {
    // Git no conserva directorios vacíos. Permitimos este único marcador para
    // versionar lessons/ antes de que exista la primera lección.
    if (entry.isFile() && entry.name === ".gitkeep") {
      continue;
    }
    const file = path.join(lessonsDirectory, entry.name);
    if (!isInside(lessonsDirectory, file)) {
      issues.push({ file: relativeFile(root, file), path: "", message: "ruta fuera de lessons" });
      continue;
    }
    if (!entry.isFile() || path.extname(entry.name) !== ".md") {
      issues.push({ file: relativeFile(root, file), path: "", message: "lessons sólo admite archivos Markdown regulares" });
      continue;
    }
    const source = await readRegularFile(root, file, maximumMarkdownBytes);
    if (source.text === undefined) {
      issues.push(...source.issues);
      continue;
    }
    const parsed = parseFrontmatter(source.text, relativeFile(root, file));
    if (parsed.value === undefined || parsed.markdown === undefined) {
      issues.push(...parsed.issues);
      continue;
    }
    const frontmatter = validateSchema(
      lessonFrontmatterSchema,
      parsed.value,
      relativeFile(root, file),
    );
    if (frontmatter.value === undefined) {
      issues.push(...frontmatter.issues);
      continue;
    }
    if (parsed.markdown.trim().length === 0) {
      issues.push({ file: relativeFile(root, file), path: "", message: "el cuerpo Markdown no puede estar vacío" });
      continue;
    }
    lessons.push({
      filename: entry.name,
      frontmatter: frontmatter.value,
      markdown: parsed.markdown,
    });
  }

  return issues.length > 0 ? { issues } : { value: lessons, issues: [] };
}

function validateCourseRelationships(
  root: string,
  course: LoadedCourse,
): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const courseFile = relativeFile(root, path.join(course.directory, "course.yml"));
  const syllabusFile = relativeFile(root, path.join(course.directory, "syllabus.md"));
  const progressFile = relativeFile(root, path.join(course.directory, "progress.json"));
  const directoryName = path.basename(course.directory);

  if (course.config.slug !== directoryName) {
    issues.push({ file: courseFile, path: "slug", message: `debe coincidir con el directorio ${directoryName}` });
  }

  const steps = course.syllabus.frontmatter.steps;
  const stepIds = new Set<string>();
  for (const [index, step] of steps.entries()) {
    if (stepIds.has(step.id)) {
      issues.push({ file: syllabusFile, path: `steps.${index}.id`, message: `ID de paso repetido: ${step.id}` });
    }
    stepIds.add(step.id);
  }

  const startIndex = steps.findIndex((step) => step.id === course.progress.startStepId);
  if (startIndex === -1) {
    issues.push({ file: progressFile, path: "startStepId", message: "no existe en el syllabus" });
    return issues;
  }

  const lessons = [...course.lessons].sort(
    (left, right) => left.frontmatter.sequence - right.frontmatter.sequence,
  );
  const lessonIds = new Set<string>();
  const generationDates = new Set<string>();

  for (const [index, lesson] of lessons.entries()) {
    const metadata = lesson.frontmatter;
    const lessonFile = relativeFile(root, path.join(course.directory, "lessons", lesson.filename));
    const expectedSequence = index + 1;
    const expectedStep = steps[startIndex + index];
    const expectedFilename = `${String(expectedSequence).padStart(3, "0")}-${metadata.stepId}.md`;

    if (metadata.sequence !== expectedSequence) {
      issues.push({ file: lessonFile, path: "sequence", message: `se esperaba ${expectedSequence}` });
    }
    if (metadata.course !== course.config.slug) {
      issues.push({ file: lessonFile, path: "course", message: `se esperaba ${course.config.slug}` });
    }
    if (expectedStep === undefined || metadata.stepId !== expectedStep.id) {
      issues.push({
        file: lessonFile,
        path: "stepId",
        message: expectedStep === undefined ? "excede los pasos del syllabus" : `se esperaba ${expectedStep.id}`,
      });
    }
    if (lesson.filename !== expectedFilename) {
      issues.push({ file: lessonFile, path: "", message: `el nombre esperado es ${expectedFilename}` });
    }
    if (lessonIds.has(metadata.id)) {
      issues.push({ file: lessonFile, path: "id", message: "ID de lección repetido en el curso" });
    }
    if (generationDates.has(metadata.generationDate)) {
      issues.push({ file: lessonFile, path: "generationDate", message: "ya existe una lección en esa fecha local" });
    }
    lessonIds.add(metadata.id);
    generationDates.add(metadata.generationDate);
  }

  const lastLesson = lessons.at(-1);
  const expectedLastLessonId = lastLesson?.frontmatter.id ?? null;
  const expectedNextStep = steps[startIndex + lessons.length]?.id ?? null;
  if (course.progress.cursor.lastLessonId !== expectedLastLessonId) {
    issues.push({ file: progressFile, path: "cursor.lastLessonId", message: `se esperaba ${expectedLastLessonId ?? "null"}` });
  }
  if (course.progress.cursor.nextStepId !== expectedNextStep) {
    issues.push({ file: progressFile, path: "cursor.nextStepId", message: `se esperaba ${expectedNextStep ?? "null"}` });
  }

  return issues;
}

async function loadCourse(
  root: string,
  directory: string,
): Promise<{ value?: LoadedCourse; issues: ValidationIssue[] }> {
  const [config, syllabus, progress, lessons] = await Promise.all([
    readYamlConfig<CourseConfig>(root, path.join(directory, "course.yml"), courseSchema),
    readSyllabus(root, path.join(directory, "syllabus.md")),
    readJsonConfig<Progress>(root, path.join(directory, "progress.json"), progressSchema),
    readLessons(root, path.join(directory, "lessons")),
  ]);
  const issues = [...config.issues, ...syllabus.issues, ...progress.issues, ...lessons.issues];
  if (
    config.value === undefined ||
    syllabus.value === undefined ||
    progress.value === undefined ||
    lessons.value === undefined
  ) {
    return { issues };
  }

  const value: LoadedCourse = {
    directory,
    config: config.value,
    syllabus: syllabus.value,
    progress: progress.value,
    lessons: lessons.value,
  };
  issues.push(...validateCourseRelationships(root, value));
  return issues.length > 0 ? { issues } : { value, issues: [] };
}

export async function validateRepository(root: string): Promise<ValidationResult> {
  const resolvedRoot = path.resolve(root);
  const site = await readYamlConfig<SiteConfig>(
    resolvedRoot,
    path.join(resolvedRoot, "site.yml"),
    siteConfigSchema,
  );
  const issues = [...site.issues];
  const coursesDirectory = path.join(resolvedRoot, "courses");
  let entries: Dirent[];

  try {
    const stats = await lstat(coursesDirectory);
    if (stats.isSymbolicLink() || !stats.isDirectory()) {
      issues.push({ file: "courses", path: "", message: "debe ser un directorio regular, no un symlink" });
      entries = [];
    } else {
      entries = await readdir(coursesDirectory, { withFileTypes: true });
    }
  } catch (error: unknown) {
    issues.push({
      file: "courses",
      path: "",
      message: error instanceof Error ? error.message : "no se pudo leer el directorio",
    });
    entries = [];
  }

  const courses: LoadedCourse[] = [];
  for (const entry of entries.sort((left, right) => left.name.localeCompare(right.name))) {
    const directory = path.join(coursesDirectory, entry.name);
    if (!entry.isDirectory() || entry.isSymbolicLink()) {
      issues.push({ file: relativeFile(resolvedRoot, directory), path: "", message: "courses sólo admite directorios regulares" });
      continue;
    }
    if (!slugPattern.test(entry.name) || !isInside(coursesDirectory, directory)) {
      issues.push({ file: relativeFile(resolvedRoot, directory), path: "", message: "nombre de directorio de curso inválido" });
      continue;
    }
    const course = await loadCourse(resolvedRoot, directory);
    issues.push(...course.issues);
    if (course.value !== undefined) {
      courses.push(course.value);
    }
  }

  const courseIds = new Map<string, string>();
  const lessonIds = new Map<string, string>();
  for (const course of courses) {
    const courseFile = relativeFile(resolvedRoot, path.join(course.directory, "course.yml"));
    const previousCourse = courseIds.get(course.config.id);
    if (previousCourse !== undefined) {
      issues.push({ file: courseFile, path: "id", message: `ID de curso repetido; ya usado en ${previousCourse}` });
    } else {
      courseIds.set(course.config.id, courseFile);
    }
    for (const lesson of course.lessons) {
      const lessonFile = relativeFile(resolvedRoot, path.join(course.directory, "lessons", lesson.filename));
      const previousLesson = lessonIds.get(lesson.frontmatter.id);
      if (previousLesson !== undefined) {
        issues.push({ file: lessonFile, path: "id", message: `ID de lección global repetido; ya usado en ${previousLesson}` });
      } else {
        lessonIds.set(lesson.frontmatter.id, lessonFile);
      }
    }
  }

  if (issues.length > 0 || site.value === undefined) {
    return { ok: false, issues };
  }
  return { ok: true, repository: { site: site.value, courses } };
}
