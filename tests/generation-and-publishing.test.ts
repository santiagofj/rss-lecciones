import { describe, expect, it } from "vitest";

import type { CourseConfig } from "../src/courses/types.js";
import { normalizeLessonDraft } from "../src/generation/gemini.js";
import { isScheduledForDate, localCalendarDate } from "../src/generation/schedule.js";
import { renderMarkdown } from "../src/publishing/markdown.js";

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
      markdown: "Contenido sustancial. ".repeat(20),
      campoNoSolicitado: "se ignora",
    });

    expect(draft.title.length).toBeLessThanOrEqual(160);
    expect(draft.summary.length).toBeLessThanOrEqual(600);
    expect(draft.markdown.length).toBeGreaterThanOrEqual(200);
  });
});
