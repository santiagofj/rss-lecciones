---
schemaVersion: 1
id: 225c93cf-1827-48b2-a089-d0fa1e1d558e
sequence: 21
course: fullstack
stepId: valores-y-referencias
title: Distinguir valores y referencias
publishedAt: 2026-10-27T08:46:48.508Z
generationDate: 2026-10-26
summary: Esta lección explora cómo las variables interactúan con los datos en
  memoria, diferenciando entre la copia de valores y la asignación por
  referencia. Se utiliza un ejemplo de una nota compartida para ilustrar cómo
  los cambios en una variable pueden afectar a otras si ambas apuntan al mismo
  dato mutable. El objetivo es comprender cuándo dos variables observan el mismo
  dato, lo cual es fundamental para predecir el comportamiento de los programas
  y evitar efectos secundarios inesperados, especialmente en sistemas donde
  múltiples componentes manipulan el mismo estado. Se emplean tablas y…
generation:
  model: gemini-2.5-flash
  promptVersion: v3
  contextHash: 64ff189eca8bac57b25932b3feb48965a3415c141e43fbc6927985b4624c92e2
---

## Por qué ahora
En las lecciones anteriores, hemos explorado cómo un servidor gestiona el estado y cómo los datos se mueven entre la memoria volátil y el almacenamiento persistente. También hemos visto la importancia de las fronteras de confianza y cómo el servidor valida y asegura la integridad de los datos. Para construir sistemas robustos y predecibles, es fundamental comprender cómo las variables en un programa interactúan con los datos en memoria. Cuando múltiples partes de un sistema manipulan la misma información, es crucial saber si están trabajando con copias independientes o si están observando y modificando el mismo dato subyacente. Esta distinción es clave para evitar efectos secundarios no deseados y para diseñar lógica que maneje el estado de manera consistente, un aspecto crítico en cualquier aplicación web que gestione datos compartidos como las notas.

## Explicación y ejemplo
En programación, las variables son nombres que se asocian a valores en la memoria. La forma en que esta asociación funciona depende de si el valor es un "valor" o una "referencia".

Los **valores** son datos primitivos o inmutables, como números, cadenas de texto o booleanos. Cuando se asigna un valor de una variable a otra, se crea una copia independiente de ese valor. Cualquier cambio posterior en una de las variables no afectará a la otra.

Las **referencias** son punteros a ubicaciones de memoria donde se almacenan datos más complejos o mutables, como objetos o arreglos. Cuando se asigna una referencia de una variable a otra, ambas variables terminan apuntando a la misma ubicación de memoria. Esto significa que si se modifica el dato a través de una de las variables, la otra variable también observará ese cambio, porque ambas están viendo el mismo dato subyacente.

Consideremos el caso de una nota en nuestro sistema de notas compartidas. Una nota podría representarse como un objeto con propiedades como `id`, `titulo` y `contenido`.

**Escenario 1: Copia de valores (datos primitivos)**

Supongamos que tenemos el título de una nota:

```pseudocodigo
variable_A = "Mi primera nota"
variable_B = variable_A

// Modificamos variable_A
variable_A = "Título actualizado"

// ¿Qué valor tienen variable_A y variable_B?
```

Estado de la memoria:

| Variable    | Valor en memoria     | Observa | Comentarios                                |
| :---------- | :------------------- | :------ | :----------------------------------------- |
| `variable_A`| "Mi primera nota"    | `0x100` | `variable_A` apunta a la dirección `0x100` |
| `variable_B`| "Mi primera nota"    | `0x101` | `variable_B` recibe una copia de `0x100` |

Después de `variable_A = "Título actualizado"`:

| Variable    | Valor en memoria     | Observa | Comentarios                                |
| :---------- | :------------------- | :------ | :----------------------------------------- |
| `variable_A`| "Título actualizado" | `0x102` | `variable_A` ahora apunta a una nueva dirección `0x102` |
| `variable_B`| "Mi primera nota"    | `0x101` | `variable_B` sigue apuntando a su copia original `0x101` |

En este caso, `variable_A` y `variable_B` son independientes. Cambiar `variable_A` no afecta a `variable_B`.

**Escenario 2: Copia de referencias (datos mutables)**

Ahora, consideremos un objeto `nota`:

```pseudocodigo
nota_original = { id: 1, titulo: "Mi primera nota", contenido: "Contenido inicial" }
nota_referencia = nota_original

// Modificamos el contenido a través de nota_original
nota_original.contenido = "Contenido modificado por original"

// ¿Qué valor tienen nota_original y nota_referencia?
```

Estado de la memoria:

| Variable          | Valor en memoria                                  | Observa | Comentarios                                                              |
| :---------------- | :------------------------------------------------ | :------ | :----------------------------------------------------------------------- |
| `nota_original`   | `{ id: 1, titulo: "Mi primera nota", contenido: "Contenido inicial" }` | `0x200` | `nota_original` apunta a la dirección `0x200` donde está el objeto       |
| `nota_referencia` | `{ id: 1, titulo: "Mi primera nota", contenido: "Contenido inicial" }` | `0x200` | `nota_referencia` recibe una copia de la *referencia* `0x200` de `nota_original` |

Después de `nota_original.contenido = "Contenido modificado por original"`:

| Variable          | Valor en memoria                                  | Observa | Comentarios                                                              |
| :---------------- | :------------------------------------------------ | :------ | :----------------------------------------------------------------------- |
| `nota_original`   | `{ id: 1, titulo: "Mi primera nota", contenido: "Contenido modificado por original" }` | `0x200` | El objeto en `0x200` ha sido modificado. `nota_original` sigue apuntando a `0x200` |
| `nota_referencia` | `{ id: 1, titulo: "Mi primera nota", contenido: "Contenido modificado por original" }` | `0x200` | `nota_referencia` sigue apuntando a `0x200` y observa el cambio           |

En este caso, tanto `nota_original` como `nota_referencia` observan el mismo objeto en la dirección `0x200`. Un cambio realizado a través de `nota_original` es visible a través de `nota_referencia` porque ambas variables acceden al mismo dato mutable.

Esta distinción es crucial cuando se pasan datos entre funciones o componentes, o cuando se almacenan objetos en estructuras de datos. Si se espera que una copia sea independiente, pero en realidad es una referencia, los cambios inesperados pueden propagarse por el sistema, dificultando la depuración y la gestión del estado.

## Práctica
Considera el siguiente pseudocódigo que simula la gestión de una lista de notas en un servidor. El servidor mantiene una lista de notas activas y, en un momento dado, necesita procesar una subselección de esas notas.

```pseudocodigo
// Estado inicial del servidor
notas_activas = [
  { id: 1, titulo: "Nota A", contenido: "Contenido A" },
  { id: 2, titulo: "Nota B", contenido: "Contenido B" },
  { id: 3, titulo: "Nota C", contenido: "Contenido C" }
]

// Seleccionamos la primera nota para procesarla
nota_para_procesar = notas_activas[0]

// Simulamos una modificación durante el procesamiento
nota_para_procesar.titulo = "Nota A (Procesada)"
nota_para_procesar.contenido = "Contenido A (Actualizado)"

// ¿Qué valor tiene notas_activas[0].titulo y notas_activas[0].contenido después de la modificación?
// ¿Qué valor tiene notas_activas[1].titulo y notas_activas[1].contenido?

// Ahora, consideremos otro escenario

// Creamos una nueva nota
nueva_nota_temporal = { id: 4, titulo: "Nota D", contenido: "Contenido D" }

// Añadimos la nueva nota a la lista de activas
notas_activas.añadir(nueva_nota_temporal)

// Modificamos la nota temporal después de añadirla
nueva_nota_temporal.titulo = "Nota D (Finalizada)"

// ¿Qué valor tiene notas_activas[3].titulo después de esta última modificación?
```

Tu tarea es predecir el estado final de las propiedades `titulo` y `contenido` de las notas en la lista `notas_activas` después de cada bloque de pseudocódigo. Explica por qué se producen esos resultados, haciendo referencia a los conceptos de valor y referencia. Para comprobar tu respuesta, puedes transcribir el pseudocódigo a un lenguaje de programación que conozcas (como JavaScript, Python o PHP) y ejecutarlo, observando los valores de las variables en cada paso.

## Comprobaciones
1. ¿Qué valor tiene `notas_activas[0].titulo` después de la primera serie de modificaciones (`nota_para_procesar.titulo = "Nota A (Procesada)"`)?
Respuesta: "Nota A (Procesada)"
2. ¿Qué valor tiene `notas_activas[3].titulo` después de la última modificación (`nueva_nota_temporal.titulo = "Nota D (Finalizada)"`)?
Respuesta: "Nota D (Finalizada)"

## Cierre
Comprender la distinción entre valores y referencias es fundamental para razonar sobre el flujo de datos y el estado en cualquier programa. Esta comprensión nos permite predecir cómo los cambios en una parte del código pueden afectar a otras. En la próxima lección, aplicaremos este conocimiento al razonamiento con funciones y contratos, donde la forma en que los datos se pasan y se modifican tiene implicaciones directas en la fiabilidad y el mantenimiento del software.
