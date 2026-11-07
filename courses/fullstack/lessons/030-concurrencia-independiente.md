---
schemaVersion: 1
id: e79e1407-7e8c-4bb5-92ba-2321432f7a93
sequence: 30
course: fullstack
stepId: concurrencia-independiente
title: Elegir qué operaciones pueden concurrir
publishedAt: 2026-11-07T09:46:35.585Z
generationDate: 2026-11-04
summary: Esta lección explora cómo identificar operaciones independientes dentro
  de un flujo de trabajo para ejecutarlas concurrentemente, mejorando la
  eficiencia y la capacidad de respuesta de una aplicación. Se distingue entre
  tareas que pueden iniciarse en paralelo, como cargar un perfil de usuario y
  sus etiquetas, y aquellas que requieren una secuencia estricta debido a
  dependencias, como la verificación de permisos antes de editar una nota. Se
  analiza cómo gestionar los resultados y los posibles fallos parciales cuando
  múltiples operaciones se ejecutan de forma asíncrona, asegurando una
  respuesta…
generation:
  model: gemini-2.5-flash
  promptVersion: v3
  contextHash: 568422484e8ee1a292d613b1ecb1510b82c56c052b744627ec9951e79d645edf
---

## Por qué ahora
En lecciones anteriores, se examinó cómo el orden de finalización de las operaciones asíncronas puede diferir del orden en que se escriben en el código, y cómo componer resultados futuros cuando una operación depende del resultado de otra. Sin embargo, no todas las operaciones dentro de un flujo de trabajo tienen dependencias mutuas. Identificar y ejecutar estas tareas de forma concurrente permite a la aplicación realizar múltiples acciones simultáneamente, optimizando el uso de recursos y reduciendo el tiempo total de respuesta. Comprender cuándo las operaciones pueden concurrir es fundamental para diseñar sistemas eficientes y reactivos, evitando esperas innecesarias y mejorando la experiencia del usuario.

## Explicación y ejemplo
La concurrencia se aplica cuando dos o más operaciones pueden iniciarse y ejecutarse en paralelo sin que el resultado de una sea un prerrequisito para el inicio de la otra. La clave es identificar si existe una dependencia de datos o de estado que obligue a una secuencia. Si no la hay, las operaciones pueden ejecutarse de forma independiente.

Considere el caso de una aplicación de notas compartidas. Al cargar la página de perfil de un usuario, es común que se necesite mostrar tanto los detalles del perfil (nombre, correo electrónico) como una lista de etiquetas que el usuario ha creado o utilizado. Estas dos piezas de información, el perfil y las etiquetas, generalmente se almacenan y se recuperan de forma independiente. No es necesario conocer las etiquetas para empezar a buscar el perfil, ni viceversa.

En este escenario, ambas operaciones de recuperación de datos pueden iniciarse casi simultáneamente. El sistema puede enviar una solicitud para obtener el perfil y, sin esperar su respuesta, enviar otra solicitud para obtener las etiquetas. Solo cuando ambas operaciones asíncronas hayan completado su trabajo, se combinan sus resultados para renderizar la página completa.

```pseudocodigo
funcion cargarPaginaPerfil(usuarioId):
    // Iniciar la recuperación del perfil y las etiquetas de forma concurrente
    promesaPerfil = servicioPerfil.obtenerPerfil(usuarioId)
    promesaEtiquetas = servicioEtiquetas.obtenerEtiquetasUsuario(usuarioId)

    // Esperar a que ambas operaciones finalicen
    // Esto es equivalente a un 'Promise.all' en JavaScript o 'Task.WhenAll' en C#
    resultados = esperarTodas([promesaPerfil, promesaEtiquetas])

    perfil = resultados[0]
    etiquetas = resultados[1]

    // Si alguna de las promesas falla, 'esperarTodas' propagará el fallo
    si perfil es FALLO:
        registrarError("Fallo al cargar perfil", perfil.error)
        // Podría mostrar un mensaje parcial o un error general
        retornar ERROR_INTERNO_SERVIDOR
    si etiquetas es FALLO:
        registrarError("Fallo al cargar etiquetas", etiquetas.error)
        // Podría mostrar el perfil sin etiquetas o un error general
        retornar ERROR_INTERNO_SERVIDOR

    // Si ambas son exitosas, mostrar la información combinada
    mostrarInterfazUsuario(perfil, etiquetas)
```

Contrastemos esto con la operación de editar una nota. Para editar una nota, el sistema debe primero verificar que el usuario actual tiene los permisos necesarios para modificar esa nota específica. Esta verificación de autorización es un prerrequisito estricto. La operación de guardar la nota no puede iniciarse si la verificación de permisos falla, o incluso si aún no ha completado su evaluación. En este caso, las operaciones deben ejecutarse secuencialmente.

```pseudocodigo
funcion editarNota(notaId, contenido, usuarioId):
    // Paso 1: Verificar permisos (operación secuencial y obligatoria)
    permiso = servicioAutorizacion.verificarPermisoEdicion(usuarioId, notaId)

    si permiso es DENEGADO:
        registrarAccesoDenegado(usuarioId, notaId)
        retornar ERROR_AUTORIZACION // HTTP 403

    // Paso 2: Si hay permiso, proceder a guardar la nota
    resultadoGuardado = servicioNotas.guardarNota(notaId, contenido)

    si resultadoGuardado es FALLO:
        registrarError("Fallo al guardar nota", resultadoGuardado.error)
        retornar ERROR_INTERNO_SERVIDOR // HTTP 500

    retornar EXITO // HTTP 200 o 204
```

En el ejemplo de carga de perfil y etiquetas, un fallo parcial es posible. Si la carga del perfil falla pero la de las etiquetas es exitosa, la aplicación podría optar por mostrar un mensaje de error en el área del perfil mientras las etiquetas se muestran correctamente. Esto es un fallo parcial manejable. En contraste, en la edición de notas, un fallo en la verificación de permisos es un fallo completo para la operación de edición; no hay un estado parcial válido para continuar con el guardado de la nota.

## Práctica
Considere una aplicación de comercio electrónico donde un usuario ha iniciado sesión. Al cargar la página principal, la aplicación necesita mostrar el nombre de usuario, el saldo de puntos de fidelidad y una lista de los productos más vendidos. El nombre de usuario se obtiene del token de sesión, el saldo de puntos se consulta a un servicio de fidelidad y la lista de productos más vendidos se obtiene de un servicio de catálogo.

Describa el flujo de operaciones para cargar esta página principal. Identifique qué operaciones pueden ejecutarse concurrentemente y cuáles deben ser secuenciales. Para cada operación, indique si su fallo debería considerarse un fallo completo que impide la carga de la página, o un fallo parcial que permite mostrar el resto de la información. Justifique sus decisiones basándose en las dependencias de datos y la experiencia de usuario esperada.

## Comprobaciones
1. ¿Cuál es la principal ventaja de ejecutar operaciones de forma concurrente en lugar de secuencial?
Respuesta: La principal ventaja es la mejora de la eficiencia y la capacidad de respuesta, ya que múltiples tareas se procesan simultáneamente, reduciendo el tiempo total de espera.
2. En el ejemplo de edición de notas, ¿por qué la verificación de permisos debe ser una operación secuencial y no concurrente con el guardado de la nota?
Respuesta: La verificación de permisos es un prerrequisito estricto para el guardado de la nota. El guardado no puede proceder si el permiso es denegado o si la verificación aún no ha finalizado, lo que impone una dependencia secuencial.

## Cierre
La capacidad de identificar y gestionar operaciones concurrentes es un pilar para construir aplicaciones eficientes. Sin embargo, la ejecución concurrente introduce la complejidad de cómo manejar los fallos que pueden ocurrir en cualquiera de las ramas paralelas. La siguiente lección abordará cómo propagar y gestionar estos fallos asíncronos de manera efectiva para mantener la coherencia y la robustez del sistema.
