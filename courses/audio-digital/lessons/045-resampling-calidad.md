---
schemaVersion: 1
id: 602310ac-8ec0-4db9-82d8-8a506ecc62c3
sequence: 45
course: audio-digital
stepId: resampling-calidad
title: Evaluar una conversión de frecuencia
publishedAt: 2026-11-19T13:24:36.400Z
generationDate: 2026-11-19
summary: En esta lección el alumno aprende a identificar los efectos de
  filtrado, aliasing y limitaciones de una prueba de remuestreo, utilizando Roon
  y foobar2000 para obtener evidencia reproducible sin depender de relaciones de
  múltiplos enteros entre tasas de muestreo.
generation:
  model: openai/gpt-oss-120b
  promptVersion: v5
  contextHash: 7ada8d9c799e6aa12c62b5a197565e30385e40364bd89ec499c2403f2de4071c
---

## Por qué ahora

Después de haber analizado la gestión del margen de procesamiento y la respuesta de filtros paramétricos, el alumno está preparado para observar cómo la cadena de conversión de frecuencia afecta la señal antes de cualquier ecualización. Detectar filtrado insuficiente o aliasing permite decidir si un proceso posterior, como la ordenación del flujo de audio, necesita ajustes de tasa de muestreo o de filtro anti‑alias. La capacidad de diagnosticar estas limitaciones en tiempo real mejora la confianza al configurar bibliotecas de alta resolución en Roon y listas de reproducción en foobar2000, y evita la propagación de errores a etapas posteriores del procesamiento.

## Explicación y ejemplo

### Fundamento del remuestreo
El remuestreo consiste en cambiar la tasa de muestreo de una señal digital. El proceso típico incluye tres pasos: (1) filtrado anti‑alias, (2) interpolación (inserción de muestras) y (3) decimación (eliminación de muestras). El filtro anti‑alias debe atenuar todas las componentes por encima de la mitad de la nueva tasa (nyquist) para evitar que se plieguen dentro del espectro audible.

### Problema observable
Supongamos que una pista de música de 24 bit/96 kHz se reproduce en foobar2000 configurado para convertir a 44.1 kHz antes de enviarla a Roon. Si el filtro de anti‑alias aplicado por foobar2000 tiene una caída de -3 dB a 20 kHz y una pendiente de 12 dB/octava, las frecuencias entre 20 kHz y 22.05 kHz (nyquist de 44.1 kHz) no están suficientemente atenuadas. El resultado es que componentes cercanas a 22 kHz pueden reflejarse como alias en torno a 2 kHz, creando un zumbido sutil perceptible en material con contenido armónico extendido.

### Cálculo de límite de aliasing
La frecuencia de alias f_a se calcula como:

```
f_a = |f_original - N·f_target|
```

donde f_original es la frecuencia de la componente, f_target la tasa de muestreo objetivo y N el entero que hace que la diferencia sea mínima. Por ejemplo, una componente de 21 kHz en la señal original (96 kHz) al remuestrear a 44.1 kHz produce:

```N = round(21 kHz / 44.1 kHz) = 0
f_a = |21 kHz - 0·44.1 kHz| = 21 kHz  (fuera de rango)
```

Sin embargo, la componente que realmente genera alias es la que se refleja alrededor del nyquist:

```_alias = |f_original - 2·f_target| = |21 kHz - 2·44.1 kHz| = |21 kHz - 88.2 kHz| = 67.2 kHz
```

Como 67.2 kHz está por encima del rango audible, la energía se pliega en la banda audible en una frecuencia equivalente a:

```_observable = |f_target - f_alias| = |44.1 kHz - 67.2 kHz| = 23.1 kHz
```

En la práctica, la atenuación del filtro determina cuánto de esa energía llega al DAC. Un filtro con -12 dB/octava deja alrededor de -6 dB de energía a 22 kHz, suficiente para generar un artefacto audible en equipos críticos.

### Configuración reproducible en foobar2000 y Roon
1. **foobar2000**: En "Preferences → Playback → Resampling" seleccionar "SRC (libsamplerate)" y fijar la tasa a 44.1 kHz. Activar la opción "Enable FIR anti‑alias filter" y establecer la longitud del filtro a 64 taps (aprox. 12 dB/octava).
2. **Roon**: En "Settings → Audio → Playback Settings" establecer "Resampling" a 44.1 kHz y escoger el algoritmo "Linear Phase" con 8 ms de retardo, lo que corresponde a un filtro de aproximadamente 96 taps.

Con ambas herramientas activas, reproducir la misma pista y observar la forma de onda en el analizador de espectro integrado (por ejemplo, el plugin "Spectrum Analyzer" en foobar2000). Marcar la frecuencia de nyquist (22 kHz) y buscar picos o distorsiones en la zona 2‑5 kHz que indiquen aliasing.

### Interpretación de los resultados
- **Sin picos significativos**: El filtro anti‑alias está proporcionando suficiente atenuación; la conversión es aceptable para el flujo de trabajo actual.
- **Picos visibles**: Indican que la pendiente del filtro o la longitud de taps es insuficiente; se debe aumentar la calidad del filtro o elegir una tasa de muestreo objetivo que reduzca la distancia entre nyquist y las componentes altas del material.

Este enfoque permite al alumno diagnosticar de forma objetiva la calidad de la conversión sin asumir que una relación entera entre tasas garantiza ausencia de aliasing.

## Práctica

### Tarea práctica
1. Seleccionar una pista con contenido armónico amplio, por ejemplo una grabación de piano solo o una pieza de música electrónica que incluya frecuencias superiores a 18 kHz. Abrir la pista en foobar2000.
2. Configurar foobar2000 para reproducir la pista a 44.1 kHz usando el algoritmo SRC y habilitar el filtro FIR de 64 taps. Anotar la configuración exacta.
3. Activar el visualizador de espectro de foobar2000 y capturar una captura de pantalla que muestre la zona de 0‑25 kHz durante una sección estable de la pista.
4. Repetir los pasos 2‑3, pero cambiando la longitud del filtro a 128 taps (aprox. 24 dB/octava). Capturar nuevamente la vista de espectro.
5. Comparar ambas capturas: observar si aparecen o desaparecen picos en el rango 2‑5 kHz.
6. Documentar la observación en un breve informe de una página, indicando cuál configuración mostró menos evidencia de aliasing y proponiendo una posible razón basada en la pendiente del filtro.

### Extensión opcional para Roon
Si el alumno dispone de Roon, reproducir la misma pista con la misma tasa de muestreo (44.1 kHz) y seleccionar el algoritmo "Linear Phase" con 8 ms y 96 taps. Capturar el espectro con la herramienta de análisis integrada y comparar con los resultados de foobar2000. Registrar cualquier diferencia relevante.

Esta práctica brinda evidencia visual y cuantitativa que el alumno puede reproducir de forma independiente, consolidando la comprensión del proceso de filtrado y aliasing en la conversión de frecuencia.

## Comprobaciones

1. ¿Qué frecuencia representa el nyquist cuando la tasa de muestreo es 44.1 kHz?
Respuesta: 22.05 kHz.
2. Si una componente de 21 kHz no está suficientemente atenuada antes del remuestreo a 44.1 kHz, ¿en qué rango de frecuencias audibles puede aparecer como alias?
Respuesta: Aproximadamente entre 2 kHz y 5 kHz, dependiendo de la caída del filtro y la posición exacta de la componente original.

## Cierre

El diagnóstico realizado confirma si la cadena de remuestreo mantiene la integridad espectral antes de aplicar procesos de ecualización o dinámica. El siguiente paso consistirá en decidir el orden óptimo de los procesos de filtrado, conversión y ajuste de ganancia, para evitar que decisiones posteriores introduzcan distorsiones evitables.
