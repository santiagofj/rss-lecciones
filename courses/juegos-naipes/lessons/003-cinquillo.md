---
schemaVersion: 1
id: e98b4cf5-7a6d-46c8-9b2c-ce032bbe030d
sequence: 3
course: juegos-naipes
stepId: cinquillo
title: Cinquillo
publishedAt: 2026-11-19T13:21:20.102Z
generationDate: 2026-11-10
summary: Cinquillo es un juego de cartas español para cuatro jugadores que se
  basa en la construcción simultánea de escaleras por palo. Cada partida dura
  varias manos y el objetivo es alcanzar 30 puntos mediante la captura de
  escaleras y la penalización de cartas pendientes. La lección detalla el
  reglamento clásico de Ludoteka, la forma de iniciar la partida, la mecánica de
  juego y el cálculo de la puntuación, proporcionando ejemplos prácticos y
  verificaciones para consolidar la comprensión.
generation:
  model: openai/gpt-oss-120b
  promptVersion: v5
  contextHash: 018e06bb19c9d9bed7fa1813ccfe332df013022f4a1f7d6088686da2fe72e9be
---

## Por qué ahora

El conocimiento de Cinquillo amplía el repertorio de juegos de mesa tradicionales sin requerir apuestas ni componentes complejos. Tras dominar Brisca y Tute, el alumno ya maneja la baraja española y la valoración de triunfos; Cinquillo introduce la planificación de escaleras y la gestión de la obligación de pasar, habilidades que favorecen la atención a la secuencia y la cooperación implícita con los oponentes. Aprenderlo ahora permite practicar la observación de cartas jugadas y la toma de decisiones bajo la restricción de no saltar huecos, reforzando conceptos previos antes de pasar a juegos de mayor interacción como Corazones.

## Explicación y ejemplo

### Ficha del juego
- **Nombre**: Cinquillo (versión clásica de Ludoteka)
- **Número de jugadores**: 4
- **Baraja**: Española de 40 cartas (oros, copas, espadas y bastos). Se retiran los 8 y 9.
- **Cartas por jugador**: 10
- **Carta inicial**: El jugador que posee el cinco de oros comienza la partida colocando esa carta sobre la mesa.

### Preparación
1. Se barajan las 40 cartas y se reparten diez a cada jugador, sin revelar al resto.
2. Cada jugador revisa su mano y conserva sus cartas; no se forman montones de descarte.
3. Se determina el sentido de juego: horario (convención de mesa explícita).

### Turnos y desarrollo
- En su turno, un jugador debe **colocar una carta** sobre la mesa siguiendo una de dos posibilidades:
  1. **Iniciar una nueva escalera**: colocar un cinco de cualquier palo que no haya sido usado todavía.
  2. **Ampliar una escalera existente**: colocar la carta que sea **contigua** al valor más bajo o más alto de una escalera ya abierta del mismo palo (por ejemplo, si está la secuencia 5‑6‑7 de copas, se puede añadir el 4 o el 8 de copas). La secuencia completa es A‑2‑3‑4‑5‑6‑7‑Sota‑Caballo‑Rey; no existen 8 ni 9.
- **Obligación de pasar**: si el jugador no posee ninguna carta que cumpla los criterios anteriores, debe pasar sin jugar. Pasar es la única acción permitida cuando no hay jugada válida.
- No se permite **saltar huecos** ni cambiar de palo dentro de una escalera.

### Bloqueo y estrategia básica
Un jugador puede **retener una carta intermedia** (por ejemplo, el 6 de bastos) para impedir que otro complete una escalera y forzarle a pasar. Retenerla es legal siempre que la carta no se juegue en ese turno; pasar ilegalmente mientras se posee una jugada válida constituye una infracción.

### Final de la mano
- La mano concluye cuando **un jugador se queda sin cartas**. En ese momento, los demás jugadores suman los valores de sus cartas pendientes.

### Puntuación y victoria
- El jugador que quedó sin cartas recibe **5 puntos**.
- Cada carta pendiente en la mano de los oponentes otorga **un punto adicional** al jugador que la dejó sin jugar (es decir, 1 punto por cada carta ajena que quede en la mesa).
- Cada carta que **permanezca en la propia mano** al final de la mano **resta 1 punto** al jugador que la conserva.
- La partida se repite hasta que algún jugador alcance **30 puntos** o más; ese jugador es el ganador.

### Términos clave
- **Palo**: conjunto de cartas de un mismo símbolo (oros, copas, espadas, bastos).
- **Baza**: en Cinquillo no se forman bazas tradicionales; el término se usa sólo para referirse a la **escalera** que se va construyendo.
- **Triunfo**: no existe palo de triunfo; la prioridad es la continuidad de la secuencia dentro del mismo palo.
- **Desempate**: si dos jugadores llegan simultáneamente a 30 puntos, el que tenga mayor diferencia positiva respecto al rival al final de la última mano es declarado ganador.

### Ejemplo legal completo
Supongamos una partida con los cuatro jugadores A, B, C y D.
1. **Reparto**: cada uno recibe 10 cartas. A tiene el cinco de oros.
2. **A** inicia colocando el **5 de oros**.
3. **B** tiene el 6 de oros y el 5 de copas. Puede ampliar la escalera de oros o iniciar una nueva. Decide colocar el **6 de oros** (ampliación).
4. **C** posee el 4 de oros y el 7 de oros; elige el **4 de oros** (ampliación por el extremo bajo).
5. **D** tiene el 5 de espadas y el 5 de bastos; inicia una nueva escalera colocando el **5 de espadas**.
6. **A** ahora tiene el 3 de oros y el 7 de oros. No puede jugar 3 porque el 2 de oros no está presente; sin embargo, sí puede colocar el **7 de oros** (extremo alto). Lo hace.
7. **B** retiene el **6 de copas** aunque podría jugarlo, para bloquear a C que tiene el 5 de copas. B pasa.
8. **C** tiene el 5 de copas y el 8 de copas (no existe). Solo el 5 es viable; coloca el **5 de copas**, iniciando una nueva escalera.
9. **D** posee el 4 de espadas; la coloca, ampliando la escalera de espadas.
10. La partida continúa de esta forma hasta que **A** se queda sin cartas tras colocar su último 2 de oros.

Al cerrarse la mano:
- A gana **5 puntos** por haber quedado sin cartas.
- Las cartas pendientes de B (6 de copas, 9 de bastos, etc.) suman **3 puntos** a A.
- Las cartas pendientes de C (7 de copas, Rey de bastos) restan **2 puntos** a C.
- Las cartas pendientes de D (Rey de oros, 2 de bastos) restan **2 puntos** a D.
Resultado parcial: A +8, B 0, C -2, D -2. El conteo se acumula a lo largo de las manos hasta superar los 30 puntos.

### Fuente
Reglas consultadas en [Ludoteka – Cinquillo](https://www.ludoteka.com/juegos/cinquillo/reglas).

## Práctica

**Objetivo de la práctica**: reproducir una mano completa de Cinquillo usando una baraja española física sin necesidad de adversarios reales. El alumno dispondrá de cuatro manos simuladas (una por jugador) y anotará cada movimiento en una hoja de papel.

**Materiales**:
- Baraja española de 40 cartas (sin 8 ni 9).
- Cuatro filas dibujadas en una hoja que representen a los jugadores A, B, C y D.
- Marcador para registrar las cartas jugadas y la secuencia de cada palo.

**Procedimiento**:
1. Baraja y reparte diez cartas a cada fila, manteniéndolas ocultas.
2. Identifica al jugador que posee el cinco de oros; este será el iniciador.
3. Simula turnos siguiendo el sentido horario. En cada turno, revisa la mano del jugador activo y determina si puede **iniciar** o **ampliar** una escalera según las reglas descritas. Registra la carta jugada bajo la columna correspondiente al palo.
4. Si el jugador no tiene jugada válida, marca "Pasa" en su fila.
5. Continúa hasta que un jugador se quede sin cartas.
6. Al terminar, cuenta los puntos de acuerdo con la tabla de puntuación: 5 puntos por terminar, +1 por cada carta ajena pendiente, -1 por cada carta propia pendiente.
7. Anota el total de puntos obtenido y compáralo con el objetivo de 30 puntos para verificar el progreso.

**Reflexión posterior**: revisa la hoja y verifica si en algún momento se respetó la regla de no saltar huecos. Identifica cualquier momento en que se haya bloqueado a otro jugador reteniendo una carta intermedia y evalúa si esa decisión fue estratégica o forzada.

Esta práctica permite interiorizar la mecánica de construcción de escaleras y la obligación de pasar sin necesidad de compañeros, enfocándose en la toma de decisiones y el control de la propia mano.

## Comprobaciones

1. ¿Qué carta debe colocar el jugador que posee el cinco de oros al iniciar la partida?
Respuesta: El cinco de oros, que abre la primera escalera.
2. En una mano donde un jugador termina sin cartas y sus oponentes tienen un total de 7 cartas pendientes, ¿cuántos puntos obtiene ese jugador?
Respuesta: 5 puntos por terminar más 7 puntos por cartas ajenas pendientes, total 12 puntos.

## Cierre

La lección ha cubierto todas las reglas esenciales de Cinquillo, incluyendo la construcción de escaleras, la obligación de pasar y el cálculo de la puntuación. En la siguiente entrega se abordará el juego de Corazones, que introduce la dinámica de captura de puntos negativos y la gestión de cartas de penalidad. Prepararse para identificar los palos que generan penalizaciones será clave para el éxito en ese juego.
