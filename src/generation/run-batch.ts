import { validateRepository } from "../courses/validate-repository.js";
import type { LoadedRepository } from "../courses/types.js";
import { generateWithGemini, type GenerateWithGeminiOptions, type LessonDraft } from "./gemini.js";
import { buildLessonPrompt } from "./prompt.js";
import { planGenerationTasks, planScheduledTasks, type GenerationRequest, type GenerationTask } from "./selection.js";
import { writePreparedLesson } from "./write-lesson.js";

export type GenerationFailure = {
  courseSlug: string;
  generationDate: string;
  message: string;
};

export type BatchResult = {
  saved: number;
  failures: GenerationFailure[];
  pending: GenerationTask[];
};

type BatchOptions = {
  root: string;
  repository: LoadedRepository;
  now: Date;
  request: GenerationRequest;
  apiKey: string;
  generateDraft?: (options: GenerateWithGeminiOptions) => Promise<LessonDraft>;
  clock?: () => Date;
};

export async function runGenerationBatch(options: BatchOptions): Promise<BatchResult> {
  const generateDraft = options.generateDraft ?? generateWithGemini;
  const tasks = planGenerationTasks(options.repository, options.now, options.request);
  const blockedCourses = new Set<string>();
  const failures: GenerationFailure[] = [];
  let saved = 0;
  let repository = options.repository;

  for (const task of tasks) {
    if (blockedCourses.has(task.courseSlug)) continue;
    const course = repository.courses.find((item) => item.config.slug === task.courseSlug);
    if (course === undefined) {
      throw new Error(`Desapareció el curso ${task.courseSlug} durante la generación`);
    }
    const step = course.syllabus.frontmatter.steps.find(
      (item) => item.id === course.progress.cursor.nextStepId,
    );
    if (step === undefined) {
      console.log(`Curso ${task.courseSlug} agotado; no hay más pasos para fechas pendientes`);
      blockedCourses.add(task.courseSlug);
      continue;
    }
    const prompt = buildLessonPrompt({ course, step, recentLessons: course.lessons.slice(-3) });
    if (Buffer.byteLength(prompt, "utf8") > repository.site.generation.maxInputBytes) {
      throw new Error(`El contexto de ${task.courseSlug} supera el máximo permitido`);
    }

    console.log(`Generando ${task.courseSlug} (${task.generationDate}): ${step.title}`);
    let draft: LessonDraft;
    try {
      draft = await generateDraft({
        apiKey: options.apiKey,
        model: repository.site.generation.model,
        prompt,
        timeoutSeconds: repository.site.generation.timeoutSeconds,
        maxOutputTokens: repository.site.generation.maxOutputTokens,
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Error desconocido de Gemini";
      failures.push({ courseSlug: task.courseSlug, generationDate: task.generationDate, message });
      blockedCourses.add(task.courseSlug);
      console.error(`Falló ${task.courseSlug} (${task.generationDate}): ${message}`);
      continue;
    }

    const filename = await writePreparedLesson(repository.site, {
      course,
      draft,
      prompt,
      generationDate: task.generationDate,
      publishedAt: (options.clock?.() ?? new Date()).toISOString(),
      ...(task.kind === "extra" ? { extraRequestId: task.requestId } : {}),
    });
    saved += 1;
    console.log(`Guardada ${task.courseSlug}/${filename} para ${task.generationDate}`);

    // Cada nueva lección pasa a ser contexto del siguiente día atrasado.
    const updated = await validateRepository(options.root);
    if (!updated.ok) {
      const first = updated.issues[0];
      throw new Error(`Fuentes inválidas tras guardar ${task.courseSlug}: ${first?.message ?? "error desconocido"}`);
    }
    repository = updated.repository;
  }

  return {
    saved,
    failures,
    pending: options.request.kind === "scheduled"
      ? planScheduledTasks(repository, options.now, Number.MAX_SAFE_INTEGER)
      : [],
  };
}
