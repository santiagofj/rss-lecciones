---
schemaVersion: 1
id: c96839c0-9136-40c2-afe2-9e50d9f16360
sequence: 4
course: ia-conceptos-y-usos
stepId: predecir-y-generar
title: Predecir y generar en un mismo producto
publishedAt: 2026-11-21T10:47:32.800Z
generationDate: 2026-11-21
summary: Aprende a combinar clasificación, estimación y generación de texto en
  una única interfaz de ayuda, con un caso práctico que integra reglas,
  aprendizaje automático y plantillas de respuesta.
generation:
  model: openai/gpt-oss-120b
  promptVersion: v5
  contextHash: cb54dc7e84bef84746a78eedda34add860b95c764a5d3548ed7cbc242e951e64
---

## Por qué ahora

En los entornos de soporte técnico la velocidad y la consistencia de la respuesta determinan la satisfacción del usuario. Un sistema que solo clasifica tickets, o solo sugiere textos, no aprovecha la información disponible para reducir la carga operativa. Combinar predicción (clasificación, estimación) y generación (borrador de respuesta) permite cerrar el ciclo dentro de una única interfaz, lo que simplifica la monitorización, reduce los tiempos de intervención y facilita la evaluación de cada componente bajo condiciones reales. La disponibilidad de modelos de lenguaje ligeros y de bibliotecas de aprendizaje automático en Python hace factible implementar prototipos hoy mismo, sin necesidad de infraestructuras complejas.

## Explicación y ejemplo

### Contexto del caso
Se plantea una mesa de ayuda que recibe tickets por correo electrónico. Cada ticket necesita tres tratamientos simultáneos:
1. **Clasificación** del tipo de incidencia (p.ej., "hardware", "software", "acceso").
2. **Estimación** del tiempo necesario para resolverlo.
3. **Generación** de un borrador de respuesta que incluya la categoría y la estimación.

El objetivo es ilustrar cómo cada sub‑tarea tiene entradas, salidas y métricas diferentes, pero pueden ejecutarse en una única cadena de procesamiento.

### Entradas y salidas
| Paso | Entrada | Salida | Tipo de modelo |
|------|---------|--------|----------------|
| Regla explícita | Texto del asunto | Etiqueta preliminar (p.ej., si contiene "error 404" → "software") | Regla de código |
| Clasificador aprendido | Cuerpo del mensaje | Probabilidad de cada categoría | Modelo supervisado (LogisticRegression) |
| Regresión | Texto completo + etiqueta | Tiempo estimado en horas | Modelo de regresión lineal |
| Generador | Etiqueta + tiempo estimado | Borrador de respuesta en lenguaje natural | Plantilla basada en LLM (simulada) |

### Implementación paso a paso
```python
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression, LinearRegression

# 1. Cargar datos ficticios
# tickets.csv contiene: id, asunto, cuerpo, categoria (etiqueta real), tiempo_real (horas)
 tickets = pd.read_csv("tickets.csv")

# 2. Regla explícita sobre el asunto
 def regla_asunto(asunto):
     asunto = asunto.lower()
     if "error 404" in asunto:
         return "software"
     if "no arranca" in asunto:
         return "hardware"
     return None

 tickets["categoria_regla"] = tickets["asunto"].apply(regla_asunto)

# 3. Preparar datos para el clasificador aprendido (solo los que la regla no resolvió)
 mask = tickets["categoria_regla"].isna()
 X = tickets.loc[mask, "cuerpo"]
 y = tickets.loc[mask, "categoria"]
 X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

 vectorizer = TfidfVectorizer(max_features=500)
 X_train_vec = vectorizer.fit_transform(X_train)
 X_test_vec = vectorizer.transform(X_test)

 clf = LogisticRegression(max_iter=1000)
 clf.fit(X_train_vec, y_train)

 # 4. Predicción combinada de categoría
 def predecir_categoria(asunto, cuerpo):
     regla = regla_asunto(asunto)
     if regla:
         return regla
     vec = vectorizer.transform([cuerpo])
     return clf.predict(vec)[0]

 tickets["categoria_pred"] = tickets.apply(lambda r: predecir_categoria(r["asunto"], r["cuerpo"]), axis=1)

# 5. Modelo de regresión para estimar tiempo
 X_time = tickets["cuerpo"] + " " + tickets["categoria_pred"]
 X_time_vec = vectorizer.fit_transform(X_time)
 y_time = tickets["tiempo_real"]
 reg = LinearRegression()
 reg.fit(X_time_vec, y_time)

 def estimar_tiempo(cuerpo, categoria):
     vec = vectorizer.transform([cuerpo + " " + categoria])
     return round(reg.predict(vec)[0], 2)

 tickets["tiempo_est"] = tickets.apply(lambda r: estimar_tiempo(r["cuerpo"], r["categoria_pred"]), axis=1)

# 6. Generación de borrador (simulada)
 def generar_borrador(categoria, tiempo):
     plantilla = (
         "Estimado usuario,\n\n"
         "Hemos recibido su solicitud clasificada como **{cat}**. "
         "Nuestro equipo estima un tiempo de resolución de **{hrs} horas**. "
         "Le mantendremos informado durante el proceso.\n\n"
         "Saludos,\nEquipo de soporte"
     )
     return plantilla.format(cat=categoria, hrs=tiempo)

 tickets["borrador"] = tickets.apply(lambda r: generar_borrador(r["categoria_pred"], r["tiempo_est"]), axis=1)
```

### Limitaciones y métricas
* **Clasificación**: precisión y matriz de confusión; la regla explícita tiene cobertura limitada pero cero falsos positivos cuando se dispara.
* **Estimación**: error absoluto medio (MAE) en horas; la regresión lineal asume relación lineal entre texto y duración, lo que puede fallar con tickets complejos.
* **Generación**: ausencia de variabilidad; la plantilla garantiza coherencia pero no adapta estilo. En entornos reales se sustituiría por un modelo de lenguaje con evaluación BLEU o mediante revisión humana.

Al integrar los tres componentes en un flujo único, el sistema permite que el agente humano revise el borrador y ajuste la estimación antes de enviar la respuesta, cerrando el ciclo de manera reproducible.

## Práctica

#### Objetivo de la práctica
Implementa una versión mínima del flujo descrito, utilizando un conjunto de datos ficticio de 30 tickets. La solución debe:
1. Aplicar la regla explícita sobre el asunto.
2. Entrenar un clasificador de categorías con `LogisticRegression` para los casos no cubiertos por la regla.
3. Entrenar una regresión lineal que estime el tiempo de resolución en horas.
4. Generar un borrador de respuesta mediante la plantilla proporcionada.

#### Pasos recomendados
1. **Crear el archivo CSV** llamado `tickets.csv` con columnas `id`, `asunto`, `cuerpo`, `categoria` y `tiempo_real`. Utiliza datos de muestra como:
   ```csv
   id,asunto,cuerpo,categoria,tiempo_real
   1,"Error 404 al cargar página","El usuario no puede acceder a la página X","software",2.5
   2,"No arranca el portátil","Al encender el equipo no aparecen luces","hardware",4.0
   ...
   ```
   Asegúrate de incluir al menos cinco ejemplos que la regla explícita detecte.
2. **Ejecutar el script** anterior, verificando que la columna `categoria_pred` contenga valores tanto de la regla como del clasificador.
3. **Calcular métricas**: usa `sklearn.metrics.accuracy_score` para la clasificación y `mean_absolute_error` para la estimación de tiempo.
4. **Revisar los borradores** generados en la columna `borrador`. Comprueba que la categoría y el tiempo estimado coincidan con los valores predichos.
5. **Documentar** los resultados en un archivo `informe.md` indicando:
   * Porcentaje de tickets resueltos exclusivamente por la regla.
   * Precisión del clasificador aprendido.
   * MAE de la estimación.
   * Comentario breve sobre la legibilidad del borrador.

#### Entregable observable
Al finalizar, el alumno debe poder ejecutar `python pipeline.py` (el script que contenga el código) y observar en la consola una tabla resumida con las métricas y ejemplos de borradores. La reproducibilidad se garantiza al usar `random_state=42` en la división de datos.

## Comprobaciones

1. ¿Cuál es la función principal de la regla explícita en el flujo?
Respuesta: Detectar categorías que aparecen de forma literal en el asunto, proporcionando una clasificación inmediata sin necesidad de modelo aprendido.
2. Si la precisión del clasificador es del 85 % y la regla cubre el 20 % de los tickets, ¿qué porcentaje total de tickets se clasifica correctamente?
Respuesta: La regla cubre 20 % con 100 % de acierto, y el clasificador cubre el 80 % restante con 85 % de acierto, lo que produce 0.20 + 0.80 × 0.85 = 0.20 + 0.68 = 0.88 o 88 % de los tickets clasificados correctamente.

## Cierre

En la siguiente lección se abordará la recuperación de información contextualizada y su combinación con modelos de generación, una estrategia conocida como Retrieval‑Augmented Generation. El alumno verá cómo conectar documentos relevantes a la petición del usuario antes de producir la respuesta final.
