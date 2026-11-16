---
schemaVersion: 1
id: 9276d2f9-1987-4303-8e83-87e669ac277a
sequence: 39
course: audio-digital
stepId: dsd-frente-pcm
title: Situar DSD y PCM
publishedAt: 2026-11-16T10:47:58.637Z
generationDate: 2026-11-13
summary: Esta lección describe las diferencias fundamentales entre las
  representaciones de audio digital PCM y DSD, enfocándose en cómo cada formato
  codifica la señal y las implicaciones prácticas para su procesamiento y
  reproducción. Se explora cómo Roon y foobar2000 gestionan estas rutas de
  señal, incluyendo conversiones y filtrado, para comprender las
  transformaciones que ocurren antes de la conversión digital-analógica. El
  objetivo es desmitificar las jerarquías automáticas y proporcionar una base
  para el diagnóstico práctico.
generation:
  model: gemini-2.5-flash
  promptVersion: v3
  contextHash: 90309cb1978da88edbf69ba333c6b0efc376938a94800f1db968719a30fdfe7c
---

## Por qué ahora
Las lecciones anteriores han explorado la naturaleza de los archivos de audio digital, desde la preservación de datos en códecs sin pérdidas hasta el descarte de información en la compresión con pérdidas, y la distinción entre máster y formato de distribución. Sin embargo, la comprensión de la cuantización y el dither ha presentado desafíos, y la diversidad de formatos como DSD y PCM a menudo genera confusión sobre su funcionamiento y supuestas ventajas. Para avanzar en el diagnóstico práctico y la comprensión de la señal, es fundamental situar DSD y PCM en un contexto técnico claro, observando cómo se representan y procesan las señales en cada caso. Esto permitirá comprender las rutas de reproducción y las transformaciones que ocurren, sin atribuir automáticamente una superioridad a un formato sobre otro. El enfoque se centrará en la evidencia visible en el software de reproducción.

## Explicación y ejemplo
El audio digital se representa principalmente de dos maneras: Modulación por Código de Pulsos (PCM) y Direct Stream Digital (DSD). Ambos son métodos para codificar una señal analógica en un formato digital, pero difieren fundamentalmente en su aproximación.

PCM es el formato más común y se basa en la toma de muestras discretas de la amplitud de la señal analógica a intervalos regulares. Cada muestra se cuantifica, es decir, se le asigna un valor numérico de un conjunto finito de posibilidades, determinado por la profundidad de bits. Por ejemplo, un archivo PCM de 44.1 kHz/16 bits toma 44.100 muestras por segundo, y cada muestra puede tener uno de 65.536 valores posibles. La señal se reconstruye a partir de estos puntos discretos. La mayoría de las operaciones de procesamiento de señal digital (DSP), como el control de volumen, la ecualización o la mezcla, están diseñadas para trabajar directamente con datos PCM.

DSD, por otro lado, utiliza una técnica llamada Modulación por Densidad de Pulsos (PDM). En lugar de registrar la amplitud de la señal en cada instante, DSD representa la amplitud mediante la densidad de pulsos de un solo bit. Una mayor densidad de pulsos indica una amplitud más alta, mientras que una menor densidad indica una amplitud más baja. Esto se logra con una tasa de muestreo extremadamente alta (por ejemplo, DSD64 muestrea a 2.822.400 Hz, 64 veces la tasa de CD), pero con una profundidad de un solo bit. La ventaja de esta aproximación es que el proceso de conversión digital-analógica puede ser más simple, ya que el flujo de bits de DSD se parece más a una señal analógica modulada. Sin embargo, el procesamiento de DSD es más complejo. Para aplicar la mayoría de las funciones DSP (como volumen o ecualización), un flujo DSD debe convertirse primero a PCM, procesarse, y luego, si se desea mantener el formato DSD hasta el DAC, reconvertirse a DSD. Esta conversión DSD a PCM implica una decimation y un filtrado, mientras que la conversión PCM a DSD implica un sobremuestreo y un noise shaping.

Consideremos dos rutas de reproducción en Roon o foobar2000:

**Ruta 1: Fuente PCM (por ejemplo, FLAC 44.1 kHz/16 bits)**
Cuando se reproduce un archivo FLAC PCM, el software lo decodifica a un flujo PCM. Si no se aplica ningún DSP (como ajuste de volumen, ecualización, o remuestreo), este flujo PCM se envía directamente al DAC. El DAC recibe los datos PCM y realiza la conversión digital-analógica. En Roon, la ruta de señal mostrará `Source (FLAC) -> PCM (44.1 kHz, 16 bit) -> DAC (PCM)`. Si se activa el control de volumen de Roon, la ruta podría mostrar `Source (FLAC) -> PCM (44.1 kHz, 16 bit) -> Volume Leveling (DSP) -> PCM (44.1 kHz, 16 bit) -> DAC (PCM)`. El procesamiento se realiza de forma nativa en el dominio PCM.

**Ruta 2: Fuente DSD (por ejemplo, DSD64)**
Cuando se reproduce un archivo DSD, el comportamiento depende de la configuración del software y del DAC. Si el DAC es compatible con DSD nativo y el software está configurado para enviarlo así (por ejemplo, a través de ASIO o WASAPI en modo DSD), la ruta de señal en Roon podría ser `Source (DSD64) -> DSD (2.8 MHz, 1 bit) -> DAC (DSD)`. En este caso, el DAC recibe el flujo DSD directamente y lo convierte a analógico. Sin embargo, si se aplica cualquier DSP en Roon (como el control de volumen o la ecualización), o si el DAC no soporta DSD nativo, Roon convertirá el DSD a PCM antes de aplicar el DSP. La ruta podría mostrar `Source (DSD64) -> DSD to PCM Conversion (DSP) -> PCM (por ejemplo, 352.8 kHz, 24 bit) -> Volume Leveling (DSP) -> PCM (352.8 kHz, 24 bit) -> DAC (PCM)`. Aquí, el DSD se convierte a PCM de alta resolución para el procesamiento, y el DAC recibe una señal PCM. Es importante observar que el filtrado es una parte inherente de la reproducción de DSD, ya sea realizado por el DAC en modo nativo o como parte de la conversión DSD a PCM.

Estas rutas demuestran que la elección del formato no es el único factor; las operaciones de procesamiento y las capacidades del hardware influyen significativamente en la señal final que llega al DAC. La visibilidad de estas etapas en el software es clave para comprender lo que realmente sucede con la señal de audio.

## Práctica
Esta práctica se centrará en observar las rutas de señal en Roon y foobar2000 para comprender cómo se gestionan los formatos PCM y DSD y las implicaciones del procesamiento.

1.  **Reproducción PCM sin DSP**: En Roon, seleccione un archivo FLAC de resolución estándar (por ejemplo, 44.1 kHz/16 bits). Asegúrese de que no haya DSP activo en la zona de reproducción (desactive el control de volumen de Roon, ecualizadores, etc.). Reproduzca la pista y observe la ruta de señal haciendo clic en el icono de punto luminoso junto al nombre de la zona. Anote los pasos que muestra Roon, desde la fuente hasta el DAC. Repita el proceso en foobar2000, observando la información en la barra de estado o en las propiedades de la pista durante la reproducción. Verifique que la señal llega al DAC en su formato PCM original.

2.  **Reproducción PCM con DSP**: En Roon, con el mismo archivo FLAC, active el control de volumen de Roon (no el del sistema operativo ni el del DAC) o un ecualizador básico. Reproduzca la pista y observe nuevamente la ruta de señal. Identifique dónde Roon inserta el paso de DSP y cómo esto afecta la resolución o el formato intermedio, si lo hace. Note que para PCM, el procesamiento suele ocurrir en el mismo dominio PCM.

3.  **Reproducción DSD nativo (si es posible)**: Si su DAC es compatible con DSD nativo y tiene archivos DSD (por ejemplo, DSD64), configure Roon para enviar DSD directamente al DAC. En la configuración de la zona de audio en Roon, vaya a `Device Setup` y asegúrese de que `DSD Playback Strategy` esté configurado en `Native` o `DoP` (DSD over PCM) según la compatibilidad de su DAC. Desactive cualquier DSP. Reproduzca una pista DSD y observe la ruta de señal. Debería ver `Source (DSD) -> DSD (tasa, 1 bit) -> DAC (DSD)`. Si su DAC no soporta DSD nativo, Roon convertirá automáticamente a PCM; observe esa ruta.

4.  **Reproducción DSD con DSP**: Con un archivo DSD, active el control de volumen de Roon o un ecualizador. Reproduzca la pista DSD y observe la ruta de señal. Notará que Roon inserta un paso de `DSD to PCM Conversion` antes de aplicar el DSP. La señal se procesa en PCM y luego se envía al DAC como PCM. Esto ilustra cómo la mayoría de las operaciones DSP requieren una conversión a PCM para los flujos DSD.

Esta práctica le permitirá visualizar las transformaciones de la señal y comprender que el formato final que llega al DAC puede no ser el mismo que el formato del archivo original, especialmente cuando se aplica procesamiento.

## Comprobaciones
1.  ¿Qué sucede con un flujo DSD en Roon si se activa el control de volumen o un ecualizador?
Respuesta: El flujo DSD se convierte a PCM antes de que se aplique el procesamiento DSP, y luego se envía al DAC como PCM.
2.  ¿Cuál es la diferencia fundamental en la representación de la amplitud entre PCM y DSD?
Respuesta: PCM representa la amplitud mediante valores discretos muestreados a intervalos regulares, mientras que DSD la representa mediante la densidad de pulsos de un solo bit a una tasa de muestreo muy alta.

## Cierre
Esta lección ha establecido las bases para comprender las diferencias técnicas entre DSD y PCM y cómo estas se manifiestan en las rutas de reproducción. Hemos observado que el procesamiento de la señal puede alterar el formato y la resolución que finalmente llegan al DAC, independientemente del formato original del archivo. Con esta comprensión, el próximo paso será diseñar una política de archivos, considerando cómo estas transformaciones afectan las decisiones sobre el almacenamiento y la gestión de su biblioteca de audio digital.
