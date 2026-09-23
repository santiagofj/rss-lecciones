---
schemaVersion: 1
id: 32d65016-1d13-4092-8ebf-35c73d38310e
sequence: 4
course: audio-digital
stepId: modos-salida-foobar
title: Comparar los modos de salida de foobar2000
publishedAt: 2026-09-22T08:21:13.218Z
generationDate: 2026-09-22
summary: Esta lección compara los modos de salida de audio compartido y
  exclusivo en foobar2000. Se explica cómo cada modo interactúa con el sistema
  operativo Windows y cómo esto afecta la integridad de la señal de audio. A
  través de una práctica guiada, el alumno aprenderá a configurar foobar2000
  para usar WASAPI Shared y WASAPI Exclusive, y observará directamente en el
  indicador del DAC las diferencias en el formato de la señal recibida. El
  objetivo es reconocer cuándo Windows mezcla o remuestrea la señal,
  proporcionando una herramienta diagnóstica esencial para asegurar la
  reproducción bit-perfect…
generation:
  model: gemini-2.5-flash
  promptVersion: v1
  contextHash: 4e1fece757aca0e89fc2d85c93bb9e28b75470af0a8467037f413ad86c561a71
---

La capacidad de diagnosticar la integridad de la señal de audio es fundamental para asegurar una reproducción bit-perfect. En lecciones anteriores, se estableció cómo el Signal Path de Roon permite identificar transformaciones en la cadena de audio. Sin embargo, la reproducción de audio no se limita a Roon, y comprender cómo otros reproductores interactúan con el sistema operativo es igualmente importante. Esta lección se enfoca en foobar2000, un reproductor ampliamente utilizado, para examinar cómo sus modos de salida influyen en la señal antes de que llegue al DAC. El objetivo es reconocer cuándo el sistema operativo Windows interviene, mezclando o remuestreando la señal, lo cual es una causa común de pérdida de fidelidad bit-perfect.

El sistema operativo Windows gestiona el audio a través de su motor de sonido. Este motor puede operar en dos modos principales: compartido y exclusivo. La elección del modo de salida en un reproductor como foobar2000 determina cómo la señal de audio interactúa con este motor.

En el modo de salida compartido, como DirectSound o WASAPI Shared, la señal de audio pasa a través del mezclador de audio de Windows. Este mezclador permite que múltiples aplicaciones reproduzcan sonido simultáneamente, mezclando sus señales en una única salida. Para lograr esto, el mezclador puede remuestrear todas las señales a una frecuencia de muestreo y profundidad de bits comunes, que generalmente coinciden con la configuración predeterminada del dispositivo de audio en Windows. Por ejemplo, si una pista de 44.1 kHz, 16-bit se reproduce en modo compartido y la configuración de Windows es 48 kHz, 24-bit, el mezclador de Windows remuestreará y convertirá la profundidad de bits de la señal original. Este procesamiento introduce alteraciones en la señal, impidiendo una reproducción bit-perfect.

Por el contrario, el modo de salida exclusivo, como WASAPI Exclusive o ASIO, permite que el reproductor de audio acceda directamente al hardware del DAC, evitando el mezclador de audio de Windows. Cuando se utiliza un modo exclusivo, el sistema operativo cede el control del dispositivo de audio al reproductor, lo que significa que otras aplicaciones no pueden reproducir sonido simultáneamente. La ventaja principal es que la señal de audio se envía al DAC sin ninguna alteración por parte del sistema operativo, manteniendo la frecuencia de muestreo y la profundidad de bits originales de la pista. Esto es esencial para lograr una reproducción bit-perfect.

Para ilustrar esto con un ejemplo concreto, considere una pista de audio en formato FLAC con una frecuencia de muestreo de 44.1 kHz y una profundidad de bits de 16 bits. Si se reproduce esta pista en foobar2000 utilizando WASAPI Shared, y la configuración de audio predeterminada de Windows para el DAC está establecida en 48 kHz, 24-bit, el indicador del DAC mostrará 48 kHz y 24 bits. Esto evidencia que el mezclador de Windows ha remuestreado la señal de 44.1 kHz a 48 kHz y ha realizado una conversión de profundidad de bits de 16 a 24 bits. Sin embargo, si la misma pista se reproduce utilizando WASAPI Exclusive, el indicador del DAC mostrará 44.1 kHz y 16 bits, confirmando que la señal original ha llegado al DAC sin modificaciones por parte del sistema operativo.

### Práctica: Observar los modos de salida en foobar2000

Esta práctica le permitirá observar directamente el efecto de los modos de salida compartido y exclusivo en foobar2000 y su impacto en la señal que recibe su DAC.

**Paso 1: Preparación**
1.  Abra foobar2000.
2.  Seleccione una pista de audio de prueba. Se recomienda una pista en formato FLAC con una frecuencia de muestreo de 44.1 kHz y una profundidad de bits de 16 bits. Asegúrese de que esta pista no haya sido procesada previamente por ningún DSP en foobar2000.
3.  Abra las preferencias de foobar2000 navegando a `File > Preferences`.
4.  En el panel izquierdo, vaya a `Playback > Output`.
5.  En la sección `Device`, observe los modos de salida disponibles para su DAC. Debería ver opciones como `DirectSound`, `WASAPI (shared)`, `WASAPI (event)` o `WASAPI (push)` (ambos son exclusivos), y posiblemente `ASIO` si tiene los componentes instalados.

**Paso 2: Configuración del modo compartido**
1.  Seleccione la opción `WASAPI (shared)` seguida del nombre de su DAC (por ejemplo, `WASAPI (shared): [nombre de su DAC]`).
2.  Haga clic en `Apply` y luego en `OK` para cerrar las preferencias.
3.  Reproduzca la pista de prueba.
4.  Observe el indicador de frecuencia de muestreo y profundidad de bits en el panel frontal de su DAC. Registre los valores mostrados.

**Paso 3: Configuración del modo exclusivo**
1.  Detenga la reproducción.
2.  Vuelva a `File > Preferences > Playback > Output`.
3.  Seleccione una opción de modo exclusivo para su DAC. Las opciones comunes son `WASAPI (event): [nombre de su DAC]` o `WASAPI (push): [nombre de su DAC]`. Si tiene ASIO configurado, también puede usar `ASIO: [nombre de su DAC]`.
4.  Haga clic en `Apply` y luego en `OK`.
5.  Reproduzca la misma pista de prueba.
6.  Observe el indicador de frecuencia de muestreo y profundidad de bits en el panel frontal de su DAC. Registre los valores mostrados.

**Paso 4: Comparación**
Compare los valores registrados en el Paso 2 (modo compartido) con los del Paso 3 (modo exclusivo). Debería observar una diferencia si la configuración de audio predeterminada de Windows para su DAC no coincide con la frecuencia de muestreo y profundidad de bits de su pista de prueba. En modo exclusivo, los valores del DAC deben coincidir con los de la pista original.

### Comprobaciones

1.  **Comprobación 1:** Si reproduce una pista de 44.1 kHz, 16-bit en foobar2000 usando WASAPI Shared, y su DAC muestra 48 kHz, 24-bit, ¿qué indica esto sobre la ruta de la señal?
    *   **Respuesta:** Indica que el mezclador de audio de Windows ha intervenido, remuestreando la señal de 44.1 kHz a 48 kHz y convirtiendo la profundidad de bits de 16 a 24 bits antes de enviarla al DAC. La reproducción no es bit-perfect.

2.  **Comprobación 2:** Al cambiar de WASAPI Shared a WASAPI Exclusive para la misma pista de 44.1 kHz, 16-bit, el indicador de su DAC ahora muestra 44.1 kHz, 16-bit. ¿Cuál es la implicación de este cambio?
    *   **Respuesta:** La implicación es que el modo WASAPI Exclusive ha permitido que foobar2000 acceda directamente al DAC, evitando el mezclador de audio de Windows. La señal original de la pista ha llegado al DAC sin alteraciones, logrando una reproducción bit-perfect.

Comprender cómo los modos de salida de foobar2000 interactúan con el sistema operativo es crucial para el diagnóstico de la integridad de la señal. La próxima lección explorará cómo configurar las propiedades de audio de Windows para complementar estos modos de salida y optimizar aún más la reproducción.
