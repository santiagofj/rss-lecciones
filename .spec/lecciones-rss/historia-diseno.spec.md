---
title: Curso ilustrado de historia del diseño
status: APPROVED
owner: usuario del proyecto
created: 2026-11-18
updated: 2026-11-18
approved: 2026-11-18
---

# Curso ilustrado de historia del diseño

## Objetivo y alcance

El curso permite reconocer los principales movimientos y estilos del diseño a partir de su contexto histórico, rasgos visuales, materiales, procesos y objetos representativos. El recorrido sigue los grandes bloques de *Diseño. La guía visual definitiva*, de DK, y desarrolla textos originales a partir de fuentes verificables.

El usuario aprobó el 18 de noviembre de 2026 la creación del nuevo curso RSS, el enfoque en movimientos y estilos y la inclusión de imágenes. Los diseñadores aparecen mencionados dentro del movimiento al que contribuyeron. Se adopta la cadencia diaria del sitio, a las 00:00 de Buenos Aires, y el formato expositivo aprobado para Filosofía. La fecha de alta es el 18 de noviembre de 2026.

## Requisitos

- DIS-REQ-001. El curso se ofrece en español por el flujo diario existente. Incluye una introducción y recorre Arts and Crafts, Art Nouveau, Art Déco, movimiento moderno, diseño de mediados de siglo, revolución cultural, posmodernismo y diseño contemporáneo.
- DIS-REQ-002. Las lecciones explican una corriente o tema histórico en prosa académica accesible, con ejemplos descritos en el texto. Las menciones a diseñadores son breves y pertinentes al movimiento.
- DIS-REQ-003. Cada paso incluye una imagen de una pieza representativa verificada antes de incorporarla al temario. La entrega muestra imagen, texto alternativo, pie explicativo, crédito, enlace a la ficha y licencia abierta o indicación de dominio público.
- DIS-REQ-004. El mismo contenido ilustrado se ofrece en la página y en el HTML del RSS. Las lecciones anteriores a esta función siguen siendo válidas con su esquema y contenido previos.

## Diseño y decisiones

- DIS-DEC-001. Usar un curso finito en `courses/historia-diseno`, con la estructura de temario y avance vigente. Cada paso contiene una ilustración editorial. Las fuentes son los catálogos de las instituciones y las fichas individuales de Wikimedia Commons.
- DIS-DEC-002. Guardar la ilustración verificada en los metadatos de cada lección al generarla. Gemini redacta el texto, con el objeto indicado en el temario como ejemplo de análisis. La selección editorial evita enlaces generados por el modelo y mantiene el crédito de cada entrega en su propio historial.
- DIS-DEC-003. Renderizar una figura a partir de metadatos validados, con URLs HTTPS y salida escapada. Se usan direcciones absolutas para los clientes RSS. Una imagen externa puede dejar de estar disponible o ser ocultada por el lector; el pie y el enlace al catálogo conservan la referencia a la pieza.
- DIS-DEC-004. El alta reutiliza el calendario, el proveedor y la recuperación de entregas pendientes del sitio. Una respuesta inválida o un límite de cuota conserva la fecha pendiente. El curso se puede pausar con su configuración habitual.
- DIS-DEC-005. La entrega de alta del 18 de noviembre se redactó y revisó con Codex. Se registra con esa procedencia y consume la fecha inicial. Las entregas siguientes pasan por la generación diaria de Gemini a partir de Arts and Crafts.

## Criterios de aceptación

| Criterio | Resultado observable | Verificación |
|---|---|---|
| DIS-AC-001 · DIS-REQ-001/002 | El curso activo está configurado para entregas diarias y cubre todos los bloques de DK. Su temario contiene movimientos, estilos y procesos. | Validar las fuentes y recorrer el temario. |
| DIS-AC-002 · DIS-REQ-003 | Cada paso contiene una imagen pertinente con ficha, crédito y licencia comprobados. Las entregas copian esos datos del temario. | Verificación de URLs, revisión de cada ficha y prueba de generación. |
| DIS-AC-003 · DIS-REQ-004 | Web y RSS muestran la figura con vínculos activos, escapan caracteres especiales y siguen construyendo las lecciones anteriores. | Pruebas HTML/RSS, validación del repositorio y verificación del despliegue. |

## Verificación local

El temario contiene 18 pasos ilustrados. Se verificó que las 18 direcciones de imagen entregaran un archivo JPEG. La prueba de integración comprueba el rechazo de URLs ajenas a HTTPS, la persistencia de los metadatos y la salida escapada en la web y en el RSS.
