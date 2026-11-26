---
schemaVersion: 1
id: d89f90cc-301b-45a4-9377-5c4711bbb4a9
sequence: 9
course: ia-conceptos-y-usos
stepId: prompts-y-ejemplos
title: Prompts con objetivo, restricciones y ejemplos
publishedAt: 2026-11-26T12:04:19.354Z
generationDate: 2026-11-26
summary: Esta lección muestra cómo transformar una consigna ambigua en un prompt
  estructurado que incluya propósito, entrada, límites y ejemplo, y cómo
  comparar dos versiones para detectar errores y mejorarlos.
generation:
  model: openai/gpt-oss-120b
  promptVersion: v5
  contextHash: 8cde027b11aef499845cea2d4c152fa91b9b7d5ed579d4538f8784ac49a854f5
---

## Por qué ahora

En entornos donde los modelos de lenguaje son usados para generar código o resúmenes, la ambigüedad del prompt produce respuestas inconsistentes y costosas de depurar. Un prompt bien definido permite medir de forma objetiva el cumplimiento de la tarea y facilita la iteración rápida. El alumno, que ya emplea asistentes para programar, necesita ahora estructurar sus solicitudes para obtener resultados reproducibles y verificables, especialmente al comparar distintas versiones de un mismo requerimiento. Este conocimiento es esencial antes de avanzar a la gestión de contexto y a la selección de modelos, porque la calidad del output depende directamente de la claridad del input.

## Explicación y ejemplo

### Definición del prompt con objetivo
Un **prompt con objetivo** especifica explícitamente cuál es el resultado esperado. Se compone de cuatro partes esenciales:
1. **Propósito**: la razón de la solicitud (por ejemplo, “resumir un documento técnico”).
2. **Entrada**: el texto o datos que el modelo debe procesar.
3. **Restricciones**: límites de formato, longitud, estilo o cualquier condición que no debe violarse.
4. **Ejemplo**: una muestra de salida que ilustre el formato deseado.

### Caso concreto: resumen de un artículo técnico
Supongamos que el alumno posee el siguiente fragmento de texto (entrada):
```text
La arquitectura Transformer introdujo el mecanismo de auto‑atención, que permite que cada token considere todos los demás en la secuencia. Este enfoque sustituyó a las redes recurrentes en muchas tareas de procesamiento de lenguaje natural, reduciendo la complejidad computacional y mejorando la capacidad de paralelismo.
```
El objetivo es obtener un **resumen de máximo 30 palabras** que destaque los conceptos clave y mantenga la precisión técnica.

#### Versión vaga del prompt
> “Resume el texto”.
Esta instrucción carece de propósito claro, no define longitud ni estilo, y no ofrece un ejemplo. El modelo puede producir un resumen demasiado extenso, omitir información importante o usar un tono informal.

#### Versión estructurada del prompt
```
Propósito: generar un resumen conciso de un artículo técnico sobre arquitectura Transformer.
Entrada: La arquitectura Transformer introdujo el mecanismo de auto‑atención, que permite que cada token considere todos los demás en la secuencia. Este enfoque sustituyó a las redes recurrentes en muchas tareas de procesamiento de lenguaje natural, reduciendo la complejidad computacional y mejorando la capacidad de paralelismo.
Restricciones:
- Máximo 30 palabras.
- Utilizar lenguaje técnico preciso.
- No incluir opiniones ni información fuera del texto.
Ejemplo de salida:
"El Transformer usa auto‑atención para procesar secuencias, reemplazando a redes recurrentes y mejorando paralelismo y complejidad computacional."
```
Al ejecutar este prompt, el modelo debe respetar la longitud y el estilo. Si la salida supera el límite, el alumno detectará la desviación y podrá ajustar la restricción o el ejemplo.

### Comparación de dos versiones con dato ausente
Imaginemos una segunda versión del prompt que omite el dato de longitud:
```
Propósito: generar un resumen conciso de un artículo técnico sobre arquitectura Transformer.
Entrada: ... (mismo texto)
Restricciones:
- Utilizar lenguaje técnico preciso.
- No incluir opiniones ni información fuera del texto.
Ejemplo de salida:
"El Transformer usa auto‑atención para procesar secuencias, reemplazando a redes recurrentes y mejorando paralelismo y complejidad computacional."
```
Al comparar ambas salidas, la primera cumplirá el límite de 30 palabras, mientras que la segunda podrá excederlo. El alumno observará cómo la ausencia de una restricción concreta afecta directamente el resultado, lo que subraya la necesidad de especificar cada componente del prompt.

### Identificación de entradas, salidas y límites
- **Entrada**: texto a resumir.
- **Salida**: resumen estructurado según criterios.
- **Límites**: número máximo de palabras, estilo técnico, prohibición de contenido externo.
Este análisis ayuda a aislar variables observables y a diseñar pruebas de regresión para futuros prompts.

### Observabilidad del resultado
Para validar la salida, el alumno puede contar palabras automáticamente (por ejemplo, con `len(resumen.split())`) y comparar con el límite. Además, la coincidencia con el ejemplo se verifica mediante una métrica de similitud de cadenas (por ejemplo, `difflib.SequenceMatcher`). Estas técnicas convierten la evaluación en un proceso reproducible y mensurable.

## Práctica

### Tarea práctica
1. Copie el fragmento de texto sobre la arquitectura Transformer proporcionado en la sección de explicación.
2. Redacte dos prompts diferentes para generar un resumen de **máximo 25 palabras**:
   - **Prompt A**: incluya propósito, entrada, restricciones y ejemplo tal como se muestra en la versión estructurada.
   - **Prompt B**: omita deliberadamente la restricción de longitud.
3. Ejecute ambos prompts utilizando el modelo de lenguaje de su elección (puede emplear una API de código abierto o una herramienta local). Guarde las respuestas en archivos `respuesta_A.txt` y `respuesta_B.txt`.
4. Verifique la longitud de cada respuesta contando las palabras. Anote si la respuesta supera o cumple el límite.
5. Compare ambas salidas con el ejemplo proporcionado. Registre las diferencias en un documento breve indicando cuál de los dos prompts produce un resultado más alineado con el objetivo.
6. Finalmente, ajuste el Prompt B añadiendo la restricción de longitud y vuelva a ejecutar la generación. Documente el cambio observado.

### Criterios de éxito
- El alumno produce dos prompts claramente diferenciados.
- Se demuestra, mediante el conteo de palabras, que la ausencia de la restricción de longitud genera una salida más larga.
- La versión corregida del Prompt B muestra una mejora observable y se documenta la diferencia.
Esta práctica refuerza la capacidad de diseñar prompts observables y de iterar a partir de errores concretos.

## Comprobaciones

1. ¿Cuál es la longitud máxima especificada en el Prompt A?
Respuesta: 30 palabras.
2. Después de añadir la restricción de longitud al Prompt B, ¿qué cambio se espera en la salida?
Respuesta: La respuesta debe respetar el límite de palabras y, por lo tanto, ser más corta o igual a 30 palabras, alineándose con el objetivo del prompt.

## Cierre

La comparación de prompts demuestra que cada elemento estructural influye directamente en la calidad del output. En la siguiente lección se abordará cómo gestionar la ventana de contexto para mantener la coherencia en interacciones prolongadas.
