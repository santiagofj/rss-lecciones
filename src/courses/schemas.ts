import { z } from "zod";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const sha256Pattern = /^[a-f0-9]{64}$/;
const datePattern = /^\d{4}-\d{2}-\d{2}$/;

const nonEmptyText = z.string().trim().min(1);
const slug = z.string().regex(slugPattern, "debe ser un slug en minúsculas");

function isLanguageTag(value: string): boolean {
  try {
    Intl.getCanonicalLocales(value);
    return true;
  } catch {
    return false;
  }
}

function isTimeZone(value: string): boolean {
  try {
    new Intl.DateTimeFormat("en", { timeZone: value }).format();
    return true;
  } catch {
    return false;
  }
}

function isCalendarDate(value: string): boolean {
  if (!datePattern.test(value)) {
    return false;
  }

  const [yearText, monthText, dayText] = value.split("-");
  const year = Number(yearText);
  const month = Number(monthText);
  const day = Number(dayText);
  const date = new Date(Date.UTC(year, month - 1, day));

  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

const weekdays = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

const scheduleSchema = z.discriminatedUnion("type", [
  z.strictObject({ type: z.literal("weekdays") }),
  z.strictObject({
    type: z.literal("weekly"),
    days: z.array(z.enum(weekdays)).min(1).refine(
      (days) => new Set(days).size === days.length,
      "no puede contener días repetidos",
    ),
  }),
  z.strictObject({ type: z.literal("manual") }),
]);

export const siteConfigSchema = z.strictObject({
  schemaVersion: z.literal(1),
  site: z.strictObject({
    id: z.uuid(),
    title: nonEmptyText,
    description: nonEmptyText,
    baseUrl: z.url({ protocol: /^https$/ }).refine(
      (url) => url.endsWith("/"),
      "debe terminar con /",
    ),
    language: z.string().refine(isLanguageTag, "debe ser una etiqueta BCP 47 válida"),
  }),
  generation: z.strictObject({
    model: nonEmptyText.refine(
      (model) => !model.includes("<") && !model.includes(">"),
      "debe identificar un modelo real",
    ),
    timeoutSeconds: z.int().positive(),
    maxOutputTokens: z.int().positive(),
    maxInputBytes: z.int().positive(),
    maxLessonsPerRun: z.int().positive(),
  }),
});

export const courseSchema = z.strictObject({
  schemaVersion: z.literal(1),
  id: z.uuid(),
  slug,
  title: nonEmptyText,
  description: nonEmptyText,
  status: z.enum(["active", "paused"]),
  language: z.string().refine(isLanguageTag, "debe ser una etiqueta BCP 47 válida"),
  timezone: z.string().refine(isTimeZone, "debe ser una zona horaria IANA válida"),
  schedule: scheduleSchema,
  feed: z.boolean(),
  teaching: z.strictObject({
    audience: nonEmptyText,
    instructions: nonEmptyText,
  }),
});

export const syllabusFrontmatterSchema = z.strictObject({
  schemaVersion: z.literal(1),
  steps: z.array(
    z.strictObject({
      id: slug,
      unitId: slug,
      topicId: slug,
      title: nonEmptyText,
      objective: nonEmptyText,
      brief: nonEmptyText,
    }),
  ).min(1),
});

export const progressSchema = z.strictObject({
  schemaVersion: z.literal(1),
  startStepId: slug,
  learnerContext: z.string(),
  cursor: z.strictObject({
    lastLessonId: z.uuid().nullable(),
    nextStepId: slug.nullable(),
  }),
});

export const lessonFrontmatterSchema = z.strictObject({
  schemaVersion: z.literal(1),
  id: z.uuid(),
  sequence: z.int().positive(),
  course: slug,
  stepId: slug,
  title: nonEmptyText.max(160),
  publishedAt: z.iso.datetime({ offset: true }),
  generationDate: z.string().refine(isCalendarDate, "debe ser una fecha YYYY-MM-DD válida"),
  summary: nonEmptyText.max(600),
  generation: z.strictObject({
    model: nonEmptyText,
    promptVersion: nonEmptyText,
    contextHash: z.string().regex(sha256Pattern, "debe ser un SHA-256 hexadecimal"),
    trigger: z.literal("extra").optional(),
    requestId: z.string().regex(/^[1-9]\d*$/, "debe ser un ID numérico de GitHub Actions").optional(),
  }).refine(
    (generation) => (generation.trigger === "extra") === (generation.requestId !== undefined),
    "trigger y requestId deben aparecer juntos",
  ),
});
