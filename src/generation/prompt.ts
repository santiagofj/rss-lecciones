import type { LoadedCourse, Lesson } from "../courses/types.js";

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

El campo markdown debe contener, en este orden:
1. Por qué vemos este tema ahora.
2. Una explicación gradual con un ejemplo concreto.
3. Una práctica breve que el alumno pueda realizar hoy.
4. Dos comprobaciones con sus respuestas al final, para autoevaluarse.
5. Un cierre de dos o tres líneas que conecte con el próximo paso sin anticipar toda la lección.

Extensión orientativa: entre 900 y 1400 palabras. Completa todas las secciones dentro de ese límite.

No incluyas frontmatter YAML, HTML, saludos genéricos ni referencias a este pedido. No inventes resultados que el alumno todavía no realizó. No utilices los caracteres de exclamación de apertura o cierre. Devuelve sólo el objeto JSON solicitado.`;
}
