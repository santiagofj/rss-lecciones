// Un borrador suficientemente largo para comprobar la aceptación sin llamar a Gemini.
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
