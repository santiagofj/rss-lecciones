# Operación, idempotencia y recuperación

Avance automático confirmado por el usuario en Q-001. No se exige confirmación de lectura ni estudio. La idempotencia garantiza unicidad del contenido aceptado; no garantiza coste de API exactamente una vez.

## Fecha y elegibilidad

El reloj se recibe explícitamente para poder verificar escenarios. Al tomar el lock del curso se captura un instante UTC y se calcula `generationDate` en `course.timezone`. Esa fecha se mantiene durante toda la operación, incluso si la respuesta termina después de medianoche.

| Estado/situación | Ejecución programada | Ejecución manual |
|---|---|---|
| `paused` | Omitir | Error; activar exige editar configuración |
| `active`, weekdays | Lunes a viernes en fecha local | Puede generar cualquier día |
| `active`, weekly | Sólo los días configurados en fecha local | Puede generar cualquier día |
| `active`, manual | Omitir | Puede generar |
| Fecha local con lección normal | Omitir sin API | Puede generar una extra |
| Syllabus agotado | Omitir sin API | Error sin API |

Cada ejecución manual nueva solicita una extra para un curso elegido, independientemente del calendario y de otras lecciones de ese día. La lección extra se identifica por `generation.trigger: extra` y `generation.requestId`; un rerun del mismo ID se omite. No hay backfill: si Actions no ejecutó ayer, hoy procesa sólo hoy. Una frecuencia nueva requiere extender el validador y evaluador de schedule; un curso nuevo con tipos existentes no requiere cambiar código.

El workflow compartido debe ejecutarse diariamente a una hora aprobada para las zonas iniciales. Si más adelante se añaden zonas donde el tick cae en otra fecha local, se revisará la frecuencia del tick sin crear un workflow por curso. No se garantiza hora exacta de entrega. El horario 08:00 de cursos históricos no se traslada automáticamente a este sistema.

## Claves de unicidad

- Identidad editorial: UUID permanente de la lección; no depende del título o URL.
- Cupo diario normal: `(course.id, generationDate)` para lecciones sin `trigger: extra`.
- Pedido extra: `(course.id, generation.requestId)`; IDs de run repetidos en un curso son inválidos.
- Cobertura: `(course.id, stepId)`; un paso no genera una segunda lección.
- Número/ruta: `(course.id, sequence)` y nombre derivado; nunca se sobrescriben.

Las comprobaciones ocurren después de cargar fuentes recientes y antes de la API, y otra vez antes de instalar la candidata. Los IDs de curso también son únicos globalmente.

## Persistencia local razonablemente transaccional

Un lock exclusivo por curso en `.work/` serializa generación y recuperación de esa copia de trabajo. El proceso informa lock ocupado y no llama a la API. No borra automáticamente locks supuestamente antiguos: tras una interrupción se verifica que no exista escritor activo y se libera explícitamente. Los locks locales no serializan clones diferentes.

Procedimiento de aceptación:

1. Leer fuentes válidas y resolver sólo desfases de cursor reconstruibles. YAML inválido, JSON inválido, IDs/historial en conflicto o contexto perdido bloquean antes de API. El comando `validate` es siempre de sólo lectura; la generación permite reparación del cursor como preflight separado y reportado.
2. Preparar respuesta, frontmatter y nuevo cursor en memoria. Renderizar la candidata y comprobar reglas de contenido antes de escribir fuentes.
3. Escribir ambos archivos temporales dentro de `.work/`, en el mismo filesystem, con creación exclusiva; cerrar y sincronizar sus datos antes de instalar.
4. Instalar la lección completa en `lessons/` mediante renombrado con el lock mantenido y comprobación de destino ausente. Éste es el punto de aceptación editorial. Ningún lector del motor participa durante esta mutación sin respetar el lock.
5. Reemplazar `progress.json` mediante un archivo temporal y renombrado, preservando punto de inicio y contexto. El cursor nuevo corresponde a la lección ya instalada.
6. Validar coherencia final, liberar lock y limpiar temporales. Reportar éxito sólo con ambos archivos coherentes.

No se promete una transacción atómica de dos archivos ni resistencia absoluta a cualquier fallo de disco. La lección completa funciona como registro de aceptación: nunca se avanza el cursor antes de instalarla. Lecturas de validación/build deben detectar lock activo y detenerse, para no observar una escritura a mitad.

| Momento del fallo | Estado durable | Recuperación |
|---|---|---|
| API, timeout, rechazo, respuesta incompleta o inválida | Fuentes intactas | Reintento explícito posterior |
| Escritura temporal antes de instalar lección | Fuentes intactas; temporales descartables | Limpiar temporales verificando escritor ausente |
| Lección instalada; fallo de reemplazo del progreso | Lección aceptada y cursor anterior | Recalcular cursor desde lecciones, sin nueva API |
| Cursor actualizado; fallo de limpieza | Fuentes coherentes | Eliminar staging sobrante; dedupe evita repetir |
| JSON de progreso truncado/ilegible | No se puede conservar contexto con seguridad | Detener; restaurar archivo desde Git y revisar |
| Dos lecciones con el mismo día/paso/número | Historial incompatible | Detener; corrección humana, sin borrar automáticamente |

Una reparación de preflight pertenece a una operación anterior interrumpida. Si una API nueva falla después, no modifica el estado ya reparado. Los informes deben distinguir reparación previa de generación nueva.

## Workflow compartido y persistencia remota

El workflow `publish.yml` acepta `schedule` y `workflow_dispatch`. El dispatch requiere un slug de curso y genera una extra. El input se valida y se pasa como variable de entorno, sin interpolarlo como código shell. Un rerun del mismo run no genera otra lección.

Todas sus ejecuciones comparten un grupo de concurrencia, `cancel-in-progress: false` y `queue: max` (hasta 100 pendientes según GitHub). Cada ejecución que obtiene turno hace checkout fresco de `main`, no del commit antiguo capturado al entrar a la cola. La concurrencia de Actions serializa runs, pero no excluye pushes humanos ni garantiza el orden de despacho.

Jobs:

1. **Preparar fuentes:** `contents: write` para generación y commit. Las ejecuciones `push` y dispatch-build no generan. La clave se inyecta sólo en el paso de generación, desde GitHub Secrets. Validar todo antes de API; procesar candidatos; recuperar y validar cualquier aceptación interrumpida; crear un commit coherente con sólo fuentes permitidas.
2. **Persistir:** push normal, sin force. Si la rama cambió, abortar con conflicto y conservar un artifact de recuperación que contiene sólo lecciones y progreso afectados. No hacer rebase/merge ciego de progreso ni regenerar automáticamente para resolver conflictos. Un rerun vuelve a leer la rama y deduplica. El artifact requiere revisión antes de integrar contenido no confirmado remotamente.
3. **Construir:** desde el SHA confirmado remotamente, crear `dist/` completo en staging y validarlo. Pasar ese SHA explícitamente al job que hace checkout; no construir desde una rama que pueda haber avanzado entre jobs.
4. **Desplegar:** `contents: read`, `pages: write`, `id-token: write`, environment `github-pages`. Recibir únicamente el artifact público validado. Build y deploy son explícitos en esta ejecución; no dependen de que el push del bot dispare otro workflow.
5. **Informar:** indicar cursos generados/omitidos/fallidos, SHA conservado y resultado de Pages. Un fallo de un curso permite conservar/publicar los éxitos restantes, pero el resultado global debe mostrar fallo parcial y una salida fallida tras los pasos de recuperación/publicación.

La separación entre jobs no impide procesar correctamente un lote parcial: el paso generador entrega un informe y código de resultado controlado; el workflow conserva ese resultado, ejecuta los pasos seguros sobre fuentes válidas y lo refleja al final. Un fallo estructural de fuentes impide commit de fuentes incoherentes y despliegue.

El directorio efímero de un runner no es almacenamiento. Si se pierde una candidata antes del push remoto, otro runner puede repetir una llamada a la API. El máximo diario se aplica al contenido aceptado en las fuentes durables. El artifact de recuperación reduce pérdida en fallos controlados, pero no asegura recuperación tras una desaparición abrupta del runner.

## Construcción y feeds

`build` calcula HTML y todos los feeds en una carpeta temporal. Sólo reemplaza la salida local completa después de validar XML, enlaces internos y manifiesto de archivos. Si falla, conserva la salida anterior. `feeds` usa el mismo generador, prepara todos los XML antes de reemplazar y verifica rutas sin usar API; un reemplazo local interrumpido puede repararse repitiendo el comando. Sólo `build` produce artifacts desplegables.

Si las fuentes ya están en Git pero falla build o deploy, no se revierten lecciones ni cursor y no se vuelve a llamar a la API. Se reejecuta modo build sobre las fuentes conservadas. El sitio anterior permanece publicado hasta un deploy exitoso. La UI no afirma que una lección sea accesible hasta comprobar su URL.

## Correcciones puntuales a pedido

El usuario puede conversar sobre una lección y pedir un cambio específico. La corrección edita el Markdown existente, mantiene su metadata inmutable y pasa por validación/build antes de volver a publicarse. No invoca generación de la siguiente lección, consume un nuevo cupo diario ni cambia cursor, syllabus o contexto del alumno salvo que el pedido incluya expresamente ese cambio.

El RSS reconstruido contiene el texto corregido con el mismo GUID y fecha original; no se fuerza una notificación mediante un item duplicado. La página web conserva su permalink y presenta la versión corregida. El criterio de aceptación exige que el feed servido contenga la corrección; no exige reemplazar una copia que el lector haya guardado previamente.

## Límites de generación y fallos externos

Una sola llamada por curso y ejecución, sin reintentos automáticos del SDK ni reparaciones mediante nuevas llamadas. Timeout según configuración; rechazo, truncamiento, contenido demasiado grande, esquema incorrecto o paso incorrecto impiden aceptación. Ante 429, error de red o 5xx se informa el fallo y se espera reintento explícito; no se avanza el paso.

No se registran cuerpos crudos ni headers de API. Se informan códigos de error, curso, paso y estado; el resumen del workflow aporta el enlace de ejecución. El modelo y los límites se confirman antes de prueba pagada. No se inspeccionan ni solicitan claves durante la etapa de arquitectura.

## Activación, privacidad y rollback

Antes del primer deploy se confirma repositorio remoto, rama predeterminada, permisos de bot, protecciones, plan/visibilidad de Pages, URL definitiva, horario compartido y modelo. Antes de activar un curso se revisan temario, calendario, contexto y punto inicial. Los ejemplos históricos no son evidencia de progreso vigente.

El sitio propuesto es público. `progress.json`, syllabus y configuración no entran en el artifact público; si el repositorio fuente es público, sí serían visibles en GitHub. No incluir información sensible allí. El alcance actual no autoriza publicar, crear repositorios, configurar Secrets ni cambiar automaciones históricas.

Rollback del sitio: reconstruir un commit conocido y desplegarlo. Para mantener identidad editorial, no borrar lecciones aceptadas para corregir diseño o feed; corregir renderer y reconstruir. Revertir fuentes que ya produjeron IDs públicos requiere revisión explícita para no reutilizar numeración, fecha o pasos de forma accidental. Un error educativo se corrige conservando GUID y fecha original.
