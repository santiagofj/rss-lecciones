---
schemaVersion: 1
id: 3035538d-26f8-4743-bdf2-bf79ee95d240
sequence: 23
course: fullstack
stepId: ambito-closures
title: Seguir el ámbito de una variable
publishedAt: 2026-10-28T09:28:12.786Z
generationDate: 2026-10-28
summary: Esta lección explica cómo determinar qué datos puede usar una función y
  durante cuánto tiempo, un concepto fundamental para predecir el comportamiento
  de los programas. Se compara el contexto local de una función con el mecanismo
  por el cual una función puede retener una referencia a datos de su entorno de
  creación, incluso después de que dicho entorno haya terminado de ejecutarse.
  Se utiliza un ejemplo concreto para ilustrar cómo las variables pueden
  extender su vida útil, lo cual es crucial para gestionar el estado en
  aplicaciones web y evitar efectos secundarios inesperados. El objetivo es…
generation:
  model: gemini-2.5-flash
  promptVersion: v3
  contextHash: 631a7f3715ec294b977784ada124f100d236a3863341bd44206489e35bbf8dce
---

## Por qué ahora
En lecciones anteriores, hemos explorado cómo las funciones encapsulan lógica y cómo los valores y las referencias interactúan con los datos en memoria. También hemos diseccionado las responsabilidades de las funciones en el contexto de una petición web, distinguiendo entre cálculo, acceso a datos y generación de respuestas. Para construir sistemas robustos y predecibles, es esencial comprender no solo qué hace una función, sino también a qué datos tiene acceso y durante cuánto tiempo esos datos permanecen disponibles. Este conocimiento permite razonar sobre el estado de una aplicación, prever efectos secundarios y asegurar que las operaciones se realicen con la información correcta. Comprender el ámbito de una variable es un prerrequisito para gestionar colecciones de datos de manera efectiva y para diseñar componentes que mantengan su estado de forma controlada.

## Explicación y ejemplo
El ámbito de una variable define la región de un programa donde esa variable es accesible. Cuando se declara una variable dentro de una función, su ámbito es típicamente local a esa función. Esto significa que la variable solo existe y es accesible mientras la función se está ejecutando. Una vez que la función termina, las variables locales suelen dejar de existir y su memoria puede ser liberada.

Considere una función simple para procesar una nota:

```pseudocode
FUNCION procesarNota(idNota, contenido)
  // idNota y contenido son variables locales a procesarNota
  IMPRIMIR "Procesando nota con ID: " + idNota
  GUARDAR_EN_BASE_DE_DATOS(idNota, contenido)
FIN FUNCION

LLAMAR procesarNota("nota-123", "Contenido de la primera nota")
// Aquí, idNota y contenido ya no son accesibles
```

En este ejemplo, `idNota` y `contenido` son variables locales a `procesarNota`. Una vez que `procesarNota` finaliza, estas variables dejan de ser accesibles. Cada vez que se llama a `procesarNota`, se crean nuevas instancias de estas variables locales.

Sin embargo, existe un mecanismo por el cual una función puede "recordar" o "capturar" variables de su entorno de creación, incluso después de que ese entorno haya terminado de ejecutarse. Esto ocurre cuando una función interna se define dentro de otra función y la función interna es devuelta o almacenada en algún lugar. La función interna mantiene una referencia a las variables de su función externa, extendiendo la vida útil de esas variables.

Consideremos un escenario donde queremos crear un editor de notas que siempre opere sobre una nota específica, sin tener que pasar el ID de la nota en cada operación. Podríamos definir una función que "fabrique" editores para notas particulares:

```pseudocode
FUNCION crearEditorDeNotas(idNotaEspecifica, usuarioAutorizado)
  // idNotaEspecifica y usuarioAutorizado son variables locales a crearEditorDeNotas
  // pero serán capturadas por las funciones internas.

  FUNCION editarContenido(nuevoContenido)
    SI NO ES_AUTORIZADO(usuarioAutorizado, idNotaEspecifica) ENTONCES
      RETORNAR ERROR_AUTORIZACION("Usuario no autorizado para editar esta nota")
    FIN SI
    ACTUALIZAR_BASE_DE_DATOS(idNotaEspecifica, nuevoContenido)
    RETORNAR "Nota " + idNotaEspecifica + " actualizada."
  FIN FUNCION

  FUNCION obtenerContenido()
    SI NO ES_AUTORIZADO(usuarioAutorizado, idNotaEspecifica) ENTONCES
      RETORNAR ERROR_AUTORIZACION("Usuario no autorizado para ver esta nota")
    FIN SI
    RETORNAR LEER_DE_BASE_DE_DATOS(idNotaEspecifica)
  FIN FUNCION

  RETORNAR { editar: editarContenido, obtener: obtenerContenido }
FIN FUNCION

// Creamos un editor para la nota "nota-456" para el usuario "admin"
editorNota456 = crearEditorDeNotas("nota-456", "admin")

// Aunque crearEditorDeNotas ya terminó, editarContenido y obtenerContenido
// aún pueden acceder a idNotaEspecifica ("nota-456") y usuarioAutorizado ("admin")
IMPRIMIR editorNota456.obtener()
IMPRIMIR editorNota456.editar("Nuevo contenido para la nota 456")

// Creamos otro editor para una nota diferente y otro usuario
editorNota789 = crearEditorDeNotas("nota-789", "invitado")
IMPRIMIR editorNota789.obtener()
IMPRIMIR editorNota789.editar("Contenido de la nota 789") // Esto podría fallar por autorización
```

En este ejemplo, cuando `crearEditorDeNotas` se ejecuta, define las funciones `editarContenido` y `obtenerContenido`. Estas funciones internas no se ejecutan inmediatamente; en su lugar, `crearEditorDeNotas` las devuelve como parte de un objeto. Crucialmente, `editarContenido` y `obtenerContenido` mantienen una referencia a las variables `idNotaEspecifica` y `usuarioAutorizado` de su entorno de creación. Incluso después de que `crearEditorDeNotas` ha terminado de ejecutarse, las variables `idNotaEspecifica` y `usuarioAutorizado` persisten en la memoria porque las funciones `editarContenido` y `obtenerContenido` las siguen referenciando. Este fenómeno se conoce como *closure* o clausura.

Cada vez que se llama a `crearEditorDeNotas`, se crea un nuevo conjunto de `idNotaEspecifica` y `usuarioAutorizado`, y las funciones internas capturan ese nuevo conjunto. Por lo tanto, `editorNota456` y `editorNota789` operan de forma independiente, cada uno con su propio `idNotaEspecifica` y `usuarioAutorizado` capturados.

Este mecanismo permite que las funciones mantengan un estado privado y específico de su instancia, lo cual es muy útil para construir componentes modulares y para gestionar el estado de forma segura en aplicaciones complejas, como las que hemos visto en la reconstrucción de peticiones completas.

## Práctica
Considere el siguiente pseudocódigo que simula la creación de un validador de longitud para cadenas de texto. El validador se configura con una longitud mínima y máxima al ser creado, y luego puede ser utilizado repetidamente para verificar diferentes cadenas.

```pseudocode
FUNCION crearValidadorDeLongitud(minimo, maximo)
  // minimo y maximo son variables locales a crearValidadorDeLongitud

  FUNCION validar(cadena)
    longitudCadena = LONGITUD(cadena)
    SI longitudCadena < minimo ENTONCES
      RETORNAR FALSO // La cadena es demasiado corta
    FIN SI
    SI longitudCadena > maximo ENTONCES
      RETORNAR FALSO // La cadena es demasiado larga
    FIN SI
    RETORNAR VERDADERO // La cadena tiene una longitud válida
  FIN FUNCION

  RETORNAR validar
FIN FUNCION

// Crear un validador para nombres de usuario (entre 3 y 15 caracteres)
validadorUsuario = crearValidadorDeLongitud(3, 15)

// Crear un validador para descripciones (entre 10 y 200 caracteres)
validadorDescripcion = crearValidadorDeLongitud(10, 200)

resultado1 = validadorUsuario("juanperez")
resultado2 = validadorUsuario("jp")
resultado3 = validadorDescripcion("Esta es una descripción corta.")
resultado4 = validadorDescripcion("Una descripción muy larga que excede los doscientos caracteres permitidos para este campo, lo cual debería resultar en un valor falso al ser evaluada por el validador de descripciones. Es importante que el sistema pueda manejar estas situaciones adecuadamente.")
```

Sin ejecutar el código, prediga el valor de `resultado1`, `resultado2`, `resultado3` y `resultado4`. Explique cómo las variables `minimo` y `maximo` son accesibles para la función `validar` en cada uno de los validadores (`validadorUsuario` y `validadorDescripcion`), a pesar de que la función `crearValidadorDeLongitud` ya ha terminado su ejecución. Describa qué valores específicos de `minimo` y `maximo` utiliza cada validador.

Para comprobar su respuesta, puede transcribir este pseudocódigo a un lenguaje de programación que soporte closures, como JavaScript, y ejecutarlo en un entorno de desarrollo o en la consola de un navegador web. Observe los valores resultantes y compárelos con sus predicciones.

## Comprobaciones
1. ¿Qué sucede con las variables locales de una función una vez que esta termina su ejecución, si ninguna otra función mantiene una referencia a ellas?
Respuesta: Las variables locales dejan de existir y su memoria puede ser liberada, volviéndose inaccesibles.
2. Si una función interna es devuelta por una función externa y esta función interna utiliza variables declaradas en la función externa, ¿cuál es el ciclo de vida de esas variables externas?
Respuesta: Las variables externas persisten en memoria mientras la función interna devuelta siga existiendo y referenciándolas, extendiendo su ciclo de vida más allá de la ejecución de la función externa.

## Cierre
Comprender cómo las variables persisten y son accesibles es fundamental para gestionar el estado de manera efectiva. Este conocimiento sienta las bases para organizar datos de forma estructurada y eficiente. En la próxima lección, exploraremos cómo elegir la mejor manera de organizar una colección de datos para satisfacer las necesidades de una aplicación.
