import { afterEach, describe, expect, it, vi } from "vitest";

import type { LessonFormat } from "../src/courses/types.js";
import { GroqClient } from "../src/generation/groq.js";
import { generateWithGroq } from "../src/generation/lesson-draft.js";
import {
  completeLessonMarkdown, expositoryLessonMarkdown, groqResponse, structuredLesson,
} from "./lesson-draft-fixture.js";

const config = {
  model: "openai/gpt-oss-120b",
  timeoutSeconds: 5,
  maxOutputTokens: 4096,
  maxInputBytes: 65536,
  maxLessonsPerRun: 40,
};
const guidedLesson = structuredLesson(completeLessonMarkdown());
const shortLesson = structuredLesson(completeLessonMarkdown().replaceAll(
  "Este ejemplo explica el concepto con precisión y muestra cómo aplicarlo en un caso concreto.",
  "Este ejemplo explica el concepto.",
));

function generate(lessonFormat: LessonFormat = "guided", client = new GroqClient("clave-de-prueba", config)) {
  return generateWithGroq({ client, prompt: "Lección original", lessonFormat });
}

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("generación con Groq", () => {
  it.each([
    ["guided", completeLessonMarkdown(), "checks", "## Comprobaciones"],
    ["expository", expositoryLessonMarkdown(), "development", "## Desarrollo"],
  ] as const)("arma los encabezados del formato %s desde campos obligatorios", async (format, markdown, field, heading) => {
    const fetchMock = vi.fn(async (_url: string, _init: RequestInit) => groqResponse(structuredLesson(markdown, format)));
    vi.stubGlobal("fetch", fetchMock);

    const draft = await generate(format);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0] ?? [];
    expect(url).toBe("https://api.groq.com/openai/v1/chat/completions");
    expect(init?.headers).toMatchObject({ Authorization: "Bearer clave-de-prueba" });
    expect(JSON.parse(String(init?.body))).toMatchObject({
      model: config.model,
      reasoning_effort: "low",
      max_completion_tokens: config.maxOutputTokens,
      response_format: {
        type: "json_schema",
        json_schema: { strict: true, schema: {
          required: ["title", "summary", "sections"],
          additionalProperties: false,
          properties: { sections: { additionalProperties: false, required: expect.arrayContaining([field]) } },
        } },
      },
    });
    expect(draft.markdown).toContain(heading);
    expect(draft.markdown).not.toContain("[[FIN_LECCION]]");
  });

  it("reintenta una respuesta sin finalización y una respuesta sin una sección requerida", async () => {
    vi.useFakeTimers();
    const { closing: _closing, ...incompleteSections } = guidedLesson.sections;
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(groqResponse(guidedLesson, null))
      .mockResolvedValueOnce(groqResponse({ ...guidedLesson, sections: incompleteSections }))
      .mockResolvedValueOnce(groqResponse(guidedLesson));
    vi.stubGlobal("fetch", fetchMock);
    const result = generate();
    await vi.advanceTimersByTimeAsync(3_000);
    await expect(result).resolves.toHaveProperty("title", guidedLesson.title);
    expect(fetchMock).toHaveBeenCalledTimes(3);
  });

  it("espacia los HTTP 503 y descarta errores permanentes", async () => {
    vi.useFakeTimers();
    vi.spyOn(Math, "random").mockReturnValue(0);
    const fetchMock = vi.fn()
      .mockImplementationOnce(() => new Response("No disponible", { status: 503 }))
      .mockImplementationOnce(() => new Response("No disponible", { status: 503 }))
      .mockImplementationOnce(() => groqResponse(guidedLesson))
      .mockImplementationOnce(() => new Response("Solicitud inválida", { status: 400 }));
    vi.stubGlobal("fetch", fetchMock);
    const result = generate();
    await vi.advanceTimersByTimeAsync(0);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    await vi.advanceTimersByTimeAsync(10_000);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    await vi.advanceTimersByTimeAsync(20_000);
    await result;
    await expect(generate()).rejects.toThrow("HTTP 400 después de 1 intento(s)");
    expect(fetchMock).toHaveBeenCalledTimes(4);
  });

  it("amplía el borrador corto y audita el prompt aceptado", async () => {
    vi.useFakeTimers();
    vi.spyOn(Math, "random").mockReturnValue(0);
    const prompts: string[] = [];
    vi.stubGlobal("fetch", async (_url: string, init: RequestInit) => {
      const body = JSON.parse(String(init.body)) as { messages: { content: string }[] };
      prompts.push(body.messages[0]?.content ?? "");
      return groqResponse(prompts.length === 1 ? shortLesson : guidedLesson);
    });
    const result = generate();
    await vi.advanceTimersByTimeAsync(10_000);
    const draft = await result;
    expect(prompts).toHaveLength(2);
    expect(prompts[1]).toContain("Lección original");
    expect(prompts[1]).toContain("Este ejemplo explica el concepto.");
    expect(prompts[1]).toContain("Amplía esa misma lección");
    expect(draft.promptUsed).toBe(prompts[1]);
    expect(draft.markdown.split(/\s+/u).length).toBeGreaterThanOrEqual(900);
  });

  it("respeta Retry-After en 429 y evita mostrar el contenido privado del error", async () => {
    vi.useFakeTimers();
    const warnings = vi.spyOn(console, "warn").mockImplementation(() => {});
    const fetchMock = vi.fn()
      .mockImplementationOnce(() => new Response("detalle privado", { status: 429, headers: { "Retry-After": "45" } }))
      .mockImplementationOnce(() => groqResponse(guidedLesson));
    vi.stubGlobal("fetch", fetchMock);
    const result = generate();
    await vi.advanceTimersByTimeAsync(44_000);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    await vi.advanceTimersByTimeAsync(1_000);
    await result;
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(warnings.mock.calls.flat().join(" ")).not.toMatch(/detalle privado|clave-de-prueba/);
  });

  it("comparte el ritmo y la cuota agotada entre consultas del mismo lote", async () => {
    vi.useFakeTimers();
    const fetchMock = vi.fn()
      .mockImplementationOnce(() => Response.json({
        choices: [{ finish_reason: "stop", message: { content: JSON.stringify(guidedLesson) } }],
        usage: { total_tokens: 4_000 },
      }))
      .mockImplementationOnce(() => new Response("", { status: 429, headers: { "Retry-After": "3600" } }));
    vi.stubGlobal("fetch", fetchMock);
    const client = new GroqClient("clave-de-prueba", config);
    await generate("guided", client);
    const blocked = expect(generate("guided", client)).rejects.toThrow("la cuota no se recupera");
    await vi.advanceTimersByTimeAsync(29_999);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    await vi.advanceTimersByTimeAsync(1);
    await blocked;
    await expect(generate("guided", client)).rejects.toThrow("la cuota no se recupera");
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("rechaza la ampliación que excede el límite antes de hacer otra llamada", async () => {
    const fetchMock = vi.fn(async () => groqResponse(shortLesson));
    vi.stubGlobal("fetch", fetchMock);
    const client = new GroqClient("clave-de-prueba", { ...config, maxInputBytes: 100 });
    await expect(generate("guided", client)).rejects.toThrow("El contexto supera el máximo de 100 bytes");
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
