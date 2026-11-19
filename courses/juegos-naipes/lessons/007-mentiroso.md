---
schemaVersion: 1
id: fd940a38-94f2-4fa0-ad11-a3cee4f24394
sequence: 7
course: juegos-naipes
stepId: mentiroso
title: Mentiroso
publishedAt: 2026-11-19T13:30:27.138Z
generationDate: 2026-11-14
summary: Reglas completas de la variante Cheat (también conocida como Mentiroso)
  con baraja francesa de 52 cartas, rango ascendente y sin apuestas, para jugar
  en rondas de cuatro jugadores. Se describen preparación, desarrollo de turnos,
  desafíos, condiciones de victoria y ejemplos prácticos.
generation:
  model: openai/gpt-oss-120b
  promptVersion: v5
  contextHash: 3526c9b32a03697dfbecd1e09a89a0084afd43f5c4e137c2ac27624d41b359b7
---

## Por qué ahora

La variante Cheat, conocida en español como Mentiroso, es un juego de engaño que permite a los jugadores practicar la observación, la gestión de la incertidumbre y la toma de decisiones rápidas. En un recorrido de juegos de naipes diario, introducir este juego después de los clásicos de la familia (Corazones, Ocho Loco, Presidente) brinda variedad de mecánicas y refuerza la capacidad de leer intenciones de los contrincantes. Además, su ritmo ágil y la ausencia de puntuación acumulada facilitan partidas completas en un solo encuentro, ideal para la práctica diaria sin requerir material adicional más allá de la baraja estándar.

## Explicación y ejemplo

### Ficha del juego
- **Número de jugadores**: 4
- **Baraja**: francesa de 52 cartas, sin comodines
- **Cartas retiradas**: ninguna
- **Objetivo**: ser el primer jugador en quedarse sin cartas después de los posibles desafíos finales.
- **Valores y jerarquías**: los rangos siguen el orden ascendente A, 2, 3, … 10, J, Q, K y se repiten cíclicamente. Cada turno se declara el rango que se debe jugar.
- **Dirección de juego**: horario (sentido de las agujas del reloj).
- **Quién comienza**: se elige al azar al iniciar la partida.
- **Obligaciones**: en cada turno el jugador debe colocar una o más cartas boca abajo indicando la cantidad y el rango exigido por el turno actual. No es obligatorio poseer cartas del rango declarado; se puede mentir.
- **Reposición**: no hay reposición de cartas durante la partida; el mazo se reparte completo al inicio.
- **Excepciones y desempates**: si al final de la partida varios jugadores quedan sin cartas simultáneamente, el que haya jugado el último turno sin ser desafiado gana.

### Preparación
1. Barajar la baraja completa y repartir todas las cartas de manera equitativa; cada jugador recibe 13 cartas.
2. Determinar al azar quién será el primer jugador. El rango inicial es **As**.

### Turnos y desarrollo
1. **Declaración**: el jugador activo coloca una o más cartas boca abajo, anunciando "n cartas de X" donde **X** es el rango actual (comienza en As y avanza una posición después de cada turno, sin reiniciar en As). La cantidad **n** puede ser cualquiera entre 1 y el número de cartas que el jugador decida jugar.
2. **Engaño**: el jugador puede declarar el rango correcto o mentir, siempre indicando la cantidad exacta de cartas que está entregando.
3. **Desafío**: cualquier otro jugador, antes de que el siguiente turno comience, puede desafiar la declaración diciendo "¡Miento!".
4. **Revelación**: sólo se revelan **las cartas del último grupo** jugado en el turno desafiado.
   - Si **todas** las cartas coinciden con el rango anunciado, el desafiante recoge todo el montón de descartes.
   - Si **alguna** carta no coincide, el autor de la declaración recoge todo el montón.
5. **Continuación**: el turno continúa con el jugador a la izquierda del autor del desafío (si hubo desafío) o del jugador que acaba de jugar (si no hubo desafío). El rango avanza una posición en el orden ascendente (A→2→3→…→K→A). El rango no se reinicia después de un desafío.

### Final de la mano y victoria
- El juego prosigue hasta que un jugador se queda sin cartas **y** no sea desafiado en ese momento. Ese jugador es el ganador de la partida.
- No se otorgan puntos ni se llevan apuestas; cada partida tiene un único ganador.

### Términos clave
- **Rango**: valor nominal de la carta (A, 2, … K) utilizado para la declaración.
- **Desafío**: acción de cuestionar la veracidad de la declaración antes de que continúe el juego.
- **Montón**: pila de cartas descartadas boca abajo que se recoge íntegramente por el perdedor del desafío.

### Ejemplo legal
Supongamos una partida con los siguientes cuatro jugadores: Ana, Bruno, Carla y Diego. El reparto inicial (simplificado) es:
- **Ana**: A♣, 5♥, 9♠, K♦, 3♣, 7♦
- **Bruno**: 2♣, 6♥, J♠, Q♦, 4♣, 8♦
- **Carla**: 3♥, 7♠, K♣, A♦, 5♣, 9♦
- **Diego**: 4♥, 8♠, Q♣, 2♦, 6♣, J♦

1. **Rango inicial**: As. Ana comienza y decide mentir. Coloca dos cartas boca abajo y dice "Dos Ases". En realidad coloca A♣ y 5♥.
2. **Desafío**: Bruno sospecha y dice "¡Miento!".
3. **Revelación**: Se vuelven a ver las dos cartas de Ana. Solo una coincide (A♣). Como al menos una carta no corresponde al rango anunciado, **Ana** recoge todo el montón (las dos cartas que jugó).
4. **Rango avanza**: ahora es 2. Bruno, que está a la izquierda de Ana, juega. Decide ser honesto y coloca la carta 2♣ anunciando "Una carta de Dos".
5. **Desafío**: Carla decide no desafiar.
6. **Continuación**: el turno pasa a Diego, rango 3.
7. **Desafío final**: en una ronda posterior, cuando el rango llega a K, Carla juega una única carta, declara "Una carta de Rey" y coloca K♣. Diego la desafía; al revelarse, la carta es efectivamente un Rey, por lo que **Diego** recoge el montón.
8. **Victoria**: después de varias rondas, Ana logra quedarse sin cartas y no es desafiada en su último turno; se declara ganadora.

### Fuente
Reglas consultadas en la página de Pagat: [Cheat (Mentiroso)](https://www.pagat.com/beating/cheat.html).

## Práctica

#### Tarea práctica para hoy
1. Reúne una baraja francesa completa y reparte todas las cartas entre cuatro jugadores (puedes simular a los demás jugadores usando pilas de cartas frente a ti).
2. Designa al azar quién será el primer jugador y anota el rango inicial (As).
3. Juega al menos diez turnos siguiendo estrictamente las reglas descritas: declara el rango, coloca cartas boca abajo, decide si mentir o decir la verdad y, cuando sea posible, desafía la declaración de otro jugador antes de que continúe el siguiente turno.
4. Registra cada desafío y su resultado (quién recoge el montón). Al final de la partida, verifica quién quedó sin cartas y si hubo un desafío en el último turno.
5. Reflexiona sobre las decisiones tomadas: ¿En qué momentos resultó más ventajoso mentir? ¿Cuándo fue más útil desafiar? Anota al menos dos observaciones que puedan guiar tu próxima partida.

Esta práctica permite interiorizar la mecánica de mentir y desafiar sin necesidad de contar con compañeros reales; basta con simular sus jugadas y registrar los resultados para analizar la lógica del juego.

## Comprobaciones

1. ¿Qué ocurre si en un turno se declara "Tres Sietes" pero solo se colocan dos cartas y una de ellas no es un siete?
Respuesta: Como al menos una carta no coincide con el rango anunciado, el autor de la declaración (quien jugó) recoge todo el montón.
2. En una partida donde el rango actual es Q y el jugador a la izquierda del último desafiante no tiene ninguna Q, ¿puede jugar una carta de otro rango y mentir?
Respuesta: Sí, el jugador puede jugar cualquier carta y declarar "Q" aunque no posea una Q; si es desafiado y alguna carta no coincide, quien jugó recoge el montón.

## Cierre

Con la práctica de Mentiroso se consolidan habilidades de observación y gestión de la incertidumbre. El siguiente juego del recorrido será **Spades**, que introduce una mecánica de apuestas de bazas y un sistema de puntuación diferente. Preparar la baraja y familiarizarse con la jerarquía de palos será útil para la transición.
