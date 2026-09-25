---
title: Recuperar borradores completos pero demasiado breves
status: APPROVED
owner: usuario del proyecto
created: 2026-09-25
updated: 2026-09-25
approved: 2026-09-25
---

# Recuperar borradores breves sin perder calidad

## Objetivo y evidencia

Una lección futura debe conservar el mínimo aprobado de 900 palabras y poder completarse sin gastar los tres intentos repitiendo un pedido que ya produjo una respuesta demasiado corta. El run `36137099953` intentó la entrega normal `musica-clasica` del 2026-09-25: los intentos 1 y 2 fueron rechazados por menos de 900 palabras, y el tercero recibió HTTP 429. El run anterior `36136472810` había publicado tres cursos y dejado esa entrega pendiente por la misma regla de longitud. No se registró el conteo exacto de palabras ni la clase de cuota alcanzada por el 429.

El código actual envía el mismo prompt en cada intento de contenido; sólo cambia la muestra del modelo. `normalizeLessonDraft` descarta el texto corto antes de que el siguiente intento pueda usarlo como base. Como el adaptador sólo llama al normalizador tras `finishReason: STOP`, los dos rechazos por longitud no son cortes por `MAX_TOKENS`. Google documenta que HTTP 429 puede representar distintos límites, entre ellos solicitudes o tokens por minuto y cuota diaria; el código no expone cuál aplicó.

## Alcance y límites

- Sólo borradores futuros. No se altera ninguna lección, fecha, ID, cursor, RSS o progreso ya publicado.
- Se conservan Gemini 2.5 Flash, el umbral de 900 palabras, las cinco secciones, las dos comprobaciones respondidas, la validación de cierre y el máximo de tres solicitudes por lección.
- La corrección no puede garantizar que Gemini responda bien ni ampliar la cuota gratuita. Si no hay una respuesta válida, la entrega sigue pendiente como ya dispone la recuperación diaria.
- El cambio sustituye la decisión de v0.8 de no continuar automáticamente una salida corta; por eso requiere aprobación explícita antes de implementarse.

## Requisitos

| ID | Requisito |
|---|---|
| REQ-025 | Si Gemini devuelve con `STOP` una lección estructuralmente completa pero de menos de 900 palabras, el siguiente intento MUST incluir retroalimentación concreta sobre la longitud y pedir ampliar ese borrador, sin inventar otro paso del temario. |
| REQ-026 | Una lección MUST publicarse sólo si el borrador final satisface todas las comprobaciones existentes; las respuestas cortas y sus ampliaciones fallidas MUST NOT avanzar el cursor ni producir archivo de lección. |
| NFR-019 | La recuperación de longitud MUST usar como máximo las tres llamadas ya permitidas por lección, sin activar un servicio pago ni cambiar de modelo. |
| NFR-020 | Los logs SHOULD informar el conteo de palabras de un borrador rechazado y, para un 429, cualquier clasificación de límite o demora de reintento que la API exponga de forma segura, sin registrar la clave ni el texto de la lección. |

## Diseño propuesto

1. Separar el parseo de la respuesta de Gemini de la validación final para poder conservar temporalmente, sólo en memoria, un borrador corto que tenga `STOP` y estructura completa. No escribirlo en disco.
2. El primer intento conserva el prompt actual, con una indicación adicional de extensión por sección. Si el resultado es completo pero corto, calcular su conteo y preparar el siguiente prompt con el borrador y una instrucción explícita de ampliarlo hasta 1000–1500 palabras, profundizando explicación y práctica sin relleno ni nuevos temas. La salida sigue siendo el objeto JSON completo, no un parche parcial.
3. Validar cada nueva respuesta con el mismo contrato. Si vuelve a ser corta, usar la nueva versión como base para el tercer y último intento. Otros errores de contenido conservan la política actual de reintento; un HTTP 429 conserva backoff transitorio y no publica nada inválido.
4. No incluir en los logs el cuerpo recibido. Registrar sólo categoría, conteo y, si la API la proporciona, información segura del límite. La deuda diaria existente queda como mecanismo de recuperación después de agotar los intentos.
5. La metadata de una lección aceptada conserva el SHA-256 del prompt efectivo de ese intento (incluida la ampliación, si la hubo). Las lecciones históricas no cambian. La versión del prompt nuevo pasa a `v3`.

## Alternativas y decisiones

| ID | Decisión propuesta | Alternativa | Motivo y consecuencia |
|---|---|---|---|
| DEC-030 | Ampliar el borrador corto dentro de los tres intentos | Repetir tres veces el prompt idéntico | Usa la evidencia del rechazo para mejorar el siguiente intento sin aumentar el máximo de llamadas. |
| DEC-031 | Mantener el mínimo de 900 palabras | Bajar el umbral para que pase Música clásica | Respetar la longitud aprobada y evitar publicar otra lección demasiado corta. |
| DEC-032 | Mantener un JSON completo en cada ampliación | Concatenar fragmentos generados por separado | Permite aplicar exactamente el contrato existente al texto final; puede consumir más tokens de entrada. |

## Fallos, compatibilidad y operación

- Si el primer borrador no tiene estructura completa o termina con `MAX_TOKENS`, no se usa como base de ampliación; se aplica el rechazo actual.
- Si la ampliación introduce secciones incorrectas, pierde respuestas, queda corta o falla por 429/503, no se publica y la fecha sigue pendiente.
- El borrador sólo vive en memoria durante el run. Un nuevo run comienza desde el historial Git, sin persistir texto inválido.
- El límite de tres solicitudes impide gasto adicional frente al peor caso actual, pero una ampliación puede consumir más tokens de entrada y topar con cuota de tokens. La cuota real no está visible en estos logs.
- Rollback: revertir sólo el adaptador/prompt nuevos; la deuda normal sigue calculada desde las fechas publicadas, sin migración de datos.

## Criterios y verificación

| ID | Requisito | Resultado observable | Verificación |
|---|---|---|---|
| AC-047 | REQ-025 | Tras una primera respuesta completa de 750 palabras, la segunda solicitud contiene esa respuesta y el conteo, pide ampliarla y termina con un borrador válido de 900 o más palabras. | Prueba del adaptador con respuestas simuladas. |
| AC-048 | REQ-026 | Dos borradores cortos seguidos de un 429 dejan cero archivos nuevos y el mismo cursor; una ejecución posterior aún selecciona esa fecha. | Prueba de integración del lote en un repositorio temporal. |
| AC-049 | NFR-019 | Una lección usa entre una y tres solicitudes; ninguna ruta de ampliación excede tres ni cambia `model`. | Pruebas del adaptador y configuración. |
| AC-050 | NFR-020 | El log muestra conteos/categorías pero nunca el cuerpo, clave o cabeceras sensibles. | Pruebas y revisión de logs de un run real. |

## Aprobación y prueba remota

- Readiness: APPROVED.
- Bloqueadores técnicos: ninguno para la implementación; la cuota concreta del proyecto sólo puede verificarse en AI Studio o con detalles seguros de la API.
- Alcance propuesto: REQ-025 a REQ-026, NFR-019 a NFR-020, AC-047 a AC-050.
- Aprobado por/fecha: usuario del proyecto, 2026-09-25. Aprobó el cambio después de aclarar que no puede garantizarse la disponibilidad de Gemini ni evitar todos los HTTP 429/503.
- La verificación local no sustituye una ejecución real; después del push habrá que confirmar que la lección de Música clásica del 2026-09-25 se publica con longitud suficiente o permanece pendiente por un error claramente clasificado.
