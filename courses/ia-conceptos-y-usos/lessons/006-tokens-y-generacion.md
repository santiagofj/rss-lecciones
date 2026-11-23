---
schemaVersion: 1
id: ec5d3947-bc68-4501-9cba-65cf377eaab5
sequence: 6
course: ia-conceptos-y-usos
stepId: tokens-y-generacion
title: Tokens y generación paso a paso
publishedAt: 2026-11-23T12:00:44.688Z
generationDate: 2026-11-23
summary: Esta lección describe qué es un token, cómo los tokenizadores segmentan
  texto de forma diferente y cómo un modelo de lenguaje genera texto token a
  token a partir de distribuciones de probabilidad. Se presentan dos
  continuaciones posibles para un fragmento breve, se introducen los conceptos
  de muestreo y temperatura, y se discute por qué la salida más probable no
  siempre coincide con la respuesta correcta.
generation:
  model: openai/gpt-oss-120b
  promptVersion: v5
  contextHash: 7eaf4a4bafc1ffd9a028cbeb49d0599fa95650a5c3715e253abcaf40557e78ac
---

## Por qué ahora

En los últimos años los modelos de lenguaje han pasado de ser curiosidades académicas a componentes críticos en entornos de desarrollo, asistencia al cliente y creación de contenido. Entender la unidad mínima de procesamiento, el token, permite diagnosticar diferencias de comportamiento entre modelos, ajustar la longitud de respuesta y anticipar costos computacionales. Además, la generación paso a paso es la base para técnicas avanzadas como la programación de instrucciones, la corrección iterativa y la interacción con herramientas externas. Dominar estos conceptos antes de abordar estrategias de muestreo o de control de salida garantiza que el alumno pueda interpretar resultados y detectar errores de forma independiente.

## Explicación y ejemplo

### ¿Qué es un token?
Un token es la unidad elemental que el modelo de lenguaje procesa. Puede corresponder a una palabra completa, a una subpalabra (por ejemplo, "##ing"), a un carácter o a un símbolo de puntuación. La elección depende del algoritmo de tokenización utilizado.

### Tokenizadores y segmentación variable
Existen varios algoritmos: BPE (Byte‑Pair Encoding), WordPiece y unigram. Cada uno construye un vocabulario a partir de un corpus y, por tanto, segmenta una misma cadena de forma distinta. Por ejemplo, la frase:
```
El análisis de datos es clave.
```
- Con un tokenizador basado en palabras, los tokens podrían ser: ["El", "análisis", "de", "datos", "es", "clave", "."]
- Con un tokenizador BPE, la misma frase puede convertirse en: ["El", "an", "á", "lis", "is", " de", " datos", " es", " clave", "."]
Esta variabilidad influye directamente en la longitud de la secuencia y en la distribución de probabilidad que el modelo aprende.

### Generación paso a paso
Durante la inferencia, el modelo recibe una secuencia de tokens de contexto y produce una distribución de probabilidad sobre el vocabulario para el siguiente token. El proceso se repite:
1. Se toma el token de inicio (por ejemplo, ``<s>``) y se calcula ``P(t1|<s>)``.
2. Se selecciona ``t1`` según una estrategia de muestreo (máxima probabilidad, muestreo aleatorio, top‑k, etc.).
3. ``t1`` se añade al contexto y se recalcula ``P(t2|<s> t1)``.
4. El ciclo continúa hasta que se genera un token de fin de secuencia o se alcanza una longitud máxima.

### Ejemplo concreto
Considere el fragmento ``"La IA puede"`` y un modelo que, tras tokenizar, obtiene los tokens `["La", "ĠIA", "Ġpuede"]`. La distribución para el siguiente token podría ser:
- ``" generar"`` → 0.45
- ``" mejorar"`` → 0.30
- ``" ser"`` → 0.15
- ``" <unk>"`` → 0.10
Si se elige la máxima probabilidad, el modelo genera ``" generar"`` y la secuencia resultante es ``"La IA puede generar"``.

Ahora bien, supongamos que la tarea es completar la frase con un verbo que indique una acción factible en el contexto de una aplicación de asistencia de programación. La opción más probable (``" generar"``) es correcta, pero también podrían ser válidas ``" mejorar"`` o ``" ser"`` dependiendo del dominio. Un muestreo con temperatura >1 aumenta la diversidad, permitiendo que tokens con probabilidad menor aparezcan con mayor frecuencia, lo que a veces produce resultados inesperados o incorrectos.

### Por qué el token más probable puede ser incorrecto
La distribución refleja la frecuencia observada en los datos de entrenamiento, no una verdad lógica. Si el corpus contiene muchos ejemplos donde ``"IA puede generar código"`` pero pocos donde ``"IA puede mejorar código"``, el modelo favorecerá ``"generar"`` aunque, para un caso específico, ``"mejorar"`` sea la respuesta adecuada. Este sesgo se hace evidente al cambiar el contexto o al usar un tokenizador diferente que produce una segmentación distinta, modificando así las probabilidades posteriores.

### Resumen del flujo
- **Tokenización**: convierte texto en tokens según el vocabulario.
- **Distribución**: el modelo calcula ``P(token_{n+1}|tokens_{1..n})``.
- **Muestreo**: se elige el siguiente token según una política (máximo, temperatura, top‑k).
- **Iteración**: se repite hasta el final de secuencia.
Este ciclo es la base de todas las aplicaciones de generación de texto, desde completado de código hasta redacción de documentos.

## Práctica

**Objetivo**: reproducir el proceso de tokenización y generación paso a paso con un modelo de código abierto.

**Requisitos**:
- Python 3.9 o superior.
- Biblioteca `transformers` de Hugging Face.
- Modelo `distilbert-base-uncased` (para demostración de tokenizador) y `gpt2` para generación.

**Pasos**:
1. Instale la biblioteca:
```bash
pip install transformers==4.40.0
```
2. Importe los tokenizadores y el modelo:
```python
from transformers import AutoTokenizer, GPT2LMHeadModel

# Tokenizador de DistilBERT (word‑piece)
bert_tokenizer = AutoTokenizer.from_pretrained('distilbert-base-uncased')
# Modelo de generación GPT‑2
gpt2_tokenizer = AutoTokenizer.from_pretrained('gpt2')
model = GPT2LMHeadModel.from_pretrained('gpt2')
```
3. Defina el fragmento a completar:
```python
prompt = "La IA puede"
```
4. **Tokenización con DistilBERT** para observar la segmentación:
```python
bert_tokens = bert_tokenizer.tokenize(prompt)
print('Tokens DistilBERT:', bert_tokens)
```
5. **Tokenización con GPT‑2** (el modelo de generación) y generación del siguiente token con temperatura 1.0 (máxima probabilidad):
```python
input_ids = gpt2_tokenizer.encode(prompt, return_tensors='pt')
# Obtener la distribución del siguiente token
output = model(input_ids)
logits = output.logits[:, -1, :]
probabilities = logits.softmax(dim=-1)
# Token más probable
next_token_id = probabilities.argmax(dim=-1)
next_token = gpt2_tokenizer.decode(next_token_id)
print('Token más probable:', next_token)
```
6. **Muestreo con temperatura 1.5** para observar diversidad:
```python
import torch
temperature = 1.5
temp_logits = logits / temperature
temp_probs = temp_logits.softmax(dim=-1)
next_token_id_temp = torch.multinomial(temp_probs, num_samples=1)
next_token_temp = gpt2_tokenizer.decode(next_token_id_temp)
print('Token muestreado (temp=1.5):', next_token_temp)
```
7. **Iterar** para generar una frase completa de 5 tokens adicionales:
```python
generated = prompt
input_ids = gpt2_tokenizer.encode(generated, return_tensors='pt')
for _ in range(5):
    output = model(input_ids)
    logits = output.logits[:, -1, :]
    next_id = logits.softmax(dim=-1).argmax(dim=-1)
    next_token = gpt2_tokenizer.decode(next_id)
    generated += next_token
    input_ids = gpt2_tokenizer.encode(generated, return_tensors='pt')
print('Secuencia generada:', generated)
```
8. **Observación**: Compare la tokenización de DistilBERT y GPT‑2. Note cuántos tokens representa cada palabra y cómo esa diferencia afecta la longitud de la secuencia generada.

**Entrega**: copie el código en un archivo `tokens_generacion.py`, ejecútelo y capture la salida. Adjunte las listas de tokens y la frase generada en un documento de texto. Verifique que los tokens obtenidos coinciden con lo esperado y que la generación muestra una diferencia entre la selección de máxima probabilidad y el muestreo con temperatura.

**Criterio de evaluación**: el alumno debe demostrar que entiende (a) la segmentación distinta de dos tokenizadores, (b) cómo se extrae la distribución de probabilidad del modelo, y (c) cómo la política de muestreo modifica la salida.

## Comprobaciones

1. ¿Cuál es la diferencia principal entre un tokenizador basado en palabras y uno basado en subpalabras?
Respuesta: El tokenizador basado en palabras divide el texto en unidades léxicas completas, mientras que el tokenizador de subpalabras puede dividir una palabra en varios fragmentos para manejar vocabularios más pequeños y palabras no vistas.
2. En el ejemplo de generación, ¿qué efecto tiene aumentar la temperatura de 1.0 a 1.5?
Respuesta: Aumentar la temperatura suaviza la distribución de probabilidad, haciendo que los tokens con menor probabilidad tengan más posibilidades de ser elegidos, lo que incrementa la diversidad y puede producir resultados menos predecibles.

## Cierre

Esta lección ha aclarado la naturaleza de los tokens, la forma en que los modelos generan texto paso a paso y cómo la elección del tokenizador y la política de muestreo influyen en el resultado. En la siguiente sesión se profundizará en los métodos de muestreo avanzados, como top‑k y nucleus, y se analizará su impacto en la coherencia y creatividad de las saluciones generadas.
