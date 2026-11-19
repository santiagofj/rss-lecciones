---
schemaVersion: 1
id: daa0ffae-5209-4b17-a98c-b88628db981c
sequence: 4
course: juegos-naipes
stepId: corazones
title: Corazones
publishedAt: 2026-11-19T13:23:55.465Z
generationDate: 2026-11-11
summary: En esta lección se presentan las reglas completas de la variante de
  cuatro jugadores de Corazones, con baraja francesa de 52 cartas, sin
  comodines. Se describen la preparación, el pase de cartas, el desarrollo de
  cada baza, la gestión de penalizaciones y el cálculo de la puntuación que
  determina al ganador al alcanzar 100 puntos. Además se incluyen ejemplos
  detallados, una práctica individual y dos preguntas de verificación.
generation:
  model: openai/gpt-oss-120b
  promptVersion: v5
  contextHash: 21ce5e03f259a4bc691c701adab9ff54c0115d70aab6c72753ae633721c1a179
---

## Por qué ahora

El conocimiento de Corazones complementa el repertorio de juegos de cartas del alumno, que ya domina trucos y juegos de captura como la Escoba. A diferencia de los juegos ya conocidos, Corazones introduce la mecánica del pase y la penalización acumulada, lo que fortalece la capacidad de planificar a medio plazo y gestionar riesgos en una partida multijugador. Practicar este juego ahora permite aplicar conceptos de control de mano y observación de la mesa que resultan útiles en otras variantes de cartas de estrategia. Además, la variante descrita es la forma más extendida en entornos informales, por lo que el alumno podrá usarla inmediatamente con amigos o en encuentros sociales.

## Explicación y ejemplo

### Ficha del juego
- **Número de jugadores:** 4
- **Baraja:** francesa de 52 cartas, sin comodines
- **Objetivo:** evitar capturar cartas de penalización; el jugador que primero alcanza 100 puntos de penalización pierde, y el que tenga menos puntos al llegar a 100 es el ganador.
- **Valor de las cartas:** As alto, seguido de K > Q > J > 10 > 9 > 8 > 7 > 6 > 5 > 4 > 3 > 2.
- **Dirección de juego:** horario.
- **Inicio de la partida:** se reparten 13 cartas a cada jugador.
- **Pase:** se realiza al inicio de cada mano siguiendo el ciclo izquierdo‑derecha‑frente‑sin pase, y se repite.
- **Obligaciones de asistencia:** se debe seguir el palo liderado si se posee; si no, se puede descartar cualquier carta, excepto en la primera baza donde no se pueden jugar corazones ni la Q de picas a menos que sólo se tengan esas cartas.
- **Triunfos:** no hay palo de triunfo.
- **Penalizaciones:** cada corazón vale 1 punto; la Q de picas vale 13 puntos.
- **Puntuación:** al final de cada mano se suman los puntos de penalización capturados; el total se acumula a lo largo de varias manos.
- **Condición de victoria:** el primer jugador que alcance 100 puntos pierde; el ganador es el jugador con la menor puntuación al momento en que alguien supera los 100 puntos. En caso de empate de mínimos, la victoria se comparte.

### Preparación
1. Barajar la baraja completa y repartir 13 cartas a cada jugador.
2. Cada jugador revisa su mano y, antes de mirar las cartas recibidas del pase, decide qué tres cartas entregará al jugador indicado por el ciclo del pase actual.
3. El pase se ejecuta simultáneamente; cada jugador recibe tres cartas del vecino correspondiente y las incorpora a su mano antes de iniciar la primera baza.
4. Se coloca la carta más baja del palo de tréboles (2♣) como carta de referencia para indicar que el juego comienza con esa carta abierta en la primera baza.

### Desarrollo de la mano
1. **Primera baza** – El jugador a la izquierda del repartidor lidera. No se pueden jugar corazones ni la Q de picas a menos que el jugador no tenga ninguna otra carta jugable.
2. **Turnos subsecuentes** – Cada jugador sigue el palo liderado si posee alguna carta de ese palo. Si no, puede descartar cualquier carta, incluida la Q de picas.
3. **Captura de bazas** – No hay triunfo; la carta más alta del palo liderado gana la baza y recoge todas las cartas jugadas.
4. **Gestión de corazones** – Los corazones pueden jugarse libremente una vez que el jugador haya descartado al menos un corazón en una baza anterior, o si únicamente posee corazones.
5. **Fin de la mano** – Cuando todos los jugadores se quedan sin cartas, se procede al recuento.

### Recuento y puntuación
- Cada corazón capturado suma 1 punto al total del jugador que los recibió.
- La Q de picas suma 13 puntos.
- El total de puntos de penalización se añade al acumulado del jugador.
- Si en una mano un jugador captura los 26 corazones, esos 26 puntos se suman a cada rival y el captor no recibe puntos (según la variante especificada).

### Ejemplo completo
Supongamos la siguiente distribución después del pase (las cartas están abreviadas por valor y palo):
- **Jugador A:**  A♠  K♠  Q♠  J♠  10♠  9♠  8♠  7♠  6♠  5♠  4♠  3♠  2♣
- **Jugador B:**  A♥  K♥  Q♥  J♥  10♥  9♥  8♥  7♥  6♥  5♥  4♥  3♥  2♦
- **Jugador C:**  A♦  K♦  Q♦  J♦  10♦  9♦  8♦  7♦  6♦  5♦  4♦  3♦  2♠
- **Jugador D:**  A♣  K♣  Q♣  J♣  10♣  9♣  8♣  7♣  6♣  5♣  4♣  3♣  2♥
La primera baza la lidera **Jugador A** con 2♣ (la carta de referencia). Ningún jugador posee corazones ni la Q de picas, por lo que pueden descartarse libremente. **Jugador B** descarta 2♦, **Jugador C** 2♠, **Jugador D** 2♥. La carta más alta del palo de tréboles es 2♣, por lo que **Jugador A** gana la baza y la coloca frente a sí.
En la segunda baza, **Jugador B** lidera con A♥. Los demás deben seguir corazón si pueden. Cada jugador tiene corazones; todos juegan sus ases de corazón (A♥, A♠, A♦, A♣). No hay triunfos, así que el as más alto del palo liderado (corazones) gana; como los ases son iguales, la regla de desempate en esta variante es que la primera carta jugada (A♥) se queda con la baza. **Jugador B** recoge la baza y ahora posee los cuatro ases de corazón, que suman 4 puntos de penalización.
Continuando de forma similar, supongamos que en la quinta baza **Jugador C** queda sin corazones y decide descartar la Q de picas. Ningún jugador sigue el palo (picas no se han liderado), así que la Q de picas gana la baza y otorga 13 puntos al jugador que la captura (en este caso, **Jugador C**). Esa es la penalización más alta posible en una sola baza.
Al final de la mano, los recuentos parciales podrían ser:
- Jugador A: 3 puntos (tres corazones capturados)
- Jugador B: 4 puntos (cuatro corazones)
- Jugador C: 13 puntos (Q de picas) + 2 puntos (dos corazones) = 15 puntos
- Jugador D: 1 punto (un corazón)
Se anotan los puntos y se inicia la siguiente mano después de un nuevo pase.

### Convenciones de mesa
- **Palo**: el conjunto de cartas del mismo símbolo (picas, corazones, tréboles, diamantes).
- **Baza**: el conjunto de cartas jugadas en un turno; la baza se gana con la carta más alta del palo liderado.
- **Triunfo**: en esta variante no existe.
- **Descartar**: jugar una carta que no siga el palo liderado cuando el jugador no posee cartas de ese palo.
- **Desempate**: si dos cartas iguales compiten por la baza, la que se jugó primero se queda con ella.
- **Pase**: intercambio de tres cartas antes de iniciar la mano; se sigue el ciclo especificado.

### Diferencias regionales principales
En algunas regiones de EE. UU. se permite jugar corazones en la primera baza si no hay otra opción, y la Q de picas puede romper la regla de no jugar corazones. En otras versiones, el jugador que captura todos los corazones recibe una bonificación negativa (‑26 puntos) en lugar de distribuir 26 puntos a los rivales. Estas variantes no se aplican a la versión descrita, que sigue la normativa de los enlaces de referencia.

## Práctica

**Tarea práctica**
1. Reúne una baraja completa de 52 cartas y forma cuatro grupos de 13 cartas cada uno, simulando la distribución inicial.
2. Sin compañeros, realiza el pase siguiendo el ciclo izquierdo‑derecha‑frente‑sin pase: elige tres cartas de cada grupo y anótalas en un papel como si fueran entregadas al vecino correspondiente.
3. Después del pase, vuelve a mezclar cada grupo y selecciona una carta para liderar la primera baza (por ejemplo, 2♣). Registra cuál sería la jugada obligatoria de cada jugador según las reglas de asistencia y las excepciones de la primera baza.
4. Simula al menos tres bazas completas anotando qué carta ganaría cada una y qué penalizaciones (corazones o Q de picas) se capturarían.
5. Al terminar la simulación, suma los puntos de penalización de cada jugador y verifica que el total coincida con la suma de corazones (1 punto cada uno) y Q de picas (13 puntos). Comparte tus resultados en una nota personal y reflexiona sobre cuántas veces tuviste que descartar corazones para poder jugarlos.
Esta práctica permite experimentar el pase y la gestión de la mano sin necesidad de otros jugadores, reforzando la comprensión de las obligaciones de asistencia y la estrategia de evitar penalizaciones.

## Comprobaciones

1. ¿Qué cartas pueden jugarse en la primera baza si un jugador solo tiene corazones y la Q de picas en su mano?
Respuesta: Sólo puede jugar un corazón o la Q de picas, ya que la regla permite jugar corazones o la Q de picas cuando no hay otras cartas disponibles.
2. Si un jugador captura todas los 26 corazones en una mano, ¿cuántos puntos recibe él y cuántos reciben los demás?
Respuesta: El jugador que captura los 26 corazones no recibe puntos; cada uno de los otros tres jugadores recibe 26 puntos de penalización.

## Cierre

Con la práctica de Corazones se consolidan las mecánicas de pase y de gestión de penalizaciones, habilidades esenciales para los juegos de captura posteriores. El siguiente paso introduce el juego de ocho loco, que añade una dinámica de intercambio y un objetivo de eliminación de cartas. Mantenga la atención en la precisión de los pases para aprovechar al máximo la siguiente lección.
