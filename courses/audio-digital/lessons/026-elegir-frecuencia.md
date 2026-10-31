---
schemaVersion: 1
id: 5dcb7b60-827d-44d4-a131-4bbd224bc8c5
sequence: 26
course: audio-digital
stepId: elegir-frecuencia
title: Elegir una frecuencia de muestreo
publishedAt: 2026-10-31T09:24:41.008Z
generationDate: 2026-10-31
summary: Esta lección aborda la justificación de la frecuencia de muestreo
  adecuada para diferentes escenarios de audio digital, considerando el
  contenido, el procesamiento y el destino final. Se explica cómo la elección de
  la frecuencia de muestreo impacta la fidelidad de la señal y la prevención de
  artefactos como el aliasing, sin asumir que una mayor frecuencia garantiza una
  mejor calidad. Se proporcionan ejemplos prácticos para reproducción musical,
  audio para video y procesamiento, y se guía al alumno en la configuración de
  Roon y foobar2000 para verificar la frecuencia de muestreo de archivos y…
generation:
  model: gemini-2.5-flash
  promptVersion: v3
  contextHash: 48f47d7ad802dc5d0ae12c2c14ff1fc88b2fafae2e6e9eb42aa21559b9ba608a
---

## Por qué ahora
En lecciones anteriores, se examinó el fenómeno del aliasing y la función crítica de los filtros antialiasing y de reconstrucción. Se comprendió que una señal analógica debe ser filtrada antes de su conversión a digital para evitar la introducción de artefactos irreversibles, y que la reconstrucción de la onda continua requiere un filtro de paso bajo. La frecuencia de muestreo es el parámetro fundamental que define el límite superior de las frecuencias que pueden ser representadas sin aliasing y que, por lo tanto, deben ser filtradas. La elección de esta frecuencia no es arbitraria; debe responder a las características del contenido, el tipo de procesamiento que se aplicará y el destino final de la señal. Una selección inadecuada puede introducir limitaciones o redundancias innecesarias, afectando la eficiencia y, en algunos casos, la fidelidad percibida.

## Explicación y ejemplo
La frecuencia de muestreo, medida en Hertz (Hz) o kilohertz (kHz), determina cuántas veces por segundo se toma una "instantánea" de la señal analógica para convertirla en un valor digital. Según el teorema de Nyquist-Shannon, para reconstruir una señal analógica sin pérdida de información, la frecuencia de muestreo debe ser al menos el doble de la frecuencia más alta presente en la señal original. Este valor se conoce como frecuencia de Nyquist. Si una señal contiene componentes de frecuencia superiores a la mitad de la frecuencia de muestreo, se producirá aliasing, un artefacto que se manifiesta como frecuencias erróneas en el espectro audible.

Las frecuencias de muestreo más comunes en audio digital son 44.1 kHz y 48 kHz. La frecuencia de 44.1 kHz se estableció como estándar para el CD de audio, permitiendo la representación de frecuencias hasta aproximadamente 22.05 kHz. Este rango excede el límite superior del oído humano promedio, que se sitúa alrededor de los 20 kHz. La frecuencia de 48 kHz es común en aplicaciones de audio para video y producción profesional, ya que se alinea con las tasas de cuadro de video (por ejemplo, 24, 25, 30 fps) y facilita la sincronización. En ambos casos, el filtro antialiasing debe atenuar eficazmente las frecuencias por encima de la mitad de la frecuencia de muestreo para evitar el aliasing.

Consideremos tres escenarios para justificar la elección de una frecuencia de muestreo:

1.  **Reproducción musical (CD o streaming):** Para la mayoría del contenido musical destinado al consumo general, una frecuencia de muestreo de 44.1 kHz es suficiente. La información musical relevante para la percepción humana se encuentra dentro del rango audible. Un archivo de audio a 44.1 kHz puede representar fielmente todas las frecuencias hasta 22.05 kHz. Utilizar frecuencias de muestreo más altas, como 96 kHz o 192 kHz, para este tipo de contenido no añade información audible significativa y aumenta el tamaño del archivo y la carga de procesamiento, sin una mejora perceptible en la calidad de sonido para la mayoría de los oyentes y equipos.

2.  **Audio para video:** En la producción de audio para video, la frecuencia de muestreo de 48 kHz es el estándar. Esto se debe a que 48 kHz es un múltiplo de 8 kHz, que a su vez es un múltiplo de las frecuencias de cuadro de video comunes (24, 25, 30 fps). Esta relación facilita la sincronización de audio y video, minimizando problemas de deriva o desajuste temporal. Aunque el rango audible es similar al de 44.1 kHz, la compatibilidad con los sistemas de video es la razón principal para su elección.

3.  **Procesamiento de audio:** En entornos de producción o masterización, algunos ingenieros optan por grabar o procesar a frecuencias de muestreo más altas, como 96 kHz o 192 kHz. La justificación principal no es la extensión del rango audible, sino la posibilidad de realizar un procesamiento digital más preciso. Por ejemplo, al aplicar ecualización o efectos basados en el tiempo, las frecuencias de muestreo más altas pueden ofrecer un margen adicional para evitar artefactos de procesamiento en el rango audible, especialmente si se utilizan algoritmos que introducen distorsión de intermodulación o aliasing interno. Sin embargo, este beneficio es a menudo sutil y depende en gran medida de la calidad de los algoritmos de procesamiento y de la implementación del software. Una vez finalizado el procesamiento, el audio suele ser "downsampleado" a 44.1 kHz o 48 kHz para su distribución, ya que las frecuencias muy altas no son audibles y solo aumentan el tamaño del archivo.

En resumen, la elección de la frecuencia de muestreo debe ser una decisión informada basada en el propósito del audio. Para la reproducción musical, 44.1 kHz es un estándar robusto y eficiente. Para video, 48 kHz es la opción práctica. Las frecuencias más altas pueden tener un nicho en el procesamiento, pero no deben considerarse una garantía de "mejor sonido" por sí mismas, especialmente en la etapa de reproducción final.

## Práctica
Para esta práctica, se verificará la frecuencia de muestreo de diferentes archivos de audio y se observará cómo Roon y foobar2000 reportan esta información.

1.  **Identificar la frecuencia de muestreo de archivos:**
    *   Localice en su biblioteca de Roon o en su disco duro al menos tres archivos de audio con diferentes frecuencias de muestreo. Puede buscar archivos con etiquetas como "CD Quality" (generalmente 44.1 kHz), "Hi-Res" (que podrían ser 96 kHz o 192 kHz) o archivos de audio asociados a video (que suelen ser 48 kHz).
    *   **En Roon:** Seleccione un álbum o una pista. Haga clic en el icono de "señal" (un pequeño punto con ondas) en la parte inferior de la pantalla de reproducción o en la vista de la pista. Roon mostrará la ruta de la señal, incluyendo la frecuencia de muestreo del archivo de origen y la frecuencia de muestreo de salida de su DAC. Observe si Roon realiza alguna conversión de frecuencia de muestreo (resampling) antes de enviar la señal al DAC. Anote la frecuencia de muestreo del archivo original.
    *   **En foobar2000:** Abra un archivo de audio. Haga clic derecho sobre la pista en la lista de reproducción y seleccione "Properties" (Propiedades). En la pestaña "Summary" (Resumen), busque la línea "Sample rate" (Frecuencia de muestreo). Anote este valor. Repita para los otros archivos.

2.  **Configurar la salida de audio y observar la frecuencia de muestreo:**
    *   **En Roon:** Vaya a `Settings > Audio`. Seleccione su dispositivo de salida (DAC) y haga clic en el icono de engranaje para `Device Setup`. En la pestaña `Playback`, observe las opciones relacionadas con el "Sample Rate Conversion" (Conversión de frecuencia de muestreo). Puede configurar Roon para que envíe la señal sin cambios (Native) o para que realice un "upsampling" o "downsampling" a una frecuencia específica. Para esta práctica, asegúrese de que Roon esté configurado para enviar la frecuencia de muestreo nativa del archivo al DAC, si su DAC lo soporta. Reproduzca un archivo de 44.1 kHz y observe la ruta de la señal. Luego, reproduzca un archivo de 96 kHz y observe nuevamente la ruta de la señal. Verifique que la frecuencia de muestreo de salida coincida con la del archivo de origen.
    *   **En foobar2000:** Vaya a `File > Preferences > Playback > Output`. Seleccione su dispositivo de salida. Asegúrese de que no haya ningún componente de "Resampler" activo en la cadena de procesamiento si desea que foobar2000 envíe la frecuencia de muestreo nativa del archivo. Reproduzca un archivo de 44.1 kHz y luego uno de 96 kHz. Si su DAC tiene un indicador de frecuencia de muestreo, observe cómo cambia. Si no, confíe en la información de las propiedades del archivo y en la configuración de salida de foobar2000.

Esta práctica le permitirá visualizar directamente cómo la frecuencia de muestreo se reporta y gestiona en sus reproductores, reforzando la comprensión de que es un atributo inherente al archivo y un parámetro configurable en la cadena de reproducción.

## Comprobaciones
1.  ¿Cuál es la frecuencia de muestreo estándar para el audio de un CD y por qué se considera adecuada para la reproducción musical?
Respuesta: La frecuencia de muestreo estándar para el audio de un CD es 44.1 kHz. Se considera adecuada porque permite representar frecuencias hasta 22.05 kHz, lo cual excede el límite superior del oído humano promedio (aproximadamente 20 kHz), asegurando la fidelidad de la señal audible.
2.  En un escenario de producción de audio para video, ¿qué frecuencia de muestreo es comúnmente utilizada y cuál es la razón principal de esta elección?
Respuesta: En un escenario de producción de audio para video, la frecuencia de muestreo comúnmente utilizada es 48 kHz. La razón principal es su compatibilidad y facilidad de sincronización con las tasas de cuadro de video estándar (por ejemplo, 24, 25, 30 fps), ya que 48 kHz es un múltiplo de 8 kHz, que a su vez es un múltiplo de estas tasas.

## Cierre
La elección de la frecuencia de muestreo es una decisión técnica que impacta la representación de la señal digital. Comprender sus implicaciones permite optimizar la cadena de audio sin recurrir a suposiciones sobre la calidad. En la próxima lección, se abordará cómo diagnosticar problemas relacionados con el muestreo, identificando las señales de una configuración incorrecta o de un archivo con artefactos.
