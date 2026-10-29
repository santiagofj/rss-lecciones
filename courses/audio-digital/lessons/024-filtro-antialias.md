---
schemaVersion: 1
id: 2e166768-17c6-4d6a-a0d6-28599bfd46bd
sequence: 24
course: audio-digital
stepId: filtro-antialias
title: Por qué se filtra antes de muestrear
publishedAt: 2026-10-29T09:37:37.365Z
generationDate: 2026-10-29
summary: Esta lección aborda la necesidad crítica de filtrar las señales de
  audio analógicas antes de su conversión a formato digital. Se explica cómo las
  frecuencias por encima del límite de Nyquist pueden generar aliasing, un
  artefacto irreversible que se incorpora a la señal digital si no se eliminan
  previamente. A través de un ejemplo práctico, se demuestra que el filtrado
  posterior a la conversión no puede corregir el aliasing ya presente. El
  objetivo es comprender la función del filtro antialiasing en la cadena de
  audio digital y su impacto en la fidelidad de la señal, sentando las bases
  para un…
generation:
  model: gemini-2.5-flash
  promptVersion: v3
  contextHash: 462de0152248d03f48712497694ba76ef3de473c0075107d033cc8ceec6623e4
---

## Por qué ahora
En lecciones anteriores, hemos establecido que una muestra representa la amplitud de una señal en un instante específico y que la frecuencia de muestreo determina el ancho de banda máximo que puede ser representado fielmente. También hemos identificado el aliasing como un artefacto que surge cuando una señal contiene componentes de frecuencia superiores a la mitad de la frecuencia de muestreo, el límite de Nyquist. Este fenómeno genera frecuencias espurias que se reflejan dentro del ancho de banda audible, alterando la señal original de manera irreversible. La comprensión de cómo se forma el aliasing nos lleva a la pregunta fundamental de cómo prevenirlo. Esta lección se enfoca en la solución a este problema: el filtrado previo al muestreo, una etapa esencial en cualquier conversión analógico-digital para asegurar la integridad de la señal y evitar la introducción de artefactos que comprometan la fidelidad del audio digital.

## Explicación y ejemplo
Cuando una señal analógica se convierte a digital, el proceso de muestreo toma instantáneas de su amplitud a intervalos regulares. Si la señal analógica contiene componentes de frecuencia que superan la mitad de la frecuencia de muestreo (el límite de Nyquist), estas frecuencias altas se "doblan" o "reflejan" hacia abajo en el espectro de frecuencias, apareciendo como frecuencias más bajas dentro del rango audible. Este es el fenómeno del aliasing que hemos estudiado. Una vez que una frecuencia fuera de banda ha sido muestreada y ha generado un alias, este alias se convierte en una parte indistinguible de la señal digital. Es decir, el sistema digital no puede diferenciar entre una frecuencia original dentro de banda y una frecuencia de alias generada por un componente fuera de banda.

Consideremos un ejemplo práctico. Supongamos que estamos muestreando una señal a 44.1 kHz. El límite de Nyquist para esta frecuencia de muestreo es 22.05 kHz. Si la señal analógica de entrada contiene un componente de 25 kHz, esta frecuencia está por encima del límite de Nyquist. Al ser muestreada, la frecuencia de 25 kHz generará un alias. La frecuencia del alias se calcula como la frecuencia de muestreo menos la frecuencia de la señal original, si esta última está entre el límite de Nyquist y la frecuencia de muestreo. En este caso, 44.1 kHz - 25 kHz = 19.1 kHz. Este componente de 19.1 kHz se incorporará a la señal digital como si fuera una frecuencia original presente en la banda audible.

Una vez que la señal digital contiene este alias de 19.1 kHz, cualquier intento de filtrado posterior en el dominio digital será ineficaz para eliminarlo sin afectar también las frecuencias legítimas cercanas. Un filtro digital diseñado para eliminar frecuencias por encima de 22.05 kHz no detectará el alias de 19.1 kHz como una anomalía, porque para el sistema digital, es simplemente una frecuencia más dentro del rango permitido. Si intentáramos aplicar un filtro digital para eliminar el 19.1 kHz, también eliminaríamos cualquier contenido musical legítimo que estuviera en esa misma frecuencia.

La única manera de prevenir la formación de aliasing es asegurar que la señal analógica no contenga componentes de frecuencia por encima del límite de Nyquist *antes* de que se realice el muestreo. Esto se logra mediante un filtro analógico pasa-bajos, conocido como filtro antialiasing, ubicado justo antes del convertidor analógico-digital (ADC). Este filtro atenúa drásticamente todas las frecuencias por encima del límite de Nyquist, garantizando que solo las frecuencias que pueden ser representadas fielmente por la frecuencia de muestreo lleguen al ADC. De esta forma, se evita que las frecuencias fuera de banda generen alias y se preserva la integridad de la señal digital.

## Práctica
Para comprender la importancia del filtrado antialiasing, podemos examinar cómo se gestionan las frecuencias en diferentes etapas de la reproducción digital, especialmente cuando se involucra una reducción de la frecuencia de muestreo. Aunque no podemos observar directamente el filtro antialiasing de un ADC, podemos inferir su función al considerar escenarios de remuestreo.

En Roon, acceda a la ruta de la señal (Signal Path) durante la reproducción. Si está reproduciendo un archivo de alta resolución (por ejemplo, 96 kHz o 192 kHz) y su dispositivo de salida está configurado para una frecuencia de muestreo más baja (por ejemplo, 44.1 kHz o 48 kHz), Roon realizará un proceso de remuestreo. Observe los módulos que Roon indica en la ruta de la señal. Roon puede mostrar un módulo de "Sample Rate Conversion" o "Resampling". Dentro de este proceso, Roon aplica un filtro digital pasa-bajos antes de reducir la frecuencia de muestreo. Este filtro digital cumple una función análoga al filtro antialiasing analógico: elimina las frecuencias que excederían el nuevo límite de Nyquist de la frecuencia de muestreo de destino, previniendo la generación de aliasing durante la reducción de la tasa de muestreo digital.

En foobar2000, puede configurar un componente de remuestreo como "Resampler (SoX)" o "PPHS Resampler" en las preferencias de reproducción (File > Preferences > Playback > DSP Manager). Si añade uno de estos componentes y lo configura para reducir la frecuencia de muestreo de su música (por ejemplo, de 96 kHz a 44.1 kHz), el remuestreador aplicará internamente un filtro pasa-bajos digital. Aunque foobar2000 no visualiza la ruta de la señal con el mismo detalle que Roon, la presencia de un remuestreador implica la aplicación de un filtro para evitar aliasing. Experimente reproduciendo un archivo de alta resolución con y sin el remuestreador activado, y observe si percibe alguna diferencia en la calidad del sonido, especialmente en las frecuencias altas. La ausencia de artefactos audibles al remuestrear correctamente es una indicación de que el filtrado se está realizando de manera efectiva.

## Comprobaciones
1. ¿Por qué un filtro digital aplicado después del muestreo no puede eliminar un alias ya incorporado en la señal digital?
Respuesta: Porque el alias se convierte en una frecuencia indistinguible de las frecuencias legítimas dentro del ancho de banda digital, y el filtro no puede diferenciar entre ellas para eliminar solo el alias.
2. ¿Cuál es el propósito principal de un filtro antialiasing en la cadena de conversión analógico-digital?
Respuesta: Eliminar las frecuencias de la señal analógica que superan el límite de Nyquist antes del muestreo, para prevenir la generación de aliasing.

## Cierre
Hemos establecido que el filtrado previo al muestreo es una etapa indispensable para preservar la integridad de la señal de audio digital, evitando la introducción de artefactos irreversibles. La comprensión de esta necesidad fundamental nos prepara para el siguiente paso, donde exploraremos cómo la señal digital, una vez muestreada y filtrada correctamente, puede ser transformada de nuevo en una onda continua. Este proceso de reconstrucción es tan crítico como el muestreo inicial para la fidelidad del audio.
