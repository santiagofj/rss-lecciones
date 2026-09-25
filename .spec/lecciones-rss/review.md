# Revisión crítica

## Consistencia del pedido

La separación entre conversación, fuentes permanentes y distribución es adecuada para un sistema estático personal. No hace falta un framework web ni una base de datos. La independencia de los cursos requiere contratos uniformes, no lógica especial para cada materia.

| Punto | Problema concreto | Propuesta o decisión pendiente |
|---|---|---|
| Publicación frente a aprendizaje | `completedTopics` afirma aprendizaje sin observar al alumno | Q-001 resuelta: avance automático, sin confirmaciones; registrar cobertura editorial, nunca dominio |
| Syllabus libre | Un documento narrativo no identifica inequívocamente el siguiente paso | Frontmatter con pasos ordenados y IDs estables dentro del propio `syllabus.md` |
| Subdivisión por IA | Permitir subdivisiones sin límite vuelve indeterminista el curso | Un paso por lección; preparar subdivisiones en el temario revisado |
| Progreso duplicado | `currentLesson`, `currentTopic` y listas pueden contradecir Markdown | Cursor mínimo verificable y recuperable; no duplicar conteos ni temas publicados |
| Clave sólo en GitHub Secrets | `npm run lesson` generando localmente necesitaría otra copia de la clave | Generación manual con `workflow_dispatch`; CLI local sólo despacha la ejecución |
| Archivo frente a publicación | Guardar Markdown no significa que la URL esté disponible | Separar aceptación de fuentes, push y despliegue; estado de deploy en Actions |
| Dos archivos | Dos renombrados no forman una transacción conjunta | Lección como registro autoritativo y reparación de cursor tras interrupción |
| Ejecuciones repetidas | Un runner nuevo pierde el disco de una ejecución fallida | Dedupe contra fuentes de la rama remota; reconocer que no garantiza una sola llamada pagada |
| Scheduling | Faltan zona horaria, recuperación de días y política manual | V0.9: fecha de inicio por curso, una entrega debida por día y recuperación automática del atraso, acotada por run |
| URL de Pages | Puede haber prefijo `/nombre-repositorio/` | `site.baseUrl` obligatorio; enlaces absolutos que conservan ese prefijo |
| Curso terminado | No se define el comportamiento al agotar el temario | `nextStepId: null`; omitir sin invocar API; ampliar el syllabus mediante revisión |
| Migración | No hay historial ni punto de partida aportado | Revisar cada curso antes de activarlo; no reconstruir conversaciones de memoria |
| Calidad educativa | JSON válido no garantiza una explicación correcta o profunda | Validación estructural y revisión humana de muestras; no prometer verificación factual automática |
| Referencias actuales | Roon, foobar2000 y desarrollo web pueden cambiar | Materiales locales revisados; sin navegación ni verificación automática de enlaces en el MVP |
| Privacidad | Una web pública y un repositorio público exponen distinto material | Decidir visibilidad antes de publicar; no subir conversaciones ni datos privados del alumno |
| Frecuencias iniciales | No hay calendario aprobado para los tres cursos | Mantenerlos pausados hasta revisar configuración, syllabus y punto de inicio |

## Riesgos y límites prácticos

El sistema programa publicación, no una tutoría adaptativa que observa respuestas. Las preguntas realizadas en ChatGPT no actualizan el progreso: cualquier contexto nuevo se incorpora explícitamente al repositorio. La forma pedagógica propuesta conserva unidad, razón, objetivo, práctica y continuidad; no presume que los cursos históricos sigan en un punto concreto.

El usuario confirmó que su experiencia deseada consiste en recibir lecciones por RSS. Cuando encuentre algo que corregir, lo conversará y solicitará un cambio concreto en la lección existente. Esa conversación no altera por sí sola el curso ni crea una segunda publicación.

Se propone publicar automáticamente tras validación técnica. Eso permite automatización real, pero deja riesgo de errores educativos. Una cola de revisión obligatoria sería una alternativa distinta que retrasaría cada publicación; no se añade silenciosamente al MVP. Antes de activarlo se revisarán muestras de los tres cursos.

Los límites de tokens y llamadas reducen gasto, pero no equivalen a un presupuesto monetario estricto. Una respuesta obtenida y perdida antes del commit remoto puede volver a generarse en un runner nuevo. No se ofrece garantía de coste exactamente una vez.

La propuesta de escritura directa a la rama predeterminada requiere permisos compatibles con sus protecciones. Si el repositorio exige PR para toda escritura, hay que adaptar la operación antes de activar generación; no desactivar protecciones sin decisión del usuario.

## Fuentes oficiales

Consultadas el 2026-09-18. Estas fuentes verifican capacidades de plataformas, no la implementación de este proyecto.

- [Google: Structured Outputs de Gemini](https://ai.google.dev/gemini-api/docs/structured-output). Gemini admite un subconjunto de JSON Schema y ejemplos JavaScript con Zod; la aplicación validará además las reglas de negocio y los errores semánticos.
- [Google: precios de Gemini 2.5 Flash](https://ai.google.dev/gemini-api/docs/pricing#gemini-2.5-flash). Al aprobar la enmienda, entrada y salida estándar tienen nivel gratuito sujeto a rate limits; Google indica que el contenido del nivel gratuito puede usarse para mejorar sus productos.
- [Google: modelo Gemini 3.8 Flash](https://ai.google.dev/gemini-api/docs/models/gemini-3.8-flash), [migración](https://ai.google.dev/gemini-api/docs/generate-content/latest-model) y [precios](https://ai.google.dev/gemini-api/docs/pricing#gemini-3.8-flash), consultados el 2026-09-23. El modelo admite salida estructurada y nivel gratuito; `thinkingBudget` se reemplaza por `thinkingLevel` y se retira `temperature` de la configuración.
- [OpenAI: facturación separada](https://help.openai.com/en/articles/9039756-managing-billing-for-chatgpt-and-the-api-platform). La suscripción de ChatGPT y la API tienen facturación separada; ésta fue la razón para descartar OpenAI API en el MVP.
- [GitHub: eventos de workflows, schedule](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule). Las ejecuciones programadas pueden retrasarse o perderse, usan la rama predeterminada y en repositorios públicos se deshabilitan tras 60 días sin actividad. Por ello no se garantiza puntualidad exacta.
- [GitHub: GITHUB_TOKEN](https://docs.github.com/en/actions/concepts/security/github_token). Un push mediante este token no dispara normalmente otro workflow de `push` ni un build de Pages. Se propone desplegar explícitamente en la misma ejecución.
- [GitHub: workflows personalizados de Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages). Permite conectar build y deploy mediante un artifact; el job de despliegue requiere `pages: write`, `id-token: write` y un environment. La disponibilidad de Pages depende del plan y visibilidad del repositorio.
- [RSS Advisory Board: especificación RSS 2.0](https://www.rssboard.org/rss-specification). `description` puede contener el artículo completo en HTML escapado; un GUID con `isPermaLink=false` no necesita ser una URL. Título, enlace y descripción son obligatorios en el canal; las fechas RSS usan el formato indicado por la especificación, no la representación ISO del frontmatter.
