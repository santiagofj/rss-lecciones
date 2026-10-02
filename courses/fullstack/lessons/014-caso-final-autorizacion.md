---
schemaVersion: 1
id: 716974e1-dd92-4456-8740-04326e673ddb
sequence: 14
course: fullstack
stepId: caso-final-autorizacion
title: Diseñar un endpoint protegido completo
publishedAt: 2026-10-02T09:30:42.327Z
generationDate: 2026-10-02
summary: Esta lección aborda la integración de múltiples capas de seguridad y
  validación en un único endpoint para la edición de recursos. Se explica cómo
  combinar la autenticación del usuario, la verificación de propiedad
  (ownership), la comprobación de roles, la validación de datos de entrada y el
  manejo de errores en un flujo coherente. El objetivo es construir un endpoint
  robusto que garantice que solo los usuarios autorizados, con los permisos
  adecuados y datos válidos, puedan modificar un recurso. Se ilustra el proceso
  con un ejemplo concreto de edición de una publicación, destacando la…
generation:
  model: gemini-2.5-flash
  promptVersion: v3
  contextHash: 8ac89a35b444016632a79a53d3f8d6b1e50c7ce29ee15faa07fd7279380d7dd8
---

## Por qué ahora
Las lecciones previas han cubierto aspectos fundamentales para la construcción de servicios web robustos: desde la traducción de errores de negocio a respuestas HTTP adecuadas hasta la protección de operaciones de escritura mediante transacciones y la prevención de actualizaciones perdidas. Sin embargo, un endpoint real en un sistema de producción requiere la integración simultánea de múltiples mecanismos de seguridad y validación. Es insuficiente aplicar estos conceptos de forma aislada. La capacidad de editar una publicación compartida, por ejemplo, no solo implica que el usuario esté autenticado, sino que también sea el propietario de la publicación, tenga el rol adecuado para realizar la acción, y que los datos proporcionados sean válidos. Esta lección se enfoca en ensamblar todas estas capas de protección en un flujo unificado, garantizando la seguridad y la integridad de los datos desde la recepción de la solicitud hasta la persistencia del cambio.

## Explicación y ejemplo
El diseño de un endpoint protegido completo implica una secuencia de verificaciones que deben ejecutarse antes de que la lógica de negocio principal pueda procesar la solicitud. Este enfoque por capas asegura que cada condición de seguridad y validez se cumpla progresivamente, rechazando la solicitud en la etapa más temprana posible si alguna verificación falla. Consideremos un endpoint `PUT /api/posts/{id}` para editar una publicación. El flujo de procesamiento de esta solicitud se puede estructurar de la siguiente manera:

1.  **Autenticación:** La primera capa es verificar la identidad del usuario. Si la solicitud no incluye credenciales válidas (por ejemplo, un token de sesión o JWT), se debe responder con un `HTTP 401 Unauthorized`. Esto confirma que el usuario es quien dice ser.

2.  **Autorización (Rol):** Una vez autenticado, se verifica si el usuario tiene el rol necesario para realizar la acción de edición. Por ejemplo, solo los usuarios con rol `EDITOR` o `ADMIN` podrían editar publicaciones. Si el rol no es adecuado, se responde con un `HTTP 403 Forbidden`. Esta capa controla qué tipo de usuario puede realizar la acción.

3.  **Autorización (Ownership):** Además del rol, es crucial verificar si el usuario autenticado es el propietario del recurso que intenta modificar. Un usuario `EDITOR` podría editar publicaciones, pero solo las suyas. Si el usuario no es el propietario de la publicación con `{id}`, se responde nuevamente con un `HTTP 403 Forbidden`. Esta capa protege los recursos individuales.

4.  **Validación de entrada:** Antes de interactuar con la lógica de negocio, los datos enviados en el cuerpo de la solicitud (payload) deben ser validados. Esto incluye verificar tipos de datos, formatos, rangos y la presencia de campos obligatorios. Por ejemplo, el título de una publicación no puede estar vacío y debe tener una longitud máxima. Si la validación falla, se responde con un `HTTP 400 Bad Request`, detallando los errores específicos. Esta capa asegura la calidad y la estructura de los datos.

5.  **Lógica de negocio y manejo de errores:** Si todas las verificaciones anteriores son exitosas, la solicitud se pasa a la capa de servicio. Aquí se ejecuta la lógica para actualizar la publicación en la base de datos. Durante esta operación, pueden surgir errores de negocio, como intentar editar una publicación que ya no existe (a pesar de la verificación de ownership inicial, podría haber sido eliminada concurrentemente) o un conflicto de versiones. Estos errores deben ser traducidos a respuestas HTTP apropiadas, como `HTTP 404 Not Found` o `HTTP 409 Conflict`, según lo estudiado en lecciones anteriores.

6.  **Respuesta exitosa:** Si la actualización se completa sin problemas, se devuelve un `HTTP 200 OK` o `HTTP 204 No Content` (si no se devuelve contenido en la respuesta), confirmando la operación.

Consideremos un pseudocódigo para un controlador que implementa este flujo:

```javascript
async function updatePost(req, res) {
  // 1. Autenticación: Asumimos que un middleware ya ha verificado el token
  // y ha adjuntado el usuario autenticado a `req.user`.
  if (!req.user) {
    return res.status(401).json({ message: 'No autenticado' });
  }

  const postId = req.params.id;
  const userId = req.user.id;
  const userRole = req.user.role;
  const { title, content } = req.body;

  // 2. Autorización (Rol): Solo 'EDITOR' o 'ADMIN' pueden editar
  if (userRole !== 'EDITOR' && userRole !== 'ADMIN') {
    return res.status(403).json({ message: 'Acceso prohibido: rol insuficiente' });
  }

  // 3. Autorización (Ownership): Obtener la publicación para verificar propietario
  let existingPost;
  try {
    existingPost = await postService.getPostById(postId);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.status(404).json({ message: 'Publicación no encontrada' });
    }
    throw error; // Otros errores inesperados
  }

  if (existingPost.authorId !== userId && userRole !== 'ADMIN') {
    return res.status(403).json({ message: 'Acceso prohibido: no es el propietario' });
  }

  // 4. Validación de entrada: Validar los datos del cuerpo de la solicitud
  if (!title || title.length < 5 || title.length > 200) {
    return res.status(400).json({ message: 'El título debe tener entre 5 y 200 caracteres' });
  }
  if (!content || content.length < 10) {
    return res.status(400).json({ message: 'El contenido debe tener al menos 10 caracteres' });
  }

  // 5. Lógica de negocio y manejo de errores
  try {
    const updatedPost = await postService.updatePost(postId, { title, content }, userId);
    // Asumimos que postService.updatePost maneja la concurrencia y transacciones
    return res.status(200).json(updatedPost);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.status(404).json({ message: 'Publicación no encontrada durante la actualización' });
    } else if (error.name === 'ConcurrencyError') {
      return res.status(409).json({ message: 'Conflicto de actualización: la publicación ha sido modificada' });
    } else if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    console.error('Error al actualizar publicación:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
}
```

Este pseudocódigo ilustra la progresión de las verificaciones, donde cada `return` temprano evita la ejecución de lógica innecesaria y reduce la superficie de ataque.

## Práctica
Diseñe un endpoint `DELETE /api/comments/{id}` para eliminar un comentario. Este endpoint debe integrar las siguientes capas de protección:

1.  **Autenticación:** Solo usuarios autenticados pueden intentar eliminar comentarios.
2.  **Autorización (Rol):** Solo usuarios con rol `MODERATOR` o `ADMIN` pueden eliminar cualquier comentario. Los usuarios con rol `USER` solo pueden eliminar sus propios comentarios.
3.  **Autorización (Ownership):** Si el usuario es `USER`, debe ser el autor del comentario. Si no lo es, la operación debe ser rechazada.
4.  **Lógica de negocio y manejo de errores:** Si el comentario no existe, el servicio debe lanzar un error que se traduzca a `HTTP 404 Not Found`. Si la eliminación es exitosa, se debe devolver un `HTTP 204 No Content`.

Escriba el pseudocódigo para el controlador de este endpoint, similar al ejemplo proporcionado, asegurándose de que cada verificación se realice en el orden adecuado y que las respuestas HTTP correspondientes se envíen en caso de fallo. Considere cómo un middleware de autenticación podría haber adjuntado la información del usuario a la solicitud.

## Comprobaciones
1.  ¿Qué código de estado HTTP se debe devolver si un usuario autenticado intenta eliminar un comentario que no le pertenece y su rol no le otorga permisos de moderación o administración?
Respuesta: HTTP 403 Forbidden
2.  Si un usuario con rol `MODERATOR` intenta eliminar un comentario que no existe, ¿qué código de estado HTTP es el más apropiado para la respuesta?
Respuesta: HTTP 404 Not Found

## Cierre
La integración de múltiples capas de seguridad y validación es fundamental para la robustez de cualquier endpoint. Este enfoque por capas permite manejar de forma granular las condiciones de acceso y la validez de los datos. En la próxima lección, se explorará cómo aplicar estos principios al diseño de un sistema de notificaciones, un componente esencial para la interacción en aplicaciones modernas.
