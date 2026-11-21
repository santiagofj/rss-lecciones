---
schemaVersion: 1
id: 3cfd8ea8-24d0-4638-afac-02fbf7796372
sequence: 10
course: juegos-naipes
stepId: cribbage
title: Cribbage – Diferenciación de puntos en mano y crib
publishedAt: 2026-11-21T10:48:37.466Z
generationDate: 2026-11-17
summary: Aprende las reglas completas del Cribbage para dos jugadores, con
  énfasis en la contabilización de puntos en la mano y en el crib, y practica la
  puntuación paso a paso.
generation:
  model: openai/gpt-oss-120b
  promptVersion: v5
  contextHash: 48a16f03107a8a1660daaa9745ed3ae3b9657185aebabd94f3f298d1423e7ab1
---

## Por qué ahora

En la actualidad el Cribbage sigue siendo uno de los juegos de naipes más valorados por su combinación de estrategia y cálculo de puntos. Dominar la distinción entre los puntos obtenidos en la mano y los que aparecen en el crib es esencial para alcanzar la meta de 121 puntos sin errores de recuento. Este conocimiento permite al jugador tomar decisiones informadas al descartar cartas y al planificar la jugada de "go", reduciendo la probabilidad de perder puntos por una mala interpretación del conteo. Además, el Cribbage se juega con una baraja francesa estándar y es accesible con materiales mínimos, lo que lo hace ideal para introducir un nuevo juego en la rutina diaria de estudio.

## Explicación y ejemplo

### Ficha del juego
- **Número de jugadores:** 2
- **Baraja:** 52 cartas francesas, sin comodines.
- **Cartas retiradas:** Ninguna, pero cada jugador descarta dos cartas al crib al comienzo de cada mano.
- **Objetivo:** Ser el primero en alcanzar 121 puntos.
- **Valores de las cartas:** As = 1 punto, cartas numeradas = su valor numérico, figuras (J, Q, K) = 10 puntos.
- **Jerarquía:** No influye en la puntuación de combinaciones, salvo en la jugada de "go" donde el orden de juego es relevante.
- **Dirección de juego:** Sentido horario.
- **Quién comienza:** El repartidor alterna cada mano; el no‑repartidor inicia la fase de juego de la mano.
- **Obligaciones:** Cada jugador debe jugar una carta si puede sin superar 31; si no puede, dice "go".
- **Reposición:** No se repone la mano durante la fase de juego; las cartas jugadas quedan fuera.
- **Excepciones:** En caso de que ambos jugadores digan "go" consecutivamente, el último que jugó antes del segundo "go" recibe un punto extra.
- **Desempates:** Si ambos alcanzan 121 en la misma jugada, gana el que alcanzó la puntuación primero.

### Preparación
1. Barajar la baraja completa.
2. Determinar al repartidor (por ejemplo, quien corta la carta más alta).
3. El repartidor entrega **seis cartas** a cada jugador.
4. Cada jugador selecciona **dos cartas** de su mano y las coloca boca abajo en el **crib**; el crib pertenece al repartidor al final de la mano.
5. El no‑repartidor corta el mazo restante; la carta superior del mazo cortado se voltea como **starter** (carta de inicio) y queda visible para ambos.

### Desarrollo de turnos (fase de "play")
- Los jugadores alternan colocando una carta sobre la mesa, sumando su valor al total acumulado.
- El total no puede superar **31**; si al colocar una carta el total llega a 31, el jugador que lo hizo anota **2 puntos**.
- Cada vez que la suma alcanza **15**, se anotan **2 puntos**.
- Cuando un jugador no puede jugar sin pasar de 31, dice "go" y el oponente continúa jugando si tiene cartas válidas. El último que jugó antes del segundo "go" recibe **1 punto** (excepto si la suma es 31, que ya dio 2 puntos).
- La secuencia continúa hasta que ambas manos se agotan; entonces se reinicia el conteo a cero para la siguiente fase.

### Final de mano (conteo de combinaciones)
Una vez jugadas todas las cartas, cada jugador cuenta puntos en **su mano** usando la carta starter. El repartidor cuenta también los puntos del **crib** con la misma carta starter. Las combinaciones válidas son:
- **15:** Cualquier combinación de cartas que sumen 15 → 2 puntos.
- **Parejas:** Cada pareja vale 2 puntos.
- **Tres iguales (trío):** Vale 6 puntos.
- **Cuatro iguales (póker):** Vale 12 puntos.
- **Escaleras (runs):** Secuencias de 3 o más cartas consecutivas sin huecos; los puntos son la longitud de la escalera multiplicada por la cantidad de veces que la secuencia aparece (por ejemplo, 3‑4‑5 con dos 5 da 6 puntos).
- **Flush (color) en mano:** Cuatro cartas del mismo palo en la mano → 4 puntos; si la carta starter coincide en palo, se añaden **1 punto** (total 5).
- **Flush en crib:** Sólo cuenta si las cuatro cartas del crib son del mismo palo; la carta starter **no** se incluye y vale **5 puntos**.
- **Jack del mismo palo que el starter (his nobs):** 1 punto adicional.

### Puntuación y victoria
- Se anotan los puntos obtenidos en la fase de juego (go, 15, pares, etc.) y luego los de la cuenta de mano y crib.
- El puntaje se lleva con una **puntuación en papel** (se usa un “pegboard” tradicional, pero el papel es suficiente).
- El primer jugador que alcance **121 puntos** gana la partida.
- No existen “muggins” (puntos no reclamados) en esta versión.

### Términos clave
- **Starter:** Carta descubierta después del corte; participa en la cuenta de mano y crib.
- **Go:** Declaración cuando un jugador no puede jugar sin pasar de 31.
- **Pegboard:** Tabla tradicional con clavijas para marcar puntos; sustituto en papel.
- **His nobs:** Jack del mismo palo que el starter, vale 1 punto.
- **Flush:** Todas las cartas del mismo palo.
- **Run:** Escalera sin huecos, independiente del palo.

### Ejemplo completo
**Situación:** Juan es el repartidor; Ana es la oponente.
1. **Reparto:** Cada uno recibe 6 cartas.
   - Juan: 5♣      K♦      9♥      A♠      7♣
   - Ana: 4♦      J♣      8♠      3♥      Q♣
2. **Descarta al crib:**
   - Juan elige descartar **K♦ y 7♣** al crib.
   - Ana descarta **J♣ y Q♣** al crib.
3. **Corte y starter:** Ana corta y la carta superior es **5♦** (starter).
4. **Fase de play:** Ana inicia.
   - Ana juega **4♦** → total 4 (no 15 ni pares).
   - Juan juega **5♣** → total 9 (no 15).
   - Ana juega **8♠** → total 17 (no 15).
   - Juan juega **9♥** → total 26 (no 15).
   - Ana juega **3♥** → total 29 (no 15).
   - Juan no puede jugar sin pasar 31 (quedan 5 y A). Dice **go**. Ana juega **A♠** → total 30 (no 15).
   - Juan juega **5♣** (segunda 5) → total 31 → **2 puntos** por 31 y **2 puntos** por 15 (5+5+5 =15) y **2 puntos** por pareja de 5. Además, al jugar la última carta recibe **1 punto** por ser el último antes del go anterior. Total acumulado en play: Ana 0, Juan 5.
5. **Conteo de manos:**
   - **Ana (mano):** 4♦  J♣  8♠  3♥  + starter 5♦.
     - 15s: (4+J=14+1) → no. (8+7) → no. (5+4+... ) → **4 + 5 + 6 =15** (no 6). Encontramos **4+5+6** no hay 6. Sólo **4+5+6** no. En realidad, combina 4♦ + J♣ (10) + A? No hay A. No hay 15. 
     - Pareja: ninguna.
     - Escalera: 3‑4‑5 (3♥,4♦,5♦) → **3 puntos** (longitud 3).
     - Flush: no.
     - His nobs: no Jack del mismo palo que el starter (starter 5♦, Jack es ♣). 
     - Puntos total Ana: **3**.
   - **Juan (mano):** 5♣  9♥  A♠  7♣  + starter 5♦.
     - 15s: 5♣+5♦+5? sólo dos 5, suma 10. 9+A+? =10. No hay 15.
     - Pareja: **par de 5** (5♣ y 5♦) → **2 puntos**.
     - Escalera: 5‑5‑? no.
     - Flush: no.
     - His nobs: Jack? no.
     - Puntos total Juan mano: **2**.
6. **Conteo del crib (pertenece a Juan):** Crib = K♦,7♣,J♣,Q♣ + starter 5♦.
   - 15s: K(10)+5 =15 → **2 puntos**.
   - Parejas: ninguna.
   - Escalera: J‑Q‑K (J♣,Q♣,K♦) forma escalera de 3 → **3 puntos**.
   - Flush: no (palo mixto).
   - His nobs: no Jack del mismo palo que el starter.
   - Total crib: **5**.
7. **Puntuación final de la mano:**
   - Juan obtuvo **5** (play) + **2** (mano) + **5** (crib) = **12** puntos.
   - Ana obtuvo **3** (mano) = **3** puntos.
   - Marcador acumulado: Juan 12, Ana 3.
Este ejemplo muestra cómo se contabilizan los 15, pares, escaleras, flush y el punto por "go". Cada paso debe anotarse antes de pasar a la siguiente fase para evitar omisiones.

**Fuentes**
- [Reglamento oficial de Cribbage (2020)](https://www.cribbage.org/NewSite/rules/rulebook_2020.pdf)
- [Cómo jugar Cribbage – Bicycle Cards](https://bicyclecards.com/how-to-play/cribbage)

## Práctica

**Objetivo de la práctica:** Reproducir una mano completa de Cribbage y registrar cada punto obtenido, verificando la correcta distinción entre los puntos de la fase de juego, la mano y el crib.

1. **Reúne los materiales**: una baraja francesa completa y una hoja de papel para llevar la puntuación.
2. **Distribución aleatoria**: baraja las cartas y reparte seis a cada jugador (puedes jugar contra ti mismo o simular al oponente anotando sus cartas en una hoja separada).
3. **Descarta al crib**: elige dos cartas para el crib y colócalas boca abajo.
4. **Corte y starter**: corta el mazo restante y voltea la carta superior; anótala como starter.
5. **Fase de play**: siguiendo el orden de juego descrito, coloca una carta a la vez, suma el total y anota los puntos obtenidos (15, pares, 31, go). Registra cada evento en una tabla sencilla (carta jugada – total – puntos obtenidos).
6. **Conteo de mano**: una vez terminada la fase de play, revisa tu mano junto con la carta starter. Identifica todas las combinaciones de 15, parejas, tríos, escaleras y flush. Anota los puntos correspondientes.
7. **Conteo del crib**: realiza el mismo proceso con las cuatro cartas del crib y la carta starter. Recuerda que el flush solo cuenta si las cuatro cartas del crib son del mismo palo.
8. **Suma total**: agrega los puntos de la fase de juego, la mano y el crib. Marca el total en la hoja de puntuación.
9. **Repetición**: repite el proceso al menos tres veces, alternando quién es el repartidor, para interiorizar la mecánica del descarte al crib y la influencia de la carta starter.

**Consejos iniciales**
- Verifica siempre la suma de 15 antes de buscar pares o escaleras; la regla de los 15 tiene prioridad en la fase de juego.
- Cuando contabilices escaleras, considera todas las combinaciones posibles; por ejemplo, si tienes 4‑5‑5‑6, hay dos escaleras de 3 (4‑5‑6) que generan **6 puntos**.
- En la fase de play, si ambos jugadores dicen "go" consecutivamente, el último que jugó antes del segundo "go" recibe 1 punto.
- Utiliza una hoja de cálculo o una tabla dibujada para evitar olvidar puntos menores como "his nobs".

Al concluir la práctica, revisa que el total de puntos anotado coincida con la suma de todas las combinaciones encontradas. Esta verificación consolidará la distinción entre los puntos de la mano y los del crib, cumpliendo el objetivo de la lección.

## Comprobaciones

1. En una mano, el jugador A tiene 5♣  5♦  9♥  K♠ y la carta starter es 5♥. ¿Cuántos puntos obtiene A al contar su mano?
Respuesta: 15 (5+5+5) = 2 puntos, pareja de 5 = 2 puntos, trío de 5 = 6 puntos, total 10 puntos.
2. Durante la fase de play, el total acumulado es 28 y le toca jugar al jugador B, que solo tiene una carta de valor 4. ¿Qué ocurre y cuántos puntos recibe B?
Respuesta: B no puede jugar sin pasar de 31, dice "go". Si A tampoco puede jugar, A recibe 1 punto por ser el último que jugó antes del segundo "go"; B no recibe puntos en esa jugada.

## Cierre

La lección ha presentado el Cribbage con énfasis en la correcta contabilización de puntos en mano y crib, y ha propuesto una práctica para afianzar la mecánica. En la próxima entrega se abordará **Scopa**, otro juego de captura por igualdad que amplía la variedad de combinaciones y estrategias en el recorrido diario de naipes.
