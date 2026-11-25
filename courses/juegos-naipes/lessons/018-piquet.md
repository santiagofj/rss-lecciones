---
schemaVersion: 1
id: 58e51b14-8226-4392-a727-6b20d4634537
sequence: 18
course: juegos-naipes
stepId: piquet
title: Piquet – Juego de cartas francés de dos jugadores
publishedAt: 2026-11-25T12:22:46.376Z
generationDate: 2026-11-25
summary: Piquet es un juego estratégico de 32 cartas para dos participantes que
  combina fase de descarte, declaraciones de combinaciones y juego de bazas. El
  objetivo es alcanzar al menos 100 puntos o ser el que mayor puntuación acumule
  tras seis manos. La lección presenta reglas completas, ejemplos detallados y
  ejercicios prácticos para dominar cada fase.
generation:
  model: openai/gpt-oss-120b
  promptVersion: v5
  contextHash: dd32498fe59d7ef49ed53cb7f44a7ded69f1d30dd34d75acebedef1071623843
---

## Por qué ahora

Después de haber estudiado Bridge, Mus y Mau‑Mau, el alumno dispone de experiencia en subastas, descartes y gestión de bazas. Piquet aporta una combinación singular de estas habilidades sin requerir parejas ni apuestas, lo que permite afianzar la toma de decisiones individuales y la valoración de combinaciones de cartas. Además, el juego está presente en la tradición francesa y constituye un puente histórico entre los juegos de bazas del siglo XVIII y los modernos, ofreciendo una perspectiva enriquecedora para quien desea ampliar su repertorio de cartas europeas.

## Explicación y ejemplo

### Ficha del juego
- **Número de jugadores:** 2
- **Baraja:** 32 cartas (A, K, Q, J, 10, 9, 8, 7 de cada palo). No se usan comodines.
- **Cartas retiradas:** ninguna; se utiliza la baraja completa de 32.
- **Objetivo:** obtener al menos 100 puntos o, al término de seis manos, tener la mayor puntuación total.
- **Valores de las cartas:** A = 11, 10 = 10, K = 4, Q = 3, J = 2, 9‑7 = 0.
- **Jerarquía:** A > 10 > K > Q > J > 9 > 8 > 7.

### Preparación
1. Barajar la baraja completa y colocarla boca abajo.
2. El jugador que ganó la partida anterior corta la baraja.
3. El jugador que corta decide quién reparte primero; el otro será el anciano (no‑repartidor) y el que reparte será el joven.
4. El joven reparte 12 cartas a cada jugador, normalmente en grupos de 3‑3‑3‑3, aunque también se aceptan paquetes de 2‑2‑2‑2‑2‑2. Quedan 8 cartas en el talón, boca abajo.

### Fase de descarte y extracción
- **Anciano:** puede descartar entre 0 y 5 cartas y, por cada carta descartada, toma la carta superior del talón, sin mirar antes.
- **Joven:** después de que el anciano haya completado su cambio, el joven descarta el número de cartas necesario para que el total de descartes sea 5 (si el anciano descartó 3, el joven debe descartar 2). El joven también toma las cartas correspondientes del talón.
- El talón queda agotado al final de esta fase.

### Declaraciones de combinaciones
Se realizan después del descarte y antes de iniciar las bazas.
1. **Punto (máxima serie del mismo palo):** se cuenta la suma de los valores de la mayor serie del mismo palo que no incluya una secuencia. El máximo posible es 40 puntos (A‑10‑K‑Q‑J de un mismo palo).
2. **Secuencia (runa):** la serie más larga del mismo palo, independientemente de los valores. Cada carta cuenta 1 punto; una secuencia de 5 cartas vale 5 puntos.
3. **Juego:** se declara si la suma de los valores de todas las cartas es al menos 30. En caso contrario, se declara “pique”. Si la suma alcanza 30 o más, se declara “repique”. Sólo la mejor combinación de cada tipo se anota.
- **Anotación:** el anciano anota primero, luego el joven. Cada jugador escribe la puntuación obtenida en cada categoría; sólo la mayor de cada tipo cuenta.

### Juego de bazas
- El anciano lidera la primera baza.
- Cada jugador debe seguir el palo liderado si posee cartas del mismo palo; si no, puede jugar cualquier carta.
- La carta más alta del palo liderado gana la baza; no existen triunfos externos.
- Se juegan 12 bazas (una por cada carta de la mano).

### Puntuación de bazas
- 1 punto por cada baza ganada.
- 1 punto adicional por ganar la última baza.
- 10 puntos por mayoría de bazas (ganar al menos 7 de 12).
- **Capot:** si un jugador gana las 12 bazas, recibe 40 puntos extra.
- **Bonos por declaraciones:**
  - **Pique:** 30 puntos al jugador que declara repique y el rival no alcanza 30 en su juego.
  - **Repique:** 60 puntos al jugador que declara repique y el rival tampoco alcanza 30.

### Cálculo de la mano
1. Sumar los puntos de declaraciones (punto, secuencia, juego/pique/repique).
2. Añadir los puntos de bazas (bazas ganadas, última baza, mayoría, capot).
3. Registrar el total de la mano.
4. Repetir el proceso durante seis manos o hasta que un jugador supere los 100 puntos.

### Victoria
- El jugador que primero alcance o supere 100 puntos declara victoria inmediata.
- Si después de seis manos ninguno supera los 100, gana quien tenga la mayor puntuación acumulada.

### Términos clave
- **Palo:** conjunto de cartas de mismo símbolo (oros, copas, espadas, bastos).
- **Baza:** conjunto de una carta jugada por cada jugador en una ronda; la carta más alta del palo liderado gana.
- **Triunfo:** no se utiliza en Piquet; la victoria de la baza depende exclusivamente del palo liderado.

### Ejemplo legal
Supongamos la siguiente mano tras el descarte:
- **Anciano:** A♠, 10♠, K♠, Q♠, J♠, 9♥, 8♥, 7♥, A♦, 10♦, K♦, Q♦
- **Joven:** A♥, 10♥, K♥, Q♥, J♥, 9♣, 8♣, 7♣, A♣, 10♣, K♣, Q♣
**Declaraciones del anciano:**
- Punto: serie de ♠ con valores 11+10+4+3+2 = 30 puntos (máxima serie).
- Secuencia: ninguna secuencia más larga que 5 cartas, pero la serie de ♠ cuenta como 5 cartas → 5 puntos.
- Juego: suma total de valores = 30 (punto) + 5 (secuencia) = 35 ≥ 30, declara “repique” → 60 puntos.
**Declaraciones del joven:**
- Punto: serie de ♥ con valores idénticos → 30 puntos.
- Secuencia: también 5 cartas → 5 puntos.
- Juego: suma = 35, declara “repique” → 60 puntos.
**Bazas:** El anciano lidera con A♠; el joven responde con A♥ (no puede seguir ♠). Gana la baza el anciano (A♠). Repite el proceso; supongamos que el anciano gana 8 bazas y la última baza, el joven gana 4.
**Puntuación de bazas:**
- Anciano: 8 bazas = 8 pts + 1 pt (última baza) + 10 pts (mayoría) = 19 pts.
- Joven: 4 bazas = 4 pts.
**Total de la mano:**
- Anciano: 30 (punto) + 5 (secuencia) + 60 (repique) + 19 (bazas) = 114 pts.
- Joven: 30 + 5 + 60 + 4 = 99 pts.
El anciano supera los 100 puntos y, si esta es la primera mano, ya alcanza la condición de victoria.

### Consejos iniciales y errores comunes
- Verificar siempre el número de cartas descartadas; el total debe ser cinco entre ambos jugadores.
- No confundir la serie (punto) con la secuencia; la serie se valora por los valores de las cartas, la secuencia por la longitud.
- Recordar que el juego (pique/repique) depende de la suma total de valores, no de la cantidad de cartas altas.
- Mantener la pista de cuántas bazas se han ganado para anticipar la mayoría y la última baza.
- Evitar descartar cartas valiosas que podrían formar una mejor serie o secuencia.

### Fuentes
- [Pagat – Piquet](https://www.pagat.com/notrump/piquet.html)
- [Britannica – Piquet](https://www.britannica.com/topic/piquet)
- [Official Game Rules – Piquet](https://officialgamerules.org/game-rules/piquet)

## Práctica

**Objetivo de la práctica**
Simular una mano completa de Piquet con un compañero, enfocándose en la fase de descarte, las declaraciones y el cálculo de puntuación.

**Materiales**
- Una baraja francesa de 32 cartas (se retiran los 2‑6 de cada palo).
- Papel y lápiz para anotar declaratorias y puntuaciones.

**Procedimiento**
1. Barajar y cortar la baraja. Decidan quién será el anciano y quién el joven.
2. El joven reparte 12 cartas a cada jugador, dejando 8 en el talón.
3. Cada jugador revisa su mano y decide cuántas cartas descarta (máximo 5). El anciano descarta primero, toma las cartas del talón, y luego el joven completa el total de 5 descartes.
4. Anoten las cartas de la mano final de cada jugador.
5. Realicen las declaraciones:
   - Identifiquen la serie de mayor valor del mismo palo y sumen sus valores.
   - Determinen la secuencia más larga del mismo palo y cuenten cuántas cartas forman la runa.
   - Sumen los valores de todas las cartas para decidir entre juego, pique o repique.
   - Anoten cada puntuación según el orden de juego (anciano primero).
6. Jueguen las 12 bazas siguiendo la regla de seguir palo. Lleven registro de quién gana cada baza.
7. Al concluir las bazas, calculen los puntos de bazas (bazas ganadas, última baza, mayoría, capot si corresponde).
8. Sumén la puntuación total de la mano y comparen con la meta de 100 puntos.

**Reflexión**
Después de la partida, revisen los siguientes aspectos:
- ¿Se respetó el número total de descartes?
- ¿Se identificó correctamente la mejor serie y secuencia?
- ¿Hubo alguna baza en la que se pudo haber jugado una carta diferente para cambiar el resultado?
- ¿La puntuación final coincide con los cálculos anotados?

Documenten cualquier error y repitan la simulación para afianzar la comprensión. La práctica puede repetirse con diferentes combinaciones de descarte para experimentar cómo influyen en la declaración y la puntuación.

## Comprobaciones

1. En una mano, el anciano descarta 3 cartas y el joven descarta 2. ¿Cuántas cartas del talón se utilizan en total?
Respuesta: 5 cartas del talón se utilizan, una por cada carta descartada.
2. Un jugador declara un punto de 34 puntos, una secuencia de 4 cartas y un repique. Gana 7 bazas, incluida la última. ¿Cuál es su puntuación total de la mano?
Respuesta: 34 (punto) + 4 (secuencia) + 60 (repique) + 7 (bazas) + 1 (última baza) + 10 (mayoría) = 116 puntos.

## Cierre

La partida de Piquet consolida la gestión de descartes y la valoración de combinaciones antes de la fase de bazas. En la siguiente lección se abordará la Brisca, otro juego de dos jugadores con énfasis en el triunfo y la captura de cartas.
