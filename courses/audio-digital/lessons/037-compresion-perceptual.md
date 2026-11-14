---
schemaVersion: 1
id: 5fa6ff13-3996-40a7-81e3-0b36aca38df6
sequence: 37
course: audio-digital
stepId: compresion-perceptual
title: Cómo funciona la compresión con pérdidas
publishedAt: 2026-11-14T09:59:12.672Z
generationDate: 2026-11-11
summary: Explicación de la compresión con pérdidas en audio digital, detallando
  cómo los códecs como MP3 o AAC descartan información perceptual para reducir
  el tamaño del archivo. Se aborda la relación entre el bitrate, las decisiones
  algorítmicas y la naturaleza irreversible de este proceso. La lección compara
  codificaciones del mismo máster para ilustrar el descarte de datos y explica
  por qué la transcodificación entre formatos con pérdidas no restaura la
  información original, consolidando la comprensión de la naturaleza de los
  archivos comprimidos y sus implicaciones prácticas en la reproducción y…
generation:
  model: gemini-2.5-flash
  promptVersion: v3
  contextHash: c9ab65afed85ccf33d7442702052c5cd264e0f8a268070f6a487057f1b017a95
---

## Por qué ahora
En lecciones anteriores, hemos distinguido las muestras de audio digital, el códec que las representa y el contenedor que las organiza. También hemos examinado cómo los códecs de compresión sin pérdidas, como FLAC o ALAC, preservan la integridad de cada muestra original. Ahora, es necesario comprender el funcionamiento de la compresión con pérdidas, un método que reduce significativamente el tamaño de los archivos a expensas de la información original. Esta comprensión es fundamental para diagnosticar problemas de calidad, tomar decisiones informadas sobre el almacenamiento y la distribución de audio, y entender las limitaciones inherentes a estos formatos. El objetivo es relacionar el bitrate con las decisiones perceptuales del algoritmo y el descarte irreversible de datos, proporcionando una base práctica para la gestión de archivos de audio digital.

## Explicación y ejemplo
La compresión con pérdidas, utilizada en formatos como MP3 o AAC, opera bajo un principio diferente al de la compresión sin pérdidas. En lugar de preservar cada bit de información, estos códecs están diseñados para descartar datos que, según un modelo psicoacústico, son menos propensos a ser percibidos por el oído humano. Este proceso es irreversible: la información descartada no puede recuperarse.

El funcionamiento general implica varios pasos. Primero, el audio digital se analiza en el dominio de la frecuencia y el tiempo. El códec identifica componentes de la señal que pueden ser enmascarados por otros sonidos más fuertes o que están fuera del rango de audición humano. Por ejemplo, un tono de baja amplitud que ocurre simultáneamente con un tono de alta amplitud en una frecuencia cercana puede ser enmascarado. De manera similar, sonidos muy suaves que preceden o siguen a un sonido fuerte pueden ser enmascarados temporalmente. Una vez identificados estos componentes, el códec los descarta o los representa con una precisión mucho menor, utilizando menos bits.

El *bitrate* es un parámetro clave en la compresión con pérdidas. Se mide en kilobits por segundo (kbps) y representa la cantidad de datos que se utilizan para codificar un segundo de audio. Un bitrate más alto significa que el códec descarta menos información o la representa con mayor precisión, resultando en un archivo más grande y, potencialmente, una mayor fidelidad percibida. Por el contrario, un bitrate más bajo implica un descarte más agresivo de datos, un archivo más pequeño y una mayor probabilidad de que los artefactos de compresión sean audibles. Por ejemplo, un archivo MP3 codificado a 320 kbps retiene más información que uno codificado a 128 kbps del mismo máster.

Consideremos un ejemplo práctico. Si tenemos un archivo WAV original (sin pérdidas) de una pista musical, podemos codificarlo en dos versiones MP3: una a 320 kbps y otra a 128 kbps. Ambas versiones MP3 serán significativamente más pequeñas que el WAV original. La versión de 320 kbps será más grande que la de 128 kbps. Al decodificar cualquiera de estos MP3, el reproductor reconstruye una señal de audio, pero esta señal no es idéntica al WAV original. La información que el códec decidió descartar durante la codificación inicial simplemente no existe en el archivo MP3.

La irreversibilidad de este proceso tiene una implicación crucial: la transcodificación. Si tomamos el MP3 de 128 kbps y lo convertimos a un MP3 de 320 kbps, o incluso a un formato sin pérdidas como FLAC o WAV, la información descartada durante la codificación inicial a 128 kbps no se recupera. El nuevo archivo de 320 kbps o FLAC será más grande, pero contendrá la misma información degradada que el MP3 de 128 kbps, sin restaurar la calidad del máster original. Es decir, la transcodificación de un formato con pérdidas a otro formato con pérdidas, o a uno sin pérdidas, no mejora la calidad de audio más allá de lo que ya estaba presente en el archivo de origen con pérdidas. Solo se está recodificando una versión ya reducida de la señal, y en el caso de transcodificar entre formatos con pérdidas, se puede incluso introducir una segunda capa de descarte de información, degradando aún más la señal.

## Práctica
Para observar el efecto de la compresión con pérdidas, se realizará una comparación de archivos y una escucha crítica. Necesitará un archivo de audio de referencia en formato sin pérdidas (por ejemplo, FLAC o WAV) y dos versiones del mismo archivo codificadas con pérdidas a diferentes bitrates (por ejemplo, MP3 a 320 kbps y MP3 a 128 kbps). Puede crear estas versiones utilizando una herramienta de conversión de audio, asegurándose de que todas provengan del mismo máster original.

1.  **Preparación de archivos**: Seleccione una pista musical de su biblioteca. Utilice una herramienta como foobar2000 para convertir el archivo original (si es FLAC o WAV) a dos versiones MP3: una a 320 kbps y otra a 128 kbps. Si su archivo original ya es MP3, busque una versión sin pérdidas del mismo máster para usar como referencia. Asegúrese de que los nombres de los archivos permitan identificar claramente el formato y el bitrate (por ejemplo, `Pista_Original.flac`, `Pista_MP3_320.mp3`, `Pista_MP3_128.mp3`).

2.  **Análisis de tamaño**: Compare el tamaño en disco de los tres archivos. Observe cómo el tamaño se reduce drásticamente con la compresión con pérdidas y cómo el bitrate influye en el tamaño final del archivo MP3.

3.  **Escucha crítica**: Utilice Roon o foobar2000 para reproducir los tres archivos en secuencia. Preste atención a las diferencias sutiles en la calidad del sonido. Concéntrese en pasajes complejos, como secciones con muchos instrumentos, percusión de alta frecuencia o reverberaciones. Intente identificar si hay una pérdida de detalle, una alteración en la espacialidad o la aparición de artefactos audibles, especialmente al comparar el archivo sin pérdidas con el MP3 de 128 kbps. Repita la escucha varias veces, alternando entre los archivos para facilitar la detección de diferencias.

4.  **Transcodificación y verificación**: Tome el archivo MP3 de 128 kbps y transcodifíquelo a un formato sin pérdidas, como FLAC o WAV. Nombre este nuevo archivo de manera distintiva (por ejemplo, `Pista_MP3_128_a_FLAC.flac`). Compare el tamaño de este archivo con el FLAC original. Luego, escuche este archivo transcodificado y compárelo con el MP3 de 128 kbps original y con el FLAC máster. Observe que, aunque el archivo transcodificado a FLAC es mucho más grande que el MP3 de 128 kbps, su calidad de audio no mejora y sigue siendo equivalente a la del MP3 de 128 kbps, no a la del FLAC máster.

## Comprobaciones
1.  ¿Qué sucede con la información descartada por un códec de compresión con pérdidas cuando se transcodifica el archivo resultante a un formato sin pérdidas?
Respuesta: La información descartada no se recupera; el archivo transcodificado a un formato sin pérdidas contendrá la misma información reducida que el archivo original con pérdidas, pero ocupará más espacio.
2.  Si se tiene un archivo MP3 a 128 kbps y otro MP3 a 320 kbps, ambos codificados del mismo máster, ¿cuál de ellos es probable que contenga más información original y por qué?
Respuesta: El MP3 a 320 kbps es probable que contenga más información original porque un bitrate más alto implica un descarte menos agresivo de datos por parte del códec.

## Cierre
Hemos explorado cómo la compresión con pérdidas reduce el tamaño de los archivos descartando información de forma irreversible, basándose en modelos perceptuales. La relación entre el bitrate y la cantidad de datos retenidos es directa, y la transcodificación no puede restaurar la información ya eliminada. Esta comprensión es esencial para el siguiente paso, donde distinguiremos el máster de un formato de distribución y cómo estas decisiones afectan la cadena de audio.
