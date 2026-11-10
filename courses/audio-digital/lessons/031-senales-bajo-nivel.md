---
schemaVersion: 1
id: b9aa5a22-ff86-469e-9795-fab84e435bdc
sequence: 31
course: audio-digital
stepId: senales-bajo-nivel
title: Seguir una señal de nivel muy bajo
publishedAt: 2026-11-10T10:54:55.633Z
generationDate: 2026-11-05
summary: Esta lección aborda los desafíos de percibir y analizar señales de muy
  bajo nivel en audio digital. Explica cómo distinguir entre resolución
  estadística, distorsión y condiciones de escucha cuando una señal está
  fuertemente atenuada. A través de un ejemplo práctico, la lección clarifica el
  comportamiento del ruido de cuantización en amplitudes bajas y sus
  implicaciones para la audibilidad, preparando el terreno para comprender el
  dither.
generation:
  model: gemini-2.5-flash
  promptVersion: v3
  contextHash: 26b331d42f08a91605837c4cba453237c2dfa7e255e0b6f7cc21483e925eb5c9
---

## Por qué ahora
Las lecciones anteriores han explorado la representación de amplitudes con valores finitos y la relación entre bits y rango dinámico. Hemos observado que la cuantización introduce un error inherente, y que este error se comporta de manera diferente a un ruido aleatorio. Sin embargo, la naturaleza del ruido de cuantización y su impacto en señales de muy bajo nivel puede resultar confusa, especialmente al considerar su audibilidad y cómo se relaciona con el dither. Para avanzar en la comprensión de estos fenómenos, es fundamental observar de forma práctica qué sucede cuando una señal digital se atenúa hasta el punto de interactuar directamente con el piso de ruido de cuantización. Este enfoque nos permitirá razonar sobre el detalle, el ruido y la audibilidad sin recurrir a simplificaciones, sentando las bases para entender la función del dither.

## Explicación y ejemplo
Cuando una señal de audio digital se atenúa a niveles extremadamente bajos, su amplitud puede ocupar solo unos pocos de los niveles de cuantización disponibles. Consideremos una señal sinusoidal pura, como un tono de 1 kHz, que ha sido atenuada digitalmente a -96 dBFS en un sistema de 16 bits. En teoría, -96 dBFS representa el nivel del bit menos significativo (LSB) en un sistema de 16 bits. Esto significa que la señal apenas modula el valor del LSB, o incluso menos.

En este escenario, la señal no se representa con una curva suave, sino con una serie de valores discretos que saltan entre los pocos niveles de cuantización más cercanos al cero. Si la señal es muy pequeña, por ejemplo, -100 dBFS, su amplitud máxima podría ser menor que el valor de un solo LSB. En este caso, la señal digital podría alternar entre 0 y 1 (o -1), o incluso permanecer en 0 la mayor parte del tiempo, solo registrando un valor distinto de cero esporádicamente. Esto no significa que la señal original haya desaparecido, sino que su representación digital es extremadamente gruesa.

La "resolución estadística" se refiere a la capacidad de un sistema digital para representar una señal de bajo nivel a lo largo del tiempo, incluso si en cualquier instante dado la precisión es limitada. Aunque la señal instantánea pueda parecer una serie de pulsos o un valor constante, el promedio de estos valores a lo largo de un período puede reconstruir la forma de onda original. Por ejemplo, si una señal de -100 dBFS en 16 bits pasa la mayor parte del tiempo en 0 y ocasionalmente salta a 1, la frecuencia y la duración de esos saltos aún contienen información sobre la forma de onda original. Sin embargo, la señal resultante es altamente no lineal y contiene una gran cantidad de ruido de cuantización que es dependiente de la señal.

Es crucial distinguir esta situación de la distorsión armónica. La distorsión armónica añade múltiplos enteros de la frecuencia fundamental. El ruido de cuantización en señales de bajo nivel, en cambio, es un subproducto no lineal de la discretización. No es armónico y su espectro es complejo y variable, a menudo descrito como un "ruido" que modula la señal. Este ruido puede ser audible como una especie de "granulosidad" o "silbido" que sigue el contorno de la señal original, en lugar de un tono o una coloración armónica.

Las condiciones de escucha son fundamentales para percibir estas señales. Una señal a -96 dBFS o -100 dBFS está muy por debajo del nivel de la mayoría de los ruidos ambientales y del piso de ruido de los equipos analógicos. Para que esta señal sea audible, el entorno debe ser extremadamente silencioso y el sistema de reproducción debe tener un piso de ruido analógico excepcionalmente bajo. Si el ruido ambiental o el ruido del equipo analógico superan el nivel de la señal atenuada, esta simplemente se perderá en el ruido, independientemente de su representación digital.

## Práctica
Para observar el comportamiento de una señal de muy bajo nivel, utilizaremos un generador de tonos y un atenuador digital. El objetivo es escuchar y analizar una señal que se acerca al piso de ruido de cuantización.

1.  **Generación de la señal:** En foobar2000, instale el componente "foo_generator" si no lo tiene. Vaya a `File > Open new item > Generator`. Configure un tono sinusoidal de 1 kHz a -20 dBFS. Guarde este archivo como un WAV de 16 bits, 44.1 kHz. Este será nuestro archivo de referencia.
2.  **Atenuación en Roon:** Cargue el archivo WAV de 1 kHz a -20 dBFS en Roon. Vaya a `Zone Settings` para su dispositivo de reproducción. En `DSP Engine`, active `Headroom Management`. Configure el `Headroom` a -76 dB. Esto atenuará la señal de -20 dBFS a -96 dBFS (-20 dBFS - 76 dB = -96 dBFS). Asegúrese de que no haya otros efectos DSP activos que puedan alterar el nivel o la señal.
3.  **Escucha crítica:** Reproduzca el archivo atenuado. Con un volumen de reproducción muy bajo en su sistema, intente escuchar el tono. A este nivel, el tono de 1 kHz debería ser apenas audible o inaudible, dependiendo de su sistema y entorno. Si lo escucha, preste atención a su calidad: ¿suena como un tono puro o hay alguna aspereza o "granulosidad"? Aumente el volumen de su amplificador muy lentamente y con precaución, solo lo suficiente para intentar percibir la señal. Observe si el carácter del sonido cambia a medida que la señal se hace más audible. Es probable que, si lo escucha, perciba el ruido de cuantización como un componente significativo de la señal.
4.  **Comparación con foobar2000:** En foobar2000, cargue el mismo archivo de 1 kHz a -20 dBFS. Utilice el "Volume Control" (si está disponible como componente o en la barra de herramientas) o un plugin de atenuación para reducir el nivel a -96 dBFS. Realice la misma escucha crítica. Compare la experiencia auditiva entre Roon y foobar2000. Ambos deberían presentar un comportamiento similar para una señal atenuada digitalmente de esta manera.

Esta práctica le permitirá experimentar directamente cómo una señal digital de muy bajo nivel se representa y se percibe, y cómo el ruido de cuantización se vuelve prominente en estas condiciones.

## Comprobaciones
1.  ¿Qué sucede con la representación digital de una señal sinusoidal de 1 kHz cuando se atenúa a -96 dBFS en un sistema de 16 bits?
Respuesta: La señal se representa con un número muy limitado de niveles de cuantización, a menudo alternando entre 0 y 1 (o -1), lo que resulta en una forma de onda digital muy gruesa y no lineal.
2.  ¿Cómo se distingue el ruido de cuantización de bajo nivel de la distorsión armónica tradicional?
Respuesta: El ruido de cuantización de bajo nivel es un subproducto no lineal y dependiente de la señal, con un espectro complejo y no armónico, mientras que la distorsión armónica añade múltiplos enteros de la frecuencia fundamental.

## Cierre
Hemos observado cómo una señal de muy bajo nivel interactúa con los límites de la cuantización digital, revelando la naturaleza del ruido de cuantización en estas condiciones extremas. Esta comprensión es fundamental para el siguiente paso. La próxima lección abordará cómo el dither modifica este comportamiento, mejorando la representación de las señales de bajo nivel y su audibilidad.
