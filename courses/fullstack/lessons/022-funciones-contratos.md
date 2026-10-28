---
schemaVersion: 1
id: ba39a69f-3ef9-4440-a5de-15a1c3dba18a
sequence: 22
course: fullstack
stepId: funciones-contratos
title: Razonar con funciones y contratos
publishedAt: 2026-10-28T09:26:30.724Z
generationDate: 2026-10-27
summary: Esta lección se centra en diseccionar las responsabilidades dentro de
  una operación, específicamente una función de edición. Distingue entre el
  cálculo puro, el acceso a datos y la generación de una respuesta HTTP,
  enfatizando cómo las entradas, salidas y efectos secundarios definen el
  contrato de una función. El objetivo es comprender cómo aislar las
  preocupaciones para mayor claridad y capacidad de prueba, utilizando el
  ejemplo de la nota compartida para ilustrar estos límites. Se aborda la
  validación de datos, la autorización y la persistencia, mostrando cómo cada
  paso contribuye a la…
generation:
  model: gemini-2.5-flash
  promptVersion: v3
  contextHash: bba076b7bdb605307cb975b31a8b78f46e60b306e94c378f37de612141950847
---

## Por qué ahora
Las lecciones anteriores han establecido la importancia de las fronteras de confianza, la reconstrucción de peticiones completas y la distinción entre valores y referencias. Ahora, aplicamos estos conocimientos para estructurar las operaciones de una aplicación web. En sistemas complejos, las operaciones suelen mezclar diversas responsabilidades: procesar datos, interactuar con el almacenamiento persistente y comunicarse con los clientes. Separar estas preocupaciones es fundamental para la claridad, la mantenibilidad y la seguridad del código. Razonar sobre las funciones y sus contratos nos permite definir límites claros para cada parte de una operación, facilitando la comprensión de su comportamiento, la identificación de posibles fallos y la construcción de componentes reutilizables y probables de forma aislada.

## Explicación y ejemplo
Una operación en una aplicación web, como la edición de una nota compartida, rara vez es una acción monolítica. En cambio, es una secuencia de pasos que involucran diferentes tipos de lógica: cálculo, acceso a datos y comunicación de red. Para razonar eficazmente sobre estas operaciones, es útil descomponerlas en funciones o bloques lógicos, cada uno con un contrato bien definido que especifica sus entradas, salidas y efectos secundarios.

Consideremos la operación de editar el contenido de una nota compartida. Un cliente envía una petición HTTP para actualizar una nota específica. Esta operación implica:

1.  **Recepción y análisis de la petición HTTP**: Extraer el identificador de la nota, el nuevo contenido y la información del usuario (por ejemplo, de una cookie de sesión).
2.  **Autorización**: Verificar que el usuario autenticado tiene permiso para editar esa nota.
3.  **Recuperación de datos**: Obtener la nota actual de la base de datos.
4.  **Validación y lógica de negocio**: Asegurar que el nuevo contenido es válido y aplicar cualquier regla de negocio (por ejemplo, longitud máxima).
5.  **Persistencia**: Guardar el contenido actualizado en la base de datos.
6.  **Respuesta HTTP**: Enviar una respuesta al cliente indicando el éxito o el fallo de la operación.

Si intentamos realizar todos estos pasos dentro de una única función, esta se volverá compleja y difícil de probar. En su lugar, podemos definir funciones con responsabilidades más acotadas. Analicemos una posible estructura para la edición de una nota:

### 1. Función de procesamiento de la petición HTTP
Esta función es la primera en interactuar con la petición entrante. Su responsabilidad principal es extraer y estructurar los datos relevantes.

```pseudocode
funcion procesar_peticion_edicion_nota(peticion_http):
  // Entradas: objeto peticion_http (contiene cabeceras, cuerpo, etc.)
  id_nota = peticion_http.ruta.parametro('id')
  nuevo_contenido = peticion_http.cuerpo.json('contenido')
  id_usuario_sesion = peticion_http.sesion.obtener('usuario_id')

  // Validaciones básicas de formato
  si id_nota es nulo o no es un entero valido:
    retornar { error: 'ID de nota inválido', codigo_http: 400 }
  si nuevo_contenido es nulo o no es una cadena de texto:
    retornar { error: 'Contenido inválido', codigo_http: 400 }
  si id_usuario_sesion es nulo:
    retornar { error: 'Usuario no autenticado', codigo_http: 401 }

  // Salida: objeto con datos estructurados o un objeto de error
  retornar { id_nota: id_nota, nuevo_contenido: nuevo_contenido, id_usuario: id_usuario_sesion }
  // Efectos secundarios: ninguno (es una función pura en relación a la petición)
```

Esta función toma la `peticion_http` como entrada y produce un objeto con los datos extraídos o un error. No interactúa con la base de datos ni envía respuestas HTTP directamente. Su contrato es claro: transformar una petición HTTP cruda en datos de negocio o un error de formato/autenticación.

### 2. Función de lógica de negocio y acceso a datos
Esta función encapsula la lógica central de la edición, incluyendo la autorización y la persistencia. Recibe los datos ya procesados de la petición.

```pseudocode
funcion editar_nota(id_nota, nuevo_contenido, id_usuario):
  // Entradas: id_nota (entero), nuevo_contenido (cadena), id_usuario (entero)

  // Efecto secundario: Acceso a la base de datos (lectura)
  nota_existente = base_datos.notas.buscar_por_id(id_nota)

  si nota_existente es nulo:
    retornar { error: 'Nota no encontrada', codigo_http: 404 }

  // Autorización: Recuperamos el concepto de la Lección 19
  si nota_existente.propietario_id != id_usuario:
    retornar { error: 'Acceso denegado', codigo_http: 403 } // Como en la respuesta reciente del alumno

  // Validación de negocio
  si longitud(nuevo_contenido) > 5000:
    retornar { error: 'Contenido demasiado largo', codigo_http: 400 }

  // Actualización de datos
  nota_existente.contenido = nuevo_contenido
  nota_existente.fecha_actualizacion = fecha_actual()

  // Efecto secundario: Acceso a la base de datos (escritura)
  base_datos.notas.guardar(nota_existente)

  // Salida: objeto de éxito o un objeto de error
  retornar { exito: true, nota_actualizada: nota_existente }
```

Esta función tiene entradas claras (`id_nota`, `nuevo_contenido`, `id_usuario`) y produce un resultado que indica éxito o un error específico. Sus efectos secundarios son la lectura y escritura en la base de datos. No se encarga de la comunicación HTTP.

### 3. Función de respuesta HTTP
Finalmente, una función que toma el resultado de la lógica de negocio y construye la respuesta HTTP final.

```pseudocode
funcion construir_respuesta_edicion(resultado_operacion):
  // Entrada: resultado_operacion (objeto con exito/error y datos/codigo_http)

  si resultado_operacion.exito:
    // Efecto secundario: Envío de respuesta HTTP
    retornar { codigo_http: 200, cuerpo: resultado_operacion.nota_actualizada.a_json() }
  sino:
    // Efecto secundario: Envío de respuesta HTTP
    retornar { codigo_http: resultado_operacion.codigo_http, cuerpo: { mensaje: resultado_operacion.error } }
```

Esta función es responsable de la interfaz con el cliente. Sus entradas son el resultado de la operación interna, y su efecto secundario es la generación de la respuesta HTTP. Al separar estas responsabilidades, cada función es más fácil de entender, probar y mantener. Los cálculos puros (como la validación de longitud), el acceso a datos (lectura/escritura en `base_datos`) y la respuesta HTTP (construcción del objeto de respuesta) están claramente diferenciados.

## Práctica
Considere una operación para crear una nueva nota compartida. Esta operación recibe un título y un contenido del cliente, y debe asignarle un propietario (el usuario autenticado) y una fecha de creación. La nota debe ser guardada en la base de datos y, si tiene éxito, la respuesta HTTP debe incluir el identificador de la nueva nota.

Describa las entradas, salidas y efectos secundarios para cada una de las tres etapas que hemos diferenciado: procesamiento de la petición HTTP, lógica de negocio y acceso a datos, y construcción de la respuesta HTTP. Para la etapa de lógica de negocio, incluya un pseudocódigo similar al ejemplo, detallando las validaciones y la interacción con la base de datos. Considere los posibles errores en cada etapa y cómo se propagarían.

Para comprobar su respuesta, compare su descripción con la siguiente estructura mental:

*   **Procesamiento de petición**: ¿Se enfoca solo en extraer y validar el formato de los datos de entrada y la autenticación? ¿No realiza acceso a base de datos ni genera respuestas HTTP finales?
*   **Lógica de negocio**: ¿Realiza validaciones de contenido, interactúa con la base de datos para guardar la nota y asigna el propietario? ¿No se preocupa por el formato HTTP de la entrada o la salida?
*   **Respuesta HTTP**: ¿Toma el resultado de la lógica de negocio y lo transforma en un código de estado y un cuerpo de respuesta HTTP? ¿No contiene lógica de negocio ni acceso a datos?

## Comprobaciones
1.  ¿Cuál es la principal ventaja de separar una operación compleja en funciones con responsabilidades distintas para el cálculo, el acceso a datos y la respuesta HTTP?
Respuesta: La principal ventaja es una mayor claridad, mantenibilidad y capacidad de prueba del código, ya que cada función tiene un contrato bien definido y efectos secundarios limitados o nulos, facilitando la comprensión y el aislamiento de errores.

2.  En la función `editar_nota` del ejemplo, si `base_datos.notas.buscar_por_id(id_nota)` devuelve `null`, ¿qué tipo de error se ha producido y qué código HTTP se retornaría si esta función estuviera directamente expuesta como un endpoint HTTP?
Respuesta: Se ha producido un error de recurso no encontrado. Si la función estuviera directamente expuesta, se retornaría un código HTTP 404.

## Cierre
Hemos visto cómo descomponer una operación en partes con responsabilidades claras, distinguiendo entre lo que calcula, lo que accede a datos y lo que responde. Esta separación es fundamental para gestionar la complejidad. En la próxima lección, profundizaremos en cómo las variables interactúan dentro de estas funciones, explorando el ámbito de una variable y cómo afecta la visibilidad y el ciclo de vida de los datos.
