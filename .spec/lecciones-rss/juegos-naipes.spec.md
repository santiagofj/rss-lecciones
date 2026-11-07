---
title: Un juego de naipes por día
status: APPROVED
created: 2026-11-07
updated: 2026-11-07
approved: 2026-11-07
---

# Un juego de naipes por día

## Objetivo y contexto

Incorporar un recorrido personal de juegos de naipes: una entrega diaria, un juego diferente por entrega y reglas sencillas pero suficientes para jugar una partida completa. El lector conoce truco, conga, canasta, rummy y Escoba; reconoce términos como palo, baza y triunfo, pero pide una definición breve ajustada a cada juego. Excluye solitarios y juegos de casino.

El proyecto descubre cursos desde `courses/`. El workflow existente programa la generación diaria a las 00:00 de Buenos Aires. El motor usa un temario finito, avanza al publicar y recupera entregas fallidas. El prompt común exige cinco secciones y al menos 900 palabras, con objetivo de 1000–1500. Estas observaciones proceden de README.md, src/generation/prompt.ts y .github/workflows/publish.yml, inspeccionados el 2026-11-07.

## Requisitos

- NAI-001: Cada paso debe enseñar un juego distinto para dos o más personas. Una introducción general, repaso o variante menor no ocupa una entrega propia.
- NAI-002: Excluir solitarios, juegos de casino y apuestas monetarias. No dedicar el tramo inicial a truco, conga, canasta o rummy. Excluir Escoba por corrección expresa del usuario.
- NAI-003: Priorizar juegos conocidos y accesibles antes de ampliar la diversidad de tradiciones. El orden es editorial: no se presenta como un ranking mundial de popularidad.
- NAI-004: Cada entrega identifica jugadores, baraja y cartas retiradas, objetivo, valores y jerarquía, preparación, dirección de juego, turno, obligaciones, final de mano, puntuación, victoria y desempates. Explica excepciones necesarias y vocabulario local. Si un apartado no corresponde, debe quedar claro por la explicación.
- NAI-005: Elegir y nombrar una variante documentada por juego; no mezclar sus reglas con las de otra. Incluir enlaces reales de referencia y señalar diferencias regionales relevantes sin convertirlas en otro reglamento completo.
- NAI-006: Incluir un ejemplo legal con decisiones explicadas, un ejemplo de puntuación cuando corresponda y consejos iniciales. Las prácticas deben poder hacerse con cartas físicas; no presuponer compañeros disponibles ni experiencia adquirida en entregas anteriores.
- NAI-007: Conservar las cinco secciones del motor: Por qué ahora; Explicación y ejemplo; Práctica; Comprobaciones; Cierre. Usar subtítulos internos para localizar reglas. Mantener las dos comprobaciones con respuesta y la extensión vigente, ampliando ejemplos antes que repetir explicaciones.
- NAI-008: Usar el RSS del proyecto y el horario existente, todos los días a las 00:00 de Buenos Aires, sin una automatización adicional. La primera fecha debida será la del próximo turno diario posterior al alta, sin recuperar días anteriores ni publicar automáticamente la muestra como una entrega. Heredar la recuperación de atrasos: una lección diaria corresponde al calendario, pero una recuperación puede publicar varias juntas.
- NAI-009: El recorrido es abierto: no tiene total de entregas ni fecha final. Los 15 juegos iniciales son una reserva, no un límite. Antes de agotarla, buscar y añadir automáticamente más juegos distintos. Continuar hasta que el usuario pida detenerlo. No inventar juegos o renombrar variantes para simular novedades.
- NAI-010: Los cursos actuales conservan su comportamiento finito. Mantener proveedor, credenciales, horario y formato de lecciones; añadir al motor una continuación opcional utilizada sólo por este curso.
- NAI-011: Buscar fuentes con Google Search a través del Gemini existente, separando investigación y extracción estructurada para no depender de compatibilidad entre herramientas y JSON en el mismo pedido. Conservar fuentes y evidencia del lote. No aceptar lotes sin fuentes de búsqueda.
- NAI-012: Comparar candidatos con todo el historial local mediante identidad, nombres, alias y fuentes. Descartar repeticiones, exclusiones y variantes declaradas. La investigación recibe un contexto acotado; las comprobaciones locales no se limitan a las lecciones recientes.
- NAI-013: Si la ampliación falla, usar los juegos pendientes; si no quedan, conservar la entrega debida y reintentar en una ejecución posterior. No marcar el curso terminado, publicar relleno ni perjudicar a otros cursos. Pausar el curso debe detener tanto lecciones como ampliaciones.
- NAI-014: Guardar las ampliaciones como lotes separados e inmutables, incorporados al recorrido en orden. No concentrar todo el crecimiento en un archivo o prompt con un límite fijo de tamaño. Un lote debe aparecer completo o no aparecer; el cursor debe poder reconstruirse desde el historial tras añadir un lote en un punto de agotamiento.

## Diseño propuesto

Nuevo curso `juegos-naipes`, título «Un juego de naipes por día». Añadir `course.yml`, `syllabus.md` y `progress.json` con las convenciones existentes. El usuario aprobó el recorrido y el formato presentado con una corrección: retirar Escoba porque ya la conoce. La muestra de ese juego se retira y no se publica.

La audiencia, contexto del alumno e instrucciones del curso contienen las preferencias confirmadas. Cada paso fija variante, alcance, fuente y excepciones necesarias en su brief. La redacción de lecciones conserva el motor actual sin navegación; la continuación investiga con Google Search y conserva su evidencia antes de extraer los nuevos pasos. No se confunde esa investigación con una garantía de corrección editorial de cada lección.

### Recorrido inicial propuesto

Esta es la reserva inicial; el sistema la ampliará automáticamente. No representa el total del curso. Los reglamentos concretos se fijan en los briefs y los lotes de continuación.

| Orden | Juego | Foco de la explicación |
|---|---|---|
| 1 | Brisca | Jerarquía de cartas, triunfo y valor de las bazas. |
| 2 | Tute | Obligaciones al jugar, triunfo y cantes. |
| 3 | Cinquillo | Construcción por palos y bloqueo. |
| 4 | Corazones | Seguir palo y evitar puntos de penalización. |
| 5 | Ocho loco | Descartes, cambio de palo y reposición del mazo. |
| 6 | Presidente | Combinaciones, pases y orden de salida. |
| 7 | Mentiroso | Declaraciones, desafíos y consecuencias. |
| 8 | Spades | Predicción de bazas y cooperación por parejas. |
| 9 | Whist | Bazas por parejas y triunfo sin subasta. |
| 10 | Cribbage | Puntuación durante el juego y al mostrar las manos. |
| 11 | Scopa | Capturas por valor; explicar diferencias estructurales respecto de Escoba. |
| 12 | Belote | Contrato, triunfo y puntuación por parejas. |
| 13 | Durak | Ataque, defensa y cambio de atacante, sin transferencia del ataque. |
| 14 | Skat | Contrato y juego de uno contra dos. |
| 15 | Bridge | Una modalidad completa para empezar: subasta, carteo y puntuación, sin intentar cubrir todos los sistemas de convenciones. |

Los juegos de bazas avanzados se ubican después de los más accesibles. El recorrido alterna familias para evitar una sucesión de variantes del rummy. Si una lección compleja no cabe con claridad, se mejora su explicación dentro de la misma entrega; no se divide un juego en varios días sin revisar el requisito con el usuario.

## Decisiones y alternativas

| ID | Decisión propuesta | Motivo y límite |
|---|---|---|
| NDEC-001 | Curso nuevo y continuación opcional en el motor | Reutiliza el workflow diario; no crea una automatización de escritorio. |
| NDEC-002 | Mantener el formato y extensión comunes | Evita cambios globales. Formato aprobado por el usuario al aceptar la propuesta. |
| NDEC-003 | Reglamentos identificados y fuentes preparadas | Los juegos tradicionales tienen variantes; una mezcla silenciosa impediría jugar con reglas coherentes. |
| NDEC-004 | Reserva abierta con reposición automática | Corrección explícita del usuario: no fijar un límite de juegos ni pedir ampliaciones manuales. |
| NDEC-005 | Reponer lotes de 7 cuando queden 5 o menos | Son tamaños operativos de reserva, no un tope de entregas; reducen pedidos al proveedor y permiten continuar durante fallos temporales. |
| NDEC-006 | Lotes separados, publicación atómica y contexto acotado | Permite crecer sin el límite del syllabus original o del prompt; preserva las fuentes anteriores. |

## Aceptación y verificación prevista

| ID | Requisitos | Comprobación y evidencia |
|---|---|---|
| NAC-001 | NAI-001, 002, 003, 009 | Revisar que cada paso sea un juego diferente y admisible; documentar variantes y fuentes antes de activar. |
| NAC-002 | NAI-004, 005, 006 | Auditar los briefs y el primer resultado generado contra el reglamento elegido; reproducir ejemplos y recuentos. No basta con que el texto tenga longitud suficiente. |
| NAC-003 | NAI-007 | Comprobar secciones, dos preguntas con respuestas, completitud y longitud con las verificaciones vigentes y revisión editorial. |
| NAC-004 | NAI-008 | Verificar horario, fecha inicial y ausencia de recuperación anterior al alta; confirmar feed y primera publicación tras autorización de activación. |
| NAC-005 | NAI-010 | Revisar diff y ejecutar validate, typecheck y pruebas existentes tras implementar. Confirmar que no se modificaron cursos anteriores ni el workflow; los cambios del motor son opcionales. |
| NAC-006 | NAI-009, 011, 014 | Pruebas con proveedor simulado: añadir lotes, seguir más allá del último juego inicial, conservar evidencia y recuperar un cursor nulo tras una ampliación. |
| NAC-007 | NAI-012 | Rechazar candidatos duplicados por identidad, alias o URL, juegos excluidos y variantes declaradas, incluso cuando no estén en el contexto reciente. |
| NAC-008 | NAI-013 | Probar fallos de ampliación con y sin reserva, recuperación posterior, curso pausado y aislamiento de otros cursos. |

## Entrega, fallos y reversión

La aprobación autoriza preparar y verificar el temario concreto, añadir el curso, ejecutar comprobaciones locales, publicar la configuración y activarlo. El primer día debido será el 2026-11-08, a las 00:00 de Buenos Aires, sin entrega adelantada ni recuperación anterior al alta.

Un error del proveedor se maneja con la recuperación existente sin saltar pasos. Las imprecisiones de reglas exigen corrección editorial; el umbral de palabras no las detecta. Pausar el nuevo curso detiene futuras entregas; las lecciones ya publicadas conservan sus identificadores. Esta incorporación no requiere migrar datos de otros cursos.

## Preguntas y aprobación

- Q-NAI-001 — RESUELTA el 2026-11-07: el usuario confirmó explícitamente «Sí, en el RSS y al mismo horario».
- Fecha inicial fijada: 2026-11-08. La activación remota se informará únicamente después de publicar la configuración.
- Estado: APPROVED. Usuario y fecha: aprobación en conversación el 2026-11-07, «ok, pero quita escoba, tambien ya lo comozco». Alcance: propuesta, formato, implementación y activación por RSS, retirando Escoba y comenzando por Brisca. No se necesita una nueva aprobación por esta corrección explícita.
- Enmienda aprobada por instrucción expresa el 2026-11-07: «que siga indefinidamente» y «deja que cree hasta que a mi se me ocurra». Autoriza el recorrido abierto y su ampliación automática. Sustituye la terminación finita del alcance original; no se solicita nuevamente autorización para esta corrección.

## Referencias técnicas de la enmienda

Documentación oficial de [Google Search con Gemini](https://ai.google.dev/gemini-api/docs/generate-content/google-search), [salidas estructuradas](https://ai.google.dev/gemini-api/docs/generate-content/structured-output) y [modelo 2.5 Flash](https://ai.google.dev/gemini-api/docs/models/gemini-2.5-flash), consultada mediante Context7 el 2026-11-07. La búsqueda usa la clave ya configurada, sin cambiar de proveedor ni activar facturación. Un fallo o cuota del servicio queda pendiente como cualquier otra entrega.

## Evidencia de implementación

- Configuración del repositorio válida: cinco cursos; Naipes activo y próximo paso Brisca.
- TypeScript sin errores después del cambio del motor.
- Sitio y RSS construidos localmente sin llamadas al proveedor; 15 briefs iniciales, máximo de contexto 6810 bytes frente al límite de 65536.
- Calendario comprobado: cero entregas de Naipes antes del 2026-11-08 a las 00:00 de Buenos Aires y una correspondiente al primer día.
- Suite ejecutada: 36 comprobaciones pasaron y tres fallaron porque el sandbox de Windows no permite hardlinks. Se sustituyó el guardado por renombrado con bloqueo exclusivo. No se amplió la batería de pruebas tras la preferencia expresada por el usuario de priorizar la puesta en marcha. La compilación y la construcción posteriores sí finalizaron correctamente.
- El flujo diario existente ya guarda toda la carpeta `courses`, por lo que conservará también los lotes nuevos sin modificar el workflow.
- Pendiente de ejecución real: primera entrega programada y primera reposición con búsqueda. No se generó una lección anticipada ni se usó la API localmente.
