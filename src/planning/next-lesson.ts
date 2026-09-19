import type { LoadedCourse } from "../courses/types.js";

export type NextLesson =
  | { status: "ready"; sequence: number; stepId: string }
  | { status: "exhausted" };

export function selectNextLesson(course: LoadedCourse): NextLesson {
  const nextStepId = course.progress.cursor.nextStepId;
  if (nextStepId === null) {
    return { status: "exhausted" };
  }

  return {
    status: "ready",
    sequence: course.lessons.length + 1,
    stepId: nextStepId,
  };
}
