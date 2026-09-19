# Lecciones RSS

Este repositorio genera tres cursos personales con Gemini y los publica como páginas HTML y feeds RSS mediante GitHub Actions.

## Cursos

- Audio digital práctico
- Full Stack progresivo
- Música clásica desde cero

Cada curso mantiene su temario, progreso y lecciones dentro de `courses/<slug>/`. Publicar una lección avanza automáticamente el cursor al siguiente paso. Una corrección posterior puede editar el mismo archivo para conservar su identificador y su URL.

## Horario

El flujo `.github/workflows/publish.yml` se ejecuta todos los días a las 03:00 UTC, equivalente a las 00:00 de Buenos Aires. También puede iniciarse manualmente desde GitHub Actions.

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

`npm run generate` realiza llamadas reales a Gemini, guarda como máximo una lección diaria por curso y construye `public/`.
