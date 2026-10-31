---
schemaVersion: 1
id: 1cf1c7c5-ccc9-49da-b2ad-cc2ad2abc673
sequence: 26
course: fullstack
stepId: modulos-responsabilidades
title: Dividir un programa en módulos
publishedAt: 2026-10-31T09:25:06.458Z
generationDate: 2026-10-31
summary: Esta lección explica cómo estructurar un programa en módulos distintos,
  enfocándose en la separación de responsabilidades como el transporte, las
  reglas de negocio y la persistencia de datos. Ilustra cómo identificar y
  gestionar las dependencias entre estas capas es crucial para la mantenibilidad
  y adaptabilidad, utilizando un ejemplo concreto de una aplicación de notas
  compartidas. Se detecta una dependencia que dificulta el cambio de una capa.
generation:
  model: gemini-2.5-flash
  promptVersion: v3
  contextHash: 6a3eafac224322967280d9e98c2fa446a425baaa592165a63e3990d1055a112c
---

## Por qué ahora
En lecciones anteriores, se exploró cómo gestionar el ámbito de las variables para predecir el comportamiento de las funciones, cómo organizar colecciones de datos para optimizar su acceso y cómo asegurar que las reglas de negocio cubran todos los caminos de ejecución posibles. A medida que los programas crecen en complejidad, mantener estas consideraciones en una única estructura monolítica se vuelve desafiante. La interconexión directa entre la lógica de comunicación, las reglas del negocio y el almacenamiento de datos puede dificultar la comprensión, la prueba y la modificación de cualquier parte del sistema. Dividir un programa en módulos es una estrategia fundamental para asignar responsabilidades específicas a unidades de código, lo que facilita la gestión de la complejidad, mejora la claridad y permite que cada componente evolucione de forma más independiente. Esto es esencial para construir aplicaciones web robustas y adaptables.

## Explicación y ejemplo
La modularidad en la programación consiste en descomponer un sistema en componentes más pequeños e independientes, llamados módulos, cada uno con una responsabilidad bien definida. Esta práctica se basa en el principio de separación de responsabilidades, donde cada módulo se encarga de una única preocupación. En el contexto de una aplicación web, es común identificar al menos tres capas principales de responsabilidad:

1.  **Capa de Transporte**: Se encarga de la comunicación externa. Recibe las solicitudes entrantes (por ejemplo, HTTP), las interpreta, extrae los datos relevantes y prepara las respuestas salientes. Su responsabilidad es gestionar el protocolo de comunicación, no la lógica de negocio.
2.  **Capa de Reglas de Negocio**: Contiene la lógica central de la aplicación. Valida los datos, realiza operaciones, aplica políticas y coordina las interacciones entre diferentes entidades. Esta capa debe ser independiente de cómo se reciben los datos o cómo se almacenan.
3.  **Capa de Persistencia**: Gestiona el almacenamiento y la recuperación de datos. Interactúa con bases de datos, sistemas de archivos u otros mecanismos de almacenamiento. Su responsabilidad es asegurar que los datos se guarden y se recuperen de manera fiable, sin conocer la lógica de negocio que los utiliza.

Consideremos el caso de una aplicación de notas compartidas donde un usuario desea crear una nueva nota. Sin una separación clara, el código podría verse así:

```pseudocode
funcion manejarSolicitudCrearNota(solicitudHTTP):
    // 1. Capa de Transporte: Extraer datos de la solicitud HTTP
    cuerpo = leerCuerpo(solicitudHTTP)
    titulo = cuerpo.titulo
    contenido = cuerpo.contenido

    // 2. Capa de Reglas de Negocio: Validar y procesar datos
    si titulo esta vacio o contenido esta vacio:
        retornar respuestaHTTP(400, "Título y contenido son obligatorios")
    
    idNota = generarIDUnico()
    fechaCreacion = obtenerFechaActual()
    nota = { id: idNota, titulo: titulo, contenido: contenido, fecha: fechaCreacion }

    // 3. Capa de Persistencia: Guardar la nota en la base de datos
    resultadoDB = insertarEnBaseDeDatos("notas", nota)
    si resultadoDB.error:
        retornar respuestaHTTP(500, "Error al guardar la nota")

    // 1. Capa de Transporte: Preparar respuesta HTTP
    retornar respuestaHTTP(201, nota)
```

En este enfoque, la función `manejarSolicitudCrearNota` mezcla responsabilidades de transporte (leer cuerpo HTTP, retornar respuesta HTTP), reglas de negocio (validar, generar ID) y persistencia (insertar en base de datos). Si se quisiera cambiar el protocolo de comunicación de HTTP a, por ejemplo, un sistema de mensajería, o la base de datos de SQL a NoSQL, esta función requeriría modificaciones significativas en múltiples partes.

Ahora, apliquemos la separación de responsabilidades:

**1. Capa de Transporte (Módulo `http_handler.js`)**
```pseudocode
// Contrato de entrada: objeto con 'titulo' y 'contenido'
// Contrato de salida: objeto con 'id', 'titulo', 'contenido', 'fecha'

modulo http_handler:
    importar { crearNota } de 'negocio_notas'

    funcion post_notas(solicitudHTTP):
        cuerpo = leerCuerpoJSON(solicitudHTTP)
        titulo = cuerpo.titulo
        contenido = cuerpo.contenido

        intentar:
            notaCreada = crearNota(titulo, contenido)
            retornar respuestaHTTP(201, notaCreada)
        capturar (error):
            si error.tipo == "ValidationError":
                retornar respuestaHTTP(400, error.mensaje)
            sino:
                retornar respuestaHTTP(500, "Error interno del servidor")
```

**2. Capa de Reglas de Negocio (Módulo `negocio_notas.js`)**
```pseudocode
// Contrato de entrada: 'titulo' (string), 'contenido' (string)
// Contrato de salida: objeto con 'id', 'titulo', 'contenido', 'fecha'

modulo negocio_notas:
    importar { guardarNota } de 'persistencia_notas'

    funcion crearNota(titulo, contenido):
        si titulo esta vacio o contenido esta vacio:
            lanzar Error("ValidationError", "Título y contenido son obligatorios")
        
        idNota = generarIDUnico()
        fechaCreacion = obtenerFechaActual()
        nota = { id: idNota, titulo: titulo, contenido: contenido, fecha: fechaCreacion }

        guardarNota(nota)
        retornar nota
```

**3. Capa de Persistencia (Módulo `persistencia_notas.js`)**
```pseudocode
// Contrato de entrada: objeto con 'id', 'titulo', 'contenido', 'fecha'
// Contrato de salida: ninguno (o confirmación de éxito)

modulo persistencia_notas:
    // Simulación de base de datos en memoria
    baseDeDatosNotas = {}

    funcion guardarNota(nota):
        baseDeDatosNotas[nota.id] = nota
        // En un sistema real, aquí iría la lógica de inserción en DB
        // Por ejemplo: db.collection("notas").insert(nota)
```

En este diseño modular, cada capa tiene una responsabilidad clara. El módulo `http_handler` solo sabe cómo interactuar con HTTP y cómo llamar a la lógica de negocio. El módulo `negocio_notas` contiene la lógica de validación y creación de la nota, y solo sabe cómo interactuar con la capa de persistencia. El módulo `persistencia_notas` se encarga exclusivamente de almacenar la nota. Las dependencias fluyen en una dirección: transporte depende de negocio, y negocio depende de persistencia. La capa de negocio no tiene conocimiento del protocolo HTTP ni de los detalles específicos de la base de datos.

Una dependencia que dificulta el cambio de una capa se observa si la capa de reglas de negocio, por ejemplo, tuviera conocimiento de los códigos de estado HTTP (como `400` o `500`) o de los mensajes de error específicos de una base de datos. Si `negocio_notas.js` lanzara un error como `lanzar Error("HTTP 400: Título y contenido son obligatorios")`, estaría acoplando la lógica de negocio al transporte. Esto impediría reutilizar `crearNota` en un contexto que no sea HTTP, como un proceso por lotes o un sistema de mensajería, sin refactorizar la capa de negocio. La solución es que la capa de negocio lance errores genéricos o específicos de dominio (como `ValidationError`), y sea la capa de transporte la que los traduzca a códigos de estado HTTP apropiados.

## Práctica
Considere una función que gestiona la actualización de una nota existente. Esta función recibe un identificador de nota y los nuevos datos (título y contenido). Debe validar que el identificador existe, que los nuevos datos no están vacíos y luego actualizar la nota en el almacenamiento. Finalmente, debe informar del éxito o fracaso de la operación.

Diseñe los contratos de entrada y salida para las funciones que compondrían las capas de reglas de negocio y persistencia para esta operación de actualización. Para la capa de reglas de negocio, defina una función `actualizarNota(id, nuevoTitulo, nuevoContenido)`. Para la capa de persistencia, defina una función `actualizarNotaEnAlmacenamiento(id, datosActualizados)`. Describa qué validaciones o transformaciones realizaría cada función y qué tipo de valor retornaría o qué errores podría lanzar, manteniendo la separación de responsabilidades. No es necesario escribir el código completo, solo los contratos y una breve descripción de la lógica de cada capa.

## Comprobaciones
1.  ¿Cuál es la principal ventaja de que la capa de reglas de negocio lance errores de tipo `ValidationError` en lugar de errores que incluyan códigos de estado HTTP como `400`?
    Respuesta: Permite que la capa de reglas de negocio sea independiente del protocolo de comunicación, facilitando su reutilización en diferentes contextos (HTTP, mensajería, CLI) sin necesidad de modificar su lógica interna. La traducción a códigos HTTP se realiza en la capa de transporte.
2.  Si la capa de persistencia de la aplicación de notas compartidas se cambiara de una base de datos relacional a una base de datos NoSQL, ¿qué módulos del ejemplo presentado (`http_handler.js`, `negocio_notas.js`, `persistencia_notas.js`) necesitarían ser modificados?
    Respuesta: Solo el módulo `persistencia_notas.js` necesitaría ser modificado, ya que es el único que encapsula los detalles de cómo se almacenan y recuperan los datos. Los módulos `http_handler.js` y `negocio_notas.js` interactúan con la capa de persistencia a través de su contrato, sin conocer su implementación interna.

## Cierre
La división de un programa en módulos con responsabilidades claras es fundamental para gestionar la complejidad y facilitar el mantenimiento. Al identificar y controlar las dependencias entre estas capas, se prepara el terreno para sistemas más robustos y adaptables. En la siguiente lección, exploraremos cómo seguir el flujo de un error a través de estas capas modulares sin perder el contexto, lo cual es crucial para el diagnóstico y la depuración efectiva en sistemas distribuidos.
