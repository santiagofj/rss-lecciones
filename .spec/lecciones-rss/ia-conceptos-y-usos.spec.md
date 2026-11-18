---
title: IA, conceptos y usos
status: APPROVED
owner: usuario del proyecto
created: 2026-11-18
updated: 2026-11-18
approved: 2026-11-18
---

# IA, conceptos y usos

## Objetivo

Entender el vocabulario de la inteligencia artificial y aplicarlo al elegir una herramienta, diseñar un flujo de trabajo o evaluar una respuesta.

El curso parte de la experiencia práctica de usar asistentes para programar. El diagnóstico indica que conviene dar prioridad a las diferencias observables entre modelos, al acceso a documentos, a la relación entre herramientas y agentes, y a la verificación de respuestas.

## Requisitos

- IA-REQ-001. Ofrecer una lección en español por cada día del calendario, a partir de la fecha de alta. La ejecución se programa a las 00:00 de Buenos Aires y el contenido completo se publica en el RSS del curso y en el sitio.
- IA-REQ-002. Presentar cada término cuando sirve para entender un caso. Cada bloque debe explicar cómo funciona el enfoque, qué problema resuelve y en qué situaciones puede fallar.
- IA-REQ-003. Cubrir fundamentos de IA, modelos de lenguaje, aplicaciones de texto, imagen y audio, acceso a información, automatización y evaluación. Los ejemplos de programación complementan los casos cotidianos.
- IA-REQ-004. Usar ejemplos reproducibles y fuentes primarias para afirmaciones sobre productos, capacidades o límites que puedan cambiar. Indicar la fecha de verificación cuando importe.
- IA-REQ-005. Conservar la secuencia, la identidad de las lecciones y la recuperación de entregas fallidas mediante el flujo de publicación existente.

## Temario propuesto

| Lecciones | Bloque | Pasos en orden |
| --- | --- | --- |
| 1–4 | Qué abarca la IA | **Qué llamamos IA**. Reglas, filtros y clasificación. Aprender de ejemplos, datos y redes neuronales. Predecir y generar en un mismo producto. |
| 5–8 | Cómo funciona un modelo de lenguaje | Entrenamiento e inferencia. Tokens y generación paso a paso. Ventana de contexto, historial y memoria. Qué puede cambiar al elegir otro modelo. |
| 9–12 | Cómo se usa un modelo | Prompts con objetivo, restricciones y ejemplos. Usar un modelo por API y pedir JSON. Interpretar imágenes y crear imágenes nuevas. Transcribir, sintetizar y analizar audio. |
| 13–16 | Cómo se le aporta información | Consultar un PDF y comprobar las páginas citadas. Buscar en la web y distinguir fuentes. Embeddings, recuperación semántica y RAG. Elegir entre contexto, RAG y ajuste fino. |
| 17–20 | Cómo se automatiza un trabajo | Herramientas y permisos: redactar, revisar y enviar. Qué conecta MCP. Flujos definidos y agentes con decisiones delegadas. Diseñar un flujo con aprobación humana y comprobar su resultado. |
| 21–24 | Cómo se evalúa | Errores plausibles, pruebas y fuentes primarias. Diseñar casos de evaluación para programación y documentos. Comparar calidad, privacidad, costo y latencia. Integración: elegir y evaluar un asistente para una tarea propia. |

En la primera lección, comparar un linter, un clasificador de spam y un asistente que propone cambios de código. Para cada caso, identificar la entrada, la salida y de dónde proviene el comportamiento. Introducir sólo los términos que permiten explicar esos ejemplos. Desde esa primera entrega, comprobar afirmaciones con ejemplos concretos y retomar el método en el bloque de evaluación.

Usar el formato guiado disponible en el motor. Cada entrega incluye un ejemplo, una práctica aplicable y dos comprobaciones respondidas. Al cierre de cada bloque, usar una práctica que recupere conceptos anteriores. Priorizar casos que se puedan comprobar con código breve, documentos de muestra o fuentes accesibles.

## Diseño y decisiones

| ID | Decisión y motivo |
| --- | --- |
| IA-DEC-001 | El usuario confirmó la cadencia diaria a las 00:00 de Buenos Aires el 18 de noviembre. Reutilizar el workflow del repositorio permite publicarlo en el mismo sitio y lector RSS. |
| IA-DEC-002 | Usar `courses/ia-conceptos-y-usos/` como ruta propuesta. La configuración, el temario y el progreso siguen el esquema de los otros cursos. El tramo propuesto tiene 24 pasos y cierra con un ejercicio de integración. El temario futuro se puede ajustar según las devoluciones del lector. |
| IA-DEC-003 | Activar mediante el proveedor y el workflow configurados para el sitio. El cambio de proveedor queda fuera del alta. La cuota diaria reportada por Gemini 2.5 Flash puede demorar las entregas automáticas. |

## Aceptación y verificación

| Criterio | Resultado observable y comprobación |
| --- | --- |
| IA-AC-001 · IA-REQ-001 | La configuración programa los siete días con la zona horaria acordada. Tras desplegar, la primera lección aparece completa en la web y en `/ia-conceptos-y-usos/feed.xml`. |
| IA-AC-002 · IA-REQ-002/003 | La revisión del temario confirma 24 pasos en seis bloques y la progresión desde el nivel diagnosticado. La primera lección explica cada término nuevo con un caso concreto. La validación del formato guiado y la revisión editorial comprueban la práctica y las dos comprobaciones. |
| IA-AC-003 · IA-REQ-004 | La revisión editorial comprueba que los ejemplos de la primera entrega se puedan reproducir y que las referencias respalden las afirmaciones sobre productos o límites. |
| IA-AC-004 · IA-REQ-005 | La validación local comprueba el temario y el progreso. Se verifica que una entrega fallida siga pendiente y que reejecutar la publicación de una lección guardada conserve su identificador. |

El 18 de noviembre pasaron la validación, el chequeo de tipos y las 42 pruebas existentes. La primera lección pasó la validación del formato guiado y se ejecutó su ejemplo de JavaScript con los cuatro valores previstos. Una comprobación local confirmó que el 19 de noviembre a las 00:00 se programa el paso dos, que un fallo simulado de cuota conserva la fecha pendiente y que reconstruir el feed preserva su contenido y el enlace permanente.

## Alta y seguimiento

Fijar la primera fecha debida al activar el curso. Si el proveedor alcanza la cuota, el flujo existente conserva la fecha pendiente. Si hace falta para el alta, preparar y validar editorialmente la primera entrega y publicar el material guardado con el modo manual existente. Registrarla para la primera fecha del curso y comprobar que el flujo diario continúa por el paso dos. La opción de pausa detiene entregas futuras.

Evidencia operativa: el [lote del 18 de noviembre](https://github.com/santiagofj/rss-lecciones/actions/runs/44296990865) registró 29 entregas pendientes y errores de cuota diaria. La [documentación de Google](https://aistudio.google.com/docs/pricing#gemini-2.5-flash) anuncia el redireccionamiento de Gemini 2.5 Flash a Gemini 3.5 Flash-Lite el 1 de diciembre de 2026.

## Aprobación

El usuario aprobó el 18 de noviembre de 2026 el recorrido inicial de 24 lecciones y la activación diaria por RSS. La primera fecha del curso es el 18 de noviembre. La primera entrega se prepara y valida con Codex para el alta. Las fechas siguientes usan el flujo programado.
