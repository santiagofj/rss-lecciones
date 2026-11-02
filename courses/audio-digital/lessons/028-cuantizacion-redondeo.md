---
schemaVersion: 1
id: 286f3e72-513c-4a4a-9a9b-447e846e5195
sequence: 28
course: audio-digital
stepId: cuantizacion-redondeo
title: Representar amplitudes con valores finitos
publishedAt: 2026-11-02T10:42:37.198Z
generationDate: 2026-11-02
summary: Esta lección aborda la conversión de amplitudes continuas a valores
  discretos en audio digital. Se explica cómo un número finito de niveles de
  cuantización introduce un error inherente al redondear la señal original. A
  través de un ejemplo práctico con pocos niveles, se calcula y se analiza este
  error, diferenciando la precisión de amplitud de la precisión temporal. El
  objetivo es comprender la naturaleza de la cuantización y su impacto en la
  representación de la señal antes de explorar resoluciones mayores o la
  audibilidad del error.
generation:
  model: gemini-2.5-flash
  promptVersion: v3
  contextHash: 89936d38657c9351d590e53ca54df2294636402c9456a8f1059a8621854ae649
---

## Por qué ahora
Las lecciones anteriores se enfocaron en la representación temporal de la señal de audio, es decir, cómo se toman muestras a intervalos regulares para capturar la forma de onda. Se analizó la reconstrucción de la señal analógica a partir de estas muestras y la importancia de la frecuencia de muestreo para evitar artefactos como el aliasing. Sin embargo, la captura de audio digital no solo implica decidir *cuándo* tomar una muestra, sino también *cómo* representar su amplitud en ese instante. Una señal analógica tiene una amplitud que puede tomar infinitos valores dentro de un rango determinado. Un sistema digital, por su naturaleza, solo puede manejar un número finito de valores. Esta lección aborda el proceso de convertir esas amplitudes continuas en valores discretos, un paso fundamental que introduce un tipo específico de error en la señal. Comprender este error es crucial para diagnosticar problemas y evaluar la fidelidad del audio digital, especialmente porque la cuantización y el dither han generado confusión en etapas previas del curso.

## Explicación y ejemplo
Cuando una señal analógica se convierte a formato digital, no solo se muestrea en el tiempo, sino que también se cuantifica en amplitud. Esto significa que cada valor de amplitud de la muestra se asigna al nivel discreto más cercano disponible dentro de un conjunto finito de opciones. Este proceso de asignación o redondeo introduce un error, conocido como error de cuantización. Para ilustrarlo, consideremos un sistema de cuantización muy simple, con un rango de amplitud que va de -1.0 a +1.0 y que solo puede representar cuatro niveles discretos de amplitud. Estos niveles podrían ser, por ejemplo, -0.75, -0.25, +0.25 y +0.75.

Imaginemos que en un instante dado, la amplitud de la señal analógica es de +0.37. Dado que nuestro sistema solo puede representar cuatro valores, debemos redondear +0.37 al nivel discreto más cercano. Los niveles disponibles son -0.75, -0.25, +0.25 y +0.75.

Para determinar el nivel más cercano, podemos calcular la distancia entre +0.37 y cada nivel:
*   Distancia a -0.75: |+0.37 - (-0.75)| = |+0.37 + 0.75| = 1.12
*   Distancia a -0.25: |+0.37 - (-0.25)| = |+0.37 + 0.25| = 0.62
*   Distancia a +0.25: |+0.37 - (+0.25)| = |+0.37 - 0.25| = 0.12
*   Distancia a +0.75: |+0.37 - (+0.75)| = |+0.37 - 0.75| = |-0.38| = 0.38

El nivel discreto más cercano a +0.37 es +0.25, ya que la distancia es 0.12, la menor de todas. Por lo tanto, la amplitud de +0.37 se cuantifica como +0.25.

El error de cuantización para esta muestra específica se calcula como la diferencia entre la amplitud original y la amplitud cuantificada:
Error de cuantización = Amplitud original - Amplitud cuantificada
Error de cuantización = +0.37 - (+0.25) = +0.12

Este error de +0.12 es la diferencia entre el valor real de la señal en ese instante y el valor que el sistema digital puede representar. Es importante notar que este error es inherente al proceso de cuantización; no es un fallo del equipo, sino una consecuencia de representar un continuo con un conjunto finito de valores. Cada muestra de la señal analógica se someterá a este proceso de redondeo, y cada una tendrá su propio error de cuantización. La magnitud de este error depende de la cantidad de niveles discretos disponibles: cuantos más niveles, menor será la distancia entre ellos y, en promedio, menor será el error de cuantización. Este concepto de precisión de amplitud es distinto de la precisión temporal, que se define por la frecuencia de muestreo. Mientras que la frecuencia de muestreo determina cuántas veces por segundo se mide la señal, la cuantización determina con qué precisión se registra cada una de esas mediciones de amplitud.

## Práctica
Para consolidar la comprensión del error de cuantización, realice el siguiente ejercicio de cálculo. Considere un sistema de cuantización con un rango de amplitud de 0.0 a 1.0, que puede representar cinco niveles discretos de amplitud. Estos niveles son: 0.0, 0.25, 0.50, 0.75 y 1.0.

Ahora, imagine que en un instante dado, la amplitud de la señal analógica es de 0.68.

1.  Determine cuál de los cinco niveles discretos (0.0, 0.25, 0.50, 0.75, 1.0) es el más cercano a la amplitud analógica de 0.68. Para ello, calcule la distancia absoluta entre 0.68 y cada uno de los niveles disponibles.
2.  Una vez identificado el nivel cuantificado, calcule el error de cuantización resultante para esta muestra. Exprese el error como la diferencia entre la amplitud original y la amplitud cuantificada.

Este ejercicio le permitirá observar directamente cómo una amplitud continua se ajusta a un valor discreto y cómo se genera el error asociado. La práctica de este cálculo manual es fundamental antes de abordar sistemas con mayor cantidad de bits, donde el número de niveles discretos es exponencialmente mayor, pero el principio subyacente es idéntico.

## Comprobaciones
1.  ¿Cuál es el nivel discreto más cercano a una amplitud analógica de 0.68 en un sistema con niveles 0.0, 0.25, 0.50, 0.75 y 1.0?
Respuesta: El nivel discreto más cercano es 0.75.
2.  ¿Cuál es el error de cuantización resultante para esta muestra?
Respuesta: El error de cuantización es -0.07 (0.68 - 0.75).

## Cierre
Hemos establecido que la representación de amplitudes continuas con valores finitos introduce un error inherente. Este error de cuantización es una característica fundamental del audio digital. En la próxima lección, exploraremos cómo este error se manifiesta en la señal de audio y cómo podemos comenzar a interpretarlo. Comprender su naturaleza es el primer paso para diagnosticar su impacto.
