---
schemaVersion: 1
id: 94216deb-30cf-4ded-b9bc-a1992a930144
sequence: 8
course: ia-conceptos-y-usos
stepId: elegir-otro-modelo
title: Qué puede cambiar al elegir otro modelo
publishedAt: 2026-11-25T12:21:03.091Z
generationDate: 2026-11-25
summary: En esta lección se comparan dos modelos de lenguaje aplicados a la
  misma tarea de programación, identificando cómo varían las respuestas en
  seguimiento de instrucciones, manejo de casos límite y claridad. Se describen
  los factores dependientes del modelo y los controlables por la aplicación,
  proporcionando una base observacional para seleccionar el modelo adecuado.
generation:
  model: openai/gpt-oss-120b
  promptVersion: v5
  contextHash: d88afba8abf2182a116b9df13bab499bd066fc7e6f5e3dc1c53d2265b6290a08
---

## Por qué ahora

La disponibilidad de varios modelos con diferentes tamaños, arquitecturas y afinaciones permite al profesional de IA elegir la herramienta que mejor se ajuste a requisitos específicos de precisión, velocidad y coste de ejecución. En entornos donde la programación asistida es parte del flujo de trabajo diario, la elección del modelo influye directamente en la productividad y en la confiabilidad de los resultados. Comparar modelos antes de adoptarlos evita sorpresas y reduce la necesidad de re‑entrenamiento o de ajustes posteriores. Además, la práctica de evaluación sistemática fortalece la capacidad de diagnosticar limitaciones y de diseñar aplicaciones que aprovechen las fortalezas de cada modelo.

## Explicación y ejemplo

### Contexto y objetivo
Se propone una tarea de refactorización de una función que calcula la serie de Fibonacci recursivamente y que debe cumplir dos requisitos adicionales: (1) limitar la profundidad de recursión a 10 llamadas y (2) añadir comentarios en español que expliquen cada paso. La misma consigna se envía a dos modelos diferentes, **Modelo A** (un LLM de 7 B parámetros con ajuste conversacional) y **Modelo B** (un LLM de 13 B parámetros especializado en código).

### Entrada y salida esperada
**Entrada**: fragmento de código Python sin límite de recursión y sin documentación.
```python

def fib(n):
    if n <= 1:
        return n
    return fib(n-1) + fib(n-2)
```
**Salida esperada**: versión refactorizada que (a) incorpora una verificación de profundidad usando un contador global o argumento adicional, (b) mantiene la lógica correcta para los valores dentro del rango permitido, y (c) incluye comentarios claros en español.

### Resultados observados
#### Modelo A
```python
# Refactorización con límite de profundidad
max_depth = 10

def fib(n, depth=0):
    """Calcula Fibonacci con límite de profundidad.
    Si la profundidad supera max_depth, devuelve None.
    """
    if depth > max_depth:
        return None
    if n <= 1:
        return n
    return fib(n-1, depth+1) + fib(n-2, depth+1)
```
- **Seguimiento de instrucciones**: cumple con los dos requisitos, pero usa una variable global implícita (`max_depth`) sin explicitar su origen en los comentarios.
- **Casos límite**: devuelve `None` cuando se supera la profundidad, lo cual es correcto pero no se menciona explícitamente en el texto del comentario.
- **Claridad**: los comentarios son breves pero precisos; sin embargo, la explicación de la variable `max_depth` falta.

#### Modelo B
```python
# Refactorización de Fibonacci con control de profundidad y documentación
MAX_PROFUNDIDAD = 10

def fibonacci(n, profundidad=0):
    """Calcula el número de Fibonacci para *n*.
    La función aborta y devuelve *None* si la profundidad de recursión excede
    `MAX_PROFUNDIDAD`. Los comentarios están en español y describen cada paso.
    """
    if profundidad > MAX_PROFUNDIDAD:
        # Límite de recursión alcanzado
        return None
    if n <= 1:
        # Caso base: 0 o 1
        return n
    # Llamada recursiva incrementando la profundidad
    return fibonacci(n-1, profundidad+1) + fibonacci(n-2, profundidad+1)
```
- **Seguimiento de instrucciones**: satisface los requisitos y además renombra la función para mayor claridad.
- **Casos límite**: maneja el límite de profundidad de forma explícita y lo menciona en el docstring.
- **Claridad**: los comentarios son más detallados y la constante `MAX_PROFUNDIDAD` está claramente definida.

### Análisis de diferencias
1. **Tamaño y afinación**: el modelo más grande y especializado (Modelo B) produce código más autocontenido y documentación más exhaustiva, mientras que el modelo más pequeño (Modelo A) entrega una solución funcional pero con menos contexto explicativo.
2. **Gestión de estados**: Modelo B utiliza una constante en mayúsculas y la incluye en el docstring, lo que facilita la identificación de parámetros críticos. Modelo A usa una variable global sin convención clara, lo que podría generar confusión al integrarse en proyectos mayores.
3. **Estilo y legibilidad**: la mayor capacidad de Model B se traduce en nombres de funciones descriptivos (`fibonacci` vs `fib`) y comentarios que siguen buenas prácticas de documentación.

### Factores dependientes del modelo vs. de la aplicación
- **Dependientes del modelo**: nivel de detalle en la documentación, consistencia en la nomenclatura, capacidad para reconocer y aplicar convenciones de código (p. ej., uso de constantes en mayúsculas). Estas características emergen de la arquitectura y del corpus de entrenamiento.
- **Dependientes de la aplicación**: la lógica de límite de profundidad, la decisión de renombrar la función o de exponer la constante, y la forma en que se manejan los valores `None` son decisiones de diseño que la aplicación puede imponer independientemente del modelo.

### Registro de variantes
Se recomienda registrar para cada modelo:
- El fragmento de salida completo.
- Un mapa de requisitos cubiertos vs. omitidos.
- Observaciones sobre estilo y legibilidad.
- Métricas de tiempo de respuesta si la latencia es relevante.
Este registro permite comparar objetivamente y evita generalizaciones basadas en un solo ejemplo.

## Práctica

#### Tarea práctica
1. Copie el fragmento de código original de la serie de Fibonacci proporcionado en la sección de explicación.
2. Elija dos modelos de lenguaje diferentes a los descritos (por ejemplo, un modelo de 2 B parámetros y otro de 6 B parámetros) y genere una refactorización que cumpla los mismos requisitos de límite de profundidad y comentarios en español.
3. Guarde cada respuesta en archivos separados (`refactor_A.py` y `refactor_B.py`).
4. Realice las siguientes verificaciones de forma manual o mediante un script sencillo:
   - Compruebe que ambos archivos definan una constante o variable que represente el límite de profundidad y que el valor sea 10.
   - Asegúrese de que la función incluya un docstring en español que describa el comportamiento y el manejo de casos límite.
   - Ejecute la función con valores `n = 5` y `n = 12` y observe que los resultados son correctos mientras que para profundidades superiores a 10 la función devuelve `None`.
5. Documente sus observaciones en una tabla que incluya columnas para: modelo, nombre de la función, presencia de constante, nivel de detalle de los comentarios, y cualquier diferencia de estilo relevante.
6. Reflexione sobre cómo las diferencias observadas podrían afectar la integración del código en un proyecto real, por ejemplo, en términos de mantenibilidad o de facilidad para otros desarrolladores.

#### Entrega
Redacte un breve informe (máximo 300 palabras) que resuma los hallazgos y adjunte la tabla de comparativa. El informe debe estar listo para ser revisado en la próxima sesión.

## Comprobaciones

1. ¿Qué elemento del código generado por el Modelo B indica explícitamente el límite de profundidad?
Respuesta: La constante `MAX_PROFUNDIDAD = 10` declarada al inicio del archivo.
2. ¿Cómo se verifica en ambos modelos que la profundidad no exceda el límite?
Respuesta: Cada modelo incluye una condición `if profundidad > MAX_PROFUNDIDAD` (Modelo B) o `if depth > max_depth` (Modelo A) que devuelve `None` cuando se supera el umbral.

## Cierre

La comparación muestra que la capacidad de generar documentación detallada y seguir convenciones de código depende del tamaño y especialización del modelo. En la siguiente lección se abordará la evaluación cuantitativa de respuestas mediante métricas automáticas y pruebas unitarias, ampliando el proceso de selección de modelo a criterios medibles.
