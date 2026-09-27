---
schemaVersion: 1
id: 00eacb3d-4aed-4543-9e89-fced2ab0233e
sequence: 9
course: fullstack
stepId: actualizaciones-seguras
title: Evitar mass assignment
publishedAt: 2026-09-27T09:03:47.602Z
generationDate: 2026-09-27
summary: Esta lección aborda la vulnerabilidad de mass assignment, que ocurre
  cuando un sistema acepta automáticamente todos los campos de una solicitud
  para actualizar un recurso, permitiendo a usuarios malintencionados modificar
  campos sensibles como roles o IDs de propietario. Se explica cómo construir un
  objeto de cambios permitido, filtrando explícitamente los campos que pueden
  ser actualizados y rechazando aquellos que deben permanecer inalterados o que
  requieren permisos especiales. El objetivo es asegurar la integridad de los
  datos y la seguridad del sistema mediante un control estricto sobre…
generation:
  model: gemini-2.5-flash
  promptVersion: v3
  contextHash: dcaba1cfa44b1f70d4f4a8bbf52e6da258c6e604ea31669ee69e4c7abaef553e
---

## Por qué ahora
Las lecciones previas establecieron la importancia de la autorización en el servidor, demostrando que ocultar elementos de la interfaz de usuario no confiere seguridad y que las verificaciones de propiedad deben integrarse en las consultas a la base de datos. Sin embargo, incluso con estas medidas, persiste una vulnerabilidad si el sistema acepta indiscriminadamente todos los campos enviados en una solicitud de actualización. Este escenario se conoce como mass assignment. Un atacante podría incluir campos sensibles en el cuerpo de una petición, como `ownerId` o `role`, esperando que el servidor los procese y modifique, elevando así sus privilegios o alterando la propiedad de un recurso sin autorización explícita. Para prevenir esta manipulación, es fundamental controlar de forma explícita qué campos se permiten actualizar en cada operación, rechazando cualquier intento de modificar datos internos o protegidos.

## Explicación y ejemplo
El problema de mass assignment surge cuando una función de actualización toma directamente el cuerpo de una solicitud HTTP y lo utiliza para modificar un registro en la base de datos. Considere una API para actualizar publicaciones (`posts`). Un usuario legítimo podría querer cambiar el `title` y el `content` de su publicación. Sin embargo, si la implementación es permisiva, un atacante podría enviar una solicitud con un cuerpo que incluya, además de los campos esperados, un `ownerId` diferente o un `status` que no debería poder modificar directamente.

Por ejemplo, una solicitud `PUT /api/posts/123` con el siguiente cuerpo:

```json
{
  "title": "Nuevo título de mi publicación",
  "content": "Contenido actualizado.",
  "ownerId": "otroUsuarioID",
  "createdAt": "2023-01-01T00:00:00Z"
}
```

Si el servidor aplica ciegamente todos los campos del cuerpo de la solicitud al objeto `post` existente, el `ownerId` de la publicación podría ser modificado, transfiriendo la propiedad a `otroUsuarioID`, y el campo `createdAt` podría ser sobrescrito, lo cual es incorrecto ya que esta fecha no debería ser modificable. Esto compromete la integridad de los datos y la lógica de autorización previamente establecida.

Para mitigar el mass assignment, se debe construir un objeto de cambios permitido. Este objeto contendrá únicamente los campos que el usuario tiene permiso para modificar en el contexto de la operación actual. Los campos como `ownerId`, `role`, `createdAt`, `updatedAt` o cualquier otro campo interno del sistema deben ser explícitamente excluidos de esta operación de actualización.

El flujo para una actualización segura sería el siguiente:

1.  El servidor recibe una solicitud de actualización (por ejemplo, `PUT` o `PATCH`).
2.  Se extrae el cuerpo de la solicitud (`request.body`).
3.  Se define una lista explícita de campos permitidos para la actualización en ese contexto específico (por ejemplo, `allowedFields = ['title', 'content', 'status']`).
4.  Se crea un nuevo objeto (`updatePayload`) que solo incluirá los campos del `request.body` que estén presentes en `allowedFields`.
5.  Este `updatePayload` filtrado es el único que se utiliza para interactuar con la base de datos.

Considere el siguiente ejemplo de implementación en un entorno Node.js con Express y una base de datos simulada:

```javascript
// Supongamos que 'posts' es una colección de publicaciones en memoria
const posts = [
  { id: '123', title: 'Mi primera publicación', content: 'Contenido inicial', ownerId: 'usuarioA', status: 'draft', createdAt: '2023-03-10T10:00:00Z' },
  { id: '456', title: 'Otra publicación', content: 'Más contenido', ownerId: 'usuarioB', status: 'published', createdAt: '2023-03-12T11:00:00Z' }
];

// Función de actualización de una publicación
function updatePost(postId, incomingData, requestingUserId) {
  const postIndex = posts.findIndex(p => p.id === postId);
  if (postIndex === -1) {
    throw new Error('Publicación no encontrada');
  }

  const existingPost = posts[postIndex];

  // Verificación de autorización de propiedad
  if (existingPost.ownerId !== requestingUserId) {
    throw new Error('Acceso denegado: No es el propietario de la publicación');
  }

  // Definir los campos permitidos para la actualización
  const allowedFields = ['title', 'content', 'status'];
  const updatePayload = {};

  // Construir el objeto de actualización seguro
  for (const field of allowedFields) {
    if (incomingData[field] !== undefined) {
      updatePayload[field] = incomingData[field];
    }
  }

  // Aplicar los cambios permitidos
  posts[postIndex] = { ...existingPost, ...updatePayload, updatedAt: new Date().toISOString() };
  return posts[postIndex];
}

// Simulación de una solicitud de actualización
const userId = 'usuarioA'; // Usuario autenticado
const postIdToUpdate = '123';

// Intento de actualización con campos permitidos y no permitidos
const maliciousUpdateData = {
  title: 'Título actualizado por usuarioA',
  content: 'Contenido revisado.',
  ownerId: 'usuarioC', // Campo no permitido
  createdAt: '2024-01-01T00:00:00Z', // Campo no permitido
  status: 'published' // Campo permitido
};

try {
  const updatedPost = updatePost(postIdToUpdate, maliciousUpdateData, userId);
  console.log('Publicación actualizada:', updatedPost);
} catch (error) {
  console.error('Error al actualizar:', error.message);
}

// Resultado esperado:
// Publicación actualizada: { id: '123', title: 'Título actualizado por usuarioA', content: 'Contenido revisado.', ownerId: 'usuarioA', status: 'published', createdAt: '2023-03-10T10:00:00Z', updatedAt: '...' }
// Los campos 'ownerId' y 'createdAt' no se modifican.
```

En este ejemplo, la función `updatePost` primero verifica la propiedad. Luego, itera sobre `allowedFields` y solo copia los valores correspondientes del `incomingData` al `updatePayload`. Los campos `ownerId` y `createdAt` presentes en `maliciousUpdateData` son ignorados, protegiendo así la integridad del recurso. Este enfoque garantiza que solo los campos explícitamente definidos como modificables puedan ser alterados, previniendo el mass assignment.

## Práctica
Considere una aplicación que gestiona perfiles de usuario. Cada perfil tiene campos como `username`, `email`, `bio`, `role` y `lastLogin`. El campo `role` determina los permisos del usuario (por ejemplo, `user`, `editor`, `admin`), y `lastLogin` es una fecha que el sistema actualiza automáticamente.

Su tarea es implementar una función `updateUserProfile(userId, incomingData, requestingUserId)` que cumpla con los siguientes requisitos:

1.  Verifique que `requestingUserId` sea el mismo que `userId` para asegurar que un usuario solo pueda actualizar su propio perfil.
2.  Defina una lista de campos que un usuario puede modificar en su propio perfil. Estos campos deben ser `username`, `email` y `bio`.
3.  Construya un objeto de actualización seguro que contenga solo los campos permitidos del `incomingData`.
4.  Asegúrese de que los campos `role` y `lastLogin` (si están presentes en `incomingData`) sean ignorados y no se apliquen al perfil del usuario.
5.  Actualice el perfil del usuario con los campos seguros y retorne el perfil actualizado.

Utilice una estructura de datos simple en memoria para representar los perfiles de usuario, similar al ejemplo de `posts`.

```javascript
const users = [
  { id: 'user1', username: 'alice', email: 'alice@example.com', bio: 'Desarrolladora.', role: 'user', lastLogin: '2023-04-01T09:00:00Z' },
  { id: 'user2', username: 'bob', email: 'bob@example.com', bio: 'Diseñador UX.', role: 'user', lastLogin: '2023-04-02T10:00:00Z' }
];

// Implemente la función updateUserProfile aquí
function updateUserProfile(userId, incomingData, requestingUserId) {
  // ... su implementación
}

// Pruebe su implementación con estos datos
const userToUpdate = 'user1';
const dataFromRequest = {
  username: 'Alicia',
  email: 'alicia.nueva@example.com',
  bio: 'Desarrolladora full stack con experiencia en seguridad.',
  role: 'admin', // Intento de modificar un campo no permitido
  lastLogin: '2024-01-01T00:00:00Z' // Intento de modificar un campo no permitido
};

try {
  const updatedUser = updateUserProfile(userToUpdate, dataFromRequest, 'user1');
  console.log('Perfil actualizado:', updatedUser);
} catch (error) {
  console.error('Error al actualizar perfil:', error.message);
}

// Intento de otro usuario para actualizar el perfil de 'user1'
try {
  const updatedUser = updateUserProfile(userToUpdate, { username: 'otro' }, 'user2');
  console.log('Perfil actualizado por otro usuario:', updatedUser);
} catch (error) {
  console.error('Error al actualizar perfil por otro usuario:', error.message);
}
```

## Comprobaciones
1.  ¿Qué sucede si un usuario intenta actualizar su `username` y también incluye un campo `role: 'admin'` en la solicitud?
Respuesta: El campo `role` debe ser ignorado y el perfil del usuario debe mantener su `role` original, mientras que el `username` se actualiza correctamente.
2.  ¿Cuál es el propósito principal de definir una lista explícita de campos permitidos (`allowedFields`) en una operación de actualización?
Respuesta: El propósito principal es prevenir el mass assignment, asegurando que solo los campos intencionados y autorizados puedan ser modificados, protegiendo así la integridad de los datos y la seguridad del sistema contra la manipulación de campos sensibles o internos.

## Cierre
La implementación de un control estricto sobre los campos de actualización es una capa de seguridad fundamental. Este mecanismo complementa las verificaciones de autorización de propiedad y filtrado de permisos en consultas, construyendo una defensa robusta. En la próxima lección, se explorará cómo aplicar estos principios de seguridad a la creación de recursos, asegurando que los datos se almacenen correctamente desde el inicio.
