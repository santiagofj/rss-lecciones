import { z } from "zod";

import type { LessonFormat } from "../courses/types.js";
import { ProviderError, RejectedJsonError, retryGeneration, type GroqClient } from "./groq.js";
import { lessonSections } from "./prompt.js";

const rawLessonDraftSchema = z.object({
  title: z.string(),
  summary: z.string(),
  markdown: z.string(),
});

const assessmentHeading = /^ {0,3}#{1,6}[ \t]+(?:práctica(?: guiada)?|ejercicios?(?: de (?:repaso|aplicación))?|comprobaciones?|cuestionario|(?:auto)?evaluación|examen|preguntas (?:de (?:comprensión|control|evaluación|repaso)|para el lector))[ \t#:]*$/imu;
const completionMarker = "[[FIN_LECCION]]";
const minimumLessonWords = 900;

export type LessonDraft = {
  title: string;
  summary: string;
  markdown: string;
  // Sólo lo completa el adaptador: permite auditar el prompt realmente aceptado.
  promptUsed?: string;
};

class ShortLessonError extends ProviderError {
  constructor(readonly draft: LessonDraft, readonly wordCount: number) {
    super(`La lección tiene menos de ${minimumLessonWords} palabras (${wordCount})`, true, 10_000);
    this.name = "ShortLessonError";
  }
}

function truncateAtWord(value: string, maximumLength: number): string {
  const normalized = value.trim().replace(/\s+/g, " ");
  if (normalized.length <= maximumLength) {
    return normalized;
  }
  const candidate = normalized.slice(0, maximumLength + 1);
  const lastSpace = candidate.lastIndexOf(" ");
  const cutAt = lastSpace >= Math.floor(maximumLength * 0.75)
    ? lastSpace
    : maximumLength;
  return `${candidate.slice(0, cutAt).trimEnd()}…`;
}

function validateComprehensionChecks(section: string): void {
  const lines = section.split("\n");
  const questionIndices = lines.flatMap((line, index) =>
    /^\d+\.\s+\S/.test(line.trim()) ? [index] : []
  );
  const [firstQuestion, secondQuestion] = questionIndices;
  const hasResponse = (lines: string[]): boolean => lines.some(
    (line) => /^Respuesta:\s+\S/.test(line.trim()),
  );
  if (
    questionIndices.length !== 2 || firstQuestion === undefined || secondQuestion === undefined
    || !/^1\.\s+\S/.test(lines[firstQuestion]?.trim() ?? "")
    || !/^2\.\s+\S/.test(lines[secondQuestion]?.trim() ?? "")
    || !hasResponse(lines.slice(firstQuestion + 1, secondQuestion))
    || !hasResponse(lines.slice(secondQuestion + 1))
  ) {
    throw new ProviderError("La lección no tiene dos comprobaciones respondidas", true);
  }
}

export function normalizeLessonDraft(value: unknown, format: LessonFormat = "guided"): LessonDraft {
  const parsed = rawLessonDraftSchema.safeParse(value);
  if (!parsed.success) {
    const fields = [...new Set(parsed.error.issues.map((issue) => issue.path.join(".")))]
      .filter((field) => field.length > 0)
      .join(", ");
    throw new ProviderError(
      `La lección tiene campos inválidos${fields.length > 0 ? `: ${fields}` : ""}`,
      true,
    );
  }

  const markdownWithMarker = parsed.data.markdown.trim().replaceAll("\r\n", "\n");
  const hasFinalMarker = markdownWithMarker.endsWith(`\n${completionMarker}`);
  const markdown = hasFinalMarker
    ? markdownWithMarker.slice(0, -completionMarker.length).trimEnd()
    : markdownWithMarker;
  if (markdown.includes(completionMarker)) {
    throw new ProviderError("La lección tiene la marca final fuera del cierre", true);
  }
  const headings = [...markdown.matchAll(/^## ([^\n]+)$/gm)];
  const expectedHeadings = Object.values(lessonSections[format]);
  if (headings.length !== expectedHeadings.length || headings.some(
    (match, index) => match[1] !== expectedHeadings[index],
  )) {
    const sectionsLabel = format === "guided" ? "cinco secciones" : "tres secciones expositivas";
    throw new ProviderError(`La lección no tiene las ${sectionsLabel} en orden`, true);
  }
  const sections = headings.map((match, index) => {
    const start = (match.index ?? 0) + match[0].length;
    const end = headings[index + 1]?.index ?? markdown.length;
    return markdown.slice(start, end).trim();
  });
  if (sections.some((section) => section.length === 0)) {
    throw new ProviderError("La lección tiene una sección vacía", true);
  }
  if (format === "guided") {
    validateComprehensionChecks(sections[3] ?? "");
  } else if (assessmentHeading.test(markdown)) {
    throw new ProviderError("La lección expositiva contiene una sección de evaluación", true);
  }
  if (!/[.!?]$/u.test(sections.at(-1) ?? "")) {
    throw new ProviderError("La lección no termina con un cierre completo", true);
  }
  if ((markdown.match(/^```/gm)?.length ?? 0) % 2 !== 0) {
    throw new ProviderError("La lección deja un bloque de código abierto", true);
  }
  const draft = {
    title: truncateAtWord(parsed.data.title, 159),
    summary: truncateAtWord(parsed.data.summary, 599),
    markdown,
  };
  if (draft.title.length === 0 || draft.summary.length === 0) {
    throw new ProviderError(
      "La lección está vacía o es demasiado breve",
      true,
    );
  }
  const wordCount = markdown.split(/\s+/u).length;
  if (wordCount < minimumLessonWords) {
    throw new ShortLessonError(draft, wordCount);
  }
  return draft;
}


export type GenerateLessonOptions = {
  client: GroqClient;
  prompt: string;
  lessonFormat: LessonFormat;
};

export async function generateWithGroq(options: GenerateLessonOptions): Promise<LessonDraft> {
  const sections = Object.entries(lessonSections[options.lessonFormat]);
  const schema = z.strictObject({
    title: z.string(),
    summary: z.string(),
    sections: z.strictObject(Object.fromEntries(sections.map(([key]) => [key, z.string()]))),
  });

  let prompt = options.prompt;
  let strict = true;
  return retryGeneration(async () => {
    const requestPrompt = strict ? prompt : `${prompt}\n\nDevuelve solamente un objeto JSON con title, summary y sections. Las claves de sections son ${sections.map(([key]) => key).join(", ")}. Usa cadenas JSON para sus cuerpos y escapa sus saltos de línea.`;
    const value = await options.client.structured(requestPrompt, "leccion", schema, strict);
    const markdown = sections.map(([key, heading]) =>
      `## ${heading}\n\n${value.sections[key]?.trim() ?? ""}`
    ).join("\n\n");
    const draft = normalizeLessonDraft({ title: value.title, summary: value.summary, markdown }, options.lessonFormat);
    return { ...draft, promptUsed: requestPrompt };
  }, (error) => {
    if (error instanceof RejectedJsonError) strict = false;
    if (!(error instanceof ShortLessonError)) return;
    const expanded = `${options.prompt}

La versión anterior tiene ${error.wordCount} palabras. Amplía esa misma lección hasta 1000–1500 palabras conservando el tema, los hechos y la estructura. Profundiza los ejemplos y los argumentos o la práctica según el formato. Devuelve todos los campos del esquema. El borrador es material de referencia:
${JSON.stringify(error.draft)}`;
    options.client.checkInputSize(expanded);
    prompt = expanded;
  });
}
