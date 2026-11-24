---
schemaVersion: 1
id: faee74d6-7909-45e8-a374-faa608d80e01
sequence: 17
course: juegos-naipes
stepId: mau-mau
title: Mau-Mau
publishedAt: 2026-11-24T13:28:36.618Z
generationDate: 2026-11-24
summary: Mau‑Mau es un juego de descarte rápido que utiliza una baraja francesa
  y combina la coincidencia de rango o palo con cartas especiales que modifican
  el turno. El objetivo es ser el primer jugador en quedarse sin cartas,
  anunciando “Mau” y “Mau‑Mau” según corresponda. Es adecuado para 2‑6
  participantes y permite jugar rondas sucesivas acumulando puntos según las
  cartas que quedan en mano.
generation:
  model: openai/gpt-oss-120b
  promptVersion: v5
  contextHash: 34974705f1213d2a990f5326e8128e624c62e67b801821d639a874ab39649f46
---

## Por qué ahora

Mau‑Mau es un juego de descarte muy extendido en Europa y América Latina. Después de haber estudiado trucos, canastas y escobas, el jugador ya domina conceptos como la jerarquía de los palos y la captura de bazas. Introducir Mau‑Mau permite reforzar esas nociones mientras se aprende una mecánica basada en la coincidencia de rango o palo y en cartas especiales que alteran el flujo. Además, el juego se adapta a grupos de 2 a 6 personas y a una baraja estándar, lo que lo hace inmediato de poner en práctica con cualquier mazo disponible.

## Explicación y ejemplo

### Ficha del juego
- **Número de jugadores:** 2‑6
- **Baraja:** francesa de 52 cartas (versión de 32 cartas omite los valores 2‑6).
- **Cartas excluidas:** en la variante de 32 se retiran 2, 3, 4, 5 y 6 de cada palo.
- **Objetivo:** ser el primer jugador en descartar todas sus cartas.
- **Valores de las cartas:** del 7 al 10 valen su número, las figuras (J, Q, K) valen 10, el As vale 11 a efectos de puntuación al final de la ronda.
- **Jerarquía de rangos:** no afecta al juego, solo se necesita coincidir en rango o palo.
- **Dirección de juego:** en sentido horario.
- **Quién comienza:** el jugador a la izquierda del crupier (repartidor).
- **Obligaciones:** al inicio de su turno el jugador debe jugar una carta válida o robar una carta si no tiene ninguna.
- **Reposición:** sólo se roba una carta cuando no se puede jugar; no hay reposición automática de la pila de descarte.
- **Excepciones y desempates:** si dos jugadores quedan sin cartas en la misma ronda, se decide por la puntuación de sus manos restantes antes de la última jugada; el menor total gana.

### Preparación
1. Barajar la baraja completa (o la versión de 32 cartas). 
2. El crupier corta el mazo y reparte 5 cartas a cada jugador; en partidas de 2 jugadores se reparten 7 cartas.
3. Colocar la carta superior del mazo restante boca arriba para iniciar la pila de descarte. Si la carta es un 8, 7 o As, se aplica su efecto inmediato.

### Turnos
En su turno el jugador debe:
- **Jugar una carta** que coincida en **palo** o **rango** con la carta visible de la pila de descarte.
- **Cartas especiales:**
  - **8:** cambia el palo a cualquier palo elegido por el jugador que la juega.
  - **7:** obliga al siguiente jugador a robar dos cartas a menos que él también juegue un 7, acumulando el número de cartas a robar.
  - **As:** salta el turno del siguiente jugador.
- Si no posee una carta válida, **roba una carta** del mazo; si la carta robada es jugable, puede jugarla inmediatamente, de lo contrario termina su turno.
- Cuando el jugador se queda con una sola carta debe anunciar **“Mau”** antes de que el siguiente jugador actúe. Al jugar la última carta debe decir **“Mau‑Mau”**; la falta de anuncio conlleva una penalización de 5 puntos añadidos a su total.

### Final de mano
La mano finaliza cuando un jugador descarta su última carta. Ese jugador es el ganador de la ronda y no recibe puntos. Los demás jugadores suman los valores de las cartas que les quedan en mano.

### Puntuación y victoria
- Cada carta restante se cuenta según los valores descritos en la ficha del juego.
- Se pueden jugar varias rondas acumulando puntos hasta alcanzar un límite acordado (por ejemplo 100 puntos). El jugador con menor puntuación al alcanzar el límite gana la partida.

### Ejemplo legal
Supongamos una partida de 4 jugadores (A, B, C y D) con la variante de 52 cartas.
1. **Reparto:** cada jugador recibe 5 cartas. La primera carta de la pila de descarte es un **9 de corazones**.
2. **Turno de A:** tiene un 9 de trébol y un 8 de diamantes. Juega el **9 de trébol** (coincide en rango). La pila muestra ahora 9 de trébol.
3. **Turno de B:** no tiene carta de rango 9 ni de trébol, por lo que **roba** una carta; resulta ser el **7 de corazones**, que puede jugar porque coincide en palo. Juega el 7 y declara “7”.
4. **Turno de C:** está obligado a robar dos cartas por el 7, a menos que juegue otro 7. No tiene 7, por lo que roba dos cartas (un **2 de picas** y un **K de corazones**). No puede jugar, termina su turno.
5. **Turno de D:** juega un **K de corazones** (coincide en rango). La pila muestra K de corazones.
6. **Turno de A:** tiene un **8 de corazones**. Juega el 8, declara “cambio a picas” y voltea el palo a picas.
7. **Turno de B:** ahora debe seguir con picas. Tiene un **A de picas**, lo juega y, al ser As, salta el turno de C.
8. **Turno de D:** sin cartas válidas, roba una carta y termina.
9. **Turno de A:** tiene una última carta, un **5 de picas**. Juega la carta, anuncia “Mau‑Mau” y gana la ronda.
10. **Puntuación:** B tiene en mano 2 de picas (valor 2) y 7 de corazones (valor 7) → 9 puntos. C tiene 2 de picas (2) y K de corazones (10) → 12 puntos. D tiene 3 cartas cuyo valor total es 23 puntos. B, C y D suman sus puntos a su total acumulado.

### Consejos iniciales y errores comunes
- **Planificar el uso de los 8**: cambiar el palo estratégicamente permite forzar al oponente a robar o a quedarse sin jugada.
- **Controlar los 7 acumulados**: si varios 7 se juegan consecutivamente, la cantidad de cartas a robar puede crecer rápidamente; observar la pila evita sorpresas.
- **Anunciar “Mau” y “Mau‑Mau”**: olvidar el anuncio genera una penalización automática; es útil contar mentalmente las cartas antes de jugar.
- **No robar innecesariamente**: si se tiene una carta jugable, jugarla es preferible a robar, ya que el robo puede añadir cartas de alto valor a la mano.

### Diferencias regionales principales
- En algunas variantes de Alemania el 7 obliga a robar solo una carta y el 8 permite también cambiar la dirección de juego.
- En versiones sudamericanas el As obliga a que el siguiente jugador salte dos turnos en lugar de uno.
- La versión de 32 cartas elimina los valores 2‑6 y, por tanto, reduce la duración de la partida y la cantidad de puntos posibles en cada ronda.

Fuentes consultadas: [CardRulesPlus – Mau‑Mau](https://cardrulesplus.com/games/mau-mau) | [Wikipedia – Mau‑Mau](https://en.wikipedia.org/wiki/Mau-Mau_(card_game)) | [Grokipedia – Mau‑Mau](https://grokipedia.com/page/Mau-Mau_(card_game)).

## Práctica

**Tarea práctica**
1. Reúne un mazo de 52 cartas y forma un grupo de dos a cuatro personas.
2. Sigue la preparación descrita en la sección de explicación y reparte las cartas correspondientes.
3. Juega una ronda completa, prestando especial atención a:
   - El momento en que cambias el palo con un 8.
   - La acumulación de 7 y la cantidad de cartas que cada jugador debe robar.
   - El anuncio correcto de “Mau” y “Mau‑Mau”.
4. Al finalizar la ronda, anota los valores de las cartas que quedaron en cada mano y verifica que la puntuación coincide con los cálculos mostrados en el ejemplo.
5. Reflexiona sobre cuál fue la carta especial que más influyó en el desarrollo del juego y registra una breve observación sobre cómo podrías usarla en la próxima partida.
Esta práctica permite experimentar todas las mecánicas sin necesidad de un oponente adicional; si solo hay dos jugadores, cada uno controlará ambas manos para simular la dinámica completa.

## Comprobaciones

1. ¿Qué carta se juega cuando la carta superior de la pila es un 9 de corazones y el jugador tiene un 9 de trébol y un 8 de diamantes?
Respuesta: Se juega el 9 de trébol, ya que coincide en rango.
2. En una secuencia donde se juegan dos 7 consecutivos, ¿cuántas cartas debe robar el siguiente jugador si no dispone de otro 7?
Respuesta: Debe robar cuatro cartas, porque cada 7 obliga a robar dos y la obligación se acumula.

## Cierre

La siguiente lección abordará otro juego de descarte que mantiene la mecánica de coincidencia de rango, pero introduce una dinámica de captura de bazas diferente. Continuaremos ampliando el repertorio de juegos de cartas accesibles y estratégicos.
