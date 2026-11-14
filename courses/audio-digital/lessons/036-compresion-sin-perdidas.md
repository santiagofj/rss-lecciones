---
schemaVersion: 1
id: f8c007eb-45ab-483c-861f-31199f99fac3
sequence: 36
course: audio-digital
stepId: compresion-sin-perdidas
title: Qué conserva FLAC o ALAC
publishedAt: 2026-11-14T09:58:58.402Z
generationDate: 2026-11-10
summary: Esta lección examina qué componentes de un archivo de audio digital se
  preservan al utilizar códecs de compresión sin pérdidas como FLAC y ALAC. Se
  distingue entre el tamaño del archivo comprimido y la integridad de las
  muestras de audio decodificadas, proponiendo métodos para verificar que las
  muestras originales se recuperan idénticamente. Se aborda la comparación de
  datos decodificados y metadatos, y se sugiere una prueba práctica para
  confirmar la equivalencia de las muestras sin recurrir a la comparación de
  hashes de contenedores diferentes, consolidando la comprensión de la
  naturaleza…
generation:
  model: gemini-2.5-flash
  promptVersion: v3
  contextHash: 61dd231197630f2b7de5cb8f4b8363bfbaee9e279e303837282bc398dd436db0
---

## Por qué ahora
En la lección anterior, se estableció la distinción entre las muestras de audio digital (PCM), el códec que las representa y el contenedor que las organiza. Esta diferenciación es fundamental para comprender qué ocurre cuando se aplica compresión sin pérdidas. Conceptos como la cuantización y el dither, aunque complejos, nos han llevado a observar la evidencia visible de los procesos digitales. Ahora, es necesario aplicar esta perspectiva al concepto de compresión sin pérdidas, específicamente con FLAC y ALAC. El objetivo es verificar conceptualmente que, tras la decodificación, las muestras de audio son idénticas a las originales, a pesar de que el archivo comprimido sea diferente en tamaño y estructura. Esta comprensión es clave para disipar la confusión sobre la naturaleza de la compresión sin pérdidas y su impacto en la integridad de la señal de audio, preparando el terreno para el estudio de la compresión con pérdidas.

## Explicación y ejemplo
Los códecs FLAC (Free Lossless Audio Codec) y ALAC (Apple Lossless Audio Codec) son métodos de compresión de datos que reducen el tamaño de un archivo de audio sin descartar ninguna información de las muestras originales. Esto significa que, al decodificar un archivo FLAC o ALAC, se recupera una secuencia de muestras PCM que es matemáticamente idéntica a la secuencia de muestras PCM del archivo original sin comprimir, como un WAV o AIFF. La clave reside en que la compresión sin pérdidas no altera los datos de audio en sí, sino su representación. Es comparable a comprimir un documento de texto en un archivo ZIP: el archivo ZIP es más pequeño y tiene una estructura diferente, pero al descomprimirlo, se obtiene el documento de texto original, bit a bit idéntico.

Consideremos un archivo WAV de 16 bits, 44.1 kHz, estéreo. Este archivo contiene una cabecera que describe sus características (formato, tasa de muestreo, profundidad de bits, número de canales) y, a continuación, la secuencia de muestras PCM. Cuando este archivo WAV se convierte a FLAC, el códec FLAC analiza la secuencia de muestras PCM y aplica algoritmos de predicción y codificación de entropía para encontrar redundancias y patrones. Estos algoritmos permiten representar la misma información de las muestras de manera más eficiente, resultando en un archivo de menor tamaño. El archivo FLAC resultante tendrá su propia cabecera (que incluye metadatos como la tasa de muestreo y la profundidad de bits, así como información específica del códec FLAC) y los datos de audio comprimidos.

Es importante destacar que el archivo FLAC no es una versión comprimida del *archivo WAV completo*, sino una versión comprimida de las *muestras PCM* contenidas en el WAV. Por lo tanto, comparar el hash criptográfico de un archivo WAV con el hash de su correspondiente archivo FLAC no arrojará el mismo resultado, ya que son contenedores diferentes con estructuras de cabecera y datos distintos. La prueba de equivalencia debe centrarse en las muestras decodificadas.

Los metadatos, como el título de la canción, el artista o el álbum, son información adicional que se almacena junto con los datos de audio. Tanto los contenedores WAV/AIFF como FLAC/ALAC pueden almacenar metadatos, aunque los sistemas de etiquetado pueden variar (por ejemplo, ID3 para WAV/AIFF en algunos casos, o Vorbis comments para FLAC). La compresión sin pérdidas de las muestras no afecta la capacidad de almacenar o preservar estos metadatos, que son gestionados por el contenedor o el códec de forma independiente a la compresión de las muestras de audio.

## Práctica
Para verificar la igualdad de las muestras decodificadas, se puede realizar una prueba práctica utilizando foobar2000. Esta herramienta permite comparar archivos de audio a nivel de muestras, lo cual es más relevante que comparar los archivos contenedores completos.

1.  **Selección de archivos:** Elija un archivo de audio en formato WAV o AIFF sin comprimir. Asegúrese de que sea un archivo que usted haya creado o que conozca su origen para evitar cualquier manipulación previa. Luego, cree una versión FLAC o ALAC de ese mismo archivo utilizando una herramienta de conversión confiable (foobar2000 puede hacerlo, o cualquier otro software de su preferencia). Es crucial que la conversión se realice sin aplicar ningún procesamiento adicional, como normalización o remuestreo.
2.  **Preparación en foobar2000:** Abra foobar2000. Instale el componente “Audio Compare” si aún no lo tiene (File > Preferences > Components > Get more components). Una vez instalado, reinicie foobar2000.
3.  **Comparación de audio:** Seleccione ambos archivos (el original WAV/AIFF y su versión FLAC/ALAC) en la lista de reproducción de foobar2000. Haga clic derecho sobre ellos y seleccione “Utilities” > “Compare Audio”.
4.  **Análisis de resultados:** La herramienta “Audio Compare” analizará las muestras decodificadas de ambos archivos. Si los archivos son idénticos a nivel de muestras, el resultado indicará “Files are identical”. Esto confirmará que el códec FLAC o ALAC ha preservado la integridad de las muestras PCM originales. Si el resultado indica diferencias, revise el proceso de conversión para asegurarse de que no se aplicó ningún procesamiento adicional. Esta prueba es una demostración directa de que la compresión sin pérdidas cumple su promesa de recuperar las muestras originales sin alteración.

## Comprobaciones
1.  ¿Por qué comparar el hash criptográfico de un archivo WAV con el de su versión FLAC no es una prueba válida para verificar la igualdad de las muestras de audio?
Respuesta: Porque el WAV y el FLAC son contenedores diferentes con estructuras de cabecera y datos distintos, aunque contengan las mismas muestras PCM decodificadas. La comparación de hashes de los contenedores completos no refleja la identidad de las muestras internas.
2.  ¿Qué significa que un códec como FLAC o ALAC sea “sin pérdidas” en relación con las muestras de audio?
Respuesta: Significa que, al decodificar el archivo comprimido, se recupera una secuencia de muestras PCM que es matemáticamente idéntica a la secuencia de muestras PCM del archivo original sin comprimir, sin ninguna alteración o descarte de información.

## Cierre
Esta lección ha demostrado que los códecs sin pérdidas como FLAC y ALAC conservan la integridad de las muestras de audio, entregando una señal decodificada idéntica a la original. La reducción del tamaño del archivo se logra mediante una representación más eficiente de los datos, no por la eliminación de información. Comprender esta distinción es fundamental para el siguiente paso, donde exploraremos cómo la compresión con pérdidas opera y qué implicaciones tiene para la señal de audio.
