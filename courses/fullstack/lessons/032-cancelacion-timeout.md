---
schemaVersion: 1
id: f8c2187a-dd74-46bc-aec5-37b80f894711
sequence: 32
course: fullstack
stepId: cancelacion-timeout
title: Separar cancelación y timeout
publishedAt: 2026-11-07T09:47:46.583Z
generationDate: 2026-11-06
summary: Esta lección aborda la distinción fundamental entre la cancelación de
  una operación asíncrona y un timeout. Se explica cómo la cancelación, a menudo
  iniciada por el usuario, indica que el cliente ya no necesita el resultado,
  pero no implica necesariamente la detención de la tarea en el servidor. Por
  otro lado, un timeout es un límite de tiempo impuesto por el sistema para
  esperar una respuesta, y tampoco garantiza que la operación remota se haya
  abortado o deshecho. Se analiza la importancia de comprender que las
  operaciones de escritura remotas, en particular, pueden completarse incluso
  si…
generation:
  model: gemini-2.5-flash
  promptVersion: v3
  contextHash: 6a5b7c327f01fa65899dccd37070a286a8e54c20954e3c068af67881301e6bcb
---

## Por qué ahora
En el desarrollo de aplicaciones web, las operaciones asíncronas son omnipresentes. Hemos explorado cómo componer sus resultados, ejecutar tareas concurrentemente y propagar sus fallos. Sin embargo, hay situaciones en las que un cliente deja de esperar una respuesta antes de que la operación remota concluya. Esto puede ocurrir por dos razones principales: una cancelación explícita por parte del usuario o un timeout impuesto por el sistema. Es crucial entender que, aunque el cliente deje de esperar, la operación en el servidor puede seguir su curso. Confundir la cancelación o el timeout con la anulación garantizada de una operación remota, especialmente una que modifica el estado, puede llevar a inconsistencias de datos y comportamientos inesperados en el sistema. Esta lección aborda la necesidad de distinguir entre estas dos situaciones y sus implicaciones para la lógica de la aplicación, especialmente en el contexto de operaciones de escritura.

## Explicación y ejemplo
La cancelación y el timeout son mecanismos para gestionar la espera de resultados asíncronos, pero sus significados y consecuencias son distintos. La **cancelación** es una señal del cliente que indica que ya no está interesado en el resultado de una operación. Por ejemplo, un usuario cierra una ventana de búsqueda o navega a otra página mientras una consulta compleja está en curso. El **timeout**, por otro lado, es un límite de tiempo predefinido que el sistema impone para esperar una respuesta. Si la respuesta no llega dentro de ese plazo, la espera se interrumpe automáticamente. Ambos resultan en que el cliente deja de esperar, pero ninguno de los dos garantiza que la operación remota haya sido detenida o deshecha.

Consideremos el caso de nuestra aplicación de notas compartidas. Un usuario puede estar editando una nota y, al presionar "Guardar", se inicia una solicitud HTTP `PUT` al servidor para actualizar el contenido. Si el usuario, inmediatamente después de presionar "Guardar", decide que no quiere esperar y cierra la pestaña del navegador, esto es una forma de cancelación. Si la red es lenta o el servidor está sobrecargado, la solicitud `PUT` podría tardar más de lo esperado y el cliente podría experimentar un timeout configurado, por ejemplo, a 10 segundos.

En ambos escenarios (cancelación por cierre de pestaña o timeout), el cliente deja de esperar una respuesta. Sin embargo, la solicitud `PUT` al servidor ya ha sido enviada. El servidor puede recibirla, procesarla y actualizar la nota en la base de datos, incluso si el cliente ya no está escuchando la respuesta. Esto significa que la operación de escritura remota puede completarse con éxito, aunque el cliente nunca reciba una confirmación.

Para ilustrar esto, consideremos el siguiente pseudocódigo para una operación de guardado de nota:

```pseudocode
funcion guardarNota(notaId, contenido):
  // Iniciar la solicitud PUT al servidor
  promesaRespuesta = enviarSolicitudHTTP(
    metodo: "PUT",
    url: "/api/notas/" + notaId,
    cuerpo: { "contenido": contenido }
  )

  // Configurar un timeout para la espera de la respuesta
  promesaConTimeout = aplicarTimeout(promesaRespuesta, 10000 // 10 segundos)

  // Esperar el resultado o la cancelación/timeout
  intentar:
    respuesta = esperar(promesaConTimeout)
    si respuesta.estado == 200:
      mostrarMensaje("Nota guardada con éxito")
    sino:
      mostrarMensaje("Error al guardar la nota: " + respuesta.estado)
  capturar (error):
    si error es de tipo TimeoutError:
      mostrarMensaje("El servidor tardó demasiado en responder. La nota podría haberse guardado.")
    sino si error es de tipo CancelacionError:
      mostrarMensaje("Operación de guardado cancelada. La nota podría haberse guardado.")
    sino:
      mostrarMensaje("Error inesperado: " + error.mensaje)

// En el servidor, la operación de guardado:
funcion manejarPUTNota(notaId, nuevoContenido):
  // Simular una operación que puede tardar
  esperar(tiempoAleatorioEntre(1, 15) * 1000) // 1 a 15 segundos
  
  // Actualizar la base de datos
  actualizarBaseDeDatos("notas", notaId, { "contenido": nuevoContenido })
  
  // Enviar respuesta HTTP 200 OK
  enviarRespuestaHTTP(200, { "mensaje": "Nota actualizada" })
```

En este ejemplo, si el `tiempoAleatorio` en el servidor es de 12 segundos, y el cliente tiene un timeout de 10 segundos, el cliente recibirá un `TimeoutError`. El mensaje al usuario indicará que la nota *podría* haberse guardado. Esto es crucial porque la operación de `actualizarBaseDeDatos` en el servidor se ejecutará de todas formas. De manera similar, si el usuario cancela la operación (por ejemplo, cerrando la pestaña) antes de los 12 segundos, el cliente dejará de esperar, pero el servidor continuará y completará la actualización.

La clave es que la interrupción de la espera en el cliente no es una señal para el servidor de que debe deshacer o detener la operación. Para operaciones de escritura, esto implica que la aplicación debe estar preparada para la eventual consistencia de los datos, y el usuario debe ser informado de la incertidumbre. La única forma de garantizar que una operación remota no se complete es que el servidor implemente un mecanismo explícito de cancelación que sea invocado por el cliente y que el servidor pueda procesar de manera atómica, lo cual es una complejidad adicional que no siempre es necesaria o factible.

## Práctica
Considere un escenario en el que un usuario está buscando notas en la aplicación. Al escribir en un campo de búsqueda, se envía una solicitud `GET` al servidor para obtener resultados. Si el usuario escribe rápidamente, es posible que se envíen múltiples solicitudes de búsqueda en un corto período. El cliente podría decidir cancelar las solicitudes de búsqueda anteriores cuando se envía una nueva, ya que solo le interesa el resultado de la última. Además, el sistema podría tener un timeout para estas búsquedas, por ejemplo, 5 segundos.

Describa el flujo de eventos y las posibles consecuencias en los siguientes casos, asumiendo que el servidor procesa cada solicitud de búsqueda de forma independiente y que una búsqueda puede tardar entre 1 y 7 segundos en el servidor:

1.  El usuario escribe "curso" y se envía una solicitud de búsqueda. Después de 2 segundos, el usuario escribe "full stack", lo que provoca la cancelación de la primera búsqueda en el cliente y el envío de una nueva. La segunda búsqueda tarda 6 segundos en el servidor.
2.  El usuario escribe "api" y se envía una solicitud de búsqueda. El servidor tarda 6 segundos en procesarla. El cliente tiene un timeout de 5 segundos para las búsquedas.

Para cada caso, identifique:
*   Qué solicitudes HTTP llegan al servidor y cuáles se procesan completamente.
*   Qué recibe el cliente (respuesta, timeout, cancelación).
*   Qué mensaje o estado podría mostrarse al usuario en el cliente.

## Comprobaciones
1.  ¿Cuál es la principal diferencia entre un timeout y una cancelación desde la perspectiva del cliente que espera una respuesta de una operación remota?
    Respuesta: Un timeout es un límite de tiempo predefinido impuesto por el sistema para esperar una respuesta, mientras que una cancelación es una señal explícita del cliente indicando que ya no necesita el resultado de la operación. Ambos resultan en que el cliente deja de esperar, pero la causa es diferente.
2.  Si una operación de escritura remota (por ejemplo, actualizar una nota) experimenta un timeout en el cliente, ¿se puede asumir que la operación no se completó en el servidor?
    Respuesta: No, no se puede asumir que la operación no se completó en el servidor. El timeout solo significa que el cliente dejó de esperar la respuesta dentro del tiempo límite. La solicitud de escritura pudo haber llegado al servidor y completarse con éxito, incluso si el cliente nunca recibió la confirmación.

## Cierre
Comprender que la cancelación y el timeout no garantizan la interrupción de una operación remota es fundamental para diseñar sistemas robustos. Esta distinción es especialmente relevante cuando se manejan operaciones que modifican el estado del sistema. En la siguiente lección, exploraremos cómo la validación de datos se integra en estos flujos, distinguiendo entre diferentes tipos de validación y sus momentos de aplicación.
