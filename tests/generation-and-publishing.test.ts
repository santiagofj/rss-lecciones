import { describe, expect, it } from "vitest";

import type { CourseConfig } from "../src/courses/types.js";
import { normalizeLessonDraft } from "../src/generation/gemini.js";
import { isScheduledForDate, localCalendarDate } from "../src/generation/schedule.js";
import { renderMarkdown } from "../src/publishing/markdown.js";
import { completeLessonMarkdown } from "./lesson-draft-fixture.js";

const dailyCourse: CourseConfig = {
  schemaVersion: 1,
  id: "5f51a9d5-423d-46b1-8548-12876be8f8b8",
  slug: "curso",
  title: "Curso",
  description: "Descripción",
  status: "active",
  language: "es-AR",
  timezone: "America/Argentina/Buenos_Aires",
  schedule: {
    type: "weekly",
    startDate: "2026-09-19",
    days: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
  },
  feed: true,
  teaching: { audience: "Alumno", instructions: "Explicar con claridad" },
};

describe("programación diaria", () => {
  it("usa la fecha de Buenos Aires en el límite UTC", () => {
    const instant = new Date("2026-09-20T02:30:00.000Z");
    expect(localCalendarDate(instant, dailyCourse.timezone)).toBe("2026-09-19");
    expect(isScheduledForDate(dailyCourse, instant)).toBe(true);
  });
});

describe("publicación segura de Markdown", () => {
  it("escapa HTML producido por el modelo y conserva estructura básica", () => {
    const html = renderMarkdown("## Tema\n\n<script>alert(1)</script>\n\n- **Práctica**");
    expect(html).toContain("<h2>Tema</h2>");
    expect(html).toContain("&lt;script&gt;alert(1)&lt;/script&gt;");
    expect(html).not.toContain("<script>");
    expect(html).toContain("<strong>Práctica</strong>");
  });
});

describe("normalización de respuestas de Gemini", () => {
  it("recorta metadatos extensos sin descartar una lección válida", () => {
    const draft = normalizeLessonDraft({
      title: `Título ${"extenso ".repeat(30)}`,
      summary: `Resumen ${"académico ".repeat(80)}`,
      markdown: completeLessonMarkdown(),
      campoNoSolicitado: "se ignora",
    });

    expect(draft.title.length).toBeLessThanOrEqual(160);
    expect(draft.summary.length).toBeLessThanOrEqual(600);
    expect(draft.markdown.split(/\s+/u).length).toBeGreaterThanOrEqual(900);
    expect(draft.markdown).not.toContain("[[FIN_LECCION]]");
  });

  it("rechaza respuestas cortas o sin cierre sin alterar archivos", () => {
    const valid = completeLessonMarkdown();
    const metadata = { title: "Título", summary: "Resumen" };
    expect(() => normalizeLessonDraft({ ...metadata, markdown: valid.replaceAll(
      "Este ejemplo explica el concepto con precisión y muestra cómo aplicarlo en un caso concreto.",
      "Breve.",
    ) }))
      .toThrow("menos de 900 palabras");
    expect(normalizeLessonDraft({ ...metadata, markdown: valid.replace("[[FIN_LECCION]]", "") }).markdown)
      .toContain("## Cierre");
    expect(() => normalizeLessonDraft({ ...metadata, markdown: valid.replace(
      "## Práctica", "[[FIN_LECCION]]\n## Práctica",
    ) }))
      .toThrow("marca final fuera del cierre");
    expect(() => normalizeLessonDraft({ ...metadata, markdown: valid.replace("## Práctica", "## Ejercicio") }))
      .toThrow("no tiene las cinco secciones");
    expect(() => normalizeLessonDraft({ ...metadata, markdown: valid.replace("Respuesta: Se compara", "Solución: Se compara") }))
      .toThrow("no tiene dos comprobaciones");
    expect(() => normalizeLessonDraft({ ...metadata, markdown: valid.replace(
      "## Cierre", "3. ¿Pregunta extra?\nRespuesta: Extra.\n\n## Cierre",
    ) }))
      .toThrow("no tiene dos comprobaciones");
    expect(() => normalizeLessonDraft({ ...metadata, markdown: valid.replace(
      "## Práctica", "```ts\nconst valor = 1;\n\n## Práctica",
    ) }))
      .toThrow("bloque de código abierto");
  });
});
