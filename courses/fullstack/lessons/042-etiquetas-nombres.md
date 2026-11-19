---
schemaVersion: 1
id: 9d7bf06b-6fcb-410b-8005-2d8dd8c15156
sequence: 42
course: fullstack
stepId: etiquetas-nombres
title: Dar nombre a cada control
publishedAt: 2026-11-19T13:22:46.653Z
generationDate: 2026-11-16
summary: Identificar y nombrar de forma explícita cada control de la interfaz
  permite detectar rápidamente componentes cuyo propósito resulta ambiguo,
  facilita la accesibilidad y reduce errores de mantenimiento. Esta lección
  muestra cómo comparar la etiqueta visible, el nombre accesible y el texto de
  ayuda, y propone criterios para mejorar la nomenclatura sin depender
  únicamente de marcadores de posición.
generation:
  model: openai/gpt-oss-120b
  promptVersion: v5
  contextHash: bc3c79119b89e8883ed2c929bfd88c0e5eea910c671dc93f4759a7c758ba9c2d
---

## Por qué ahora

En la fase actual del curso se busca que el alumno pueda reconocer controles cuyo propósito no se deduzca de forma inmediata. La capacidad de detectar nombres inadecuados evita confusiones en la interacción y es un requisito previo para seguir una interacción por teclado, ya que los lectores de pantalla y los atajos dependen de una identificación clara. Además, una nomenclatura coherente simplifica la documentación y el reporte de fallos, tal como se practicó en la lección anterior sobre reproducibilidad de errores.

## Explicación y ejemplo

### Problema subyacente
Los controles de una aplicación pueden presentar tres fuentes de información distintas:
1. **Etiqueta visible**: texto que el usuario ve en la pantalla.
2. **Nombre accesible** (atributo `aria-label` o `label` asociado). 
3. **Texto de ayuda** (elemento `title`, `aria-describedby` o mensaje contextual).
Cuando cualquiera de estos elementos no coincide o es insuficiente, el control pierde claridad. Por ejemplo, un botón con la etiqueta `Guardar` pero con `aria-label="Enviar"` genera ambigüedad para usuarios de lectores de pantalla.

### Responsabilidades de cada capa
- **Capa de presentación**: muestra la etiqueta visible y, opcionalmente, el placeholder.
- **Capa de accesibilidad**: expone el nombre accesible y el texto de ayuda a tecnologías asistivas.
- **Capa de lógica**: referencia el control mediante un identificador interno (por ejemplo, `id="btnSave"`).
Mantener la coherencia entre estas capas permite que cualquier observador, humano o máquina, entienda la intención del control.

### Flujo de validación
1. **Recopilar** los tres textos asociados al control.
2. **Comparar** si transmiten el mismo concepto (verbos, sustantivos, tono).
3. **Detectar** desviaciones: sinónimo parcial, conflicto o ausencia de texto de ayuda.
4. **Proponer** un nombre unificado que refleje la acción principal.

### Ejemplo concreto
Considere una página de notas compartidas con un formulario para crear una nueva nota. El fragmento HTML simplificado es el siguiente:

```html
<form id="createNote">
  <label for="titleInput">Título</label>
  <input type="text" id="titleInput" placeholder="Escribe aquí" aria-describedby="titleHelp"/>
  <div id="titleHelp" class="help-text">Máximo 50 caracteres.</div>
  <button id="submitBtn" aria-label="Crear nota">Guardar</button>
</form>
```

- **Etiqueta visible** del botón: *Guardar*.
- **Nombre accesible** del botón: *Crear nota*.
- **Texto de ayuda** del campo de título: *Máximo 50 caracteres*.

En este caso, el botón muestra una discrepancia: el texto visible sugiere una acción de guardado genérica, mientras que el nombre accesible indica creación de nota. Un usuario que solo escuche el nombre accesible podría pensar que el botón crea una nota sin guardarla, mientras que otro que vea la etiqueta podría esperar que el formulario se guarde sin crear una nueva entidad.

#### Propuesta de corrección
1. Unificar el verbo: usar *Crear* o *Guardar* en ambos lugares.
2. Añadir un texto de ayuda opcional que explique la diferencia, si la hubiera.
3. Actualizar el HTML:

```html
<button id="submitBtn" aria-label="Crear nota">Crear nota</button>
```

Ahora la etiqueta visible y el nombre accesible coinciden, eliminando la ambigüedad. El campo de título ya posee un texto de ayuda que describe la restricción de longitud, cumpliendo con el criterio de información complementaria.

### Principios de nombrado
- **Consistencia léxica**: use el mismo verbo y sustantivo en todos los puntos de referencia.
- **Claridad de propósito**: el nombre debe describir la acción principal del control.
- **Evitar placeholders como única fuente**: los placeholders desaparecen al escribir, por lo que no deben ser el único descriptor.
- **Inclusión de contexto**: si el control actúa sobre un recurso específico (nota, archivo), inclúyalo en el nombre.

### Impacto en accesibilidad y depuración
Un nombre coherente permite que los lectores de pantalla anuncien la misma intención que el usuario ve, reduciendo la carga cognitiva. Además, al registrar un fallo, el reporte puede citar un único identificador de control, facilitando la reproducibilidad descrita en la lección 39.

### Resumen de pasos a seguir
1. Identificar etiqueta visible, nombre accesible y texto de ayuda.
2. Verificar que transmiten el mismo concepto.
3. Renombrar los elementos que divergen, priorizando la claridad.
4. Validar la solución con una herramienta de inspección de accesibilidad (por ejemplo, auditoría del navegador).

Este proceso se puede aplicar a cualquier tipo de control: botones, campos de texto, menús desplegables o enlaces. La práctica siguiente consolidará la capacidad de detectar y corregir nombres inadecuados.

## Práctica

#### Tarea práctica
1. Abra la página de notas compartidas que se utilizó en la lección 40. Localice el formulario de creación de notas y cualquier otro control interactivo presente (por ejemplo, botón de eliminación, filtro de búsqueda, casilla de selección de categoría).
2. Para cada control, anote en una tabla los siguientes datos:
   - **Control** (identificador HTML, por ejemplo `id="deleteBtn"`).
   - **Etiqueta visible** (texto que aparece en la pantalla).
   - **Nombre accesible** (`aria-label` o `label` asociado). Si no existe, indique *ausente*.
   - **Texto de ayuda** (`aria-describedby`, `title` o elemento de ayuda visible). Si no existe, indique *ausente*.
   - **Observación**: indique si los tres campos comunican el mismo propósito o si hay divergencia.
3. Seleccione al menos dos controles con divergencia. Para cada uno, redacte una propuesta de corrección que incluya:
   - El nuevo texto de la etiqueta visible (si es necesario).
   - El nuevo nombre accesible.
   - Un posible texto de ayuda que añada contexto sin sobrecargar al usuario.
4. Implemente la corrección en un archivo HTML local (no es necesario desplegarlo). Utilice la estructura mínima mostrada en la sección de explicación como referencia.
5. Verifique la coherencia usando las herramientas de inspección del navegador (pestaña *Accessibility*). Capture una captura de pantalla que muestre el árbol de accesibilidad con los nombres unificados.
6. Redacte un breve informe (máximo 300 palabras) que incluya la tabla original, la tabla corregida y la captura de pantalla. Envíe el informe a la plataforma del curso para su revisión.

Esta actividad permite aplicar los criterios de nombrado, observar el impacto inmediato en la accesibilidad y generar evidencia que pueda ser utilizada en futuros reportes de fallos.

#### Criterios de evaluación
- Compleción de la tabla con todos los campos solicitados.
- Propuestas de corrección que eliminen cualquier ambigüedad.
- Correcta actualización del HTML y verificación mediante la herramienta de accesibilidad.
- Claridad y concisión del informe final.

Al finalizar, el alumno habrá practicado la detección, corrección y documentación de nombres de controles, preparando el terreno para la siguiente lección sobre interacción por teclado.

## Comprobaciones

1. ¿Cuál es la diferencia principal entre una etiqueta visible y un nombre accesible?
Respuesta: La etiqueta visible es el texto que aparecen en la pantalla para el usuario, mientras que el nombre accesible es el texto que las tecnologías asistivas anuncian y que se define mediante atributos como `aria-label` o un `label` asociado.
2. Si un botón tiene la etiqueta visible «Eliminar» y el atributo `aria-label` «Borrar nota», ¿qué problema se presenta?
Respuesta: Existe una incoherencia léxica que genera ambigüedad para usuarios de lectores de pantalla, ya que escucharán un verbo diferente al que ve el usuario visual, lo que dificulta la comprensión de la acción del control.

## Cierre

La correcta nomenclatura de los controles es una base esencial para que la interacción por teclado sea predecible y fiable. En la próxima lección se abordará cómo mapear atajos de teclado a controles claramente identificados, garantizando una experiencia accesible y coherente.
