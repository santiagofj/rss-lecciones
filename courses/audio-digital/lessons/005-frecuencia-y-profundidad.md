---
schemaVersion: 1
id: 518dd2db-c191-49f8-b1f9-e118b2530214
sequence: 5
course: audio-digital
stepId: frecuencia-y-profundidad
title: Seguir frecuencia y profundidad de bits
publishedAt: 2026-09-23T08:23:19.810Z
generationDate: 2026-09-23
summary: Esta lección aborda cómo rastrear la frecuencia de muestreo y la
  profundidad de bits de la señal de audio digital a través de Roon y
  foobar2000, utilizando el indicador del DAC como evidencia. Se explica la
  importancia de diferenciar el formato del archivo del formato de la señal en
  tránsito, y se proporcionan ejemplos prácticos con archivos de 44.1, 48 y 96
  kHz, así como de 16 y 24 bits. El objetivo es desarrollar una habilidad
  diagnóstica para verificar la integridad de la señal en cada etapa de la
  reproducción, asegurando que el formato deseado llegue al conversor
  digital-analógico sin…
generation:
  model: gemini-2.5-flash
  promptVersion: v1
  contextHash: b40a62fe9d6289b26783ce5fc07fbad323a69e365f04ad5be0aae520dcc2e697
---

Las lecciones anteriores establecieron la metodología para construir un caso de control, interpretar el Signal Path de Roon y comparar los modos de salida de foobar2000. El objetivo fue comprender la integridad de la señal digital en cada etapa. Se observó que conceptos como la cuantización y el dither pueden resultar confusos sin una base sólida de evidencia observable. Para abordar esto, es fundamental desarrollar la habilidad de rastrear las propiedades fundamentales de la señal digital: la frecuencia de muestreo y la profundidad de bits. Esta lección proporciona las herramientas prácticas para observar y diagnosticar estas propiedades en cada etapa de la cadena de reproducción, lo cual es crucial para identificar cualquier alteración de la señal antes de profundizar en temas más complejos.

Es esencial diferenciar entre el formato del contenedor del archivo y el formato de la señal en tránsito. Un archivo FLAC puede indicar 44.1 kHz y 16 bits, pero la señal que llega al DAC podría ser 48 kHz y 24 bits si el sistema operativo o el reproductor realizan un remuestreo o un cambio de profundidad de bits. El objetivo es verificar que el formato de la señal que sale del reproductor y llega al DAC coincida con el formato del archivo original, asumiendo una reproducción bit-perfect.

Para rastrear la frecuencia de muestreo y la profundidad de bits, utilizaremos el Signal Path de Roon, la barra de estado de foobar2000 y, de manera crucial, el indicador del DAC. Este último es la evidencia más directa del formato de la señal que el DAC está recibiendo y procesando.

Consideremos un archivo de audio de prueba, por ejemplo, un archivo FLAC de 44.1 kHz y 16 bits. Al reproducirlo en Roon, con el DSP deshabilitado, el Signal Path debería mostrar de principio a fin: "Source: FLAC 44.1 kHz 16-bit", "Decodificación: 44.1 kHz 16-bit", "DSP: 44.1 kHz 16-bit" (si no hay procesamiento), "Salida: 44.1 kHz 16-bit" y "Dispositivo: 44.1 kHz 16-bit". Simultáneamente, el indicador del DAC debería mostrar "44.1 kHz" y "16 bit" (o un equivalente como "PCM 44.1/16"). Si el DAC muestra un formato diferente, como "48 kHz" o "24 bit", esto indica una alteración de la señal en algún punto entre la salida de Roon y la entrada del DAC, o dentro del propio DAC si este realiza algún procesamiento interno no deseado. Este mismo principio se aplica a archivos de 48 kHz, 96 kHz, 16 bits o 24 bits. La clave es que el formato de la señal en cada etapa del Signal Path de Roon y el indicador del DAC deben coincidir con el formato del archivo original.

En foobar2000, la barra de estado en la parte inferior de la ventana principal muestra el formato de la pista que se está reproduciendo. Al configurar la salida en WASAPI Exclusive, foobar2000 debería enviar la señal directamente al DAC sin intervención del mezclador de Windows. Si se reproduce un archivo de 96 kHz y 24 bits, la barra de estado de foobar2000 indicará "96000 Hz, 24-bit" y el indicador del DAC debería reflejar "96 kHz" y "24 bit". Si se utiliza WASAPI Shared, y el formato de salida predeterminado de Windows es 48 kHz, el DAC mostrará "48 kHz" independientemente del formato del archivo original, evidenciando el remuestreo por parte del sistema operativo.

**Práctica: Verificación de formatos con Roon y foobar2000**

1.  **Seleccione archivos de prueba**: Elija tres archivos de audio digital con diferentes frecuencias de muestreo y profundidades de bits. Por ejemplo:
    *   Archivo A: 44.1 kHz, 16 bits (FLAC o WAV)
    *   Archivo B: 48 kHz, 24 bits (FLAC o WAV)
    *   Archivo C: 96 kHz, 24 bits (FLAC o WAV)

2.  **Roon**: Abra Roon y asegúrese de que el DSP esté deshabilitado para su zona de reproducción. Reproduzca el Archivo A. Observe el Signal Path de Roon en cada etapa y el indicador de su DAC. Registre los formatos observados. Repita el proceso con el Archivo B y el Archivo C.

3.  **foobar2000 (WASAPI Exclusive)**: Cierre Roon. Abra foobar2000 y configure la salida en WASAPI Exclusive para su DAC. Reproduzca el Archivo A. Observe la barra de estado de foobar2000 y el indicador de su DAC. Registre los formatos. Repita con el Archivo B y el Archivo C.

4.  **foobar2000 (WASAPI Shared)**: Mantenga foobar2000 abierto. Cambie la salida a WASAPI Shared. Verifique la configuración de formato predeterminada de su dispositivo de audio en Windows (Panel de control > Sonido > Pestaña Reproducción > Propiedades de su DAC > Pestaña Opciones avanzadas). Anote el formato predeterminado (por ejemplo, 48 kHz, 24 bits). Reproduzca el Archivo A. Observe la barra de estado de foobar2000 y el indicador de su DAC. Registre los formatos. Repita con el Archivo B y el Archivo C.

**Comprobaciones**

1.  Si reproduce un archivo de 44.1 kHz, 16 bits en Roon con DSP deshabilitado y el Signal Path muestra "Dispositivo: 44.1 kHz 16-bit", pero el indicador de su DAC muestra "48 kHz 24-bit", ¿qué implica esta discrepancia?
    *   **Respuesta**: Implica que hay una alteración de la señal entre la salida de Roon y la entrada del DAC, o que el DAC está realizando un procesamiento interno que cambia el formato. La señal que Roon reporta enviar no es la que el DAC está recibiendo o procesando finalmente.

2.  Al reproducir un archivo de 96 kHz, 24 bits en foobar2000 con WASAPI Shared, si la configuración predeterminada de Windows para su DAC es 48 kHz, 24 bits, ¿qué formato mostrará el indicador de su DAC?
    *   **Respuesta**: El indicador del DAC mostrará "48 kHz, 24 bits". Esto se debe a que WASAPI Shared utiliza el mezclador de Windows, que remuestrea la señal al formato predeterminado del sistema operativo antes de enviarla al DAC.

La capacidad de rastrear con precisión la frecuencia de muestreo y la profundidad de bits es una habilidad diagnóstica fundamental. Permite verificar la integridad de la señal en cada etapa de la reproducción. En la próxima lección, aplicaremos esta habilidad para identificar y corregir posibles alteraciones en la cadena de audio.
