---
schemaVersion: 1
id: 8b82d57e-0201-460a-928a-8b7265c86a58
sequence: 42
course: audio-digital
stepId: coma-flotante-audio
title: Entender el margen de procesamiento
publishedAt: 2026-11-19T13:16:53.200Z
generationDate: 2026-11-16
summary: Esta lección muestra cómo la representación interna en coma flotante
  permite valores por encima del rango PCM y cómo la saturación ocurre en la
  primera etapa que limita la señal. Se analizan cálculos paso a paso para
  distinguir entre ganancia interna y recorte de salida, preparando al alumno
  para el siguiente tema sobre ecualización paramétrica.
generation:
  model: openai/gpt-oss-120b
  promptVersion: v5
  contextHash: aafb783825fa9c35db61c39f015ebb58730573f65a2894a4aff36c457940abb2
---

## Por qué ahora

En la cadena de reproducción digital, cada bloque de procesamiento trabaja con un rango numérico distinto. Cuando la señal interna supera los límites de salida, el recorte audible no se produce en el punto donde el número excede 1, sino en la primera etapa que impone una restricción concreta, como la conversión a PCM de 16 bits. Comprender este margen es esencial antes de añadir ecualizadores o limitadores, porque una ganancia mal situada puede generar distorsión antes de que el usuario perciba cualquier cambio. Además, el conocimiento de dónde ocurre la saturación permite diagnosticar problemas de margen de ganancia sin recurrir a mediciones complejas en Roon o foobar2000, manteniendo el enfoque práctico que ha guiado el curso hasta ahora.

## Explicación y ejemplo

### Representación interna y rango de salida

En la mayoría de los reproductores y bibliotecas de audio, la señal se procesa primero en **coma flotante de 32 bits** (o 64 bits en algunos algoritmos). Este formato permite valores numéricos en un rango mucho mayor que el intervalo **‑1 .. +1** que define el nivel máximo que puede representar un flujo PCM sin recorte. El rango interno no tiene un límite fijo; los valores pueden superar 1,0 y permanecer válidos mientras no se conviertan a una forma que sí lo requiera.

### Cadena de ejemplo genérica

Consideremos una cadena simplificada:

1. **Muestra original**: una señal normalizada con pico máximo `0,8`.
2. **Ganancia interna**: se aplica una multiplicación por `1,5`.
3. **Resultado interno**: `0,8 × 1,5 = 1,2`.
4. **Atenuación opcional**: se puede aplicar una reducción de `0,5` (‑6 dB) antes o después de la etapa de saturación.
5. **Conversión a PCM**: la señal debe quedar dentro de `‑1 .. +1`. Si el valor supera este rango, la etapa de conversión lo **satura** a `‑1` o `+1`.

#### Caso A – Atenuación antes de la saturación

```
Valor interno = 0,8 × 1,5 = 1,2
Atenuación (0,5) → 1,2 × 0,5 = 0,6
Conversión PCM → 0,6 (dentro del rango, sin recorte)
```

El valor final que llega al DAC es `0,6`. No se produce recorte porque la reducción se aplicó mientras la señal todavía estaba en coma flotante.

#### Caso B – Atenuación después de la saturación

```
Valor interno = 0,8 × 1,5 = 1,2
Conversión PCM → saturación a +1
Atenuación (0,5) → 1 × 0,5 = 0,5
```

En este flujo, la señal **se saturó** antes de la atenuación. El recorte ya ocurrió, y la atenuación posterior solo reduce el nivel de un sonido ya distorsionado. El resultado audible es `0,5`, pero la distorsión generada por la saturación permanece.

### Por qué la unidad interna no implica recorte

El algoritmo de conversión a PCM incluye un paso de **clipping** que trunca cualquier valor fuera del rango permitido. Mientras la señal se mantenga en coma flotante, valores como `1,2` son perfectamente válidos y pueden ser útiles para cálculos posteriores (por ejemplo, aplicar un filtro que reduzca picos). Sólo al entrar en la etapa que escribe los datos al DAC se evalúa el rango y, de ser necesario, se aplica el recorte.

### Implicaciones prácticas

* **Orden de los procesos**: aplicar ganancia, filtrado o atenuación antes de la conversión permite preservar la integridad de la señal. Cambiar el orden puede introducir recorte irreversible.
* **Margen de cabeza**: mantener una **cabeza de margen** de al menos `0,2` (es decir, que el pico interno no supere `1,2`) brinda espacio para pequeñas variaciones sin riesgo de saturación.
* **Diagnóstico visual**: al representar la cadena en papel, el alumno puede identificar rápidamente en qué bloque se produce la saturación simplemente siguiendo el flujo numérico.

### Relación con lecciones anteriores

En la Lección 41 se describió cómo la ganancia digital modifica los valores de muestra y cómo revertirla. Aquí se amplía esa idea, mostrando que la ganancia también cambia el **rango interno** y que el punto de saturación depende del orden de los bloques posteriores. La comprensión de este margen será la base para ajustar un ecualizador paramétrico sin provocar recorte inesperado.

### Resumen numérico

| Paso | Operación | Valor interno | Comentario |
|------|-----------|---------------|------------|
| 1 | Muestra original | 0,8 | Dentro del rango |
| 2 | Ganancia ×1,5 | 1,2 | Supera 1,0, pero aún en coma flotante |
| 3a | Atenuación ×0,5 (antes) | 0,6 | No se saturará |
| 3b | Saturación a ±1 (antes) | 1,0 | Recorte ocurre |
| 4b | Atenuación ×0,5 (después) | 0,5 | Señal ya recortada |

Este cuadro permite comparar directamente ambos caminos y observar que el **momento** de la atenuación determina si el recorte se evita o no.

### Conclusión del cálculo

El margen de procesamiento se define por la posición de la etapa de **limitación** dentro de la cadena. Mantener la atenuación o cualquier otro proceso de reducción de nivel **antes** de la conversión a PCM protege la señal de recorte; hacerlo después solo reduce el nivel de una señal ya distorsionada.

## Práctica

**Objetivo de la práctica**

Reproduzca mentalmente la cadena descrita en la sección de explicación y verifique cada paso con papel y calculadora. Siga los siguientes pasos:

1. Anote una muestra de referencia con pico `0,8`.
2. Aplique una ganancia de `1,5` y registre el resultado.
3. Realice dos cálculos paralelos:
   * **Ruta A**: aplique una atenuación de `0,5` antes de la saturación y calcule el valor final.
   * **Ruta B**: aplique la saturación a `±1` primero y, después, la atenuación de `0,5`.
4. Compare los valores finales y describa cuál de los dos caminos mantiene la señal sin recorte.
5. Repita el experimento variando la ganancia (por ejemplo, `1,2` o `2,0`) y la atenuación (por ejemplo, `0,7`). Anote cuándo ocurre la saturación en cada caso.

**Entrega**

Prepare un documento breve (puede ser un archivo de texto) que incluya:

* Tabla con los valores intermedios y finales para cada variante de ganancia y atenuación.
* Una frase que indique cuál es el punto de saturación en cada variante.

Este ejercicio refuerza la capacidad de anticipar el margen de procesamiento sin necesidad de mediciones en Roon o foobar2000, cumpliendo con el requisito de trabajar únicamente con cálculos manuales.

## Comprobaciones

1. ¿Cuál es el valor final de la señal si se aplica la ganancia de 1,5, luego la atenuación de 0,5 antes de la saturación?
Respuesta: 0,6.
2. ¿Qué ocurre con la señal si la atenuación de 0,5 se aplica después de la saturación?
Respuesta: La señal se saturó a 1,0 y luego se atenúa a 0,5, por lo que el recorte ya ha ocurrido.

## Cierre

El análisis muestra que el orden de los bloques determina si el recorte es evitado o inevitable. Mantener la atenuación antes de la conversión a PCM protege la integridad de la señal. En la siguiente lección se abordará cómo un ecualizador paramétrico interactúa con este margen y cómo ajustar sus filtros sin provocar saturación inesperada.
