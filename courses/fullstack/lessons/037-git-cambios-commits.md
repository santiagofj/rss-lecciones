---
schemaVersion: 1
id: 43279466-918e-4670-b73c-252486460e20
sequence: 37
course: fullstack
stepId: git-cambios-commits
title: Leer cambios antes de guardarlos
publishedAt: 2026-11-16T10:48:15.337Z
generationDate: 2026-11-11
summary: Esta lección aborda la gestión de cambios en un proyecto de software,
  distinguiendo entre la copia de trabajo, el índice y el historial. Se explica
  cómo estos tres estados interactúan para preparar y registrar modificaciones
  de forma controlada. A través de un ejemplo práctico, se ilustra la
  interpretación de un diff para identificar cambios de contenido y formato, y
  se justifica la importancia de agrupar modificaciones coherentes en un commit.
  El objetivo es proporcionar una comprensión clara de cómo se rastrean y
  consolidan las revisiones antes de su integración permanente, sentando las…
generation:
  model: gemini-2.5-flash
  promptVersion: v3
  contextHash: c66254b5c858e62e03b2460cf56390c0173d9ce285c1f0673087f6ce0abfa093
---

## Por qué ahora
En el desarrollo de software, las aplicaciones evolucionan constantemente. Las lecciones anteriores han explorado cómo diseñar estados de operaciones asíncronas, cómo el entorno afecta el comportamiento del código y la importancia de las dependencias para la reproducibilidad. Sin embargo, antes de que un cambio se integre en un sistema o se despliegue, es fundamental comprender y gestionar las modificaciones individuales. La capacidad de identificar qué ha cambiado, dónde y por qué, es un prerrequisito para cualquier proceso de colaboración o control de versiones. Esta lección establece los conceptos fundamentales para leer y organizar los cambios antes de que se conviertan en parte del historial permanente de un proyecto, lo cual es esencial para mantener la coherencia y la trazabilidad en cualquier aplicación, incluyendo la de notas compartidas.

## Explicación y ejemplo
Cuando se trabaja en un proyecto de software, los cambios no se aplican directamente al historial permanente. Existe un proceso intermedio que permite revisar, agrupar y describir las modificaciones antes de que se registren. Este proceso involucra tres estados principales de los archivos:

1.  **Copia de trabajo (Working Copy):** Son los archivos tal como existen actualmente en el sistema de archivos local del desarrollador. Incluyen todas las modificaciones que se están realizando, pero que aún no han sido preparadas para ser guardadas permanentemente.
2.  **Índice (Staging Area o Index):** Es un área intermedia donde se seleccionan y agrupan los cambios específicos de la copia de trabajo que se desean incluir en la próxima versión o "commit". Permite construir una instantánea precisa de los archivos que se registrarán, sin incluir otras modificaciones pendientes en la copia de trabajo.
3.  **Historial (Repository History):** Es el registro permanente y secuencial de todas las versiones o "commits" del proyecto. Cada commit representa una instantánea completa del proyecto en un momento dado, junto con un mensaje que describe los cambios realizados.

El flujo de trabajo básico es el siguiente: se realizan cambios en la copia de trabajo, se seleccionan los cambios deseados para el índice, y luego se crea un commit a partir del índice, que se añade al historial.

Para entender qué ha cambiado entre estos estados, se utiliza una herramienta de comparación llamada `diff`. Un `diff` muestra las diferencias línea por línea entre dos versiones de un archivo. Por ejemplo, si tenemos un archivo `mi_nota.md` con el siguiente contenido inicial:

```markdown
# Mi primera nota

Esta es una nota de prueba.
```

Ahora, realizamos dos modificaciones en la copia de trabajo:
1.  Añadimos una nueva línea al final del párrafo.
2.  Cambiamos el título para que sea más específico.

La copia de trabajo ahora se ve así:

```markdown
# Mi primera nota importante

Esta es una nota de prueba.
Aquí añado una nueva idea.
```

Si comparamos la copia de trabajo con el historial (asumiendo que el historial contiene la versión inicial), un `diff` podría mostrar algo similar a esto:

```diff
--- a/mi_nota.md
+++ b/mi_nota.md
@@ -1,3 +1,4 @@
-# Mi primera nota
+# Mi primera nota importante
 
 Esta es una nota de prueba.
+Aquí añado una nueva idea.
```

En este formato `diff`:
*   `--- a/mi_nota.md` y `+++ b/mi_nota.md` indican los archivos que se están comparando (la versión original `a` y la nueva `b`).
*   `@@ -1,3 +1,4 @@` es el "chunk header" que indica las líneas afectadas. `-1,3` significa que en el archivo `a` se afectaron 3 líneas a partir de la línea 1. `+1,4` significa que en el archivo `b` se afectaron 4 líneas a partir de la línea 1.
*   Las líneas que comienzan con `-` (rojo) son líneas eliminadas de la versión `a`.
*   Las líneas que comienzan con `+` (verde) son líneas añadidas en la versión `b`.
*   Las líneas sin prefijo son líneas que no han cambiado.

En el ejemplo, vemos que la línea `# Mi primera nota` fue eliminada y `# Mi primera nota importante` fue añadida (un cambio de contenido). También se añadió la línea `Aquí añado una nueva idea.` (otro cambio de contenido).

Consideremos ahora un cambio de formato. Si en lugar de añadir contenido, solo modificamos los espacios en blanco o la indentación de una línea existente, el `diff` lo mostraría como una línea eliminada y una línea añadida, incluso si el texto visible es el mismo. Por ejemplo, si cambiamos:

`Esta es una nota de prueba.`

por:

`  Esta es una nota de prueba.` (añadiendo dos espacios al inicio)

El `diff` sería:

```diff
--- a/mi_nota.md
+++ b/mi_nota.md
@@ -2,1 +2,1 @@
-Esta es una nota de prueba.
+  Esta es una nota de prueba.
```

Es crucial distinguir entre cambios de contenido (modificaciones significativas en la información) y cambios de formato (modificaciones en la presentación, como espacios, indentación o saltos de línea). Idealmente, los commits deben agrupar cambios que tengan un propósito coherente. Por ejemplo, un commit podría contener solo la adición de una nueva funcionalidad, mientras que otro commit separado podría contener solo la corrección de errores de formato. Esto facilita la revisión del código, la identificación de la causa de posibles problemas y la reversión de cambios específicos si fuera necesario.

El "commit" es la acción de tomar la instantánea actual del índice y añadirla al historial del proyecto, junto con un mensaje descriptivo. Este mensaje es fundamental para entender el propósito de los cambios sin tener que revisar el `diff` completo. Un buen mensaje de commit explica *por qué* se hicieron los cambios, no solo *qué* se cambió.

## Práctica
Imagine que está trabajando en la aplicación de notas compartidas. Ha abierto un archivo `nota_de_reunion.md` y ha realizado las siguientes modificaciones en su copia de trabajo:

1.  Ha corregido un error tipográfico en el segundo párrafo, cambiando "desarollo" por "desarrollo".
2.  Ha añadido una nueva sección al final del archivo con el título "Próximos pasos" y dos puntos de acción.
3.  Ha reformateado una lista existente en el primer párrafo, cambiando los guiones (`-`) por asteriscos (`*`) y añadiendo un espacio extra después de cada asterisco para mejorar la legibilidad.

Su tarea es la siguiente:

1.  Describa cómo se vería un `diff` entre su copia de trabajo y el historial (asumiendo que el historial contiene la versión original del archivo antes de sus cambios). Utilice el formato `diff` mostrado en la explicación, representando las líneas añadidas, eliminadas y modificadas.
2.  Explique cómo agruparía estos cambios en commits coherentes. Justifique su decisión sobre qué cambios incluiría en cada commit y por qué esta separación es beneficiosa para el historial del proyecto.

Para comprobar su respuesta, puede escribir el contenido original del archivo, luego aplicar los cambios descritos y generar un `diff` utilizando una herramienta de control de versiones (como Git, aunque no es necesario instalarlo para esta práctica, solo para simular el resultado). Luego, compare su `diff` generado con su descripción. Para la segunda parte, reflexione sobre cómo su propuesta de commits facilita la comprensión del historial y la gestión de futuras modificaciones o reversiones.

## Comprobaciones
1.  ¿Cuál es la diferencia principal entre la copia de trabajo y el índice?
    Respuesta: La copia de trabajo contiene todos los archivos en el sistema local con sus modificaciones actuales, mientras que el índice es un área intermedia que contiene solo los cambios seleccionados y preparados para ser incluidos en el próximo commit.
2.  Si un `diff` muestra una línea con un `-` y la misma línea (con un cambio menor, como un espacio extra) con un `+`, ¿qué tipo de cambio es más probable que represente y por qué es importante reconocerlo?
    Respuesta: Es probable que represente un cambio de formato (por ejemplo, un cambio en la indentación o en los espacios en blanco). Es importante reconocerlo porque los cambios de formato deben agruparse idealmente en commits separados de los cambios de contenido para mantener un historial claro y facilitar la revisión y el seguimiento de las funcionalidades.

## Cierre
Comprender la distinción entre la copia de trabajo, el índice y el historial, así como la capacidad de interpretar un `diff`, son habilidades fundamentales para cualquier desarrollador. Permiten una gestión precisa de las modificaciones y una preparación cuidadosa de los commits. Esta base es esencial para el siguiente paso, que abordará cómo razonar sobre ramas e integración, donde múltiples conjuntos de cambios deben coexistir y fusionarse de manera efectiva.
