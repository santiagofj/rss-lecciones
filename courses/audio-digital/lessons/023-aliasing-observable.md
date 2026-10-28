---
schemaVersion: 1
id: 3434ac74-fcde-4960-9792-6fd27ee32171
sequence: 23
course: audio-digital
stepId: aliasing-observable
title: Reconocer aliasing
publishedAt: 2026-10-28T09:26:14.078Z
generationDate: 2026-10-28
summary: Esta lección aborda el aliasing, un artefacto que surge al muestrear
  señales de audio digital de forma inadecuada. Aprenderá a predecir la
  frecuencia aparente de una señal muestreada incorrectamente, comparando tablas
  y gráficos para identificar la ambigüedad. Se explicará por qué la profundidad
  de bits no resuelve este problema y cómo identificarlo en la práctica. El
  objetivo es proporcionar una comprensión observable del aliasing, fundamental
  para el diagnóstico preciso en sistemas de audio digital y para la
  configuración adecuada en Roon y foobar2000, asegurando la fidelidad de la…
generation:
  model: gemini-2.5-flash
  promptVersion: v3
  contextHash: d2b47f22d7fab8bdeea4adfaf2649c5bf4ebe6c86e4e9cfac628debec03bc3cd
---

## Por qué ahora
En las lecciones anteriores, hemos establecido que una señal digital se construye a partir de muestras de amplitud y que la frecuencia de muestreo determina el ancho de banda máximo que puede representarse fielmente. Específicamente, la Lección 22 detalló cómo la frecuencia de muestreo impone un límite superior a las frecuencias que pueden ser capturadas sin ambigüedad. Sin embargo, cuando una señal contiene componentes de frecuencia que exceden la mitad de la frecuencia de muestreo, se produce un fenómeno conocido como aliasing. Este artefacto es una distorsión que genera frecuencias espurias dentro del rango audible, las cuales no estaban presentes en la señal original. Comprender y reconocer el aliasing es crucial para diagnosticar problemas en la cadena de audio digital y asegurar que la señal que se procesa y reproduce sea una representación fiel del original. Esta lección le permitirá predecir la frecuencia aparente de una señal muestreada inadecuadamente, un paso esencial para identificar la causa de ciertas anomalías en la reproducción.

## Explicación y ejemplo
El aliasing ocurre cuando una señal analógica contiene frecuencias superiores a la mitad de la frecuencia de muestreo (conocida como frecuencia de Nyquist) y no se filtra adecuadamente antes de la conversión analógico-digital. Cuando esto sucede, las frecuencias que superan el límite de Nyquist se "reflejan" hacia abajo en el espectro de frecuencias, apareciendo como frecuencias más bajas que sí pueden ser representadas por la frecuencia de muestreo. Estas frecuencias reflejadas son artefactos y no forman parte de la señal original.

Consideremos un ejemplo práctico. Si la frecuencia de muestreo es de 44.1 kHz, la frecuencia de Nyquist es de 22.05 kHz. Esto significa que cualquier frecuencia por encima de 22.05 kHz, si no se filtra, puede causar aliasing. Supongamos que tenemos una señal analógica con un componente de 25 kHz que se muestrea a 44.1 kHz.

Para predecir la frecuencia aparente (alias) de una señal que excede la frecuencia de Nyquist, se utiliza la siguiente relación:

Frecuencia aparente = |Frecuencia de muestreo - Frecuencia de la señal original|

En nuestro ejemplo:
Frecuencia de muestreo = 44.1 kHz
Frecuencia de la señal original = 25 kHz

Frecuencia aparente = |44.1 kHz - 25 kHz| = 19.1 kHz

Esto significa que la señal de 25 kHz, al ser muestreada a 44.1 kHz sin un filtro anti-aliasing adecuado, aparecerá como una señal de 19.1 kHz en el dominio digital. Esta frecuencia de 19.1 kHz es un artefacto, una imagen falsa de la señal original, y se sumará a cualquier contenido real de 19.1 kHz que pudiera existir en la señal. La ambigüedad radica en que una frecuencia de 19.1 kHz y una de 25 kHz (o 63.2 kHz, etc.) pueden producir la misma secuencia de muestras cuando la frecuencia de muestreo es 44.1 kHz. La información de la frecuencia original se pierde y se reemplaza por una frecuencia incorrecta.

Para visualizar esto, imagine una tabla de muestras. Si una onda sinusoidal de 19.1 kHz y otra de 25 kHz se muestrean a 44.1 kHz, los puntos de muestreo (las amplitudes en cada instante de muestreo) pueden coincidir para ambas ondas, haciendo imposible distinguirlas una vez digitalizadas. Esto es lo que genera la ambigüedad. La única forma de evitar que la señal de 25 kHz se convierta en 19.1 kHz es filtrarla antes del muestreo, eliminando las frecuencias por encima de 22.05 kHz.

Es importante destacar que cambiar la profundidad de bits (por ejemplo, de 16 a 24 bits) no resolverá el problema del aliasing. La profundidad de bits se refiere a la resolución de amplitud de cada muestra, es decir, cuántos valores discretos puede tomar la amplitud de la señal. El aliasing, en cambio, es un problema de frecuencia, relacionado con la cantidad de muestras por unidad de tiempo y la relación entre la frecuencia de la señal y la frecuencia de muestreo. Aumentar la profundidad de bits mejoraría la relación señal/ruido y la resolución de los niveles de amplitud, pero no alteraría la forma en que las frecuencias por encima de Nyquist se reflejan en el espectro digital. El aliasing es una consecuencia directa de la frecuencia de muestreo y la presencia de componentes de alta frecuencia en la señal analógica de entrada, no de la resolución de amplitud.

## Práctica
Para observar el concepto de aliasing, aunque no podamos generarlo directamente con Roon o foobar2000 (ya que estos reproducen archivos digitales que ya han pasado por un proceso de muestreo), podemos simular la predicción de frecuencias aparentes y comprender su impacto.

Considere los siguientes escenarios de muestreo inadecuado:

**Escenario 1:** Una señal analógica contiene un componente de 28 kHz. Se muestrea a 44.1 kHz.
**Escenario 2:** Una señal analógica contiene un componente de 35 kHz. Se muestrea a 48 kHz.
**Escenario 3:** Una señal analógica contiene un componente de 12 kHz. Se muestrea a 22.05 kHz.

Para cada escenario, realice lo siguiente:

1.  **Identifique la frecuencia de Nyquist:** Determine la mitad de la frecuencia de muestreo para cada caso.
2.  **Determine si hay aliasing:** Compare la frecuencia del componente de la señal original con la frecuencia de Nyquist. Si la frecuencia de la señal es mayor, habrá aliasing.
3.  **Calcule la frecuencia aparente (alias):** Si hay aliasing, utilice la fórmula `|Frecuencia de muestreo - Frecuencia de la señal original|` para predecir la frecuencia a la que aparecerá el artefacto en el dominio digital.

**Ejemplo de cálculo para el Escenario 1:**
*   Frecuencia de muestreo: 44.1 kHz
*   Frecuencia de Nyquist: 44.1 kHz / 2 = 22.05 kHz
*   Frecuencia de la señal original: 28 kHz
*   ¿Hay aliasing? Sí, porque 28 kHz > 22.05 kHz.
*   Frecuencia aparente: |44.1 kHz - 28 kHz| = 16.1 kHz

Este ejercicio le permite practicar la predicción de frecuencias de aliasing. Aunque no esté generando el aliasing en tiempo real, la comprensión de cómo se calculan estas frecuencias es fundamental para interpretar las especificaciones de los equipos y para entender por qué ciertos filtros son necesarios en la etapa de conversión analógico-digital. En Roon o foobar2000, si se reproduce un archivo que fue grabado con aliasing, este artefacto ya estará presente en el archivo digital y se reproducirá como parte de la señal, sin que los reproductores puedan corregirlo. La única forma de evitarlo es en la etapa de captura.

## Comprobaciones
1.  Una señal analógica contiene un componente de 30 kHz. Si se muestrea a 44.1 kHz sin un filtro anti-aliasing adecuado, ¿cuál será la frecuencia aparente de este componente en el dominio digital?
Respuesta: 14.1 kHz
2.  Si una grabación presenta aliasing, ¿cambiar la profundidad de bits del archivo digital (por ejemplo, de 16 a 24 bits) resolverá el problema de las frecuencias espurias?
Respuesta: No, la profundidad de bits no resuelve el aliasing, ya que este es un problema de frecuencia, no de resolución de amplitud.

## Cierre
Hemos explorado cómo las frecuencias que exceden la mitad de la frecuencia de muestreo pueden generar artefactos conocidos como aliasing, y cómo predecir su frecuencia aparente. Esta comprensión es fundamental para el diagnóstico de la fidelidad de una señal digital. En la próxima lección, abordaremos la solución a este problema, explicando por qué es indispensable filtrar la señal antes de muestrearla para evitar la aparición de estas frecuencias espurias.
