# Requisitos

Estado y aprobación: [índice](index.spec.md). MUST significa obligatorio tras aprobación; SHOULD indica recomendación cuya excepción debe documentarse. Las decisiones propuestas no son aprobación del usuario.

## Funcionales

| ID | Requisito |
|---|---|
| REQ-001 | El motor MUST descubrir directorios de cursos dinámicamente y validar su contrato sin una lista central de slugs. |
| REQ-002 | El MVP MUST configurar Audio digital, Full Stack y Música clásica; un cuarto curso MUST añadirse mediante archivos de curso. |
| REQ-003 | El sistema MUST elegir el siguiente paso de una secuencia local explícita y finita; la IA MUST NOT elegir, reordenar, saltar ni añadir pasos. |
| REQ-004 | Cada lección MUST ser Markdown independiente con metadata validada, numeración por curso, identidad y URL permanentes. |
| REQ-005 | El sistema MUST representar explícitamente punto de inicio, contexto del alumno y cursor del recorrido, avanzar automáticamente con las nuevas lecciones y MUST NOT exigir confirmación de lectura/estudio ni atribuir dominio por publicar. |
| REQ-006 | La generación MUST usar Gemini API con `gemini-2.5-flash` detrás de un contrato de proveedor y aceptar sólo una respuesta completa validada para el paso seleccionado. |
| REQ-007 | El sistema MUST admitir generación manual para un curso y selección automática de cursos según calendario independiente. |
| REQ-008 | El MVP MUST admitir `weekdays`, `weekly` con días y `manual`, además de cursos activos y pausados. |
| REQ-009 | El sistema MUST crear RSS 2.0 global y por cada curso con `feed: true`, incluyendo el HTML completo de cada lección y enlace web. |
| REQ-010 | El build MUST crear portada general, portada y listado por curso y página por lección mediante HTML estático. |
| REQ-011 | GitHub Actions MUST ejecutar el motor con una programación compartida y permitir ejecución manual sin un workflow por curso. |
| REQ-012 | GitHub Pages MUST publicar un artifact construido desde fuentes durables, conservando las rutas bajo el prefijo del repositorio. |
| REQ-013 | El sistema MUST ofrecer validación y construcción locales sin clave, y una forma manual de solicitar generación remota. |
| REQ-014 | Antes de activar cada curso MUST revisarse su syllabus y punto de inicio; la importación masiva de conversaciones queda fuera del MVP. |
| REQ-015 | El curso MUST detener generación al agotar el syllabus y MUST conservar accesibles sus lecciones y feeds al pausarlo o terminarlo. |
| REQ-016 | Las lecciones MUST expresar ubicación y propósito, objetivo, explicación, ejemplo o escucha concreta, práctica sustantiva y continuidad; cada materia MUST definir instrucciones educativas locales. |
| REQ-017 | Una corrección específica solicitada por el usuario MUST aplicarse a la misma lección, regenerando HTML/RSS y conservando ID, GUID, número, ruta, fecha original y progreso; MUST NOT producir otra lección ni cambiar automáticamente el syllabus. |

## Calidad y operación

| ID | Requisito |
|---|---|
| NFR-001 | Un error de API o validación previo a aceptar la lección MUST dejar intactos los archivos fuente de ese curso. |
| NFR-002 | Una interrupción durante persistencia MUST ser detectable y recuperable sin perder lecciones aceptadas ni repetir su llamada a la API cuando ya existen localmente. |
| NFR-003 | Cada curso MUST aceptar como máximo una lección por fecha local, incluyendo ejecuciones manuales; no se permite sobrescribir lecciones existentes. |
| NFR-004 | Todas las operaciones que generan o despliegan MUST serializarse en Actions; un push concurrente externo MUST causar rechazo seguro, sin force push. |
| NFR-005 | `GEMINI_API_KEY` MUST almacenarse exclusivamente en GitHub Secrets e inyectarse en el paso remoto de generación; MUST NOT aparecer en archivos, artifacts, logs ni HTML. |
| NFR-006 | HTML y XML MUST escapar metadata y neutralizar contenido activo; sólo el directorio de salida pública MUST entrar en el artifact de Pages. |
| NFR-007 | Build y feeds MUST ser reproducibles desde las fuentes sin API ni cambios en progreso; un fallo MUST impedir desplegar salida incompleta. |
| NFR-008 | Generación MUST tener timeout y límites explícitos de entrada, salida, llamadas y tamaño de contenido; reintentos implícitos del SDK MUST deshabilitarse. |
| NFR-009 | Los informes MUST distinguir omisión, generación, recuperación y fallos por curso, así como commit remoto y despliegue. |
| NFR-010 | Los feeds MUST conservar GUID y fecha original al reconstruirse, tener orden estable y usar URLs canónicas absolutas. |
| NFR-011 | Un fallo de generación en un curso MUST permitir procesar y conservar los éxitos de los otros; una configuración inválida MUST detener el lote antes de usar la API. |

## Restricciones y exclusiones

Un usuario; filesystem y Git como almacenamiento; Node.js/TypeScript; sin framework web complejo. GitHub y Gemini API son dependencias externas. El nivel gratuito de Gemini puede usar entradas y salidas para mejorar productos de Google; sólo se enviará material educativo destinado a publicación y contexto no sensible. No se accede a conversaciones de ChatGPT ni se modifica ninguna automatización existente.

No se incorporan base de datos, login, comentarios, estadísticas complejas, editor visual, panel administrativo, sincronización bidireccional, aplicación móvil, generación de audio, búsqueda web automática, evaluación del alumno ni múltiples proveedores en producción. El contrato de proveedor permite pruebas simuladas sin crear una plataforma de plugins.
