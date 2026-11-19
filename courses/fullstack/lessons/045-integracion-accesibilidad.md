---
schemaVersion: 1
id: 53e714a7-83d3-429a-acd7-e7e0879346f8
sequence: 45
course: fullstack
stepId: integracion-accesibilidad
title: Revisar una interfaz de edición
publishedAt: 2026-11-19T13:29:49.709Z
generationDate: 2026-11-19
summary: Auditoría de una pantalla de edición de notas para identificar mejoras
  semánticas y de interacción, con criterios observables que guían la siguiente
  lección sobre reglas CSS.
generation:
  model: openai/gpt-oss-120b
  promptVersion: v5
  contextHash: d3883eb48557cc84e42372a6d7753ba86e701c6499701228e4343ff0cb651890
---

## Por qué ahora

En el proceso de construir una aplicación de notas compartidas, la fase de revisión de la interfaz de edición es determinante para garantizar que los usuarios puedan crear y modificar contenidos sin ambigüedades. Tras haber nombrado los controles y haber analizado el orden de foco, el siguiente paso lógico es examinar la estructura semántica de los elementos y la claridad de las interacciones mediante el teclado. Una interfaz bien definida reduce la carga cognitiva, previene errores de accesibilidad y facilita la incorporación de futuras mejoras, como la aplicación de reglas CSS específicas. Realizar esta auditoría antes de pasar a la capa de estilo permite detectar problemas de marcado que de otro modo quedarían ocultos tras la decoración visual.

## Explicación y ejemplo

### Problema

En una pantalla de edición de notas es frecuente encontrar campos sin asociación explícita entre la etiqueta visible y el control, botones sin texto descriptivo y contenedores que no comunican su propósito a tecnologías de asistencia. Estas deficiencias aparecen cuando el desarrollador se concentra en la lógica de guardado y pasa a la presentación sin validar la semántica del marcado.

### Responsabilidades

1. **Identificar** cada elemento de formulario, su rol y la relación con la etiqueta visible.
2. **Verificar** que el orden de tabulación coincida con la secuencia lógica de ingreso de datos.
3. **Garantizar** que los atributos de accesibilidad (aria‑label, aria‑describedby) complementen la información visual.
4. **Documentar** los hallazgos en una tabla de observación que sirva de referencia para la capa de estilo.

### Flujo de interacción

```
Usuario abre la nota → foco en el título → escribe → Tab → foco en el cuerpo → escribe → Tab → foco en el botón Guardar → pulsa Enter → envío al servidor → respuesta
```

El flujo debe ser predecible y visible en la estructura del DOM. Cada salto de foco debe estar respaldado por un elemento focusable con un nombre accesible.

### Ejemplo concreto

#### Código original

```html
<form id="edit-note">
  <div>
    <input type="text" placeholder="Título">
  </div>
  <div>
    <textarea placeholder="Contenido"></textarea>
  </div>
  <button>✔</button>
</form>
```

Problemas detectados:

* Los `input` y `textarea` carecen de la etiqueta `<label>` asociada.
* El atributo `placeholder` no sustituye a una etiqueta descriptiva.
* El botón muestra solo un símbolo, lo que impide que lectores de pantalla comuniquen su acción.
* No hay atributos `id` ni `for` que permitan la asociación.

#### Código mejorado

```html
<form id="edit-note">
  <div>
    <label for="title">Título de la nota</label>
    <input type="text" id="title" name="title" aria-describedby="title-help">
    <small id="title-help">Máximo 100 caracteres.</small>
  </div>
  <div>
    <label for="body">Contenido</label>
    <textarea id="body" name="body" rows="5" aria-describedby="body-help"></textarea>
    <small id="body-help">Escriba el texto completo de la nota.</small>
  </div>
  <button type="submit">Guardar nota</button>
</form>
```

Mejoras aplicadas:

* Cada control tiene una etiqueta `<label>` vinculada mediante `for`/`id`.
* Se añaden descripciones auxiliares con `<small>` y `aria-describedby` para proporcionar contexto adicional.
* El botón incluye texto explícito que describe la acción.
* Los controles siguen un orden natural en el árbol del DOM, lo que garantiza una secuencia de tabulación coherente.

#### Diagrama de flujo textual

```
[Formulario]
  ├─[Etiqueta "Título"] → [Campo de texto] → [Ayuda]
  ├─[Etiqueta "Contenido"] → [Área de texto] → [Ayuda]
  └─[Botón "Guardar nota"]
```

El diagrama refleja la jerarquía y la relación entre etiquetas y controles, facilitando la revisión por parte de cualquier integrante del equipo.

### Resultado esperado

Al validar el marcado con una herramienta de auditoría (por ejemplo, la extensión *axe*), el informe debe indicar cero errores relacionados con etiquetas, asociaciones y nombre de botón. La experiencia del usuario al navegar con `Tab` debe coincidir con la lógica descrita en el flujo de interacción.

Este ejercicio prepara al alumno para aplicar reglas CSS que dependen de selectores semánticos, como `label[for]` o `button[type="submit"]`, sin arriesgarse a modificar un DOM que aún no cumple con los requisitos de accesibilidad básica.

## Práctica

#### Objetivo de la práctica

Aplicar la metodología de auditoría semántica a una pantalla de edición de notas proporcionada a continuación. El alumno debe identificar los problemas, describir la corrección y validar los resultados mediante una herramienta de comprobación de accesibilidad.

#### Paso a paso

1. Copie el fragmento HTML siguiente en un archivo local llamado `edit.html`.
2. Abra el archivo en un navegador moderno.
3. Utilice la herramienta de inspección para observar la estructura del DOM.
4. Anote en una tabla los siguientes campos para cada control:
   * **Tipo de control** (input, textarea, button).
   * **Etiqueta visible** (texto de `<label>` o `placeholder`).
   * **Asociación** (presencia de `id`/`for` o `aria-label`).
   * **Problema detectado** (ej. falta de etiqueta, texto ambiguo).
5. Reescriba el HTML incorporando las mejoras descritas en la sección de explicación. Mantenga los mismos `id` y `name` para no alterar la lógica del servidor.
6. Guarde los cambios y recargue la página.
7. Ejecute la extensión *axe* (o cualquier auditoría comparable) y capture el reporte.
8. Verifique que los problemas de etiquetado y nombre de botón hayan desaparecido.
9. Documente brevemente la diferencia observada antes y después de la corrección.

#### Entregable

El alumno debe enviar una captura de pantalla del reporte de la herramienta sin errores críticos, acompañada de la tabla de observación y el código HTML corregido. Este entregable servirá como evidencia de que la interfaz cumple con los criterios semánticos requeridos para continuar con la siguiente lección sobre reglas CSS específicas.

#### Criterios de evaluación

* Exhaustividad de la tabla de observación.
* Correcta aplicación de `label` y atributos ARIA.
* Ausencia de errores de accesibilidad relacionados con etiquetas y botones.
* Claridad en la descripción de la mejora.

Al completar la práctica, el alumno habrá internalizado el proceso de auditoría y estará preparado para abordar la capa de presentación con una base estructural sólida.

## Comprobaciones

1. ¿Cuál es el atributo que permite asociar una etiqueta `<label>` a un control de formulario?
Respuesta: El atributo `for` del `<label>` debe contener el mismo valor que el atributo `id` del control.
2. En el código mejorado, ¿qué texto describe la acción del botón y por qué es importante?
Respuesta: El texto "Guardar nota" describe explícitamente la acción; es importante porque los lectores de pantalla lo anuncian y evita ambigüedad para usuarios que no perciben el símbolo visual.

## Cierre

Con la interfaz auditada y corregida, el alumno dispone de un marcado semántico fiable que facilita la aplicación de estilos coherentes. El siguiente paso consiste en identificar la regla CSS que determina el resaltado visual del foco, lo que permitirá mejorar la percepción de ubicación sin alterar la estructura subyacente.
