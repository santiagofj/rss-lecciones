---
schemaVersion: 1
id: c6d1070e-1b11-42f2-99b2-6605a12c5163
sequence: 15
course: audio-digital
stepId: amplitud-y-frecuencia
title: Leer amplitud y frecuencia
publishedAt: 2026-10-20T17:09:14.583Z
generationDate: 2026-10-20
summary: Esta lección aborda la distinción fundamental entre amplitud y
  frecuencia en el audio digital. Se explica cómo cada una de estas propiedades
  de una onda sonora se relaciona con el nivel percibido y la altura tonal,
  respectivamente. A través de ejemplos prácticos y la visualización de ondas
  senoidales, se busca consolidar la comprensión de estos conceptos para mejorar
  la capacidad de diagnóstico y la interpretación de mediciones en la ruta de la
  señal de audio, utilizando Roon y foobar2000.
generation:
  model: gemini-2.5-flash
  promptVersion: v3
  contextHash: 48a46db173c14dbdd54b41d041ffbad2eabc9d4fd56413002523d29934e4c349
---

## Por qué ahora
Las lecciones anteriores se enfocaron en establecer una metodología para diagnosticar la ruta de la señal de audio digital, asegurando la integridad bit-perfect. Esto implicó identificar si una alteración estaba ocurriendo y dónde. Sin embargo, una vez que se detecta una alteración, es fundamental poder describir con precisión qué aspecto de la señal ha cambiado. La confusión entre la "fuerza" o "volumen" de una señal y su "altura" o "tono" es un obstáculo común en el diagnóstico y la comprensión del audio digital.

Esta etapa del curso tiene como objetivo proporcionar las herramientas conceptuales para diferenciar y cuantificar estas dos propiedades esenciales de cualquier onda sonora: la amplitud y la frecuencia. Comprender cómo se representan y cómo interactúan es crucial para interpretar mediciones, diagnosticar problemas de procesamiento y, en última instancia, evaluar la calidad de la reproducción. Al retomar un caso de diagnóstico, aplicaremos esta distinción para describir con exactitud las características de las señales involucradas, sentando las bases para un análisis más profundo de la señal de audio.

## Explicación y ejemplo
Una onda sonora es una variación de presión en un medio, como el aire. En el dominio digital, esta variación se representa mediante una secuencia de números. Para comprender estas representaciones, es necesario distinguir dos de sus propiedades fundamentales: la amplitud y la frecuencia.

La **amplitud** de una onda se refiere a la magnitud de su desplazamiento desde el punto de equilibrio. En el contexto del audio, la amplitud está directamente relacionada con el "nivel" o "volumen" percibido de un sonido. Una onda con mayor amplitud se percibe como más fuerte, mientras que una con menor amplitud se percibe como más suave. En el audio digital, la amplitud se expresa comúnmente en decibelios de escala completa (dBFS), donde 0 dBFS representa el nivel máximo posible antes del recorte digital. Por ejemplo, una señal con un pico de -6 dBFS tiene el doble de amplitud que una señal con un pico de -12 dBFS, lo que se traduce en una percepción de mayor volumen.

Consideremos dos ondas senoidales puras, que son las formas de onda más simples y fundamentales. Si generamos una onda senoidal a 1 kHz con una amplitud de -6 dBFS y otra onda senoidal a 1 kHz con una amplitud de -12 dBFS, ambas tendrán la misma altura tonal, pero la primera sonará notablemente más fuerte. Visualmente, en un gráfico de amplitud contra tiempo, la onda de -6 dBFS se extenderá más verticalmente desde el eje central que la onda de -12 dBFS.

La **frecuencia**, por otro lado, describe cuántas veces se repite un ciclo completo de la onda en un segundo. Se mide en Hertz (Hz). La frecuencia está directamente relacionada con la "altura" o "tono" percibido de un sonido. Una onda con mayor frecuencia se percibe como más aguda, mientras que una con menor frecuencia se percibe como más grave. Por ejemplo, la nota musical La central (A4) tiene una frecuencia de 440 Hz, mientras que la nota La una octava más alta (A5) tiene una frecuencia de 880 Hz.

Si generamos una onda senoidal a 440 Hz con una amplitud de -6 dBFS y otra onda senoidal a 880 Hz con la misma amplitud de -6 dBFS, ambas sonarán con el mismo volumen percibido. Sin embargo, la onda de 880 Hz sonará más aguda que la de 440 Hz. Visualmente, en un gráfico de amplitud contra tiempo, la onda de 880 Hz mostrará el doble de ciclos completos en el mismo intervalo de tiempo que la onda de 440 Hz, mientras que su extensión vertical (amplitud) será idéntica.

Es crucial entender que la amplitud y la frecuencia son propiedades independientes. Una onda puede tener una amplitud alta y una frecuencia baja (un sonido grave y fuerte), o una amplitud baja y una frecuencia alta (un sonido agudo y suave), o cualquier combinación intermedia. No deben confundirse ni interpretarse como sinónimos. La amplitud describe la "fuerza" o "energía" de la onda, mientras que la frecuencia describe su "velocidad de oscilación" o "tono". Esta distinción es fundamental para interpretar correctamente las mediciones y diagnosticar alteraciones en la señal de audio.

## Práctica
Para esta práctica, utilizaremos foobar2000 para generar y visualizar ondas senoidales, lo que permitirá observar directamente la relación entre amplitud, frecuencia y su representación gráfica.

1.  **Generar una onda senoidal de referencia**: Abra foobar2000. Vaya a `File` > `Open audio CD...` (o `Open...` si tiene un archivo de prueba). Si no tiene un generador de tonos, puede descargar un archivo WAV de una onda senoidal de 1 kHz a -6 dBFS. Muchos sitios web de pruebas de audio ofrecen estos archivos. Alternativamente, puede instalar el componente "foo_generator" (si está disponible para su versión de foobar2000) para generar tonos directamente. Si usa un archivo, asegúrese de que sea de 1 kHz a -6 dBFS.
2.  **Visualizar la onda de referencia**: Reproduzca el archivo de 1 kHz a -6 dBFS. En foobar2000, vaya a `View` > `Visualizations` y seleccione un analizador de espectro (por ejemplo, "Spectrum Analyzer" o "Oscilloscope"). Observe la representación gráfica. En el analizador de espectro, verá un pico claro en 1 kHz. En el osciloscopio, verá una onda senoidal estable. Registre mentalmente o anote la altura del pico en el espectro y la extensión vertical de la onda en el osciloscopio.
3.  **Comparar amplitudes**: Obtenga o genere una segunda onda senoidal de 1 kHz, pero esta vez con una amplitud de -12 dBFS. Reproduzca esta nueva onda y observe su visualización en el analizador de espectro y el osciloscopio. Compare el pico en 1 kHz con el de la onda de -6 dBFS. Observe cómo la extensión vertical de la onda en el osciloscopio es menor. Ambas ondas tienen la misma frecuencia (1 kHz), pero difieren en amplitud. Esto demuestra cómo la amplitud afecta el nivel sin cambiar el tono.
4.  **Comparar frecuencias**: Ahora, obtenga o genere una tercera onda senoidal, por ejemplo, a 2 kHz con una amplitud de -6 dBFS. Reproduzca esta onda y observe su visualización. Compare el pico en el analizador de espectro: ahora estará en 2 kHz, el doble de la frecuencia original. En el osciloscopio, la onda se repetirá el doble de veces en el mismo intervalo de tiempo, pero su extensión vertical (amplitud) será la misma que la primera onda de 1 kHz a -6 dBFS. Esto demuestra cómo la frecuencia afecta el tono sin cambiar el nivel.
5.  **Síntesis**: Repita los pasos 3 y 4 con diferentes combinaciones de amplitud y frecuencia (por ejemplo, 440 Hz a -9 dBFS, 880 Hz a -9 dBFS). El objetivo es observar consistentemente cómo un cambio en la amplitud solo modifica la "altura" del gráfico (nivel), mientras que un cambio en la frecuencia solo modifica la "densidad" de los ciclos (tono), sin que una propiedad afecte directamente a la otra en su representación fundamental.

## Comprobaciones
1.  Si se observa una onda senoidal en un osciloscopio y se duplica su frecuencia manteniendo la amplitud constante, ¿qué cambio se apreciará en la representación visual?
Respuesta: La onda se repetirá el doble de veces en el mismo intervalo de tiempo, apareciendo más "comprimida" horizontalmente, pero su extensión vertical (altura) permanecerá igual.
2.  Si se reduce la amplitud de una onda senoidal a la mitad manteniendo su frecuencia constante, ¿cómo se manifestará este cambio en un analizador de espectro?
Respuesta: El pico correspondiente a la frecuencia de la onda se mantendrá en la misma posición horizontal (misma frecuencia), pero su altura vertical (nivel) disminuirá en aproximadamente 6 dB.

## Cierre
Hemos establecido la distinción entre amplitud y frecuencia, dos propiedades fundamentales de las ondas sonoras. Esta comprensión es esencial para describir con precisión las características de una señal de audio. En el siguiente paso, profundizaremos en cómo estas ondas se desarrollan en el tiempo, introduciendo los conceptos de período y fase, que son cruciales para entender la interacción entre múltiples señales y la coherencia temporal.
