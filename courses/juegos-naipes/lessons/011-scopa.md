---
schemaVersion: 1
id: 4bb8a851-a703-45e6-9565-d96a3a661ddf
sequence: 11
course: juegos-naipes
stepId: scopa
title: Scopa
publishedAt: 2026-11-21T10:50:12.284Z
generationDate: 2026-11-18
summary: Scopa es un juego de captura por igualdad que utiliza una baraja
  española o italiana de 40 cartas. La partida se desarrolla en varias manos;
  cada mano consta de una serie de turnos en los que los jugadores intentan
  capturar cartas del centro de la mesa, obtener la mayor cantidad de puntos y,
  especialmente, conseguir la primiera, la combinación más alta de valores de
  cada palo. Esta lección describe todas las reglas necesarias para jugar una
  partida básica de Scopa entre dos jugadores, incluye un ejemplo completo y
  propone una práctica individual para afianzar los conceptos de captura, scopa
  y…
generation:
  model: openai/gpt-oss-120b
  promptVersion: v5
  contextHash: c0a1b5292cdc202722f082a8597bac02c0e11560dff0428dd9fe153c8415d653
---

## Por qué ahora

En el recorrido de juegos de cartas tradicionales, Scopa representa la transición de los juegos de bazas a los de captura, ofreciendo una mecánica distinta a la de Escoba, a la que el alumno ya está familiarizado. Aplicar la captura por igualdad y calcular la primiera exige reconocer valores y jerarquías específicos, lo que refuerza la comprensión de los valores de las cartas y la estrategia de selección de jugadas. Dominar estas habilidades prepara al jugador para juegos posteriores que utilizan conceptos de captura y puntuación múltiple, como la Brisca, y amplía su repertorio de juegos de mesa sin recurrir a apuestas ni solitarios.

## Explicación y ejemplo

### Ficha del juego
- **Número de jugadores:** 2 (también se juega con 4 en parejas, pero la lección se centra en la versión para dos). 
- **Baraja:** Baraja española o italiana de 40 cartas (sin ochos y nueves en la española). 
- **Cartas retiradas:** Ninguna; todas las 40 cartas participan. 
- **Objetivo:** Capturar cartas del centro para obtener la mayor cantidad de puntos al final de la mano, con especial énfasis en la **primiera**. 
- **Valores de las cartas:** A=1 (valor 16 en primiera), 2=2 (12), 3=3 (13), 4=4 (14), 5=5 (15), 6=6 (18), 7=7 (21), sota=8 (10), caballo=9 (10), rey=10 (10). 
- **Jerarquía de captura:** Si la carta jugada coincide en valor con una carta del centro, puede capturar esa carta individualmente. Si no hay coincidencia, puede capturar un conjunto de cartas cuya suma de valores sea igual al valor de la carta jugada; la captura individual tiene prioridad obligatoria. 
- **Dirección de juego:** Sentido horario. 
- **Quién comienza:** El jugador que **no reparte** la mano. 
- **Obligaciones:** Cada jugador debe jugar una carta en su turno. No hay reposición del centro entre turnos; sólo al iniciar una nueva mano se reparten tres cartas a cada jugador y se colocan cuatro cartas boca arriba en el centro. 
- **Excepciones:** Si al inicio de la mano aparecen tres o cuatro reyes entre el centro y las manos, se descarta la mano y se vuelve a repartir. 
- **Desempates:** En caso de empate en mayoría de cartas, mayor cantidad de oros, o en la primiera, no se otorgan puntos.

### Preparación
1. Barajar las 40 cartas y repartir tres a cada jugador. 
2. Colocar cuatro cartas boca arriba en el centro de la mesa. 
3. Verificar la condición de los reyes; si hay tres o cuatro, barajar nuevamente.

### Turnos
1. El jugador que no reparte inicia colocando una de sus cartas sobre la mesa. 
2. Si la carta coincide en valor con alguna del centro, **obliga** a capturar esa carta única. 
3. Si no hay coincidencia, el jugador puede capturar cualquier combinación de cartas del centro cuya suma de valores sea idéntica al valor de la carta jugada. 
4. Si el jugador no puede capturar, la carta queda en el centro. 
5. Se continúa alternando turnos hasta que ambos jugadores hayan jugado sus tres cartas.

### Final de mano y reposición
- Tras el sexto turno (tres cartas por jugador), se recogen las cartas capturadas y se anotan los puntos. 
- Sin reposición del centro, se reparten tres cartas nuevas a cada jugador y se coloca nuevamente el mismo número de cartas que quedaron en el centro (puede ser cero, uno, dos o tres). 
- Cuando el mazo se agota, la última ronda se juega con las cartas que quedan en mano; la última jugada **no** otorga scopa aunque limpie el centro.

### Puntuación y victoria
| Concepto | Condición | Puntos |
|---|---|---|
| **Scopa** | Capturar todas las cartas del centro en un turno. | 1 punto por cada scopa. |
| **Mayoría de cartas** | Tener más de la mitad del total de cartas (21 o más). | 1 punto. |
| **Mayoría de oros** | Tener más cartas del palo de oros. | 1 punto. |
| **Siete de oros** | Poseer el 7 de oros al final de la mano. | 1 punto. |
| **Primiera** | Sumar los valores de la mejor carta de cada palo según la tabla de primiera (7=21, 6=18, A=16, 5=15, 4=14, 3=13, 2=12, figuras=10). Se necesita al menos una carta de cada palo. | 1 punto. |

- **Meta de la partida:** El juego suele jugarse hasta alcanzar 11 puntos; la partida termina cuando un jugador supera esa cifra al finalizar una mano.

### Ejemplo completo
**Situación inicial**
- Baraja española. Cartas repartidas:
  - Jugador A: 7♣, 5♦, rey♠
  - Jugador B: 3♣, 6♥, sota♦
- Centro: 2♠, 7♦, 4♣, rey♥

**Turno 1 (Jugador A)**
- Juega el 7♣. En el centro hay un 7♦, por lo que debe capturar esa carta individualmente (obligación). Captura 7♦ y coloca 7♣ en su montón de capturas.
- **Resultado:** Centro queda 2♠, 4♣, rey♥.

**Turno 2 (Jugador B)**
- Juega la sota♦ (valor 10). No hay carta de valor 10 en el centro, pero puede capturar la combinación 2♠ + 4♣ + rey♥ (2+4+10=16) → no coincide. No hay combinación que sume 10, por lo que la sota queda en el centro.
- **Resultado:** Centro 2♠, 4♣, rey♥, sota♦.

**Turno 3 (Jugador A)**
- Juega el 5♦ (valor 5). No hay 5 en el centro y ninguna combinación suma 5 (2+4=6, 2+4+sota=16, etc.). La carta queda en el centro.
- **Resultado:** Centro 2♠, 4♣, rey♥, sota♦, 5♦.

**Turno 4 (Jugador B)**
- Juega el 6♥ (valor 6). Puede capturar 2♠ + 4♣ (2+4=6). Captura esas dos cartas.
- **Resultado:** Centro rey♥, sota♦, 5♦.
- **Puntos parciales:** Jugador B ha realizado una captura, no scopa.

**Turno 5 (Jugador A)**
- Juega el rey♠ (valor 10). En el centro hay un rey♥ (valor 10) y también la sota♦ (valor 10). La captura individual es obligatoria, por lo que captura el rey♥.
- **Resultado:** Centro sota♦, 5♦.

**Turno 6 (Jugador B)**
- Juega la 3♣ (valor 3). No hay 3 en el centro y ninguna combinación suma 3. La carta queda en el centro.
- **Resultado final del primer reparto:** Centro sota♦, 5♦, 3♣.

**Reparto 2** (se reparten nuevas cartas y se mantiene el centro tal cual). Supongamos que el nuevo centro después de la segunda distribución queda con cuatro cartas: 7♥, 2♦, 6♣, sota♣. El proceso de captura continúa siguiendo las mismas reglas.

**Cálculo de la primiera al final de la mano**
- Supongamos que al concluir todas las rondas, los montones de captura son:
  - Jugador A: 7♣, 7♥, 6♠, 5♦, 4♥
  - Jugador B: 6♥, 5♣, 3♠, sota♦, rey♣
- Mejor carta de cada palo para A: 7♣ (7 de oros si fuera oro, pero aquí consideramos palo distinto), 7♥, 6♠, 5♦, 4♥ → valores primiera: 21+21+18+15+14 = 89.
- Mejor carta de cada palo para B: 6♥ (18), 5♣ (15), 3♠ (13), sota♦ (10), rey♣ (10) → total 66.
- A gana la primiera y recibe 1 punto.

**Puntuación total**
- Scopas: ninguna.
- Mayoría de cartas: A tiene 11 cartas vs. B 9 → A 1 punto.
- Mayoría de oros: supongamos A tiene 4 oros, B 2 → A 1 punto.
- 7 de oros: si A posee el 7 de oros, +1 punto.
- Primiera: A 1 punto.
- **Total A:** 4‑5 puntos (dependiendo del 7 de oros). B: 0‑1 punto.
Este ejemplo muestra cómo se aplican las reglas de captura, la prioridad de captura individual y el cálculo de la primiera.

### Comparación breve con Escoba
- En Escoba la captura se basa en la suma de 15; en Scopa la captura se basa en igualdad de valores o sumas que coinciden con el valor de la carta jugada.
- Ambos otorgan puntos por la mayoría de cartas y por el 7 de oros, pero Scopa introduce la primiera y la scopa como elementos distintivos.

### Convenciones de mesa
- Se anuncia "scopa" cuando se limpia el centro.
- Se declara la primiera al final de la mano indicando los valores de cada palo.
- No se permite tocar las cartas del oponente una vez capturadas.

### Fuentes
- Regla consultada en [Pagat – Scopa](https://www.pagat.com/fishing/scopa.html).

## Práctica

**Objetivo de la práctica**
Reforzar la captura por igualdad y la identificación de la mejor carta para la primiera sin necesidad de un segundo jugador.

**Materiales**
- Una baraja española completa de 40 cartas.
- Un área plana para colocar las cartas del centro.
- Papel y lápiz para anotar capturas y valores.

**Procedimiento**
1. Baraja las cartas y reparte tres a ti mismo. No distribuyas cartas a otro jugador.
2. Coloca cuatro cartas boca arriba en el centro.
3. Simula los turnos como si hubiera un adversario: en cada turno, elige una de tus cartas y decide si puedes capturar una carta del centro por igualdad o una combinación que sume su valor. Anota la decisión y el resultado.
4. Cuando no sea posible capturar, deja la carta en el centro. Continúa hasta haber jugado tus tres cartas.
5. Reparte nuevamente tres cartas y repite el proceso manteniendo las cartas que quedaron en el centro.
6. Al terminar la segunda ronda, cuenta cuántas cartas has capturado y registra si alguna jugada limpió el centro (scopa). Además, escribe la mejor carta de cada palo que poseas y calcula la puntuación de la primiera según la tabla (7=21, 6=18, A=16, etc.).
7. Compara tu total de puntos con la siguiente tabla de referencia:
   - 1 scopa = 1 punto.
   - Mayoría de cartas = 1 punto si tienes 21 o más.
   - Mayoría de oros = 1 punto si tienes más oros que el adversario ficticio.
   - 7 de oros = 1 punto si lo posees.
   - Primiera = 1 punto si tu suma es mayor que la posible suma del adversario (asume que el adversario tendría la segunda mejor carta de cada palo).

**Análisis**
- Revisa cada jugada para confirmar que la captura individual se respetó cuando era posible.
- Verifica que la suma de valores utilizada para capturas combinadas sea exacta.
- Calcula la primiera con precisión; si falta alguna carta de un palo, la primiera no se otorga.
- Anota los errores detectados y repite la secuencia corrigiéndolos.

**Resultado esperado**
Al finalizar, deberías haber identificado al menos una scopa, haber calculado la primiera correctamente y haber comprendido la prioridad de captura individual. Este ejercicio permite interiorizar la mecánica sin necesidad de un compañero, preparando al alumno para la interacción real en la siguiente partida.

**Consejos iniciales**
- Observa siempre el valor de la carta que vas a jugar antes de decidir la captura.
- Prioriza capturas individuales sobre combinaciones.
- Mantén a la vista la tabla de valores de la primiera para evaluar rápidamente la mejor carta de cada palo.

**Errores comunes a evitar**
- Capturar una combinación cuando una captura individual está disponible.
- Contar la última jugada que vacía el centro como scopa.
- Sumar valores de cartas para la primiera sin aplicar la tabla específica (por ejemplo, considerar el 7 como 7 puntos en lugar de 21).

## Comprobaciones

1. En una mano, el jugador tiene en mano un 8 de bastos (valor 10) y en el centro hay un 2 de espadas, un 3 de oros y un 5 de copas. ¿Qué jugada debe realizar para cumplir la regla de captura obligatoria?  
Respuesta: Debe capturar la carta individual de valor 10 si existiera, pero como no hay, debe buscar una combinación que sume 10. La única combinación posible es 2+3+5=10, por lo que captura esas tres cartas.
2. Al final de la mano, un jugador posee las siguientes mejores cartas de cada palo: 7 de oros, 6 de copas, as de espadas y 5 de bastos. ¿Cuál es su puntuación de primiera y gana la primiera contra un rival que tiene 7 de copas, 5 de oros, as de bastos y 4 de espadas?  
Respuesta: La primiera del primer jugador es 21 (7) + 18 (6) + 16 (A) + 15 (5) = 70. La del rival es 21 (7) + 15 (5) + 16 (A) + 14 (4) = 66. Por lo tanto, el primer jugador gana la primiera con 70 puntos.

## Cierre

Con esta lección el alumno ha adquirido la capacidad de aplicar la captura por igualdad y calcular la primiera en Scopa. El siguiente paso del itinerario introduce la Brisca, otro juego de captura que incorpora el concepto de triunfo y una puntuación basada en cartas de valor alto. Continuaremos ampliando la variedad de mecánicas de juego sin volver a los juegos ya cubiertos.
