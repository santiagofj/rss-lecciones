---
schemaVersion: 1
id: a6e549cb-2eea-4869-ad77-dc1ed4569236
sequence: 40
course: fullstack
stepId: estructura-semantica
title: Usar estructura con significado
publishedAt: 2026-11-19T13:17:28.813Z
generationDate: 2026-11-14
summary: En esta lección se analizan los elementos estructurales de una página
  web y se aprende a escoger etiquetas semánticas según la función que
  desempeñan, con énfasis en una lista de notas compartidas. Se muestra cómo la
  selección adecuada mejora la accesibilidad, el SEO y la mantenibilidad del
  código, y se ofrecen ejercicios prácticos para aplicar el concepto
  inmediatamente.
generation:
  model: openai/gpt-oss-120b
  promptVersion: v5
  contextHash: c79107c773cf8d58345d49a793af4505fc108c8f97e772d2c081c89a6fc57861
---

## Por qué ahora

Seleccionar la etiqueta HTML correcta es un paso fundamental antes de añadir estilos o lógica JavaScript. Las etiquetas semánticas comunican al navegador, a los lectores de pantalla y a los motores de búsqueda la intención del contenido, lo que reduce la necesidad de anotaciones adicionales y facilita el mantenimiento a largo plazo. En el contexto de una aplicación de notas compartidas, una estructura clara permite distinguir la barra de navegación, el encabezado de la lista, cada nota individual y las acciones asociadas, sin depender de clases o identificadores arbitrarios. Adoptar este enfoque ahora evita refactorizaciones costosas cuando el proyecto evoluciona y garantiza que los futuros desarrolladores comprendan rápidamente la arquitectura visual y funcional.

## Explicación y ejemplo

### Problema inicial
Los desarrolladores a menudo utilizan `<div>` y `<span>` para todos los contenedores, añadiendo clases que describen su propósito (por ejemplo, `class="nav"` o `class="note-item"`). Esa práctica funciona, pero oculta la intención del marcado y obliga a depender de CSS y JavaScript para describir la semántica.

### Responsabilidad y flujo
1. **Identificar la función** de cada bloque de la página (navegación, encabezado, contenido, acción).
2. **Asignar la etiqueta semántica** que mejor represente esa función.
3. **Mantener la separación** entre la estructura (HTML) y la presentación (CSS) y la interacción (JavaScript).

### Ejemplo concreto: lista de notas compartidas
A continuación se muestra una versión genérica y su versión semántica.

```html
<!-- Versión genérica -->
<div class="nav">
  <a href="/">Inicio</a>
  <a href="/notas">Mis notas</a>
</div>
<div class="header">
  <h1>Notas compartidas</h1>
</div>
<div class="list">
  <div class="item">
    <h2>Título de la nota</h2>
    <p>Contenido breve de la nota.</p>
    <button class="edit">Editar</button>
    <button class="delete">Eliminar</button>
  </div>
  <!-- más ítems -->
</div>
```

```html
<!-- Versión semántica -->
<nav aria-label="Navegación principal">
  <a href="/">Inicio</a>
  <a href="/notas">Mis notas</a>
</nav>
<header>
  <h1>Notas compartidas</h1>
</header>
<main>
  <section aria-label="Lista de notas">
    <article>
      <h2>Título de la nota</h2>
      <p>Contenido breve de la nota.</p>
      <footer>
        <button type="button">Editar</button>
        <button type="button">Eliminar</button>
      </footer>
    </article>
    <!-- más artículos -->
  </section>
</main>
```

#### Análisis del ejemplo
* `<nav>` indica que el bloque contiene enlaces de navegación. El atributo `aria-label` mejora la accesibilidad al describir su propósito.
* `<header>` agrupa el encabezado de la página; su posición al inicio es implícita para lectores de pantalla.
* `<main>` delimita el contenido principal, separando la cabecera y la navegación.
* `<section>` agrupa una colección lógica de notas; el atributo `aria-label` comunica su función.
* Cada nota se representa con `<article>`, lo que indica que es un contenido independiente y autocontenido.
* `<footer>` dentro del artículo contiene acciones relacionadas con esa nota, manteniendo la lógica de acción junto al contenido al que se refieren.

### Beneficios observados
| Aspecto | Uso de `<div>` genérico | Uso de etiquetas semánticas |
|---------|--------------------------|------------------------------|
| Accesibilidad | Depende de `role` y `aria-*` adicionales | Implícitos en la etiqueta, menor carga de atributos |
| SEO | Necesita análisis de contenido por el motor | Los motores interpretan directamente la jerarquía |
| Mantenimiento | Identificadores y clases pueden colisionar | Estructura clara, menos necesidad de comentar intención |
| Depuración | El árbol DOM es plano y confuso | El árbol refleja la lógica de la UI, facilitando inspección |

### Integración con CSS y JavaScript
El código CSS puede dirigirse a los elementos semánticos sin clases específicas:

```css
nav a { margin-right: 1rem; }
article { border: 1px solid #ccc; padding: 0.5rem; }
article footer button { margin-right: 0.5rem; }
```

El JavaScript que gestiona acciones de una nota se asocia al `<article>` mediante delegación de eventos:

```js
document.querySelector('section[aria-label="Lista de notas"]').addEventListener('click', e => {
  if (e.target.matches('button')) {
    const article = e.target.closest('article');
    const title = article.querySelector('h2').textContent;
    console.log('Acción sobre nota:', title);
    // lógica de edición o eliminación
  }
});
```

Este enfoque elimina la necesidad de buscar por clases como `.edit` o `.delete`; la estructura semántica ya indica el contexto.

### Consideraciones de fallo
Si un `<article>` se omite y se mantiene solo `<div class="item">`, un lector de pantalla no reconocerá la independencia de la nota y los usuarios pueden perder la noción de que cada bloque es autocontenido. Además, la falta de `<footer>` puede confundir a los desarrolladores que busquen dónde se encuentran las acciones relacionadas.

En caso de error de renderizado, la inspección del árbol DOM mostrará claramente los roles esperados, lo que simplifica la localización del problema.

## Práctica

### Tarea práctica
1. Copie el fragmento de HTML genérico proporcionado en la sección de *Explicación y ejemplo* y péguelo en un archivo llamado `ejemplo.html`.
2. Reescriba el código sustituyendo cada `<div>` por la etiqueta semántica adecuada, siguiendo las pautas mostradas.
3. Guarde los cambios y abra el archivo en un navegador. Use las herramientas de desarrollo (F12) para inspeccionar el árbol DOM y comprobar que los nodos ahora son `<nav>`, `<header>`, `<main>`, `<section>`, `<article>` y `<footer>`.
4. Active la funcionalidad de accesibilidad del navegador (por ejemplo, el lector de pantalla VoiceOver en macOS o NVDA en Windows) y verifique que los anuncios corresponden a "Navegación principal", "Encabezado", "Lista de notas" y "Artículo".
5. Documente brevemente (máximo 150 palabras) los cambios observados en la legibilidad del código y en la interacción del lector de pantalla.

### Forma de comprobar la respuesta
* El archivo `ejemplo.html` debe contener exactamente una instancia de cada etiqueta semántica descrita.
* La inspección del DOM debe mostrar la jerarquía mostrada en la tabla de la explicación.
* El lector de pantalla debe anunciar los roles sin necesidad de atributos `role` adicionales.
* La documentación entregada debe mencionar al menos dos ventajas percibidas (por ejemplo, mayor claridad del árbol DOM y mejor anuncio de sección).

## Comprobaciones

1. ¿Qué etiqueta semántica se utiliza para agrupar una colección de notas independientes?
Respuesta: `<section>`
2. En el ejemplo semántico, ¿dónde se colocan los botones de edición y eliminación?
Respuesta: Dentro del `<footer>` del `<article>` que representa cada nota.

## Cierre

La estructuración semántica permite que la capa de presentación y la lógica de interacción trabajen sobre un modelo claro y predecible. En la siguiente lección se abordará cómo capturar los datos ingresados en un formulario y enviarlos de forma segura al backend, manteniendo la coherencia con la arquitectura presentada.
