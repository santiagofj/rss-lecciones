---
schemaVersion: 1
id: 3c2a084a-7fbc-4a19-9b89-2e2f092918f8
sequence: 7
course: fullstack
stepId: prueba-ownership
title: Probar ownership con dos usuarios
publishedAt: 2026-09-25T12:43:12.517Z
generationDate: 2026-09-25
summary: Esta lección aborda el diseño de pruebas de integración para verificar
  la autorización de propiedad de recursos. Se explica cómo configurar
  escenarios con múltiples usuarios y recursos para confirmar que solo el
  propietario puede acceder o modificar sus propios datos, mientras que los
  intentos de acceso a recursos ajenos resultan en un fallo de autorización. Se
  presenta un flujo de prueba detallado y un ejemplo de código para implementar
  estas verificaciones, asegurando la robustez de la lógica de seguridad.
generation:
  model: gemini-2.5-flash
  promptVersion: v2
  contextHash: 260d281e1cd1c1e70f300643887a14ac4df5d78c6d9eaf9df4e3edcbf491317e
---

## Por qué ahora
La implementación de un middleware de autorización robusto, como se abordó en lecciones previas, es fundamental para la seguridad de una aplicación. Sin embargo, la mera existencia de este middleware no garantiza su correcto funcionamiento en todos los escenarios. La lógica de autorización, especialmente aquella que verifica la propiedad de un recurso (ownership), es compleja y susceptible a errores. Es crucial asegurar que un usuario solo pueda interactuar con los recursos que le pertenecen y que le está prohibido acceder o modificar los recursos de otros usuarios.

Las lecciones anteriores cubrieron la construcción de middleware de autorización, la elección de códigos de estado HTTP como 401 y 403, y la importancia de la autorización en el servidor. Ahora, el enfoque se dirige a la verificación práctica de esta lógica. Diseñar pruebas de integración es el método más efectivo para validar que las reglas de propiedad se aplican correctamente, simulando interacciones de usuarios reales con recursos específicos. Esto permite identificar fallos de autorización antes de que afecten la seguridad en producción.

## Explicación y ejemplo
El problema central es confirmar que la lógica de autorización de propiedad funciona como se espera: un usuario debe poder manipular sus propios recursos, y no debe poder manipular los recursos de otros. Para abordar esto de manera sistemática, se diseña una prueba de integración que simula las interacciones de múltiples usuarios con recursos distintos.

El flujo de una prueba de integración para verificar la propiedad de recursos implica los siguientes pasos:

1.  **Preparación de Usuarios**: Se crean o se utilizan dos usuarios distintos en el entorno de prueba. Por ejemplo, Alice y Bob. Cada uno debe tener credenciales válidas para autenticarse en el sistema.
2.  **Autenticación**: Se autentica a cada usuario para obtener sus respectivos tokens de sesión o cookies. Estos tokens son necesarios para realizar solicitudes autenticadas en nombre de cada usuario.
3.  **Creación de Recursos**: Cada usuario crea un recurso propio. Por ejemplo, Alice crea `recursoA` y Bob crea `recursoB`. Es fundamental que estos recursos estén asociados inequívocamente con su creador en la base de datos o sistema de persistencia.
4.  **Caso Positivo (Acceso del Propietario)**: Se realiza una solicitud autenticada por Alice para acceder o modificar `recursoA`. Se espera que esta solicitud sea exitosa, resultando en un código de estado HTTP 200 OK o 204 No Content, dependiendo de la operación.
5.  **Caso Negativo (Intento de Acceso Ajeno)**: Se realiza una solicitud autenticada por Alice para acceder o modificar `recursoB` (el recurso de Bob). Se espera que esta solicitud falle con un código de estado HTTP 403 Forbidden, indicando que Alice no tiene los permisos necesarios para interactuar con el recurso de Bob.
6.  **Simetría**: Se repiten los pasos 4 y 5 para Bob. Bob intenta acceder a `recursoB` (éxito esperado) y luego intenta acceder a `recursoA` (fallo 403 esperado).

Este flujo asegura que la lógica de autorización de propiedad se valida desde ambas perspectivas y para ambos tipos de recursos. A continuación, se presenta un pseudocódigo que ilustra cómo se estructuraría una prueba de este tipo utilizando un framework de pruebas común como Jest con Supertest para solicitudes HTTP:

```javascript
// Importar librerías de prueba (ej. Supertest para solicitudes HTTP)
const request = require('supertest');
const app = require('../src/app'); // Su aplicación Express

describe('Autorización de propiedad de recursos', () => {
  let aliceToken; // Token de autenticación para Alice
  let bobToken;   // Token de autenticación para Bob
  let aliceResourceId; // ID del recurso creado por Alice
  let bobResourceId;   // ID del recurso creado por Bob

  // Antes de todas las pruebas, configurar usuarios y recursos
  beforeAll(async () => {
    // 1. Registrar y autenticar a Alice
    await request(app).post('/register').send({ username: 'alice', password: 'password123' });
    const aliceLoginRes = await request(app).post('/login').send({ username: 'alice', password: 'password123' });
    aliceToken = aliceLoginRes.body.token; // Asumiendo que el token se devuelve en el cuerpo

    // 2. Registrar y autenticar a Bob
    await request(app).post('/register').send({ username: 'bob', password: 'password123' });
    const bobLoginRes = await request(app).post('/login').send({ username: 'bob', password: 'password123' });
    bobToken = bobLoginRes.body.token;

    // 3. Alice crea un recurso
    const aliceCreateRes = await request(app)
      .post('/resources')
      .set('Authorization', `Bearer ${aliceToken}`)
      .send({ name: 'Recurso de Alice' });
    aliceResourceId = aliceCreateRes.body.id;

    // 4. Bob crea un recurso
    const bobCreateRes = await request(app)
      .post('/resources')
      .set('Authorization', `Bearer ${bobToken}`)
      .send({ name: 'Recurso de Bob' });
    bobResourceId = bobCreateRes.body.id;
  });

  // Prueba: Alice puede acceder a su propio recurso
  test('Alice puede obtener su propio recurso', async () => {
    const res = await request(app)
      .get(`/resources/${aliceResourceId}`)
      .set('Authorization', `Bearer ${aliceToken}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.id).toEqual(aliceResourceId);
  });

  // Prueba: Alice no puede acceder al recurso de Bob
  test('Alice no puede obtener el recurso de Bob', async () => {
    const res = await request(app)
      .get(`/resources/${bobResourceId}`)
      .set('Authorization', `Bearer ${aliceToken}`);
    expect(res.statusCode).toEqual(403);
  });

  // Prueba: Bob puede actualizar su propio recurso
  test('Bob puede actualizar su propio recurso', async () => {
    const res = await request(app)
      .put(`/resources/${bobResourceId}`)
      .set('Authorization', `Bearer ${bobToken}`)
      .send({ name: 'Recurso de Bob Actualizado' });
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toEqual('Recurso de Bob Actualizado');
  });

  // Prueba: Bob no puede eliminar el recurso de Alice
  test('Bob no puede eliminar el recurso de Alice', async () => {
    const res = await request(app)
      .delete(`/resources/${aliceResourceId}`)
      .set('Authorization', `Bearer ${bobToken}`);
    expect(res.statusCode).toEqual(403);
  });

  // Limpieza (opcional): eliminar usuarios y recursos después de todas las pruebas
  afterAll(async () => {
    // Lógica para limpiar la base de datos o el estado de la aplicación
  });
});
```

Este ejemplo muestra cómo se realizan las solicitudes HTTP con los tokens de autenticación y cómo se verifican los códigos de estado esperados. La clave es simular el comportamiento de usuarios reales y sus permisos sobre recursos específicos.

## Práctica
Diseñe e implemente una prueba de integración en su proyecto actual que verifique la autorización de propiedad. Para ello, siga estos pasos:

1.  **Identifique un recurso**: Seleccione un tipo de recurso en su aplicación que deba tener un propietario (por ejemplo, una publicación, una tarea, un documento).
2.  **Configure dos usuarios**: Asegúrese de tener un mecanismo para registrar y autenticar a dos usuarios distintos (Alice y Bob) en su entorno de prueba.
3.  **Cree recursos**: Utilice las credenciales de Alice para crear un recurso (`recursoA`) y las credenciales de Bob para crear otro (`recursoB`). Asegúrese de que la base de datos asocie correctamente cada recurso con su propietario.
4.  **Escriba las pruebas**: Implemente al menos cuatro casos de prueba utilizando un framework de pruebas de integración (como Supertest con Jest, o similar para su lenguaje/framework):
    *   Alice intenta leer/modificar `recursoA` (éxito esperado).
    *   Alice intenta leer/modificar `recursoB` (fallo 403 esperado).
    *   Bob intenta leer/modificar `recursoB` (éxito esperado).
    *   Bob intenta leer/modificar `recursoA` (fallo 403 esperado).

Ejecute las pruebas y verifique que todas pasen, confirmando que su lógica de autorización de propiedad funciona correctamente.

## Comprobaciones
1.  ¿Qué código de estado HTTP se espera cuando un usuario intenta acceder a un recurso que no le pertenece y la autorización de propiedad falla?
Respuesta: Se espera un código de estado HTTP 403 Forbidden.

2.  ¿Cuál es el propósito de crear dos usuarios y dos recursos distintos en una prueba de integración para verificar la propiedad?
Respuesta: El propósito es simular escenarios de interacción entre múltiples usuarios y sus respectivos recursos, permitiendo verificar tanto los casos de acceso permitido (propietario a su recurso) como los casos de acceso denegado (usuario a recurso ajeno), asegurando que la lógica de autorización de propiedad es robusta y simétrica.

## Cierre
La capacidad de verificar la autorización de propiedad mediante pruebas de integración es un pilar fundamental para la seguridad de las aplicaciones. Estas pruebas proporcionan una confirmación objetiva del comportamiento esperado de la lógica de acceso. En la próxima lección, se explorará cómo extender estas pruebas para cubrir escenarios más complejos, como la autorización basada en roles y permisos específicos, y cómo integrar estas verificaciones en un ciclo de desarrollo continuo.
