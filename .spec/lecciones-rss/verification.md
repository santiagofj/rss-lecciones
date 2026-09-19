# Estrategia de verificación

## Evidencia actual

La etapa comenzó de forma documental y luego recibió aprobación. No se ejecutó Gemini, no se crearon cursos reales ni workflows, no se desplegó y no se comprobó ningún lector. La evidencia local de implementación se registra a medida que se ejecutan las verificaciones; los criterios de integración siguen pendientes.

La versión aprobada 0.4 contiene nueve documentos, 28 requisitos REQ/NFR y 27 criterios AC. La comprobación documental verifica cobertura de requisitos, métodos de verificación, enlaces locales y bloques Markdown cerrados. El índice y el registro de decisiones reflejan Q-001 y Q-004 resueltas y estado `APPROVED`. Esto comprueba cobertura documental, no funcionamiento del sistema.

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
| AC-009, AC-010 | Reloj fijo y calendario; casos manual/programado, medianoche y fecha UTC/local distinta | Elegibilidad y unicidad diaria correctas; cero llamadas al omitir |
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

Las pruebas deben verificar comportamiento del dominio y recuperación real en disco, no reproducir helpers internos línea por línea. No se harán pruebas de cada plantilla visual simple. Las pruebas pagadas se limitan a las necesarias una vez confirmado modelo y límites; se usan fixtures para combinaciones de errores.

## Lista de salida por etapas

1. **Especificación:** Q-001 resuelta; revisar el conjunto de propuestas y registrar aprobación/versionado. Q-002 a Q-005 siguen como gates de activación, no como datos supuestos.
2. **Local sin API:** contratos, selección, persistencia y renderer; evidencias automatizadas correspondientes.
3. **Integración manual:** modelo/Secrets/permisos confirmados, primera generación real y commit remoto.
4. **Publicación:** Pages disponible, lector RSS probado y recuperación de despliegue sin generar.
5. **Automatización:** observar al menos una ejecución programada real. Un dispatch exitoso por sí solo no demuestra el scheduler.

## Informe de validación futuro

Cada evidencia MUST identificar AC, snapshot/commit, método y resultado. Estados permitidos: pendiente, satisfecho, fallido o bloqueado con causa. Un fallo no se reclasifica como satisfecho porque una simulación haya pasado. Se reportan por separado aprobación de diseño, validación técnica y funcionamiento real.
