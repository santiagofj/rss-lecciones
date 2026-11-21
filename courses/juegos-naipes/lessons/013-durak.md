---
schemaVersion: 1
id: 71c66b45-d567-43ef-8b64-109f2f7213de
sequence: 13
course: juegos-naipes
stepId: durak
title: Durak
publishedAt: 2026-11-21T10:53:16.549Z
generationDate: 2026-11-20
summary: Durak es el juego de cartas más popular de Rusia, jugado con una baraja
  estándar de 36 cartas. El objetivo es evitar quedar como último jugador con
  cartas en la mano. La lección detalla la variante Podkidnoy para dos
  jugadores, con reglas de ataque, defensa, reposición y final de partida,
  proporcionando un ejemplo completo y una práctica individual.
generation:
  model: openai/gpt-oss-120b
  promptVersion: v5
  contextHash: 8531b74835425cade0fdc9132252a95706b664a50ed19bc8cbe40180ffe7665c
---

## Por qué ahora

Durak sigue vigente en reuniones informales y en competencias de juegos de mesa en Europa del Este. Conocer sus mecánicas mejora la capacidad de reconocer patrones de ataque‑defensa comunes a muchos juegos de bazas, lo que resulta útil para jugadores que ya dominan trucos, canasta y rummy. Además, la variante Podkidnoy para dos jugadores permite practicar sin necesidad de formar equipos, ideal para la fase inicial del curso cuando se busca consolidar conceptos de orden de juego y gestión de mano. Aprender Durak ahora brinda una base sólida para la siguiente lección sobre Skat, donde la interacción entre varios jugadores añade complejidad adicional.

## Explicación y ejemplo

### Ficha del juego
- **Nombre:** Durak (Podkidnoy) – variante para dos jugadores.
- **Número de jugadores:** 2.
- **Baraja:** 36 cartas (se usan los valores 6‑A de los cuatro palos).  
- **Cartas retiradas:** Ninguna, pero se retira el resto del mazo después de repartir seis cartas a cada jugador.
- **Objetivo:** No ser el jugador que termine con cartas en la mano cuando el mazo se agota.
- **Valores y jerarquía:** 6 < 7 < 8 < 9 < 10 < J < Q < K < A dentro de cada palo. No hay valores de puntos; la fuerza sirve para ganar bazas.
- **Dirección de juego:** Sentido horario (en dos jugadores es alternado).
- **Quién comienza:** El jugador que posea la carta más baja del palo de triunfo abre la partida.
- **Obligaciones:** No hay obligación de seguir palo. El atacante puede añadir cartas del mismo rango que ya está en la mesa.
- **Reposición:** Después de cada mano, cada jugador repone hasta seis cartas, el atacante primero, el defensor último. Cuando el mazo se termina, no hay reposición.
- **Excepciones y desempates:** Si ambos jugadores terminan sin cartas simultáneamente, la partida se declara empate.

### Preparación
1. Barajar las 36 cartas.
2. Determinar el palo de **triunfo** volteando la carta inferior del mazo sin verla; esa carta queda bajo el mazo y su palo define el triunfo.
3. Repartir seis cartas a cada jugador, dejando el resto como mazo de robo.
4. El jugador con la carta de triunfo más baja comienza como atacante.

### Turnos
#### Ataque
- El atacante coloca una carta de su mano sobre la mesa (baza).
- El defensor debe cubrir esa carta con una **carta mayor del mismo palo** o con una **carta de triunfo** de mayor rango que la carta atacada.
#### Defensa
- Si el defensor cubre, la baza se considera ganada y se retira del juego.
- Si el defensor no puede cubrir, debe recoger todas las cartas de la mesa, incluidas las añadidas por el atacante, y pierde el turno de ataque.
#### Añadir cartas
- El atacante puede, siempre que la defensa haya cubierto, añadir más cartas siempre que tengan el mismo **valor** que alguna carta ya jugada en la mesa (por ejemplo, si la primera carta fue un 9, se pueden añadir más 9 de cualquier palo).  
- El número total de cartas que el atacante puede añadir está limitado al número de cartas que tenía el defensor al inicio de la defensa, o a seis, lo que sea menor.

### Final de mano
- Cuando la defensa cubre todas las cartas, la mano termina. Cada jugador repone hasta seis cartas siguiendo el orden de reposición.
- Cuando el mazo se agota, no se repone más. La partida continúa hasta que un jugador se quede sin cartas al final de una ronda; ese jugador es el **ganador** y el otro es el **Durak** (el perdedor).

### Puntuación y victoria
- No se asignan puntos. La victoria se determina exclusivamente por quién queda sin cartas cuando el mazo se ha agotado y no hay más reposiciones.

### Términos clave
- **Palo:** Uno de los cuatro grupos de cartas (picas, corazones, tréboles, diamantes).
- **Baza:** Conjunto de cartas jugadas en una ronda de ataque‑defensa.
- **Triunfo:** Palo que supera a los demás; cualquier carta de triunfo gana a cualquier carta de otro palo, independientemente del rango, salvo que sea superada por un triunfo de mayor rango.
- **Valor para ganar una baza:** Determinado por la jerarquía dentro del mismo palo o por pertenecer al palo de triunfo.

### Ejemplo completo
Supongamos que el palo de triunfo es **corazones**. Las manos iniciales son:
- **Jugador A (atacante):** 6♣, 9♦, J♠, Q♣, K♥, 7♥
- **Jugador B (defensor):** 8♣, 10♦, Q♦, A♠, 9♥, 8♥

1. **Ataque inicial:** A juega **9♦**.
2. **Defensa:** B cubre con **Q♦** (misma pinta, mayor rango).
3. **Añadir carta:** A puede añadir cualquier carta de valor **9**; tiene **9♦** ya usada, pero no tiene otro 9. No añade.
4. **Recolección de la baza:** La baza se retira; ambos jugadores reparten hasta seis cartas (A primero). Supongamos que el mazo ofrece a A **8♠** y a B **6♥**.
5. **Nueva ronda:** El siguiente atacante es B (porque la defensa tuvo éxito). B ataca con **A♠**.
6. **Defensa:** A no tiene espadas ni corazones que superen al As, por lo que debe **recoger** la baza (A♠). A toma la carta atacante y la carta de defensa (si existiera), quedando con 7 cartas.
7. **Fin de turno:** B no repone porque el mazo sigue, pero A repone al final de la ronda hasta seis cartas.
8. **Continuación:** El juego prosigue siguiendo las mismas reglas hasta que el mazo se agote y uno de los jugadores se quede sin cartas.

Este ejemplo muestra cómo el atacante puede añadir cartas del mismo rango y cómo la defensa decide entre cubrir o recoger. La restricción de no obligar a seguir palo simplifica la toma de decisiones y hace que la gestión de la mano sea crucial.

### Fuente
- [Reglas de Durak – Podkidnoy (Pagat.com)](https://www.pagat.com/beating/podkidnoy_durak.html)

### Diferencias regionales principales
- En algunas regiones de Rusia el número máximo de cartas que se pueden añadir es cuatro, no seis.
- En la variante **Fool** se permite la obligación de seguir palo cuando sea posible, a diferencia de la versión aquí descrita.
- En versiones de seis o más jugadores se utilizan 52 cartas y se reparten ocho cartas por jugador, lo que modifica la dinámica de reposición.

## Práctica

#### Objetivo de la práctica
Recrear una partida completa de Durak utilizando una baraja de 36 cartas y un mazo de robo. El alumno debe registrar cada fase (ataque, defensa, añadiendo cartas y reposición) en una hoja de papel para verificar la correcta aplicación de las reglas.

#### Paso a paso
1. **Preparar la baraja** recortando todas las cartas menores a 6 de un mazo estándar.
2. **Determinar el triunfo** colocando la carta inferior del mazo boca arriba y anotando su palo.
3. **Repartir seis cartas** a cada jugador y anotar las manos.
4. **Identificar al atacante inicial** según la carta más baja de triunfo.
5. **Jugar una ronda completa** siguiendo el proceso descrito en la sección de explicación. Cada vez que se añada una carta, registrar su valor y el motivo de la adición.
6. **Reponer** después de cada ronda, anotando el orden de reposición y las cartas obtenidas.
7. **Continuar** hasta que el mazo se agote y uno de los jugadores se quede sin cartas. Marcar al perdedor como *Durak*.

#### Registro sugerido
| Ronda | Atacante | Carta atacada | Defensa | Carta cubierta | Cartas añadidas | Resultado | Reposición (A) | Reposición (B) |
|-------|----------|---------------|---------|----------------|----------------|-----------|----------------|----------------|
| 1     | A        | 9♦            | B       | Q♦             | —              | Baza ganada| 8♠             | 6♥             |
| 2     | B        | A♠            | A       | —              | —              | A recoge   | —              | —              |
| …     | …        | …             | …       | …              | …              | …         | …              | …              |

Al final, comparar el número de rondas jugadas con el número de cartas iniciales para confirmar que el proceso de reposición se realizó correctamente. La práctica permite identificar errores comunes como intentar cubrir con un palo distinto al atacado o añadir cartas de valor no presente en la mesa.

## Comprobaciones

1. En la variante Podkidnoy para dos jugadores, ¿cuál es la condición máxima para añadir cartas durante un ataque?
Respuesta: El atacante puede añadir cartas siempre que tengan el mismo valor que alguna carta ya jugada y el número total de cartas añadidas no supere el número de cartas que tenía el defensor al inicio de la defensa, con un límite absoluto de seis cartas.
2. Si el mazo se ha agotado y ambos jugadores terminan una ronda sin cartas en la mano, ¿cómo se determina el resultado?
Respuesta: La partida se declara empate, ya que ninguno de los dos quedó con cartas al finalizar la última ronda.

## Cierre

Esta lección ha cubierto todas las reglas necesarias para jugar Durak en su variante Podkidnoy para dos jugadores, incluyendo el manejo del ataque, la defensa, la reposición y el criterio de victoria. En la siguiente entrega se introducirá Skat, un juego de bazas para tres jugadores que añade una fase de subasta y una jerarquía de triunfos más compleja. Mantenga la práctica de Durak para afianzar la gestión de la mano antes de avanzar.
