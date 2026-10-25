---
schemaVersion: 1
id: 56d694fa-6db6-46ce-a306-f5e8d4dd323f
sequence: 20
course: fullstack
stepId: integracion-mapa-web
title: Reconstruir una petición completa
publishedAt: 2026-10-25T08:14:16.612Z
generationDate: 2026-10-25
summary: Esta lección integra los conceptos de seguridad, estado y persistencia
  para reconstruir el flujo completo de una petición web. Se detallan las
  responsabilidades del cliente y del servidor, los puntos de control de
  seguridad como la sesión y la autorización, y la interacción con el
  almacenamiento persistente. A través de diagramas textuales, se ilustran los
  caminos de lectura y escritura de datos, identificando los posibles fallos en
  cada etapa y los códigos de estado HTTP asociados. El objetivo es comprender
  cómo cada componente contribuye a la robustez y seguridad de una aplicación
  web, sin…
generation:
  model: gemini-2.5-flash
  promptVersion: v3
  contextHash: 52736715c991b978672d3b1e15455c3d950a90142934ddcb28f9dfd2bcd127c8
---

## Por qué ahora
Las lecciones previas han establecido los fundamentos de la seguridad en la comunicación (HTTPS), la naturaleza efímera de un servidor como proceso y la importancia de las fronteras de confianza entre cliente y servidor. Sin embargo, estos elementos operan de forma interconectada dentro del ciclo de vida de una petición HTTP. Para diseñar y diagnosticar aplicaciones web robustas, es fundamental comprender cómo se orquesta una petición completa, desde que el cliente la inicia hasta que el servidor la procesa y responde. Esta lección integra esos conocimientos, mostrando el flujo de datos y control, las responsabilidades de cada componente y los puntos donde pueden surgir fallos, lo que permite anticipar y resolver problemas de forma sistemática.

## Explicación y ejemplo
Una petición web es una secuencia de interacciones entre un cliente y un servidor, donde cada componente tiene responsabilidades específicas. Analizaremos dos flujos fundamentales: la lectura de datos y la escritura de datos, utilizando el caso de una aplicación de notas compartidas.

### Flujo de lectura: Obtener una nota
Consideremos un usuario que desea ver una nota específica. El flujo de la petición sigue estos pasos:

1.  **Cliente inicia petición:** El navegador del usuario envía una petición HTTP `GET /notas/{id_nota}`. Esta petición incluye las cookies de sesión si existen.

2.  **Servidor recibe petición (Capa de red):** El servidor web recibe la petición. HTTPS asegura que la comunicación sea confidencial e íntegra, y que el cliente se comunica con el servidor esperado.

3.  **Servidor procesa petición (Capa de aplicación):**
    *   **Verificación de sesión:** El servidor extrae la cookie de sesión de la petición. Si no hay cookie o la sesión es inválida, el servidor puede responder con un `HTTP 401 Unauthorized` y terminar el flujo. Si la sesión es válida, se identifica al usuario asociado.
    *   **Verificación de autorización:** Con el usuario identificado, el servidor comprueba si tiene permiso para acceder a la nota `{id_nota}`. Esto implica consultar la base de datos para verificar la propiedad o los permisos de compartición. Si el usuario no está autorizado, el servidor responde con un `HTTP 403 Forbidden`.
    *   **Recuperación de datos:** Si el usuario está autorizado, el servidor consulta la base de datos para obtener el contenido de la nota `{id_nota}`.
    *   **Preparación de respuesta:** El servidor formatea los datos de la nota (por ejemplo, a HTML o JSON) para enviarlos al cliente.

4.  **Servidor envía respuesta:** El servidor envía la respuesta HTTP `200 OK` con el contenido de la nota al cliente.

5.  **Cliente procesa respuesta:** El navegador recibe la respuesta y muestra la nota al usuario.

**Diagrama textual de lectura:**
```text
Cliente (Navegador) --GET /notas/{id_nota}--> Servidor (Aplicación)
                                                |
                                                | 1. Verificar Sesión (cookie)
                                                |    - Fallo: HTTP 401 Unauthorized
                                                V
                                                | 2. Verificar Autorización (permisos de {id_nota})
                                                |    - Fallo: HTTP 403 Forbidden
                                                V
                                                | 3. Consultar Base de Datos (SELECT * FROM notas WHERE id = {id_nota})
                                                |    - Fallo: HTTP 500 Internal Server Error (ej. DB no disponible)
                                                V
                                                | 4. Formatear Respuesta
                                                |
Servidor (Aplicación) --HTTP 200 OK (contenido de nota)--> Cliente (Navegador)
```

### Flujo de escritura: Editar una nota
Ahora, consideremos un usuario que desea modificar el contenido de una nota. El flujo es similar, pero con pasos adicionales de validación y persistencia:

1.  **Cliente inicia petición:** El navegador del usuario envía una petición HTTP `PUT /notas/{id_nota}` con el nuevo contenido de la nota en el cuerpo de la petición. Incluye las cookies de sesión.

2.  **Servidor recibe petición (Capa de red):** El servidor web recibe la petición. HTTPS asegura la comunicación.

3.  **Servidor procesa petición (Capa de aplicación):**
    *   **Verificación de sesión:** Igual que en la lectura. Si la sesión es inválida, `HTTP 401 Unauthorized`.
    *   **Verificación de autorización:** El servidor comprueba si el usuario identificado tiene permiso para modificar la nota `{id_nota}`. Si no está autorizado, `HTTP 403 Forbidden`.
    *   **Validación de datos:** El servidor valida el nuevo contenido de la nota recibido del cliente. Esto incluye verificar el formato, la longitud, la ausencia de contenido malicioso, etc. Si los datos son inválidos, el servidor responde con un `HTTP 400 Bad Request`.
    *   **Actualización de datos:** Si los datos son válidos y el usuario está autorizado, el servidor actualiza la nota en la base de datos.
    *   **Preparación de respuesta:** El servidor prepara una respuesta indicando el éxito o el resultado de la operación.

4.  **Servidor envía respuesta:** El servidor envía la respuesta HTTP `200 OK` (o `204 No Content` si no hay contenido que devolver) al cliente.

5.  **Cliente procesa respuesta:** El navegador recibe la respuesta y puede actualizar la interfaz de usuario.

**Diagrama textual de escritura:**
```text
Cliente (Navegador) --PUT /notas/{id_nota} (nuevo contenido)--> Servidor (Aplicación)
                                                                  |
                                                                  | 1. Verificar Sesión (cookie)
                                                                  |    - Fallo: HTTP 401 Unauthorized
                                                                  V
                                                                  | 2. Verificar Autorización (permisos de {id_nota})
                                                                  |    - Fallo: HTTP 403 Forbidden
                                                                  V
                                                                  | 3. Validar Datos (contenido de nota)
                                                                  |    - Fallo: HTTP 400 Bad Request
                                                                  V
                                                                  | 4. Actualizar Base de Datos (UPDATE notas SET contenido = ... WHERE id = {id_nota})
                                                                  |    - Fallo: HTTP 500 Internal Server Error (ej. DB no disponible)
                                                                  V
                                                                  | 5. Formatear Respuesta
                                                                  |
Servidor (Aplicación) --HTTP 200 OK (o 204 No Content)--> Cliente (Navegador)
```

En ambos flujos, la responsabilidad de la seguridad (autenticación, autorización, validación) recae en el servidor, asumiendo que el cliente no es confiable. La persistencia de los datos se gestiona a través de la base de datos, asegurando que los cambios sobrevivan a los reinicios del servidor.

## Práctica
Considere una aplicación de notas compartidas donde un usuario, `usuarioA`, es el propietario de la nota con `id=123`. Otro usuario, `usuarioB`, intenta realizar las siguientes acciones:

1.  **Intento de lectura:** `usuarioB` intenta acceder a la nota `id=123` mediante una petición `GET /notas/123`. `usuarioB` no tiene permisos de lectura sobre esta nota, ni es su propietario.
2.  **Intento de escritura:** `usuarioB` intenta modificar la nota `id=123` con un nuevo contenido mediante una petición `PUT /notas/123` con el cuerpo `{"contenido": "Nuevo texto"}`. `usuarioB` no tiene permisos de escritura sobre esta nota, ni es su propietario.
3.  **Intento de creación con datos inválidos:** `usuarioA` intenta crear una nueva nota mediante una petición `POST /notas` con el cuerpo `{"contenido": ""}` (un contenido vacío, lo cual está prohibido por las reglas de validación del servidor).

Para cada uno de estos tres escenarios, describa el flujo completo de la petición, identificando:
*   El tipo de petición HTTP y la URL.
*   Los pasos que el servidor ejecuta (verificación de sesión, autorización, validación de datos, interacción con la base de datos).
*   El punto exacto donde el flujo se interrumpe o se desvía debido a un fallo.
*   El código de estado HTTP que el servidor debería devolver en cada caso.
*   Una breve explicación de por qué se devuelve ese código de estado.

## Comprobaciones
1.  ¿Qué código de estado HTTP debería devolver el servidor si un usuario autenticado intenta acceder a una nota para la cual no tiene permisos de lectura?
Respuesta: HTTP 403 Forbidden.
2.  ¿Qué código de estado HTTP debería devolver el servidor si un usuario intenta crear una nota con un título que excede la longitud máxima permitida, según las reglas de validación del servidor?
Respuesta: HTTP 400 Bad Request.

## Cierre
Hemos desglosado el ciclo de vida de una petición, observando cómo los datos y el control fluyen a través de los componentes del sistema. Esta comprensión del flujo completo es esencial para identificar dónde residen los valores y las referencias dentro de la aplicación. En la próxima lección, profundizaremos en esta distinción, que es fundamental para el manejo de la memoria y la consistencia de los datos en sistemas distribuidos.
