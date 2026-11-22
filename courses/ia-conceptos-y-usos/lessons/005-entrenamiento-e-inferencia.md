---
schemaVersion: 1
id: d3bd3afa-6699-481b-8795-ed13d2439009
sequence: 5
course: ia-conceptos-y-usos
stepId: entrenamiento-e-inferencia
title: "Entrenamiento e inferencia: diferencias, parámetros y contexto"
publishedAt: 2026-11-22T10:55:57.159Z
generationDate: 2026-11-22
summary: En esta lección se describen los conceptos de entrenamiento e
  inferencia de los modelos de lenguaje, se distingue entre los parámetros
  aprendidos y las instrucciones que recibe el modelo en tiempo de ejecución, y
  se muestra cómo combinar un LLM con herramientas mediante un caso práctico de
  refactorización de código con requisitos adicionales.
generation:
  model: openai/gpt-oss-120b
  promptVersion: v5
  contextHash: b0d53ff6cdee04ba6faf9b8e8fe6036614f3a502bce0c0931d1893e44eb97d88
---

## Por qué ahora

Los modelos de lenguaje se utilizan cada vez más en entornos de desarrollo donde se necesita generar o transformar código de forma automática. Comprender cómo el modelo adquiere sus capacidades (entrenamiento) y cómo responde a una solicitud concreta (inferencia) permite al profesional distinguir qué aspectos pueden modificarse mediante datos de entrenamiento y cuáles deben manejarse en el prompt o mediante herramientas externas. Esta distinción es crucial para diagnosticar errores, ajustar el comportamiento del modelo y diseñar sistemas que integren LLMs con refactorizadores, linters u otras utilidades sin depender de cambios internos del modelo. El conocimiento de estos fundamentos es la base para aplicar de forma fiable técnicas de RAG, agentes y evaluación en etapas posteriores del curso.

## Explicación y ejemplo

### Definición de LLM
Un **Large Language Model (LLM)** es una red neuronal entrenada con grandes volúmenes de texto para predecir la siguiente palabra a partir de una secuencia de contexto. Durante el **entrenamiento** el modelo ajusta millones o miles de millones de pesos (parámetros) a fin de minimizar el error de predicción sobre el corpus de entrenamiento.

### Parámetros aprendidos vs. instrucciones del prompt
- **Parámetros aprendidos**: representan el conocimiento estadístico del lenguaje y de los patrones presentes en los datos de entrenamiento. No pueden modificarse una vez que el modelo ha sido publicado.
- **Instrucciones del prompt**: texto que se envía al modelo en la fase de **inferencia**. Incluye la tarea, el contexto y cualquier restricción adicional. Estas instrucciones guían al modelo para que utilice sus parámetros de manera orientada a la necesidad actual.

### Proceso de inferencia
1. **Entrada**: prompt estructurado + opcionalmente datos externos (p. ej., fragmentos de código).
2. **Contexto**: ventana de tokens que el modelo puede observar simultáneamente (por ejemplo, 4 096 tokens).
3. **Salida**: secuencia generada por el modelo, que depende de los parámetros y del prompt.

### Caso práctico: refactorizar una función con requisitos añadidos
Supongamos que el alumno tiene el siguiente fragmento Python que calcula la suma de una lista:

```python
def suma_lista(nums):
    total = 0
    for n in nums:
        total += n
    return total
```

El objetivo es **refactorizar** la función para que cumpla dos requisitos nuevos:
1. Utilizar comprensión de listas en lugar del bucle explícito.
2. Añadir validación que lance `ValueError` si algún elemento no es numérico.

#### Prompt de inferencia
```text
Refactoriza la siguiente función Python según los requisitos indicados. Mantén la firma original y agrega una validación que lance ValueError si algún elemento no es numérico.

```python
def suma_lista(nums):
    total = 0
    for n in nums:
        total += n
    return total
```
```

En la fase de inferencia el modelo recibe este prompt y, usando sus parámetros aprendidos, genera una respuesta que combina conocimientos de Python, patrones de refactorización y manejo de errores.

#### Salida esperada del modelo
```python
def suma_lista(nums):
    if not all(isinstance(n, (int, float)) for n in nums):
        raise ValueError("Todos los elementos deben ser numéricos")
    return sum(nums)
```

### Análisis de la salida
- **Entrada del modelo**: el prompt contiene la función original y los requisitos. No se modifica el modelo subyacente.
- **Salida del modelo**: una versión refactorizada que utiliza la función built‑in `sum` (más concisa) y una validación basada en `all` y `isinstance`.
- **Límites observables**:
  * El modelo solo conoce los tokens dentro de la ventana; si la función original fuera muy larga, partes podrían quedar fuera del contexto.
  * No puede aprender nuevos patrones sin re‑entrenamiento; si el requisito fuera algo fuera de su experiencia (por ejemplo, una nueva biblioteca), la respuesta podría ser imprecisa.

### Combinar LLM con herramientas externas
En aplicaciones reales se suele encadenar la salida del modelo con herramientas de ejecución o pruebas automáticas. Por ejemplo, después de recibir la función refactorizada, un script puede:
1. Guardar el código en un archivo temporal.
2. Ejecutar pruebas unitarias para comprobar que la funcionalidad sigue siendo correcta.
3. Informar al usuario si la validación falla.

Este patrón muestra cómo **el entrenamiento define lo que el modelo sabe** y **el prompt + herramientas determinan lo que hace en cada llamada**. La separación clara entre parámetros y contexto permite a los desarrolladores diagnosticar por qué una respuesta es inesperada: ¿falta información en el prompt o el modelo simplemente no conoce ese patrón?

### Resumen de conceptos clave
- **Entrenamiento**: proceso offline que ajusta los parámetros del modelo a partir de datos masivos.
- **Inferencia**: proceso online donde el modelo genera texto a partir de un prompt y su contexto limitado.
- **Parámetros**: conocimiento estático del modelo.
- **Prompt / Instrucciones**: control dinámico que dirige el uso de los parámetros.
- **Herramientas**: componentes externos que complementan la salida del modelo (ej. linters, ejecutores, validadores).

## Práctica

#### Objetivo de la práctica
El alumno debe reproducir el caso de refactorización descrito, pero aplicándolo a una función distinta y añadiendo una restricción propia. El ejercicio está pensado para realizarse sin acceso a un modelo real; el alumno redactará el prompt, anticipará la salida esperada y verificará su corrección mediante pruebas unitarias.

#### Pasos a seguir
1. **Seleccionar una función sencilla**. Por ejemplo, una que convierta una lista de cadenas a mayúsculas:
   ```python
   def mayusculas(lista):
       resultado = []
       for s in lista:
           resultado.append(s.lower())
       return resultado
   ```
2. **Definir dos requisitos nuevos**. Sugerencia:
   - Utilizar comprensión de listas en lugar del bucle.
   - Añadir validación que lance `TypeError` si algún elemento no es una cadena.
3. **Redactar el prompt** siguiendo el mismo formato del caso práctico (instrucciones claras, código original dentro de bloques Markdown). El prompt debe incluir los requisitos y pedir explícitamente la versión refactorizada.
4. **Anticipar la respuesta** del modelo. Escriba la función refactorizada que cumpliría los requisitos:
   ```python
   def mayusculas(lista):
       if not all(isinstance(s, str) for s in lista):
           raise TypeError("Todos los elementos deben ser cadenas de texto")
       return [s.upper() for s in lista]
   ```
5. **Crear pruebas unitarias** que validen la nueva función:
   ```python
   import pytest

   def test_mayusculas_correcto():
       assert mayusculas(["hola", "mundo"]) == ["HOLA", "MUNDO"]

   def test_mayusculas_error_tipo():
       with pytest.raises(TypeError):
           mayusculas(["texto", 123])
   ```
6. **Ejecutar las pruebas** en su entorno local. Si todas pasan, la anticipación es consistente con la salida esperada del modelo.
7. **Reflexionar** sobre la experiencia: ¿El prompt fue suficiente para guiar al modelo? ¿Qué información habría añadido para mejorar la claridad?

Al completar estos pasos, el alumno habrá aplicado los conceptos de entrenamiento (conocimiento estático del modelo) e inferencia (prompt y contexto) a una situación concreta, y habrá demostrado cómo validar la respuesta mediante pruebas automáticas.

#### Entregable
Redacte un documento breve (máximo una página) que incluya:
- El prompt utilizado.
- La función refactorizada esperada.
- El código de pruebas unitarias.
- Una reflexión de 3‑4 líneas sobre la claridad del prompt y los límites observados.

Esta entrega servirá como base para la próxima lección, donde se introducirá la integración de herramientas de recuperación de documentos (RAG) con LLMs.

## Comprobaciones

1. ¿Cuál es la diferencia fundamental entre los parámetros aprendidos durante el entrenamiento y las instrucciones proporcionadas en el prompt durante la inferencia?
Respuesta: Los parámetros aprendidos son pesos estáticos que el modelo ajusta durante el entrenamiento y no pueden modificarse en tiempo de ejecución; las instrucciones del prompt son texto dinámico que guía al modelo a utilizar esos parámetros para generar una respuesta específica.
2. En el ejemplo de refactorización, ¿qué mecanismo se utilizó para validar que los elementos de la lista fueran numéricos antes de aplicar la suma?
Respuesta: Se empleó la expresión `all(isinstance(n, (int, float)) for n in nums)` dentro de una condición que, de no cumplirse, lanza `ValueError`.

## Cierre

Con esta práctica el alumno ha consolidado la distinción entre entrenamiento e inferencia y ha experimentado un flujo completo de prompt‑respuesta‑validación. En la siguiente lección se explorará cómo combinar un LLM con fuentes externas mediante recuperación de documentos, ampliando el contexto disponible más allá de la ventana de tokens.
