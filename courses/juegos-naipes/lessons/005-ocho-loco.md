---
schemaVersion: 1
id: 1461222c-c7c9-4d3a-856a-bf503e6f6243
sequence: 5
course: juegos-naipes
stepId: ocho-loco
title: Ocho Loco
publishedAt: 2026-11-19T13:26:24.435Z
generationDate: 2026-11-12
summary: Reglas completas del Crazy Eights básico para cuatro jugadores con
  baraja francesa de 52 cartas. Se describen la preparación, el desarrollo de
  los turnos, la gestión del descarte, la puntuación y la forma de determinar al
  ganador después de varias manos. Incluye ejemplos detallados, consejos
  prácticos y dos preguntas de verificación.
generation:
  model: openai/gpt-oss-120b
  promptVersion: v5
  contextHash: 1aa4c42106f3e3916a8299191196c4efdd44a3e9339dec2619db3e8d7a2d5d65
---

## Por qué ahora

El juego de cartas es una forma eficaz de desarrollar la atención, la gestión de recursos y la toma rápida de decisiones. En el recorrido del curso se ha trabajado con trucos y variantes de origen hispano; ahora es oportuno introducir un juego de origen anglosajón que emplea la misma baraja pero con mecánicas diferentes. El “Ocho Loco” permite practicar la observación del palo dominante, la manipulación de la pila de descarte y el conteo de puntos sin recurrir a reglas de penalización como +2 o reversas, lo que facilita la transición a juegos más complejos como el Presidente.

## Explicación y ejemplo

### Ficha del juego
- **Nombre:** Ocho Loco (Crazy Eights básico)
- **Número de jugadores:** 4
- **Baraja:** 52 cartas francesas, sin comodines.
- **Cartas retiradas:** ninguna.
- **Objetivo:** Ser el primero en quedarse sin cartas en una mano; a lo largo de la partida, acumular el menor número de puntos posible.
- **Valores de cartas para la puntuación:** 8 = 50 puntos, figuras (J, Q, K) y 10 = 10 puntos, As = 1 punto, resto de números = valor nominal.
- **Dirección de juego:** Sentido horario, a partir del jugador a la izquierda del repartidor.
- **Quién comienza:** El jugador a la izquierda del repartidor.
- **Obligaciones:** En su turno, el jugador debe jugar una carta que coincida en palo o rango con la carta visible del montón de descarte, o bien jugar cualquier ocho para cambiar el palo. Si no dispone de jugada válida, debe robar una carta del mazo; puede seguir robando hasta poder jugar o hasta que el mazo se agote. Si no puede jugar y el mazo está vacío, pasa.
- **Reposición:** No se recicla el descarte; cuando el mazo se agota la mano se declara bloqueada y se vuelve a repartir.
- **Excepciones:** Cuando se juega un ocho, el jugador anuncia el nuevo palo; el ocho nunca se cuenta como rango, solo como cambio de palo.
- **Desempates:** En caso de igualdad de puntuación al final de la partida, se comparte el triunfo.

### Preparación
1. Barajar la baraja completa y repartir cinco cartas a cada jugador.
2. Colocar la carta superior del mazo boca arriba para iniciar el montón de descarte. Si la carta inicial es un ocho, se vuelve a colocar bajo el mazo y se saca otra carta.
3. El resto del mazo queda boca abajo como pila de robo.

### Turnos
- **Jugada regular:** El jugador debe colocar sobre el montón de descarte una carta que coincida en **palo** o **rango** con la carta visible. Por ejemplo, si la carta visible es 7 de corazones, puede jugar cualquier 7 o cualquier corazón.
- **Jugada de ocho:** Cualquier ocho puede jugarse en cualquier momento, independientemente del palo o rango visible. Al jugar un ocho, el jugador **anuncia** el nuevo palo que regirá a partir de ese momento. El ocho no cuenta como rango para la siguiente jugada.
- **Robo:** Si el jugador no tiene ninguna carta que cumpla las condiciones anteriores, debe robar una carta del mazo. Puede seguir robando mientras la carta robada no sea jugable; la regla permite robar incluso si el jugador tiene una jugada válida, pero no es obligatoria.
- **Paso:** Cuando el mazo está vacío y el jugador no tiene jugada, debe pasar.

### Final de mano
La mano finaliza cuando un jugador se queda sin cartas. Ese jugador gana la mano y los demás suman los puntos de sus cartas restantes según la tabla de valores. Si todos los jugadores pasan porque el mazo está vacío, la mano se declara bloqueada; se recoge el montón de descarte, se baraja nuevamente y se reparte una nueva mano, manteniéndose el mismo repartidor.

### Puntuación y victoria
- Después de cada mano, se anotan los puntos de las cartas que cada jugador todavía posee.
- Se juega un número acordado de manos (por ejemplo, cuatro manos alternando el reparto). Al final del conjunto, el jugador con **menor** total de puntos es el ganador.
- En caso de empate total, el triunfo se comparte.

### Términos clave
- **Palo:** Conjunto de cartas del mismo símbolo (corazones, diamantes, tréboles, picas).
- **Baza:** Cada carta jugada en un turno forma parte de la misma baza; el término se usa aquí para referirse a la carta visible del montón de descarte.
- **Triunfo:** En Ocho Loco no existe un palo de triunfo permanente; el ocho actúa como comodín temporal que permite cambiar el palo dominante.
- **Desempate:** Cuando la puntuación total es idéntica, se considera compartida la victoria.

### Ejemplo legal
Supongamos una partida con los siguientes pasos iniciales:
1. Repartidor distribuye 5 cartas a cada jugador y coloca la carta 9♣ como primera del descarte.
2. Jugador A (a la izquierda del repartidor) tiene en su mano: 8♦, 5♣, Q♥, 2♠, 7♦. Juega **8♦**, anunciando *palo corazones*.
3. Jugador B tiene: 3♥, K♥, 6♣, 9♦, 4♠. Como se anunció corazones, juega **K♥** (carta de corazón). El palo vuelve a ser corazones.
4. Jugador C posee: 8♠, 2♥, J♣, 5♦, 10♥. Juega **8♠**, cambiando el palo a *tréboles*.
5. Jugador D tiene: 3♣, 7♣, A♣, 9♥, 6♥. Como el palo es tréboles, juega **7♣**.
6. El turno vuelve a Jugador A; su mano ahora es 5♣, Q♥, 2♠, 7♦. No puede jugar sobre 7♣ (ni mismo palo ni mismo rango) y tampoco tiene ocho. Robo una carta: **4♣**, que tampoco sirve, por lo que sigue robando y saca **7♣**, que sí coincide en rango y la coloca.
7. La partida continúa hasta que Jugador C se queda sin cartas después de jugar su último ocho y anunciar tréboles. Los demás jugadores anotan:
   - Jugador A: Q♥ (10) + 2♠ (2) + 5♣ (5) = 17 puntos
   - Jugador B: 3♥ (3) + 9♦ (9) + 4♠ (4) = 16 puntos
   - Jugador D: A♣ (1) + 9♥ (9) + 6♥ (6) = 16 puntos
   - Jugador C: 0 puntos (ganó la mano)
   La suma parcial de la partida se registra y se procede a la siguiente mano.

### Consejos iniciales y errores comunes
- **Anunciar el palo con claridad** al jugar un ocho; el anuncio ambiguo genera disputas.
- **No olvidar robar** cuando el mazo está disponible y no hay jugada; algunos jugadores se quedan sin robar y pierden oportunidades.
- **Evitar pasar** si el mazo aún tiene cartas; robar puede proporcionar una carta que permita cerrar la mano.
- **Controlar los ocho**: aunque valen 50 puntos al final, su uso estratégico para cambiar el palo es más importante que su valor de puntuación.
- **No mezclar reglas de UNO**; en Ocho Loco no existen +2, reversa ni salto de turno.

[Fuente del reglamento](https://bicyclecards.com/how-to-play/crazy-eights)

## Práctica

#### Tarea práctica individual
1. Reúne una baraja completa de 52 cartas y retira los comodines.
2. Reparte cinco cartas a cuatro posiciones imaginarias (A, B, C, D) y coloca una carta visible como inicio del descarte.
3. Anota la mano de cada posición en una hoja de papel.
4. Simula los turnos siguiendo el orden A → B → C → D, aplicando las reglas descritas: jugar coincidencia de palo o rango, usar ocho para cambiar el palo y anunciarlo, robar del mazo cuando no haya jugada válida.
5. Continúa la simulación hasta que una posición quede sin cartas. Registra los puntos de las cartas que quedan en las demás posiciones.
6. Repite el proceso al menos tres veces, cambiando la carta inicial del descarte en cada simulación para experimentar diferentes flujos de juego.
7. Al final, suma los puntos obtenidos en cada mano y verifica que el total coincide con la tabla de valores (8 = 50, figuras/10 = 10, A = 1, resto = número).

Este ejercicio permite ensayar todas las situaciones sin necesidad de compañeros reales: se practican los cambios de palo, el manejo del mazo, la condición de bloqueo y el cómputo de la puntuación. Al escribir los resultados, el alumno puede detectar errores de interpretación y afianzar el flujo de juego.

#### Preguntas de reflexión (no evaluativas)
- ¿Qué efecto tiene jugar un ocho al inicio de la mano cuando el descarte muestra una carta de bajo valor?
- ¿Cómo cambia la estrategia si el mazo se agota antes de que algún jugador se quede sin cartas?

Registra tus respuestas para comparar con la sección de comprobaciones.

## Comprobaciones

1. En una mano donde el descarte muestra 9♦ y el jugador tiene en mano 8♣, 5♦, K♠, ¿qué jugada es obligatoria?
Respuesta: El jugador debe jugar el 8♣ para cambiar el palo, ya que el ocho puede jugarse en cualquier momento y es preferible para evitar acumular 50 puntos.
2. Si al final de una mano un jugador tiene 8♠, Q♥ y 3♣, ¿cuántos puntos se le suman?
Respuesta: 50 (por el ocho) + 10 (por la figura) + 3 = 63 puntos.

## Cierre

La práctica de Ocho Loco consolida la gestión del palo dominante y el control de la puntuación sin reglas adicionales. En la siguiente lección se abordará el juego del Presidente, que introduce mecánicas de jerarquía y rotación de roles al terminar cada mano. Mantenga la hoja de anotaciones para comparar los totales y observar la evolución de la estrategia.
