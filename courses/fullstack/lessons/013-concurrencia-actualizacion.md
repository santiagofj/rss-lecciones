---
schemaVersion: 1
id: ad996a6d-9b71-4904-8f2f-63bf9dd1e7b6
sequence: 13
course: fullstack
stepId: concurrencia-actualizacion
title: Reconocer una actualización perdida
publishedAt: 2026-10-01T09:56:33.421Z
generationDate: 2026-10-01
summary: Esta lección aborda el problema de las actualizaciones perdidas, un
  escenario donde operaciones concurrentes sobre el mismo dato pueden llevar a
  un estado inconsistente. Se explica cómo el patrón "leer-modificar-escribir"
  es susceptible a este fallo y se introducen mecanismos para mitigar este
  riesgo, como las actualizaciones atómicas y el control de versiones optimista.
  A través de un ejemplo práctico, se ilustra la secuencia de eventos que
  conduce a una actualización perdida y se demuestran las estrategias para
  garantizar la integridad de los datos en entornos concurrentes. Se enfatiza
  la…
generation:
  model: gemini-2.5-flash
  promptVersion: v3
  contextHash: da90ba3992c28f485b9655df3c47e23a4c0361e952930b95018697336383ba2f
---

## Por qué ahora
En lecciones previas, se ha explorado la importancia de la validación de entrada para proteger la integridad de los datos y la necesidad de transacciones para asegurar que múltiples operaciones de escritura relacionadas se completen de forma atómica. Estas medidas son fundamentales para mantener la consistencia del sistema frente a entradas inválidas o fallos intermedios. Sin embargo, existe otro desafío crítico que surge cuando múltiples usuarios o procesos intentan modificar el mismo dato de forma concurrente. Sin un manejo adecuado, estas interacciones pueden llevar a un estado inconsistente donde una de las actualizaciones se pierde silenciosamente, sin dejar rastro de su ejecución. Comprender este fenómeno es esencial para construir aplicaciones robustas que garanticen la fiabilidad de la información en entornos distribuidos y concurrentes.

## Explicación y ejemplo
El problema de la actualización perdida ocurre cuando dos o más operaciones intentan modificar el mismo recurso de forma simultánea, y una de las modificaciones sobrescribe a otra sin haber incorporado sus cambios. Esto es particularmente común en el patrón de "leer-modificar-escribir" (read-modify-write), donde un proceso primero lee el estado actual de un dato, luego realiza alguna modificación sobre ese valor leído y finalmente intenta escribir el nuevo valor. Si otro proceso realiza la misma secuencia de operaciones en el mismo dato antes de que el primer proceso haya completado su escritura, los cambios del primer proceso pueden ser anulados por la escritura posterior del segundo proceso.

Considere un sistema de gestión de inventario donde múltiples empleados pueden actualizar la cantidad de un producto. Supongamos que el producto 'A' tiene 100 unidades en stock. Dos empleados, E1 y E2, intentan reducir el stock en 10 unidades cada uno.

El flujo de eventos sin control de concurrencia podría ser el siguiente:

1.  **E1 lee**: E1 consulta la base de datos y obtiene que el stock de 'A' es 100.
2.  **E2 lee**: E2 consulta la base de datos y también obtiene que el stock de 'A' es 100.
3.  **E1 modifica**: E1 calcula el nuevo stock: 100 - 10 = 90.
4.  **E1 escribe**: E1 actualiza la base de datos, estableciendo el stock de 'A' en 90.
5.  **E2 modifica**: E2 calcula el nuevo stock: 100 - 10 = 90.
6.  **E2 escribe**: E2 actualiza la base de datos, estableciendo el stock de 'A' en 90.

El resultado final es que el stock de 'A' es 90. Sin embargo, se esperaría que el stock fuera 80 (100 - 10 - 10). La actualización de E1 se ha perdido porque E2 basó su cálculo en un valor obsoleto (100) y sobrescribió el cambio de E1.

Para mitigar este problema, se pueden emplear varias estrategias. Una de ellas es el uso de **actualizaciones atómicas**. Muchas bases de datos ofrecen operaciones que permiten modificar un valor basándose en su estado actual en una sola operación indivisible, sin necesidad de una lectura previa explícita por parte de la aplicación. Por ejemplo, en lugar de leer y luego escribir, se podría ejecutar una instrucción como `UPDATE productos SET stock = stock - 10 WHERE id = 'A'`. La base de datos garantiza que esta operación se realice de forma segura, incluso si múltiples clientes la ejecutan simultáneamente. El motor de la base de datos gestiona los bloqueos internos para asegurar que cada decremento se aplique correctamente.

Otra estrategia es el **control de versiones optimista**. Este enfoque añade un campo de versión (por ejemplo, un número entero o un timestamp) a los datos. Cuando un cliente lee un registro, también lee su número de versión. Al intentar escribir una actualización, el cliente incluye el número de versión que leyó en la condición de la actualización. La base de datos solo aplica la actualización si el número de versión en la base de datos coincide con el número de versión proporcionado por el cliente. Si no coinciden, significa que otro proceso ha modificado el dato entre la lectura y la escritura del cliente actual, y la operación es rechazada. El cliente debe entonces reintentar la operación, leyendo la versión más reciente del dato.

Ejemplo de control de versiones optimista:

1.  **E1 lee**: Stock 'A' es 100, versión 1.
2.  **E2 lee**: Stock 'A' es 100, versión 1.
3.  **E1 modifica**: Nuevo stock 90.
4.  **E1 escribe**: `UPDATE productos SET stock = 90, version = 2 WHERE id = 'A' AND version = 1`. Esta operación se ejecuta con éxito. El stock es 90, versión 2.
5.  **E2 modifica**: Nuevo stock 90.
6.  **E2 escribe**: `UPDATE productos SET stock = 90, version = 2 WHERE id = 'A' AND version = 1`. Esta operación falla porque `version = 1` ya no es cierto en la base de datos (ahora es 2). La base de datos devuelve 0 filas afectadas o un error de concurrencia.

En este escenario, E2 es notificado de que su actualización no pudo ser aplicada debido a un conflicto. E2 puede entonces reintentar la operación, leyendo el stock actual (90, versión 2) y aplicando su decremento para obtener 80, versión 3.

## Práctica
Para esta práctica, se propone simular el problema de la actualización perdida y luego implementar una solución utilizando control de versiones optimista. Se requiere un entorno de desarrollo con una base de datos relacional (por ejemplo, PostgreSQL, MySQL o SQLite) y un lenguaje de programación con el que el alumno esté familiarizado (por ejemplo, Node.js con un cliente de base de datos).

1.  **Configuración inicial**: Cree una tabla `productos` con al menos los campos `id` (VARCHAR o INT, clave primaria), `stock` (INT) y `version` (INT, con valor inicial 1). Inserte un producto de prueba, por ejemplo, `('producto_X', 100, 1)`.
2.  **Simulación de actualización perdida**: Escriba dos funciones o bloques de código que simulen dos clientes concurrentes. Cada uno debe realizar la secuencia "leer-modificar-escribir" sin control de concurrencia. La función debe:
    *   Leer el `stock` y la `version` del `producto_X`.
    *   Esperar un breve período de tiempo (por ejemplo, 100-200 ms) para simular latencia o procesamiento.
    *   Decrementar el `stock` en 10 unidades.
    *   Actualizar el `stock` en la base de datos sin considerar la `version`.
    Ejecute estas dos funciones de forma casi simultánea (por ejemplo, usando `Promise.all` si usa JavaScript, o hilos/procesos si usa otro lenguaje). Verifique el `stock` final en la base de datos. Debería observar el problema de la actualización perdida, donde el stock es 90 en lugar de 80.
3.  **Implementación con control de versiones optimista**: Modifique las funciones para incluir el control de versiones optimista. La actualización debe ahora incluir la condición `WHERE id = 'producto_X' AND version = <version_leida>`. Además, la actualización debe incrementar el campo `version` (`SET stock = <nuevo_stock>, version = version + 1`). Maneje el caso en que la actualización no afecte ninguna fila (lo que indica un conflicto de versión) y reintente la operación. Ejecute nuevamente las dos funciones concurrentes y verifique el `stock` final. El resultado esperado es 80, y uno de los clientes debería haber reintentado su operación.

## Comprobaciones
1.  ¿Qué resultado se obtiene en el campo `stock` de la base de datos si dos procesos intentan decrementar el valor de 100 en 10 unidades cada uno, utilizando el patrón "leer-modificar-escribir" sin ningún mecanismo de control de concurrencia?
Respuesta: El valor final del `stock` será 90.
2.  En un sistema que utiliza control de versiones optimista, si un proceso intenta actualizar un registro con una versión antigua, ¿qué acción debe tomar la aplicación cliente al detectar que la actualización no se aplicó?
Respuesta: La aplicación cliente debe reintentar la operación, leyendo la versión más reciente del dato y aplicando sus cambios sobre ella.

## Cierre
La identificación y mitigación de las actualizaciones perdidas son fundamentales para la integridad de los datos en sistemas concurrentes. Al comprender cómo el patrón "leer-modificar-escribir" puede fallar, se pueden aplicar estrategias como las actualizaciones atómicas o el control de versiones optimista. La próxima lección explorará cómo comunicar estos conflictos de concurrencia al usuario final de manera efectiva, garantizando una experiencia de usuario coherente y robusta.
