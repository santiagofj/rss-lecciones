# Decisiones propuestas y preguntas

DEC-004 está confirmada por el usuario, junto con la política de correcciones DEC-017. Las demás decisiones siguen propuestas para aprobación conjunta de la arquitectura.

| ID | Propuesta | Alternativa y trade-off | Requisitos |
|---|---|---|---|
| DEC-001 | Node/TypeScript sin servidor ni framework web | Un generador de sitios añade convenciones y dependencias; no hace falta para portadas/feeds simples | REQ-010, REQ-013 |
| DEC-002 | Pasos estructurados en frontmatter de `syllabus.md` | Narrativa libre no determina pasos; YAML separado duplica documentos de referencia | REQ-003 |
| DEC-003 | Un paso equivale a una lección | Subdivisión automática requiere subestados, límites y decisiones educativas adicionales | REQ-003, REQ-016 |
| DEC-004 | **Confirmada:** avance automático al publicar, sin confirmación de lectura/estudio; contexto y cursor mínimo | Confirmación manual descartada por el usuario por la carga de uso; publicar no acredita dominio del tema | REQ-005; Q-001 resuelta |
| DEC-005 | Lecciones como historial y cursor como proyección recuperable | Cursor como verdad única puede divergir; derivar todo sin actualizar progreso incumple la expectativa de estado explícito | REQ-004, REQ-005, NFR-001, NFR-002 |
| DEC-006 | UUID permanente, ruta basada en sequence/stepId | GUID basado en URL cambia con dominio; ruta por título depende de contenido generado | REQ-004, NFR-010 |
| DEC-007 | RSS 2.0 con HTML completo | Atom ofrece estructura moderna, pero sostener dos formatos no aporta al MVP; lectores RSS estándar son el objetivo | REQ-009, NFR-010 |
| DEC-008 | Tick compartido, fecha local, sin backfill, cupo diario también manual | Recuperar todos los días perdidos puede inundar el lector y consumir llamadas inesperadas | REQ-007, REQ-008, REQ-011, NFR-003 |
| DEC-009 | Generación sólo en Actions; manual por dispatch | Generar localmente exigiría excepción a clave exclusivamente en GitHub Secrets | REQ-007, REQ-013, NFR-005 |
| DEC-010 | Gemini API con salida estructurada JSON y proveedor aislado | JSON libre necesita más reparación; estructura correcta aún no asegura calidad educativa | REQ-006, NFR-008 |
| DEC-011 | Un workflow con concurrencia y deploy explícito; fuentes antes de build | Depender del push del bot para Pages no funciona como disparador normal; workflows separados añaden coordinación | REQ-011, REQ-012, NFR-004, NFR-007 |
| DEC-012 | Lock, staging y recuperación desde lección aceptada | Dos renombrados no son una transacción; base de datos/journal adicional añade almacenamiento innecesario | NFR-001, NFR-002 |
| DEC-013 | Renderer común seguro, salida pública separada y feeds completos | HTML crudo permite contenido activo; copiar el repositorio a Pages expone archivos internos | REQ-009, REQ-010, NFR-006 |
| DEC-014 | Publicación automática validada y revisión humana de muestras antes de activación | Aprobar cada lección reduce riesgo editorial pero agrega una cola de revisión no solicitada | REQ-006, REQ-014, REQ-016 |
| DEC-015 | Validación global antes de API y aislamiento de fallos del proveedor por curso | Fallar todo por un timeout frena materias independientes; tolerar config rota puede ocultar errores de estado | NFR-009, NFR-011 |
| DEC-016 | Congelar prefijo del plan; permitir ampliar/revisar sufijo sin publicar | Reordenar el pasado sin migración invalida la selección y continuidad | REQ-003, REQ-015 |
| DEC-017 | **Confirmada:** corregir una lección existente sólo cuando el usuario pide un cambio específico; conservar identidad y avance | Republicar como nueva lección produciría duplicados y alteraría el recorrido; no se añade un flujo de aprobación por lección | REQ-017, NFR-010 |
| DEC-018 | **Confirmada:** Gemini 3.8 Flash en nivel gratuito, con key sólo en GitHub Secrets | Gemini 2.5 Flash fue la elección inicial; el usuario priorizó calidad sin costo y aprobó la migración el 2026-09-23. Una API gratuita de pesos abiertos exigiría otro proveedor y no ofrece aquí una mejora de calidad comprobada | REQ-006, NFR-005 |

## Preguntas abiertas

| ID | Tipo | Pregunta/condición | Impacto |
|---|---|---|---|
| Q-001 | RESUELTA, 2026-09-18 | El usuario eligió avance automático al publicar y consumo sólo por RSS; si detecta un problema pedirá una corrección puntual | Sin estado de confirmaciones, comandos de estudio ni cambios automáticos por conversaciones |
| Q-002 | BLOCKER de activación educativa | Confirmar por curso si empieza desde cero o continúa, y cuál es el primer paso local | Se pueden construir motor y fixtures; no activar contenidos reales sin revisión |
| Q-003 | BLOCKER de despliegue | Confirmar repo, plan/visibilidad, baseUrl y permisos de escritura compatibles con protecciones | Configuración externa y exposición pública; no bloquea fixtures locales |
| Q-004 | RESUELTA, actualizada 2026-09-23 | Gemini 3.8 Flash figura en el nivel gratuito; se reutiliza la API key existente. Se mantienen inicialmente los límites de `site.yml` y se comparará calidad y disponibilidad con una generación real | Habilita integración sin API OpenAI ni gasto inicial |
| Q-005 | BLOCKER de scheduling real | Confirmar frecuencias de los tres cursos y hora del tick compartido | No trasladar calendarios de otros sistemas sin aprobación |

Q-002 a Q-005 están delimitadas a etapas futuras y se resolverán antes de esas acciones; no se inventan sus respuestas. No se necesitan cinco preguntas simultáneas para revisar la arquitectura. Si sus respuestas contradicen el alcance propuesto, se actualiza la especificación antes de continuar.

## Cambios

- 2026-09-18, v0.1: revisión inicial de carpeta vacía; contratos y operación propuestos; Q-001 consultada; estado `BLOCKED`; ninguna implementación ni aprobación registrada.
- 2026-09-18, v0.2: Q-001 resuelta por el usuario; avance automático y correcciones puntuales confirmados; REQ-017 y AC-027 añadidos; estado `READY FOR APPROVAL`. La arquitectura completa todavía no está aprobada.
- 2026-09-19, v0.3: el usuario aprobó explícitamente la especificación completa y autorizó comenzar la implementación. Q-002 a Q-005 continúan como gates de activación de cursos, integración pagada y publicación.
- 2026-09-19, v0.4: enmienda aprobada en conversación para usar Gemini 2.5 Flash gratuito; Q-004 resuelta. La clave se tratará únicamente como `GEMINI_API_KEY` en GitHub Secrets.
- 2026-09-23, v0.5: el usuario aprobó migrar a Gemini 3.8 Flash para buscar mayor calidad sin costo. Se conserva el contrato de lección y la protección frente a respuestas inválidas; la mejora editorial queda pendiente de comparación real.
