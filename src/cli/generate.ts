import process from "node:process";

import { validateRepository } from "../courses/validate-repository.js";
import { generateWithGemini } from "../generation/gemini.js";
import { buildLessonPrompt } from "../generation/prompt.js";
import { isScheduledForDate, localCalendarDate } from "../generation/schedule.js";
import { writePreparedLesson } from "../generation/write-lesson.js";
import { buildPublicSite } from "../publishing/site.js";

function reportInvalidRepository(result: Awaited<ReturnType<typeof validateRepository>>): never {
  if (result.ok) {
    throw new Error("Estado de validación inesperado");
  }
  for (const issue of result.issues) {
    const location = issue.path.length === 0 ? issue.file : `${issue.file}:${issue.path}`;
    console.error(`- ${location}: ${issue.message}`);
  }
  throw new Error("El repositorio no cumple el contrato de configuración");
}

async function main(): Promise<void> {
  const root = process.cwd();
  const initial = await validateRepository(root);
  if (!initial.ok) {
    reportInvalidRepository(initial);
  }

  const now = new Date();
  const candidates = initial.repository.courses.filter((course) => {
    if (!isScheduledForDate(course.config, now)) {
      return false;
    }
    const generationDate = localCalendarDate(now, course.config.timezone);
    const alreadyGenerated = course.lessons.some(
      (lesson) => lesson.frontmatter.generationDate === generationDate,
    );
    return !alreadyGenerated && course.progress.cursor.nextStepId !== null;
  });
  const dueCourses = candidates.slice(0, initial.repository.site.generation.maxLessonsPerRun);

  if (dueCourses.length > 0) {
    const apiKey = process.env.GEMINI_API_KEY?.trim();
    if (apiKey === undefined || apiKey.length === 0) {
      throw new Error("Falta el secreto GEMINI_API_KEY");
    }

    const prepared = [];
    for (const course of dueCourses) {
      const step = course.syllabus.frontmatter.steps.find(
        (item) => item.id === course.progress.cursor.nextStepId,
      );
      if (step === undefined) {
        throw new Error(`No se encontró el próximo paso de ${course.config.slug}`);
      }
      const prompt = buildLessonPrompt({
        course,
        step,
        recentLessons: course.lessons.slice(-3),
      });
      if (Buffer.byteLength(prompt, "utf8") > initial.repository.site.generation.maxInputBytes) {
        throw new Error(`El contexto de ${course.config.slug} supera el máximo permitido`);
      }

      console.log(`Generando ${course.config.slug}: ${step.title}`);
      const draft = await generateWithGemini({
        apiKey,
        model: initial.repository.site.generation.model,
        prompt,
        timeoutSeconds: initial.repository.site.generation.timeoutSeconds,
        maxOutputTokens: initial.repository.site.generation.maxOutputTokens,
      });
      prepared.push({
        course,
        draft,
        prompt,
        generationDate: localCalendarDate(now, course.config.timezone),
        publishedAt: now.toISOString(),
      });
    }

    // Ningún archivo se modifica hasta que las tres respuestas fueron válidas.
    for (const lesson of prepared) {
      const filename = await writePreparedLesson(initial.repository.site, lesson);
      console.log(`Guardada ${lesson.course.config.slug}/${filename}`);
    }
  } else {
    console.log("No hay lecciones pendientes para la fecha local actual");
  }

  const finalState = await validateRepository(root);
  if (!finalState.ok) {
    reportInvalidRepository(finalState);
  }
  await buildPublicSite(root, finalState.repository);
  console.log("Sitio HTML y feeds RSS construidos en public/");
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : "Error inesperado");
  process.exitCode = 1;
});
