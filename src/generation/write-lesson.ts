import { createHash, randomUUID } from "node:crypto";
import { writeFile } from "node:fs/promises";
import path from "node:path";

import { stringify as stringifyYaml } from "yaml";

import type { LessonDraft } from "./gemini.js";
import type { LoadedCourse, Progress, SiteConfig } from "../courses/types.js";

type PreparedLesson = {
  course: LoadedCourse;
  draft: LessonDraft;
  prompt: string;
  generationDate: string;
  publishedAt: string;
  extraRequestId?: string;
};

export async function writePreparedLesson(
  site: SiteConfig,
  prepared: PreparedLesson,
): Promise<string> {
  const { course, draft, prompt, generationDate, publishedAt, extraRequestId } = prepared;
  const sequence = course.lessons.length + 1;
  const stepIndex = course.syllabus.frontmatter.steps.findIndex(
    (step) => step.id === course.progress.cursor.nextStepId,
  );
  const step = course.syllabus.frontmatter.steps[stepIndex];
  if (step === undefined) {
    throw new Error(`El curso ${course.config.slug} no tiene un próximo paso válido`);
  }

  const lessonId = randomUUID();
  const metadata = {
    schemaVersion: 1 as const,
    id: lessonId,
    sequence,
    course: course.config.slug,
    stepId: step.id,
    title: draft.title,
    publishedAt,
    generationDate,
    summary: draft.summary,
    generation: {
      model: site.generation.model,
      promptVersion: "v1",
      contextHash: createHash("sha256").update(prompt).digest("hex"),
      ...(extraRequestId === undefined ? {} : { trigger: "extra", requestId: extraRequestId }),
    },
  };

  const filename = `${String(sequence).padStart(3, "0")}-${step.id}.md`;
  const lessonPath = path.join(course.directory, "lessons", filename);
  const source = `---\n${stringifyYaml(metadata)}---\n\n${draft.markdown.trim()}\n`;

  // wx impide reemplazar silenciosamente una lección si dos ejecuciones compiten.
  await writeFile(lessonPath, source, { encoding: "utf8", flag: "wx" });

  const progress: Progress = {
    ...course.progress,
    cursor: {
      lastLessonId: lessonId,
      nextStepId: course.syllabus.frontmatter.steps[stepIndex + 1]?.id ?? null,
    },
  };
  await writeFile(
    path.join(course.directory, "progress.json"),
    `${JSON.stringify(progress, null, 2)}\n`,
    "utf8",
  );
  return filename;
}
