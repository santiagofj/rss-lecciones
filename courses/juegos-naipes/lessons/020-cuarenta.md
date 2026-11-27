---
schemaVersion: 1
id: 774fec9c-05c9-4b00-ab24-2c2dc25efb79
sequence: 20
course: juegos-naipes
stepId: cuarenta
title: Cuarenta
publishedAt: 2026-11-27T11:58:33.688Z
generationDate: 2026-11-27
summary: Cuarenta es el juego de captura ecuatoriano más popular, jugado por dos
  o cuatro jugadores en equipos, con una baraja de 40 cartas y un sistema de
  puntuación que premia la captura de la mayoría de los naipes y la consecución
  de 40 puntos de partido.
generation:
  model: openai/gpt-oss-120b
  promptVersion: v5
  contextHash: bc3bd9fdfef3010cda7b5acf2a4d2be089d89a8fe3408f2c6ee583d3c37b9046
---

## Por qué ahora

El juego Cuarenta es la carta de referencia del Ecuador y representa una variante de los juegos de captura que combina estrategia de equipo, cálculo de puntos y ritmo rápido. Aprenderlo ahora permite al estudiante ampliar su repertorio más allá de los clásicos que ya domina, y experimentar una mecánica de captura por coincidencia y suma que refuerza la valoración de rangos y la cooperación. Además, Cuarenta utiliza una baraja completa reducida, lo que facilita su práctica con mazos habituales sin necesidad de componentes especiales. Incorporar este juego en la serie diaria enriquece la visión de las tradiciones latinoamericanas y prepara al jugador para futuros juegos de captura con diferentes condiciones de puntuación.

## Explicación y ejemplo

### Ficha del juego
- **Número de jugadores:** 2 o 4 (en equipos de dos cuando son cuatro).
- **Baraja:** 40 cartas. Se retiran los 8, 9 y 10 de los cuatro palos de una baraja francesa de 52 cartas; los cuarenta que quedan forman el mazo de juego. Las cartas retiradas se guardan para usar como marcadores de puntuación.
- **Objetivo:** Capturar más de la mitad de las cartas (al menos 20) en una mano para obtener puntos; el primer equipo que alcance 40 puntos de partido gana.
- **Valores y jerarquía:** Los valores siguen el orden tradicional de la baraja española adaptado: As (1) es la carta más alta en la captura por rango, seguida de Rey (13), Caballo (12), Sota (11) y los números 7‑2. En la suma a 15, los valores numéricos se emplean tal cual (As=1, 2‑7=su número, Sota=11, Caballo=12, Rey=13).
- **Dirección de juego:** Sentido horario.
- **Quién comienza:** El primer repartidor es quien recibe la primera carta de diamante al repartir cara arriba una a una; en rondas sucesivas el repartidor pasa al jugador de la izquierda.
- **Obligaciones y reposición:** Cada jugador recibe cinco cartas. No hay reposición durante la mano; el resto del mazo se coloca como montón de reserva y no se utiliza después del reparto inicial.
- **Excepciones y desempates:** Un “Ronda” (tres cartas del mismo rango en la mano) otorga 4 puntos inmediatos. Un “póker” (cuatro del mismo rango) gana la mano directamente. Si al final de la mano ninguno alcanza 20 cartas, el equipo con más cartas suma 2 puntos; en caso de empate bajo 20, el equipo no repartidor suma 2 puntos.

### Preparación
1. Retire todas las cartas 8, 9 y 10 del mazo.  
2. Baraje las 40 cartas restantes.  
3. Distribuya cinco cartas a cada jugador, una a una, en sentido horario.  
4. Coloque el resto del mazo al centro como pila de reserva (no se usa).  
5. Determinar el jugador que inicia la partida según la regla del diamante.

### Turnos y desarrollo
- En su turno, un jugador intenta **capturar** cartas de la mesa. La captura se realiza de dos formas:
  1. **Coincidencia exacta**: jugar una carta del mismo rango que una carta sobre la mesa y llevar ambas a su montón de capturas.
  2. **Suma a 15**: jugar una carta cuyo valor, sumado al de una o más cartas sobre la mesa, da exactamente 15; todas las cartas involucradas se capturan.
- Sólo se pueden capturar combinaciones que sumen exactamente 15; no se permite pasar de 15.
- Si no se puede capturar, el jugador **descarta** una carta a la mesa, quedando disponible para futuras capturas.
- Cada captura se registra en el montón del equipo; los puntos se contabilizan al final de la mano.

### Final de mano
- La mano finaliza cuando se han jugado todas las cartas de la mano (10 turnos en 2‑jugadores, 20 turnos en 4‑jugadores) o cuando un equipo consigue un “póker”.
- Se cuentan las cartas capturadas por cada equipo.

### Puntuación y victoria
- **20 cartas capturadas** = 6 puntos.
- Cada par adicional de cartas aumenta la puntuación en 2 puntos: 21‑22 = 8 puntos, 23‑24 = 10 puntos, etc., siempre redondeando al número par más próximo superior.
- Si ninguno supera 20, el equipo con más cartas suma 2 puntos; si están empatados bajo 20, el equipo que no repartió suma 2 puntos.
- El primer equipo que acumule **40 puntos** de partido gana el match.

### Términos clave
- **Baza**: conjunto de cartas jugadas en un turno antes de la captura.
- **Triunfo**: no existe una carta de triunfo en Cuarenta; la captura depende exclusivamente de coincidencia de rango o suma a 15.
- **Palo**: el palo (oros, copas, espadas, bastos) solo sirve para identificar la carta; no influye en la captura.
- **Ronda**: tres cartas del mismo rango en la mano; otorga 4 puntos inmediatos.
- **Póker**: cuatro cartas del mismo rango en la mano; anula la mano y otorga la victoria directa.

### Ejemplo legal
Supongamos una partida de 4 jugadores en equipos (A‑C contra B‑D). El reparto inicial entrega a cada jugador las siguientes cartas (solo se muestra la mano de A):
- A: As de espadas, 7 de oros, 8‑retirado, Sota de bastos, 5 de copas.
- B: Rey de oros, 3 de espadas, 6 de bastos, 2 de copas, 7 de bastos.
- C: Caballo de copas, 4 de oros, 5 de espadas, 9‑retirado, 1 de bastos.
- D: Sota de oros, 2 de espadas, 3 de oros, 6 de oros, 4 de bastos.
En la mesa no hay cartas inicialmente. A comienza y decide **descartar** el 5 de copas. La mesa queda con 5♣.
B juega el 5 de espadas y **captura** la carta 5♣ por coincidencia exacta, añadiendo ambas a su montón.
C, viendo la mesa vacía, descarta el 4 de oros.
D, con 4 de bastos en mano, **captura** el 4 de oros sumando 4+4=8 (no es 15), por lo que no puede; descarta el 2 de espadas.
A ahora tiene en la mesa 4♠ y 2♠. Juega el As de espadas y **descarta** (no hay captura). B, con 6 de bastos en mano, combina 6 + 4 + 5 = 15 (6 de bastos + 4 de oros + 5 de espadas) y captura esas tres cartas, aumentando su montón a 5 cartas capturadas.
Al terminar los diez turnos, los equipos cuentan sus capturas: Equipo A‑C: 18 cartas, Equipo B‑D: 22 cartas. Equipo B‑D supera 20, por lo que obtienen 6 puntos. Además, B no tiene ninguna ronda ni póker, así que la puntuación del hand es 6 puntos para B‑D. El marcador del partido pasa a 6‑0 a favor de B‑D.

---
**Fuentes**: [How to play Cuarenta](https://itchyfeetonthecheap.com/2020/04/16/how-to-play-cuarenta-ecuadors-favorite-card-game), [Pagat – Cuarenta](https://www.pagat.com/fishing/cuarenta.html), [Official Game Rules](https://officialgamerules.org?p=8344)

## Práctica

#### Tarea práctica para hoy
1. Reúna una baraja completa y retire todas las cartas 8, 9 y 10. Separe las 12 cartas retiradas y colóquelas a un lado como marcador de puntuación.
2. Forme dos equipos de dos jugadores o juegue en modo individual contra un compañero.
3. Distribuya cinco cartas a cada jugador siguiendo la regla del diamante para determinar el repartidor inicial.
4. Anote en una hoja de papel los valores de cada carta que reciba.
5. Juegue una mano completa respetando las reglas de captura por coincidencia y suma a 15. Cuando capture cartas, regístrelas en su montón personal.
6. Al concluir la mano, cuente las cartas capturadas por cada equipo y calcule los puntos según la tabla de puntuación (20 cartas = 6 puntos, 21‑22 = 8 puntos, etc.).
7. Registre el puntaje obtenido y compare con la tabla para verificar que el cálculo es correcto.
8. Repita la mano al menos una vez más, intentando crear una **Ronda** (tres cartas del mismo rango) para observar el bonus de 4 puntos.
9. Finalmente, reflexione sobre las decisiones de captura: ¿prefirió capturar por coincidencia exacta o sumando a 15? Anote en qué situaciones cada método resultó más ventajoso.

Esta práctica permite interiorizar la mecánica de captura, familiarizarse con el conteo de puntos y detectar errores comunes, como intentar sumar más de 15 o olvidar la regla de desempate cuando ambos equipos están bajo 20 cartas.

#### Consejos iniciales
- Observe siempre todas las cartas sobre la mesa antes de jugar; una suma a 15 puede involucrar varias cartas.
- No descarte una carta que pueda ser usada por su compañero para una captura futura.
- Revise su mano en busca de posibles Rondas antes de iniciar la partida; una Ronda vale 4 puntos instantáneos y puede cambiar la dinámica del juego.

#### Errores habituales
- Capturar una combinación que supera 15 y luego intentar corregirla; la captura se anula y se pierde el turno.
- Olvidar que el As vale 1 en la suma a 15 pero es la carta más alta para la coincidencia de rango.
- No contabilizar correctamente los puntos pares; siempre redondee al número par superior.

Al completar esta tarea, el alumno tendrá una experiencia práctica completa y podrá evaluar su comprensión antes de pasar al siguiente juego del recorrido.

## Comprobaciones

1. En una partida de 4 jugadores, si un equipo captura 23 cartas, ¿cuántos puntos obtiene ese equipo?
Respuesta: 10 puntos (20 cartas = 6 puntos, 21‑22 = 8 puntos, 23‑24 = 10 puntos).  
2. ¿Cuál es la regla para determinar quién reparte la primera mano?
Respuesta: El primer repartidor es el jugador que recibe la primera carta de diamante al repartir las cartas cara arriba una a una en sentido horario.

## Cierre

Con la práctica de Cuarenta se ha consolidado la captura por coincidencia y suma, así como el cálculo de puntos por número de cartas. El siguiente paso introducirá otro juego de captura latinoamericano que utiliza una mecánica de escobas distinta, ampliando la comprensión de las variantes de juego en equipo.
