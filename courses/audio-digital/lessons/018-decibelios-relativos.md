---
schemaVersion: 1
id: aeecd7ce-da3e-4669-aced-95ba45ddd6f1
sequence: 18
course: audio-digital
stepId: decibelios-relativos
title: Entender una escala en decibelios
publishedAt: 2026-10-23T08:21:52.911Z
generationDate: 2026-10-23
summary: Esta lección aborda la interpretación de relaciones de nivel en audio
  digital utilizando la escala de decibelios. Se explica cómo los decibelios
  expresan ratios de amplitud y potencia, distinguiendo valores relativos de
  referencias absolutas. El objetivo es comprender su naturaleza logarítmica
  para un diagnóstico preciso sin tratarlos como unidades absolutas, fundamental
  para la configuración y el análisis de la señal en Roon y foobar2000.
generation:
  model: gemini-2.5-flash
  promptVersion: v3
  contextHash: 43a288e5fd90d27f6d101d833a98b7c9c721c32ccf1e567ac203447b6b1efaff
---

## Por qué ahora
En lecciones anteriores, hemos explorado la amplitud, la frecuencia, el período, la fase y la separación de canales. Estos conceptos nos permitieron comprender la naturaleza de la señal de audio digital y cómo se representa. Sin embargo, para cuantificar los cambios en el nivel de una señal o comparar su intensidad de manera significativa, necesitamos una herramienta específica. La percepción humana del sonido no es lineal; un cambio que duplica la potencia de una señal no se percibe como el doble de fuerte. Esta característica hace que las escalas lineales sean poco intuitivas para describir la intensidad sonora.

La escala de decibelios (dB) fue diseñada para reflejar esta percepción logarítmica y para expresar relaciones de nivel de manera compacta y útil. Comprender los decibelios como una medida relativa, y no como una unidad absoluta, es fundamental para diagnosticar y configurar sistemas de audio digital de forma efectiva. Esta comprensión es crucial para interpretar la evidencia visible en el software y para avanzar en el diagnóstico práctico, especialmente después de las complejidades que pudieron surgir con conceptos como la cuantización y el dither.

## Explicación y ejemplo
Cuando hablamos de la intensidad de una señal de audio, ya sea su amplitud o su potencia, a menudo necesitamos comparar un nivel con otro. Por ejemplo, ¿cuánto más fuerte es una señal que otra? Expresar estas relaciones en unidades lineales, como voltios o vatios, puede resultar engorroso debido al vasto rango dinámico del oído humano y a la naturaleza multiplicativa de los cambios de intensidad. Aquí es donde la escala de decibelios se vuelve indispensable.

Un decibelio es una unidad logarítmica que expresa la relación entre dos valores de una magnitud. La clave es que siempre representa una *relación* o un *cambio*, a menos que se especifique una referencia absoluta. Esto significa que un valor en dB por sí solo no indica un nivel absoluto, sino cuánto más grande o más pequeño es un valor respecto a otro.

Existen dos fórmulas principales para calcular decibelios, dependiendo de si estamos comparando magnitudes de potencia o de amplitud (voltaje, presión sonora, etc.).

Para relaciones de potencia (P), la fórmula es:
`dB = 10 * log10(P2 / P1)`

Donde P1 y P2 son las dos potencias que se comparan. El factor 10 se utiliza porque el bel (la unidad original de la que deriva el decibelio) se define como 10 veces el logaritmo en base 10 de la relación de potencias.

Para relaciones de amplitud (A), la fórmula es:
`dB = 20 * log10(A2 / A1)`

Aquí, A1 y A2 son las dos amplitudes que se comparan. El factor 20 se utiliza porque la potencia es proporcional al cuadrado de la amplitud (P ~ A^2). Si sustituimos A^2 en la fórmula de potencia, obtenemos `10 * log10((A2^2) / (A1^2)) = 10 * log10((A2 / A1)^2) = 10 * 2 * log10(A2 / A1) = 20 * log10(A2 / A1)`. Es fundamental recordar esta distinción: 10 para potencia, 20 para amplitud.

Consideremos un ejemplo práctico. Si tenemos una señal de audio y duplicamos su amplitud, ¿cuántos dB representa ese cambio? Usando la fórmula de amplitud:
`dB = 20 * log10(2 / 1) = 20 * log10(2)`
Dado que `log10(2)` es aproximadamente 0.301, el cálculo es:
`dB = 20 * 0.301 = 6.02 dB`

Esto significa que duplicar la amplitud de una señal resulta en un aumento de aproximadamente 6 dB. Inversamente, reducir la amplitud a la mitad resultaría en una disminución de aproximadamente -6 dB. Si, en cambio, duplicamos la *potencia* de una señal, el cambio sería:
`dB = 10 * log10(2 / 1) = 10 * log10(2) = 10 * 0.301 = 3.01 dB`

Por lo tanto, un aumento de 3 dB representa una duplicación de la potencia, mientras que un aumento de 6 dB representa una duplicación de la amplitud. Esta diferencia es crucial para interpretar las mediciones y las especificaciones técnicas. Un cambio de 10 dB, por ejemplo, representa una relación de potencia de 10:1 o una relación de amplitud de aproximadamente 3.16:1 (ya que `20 * log10(3.16) ≈ 10`).

Es importante destacar que estos valores son *relativos*. Cuando vemos un medidor que indica, por ejemplo, -12 dB, este valor es relativo a una referencia específica. Sin esa referencia, el número carece de un significado absoluto de nivel. La próxima lección abordará cómo se establecen estas referencias absolutas en el audio digital, como dBFS.

## Práctica
Para esta práctica, utilizaremos Roon o foobar2000 para observar cómo los cambios de nivel se manifiestan en los medidores y cómo podemos interpretar estas relaciones sin necesidad de cálculos complejos en tiempo real. El objetivo es desarrollar una intuición sobre los cambios de nivel en dB.

1.  **Preparación en Roon:**
    *   Seleccione una pista musical con un rango dinámico moderado. Evite pistas excesivamente comprimidas o con picos constantes.
    *   Inicie la reproducción. Abra el `Path de la señal` (el icono de la estrella junto al título de la pista en la barra de reproducción inferior). Observe los medidores de nivel de salida. Estos medidores suelen mostrar valores en dBFS (decibelios a escala completa, que exploraremos en detalle más adelante), donde 0 dBFS es el nivel máximo posible.
    *   Acceda a la configuración de volumen de su zona de reproducción. Si utiliza un control de volumen de software (como el de Roon o el de su sistema operativo), realice un cambio de volumen gradual. Por ejemplo, reduzca el volumen en un paso que le parezca significativo.
    *   Observe cómo los picos y los niveles promedio en el medidor del `Path de la señal` disminuyen. Intente estimar visualmente si el cambio es grande o pequeño. No se preocupe por el valor exacto en dBFS todavía, sino por la relación de cambio.
    *   Ahora, si su DAC o amplificador integrado tiene un medidor de nivel de entrada o salida, observe cómo se comporta con el cambio de volumen. Algunos dispositivos muestran el nivel en dB. Si es así, anote la diferencia aproximada en dB que observa en el medidor del dispositivo cuando cambia el volumen en Roon.

2.  **Preparación en foobar2000:**
    *   Cargue una pista musical en foobar2000. Asegúrese de que la interfaz muestre un medidor de picos (Peak Meter) o un medidor de nivel RMS (Root Mean Square). Si no lo tiene visible, puede añadirlo a su interfaz de usuario a través de `View > Peak Meter` o instalando un componente de visualización si es necesario.
    *   Reproduzca la pista. Observe los valores que muestra el medidor. Estos valores también estarán en dBFS.
    *   Utilice el control de volumen de foobar2000 (generalmente en la parte inferior derecha de la ventana principal). Reduzca el volumen en varios pasos discretos. Por ejemplo, baje el volumen en un 25%, luego en un 50% de su posición original.
    *   Observe cómo los valores máximos y promedio en el medidor de picos o RMS disminuyen. Note que una reducción del 50% en la posición del control deslizante de volumen no necesariamente corresponde a una reducción de 6 dB en la amplitud de la señal, ya que los controles de volumen suelen tener una respuesta logarítmica para que los cambios se perciban de manera más uniforme.
    *   El objetivo de esta práctica es familiarizarse con la idea de que los decibelios describen *cuánto* cambia un nivel, no el nivel en sí mismo. Al manipular el volumen, está aplicando un cambio en dB a la señal, incluso si el software no lo etiqueta explícitamente como tal en el control deslizante. Preste atención a la magnitud de los cambios en los medidores y cómo se relacionan con su percepción auditiva. Un cambio de 3 dB es perceptible, 6 dB es claramente audible, y 10 dB es una diferencia significativa.

## Comprobaciones
1.  Si la potencia de una señal de audio se duplica, ¿cuántos decibelios representa ese cambio?
Respuesta: Aproximadamente 3 dB.
2.  Si la amplitud de una señal de audio se reduce a la mitad, ¿cuántos decibelios representa ese cambio?
Respuesta: Aproximadamente -6 dB.

## Cierre
Hemos establecido que los decibelios son una herramienta esencial para expresar relaciones de nivel en el audio digital, permitiéndonos cuantificar cambios de amplitud y potencia de manera logarítmica. Esta comprensión de los decibelios como una medida relativa es el primer paso para interpretar con precisión los medidores de nivel en nuestro software. En la próxima lección, profundizaremos en cómo se establecen las referencias absolutas para los decibelios en el dominio digital, distinguiendo dBFS del volumen acústico percibido.
