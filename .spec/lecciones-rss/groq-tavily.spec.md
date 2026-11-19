---
title: Generación gratuita con Groq y Tavily
status: APPROVED
owner: usuario del proyecto
created: 2026-11-19
updated: 2026-11-19
approved: 2026-11-19
---

# Generación gratuita con Groq y Tavily

La ejecución 44513432590 publicó nueve lecciones y dejó veintisiete pendientes. Registró rechazos por encabezados y por cuota diaria de Gemini. El paso de informe falló después de publicar Pages.

## Alcance y decisiones

- GT-REQ-001. Groq Free con GPT-OSS 120B genera lecciones guiadas y expositivas. El esquema JSON exige los cuerpos de sección y el programa agrega los encabezados. Se mantienen las reglas editoriales de longitud, comprobaciones y cierre.
- GT-REQ-002. Respetar la espera que indique Groq dentro del presupuesto del lote. Las entregas sin publicar se mantienen pendientes y se recuperan en orden.
- GT-REQ-003. Cuando baja la reserva de Naipes, Tavily Free busca fuentes y Groq propone juegos a partir de los resultados. Las comprobaciones de identidad, exclusiones y referencias usan todo el temario. Un fallo de búsqueda permite usar la reserva.
- GT-REQ-004. Un despliegue parcial muestra el informe de pendientes en Actions con salida exitosa. Un fallo de infraestructura o un lote que intenta generar y fracasa por completo conserva la salida fallida.
- GT-DEC-001. Sustituir Gemini en ambos recorridos y usar dos secretos de Actions. La identidad y las fechas de las entregas se derivan del mismo historial en Git.
- GT-DEC-002. Separar búsqueda y generación estructurada. Tavily ofrece una cuota gratuita explícita de búsqueda y entrega URLs que el programa puede indexar.
- GT-DEC-003. Probar generación y ampliación en una copia temporal antes de actualizar el workflow activo. Si el cambio activo requiere reversión, restaurar el código y la configuración del proveedor anterior conservando los commits de contenido posteriores.

## Aceptación y verificación

| Criterio | Verificación |
| --- | --- |
| GT-AC-001 · GT-REQ-001 | Pruebas del adaptador para los dos formatos y prueba real de una lección de cada formato en una copia temporal. Los cuerpos válidos producen los encabezados canónicos y un borrador incompleto se rechaza. |
| GT-AC-002 · GT-REQ-002 | Respuestas simuladas de cuota y pruebas de recuperación del repositorio. Los reintentos son acotados y las fechas pendientes se preservan sin duplicados. |
| GT-AC-003 · GT-REQ-003 | Prueba de resultados simulados de Tavily, exclusiones y fuentes referenciadas. Prueba real de ampliación en la copia temporal. |
| GT-AC-004 · GT-REQ-004 | Ejecutar el paso de informe con y sin archivo de pendientes y corroborar su posición después de Pages. Verificar que un fallo total de generación conserva salida distinta de cero. |

El usuario aprobó avanzar el 19 de noviembre tras revisar el alcance e instaló las claves de Groq y Tavily como secretos de Actions.

Pasaron la validación de los siete cursos, el chequeo de tipos y las 43 pruebas. El paso de resumen terminó con código 0 con y sin pendientes. El CLI terminó con código 1 durante un fallo total simulado. El cambio de avisos se publicó primero en `d272ff8`.

La [prueba aislada de los dos formatos](https://github.com/santiagofj/rss-lecciones/actions/runs/44529270752) generó y validó un borrador guiado de Audio y uno expositivo de Filosofía. Las pruebas con Naipes confirmaron acceso a Tavily y revelaron fuentes irrelevantes para algunos juegos propuestos. El filtro exige una fuente que identifique el juego en su título o ruta y descarta resultados mal formados individualmente. Si se agotan los intentos, el curso usa su reserva.
