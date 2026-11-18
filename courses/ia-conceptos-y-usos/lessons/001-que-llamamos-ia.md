---
schemaVersion: 1
id: d4ac721d-b71e-4aab-8325-ec555f3dd8ea
sequence: 1
course: ia-conceptos-y-usos
stepId: que-llamamos-ia
title: Qué llamamos IA
publishedAt: 2026-11-18T14:36:38.679Z
generationDate: 2026-11-18
summary: Tres ejemplos muestran cómo distinguir una regla de código, una
  clasificación aprendida y una propuesta generada, y cómo comprobar sus
  resultados.
generation:
  model: codex
  promptVersion: v3
  contextHash: 3b07d3f9506abc6b6063504d01c78036200062b18a49e872fc2d0a07162f5667
---

## Por qué ahora

Un editor puede marcar una línea que conviene quitar, una casilla de correo puede mover un mensaje a spam y un asistente puede proponer un cambio de código. Los tres sistemas procesan información y devuelven un resultado, pero cada uno llega a él por un mecanismo distinto. Identificar ese mecanismo ayuda a elegir la herramienta y a saber cómo comprobar lo que hizo.

En esta lección vamos a comparar una regla de un *linter*, un filtro de spam que aprende de ejemplos y un asistente de programación. Para cada caso seguiremos el mismo recorrido. Identificaremos qué recibe, qué entrega, de dónde proviene su comportamiento y qué evidencia permitiría confiar en el resultado.

## Explicación y ejemplo

### Una regla escrita

Un *linter* examina código fuente y señala patrones definidos por sus reglas. Pensemos en un proyecto de JavaScript que activa la regla `no-debugger` de ESLint. Su entrada incluye el código y la configuración del proyecto. Su salida, cuando encuentra una sentencia `debugger`, es un aviso que permite ubicarla. La condición está escrita en la regla y el equipo decide si habilitarla. [Documentación de la regla en ESLint](https://eslint.org/docs/latest/rules/no-debugger).

Rodear la palabra con comillas cambia el caso. La expresión `"debugger"` es una cadena y `debugger;` es una sentencia. La regla examina la estructura del programa, así que puede distinguirlas. Para comprobar el aviso, basta con revisar qué hay en la línea, cuál es la regla activa y si el código cumple la condición que documenta. Este ejemplo sirve como referencia de automatización mediante una regla explícita.

### Aprender a clasificar

Imaginemos un filtro de spam entrenado con mensajes que ya fueron clasificados como «spam» o «legítimo». Esas dos categorías son las **etiquetas**. El programa de entrenamiento usa los ejemplos etiquetados para ajustar un **modelo**, que es la representación que el sistema usará para clasificar mensajes nuevos. El **aprendizaje automático** consiste aquí en ajustar el modelo a partir de datos para que pueda aplicar lo aprendido a casos que todavía no vio.

El filtro podría recibir información sobre el asunto, el remitente y el contenido de un correo nuevo. Su salida podría ser un puntaje de spam. Otra parte del sistema compara el puntaje con un valor de corte, llamado **umbral**, y decide a qué carpeta mover el mensaje. La pantalla muestra una sola acción. Por debajo hay un modelo que asigna un puntaje y una regla que aplica el umbral. Un filtro de correo real puede combinar varios mecanismos.

Un mensaje comercial legítimo podría compartir palabras y estructuras con muchos ejemplos de spam. Para medir ese error hay que probar con mensajes nuevos de clasificación conocida y observar cuántos correos legítimos terminan en spam. Revisar cómo funciona el umbral ayuda a entender la decisión. Para saber con qué frecuencia ocurre el problema, hacen falta ejemplos representativos.

### Producir contenido

Un asistente de programación podría recibir este pedido: «Completa una función que devuelva el precio indicado o use 100 como valor predeterminado si el precio está ausente. Cero es un precio válido». Su salida podría incluir un fragmento de JavaScript y una explicación. En este caso hablamos de **IA generativa** porque el modelo produce contenido en respuesta a la entrada. Un **modelo de lenguaje** genera texto a partir del contexto que recibe. El código puede formar parte de ese texto.

Una propuesta plausible sería `precio || 100`. Funciona con 50 y también cuando el argumento está ausente. Falla con 0, porque JavaScript trata ese valor como falso al evaluar `||`. Si el contrato define como ausentes únicamente `null` y `undefined`, la expresión `precio ?? 100` cubre esos casos y conserva el cero. La propuesta del asistente se comprueba con las reglas del lenguaje y con los resultados esperados de la función. [Especificación de ECMAScript](https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#sec-binary-logical-operators-runtime-semantics-evaluation).

### Una forma de ubicar cada término

La **inteligencia artificial** abarca sistemas que procesan entradas para inferir salidas como clasificaciones, predicciones, contenido o decisiones. El tipo de salida depende de la tarea. El filtro aprendido y el asistente son ejemplos con salidas distintas. El primero estima la clase de un mensaje. El segundo redacta una propuesta que puede ser evaluada después. La denominación general deja abierta la pregunta por el mecanismo concreto. [Definición explicada por la OCDE](https://www.oecd.org/en/publications/explanatory-memorandum-on-the-updated-oecd-definition-of-an-ai-system_623da898-en.html).

Esa pregunta también sirve en productos que combinan herramientas. Una interfaz puede mostrar una sugerencia del asistente y, en la misma pantalla, el aviso de una regla del linter. Para entender el resultado, conviene localizar qué componente produjo cada salida. Así será más fácil decidir si corresponde revisar una configuración, examinar datos de evaluación o ejecutar una prueba de comportamiento.

## Práctica

En un archivo JavaScript, define las dos versiones de la función y ejecuta el bloque con Node.js. Antes de hacerlo, anota qué valor debe devolver la función con un precio positivo, con cero y con un argumento ausente. En este ejercicio el valor predeterminado es 100 y `null` también representa ausencia.

```js
const conOr = (precio) => precio || 100
const conNulos = (precio) => precio ?? 100

for (const precio of [50, 0, undefined, null]) {
  console.log(precio, conOr(precio), conNulos(precio))
}
```

Con 50, ambas versiones devuelven 50. Con `undefined` o `null`, las dos devuelven 100. La fila de 0 muestra la diferencia: aparecen 100 y 0, respectivamente. El caso límite permite evaluar la propuesta aunque la explicación que la acompaña suene convincente.

Ahora imagina que el mismo cambio pasa por un linter con la regla `no-debugger` activada. Agrega una sentencia `debugger;` y predice qué avisaría el linter. El aviso pertenece a esa regla. La prueba con cero pertenece al contrato de la función. Cada comprobación detecta un problema diferente, incluso cuando ambas se ejecutan sobre el mismo archivo.

Para trasladar el método al spam, escribe dos asuntos ficticios parecidos. Uno puede ser un boletín legítimo con «Oferta de esta semana» y el otro un correo engañoso con la misma frase. Anota cuál sería la etiqueta correcta conocida y cómo estudiarías un error del filtro. Una lista de mensajes etiquetados y los puntajes del modelo te permitirían observar si el problema aparece de forma aislada o en varios mensajes similares.

## Comprobaciones

1. Un linter y un filtro de spam muestran ambos un aviso. ¿Qué dato pedirías para distinguir el origen de cada aviso?

Respuesta: En el linter buscaría la regla y el fragmento de código que la activa. En el filtro del ejemplo pediría el puntaje del mensaje, el umbral aplicado y casos etiquetados que permitan evaluar sus errores.

2. Un asistente propone `precio || 100` y la función funciona con 50 y con un argumento ausente. ¿Qué prueba separa las dos versiones de la práctica?

Respuesta: Pasar 0 y exigir un resultado de 0. La prueba comprueba que el código respeta el requisito de conservar un precio cero.

## Cierre

Una regla escrita, un modelo de clasificación y un generador de código pueden participar en el mismo flujo. Identificar la entrada, la salida y el componente que la produjo orienta la verificación. El siguiente paso examinará cómo un puntaje de clasificación se convierte en una decisión y qué errores cambian cuando se modifica el umbral.
