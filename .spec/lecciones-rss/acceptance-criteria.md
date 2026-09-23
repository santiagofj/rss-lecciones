# Criterios de aceptación del MVP

Todos están **pendientes de implementar y verificar**. Los criterios de avance reflejan la decisión confirmada de continuar automáticamente sin confirmaciones del alumno. La aprobación de documentos no equivale a satisfacer estos criterios.

| ID | Requisitos | Resultado observable |
|---|---|---|
| AC-001 | REQ-001, REQ-002 | Con tres cursos válidos, discovery encuentra exactamente los tres; al añadir un cuarto directorio válido lo encuentra sin editar ni recompilar una lista del motor. |
| AC-002 | REQ-001, NFR-011 | YAML/JSON inválido, claves desconocidas, ID/slug duplicado, paso desconocido o historial conflictivo producen diagnóstico de archivo/campo y detienen el lote antes de la primera llamada a API. |
| AC-003 | REQ-003 | Para un mismo plan, inicio e historial válidos, la selección devuelve siempre el mismo paso; una salida de IA que declara otro paso se rechaza. |
| AC-004 | REQ-004, REQ-005, REQ-006 | Una respuesta válida crea una sola lección UTF-8 con metadata/ruta asignadas por el programa y actualiza cursor al paso siguiente, preservando punto de inicio y contexto del alumno. |
| AC-005 | REQ-005, REQ-014 | Sin lecciones y con inicio acordado en un paso posterior, la primera candidata corresponde a ese paso y sequence 1; no se crean lecciones ni afirmaciones de dominio para el prefijo omitido. |
| AC-006 | REQ-006, NFR-001, NFR-008 | Timeout, error de red, 429/5xx, rechazo, respuesta incompleta, schema incorrecto, contenido excesivo o paso distinto dejan hashes de fuentes intactos; no hay reintentos implícitos ni progreso nuevo. |
| AC-007 | NFR-001, NFR-002 | Un fallo de staging antes de instalar la lección deja fuentes intactas. Un fallo después de instalarla y antes de cursor se detecta y permite recuperar el cursor sin nueva llamada a API. |
| AC-008 | REQ-005, NFR-002 | `validate` detecta cursor incoherente sin escribir. `recover` repara sólo cursor con fuentes válidas; ante JSON ilegible o historial en conflicto se detiene y no inventa contexto ni elimina lecciones. |
| AC-009 | REQ-007, REQ-008, NFR-003 | Una repetición manual/programada para misma fecha local omite sin API ni cambio de fuente; manual fuera del calendario consume ese mismo cupo diario. |
| AC-010 | REQ-007, REQ-008 | Un viernes/sábado, días de weekly, zona con fecha distinta a UTC y curso manual/pausado producen exactamente la elegibilidad de la tabla de operación; una omisión no modifica progreso. |
| AC-011 | REQ-015, REQ-003 | Tras aceptar el último paso se guarda `nextStepId: null` y siguientes runs omiten sin API. Añadir un paso al sufijo permite seleccionar ese paso; cambiar el prefijo incompatible se rechaza. |
| AC-012 | NFR-004, NFR-003 | Dos escritores locales del mismo curso no entran simultáneamente en generación; las ejecuciones Actions usan grupo compartido sin cancelación del run activo. Push externo concurrente causa rechazo seguro sin force ni sobreescritura. |
| AC-013 | REQ-009, NFR-010 | XML global y por curso son parseables como RSS 2.0, incluyen todos los items habilitados, HTML completo, fecha original, GUID estable y enlace canónico; feed vacío y empate de fechas tienen resultado estable. |
| AC-014 | REQ-009, NFR-010, REQ-015 | Reconstruir sin cambiar fuentes conserva XML e identidades; corregir texto mantiene GUID/fecha. Pausar conserva items existentes; `feed: false` excluye el curso del feed propio y global. |
| AC-015 | REQ-010, REQ-012 | Build produce portada general, portadas/listados, páginas y navegación que resuelven bajo baseUrl con prefijo `/rss-lecciones/`; no hay enlaces internos que pierdan ese prefijo. |
| AC-016 | NFR-006, REQ-004 | Candidata con HTML crudo se rechaza; URLs activas peligrosas y metadata con caracteres HTML/XML no ejecutan scripts y se representan de forma segura. Las rutas con traversal o symlinks se rechazan. |
| AC-017 | NFR-007, REQ-013 | Dos builds del mismo snapshot generan idénticos archivos públicos sin API ni mutar fuentes. Un error de feed/build conserva salida anterior e impide desplegar artifacts incompletos. `feeds` reconstruye sin cambiar progreso. |
| AC-018 | NFR-005, NFR-006 | Se inspeccionan fuentes, logs y artifacts de una prueba controlada: no contienen clave ni respuesta/prompt bruto; el artifact Pages sólo contiene salida pública, sin progreso/configuración fuente. |
| AC-019 | REQ-007, REQ-011, REQ-013 | Dispatch remoto para un curso genera la próxima lección y conserva commit; la CLI local informa run URL y no afirma éxito antes de ver resultado. Comandos validate/build/feeds funcionan sin clave ni llamadas a API. |
| AC-020 | REQ-011, REQ-012 | Una ejecución programada real genera para un curso elegible, conserva sus fuentes en Git y despliega explícitamente desde el SHA confirmado; la URL de lección y ambos feeds responden satisfactoriamente. |
| AC-021 | REQ-012, NFR-007, NFR-009 | Con fuentes ya confirmadas y fallo de deploy, dispatch-build publica esas fuentes sin nueva API; reporte diferencia fuente aceptada, SHA conservado y publicación fallida/exitosa. |
| AC-022 | REQ-009 | Un lector RSS estándar importa feed global y feeds de los tres cursos desde Pages, muestra contenido completo y permalink; un refresh/build repetido no duplica items. Registrar lector y versión usados. |
| AC-023 | REQ-014, REQ-016 | Los tres cursos tienen syllabus/punto de inicio revisados antes de activar. Una muestra de cada curso cumple propósito, objetivo, explicación, ejemplo/escucha, práctica sustantiva y continuidad según sus instrucciones. La revisión humana registra correcciones o aprobación. |
| AC-024 | NFR-008 | Entrada que supera el límite o lote elegible mayor que `maxLessonsPerRun` se rechaza antes de API; configuración válida limita timeout, salida y una llamada por curso/run. |
| AC-025 | NFR-009, NFR-011 | Con error de proveedor en un curso y éxito en otro, el éxito queda coherente en Git y puede publicarse; reporte identifica ambos, y el workflow refleja fallo parcial sin perder fuentes válidas. |
| AC-026 | REQ-004, NFR-010 | Cambiar el título o dominio no cambia UUID/GUID; la ruta derivada permanece por curso/sequence/stepId. Intentar reutilizar identidad, sequence o destino existente se rechaza. |
| AC-027 | REQ-017, REQ-005, NFR-010 | Al aplicar una corrección específica y reconstruir, web y RSS contienen el texto corregido de la misma lección; GUID, ID, número, ruta, fecha, número de items, syllabus y progreso permanecen iguales. La siguiente ejecución continúa el recorrido sin requerir confirmación de lectura ni repetir el paso corregido. |
| AC-028 | REQ-006, NFR-001, NFR-008 | La solicitud a `gemini-3.8-flash` usa un nivel de razonamiento admitido y pide el mismo JSON estructurado; una respuesta válida conserva el contrato de lección y una respuesta inválida no avanza el curso. Una generación real confirma acceso y límites de la cuenta antes de atribuir mejor calidad. |

La prueba programada real y la lectura desde Pages son obligatorias para llamar funcional al MVP. Las simulaciones comprueban reglas y fallos, pero no sustituyen AC-020/022.
