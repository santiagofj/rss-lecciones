import { z } from "zod";

const lessonDraftSchema = z.strictObject({
  title: z.string().trim().min(1).max(160),
  summary: z.string().trim().min(1).max(600),
  markdown: z.string().trim().min(200),
});

const geminiResponseSchema = z.object({
  candidates: z.array(
    z.object({
      content: z.object({
        parts: z.array(z.object({ text: z.string() })).min(1),
      }),
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

export async function generateWithGemini(
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
        temperature: 0.5,
        maxOutputTokens: options.maxOutputTokens,
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
    throw new Error(`Gemini respondió HTTP ${response.status}`);
  }

  const payload: unknown = await response.json();
  const parsed = geminiResponseSchema.safeParse(payload);
  if (!parsed.success) {
    throw new Error("Gemini devolvió una respuesta sin contenido utilizable");
  }

  const text = parsed.data.candidates[0]?.content.parts
    .map((part) => part.text)
    .join("");
  if (text === undefined || text.trim().length === 0) {
    throw new Error("Gemini devolvió contenido vacío");
  }

  let json: unknown;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error("Gemini devolvió JSON inválido");
  }

  const draft = lessonDraftSchema.safeParse(json);
  if (!draft.success) {
    throw new Error("La lección de Gemini no cumple el formato requerido");
  }
  return draft.data;
}
