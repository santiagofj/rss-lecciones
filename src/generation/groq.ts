import { z } from "zod";

import type { SiteConfig } from "../courses/types.js";

const completionSchema = z.object({
  choices: z.array(z.object({
    finish_reason: z.enum(["stop", "length", "content_filter", "tool_calls"]),
    message: z.object({ content: z.string().nullable() }),
  })).min(1),
  usage: z.object({ total_tokens: z.number().positive() }).optional(),
});
const rejectedGenerationSchema = z.object({
  error: z.object({
    code: z.enum(["json_validate_failed", "tool_use_failed"]),
  }),
});
const maxWait = 120_000;

function delay(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export class ProviderError extends Error {
  constructor(
    message: string,
    readonly retryable = true,
    readonly waitMilliseconds?: number,
  ) {
    super(message);
  }
}

class RejectedJsonError extends ProviderError {
  constructor() {
    super("Groq rechazó el contenido generado (json_validate_failed)");
  }
}

export function httpError(provider: string, response: Response): ProviderError {
  const retryAfter = response.headers.get("retry-after");
  const wait = retryAfter !== null && /^\d{1,6}$/u.test(retryAfter)
    ? Number(retryAfter) * 1_000
    : 0;
  const transient = response.status === 408 || response.status === 429 || response.status >= 500;
  return new ProviderError(
    `${provider} respondió HTTP ${response.status}`,
    transient && wait <= maxWait,
    transient ? Math.max(wait, 10_000) : undefined,
  );
}

export async function retryGeneration<T>(
  operation: () => Promise<T>,
  prepareRetry?: (error: unknown) => void,
): Promise<T> {
  for (let attempt = 1; ; attempt += 1) {
    try {
      return await operation();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Error inesperado de generación";
      const providerError = error instanceof ProviderError ? error : undefined;
      if (attempt === 3 || providerError?.retryable === false) {
        throw new Error(`${message} después de ${attempt} intento(s)`);
      }
      prepareRetry?.(error);
      const transient = providerError?.waitMilliseconds !== undefined;
      const baseWait = transient ? 10_000 * 2 ** (attempt - 1) : attempt * 1_000;
      const jitter = transient ? Math.floor(Math.random() * baseWait * 0.2) : 0;
      const wait = Math.max(baseWait + jitter, providerError?.waitMilliseconds ?? 0);
      console.warn(`${message}; reintento ${attempt + 1}/3 en ${Math.ceil(wait / 1_000)}s`);
      await delay(wait);
    }
  }
}

export function retryStructuredGeneration<T>(
  operation: (strict: boolean) => Promise<T>,
  prepareRetry?: (error: unknown) => void,
): Promise<T> {
  let strict = true;
  return retryGeneration(() => operation(strict), (error) => {
    if (error instanceof RejectedJsonError) strict = false;
    prepareRetry?.(error);
  });
}

export class GroqClient {
  private nextRequestAt = 0;
  private quotaError?: ProviderError;

  constructor(
    private readonly apiKey: string,
    private readonly config: SiteConfig["generation"],
  ) {}

  async structured<T extends z.ZodType>(
    prompt: string, name: string, schema: T, strict: boolean,
  ): Promise<{ value: z.output<T>; promptUsed: string }> {
    const { $schema: _schema, ...jsonSchema } = z.toJSONSchema(schema);
    const promptUsed = strict ? prompt
      : `${prompt}\n\nDevuelve únicamente un objeto JSON conforme a este esquema. Escapa los saltos de línea de las cadenas.\n${JSON.stringify(jsonSchema)}`;
    this.checkInputSize(promptUsed);
    if (this.quotaError !== undefined) throw this.quotaError;
    const wait = this.nextRequestAt - Date.now();
    if (wait > 0) await delay(wait);

    let response: Response;
    try {
      response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: { Authorization: `Bearer ${this.apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model: this.config.model,
          messages: [{ role: "user", content: promptUsed }],
          max_completion_tokens: this.config.maxOutputTokens,
          reasoning_effort: "medium",
          include_reasoning: false,
          response_format: strict
            ? { type: "json_schema", json_schema: { name, strict: true, schema: jsonSchema } }
            : { type: "json_object" },
        }),
        signal: AbortSignal.timeout(this.config.timeoutSeconds * 1_000),
      });
    } catch {
      throw new ProviderError("No se pudo conectar con Groq", true, 10_000);
    }
    if (!response.ok) {
      if (response.status === 400) {
        // Some incomplete generations arrive as a client error with a rejected draft.
        const payload: unknown = await response.json().catch(() => null);
        const rejected = rejectedGenerationSchema.safeParse(payload);
        if (rejected.success) {
          if (rejected.data.error.code === "json_validate_failed") throw new RejectedJsonError();
          throw new ProviderError(`Groq rechazó el contenido generado (${rejected.data.error.code})`);
        }
      }
      const error = httpError("Groq", response);
      if (response.status === 429 && (!error.retryable || response.headers.get("x-ratelimit-remaining-requests") === "0")) {
        this.quotaError = new ProviderError("Groq respondió HTTP 429 y la cuota no se recupera dentro del lote", false);
        throw this.quotaError;
      }
      throw error;
    }

    const payload: unknown = await response.json().catch(() => null);
    const result = completionSchema.safeParse(payload);
    if (!result.success) throw new ProviderError("Groq devolvió una respuesta sin contenido utilizable");
    const choice = result.data.choices[0];
    // Repartir el consumo medido a lo largo de la ventana de tokens del plan Free.
    const tokenLimit = Number(response.headers.get("x-ratelimit-limit-tokens")) || 8_000;
    const used = result.data.usage?.total_tokens ?? this.config.maxOutputTokens;
    this.nextRequestAt = Date.now() + Math.ceil(used * 60_000 / tokenLimit);
    if (choice?.finish_reason !== "stop" || !choice.message.content) {
      throw new ProviderError("Groq no terminó una respuesta completa", choice?.finish_reason !== "content_filter");
    }

    let value: unknown;
    try {
      value = JSON.parse(choice.message.content);
    } catch {
      throw new ProviderError("Groq devolvió JSON inválido");
    }
    const parsed = schema.safeParse(value);
    if (!parsed.success) throw new ProviderError("La respuesta de Groq no cumple el esquema");
    return { value: parsed.data, promptUsed };
  }

  checkInputSize(prompt: string): void {
    if (Buffer.byteLength(prompt, "utf8") > this.config.maxInputBytes) {
      throw new ProviderError(`El contexto supera el máximo de ${this.config.maxInputBytes} bytes`, false);
    }
  }
}
