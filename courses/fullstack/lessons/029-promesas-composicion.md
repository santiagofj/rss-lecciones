---
schemaVersion: 1
id: 9b7d61b1-a7d9-4728-9d7c-1235614b35dd
sequence: 29
course: fullstack
stepId: promesas-composicion
title: Componer resultados futuros
publishedAt: 2026-11-06T10:34:43.695Z
generationDate: 2026-11-03
summary: Esta lección explica cómo las operaciones asíncronas se encadenan,
  donde el resultado de una es un prerrequisito para la siguiente. Se distingue
  entre iniciar una tarea asíncrona, que devuelve un "futuro" o "promesa"
  inmediatamente, y esperar su resolución para obtener el valor final. Se
  utiliza pseudocódigo y una traza de ejecución para ilustrar cómo se gestionan
  estas dependencias en un flujo de trabajo, asegurando que las operaciones se
  ejecuten en el orden lógico requerido por sus datos, sin bloquear el programa.
  El objetivo es comprender la composición de flujos de trabajo asíncronos.
generation:
  model: gemini-2.5-flash
  promptVersion: v3
  contextHash: b0d6044e7ec4ca19a57fc1444a87181fa2dd263579fa80b0c1daf255fd9ce1f2
---

## Por qué ahora
En las lecciones anteriores, se examinó cómo estructurar un programa en módulos para separar responsabilidades y cómo los errores se propagan a través de estas capas. También se abordó la distinción entre el orden en que se escribe el código y el orden en que se completan las operaciones, especialmente cuando se interactúa con sistemas externos de forma asíncrona. Una aplicación web rara vez realiza una única operación aislada; es común que una acción del usuario desencadene una secuencia de operaciones interdependientes. Por ejemplo, para actualizar una nota, primero se debe verificar la identidad del usuario, luego su autorización para modificar esa nota específica, y solo entonces proceder con la actualización en la base de datos. Cada uno de estos pasos puede ser una operación asíncrona que requiere el resultado del paso anterior. Comprender cómo componer estas operaciones, de modo que el resultado de una se convierta en la entrada de la siguiente, es fundamental para construir flujos de trabajo robustos y eficientes en sistemas distribuidos.

## Explicación y ejemplo
Cuando una operación asíncrona se inicia, no devuelve el resultado final de inmediato, sino un objeto que representa un valor que estará disponible en el futuro. Este objeto se conoce comúnmente como "promesa" o "futuro". La clave para componer operaciones asíncronas es encadenar estas promesas, de modo que la ejecución de una operación subsiguiente se programe para comenzar solo después de que la operación anterior haya completado exitosamente y su resultado esté disponible.

Consideremos el caso de una aplicación de notas compartidas donde un usuario desea actualizar el contenido de una nota existente. Este proceso implica varias etapas que deben ejecutarse en un orden específico:

1.  **Autenticar al usuario:** Verificar la identidad del usuario que realiza la solicitud. Esta operación devuelve el identificador del usuario (`userId`).
2.  **Autorizar la edición de la nota:** Con el `userId` obtenido, verificar si el usuario tiene permiso para modificar la nota con un `noteId` específico. Esta operación devuelve un booleano (`isAuthorized`).
3.  **Actualizar la nota:** Si el usuario está autorizado, proceder a guardar el nuevo contenido (`newContent`) para la nota con `noteId` en la base de datos. Esta operación devuelve un estado de éxito o fallo.

Cada una de estas operaciones (`autenticarUsuario`, `autorizarEdicion`, `actualizarNota`) es asíncrona y devuelve una promesa. Para componerlas, se utiliza un mecanismo que permite especificar qué hacer con el resultado de una promesa una vez que se resuelve. En pseudocódigo, esto se puede representar de la siguiente manera:

```pseudocode
funcion manejarActualizacionDeNota(tokenDeSesion, noteId, newContent):
  // Paso 1: Autenticar al usuario
  // La funcion 'autenticarUsuario' devuelve una promesa de 'userId'
  promesaDeUserId = autenticarUsuario(tokenDeSesion)

  // Paso 2: Encadenar la autorización una vez que 'userId' esté disponible
  // 'promesaDeUserId.entonces()' espera a que 'promesaDeUserId' se resuelva
  promesaDeAutorizacion = promesaDeUserId.entonces(function(userId):
    // Ahora tenemos 'userId'. Podemos iniciar la operación de autorización.
    // 'autorizarEdicion' devuelve una promesa de 'isAuthorized'
    retornar autorizarEdicion(userId, noteId)
  )

  // Paso 3: Encadenar la actualización una vez que 'isAuthorized' esté disponible
  promesaDeResultadoFinal = promesaDeAutorizacion.entonces(function(isAuthorized):
    si (isAuthorized):
      // Si está autorizado, iniciar la actualización de la nota.
      // 'actualizarNota' devuelve una promesa de estado de éxito/fallo.
      retornar actualizarNota(noteId, newContent)
    sino:
      // Si no está autorizado, lanzar un error de autorización.
      // Esto se propagará como un fallo en la cadena de promesas.
      lanzar Error("No autorizado para editar esta nota")
  )

  // Manejar posibles errores en cualquier punto de la cadena
  promesaDeResultadoFinal.capturarError(function(error):
    imprimir("Error en la actualización de la nota: ", error.mensaje)
    // Podría retornar una promesa de fallo o un valor por defecto
    retornar fallo
  )

  // La función 'manejarActualizacionDeNota' devuelve inmediatamente
  // 'promesaDeResultadoFinal', que se resolverá o rechazará más tarde.
  retornar promesaDeResultadoFinal

```

**Traza de Promesa/Futuro:**

1.  `manejarActualizacionDeNota` es llamada.
2.  `autenticarUsuario(tokenDeSesion)` se ejecuta. Devuelve `promesaDeUserId` (estado: pendiente).
3.  `promesaDeUserId.entonces(...)` se registra. La función de *callback* (`function(userId)`) no se ejecuta aún.
4.  `promesaDeAutorizacion` se crea (estado: pendiente), representando el resultado futuro del *callback* de `promesaDeUserId`.
5.  `promesaDeAutorizacion.entonces(...)` se registra. La función de *callback* (`function(isAuthorized)`) no se ejecuta aún.
6.  `promesaDeResultadoFinal` se crea (estado: pendiente), representando el resultado futuro del *callback* de `promesaDeAutorizacion`.
7.  `promesaDeResultadoFinal.capturarError(...)` se registra.
8.  `manejarActualizacionDeNota` termina su ejecución síncrona, devolviendo `promesaDeResultadoFinal`.
9.  En algún momento futuro, `autenticarUsuario` completa su operación y resuelve `promesaDeUserId` con un `userId`.
10. El *callback* de `promesaDeUserId.entonces(...)` se ejecuta con el `userId`.
11. Dentro de este *callback*, `autorizarEdicion(userId, noteId)` se ejecuta. Devuelve una nueva promesa que se convierte en el valor de `promesaDeAutorizacion`.
12. En algún momento futuro, `autorizarEdicion` completa y resuelve `promesaDeAutorizacion` con `isAuthorized`.
13. El *callback* de `promesaDeAutorizacion.entonces(...)` se ejecuta con `isAuthorized`.
14. Si `isAuthorized` es verdadero, `actualizarNota(noteId, newContent)` se ejecuta. Devuelve una nueva promesa que se convierte en el valor de `promesaDeResultadoFinal`.
15. Si `isAuthorized` es falso, se lanza un error, y `promesaDeResultadoFinal` se rechaza con ese error.
16. En caso de rechazo, el *callback* de `promesaDeResultadoFinal.capturarError(...)` se ejecuta.

Este flujo demuestra que la construcción de la cadena de promesas ocurre de forma síncrona, pero la ejecución de los *callbacks* y la resolución de las promesas ocurren de forma asíncrona, en el orden dictado por la finalización de las operaciones subyacentes. Se diferencia claramente entre *construir* la tarea (definir la secuencia de dependencias) y *esperar* su resultado (la resolución efectiva de cada promesa en la cadena).

## Práctica
Considere un nuevo flujo de trabajo en la aplicación de notas compartidas: un usuario desea crear una nueva nota y compartirla inmediatamente con un colaborador específico. Este proceso implica los siguientes pasos:

1.  **Generar un identificador único para la nueva nota.** Esta operación es síncrona y devuelve un `newNoteId`.
2.  **Guardar la nueva nota en la base de datos.** Requiere el `newNoteId`, el `userId` del creador y el `content` inicial. Esta operación es asíncrona y devuelve una promesa de éxito o fallo.
3.  **Compartir la nota con un colaborador.** Requiere el `newNoteId` y el `collaboratorId`. Esta operación es asíncrona y devuelve una promesa de éxito o fallo.

Describa la secuencia de operaciones y cómo se encadenarían las promesas para asegurar que la nota se guarde antes de intentar compartirla. Identifique qué operaciones devuelven una promesa y cuáles consumen el resultado de una promesa anterior. Además, explique qué sucedería si la operación de guardar la nota falla y cómo afectaría a la operación de compartir.

## Comprobaciones
1.  ¿Cuál es la principal diferencia entre construir una cadena de promesas y esperar su resultado?
    Respuesta: Construir una cadena de promesas implica definir la secuencia de operaciones y sus dependencias de forma síncrona, mientras que esperar su resultado se refiere a la ejecución asíncrona de esas operaciones y la resolución de cada promesa en el tiempo, lo que permite que el programa no se bloquee.
2.  En el ejemplo de la práctica, ¿qué operación depende directamente del éxito de la operación de guardar la nota?
    Respuesta: La operación de compartir la nota con un colaborador depende directamente del éxito de la operación de guardar la nota, ya que requiere el `newNoteId` que solo estará disponible y será válido si la nota se ha guardado correctamente.

## Cierre
Esta lección ha explorado cómo encadenar operaciones asíncronas para construir flujos de trabajo complejos, asegurando que las dependencias se respeten. Se ha distinguido entre la definición de la tarea y su ejecución efectiva. El siguiente paso es considerar cómo optimizar estos flujos, identificando qué operaciones pueden ejecutarse de forma independiente y concurrente para mejorar la eficiencia general del sistema.
