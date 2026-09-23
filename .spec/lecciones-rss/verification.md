# Estrategia de verificación

## Evidencia actual

La etapa comenzó de forma documental y luego recibió aprobación. En ese momento no se había ejecutado Gemini, creado cursos reales ni workflows, desplegado el sitio o comprobado un lector. La evidencia local de implementación se registra a medida que se ejecutan las verificaciones; los criterios de integración siguen pendientes de evidencia actualizada.

Enmienda v0.5 (2026-09-23): `npm run validate` validó los cuatro cursos; `npm run typecheck` y `npm test` pasaron (9 pruebas en 3 archivos), incluida una respuesta HTTP simulada que comprueba el nuevo modelo, `thinkingLevel` y el contrato JSON. `git diff --check` no reportó errores. La clave no está disponible en el entorno local y GitHub CLI no tiene una sesión válida; no se ejecutó una generación real con 3.8 ni se comparó su calidad editorial con 2.5. AC-028 tiene evidencia local parcial y sigue pendiente de integración.

Enmienda v0.6 (2026-09-23): los fixtures locales cubren pedidos extra sucesivos con IDs de run diferentes, rerun del mismo ID, una lección diaria normal independiente, rechazo de curso inválido/pausado/agotado y rechazo de historial con fechas normales o IDs extra repetidos. El workflow YAML se comprobó localmente. El usuario ejecutó el run manual `35873727059` para Historia de la filosofía y su rerun; ambos llegaron a la generación, pero cada intento recibió tres HTTP 503 de Gemini 3.8. No hubo lección nueva ni prueba de publicación exitosa de extras.

Enmienda v0.7 (2026-09-23): el usuario aprobó volver a Gemini 2.5 Flash. La verificación local debe comprobar el modelo, `thinkingBudget: 1024`, `temperature: 0.2`, el JSON estructurado, los cuatro cursos y las pruebas. AC-035 seguirá pendiente hasta un pedido manual real exitoso con el nuevo commit.

Enmienda v0.8 (2026-09-23): para lecciones futuras, `npm run validate` validó los cuatro cursos históricos sin modificarlos, `npm run typecheck` pasó, `npm test` pasó (19 pruebas en 3 archivos) y `git diff --check` no reportó errores. Las pruebas cubren el prompt de 1000–1500 palabras, el borrador válido sin marca publicada, el rechazo de respuestas breves/incompletas y el reintento de una respuesta JSON válida sin marca final. AC-036 y AC-037 tienen evidencia local; AC-038 conserva pendiente la ejecución real en Actions y la comprobación de que Gemini 2.5 satisfaga el nuevo contrato.

La versión aprobada 0.4 contenía nueve documentos, 28 requisitos REQ/NFR y 27 criterios AC. La enmienda v0.5 mantiene los requisitos y agrega AC-028 para la migración de modelo. La comprobación documental verifica cobertura de requisitos, métodos de verificación, enlaces locales y bloques Markdown cerrados. El índice y el registro de decisiones reflejan Q-001 y Q-004 resueltas y estado `APPROVED`. Esto comprueba cobertura documental, no funcionamiento del sistema.

### Etapa 1 — 2026-09-19

- `npm run typecheck`: pasa con TypeScript estricto.
- `npm test`: pasan los casos de discovery de cuatro cursos sin lista central, selección repetible del próximo paso, cursor incoherente, ID de curso duplicado, clave YAML duplicada y propiedad desconocida.
- `npm run validate`: ejecuta la CLI y reporta correctamente que `site.yml` y `courses/` aún no existen. No se consideran fuentes reales hasta confirmar puntos de inicio y URL del repositorio.
- Dependencias instaladas y auditadas por npm: cero vulnerabilidades reportadas durante la instalación. Esta evidencia puede cambiar y debe repetirse antes del despliegue.

Evidencia parcial: AC-001 (discovery de cuarto curso), AC-002 (parte de validación estructural) y AC-003 (selección determinista) están cubiertos mediante repositorios temporales. No se marcan todavía como satisfechos en el MVP porque faltan los tres cursos reales y la integración completa.

## Verificación prevista

| Criterios | Método | Evidencia esperada |
|---|---|---|
| AC-001 | Fixture con tres cursos y añadir cuarto; inspección del discovery | Cursos encontrados; diff sin cambio del motor |
| AC-002 | Fixtures inválidos representativos; proveedor contador de llamadas | Diagnóstico preciso; cero llamadas; fuentes intactas |
| AC-003, AC-005, AC-011 | Casos de selección con inicio posterior, agotamiento, ampliación y cambios del prefijo | Paso seleccionado/omisión/error y cursor esperado |
| AC-004 | Integración en filesystem temporal con proveedor simulado | Markdown/frontmatter completos, hash de contexto y cursor coherente |
| AC-006, AC-024 | Proveedor simulado para errores/timeout y casos de límites; inspección de configuración SDK | Hashes de fuentes antes/después, conteo de llamadas y diagnóstico |
| AC-007, AC-008 | Inyección de fallo en puntos de persistencia y reinicio de proceso | Estados intermedios detectados, recuperación sin API, contexto conservado |
| AC-009, AC-010 | Reloj fijo y calendario; tick normal, run manual nuevo/repetido, medianoche y fecha UTC/local distinta | Cupo normal diario y deduplicación por run; cero llamadas al omitir |
| AC-012 | Dos procesos sobre misma carpeta; dos dispatches reales y push externo controlado | Un escritor local; serialización del run activo; rechazo push sin force |
| AC-013, AC-014, AC-026 | Parser XML independiente y comparación de feeds entre builds/correcciones | Campos, contenido íntegro, orden, GUID/fecha persistentes y rutas estables |
| AC-015, AC-017 | Build local sobre snapshot con baseUrl de proyecto; comprobador de enlaces y hashes | Enlaces válidos, archivos reproducibles, ninguna mutación de fuentes |
| AC-016, AC-018 | Fixtures de metadata/Markdown adversos e inspección de artifacts/logs | HTML/XML seguro; rutas confinadas; contenido público limitado; sin secretos |
| AC-019 | CLI dispatch con GitHub CLI autenticada y ejecución manual real | Enlace de run, lección conservada en commit remoto y comandos locales sin clave |
| AC-020, AC-021 | Ejecución schedule real; fallo controlado de publicación y rerun-build | SHA, logs de Actions, URL de Pages/feeds disponible; conteo sin nueva API en recuperación |
| AC-022 | Importación y refresh en lector RSS elegido por el usuario | Lector/versión, contenido completo, permalink y ausencia de duplicados |
| AC-023 | Revisión humana del syllabus y una lección por curso | Punto inicial aprobado y evaluación concreta de profundidad/práctica/continuidad |
| AC-025 | Lote simulado con fallo y éxito, luego integración del workflow | Éxito durable, deploy permitido sobre fuentes válidas e informe de fallo parcial |
| AC-027 | Corregir texto de una lección fixture, reconstruir y volver a seleccionar el siguiente paso | Contenido actualizado, metadata/cursor/syllabus intactos, mismo número de items y avance sin confirmación |
| AC-028 | Evidencia histórica de la migración a 3.8 | Pruebas locales pasadas; run `35873727059` y rerun fallidos por HTTP 503, sin lección nueva |
| AC-029 a AC-034 | Repositorio temporal con varios runs en una fecha, historial y feeds; luego dispatch real | Una extra por run nuevo, rerun inocuo, tick normal independiente, rechazo seguro y publicación remota comprobada |
| AC-035 | Inspección de configuración, prueba simulada y pedido manual real tras subir el rollback | Solicitud compatible con 2.5, respuesta válida publicada o diagnóstico preciso sin alterar progreso |
| AC-036 a AC-038 | Prompt y borradores simulados, validación de los cuatro cursos y una generación real posterior | Sólo nuevas lecciones completas con marca eliminada, historial intacto y avance remoto comprobado |

Las pruebas deben verificar comportamiento del dominio y recuperación real en disco, no reproducir helpers internos línea por línea. No se harán pruebas de cada plantilla visual simple. Las pruebas pagadas se limitan a las necesarias una vez confirmado modelo y límites; se usan fixtures para combinaciones de errores.

## Lista de salida por etapas

1. **Especificación:** Q-001 resuelta; revisar el conjunto de propuestas y registrar aprobación/versionado. Q-002 a Q-005 siguen como gates de activación, no como datos supuestos.
2. **Local sin API:** contratos, selección, persistencia y renderer; evidencias automatizadas correspondientes.
3. **Integración manual:** modelo/Secrets/permisos confirmados, primera generación real y commit remoto.
4. **Publicación:** Pages disponible, lector RSS probado y recuperación de despliegue sin generar.
5. **Automatización:** observar al menos una ejecución programada real. Un dispatch exitoso por sí solo no demuestra el scheduler.

## Informe de validación futuro

Cada evidencia MUST identificar AC, snapshot/commit, método y resultado. Estados permitidos: pendiente, satisfecho, fallido o bloqueado con causa. Un fallo no se reclasifica como satisfecho porque una simulación haya pasado. Se reportan por separado aprobación de diseño, validación técnica y funcionamiento real.
