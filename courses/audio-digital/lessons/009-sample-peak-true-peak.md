---
schemaVersion: 1
id: efe1053e-049d-4656-9048-00e9ba1ea014
sequence: 9
course: audio-digital
stepId: sample-peak-true-peak
title: Diferenciar sample peak y true peak
publishedAt: 2026-09-27T09:03:29.943Z
generationDate: 2026-09-27
summary: Esta lección aborda la distinción entre sample peak y true peak para
  comprender por qué el recorte puede manifestarse durante la reconstrucción
  analógica, incluso cuando los picos de las muestras digitales están por debajo
  de 0 dBFS. Se explica cómo la interpolación del DAC puede generar picos
  inter-muestra que exceden el nivel digital máximo, y se proporciona una
  metodología para identificar esta condición. El objetivo es establecer una
  decisión práctica de margen para prevenir el clipping, asegurando la
  integridad de la señal de audio.
generation:
  model: gemini-2.5-flash
  promptVersion: v3
  contextHash: 1513d08883a0e4a836cafc6756a99a81b5a7b3432b9603208ceb09412b5ed79b
---

## Por qué ahora
En la lección anterior, se estableció la importancia de aplicar un margen digital o headroom para prevenir el recorte cuando se utilizan procesamientos de señal que incrementan el nivel de audio. Sin embargo, la prevención del recorte no se limita únicamente a mantener los picos de las muestras digitales por debajo de 0 dBFS. Existe una condición en la que, a pesar de que todos los valores de las muestras individuales se encuentren dentro del rango permitido, la señal analógica reconstruida puede experimentar recorte. Esta situación, a menudo contraintuitiva, requiere una comprensión más profunda de cómo la señal digital se convierte en analógica. Esta lección abordará la causa de este fenómeno, diferenciando los conceptos de pico de muestra y pico verdadero, y proporcionará una base para establecer un margen de seguridad adicional que garantice la integridad de la señal en todas las etapas de la reproducción.

## Explicación y ejemplo
El audio digital se representa mediante una serie discreta de muestras, cada una con un valor numérico que indica la amplitud de la señal en un instante específico. El `sample peak` se refiere al valor máximo de cualquiera de estas muestras individuales dentro de una señal digital. En un sistema PCM estándar, el valor máximo que una muestra puede alcanzar sin distorsión se denomina 0 dBFS (decibelios a escala completa). Si una muestra excede este valor, se produce un recorte digital, lo que resulta en una distorsión audible y visible en el medidor de picos de cualquier software de reproducción como Roon o foobar2000.

Sin embargo, la señal de audio que finalmente escuchamos es analógica y continua. Para convertir la serie discreta de muestras digitales en una forma de onda analógica continua, el convertidor digital-analógico (DAC) realiza un proceso de reconstrucción. Este proceso implica la interpolación entre las muestras digitales para generar los puntos intermedios que no fueron registrados originalmente. Durante esta interpolación, es posible que la forma de onda analógica resultante alcance un nivel de pico que sea superior al valor máximo de cualquiera de las muestras digitales individuales que la componen. Este pico de la forma de onda analógica reconstruida se conoce como `true peak`.

Para ilustrar esto, considere una señal digital con picos de muestra que alcanzan -0.5 dBFS. A primera vista, parecería que hay un margen de 0.5 dB antes de alcanzar el recorte. Sin embargo, si esta señal contiene transitorios rápidos o formas de onda complejas que no están perfectamente alineadas con los puntos de muestreo, la interpolación del DAC puede generar un pico entre dos muestras que excede los -0.5 dBFS e incluso los 0 dBFS. Por ejemplo, si una señal digital tiene dos muestras consecutivas con valores altos, la curva de interpolación que las une puede elevarse por encima de ambos puntos de muestreo. Si este pico inter-muestra supera los 0 dBFS, el DAC intentará reproducir un nivel que está más allá de su capacidad máxima de salida, lo que resultará en un recorte analógico. Este recorte analógico es una forma de distorsión que se produce en la etapa de conversión o en el circuito de salida del DAC, y puede ser tan audible y perjudicial como el recorte digital.

La diferencia entre el `sample peak` y el `true peak` es crucial porque un medidor de picos tradicional en Roon o foobar2000 solo muestra el `sample peak`. Un medidor de `true peak` es necesario para predecir con precisión si ocurrirá un recorte durante la reconstrucción. Dado que la mayoría de los DACs no tienen un indicador de `true peak` visible para el usuario, la práctica recomendada es aplicar un margen de seguridad adicional. Este margen compensa la posible elevación del `true peak` por encima del `sample peak` y previene el recorte analógico. Un margen de al menos -1 dBFS para el `sample peak` es una práctica común y segura para evitar el recorte por `true peak` en la mayoría de las situaciones, aunque en casos de contenido con transitorios muy agresivos, podría ser necesario un margen mayor.

## Práctica
Para observar el efecto potencial del `true peak` y aplicar un margen preventivo, utilizaremos una pista de audio diseñada para generar picos inter-muestra. Aunque no podemos observar directamente el `true peak` en el DAC, podemos inferir su impacto y aplicar una solución.

1.  **Identificación de contenido con riesgo de `true peak`:** Busque una pista de audio que contenga transitorios rápidos y altos niveles de energía, como percusión o música electrónica con sonidos sintéticos agresivos. Algunas grabaciones masterizadas con un nivel muy alto pueden exhibir este comportamiento. Como alternativa, puede buscar archivos de prueba específicos diseñados para `true peak` en línea.
2.  **Reproducción sin margen:** En Roon o foobar2000, reproduzca la pista seleccionada sin aplicar ningún headroom o procesamiento de volumen digital. Observe el medidor de picos de su software. Verifique que los picos de las muestras no excedan 0 dBFS. Si su DAC tiene un indicador de recorte o sobrecarga, observe si se activa, lo que indicaría un recorte analógico a pesar de que el software no muestre recorte digital.
3.  **Aplicación de margen preventivo:** Acceda a la configuración de DSP de Roon (en la ruta de señal) o a las preferencias de DSP de foobar2000. Active un procesamiento de ganancia o volumen global y reduzca el nivel en -1 dB. Asegúrese de que esta reducción se aplique antes de cualquier otro procesamiento que pueda aumentar el nivel. En Roon, esto se haría en el DSP Engine, añadiendo un ajuste de volumen. En foobar2000, puede usar el componente "ReplayGain" o "Volume" en la cadena de DSP.
4.  **Reproducción con margen:** Reproduzca la misma pista con el margen de -1 dB aplicado. Observe nuevamente el medidor de picos en el software, que ahora debería mostrar picos máximos alrededor de -1 dBFS. Si su DAC tiene un indicador de recorte, verifique si este ya no se activa. La ausencia de activación del indicador del DAC, junto con la reducción de los picos de muestra, sugiere que el recorte por `true peak` ha sido mitigado.
5.  **Evaluación auditiva:** Realice una escucha crítica de la pista con y sin el margen aplicado. Preste atención a cualquier aspereza o distorsión en los transitorios más fuertes. Aunque la diferencia puede ser sutil, la aplicación del margen busca eliminar una fuente potencial de distorsión que podría degradar la calidad de la reproducción, especialmente en sistemas de alta resolución.

## Comprobaciones
1.  ¿Qué tipo de pico puede exceder 0 dBFS y causar recorte en la etapa analógica, incluso si las muestras digitales individuales están por debajo de 0 dBFS?
Respuesta: El true peak.
2.  ¿Cuál es un margen de seguridad comúnmente recomendado para el sample peak en el software de reproducción para prevenir el recorte por true peak?
Respuesta: Al menos -1 dBFS.

## Cierre
La distinción entre `sample peak` y `true peak` es fundamental para asegurar una reproducción de audio digital sin distorsiones. Comprender que la reconstrucción analógica puede generar picos inter-muestra que exceden el nivel digital máximo nos permite tomar medidas preventivas. La aplicación de un margen de seguridad en el software de reproducción es una estrategia efectiva para mitigar este riesgo. En la próxima lección, profundizaremos en cómo la cuantización y el dither influyen en la calidad de la señal, abordando directamente las complejidades que surgieron en etapas anteriores del curso.
