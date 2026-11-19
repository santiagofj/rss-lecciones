import type { LoadedCourse, Lesson, LessonFormat } from "../courses/types.js";

export const LESSON_PROMPT_VERSION = "v5";
export const EXPOSITORY_PROMPT_VERSION = "v6";

export const lessonSections = {
  guided: {
    whyNow: "Por qué ahora",
    explanation: "Explicación y ejemplo",
    practice: "Práctica",
    checks: "Comprobaciones",
    closing: "Cierre",
  },
  expository: {
    context: "Contexto histórico y conceptual",
    development: "Desarrollo",
    closing: "Cierre",
  },
} satisfies Record<LessonFormat, Record<string, string>>;

type Step = LoadedCourse["syllabus"]["frontmatter"]["steps"][number];

type PromptInput = {
  course: LoadedCourse;
  step: Step;
  recentLessons: Lesson[];
};

const formatInstructions = {
  guided: `En "Explicación y ejemplo", desarrolla el concepto de forma gradual con un ejemplo concreto. En "Práctica", propone una tarea que el alumno pueda realizar hoy. En "Comprobaciones", escribe exactamente dos preguntas numeradas como "1." y "2."; tras cada una, escribe una línea que empiece por "Respuesta:" con la solución. En "Cierre", escribe dos o tres líneas que conecten con el próximo paso sin anticipar toda la lección.

Extensión orientativa: entre 1000 y 1500 palabras. Desarrolla el contenido sin relleno y completa todas las secciones. Una lección de menos de 900 palabras se rechazará.
Distribuye la extensión aproximadamente así: 100–150 palabras en "Por qué ahora", 450–600 en "Explicación y ejemplo", 250–350 en "Práctica", 100–150 en "Comprobaciones" y 80–120 en "Cierre". Profundiza el ejemplo y la tarea de escucha o aplicación cuando el tema parezca breve; no repitas ideas para alcanzar la longitud.`,
  expository: `Escribe un artículo académico en prosa continua. En "Contexto histórico y conceptual", ubica el problema y presenta los antecedentes necesarios. En "Desarrollo", define los conceptos, reconstruye los argumentos y explica sus premisas e implicaciones. Distingue la exposición de la interpretación y la crítica. Identifica las obras primarias relevantes y explica las objeciones o discrepancias que ayuden a comprender el tema. Usa subtítulos de nivel 3 dentro de "Desarrollo" cuando ayuden a organizarlo. En "Cierre", sintetiza el aporte del tema y su relación con el recorrido.

Integra los ejemplos ya resueltos en la explicación. Excluye las consignas, los ejercicios, los cuestionarios, las comprobaciones y las preguntas dirigidas al lector para evaluarlo. Puedes formular preguntas filosóficas como parte del argumento y explicar cómo las abordan las obras o autores tratados.

Extensión orientativa: entre 1000 y 1500 palabras. Desarrolla el contenido sin relleno y completa todas las secciones. Una lección de menos de 900 palabras se rechazará. Dedica la mayor parte del texto al desarrollo y amplía los argumentos o ejemplos cuando el tema parezca breve.`,
} satisfies Record<LessonFormat, string>;

export function buildLessonPrompt(input: PromptInput): string {
  const { course, step, recentLessons } = input;
  const format = course.config.teaching.lessonFormat ?? "guided";
  const sections = Object.entries(lessonSections[format])
    .map(([key, heading]) => `- ${key}: cuerpo de «${heading}».`)
    .join("\n");
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

Completa title, summary y todas las secciones del objeto sections:
${sections}
Escribe el cuerpo de cada sección en Markdown, sin su encabezado principal. El sitio agrega los encabezados. Usa nivel 3 o inferior para los subtítulos internos.

${formatInstructions[format]}

No incluyas frontmatter YAML, HTML, saludos genéricos ni referencias a este pedido. No inventes resultados que el alumno todavía no realizó. No utilices los caracteres de exclamación de apertura o cierre. Devuelve sólo el objeto JSON solicitado.`;
}
