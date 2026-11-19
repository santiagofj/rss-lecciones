---
schemaVersion: 1
id: d6f9ee5b-89cc-4d4b-b74c-6318a28ecfff
sequence: 8
course: juegos-naipes
stepId: spades
title: Spades
publishedAt: 2026-11-19T13:31:05.648Z
generationDate: 2026-11-15
summary: Spades es un juego de bazas por parejas en el que cada jugador declara
  cuántas bazas cree ganar y, opcionalmente, intenta un "nil" (cero bazas). Las
  cartas son la baraja francesa de 52, con picas como palo de triunfo
  permanente. El objetivo es cumplir el contrato acumulando puntos y evitando
  bolsas, mientras se gestionan los nil y se controla el ritmo del juego.
generation:
  model: openai/gpt-oss-120b
  promptVersion: v5
  contextHash: 220ec1127542f3a542558b73c21bcfa011a5450a55eb654a1ed5750190fe5f40
---

## Por qué ahora

El repertorio de naipes incluye variantes de truco, conga, canasta, rummy y escoba, pero Spades introduce la mecánica de la subasta y los contratos, ampliando la comprensión de la gestión de expectativas y la coordinación en pareja. Es una transición natural porque comparte la baraja y la dinámica de bazas con los juegos ya dominados, pero añade decisiones estratégicas sobre la declaración y el manejo de los nil. Aprender Spades ahora permite aplicar conocimientos previos mientras se prepara al alumno para Whist, que comparte el mismo sistema de triunfo pero elimina la subasta, facilitando la comparación de conceptos.

## Explicación y ejemplo

### Ficha del juego
- **Número de jugadores:** 4 (dos parejas).
- **Baraja:** francesa de 52 cartas, sin comodines.
- **Cartas retiradas:** ninguna.
- **Objetivo:** cada jugador declara cuántas bazas ganará (0‑13). La suma de las dos declaraciones forma el contrato de la pareja. Cumplir el contrato suma puntos; no cumplir genera penalizaciones. Además, un jugador puede declarar **nil** (cero bazas) para obtener un bono de +100 puntos si logra no ganar ninguna baza, o ‑100 puntos si falla.
- **Valores y jerarquía:** orden ascendente A > K > Q > J > 10 > 9 > 8 > 7 > 6 > 5 > 4 > 3 > 2 dentro de cada palo. Las **picas** son siempre el palo de **triunfo**.
- **Dirección de juego:** en sentido horario.
- **Quién comienza:** el jugador a la izquierda del repartidor (el “dealer”) abre la primera baza.
- **Obligaciones de juego:**
  - **Seguir palo:** si se posee al menos una carta del palo liderado, debe jugarse una de ellas.
  - **Asistir:** si no se tiene el palo liderado, se debe jugar una **pica** si se posee; de lo contrario, cualquier carta.
  - **Romper picas:** se permite jugar una pica al asistir sólo cuando el jugador no tiene ninguna carta del palo liderado o cuando ya se ha “roto” el palo de triunfo (es decir, se ha jugado una pica en una baza anterior).
- **Reposición:** no hay reposición; el mazo se reparte una sola vez por mano.
- **Excepciones y desempates:** si dos cartas del mismo palo tienen el mismo rango (imposible con una baraja estándar), el desempate se decide por la posición del jugador en el turno (el primero que jugó gana).

### Términos clave
- **Palo:** conjunto de cartas con el mismo símbolo (picas, corazones, diamantes, tréboles).
- **Baza:** conjunto de una carta jugada por cada jugador en un turno. La carta más alta del palo liderado gana, salvo que una pica (triunfo) sea jugada; la pica más alta gana la baza.
- **Triunfo:** en Spades, siempre son las picas; superan a cualquier otra carta.
- **Nil:** declaración de que el jugador no ganará ninguna baza.
- **Bolsas:** bazas ganadas por encima del contrato de la pareja; cada 10 bolsas se penaliza ‑100 puntos.
- **Contrato:** número total de bazas que la pareja se compromete a ganar.

### Turnos
1. **Reparto:** el dealer reparte 13 cartas a cada jugador, comenzando con la izquierda y siguiendo en sentido horario.
2. **Declaración:**, comenzando nuevamente con la izquierda del dealer, cada jugador anuncia cuántas bazas cree ganar (0‑13). No se permite pasar. Las declaraciones individuales se anotan; la suma de la pareja constituye el contrato.
3. **Juego de bazas:** la izquierda del dealer inicia la primera baza. Cada jugador sigue el orden horario, cumpliendo la obligación de asistir o de jugar una pica si no puede asistir.
4. **Fin de la mano:** después de 13 bazas, se contabilizan los resultados.

### Puntuación y victoria
- **Cumplir contrato:** +10 puntos por cada baza declarada que la pareja efectivamente gana.
- **Exceso de bazas (bolsas):** +1 punto por cada baza ganada por encima del contrato; cada 10 bolsas se restan ‑100 puntos al total acumulado.
- **Incumplir contrato:** ‑10 puntos por cada baza declarada que no se gana.
- **Nil exitoso:** +100 puntos; si el jugador gana al menos una baza, se penaliza ‑100 puntos y cada baza ganada cuenta como bolsa para la pareja.
- **Meta de partida:** se juega hasta alcanzar ≥ 500 puntos. El equipo con mayor puntuación gana; en caso de empate se juega una mano adicional bajo la convención establecida.

### Ejemplo completo
Supongamos que la pareja Norte‑Sur declara 5 bazas y 4 bazas respectivamente (contrato = 9). El jugador Este declara **nil** y el jugador Oeste declara 3 bazas (contrato del otro equipo = 3). Después del reparto, la mano se desarrolla así (solo se muestra el resultado de las bazas):

| Baza | Ganador | Razón | Bazas acumuladas (N‑S) | Bazas acumuladas (E‑O) |
|------|---------|-------|-----------------------|-----------------------|
| 1    | Norte   | Pica alta   | 1 | 0 |
| 2    | Oeste   | Triunfo (pica) > corazón | 1 | 1 |
| 3    | Sur     | Carta alta de tréboles (K) | 2 | 1 |
| 4    | Norte   | Pica (J) supera resto | 3 | 1 |
| 5    | Este    | No ganó ninguna baza (nil exitoso) | 3 | 1 |
| 6    | Oeste   | Pica (9) gana | 3 | 2 |
| 7    | Sur     | Corazón (A) gana | 4 | 2 |
| 8    | Norte   | Pica (5) gana | 5 | 2 |
| 9    | Oeste   | Pica (2) gana | 5 | 3 |
|10    | Sur     | Diamante (K) gana (no hay pica) | 6 | 3 |
|11    | Norte   | Pica (3) gana | 7 | 3 |
|12    | Sur     | Trébol (Q) gana | 8 | 3 |
|13    | Norte   | Pica (4) gana | 9 | 3 |

Al final: Norte‑Sur alcanzó 9 bazas, cumpliendo su contrato (‑10 puntos por cada baza declarada = +90 puntos). No obtuvieron bolsas porque su número de bazas coincide con el contrato. Este logró su nil exitoso (+100 puntos). Oeste ganó 3 bazas, cumpliendo su declaración (+30 puntos). No hubo bolsas.

Puntuación total:
- Norte‑Sur: 90 (puntos por contrato) + 100 (nil) = 190 puntos.
- Este‑Oeste: 30 puntos.

Este escenario muestra cómo un nil bien jugado puede cambiar drásticamente el marcador y cómo las bolsas se acumulan solo cuando la pareja supera su contrato.

### Fuente
Reglas consultadas en la página de Pagat: [Spades – Pagat](https://www.pagat.com/auctionwhist/spades.html).

## Práctica

**Objetivo de la práctica**

1. Reparte 13 cartas a cada jugador usando una baraja completa. Puedes hacerlo tú mismo, colocando las cartas en cuatro montones visibles.
2. Anota las declaraciones de cada jugador siguiendo el orden habitual (izquierda del dador, horario). Incluye al menos un nil.
3. Simula las 13 bazas sin necesidad de oponentes: escribe la carta que jugaría cada posición en cada baza respetando las obligaciones de asistir y de jugar picas cuando sea necesario. Puedes decidir arbitrariamente la carta que cada jugador “elige”, pero mantén la coherencia con la mano que le corresponde.
4. Al terminar, cuenta cuántas bazas ganó cada jugador y verifica el cumplimiento del contrato y del nil.
5. Calcula la puntuación de la mano usando las reglas descritas en la sección de explicación. Registra los puntos obtenidos y, si hubo bolsas, anótalas.

**Cómo validar la práctica**
- Revisa que en cada baza se haya respetado la obligación de seguir palo o asistir con una pica.
- Comprueba que la suma de bazas de cada pareja coincida con 13.
- Verifica que el cálculo de puntos y bolsas sea idéntico al ejemplo de la sección anterior.

Esta actividad permite experimentar la mecánica de la subasta, la gestión del nil y el control de bolsas sin necesidad de una partida real con cuatro personas. Repite la simulación con diferentes combinaciones de declaraciones para observar cómo varían los resultados y afinar la toma de decisiones en futuros juegos.

**Consejos iniciales**
- Cuando declares nil, revisa tu mano en busca de cartas bajas de picas y evita quedarse con picas altas que puedan forzarte a ganar una baza.
- Si tu pareja ha declarado un número alto, considera declarar menos para minimizar el riesgo de bolsas.
- Observa el flujo de picas durante la partida; romper el palo de triunfo temprano puede facilitar la asistencia y reducir la probabilidad de perder bazas inesperadas.

## Comprobaciones

1. ¿Cuál es la puntuación neta para una pareja que declara 8 bazas, gana 10 bazas y no tiene bolsas acumuladas previamente?
Respuesta: La pareja cumplió 8 bazas (+80 puntos) y obtuvo 2 bolsas (+2 puntos). Como no ha alcanzado 10 bolsas, no hay penalización. Puntuación neta = +82 puntos.
2. Un jugador declara nil y, contra todo pronóstico, gana una baza. ¿Cómo afecta esto al marcador de su pareja?
Respuesta: El jugador recibe ‑100 puntos por nil fallido y la baza ganada cuenta como una bolsa para su pareja, incrementando el contador de bolsas en +1.

## Cierre

Con esta lección el alumno dispone de todas las reglas y ejemplos necesarios para jugar Spades de forma autónoma. La siguiente lección presentará Whist, que conserva el mismo palo de triunfo pero elimina la fase de declaración, permitiendo comparar directamente ambas dinámicas de juego.
