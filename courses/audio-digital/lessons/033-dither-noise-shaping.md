---
schemaVersion: 1
id: ce1b98eb-18cd-44dd-9925-025584d49922
sequence: 33
course: audio-digital
stepId: dither-noise-shaping
title: Separar dither y noise shaping
publishedAt: 2026-11-10T10:57:07.262Z
generationDate: 2026-11-07
summary: Esta lección distingue el dither del noise shaping, explicando cómo el
  dither aleatoriza el error de cuantización mientras el noise shaping
  redistribuye su energía espectral. Se analiza la evidencia visible en
  espectros de audio para comprender que el noise shaping no elimina el ruido,
  sino que lo traslada a frecuencias menos audibles. Se enfatiza la importancia
  de observar los efectos de cada técnica en la señal, utilizando ejemplos
  prácticos para diferenciar la naturaleza de la aleatorización del error de su
  manipulación espectral, preparando al alumno para la reducción de profundidad
  de…
generation:
  model: gemini-2.5-flash
  promptVersion: v3
  contextHash: 7743f11eee424061ef145dae34b2c3c5a9af938ba09c2ec5b1cb27d030560f91
---

## Por qué ahora
En lecciones anteriores, exploramos cómo el dither transforma el error de cuantización en ruido aleatorio, mitigando la distorsión armónica que de otro modo aparecería en señales de bajo nivel. Sin embargo, la distinción entre la aleatorización del error y la manipulación de su distribución espectral puede resultar confusa. Es fundamental comprender que el dither, por sí mismo, añade ruido de forma uniforme en todo el espectro audible. Existe una técnica adicional, el *noise shaping*, que modifica la distribución de este ruido. Esta lección tiene como objetivo clarificar esta diferencia, permitiendo distinguir la naturaleza del dither de la del noise shaping mediante la observación de sus efectos en el espectro de la señal. Esta comprensión es esencial para diagnosticar correctamente el comportamiento del ruido en el audio digital y para preparar procesos de reducción de profundidad de bits.

## Explicación y ejemplo
El dither es la adición de ruido de bajo nivel a una señal antes de la cuantización, con el propósito de linealizar la respuesta de un sistema digital a señales de muy baja amplitud. Su efecto principal es convertir la distorsión de cuantización, que es correlacionada con la señal y audible como armónicos o modulación, en ruido aleatorio no correlacionado. Este ruido aleatorio se distribuye de manera uniforme a lo largo de todo el espectro de frecuencias audibles. Por ejemplo, si se aplica dither a una señal de 16 bits, el ruido de dither se manifestará como un aumento generalizado del piso de ruido en todas las frecuencias, típicamente unos pocos dB por encima del ruido de cuantización inherente.

El *noise shaping*, por otro lado, es una técnica que se aplica junto con el dither. Su función no es eliminar el ruido de cuantización o de dither, sino redistribuir su energía espectral. Esto se logra mediante un filtro de retroalimentación que empuja la mayor parte de la energía del ruido hacia frecuencias donde el oído humano es menos sensible, o hacia frecuencias que están por encima del rango audible. El resultado es una reducción del ruido percibido en las frecuencias medias, donde el oído es más sensible, a expensas de un aumento del ruido en las frecuencias altas. Es crucial entender que la cantidad total de energía de ruido en la señal no disminuye; simplemente se reubica.

Consideremos un ejemplo práctico. Imagine que tenemos una señal de audio digital de 24 bits que deseamos reducir a 16 bits. Si aplicamos solo dither, el espectro de la señal resultante mostrará un piso de ruido ligeramente elevado, pero plano, en todo el rango audible. Este ruido es aleatorio y, aunque presente, es menos molesto que la distorsión de cuantización. Si, en cambio, aplicamos dither junto con noise shaping, el espectro cambiará. Observaríamos que el piso de ruido en las frecuencias bajas y medias (por ejemplo, de 20 Hz a 8 kHz) podría ser incluso más bajo que el del dither puro, dando la impresión de una señal más limpia. Sin embargo, al examinar las frecuencias más altas (por ejemplo, de 10 kHz a 20 kHz, o incluso más allá del rango audible si el muestreo lo permite), notaríamos un aumento significativo del nivel de ruido. Este pico de ruido en las altas frecuencias es la energía de ruido que ha sido "moldeada" o trasladada desde las frecuencias más sensibles del oído.

La justificación de esta técnica radica en la curva de igual sonoridad del oído humano. Somos menos sensibles a las frecuencias muy bajas y muy altas. Al trasladar el ruido a estas regiones, el noise shaping busca hacer que el ruido sea menos perceptible, mejorando la calidad subjetiva de la señal sin reducir la cantidad total de ruido. Es importante no confundir esta redistribución con una eliminación de ruido. El ruido sigue presente, pero su impacto auditivo se minimiza. Diferentes algoritmos de noise shaping tienen diferentes "curvas" de redistribución, optimizadas para distintas percepciones o aplicaciones, pero el principio subyacente es el mismo: mover la energía del ruido a donde es menos molesta.

## Práctica
Para observar estos efectos, puede utilizar una herramienta de análisis espectral. Aunque Roon y foobar2000 no ofrecen análisis espectral en tiempo real de forma nativa para este propósito, puede generar o encontrar archivos de prueba con dither y noise shaping aplicados y analizarlos con software externo. Una forma de hacerlo es la siguiente:

1.  **Obtenga archivos de prueba:** Busque en línea archivos de audio de prueba que demuestren dither y noise shaping. A menudo, estos se presentan como tonos sinusoidales de muy bajo nivel (por ejemplo, -90 dBFS) que han sido reducidos de 24 a 16 bits con diferentes tipos de dither y noise shaping. Asegúrese de que los archivos estén etiquetados claramente (por ejemplo, "tono -90dBFS 16bit dither tipo 1", "tono -90dBFS 16bit dither tipo 2 con noise shaping").
2.  **Reproduzca los archivos en foobar2000:** Cargue estos archivos en foobar2000. Aunque no verá el espectro directamente, la reproducción le permitirá confirmar que los archivos son funcionales.
3.  **Analice los espectros:** Utilice un software de análisis de audio que permita visualizar el espectro de un archivo WAV o FLAC. Existen opciones gratuitas como Audacity (con su función "Plot Spectrum") o herramientas más especializadas. Abra cada archivo de prueba en el software de análisis.
4.  **Compare los espectros:**
    *   Observe el espectro de un archivo con dither puro (sin noise shaping). Notará un piso de ruido relativamente plano en todo el rango de frecuencias.
    *   Observe el espectro de un archivo con dither y noise shaping. Identifique cómo el piso de ruido se reduce en las frecuencias medias y se eleva en las frecuencias altas. La forma de esta elevación variará según el algoritmo de noise shaping utilizado.

Al comparar estos espectros, podrá visualizar directamente cómo el noise shaping no elimina el ruido, sino que lo redistribuye, trasladando su energía a regiones espectrales específicas. Esto le permitirá distinguir la aleatorización del error (dither) de su distribución espectral (noise shaping).

## Comprobaciones
1.  ¿Cuál es el efecto principal del dither en el espectro de ruido de una señal digital?
Respuesta: El dither añade ruido aleatorio que se distribuye de manera uniforme a lo largo de todo el espectro de frecuencias audibles, elevando el piso de ruido de forma plana.
2.  ¿Cómo se manifiesta el noise shaping en un espectro de audio, en contraste con el dither puro?
Respuesta: El noise shaping redistribuye la energía del ruido, reduciéndolo en las frecuencias medias (donde el oído es más sensible) y aumentándolo en las frecuencias altas, creando un piso de ruido con una forma no plana.

## Cierre
Hemos distinguido el dither del noise shaping, comprendiendo que el primero aleatoriza el error de cuantización y el segundo redistribuye su energía espectral. La observación de espectros de audio ha permitido visualizar cómo el noise shaping traslada el ruido sin eliminarlo. Esta comprensión es fundamental para el siguiente paso, donde abordaremos la preparación de una reducción de profundidad de bits, aplicando estos conceptos de manera práctica.
