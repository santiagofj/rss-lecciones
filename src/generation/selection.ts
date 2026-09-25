import type { LoadedCourse, LoadedRepository } from "../courses/types.js";
import { isScheduledForCalendarDate, localCalendarDate, nextCalendarDate } from "./schedule.js";

export type GenerationRequest =
  | { kind: "scheduled" }
  | { kind: "extra"; courseSlug: string; requestId: string };

export type GenerationTask =
  | { kind: "scheduled"; courseSlug: string; generationDate: string }
  | { kind: "extra"; courseSlug: string; generationDate: string; requestId: string };

function pendingDates(course: LoadedCourse, now: Date): string[] {
  if (course.config.status !== "active" || course.config.schedule.type === "manual"
    || course.progress.cursor.nextStepId === null) {
    return [];
  }

  const today = localCalendarDate(now, course.config.timezone);
  const publishedDates = new Set(course.lessons
    .filter((lesson) => lesson.frontmatter.generation.trigger !== "extra")
    .map((lesson) => lesson.frontmatter.generationDate));
  const dates: string[] = [];
  for (let date = course.config.schedule.startDate; date <= today; date = nextCalendarDate(date)) {
    if (isScheduledForCalendarDate(course.config, date) && !publishedDates.has(date)) {
      dates.push(date);
    }
  }
  return dates;
}

export function planScheduledTasks(
  repository: LoadedRepository,
  now: Date,
  limit = repository.site.generation.maxLessonsPerRun,
): GenerationTask[] {
  const queues = repository.courses
    .map((course) => ({ slug: course.config.slug, dates: pendingDates(course, now) }))
    .sort((left, right) => left.slug.localeCompare(right.slug));
  const tasks: GenerationTask[] = [];
  for (let round = 0; tasks.length < limit; round += 1) {
    let found = false;
    for (const queue of queues) {
      const generationDate = queue.dates[round];
      if (generationDate === undefined) continue;
      found = true;
      tasks.push({ kind: "scheduled", courseSlug: queue.slug, generationDate });
      if (tasks.length === limit) break;
    }
    if (!found) break;
  }
  return tasks;
}

export function planGenerationTasks(
  repository: LoadedRepository,
  now: Date,
  request: GenerationRequest,
): GenerationTask[] {
  if (request.kind === "scheduled") {
    return planScheduledTasks(repository, now);
  }
  return selectCourses(repository, now, request).map((course) => ({
    kind: "extra",
    courseSlug: course.config.slug,
    generationDate: localCalendarDate(now, course.config.timezone),
    requestId: request.requestId,
  }));
}

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

  const selected = new Set(planScheduledTasks(repository, now).map((task) => task.courseSlug));
  return repository.courses.filter((course) => selected.has(course.config.slug));
}

export function requestFromEnvironment(env: NodeJS.ProcessEnv): GenerationRequest {
  if (env.GITHUB_EVENT_NAME !== "workflow_dispatch") {
    return { kind: "scheduled" };
  }
  if (env.RECOVER_PENDING === "true") {
    if ((env.EXTRA_COURSE?.trim() ?? "").length > 0) {
      throw new Error("No combines recover=true con un curso extra");
    }
    return { kind: "scheduled" };
  }
  return {
    kind: "extra",
    courseSlug: env.EXTRA_COURSE?.trim() ?? "",
    requestId: env.GITHUB_RUN_ID?.trim() ?? "",
  };
}
