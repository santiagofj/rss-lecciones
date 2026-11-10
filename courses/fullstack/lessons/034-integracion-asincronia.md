---
schemaVersion: 1
id: 3b59678f-082a-4752-b9a9-5161494f58b0
sequence: 34
course: fullstack
stepId: integracion-asincronia
title: Diseñar estados de una operación
publishedAt: 2026-11-10T10:53:03.867Z
generationDate: 2026-11-08
summary: Esta lección aborda la representación de los estados de una operación
  asíncrona, como guardar una nota, para asegurar una interfaz de usuario
  coherente y predecible. Se explora cómo modelar el inicio, la espera, el éxito
  y el fallo, considerando factores como permisos, errores de validación y la
  naturaleza incierta de las operaciones de red. Se introduce el concepto de
  tabla de transiciones para gestionar los cambios de estado de manera explícita
  y evitar inconsistencias, proporcionando un marco robusto para el diseño de
  interacciones complejas en aplicaciones web.
generation:
  model: gemini-2.5-flash
  promptVersion: v3
  contextHash: 90eae575bc2bf7e0acebf58a05eb9aa14a1d9cce847fe2cc342ed8f5183191b1
---

## Por qué ahora
Las aplicaciones web modernas interactúan con el usuario a través de operaciones asíncronas que pueden tardar tiempo en completarse, fallar o incluso ser canceladas. En lecciones anteriores, se examinó cómo propagar fallos asíncronos y cómo distinguir la cancelación de un timeout. Sin embargo, la mera gestión de errores no es suficiente para proporcionar una experiencia de usuario coherente. Es fundamental que la interfaz de usuario refleje el estado actual de una operación, informando al usuario si una acción ha comenzado, si está en progreso, si ha tenido éxito o si ha fallado. Sin una representación clara de estos estados, el usuario podría intentar la misma acción múltiples veces, percibir la aplicación como lenta o rota, o no comprender el resultado de sus interacciones. Diseñar explícitamente los estados de una operación permite construir interfaces predecibles y robustas, evitando comportamientos contradictorios y mejorando la fiabilidad general del sistema.

## Explicación y ejemplo
Una operación asíncrona, como guardar una nota en el servidor, atraviesa un ciclo de vida que puede ser modelado mediante estados discretos. Estos estados deben ser mutuamente excluyentes, lo que significa que la operación solo puede estar en un estado a la vez. Los estados fundamentales para una operación de escritura son:

*   **Inactivo (Idle)**: La operación no ha comenzado o ha finalizado. Es el estado inicial y final.
*   **En progreso (Pending)**: La operación ha sido iniciada y se está esperando una respuesta.
*   **Éxito (Success)**: La operación se completó satisfactoriamente.
*   **Fallo (Error)**: La operación no pudo completarse debido a algún problema.

Para gestionar estos estados de manera controlada, se puede definir una tabla de transiciones que especifique qué cambios de estado son válidos y bajo qué condiciones. Esto evita que la operación entre en estados inconsistentes, como estar en progreso y en éxito simultáneamente. Consideremos el proceso de guardar una nota en la aplicación de notas compartidas. La operación implica enviar una solicitud HTTP al servidor y esperar su respuesta.

### Estados y Transiciones para Guardar una Nota

| Estado Actual | Evento Desencadenante | Nuevo Estado | Observaciones |
| :------------ | :-------------------- | :----------- | :------------ |
| `Idle`        | `guardarNota()`       | `Pending`    | Inicia la solicitud HTTP |
| `Pending`     | `respuestaOK()`       | `Success`    | Servidor confirma guardado |
| `Pending`     | `respuestaError()`    | `Error`      | Servidor responde con fallo (ej. 4xx, 5xx) |
| `Pending`     | `errorRed()`          | `Error`      | Fallo de conectividad o timeout |
| `Success`     | `reset()`             | `Idle`       | Permite iniciar una nueva operación |
| `Error`       | `reset()`             | `Idle`       | Permite reintentar o iniciar otra operación |

Este modelo de estados y transiciones asegura que la operación siempre se encuentre en un estado válido. Por ejemplo, desde `Idle` solo se puede pasar a `Pending` al iniciar la acción de guardar. Una vez en `Pending`, la operación no puede volver a `Idle` directamente; debe pasar por `Success` o `Error` primero. La función `reset()` es crucial para devolver la operación a su estado inicial, permitiendo que se inicie una nueva acción o se reintente la anterior.

### Consideraciones Adicionales

1.  **Permisos**: Antes de iniciar la operación, el cliente debe verificar si el usuario tiene permiso para guardar la nota. Si no lo tiene, la operación no debería pasar a `Pending`, sino que podría permanecer en `Idle` o pasar a un estado `Error` específico de permisos, si la interfaz lo requiere. La respuesta HTTP 403 (Forbidden) es un indicador de fallo de autorización, y el cliente debe estar preparado para manejarlo, posiblemente sin siquiera intentar la operación si los permisos son conocidos de antemano.
2.  **Errores de Validación**: Si la validación de los datos de la nota falla en el cliente (Lección 33), la operación no debe iniciarse. Esto es un fallo previo a la red y debería ser manejado como un `Error` inmediato, sin pasar por `Pending`.
3.  **Ausencia de Garantía de Éxito de Red**: Es importante recordar que una respuesta `OK` del servidor (ej. HTTP 200) solo significa que el servidor recibió y procesó la solicitud. No garantiza que la operación haya tenido el efecto deseado en el sistema distribuido o que el cliente vaya a recibir esa confirmación. Un fallo de red (`errorRed()`) puede ocurrir en cualquier momento, incluso después de que el servidor haya procesado la solicitud con éxito. Por ello, el estado `Success` en el cliente indica que *el cliente recibió una confirmación de éxito*, no que la operación sea irreversiblemente exitosa en el universo. Esta distinción es fundamental para el diseño de sistemas robustos.

### Ejemplo de Pseudocódigo para la Gestión de Estados

```pseudocode
// Definición de estados
enum EstadoOperacion { IDLE, PENDING, SUCCESS, ERROR }

// Variable para el estado actual
let estadoActual = EstadoOperacion.IDLE
let mensajeError = null

// Función para guardar una nota
function guardarNota(contenidoNota) {
  if (estadoActual !== EstadoOperacion.IDLE) {
    console.log("Operación ya en curso o no reseteada.")
    return
  }

  // Validación de permisos (ejemplo simplificado)
  if (!usuarioTienePermisoParaGuardar()) {
    estadoActual = EstadoOperacion.ERROR
    mensajeError = "No tiene permisos para guardar esta nota."
    actualizarInterfazUsuario()
    return
  }

  // Validación de datos (ejemplo simplificado)
  if (!validarContenido(contenidoNota)) {
    estadoActual = EstadoOperacion.ERROR
    mensajeError = "El contenido de la nota no es válido."
    actualizarInterfazUsuario()
    return
  }

  estadoActual = EstadoOperacion.PENDING
  mensajeError = null
  actualizarInterfazUsuario()

  enviarSolicitudHTTP("/api/notas", { contenido: contenidoNota })
    .then(respuesta => {
      if (respuesta.ok) {
        estadoActual = EstadoOperacion.SUCCESS
      } else if (respuesta.status === 403) {
        estadoActual = EstadoOperacion.ERROR
        mensajeError = "Autorización denegada para guardar la nota (403)."
      } else {
        estadoActual = EstadoOperacion.ERROR
        mensajeError = `Error del servidor: ${respuesta.status}`
      }
    })
    .catch(error => {
      estadoActual = EstadoOperacion.ERROR
      mensajeError = `Fallo de red o error inesperado: ${error.message}`
    })
    .finally(() => {
      actualizarInterfazUsuario()
    })
}

// Función para resetear el estado
function resetearOperacion() {
  estadoActual = EstadoOperacion.IDLE
  mensajeError = null
  actualizarInterfazUsuario()
}

// Función de ejemplo para actualizar la UI (no implementada aquí)
function actualizarInterfazUsuario() {
  console.log(`Estado actual: ${estadoActual}, Mensaje: ${mensajeError || 'N/A'}`)
  // Aquí se actualizarían elementos visuales: spinners, mensajes de éxito/error, botones, etc.
}
```

Este pseudocódigo ilustra cómo la lógica de la aplicación puede reaccionar a los eventos y actualizar el estado, lo que a su vez se reflejaría en la interfaz de usuario. La función `actualizarInterfazUsuario()` sería la encargada de traducir estos estados en elementos visuales, como mostrar un indicador de carga, un mensaje de éxito o un aviso de error.

## Práctica
Considere una operación de carga de un archivo de imagen de perfil de usuario. Esta operación implica seleccionar un archivo, subirlo al servidor y esperar una confirmación. Además de los estados `Idle`, `Pending`, `Success` y `Error`, es posible que se necesiten estados intermedios o específicos para mejorar la experiencia del usuario, como un estado que indique el progreso de la subida (porcentaje). Sin embargo, para esta práctica, concéntrese en los estados fundamentales y en cómo se manejan los fallos.

Diseñe una tabla de transiciones para la operación de carga de un archivo de imagen de perfil, similar a la tabla de guardar una nota. Incluya los estados `Idle`, `Pending`, `Success` y `Error`. Considere los siguientes eventos desencadenantes y sus posibles resultados:

1.  El usuario selecciona un archivo (inicia la carga).
2.  El archivo es demasiado grande o no es un formato de imagen válido (fallo de validación en cliente).
3.  La solicitud HTTP de subida se envía al servidor.
4.  El servidor responde con un código de estado HTTP 200 (OK).
5.  El servidor responde con un código de estado HTTP 413 (Payload Too Large) o 400 (Bad Request) por un formato incorrecto.
6.  Ocurre un fallo de red durante la subida.
7.  El usuario decide cancelar la operación mientras está en `Pending`.
8.  Se desea resetear la operación para permitir una nueva carga.

Para cada evento, identifique el estado actual, el nuevo estado y cualquier observación relevante sobre la causa del cambio o el manejo del error. Asegúrese de que no haya transiciones contradictorias y que todos los estados puedan eventualmente regresar a `Idle`.

## Comprobaciones
1.  ¿Qué estado debería tener una operación de guardado de nota si el servidor responde con un HTTP 403 (Forbidden) debido a que el usuario no tiene permisos para modificar esa nota?
Respuesta: La operación debería pasar al estado `Error`.
2.  Si una operación de guardado de nota está en estado `Pending` y se produce un fallo de red, ¿a qué estado debe transicionar y qué implicaciones tiene esto para la garantía de que la nota no se guardó en el servidor?
Respuesta: Debe transicionar al estado `Error`. Esto no garantiza que la nota no se guardó en el servidor; solo indica que el cliente no recibió una confirmación de éxito. La operación podría haberse completado en el servidor antes del fallo de red.

## Cierre
La gestión explícita de los estados de una operación es un pilar para construir interfaces de usuario robustas y predecibles. Al definir transiciones claras, se evitan inconsistencias y se mejora la capacidad de la aplicación para comunicarse con el usuario. En la próxima lección, se explorará cómo distinguir el código que implementa estas operaciones del entorno en el que se ejecutan, un paso crucial para la modularidad y la capacidad de prueba de las aplicaciones.
