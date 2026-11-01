---
schemaVersion: 1
id: 52ca0826-85d6-477d-97b9-49dba56bf6ee
sequence: 27
course: fullstack
stepId: errores-y-efectos
title: Seguir un error sin perder el contexto
publishedAt: 2026-11-01T10:14:48.984Z
generationDate: 2026-11-01
summary: Esta lección aborda la trazabilidad de errores desde su origen en la
  capa de almacenamiento hasta una respuesta controlada al usuario. Se distingue
  entre resultados esperados, fallos completos e impactos parciales, y se
  examina cómo los errores se propagan a través de las capas de una aplicación
  modular. Se integra el uso de funciones, ámbito y módulos para gestionar la
  propagación de fallos, recuperando el mapeo de errores HTTP previamente
  estudiado. El objetivo es comprender cómo un fallo en la persistencia de datos
  puede ser capturado, transformado y comunicado de manera efectiva,…
generation:
  model: gemini-2.5-flash
  promptVersion: v3
  contextHash: 97a8f5eeba4dd211a2d65abdc3942a00fd21aba002281e86e8803b6ebe671168
---

## Por qué ahora
En las lecciones previas, hemos explorado cómo organizar colecciones de datos, identificar caminos no cubiertos en las reglas de negocio y estructurar un programa en módulos con responsabilidades claras. Sin embargo, la robustez de una aplicación no solo depende de su lógica interna, sino también de su capacidad para manejar situaciones inesperadas, como fallos en los sistemas externos o en las operaciones de persistencia. Un error en la capa de almacenamiento, por ejemplo, puede tener un impacto significativo si no se gestiona adecuadamente, comprometiendo la integridad de los datos o la experiencia del usuario. Es crucial entender cómo un fallo se origina, cómo se propaga a través de las diferentes capas de un sistema modular y cómo se puede transformar en una respuesta controlada y comprensible. Esta lección integra los conceptos de modularidad y manejo de casos límite para construir sistemas más resilientes.

## Explicación y ejemplo
Cuando una aplicación interactúa con sistemas externos, como una base de datos o un servicio de almacenamiento, existe la posibilidad de que estas operaciones fallen. Es fundamental distinguir entre un **resultado esperado**, un **fallo** y un **impacto parcial** para gestionar estas situaciones de manera efectiva. Un resultado esperado es la finalización exitosa de una operación, como guardar una nota. Un fallo ocurre cuando la operación no puede completarse en absoluto, por ejemplo, si el servicio de almacenamiento no está disponible. Un impacto parcial se refiere a una situación donde la operación se completa, pero no de la forma totalmente prevista, o afecta solo a una parte del sistema, como cuando se guarda una nota pero no se puede actualizar un índice secundario.

El proceso de **trazar un error** implica seguir su camino desde su origen hasta la respuesta final que recibe el cliente. En una arquitectura modular, un error puede originarse en la capa de persistencia, ser capturado y re-lanzado por la capa de reglas de negocio, y finalmente ser transformado en una respuesta HTTP por la capa de transporte. La integración de funciones, ámbito y módulos es clave para este flujo.

Consideremos el caso de nuestra aplicación de notas compartidas. Un usuario autenticado intenta crear una nueva nota. La solicitud llega a la capa de transporte, que invoca una función en la capa de reglas de negocio. Esta, a su vez, llama a una función en la capa de persistencia para guardar la nota.

### Ejemplo: Fallo en la persistencia de una nota

Supongamos que la capa de persistencia utiliza una base de datos que tiene una restricción de unicidad para el título de las notas por usuario. Si un usuario intenta crear una nota con un título que ya existe, la operación de guardado fallará a nivel de la base de datos.

**1. Origen del error (Capa de Persistencia):**

```pseudocode
// Módulo 'persistence.js'
funcion guardarNota(nota, usuarioId):
  try:
    // Simulación de una operación de base de datos
    si existeNotaConTitulo(nota.titulo, usuarioId):
      lanzar Error("El título de la nota ya existe para este usuario")
    // ... lógica para insertar la nota en la base de datos ...
    retornar { id: "nuevaNotaId", titulo: nota.titulo, contenido: nota.contenido }
  capturar (error):
    // El error original de la base de datos se transforma en un error de aplicación
    si error.mensaje incluye "título ya existe":
      lanzar new ErrorDePersistencia("Conflicto de datos: Título duplicado", "DUPLICATE_TITLE")
    sino:
      lanzar new ErrorDePersistencia("Fallo al guardar la nota", "STORAGE_FAILURE")
```

En este pseudocódigo, la función `guardarNota` en el módulo de persistencia detecta un posible conflicto de título. Si la base de datos lanza un error, se captura y se re-lanza un error más específico (`ErrorDePersistencia`) que encapsula la causa real y un código interno (`DUPLICATE_TITLE` o `STORAGE_FAILURE`). Esto es crucial para no exponer detalles internos de la base de datos y para permitir un manejo estandarizado en capas superiores.

**2. Propagación del error (Capa de Reglas de Negocio):**

```pseudocode
// Módulo 'businessRules.js'
import { guardarNota } from './persistence.js'

funcion crearNota(datosNota, usuarioId):
  // Validaciones de negocio previas a la persistencia
  si datosNota.titulo es vacio o datosNota.contenido es vacio:
    lanzar new ErrorDeNegocio("Título o contenido de la nota vacíos", "INVALID_INPUT")

  try:
    const nuevaNota = guardarNota(datosNota, usuarioId)
    // ... lógica de negocio adicional, como notificaciones o auditoría ...
    retornar nuevaNota
  capturar (error):
    // El ámbito de esta función captura el error de persistencia
    si error.tipo es "DUPLICATE_TITLE":
      lanzar new ErrorDeNegocio("No se puede crear la nota: el título ya está en uso", "CONFLICT")
    sino si error.tipo es "STORAGE_FAILURE":
      lanzar new ErrorDeNegocio("Error interno al procesar la solicitud", "INTERNAL_ERROR")
    sino:
      // Re-lanzar errores inesperados o no manejados
      lanzar error
```

La función `crearNota` en el módulo de reglas de negocio invoca a `guardarNota`. Si `guardarNota` lanza un `ErrorDePersistencia`, este es capturado en el ámbito de `crearNota`. Aquí, el error de persistencia se interpreta y se transforma en un `ErrorDeNegocio` más genérico y significativo para la lógica de la aplicación, como `CONFLICT` o `INTERNAL_ERROR`. Esto desacopla la capa de negocio de los detalles específicos de la persistencia.

**3. Respuesta controlada (Capa de Transporte):**

```pseudocode
// Módulo 'transport.js'
import { crearNota } from './businessRules.js'

funcion manejarSolicitudCrearNota(request):
  const usuarioId = request.headers.authorization // Asumiendo autorización previa
  const datosNota = request.body

  try:
    const notaCreada = crearNota(datosNota, usuarioId)
    retornar { status: 201, body: notaCreada }
  capturar (error):
    // El ámbito de esta función captura el error de negocio
    si error.tipo es "CONFLICT":
      retornar { status: 409, body: { mensaje: error.mensaje } } // HTTP 409 Conflict
    sino si error.tipo es "INVALID_INPUT":
      retornar { status: 400, body: { mensaje: error.mensaje } } // HTTP 400 Bad Request
    sino si error.tipo es "INTERNAL_ERROR":
      retornar { status: 500, body: { mensaje: "Error interno del servidor" } } // HTTP 500 Internal Server Error
    sino:
      // Para errores no previstos, se retorna un error genérico de servidor
      retornar { status: 500, body: { mensaje: "Error inesperado del servidor" } }
```

Finalmente, la función `manejarSolicitudCrearNota` en el módulo de transporte captura el `ErrorDeNegocio`. Basándose en el tipo de error, se construye una respuesta HTTP adecuada. Un `CONFLICT` de negocio se mapea a un `HTTP 409 Conflict`, un `INVALID_INPUT` a un `HTTP 400 Bad Request`, y un `INTERNAL_ERROR` a un `HTTP 500 Internal Server Error`. Esto asegura que el cliente reciba una respuesta estandarizada y significativa, sin exponer la estructura interna del error. El mapeo de errores HTTP, como el `403 Forbidden` que ya identificó para fallos de autorización, es una práctica estándar para comunicar el resultado de una operación de manera controlada.

Este flujo demuestra cómo un error, desde su origen en la persistencia, es transformado y manejado en cada capa, utilizando el ámbito de las funciones y la modularidad para mantener la claridad y la separación de responsabilidades. El resultado es una respuesta controlada que informa al cliente sobre el fallo sin comprometer la seguridad o la estabilidad del sistema.

## Práctica
Considere un escenario en el que la aplicación de notas compartidas intenta eliminar una nota. La capa de persistencia tiene una función `eliminarNota(notaId, usuarioId)` que verifica si el `usuarioId` es el propietario de la nota antes de proceder con la eliminación. Si el `usuarioId` no coincide con el propietario, la capa de persistencia lanza un error interno `ErrorDePersistencia` con el tipo `NOT_OWNER`.

Su tarea es describir cómo se propagaría y manejaría este error a través de las capas de reglas de negocio y transporte, siguiendo el patrón del ejemplo anterior. Específicamente, debe:

1.  **Capa de Reglas de Negocio:** Escriba el pseudocódigo para una función `borrarNota(notaId, usuarioId)` en el módulo `businessRules.js`. Esta función debe invocar a `eliminarNota` de la capa de persistencia. Si recibe un `ErrorDePersistencia` de tipo `NOT_OWNER`, debe transformarlo en un `ErrorDeNegocio` con un tipo apropiado (por ejemplo, `UNAUTHORIZED_ACTION`) y un mensaje claro. Si recibe cualquier otro `ErrorDePersistencia`, debe transformarlo en un `ErrorDeNegocio` de tipo `INTERNAL_ERROR`.
2.  **Capa de Transporte:** Escriba el pseudocódigo para una función `manejarSolicitudBorrarNota(request)` en el módulo `transport.js`. Esta función debe invocar a `borrarNota` de la capa de reglas de negocio. Si recibe un `ErrorDeNegocio` de tipo `UNAUTHORIZED_ACTION`, debe retornar una respuesta HTTP con el código de estado y un mensaje adecuado. Si recibe un `ErrorDeNegocio` de tipo `INTERNAL_ERROR`, debe retornar una respuesta HTTP con el código de estado y un mensaje genérico de error del servidor.

Para comprobar su respuesta, imagine que un usuario no propietario intenta borrar una nota. ¿Qué código de estado HTTP y qué mensaje de error recibiría el cliente? ¿Qué diferencia habría si el error original en la capa de persistencia fuera un `STORAGE_FAILURE` (por ejemplo, la base de datos no responde) en lugar de `NOT_OWNER`?

## Comprobaciones
1.  ¿Qué código de estado HTTP y qué mensaje de error recibiría el cliente si un usuario no propietario intenta borrar una nota, siguiendo el flujo que usted diseñó?
    Respuesta: El cliente recibiría un código de estado HTTP 403 Forbidden y un mensaje como "No autorizado para borrar esta nota".
2.  ¿Qué código de estado HTTP y qué mensaje de error recibiría el cliente si el error original en la capa de persistencia fuera un `STORAGE_FAILURE` (por ejemplo, la base de datos no responde) en lugar de `NOT_OWNER`?
    Respuesta: El cliente recibiría un código de estado HTTP 500 Internal Server Error y un mensaje como "Error interno del servidor".

## Cierre
Hemos visto cómo los errores se trazan y transforman a través de las capas de una aplicación, permitiendo respuestas controladas y significativas. Esta gestión estructurada de fallos es esencial para la estabilidad y la predictibilidad del sistema. En la próxima lección, profundizaremos en cómo la secuencia de operaciones y la finalización de tareas pueden diferir, lo que nos permitirá separar el orden en que escribimos el código del orden en que se ejecutan y completan las acciones. Esto es fundamental para construir sistemas asíncronos robustos.
