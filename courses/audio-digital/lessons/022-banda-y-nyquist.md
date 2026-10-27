---
schemaVersion: 1
id: 6a427e28-da88-4198-9777-e13be4e30da1
sequence: 22
course: audio-digital
stepId: banda-y-nyquist
title: Relacionar banda y frecuencia de muestreo
publishedAt: 2026-10-27T08:46:21.284Z
generationDate: 2026-10-27
summary: Esta lección establece la relación fundamental entre la frecuencia de
  muestreo y el ancho de banda de una señal digital, justificando el límite
  superior de frecuencia que puede ser representado. Se explican las condiciones
  del teorema de muestreo mediante ejemplos prácticos con frecuencias por debajo
  y por encima de la mitad de la frecuencia de muestreo, utilizando una
  frecuencia de muestreo de 44.1 kHz como referencia. El objetivo es comprender
  cómo la frecuencia de muestreo determina el rango de frecuencias audibles que
  pueden ser capturadas y reproducidas fielmente, sentando las bases para…
generation:
  model: gemini-2.5-flash
  promptVersion: v3
  contextHash: 8f907c9bcf66ed4ce9237ca5a2e5263960261e204928151e5c36f7c177e3f9fc
---

## Por qué ahora
En la lección anterior, "Qué representa una muestra", se estableció que una señal de audio digital se compone de una secuencia de muestras, cada una representando la amplitud de la señal en un instante específico. Esta comprensión es fundamental, pero surge una pregunta práctica: si una señal se describe mediante puntos discretos en el tiempo, ¿cómo se determina el rango de frecuencias que puede contener esa señal? Es decir, ¿existe un límite superior de frecuencia que una secuencia de muestras puede representar fielmente?

La respuesta a esta pregunta es crucial para el diagnóstico y la configuración de sistemas de audio digital. Comprender la relación entre la frecuencia de muestreo y el ancho de banda de la señal es esencial para justificar por qué ciertas frecuencias pueden ser capturadas y reproducidas, mientras que otras no. Este conocimiento permite entender las limitaciones inherentes al proceso de conversión analógico-digital y digital-analógico, y es un paso necesario para identificar problemas como el aliasing, que se abordará en la próxima etapa.

## Explicación y ejemplo
Una señal de audio analógica es continua en el tiempo, lo que significa que su amplitud puede variar en cualquier instante. Cuando esta señal se convierte a formato digital, se toman muestras a intervalos regulares. La frecuencia de muestreo (por ejemplo, 44.1 kHz) indica cuántas de estas muestras se toman por segundo. Para reconstruir la señal analógica original a partir de estas muestras, es necesario que la información de la forma de onda esté contenida de manera suficiente en los puntos discretos.

El principio fundamental que rige esta relación establece que, para representar fielmente una frecuencia específica, la frecuencia de muestreo debe ser al menos el doble de esa frecuencia. Esto significa que se necesitan un mínimo de dos muestras por cada ciclo completo de la onda para poder definir su forma. La mitad de la frecuencia de muestreo se conoce como la frecuencia de Nyquist, y representa el límite superior de frecuencia que puede ser capturada y reconstruida sin ambigüedad.

Consideremos un ejemplo práctico con una frecuencia de muestreo estándar de 44.1 kHz:

**Ejemplo 1: Representación de una onda de 10 kHz**
Si la frecuencia de muestreo es de 44.1 kHz (44100 muestras por segundo) y la señal a representar es una onda sinusoidal de 10 kHz (10000 ciclos por segundo), podemos calcular cuántas muestras se toman por cada ciclo de la onda:
Número de muestras por ciclo = Frecuencia de muestreo / Frecuencia de la señal
Número de muestras por ciclo = 44100 muestras/segundo / 10000 ciclos/segundo = 4.41 muestras por ciclo.
Dado que 4.41 es mayor que 2, la onda de 10 kHz puede ser representada fielmente. Hay suficientes puntos para definir la forma de la onda y permitir su reconstrucción precisa.

**Ejemplo 2: Representación de una onda de 20 kHz**
Para una onda sinusoidal de 20 kHz:
Número de muestras por ciclo = 44100 muestras/segundo / 20000 ciclos/segundo = 2.205 muestras por ciclo.
Nuevamente, 2.205 es mayor que 2. Esto indica que una onda de 20 kHz también puede ser representada fielmente con una frecuencia de muestreo de 44.1 kHz. Aunque el número de muestras por ciclo es menor que para 10 kHz, sigue siendo suficiente para la reconstrucción.

**Ejemplo 3: Representación de una onda a la frecuencia de Nyquist (22.05 kHz)**
La frecuencia de Nyquist para 44.1 kHz es 44.1 kHz / 2 = 22.05 kHz. Si intentamos representar una onda sinusoidal de 22.05 kHz:
Número de muestras por ciclo = 44100 muestras/segundo / 22050 ciclos/segundo = 2 muestras por ciclo.
En este caso, se toman exactamente dos muestras por ciclo. Este es el límite teórico. Aunque la reconstrucción es posible, la información sobre la fase de la onda se vuelve ambigua. Es el punto donde la representación es posible pero con las condiciones mínimas.

**Ejemplo 4: Representación de una onda por encima de la frecuencia de Nyquist (25 kHz)**
Si la señal a representar es una onda sinusoidal de 25 kHz:
Número de muestras por ciclo = 44100 muestras/segundo / 25000 ciclos/segundo = 1.764 muestras por ciclo.
Aquí, el número de muestras por ciclo es menor que 2. Esto significa que no hay suficientes muestras para definir un ciclo completo de la onda. Cuando una frecuencia excede la frecuencia de Nyquist, no puede ser representada correctamente. En lugar de ser capturada como su frecuencia original, se "dobla" o "refleja" hacia abajo en el espectro de frecuencias, apareciendo como una frecuencia diferente y no deseada. Este fenómeno es conocido como aliasing.

En resumen, la frecuencia de muestreo impone un límite superior al ancho de banda de la señal digital. Cualquier frecuencia presente en la señal analógica original que sea superior a la mitad de la frecuencia de muestreo (la frecuencia de Nyquist) no puede ser representada correctamente y causará distorsiones en la señal digital reconstruida. Este es el fundamento por el cual los sistemas de audio digital tienen un ancho de banda limitado, y por qué la elección de la frecuencia de muestreo es crítica para la fidelidad de la reproducción.

## Práctica
Para observar la relación entre la frecuencia de muestreo y el contenido de frecuencia, se propone una tarea de diagnóstico utilizando Roon o foobar2000. Aunque no se generará aliasing en esta práctica, se podrá verificar cómo el software reporta las frecuencias de muestreo de los archivos y cómo esto se relaciona con el contenido espectral esperado.

1.  **Selección de archivos de prueba**: Localice en su biblioteca de Roon o foobar2000 dos archivos de audio con diferentes frecuencias de muestreo. Por ejemplo, un archivo con 44.1 kHz y otro con 96 kHz. Si no dispone de archivos con frecuencias de muestreo variadas, puede buscar grabaciones de prueba o música en diferentes formatos de alta resolución.

2.  **Inspección en Roon**: Abra Roon y navegue hasta uno de los archivos seleccionados. Haga clic en el icono de la forma de onda o en la ruta de la señal (el punto de color junto al título de la canción durante la reproducción). En la ventana de la ruta de la señal, observe la información de la fuente. Roon mostrará la frecuencia de muestreo del archivo de origen (por ejemplo, "FLAC 44.1 kHz, 16 bit"). Preste atención a cómo esta frecuencia de muestreo se mantiene a lo largo de la ruta de la señal hasta el DAC, a menos que se aplique un procesamiento de remuestreo.

3.  **Inspección en foobar2000**: Abra foobar2000 y cargue los mismos archivos. Seleccione un archivo y haga clic derecho, luego elija "Propiedades". En la pestaña "General" o "Detalles", encontrará la frecuencia de muestreo del archivo. Durante la reproducción, la barra de estado de foobar2000 también suele mostrar la frecuencia de muestreo actual. Si utiliza componentes de visualización de espectro (como el "Spectrum Analyzer" o "Spectrogram"), observe cómo el contenido de frecuencia se extiende hasta un límite que se correlaciona con la frecuencia de Nyquist del archivo. Por ejemplo, en un archivo de 44.1 kHz, el contenido de alta frecuencia se atenuará o desaparecerá alrededor de los 22 kHz.

4.  **Comparación**: Compare la información de la frecuencia de muestreo reportada por Roon y foobar2000 para los diferentes archivos. Observe cómo un archivo con una frecuencia de muestreo más alta (por ejemplo, 96 kHz) teóricamente permite la representación de frecuencias más altas (hasta 48 kHz), mientras que un archivo de 44.1 kHz está limitado a aproximadamente 22.05 kHz. Aunque la audibilidad de estas frecuencias superiores es un tema aparte, la capacidad del sistema digital para representarlas está directamente ligada a la frecuencia de muestreo.

Esta práctica refuerza la comprensión de que la frecuencia de muestreo no es solo un número, sino un parámetro técnico que define el ancho de banda máximo de la señal digital, un factor crítico en la fidelidad de la reproducción.

## Comprobaciones
1.  ¿Cuál es la frecuencia de Nyquist para una señal muestreada a 48 kHz?
Respuesta: La frecuencia de Nyquist es la mitad de la frecuencia de muestreo, por lo tanto, 48 kHz / 2 = 24 kHz.

2.  Si una señal analógica contiene una frecuencia de 30 kHz y se muestrea a 44.1 kHz, ¿podrá esta frecuencia ser representada fielmente en el dominio digital?
Respuesta: No. La frecuencia de Nyquist para 44.1 kHz es 22.05 kHz. Dado que 30 kHz es mayor que 22.05 kHz, esta frecuencia no podrá ser representada fielmente y causará aliasing.

## Cierre
Esta lección ha establecido que la frecuencia de muestreo determina el límite superior de las frecuencias que pueden ser representadas en una señal digital. Hemos visto que se requieren al menos dos muestras por ciclo para una representación fiel, y que cualquier frecuencia por encima de la mitad de la frecuencia de muestreo no puede ser capturada correctamente.

Comprender este límite es fundamental para el diagnóstico de audio digital. En la próxima lección, profundizaremos en las consecuencias de exceder este límite, reconociendo el fenómeno del aliasing y cómo se manifiesta en la práctica.
