# Lecciones RSS

Este repositorio genera cursos personales con Gemini y los publica como páginas HTML y feeds RSS mediante GitHub Actions.

## Cursos

| Curso | Lecciones del recorrido | Enfoque |
|---|---:|---|
| Audio digital práctico | 86 | Señal, formatos, procesamiento, reproducción, medición y escucha crítica. |
| Full Stack progresivo | 130 | Comprensión conceptual de frontend, backend, datos, seguridad, arquitectura y operación, sin stack obligatorio. |
| Historia de la filosofía | 63 | Recorrido histórico de problemas y argumentos. |
| Música clásica desde cero | 95 | Lenguaje, instrumentos, formas, historia, repertorio e interpretación. |
| Un juego de naipes por día | Abierto; 15 juegos iniciales | Juegos de distintas tradiciones, sin solitarios ni casino; comienza con Brisca. |

Cada curso mantiene su temario, progreso y lecciones dentro de `courses/<slug>/`. Publicar una lección avanza automáticamente el cursor al siguiente paso. Una corrección posterior puede editar el mismo archivo para conservar su identificador y su URL.

La [ampliación aprobada](.spec/lecciones-rss/complete-curricula.spec.md) conserva las primeras 14 lecciones de Audio, Full Stack y Música y añade módulos con prácticas, repasos e integración. El [mapa de cobertura](.spec/lecciones-rss/complete-curricula-coverage.md) enumera las futuras lecciones y sus objetivos. Los totales describen el temario disponible, no cuántas lecciones se han publicado ni qué conocimientos domina el alumno. Los cursos finitos se detienen al terminar sus pasos.

[Naipes](.spec/lecciones-rss/juegos-naipes.spec.md) comienza el `2026-11-08` y no tiene un total de entregas ni una fecha final. Cuando quedan cinco juegos preparados o menos, el mismo proceso diario investiga hasta siete nuevos con Google Search y Gemini y los incorpora en lotes documentados dentro de `courses/juegos-naipes/continuation/`. Comprueba identidades, nombres, alias y fuentes contra todo el recorrido, aunque la investigación sólo recibe una ventana reciente para acotar el contexto. No se aceptan lotes sin fuentes de búsqueda. La generación no garantiza por sí sola exactitud editorial ni detecta toda equivalencia semántica entre variantes.

Los lotes se publican como archivos completos; el historial anterior permanece intacto. Si la investigación falla, se usa la reserva y se reintenta otro día. Si no quedan juegos preparados, la entrega queda pendiente y el curso conserva su continuación automática. El estado `paused` detiene tanto ampliaciones como lecciones. Los tamaños de reserva y lote son parámetros operativos, no un límite del curso. Se conserva el proveedor y el secreto existentes; la ampliación hace solicitudes adicionales de búsqueda y extracción cuando es necesaria.

## Horario

El flujo `.github/workflows/publish.yml` se ejecuta todos los días a las 03:00 UTC, equivalente a las 00:00 de Buenos Aires. Corresponde una lección normal por curso y día programado. Si una entrega falla, queda pendiente: la siguiente ejecución genera primero las atrasadas y luego la del día, sin saltar pasos. Puede haber varias publicaciones el mismo día para recuperar el atraso, hasta 40 lecciones por run; lo que exceda ese límite sigue pendiente. Cada curso declara su `schedule.startDate`.

Audio, Full Stack y Música se reactivaron el `2026-10-20`, con `schedule.startDate` fijado en esa fecha: es el inicio del nuevo tramo de entregas debidas, no una modificación de las fechas históricas. No se recupera el intervalo agotado desde el 3 de octubre. La fecha se mantiene fija, también ante fallos y reintentos; así los errores posteriores continúan siendo recuperables. Filosofía conserva su calendario. Una futura reactivación sin recuperación de un intervalo deberá fijar y documentar su propia fecha antes de activarse.

Para pedir **otra lección** de un curso, inicia `Generar y publicar lecciones` desde GitHub Actions con el campo `course` (por ejemplo, `fullstack`). También puedes ejecutar:

```powershell
gh workflow run publish.yml --ref main -R santiagofj/rss-lecciones -f course=fullstack
```

Repite el pedido cuando quieras la siguiente lección, incluso el mismo día. Los pedidos se procesan de uno en uno (GitHub admite hasta 100 pendientes en este grupo). El curso debe estar activo y tener pasos pendientes; la cuota gratuita de Gemini también puede impedir un pedido. Reejecutar el mismo run no pide otra lección: para eso inicia un run nuevo.

Para recuperar ahora las entregas normales atrasadas de todos los cursos, sin pedir extras, usa el campo `recover` de Actions o ejecuta:

```bash
gh workflow run publish.yml --ref main -R santiagofj/rss-lecciones -f recover=true
```

No combines `recover=true` con `course`. Si Gemini sigue fallando, las fechas restantes permanecen pendientes para el siguiente intento.

Las lecciones nuevas apuntan a 1000–1500 palabras. Si Gemini entrega un texto completo pero de menos de 900 palabras, el siguiente intento usa ese borrador como base para pedir una ampliación concreta. No se superan tres solicitudes por lección ni se publica una versión corta o incompleta. Ante un 429 o 503 se aplica espera acotada; si Gemini sigue fallando, ese curso no avanza, los demás válidos sí se conservan y la entrega fallida permanece pendiente. Esta comprobación no modifica las lecciones ya publicadas ni garantiza disponibilidad de la cuota gratuita.

## Secreto

La clave se guarda como el secreto `GEMINI_API_KEY` de GitHub Actions. Nunca debe escribirse en archivos del repositorio.

## Direcciones RSS

Después de activar GitHub Pages:

- `https://santiagofj.github.io/rss-lecciones/audio-digital/feed.xml`
- `https://santiagofj.github.io/rss-lecciones/fullstack/feed.xml`
- `https://santiagofj.github.io/rss-lecciones/historia-filosofia/feed.xml`
- `https://santiagofj.github.io/rss-lecciones/musica-clasica/feed.xml`
- `https://santiagofj.github.io/rss-lecciones/juegos-naipes/feed.xml` (disponible después del primer despliegue que incluya el curso)

## Comandos de comprobación

```bash
npm run validate
npm run typecheck
npm test
```

`npm run generate` realiza llamadas reales a Gemini y construye `public/`. Sin el evento manual de Actions, genera las entregas normales pendientes de cada curso dentro del límite por run.
