---
schemaVersion: 1
id: 2df4513e-ec14-4a93-9eb0-7ccd6e86ce02
sequence: 35
course: audio-digital
stepId: pcm-contenedor
title: Separar muestras, códec y contenedor
publishedAt: 2026-11-14T09:58:12.585Z
generationDate: 2026-11-09
summary: Esta lección clarifica la distinción entre las muestras de audio
  digital (PCM), el códec utilizado para representarlas y el formato contenedor
  (como WAV o AIFF) que encapsula estos datos junto con metadatos. Explica qué
  describe PCM y cómo los formatos contenedores organizan esta información,
  permitiendo la identificación y clasificación práctica de los componentes de
  un archivo de audio. El enfoque está en las características observables de los
  archivos y sus implicaciones para la reproducción y el procesamiento.
generation:
  model: gemini-2.5-flash
  promptVersion: v3
  contextHash: 6cc858b36e2bbd1b3cd91ed6b920a6bad62dac54bb83eef14fba938259409ff4
---

## Por qué ahora
Las lecciones recientes sobre cuantización y dither han abordado cómo el audio analógico se transforma en una representación digital. Para avanzar en la configuración y el diagnóstico de sistemas de audio digital, es fundamental comprender los componentes de un archivo de audio. A menudo, existe confusión entre los datos de audio crudos (las muestras), el método de codificación y la estructura del archivo que los contiene.

Esta lección establece un marco claro para distinguir la información de audio real, su método de codificación y la estructura del archivo que la alberga. Esta comprensión es esencial para el trabajo práctico con reproductores como Roon y foobar2000, ya que permite identificar con precisión qué tipo de datos se están procesando y cómo se organizan, lo cual es clave para interpretar las especificaciones de los archivos y anticipar su comportamiento en la cadena de reproducción.

## Explicación y ejemplo
El audio digital se basa en la representación de una señal analógica mediante valores discretos. El método más común para esta representación es la Modulación por Impulsos Codificados, o PCM (Pulse Code Modulation). PCM describe directamente las muestras de audio: cada muestra es un valor numérico que representa la amplitud de la señal en un instante específico. Por ejemplo, un archivo PCM de 16 bits y 44.1 kHz significa que cada segundo de audio contiene 44.100 muestras, y cada una de esas muestras se representa con 16 bits de información. Esta es la descripción fundamental de la señal de audio digital, sin compresión ni procesamiento adicional.

Sin embargo, las muestras PCM por sí solas no constituyen un archivo de audio completo. Necesitan ser organizadas y almacenadas dentro de una estructura que también pueda contener otra información, como metadatos. Aquí es donde entran en juego los formatos contenedores. Un formato contenedor es una estructura de archivo que "envuelve" los datos de audio (las muestras PCM) junto con otros datos, como el título de la canción, el artista, la duración, la frecuencia de muestreo, la profundidad de bits y la información de las pistas. Los formatos contenedores no alteran las muestras PCM en sí mismas; simplemente las organizan para su almacenamiento y recuperación.

Consideremos dos formatos contenedores ampliamente utilizados para audio PCM sin comprimir: WAV y AIFF.

Un archivo **WAV** (Waveform Audio File Format) es un formato contenedor desarrollado por Microsoft e IBM. Dentro de un archivo WAV, las muestras PCM se almacenan de forma secuencial. El archivo también incluye un encabezado que especifica detalles como la frecuencia de muestreo, la profundidad de bits, el número de canales y el tamaño de los datos de audio. Además, puede contener "chunks" (fragmentos) para metadatos, aunque históricamente la compatibilidad con metadatos en WAV ha sido más limitada o inconsistente en comparación con otros formatos. Por ejemplo, un archivo `cancion.wav` podría contener muestras PCM de 24 bits a 96 kHz, y su encabezado indicaría estas características. Si se abre este archivo con un editor hexadecimal, se verían los bytes del encabezado seguidos directamente por los bytes que representan las muestras de audio.

Un archivo **AIFF** (Audio Interchange File Format) es un formato contenedor desarrollado por Apple. Al igual que WAV, AIFF almacena muestras PCM sin comprimir. Su estructura es similar a la de WAV, utilizando un sistema de "chunks" para organizar los datos de audio y los metadatos. AIFF ha tenido tradicionalmente una mejor compatibilidad con metadatos en el ecosistema de Apple. Un archivo `cancion.aiff` con las mismas muestras PCM de 24 bits a 96 kHz que el archivo WAV anterior contendría exactamente los mismos datos de audio, pero organizados de una manera ligeramente diferente dentro de su estructura de archivo y con un manejo potencialmente más robusto de metadatos como el artista o el álbum.

La clave es que tanto WAV como AIFF son simplemente "envoltorios" para las muestras PCM. El "códec" en este contexto es PCM, que describe cómo se codifican las amplitudes de la señal. Los formatos WAV y AIFF son los "contenedores" que guardan esas muestras PCM y la información adicional. No realizan compresión de datos ni alteran la información de las muestras. Si se extraen las muestras PCM de un archivo WAV y se colocan en un archivo AIFF (o viceversa), el audio resultante sería idéntico, asumiendo que los metadatos no son relevantes para la reproducción de la señal en sí.

## Práctica
Para esta práctica, utilizaremos Roon y foobar2000 para examinar las propiedades de archivos WAV y AIFF, identificando las características de las muestras PCM y la información del contenedor.

1.  **Obtener archivos de ejemplo**: Si no dispone de ellos, puede crear archivos WAV y AIFF a partir de una misma fuente. Utilice una herramienta de conversión de audio (como Audacity, o un conversor en línea si es necesario) para exportar una pista corta (por ejemplo, 30 segundos de una canción) en formato WAV y AIFF, asegurándose de que ambos usen la misma frecuencia de muestreo (por ejemplo, 44.1 kHz) y profundidad de bits (por ejemplo, 16 bits). Guarde estos archivos en una ubicación accesible para Roon y foobar2000.

2.  **Examinar en Roon**: Añada los archivos a su biblioteca de Roon. Seleccione uno de los archivos (por ejemplo, el WAV). En la pantalla de reproducción, haga clic en el icono de la forma de onda o en la ruta de la señal para abrir la ventana de "Ruta de la señal". Observe la sección "Fuente" o "Información del archivo". Roon mostrará la frecuencia de muestreo y la profundidad de bits (por ejemplo, "PCM 44.1 kHz, 16 bits"). Esto indica las características de las muestras PCM. Luego, examine la sección de metadatos del archivo en Roon. Verá el título, artista, álbum, etc., que son parte de la información que el contenedor WAV o AIFF puede almacenar.

3.  **Examinar en foobar2000**: Abra foobar2000 y añada los mismos archivos a una lista de reproducción. Seleccione uno de los archivos, haga clic derecho y elija "Propiedades". En la pestaña "General", foobar2000 mostrará el "Formato" (por ejemplo, "WAV") y las "Características" (por ejemplo, "44100 Hz / 16-bit / 2 canales"). El "Formato" se refiere al contenedor, mientras que las "Características" describen las muestras PCM. En la pestaña "Metadatos", podrá ver los campos de metadatos que el archivo contiene. Compare esta información entre el archivo WAV y el AIFF. Notará que las características de las muestras PCM son idénticas, pero la forma en que se presentan los metadatos puede variar ligeramente debido a las diferencias en la implementación de los contenedores.

Esta práctica le permite observar directamente cómo Roon y foobar2000 distinguen y presentan la información sobre las muestras PCM y el formato contenedor, reforzando la idea de que son conceptos relacionados pero distintos.

## Comprobaciones
1. ¿Qué describe PCM en un archivo de audio digital?
Respuesta: PCM describe directamente las muestras de audio, es decir, los valores numéricos que representan la amplitud de la señal en cada instante, incluyendo la frecuencia de muestreo y la profundidad de bits.
2. ¿Cuál es la función principal de un formato contenedor como WAV o AIFF?
Respuesta: La función principal de un formato contenedor como WAV o AIFF es organizar y almacenar las muestras PCM junto con metadatos (como título, artista, duración) dentro de una estructura de archivo, sin alterar las muestras de audio en sí mismas.

## Cierre
Hemos establecido que PCM define la naturaleza de las muestras de audio, mientras que formatos como WAV y AIFF son contenedores que organizan esas muestras y metadatos. Esta distinción es fundamental para comprender la estructura de los archivos de audio digital.

El siguiente paso es explorar cómo otros formatos de archivo gestionan las muestras PCM y qué implicaciones tiene su método de almacenamiento para la fidelidad y el tamaño del archivo. Analizaremos qué conservan formatos como FLAC o ALAC y cómo se relacionan con las muestras PCM que hemos estudiado hoy.
