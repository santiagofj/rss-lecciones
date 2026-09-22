---
schemaVersion: 1
id: c06008f5-b1f3-4431-a877-d3acf8bcb77c
sequence: 4
course: fullstack
stepId: middleware-autorizacion
title: Construir un middleware de autorización
publishedAt: 2026-09-22T08:21:13.218Z
generationDate: 2026-09-22
summary: Esta lección aborda la implementación de middleware de autorización
  para centralizar y estructurar las reglas de acceso en una aplicación. Se
  explica cómo separar la lógica de autenticación, los permisos generales
  basados en roles y la verificación de propiedad de recursos en pasos legibles
  y reutilizables. La lección detalla el problema de la lógica de autorización
  dispersa, presenta un flujo de trabajo claro para su implementación y
  proporciona código mínimo para construir middleware que maneje roles y
  propiedad. Incluye una práctica para aplicar los conceptos y comprobaciones
  para asegurar…
generation:
  model: gemini-2.5-flash
  promptVersion: v1
  contextHash: 4c1cff11ee5fc48bc3f74bc5bb7931e1239355b69cc93d2a02bd2b7d62fd7659
---

### Por qué vemos este tema ahora

Las lecciones previas establecieron la importancia de la propiedad de los recursos, la necesidad de no confiar en datos de propiedad enviados por el cliente y el modelado de roles y permisos. Estos conceptos son fundamentales para una seguridad robusta. Sin embargo, aplicar estas reglas directamente en cada manejador de ruta puede llevar a código repetitivo, difícil de mantener y propenso a errores. La lógica de autorización, que determina si un usuario tiene permiso para realizar una acción específica sobre un recurso, es una preocupación transversal. Integrar esta lógica de manera efectiva requiere una estrategia que centralice las reglas sin ocultar las decisiones de negocio.

El objetivo de esta lección es construir un middleware de autorización. Esto permite encapsular y reutilizar la lógica de verificación de permisos, separando claramente la autenticación (quién es el usuario), los permisos generales (qué puede hacer un rol) y la verificación de propiedad (si el usuario es el dueño del recurso). Al centralizar estas reglas, se mejora la legibilidad del código, se facilita el mantenimiento y se reduce la probabilidad de introducir vulnerabilidades.

### Explicación gradual con un ejemplo concreto

**El problema de la lógica de autorización dispersa**

Cuando la lógica de autorización se implementa directamente dentro de los manejadores de ruta, el código puede volverse denso y difícil de leer. Por ejemplo, un manejador para actualizar una publicación podría contener verificaciones para:

1.  Si el usuario está autenticado.
2.  Si el usuario tiene el rol de 'autor'.
3.  Si el `userId` del usuario autenticado coincide con el `authorId` de la publicación que se intenta modificar.

Esta mezcla de responsabilidades dificulta la comprensión del propósito principal del manejador y complica la aplicación consistente de las reglas de seguridad en toda la aplicación.

**La solución: Middleware de autorización**

El middleware es una función que tiene acceso al objeto de solicitud (`req`), al objeto de respuesta (`res`) y a la siguiente función de middleware en el ciclo de solicitud-respuesta de la aplicación. Al utilizar middleware, se puede interceptar una solicitud antes de que llegue al manejador de ruta final, aplicar lógica de autorización y, si la autorización falla, terminar la solicitud con un error HTTP 403 (Forbidden).

Esto permite construir una cadena de middleware donde cada paso se encarga de una parte específica de la autorización:

*   **Middleware de autenticación:** Verifica la identidad del usuario y adjunta la información del usuario (ej. `req.user`) a la solicitud. Si falla, responde con 401 (Unauthorized).
*   **Middleware de permiso general (basado en rol):** Verifica si el rol del usuario autenticado (`req.user.role`) tiene permiso para realizar la acción solicitada. Si falla, responde con 403.
*   **Middleware de propiedad:** Verifica si el usuario autenticado es el propietario del recurso específico que se intenta modificar. Si falla, responde con 403.

**Flujo de una petición con middleware de autorización**

Considere una API para gestionar publicaciones de blog. Un usuario intenta actualizar una publicación específica (`PATCH /posts/:id`).

1.  **Petición entrante:** El cliente envía una petición `PATCH` a `/posts/123` con un token de autenticación.
2.  **Middleware de autenticación:**
    *   El middleware `authenticate` extrae el token de la cabecera `Authorization`.
    *   Verifica el token (ej. JWT) y decodifica la identidad del usuario.
    *   Si el token es válido, adjunta la información del usuario a `req.user` (ej. `{ id: 'user456', role: 'author' }`) y pasa el control al siguiente middleware.
    *   Si el token es inválido o ausente, responde con `HTTP 401 Unauthorized` y detiene el flujo.
3.  **Middleware de permiso general (basado en rol):**
    *   El middleware `authorizeRole('author')` recibe la solicitud.
    *   Accede a `req.user.role` (que es 'author').
    *   Compara 'author' con el rol requerido ('author'). Como coinciden, pasa el control al siguiente middleware.
    *   Si el rol no coincidiera o `req.user` no existiera, respondería con `HTTP 403 Forbidden` y detendría el flujo.
4.  **Middleware de propiedad:**
    *   El middleware `authorizeOwnership('Post')` recibe la solicitud.
    *   Extrae el `id` del recurso de `req.params` (ej. '123').
    *   Consulta la base de datos para obtener la publicación con `id: '123'`. Suponga que la publicación tiene `authorId: 'user456'`.
    *   Compara `req.user.id` ('user456') con `post.authorId` ('user456'). Como coinciden, pasa el control al manejador de ruta.
    *   Si no coincidieran, o si la publicación no existiera, respondería con `HTTP 403 Forbidden` (o `404 Not Found` si el recurso no existe) y detendría el flujo.
5.  **Manejador de ruta:**
    *   El manejador de ruta `updatePost` se ejecuta solo si todos los pasos de autorización anteriores fueron exitosos.
    *   Procede a actualizar la publicación con `id: '123'`, sabiendo que el usuario `user456` está autenticado, tiene el rol correcto y es el propietario de la publicación.

**Código mínimo para middleware de autorización**

Considere un entorno Express.js. Se asume que ya existe un middleware de autenticación que popula `req.user` con un objeto `{ id: string, role: string }` si el usuario está autenticado.

```javascript
// authMiddleware.js

// Middleware de autenticación (simplificado para el ejemplo)
// En una aplicación real, esto verificaría un JWT o una sesión.
const authenticate = (req, res, next) => {
  // Simulación de usuario autenticado
  // En producción, esto vendría de un token o sesión validada
  const userId = req.headers['x-user-id']; // Ejemplo: ID de usuario en cabecera
  const userRole = req.headers['x-user-role']; // Ejemplo: Rol de usuario en cabecera

  if (!userId || !userRole) {
    return res.status(401).json({ message: 'Autenticación requerida' });
  }

  req.user = { id: userId, role: userRole };
  next();
};

// Middleware de permiso general basado en rol
const authorizeRole = (requiredRole) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== requiredRole) {
      return res.status(403).json({ message: 'Acceso denegado: rol insuficiente' });
    }
    next();
  };
};

// Middleware de propiedad de recurso
// Asume que el modelo tiene un método findById y una propiedad 'authorId'
const authorizeOwnership = (Model) => {
  return async (req, res, next) => {
    const resourceId = req.params.id; // ID del recurso de la URL

    try {
      const resource = await Model.findById(resourceId);

      if (!resource) {
        return res.status(404).json({ message: 'Recurso no encontrado' });
      }

      // Asume que el recurso tiene una propiedad 'authorId' o similar
      if (resource.authorId.toString() !== req.user.id.toString()) {
        return res.status(403).json({ message: 'Acceso denegado: no es el propietario' });
      }

      req.resource = resource; // Opcional: adjuntar el recurso a la solicitud para el manejador
      next();
    } catch (error) {
      console.error('Error al verificar propiedad:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  };
};

module.exports = { authenticate, authorizeRole, authorizeOwnership };
```

```javascript
// app.js (ejemplo de uso)
const express = require('express');
const { authenticate, authorizeRole, authorizeOwnership } = require('./authMiddleware');
const app = express();
app.use(express.json());

// Simulación de un modelo de Post
const Post = {
  posts: [
    { id: 'post1', title: 'Mi primera publicación', authorId: 'user123' },
    { id: 'post2', title: 'Otra publicación', authorId: 'user456' }
  ],
  findById: async (id) => {
    return Post.posts.find(p => p.id === id);
  }
};

// Rutas de ejemplo

// Ruta pública
app.get('/posts', (req, res) => {
  res.json(Post.posts);
});

// Crear una publicación: requiere autenticación y rol 'author'
app.post('/posts', authenticate, authorizeRole('author'), (req, res) => {
  const newPost = { id: `post${Date.now()}`, title: req.body.title, authorId: req.user.id };
  Post.posts.push(newPost);
  res.status(201).json(newPost);
});

// Actualizar una publicación: requiere autenticación, rol 'author' y propiedad
app.patch('/posts/:id', authenticate, authorizeRole('author'), authorizeOwnership(Post), (req, res) => {
  const postId = req.params.id;
  const updatedPost = { ...req.resource, ...req.body };
  Post.posts = Post.posts.map(p => p.id === postId ? updatedPost : p);
  res.json(updatedPost);
});

// Eliminar una publicación: requiere autenticación y rol 'admin'
app.delete('/posts/:id', authenticate, authorizeRole('admin'), (req, res) => {
  const postId = req.params.id;
  Post.posts = Post.posts.filter(p => p.id !== postId);
  res.status(204).send();
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`));
```

En este ejemplo, `authenticate` simula la verificación de identidad. `authorizeRole` verifica el rol del usuario. `authorizeOwnership` busca el recurso por su ID y compara el `authorId` del recurso con el `id` del usuario autenticado. Cada middleware se encarga de una parte específica de la autorización, permitiendo que los manejadores de ruta se centren en la lógica de negocio.

### Práctica breve

Modifique el middleware `authorizeOwnership` para que, además de verificar la propiedad, permita el acceso a usuarios con el rol 'admin' sin importar si son los propietarios del recurso. Esto significa que un administrador siempre podrá modificar cualquier publicación, incluso si no es su autor.

**Instrucciones:**

1.  Localice la función `authorizeOwnership` en `authMiddleware.js`.
2.  Antes de la verificación de `resource.authorId`, añada una condición que verifique si `req.user.role` es 'admin'.
3.  Si el rol es 'admin', el middleware debe llamar a `next()` inmediatamente, omitiendo la verificación de propiedad.
4.  Mantenga la verificación de propiedad para otros roles.

### Comprobaciones

1.  **Pregunta:** ¿Qué código HTTP debe retornar un middleware de autorización cuando un usuario autenticado intenta acceder a un recurso para el cual no tiene los permisos generales (rol) adecuados?
    **Respuesta:** HTTP 403 Forbidden.

2.  **Pregunta:** Si un usuario con `id: 'user123'` y `role: 'author'` intenta actualizar una publicación con `id: 'post2'` cuyo `authorId` es `user456`, ¿qué middleware debería detener la solicitud y con qué código HTTP, asumiendo que el middleware de autenticación y de rol ya pasaron?
    **Respuesta:** El middleware `authorizeOwnership` debería detener la solicitud con HTTP 403 Forbidden.

### Cierre

La implementación de middleware de autorización permite una gestión de acceso estructurada y legible. Al separar la autenticación, los permisos generales y la propiedad, se construyen sistemas más seguros y fáciles de mantener. El siguiente paso es explorar cómo aplicar estas reglas de autorización de manera dinámica, adaptándose a diferentes tipos de recursos y acciones sin necesidad de crear un middleware específico para cada caso.
