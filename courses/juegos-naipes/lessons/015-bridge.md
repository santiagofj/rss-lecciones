---
schemaVersion: 1
id: 3d16655e-7bdf-426a-aacb-46ad8c896fff
sequence: 15
course: juegos-naipes
stepId: bridge
title: Bridge
publishedAt: 2026-11-22T10:58:03.908Z
generationDate: 2026-11-22
summary: Bridge es un juego de cartas por parejas que combina subasta, juego de
  la carta y cálculo de puntuación. La modalidad descrita corresponde a la
  variante Chicago de cuatro manos, utilizada en torneos y clubes. Esta lección
  cubre todas las reglas necesarias para jugar una sesión completa de cuatro
  manos, desde la repartición de la baraja hasta la puntuación final, sin
  requerir conocimientos avanzados de convenciones de subasta.
generation:
  model: openai/gpt-oss-120b
  promptVersion: v5
  contextHash: 6f5ce5c41e3450f3990d4c2b568ea2097bc0ad9b72684ddb1a5dfca741173660
---

## Por qué ahora

Aprender Bridge ahora permite al jugador ampliar su repertorio de juegos de mesa estratégicos, complementando la experiencia con trucos, canasta y escoba. Tras dominar juegos de captura y combinación, Bridge introduce la dimensión de la subasta, que obliga a evaluar la fuerza de la mano y a coordinarse con la pareja. La variante Chicago, con una sola ronda de subasta y una distribución fija, ofrece una experiencia completa sin la complejidad de sistemas de licitación avanzados, por lo que es apropiada para quien busca un reto estructurado y reproducible en cualquier reunión de cuatro personas.

## Explicación y ejemplo

### Ficha del juego
- **Número de jugadores**: 4 (dos parejas).
- **Baraja**: 52 cartas francesas, sin comodines.
- **Cartas retiradas**: ninguna.
- **Objetivo**: cumplir el contrato obtenido en la subasta y superar la puntuación de la pareja contraria en cuatro manos.
- **Valores de carta**: As (4 puntos), Rey (3), Dama (2), Jota (1), resto 0.
- **Jerarquía de palos**: trébol < diamante < corazón < pica. El palo de triunfo supera a los demás.
- **Dirección de juego**: sentido horario.
- **Quién comienza**: el dador designado (N, E, S, O) reparte y la mano comienza con el jugador a su izquierda.
- **Obligaciones**: seguir palo si se puede, ganar baza con triunfo si no se posee el palo liderado, declarar la carta más alta cuando se posee la misma.
- **Reposición**: ninguna; las cartas no se vuelven a barajar entre bazas.
- **Excepciones y desempates**: si dos bazas tienen el mismo valor de triunfo, gana la que se jugó primero; en caso de empate de puntuación total, la partida se declara compartida.

### Preparación
1. El dador reparte 13 cartas a cada jugador, comenzando por el jugador a su izquierda y siguiendo el sentido horario.
2. El jugador a la derecha del dador (el "repartidor de la mano") se convierte en el primer licitador.

### Subasta (Chicago)
- **Niveles**: 1‑7, cada nivel equivale a seis bazas más el nivel (p. ej., nivel 3 = 9 bazas).
- **Orden de los palos**: trébol, diamante, corazón, pica, sin triunfo (NT).
- **Acciones**: *pasar*, *subir* (nivel o palo superior), *doblar* (contra contrato de la pareja contraria), *redoblar* (sobre doble propio).
- La subasta finaliza cuando tres jugadores consecutivos pasan después de una oferta.
- El contrato final es el último anuncio no pasado, indicado por nivel, palo y si está doblado/redoblado.

### Juego de la carta
1. El jugador a la izquierda del declarante (el "abridor") inicia la primera baza.
2. Cada jugador debe seguir el palo liderado si tiene carta del mismo; si no, puede jugar cualquier carta, incluido triunfo.
3. La baza la gana la carta más alta del palo liderado, salvo que se haya jugado triunfo; entonces la baza la gana el triunfo más alto.
4. El ganador de la baza lidera la siguiente.

### Final de mano y puntuación
- **Cálculo de bazas**: se comparan las bazas obtenidas por la pareja declaradora con el número pactado en el contrato.
- **Puntuación base**: cada baza por encima del contrato aporta puntos según el palo (pica 30, corazón 30, diamante 20, trébol 20, NT 40 para la primera y 30 para las siguientes).
- **Bonificaciones**: *sobrecontrato* (bazas extra) se puntúan al mismo valor que la primera baza del contrato. *Slam* (6‑nivel o 7‑nivel) otorga bonificaciones adicionales (500/750 o 1000/1500) cuando se anuncia y se cumple.
- **Dobles y redobles**: los puntos del contrato se multiplican por 2 (doble) o 4 (redoble). Las sobrebazas también se multiplican.
- **Penalizaciones**: por cada baza faltante se resta 50 (sin doble) o 100 (doble) puntos a la pareja declaradora.
- **Bonos por juego**: al alcanzar 100 puntos de contrato sin vulnerabilidad se añaden 300 puntos; con vulnerabilidad 500.
- **Resultado de la mano**: se suman los puntos obtenidos por ambas parejas; el total de la partida es la suma de los cuatro resultados.

### Ejemplo completo
**Situación**: la pareja Norte‑Sur (NS) declara 4♥ (cuatro nivel, corazón como triunfo) sin doblar. La vulnerabilidad es "ninguna".
1. **Reparto**: cada jugador recibe 13 cartas.
2. **Subasta**: la secuencia termina con 4♥ como contrato.
3. **Juego**: NS necesita 10 bazas (6 + nivel 4). Tras jugar las 13 bazas, NS gana 11 bazas.
4. **Cálculo**:
   - Bazas del contrato: 10 → 10 bazas × 30 pts = 300.
   - Sobrebaza: 1 extra × 30 pts = 30.
   - Bonificación por juego (100+ pts, sin vulnerabilidad): +300.
   - Total NS: 300 + 30 + 300 = 630.
   - EO (pareja contraria) no obtuvo contrato; su puntuación es 0.
5. **Resultado de la mano**: NS 630, EO 0.

Esta estructura se repite durante cuatro manos, rotando el dador y la vulnerabilidad según el orden Chicago (N → S → E → O). Al final, la pareja con mayor puntuación total gana la partida.

**Fuentes**
- Modalidad y procedimiento: [Pagat – Bridge](https://www.pagat.com/auctionwhist/bridge.html).
- Tabla de puntos ACBL: [ACBL – Scoring](https://acbl.org/learn/).

### Términos clave
- **Baza**: conjunto de una carta jugada por cada jugador.
- **Triunfo**: palo designado que supera a los demás en la determinación de la baza ganadora.
- **Contrato**: nivel y palo acordados en la subasta, que determina cuántas bazas debe ganar la pareja declaradora.
- **Doblar**: acción que multiplica por dos la puntuación del contrato de la pareja contraria.
- **Redoblar**: acción que vuelve a multiplicar por dos (total ×4) la puntuación del contrato ya doblado.
- **Vulnerabilidad**: condición que modifica los bonos y penalizaciones; en la variante Chicago se alterna según la mano.

### Convenciones de mesa
- *Pasar* indica falta de interés en el nivel actual.
- *Doblar* solo se permite contra la pareja contraria.
- *Redoblar* solo se permite al propio compañero después de haber sido doblado.
- La orden de los palos en la subasta (trébol‑diamante‑corazón‑pica‑NT) es obligatoria en esta variante.

### Diferencias regionales principales
- En EE. UU. la subasta puede usar órdenes de palos distintas y se permite la vulnerabilidad desde la primera mano.
- En algunas regiones de Europa se emplea la variante "Rubber" con juego continuo y vulnerabilidad acumulada.
- La puntuación de sobrebazas y bonos puede variar ligeramente según la federación local.

### Resumen de la mecánica
1. Repartir 13 cartas.
2. Subasta Chicago hasta cierre.
3. Jugar 13 bazas siguiendo el palo y el triunfo.
4. Calcular puntos según bazas logradas, sobrebazas, dobles y vulnerabilidad.
5. Repetir durante cuatro manos, rotando dador y vulnerabilidad.

### Notas de práctica
- Mantener registro de bazas por pareja para evitar errores de conteo.
- Verificar siempre la vulnerabilidad antes de aplicar bonos.
- Utilizar marcadores de puntos claros para cada mano.

## Práctica

#### Tarea individual
1. Baraja una baraja completa y reparte 13 cartas a cuatro jugadores ficticios (puedes usar papel y lápiz para anotar las manos). Anota la mano de la pareja Norte‑Sur.
2. Realiza una subasta simulada siguiendo la regla Chicago. Registra cada oferta, paso, doble o redoble.
3. Determina el contrato final y escribe cuál será el número de bazas requeridas.
4. Simula el juego de la carta sin un adversario real: escribe una secuencia de 13 bazas indicando qué carta jugaría cada posición (N, E, S, O) bajo la regla de seguir palo y ganar con triunfo.
5. Cuenta cuántas bazas gana la pareja declaradora y calcula la puntuación de esa mano usando la tabla de puntos proporcionada. Anota el resultado.
6. Repite el proceso para al menos dos manos más, cambiando el dador según el orden Chicago. Al final, suma los puntajes de las tres manos y verifica cuál pareja tendría la ventaja.

Esta práctica permite consolidar la mecánica de la subasta, el flujo de juego y el cálculo de puntuación sin necesidad de compañeros. Al comparar los resultados con la tabla de puntos, el alumno comprobará la correcta aplicación de los bonos y penalizaciones.

## Comprobaciones

1. ¿Cuántas bazas necesita ganar la pareja declaradora si el contrato es 3♠?
Respuesta: Necesita ganar 9 bazas (6 + nivel 3).
2. En una mano sin vulnerabilidad, si la pareja declaradora cumple un contrato de 2NT y gana 2 sobrebazas, ¿cuál es la puntuación total del contrato sin considerar bonos ni penalizaciones?
Respuesta: La primera baza de NT vale 40 puntos y las siguientes 30, por lo que 2NT equivale a 8 bazas (6+2). Puntos de contrato: 40 + 7×30 = 250. Cada sobrebaza vale 30 puntos, entonces 2 sobrebazas añaden 60. Total = 310 puntos.

## Cierre

La sesión de Bridge descrita brinda una base sólida para jugar cuatro manos completas con subasta y puntuación. En la próxima lección se abordará otro juego de cartas por parejas que complementa la experiencia estratégica, manteniendo la estructura de práctica individual y evaluaciones de comprensión.
