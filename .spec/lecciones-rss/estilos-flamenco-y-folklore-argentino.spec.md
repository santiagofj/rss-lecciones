---
title: Estilos de flamenco y de folklore argentino
status: APPROVED
owner: usuario del proyecto
created: 2026-11-21
updated: 2026-11-21
approved: 2026-11-21
---

# Estilos de flamenco y de folklore argentino

## Objetivo

Aprender a reconocer estilos por el oído y situar las grabaciones en su contexto histórico, regional y social. Usar el concierto de Paco de Lucía en el Teatro Real de 1975 como primera referencia para flamenco y grabaciones de repertorio argentino como punto de partida del segundo feed. La experiencia de escucha y la comparación guían la secuencia.

## Requisitos

- MUS-REQ-001. Publicar dos canales RSS independientes, con su propio índice, lecciones completas, calendario y progreso. Programar una lección por feed y día, dedicada a un solo estilo.
- MUS-REQ-002. En cada entrega, presentar el origen o los antecedentes documentados, los rasgos audibles, el papel del canto, la instrumentación o el baile según corresponda, y una comparación que ayude a distinguir estilos cercanos.
- MUS-REQ-003. Dar dos o más ejemplos de repertorio en cada entrega, con título o denominación, intérprete o conjunto, y al menos una grabación con enlace verificado y accesible desde HTML y RSS. Explicar qué escuchar en cada ejemplo y distinguir composición, estilo, interpretación y grabación.
- MUS-NFR-001. Usar español accesible y explicar los términos según aparecen. Contrastar relatos de origen cuando haya discrepancias y citar referencias documentales. Las grabaciones y sus enlaces se consignan como datos editoriales en el temario.
- MUS-NFR-002. Conservar la identidad de las publicaciones, el orden de las entregas y la recuperación de fechas pendientes mediante el flujo del repositorio.

## Recorridos propuestos

| Feed | Primera entrega | Bloques siguientes |
| --- | --- | --- |
| Estilos del flamenco | Soleá. Escuchar el ciclo, el fraseo y los remates en la guitarra de Paco de Lucía y en el cante. Mencionar las alegrías como referencia para la segunda entrega. | Alegrías, bulerías, seguiriya, martinete, tangos, tientos, zapateado, tanguillos, fandangos de Huelva, malagueña, granaína, taranta, taranto, guajira y rumba. |
| Estilos del folklore argentino | Chacarera. Escuchar cómo se cruzan los acentos y cómo el acompañamiento anuncia las figuras del baile, con «La olvidada» y «La vieja». | Zamba, gato, escondido, malambo, baguala, vidala, chaya, carnavalito, huayno, bailecito, cueca norteña, cueca cuyana, tonada cuyana, chamamé, rasguido doble, chamarrita, canción litoraleña, milonga surera, huella, cifra y estilo. |

Para flamenco, partir de la [discografía de la Fundación Paco de Lucía](https://fundacionpacodelucia.com/discografia/paco-de-lucia-en-vivo-desde-el-teatro-real/) y de los [materiales del Instituto Andaluz del Flamenco](https://www.juntadeandalucia.es/aaiicc/flamenco/sites/default/files/flamenco/docs/gestion_cultural_materiales_didacticos.pdf). Incluir cante y baile además de guitarra de concierto. Para folklore, partir de la [Cajita de Música Argentina](https://www.educ.ar/recursos/108972/cajita-de-musica-argentina?level_id=15096) y complementar con archivos, discografías y fuentes regionales, entre ellas el [expediente del chamamé](https://ich.unesco.org/es/RL/el-chamame-01600).

Audios de apertura: [«Soleá»](https://www.youtube.com/watch?v=HV84l9xZZYs) en la edición oficial del recital y [el episodio «Por soleá» de RTVE](https://www.rtve.es/play/videos/rito-y-geografia-del-cante/rito-geografia-del-cante-solea/4954952/). [«La olvidada»](https://www.educ.ar/recursos/108815/la-olvidada-audio) y [«La vieja»](https://www.educ.ar/recursos/108817/la-vieja-audio), en la colección de Educ.ar.

## Diseño y decisiones

| ID | Decisión propuesta |
| --- | --- |
| MUS-DEC-001 | Usar `estilos-flamenco` y `folklore-argentino` como rutas de los dos cursos. Reutilizar el índice, el RSS y el flujo de publicación existentes. |
| MUS-DEC-002 | El formato expositivo del motor permite integrar comparaciones y ejemplos de escucha dentro del desarrollo. Usar enlaces explícitos y en cada ejemplo indicar una señal audible concreta. Mantener repertorio y fuentes en el temario de cada paso para evitar depender de que el modelo los recuerde. |
| MUS-DEC-003 | Reutilizar la programación diaria existente a las 00:00 de Buenos Aires los siete días de la semana. Las comparaciones se incorporan a la entrega de un estilo, como apoyo para reconocerlo. |
| MUS-DEC-004 | Preparar y revisar las dos primeras entregas para el alta. Publicar el contenido guardado con `publish_only` y usar la ejecución programada para continuar según el calendario elegido. |
| MUS-DEC-005 | Admitir enlaces Markdown absolutos HTTP y HTTPS en el renderizador compartido. Así los enlaces de escucha y de fuentes quedan disponibles en las páginas y dentro del RSS. |

## Aceptación y verificación

| Criterio | Comprobación y evidencia |
| --- | --- |
| MUS-AC-001 · MUS-REQ-001 | Validar la configuración de cada calendario y comprobar que las primeras entregas completas y sus enlaces permanentes aparezcan en ambos RSS y en los índices de GitHub Pages. |
| MUS-AC-002 · MUS-REQ-002 | Revisar el temario y las primeras entregas. Cada una explica el contexto, describe rasgos audibles y compara al menos dos ejemplos. |
| MUS-AC-003 · MUS-REQ-003 / MUS-NFR-001 | Comprobar títulos, créditos y enlaces antes de publicarlos. Revisar que las primeras entregas respalden los antecedentes con fuentes y expliquen los términos de escucha nuevos. |
| MUS-AC-004 · MUS-NFR-002 | Ejecutar la validación del repositorio y comprobar que reconstruir el sitio preserve los identificadores. Si hay entregas recurrentes, verificar que el planificador elija el segundo paso en la siguiente fecha debida. |

## Alta y seguimiento

La fecha de inicio se fija al activar cada curso. Si falla una generación futura, la fecha queda pendiente según la lógica existente. El estado de pausa detiene nuevas lecciones sin retirar entradas publicadas.

## Aprobación

El usuario confirmó el 21 de noviembre de 2026 dos feeds diarios, cada uno con un solo estilo por lección. El alta comienza con soleá y chacarera, y la siguiente fecha debida introduce alegrías y zamba.
