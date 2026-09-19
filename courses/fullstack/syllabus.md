---
schemaVersion: 1
steps:
  - id: ownership-recursos
    unitId: autorizacion
    topicId: ownership
    title: Ownership de recursos
    objective: Explicar por qué autenticarse y tener un rol no permite modificar recursos ajenos.
    brief: Seguir una petición PATCH y comprobar en el servidor que resource.userId coincide con session.userId.
  - id: evitar-id-del-cliente
    unitId: autorizacion
    topicId: confianza
    title: No confiar en el propietario enviado por el cliente
    objective: Derivar la identidad desde la sesión y no desde el body o los parámetros.
    brief: Comparar una ruta vulnerable con una ruta que toma userId del contexto autenticado.
  - id: roles-y-permisos
    unitId: autorizacion
    topicId: rbac
    title: Modelar roles y permisos
    objective: Traducir admin, editor y lector en acciones permitidas.
    brief: Crear una matriz pequeña de recursos, acciones y roles antes de escribir condiciones.
  - id: middleware-autorizacion
    unitId: autorizacion
    topicId: middleware
    title: Construir un middleware de autorización
    objective: Centralizar una regla sin ocultar la decisión de negocio.
    brief: Separar autenticación, permiso general y ownership en pasos legibles.
  - id: respuestas-401-403-404
    unitId: autorizacion
    topicId: http
    title: Elegir entre 401, 403 y 404
    objective: Responder de forma consistente sin filtrar información innecesaria.
    brief: Resolver casos de sesión ausente, permiso insuficiente y recurso invisible.
  - id: frontend-no-es-seguridad
    unitId: autorizacion
    topicId: frontend
    title: Entender por qué ocultar un botón no autoriza
    objective: Separar experiencia de usuario y control de seguridad del servidor.
    brief: Comparar la interfaz sin botón con una petición manual al endpoint protegido.
  - id: prueba-ownership
    unitId: autorizacion
    topicId: testing
    title: Probar ownership con dos usuarios
    objective: Verificar el caso permitido y el intento sobre un recurso ajeno.
    brief: Diseñar una prueba de integración con Alice, Bob y dos recursos.
  - id: permisos-en-base-datos
    unitId: datos
    topicId: consultas
    title: Filtrar permisos desde la consulta
    objective: Reducir el riesgo de cargar datos que el usuario no puede ver.
    brief: Comparar buscar por id y luego verificar con buscar por id y ownerId.
  - id: actualizaciones-seguras
    unitId: datos
    topicId: update
    title: Evitar mass assignment
    objective: Controlar qué campos acepta una actualización.
    brief: Construir un objeto de cambios permitido y rechazar ownerId, role y campos internos.
  - id: validacion-entrada
    unitId: datos
    topicId: validacion
    title: Validar la entrada en la frontera
    objective: Distinguir forma válida, regla de negocio y autorización.
    brief: Seguir un body desde JSON hasta el servicio y ubicar cada comprobación.
  - id: errores-servicio-http
    unitId: arquitectura
    topicId: errores
    title: Traducir errores del servicio a HTTP
    objective: Evitar que la lógica de negocio dependa del framework web.
    brief: Modelar not-found, forbidden y conflict y mapearlos en el controlador.
  - id: transacciones-basicas
    unitId: datos
    topicId: transacciones
    title: Proteger cambios relacionados
    objective: Entender cuándo dos escrituras deben completarse juntas.
    brief: Resolver una transferencia simple y observar el estado inválido que deja una falla intermedia.
  - id: concurrencia-actualizacion
    unitId: datos
    topicId: concurrencia
    title: Reconocer una actualización perdida
    objective: Detectar qué ocurre cuando dos peticiones modifican el mismo dato.
    brief: Comparar read-modify-write con una actualización atómica o control de versión.
  - id: caso-final-autorizacion
    unitId: arquitectura
    topicId: caso-integrador
    title: Diseñar un endpoint protegido completo
    objective: Integrar autenticación, ownership, rol, validación y errores.
    brief: Diseñar y revisar un endpoint para editar una publicación compartida.
---

# Recorrido

La primera unidad profundiza autorización mediante ownership y roles. Luego conecta esas reglas con consultas, validación, errores y consistencia de datos.
