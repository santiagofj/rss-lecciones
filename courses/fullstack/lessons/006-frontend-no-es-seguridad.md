---
schemaVersion: 1
id: 4fb5eba5-4709-45a4-92c6-101d66b29e5d
sequence: 6
course: fullstack
stepId: frontend-no-es-seguridad
title: Entender por qué ocultar un botón no autoriza
publishedAt: 2026-09-24T08:15:35.743Z
generationDate: 2026-09-24
summary: Esta lección clarifica la distinción entre la presentación de la
  interfaz de usuario y la autorización en el servidor. Explica que ocultar un
  elemento de la UI, como un botón, no implementa seguridad, ya que los usuarios
  no autorizados pueden eludir la interfaz para acceder a recursos protegidos.
  La lección enfatiza que la autorización robusta debe implementarse
  exclusivamente en el servidor para validar cada petición contra los permisos
  definidos, independientemente de la renderización del lado del cliente.
  Ilustra este principio comparando un ajuste de UI con una llamada API directa
  no…
generation:
  model: gemini-2.5-flash
  promptVersion: v2
  contextHash: d5216b41ae5b3c0070ddba93596b06cf1d6e090216ecaa230f570e05d4d35c5e
---

## Por qué ahora
En lecciones anteriores, se estableció cómo modelar roles y permisos, construir middleware de autorización y seleccionar los códigos de estado HTTP adecuados para comunicar fallos de seguridad. Estos fundamentos son esenciales para construir aplicaciones robustas. Sin embargo, un error común en el desarrollo es confundir la experiencia de usuario con los controles de seguridad. A menudo, se asume que si un usuario no ve una opción en la interfaz, no puede realizar la acción asociada. Esta lección aborda directamente esta falacia, demostrando que la ocultación de elementos en la interfaz de usuario no constituye una medida de seguridad efectiva. El objetivo es separar conceptual y prácticamente la presentación de la interfaz de usuario de la lógica de autorización del servidor, asegurando que la seguridad resida exclusivamente donde debe: en el backend.

## Explicación y ejemplo
El problema central radica en la suposición de que el cliente es una entidad de confianza para la aplicación de reglas de seguridad. Cuando una aplicación frontend decide mostrar u ocultar un botón basado en el rol del usuario (por ejemplo, un botón 'Eliminar Artículo' solo visible para administradores), está controlando la experiencia de usuario, no la autorización. El navegador del usuario, o cualquier otro cliente HTTP, es un entorno que el usuario controla completamente. Esto significa que cualquier lógica implementada en el cliente puede ser inspeccionada, modificada o completamente ignorada.

El flujo de una interacción segura debe ser el siguiente:

1.  **Autenticación**: El usuario se identifica y el servidor verifica su identidad, emitiendo un token o estableciendo una sesión.
2.  **Renderizado de UI (Cliente)**: El frontend recibe información sobre el usuario (por ejemplo, sus roles) y decide qué elementos de la interfaz mostrar. Si el usuario es un 'administrador', el botón 'Eliminar Artículo' se renderiza. Si es un 'editor', el botón no se muestra. Esta es una decisión de experiencia de usuario.
3.  **Petición de Acción (Cliente)**: Si el usuario hace clic en el botón (o si un usuario no autorizado elude la UI), el cliente envía una petición HTTP al servidor para realizar la acción (por ejemplo, `DELETE /api/articles/123`).
4.  **Autorización (Servidor)**: Antes de procesar la petición, el servidor intercepta la solicitud. Utiliza un middleware de autorización para verificar si el usuario autenticado tiene los permisos necesarios para realizar la acción solicitada sobre el recurso específico. Si el usuario es un 'administrador', la acción procede. Si es un 'editor', el servidor deniega la petición con un código de estado HTTP 403 Forbidden.
5.  **Respuesta (Servidor)**: El servidor envía una respuesta al cliente, ya sea confirmando la acción o informando del fallo de autorización.

Consideremos un ejemplo concreto. Una aplicación web tiene un endpoint `DELETE /api/articles/:id` que permite eliminar artículos. En el frontend, un botón para eliminar un artículo solo se muestra si el usuario tiene el rol de 'administrador'.

**Escenario 1: Usuario autorizado (administrador)**
El usuario 'admin' inicia sesión. El frontend detecta su rol y muestra el botón 'Eliminar Artículo'. El 'admin' hace clic en el botón. El navegador envía una petición `DELETE /api/articles/456` con las credenciales del 'admin'. El middleware de autorización en el servidor verifica que 'admin' tiene permiso para eliminar artículos y procede con la eliminación.

**Escenario 2: Usuario no autorizado (editor) intentando eludir la UI**
El usuario 'editor' inicia sesión. El frontend detecta su rol y *no* muestra el botón 'Eliminar Artículo'. El 'editor', sin embargo, abre las herramientas de desarrollador de su navegador o utiliza una herramienta como `curl` para enviar manualmente una petición HTTP directa:

```bash
curl -X DELETE \
  -H "Authorization: Bearer <token_del_editor>" \
  http://localhost:3000/api/articles/456
```

Si la autorización se basara únicamente en la visibilidad del botón en el frontend, esta petición manual podría tener éxito. Sin embargo, con una implementación de autorización correcta en el servidor, el middleware interceptaría esta petición. Al verificar el token del 'editor', el servidor determinaría que este rol no tiene permiso para realizar una operación `DELETE` sobre artículos. En consecuencia, el servidor respondería con un código de estado HTTP `403 Forbidden`, denegando la acción, a pesar de que el botón no fuera visible en la interfaz del 'editor'.

Este ejemplo ilustra que la seguridad es una responsabilidad del servidor. La interfaz de usuario es una capa de presentación que guía al usuario, pero no es un mecanismo de seguridad. Cualquier control de acceso debe ser validado en el backend para ser efectivo.

## Práctica
Para esta práctica, se utilizará un entorno de desarrollo con un servidor Node.js y Express, y un cliente web simple. Se asume que ya se tiene un middleware de autenticación que adjunta la información del usuario (incluyendo roles) al objeto `req.user` y un middleware de autorización que verifica permisos.

1.  **Configurar un endpoint protegido**: Cree un endpoint `DELETE /api/data/:id` en su servidor Express. Este endpoint debe estar protegido por su middleware de autorización, requiriendo un rol específico (por ejemplo, 'admin') para acceder.

    ```javascript
    // server.js (fragmento)
    const express = require('express');
    const app = express();
    // ... otros middlewares como body-parser, autenticación ...

    // Middleware de autenticación (ejemplo simplificado)
    const authenticate = (req, res, next) => {
        // En una aplicación real, esto validaría un token JWT o una sesión
        // Para la práctica, simule un usuario basado en un header simple
        const userRole = req.headers['x-user-role'];
        if (userRole === 'admin') {
            req.user = { id: 'admin1', role: 'admin' };
        } else if (userRole === 'editor') {
            req.user = { id: 'editor1', role: 'editor' };
        } else {
            req.user = null; // No autenticado
        }
        next();
    };

    // Middleware de autorización (ejemplo simplificado)
    const authorize = (requiredRole) => (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'No autenticado' });
        }
        if (req.user.role !== requiredRole) {
            return res.status(403).json({ message: 'Acceso denegado: rol insuficiente' });
        }
        next();
    };

    app.use(authenticate);

    app.delete('/api/data/:id', authorize('admin'), (req, res) => {
        const itemId = req.params.id;
        // Lógica para eliminar el ítem
        res.status(200).json({ message: `Ítem ${itemId} eliminado con éxito.` });
    });

    app.listen(3000, () => console.log('Servidor escuchando en el puerto 3000'));
    ```

2.  **Crear una interfaz de usuario cliente**: Desarrolle una página HTML simple con un botón que, al hacer clic, intente enviar una petición `DELETE` al endpoint `/api/data/123`. Implemente lógica JavaScript para que este botón solo sea visible si el usuario tiene el rol 'admin' (simulado, por ejemplo, mediante una variable global o un valor en `localStorage`).

    ```html
    <!-- index.html (fragmento) -->
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <title>Control de Acceso</title>
    </head>
    <body>
        <h1>Panel de Administración</h1>
        <button id="deleteButton" style="display: none;">Eliminar Dato</button>
        <p id="message"></p>

        <script>
            // Simulación de rol de usuario (en una app real, vendría del servidor)
            const currentUserRole = 'editor'; // Cambiar a 'admin' para probar visibilidad

            const deleteButton = document.getElementById('deleteButton');
            const messageElement = document.getElementById('message');

            if (currentUserRole === 'admin') {
                deleteButton.style.display = 'block';
            }

            deleteButton.addEventListener('click', async () => {
                try {
                    const response = await fetch('http://localhost:3000/api/data/123', {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-User-Role': currentUserRole // Simula el rol para el middleware
                        }
                    });
                    const data = await response.json();
                    if (response.ok) {
                        messageElement.textContent = `Éxito: ${data.message}`;
                    } else {
                        messageElement.textContent = `Error (${response.status}): ${data.message}`;
                    }
                } catch (error) {
                    messageElement.textContent = `Error de red: ${error.message}`;
                }
            });
        </script>
    </body>
    </html>
    ```

3.  **Probar la interfaz**: Abra `index.html` en el navegador. Con `currentUserRole` establecido en 'editor', el botón no debería ser visible. Con `currentUserRole` establecido en 'admin', el botón debería ser visible y, al hacer clic, la petición debería ser exitosa.

4.  **Probar el bypass manual**: Con `currentUserRole` en 'editor' (botón oculto), abra una terminal y envíe una petición `DELETE` directamente al servidor, simulando el rol 'editor' en el encabezado `X-User-Role`:

    ```bash
    curl -X DELETE \
      -H "X-User-Role: editor" \
      http://localhost:3000/api/data/123
    ```

    Observe la respuesta del servidor. Debería recibir un `403 Forbidden` con el mensaje de acceso denegado, confirmando que el servidor impidió la acción a pesar de que el botón no estaba visible en el cliente.

## Comprobaciones
1.  ¿Qué código de estado HTTP espera recibir el cliente cuando un usuario con rol 'editor' intenta eliminar un recurso mediante una petición `curl` directa al endpoint `DELETE /api/data/:id`?
Respuesta: Se espera un código de estado HTTP 403 Forbidden.
2.  Si la lógica de autorización se implementara únicamente en el frontend, ¿qué resultado tendría la petición `curl` de un usuario 'editor' al endpoint `DELETE /api/data/:id`?
Respuesta: La petición `curl` tendría éxito, ya que el frontend no intervendría para denegar el acceso.

## Cierre
Esta lección ha demostrado que la seguridad de una aplicación debe residir en el servidor, independientemente de cómo se presente la interfaz de usuario. La separación clara entre la experiencia del usuario y los controles de seguridad es fundamental para construir sistemas robustos. En la próxima lección, se explorará cómo comunicar de manera efectiva los resultados de la autorización al cliente, mejorando la experiencia del usuario sin comprometer la seguridad.
