# Lecciones RSS

Generador estático de cursos progresivos distribuidos como páginas HTML y feeds RSS. El proyecto se implementa a partir de la especificación aprobada en [`.spec/lecciones-rss/index.spec.md`](.spec/lecciones-rss/index.spec.md).

## Estado

La etapa 1 implementa contratos, validación del repositorio, descubrimiento dinámico de cursos y selección determinista del próximo paso. Gemini 2.5 Flash está decidido como proveedor, pero todavía no hay cursos reales, integración de IA, generación, sitio, feeds ni despliegue.

Los archivos `site.yml` y `courses/` se crearán después de confirmar el punto de inicio de cada curso. Hasta entonces, `npm run validate` informa correctamente que falta la configuración. Las pruebas usan repositorios temporales completos y no consumen APIs.

## Desarrollo

```bash
npm install
npm run typecheck
npm test
npm run validate
```

`validate` no modifica archivos. Comprueba contratos, rutas, identidades, secuencia de lecciones, correspondencia con el syllabus y coherencia del cursor.
