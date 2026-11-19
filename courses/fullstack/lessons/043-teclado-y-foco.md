---
schemaVersion: 1
id: acba5295-7d7b-40f7-9b7f-79c6af19f3b8
sequence: 43
course: fullstack
stepId: teclado-y-foco
title: Orden de foco y señales de ubicación en interacciones por teclado
publishedAt: 2026-11-19T13:25:08.305Z
generationDate: 2026-11-17
summary: Comprensión del orden de foco al navegar un formulario mediante el
  teclado y de las señales que indican la posición actual del usuario, con
  ejemplos concretos y práctica de diagnóstico.
generation:
  model: openai/gpt-oss-120b
  promptVersion: v5
  contextHash: fcbd8dc3ca15c4a465fb5b793e11851f88d99d0c375aa2f5c263a5c7260ead6b
---

## Por qué ahora

En una aplicación web que permite crear, editar y guardar notas compartidas, el usuario suele interactuar principalmente mediante el teclado: tabular entre campos, confirmar con Enter o cancelar con Esc. Un orden de foco predecible y señales claras de ubicación evitan errores de edición, reducen la carga cognitiva y mejoran la accesibilidad para usuarios que dependen de lectores de pantalla o de teclados alternativos. Cuando el foco se pierde o se salta inesperadamente, el flujo de guardado o cancelación puede quedar bloqueado, provocando pérdidas de datos o estados inconsistentes. Por ello, dominar el manejo del foco y de sus indicadores es esencial antes de pasar a la comunicación de errores de formulario.

## Explicación y ejemplo

### Problema

Al editar una nota, el usuario debe recorrer los controles del formulario en un orden lógico: título → contenido → etiquetas → botón **Guardar** → botón **Cancelar**. Si el foco se sitúa fuera de esa secuencia, por ejemplo al abrir un menú contextual o al recibir una notificación modal, el usuario puede presionar **Enter** sin haber completado los campos obligatorios o, peor aún, perder la referencia de dónde se encuentra y cancelar sin intención.

### Responsabilidades del foco

1. **Determinismo**: cada tecla **Tab** debe mover el foco al siguiente elemento interactivo según una jerarquía predefinida.
2. **Visibilidad**: el elemento con foco debe presentar una señal visual (borde, sombreado) y, cuando sea necesario, una señal auditiva a través de ARIA.
3. **Restauración**: al cerrar un diálogo o al cancelar una edición, el foco debe volver al elemento que lo originó.

### Flujo típico en edición con guardar y cancelar

```
[Inicio] → usuario abre nota → foco en botón "Editar"
   ↓ (Enter)
Formulario visible → foco en primer campo (Título)
   ↓ (Tab) → Campo "Contenido"
   ↓ (Tab) → Campo "Etiquetas"
   ↓ (Tab) → Botón "Guardar"
   ↓ (Tab) → Botón "Cancelar"
   ↓ (Enter en "Guardar") → envío, foco en mensaje de éxito
   ↓ (Esc en cualquier punto) → cierre, foco vuelve a "Editar"
```

### Ejemplo concreto

#### HTML minimal

```html
<form id="noteForm" aria-live="polite">
  <label for="title">Título</label>
  <input id="title" name="title" type="text" required />

  <label for="content">Contenido</label>
  <textarea id="content" name="content" required></textarea>

  <label for="tags">Etiquetas</label>
  <input id="tags" name="tags" type="text" />

  <button type="submit" id="saveBtn">Guardar</button>
  <button type="button" id="cancelBtn">Cancelar</button>
</form>
```

#### CSS para señal visual

```css
:focus {
  outline: 2px solid #0066cc;
  outline-offset: 2px;
}
/* Mejorar contraste para modo alto contraste */
```

#### JavaScript de gestión de foco

```js
const form = document.getElementById('noteForm');
const cancelBtn = document.getElementById('cancelBtn');
const editTrigger = document.getElementById('editTrigger'); // botón que muestra el formulario

// Al abrir el formulario, colocar foco en el primer campo
editTrigger.addEventListener('click', () => {
  form.style.display = 'block';
  document.getElementById('title').focus();
});

// Cancelar devuelve el foco al disparador
cancelBtn.addEventListener('click', () => {
  form.style.display = 'none';
  editTrigger.focus();
});

// Capturar Esc en cualquier control del formulario
form.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    e.preventDefault();
    cancelBtn.click();
  }
});
```

#### Señales de ubicación accesibles

* **`aria-live="polite"`** en el formulario permite que los lectores de pantalla anuncien cambios de estado (por ejemplo, "Nota guardada") sin interrumpir la lectura actual.
* **`focus-visible`** (pseudo‑clase) muestra la señal visual solo cuando el foco proviene del teclado, evitando confusión para usuarios de ratón.
* Cada control posee un **`label`** explícito y un atributo **`name`** que coincide con el par nombre‑valor enviado al servidor, facilitando la trazabilidad de los datos.

### Integración de capas y manejo de fallos

Si el foco no se restaura correctamente después de un error de validación, la señal de ubicación queda desincronizada. En ese caso, el flujo debe:
1. Detectar que el envío devolvió HTTP 400.
2. Colocar foco en el primer campo que falló la validación.
3. Anunciar el error mediante `role="alert"` dentro del contenedor `aria-live`.

Este patrón garantiza que el usuario siempre sepa dónde está y qué acción debe tomar, independientemente de la capa (HTML, CSS o lógica JavaScript).

## Práctica

#### Tarea práctica

1. Copie el fragmento HTML, CSS y JavaScript presentados en la sección anterior en un archivo llamado `focus-demo.html`. No es necesario instalar dependencias; el código funciona en cualquier navegador moderno.
2. Abra el archivo y reproduzca la secuencia de interacción con el teclado:
   * Presione **Enter** sobre el botón "Editar" (simulado) para mostrar el formulario.
   * Utilice **Tab** para desplazarse por los campos y los botones. Observe el contorno azul que indica el foco.
   * Presione **Esc** en diferentes puntos (campo de título, textarea, botón Guardar) y compruebe que el foco vuelve al botón "Editar".
3. Modifique el orden de tabulación cambiando el atributo `tabindex` de los controles (por ejemplo, añada `tabindex="3"` al campo de etiquetas). Recargue la página y describa cómo ha variado la ruta de foco.
4. Añada un elemento `<div role="alert" aria-live="assertive"></div>` bajo el formulario. Simule una respuesta de error (por ejemplo, usando `setTimeout` para escribir "Error: campo título obligatorio" en ese `div`). Verifique que el lector de pantalla anuncia el mensaje y que el foco se sitúa automáticamente en el campo que generó el error.
5. Documente en un texto breve (máximo 200 palabras) la secuencia de foco que considera correcta para la edición de una nota, indicando cómo cada señal visual y aria‑live contribuye a la experiencia del usuario.

Entregable: una captura de pantalla que muestre el foco activo en cada paso de la secuencia y el texto descriptivo solicitado.

Esta práctica refuerza la capacidad de diagnosticar problemas de foco, de aplicar señales de ubicación y de validar que el comportamiento sea consistente en todas las capas de la aplicación.

## Comprobaciones

1. ¿Cuál es el orden de foco recomendado para los controles de un formulario de edición de nota?
Respuesta: Título → Contenido → Etiquetas → Botón Guardar → Botón Cancelar.
2. Si al presionar Esc el foco no vuelve al botón que abrió el formulario, ¿qué señal indica el fallo?
Respuesta: La ausencia de restauración del foco muestra que la lógica de gestión de eventos (listener de Esc) o la llamada a `focus()` en el elemento origen no se ejecutó correctamente.

## Cierre

El control preciso del foco y la comunicación clara de la posición del usuario sientan las bases para una interacción robusta. En la siguiente lección se abordará cómo informar al usuario de errores de validación de formulario sin interrumpir su flujo de trabajo, manteniendo la coherencia de las señales de ubicación.
