---
title: Formato expositivo para Historia de la filosofía
status: APPROVED
owner: usuario del proyecto
created: 2026-11-18
updated: 2026-11-18
approved: 2026-11-18
---

# Formato expositivo para Historia de la filosofía

## Objetivo y alcance

El lector recibe artículos académicos en español, con contexto histórico, definiciones y reconstrucción de los argumentos. El cambio se aplica a las nuevas lecciones de `historia-filosofia`, incluidas las entregas atrasadas por generar y las extras que se soliciten. El historial en Git y la fecha de cada entrega siguen determinando el progreso del curso.

El generador actualmente pide cinco encabezados para todos los cursos. El adaptador de Gemini rechaza cualquier borrador que omita Práctica o las dos Comprobaciones respondidas. Cambiar sólo las instrucciones pedagógicas produciría indicaciones incompatibles con esa validación.

## Requisitos

- FIL-REQ-001. Cada nueva lección de Filosofía debe explicar el tema en prosa académica clara. Debe contextualizar el problema, definir los conceptos y exponer los argumentos antes de evaluar interpretaciones u objeciones relevantes. Identifica las obras primarias pertinentes cuando corresponda.
- FIL-REQ-002. Las lecciones nuevas de Filosofía son de lectura. Los ejemplos se presentan resueltos dentro de la explicación. El pedido al modelo excluye consignas de práctica, cuestionarios, comprobaciones y preguntas dirigidas al lector para evaluarlo. Las preguntas filosóficas pueden aparecer como parte de la exposición.
- FIL-REQ-003. El generador valida el formato expositivo de Filosofía. Los cursos sin ese formato configurado usan el contrato actual de cinco secciones. Las reglas comunes de extensión, cierre y reintento se aplican a ambos formatos.
- FIL-REQ-004. Se usa la misma secuencia de temas, identidad de lecciones y frecuencia de publicación. El archivo histórico sigue siendo válido y las lecciones nuevas se publican en los feeds y la web existentes.

## Diseño y decisiones

- FIL-DEC-001. Configurar el formato expositivo en el bloque `teaching` de Filosofía y usar esa opción tanto en el pedido al modelo como en la validación y los reintentos. Una opción por curso evita condicionar el motor a un slug. Con sólo editar el texto del pedido, el validador seguiría exigiendo un cuestionario.
- FIL-DEC-002. Pedir tres secciones principales, Contexto histórico y conceptual, Desarrollo y Cierre. El desarrollo admite subtítulos para argumentos, obras y debates según el tema. La validación puede verificar el orden y contenido de las secciones y rechazar secciones de examen. La revisión de una lección real comprueba también cómo se formulan las preguntas y cómo se presentan los ejemplos.
- FIL-DEC-003. Mantener el formato actual como valor por defecto para las configuraciones existentes. La opción surte efecto en el próximo borrador. Si el proveedor rechaza la solicitud o el borrador es inválido, se aplica la recuperación vigente y se conserva la fecha pendiente. La opción puede retirarse de la configuración para usar el formato por defecto en futuros borradores.

## Criterios de aceptación y verificación

| Criterio | Resultado observable | Verificación prevista |
|---|---|---|
| FIL-AC-001 · FIL-REQ-001/002 | El pedido exige exposición académica y dirige los ejemplos al desarrollo del tema. Una muestra explica el tema sin interrogar ni asignar tareas al lector. | Prueba del pedido y revisión de la primera entrega disponible. |
| FIL-AC-002 · FIL-REQ-002/003 | Un borrador expositivo completo pasa. Uno con una sección de examen o sin una sección obligatoria se rechaza. La ampliación de un borrador breve conserva el mismo formato. | Pruebas del adaptador con proveedor simulado. |
| FIL-AC-003 · FIL-REQ-003 | Un curso con configuración previa sigue exigiendo sus cinco secciones y las dos comprobaciones. | Pruebas existentes del contrato actual. |
| FIL-AC-004 · FIL-REQ-004 | Las fuentes históricas se validan y una nueva entrega de Filosofía aparece en su RSS y en la web con la secuencia esperada. | Validación del repositorio, prueba de generación y publicación con proveedor simulado, y verificación de la primera entrega real cuando esté disponible. |

## Preparación y aprobación

El usuario aprobó el 2026-11-18 el formato de las nuevas lecciones de Historia de la filosofía. El diseño usa el flujo de generación y publicación existente. La verificación de la primera entrega real depende de la disponibilidad de Gemini.

## Verificación local

La prueba de integración genera y amplía un borrador expositivo con Gemini simulado, verifica la secuencia y construye el RSS y el HTML con el historial existente. La prueba del validador verifica el rechazo de encabezados de evaluación y de borradores sin las secciones esperadas. Se validaron los cinco cursos y pasaron las 41 pruebas. Queda pendiente la revisión editorial de la primera entrega generada en producción.
