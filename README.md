# Lecciones RSS

Este repositorio genera cursos personales con Groq y los publica como páginas HTML y feeds RSS mediante GitHub Actions.

## Cursos

| Curso | Lecciones del recorrido | Enfoque |
|---|---:|---|
| Audio digital práctico | 86 | Señal, formatos, procesamiento, reproducción, medición y escucha crítica. |
| Full Stack progresivo | 130 | Comprensión conceptual de frontend, backend, datos, seguridad, arquitectura y operación, sin stack obligatorio. |
| Historia del diseño | 18 | Movimientos y estilos, con una pieza ilustrada en cada lección. |
| Historia de la filosofía | 63 | Recorrido histórico de problemas y argumentos. |
| IA, conceptos y usos | 24 | Fundamentos, modelos de lenguaje, multimodalidad, RAG, herramientas, agentes y evaluación. |
| Música clásica desde cero | 95 | Lenguaje, instrumentos, formas, historia, repertorio e interpretación. |
| Un juego de naipes por día | Abierto; 15 juegos iniciales | Juegos de distintas tradiciones, sin solitarios ni casino; comienza con Brisca. |

Cada curso mantiene su temario, progreso y lecciones dentro de `courses/<slug>/`. Publicar una lección avanza automáticamente el cursor al siguiente paso. Una corrección posterior puede editar el mismo archivo para conservar su identificador y su URL.

La [ampliación aprobada](.spec/lecciones-rss/complete-curricula.spec.md) conserva las primeras 14 lecciones de Audio, Full Stack y Música y añade módulos con prácticas, repasos e integración. El [mapa de cobertura](.spec/lecciones-rss/complete-curricula-coverage.md) enumera las futuras lecciones y sus objetivos. Los totales describen el temario disponible, no cuántas lecciones se han publicado ni qué conocimientos domina el alumno. Los cursos finitos se detienen al terminar sus pasos.

[Naipes](.spec/lecciones-rss/juegos-naipes.spec.md) comienza el `2026-11-08` y no tiene un total de entregas ni una fecha final. Cuando quedan cinco juegos preparados o menos, Tavily busca fuentes y Groq propone hasta siete juegos nuevos para incorporar en un lote documentado dentro de `courses/juegos-naipes/continuation/`. Las comprobaciones de identidad, nombres, alias y fuentes usan todo el recorrido. Las consultas de búsqueda reciben una ventana reciente para acotar el contexto.

Los lotes se publican como archivos completos. Si la investigación falla, se usa la reserva y se reintenta otro día. Si se agota la reserva, la entrega queda pendiente. El estado `paused` detiene tanto ampliaciones como lecciones.

## Horario

El flujo `.github/workflows/publish.yml` se ejecuta todos los días a las 03:00 UTC, equivalente a las 00:00 de Buenos Aires. Corresponde una lección normal por curso y día programado. Si una entrega falla, queda pendiente: la siguiente ejecución genera primero las atrasadas y luego la del día, sin saltar pasos. Puede haber varias publicaciones el mismo día para recuperar el atraso, hasta 40 lecciones por run; lo que exceda ese límite sigue pendiente. Cada curso declara su `schedule.startDate`.

Audio, Full Stack y Música se reactivaron el `2026-10-20`, con `schedule.startDate` fijado en esa fecha: es el inicio del nuevo tramo de entregas debidas, no una modificación de las fechas históricas. No se recupera el intervalo agotado desde el 3 de octubre. La fecha se mantiene fija, también ante fallos y reintentos; así los errores posteriores continúan siendo recuperables. Filosofía conserva su calendario. Una futura reactivación sin recuperación de un intervalo deberá fijar y documentar su propia fecha antes de activarse.

Para pedir **otra lección** de un curso, inicia `Generar y publicar lecciones` desde GitHub Actions con el campo `course` (por ejemplo, `fullstack`). También puedes ejecutar:

```powershell
gh workflow run publish.yml --ref main -R santiagofj/rss-lecciones -f course=fullstack
```

Repite el pedido cuando quieras la siguiente lección, incluso el mismo día. Los pedidos se procesan de uno en uno. El curso debe estar activo, tener pasos pendientes y contar con cuota disponible en Groq. Para pedir otra lección, inicia una ejecución nueva.

Para recuperar ahora las entregas normales atrasadas de todos los cursos, sin pedir extras, usa el campo `recover` de Actions o ejecuta:

```bash
gh workflow run publish.yml --ref main -R santiagofj/rss-lecciones -f recover=true
```

Usa `recover=true` para recuperar fechas y `course` para solicitar una lección extra. Si Groq sigue fallando, las fechas restantes quedan pendientes para el siguiente intento.

Las lecciones nuevas apuntan a 1000–1500 palabras. Si Groq entrega un borrador completo de menos de 900 palabras, el siguiente intento pide ampliarlo. El generador comprueba las secciones y el cierre antes de guardar y realiza hasta tres solicitudes por lección. Las esperas del proveedor se acotan para que las fechas restantes se puedan recuperar en otro lote.

Tras una publicación parcial, el resumen de Actions registra las entregas pendientes. El workflow termina con error si falla un paso de infraestructura o si todos los intentos de generación del lote fracasan.

## Secretos

Guarda las claves de los planes gratuitos como secretos de GitHub Actions. Usa `GROQ_API_KEY` para la generación y `TAVILY_API_KEY` para las búsquedas de Naipes.

## Direcciones RSS

Después de activar GitHub Pages:

- `https://santiagofj.github.io/rss-lecciones/audio-digital/feed.xml`
- `https://santiagofj.github.io/rss-lecciones/fullstack/feed.xml`
- `https://santiagofj.github.io/rss-lecciones/historia-diseno/feed.xml`
- `https://santiagofj.github.io/rss-lecciones/historia-filosofia/feed.xml`
- `https://santiagofj.github.io/rss-lecciones/ia-conceptos-y-usos/feed.xml`
- `https://santiagofj.github.io/rss-lecciones/musica-clasica/feed.xml`
- `https://santiagofj.github.io/rss-lecciones/juegos-naipes/feed.xml` (disponible después del primer despliegue que incluya el curso)

## Comandos de comprobación

```bash
npm run validate
npm run typecheck
npm test
```

`npm run generate` realiza llamadas reales a Groq y, si Naipes requiere ampliación, a Tavily. Construye `public/` y, fuera de una ejecución manual de Actions, procesa las entregas normales pendientes dentro del límite por lote.
