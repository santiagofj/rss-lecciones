---
schemaVersion: 1
id: 07623385-0025-4559-923a-9b9bbdadd5c6
sequence: 46
course: audio-digital
stepId: cadena-dsp-orden
title: Decidir el orden del procesamiento
publishedAt: 2026-11-20T11:03:50.883Z
generationDate: 2026-11-20
summary: En esta lección el alumno aprenderá a justificar por qué el orden de
  operaciones como ganancia, ecualización y limitación afecta la respuesta
  sonora, y a observar esas diferencias con señales simples en Roon y
  foobar2000.
generation:
  model: openai/gpt-oss-120b
  promptVersion: v5
  contextHash: 380e6c86a6cda6fdd82cec06fbc2fc9298b7c7a0f2fe18521f1999ec5955d289
---

## Por qué ahora

El procesamiento de audio no es conmutativo; cambiar la secuencia de ganancia, ecualización y limitación altera tanto la forma de la onda como los márgenes de headroom disponibles. En etapas posteriores del curso el alumno configurará una cadena DSP controlada; sin una base sólida sobre el impacto del orden, cualquier ajuste posterior será ambiguo y dificultará la diagnosis de problemas de distorsión o de balance tonal. Además, la práctica cotidiana con Roon y foobar2000 implica colocar filtros y compresores en la lista de reproducción; comprender cuándo aplicar cada uno reduce la necesidad de pruebas iterativas y mejora la reproducibilidad de los resultados medidos.

## Explicación y ejemplo

### Principios básicos de la cadena de señal
1. **Ganancia (gain)**: modifica la amplitud de la señal antes de que cualquier otro proceso la vea. Un aumento de nivel implica mayor headroom disponible para los módulos posteriores, pero también eleva el ruido de cuantización percibido si la cadena termina con una reducción de nivel.
2. **Ecualización (EQ)**: altera la distribución espectral sin cambiar el nivel total (salvo por la curva de ganancia aplicada). La forma de la respuesta de fase y la interacción con la compresión dependen del punto de inserción de la EQ.
3. **Limitación (limiter)**: actúa como un dispositivo de ganancia variable que impide que la señal supere un umbral definido, sacrificando dinámica para proteger el rango de salida.

### Por qué el orden importa
#### Caso A – Ganancia → EQ → Limitador
* La ganancia inicial eleva la señal completa. La EQ trabaja sobre una señal con mayor nivel, lo que significa que cualquier pico creado por una curva de refuerzo (por ejemplo, +3 dB a 3 kHz) se amplificará antes de llegar al limitador. El limitador, al recibir picos más altos, se activa con mayor frecuencia, reduciendo la ganancia de compresión y potencialmente introduciendo distorsión de intermodulación en los transitorios.
* Matemáticamente, si la señal original es \(x(t)\) y la ganancia es \(G\) (lineal), la señal después de la ganancia es \(G\cdot x(t)\). La EQ es una función de transferencia \(H_{EQ}(f)\). El limitador aplica una función no lineal \(L(\cdot)\). El proceso completo es \(y(t)=L\big(H_{EQ}(f)\,G\,x(t)\big)\).
#### Caso B – EQ → Ganancia → Limitador
* La EQ actúa primero, modificando la distribución de frecuencia sin alterar la amplitud global. Luego, la ganancia ajusta el nivel total, incluyendo los refuerzos y atenuaciones introducidos por la EQ. El limitador recibe una señal cuya energía total ya ha sido equilibrada, lo que permite un control más predecible del pico máximo.
* La expresión correspondiente es \(y(t)=L\big(G\,H_{EQ}(f)\,x(t)\big)\). La diferencia clave es que \(G\) se aplica **después** de la EQ, por lo que el factor de ganancia afecta a toda la señal ya filtrada, reduciendo la probabilidad de que los picos locales disparen el limitador inesperadamente.

### Evidencia práctica con Roon y foobar2000
1. **Preparar una señal de prueba**: genere un tono sinusoidal de 1 kHz a -12 dBFS y añada un pulso de 10 ms a +0 dBFS cada 5 s. Este archivo se puede crear con Audacity (Archivo → Exportar → WAV 24‑bit).
2. **Configurar la cadena** en foobar2000 usando el DSP “Equalizer” (modo paramétrico) y “Limiter”. En Roon, utilice la sección “DSP” del reproductor, añadiendo un “Parametric EQ” y luego un “Limiter”.
3. **Orden 1 – Ganancia → EQ → Limitador**: establezca una ganancia de +6 dB en el menú de volumen, aplique un boost de +4 dB en 3 kHz con Q = 1.0, y fije el limitador en -1 dBFS con tiempo de ataque 5 ms, release 50 ms. Observe la forma de onda en el medidor de pico; los picos del pulso superarán el umbral y el limitador reducirá la ganancia de manera visible, creando una distorsión de forma de onda.
4. **Orden 2 – EQ → Ganancia → Limitador**: mantenga la misma EQ y limitador, pero elimine la ganancia previa y ajuste el control de volumen global a +6 dB después de la EQ. Ahora el pulso alcanza el mismo nivel máximo, pero el limitador actúa sólo sobre los picos generados por la EQ, no sobre el nivel base. El medidor de pico muestra menos actividad de reducción y la forma de onda conserva una transición más suave.
5. **Comparar métricas**: use el plugin “Audio Analyzer” de foobar2000 o la herramienta “DSP Analyzer” de Roon para registrar nivel RMS, pico y THD+N. En el primer orden se observará un incremento de pico y una ligera elevación del THD+N (≈0.02 %); en el segundo orden, el pico se mantiene cerca del umbral establecido y el THD+N permanece bajo (≈0.01 %).

### Conclusión del análisis
El orden *EQ → Ganancia → Limitador* brinda mayor control porque la ganancia se aplica a una señal ya equilibrada espectralmente, evitando que los refuerzos de frecuencia generen picos inesperados antes del limitador. El orden inverso tiende a forzar al limitador a trabajar más agresivamente, lo que puede introducir artefactos audibles y reducir la claridad de los transitorios. Esta conclusión se sustenta en la observación directa de los medidores y en la comparación de la forma de onda antes y después del limitador.

### Relación con lecciones previas
- **Lección 44** mostró cómo la pendiente del filtro afecta la respuesta transitoria; aquí vemos que esa misma pendiente, cuando se combina con ganancia, determina la magnitud de los picos que alcanzan el limitador.
- **Lección 45** explicó aliasing y limitaciones de remuestreo; el limitador actúa como un “guardia” contra picos que podrían generar sobrecarga digital, análogamente a cómo un filtro anti‑alias protege contra artefactos de muestreo.

Al comprender el impacto del orden, el alumno está preparado para diseñar cadenas DSP más predecibles en la siguiente lección, donde se construirá una cadena controlada y se medirá su rendimiento de forma sistemática.

## Práctica

#### Objetivo de la práctica
Reproducir una pista de referencia, aplicar dos configuraciones de cadena DSP distintas y registrar los resultados en los medidores de Roon y foobar2000. El alumno verificará que la posición de la ganancia relativa a la EQ y al limitador modifica tanto el nivel de pico como la distorsión percibida.

#### Material necesario
- Archivo WAV de 16 bit/44.1 kHz que contenga un tono continuo de 1 kHz a -12 dBFS y un pulso de 10 ms a +0 dBFS cada 5 s (puede descargarse desde un repositorio de pruebas de audio libre).
- Instalación reciente de Roon y foobar2000 con los módulos DSP estándar (Parametric EQ y Limiter).

#### Paso a paso
1. **Cargar la pista** en la lista de reproducción de Roon y en la cola de foobar2000.
2. **Crear la primera cadena**: en Roon, abra *Settings → Audio → DSP* y añada en este orden: *Gain* (+6 dB), *Parametric EQ* (boost +4 dB a 3 kHz, Q = 1.0), *Limiter* (threshold -1 dBFS, attack 5 ms, release 50 ms). En foobar2000, abra *File → Preferences → Playback → DSP Manager* y añada los mismos módulos en el mismo orden.
3. **Reproducir la pista** y observe los medidores de pico y RMS en ambas aplicaciones. Anote los valores máximos de pico (dBFS) y RMS (dBFS). Si dispone de un analizador de espectro, capture la forma de onda de los picos del pulso.
4. **Crear la segunda cadena**: elimine la ganancia inicial y, después de la EQ, añada un control de volumen global de +6 dB (en Roon, *Volume*; en foobar2000, *Gain* al final de la cadena). Mantenga el mismo EQ y limitador.
5. **Reproducir nuevamente** la pista bajo la nueva configuración. Registre los mismos indicadores de nivel.
6. **Comparar resultados**: construya una tabla con columnas *Configuración*, *Pico (dBFS)*, *RMS (dBFS)*, *THD+N estimado* (si el analizador lo muestra). Analice la diferencia entre ambas configuraciones y describa cómo el orden ha afectado la actividad del limitador.
7. **Escucha crítica**: con audífonos o altavoces de referencia, preste atención a la claridad de los transitorios del pulso y a cualquier signo de “bombeo” del limitador. Anote observaciones cualitativas (por ejemplo, “el pulso suena más aplastado en la configuración 1”).

#### Entregable
Redacte un breve informe (máximo 300 palabras) que incluya la tabla comparativa, la interpretación de los números y una conclusión sobre cuál orden favorece una señal más transparente para la escucha crítica. Adjunte el informe a la plataforma del curso o envíelo por correo electrónico al instructor.

#### Sugerencias adicionales
- Si su hardware permite la visualización de la forma de onda en tiempo real, capture una captura de pantalla para ilustrar la diferencia.
- Repita la prueba con una señal de música real (por ejemplo, una canción con pasajes dinámicos) para observar cómo el efecto se traslada a contenido musical.
- Mantenga el nivel de salida del DAC por debajo de 0 dBFS en ambos casos para evitar clipping externo.

## Comprobaciones

1. ¿Qué ocurre con el nivel de pico cuando la ganancia se coloca antes de la EQ y el limitador?
Respuesta: El nivel de pico aumenta porque la ganancia eleva toda la señal, incluidos los refuerzos de la EQ, lo que provoca que el limitador se active con mayor frecuencia y reduzca la señal de forma más agresiva.
2. ¿Por qué la configuración EQ → Ganancia → Limitador tiende a producir menos distorsión audible?
Respuesta: Porque la ganancia se aplica a una señal ya filtrada, evitando que los picos creados por la EQ excedan el umbral del limitador; así el limitador actúa solo sobre los picos reales y mantiene una reducción de ganancia más suave, reduciendo la generación de artefactos.

## Cierre

Esta lección ha demostrado que el orden de los módulos DSP influye directamente en la dinámica y la claridad de la señal. El siguiente paso consistirá en construir una cadena DSP controlada, donde cada módulo se parametrizará y se medirá su impacto de forma sistemática. La práctica anterior servirá como referencia para validar los resultados de la cadena más compleja.
