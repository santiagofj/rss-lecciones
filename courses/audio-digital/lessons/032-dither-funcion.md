---
schemaVersion: 1
id: 3d50168f-71fe-4f63-bbae-732cf1b485e1
sequence: 32
course: audio-digital
stepId: dither-funcion
title: Para qué sirve el dither
publishedAt: 2026-11-10T10:55:49.106Z
generationDate: 2026-11-06
summary: Esta lección explica el propósito del dither en el audio digital,
  demostrando cómo la adición controlada de ruido puede mitigar la distorsión de
  cuantización. Se compara la reducción de bits con y sin dither mediante
  ejemplos prácticos, enfocándose en la evidencia observable de su efecto en
  señales de bajo nivel. Se aborda la naturaleza del error de cuantización y
  cómo el dither lo transforma en un ruido más benigno, mejorando la percepción
  de detalle en el extremo inferior del rango dinámico. La lección prepara el
  terreno para comprender la separación entre dither y noise shaping.
generation:
  model: gemini-2.5-flash
  promptVersion: v3
  contextHash: 2d34aef1517387cb80aeafff1fa3d8eb697ee15796566e37d8c455b0d3d779bb
---

## Por qué ahora
En lecciones anteriores, hemos explorado la naturaleza del error de cuantización y su impacto en señales de bajo nivel. Observamos cómo este error se manifiesta como distorsión dependiente de la señal, especialmente cuando la amplitud de la señal se acerca al nivel de un bit. La cuantización, al redondear o truncar valores, introduce una imprecisión inherente que puede ser audible y molesta. La confusión sobre cómo manejar este error, particularmente en relación con la profundidad de bits y el rango dinámico, es común. Es en este punto donde el dither adquiere relevancia. Su función es modificar la naturaleza de este error de cuantización, transformándolo de una distorsión predecible y correlacionada con la señal en un ruido aleatorio de bajo nivel. Comprender esta transformación es fundamental para optimizar la representación de señales de muy baja amplitud y para entender por qué, en ciertas circunstancias, añadir ruido puede ser beneficioso.

## Explicación y ejemplo
La cuantización es el proceso de representar un valor analógico continuo con un número finito de valores discretos. Cuando una señal de audio se digitaliza, su amplitud se asigna al escalón de cuantización más cercano. Si una señal tiene una amplitud muy pequeña, menor que el tamaño de un escalón de cuantización, puede ser completamente perdida o representada de forma imprecisa. Por ejemplo, una señal sinusoidal de muy baja amplitud, que apenas cruza uno o dos escalones de cuantización, puede ser representada como una onda cuadrada o incluso como silencio, generando una distorsión armónica audible y no musical. Este es el error de cuantización, que es correlacionado con la señal original.

El dither es un ruido aleatorio de muy baja amplitud que se añade intencionadamente a la señal antes de la cuantización. Su propósito es descorrelacionar el error de cuantización de la señal original. Al añadir este ruido aleatorio, la señal original, incluso si es de muy baja amplitud, tiene una mayor probabilidad de "activar" los escalones de cuantización de manera más variada. Esto significa que el error de cuantización deja de ser una distorsión predecible y dependiente de la señal, y se convierte en un ruido aleatorio de bajo nivel. Este ruido aleatorio es perceptivamente menos molesto que la distorsión armónica o el truncamiento abrupto de la señal.

Consideremos un ejemplo práctico. Imagine una señal sinusoidal pura de 1 kHz con una amplitud tan baja que, al ser cuantizada a 8 bits sin dither, solo ocupa los dos escalones centrales, resultando en una onda cuadrada muy ruidosa o incluso en silencio intermitente. Si visualizamos esta señal en un analizador de espectro, veríamos armónicos no deseados que no estaban presentes en la señal original, producto de la distorsión de cuantización. Estos armónicos son la manifestación de la correlación entre el error y la señal.

Ahora, si a esa misma señal de 1 kHz de muy baja amplitud le añadimos dither antes de la cuantización a 8 bits, el resultado es diferente. El dither, al ser un ruido aleatorio, hace que la señal original "baile" ligeramente alrededor de los escalones de cuantización. Esto provoca que la señal se represente con una mayor variedad de valores discretos a lo largo del tiempo, incluso si su amplitud original es muy pequeña. El efecto neto es que la distorsión armónica correlacionada con la señal se reduce drásticamente. En su lugar, aparece un ruido de fondo constante y de bajo nivel, que es el dither mismo y el error de cuantización transformado en ruido aleatorio. Este ruido aleatorio es menos intrusivo para el oído humano que la distorsión armónica, y permite que la información de la señal original, incluso la de muy bajo nivel, sea preservada de una manera que es perceptivamente más cercana a la original. El dither no "recupera" información perdida, sino que permite que la información de bajo nivel se represente de forma más precisa al convertir la distorsión en ruido.

## Práctica
Para observar el efecto del dither, se recomienda utilizar archivos de prueba específicos. Busque en línea archivos de audio diseñados para demostrar el dither, a menudo etiquetados como "dither test files" o "quantization noise demonstration". Estos archivos suelen incluir una señal sinusoidal de muy baja amplitud (por ejemplo, -90 dBFS o inferior) cuantizada a una baja profundidad de bits (por ejemplo, 8 o 16 bits), con y sin dither.

1.  **Obtención de archivos de prueba**: Descargue un par de archivos que contengan la misma señal de muy bajo nivel, uno sin dither y otro con dither, ambos reducidos a la misma profundidad de bits (por ejemplo, 8 bits). Asegúrese de que la señal original sea una onda sinusoidal pura para facilitar la identificación de armónicos.
2.  **Reproducción en foobar2000**: Cargue ambos archivos en foobar2000. Utilice el componente "Spectrum Analyzer" (si está instalado) o un analizador de espectro externo (como un plugin VST si su configuración lo permite) para visualizar el contenido espectral de cada archivo. Preste atención a la presencia de armónicos alrededor de la frecuencia fundamental de la señal de prueba en el archivo sin dither. Compare esto con el archivo con dither, donde debería observar una reducción de estos armónicos y un aumento general del ruido de fondo.
3.  **Reproducción en Roon**: Si Roon permite la reproducción de estos archivos y tiene alguna herramienta de visualización de espectro (aunque Roon se enfoca más en la ruta de la señal y la calidad de reproducción), puede intentar la escucha crítica. En Roon, la "Ruta de la señal" le mostrará la profundidad de bits del archivo. La escucha es crucial: en el archivo sin dither, la señal de bajo nivel puede sonar áspera, distorsionada o intermitente. En el archivo con dither, la misma señal debería ser audible de forma más continua y con una calidad más cercana a la original, aunque con un ruido de fondo constante.
4.  **Observación y escucha crítica**: Concéntrese en cómo la señal de bajo nivel se presenta en cada caso. El objetivo es percibir cómo el dither transforma la distorsión de cuantización en un ruido aleatorio menos intrusivo, permitiendo que la señal original sea más inteligible o presente de forma más consistente.

## Comprobaciones
1.  ¿Cuál es el efecto principal del dither en la distorsión de cuantización?
Respuesta: El dither transforma la distorsión de cuantización, que es correlacionada con la señal, en un ruido aleatorio de bajo nivel, descorrelacionándola de la señal original.
2.  ¿Por qué la adición de ruido (dither) puede ser beneficiosa para la percepción de señales de bajo nivel?
Respuesta: La adición de dither permite que las señales de muy bajo nivel se representen de forma más continua y con menos distorsión armónica, ya que el ruido aleatorio hace que la señal "active" los escalones de cuantización de manera más variada, resultando en un ruido de fondo menos intrusivo que la distorsión.

## Cierre
Hemos establecido que el dither es una herramienta para mejorar la representación de señales de bajo nivel al convertir la distorsión de cuantización en ruido aleatorio. Sin embargo, existen diferentes tipos de dither y técnicas para moldear este ruido. El siguiente paso es comprender cómo se puede manipular el espectro de este ruido para optimizar aún más su impacto perceptivo.
