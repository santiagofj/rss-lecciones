import { z } from "zod";

const rawLessonDraftSchema = z.object({
  title: z.string(),
  summary: z.string(),
  markdown: z.string(),
});

const geminiResponseSchema = z.object({
  candidates: z.array(
    z.object({
      finishReason: z.string().optional(),
      content: z.object({
        parts: z.array(z.object({ text: z.string() })).min(1),
      }).optional(),
    }),
  ).min(1),
});

const lessonHeadings = [
  "Por qué ahora",
  "Explicación y ejemplo",
  "Práctica",
  "Comprobaciones",
  "Cierre",
] as const;
const completionMarker = "[[FIN_LECCION]]";
const minimumLessonWords = 900;

export type LessonDraft = {
  title: string;
  summary: string;
  markdown: string;
};

type GenerateWithGeminiOptions = {
  apiKey: string;
  model: string;
  prompt: string;
  timeoutSeconds: number;
  maxOutputTokens: number;
};

class GeminiGenerationError extends Error {
  constructor(message: string, readonly retryable: boolean) {
    super(message);
    this.name = "GeminiGenerationError";
  }
}

function delay(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
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

export function normalizeLessonDraft(value: unknown): LessonDraft {
  const parsed = rawLessonDraftSchema.safeParse(value);
  if (!parsed.success) {
    const fields = [...new Set(parsed.error.issues.map((issue) => issue.path.join(".")))]
      .filter((field) => field.length > 0)
      .join(", ");
    throw new GeminiGenerationError(
      `La lección de Gemini tiene campos inválidos${fields.length > 0 ? `: ${fields}` : ""}`,
      true,
    );
  }

  const markdownWithMarker = parsed.data.markdown.trim().replaceAll("\r\n", "\n");
  if (!markdownWithMarker.endsWith(`\n${completionMarker}`)) {
    throw new GeminiGenerationError("La lección de Gemini no tiene la marca final", true);
  }
  const markdown = markdownWithMarker.slice(0, -completionMarker.length).trimEnd();
  if (markdown.includes(completionMarker)) {
    throw new GeminiGenerationError("La lección de Gemini repite la marca final", true);
  }
  const headings = [...markdown.matchAll(/^## ([^\n]+)$/gm)];
  const expectedHeadings = lessonHeadings.map((heading) => `## ${heading}`);
  if (headings.length !== expectedHeadings.length || headings.some(
    (match, index) => match[0] !== expectedHeadings[index],
  )) {
    throw new GeminiGenerationError("La lección de Gemini no tiene las cinco secciones en orden", true);
  }
  const sections = headings.map((match, index) => {
    const start = (match.index ?? 0) + match[0].length;
    const end = headings[index + 1]?.index ?? markdown.length;
    return markdown.slice(start, end).trim();
  });
  if (sections.some((section) => section.length === 0)) {
    throw new GeminiGenerationError("La lección de Gemini tiene una sección vacía", true);
  }
  const checks = (sections[3] ?? "").split("\n");
  const questionIndices = checks.flatMap((line, index) =>
    /^\d+\.\s+\S/.test(line.trim()) ? [index] : []
  );
  const [firstQuestion, secondQuestion] = questionIndices;
  const hasResponse = (lines: string[]): boolean => lines.some(
    (line) => /^Respuesta:\s+\S/.test(line.trim()),
  );
  if (
    questionIndices.length !== 2 || firstQuestion === undefined || secondQuestion === undefined
    || !/^1\.\s+\S/.test(checks[firstQuestion]?.trim() ?? "")
    || !/^2\.\s+\S/.test(checks[secondQuestion]?.trim() ?? "")
    || !hasResponse(checks.slice(firstQuestion + 1, secondQuestion))
    || !hasResponse(checks.slice(secondQuestion + 1))
  ) {
    throw new GeminiGenerationError("La lección de Gemini no tiene dos comprobaciones respondidas", true);
  }
  if (!/[.!?]$/u.test(sections[4] ?? "")) {
    throw new GeminiGenerationError("La lección de Gemini no termina con un cierre completo", true);
  }
  if ((markdown.match(/^```/gm)?.length ?? 0) % 2 !== 0) {
    throw new GeminiGenerationError("La lección de Gemini deja un bloque de código abierto", true);
  }
  if (markdown.split(/\s+/u).length < minimumLessonWords) {
    throw new GeminiGenerationError(`La lección de Gemini tiene menos de ${minimumLessonWords} palabras`, true);
  }

  const draft = {
    title: truncateAtWord(parsed.data.title, 159),
    summary: truncateAtWord(parsed.data.summary, 599),
    markdown,
  };
  if (draft.title.length === 0 || draft.summary.length === 0) {
    throw new GeminiGenerationError(
      "La lección de Gemini está vacía o es demasiado breve",
      true,
    );
  }
  return draft;
}

async function requestLessonDraft(
  options: GenerateWithGeminiOptions,
): Promise<LessonDraft> {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(options.model)}:generateContent`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": options.apiKey,
    },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: options.prompt }] }],
      generationConfig: {
        // Este valor ya se usaba con 2.5 para reducir adornos e improvisación.
        temperature: 0.2,
        maxOutputTokens: options.maxOutputTokens,
        // En 2.5 el razonamiento comparte el límite de salida con el JSON.
        thinkingConfig: { thinkingBudget: 1024 },
        responseMimeType: "application/json",
        responseJsonSchema: {
          type: "object",
          additionalProperties: false,
          required: ["title", "summary", "markdown"],
          properties: {
            title: { type: "string", description: "Título de la lección" },
            summary: { type: "string", description: "Resumen de hasta 600 caracteres" },
            markdown: { type: "string", description: "Lección completa en Markdown" },
          },
        },
      },
    }),
    signal: AbortSignal.timeout(options.timeoutSeconds * 1_000),
  });

  if (!response.ok) {
    const retryable = response.status === 429 || response.status >= 500;
    throw new GeminiGenerationError(
      `Gemini respondió HTTP ${response.status}`,
      retryable,
    );
  }

  const payload: unknown = await response.json();
  const parsed = geminiResponseSchema.safeParse(payload);
  if (!parsed.success) {
    throw new GeminiGenerationError(
      "Gemini devolvió una respuesta sin contenido utilizable",
      true,
    );
  }

  const candidate = parsed.data.candidates[0];
  if (candidate?.finishReason === undefined) {
    throw new GeminiGenerationError("Gemini no informó el motivo de finalización", true);
  }
  if (candidate.finishReason !== "STOP") {
    const retryable = ["MAX_TOKENS", "OTHER", "FINISH_REASON_UNSPECIFIED"].includes(
      candidate.finishReason,
    );
    throw new GeminiGenerationError(
      `Gemini terminó la respuesta con ${candidate.finishReason}`,
      retryable,
    );
  }

  const text = candidate?.content?.parts.map((part) => part.text).join("");
  if (text === undefined || text.trim().length === 0) {
    throw new GeminiGenerationError("Gemini devolvió contenido vacío", true);
  }

  let json: unknown;
  try {
    json = JSON.parse(text);
  } catch {
    throw new GeminiGenerationError("Gemini devolvió JSON inválido", true);
  }

  return normalizeLessonDraft(json);
}

export async function generateWithGemini(
  options: GenerateWithGeminiOptions,
): Promise<LessonDraft> {
  const maximumAttempts = 3;
  for (let attempt = 1; attempt <= maximumAttempts; attempt += 1) {
    try {
      return await requestLessonDraft(options);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Error inesperado de Gemini";
      const retryable = error instanceof GeminiGenerationError
        ? error.retryable
        : true;

      if (!retryable || attempt === maximumAttempts) {
        throw new Error(`${message} después de ${attempt} intento(s)`);
      }

      const waitMilliseconds = attempt * 1_000;
      console.warn(
        `${message}; reintento ${attempt + 1}/${maximumAttempts} en ${waitMilliseconds / 1_000}s`,
      );
      await delay(waitMilliseconds);
    }
  }

  throw new Error("Gemini agotó los intentos de generación");
}
