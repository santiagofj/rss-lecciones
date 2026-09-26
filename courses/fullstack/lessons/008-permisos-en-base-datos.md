---
schemaVersion: 1
id: 9945b665-0f83-494a-b237-d9ce7aa5f254
sequence: 8
course: fullstack
stepId: permisos-en-base-datos
title: Filtrar permisos desde la consulta
publishedAt: 2026-09-26T08:25:52.675Z
generationDate: 2026-09-26
summary: "Esta lección explica cómo integrar las verificaciones de autorización
  directamente en las consultas a la base de datos para prevenir la carga de
  datos no autorizados. Se contrasta la recuperación de datos por ID y la
  posterior verificación de propiedad con un enfoque más seguro: consultar por
  ID y por ID de propietario. Este método reduce el riesgo de exponer
  información sensible al asegurar que solo se recuperen los datos accesibles
  para el usuario autenticado desde el inicio. La lección proporciona un ejemplo
  práctico y enfatiza la importancia de la autorización en el servidor para la…"
generation:
  model: gemini-2.5-flash
  promptVersion: v3
  contextHash: 5391885c549e746898e47cae7834069699fdb2be7c8c590f677c359e26d19cb9
---

## Por qué ahora
En lecciones anteriores, se estableció la importancia de la autorización en el servidor, la distinción entre ocultar elementos de la interfaz de usuario y la seguridad real, y cómo probar la propiedad de los recursos. Se ha comprendido que una respuesta HTTP 403 indica un fallo de autorización. Sin embargo, un patrón común en el desarrollo de APIs implica recuperar un recurso de la base de datos y, posteriormente, verificar si el usuario autenticado tiene permiso para acceder a él. Aunque esta verificación final evita que el recurso sea enviado al cliente no autorizado, el dato ya ha sido cargado en la memoria del servidor. Este enfoque puede introducir riesgos sutiles, como la exposición de datos en logs, cachés o durante procesos de depuración, además de ser ineficiente al recuperar información que finalmente no se utilizará. El objetivo de esta lección es mitigar este riesgo al integrar la verificación de permisos directamente en la consulta de datos, asegurando que solo se carguen los recursos a los que el usuario tiene derecho desde el primer momento.

## Explicación y ejemplo
El problema fundamental surge cuando la lógica de autorización se aplica después de que los datos han sido recuperados de la capa de persistencia. Considere un escenario donde un usuario solicita un documento específico por su identificador único. Una implementación inicial podría ser la siguiente:

1.  El servidor recibe una solicitud para `/documents/:id`.
2.  El servidor consulta la base de datos para encontrar el documento con el `id` proporcionado.
3.  Una vez recuperado el documento, el servidor verifica si el `ownerId` del documento coincide con el `userId` del usuario autenticado.
4.  Si coinciden, el documento se envía al cliente. Si no, se devuelve un error 403 o 404.

Aunque esta secuencia protege el envío del documento al cliente no autorizado, el documento completo, incluyendo su contenido potencialmente sensible, ya ha residido en la memoria del proceso del servidor. En entornos complejos, esta información podría persistir en logs de depuración, ser capturada por herramientas de monitoreo o incluso ser accesible a otras partes del sistema si no se gestiona con extremo cuidado. Además, la operación de recuperar un documento que luego se descarta es un uso ineficiente de los recursos de la base de datos y del servidor.

La solución consiste en trasladar la condición de autorización a la propia consulta de la base de datos. En lugar de buscar un documento solo por su `id`, se busca un documento que cumpla dos condiciones simultáneamente: que su `id` sea el solicitado Y que su `ownerId` coincida con el `userId` del usuario autenticado. De esta manera, la base de datos solo devolverá el documento si el usuario autenticado es su propietario. Si la base de datos no encuentra ningún documento que satisfaga ambas condiciones, significa que el documento no existe o que existe pero no pertenece al usuario. En ambos casos, la respuesta adecuada es un HTTP 404 Not Found, ya que el usuario no debe poder distinguir entre la inexistencia de un recurso y la falta de permisos para acceder a uno existente. Esta práctica evita la enumeración de recursos y mejora la seguridad.

Considere el siguiente ejemplo conceptual utilizando un entorno Node.js con Express y una base de datos relacional, donde `req.user.id` representa el ID del usuario autenticado:

**Enfoque inicial (menos seguro y eficiente):**

```javascript
// GET /api/documents/:id
app.get('/api/documents/:id', async (req, res) => {
  const documentId = req.params.id;
  const userId = req.user.id; // ID del usuario autenticado

  try {
    const document = await Document.findByPk(documentId); // Carga el documento por ID

    if (!document) {
      return res.status(404).json({ message: 'Documento no encontrado' });
    }

    if (document.ownerId !== userId) {
      // El documento existe, pero el usuario no es el propietario
      return res.status(403).json({ message: 'Acceso denegado' });
    }

    res.json(document);
  } catch (error) {
    console.error('Error al obtener documento:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});
```

En el código anterior, `Document.findByPk(documentId)` carga el documento completo antes de la verificación de `ownerId`. Si el `ownerId` no coincide, el documento ya ha sido procesado en el servidor.

**Enfoque mejorado (más seguro y eficiente):**

```javascript
// GET /api/documents/:id
app.get('/api/documents/:id', async (req, res) => {
  const documentId = req.params.id;
  const userId = req.user.id; // ID del usuario autenticado

  try {
    // Busca el documento por ID Y por ownerId simultáneamente
    const document = await Document.findOne({
      where: {
        id: documentId,
        ownerId: userId
      }
    });

    if (!document) {
      // Si no se encuentra, es porque no existe o no pertenece al usuario
      return res.status(404).json({ message: 'Documento no encontrado' });
    }

    res.json(document);
  } catch (error) {
    console.error('Error al obtener documento:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});
```

En el enfoque mejorado, la consulta a la base de datos incluye ambas condiciones (`id` y `ownerId`). Si la base de datos no devuelve un resultado, el servidor no tiene conocimiento del documento si no pertenece al usuario. Esto reduce la superficie de ataque y mejora la eficiencia al delegar la lógica de filtrado a la base de datos, que está optimizada para estas operaciones.

## Práctica
Para esta práctica, se trabajará con un sistema de gestión de tareas donde cada tarea tiene un `id`, un `title`, una `description` y un `ownerId`. Se asume que ya existe una API REST con un endpoint para obtener una tarea por su ID (`GET /tasks/:id`) y que la autenticación del usuario ya está implementada, proporcionando el `userId` del usuario autenticado en el objeto `req.user`.

**Tarea:**

1.  **Identifique el endpoint:** Localice el controlador o manejador de ruta para `GET /tasks/:id` en su aplicación. Examine cómo se recupera la tarea de la base de datos.
2.  **Modifique la consulta:** Cambie la lógica de recuperación de la tarea para incluir el `ownerId` del usuario autenticado directamente en la consulta a la base de datos. Si está utilizando un ORM, esto implicará añadir una condición `where` adicional. Si usa consultas SQL directas, incorpore `AND ownerId = :userId` a su cláusula `WHERE`.
3.  **Ajuste la respuesta:** Asegúrese de que, si la consulta no devuelve ninguna tarea (porque no existe o no pertenece al usuario), la API responda con un código de estado HTTP 404 Not Found. Elimine cualquier lógica de verificación de `ownerId` posterior a la recuperación de la base de datos, ya que la base de datos ya habrá realizado esa verificación.
4.  **Pruebe con dos usuarios:**
    *   Cree dos usuarios, `UsuarioA` y `UsuarioB`.
    *   Cree una tarea (`Tarea1`) asignada a `UsuarioA`.
    *   Cree otra tarea (`Tarea2`) asignada a `UsuarioB`.
    *   Autentíquese como `UsuarioA` e intente acceder a `Tarea1`. Verifique que la tarea se devuelva correctamente.
    *   Autentíquese como `UsuarioA` e intente acceder a `Tarea2`. Verifique que la API responda con un HTTP 404 Not Found.
    *   Autentíquese como `UsuarioB` e intente acceder a `Tarea2`. Verifique que la tarea se devuelva correctamente.
    *   Autentíquese como `UsuarioB` e intente acceder a `Tarea1`. Verifique que la API responda con un HTTP 404 Not Found.

Esta práctica consolidará la comprensión de cómo la autorización puede integrarse de manera efectiva en la capa de datos, mejorando tanto la seguridad como la eficiencia de la aplicación.

## Comprobaciones
1.  ¿Cuál es la principal ventaja de incluir el `ownerId` en la consulta de la base de datos en lugar de verificarlo después de recuperar el recurso?
Respuesta: La principal ventaja es que se evita cargar datos potencialmente sensibles en la memoria del servidor si el usuario no está autorizado, reduciendo el riesgo de exposición de información y mejorando la eficiencia al no recuperar datos innecesarios.
2.  Si una consulta que incluye `id` y `ownerId` no devuelve ningún resultado, ¿qué código de estado HTTP es el más apropiado para la respuesta y por qué?
Respuesta: El código de estado HTTP 404 Not Found es el más apropiado. Esto se debe a que el usuario no debe poder distinguir si el recurso no existe o si existe pero no tiene permisos para acceder a él, previniendo ataques de enumeración de recursos.

## Cierre
La integración de los permisos directamente en las consultas de la base de datos es una estrategia fundamental para construir APIs robustas y seguras. Al filtrar los datos en la fuente, se minimiza la superficie de ataque y se optimiza el rendimiento del sistema. En la próxima lección, se explorará cómo aplicar principios similares para gestionar permisos en operaciones de escritura, como la actualización de recursos, asegurando que solo los usuarios autorizados puedan modificar la información.
