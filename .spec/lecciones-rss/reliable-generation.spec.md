---
title: Recuperación de generación diaria ante fallos de Gemini
status: APPROVED
owner: usuario del proyecto
created: 2026-09-25
updated: 2026-09-25
approved: 2026-09-25
---

# Recuperación de generación diaria

## Objetivo y evidencia

Conservar cada lección nueva que pase las reglas de calidad aunque Gemini falle en otro curso, y recuperar todas las entregas normales atrasadas cuando el proveedor vuelva a responder. En el run `36113976445`, el primer intento rechazó tres respuestas de audio digital por no terminar con el sufijo exacto de marca final. En el segundo, audio digital y fullstack devolvieron borradores válidos, pero Historia recibió HTTP 503 tres veces; el proceso abortó antes de escribir cualquier borrador. Los logs no contienen los cuerpos rechazados, por lo que no prueban que estuvieran cortados.

El código actual reintenta errores transitorios tras 1 y 2 segundos y prepara todo el lote antes de escribir. Esto contradice la conservación de éxitos por curso ya aprobada en `AC-025`. Google recomienda espera exponencial con variación para `503 UNAVAILABLE`, que describe como servicio temporalmente sobrecargado o no disponible. Ningún cambio local puede garantizar que el proveedor responda.

## Alcance y límites

- Sólo se cambia la generación de nuevas lecciones y el tratamiento de sus fallos. Lecciones publicadas, IDs, fechas, modelo, Secret y calendario permanecen intactos. Se añade una fecha de inicio al calendario de cada curso activo; para los cuatro cursos actuales será `2026-09-19`, fecha de su primera lección normal.
- Una lección inválida nunca se escribe ni avanza el cursor. Un fallo de un curso no debe perder las lecciones válidas de otros.
- El run puede terminar como fallo parcial después de conservar y desplegar los éxitos; debe identificar los cursos pendientes.
- Por defecto corresponde una lección normal por curso y día programado. Si quedan fechas impagas, una ejecución de recuperación puede publicar varias lecciones de un mismo curso para saldarlas, siempre en orden del temario.
- No se agrega otro proveedor ni se garantiza publicación mientras Gemini continúe devolviendo 503. Las pausas futuras del curso requieren una decisión explícita sobre qué fechas quedan excluidas de la deuda; los cuatro cursos actuales están activos.

## Requisitos

| ID | Requisito |
|---|---|
| REQ-021 | En un lote programado, un error de proveedor o contenido de un curso MUST permitir procesar los restantes y conservar/publicar sólo sus lecciones válidas. |
| REQ-022 | Tras un lote parcial, el mismo día MUST poder reintentarse sin regenerar ni duplicar las lecciones normales ya conservadas; el resultado global MUST informar qué cursos fallaron. |
| REQ-023 | Cada día programado desde el inicio del curso MUST representar una entrega normal debida. Si una o más no se publican, MUST permanecer pendientes y generarse en orden cronológico, además de la entrega corriente, en cuanto sea posible. Las extras manuales MUST NOT cancelar esa deuda. |
| REQ-024 | Una ejecución manual de recuperación MUST procesar deuda normal de todos los cursos sin crear una extra; combinar recuperación y slug de extra MUST rechazarse. |
| NFR-016 | Un `429`, `503` u otro error transitorio MUST usar espera exponencial acotada con variación; errores permanentes MUST NOT recibir esos reintentos. |
| NFR-017 | La marca `[[FIN_LECCION]]` MAY faltar si la respuesta terminó con `STOP` y satisface las reglas independientes de longitud, secciones, respuestas y cierre completo; una marca presente MUST aparecer sólo al final y MUST eliminarse antes de publicar. |
| NFR-018 | La recuperación MUST conservar un límite explícito de llamadas por run; al alcanzar el límite, la deuda restante MUST permanecer pendiente e informarse, nunca descartarse. |

## Diseño propuesto y decisiones

1. Validar fuentes y calcular las fechas programadas desde `schedule.startDate` hasta la fecha local actual. Restar las fechas con lección normal, sin contar las extras; las fechas restantes son deuda. El plan mantiene el orden cronológico dentro de cada curso e intercala cursos para evitar que uno con mucho atraso monopolice el run. `generationDate` identifica el día debido y `publishedAt` la publicación real.
2. Aislar por curso los errores de generación. Para cada fecha debida, seleccionar el próximo paso a partir del historial actualizado, validar el borrador y escribir sólo esa lección completa. Si falla un curso, no se intenta su fecha siguiente en ese run; se continúa con los demás.
3. Validar las fuentes finales, construir sitio/feeds y permitir que el workflow confirme y despliegue los éxitos antes de marcar como fallo parcial el run. Un error estructural de fuentes o persistencia sigue siendo fatal.
4. En un rerun, el historial confirmado elimina de la deuda las fechas ya publicadas; sólo se reintentan las restantes. El límite `maxLessonsPerRun` pasa de 4 a 40 para cubrir cinco días perdidos en los cuatro cursos actuales y deja la deuda adicional para siguientes ejecuciones.
5. Conservar tres intentos por solicitud, pero espaciar `429`/`5xx` con espera exponencial y variación. Los errores de contenido mantienen reintentos acotados sin esperas largas.
6. Añadir al `workflow_dispatch` la opción `recover=true` para ejecutar el plan normal pendiente tras el push; el input `course` continúa solicitando una sola extra cuando `recover` es falso. Un rerun del run viejo no es la prueba adecuada porque conserva su workflow original.

| ID | Decisión | Alternativa | Motivo |
|---|---|---|---|
| DEC-024 | Publicar éxitos por curso y reportar fallo parcial | Conservar el lote todo-o-nada | Cumple `AC-025` y evita perder llamadas exitosas por un 503 posterior. |
| DEC-025 | Validar completitud sin exigir la marca literal cuando faltó | Rechazar cualquier ausencia de marca | `STOP`, estructura, longitud y cierre permiten rechazar salidas incompletas sin depender de un sufijo que el modelo no siempre reproduce. |
| DEC-026 | Espera exponencial acotada para errores transitorios | Repetir a 1 y 2 segundos o reintentar sin límite | Sigue la recomendación del proveedor y limita tiempo/consumo. |
| DEC-027 | Derivar deuda de `schedule.startDate` y fechas normales del historial | Confiar sólo en el cursor o escribir una cola separada | El historial Git ya es durable; la fecha explícita permite recordar incluso el primer día fallido sin depender del runner. |
| DEC-028 | Permitir varias lecciones sólo para deuda y limitar a 40 por run | Mantener una por curso/run o generación sin límite | Recupera cinco días de cuatro cursos en un run normal y acota uso de API; cantidades mayores continúan en otros runs. |
| DEC-029 | Dispatch de recuperación separado del curso extra | Reutilizar el run anterior o tratar la recuperación como extras | Usa el workflow actualizado y conserva la semántica de las lecciones normales debidas. |

## Fallos, estado y recuperación

- Si todas las respuestas fallan, no se escribe ningún curso ni avanza cursor; el run falla con diagnósticos por curso y la deuda sigue calculable desde Git.
- Si algunas pasan, sólo esas se guardan, validan, confirman en Git y despliegan; el run queda marcado como fallo parcial. Un fallo de validación final impide commit/deploy.
- Si falla el push o Pages tras guardar una lección válida, un rerun usa las fuentes remotas para determinar qué falta; no se fuerza el push. Una lección sólo local podría tener que regenerarse.
- Un 503 persistente deja su curso pendiente. La recuperación de la disponibilidad del proveedor queda fuera del control del repositorio.
- Si el temario se agota, no se inventan pasos para saldar más fechas: se informa el agotamiento. Si se alcanza el límite del run, se procesan las fechas restantes en el próximo.

## Criterios y verificación

| ID | Requisito | Resultado observable | Verificación |
|---|---|---|---|
| AC-039 | REQ-021 | Éxito en A y 503 en B conservan A y dejan B intacto; C posterior también se intenta. | Prueba de integración con proveedor simulado y fuentes temporales. |
| AC-040 | REQ-022 | Rerun el mismo día sólo llama a Gemini para B y no duplica A; el workflow marca fallo parcial después de confirmar/desplegar éxitos. | Prueba de selección y revisión del workflow; run real pendiente. |
| AC-041 | NFR-017 | Cuerpo completo sin marca se acepta; cuerpo corto, sin sección, sin respuesta o sin cierre se rechaza; la marca presente no aparece publicada. | Pruebas del adaptador. |
| AC-042 | NFR-016 | Un 503 usa intentos y esperas acotados; un 400 no se reintenta. | Pruebas con reloj simulado y respuestas HTTP. |
| AC-043 | REQ-021, NFR-017 | Historial y progreso existentes no se modifican durante pruebas locales. | `npm run validate`, `npm test`, `npm run typecheck`, `git diff --check` y diff de `courses/`. |
| AC-044 | REQ-023 | Cinco días fallidos dejan cinco fechas pendientes; al recuperarse Gemini se generan esos cinco pasos en orden sin duplicados y también el paso del día corriente si corresponde. | Fixture con reloj de seis días, fallo total, recuperación y RSS final. |
| AC-045 | REQ-023, NFR-018 | Una extra manual no salda una fecha normal; un backlog mayor de 40 queda pendiente y se reduce en el run siguiente. | Pruebas de selección y límite con fuentes temporales. |
| AC-046 | REQ-024 | `recover=true` selecciona deuda normal; `course=fullstack` sigue creando una extra; combinarlos se rechaza. | Pruebas de selección del evento y workflow; dispatch real pendiente. |

## Entrega y aprobación

No hay migración de lecciones históricas. Se añaden cuatro fechas de inicio a la configuración y se eleva el límite por run; se implementa en el planificador, generador, adaptador Gemini, tests y workflow. La prueba local no demuestra disponibilidad real de Gemini ni despliegue de Pages. Tras el push, una ejecución controlada debe comprobar los cuatro cursos, la recuperación y el caso parcial.

- Readiness: APPROVED. El usuario confirmó el 2026-09-25 que una lección normal corresponde por día y todas las fallidas deben recuperarse después, incluso cinco consecutivas; la publicación parcial por curso ya figuraba en `AC-025` de la especificación aprobada.
- Alcance aprobado: REQ-021 a REQ-024, NFR-016 a NFR-018, AC-039 a AC-046.
- Aprobado por/fecha: usuario del proyecto, 2026-09-25.
