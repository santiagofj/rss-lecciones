import type { LessonFormat } from "../src/courses/types.js";
import { lessonSections } from "../src/generation/prompt.js";

// Borradores completos para las pruebas del generador y del sitio.
const explanation = "Este ejemplo explica el concepto con precisión y muestra cómo aplicarlo en un caso concreto. ";

export function completeLessonMarkdown(): string {
  return [
    "## Por qué ahora",
    explanation.repeat(10),
    "## Explicación y ejemplo",
    explanation.repeat(48),
    "## Práctica",
    explanation.repeat(12),
    "## Comprobaciones",
    "1. ¿Cuál es la idea principal?\nRespuesta: La aplicación concreta del concepto.",
    "2. ¿Cómo se verifica el resultado?\nRespuesta: Se compara con el ejemplo explicado.",
    "## Cierre",
    "La siguiente lección profundizará en otra aplicación del mismo concepto.",
    "[[FIN_LECCION]]",
  ].join("\n\n");
}

export function expositoryLessonMarkdown(developmentParagraphs = 50): string {
  return [
    "## Contexto histórico y conceptual",
    "El problema se sitúa en el debate sobre la relación entre saber y poder.",
    "## Desarrollo",
    "### El ejercicio del poder",
    "¿Cómo se vinculan el saber y las instituciones? El análisis estudia cómo una práctica produce categorías mediante las cuales una institución observa y clasifica.\n\n"
      .repeat(developmentParagraphs)
      .trimEnd(),
    "## Cierre",
    "La distinción permite comprender el papel de las instituciones en el argumento.",
    "[[FIN_LECCION]]",
  ].join("\n\n");
}

export function structuredLesson(markdown: string, format: LessonFormat = "guided") {
  const bodies = markdown.replace("[[FIN_LECCION]]", "").split(/^## .+$/mu).slice(1);
  return {
    title: "Título de prueba",
    summary: "Resumen de prueba",
    sections: Object.fromEntries(Object.keys(lessonSections[format]).map((key, index) => [key, bodies[index]?.trim()])),
  };
}

export function groqResponse(value: unknown, finishReason: string | null = "stop", headers?: HeadersInit): Response {
  return Response.json({
    choices: [{ finish_reason: finishReason, message: { content: JSON.stringify(value) } }],
    usage: { total_tokens: 1 },
  }, headers === undefined ? {} : { headers });
}
