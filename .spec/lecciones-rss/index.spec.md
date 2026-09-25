---
title: Lecciones RSS — especificación del MVP
status: APPROVED
version: 1.0
created: 2026-09-18
updated: 2026-09-25
approved: 2026-09-23
---

# Lecciones RSS

## Objetivo y estado

Sistema personal que convierte un recorrido educativo local en lecciones permanentes, numeradas y consumibles desde RSS y una web estática. ChatGPT conserva su función de conversación; no se sincroniza con este sistema.

Estado: **APPROVED**. El usuario aprobó explícitamente la especificación completa el 2026-09-19. El alcance aprobado incluye avance automático al publicar y correcciones puntuales a pedido. La enmienda v0.4 eligió Gemini 2.5 Flash gratuito; v0.5 probó 3.8 y v0.6 añadió lecciones extras manuales. Tras errores HTTP 503 repetidos con 3.8, el usuario aprobó en v0.7 volver a 2.5. La enmienda v0.8 exige más extensión y cierre completo sólo a lecciones futuras.

La carpeta de trabajo estaba vacía al iniciar la revisión original. Ahora existe un repositorio implementado con cursos, configuración y workflow. Las fuentes externas verificadas están en [la revisión](review.md#fuentes-oficiales).

## Mapa de documentos

| Documento | Responsabilidad |
|---|---|
| [review.md](review.md) | Ambigüedades, contradicciones, riesgos y fuentes |
| [requirements.md](requirements.md) | Requisitos, límites y requisitos de calidad |
| [architecture.md](architecture.md) | Módulos, flujo, algoritmo y estructura del repositorio |
| [data-model.md](data-model.md) | Contratos propuestos, ejemplos e invariantes |
| [operations.md](operations.md) | Scheduling, idempotencia, persistencia, publicación y recuperación |
| [acceptance-criteria.md](acceptance-criteria.md) | Criterios observables y trazabilidad |
| [verification.md](verification.md) | Verificación prevista y evidencia pendiente |
| [decisions.md](decisions.md) | Alternativas, propuestas y preguntas abiertas |
| [manual-extra.spec.md](manual-extra.spec.md) | Enmienda aprobada para pedir una lección extra por ejecución manual |
| [future-completeness.spec.md](future-completeness.spec.md) | Enmienda aprobada para alargar y validar sólo las lecciones futuras |
| [reliable-generation.spec.md](reliable-generation.spec.md) | Enmienda aprobada para recuperar entregas diarias fallidas |
| [short-draft-recovery.spec.md](short-draft-recovery.spec.md) | Enmienda aprobada para ampliar borradores futuros demasiado breves |

## Alcance

Node.js y TypeScript; configuración YAML/JSON; syllabus Markdown con una secuencia estructurada; Gemini API aislada detrás de un contrato de proveedor; lecciones Markdown; HTML estático; RSS 2.0 completo por curso y global; GitHub Actions y GitHub Pages. Los cursos se descubren desde el filesystem. Un cuarto curso no exige cambios en el motor.

Quedan fuera base de datos, administración web, autenticación, aplicación móvil, comentarios, sincronización con conversaciones, personalización multiusuario y evaluación automática del dominio del alumno. Los tres cursos iniciales requieren revisar sus temarios y su punto de partida antes de activarlos.

## Lectura rápida de la propuesta

1. El syllabus contiene pasos ordenados con IDs permanentes. El programa elige el siguiente; la IA redacta únicamente ese paso.
2. Un paso genera una lección. La subdivisión se prepara en el syllabus, sin ramificaciones decididas por la IA durante la ejecución.
3. El curso avanza automáticamente con las nuevas lecciones, sin confirmación de lectura ni estudio. El avance editorial se deduce del historial Markdown. El cursor en `progress.json` es una proyección comprobable; el contexto aportado por el alumno no se inventa.
4. Una lección aceptada actúa como registro durable para recuperar un cursor desactualizado. No se promete atomicidad entre dos archivos mediante dos renombrados.
5. `GEMINI_API_KEY` permanece en GitHub Secrets. Generación automática y manual se ejecutan en Actions. Construcción y validación son locales y no usan la API.
6. Las fuentes se conservan en Git antes de desplegar. Un fallo de construcción o Pages no obliga a volver a generar contenido.
7. El alumno recibe el contenido completo por RSS. Si pide corregir una lección, se edita esa misma fuente y se reconstruyen web y feed, conservando identidad, numeración y progreso.

## Decisión cerrada y aprobación

**Q-001 resuelta, 2026-09-18:** avance automático al publicar. El usuario quiere recibir lecciones por RSS sin confirmar estudio. Los problemas se conversan después y las correcciones se aplican únicamente a la lección y al contenido solicitado; no se altera automáticamente el recorrido.

No quedan bloqueos de arquitectura en esta versión. Las decisiones de punto de partida, repositorio/publicación y calendario siguen delimitadas a sus etapas de activación en [decisions.md](decisions.md); el modelo quedó resuelto en la enmienda v0.4. La aprobación autoriza implementar el alcance definido; no autoriza todavía configurar credenciales, publicar el sitio ni activar cursos sin resolver sus gates.

### Registro de aprobación

- Aprobado por: usuario del proyecto.
- Fecha: 2026-09-19.
- Alcance: especificación v0.2 completa, con Q-001 resuelta como avance automático y correcciones puntuales.
- Enmienda aprobada por conversación: v0.4 usó Gemini 2.5 Flash gratuito; v0.5 migró a Gemini 3.8 Flash gratuito. No se implementa otro proveedor en el MVP.
- Fecha de aprobación de la enmienda v0.5: 2026-09-23. Alcance: configuración, parámetros de la API, validación y documentación; una mejora de calidad sólo se confirma tras comparar muestras reales.
- Enmienda v0.6 aprobada por el usuario el 2026-09-23: una extra por nuevo pedido manual del curso elegido, repetible el mismo día; ejecución diaria sin cambios de frecuencia.
- Enmienda v0.7 aprobada por el usuario el 2026-09-23: restaurar Gemini 2.5 Flash y sus parámetros anteriores tras errores HTTP 503 repetidos con 3.8; conservar la generación manual, el horario, la clave y el historial.
- Enmienda v0.8 aprobada por el usuario el 2026-09-23: extensión objetivo de 1000–1500 palabras y rechazo de borradores incompletos sólo para lecciones futuras; los archivos publicados no se modifican.
- Enmienda v0.9 aprobada por el usuario el 2026-09-25: una lección normal por día programado y recuperación de todas las fallidas cuando vuelva a funcionar el proveedor; varias en un día sólo para saldar atraso.
- Enmienda v1.0 aprobada por el usuario el 2026-09-25: ampliar dentro de los tres intentos un borrador futuro completo pero demasiado corto, sin bajar el umbral de 900 palabras ni prometer éxito frente a límites externos de Gemini.
- Estado de entrega: implementación iniciada; criterios funcionales todavía pendientes salvo evidencia registrada en [verification.md](verification.md).

## Entrega posterior a aprobación

1. Contratos, discovery, validación y selección determinista; fixtures sin API.
2. Persistencia recuperable y generación estructurada mediante un proveedor simulado.
3. Construcción de HTML/RSS y comprobación del prefijo de URL de Pages.
4. Credenciales, selección del modelo y prueba real manual en Actions.
5. Publicación real, importación en lector RSS y primera ejecución programada.

Cada etapa presenta evidencia de los criterios correspondientes. No se considera terminado el MVP con pruebas simuladas únicamente.
