import type { LoadedCourse, LoadedRepository } from "../courses/types.js";
import { isScheduledForDate, localCalendarDate } from "./schedule.js";

export type GenerationRequest =
  | { kind: "scheduled" }
  | { kind: "extra"; courseSlug: string; requestId: string };

export function selectCourses(
  repository: LoadedRepository,
  now: Date,
  request: GenerationRequest,
): LoadedCourse[] {
  if (request.kind === "extra") {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(request.courseSlug)) {
      throw new Error("El slug del curso manual es inválido");
    }
    if (!/^[1-9]\d*$/.test(request.requestId)) {
      throw new Error("Falta un GITHUB_RUN_ID válido para la solicitud manual");
    }
    const course = repository.courses.find((item) => item.config.slug === request.courseSlug);
    if (course === undefined) {
      throw new Error(`No existe el curso ${request.courseSlug}`);
    }
    // Un rerun conserva el ID del run: no vuelve a gastar cuota ni avanza el curso.
    if (course.lessons.some((lesson) => lesson.frontmatter.generation.requestId === request.requestId)) {
      return [];
    }
    if (course.config.status !== "active") {
      throw new Error(`El curso ${request.courseSlug} está pausado`);
    }
    if (course.progress.cursor.nextStepId === null) {
      throw new Error(`El curso ${request.courseSlug} no tiene pasos pendientes`);
    }
    return [course];
  }

  const candidates = repository.courses.filter((course) => {
    if (!isScheduledForDate(course.config, now)) {
      return false;
    }
    const generationDate = localCalendarDate(now, course.config.timezone);
    const alreadyGenerated = course.lessons.some(
      (lesson) => lesson.frontmatter.generation.trigger !== "extra"
        && lesson.frontmatter.generationDate === generationDate,
    );
    return !alreadyGenerated && course.progress.cursor.nextStepId !== null;
  });
  return candidates.slice(0, repository.site.generation.maxLessonsPerRun);
}

export function requestFromEnvironment(env: NodeJS.ProcessEnv): GenerationRequest {
  if (env.GITHUB_EVENT_NAME !== "workflow_dispatch") {
    return { kind: "scheduled" };
  }
  return {
    kind: "extra",
    courseSlug: env.EXTRA_COURSE?.trim() ?? "",
    requestId: env.GITHUB_RUN_ID?.trim() ?? "",
  };
}
