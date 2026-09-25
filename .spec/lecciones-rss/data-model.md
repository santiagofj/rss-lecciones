# Modelo de datos propuesto, versión 1

Contratos para aprobación conjunta. El avance automático está confirmado por el usuario mediante Q-001; no existe estado de lectura, estudio ni confirmación. Ningún ejemplo es configuración operativa ni indica el progreso real de los cursos históricos.

## Principios e invariantes

YAML MUST usar un subconjunto compatible con JSON: sin tags personalizados, claves duplicadas ni referencias/aliases. Todos los objetos MUST rechazar propiedades desconocidas. Las fechas MUST conservarse como strings. JSON y frontmatter MUST validarse antes de generar.

Los IDs tipo slug MUST cumplir `^[a-z0-9]+(?:-[a-z0-9]+)*$`; MUST NOT contener separadores de ruta. La carpeta del curso MUST coincidir con `course.yml.slug`. Las rutas MUST permanecer dentro del directorio esperado; se rechazan symlinks en cursos y lecciones. Los UUID MUST ser válidos y únicos globalmente. Todos los archivos de texto son UTF-8.

Las fuentes autoritativas son: configuración en `course.yml`; recorrido en el frontmatter de `syllabus.md`; historial editorial en lecciones Markdown; punto de inicio y contexto aportado por el alumno en `progress.json`. El cursor de progreso es una proyección validable de las fuentes, no un segundo historial independiente.

## Configuración general: `site.yml`

```yaml
schemaVersion: 1
site:
  id: "urn:uuid:57f6f640-0666-4d6f-a951-9b2316294c2a"
  title: Lecciones RSS
  description: Cursos personales progresivos
  baseUrl: "https://usuario.github.io/rss-lecciones/"
  language: es-AR
generation:
  model: gemini-2.5-flash
  timeoutSeconds: 120
  maxOutputTokens: 6000
  maxInputBytes: 100000
  maxLessonsPerRun: 3
```

Todos estos campos son obligatorios. `site.id` es permanente y no se deriva del dominio. `baseUrl` MUST ser HTTPS absoluta sin query ni fragmento y terminar en `/`; incluye el prefijo de Pages. La enmienda v0.7 restaura `gemini-2.5-flash` y sus parámetros de generación tras los errores HTTP 503 observados con 3.8. El modelo 2.5 admite salida estructurada y nivel gratuito para proyectos con acceso; una ejecución real debe confirmar que el proyecto conserva ese acceso. Las lecciones existentes mantienen en `generation.model` el modelo con que fueron creadas.

Los límites numéricos MUST ser enteros positivos. Los valores del ejemplo son recomendaciones iniciales sujetas a pruebas de calidad; no representan límites propios de Gemini. Desde v0.9, `maxLessonsPerRun` limita entregas normales intentadas por ejecución; las restantes permanecen pendientes para siguientes runs. La configuración operativa actual usa 40 para poder recuperar cinco días de los cuatro cursos existentes.

## `course.yml`

```yaml
schemaVersion: 1
id: "c1db6c92-a638-443d-a8e1-44dd4f0a9e49"
slug: audio-digital
title: Audio digital
description: Fundamentos y verificación de la reproducción digital
status: paused
language: es-AR
timezone: America/Buenos_Aires
schedule:
  type: weekdays
  startDate: "2026-09-18"
feed: true
teaching:
  audience: Alumno con experiencia práctica; explicar los fundamentos
  instructions: |
    Mantener una unidad clara y explicar por qué se estudia.
    Usar ejemplos concretos y una práctica sustantiva.
    No cerrar con preguntas triviales ni afirmar que el alumno aprendió.
```

Todos los campos son obligatorios. Para calendarios `weekly` y `weekdays`, `schedule.startDate` fija la primera entrega debida; no aplica a `manual`. `id` identifica permanentemente el curso y no se reutiliza; `title` y `description` son texto plano no vacío; `status` es `active | paused`; `language` es una etiqueta BCP 47 validada; `timezone` una zona IANA reconocida por el runtime. `teaching.audience` y `teaching.instructions` son strings no vacíos, incluidos en el contexto de generación. El ID permite mantener identidad aunque cambie el dominio; el slug queda congelado tras publicar para evitar romper URLs.

`feed` es booleano: `false` excluye ese curso de todos los feeds, pero conserva su publicación web. Los tres iniciales se habilitan con `feed: true`. Pausar no oculta archivos ni feeds existentes.

`schedule` es una unión discriminada con tres formas exactas:

```yaml
type: weekdays
```

```yaml
type: weekly
days: [monday, thursday]
```

```yaml
type: manual
```

Sólo `weekly` admite `days`: lista no vacía, sin repetidos, de `monday` a `sunday`. No hay horarios por curso en el MVP: frecuencia y fecha local, sin garantía de hora exacta. El horario compartido del workflow se establece al activar el sistema.

## `syllabus.md`

Markdown con frontmatter YAML. El recorrido estructurado vive en el mismo archivo que su explicación; no se añade `syllabus.json` como segunda fuente.

```markdown
---
schemaVersion: 1
steps:
  - id: pcm-introduccion
    unitId: fundamentos
    topicId: pcm
    title: Qué representa una señal PCM
    objective: Interpretar muestras como valores de una señal en instantes discretos
    brief: Separar muestras, tiempo y amplitud mediante un ejemplo numérico
  - id: muestreo-frecuencia
    unitId: fundamentos
    topicId: sample-rate
    title: Frecuencia de muestreo
    objective: Explicar qué cambia al aumentar la frecuencia de muestreo
    brief: Relacionar muestras por segundo, banda reproducible y límites del ejemplo
---
# Audio digital
Explicación del recorrido, referencias revisadas y límites de cada unidad.
```

`schemaVersion` y `steps` son obligatorios; `steps` es una lista no vacía. Todos los campos de cada paso son obligatorios y no vacíos. `id` es único dentro del curso; `unitId` y `topicId` pueden repetirse para continuidad. Un paso equivale a una lección; varios pasos pueden profundizar el mismo tema. `objective` y `brief` son instrucciones locales, no salida de la IA.

El orden de la lista es el orden educativo. La numeración de lecciones no determina IDs de pasos. Sólo el programa identifica anterior, actual y siguiente. El cuerpo Markdown aporta contexto y materiales; no cambia el orden del frontmatter.

Tras publicar, los pasos anteriores al inicio y el prefijo aceptado MUST conservar IDs y orden. Pueden revisarse textos explicativos y el sufijo todavía no publicado; toda modificación pasa por revisión/validación. Insertar o quitar un paso en el prefijo requiere una migración explícita fuera del flujo normal. Ampliar el sufijo de un curso agotado permite reanudarlo.

## `progress.json`

Inicial, sin lecciones:

```json
{
  "schemaVersion": 1,
  "startStepId": "pcm-introduccion",
  "learnerContext": "Punto de inicio por confirmar; no inferir dominio previo.",
  "cursor": {
    "lastLessonId": null,
    "nextStepId": "pcm-introduccion"
  }
}
```

Después de aceptar la primera lección:

```json
{
  "schemaVersion": 1,
  "startStepId": "pcm-introduccion",
  "learnerContext": "Punto de inicio confirmado por el alumno.",
  "cursor": {
    "lastLessonId": "e3f8a6d1-5972-443c-bc15-c27c2c134c96",
    "nextStepId": "muestreo-frecuencia"
  }
}
```

Todos los campos son obligatorios. `learnerContext` es string, puede ser vacío y sólo cambia por edición explícita del usuario; la IA no lo actualiza. `startStepId` MUST existir en el syllabus y queda congelado al aceptar la primera lección. Elegir un inicio posterior omite el prefijo como conocimiento previo acordado, no crea lecciones ficticias ni acredita aprendizaje medido. La numeración nueva empieza en 1.

`cursor.lastLessonId` es UUID o `null`; `nextStepId` es ID de paso o `null` al agotarse el recorrido. Ambos se recalculan recorriendo las lecciones por `sequence`, desde `startStepId`. El cursor se conserva para hacer explícito el progreso y detectar persistencia incompleta. Esta duplicación es deliberada y recuperable; no contiene `currentLesson`, `completedTopics`, conteos, calendario ni historial redundantes.

`validate` informa una diferencia de cursor sin modificar archivos. Generación y `recover` pueden reparar únicamente el cursor derivado bajo lock, preservando `startStepId` y `learnerContext`. Un JSON ilegible no se reconstruye inventando contexto: se detiene y se restaura desde Git. No se registran confirmaciones educativas ni se espera que el alumno complete una práctica para continuar.

## Frontmatter de lecciones

Ruta propuesta: `courses/audio-digital/lessons/001-pcm-introduccion.md`. El nombre usa sequence con relleno mínimo de tres dígitos y `stepId`; no usa el título generado. Números mayores de 999 siguen siendo válidos. URL: `<baseUrl>audio-digital/001-pcm-introduccion/`.

```yaml
---
schemaVersion: 1
id: "e3f8a6d1-5972-443c-bc15-c27c2c134c96"
sequence: 1
course: audio-digital
stepId: pcm-introduccion
title: Cómo representa PCM una señal
publishedAt: "2026-09-18T11:17:00Z"
generationDate: "2026-09-18"
summary: Muestras, amplitud y tiempo en una representación digital
generation:
  model: "<modelo-real-usado>"
  promptVersion: "1"
  contextHash: "<sha256-del-contexto-canonico>"
---
```

Todos los campos son obligatorios. `sequence` es entero positivo, único y consecutivo por curso empezando en 1. `stepId` existe en el syllabus y no se repite en lecciones. `course` coincide con la carpeta y configuración. `title` y `summary` son texto plano no vacío. `publishedAt` es RFC 3339 UTC, se fija al aceptar la fuente y nunca cambia al reconstruir; no certifica disponibilidad en Pages. `generationDate` es fecha civil válida `YYYY-MM-DD` y, desde v0.9, representa la fecha programada que la lección salda. Puede ser anterior a `publishedAt` si se recupera atraso; las extras manuales usan la fecha local del pedido.

El programa MUST asignar identidad, número, fechas, ruta y datos de auditoría; no la IA. `generation.model` es el modelo enviado al proveedor, `promptVersion` la versión del contrato y prompt local, `contextHash` SHA-256 hexadecimal de 64 caracteres del contexto enviado, serializado de forma canónica. No se guardan clave, headers, prompt bruto ni respuesta cruda.

No se duplican `topicId` ni `unitId`: se resuelven desde el paso estable del syllabus. ID, sequence, course, stepId, fechas y ruta son inmutables tras aceptar. Una corrección de texto solicitada por el usuario conserva esos valores y no genera un nuevo item RSS ni modifica progreso. Se puede corregir título, summary o cuerpo según el pedido explícito, sin añadir metadata ni estados de revisión innecesarios.

## Contrato de generación

La entrada contiene configuración educativa, paso seleccionado, ubicación en el recorrido, paso anterior/siguiente, contexto explícito del alumno, syllabus completo y hasta tres últimas lecciones completas. Una entrada que excede `maxInputBytes` MUST fallar antes de la API; no se trunca arbitrariamente. El historial completo sigue disponible en fuentes, pero no se envía siempre al modelo.

La respuesta estructurada tiene exactamente estos campos obligatorios:

| Campo | Tipo y regla |
|---|---|
| `stepId` | string; igual al seleccionado por el programa |
| `title` | texto plano; 1–160 caracteres |
| `summary` | texto plano; 1–600 caracteres |
| `markdown` | string; contenido Markdown de 1–60000 bytes UTF-8, sin frontmatter ni HTML crudo |

La salida MUST incluir secciones Markdown `Ubicación y propósito`, `Objetivo`, `Desarrollo`, `Ejemplo o escucha`, `Práctica` y `Continuidad`. La continuidad menciona el próximo paso configurado o el cierre. El renderer MUST deshabilitar HTML crudo, sanear HTML resultante y restringir URLs activas. La aceptación de estructura no certifica precisión factual ni profundidad: se revisan muestras humanas según la materia.
