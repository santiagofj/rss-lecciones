---
title: Extensión y cierre de las lecciones futuras
status: APPROVED
owner: usuario del proyecto
created: 2026-09-23
updated: 2026-09-23
approved: 2026-09-23
---

# Extensión y cierre de las lecciones futuras

## Objetivo y contexto

El alumno quiere lecciones futuras un poco más largas y completas. El prompt actual pide 900–1400 palabras, pero es orientativo: el adaptador acepta cualquier cuerpo de al menos 200 caracteres. Hay lecciones publicadas que terminan a mitad de frase o sección, incluidas `historia-filosofia/005` (aprox. 221 palabras), `audio-digital/003` y `musica-clasica/004`. Todas indican `gemini-2.5-flash`. El límite configurado es 8192 tokens de salida, compartidos con el razonamiento; no se conserva el motivo de finalización en cada lección histórica.

## Alcance aprobado

- Sólo se modifica la generación de lecciones futuras. Las lecciones, fechas, IDs, GUID, rutas, RSS histórico y progreso ya publicados permanecen intactos.
- La extensión objetivo será 1000–1500 palabras. Se rechazará una nueva lección de menos de 900 palabras; no se impone máximo rígido de palabras.
- Se requerirán las cinco partes educativas existentes, dos comprobaciones con respuesta y una señal de cierre al final del cuerpo. La señal se elimina antes de publicar.
- Se mantiene `gemini-2.5-flash`, el límite de 8192 tokens, la clave y el máximo de tres intentos. No se implementa continuación automática ni se agregan llamadas fuera de los intentos actuales.

## Requisitos y decisiones

| ID | Requisito |
|---|---|
| REQ-020 | Una nueva lección MUST pedir una extensión objetivo de 1000–1500 palabras, incluir las cinco secciones pedagógicas en orden, dos comprobaciones respondidas y un cierre explícito. |
| NFR-015 | El generador MUST rechazar antes de escribir una respuesta demasiado breve o incompleta, reintentar dentro del límite actual y, si no obtiene una candidata válida, MUST NOT avanzar el cursor ni publicar contenido parcial. Las fuentes históricas MUST seguir validando sin aplicarles las nuevas reglas. |

| ID | Decisión | Alternativa | Motivo |
|---|---|---|---|
| DEC-023 | Validar la estructura y una señal final sólo en los borradores nuevos; versión de prompt `v2` | Subir únicamente `maxOutputTokens` o validar retroactivamente todo el historial | El límite de tokens no explica por sí solo los cuerpos guardados a media frase; la validación retroactiva bloquearía cursos por contenido ya publicado. |

## Contrato de generación

El campo JSON `markdown` debe contener encabezados `## Por qué ahora`, `## Explicación y ejemplo`, `## Práctica`, `## Comprobaciones` y `## Cierre`, en ese orden. En `## Comprobaciones` se piden exactamente dos ítems numerados, cada uno con una línea `Respuesta:`. La última línea del cuerpo debe ser `[[FIN_LECCION]]`; esa línea es una marca técnica, no parte de la lección publicada. El adaptador comprueba orden, contenido no vacío, las dos respuestas, al menos 900 palabras de cuerpo y la marca final. `finishReason` debe ser `STOP`.

Una respuesta que incumple se reintenta como los demás errores de contenido. Tras agotar los intentos, el run falla antes de `writePreparedLesson`. No se intenta completar una salida parcial ni se agrega automáticamente texto que el modelo no produjo. El tamaño real depende del tema, pero el umbral evita aceptar las lecciones de 221–800 palabras observadas; el marcador y la estructura detectan cortes aun por encima de 900.

## Criterios de aceptación y verificación

| ID | Requisito | Resultado observable | Verificación |
|---|---|---|---|
| AC-036 | REQ-020 | El prompt `v2` pide 1000–1500 palabras y las cinco partes con dos respuestas y marca final. La fuente publicada no contiene la marca. | Prueba del prompt y normalización con borrador válido. |
| AC-037 | NFR-015 | Un borrador menor de 900 palabras, sin una sección/respuesta, sin marca final o con finalización distinta de `STOP` se rechaza antes de cualquier escritura. | Pruebas unitarias de variantes válidas e inválidas y reintentos. |
| AC-038 | NFR-015 | Los 20 archivos históricos validan sin modificación y el avance sólo cambia tras aceptar una nueva lección completa. | `npm run validate`, comparación de diff, prueba de integración del escritor y una ejecución real controlada en Actions. |

## Entrega, recuperación y aprobación

No hay migración de archivos existentes. Si la política resulta demasiado estricta y los runs fallan repetidamente, se ajustarán umbrales o formato en un nuevo cambio; no se deshabilitará silenciosamente la protección ni se publicarán respuestas parciales. La prueba local no demuestra que Gemini vaya a satisfacer el nuevo contrato; AC-038 conserva un tramo pendiente hasta una ejecución real.

No quedan preguntas bloqueantes: el usuario confirmó “solo las futuras” tras la propuesta de aumentar moderadamente la extensión y rechazar respuestas incompletas.

- Readiness: APPROVED.
- Alcance aprobado: REQ-020, NFR-015, AC-036 a AC-038.
- Aprobado por/fecha: usuario del proyecto, 2026-09-23.
