---
schemaVersion: 1
id: 5a170c8f-b94a-457c-a8e3-a924d1f66b7d
sequence: 3
course: ia-conceptos-y-usos
stepId: aprender-de-ejemplos
title: Aprender de ejemplos, datos y redes neuronales
publishedAt: 2026-11-20T11:06:53.787Z
generationDate: 2026-11-20
summary: En esta lección se describen los elementos que cambian durante el
  entrenamiento de un modelo de clasificación de texto, se explica por qué la
  evaluación se realiza con ejemplos no vistos y se muestra el impacto de datos
  poco representativos en la capacidad de generalización.
generation:
  model: openai/gpt-oss-120b
  promptVersion: v5
  contextHash: 2bb47b9ae7a4aed46ee1ce738246af9a06ee999938fb0c95b74588542ec5b1bd
---

## Por qué ahora

Los modelos de inteligencia artificial se utilizan cada vez más para automatizar decisiones basadas en texto, desde filtrado de correo hasta clasificación de tickets de soporte. Comprender qué ocurre internamente cuando un modelo se entrena permite detectar sesgos, anticipar fallos y ajustar procesos sin depender de proveedores externos. Además, la práctica de evaluar con ejemplos que el modelo no ha visto es fundamental para garantizar que la solución generalice a datos reales, lo que reduce riesgos operacionales y mejora la confianza del usuario. Esta lección ofrece los conceptos y el ejercicio necesario para observar directamente esos cambios.

## Explicación y ejemplo

### Datos y etiquetas

Se parte de un conjunto de ejemplos estructurados como pares *(texto, etiqueta)*. En el ejemplo propuesto, diez correos electrónicos ficticios se etiquetan como `spam` o `ham` (legítimo). Cada mensaje se representa mediante un vector de características, por ejemplo la frecuencia de palabras clave (`"oferta"`, `"urgente"`, `"reunión"`).

```text
id,text,etiqueta
1,"Oferta limitada, compra ahora",spam
2,"Reunión de proyecto el viernes",ham
3,"Gana dinero rápido sin esfuerzo",spam
... (7 filas más)
```

### Parámetros y entrenamiento

Un modelo de clasificación aprende **parámetros** que transforman el vector de características en una puntuación que se interpreta como probabilidad de pertenecer a una clase. En una red neuronal simple de una capa, cada característica tiene un peso `w_i` y un sesgo `b`. La salida se calcula como `sigmoid( Σ w_i·x_i + b )`.

Durante el **entrenamiento**, se ajustan los pesos y el sesgo minimizando una función de pérdida, típicamente la entropía cruzada. El algoritmo de optimización (por ejemplo, gradiente descendente) modifica los parámetros iterativamente en función del error cometido en los ejemplos del conjunto de entrenamiento. Cada epoch recorre todos los ejemplos y actualiza los pesos de acuerdo con el gradiente calculado.

### Evaluación con datos no vistos

Una vez finalizado el entrenamiento, el modelo se evalúa con un **conjunto de prueba** que no formó parte del proceso de ajuste. Esta separación es crucial porque permite medir la **generalización**: la capacidad del modelo para predecir correctamente en datos provenientes de la misma distribución pero nunca antes observados. Si la precisión en entrenamiento es alta pero la precisión en prueba es baja, el modelo ha sobreajustado los patrones específicos del conjunto de entrenamiento y no ha aprendido una regla robusta.

### Impacto de datos poco representativos

Si el conjunto de entrenamiento está sesgado, por ejemplo contiene un 90 % de correos `spam` y solo un 10 % de `ham`, el modelo tenderá a predecir `spam` con alta frecuencia. En la práctica, esto se traduce en un alto número de falsos negativos (correos legítimos clasificados como spam) y un bajo valor de precisión para la clase minoritaria. Al evaluar con un conjunto de prueba balanceado, el descenso de la métrica (por ejemplo, F1‑score) evidencia el problema de representatividad.

El proceso descrito muestra claramente **qué se modifica** al entrenar: los pesos y el sesgo que definen la frontera de decisión. También muestra **por qué se evalúa** con ejemplos no vistos: para confirmar que la frontera aprendida no depende de particularidades del conjunto de entrenamiento y que el modelo será útil en situaciones reales.

## Práctica

#### Objetivo de la práctica

Implementar, entrenar y evaluar un clasificador de texto simple usando **Python** y la biblioteca **scikit‑learn**. El alumno deberá observar cómo cambian los pesos al entrenar y cómo varía la métrica de prueba al modificar la composición del conjunto de entrenamiento.

#### Paso a paso

1. **Crear el archivo de datos** `correos.csv` con las diez filas mostradas en la sección anterior. Guardar el archivo en el mismo directorio que el script.
2. **Instalar las dependencias** (si no están disponibles):
   ```bash
   pip install scikit-learn pandas
   ```
3. **Escribir el script** `clasificador.py`:
   ```python
   import pandas as pd
   from sklearn.feature_extraction.text import CountVectorizer
   from sklearn.model_selection import train_test_split
   from sklearn.linear_model import LogisticRegression
   from sklearn.metrics import classification_report

   # 1. Cargar datos
   df = pd.read_csv('correos.csv')

   # 2. Vectorizar texto
   vectorizer = CountVectorizer()
   X = vectorizer.fit_transform(df['text'])
   y = df['etiqueta'].map({'ham':0, 'spam':1})

   # 3. Dividir en entrenamiento y prueba (80/20)
   X_train, X_test, y_train, y_test = train_test_split(
       X, y, test_size=0.2, random_state=42, stratify=y)

   # 4. Entrenar modelo logístico (una capa lineal equivale a una red neuronal sin capas ocultas)
   modelo = LogisticRegression(solver='liblinear')
   modelo.fit(X_train, y_train)

   # 5. Evaluar
   pred = modelo.predict(X_test)
   print(classification_report(y_test, pred, target_names=['ham','spam']))

   # 6. Mostrar pesos asociados a cada palabra
   feature_names = vectorizer.get_feature_names_out()
   pesos = modelo.coef_[0]
   tabla = sorted(zip(feature_names, pesos), key=lambda x: abs(x[1]), reverse=True)
   print('\nPesos más influyentes:')
   for palabra, peso in tabla[:5]:
       print(f"{palabra}: {peso:.3f}")
   ```
4. **Ejecutar** el script:
   ```bash
   python clasificador.py
   ```
   Observar el informe de clasificación (precisión, recall, F1) y los pesos mostrados.
5. **Experimentar** modificando el archivo `correos.csv`:
   * Añadir más ejemplos de la clase minoritaria (`ham`).
   * Eliminar o duplicar algunos ejemplos de `spam`.
   * Volver a ejecutar el script y comparar cómo cambian las métricas y los pesos.

#### Resultados observables

* Los valores de precisión y recall en la clase `spam` variarán según el balance de datos.
* Los pesos asociados a palabras como `"oferta"` o `"reunión"` reflejarán su importancia para la decisión del modelo.
* La salida del informe mostrará si el modelo está sobreajustado (muy alta precisión en entrenamiento pero menor en prueba).

Al completar la práctica, el alumno habrá verificado de forma directa qué parámetros se actualizan al entrenar y cómo la selección de ejemplos de entrenamiento influye en la capacidad de generalización.

## Comprobaciones

1. ¿Cuál es la función matemática que transforma el vector de características en una probabilidad en una red neuronal de una sola capa?
Respuesta: `sigmoid( Σ w_i·x_i + b )`.
2. Si el conjunto de entrenamiento contiene 90 % de ejemplos de la clase `spam` y 10 % de `ham`, ¿qué efecto esperado tiene sobre la precisión del modelo en la clase `ham` al evaluarse con un conjunto de prueba balanceado?
Respuesta: La precisión (y recall) para la clase `ham` tenderá a ser baja porque el modelo ha aprendido poco de esa clase, produciendo muchos falsos negativos.

## Cierre

Con esta experiencia práctica el alumno ha constatado cómo los pesos y el sesgo se ajustan durante el entrenamiento y cómo el balance de datos afecta la capacidad de generalización. En la siguiente lección se abordará la arquitectura de redes neuronales más profunda, introduciendo capas ocultas y funciones de activación no lineales, para ampliar la comprensión de modelos que manejan representaciones más complejas.
