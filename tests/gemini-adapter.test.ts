import { afterEach, describe, expect, it, vi } from "vitest";

import { generateWithGemini } from "../src/generation/gemini.js";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("solicitud a Gemini 3.8 Flash", () => {
  it("usa razonamiento compatible y conserva el contrato JSON de la lección", async () => {
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
            markdown: "Explicación y práctica. ".repeat(20),
          }) }] },
        }],
      }), { status: 200 });
    });

    const draft = await generateWithGemini({
      apiKey: "clave-de-prueba",
      model: "gemini-3.8-flash",
      prompt: "Escribí una lección de prueba",
      timeoutSeconds: 5,
      maxOutputTokens: 8192,
    });

    expect(requestedEndpoint).toContain("/models/gemini-3.8-flash:generateContent");
    expect(requestBody).toMatchObject({
      generationConfig: {
        thinkingConfig: { thinkingLevel: "medium" },
        responseMimeType: "application/json",
        responseJsonSchema: {
          required: ["title", "summary", "markdown"],
        },
      },
    });
    expect(JSON.stringify(requestBody)).not.toContain("thinkingBudget");
    expect(JSON.stringify(requestBody)).not.toContain("temperature");
    expect(draft.title).toBe("Título de prueba");
    expect(draft.markdown.length).toBeGreaterThanOrEqual(200);
  });
});
