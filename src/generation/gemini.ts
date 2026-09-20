import { z } from "zod";

const lessonDraftSchema = z.strictObject({
  title: z.string().trim().min(1).max(160),
  summary: z.string().trim().min(1).max(600),
  markdown: z.string().trim().min(200),
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

export type LessonDraft = z.infer<typeof lessonDraftSchema>;

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
        // Un valor bajo reduce adornos e improvisación.
        temperature: 0.2,
        maxOutputTokens: options.maxOutputTokens,
        // En Gemini 2.5 el límite de salida incluye el razonamiento interno.
        // Acotarlo deja espacio para que la respuesta JSON se cierre.
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
  if (candidate?.finishReason !== undefined && candidate.finishReason !== "STOP") {
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

  const draft = lessonDraftSchema.safeParse(json);
  if (!draft.success) {
    throw new GeminiGenerationError(
      "La lección de Gemini no cumple el formato requerido",
      true,
    );
  }
  return draft.data;
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
