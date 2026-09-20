---
schemaVersion: 1
id: d34b48fb-96d6-44bf-8709-b60e163ba6b1
sequence: 2
course: fullstack
stepId: evitar-id-del-cliente
title: No confiar en el propietario enviado por el cliente
publishedAt: 2026-09-20T14:01:25.323Z
generationDate: 2026-09-20
summary: Esta lección aborda la vulnerabilidad de confiar en el identificador de
  usuario (userId) proporcionado por el cliente para operaciones de modificación
  de recursos. Se explica por qué la identidad del usuario debe derivarse
  exclusivamente de la sesión autenticada y no de los datos enviados en el
  cuerpo o los parámetros de la solicitud. Se comparan rutas vulnerables con
  implementaciones seguras, se presenta un flujo de trabajo correcto y se
  proporciona código mínimo para asegurar que un usuario solo pueda modificar
  sus propios recursos. La lección incluye una práctica y comprobaciones para…
generation:
  model: gemini-2.5-flash
  promptVersion: v1
  contextHash: 21f1ed1e01c6ebef4b17224afab6bda54f85c9e114c361d85b85489674cdce3d
---

En la lección anterior, se estableció la importancia de la propiedad de los recursos, indicando que la autenticación y la asignación de roles no son suficientes para autorizar la modificación de cualquier recurso. Se enfatizó la necesidad de verificar que el `userId` asociado a la sesión del usuario coincida con el `userId` del recurso que se intenta modificar. Ahora, profundizaremos en un error común que anula esta protección: confiar en el identificador de propietario enviado por el cliente en lugar de derivarlo del contexto de la sesión autenticada. Este enfoque es crucial para prevenir escaladas de privilegios y asegurar la integridad de los datos.

### Derivación de la identidad desde la sesión

El problema central surge cuando un servidor utiliza un identificador de usuario (`userId`) proporcionado directamente por el cliente para determinar la propiedad de un recurso. Un atacante podría manipular este `userId` en el cuerpo de la solicitud o en los parámetros de la URL para intentar modificar recursos que pertenecen a otros usuarios. Aunque el usuario esté autenticado y tenga un rol válido, si el servidor no verifica que el `userId` de la solicitud coincida con el `userId` de la sesión autenticada, se crea una vulnerabilidad de autorización.

Consideremos un escenario donde un usuario desea actualizar su perfil. El cliente envía una solicitud `PATCH` a `/users/:id` con un cuerpo que contiene los nuevos datos del perfil. Si el servidor toma el `id` de los parámetros de la URL o un `userId` del cuerpo de la solicitud y lo usa directamente para la operación de actualización sin validación adicional, un usuario malintencionado podría enviar `PATCH /users/otroUsuarioId` con su propio `userId` en el cuerpo, o simplemente manipular el `id` en la URL para intentar modificar el perfil de `otroUsuarioId`.

El flujo correcto para manejar esta situación implica los siguientes pasos:

1.  **El cliente envía una solicitud**: Por ejemplo, una solicitud `PATCH` para actualizar un recurso.
2.  **El servidor autentica la solicitud**: Se verifica la identidad del usuario a través de la sesión (por ejemplo, mediante una cookie de sesión o un token JWT).
3.  **El servidor deriva la identidad**: Una vez autenticado, el servidor extrae el `userId` del contexto de la sesión. Este `userId` es la fuente de verdad sobre quién está realizando la solicitud.
4.  **El servidor utiliza el `userId` de la sesión para la operación**: Para cualquier operación que requiera verificar la propiedad, el servidor utiliza el `userId` obtenido de la sesión, no el `userId` que pueda haber sido enviado por el cliente en el cuerpo o los parámetros de la solicitud.
5.  **El servidor verifica la propiedad**: Antes de realizar la modificación, el servidor consulta la base de datos para asegurarse de que el recurso que se intenta modificar realmente pertenece al `userId` de la sesión. Si no coincide, se deniega la operación.

### Ejemplo de código

A continuación, se presentan dos ejemplos de rutas en un entorno Node.js con Express, ilustrando la diferencia entre una implementación vulnerable y una segura. Se asume que existe un middleware de autenticación que popula `req.session.userId` con el identificador del usuario autenticado.

**Ruta vulnerable (no recomendada):**

```javascript
// Middleware de autenticación (asumido)
// app.use(authenticateUser);

app.patch('/posts/:postId', (req, res) => {
  const { postId } = req.params;
  const { title, content, authorId } = req.body; // authorId es enviado por el cliente

  // ¡VULNERABLE! Confía en authorId del cliente para la autorización
  // Un atacante puede enviar un authorId diferente al suyo
  if (!authorId) {
    return res.status(400).json({ message: 'authorId es requerido' });
  }

  // Lógica para actualizar el post en la base de datos
  // Esto podría permitir a un usuario modificar posts de otros
  db.updatePost(postId, { title, content, authorId })
    .then(result => {
      if (result.modifiedCount === 0) {
        return res.status(404).json({ message: 'Post no encontrado o no modificado' });
      }
      res.status(200).json({ message: 'Post actualizado exitosamente' });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ message: 'Error interno del servidor' });
    });
});
```

En el ejemplo vulnerable, el servidor toma `authorId` directamente del cuerpo de la solicitud (`req.body`). Si un usuario autenticado envía un `authorId` que no es el suyo, el servidor podría actualizar el post de otro usuario, asumiendo que la base de datos no tiene una restricción de propiedad a nivel de esquema o que la consulta de actualización no incluye una cláusula `WHERE authorId = ?` basada en la sesión.

**Ruta segura (recomendada):**

```javascript
// Middleware de autenticación (asumido)
// app.use(authenticateUser); // Este middleware popula req.session.userId

app.patch('/posts/:postId', (req, res) => {
  const { postId } = req.params;
  const { title, content } = req.body;
  const userIdFromSession = req.session.userId; // Deriva el userId de la sesión

  if (!userIdFromSession) {
    // Esto no debería ocurrir si el middleware de autenticación funciona correctamente
    return res.status(401).json({ message: 'No autenticado' });
  }

  // Lógica para actualizar el post en la base de datos
  // Se asegura que el post pertenezca al usuario de la sesión
  db.updatePost(postId, { title, content }, userIdFromSession)
    .then(result => {
      if (result.modifiedCount === 0) {
        // Si no se modificó, podría ser que el post no existe o no pertenece al usuario
        // Se puede diferenciar con una consulta previa o un mensaje más específico
        return res.status(403).json({ message: 'Acceso denegado o post no encontrado' });
      }
      res.status(200).json({ message: 'Post actualizado exitosamente' });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ message: 'Error interno del servidor' });
    });
});

// Función simulada de la base de datos para el ejemplo
const db = {
  posts: [
    { id: 'post1', title: 'Mi primer post', content: 'Contenido 1', authorId: 'user1' },
    { id: 'post2', title: 'Post de otro', content: 'Contenido 2', authorId: 'user2' }
  ],
  updatePost: function(postId, updates, authorId) {
    return new Promise(resolve => {
      const index = this.posts.findIndex(p => p.id === postId && p.authorId === authorId);
      if (index !== -1) {
        this.posts[index] = { ...this.posts[index], ...updates };
        resolve({ modifiedCount: 1 });
      } else {
        resolve({ modifiedCount: 0 });
      }
    });
  }
};
```

En la ruta segura, el `userId` se obtiene exclusivamente de `req.session.userId`. La función `db.updatePost` ahora requiere este `authorId` para asegurar que solo se actualice un post si su `authorId` coincide con el `userId` de la sesión. Si un usuario intenta modificar un post que no le pertenece, la base de datos no encontrará una coincidencia y la operación no se realizará, resultando en un `status 403`.

### Práctica

Considere un endpoint `PATCH /users/:id` que permite a un usuario actualizar su propia información de perfil. Actualmente, este endpoint toma el `id` del usuario a actualizar directamente de los parámetros de la URL (`req.params.id`) y los datos del cuerpo (`req.body`).

**Tarea:** Modifique este endpoint para asegurar que el `id` del usuario a actualizar siempre provenga de `req.session.userId` y no de `req.params.id`. El `id` de los parámetros de la URL debe ser ignorado o utilizado únicamente para una verificación adicional, pero la autorización principal debe basarse en la sesión.

```javascript
// Asuma que req.session.userId contiene el ID del usuario autenticado

app.patch('/users/:id', (req, res) => {
  const userIdFromParams = req.params.id; // ID del usuario a actualizar, según el cliente
  const userIdFromSession = req.session.userId; // ID del usuario autenticado
  const { name, email } = req.body; // Datos a actualizar

  // Su código aquí para implementar la lógica de autorización segura
  // y la actualización del perfil.

  // Ejemplo de cómo podría lucir la actualización segura:
  // db.updateUserProfile(userIdFromSession, { name, email })
  //   .then(...) // Manejo de éxito y error
});
```

### Comprobaciones

1.  **Comprobación:** Un usuario autenticado (`userA`) intenta enviar una solicitud `PATCH` a `/posts/postDeUserB` con el objetivo de modificar un post que pertenece a `userB`. Si la ruta está implementada de forma segura, ¿qué código de estado HTTP debería recibir `userA`?
    **Respuesta:** `403 Forbidden`. Esto indica que el servidor entiende la solicitud pero se niega a autorizarla porque el usuario no tiene permiso para acceder al recurso solicitado.

2.  **Comprobación:** Si un endpoint `PATCH /users/:id` está diseñado para actualizar el perfil del usuario autenticado y el servidor deriva el `userId` de `req.session.userId`, ¿qué sucede si el cliente envía un `userId` diferente en el cuerpo de la solicitud (por ejemplo, `{
