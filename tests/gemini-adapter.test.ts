import { afterEach, describe, expect, it, vi } from "vitest";

import { generateWithGemini } from "../src/generation/gemini.js";
import { completeLessonMarkdown } from "./lesson-draft-fixture.js";

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("solicitud a Gemini 2.5 Flash", () => {
  it("restaura el presupuesto de razonamiento y conserva el contrato JSON de la lección", async () => {
    let requestedEndpoint = "";
    let requestBody: unknown;
    vi.stubGlobal("fetch", async (endpoint: string, init: RequestInit) => {
      requestedEndpoint = endpoint;
      requestBody = JSON.parse(String(init.body));
      return new Response(JSON.stringify({
        candidates: [{
          finishReason: "STOP",
          content: { parts: [{ text: JSON.stringify({
            title: "Título de prueba",
            summary: "Resumen de prueba",
            markdown: completeLessonMarkdown(),
          }) }] },
        }],
      }), { status: 200 });
    });

    const draft = await generateWithGemini({
      apiKey: "clave-de-prueba",
      model: "gemini-2.5-flash",
      prompt: "Escribí una lección de prueba",
      timeoutSeconds: 5,
      maxOutputTokens: 8192,
    });

    expect(requestedEndpoint).toContain("/models/gemini-2.5-flash:generateContent");
    expect(requestBody).toMatchObject({
      generationConfig: {
        temperature: 0.2,
        thinkingConfig: { thinkingBudget: 1024 },
        responseMimeType: "application/json",
        responseJsonSchema: {
          required: ["title", "summary", "markdown"],
        },
      },
    });
    expect(JSON.stringify(requestBody)).not.toContain("thinkingLevel");
    expect(draft.title).toBe("Título de prueba");
    expect(draft.markdown.split(/\s+/u).length).toBeGreaterThanOrEqual(900);
    expect(draft.markdown).not.toContain("[[FIN_LECCION]]");
  });

  it("reintenta una respuesta cerrada en JSON pero incompleta como lección", async () => {
    let calls = 0;
    vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.stubGlobal("fetch", async () => {
      calls += 1;
      const markdown = calls === 1
        ? completeLessonMarkdown().replace("## Cierre", "## Sin cierre")
        : completeLessonMarkdown();
      return new Response(JSON.stringify({
        candidates: [{
          finishReason: "STOP",
          content: { parts: [{ text: JSON.stringify({
            title: "Título de prueba",
            summary: "Resumen de prueba",
            markdown,
          }) }] },
        }],
      }), { status: 200 });
    });

    const draft = await generateWithGemini({
      apiKey: "clave-de-prueba",
      model: "gemini-2.5-flash",
      prompt: "Lección de prueba",
      timeoutSeconds: 5,
      maxOutputTokens: 8192,
    });

    expect(calls).toBe(2);
    expect(draft.markdown).toContain("## Cierre");
    expect(draft.markdown).not.toContain("[[FIN_LECCION]]");
  });

  it("no acepta una respuesta sin motivo de finalización", async () => {
    let calls = 0;
    vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.stubGlobal("fetch", async () => {
      calls += 1;
      return new Response(JSON.stringify({
        candidates: [{
          ...(calls === 2 ? { finishReason: "STOP" } : {}),
          content: { parts: [{ text: JSON.stringify({
            title: "Título de prueba",
            summary: "Resumen de prueba",
            markdown: completeLessonMarkdown(),
          }) }] },
        }],
      }), { status: 200 });
    });

    await generateWithGemini({
      apiKey: "clave-de-prueba",
      model: "gemini-2.5-flash",
      prompt: "Lección de prueba",
      timeoutSeconds: 5,
      maxOutputTokens: 8192,
    });

    expect(calls).toBe(2);
  });

  it("espacia los HTTP 503 y no reintenta errores permanentes", async () => {
    vi.useFakeTimers();
    vi.spyOn(Math, "random").mockReturnValue(0);
    vi.spyOn(console, "warn").mockImplementation(() => {});
    let calls = 0;
    vi.stubGlobal("fetch", async () => {
      calls += 1;
      if (calls < 3) return new Response("No disponible", { status: 503 });
      return new Response(JSON.stringify({
        candidates: [{
          finishReason: "STOP",
          content: { parts: [{ text: JSON.stringify({
            title: "Título", summary: "Resumen", markdown: completeLessonMarkdown(),
          }) }] },
        }],
      }), { status: 200 });
    });

    const request = generateWithGemini({
      apiKey: "clave-de-prueba", model: "gemini-2.5-flash", prompt: "Lección",
      timeoutSeconds: 5, maxOutputTokens: 8192,
    });
    await vi.advanceTimersByTimeAsync(0);
    expect(calls).toBe(1);
    await vi.advanceTimersByTimeAsync(10_000);
    expect(calls).toBe(2);
    await vi.advanceTimersByTimeAsync(20_000);
    await request;
    expect(calls).toBe(3);

    vi.stubGlobal("fetch", async () => new Response("Solicitud inválida", { status: 400 }));
    await expect(generateWithGemini({
      apiKey: "clave-de-prueba", model: "gemini-2.5-flash", prompt: "Lección",
      timeoutSeconds: 5, maxOutputTokens: 8192,
    })).rejects.toThrow("HTTP 400 después de 1 intento(s)");
  });
});
