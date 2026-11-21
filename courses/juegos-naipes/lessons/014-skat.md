---
schemaVersion: 1
id: 6bbc92fd-4eac-4039-a6d0-4ef2d10a23ac
sequence: 14
course: juegos-naipes
stepId: skat
title: Skat
publishedAt: 2026-11-21T10:53:58.202Z
generationDate: 2026-11-21
summary: Lección que describe el juego de Skat para tres jugadores, enfocándose
  en la subasta, el contrato y el recuento básico de puntos, con ejemplos
  completos y una práctica individual.
generation:
  model: openai/gpt-oss-120b
  promptVersion: v5
  contextHash: fdfc197a8fecb02c87bca4f524b6c238452b4b7e3d0fad515f6f0514ea8b2972
---

## Por qué ahora

Skat es el juego de cartas más popular en Alemania y una referencia importante en la cultura de juegos de mesa de Europa central. Conocer sus mecánicas de subasta y cálculo de puntuación brinda una base sólida para entender juegos de trampa y de estrategia que utilizan fases de licitación, como Bridge o Pinochle. Además, la estructura de tres jugadores permite organizar partidas rápidas en entornos familiares sin necesidad de formar parejas. Aprender Skat ahora complementa la serie de juegos de cartas tradicionales que el alumno ya conoce y amplía su repertorio de habilidades tácticas y de gestión de información oculta.

## Explicación y ejemplo

### Ficha del juego
- **Número de jugadores:** 3
- **Baraja:** Naipes franceses de 32 cartas (7, 8, 9, 10, J, Q, K, A de cada palo). No se retiran cartas.
- **Objetivo:** Ganar la subasta, definir un contrato y obtener al menos 61 puntos de los 120 disponibles en la mano, o cumplir el contrato de *Null* (no ganar ninguna baza).
- **Valores de las cartas (para el recuento de puntos):** A = 11, 10 = 10, K = 4, Q = 3, J = 2, resto = 0.
- **Jerarquía de triunfos:** Depende del tipo de contrato.
  - **Suit (palo):** El palo declarado es triunfo. Orden de triunfos: J♣, J♠, J♥, J♦, A, 10, K, Q, 9, 8, 7 del palo elegido.
  - **Grand:** Sólo los cuatro J son triunfos, siguiendo el mismo orden.
  - **Null:** No hay triunfos; la jerarquía es A > K > Q > J > 10 > 9 > 8 > 7.
- **Dirección de juego:** Sentido horario.
- **Quién comienza:** El repartidor (mano) reparte y el jugador a su izquierda es el primero en la subasta.
- **Obligaciones:** Cada jugador debe seguir el color si puede, y debe ganar la baza si puede hacerlo con una carta del mismo color o con triunfo.
- **Reposición:** Después de la subasta, el declarador recoge el *skat* (dos cartas ocultas) y descarta dos cartas al azar o las incorpora a su mano según el tipo de contrato.
- **Excepciones:** En *Null* el declarador no puede mirar el *skat*; en *Hand* juega sin mirar el *skat*.
- **Desempates:** Si dos jugadores ofertan la misma cantidad, gana el que está más cerca del declarador (el que hizo la oferta primero).

### Preparación
1. Barajar las 32 cartas y repartir tres manos de diez cartas a cada jugador. Las dos cartas restantes forman el *skat* boca abajo.
2. El jugador a la izquierda del repartidor inicia la subasta.

### Subasta (licitación numérica)
- La subasta comienza en 18 puntos y aumenta en pasos de 1 hasta 60. Cada jugador, en su turno, puede **pasar** o **ofertar** un número mayor al anterior.
- El jugador que haga la oferta más alta se convierte en el **declarador**. Los demás jugadores forman el **defensor**.
- Si todos pasan, el jugador que estaba a cargo de la mano (mano) puede aceptar jugar a 18 o el reparto pasa a la siguiente persona.

### Contrato y tipos de juego
| Tipo | Triunfos | Requisitos de puntos | Comentario |
|------|----------|----------------------|------------|
| **Suit** | J + todas las cartas del palo elegido | 61 pts | El palo declarado es triunfo. |
| **Grand** | Sólo los cuatro J | 61 pts | Más difícil, pues hay menos triunfos. |
| **Null** | No hay triunfos | 0 pts | El objetivo es no ganar ninguna baza. |
| **Hand** | Como Suit/Grand/Null, pero sin mirar el *skat* | 61 pts (o 0 en Null) | Se suma +1 al multiplicador. |
| **Ouvert** | Declarador muestra su mano | 61 pts (o 0) | Añade +1 al multiplicador y obliga a cumplir el anuncio. |
| **Hand Ouvert** | Combina Hand y Ouvert | 61 pts (o 0) | Multiplicador máximo (+2). |

### Recolección del *skat* y descarte
- En **Suit**, **Grand** o **Null** el declarador puede mirar el *skat*, incorporarlo a su mano y descartar dos cartas al azar. En **Hand** no se mira el *skat*; en **Ouvert** se muestra la mano antes de decidir.

### Desarrollo de la partida (bazas)
1. El jugador a la izquierda del declarador inicia la primera baza.
2. Cada jugador sigue el color si tiene carta del mismo palo; si no, puede jugar cualquier carta.
3. Si se juega un triunfo, el triunfo más alto gana la baza.
4. El ganador de la baza inicia la siguiente.

### Recuento de puntos
- Se suman los valores de todas las cartas capturadas por el declarador (incluido el *skat*). El total máximo es 120.
- **Umbral de juego:** 61 pts (para Suit y Grand). En *Null* se necesita 0 pts, es decir, no ganar ninguna baza.
- **Multiplicador base** depende del tipo de juego y de los *matadores* (número de triunfos que el declarador ha ganado):
  - **Suit:** 1 pt por cada triunfo del palo más alto (máx = 9). Base = 9 pts.
  - **Grand:** Base = 24 pts (4 J × 6).
  - **Null:** Base = 1 pt.
- **Bonificaciones:**
  - **Hand** (+1), **Ouvert** (+1), **Schneider** (ganar con ≥ 90 pts, +1), **Schwarz** (ganar todas las bazas, +1).
- **Valor del contrato** = (base + bonificaciones) × multiplicador.
- **Resultado:** Si el declarador alcanza o supera 61 pts, gana *valor del contrato* puntos. Si no, pierde el doble de esa cantidad.

### Ejemplo completo
**Situación:** Tres jugadores – Ana (mano), Bruno y Carla. Se reparte y el *skat* contiene **K♣** y **9♦**.
1. **Subasta:** Ana abre 18, Bruno pasa, Carla sube a 20, Ana sube a 22 y gana la subasta.
2. **Contrato:** Ana elige *Suit* de corazones y decide jugar *Hand* (no mirar el *skat*). No hay *skat* que observar, por lo que descarta dos cartas al final de la partida.
3. **Triunfos:** Los triunfos son J♣, J♠, J♥, J♦, A♥, 10♥, K♥, Q♥, 9♥, 8♥, 7♥.
4. **Desarrollo:** Ana gana la primera baza con J♣, sigue ganando bazas con 10♥ y A♥, acumulando 11 + 10 + 11 = 32 pts de triunfos. Continúa ganando bazas y captura también K♥ (4 pts) y Q♥ (3 pts).
5. **Captura total:** Al final de la mano Ana ha ganado cartas que suman 71 pts (incluye los 0 pts del *skat* porque no se miró). Supera el umbral de 61 pts.
6. **Cálculo del valor:** Tipo *Suit* → base 9. *Hand* → +1. Ana no fue *Schneider* (≥ 90 pts) ni *Schwarz* (todas las bazas). Multiplicador = 1 (ningún matador extra). Valor = (9 + 1) × 1 = 10 pts.
7. **Resultado:** Ana gana 10 pts. Bruno y Carla pierden 5 pts cada uno (puntuación total del juego = 0).

### Diferencias regionales principales
- En algunas regiones de Alemania se permite el juego de *Ramsch* (todos juegan contra el declarador) y la regla de *Kontra* que duplica el valor del contrato; aquí se omiten para mantener la versión internacional básica.
- La numeración de la subasta puede iniciar en 12 en variantes suizas, pero la práctica internacional estándar comienza en 18.
- En Austria se usa una baraja de 32 cartas con valores ligeramente distintos para el recuento (A = 11, 10 = 10, K = 4, Q = 3, J = 2, resto = 0), idéntica a la descrita.

### Fuentes
- [Pagat – Skat](https://www.pagat.com/schafkopf/skat.html)
- [ISPA Canada – Reglas de Skat (PDF)](https://ispacanada.org/docs/rules/505fc8_e561984976a345bc8404e4474ce066ef.pdf)

## Práctica

**Tarea individual:**
1. Reúne una baraja de 32 cartas (puedes retirar los 2‑6 de una baraja estándar). Baraja y reparte diez cartas a tres jugadores ficticios (puedes usar fichas o anotar las manos). Coloca dos cartas como *skat* boca abajo.
2. Simula una subasta simple: elige una oferta inicial de 18, sube a 20 y luego a 22, anotando quién pasa y quién gana. Registra el tipo de contrato que decides (por ejemplo, *Suit* de tréboles, *Hand*).
3. Sin necesidad de compañeros, imagina que tú eres el declarador y el resto de los jugadores son “oponentes”. Utiliza una hoja para anotar qué cartas ganarías en cada baza si jugaras siguiendo las reglas de seguir el color y de triunfar con los J.
4. Al final de la simulación, suma los valores de las cartas que “has capturado” (incluye el *skat* si tu contrato lo permite). Calcula si alcanzas los 61 pts y determina el valor del contrato según la tabla de bonificaciones.
5. Escribe un breve informe (150‑200 palabras) describiendo:
   - El proceso de subasta que elegiste.
   - El tipo de contrato y la razón de tu elección.
   - El recuento de puntos y el cálculo del valor final.
   - Un error potencial que hayas detectado en tu propia simulación y cómo lo corregirías.
Esta práctica permite interiorizar la mecánica de la subasta y el cálculo de puntuación sin necesidad de una partida completa con terceros.

## Comprobaciones

1. En una partida de *Suit* de diamantes, el declarador gana 5 bazas que incluyen A♦ (11 pts), 10♦ (10 pts), K♦ (4 pts), Q♦ (3 pts) y J♣ (2 pts) del *skat*. ¿Cuántos puntos totales ha obtenido el declarador?
Respuesta: 30 puntos (11+10+4+3+2).
2. Si un declarador juega *Null* y logra no ganar ninguna baza, ¿cuál es el valor del contrato y cuántos puntos gana o pierde?
Respuesta: El valor del contrato es 1 punto; el declarador gana 1 punto porque cumplió el objetivo de no ganar bazas.

## Cierre

La lección ha cubierto la subasta, el contrato y el recuento básico de Skat, proporcionando una práctica que puede realizarse de forma individual. En la siguiente entrega se abordará Bridge, introduciendo su sistema de licitación y la estructura de juego en parejas.
