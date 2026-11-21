---
schemaVersion: 1
id: 509d74c3-f377-4ed3-8ad6-0b1a142e795d
sequence: 12
course: juegos-naipes
stepId: belote
title: Belote
publishedAt: 2026-11-21T10:51:02.113Z
generationDate: 2026-11-19
summary: Reglas completas de la belote francesa para cuatro jugadores en
  parejas, con detalle de la subasta, jerarquías, obligaciones y cálculo de la
  puntuación, incluido el proceso de belote‑rebelote y los diferentes tipos de
  contrato.
generation:
  model: openai/gpt-oss-120b
  promptVersion: v5
  contextHash: 5090212dc42dfbc50ae50f5a7eff0d0eeeaf9b3c9788a6608aaf963fd9f9803d
---

## Por qué ahora

Aprender belote en este momento permite al alumno ampliar su repertorio de juegos de parejas después de haber dominado whist, cribbage y scopa. La mecánica de subasta y el uso de la carta descubierta introducen conceptos estratégicos que no aparecen en los juegos anteriores, favoreciendo la transición a juegos de contratación como coinche o capote. Además, la belote es ampliamente jugada en Francia y en comunidades francófonas, lo que brinda una referencia cultural útil para quien desea comprender tradiciones de naipes fuera del ámbito hispano. El conocimiento de esta variante enriquece la capacidad de análisis de jugadas y mejora la comunicación con jugadores internacionales.

## Explicación y ejemplo

### Ficha del juego
- **Número de jugadores:** 4 (dos parejas).
- **Baraja:** 32 cartas francesas (A, K, Q, J, 10, 9, 8, 7) de los cuatro palos.
- **Dirección de juego:** antihorario.
- **Objetivo:** Cumplir el contrato obtenido en la subasta sumando al menos la cantidad de puntos que el adversario haya alcanzado en la mano anterior, incluyendo posibles bonificaciones de belote‑rebelote.
- **Valores de las cartas**
  - **Triunfo:** J = 20, 9 = 14, A = 11, 10 = 10, K = 4, Q = 3, 8 = 0, 7 = 0.
  - **No triunfo:** A = 11, 10 = 10, K = 4, Q = 3, J = 2, 9 = 0, 8 = 0, 7 = 0.
- **Jerarquía en la baza:** Dentro del palo jugado, la carta de mayor valor gana la baza; si se juega triunfo, la jerarquía del triunfo se aplica.
- **Terminología básica**
  - *Palo*: conjunto de cartas del mismo símbolo (picas, corazones, diamantes, tréboles).
  - *Baza*: conjunto de una carta jugada por cada jugador en un turno.
  - *Triunfo*: palo designado que supera a los demás en la valoración de bazas.
  - *Belote‑rebelote*: anuncio de la pareja cuando poseen el rey y la dama del triunfo; otorga +20 puntos.
  - *Contrato*: número de puntos que el tomador se compromete a alcanzar.
  - *Capot*: ganar las ocho bazas de la mano.

### Preparación
1. Se barajan las 32 cartas y se reparte 3 cartas a cada jugador.
2. El jugador a la derecha del dador (el "repartidor") recibe una carta descubierta (la *carta de la mesa*).
3. El reparto continúa hasta que cada jugador tenga 5 cartas y la carta descubierta quede sobre la mesa.

### Subasta y selección del triunfo
- **Primera vuelta:** Cada jugador, comenzando por el que está a la derecha del dador, decide *tomar* el palo de la carta descubierta o *pasar*.
- **Segunda vuelta:** Si todos pasan, cada jugador puede proponer cualquier otro palo como triunfo o pasar nuevamente.
- Si nuevamente todos pasan, se baraja una nueva mano.
- Cuando un jugador decide *tomar*, recibe la carta descubierta y dos cartas adicionales del mazo, completando sus 8 cartas. Los demás jugadores reciben tres cartas más cada uno, terminando también con 8.

### Desarrollo de la mano
1. El jugador a la derecha del dador inicia la primera baza.
2. Cada jugador debe seguir el palo liderado si posee alguna carta de ese palo; si no, puede jugar cualquier carta.
3. Si se juega una carta de triunfo y otro jugador posee triunfo, debe jugar un triunfo superior si es posible; si no, puede jugar cualquier carta.
4. Cuando el triunfo es jugado, la pareja del jugador que lo jugó puede “sub‑fallar” (sobrepasar) la baza aun cuando su compañero haya jugado una carta más alta del mismo palo, siempre que pueda superar la carta más alta de la baza.
5. El jugador que gana la baza recoge las cartas y las coloca boca abajo; él lidera la siguiente baza.

### Final de la mano y puntuación
- Se juegan ocho bazas. Al concluir, cada pareja cuenta los puntos de sus bazas según la tabla de valores.
- **Puntos de bazas:** Se suman los valores de todas las cartas ganadas. El total de puntos disponibles en una mano es 162.
- **Bonificaciones**
  - *Belote‑rebelote*: +20 puntos cuando una pareja muestra el rey y la dama del triunfo en el mismo momento que se juegan.
  - *Capot*: si una pareja gana las ocho bazas, recibe 252 puntos más los posibles 20 de belote‑rebelote.
- El contrato se cumple si la pareja que tomó alcanza al menos la cantidad de puntos que el adversario obtuvo en la mano anterior (incluyendo belote‑rebelote). En caso contrario, la pareja adversaria recibe 162 puntos más cualquier bonificación de belote‑rebelote que haya anotado.
- El objetivo a largo plazo es alcanzar 1000 puntos; si ambas parejas llegan a 1000 en la misma mano, el empate se declara según la fuente.

### Ejemplo completo
Supongamos que la carta descubierta es el **7 de tréboles** y el jugador a la derecha del dador decide *tomar* tréboles como triunfo. Recibe la carta descubierta y dos cartas más, completando su mano de 8 cartas. Las parejas quedan así (solo se muestran cartas relevantes):
- **Tomador (Pareja A)**: ♣ J, ♣ 9, ♣ A, ♣ 10, ♣ K, ♣ Q, ♥ A, ♦ 10.
- **Contrarias (Pareja B)**: ♠ J, ♠ 9, ♠ A, ♠ 10, ♠ K, ♠ Q, ♥ K, ♦ K.

El juego empieza con la pareja B liderando la primera baza con **♠ A**. La pareja A sigue con **♣ J** (triunfo). La pareja B, sin tréboles, juega **♠ K**; la pareja A juega **♣ 9** (triunfo superior). La pareja B juega **♠ Q**, y la pareja A cierra la baza con **♣ A**, que es el triunfo más alto (J = 20, 9 = 14, A = 11). La baza la gana la pareja A, que recoge 20 + 14 + 4 + 3 + 11 = 52 puntos.

En la segunda baza, la pareja A lidera con **♣ 10** (triunfo). La pareja B, sin tréboles, juega **♠ J**. La pareja A responde con **♣ K** (triunfo de 4 puntos) y la pareja B juega **♠ 9**. La pareja A gana nuevamente, sumando 10 + 4 = 14 puntos. Repetimos el proceso hasta completar ocho bazas. Al final, la pareja A ha ganado 5 bazas y acumulado 110 puntos de cartas, más 20 por **belote‑rebelote** (poseen ♣ K y ♣ Q). Su total es 130 puntos. La pareja B ganó 3 bazas y 52 puntos de cartas, sin bonificaciones.

Si la pareja B había anotado 140 puntos en la mano anterior, la pareja A no cumple su contrato (130 < 140). Por lo tanto, la pareja B recibe 162 puntos + 20 de belote‑rebelote (si los hubiera), mientras que la pareja A no suma nada. El marcador se actualiza en consecuencia.

Este ejemplo muestra cómo la jerarquía de triunfos, la obligación de sobrepasar y la bonificación de belote‑rebelote interactúan para determinar el cumplimiento del contrato y la distribución de puntos.

## Práctica

1. **Preparación individual**
   - Reúne una baraja de 32 cartas y retira los valores 2‑6 de cada palo.
   - Baraja y reparte tres cartas a cada posición imaginaria (Norte, Este, Sur, Oeste).
   - Coloca la carta descubierta boca arriba.
2. **Simulación de subasta**
   - Decide quién tomará el triunfo siguiendo la regla de la primera vuelta: si la carta descubierta es de un palo que te resulta cómodo, anótalo como *tomar*; de lo contrario, *pasar*.
   - Si tomas, incorpora la carta descubierta y dos cartas más al azar; los demás jugadores reciben tres cartas adicionales.
3. **Desarrollo de una mano sin contrincantes**
   - Usa la mano del tomador como referencia y simula cada una de las ocho bazas siguiendo las reglas de seguir palo y de superar triunfos.
   - Registra en papel qué carta gana cada baza y suma los valores correspondientes.
   - Anota si en algún momento aparecen el rey y la dama del triunfo; si es así, suma los 20 puntos de belote‑rebelote.
4. **Cálculo de puntuación**
   - Suma los valores de las cartas ganadas y añade cualquier bonificación.
   - Compara el total con el umbral de 162 puntos (puntos totales de la partida) y determina si el contrato se habría cumplido.
5. **Reflexión**
   - Revisa cada decisión: ¿jugaste triunfo cuando podías? ¿Seguiste el palo cuando tenías carta disponible? Anota los errores y las correcciones.
   - Repite la simulación cambiando el palo de triunfo o el tomador para observar cómo varía la puntuación.
Este ejercicio permite practicar la mecánica de la subasta, la gestión de triunfos y el cálculo de la puntuación sin necesidad de un oponente real, consolidando los conceptos clave antes de la primera partida en grupo.

## Comprobaciones

1. ¿Qué valor tiene el 9 de triunfo en la belote y cuántos puntos aporta a la mano si se gana una baza con él?
Respuesta: El 9 de triunfo vale 14 puntos y aporta 14 puntos a la suma de la baza ganada.
2. Si una pareja gana todas las ocho bazas y además anuncia belote‑rebelote, ¿cuántos puntos totales recibe?
Respuesta: Recibe 252 puntos por el capot más 20 puntos de belote‑rebelote, totalizando 272 puntos.

## Cierre

Con la comprensión completa de la belote, el alumno está preparado para enfrentar juegos de contratación más complejos y para valorar la interacción de la subasta con la puntuación. La siguiente lección introducirá el juego ruso Durak, centrado en la eliminación de cartas y la defensa de la posición sin contrato previo.
