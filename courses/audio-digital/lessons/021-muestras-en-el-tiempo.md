---
schemaVersion: 1
id: 4b618e13-8174-4651-b38e-130718e69c8b
sequence: 21
course: audio-digital
stepId: muestras-en-el-tiempo
title: Qué representa una muestra
publishedAt: 2026-10-26T08:41:55.517Z
generationDate: 2026-10-26
summary: Esta lección aborda la naturaleza fundamental de una muestra en el
  audio digital, interpretándola como una medida de amplitud en un instante
  específico. Se construye una tabla de una onda simple para visualizar cómo una
  secuencia de muestras define una señal, distinguiendo la cantidad de muestras,
  la duración total y la frecuencia de muestreo. El objetivo es proporcionar una
  base observable para comprender la señal digital, esencial para el diagnóstico
  y la configuración precisa en Roon y foobar2000, y para clarificar conceptos
  previos sobre cuantización y dither mediante evidencia práctica.
generation:
  model: gemini-2.5-flash
  promptVersion: v3
  contextHash: fabc210d564bf6e1dd9f2787d299a5b2fbb45364ec6a410656be2534e824b008
---

## Por qué ahora
Para diagnosticar y comprender el audio digital, es fundamental entender su unidad más básica: la muestra. Las lecciones anteriores establecieron un vocabulario para describir la señal, sus niveles en decibelios y la distinción entre dBFS y el volumen acústico. Sin embargo, la señal digital se compone de una secuencia de valores discretos. Comprender qué representa cada uno de estos valores y cómo se relacionan en el tiempo es el siguiente paso para interpretar la señal de manera precisa. Esta comprensión es clave para abordar la confusión que a veces generan conceptos como la cuantización y el dither, al proporcionar una base observable y práctica de cómo se construye la información sonora en el dominio digital. Al visualizar la señal como una serie de mediciones, se facilita el diagnóstico de su integridad y características en herramientas como Roon y foobar2000.

## Explicación y ejemplo
Una muestra es un valor numérico que representa la amplitud de una señal de audio en un instante de tiempo específico. En el audio digital, la señal analógica continua se convierte en una serie de estas mediciones discretas. Cada muestra es como una "fotografía" instantánea del nivel de la onda sonora en un momento dado. La secuencia de estas muestras, tomadas a intervalos regulares, permite reconstruir la forma de onda original.

Consideremos una onda sinusoidal simple, que es una oscilación regular y predecible. Para representarla digitalmente, se toman muestras a intervalos de tiempo fijos. La cantidad de muestras tomadas por segundo se denomina frecuencia de muestreo, medida en hercios (Hz). Por ejemplo, una frecuencia de muestreo de 44100 Hz significa que se toman 44100 muestras cada segundo.

Imaginemos una onda sinusoidal de 1 Hz, lo que significa que completa un ciclo en un segundo. Si la muestreamos a 4 Hz, tomaremos 4 muestras en ese segundo. Los valores de amplitud de estas muestras podrían ser:

| Tiempo (s) | Muestra | Amplitud (arbitraria) |
| :--------- | :------ | :-------------------- |
| 0.00       | 1       | 0.0                   |
| 0.25       | 2       | 1.0                   |
| 0.50       | 3       | 0.0                   |
| 0.75       | 4       | -1.0                  |
| 1.00       | 5       | 0.0                   |

En este ejemplo simplificado, la primera muestra se toma en el instante 0.00 segundos, la segunda en 0.25 segundos, y así sucesivamente. Cada valor en la columna "Amplitud" es una medida del nivel de la onda en ese preciso instante. La duración total de este segmento de audio es de 1 segundo, y contiene 5 muestras (si contamos la muestra inicial y final que coinciden con el inicio y fin del ciclo, o 4 si consideramos las muestras dentro de un ciclo completo sin repetición). La frecuencia de muestreo es de 4 Hz, ya que se toman 4 muestras por segundo para representar la onda.

Es importante distinguir entre la cantidad total de muestras en un archivo, la duración de la reproducción y la frecuencia de muestreo. Un archivo de audio puede contener millones de muestras. La duración de la reproducción se calcula dividiendo la cantidad total de muestras por la frecuencia de muestreo. Por ejemplo, un archivo con 4410000 muestras muestreadas a 44100 Hz tendrá una duración de 100 segundos (4410000 muestras / 44100 muestras/segundo = 100 segundos).

Cada muestra, por sí misma, no tiene una duración; es un punto en el tiempo. La duración se define por el intervalo entre muestras sucesivas, que es el inverso de la frecuencia de muestreo. Para 44100 Hz, el intervalo entre muestras es aproximadamente 0.00002267 segundos (1/44100 Hz). Esta secuencia de valores discretos es lo que el conversor digital-analógico (DAC) utiliza para reconstruir la señal analógica que finalmente escuchamos.

## Práctica
Para observar la relación entre muestras, duración y frecuencia de muestreo, puede utilizar foobar2000. Aunque no muestra las muestras individuales en una tabla, permite ver la información agregada.

1.  **Seleccione un archivo de audio**: Elija un archivo de audio WAV o FLAC de su biblioteca. Es preferible un archivo con una duración conocida, por ejemplo, una pista corta de 30 segundos.
2.  **Acceda a las propiedades del archivo**: En foobar2000, haga clic derecho sobre el archivo y seleccione "Properties" (Propiedades).
3.  **Identifique la frecuencia de muestreo y la duración**: En la ventana de propiedades, busque la sección "Format" (Formato). Allí encontrará la "Sample rate" (Frecuencia de muestreo), expresada en Hz (por ejemplo, 44100 Hz o 48000 Hz), y la "Length" (Duración) de la pista en minutos y segundos.
4.  **Calcule la cantidad total de muestras**: Multiplique la frecuencia de muestreo por la duración de la pista en segundos. Por ejemplo, si la frecuencia de muestreo es 44100 Hz y la duración es 30 segundos, la cantidad total de muestras es 44100 * 30 = 1323000 muestras.
5.  **Compare con Roon (opcional)**: En Roon, seleccione el mismo archivo y acceda a la "Signal Path" (Ruta de la señal) o a la información de la pista. Roon mostrará la frecuencia de muestreo de manera similar. Aunque Roon no proporciona directamente la cantidad total de muestras, la consistencia en la frecuencia de muestreo y la duración confirma que ambos reproductores interpretan la base temporal de la señal de la misma manera.

Esta práctica le permite visualizar cómo la frecuencia de muestreo determina la cantidad de "puntos" de información que se utilizan para representar el audio en una duración específica. Es una forma de conectar los conceptos teóricos con los datos que sus reproductores de audio gestionan.

## Comprobaciones
1.  Si un archivo de audio tiene una frecuencia de muestreo de 96000 Hz y una duración de 10 segundos, ¿cuántas muestras contiene aproximadamente?
Respuesta: 960000 muestras.
2.  ¿Qué representa el valor numérico de una muestra individual?
Respuesta: La amplitud de la señal en un instante de tiempo específico.

## Cierre
Hemos establecido que una muestra es una medición de amplitud en un instante definido, y que una secuencia de estas mediciones, tomadas a una frecuencia de muestreo constante, construye la señal digital. Esta comprensión es la base para el siguiente paso, donde exploraremos cómo la frecuencia de muestreo se relaciona directamente con el rango de frecuencias que puede ser representado en el audio digital.
