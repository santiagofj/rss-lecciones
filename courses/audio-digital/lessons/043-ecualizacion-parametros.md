---
schemaVersion: 1
id: a28a558a-6056-4077-93c9-b85e607ea0f5
sequence: 43
course: audio-digital
stepId: ecualizacion-parametros
title: Leer un ecualizador paramétrico
publishedAt: 2026-11-19T13:19:26.460Z
generationDate: 2026-11-17
summary: Comprender la relación entre frecuencia, ganancia y ancho de banda en
  un ecualizador paramétrico, predecir su efecto sobre la señal y anticipar
  ajustes antes de modificarlos en Roon o foobar2000.
generation:
  model: openai/gpt-oss-120b
  promptVersion: v5
  contextHash: e0d1b69dbfed298d1f708148ef070de75b21ccb8b9cd302a01762bc4cc7029b6
---

## Por qué ahora

El ecualizador paramétrico es la herramienta más versátil para modificar la respuesta en frecuencia de una reproducción digital. Tras haber gestionado la cadena de archivos, la ganancia digital y el margen de procesamiento, el siguiente desafío práctico es interpretar cómo cada filtro afecta la señal antes de aplicar cambios. Anticipar el resultado permite evitar recortes inesperados y preservar la integridad dinámica obtenida en lecciones anteriores. Además, la capacidad de leer los parámetros facilita la comunicación con ingenieros de masterización y con la documentación de ajustes de referencia, lo que resulta útil para auditorías de calidad en entornos de escucha crítica.

## Explicación y ejemplo

### Fundamentos del filtro paramétrico
Un filtro paramétrico se describe mediante tres parámetros esenciales:

1. **Frecuencia central (f₀)** – punto de la curva donde la ganancia alcanza su valor máximo o mínimo. Determina la zona espectral que será afectada.
2. **Ganancia (G)** – variación en decibelios (dB) aplicada en f₀. Un valor positivo realza la zona, un valor negativo la atenúa.
3. **Ancho de banda (Q o ancho en octavas)** – controla la estrechez o amplitud del rango afectado alrededor de f₀. Un Q alto produce una curva estrecha; un Q bajo produce una curva ancha.

### Relación matemática básica
La respuesta en frecuencia de un filtro de segundo orden se puede expresar como:

```
|H(f)| = sqrt{ ( (f/f₀)² - 1 )² + ( (f/f₀) / Q )² }⁻¹
```

Donde **|H(f)|** es la ganancia lineal en la frecuencia *f*. Para la mayoría de los usuarios, el cálculo directo no es necesario; basta comprender que al aumentar Q la transición entre la ganancia máxima y el resto del espectro se vuelve más abrupta.

### Ejemplo concreto en foobar2000
Supongamos que el usuario escucha una pista de jazz con una resonancia perceptible alrededor de **250 Hz** que genera una ligera congestión en el medio registro. En foobar2000, el ecualizador paramétrico se abre mediante **"Equalizer (Parametric)"** en la cadena de DSP. Se crean tres filtros:

| Filtro | f₀ (Hz) | G (dB) | Q (valor) |
|--------|--------|--------|-----------|
| 1 | 250 | -2.5 | 1.4 |
| 2 | 1000 | +1.0 | 0.7 |
| 3 | 8000 | -1.5 | 1.0 |

#### Paso a paso de la interpretación
1. **Filtro 1** – La frecuencia central 250 Hz coincide con la zona problemática. La ganancia negativa de -2.5 dB reducirá la energía en esa zona, y un Q de 1.4 producirá una zona de atenuación moderadamente estrecha, evitando que se afecten frecuencias adyacentes como 200 Hz o 300 Hz.
2. **Filtro 2** – Un pico leve a 1 kHz a menudo realza la claridad de instrumentos de cuerda. Con +1 dB y Q bajo (0.7) la curva es ancha, aportando una ligera elevación sin crear resonancias.
3. **Filtro 3** – En el rango de agudos, una ligera reducción de -1.5 dB en 8 kHz controla la sibilancia sin eliminar la presencia de los platillos. Q = 1.0 da una curva de anchura media.

#### Anticipar el efecto antes de mover los perillas
Antes de activar los controles, el alumno debe predecir:
- **¿Qué ocurre con los picos de nivel en la señal?** La ganancia negativa en 250 Hz disminuirá los valores de muestra correspondientes a esa banda, lo que se reflejará en una reducción del pico RMS en esa zona. La ganancia positiva en 1 kHz incrementará ligeramente los valores de muestra, pero el aumento será pequeño y no provocará clipping, dado que la ganancia total del flujo sigue por debajo del margen de procesamiento estudiado en la lección 42.
- **¿Cómo afecta el ancho de banda al resto del espectro?** Un Q alto mantiene la atenuación concentrada, preservando la respuesta natural de frecuencias vecinas. Un Q bajo extiende la influencia, lo que puede ser útil para compensaciones amplias pero también puede introducir cambios no deseados.

### Conexión con Roon
En Roon, la cadena de DSP incluye un módulo de ecualización paramétrica accesible mediante **"DSP → Parametric EQ"**. Los parámetros se introducen de forma idéntica: frecuencia, ganancia y Q. La visualización de la curva en tiempo real permite comparar la forma de onda antes y después del ajuste. La práctica recomendada es habilitar la vista de espectro (por ejemplo, mediante la extensión *Roon Remote* con visualizador de espectro) y observar cómo la energía en 250 Hz disminuye al aplicar el filtro 1.

### Resumen de la lógica de lectura
1. Identificar la frecuencia de interés a partir del problema audible o de la medición de espectro.
2. Determinar la dirección de la corrección (ganancia positiva o negativa).
3. Seleccionar un Q que mantenga la intervención lo suficientemente focalizada para evitar colisiones con otras bandas críticas.
4. Prever el impacto en los niveles de pico y en la distribución de energía antes de confirmar el ajuste.

Esta metodología permite al alumno actuar de manera informada, alineando la teoría con la práctica en los dos entornos de reproducción principales.

## Práctica

### Tarea práctica
1. **Preparar la pista**
   - Seleccione una pista de su biblioteca que contenga una zona problemática perceptible (por ejemplo, congestión en graves, falta de claridad en medios o sibilancia en agudos). Abra la pista en foobar2000 y en Roon simultáneamente, de modo que pueda comparar visualizaciones.
2. **Analizar el espectro**
   - En foobar2000 active el visualizador de espectro ("Spectrum Analyzer") y observe las áreas con mayor energía. Anote la frecuencia central aproximada donde percibe la anomalía.
   - En Roon active el visualizador de espectro integrado y registre la misma información.
3. **Configurar tres filtros**
   - Cree tres filtros paramétricos siguiendo la tabla del ejemplo, adaptando la frecuencia central a la anomalía detectada. Mantenga la ganancia entre -3 dB y +2 dB y el Q entre 0.7 y 1.5.
   - Documente los valores elegidos y la justificación breve ("Reducir congestión en 230 Hz con Q 1.4 porque la zona problemática es estrecha").
4. **Predecir el resultado**
   - Antes de activar los filtros, escriba en un cuaderno la predicción de cómo cambiará el nivel RMS en la banda seleccionada y si el pico máximo de la señal se mantendrá por debajo del margen de procesamiento (por ejemplo, -0.5 dBFS).
5. **Aplicar y observar**
   - Active los filtros y reproduzca la pista. Observe la curva de espectro y el medidor de nivel.
   - Compare la medición real con la predicción. Anote diferencias y posibles causas (por ejemplo, interacción con otros filtros o con la forma de la señal original).
6. **Iterar con una variación**
   - Modifique el Q de uno de los filtros (pase de 1.4 a 0.9) sin cambiar la ganancia ni la frecuencia. Repita la observación y registre cómo la amplitud de la zona afectada se extiende o contrae.
7. **Informe breve**
   - Redacte un informe de 150‑200 palabras que incluya: frecuencia objetivo, ganancia, Q, predicción, resultado medido y conclusión sobre la precisión de la lectura inicial.

Esta práctica consolida la capacidad de leer, predecir y validar ajustes paramétricos en los dos entornos de reproducción, reforzando la comprensión adquirida en lecciones previas sobre ganancia digital y margen de procesamiento.

## Comprobaciones

1. ¿Cuál es el efecto principal de aumentar el valor de Q en un filtro paramétrico?
Respuesta: Aumentar Q estrecha la anchura del filtro, concentrando la ganancia o atenuación en una banda más reducida alrededor de la frecuencia central.
2. Si un filtro paramétrico tiene una ganancia de -2 dB en 250 Hz y Q = 1.4, ¿qué ocurre con el nivel RMS de la señal en esa zona?
Respuesta: El nivel RMS en la banda alrededor de 250 Hz disminuye aproximadamente 2 dB, siempre que el ancho de banda definido por Q no incluya frecuencias fuera de esa zona, lo que reduce la energía perceptible en los graves sin afectar significativamente otras bandas.

## Cierre

La lectura precisa de los parámetros permite anticipar la respuesta del ecualizador y evitar ajustes que comprometan el margen de procesamiento. En la próxima lección se profundizará la relación entre la forma del filtro y la respuesta total de la cadena, mostrando cómo combinar varios filtros para lograr una curva deseada sin provocar sobrecargas ni artefactos.
