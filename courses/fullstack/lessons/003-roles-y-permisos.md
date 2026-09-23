---
schemaVersion: 1
id: 4803152a-4e52-4584-a229-eb753fe22b06
sequence: 3
course: fullstack
stepId: roles-y-permisos
title: Modelar roles y permisos
publishedAt: 2026-09-21T08:43:10.268Z
generationDate: 2026-09-21
summary: Esta lección aborda la creación de un modelo estructurado para roles y
  permisos, fundamental para implementar una autorización robusta. Se explica
  cómo traducir roles como 'administrador', 'editor' y 'lector' en acciones
  permitidas sobre recursos específicos. Se presenta un enfoque para definir una
  matriz de recursos, acciones y roles, lo que permite establecer claramente qué
  operaciones puede realizar cada tipo de usuario. La lección incluye un ejemplo
  concreto de una plataforma de contenido, una práctica para aplicar el modelado
  y comprobaciones para asegurar la comprensión de la estructura…
generation:
  model: gemini-2.5-flash
  promptVersion: v1
  contextHash: 4896bf4062d9f9394b9313bc7197b1d04260e8f19ba42353e7f42ee2162c1157
---

La autenticación y la verificación de la propiedad de un recurso son pasos esenciales para la seguridad de una aplicación. Sin embargo, no son suficientes para gestionar la complejidad de los permisos en sistemas donde diferentes tipos de usuarios interactúan con múltiples recursos. Las lecciones anteriores establecieron la necesidad de verificar que un usuario es quien dice ser y que solo puede modificar los recursos de su propiedad. Ahora, es necesario abordar escenarios donde un usuario, aunque autenticado y propietario de ciertos recursos, puede tener un rol que le otorga o restringe el acceso a acciones sobre recursos que no son directamente suyos, o sobre tipos de recursos específicos. Por ejemplo, un administrador puede necesitar modificar cualquier publicación, mientras que un editor solo puede modificar las suyas y un lector solo puede verlas. Este tema introduce la formalización de estos niveles de acceso mediante la creación de un modelo de roles y permisos, lo que permite una gestión clara y escalable de la autorización.

Un sistema de autorización robusto requiere una definición explícita de qué acciones están permitidas para cada rol sobre cada recurso. Sin esta estructura, la lógica de autorización tiende a volverse dispersa, redundante y propensa a errores a medida que la aplicación crece. El problema central es cómo traducir conceptos abstractos como 'administrador', 'editor' o 'lector' en un conjunto concreto de operaciones permitidas sobre entidades específicas del sistema. Una solución es construir una matriz de permisos que relacione roles, recursos y acciones.

Considere una plataforma de contenido que gestiona `publicaciones` y `comentarios`. Los roles definidos son `administrador`, `editor` y `lector`. Cada rol debe tener permisos específicos para realizar acciones como `crear`, `leer`, `actualizar` y `eliminar` sobre estos recursos.

El flujo para determinar si una acción está permitida comienza cuando una solicitud llega al servidor. El sistema identifica al usuario autenticado y su rol asociado. Luego, la aplicación consulta la matriz de permisos para verificar si el rol del usuario tiene permiso para realizar la acción solicitada sobre el recurso objetivo. Si el permiso existe, la operación procede; de lo contrario, se deniega el acceso.

Para modelar esto, se puede definir una estructura de datos que represente esta matriz. A continuación, se presenta un ejemplo mínimo utilizando un objeto JavaScript para ilustrar esta relación:

```javascript
const permisosPorRol = {
  "administrador": {
    "publicaciones": [
      "crear",
      "leer",
      "actualizar",
      "eliminar"
    ],
    "comentarios": [
      "crear",
      "leer",
      "actualizar",
      "eliminar"
    ],
    "usuarios": [
      "crear",
      "leer",
      "actualizar",
      "eliminar"
    ]
  },
  "editor": {
    "publicaciones": [
      "crear",
      "leer",
      "actualizar",
      "eliminar"
    ],
    "comentarios": [
      "crear",
      "leer",
      "actualizar"
    ],
    "usuarios": [
      "leer"
    ]
  },
  "lector": {
    "publicaciones": [
      "leer"
    ],
    "comentarios": [
      "crear",
      "leer"
    ],
    "usuarios": []
  }
};
```

En este modelo, `permisosPorRol` es un objeto donde cada clave es un nombre de rol. El valor asociado a cada rol es otro objeto que mapea nombres de recursos (por ejemplo, `publicaciones`, `comentarios`, `usuarios`) a un array de acciones permitidas. Por ejemplo, un `editor` puede `crear`, `leer`, `actualizar` y `eliminar` `publicaciones`, pero solo puede `crear` y `leer` `comentarios`, y únicamente `leer` `usuarios`.

Esta estructura proporciona una fuente de verdad centralizada para las reglas de autorización. Al consultar `permisosPorRol['editor']['publicaciones']`, se obtiene la lista de acciones que un editor puede realizar sobre las publicaciones. La ausencia de una acción en la lista para un rol y recurso específicos implica que dicha acción no está permitida.

### Práctica

Extienda el modelo `permisosPorRol` para incluir un nuevo recurso llamado `categorias`. Defina los permisos para este nuevo recurso para cada uno de los roles existentes (`administrador`, `editor`, `lector`).

Considere que:
*   Un `administrador` debe tener todos los permisos (`crear`, `leer`, `actualizar`, `eliminar`) sobre `categorias`.
*   Un `editor` debe poder `crear` y `leer` `categorias`, pero no `actualizar` ni `eliminar`.
*   Un `lector` solo debe poder `leer` `categorias`.

### Comprobaciones

1.  Según el modelo `permisosPorRol` original, ¿qué acciones puede realizar un `editor` sobre el recurso `usuarios`?
    *   **Respuesta:** Un `editor` puede realizar la acción `leer` sobre el recurso `usuarios`.

2.  Si un `lector` intenta `actualizar` una `publicacion`, ¿el modelo actual permite esta acción? ¿Por qué?
    *   **Respuesta:** No, el modelo actual no permite que un `lector` `actualice` una `publicacion`. El array de permisos para `lector` sobre `publicaciones` solo incluye `leer`, lo que significa que cualquier otra acción no está autorizada.

Este modelo de roles y permisos establece la base para implementar la lógica de autorización. En el siguiente paso, se explorará cómo integrar esta estructura de datos en el código para realizar verificaciones de acceso en tiempo de ejecución.
