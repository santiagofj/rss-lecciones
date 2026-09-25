import { afterEach, describe, expect, it, vi } from "vitest";

import { generateWithGemini } from "../src/generation/gemini.js";
import { completeLessonMarkdown } from "./lesson-draft-fixture.js";

function successfulResponse(markdown: string): Response {
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
}

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
      maxInputBytes: 65536,
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
      maxInputBytes: 65536,
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
      maxInputBytes: 65536,
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
      timeoutSeconds: 5, maxOutputTokens: 8192, maxInputBytes: 65536,
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
      timeoutSeconds: 5, maxOutputTokens: 8192, maxInputBytes: 65536,
    })).rejects.toThrow("HTTP 400 después de 1 intento(s)");
  });

  it("amplía un borrador corto en el segundo intento sin bajar el mínimo", async () => {
    vi.useFakeTimers();
    vi.spyOn(Math, "random").mockReturnValue(0);
    const warnings: string[] = [];
    vi.spyOn(console, "warn").mockImplementation((message: string) => { warnings.push(message); });
    const shortMarkdown = completeLessonMarkdown().replaceAll(
      "Este ejemplo explica el concepto con precisión y muestra cómo aplicarlo en un caso concreto.",
      "Este ejemplo explica el concepto.",
    );
    const prompts: string[] = [];
    vi.stubGlobal("fetch", async (_endpoint: string, init: RequestInit) => {
      const body = JSON.parse(String(init.body)) as { contents: { parts: { text: string }[] }[] };
      prompts.push(body.contents[0]?.parts[0]?.text ?? "");
      return successfulResponse(prompts.length === 1 ? shortMarkdown : completeLessonMarkdown());
    });

    const request = generateWithGemini({
      apiKey: "clave-de-prueba", model: "gemini-2.5-flash", prompt: "Lección original",
      timeoutSeconds: 5, maxOutputTokens: 8192, maxInputBytes: 65536,
    });
    await vi.advanceTimersByTimeAsync(0);
    expect(prompts).toHaveLength(1);
    await vi.advanceTimersByTimeAsync(10_000);
    const draft = await request;

    expect(prompts).toHaveLength(2);
    expect(prompts[1]).toContain("Lección original");
    expect(prompts[1]).toContain("Este ejemplo explica el concepto.");
    expect(prompts[1]).toContain("Amplía esa misma lección");
    expect(prompts[1]).toMatch(/tiene \d+ palabras/u);
    expect(draft.promptUsed).toBe(prompts[1]);
    expect(draft.markdown.split(/\s+/u).length).toBeGreaterThanOrEqual(900);
    expect(warnings.join(" ")).not.toContain("Este ejemplo explica el concepto");
  });

  it("tras dos borradores cortos y un 429 agota tres llamadas sin aceptar ninguno", async () => {
    vi.useFakeTimers();
    vi.spyOn(Math, "random").mockReturnValue(0);
    vi.spyOn(console, "warn").mockImplementation(() => {});
    const shortMarkdown = completeLessonMarkdown().replaceAll(
      "Este ejemplo explica el concepto con precisión y muestra cómo aplicarlo en un caso concreto.",
      "Este ejemplo explica el concepto.",
    );
    let calls = 0;
    vi.stubGlobal("fetch", async () => {
      calls += 1;
      return calls < 3
        ? successfulResponse(shortMarkdown)
        : new Response("Cuota agotada", { status: 429 });
    });

    const request = generateWithGemini({
      apiKey: "clave-de-prueba", model: "gemini-2.5-flash", prompt: "Lección original",
      timeoutSeconds: 5, maxOutputTokens: 8192, maxInputBytes: 65536,
    });
    const outcome = expect(request).rejects.toThrow("HTTP 429 después de 3 intento(s)");
    await vi.advanceTimersByTimeAsync(30_000);
    await outcome;
    expect(calls).toBe(3);
  });

  it("respeta Retry-After y sólo informa una clasificación segura del 429", async () => {
    vi.useFakeTimers();
    vi.spyOn(Math, "random").mockReturnValue(0);
    const warnings: string[] = [];
    vi.spyOn(console, "warn").mockImplementation((message: string) => { warnings.push(message); });
    let calls = 0;
    vi.stubGlobal("fetch", async () => {
      calls += 1;
      if (calls === 1) {
        return new Response(JSON.stringify({
          error: {
            status: "RESOURCE_EXHAUSTED",
            message: "No registrar este detalle privado ni clave-de-prueba",
            details: [{ violations: [{ quotaId: "GenerateRequestsPerMinute-FreeTier" }] }],
          },
        }), { status: 429, headers: { "Retry-After": "45" } });
      }
      return successfulResponse(completeLessonMarkdown());
    });

    const request = generateWithGemini({
      apiKey: "clave-de-prueba", model: "gemini-2.5-flash", prompt: "Lección original",
      timeoutSeconds: 5, maxOutputTokens: 8192, maxInputBytes: 65536,
    });
    await vi.advanceTimersByTimeAsync(0);
    expect(calls).toBe(1);
    await vi.advanceTimersByTimeAsync(44_000);
    expect(calls).toBe(1);
    await vi.advanceTimersByTimeAsync(1_000);
    await request;

    expect(calls).toBe(2);
    expect(warnings.join(" ")).toContain("GenerateRequestsPerMinute-FreeTier");
    expect(warnings.join(" ")).not.toContain("clave-de-prueba");
    expect(warnings.join(" ")).not.toContain("detalle privado");
  });

  it("no envía la ampliación si excede el límite de contexto", async () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    const shortMarkdown = completeLessonMarkdown().replaceAll(
      "Este ejemplo explica el concepto con precisión y muestra cómo aplicarlo en un caso concreto.",
      "Este ejemplo explica el concepto.",
    );
    let calls = 0;
    vi.stubGlobal("fetch", async () => {
      calls += 1;
      return successfulResponse(shortMarkdown);
    });

    await expect(generateWithGemini({
      apiKey: "clave-de-prueba", model: "gemini-2.5-flash", prompt: "Lección original",
      timeoutSeconds: 5, maxOutputTokens: 8192, maxInputBytes: 100,
    })).rejects.toThrow("La ampliación supera el máximo de 100 bytes");
    expect(calls).toBe(1);
  });
});
