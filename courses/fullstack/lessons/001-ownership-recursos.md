---
schemaVersion: 1
id: 8f630c95-d14b-4203-ab2b-f60f55f04ccf
sequence: 1
course: fullstack
stepId: ownership-recursos
title: Ownership de recursos
publishedAt: 2026-09-19T12:37:59.340Z
generationDate: 2026-09-19
summary: En esta lección, vamos a entender por qué autenticarse y tener un rol
  no es suficiente para modificar cualquier recurso. Nos centraremos en la
  importancia de verificar que el `userId` de la sesión coincida con el `userId`
  del recurso que se intenta modificar, asegurando que cada usuario solo pueda
  alterar sus propios datos. Explicaremos el problema, el flujo de una petición
  PATCH y el código mínimo necesario para implementar esta validación,
  culminando con una práctica y comprobaciones para afianzar el aprendizaje.
generation:
  model: gemini-2.5-flash
  promptVersion: v1
  contextHash: 9b1afe538328a47e4d19ac48934199b8c1f565d75912c566438bed5b99c4ddcf
---

### ¿Por qué vemos este tema ahora?

En la lección anterior, identificaste correctamente que un intento de modificar un recurso ajeno debería resultar en un error HTTP 403. ¡Excelente! Ahora, la pregunta es: ¿cómo implementamos esa protección? Autenticarse nos dice *quién* sos, y los roles nos dicen *qué podés hacer en general*. Pero no nos dicen *sobre qué recurso* podés hacer algo. Ahí es donde entra el concepto de *ownership* o propiedad del recurso.

### El problema, el flujo y el código mínimo

**El problema:** Imaginate que sos un usuario logueado (Juan, `userId: 123`) y querés actualizar tu perfil. Todo bien. Pero, ¿qué pasa si, por error o malicia, intentás actualizar el perfil de María (`userId: 456`)? Tu sistema debe impedirlo, incluso si estás autenticado y tenés un rol de 'usuario'.

**El flujo:**

1.  **Petición:** Juan envía una petición `PATCH /api/usuarios/456` con datos para actualizar el perfil de María.
2.  **Autenticación:** El servidor recibe la petición y verifica que Juan está logueado. Su sesión (`session.userId`) es `123`.
3.  **Autorización (inicial):** El servidor verifica que Juan tiene permiso para *actualizar perfiles* en general (por su rol).
4.  **Verificación de Ownership (el paso clave):** Antes de intentar modificar la base de datos, el servidor hace lo siguiente:
    *   Extrae el ID del recurso de la URL: `456` (el ID de María).
    *   Busca el recurso en la base de datos (por ejemplo, `usuarioConId456`).
    *   Compara el `usuarioConId456.userId` (que es `456`) con el `session.userId` (que es `123`).
    *   Como `456 !== 123`, el servidor detecta que Juan está intentando modificar un recurso que no le pertenece.
5.  **Respuesta:** El servidor detiene la ejecución y responde con un `HTTP 403 Forbidden`.

**El código mínimo (ejemplo conceptual):**

```javascript
// En tu controlador o middleware para la ruta PATCH /api/usuarios/:id
async function actualizarUsuario(req, res) {
    const idDelRecurso = req.params.id; // '456'
    const idDelUsuarioEnSesion = req.session.userId; // '123'

    // Primero, verificamos si el recurso existe y obtenemos su dueño
    const usuarioEnBD = await Usuario.findById(idDelRecurso);

    if (!usuarioEnBD) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    // ¡Aquí está la clave del ownership!
    if (usuarioEnBD.userId.toString() !== idDelUsuarioEnSesion.toString()) {
        // Si el dueño del recurso no es el usuario de la sesión, acceso denegado
        return res.status(403).json({ mensaje: 'No tenés permiso para modificar este recurso.' });
    }

    // Si llegamos acá, significa que el usuario de la sesión es el dueño del recurso.
    // Ahora sí, podemos proceder a actualizar el usuarioEnBD con req.body
    const usuarioActualizado = await Usuario.findByIdAndUpdate(idDelRecurso, req.body, { new: true });
    res.status(200).json(usuarioActualizado);
}
```

Este `if` es la guardia que asegura que solo el dueño legítimo puede modificar el recurso. Es una capa de seguridad fundamental.

### Práctica breve

Identificá un recurso en tu aplicación que tenga un `userId` asociado (por ejemplo, un `Post`, un `Comment`, o el propio `User` si estás permitiendo que se editen a sí mismos). Implementá un middleware o una lógica dentro de tu controlador `PATCH /recursos/:id` que verifique que `recurso.userId` sea igual a `session.userId` antes de permitir la actualización.

### Comprobaciones

1.  **Pregunta:** Si un usuario (`userId: 10`) intenta modificar un recurso (`resourceId: 50`) cuyo `userId` asociado es `20`, ¿qué código HTTP debería devolver el servidor si la validación de ownership funciona correctamente?
    *   **Respuesta:** `403 Forbidden`.

2.  **Pregunta:** Si el mismo usuario (`userId: 10`) intenta modificar un recurso (`resourceId: 51`) cuyo `userId` asociado es `10`, y la operación es exitosa, ¿qué código HTTP es una respuesta adecuada?
    *   **Respuesta:** `200 OK` (si devuelve el recurso actualizado) o `204 No Content` (si solo confirma la actualización sin devolver contenido).

Con esta capa de seguridad, tus recursos están mucho más protegidos. Pero, ¿qué pasa si un usuario tiene muchos recursos y quiere verlos todos? En la próxima lección, vamos a explorar cómo filtrar colecciones de recursos para mostrar solo los que le pertenecen al usuario logueado.
