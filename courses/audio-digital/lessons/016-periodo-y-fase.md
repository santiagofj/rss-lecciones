---
schemaVersion: 1
id: aa478d1f-370f-413f-b1b5-36c1f79cc0b8
sequence: 16
course: audio-digital
stepId: periodo-y-fase
title: Comprender período y fase
publishedAt: 2026-10-22T08:25:09.665Z
generationDate: 2026-10-21
summary: Esta lección aborda el período y la fase de las ondas sonoras,
  conceptos fundamentales para predecir cómo interactúan las señales de audio.
  Se explica la diferencia entre desplazamiento temporal e inversión de
  polaridad, y cómo estos fenómenos pueden llevar a la cancelación de la señal
  cuando se suman dos ondas. A través de ejemplos prácticos con ondas senoidales
  y la visualización en software, se busca consolidar la comprensión de estos
  conceptos para mejorar la capacidad de diagnóstico y la interpretación de
  mediciones en la ruta de la señal de audio, utilizando Roon y foobar2000. El…
generation:
  model: gemini-2.5-flash
  promptVersion: v3
  contextHash: 29b8b4d189c6095f9429202117cb416eea6a0dccdbcc77133ce2f4d363a3d446
---

## Por qué ahora
En las lecciones anteriores, hemos establecido un método para verificar la integridad de la señal digital y hemos aprendido a distinguir la amplitud y la frecuencia como propiedades fundamentales de una onda sonora. Sin embargo, la señal de audio no es estática; se propaga en el tiempo y sus componentes interactúan entre sí. Comprender cómo el tiempo afecta la relación entre diferentes ondas es crucial para diagnosticar problemas que no se manifiestan como simples cambios de amplitud o frecuencia, sino como alteraciones más sutiles en la forma de onda o en la percepción espacial. La fase y el período son conceptos que nos permiten predecir cómo dos señales se combinan o se cancelan, lo cual es esencial para entender fenómenos como la cancelación acústica o los problemas de polaridad en la reproducción. Esta comprensión es un paso necesario antes de abordar la separación de canales y la escena estéreo, donde las relaciones temporales entre las señales son determinantes.

## Explicación y ejemplo
Una onda sonora es una variación de presión que se propaga en el tiempo. El período de una onda es el tiempo que tarda en completar un ciclo completo. Se mide en segundos y está inversamente relacionado con la frecuencia: una onda de 100 Hz tiene un período de 0.01 segundos. La fase, por otro lado, describe la posición de un punto en el ciclo de una onda en un instante dado, o la relación temporal entre dos ondas de la misma frecuencia. Se mide en grados o radianes, donde un ciclo completo equivale a 360 grados o 2π radianes.

Consideremos dos ondas senoidales idénticas, A y B, con la misma amplitud y frecuencia. Si ambas ondas comienzan su ciclo en el mismo instante, se dice que están en fase. Si las sumamos, el resultado es una onda con el doble de amplitud. Esto es una suma constructiva.

Ahora, imaginemos que la onda B se retrasa ligeramente en el tiempo respecto a la onda A. Esto significa que la onda B ha sido desplazada en el tiempo. Este desplazamiento temporal se traduce en una diferencia de fase. Por ejemplo, si la onda B se retrasa exactamente medio período (180 grados), cuando la onda A está en su pico positivo, la onda B está en su pico negativo. Si sumamos estas dos ondas, se cancelan mutuamente, resultando en silencio. Esto es una suma destructiva o cancelación.

La inversión de polaridad es un caso específico de diferencia de fase de 180 grados. No es un desplazamiento temporal continuo, sino una inversión instantánea de la forma de onda: los picos positivos se vuelven negativos y viceversa. Si una señal se invierte en polaridad y se suma a su versión original, el resultado es la cancelación total. Es importante distinguir entre un desplazamiento temporal, que puede ser cualquier fracción del período, y una inversión de polaridad, que es un desplazamiento de fase fijo de 180 grados.

Para ilustrar esto, podemos usar un generador de tonos en foobar2000. Generamos una onda senoidal de, por ejemplo, 440 Hz. Luego, generamos una segunda onda idéntica. Si reproducimos ambas simultáneamente y una de ellas tiene su polaridad invertida, el resultado audible será una reducción significativa o la cancelación completa del sonido, dependiendo de la precisión de la inversión y la ausencia de otras señales. Si en lugar de invertir la polaridad, aplicamos un retardo temporal a una de las ondas, la cancelación será parcial y dependerá del retardo específico. Un retardo de un cuarto de período (90 grados) resultará en una reducción de amplitud, pero no en una cancelación total. Un retardo de medio período (180 grados) sí resultará en cancelación, al igual que la inversión de polaridad.

En la práctica, estas diferencias de fase y polaridad pueden surgir por diversas razones: cables conectados incorrectamente, problemas en la etapa de grabación o mezcla, o incluso la interacción de las ondas sonoras con el entorno acústico de la sala de escucha. Comprender cómo se manifiestan estas diferencias es el primer paso para diagnosticarlas y corregirlas.

## Práctica
Para esta práctica, utilizaremos foobar2000 para generar y manipular señales, y Roon para observar el comportamiento de la señal en un entorno de reproducción más complejo. El objetivo es observar la cancelación de fase y la inversión de polaridad.

1.  **Generación de señales en foobar2000**: Abra foobar2000. Vaya a `File > Open audio CD...` (o `File > Open...` y seleccione un archivo de audio). Para generar tonos, puede usar un componente de foobar2000 como `Tone Generator` si lo tiene instalado, o descargar un archivo de onda senoidal de 440 Hz de una fuente confiable. Necesitará dos archivos idénticos de onda senoidal de 440 Hz.
2.  **Inversión de polaridad**: Cargue uno de los archivos de onda senoidal en una lista de reproducción. Para invertir la polaridad, puede usar un DSP de foobar2000. Vaya a `File > Preferences > Playback > DSP Manager`. En la sección `Available DSPs`, busque `Channel Mixer` o un componente similar que permita la inversión de polaridad. Si no tiene uno, puede usar un editor de audio externo para invertir la polaridad de uno de los archivos y guardarlo como un nuevo archivo. Una vez que tenga un archivo original y otro con polaridad invertida, cárguelos en la misma lista de reproducción de foobar2000.
3.  **Observación de cancelación**: Reproduzca ambos archivos simultáneamente. Si su sistema de reproducción suma las señales (por ejemplo, si ambos se reproducen en el mismo canal o si su DAC tiene una función de mezcla), debería notar una reducción significativa o la cancelación del sonido. Si no se cancelan completamente, verifique que las amplitudes sean idénticas y que la inversión de polaridad sea precisa. Observe el medidor de nivel de foobar2000: la suma de dos señales idénticas con polaridad invertida debería resultar en un nivel cercano a cero.
4.  **Desplazamiento temporal (simulado)**: Para simular un desplazamiento temporal, necesitará un editor de audio. Abra uno de los archivos de onda senoidal y aplique un retardo de, por ejemplo, 0.5 milisegundos. Guarde este archivo como una nueva versión. Ahora, reproduzca el archivo original y el archivo con retardo simultáneamente en foobar2000. Observe cómo la cancelación es parcial y el sonido resultante es diferente al de la inversión de polaridad. Experimente con diferentes retardos para notar cómo la cancelación varía.
5.  **Verificación en Roon**: Aunque Roon no tiene un generador de tonos integrado, puede reproducir los archivos de onda senoidal que ha creado. Cargue los archivos originales, invertidos y con retardo en su biblioteca de Roon. Reproduzca las combinaciones y observe el medidor de nivel en la ruta de la señal de Roon. Esto le permitirá confirmar que los conceptos de cancelación y desplazamiento se aplican de manera consistente en diferentes reproductores.

## Comprobaciones
1.  Si se suman dos ondas senoidales idénticas de 1 kHz, una con polaridad normal y la otra con polaridad invertida, ¿qué resultado se espera en términos de amplitud de la señal resultante?
Respuesta: Se espera una cancelación total, resultando en una amplitud cercana a cero.
2.  ¿Cuál es la diferencia fundamental entre un desplazamiento temporal de una señal y una inversión de polaridad?
Respuesta: Un desplazamiento temporal es un retardo o adelanto de la señal en el tiempo, que puede ser cualquier fracción del período, mientras que una inversión de polaridad es un cambio de fase fijo de 180 grados, donde los valores positivos se vuelven negativos y viceversa, sin un retardo continuo.

## Cierre
Hemos explorado cómo el período y la fase determinan la interacción de las ondas sonoras, distinguiendo entre desplazamiento temporal e inversión de polaridad y observando sus efectos en la suma de señales. Esta comprensión es fundamental para el diagnóstico de problemas en la reproducción de audio. En el siguiente paso, aplicaremos estos conceptos para entender cómo se separan los canales y cómo esto influye en la construcción de la escena estéreo.
