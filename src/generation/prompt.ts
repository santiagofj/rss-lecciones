import type { LoadedCourse, Lesson } from "../courses/types.js";

export const LESSON_PROMPT_VERSION = "v2";

type Step = LoadedCourse["syllabus"]["frontmatter"]["steps"][number];

type PromptInput = {
  course: LoadedCourse;
  step: Step;
  recentLessons: Lesson[];
};

export function buildLessonPrompt(input: PromptInput): string {
  const { course, step, recentLessons } = input;
  const recentContext = recentLessons.length === 0
    ? "No hay lecciones previas en este nuevo feed."
    : recentLessons.map((lesson) => (
      `- Lección ${lesson.frontmatter.sequence}: ${lesson.frontmatter.title}. ${lesson.frontmatter.summary}`
    )).join("\n");

  return `Eres el docente de un curso personal progresivo publicado por RSS.

Curso: ${course.config.title}
Descripción: ${course.config.description}
Audiencia: ${course.config.teaching.audience}
Indicaciones pedagógicas: ${course.config.teaching.instructions}
Contexto del alumno: ${course.progress.learnerContext}

Paso actual del temario:
- Título: ${step.title}
- Objetivo observable: ${step.objective}
- Alcance: ${step.brief}

Contexto reciente:
${recentContext}

Escribe una única lección en español claro y neutral, dirigida a una persona adulta. Debe poder leerse de forma independiente desde un lector RSS y mantener el foco en el objetivo actual.

Registro obligatorio:
- Usa un tono profesional, sobrio, preciso y didáctico.
- No uses signos de exclamación, emojis, bromas, frases motivacionales ni preguntas retóricas.
- Evita expresiones coloquiales como "vamos", "genial", "ojo con esto", "acá está la magia", "tranquilo" o equivalentes.
- No infantilices al lector ni exageres la importancia de una idea.
- Prefiere oraciones directas y vocabulario técnico explicado con naturalidad.

El campo markdown debe contener estas cinco secciones, en este orden y con estos encabezados exactos:
## Por qué ahora
## Explicación y ejemplo
## Práctica
## Comprobaciones
## Cierre

En "Explicación y ejemplo", desarrolla el concepto de forma gradual con un ejemplo concreto. En "Práctica", propone una tarea que el alumno pueda realizar hoy. En "Comprobaciones", escribe exactamente dos preguntas numeradas como "1." y "2."; tras cada una, escribe una línea que empiece por "Respuesta:" con la solución. En "Cierre", escribe dos o tres líneas que conecten con el próximo paso sin anticipar toda la lección.

Extensión orientativa: entre 1000 y 1500 palabras. Desarrolla el contenido sin relleno y completa todas las secciones. Una lección de menos de 900 palabras se rechazará.

La última línea del campo markdown debe ser exactamente [[FIN_LECCION]]. Es una marca técnica de finalización: no la expliques ni la incluyas en otra parte del texto.

No incluyas frontmatter YAML, HTML, saludos genéricos ni referencias a este pedido. No inventes resultados que el alumno todavía no realizó. No utilices los caracteres de exclamación de apertura o cierre. Devuelve sólo el objeto JSON solicitado.`;
}
