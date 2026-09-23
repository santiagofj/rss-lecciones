# Lecciones RSS

Este repositorio genera tres cursos personales con Gemini y los publica como páginas HTML y feeds RSS mediante GitHub Actions.

## Cursos

- Audio digital práctico
- Full Stack progresivo
- Historia de la filosofía
- Música clásica desde cero

Cada curso mantiene su temario, progreso y lecciones dentro de `courses/<slug>/`. Publicar una lección avanza automáticamente el cursor al siguiente paso. Una corrección posterior puede editar el mismo archivo para conservar su identificador y su URL.

## Horario

El flujo `.github/workflows/publish.yml` se ejecuta todos los días a las 03:00 UTC, equivalente a las 00:00 de Buenos Aires. La ejecución programada genera como máximo una lección normal por curso y fecha local.

Para pedir **otra lección** de un curso, inicia `Generar y publicar lecciones` desde GitHub Actions con el campo `course` (por ejemplo, `fullstack`). También puedes ejecutar:

```powershell
gh workflow run publish.yml --ref main -R santiagofj/rss-lecciones -f course=fullstack
```

Repite el pedido cuando quieras la siguiente lección, incluso el mismo día. Los pedidos se procesan de uno en uno (GitHub admite hasta 100 pendientes en este grupo). El curso debe estar activo y tener pasos pendientes; la cuota gratuita de Gemini también puede impedir un pedido. Reejecutar el mismo run no pide otra lección: para eso inicia un run nuevo.

Las lecciones nuevas apuntan a 1000–1500 palabras. Si Gemini entrega un texto demasiado breve o sin las secciones y el cierre completos, el generador lo reintenta hasta tres veces; si sigue incompleto, el run falla sin publicar ni avanzar el curso. Esta comprobación no modifica las lecciones ya publicadas.

## Secreto

La clave se guarda como el secreto `GEMINI_API_KEY` de GitHub Actions. Nunca debe escribirse en archivos del repositorio.

## Direcciones RSS

Después de activar GitHub Pages:

- `https://santiagofj.github.io/rss-lecciones/audio-digital/feed.xml`
- `https://santiagofj.github.io/rss-lecciones/fullstack/feed.xml`
- `https://santiagofj.github.io/rss-lecciones/musica-clasica/feed.xml`

## Comandos de comprobación

```bash
npm run validate
npm run typecheck
npm test
```

`npm run generate` realiza llamadas reales a Gemini y construye `public/`. Sin el evento manual de Actions, aplica el límite de una lección normal diaria por curso.
