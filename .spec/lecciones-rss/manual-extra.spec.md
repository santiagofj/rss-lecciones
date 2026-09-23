---
title: Una lección extra a pedido
status: APPROVED
owner: usuario del proyecto
created: 2026-09-23
updated: 2026-09-23
approved: 2026-09-23
---

# Una lección extra a pedido

## Objetivo y estado actual

El alumno quiere pedir **otra lección de un curso elegido** cuando lo desee, una solicitud por vez. Puede repetir el pedido durante el mismo día. La generación programada continúa con una lección diaria por curso elegible.

Hoy `workflow_dispatch` ejecuta el mismo generador que el horario diario y no acepta curso. El generador omite cursos con una lección de la fecha local y el validador rechaza dos lecciones del mismo curso con esa fecha. Por ello, volver a ejecutar el workflow no produce una lección extra.

## Alcance y límites

- Cada ejecución manual recibe un slug de curso y solicita exactamente una lección adicional del siguiente paso del syllabus. No hay parámetro de lote ni límite diario artificial para las solicitudes extra.
- La ejecución programada conserva su selección, frecuencia y máximo de una lección normal por curso y fecha local. Una extra no consume ni reemplaza esa lección normal.
- Sólo se admite un curso `active` con un siguiente paso pendiente. Un curso pausado, inexistente o agotado falla con un diagnóstico claro antes de llamar a Gemini.
- La clave sigue en GitHub Secrets y la publicación sigue en el workflow existente. No se añade un proveedor, interfaz web ni generación local con clave.
- La cantidad efectivamente obtenible en un día depende de los pasos restantes del syllabus y de las cuotas gratuitas de Gemini. El programa no promete que cuarenta solicitudes se completen con la cuota gratuita.

Esta enmienda reemplaza la parte de NFR-003 que aplicaba el máximo de una lección diaria también a ejecuciones manuales y la parte de DEC-008 que trataba el pedido manual como consumo del cupo diario. El límite permanece para la generación programada.

## Requisitos propuestos

| ID | Requisito |
|---|---|
| REQ-018 | Una ejecución `workflow_dispatch` MUST aceptar un slug de curso y generar exactamente una lección extra de su próximo paso, aunque ese curso ya tenga una lección de la fecha local. Cada nueva ejecución manual MUST poder solicitar otra mientras queden pasos y cuota. |
| REQ-019 | La ejecución programada MUST conservar como máximo una lección normal por curso y fecha local; las extras MUST NOT reducir ni duplicar ese cupo normal. |
| NFR-012 | El historial MUST distinguir una lección extra de una normal sin invalidar lecciones existentes ni alterar sus ID, GUID, fechas o rutas. Las respuestas inválidas MUST NOT avanzar el cursor ni publicar contenido parcial. |
| NFR-013 | Un slug desconocido, curso pausado, syllabus agotado o error de API MUST producir diagnóstico y detener la solicitud extra sin crear una nueva lección. Las ejecuciones manuales y programadas MUST conservar la serialización existente. |
| NFR-014 | Reintentar el mismo run manual MUST NOT crear otra lección. Un nuevo pedido manual MUST crear una nueva lección si quedan pasos y cuota. |

## Diseño propuesto

`publish.yml` añade un input obligatorio `course` para `workflow_dispatch`. Desde la interfaz de Actions se escribe el slug; desde PowerShell se usa, por ejemplo:

```powershell
gh workflow run publish.yml --ref main -R santiagofj/rss-lecciones -f course=fullstack
```

Ese comando se repite cada vez que se quiera otra lección. No se necesita editar archivos entre pedidos. El input se pasa al proceso mediante una variable de entorno, se valida como slug y se resuelve contra los cursos cargados; no se interpola como comando de shell. En ejecuciones programadas no hay input y se usa el flujo diario actual.

El generador selecciona el próximo paso del curso solicitado y prepara una sola respuesta. La lección extra conserva `generationDate` y recibe `generation.trigger: extra` y `generation.requestId` con el `GITHUB_RUN_ID`. En lecciones históricas, la ausencia de `trigger` significa generación normal. El validador permite varias extras en una fecha, pero como máximo una normal por curso y fecha; también rechaza `requestId` repetidos en el mismo curso. Cada lección mantiene secuencia, ID y ruta únicos; el cursor avanza exactamente un paso.

La selección diaria ignora las extras al decidir si ya se creó la lección normal de esa fecha. El máximo actual `maxLessonsPerRun` sigue aplicando al lote programado; cada solicitud extra genera una sola lección. El workflow conserva el grupo de concurrencia compartido para serializar pedidos manuales y programados y usa `queue: max` para no reemplazar pedidos pendientes (hasta 100). El checkout toma la punta actual de `main` cuando inicia cada job, incluso si el pedido quedó en cola. Si se reejecuta el mismo run, el `requestId` ya publicado provoca una omisión sin nueva llamada a Gemini; GitHub conserva `GITHUB_RUN_ID` entre intentos del mismo run.

## Decisión y alternativas

| ID | Decisión | Alternativa | Motivo |
|---|---|---|---|
| DEC-019 | Un input de curso en el workflow existente y una lección por ejecución manual | Un parámetro `count` y generación masiva | El usuario quiere pedir “otra” cada vez, no cuarenta en un solo pedido. Una ejecución equivale a una lección y deja cada avance verificable. |
| DEC-020 | Marcar sólo las extras con `generation.trigger: extra` | Permitir cualquier fecha duplicada sin marcar origen | El marcador preserva el límite de una lección normal diaria y mantiene válidas las lecciones históricas. |
| DEC-021 | Guardar el ID del run manual y leer la punta de `main` al iniciar | Tratar cada intento como un pedido nuevo | Un reintento tras un fallo de despliegue no debe consumir otro paso ni otra llamada de API. |

## Criterios de aceptación y verificación

| ID | Requisitos | Resultado observable | Verificación |
|---|---|---|---|
| AC-029 | REQ-018, NFR-012 | Tras un pedido manual para un curso que ya publicó hoy, existe exactamente una lección nueva del siguiente paso, con `trigger: extra`, secuencia y GUID nuevos y cursor avanzado una vez. | Prueba de integración con repositorio temporal y proveedor simulado; una ejecución real controlada en Actions. |
| AC-030 | REQ-018, NFR-012 | Dos pedidos manuales sucesivos del mismo curso en la misma fecha crean dos lecciones extras consecutivas sin sobrescribir ni repetir pasos. | Prueba de integración con dos ejecuciones y validación del historial/feeds. |
| AC-031 | REQ-019, NFR-012 | La ejecución programada crea como máximo una normal en la fecha local aunque existan extras anteriores; un segundo tick no crea otra. | Prueba con reloj fijo y dos ticks; comparación de archivos antes/después. |
| AC-032 | NFR-013 | Curso inexistente, pausado o agotado y respuesta inválida fallan sin lección nueva ni avance. Un 429 informa el límite del proveedor sin prometer otra generación. | Casos negativos con proveedor simulado y conteo de llamadas. |
| AC-033 | NFR-012 | Las lecciones existentes sin `trigger` validan; dos normales de la misma fecha siguen siendo inválidas y varias extras de esa fecha validan. | Fixtures de validación y `npm run validate` del repositorio real. |
| AC-034 | NFR-014 | Un rerun del mismo `GITHUB_RUN_ID` no llama a Gemini ni crea otra lección; un run nuevo, aunque sea el mismo día, sí puede crear la siguiente. | Prueba con dos intentos del mismo ID y otro ID nuevo; inspección del checkout y de la ejecución real. |

## Entrega y recuperación

La implementación requiere cambios acotados en el workflow, selección del generador, metadata y validación, más pruebas de los escenarios anteriores. Después de subir el cambio se ejecutará un pedido manual de un curso y se comprobarán el commit, la página y el RSS. No se atribuirá éxito de Gemini a un run que sólo reconstruya el sitio. Como GitHub vuelve a usar el SHA original en un rerun, el checkout actualizado y el `requestId` se verificarán juntos.

Si una solicitud falla antes de aceptar la lección, se puede repetir sin saltar el paso. Una vez publicadas extras, una reversión del generador debe conservar la lectura y validación del marcador `extra`; eliminar esa compatibilidad invalidaría el historial.

## Preguntas y aprobación

No quedan preguntas bloqueantes para esta propuesta. Se asume que un curso `paused` requiere activación explícita antes de cualquier generación; es coherente con el comportamiento actual.

- Readiness: APPROVED.
- Alcance aprobado: REQ-018, REQ-019, NFR-012 a NFR-014 y AC-029 a AC-034.
- Aprobado por/fecha: usuario del proyecto, 2026-09-23.
