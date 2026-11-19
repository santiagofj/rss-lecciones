---
schemaVersion: 1
id: 98de6be4-74da-41e0-afe3-1faeee98d66b
sequence: 6
course: juegos-naipes
stepId: presidente
title: Presidente
publishedAt: 2026-11-19T13:29:08.603Z
generationDate: 2026-11-13
summary: Reglas completas del juego de Presidente (versión básica Pagat) para
  cuatro jugadores con baraja francesa de 52 cartas, incluyendo preparación,
  desarrollo de rondas, puntuación, intercambio de cartas y gestión de pases.
generation:
  model: openai/gpt-oss-120b
  promptVersion: v5
  contextHash: 59f7b0d8ee1110d758b74273a430a68a5efeeb9b3c9979ed88a72f8fc47fea54
---

## Por qué ahora

El juego de Presidente combina estrategia de gestión de mano, observación de los pares y control de los pases, habilidades que resultan útiles al enfrentarse a juegos de escalada y jerarquía como el Mentiroso. En el recorrido del curso, después de Cinquillo, Corazones y Ocho Loco, el alumno ya domina la captura de bazas y la rotación de manos; ahora es oportuno introducir un juego cuyo objetivo principal es la eliminación de cartas mediante combinaciones de igual rango. Esta lección permite consolidar la lectura de la mesa y la toma de decisiones bajo presión, preparándolo para la siguiente fase del itinerario de naipes.

## Explicación y ejemplo

### Ficha del juego
- **Nombre**: Presidente (también conocido como *Asshole* en algunos lugares).
- **Número de jugadores**: 4.
- **Baraja**: Baraja francesa de 52 cartas, sin comodines.
- **Cartas retiradas**: Ninguna.
- **Objetivo**: Deshacerse de todas las cartas antes que los demás; al final de cada mano se asignan rangos que determinan el intercambio de cartas para la siguiente ronda.
- **Valores y jerarquía**: 2 > A > K > Q > J > 10 > 9 > 8 > 7 > 6 > 5 > 4 > 3. Los palos no influyen en el orden.
- **Dirección de juego**: Sentido horario.
- **Quién comienza**: El jugador a la izquierda del dador inicia la primera ronda con una carta o un grupo de cartas del mismo rango.
- **Obligaciones**: Cada turno debe jugarse al menos una carta; si se juega un grupo, el número de cartas debe coincidir con el grupo anterior.
- **Reposición**: No se repone la mano durante la ronda.
- **Excepciones**: Se permite pasar aunque se tenga una jugada válida; pasar no impide volver a jugar en la misma ronda después de que los demás hayan pasado.
- **Desempates**: Si al terminar una mano varios jugadores tienen la misma puntuación máxima, se juega una mano adicional hasta que haya un único líder.

### Preparación
1. Barajar la baraja completa y repartir todas las cartas, de modo que cada jugador reciba 13 cartas.
2. Cada jugador ordena su mano de mayor a menor según la jerarquía establecida.
3. No se retiran cartas ni se establecen comodines.

### Turnos y dinámica de la ronda
- **Primer turno**: El jugador a la izquierda del dador elige una carta única o un grupo de cartas del mismo rango y las coloca boca arriba en el centro.
- **Rondas subsecuentes**: Cada jugador, siguiendo el sentido horario, debe superar la jugada anterior con el mismo número de cartas pero de rango superior. Por ejemplo, si la mesa contiene dos 7, el siguiente debe jugar dos 8 o mayor. Si no puede o decide no hacerlo, puede **pasar**.
- **Pase**: Un pase indica que el jugador no juega en esa ronda, pero mantiene la posibilidad de volver a jugar cuando la ronda recorra nuevamente hasta él, siempre que al menos un jugador haya jugado después de su pase.
- **Retiro del montón**: Cuando todos los jugadores consecutivamente pasan después de una jugada válida, el montón se retira del juego y el último jugador que jugó comienza una nueva ronda con cualquier carta o grupo.
- **Fin de la mano**: La mano concluye cuando un jugador se queda sin cartas. Ese jugador es el **Presidente**. El último en quedarse sin cartas se convierte en el **Culo** (o *Vice‑Presidente* según la variante respetuosa). Los demás ocupan los rangos intermedios según el orden en que se quedaban sin cartas.

### Intercambio de cartas entre manos
- Antes de iniciar la siguiente mano, el Presidente entrega su carta más alta al Culo. El Culo, a su vez, entrega al Presidente una carta elegida por éste (generalmente la más baja que el Presidente desea recibir). Este intercambio se hace una sola vez por mano.
- No se permite intercambiar más de una carta ni realizar “revoluciones” (cambio de dirección) en esta versión básica.

### Puntuación y victoria
- Cada ronda otorga puntos de rango: Presidente = 2 puntos, Vice‑Presidente = 1 punto, los demás = 0 puntos.
- El objetivo del juego es acumular 11 puntos. Cuando un jugador alcanza o supera esa cifra, se declara ganador del partido completo.
- Si al cerrar una mano varios jugadores llegan simultáneamente a 11 puntos, se sigue jugando hasta que uno supere claramente al resto.

### Ejemplo legal
1. **Reparto**: Cada jugador recibe 13 cartas. Supongamos que el jugador A (Presidente anterior) tiene 2♣, 2♦, A♠, K♥, Q♣, J♦, 10♠, 9♥, 8♣, 7♦, 6♠, 5♥, 4♣.
2. **Primer turno**: El jugador B (a la izquierda del dador) abre con un 5♣.
3. **Ronda 1**: Jugador C supera con un 6♦ (una sola carta). Jugador D pasa. Jugador A supera con un 7♥. Jugador B supera con un 8♠. Jugador C pasa, jugador D pasa, jugador A pasa → el montón se retira.
4. **Nuevo inicio**: Jugador B, último que jugó, abre con un par de 9♣ 9♦.
5. **Ronda 2**: Jugador C supera con dos 10♥ 10♠. Jugador D pasa. Jugador A supera con dos J♣ J♥. Jugador B pasa, jugador C pasa, jugador D pasa → montón retirado.
6. **Continuación**: El juego prosigue hasta que el jugador A se queda sin cartas, convirtiéndose en Presidente de la mano. El jugador D es el último y ocupa el rango de Culo.
7. **Intercambio**: Antes de la siguiente mano, el Presidente entrega su carta más alta (A♠) al Culo; el Culo entrega al Presidente la carta más baja que éste elija (por ejemplo, 4♣).
8. **Puntuación**: Presidente recibe 2 puntos, Culo 0 puntos. Si el Presidente ya tenía 9 puntos, ahora alcanza 11 puntos y gana el partido.

### Consejos iniciales y errores comunes
- **Ordenar la mano**: Colocar las cartas en grupos de igual rango facilita la identificación de jugadas posibles.
- **Control de pases**: Pasar demasiado pronto puede ceder el control del montón al oponente; pasar estratégicamente después de que otro jugador haya jugado una carta alta permite recuperar la iniciativa.
- **Gestión del intercambio**: El Presidente debe seleccionar la carta más alta que beneficie su mano futura; el Culo, aunque recibe una carta baja, debe intentar que sea la menos perjudicial posible.
- **Evitar “bloqueos”**: Si el juego se queda en una secuencia donde solo quedan cartas bajas, es preferible pasar y esperar a que el montón se retire para iniciar con una jugada más favorable.
- **Respeto a los rangos**: Utilizar los nombres convencionales (Presidente, Vice‑Presidente, etc.) mantiene la atmósfera del juego y evita confusiones.

## Práctica

### Tarea práctica individual
1. **Preparación**: Baraja una baraja de 52 cartas y reparte 13 a cada uno de cuatro espacios imaginarios (A, B, C, D). No es necesario contar con jugadores reales; simplemente separa las manos sobre la mesa.
2. **Ordenación**: Ordena cada mano de mayor a menor y agrupa los valores idénticos. Anota, por ejemplo, cuántos pares, tríos o cuartetos tienes.
3. **Simulación de una ronda**:
   - Imagina que la mano A inicia con una carta única de tu elección. Registra la carta.
   - Simula, sin mover físicamente, la respuesta de la mano B: busca la menor carta superior del mismo número de cartas. Si no la tiene, decide pasar.
   - Continúa la simulación para las manos C y D, aplicando la regla de superar o pasar.
   - Cuando todos pasen después de la última jugada válida, anota cuál mano sería la que abre la siguiente ronda.
4. **Intercambio de rango**: Supongamos que la mano A termina sin cartas y la mano D es la última en quedarse con cartas. Registra qué carta sería la más alta de la mano A y cuál sería la más baja de la mano D para el intercambio.
5. **Reflexión escrita**: Describe brevemente qué decisiones fueron más difíciles y cómo la gestión de los pases influyó en el control del montón.

Esta práctica permite experimentar con la lógica del juego sin necesidad de oponentes reales, reforzando la comprensión de la jerarquía de cartas y la mecánica de los pases.

## Comprobaciones

1. En una ronda, si el primer jugador juega un trío de 4, ¿qué es lo mínimo que debe jugar el siguiente para superar la jugada?
Respuesta: Un trío de 5 o cualquier trío de rango superior (5, 6, ..., 2). 
2. Si al final de una mano el Presidente tiene 9 puntos y el Vice‑Presidente 10, ¿cuántos puntos necesita cada uno para ganar el partido y qué ocurre si ambos alcanzan 11 en la misma mano?
Respuesta: El Presidente necesita 2 puntos y el Vice‑Presidente 1 punto. Si ambos alcanzan 11 en la misma mano, se continúa jugando manos adicionales hasta que un jugador supere al otro.

## Cierre

La lección ha cubierto la versión básica de Presidente, sus reglas, intercambio de rangos y criterios de puntuación. El siguiente paso del recorrido presentará el juego Mentiroso, que enfatiza la detección de falsedades y la gestión de la presión en la declaración de valores. Mantenga la práctica de la ronda simulada para afianzar la comprensión antes de abordar el próximo juego.
