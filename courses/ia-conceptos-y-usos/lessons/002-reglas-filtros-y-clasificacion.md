---
schemaVersion: 1
id: fc6f7d1a-2130-4e90-bfe1-dd9f953dd309
sequence: 2
course: ia-conceptos-y-usos
stepId: reglas-filtros-y-clasificacion
title: Reglas, filtros y clasificación
publishedAt: 2026-11-19T11:20:52.897Z
generationDate: 2026-11-19
summary: Esta lección distingue entre una regla explícita y una decisión basada
  en un puntaje. Se explora cómo el cambio de un umbral afecta la clasificación,
  utilizando un conjunto de correos electrónicos ficticios. Se analizan los
  conceptos de falsos positivos y falsos negativos, y se evalúa el costo
  asociado a cada tipo de error. El objetivo es proporcionar una comprensión
  clara de los mecanismos subyacentes en la filtración y clasificación de
  información, relevante para la interacción con sistemas de inteligencia
  artificial.
generation:
  model: gemini-2.5-flash
  promptVersion: v3
  contextHash: 1ae28ab18a9265fe63819dbd35315e4a7630300d11bf7a113ba16338745c279c
---

## Por qué ahora
En la lección anterior, se estableció la diferencia entre una regla de código, una clasificación aprendida y una propuesta generada. Esta distinción es fundamental para comprender cómo los sistemas de inteligencia artificial procesan la información. En esta lección, se profundizará en los mecanismos de clasificación, específicamente en cómo se aplican reglas explícitas y cómo se toman decisiones basadas en puntajes. Comprender estos conceptos es esencial para un usuario que interactúa con asistentes de programación y otros sistemas de IA, ya que permite anticipar y verificar sus resultados. La capacidad de distinguir una regla de una decisión basada en un umbral, y de evaluar el impacto de modificar dicho umbral, es una habilidad práctica para interpretar el comportamiento de estos sistemas y para construir un vocabulario técnico preciso sobre IA.

## Explicación y ejemplo
La clasificación de información es una tarea común en muchos sistemas. Consiste en asignar una categoría o etiqueta a un elemento. Existen dos enfoques principales para realizar esta clasificación: mediante reglas explícitas o mediante la evaluación de un puntaje frente a un umbral.

Una **regla explícita** es una condición predefinida que, si se cumple, asigna una categoría específica al elemento. Por ejemplo, una regla podría establecer que "si el remitente de un correo electrónico es 'soporte@ejemplo.com', entonces el correo es de tipo 'Soporte'". Esta regla es binaria: el correo cumple la condición o no la cumple. No hay grados intermedios.

En contraste, la clasificación basada en un **puntaje** implica que un sistema evalúa un elemento y le asigna un valor numérico que indica la probabilidad o el grado de pertenencia a una categoría. Este puntaje se compara luego con un **umbral** predefinido. Si el puntaje supera el umbral, el elemento se clasifica en la categoría. Si no lo supera, se clasifica en otra categoría o se descarta.

Considere un escenario donde se desea clasificar correos electrónicos como "Importante" o "No Importante". Se dispone de seis correos electrónicos ficticios, cada uno con una clase correcta asignada manualmente y un puntaje de importancia generado por un sistema. Los puntajes varían de 0 a 1, donde 1 indica máxima importancia.

| Correo ID | Remitente | Clase Correcta | Puntaje de Importancia |
|:----------|:----------|:---------------|:-----------------------|
| 1         | jefe@empresa.com | Importante     | 0.95                   |
| 2         | colega@empresa.com | Importante     | 0.88                   |
| 3         | soporte@ejemplo.com | No Importante  | 0.70                   |
| 4         | noticias@blog.com | No Importante  | 0.65                   |
| 5         | cliente@empresa.com | Importante     | 0.55                   |
| 6         | spam@ofertas.com | No Importante  | 0.40                   |

Primero, apliquemos una regla explícita: "Si el remitente es 'jefe@empresa.com', el correo es 'Importante'".

*   Correo 1 (jefe@empresa.com): Clasificado como "Importante" por la regla. Coincide con la clase correcta.
*   Correos 2, 3, 4, 5, 6: No cumplen la regla. Su clasificación no se determina por esta regla.

Ahora, consideremos la clasificación basada en puntajes con dos umbrales diferentes.

**Umbral 1: 0.80** (Un correo es "Importante" si su puntaje es mayor o igual a 0.80)

*   Correo 1 (0.95): Clasificado "Importante". Clase Correcta: "Importante". (Acierto)
*   Correo 2 (0.88): Clasificado "Importante". Clase Correcta: "Importante". (Acierto)
*   Correo 3 (0.70): Clasificado "No Importante". Clase Correcta: "No Importante". (Acierto)
*   Correo 4 (0.65): Clasificado "No Importante". Clase Correcta: "No Importante". (Acierto)
*   Correo 5 (0.55): Clasificado "No Importante". Clase Correcta: "Importante". (**Falso Negativo**)
*   Correo 6 (0.40): Clasificado "No Importante". Clase Correcta: "No Importante". (Acierto)

En este caso, el Correo 5 es un **falso negativo**: se clasificó como "No Importante" cuando en realidad era "Importante". El costo de un falso negativo podría ser perder una oportunidad o retrasar una acción crítica.

**Umbral 2: 0.60** (Un correo es "Importante" si su puntaje es mayor o igual a 0.60)

*   Correo 1 (0.95): Clasificado "Importante". Clase Correcta: "Importante". (Acierto)
*   Correo 2 (0.88): Clasificado "Importante". Clase Correcta: "Importante". (Acierto)
*   Correo 3 (0.70): Clasificado "Importante". Clase Correcta: "No Importante". (**Falso Positivo**)
*   Correo 4 (0.65): Clasificado "Importante". Clase Correcta: "No Importante". (**Falso Positivo**)
*   Correo 5 (0.55): Clasificado "No Importante". Clase Correcta: "Importante". (**Falso Negativo**)
*   Correo 6 (0.40): Clasificado "No Importante". Clase Correcta: "No Importante". (Acierto)

Con el Umbral 2, el Correo 3 y el Correo 4 son **falsos positivos**: se clasificaron como "Importante" cuando en realidad eran "No Importante". El Correo 5 sigue siendo un falso negativo. El costo de un falso positivo podría ser una distracción, una pérdida de tiempo al revisar información irrelevante o una sobrecarga de atención. Al reducir el umbral, se capturan más elementos "Importantes" (se reducen los falsos negativos), pero a menudo a expensas de aumentar los falsos positivos. La elección del umbral depende del costo relativo de cada tipo de error en el contexto específico de la aplicación.

## Práctica
Para esta práctica, se utilizarán los mismos seis correos electrónicos ficticios y sus puntajes de importancia.

| Correo ID | Remitente | Clase Correcta | Puntaje de Importancia |
|:----------|:----------|:---------------|:-----------------------|
| 1         | jefe@empresa.com | Importante     | 0.95                   |
| 2         | colega@empresa.com | Importante     | 0.88                   |
| 3         | soporte@ejemplo.com | No Importante  | 0.70                   |
| 4         | noticias@blog.com | No Importante  | 0.65                   |
| 5         | cliente@empresa.com | Importante     | 0.55                   |
| 6         | spam@ofertas.com | No Importante  | 0.40                   |

**Tarea:**

1.  **Defina una nueva regla explícita:** "Si el remitente es 'cliente@empresa.com', el correo es 'Importante'". Aplique esta regla a los seis correos y determine cuántos aciertos, falsos positivos y falsos negativos se obtienen. Explique el costo de cualquier error que identifique.

2.  **Defina un nuevo umbral:** Establezca un umbral de 0.75 para la clasificación de importancia. Un correo es "Importante" si su puntaje es mayor o igual a 0.75. Clasifique los seis correos con este umbral. Cuente los aciertos, falsos positivos y falsos negativos. Explique el costo de cada tipo de error en este escenario.

3.  **Compare los resultados:** Reflexione sobre cómo la regla explícita y el umbral de 0.75 difieren en su rendimiento. Considere qué enfoque podría ser más adecuado si el costo de un falso negativo (perder un correo importante) es mucho mayor que el costo de un falso positivo (revisar un correo no importante).

Para comprobar los resultados, puede crear una tabla similar a la del ejemplo, registrando la clasificación obtenida por la regla o el umbral, y comparándola con la "Clase Correcta". Esto permitirá visualizar directamente los aciertos y los errores.

## Comprobaciones
1.  ¿Cuál es la principal diferencia observable entre una clasificación basada en una regla explícita y una basada en un puntaje con umbral?
Respuesta: Una regla explícita es una condición binaria que clasifica un elemento si se cumple una condición específica, sin grados intermedios. Una clasificación basada en puntaje asigna un valor numérico a un elemento y lo compara con un umbral, permitiendo decisiones más matizadas y la posibilidad de ajustar la sensibilidad del sistema.
2.  Si se reduce el umbral para clasificar un correo como "Importante", ¿qué efecto probable tendrá esto en la cantidad de falsos positivos y falsos negativos?
Respuesta: Reducir el umbral generalmente aumentará la cantidad de falsos positivos (más correos "No Importantes" serán clasificados como "Importantes") y disminuirá la cantidad de falsos negativos (menos correos "Importantes" serán clasificados erróneamente como "No Importantes").

## Cierre
Esta lección ha explorado los fundamentos de la clasificación mediante reglas y umbrales, y el impacto de sus ajustes. La comprensión de los falsos positivos y falsos negativos es crucial para evaluar la fiabilidad de cualquier sistema de clasificación. En la próxima lección, se abordará cómo los modelos de lenguaje pueden ser utilizados para tareas de clasificación más complejas, y cómo se pueden aplicar estos conceptos para interpretar sus resultados.
