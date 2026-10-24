---
schemaVersion: 1
id: a01011f4-d9cb-40be-8a79-0af62a8a96e5
sequence: 19
course: audio-digital
stepId: dbfs-y-nivel-acustico
title: Separar dBFS de volumen acústico
publishedAt: 2026-10-24T07:58:44.552Z
generationDate: 2026-10-24
summary: Esta lección aborda la distinción fundamental entre el nivel de la
  señal digital, expresado en dBFS, y el volumen acústico percibido. Se explica
  cómo la cadena de reproducción, incluyendo la ganancia digital, el conversor
  digital-analógico (DAC) y el control de volumen analógico, influye en el nivel
  sonoro final. El objetivo es comprender por qué un mismo archivo digital puede
  reproducirse a volúmenes diferentes, sin inferir la presión sonora
  directamente desde los valores dBFS, y aplicar este conocimiento en Roon y
  foobar2000 para un diagnóstico preciso de la ruta de la señal.
generation:
  model: gemini-2.5-flash
  promptVersion: v3
  contextHash: 07767400a9a78713659725ffa3ec384c3ea3e597a8e25cfacf1ce2b6284934a5
---

## Por qué ahora
En las lecciones anteriores, hemos explorado la naturaleza de la señal de audio digital, su representación en decibelios y cómo se organiza en canales. Un concepto central fue la escala de decibelios de fondo de escala (dBFS), que nos permite cuantificar el nivel de la señal digital en relación con su máximo posible. Sin embargo, el nivel de la señal digital no se traduce directamente en el volumen acústico que percibimos. Es común observar que un mismo archivo de audio, con idénticos valores dBFS, puede sonar a volúmenes muy diferentes según el sistema de reproducción o incluso entre distintas configuraciones del mismo software. Esta discrepancia genera confusión y dificulta el diagnóstico de problemas de nivel. Comprender la ruta completa de la señal, desde el archivo digital hasta la salida acústica, es esencial para identificar los puntos donde se aplica ganancia o atenuación, y así explicar por qué el volumen final varía. Esta lección se enfoca en desglosar esta cadena para que podamos trazar el camino de la señal y entender las causas de estas variaciones de volumen.

## Explicación y ejemplo
El nivel de una señal digital, expresado en dBFS, representa la amplitud de los datos en el archivo. Un valor de 0 dBFS indica el nivel máximo que puede alcanzar la señal antes de la saturación digital. Sin embargo, este valor no tiene una correlación directa con la presión sonora que percibimos en el aire. Para que una señal digital se convierta en sonido audible, debe pasar por una serie de etapas que modifican su amplitud. Estas etapas incluyen la reproducción en software, la conversión digital-analógica y la amplificación analógica.

Consideremos un archivo de audio con un pico de -3 dBFS. Cuando este archivo se reproduce, el software como Roon o foobar2000 lee los datos digitales. En esta etapa, el software puede aplicar una ganancia digital. Por ejemplo, si el control de volumen digital en Roon está configurado al 50%, esto no significa que la señal analógica resultante será la mitad de la potencia. En cambio, Roon aplica una atenuación digital a los datos antes de enviarlos al conversor. Si el control de volumen digital de Roon se ajusta a un valor intermedio, por ejemplo, -10 dB, la señal digital que sale de Roon hacia el DAC tendrá sus picos en -13 dBFS (es decir, -3 dBFS del archivo original menos 10 dB de atenuación digital).

Luego, esta señal digital atenuada llega al Conversor Digital-Analógico (DAC). El DAC tiene una ganancia fija de conversión. Esto significa que, para un determinado nivel de entrada digital (por ejemplo, 0 dBFS), el DAC producirá un voltaje de salida analógico específico (por ejemplo, 2 V RMS). Si la señal digital que llega al DAC tiene un pico de -13 dBFS, el voltaje de salida analógico del DAC será proporcionalmente menor que si hubiera llegado con 0 dBFS. Por ejemplo, si 0 dBFS produce 2 V RMS, -13 dBFS producirá aproximadamente 0.44 V RMS (2 V * 10^(-13/20)). Es crucial entender que el DAC no tiene un control de volumen en el sentido de una perilla que el usuario manipula; su función es convertir los datos digitales en un voltaje analógico con una relación de ganancia preestablecida.

Finalmente, la señal analógica de bajo voltaje del DAC pasa a un preamplificador o amplificador integrado. Es en esta etapa donde se encuentra el control de volumen analógico principal. Este control ajusta la amplitud del voltaje analógico antes de que la señal llegue a los altavoces o auriculares. Si el control de volumen analógico está en una posición baja, el voltaje que llega a los altavoces será menor, resultando en un volumen acústico bajo. Si está en una posición alta, el voltaje será mayor y el volumen acústico será alto. La posición de este control es el factor más determinante en el volumen acústico final que percibimos.

Por lo tanto, el mismo archivo con picos de -3 dBFS puede sonar a volúmenes muy diferentes porque: 1) el software de reproducción aplica una ganancia digital variable, 2) el DAC tiene una ganancia de conversión fija pero la señal digital de entrada puede variar, y 3) el control de volumen analógico del amplificador ajusta el voltaje final antes de los transductores. Un valor de -3 dBFS en el archivo no nos dice nada sobre el volumen acústico sin conocer la configuración de ganancia en cada uno de estos puntos de la cadena.

## Práctica
Para observar cómo la ganancia digital y analógica afectan el volumen acústico, realizaremos una prueba con un archivo de audio conocido y su reproducción en Roon o foobar2000.

1.  Seleccione un archivo de audio que contenga una señal de prueba, como un tono senoidal de 1 kHz a -6 dBFS, o una canción con un nivel de pico conocido. Asegúrese de que el archivo no tenga metadatos de ReplayGain aplicados en el software de reproducción para esta prueba inicial. Si usa foobar2000, puede verificar esto en las propiedades del archivo. En Roon, asegúrese de que el ajuste de `Volume Leveling` esté desactivado en los ajustes de reproducción de la zona.

2.  Configure el control de volumen analógico de su amplificador o preamplificador en una posición fija y baja, que le permita escuchar el sonido sin ser excesivamente alto. Anote esta posición si su control tiene marcas o números.

3.  Reproduzca el archivo seleccionado. Observe el volumen acústico resultante. En Roon, observe el medidor de nivel en la barra de reproducción inferior. En foobar2000, puede usar el componente `VU Meter` o `Peak Meter` para visualizar el nivel de salida digital.

4.  Ahora, sin tocar el control de volumen analógico, ajuste el control de volumen digital en su software de reproducción. Si usa Roon, modifique el `Volume Control` de la zona (por ejemplo, de `Fixed Volume` a `Device Volume` o `DSP Volume` si está disponible y luego ajuste el deslizador). Si usa foobar2000, ajuste el deslizador de volumen principal. Reduzca el volumen digital en 6 dB (por ejemplo, si estaba en 0 dB, bájelo a -6 dB). Vuelva a reproducir el archivo.

5.  Observe cómo el volumen acústico ha disminuido, a pesar de que el control de volumen analógico no se ha movido. El medidor de nivel en el software también debería reflejar esta atenuación digital. Esto demuestra que la ganancia digital aplicada en el software afecta directamente el nivel de la señal que llega al DAC y, por ende, al volumen acústico final.

6.  Restaure el volumen digital a su posición original (por ejemplo, 0 dB). Ahora, sin tocar el volumen digital, ajuste el control de volumen analógico de su amplificador. Aumente el volumen analógico gradualmente. Observe cómo el volumen acústico aumenta, mientras que el medidor de nivel en el software de reproducción permanece inalterado. Esto ilustra que el control de volumen analógico actúa sobre la señal después de la conversión digital-analógica, afectando el voltaje final que llega a los altavoces.

Esta práctica le permite diferenciar claramente el impacto de la ganancia digital en el software y la ganancia analógica en el amplificador sobre el volumen acústico final, a partir de un mismo archivo digital.

## Comprobaciones
1.  ¿Qué etapa de la cadena de reproducción es la primera en convertir la señal digital en una señal analógica de voltaje?
Respuesta: El Conversor Digital-Analógico (DAC).
2.  Si un archivo de audio tiene un pico de -10 dBFS y el control de volumen digital del software está configurado en -5 dB, ¿cuál será el nivel de pico de la señal digital que llega al DAC?
Respuesta: -15 dBFS.

## Cierre
Hemos desglosado la ruta de la señal para entender cómo el nivel de un archivo digital se transforma en volumen acústico, identificando los puntos clave de ganancia digital y analógica. Esta comprensión es fundamental para el diagnóstico y la configuración de su sistema de audio. El siguiente paso es integrar este vocabulario de la señal, unificando los conceptos de nivel, ganancia y atenuación en un marco coherente para describir y analizar la ruta de audio de manera precisa.
