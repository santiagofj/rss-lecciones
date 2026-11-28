---
schemaVersion: 1
id: 3bf90c7c-d721-4991-abb2-cfa83e192b5b
sequence: 11
course: ia-conceptos-y-usos
stepId: vision-y-generacion-de-imagenes
title: Interpretar imágenes y crear imágenes nuevas
publishedAt: 2026-11-28T11:31:49.245Z
generationDate: 2026-11-28
summary: Esta lección guía al alumno a distinguir entre describir, extraer
  información, editar y generar imágenes a partir de una captura de interfaz
  ficticia y un boceto, proporcionando un método reproducible para validar
  etiquetas, cantidades y correspondencia con instrucciones.
generation:
  model: openai/gpt-oss-120b
  promptVersion: v5
  contextHash: 5c14b9ae98c2886fdab7408e9f9c682345e61466612ec703c2a787ae02e11507
---

## Por qué ahora

El análisis visual y la generación de contenido gráfico son tareas recurrentes en entornos de desarrollo asistido por IA. La capacidad de seleccionar la acción correcta —describir, extraer datos, editar o crear una imagen— permite integrar modelos multimodales en flujos de trabajo de programación, documentación y revisión de datos. En la fase actual del curso, el alumno ya maneja prompts estructurados y validación JSON; aplicar esas habilidades a la visión por computadora completa el conjunto de competencias necesarias para construir agentes que interactúen con documentos visuales y produzcan resultados verificables.

## Explicación y ejemplo

### Conceptos básicos
Los modelos multimodales pueden recibir una imagen y devolver texto (descripción), una lista estructurada (etiquetado) o una nueva imagen (edición o generación). Cada salida depende de la *entrada* (imagen, texto de instrucción) y del *prompt* que define el objetivo.

### Lectura de captura de interfaz
Se presenta una captura ficticia de una aplicación de gestión de proyectos que muestra una lista de tareas, iconos de prioridad y un botón "Exportar". El alumno debe observar los elementos visuales y traducirlos a información estructurada. Por ejemplo, la lista contiene tres ítems: 
- "Revisar código" con prioridad alta (icono rojo),
- "Escribir documentación" con prioridad media (icono amarillo),
- "Planificar sprint" sin prioridad (icono gris).

Un prompt adecuado para extraer esa información sería:
```
Extrae una lista JSON de las tareas visibles en la captura. Cada objeto debe incluir "nombre", "prioridad" (alta, media, baja o nula) y "icono" (color).
```
El modelo devolverá:
```json
[
  {"nombre":"Revisar código","prioridad":"alta","icono":"rojo"},
  {"nombre":"Escribir documentación","prioridad":"media","icono":"amarillo"},
  {"nombre":"Planificar sprint","prioridad":null,"icono":"gris"}
]
```
Esta salida permite validar que las etiquetas coinciden con los colores y que la cantidad de ítems es la esperada.

### Análisis de escena
El siguiente paso consiste en interpretar la relación espacial entre elementos. Supongamos que el boceto muestra una escena de escritorio con una pantalla que contiene la misma captura y una hoja de papel al lado. El objetivo es identificar objetos relevantes para una tarea de generación de imagen: la pantalla debe reproducir la captura original, mientras que la hoja debe contener una anotación automática del modelo.

Un prompt de generación puede ser:
```
Genera una imagen que combine la captura de la aplicación con una hoja de notas al margen que incluya la lista JSON obtenida anteriormente. Mantén el estilo visual de la captura y usa una tipografía monoespaciada para la lista.
```
El modelo producirá una nueva imagen que incluye ambos componentes. La verificación consiste en comparar visualmente la zona de la pantalla con la captura original (pixel‑wise o mediante hash) y revisar que la hoja contenga exactamente la lista JSON sin alteraciones.

### Edición y generación de imágenes
Si la tarea requiere modificar la captura, por ejemplo cambiar la prioridad de "Planificar sprint" a alta, el prompt de edición será:
```
En la imagen proporcionada, cambia el icono de prioridad de la tarea "Planificar sprint" de gris a rojo y actualiza el texto de prioridad a "alta". Mantén el resto de la captura sin cambios.
```
El modelo devolverá una imagen editada donde sólo el icono y el texto asociado se modifican. La comprobación se realiza inspeccionando el píxel del icono (debe ser rojo) y verificando que el texto correspondiente refleje la nueva prioridad.

### Verificación de resultados
Para garantizar la reproducibilidad, se recomienda:
1. Guardar la salida en un archivo con nombre estructurado (`captura_extraida.json`, `imagen_editada.png`).
2. Ejecutar un script de validación que compare la lista JSON con el esquema esperado y calcule un hash MD5 de la imagen original y la editada.
3. Documentar cualquier desviación (por ejemplo, un icono que no cambió) y registrar la causa (limitación del modelo, ambigüedad del prompt).

Este flujo muestra cómo pasar de la observación visual a la extracción estructurada, la edición dirigida y la generación de contenido nuevo, manteniendo un criterio de observación clara y medible.

## Práctica

**Tarea práctica**
1. Descarga el archivo `captura_ficticia.png` (una captura de interfaz de calendario) y el boceto `boceto_escritorio.svg` que muestra la pantalla junto a una hoja de notas.
2. Redacta dos prompts separados:
   - **Prompt de extracción**: solicita al modelo una lista JSON con los eventos del calendario, incluyendo campos `fecha`, `hora`, `título` y `etiqueta` (color del evento). Usa un formato de salida idéntico al esquema proporcionado.
   - **Prompt de generación**: indica al modelo que combine la captura original y una hoja de notas que contenga la lista JSON obtenida, conservando el estilo visual y usando una tipografía monoespaciada.
3. Ejecuta ambos prompts mediante la API de tu modelo preferido (p. ej., endpoint de inferencia multimodal). Guarda la respuesta JSON como `eventos_extraidos.json` y la imagen generada como `calendario_con_notas.png`.
4. Verifica:
   - Que el número de eventos en el JSON coincida con los que aparecen en la captura.
   - Que cada evento tenga la etiqueta de color correcta.
   - Que la imagen resultante contenga la lista JSON completa en la hoja de notas, sin errores tipográficos.
5. Documenta el proceso en un archivo `informe_practica.md`, indicando los prompts usados, los resultados de la validación (hash de la imagen, conteo de eventos) y cualquier discrepancia observada.

Esta práctica permite aplicar de forma integral la extracción, la generación y la verificación, consolidando la habilidad de decidir la acción adecuada según el objetivo visual.

## Comprobaciones

1. ¿Cuántos eventos debe contener el JSON resultante si la captura muestra cinco citas en el calendario?
Respuesta: 5
2. ¿Qué característica visual debe inspeccionarse para confirmar que la hoja de notas incluye la lista JSON completa?
Respuesta: El texto de la hoja debe mostrar todos los objetos JSON sin omisiones y con la tipografía monoespaciada especificada.

## Cierre

Con la extracción y generación de contenido visual completadas, el alumno dispone de una base verificable para integrar agentes que procesen imágenes y produzcan datos estructurados. La siguiente lección abordará la evaluación de la calidad de las respuestas visuales mediante métricas automáticas y técnicas de comparación perceptual.
