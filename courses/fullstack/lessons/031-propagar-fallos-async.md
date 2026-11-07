---
schemaVersion: 1
id: c3b165db-0824-4163-8058-40ac6b437887
sequence: 31
course: fullstack
stepId: propagar-fallos-async
title: Propagar fallos asíncronos
publishedAt: 2026-11-07T09:47:30.250Z
generationDate: 2026-11-05
summary: Esta lección aborda la gestión de errores en operaciones asíncronas
  concurrentes. Se analiza cómo un fallo en una de estas operaciones afecta al
  flujo general y quién es responsable de observar y responder a dicho rechazo.
  Se explora la diferencia entre políticas de "todo o nada" y "parcial" para el
  manejo de resultados, ilustrando con un ejemplo de carga de datos de usuario y
  sus notas. El objetivo es establecer un marco para decidir cómo la aplicación
  debe reaccionar ante fallos cuando múltiples tareas se ejecutan en paralelo,
  asegurando una respuesta coherente y predecible al usuario o a…
generation:
  model: gemini-2.5-flash
  promptVersion: v3
  contextHash: 16ccb3974f8d866667026f290104e6f6345e6748594207dd65b965d0f1061899
---

## Por qué ahora
En lecciones anteriores, se examinó cómo componer operaciones asíncronas de forma secuencial y cómo identificar aquellas que pueden ejecutarse concurrentemente para mejorar la eficiencia. Sin embargo, la ejecución concurrente introduce una complejidad adicional: la gestión de fallos. Cuando múltiples operaciones se inician en paralelo, la posibilidad de que una o varias de ellas fallen es real. Es fundamental establecer mecanismos claros para observar estos rechazos, determinar su impacto en el resultado global de la operación compuesta y definir quién es el responsable de responder a ellos. Una gestión inadecuada de los fallos asíncronos puede llevar a estados inconsistentes, respuestas incompletas o bloqueos inesperados en la aplicación. Esta lección proporciona las bases para diseñar sistemas robustos que manejen estas situaciones de manera predecible.

## Explicación y ejemplo
Cuando se ejecutan múltiples operaciones asíncronas de forma concurrente, es necesario definir una política sobre cómo se manejan los fallos. Consideremos un escenario donde una aplicación de notas necesita cargar el perfil de un usuario y, simultáneamente, una lista de sus notas más recientes. Ambas operaciones son independientes en su inicio, pero el resultado final de la interfaz de usuario podría depender de ambas.

Se pueden identificar dos políticas principales para la propagación de fallos:

1.  **Política de "todo o nada" (all-or-nothing):** Si cualquiera de las operaciones concurrentes falla, se considera que la operación compuesta completa ha fallado. El rechazo de una única promesa o futuro provoca el rechazo de la promesa que agrupa a todas. El observador de la operación compuesta recibe el primer fallo que ocurre.
2.  **Política de "parcial" (partial):** La operación compuesta solo falla si todas las operaciones concurrentes fallan, o si un subconjunto crítico de ellas falla. Si algunas operaciones tienen éxito y otras fallan, la operación compuesta puede resolverse con los resultados exitosos y una indicación de los fallos, permitiendo un manejo diferenciado.

Para ilustrar, se utiliza pseudocódigo que simula la carga de un perfil de usuario y sus notas. Se asume que `cargarPerfil(idUsuario)` y `cargarNotas(idUsuario)` son funciones asíncronas que devuelven una promesa. Una promesa se resuelve con un valor si la operación es exitosa, o se rechaza con un error si falla.

**Escenario 1: Política de "todo o nada"**
En esta política, si la carga del perfil falla, la operación completa de mostrar la página del usuario se considera fallida, incluso si las notas se cargaron correctamente. El observador de `mostrarPaginaUsuario` solo necesita manejar un único punto de fallo.

```pseudocode
funcion mostrarPaginaUsuario(idUsuario):
  promesaPerfil = cargarPerfil(idUsuario)
  promesaNotas = cargarNotas(idUsuario)

  // Agrupar ambas promesas. Si una falla, la promesa agrupada falla.
  promesaAgrupada = esperarTodo([promesaPerfil, promesaNotas])

  promesaAgrupada.entonces(resultados => {
    // 'resultados' es un arreglo [perfil, notas]
    renderizarPagina(resultados[0], resultados[1])
  }).capturar(error => {
    // Este bloque se ejecuta si promesaPerfil O promesaNotas falla.
    // 'error' contendrá el error de la primera promesa que falló.
    mostrarMensajeError(error)
    registrarFallo(error)
  })
```

En este caso, `esperarTodo` es una abstracción que representa una operación que espera la resolución de todas las promesas dadas. Si alguna de ellas se rechaza, `esperarTodo` se rechaza inmediatamente con el error de la primera promesa que falló. El bloque `capturar` es el observador del rechazo.

**Escenario 2: Política de "parcial"**
En esta política, la aplicación intenta mostrar la información disponible incluso si una parte falla. Por ejemplo, si el perfil falla, se muestra un mensaje de error para el perfil, pero las notas se cargan y se muestran si tuvieron éxito.

```pseudocode
funcion mostrarPaginaUsuarioParcial(idUsuario):
  promesaPerfil = cargarPerfil(idUsuario)
  promesaNotas = cargarNotas(idUsuario)

  // Agrupar ambas promesas. Esperar que todas se asienten (resuelvan o rechacen).
  promesaAgrupada = esperarTodasLasAsentadas([promesaPerfil, promesaNotas])

  promesaAgrupada.entonces(resultados => {
    // 'resultados' es un arreglo de objetos con estado ('cumplida' o 'rechazada')
    // y valor/razón.

    perfil = resultados[0]
    notas = resultados[1]

    if (perfil.estado == 'cumplida') {
      renderizarPerfil(perfil.valor)
    } else {
      mostrarMensajeErrorPerfil(perfil.razon)
      registrarFalloPerfil(perfil.razon)
    }

    if (notas.estado == 'cumplida') {
      renderizarNotas(notas.valor)
    } else {
      mostrarMensajeErrorNotas(notas.razon)
      registrarFalloNotas(notas.razon)
    }
  })
```

Aquí, `esperarTodasLasAsentadas` (similar a `Promise.allSettled` en JavaScript) es una abstracción que espera a que todas las promesas se resuelvan o se rechacen, y devuelve un arreglo con el estado y el resultado de cada una. El observador de `promesaAgrupada` (`.entonces`) siempre se ejecuta, y dentro de él se inspecciona el estado individual de cada operación para decidir cómo responder. La responsabilidad de manejar el fallo se delega al código que procesa los resultados individuales.

La elección entre estas políticas depende de la criticidad de cada operación y de la experiencia de usuario deseada. Si la ausencia de un componente hace que la página sea inútil, la política de "todo o nada" es adecuada. Si la página puede ser funcional con información parcial, la política "parcial" ofrece una mejor resiliencia.

## Práctica
Considere una aplicación de comercio electrónico que, al cargar la página de un producto, realiza dos operaciones asíncronas concurrentes:

1.  `cargarDetallesProducto(idProducto)`: Obtiene el nombre, descripción y precio del producto.
2.  `cargarOpinionesProducto(idProducto)`: Obtiene una lista de opiniones de usuarios para ese producto.

Ambas operaciones son iniciadas al mismo tiempo. El objetivo es mostrar la página del producto al usuario.

Describa cómo implementaría la propagación de fallos para este escenario utilizando la política de "todo o nada" y la política de "parcial". Para cada política, especifique:

*   **Quién observa el rechazo:** Identifique la función o el bloque de código que detectaría el fallo.
*   **Quién debe responder:** Identifique la función o el bloque de código que ejecutaría la lógica de manejo del error (por ejemplo, mostrar un mensaje al usuario, registrar el error, etc.).
*   **Qué respuesta se esperaría del sistema:** Describa el comportamiento observable por el usuario o por otros componentes del sistema en caso de que `cargarDetallesProducto` falle y `cargarOpinionesProducto` tenga éxito.

Utilice pseudocódigo similar al de la explicación para ilustrar sus puntos, enfocándose en la estructura de las promesas y sus observadores (`.entonces`, `.capturar`). No es necesario implementar la lógica de `renderizar` o `mostrarMensajeError`, solo su invocación.

## Comprobaciones
1.  En un sistema que utiliza una política de "todo o nada" para dos operaciones concurrentes A y B, si la operación A falla y la operación B tiene éxito, ¿cuál es el estado final de la operación compuesta que agrupa a A y B?
Respuesta: La operación compuesta se considera fallida y se rechaza con el error de la operación A.
2.  Si una aplicación utiliza una política de "parcial" para cargar un perfil de usuario y sus notas, y la carga del perfil falla mientras que la carga de las notas tiene éxito, ¿qué información se espera que reciba el observador de la operación compuesta?
Respuesta: El observador recibirá un resultado que indica que la operación de perfil fue rechazada (con su razón) y que la operación de notas fue cumplida (con su valor).

## Cierre
La elección de cómo propagar los fallos asíncronos es una decisión de diseño fundamental que impacta la robustez y la experiencia de usuario de una aplicación. Comprender las políticas de "todo o nada" y "parcial" permite diseñar respuestas adecuadas a las interrupciones. El siguiente paso es explorar cómo diferenciar entre la cancelación de una operación y un tiempo de espera agotado, dos tipos específicos de rechazos que requieren un manejo distinto.
