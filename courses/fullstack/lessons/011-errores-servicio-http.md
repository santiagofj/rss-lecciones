---
schemaVersion: 1
id: a5a64071-eeb1-4c5a-9be8-23dd3450fddf
sequence: 11
course: fullstack
stepId: errores-servicio-http
title: Traducir errores del servicio a HTTP
publishedAt: 2026-09-29T09:35:41.465Z
generationDate: 2026-09-29
summary: Esta lección aborda la importancia de desacoplar la lógica de negocio
  del framework web mediante la traducción de errores del servicio a códigos de
  estado HTTP apropiados. Se explica cómo modelar condiciones de error comunes
  como "no encontrado", "prohibido" y "conflicto" dentro de la capa de servicio,
  y cómo mapear estos tipos de errores específicos a sus respuestas HTTP
  correspondientes en el controlador. Este enfoque garantiza que la lógica de
  negocio central permanezca independiente de la capa de presentación, mejorando
  la mantenibilidad y la capacidad de prueba. Se proporciona un ejemplo…
generation:
  model: gemini-2.5-flash
  promptVersion: v3
  contextHash: e8ab560daa1fba48fb1d5c9995ebe2d1041b00fe1cea1f52d632ac1434028e4c
---

## Por qué ahora
La lógica de negocio de una aplicación debe operar de forma independiente de los detalles de su infraestructura o de cómo se expone al exterior. Frecuentemente, los servicios de negocio se acoplan a la capa de presentación al lanzar excepciones que contienen información específica de HTTP, como códigos de estado. Esta práctica introduce una dependencia indeseada, dificultando la reutilización de la lógica de negocio en diferentes contextos (por ejemplo, una API REST, una interfaz de línea de comandos o un procesador de eventos asíncrono) y complicando las pruebas unitarias de los servicios.

El objetivo es mantener una clara separación de responsabilidades. La capa de servicio debe concentrarse en identificar *qué* salió mal en términos del dominio de negocio, sin preocuparse por *cómo* se comunicará ese error a través de HTTP. La capa de controlador, por su parte, es la responsable de traducir los errores específicos del dominio en las respuestas HTTP adecuadas. Esta lección se basa en los conceptos de validación de entrada y autorización que se han cubierto previamente, proporcionando un mecanismo estructurado para comunicar los fallos resultantes de estas operaciones sin contaminar la lógica central del servicio.

## Explicación y ejemplo
El problema central es que los servicios de negocio no deben lanzar excepciones que contengan códigos de estado HTTP directamente. En su lugar, deben comunicar fallos utilizando tipos de error específicos del dominio. Estos errores son luego interceptados y traducidos por la capa de controlador a las respuestas HTTP correspondientes.

Considere un servicio que gestiona publicaciones. Una operación para obtener una publicación por ID podría fallar si la publicación no existe, o si el usuario autenticado no tiene permiso para verla. En lugar de que el servicio lance una excepción que indique `HTTP 404` o `HTTP 403`, el servicio debería lanzar un error que represente el concepto de negocio, como `PublicacionNoEncontradaError` o `AccesoDenegadoError`.

El flujo de trabajo propuesto es el siguiente:
1.  **Capa de Servicio**: Define y lanza excepciones personalizadas que encapsulan fallos de negocio. Estas excepciones no contienen información HTTP.
2.  **Capa de Controlador**: Invoca el servicio. Utiliza un bloque `try-catch` o un mecanismo de manejo de errores global para interceptar las excepciones del servicio.
3.  **Mapeo de Errores**: Dentro del controlador o del manejador de errores, se mapea cada tipo de excepción de negocio a un código de estado HTTP y un cuerpo de respuesta apropiados.

Para ilustrar esto, consideremos un servicio simple para gestionar publicaciones. Primero, definimos las clases de error personalizadas en el dominio de negocio. Estas son clases simples que extienden `Error` o una clase base de error personalizada, sin ninguna referencia a HTTP.

```typescript
// src/domain/errors.ts

export class PublicacionNoEncontradaError extends Error {
  constructor(message: string = "La publicación no fue encontrada.") {
    super(message);
    this.name = "PublicacionNoEncontradaError";
  }
}

export class AccesoDenegadoError extends Error {
  constructor(message: string = "Acceso denegado a la publicación.") {
    super(message);
    this.name = "AccesoDenegadoError";
  }
}

export class ConflictoActualizacionError extends Error {
  constructor(message: string = "Conflicto al actualizar la publicación.") {
    super(message);
    this.name = "ConflictoActualizacionError";
  }
}

// src/domain/publicacion.service.ts

interface Publicacion {
  id: string;
  titulo: string;
  contenido: string;
  autorId: string;
}

interface Usuario {
  id: string;
  rol: 'admin' | 'editor' | 'lector';
}

export class PublicacionService {
  private publicaciones: Publicacion[] = [
    { id: '1', titulo: 'Mi primera publicación', contenido: 'Contenido...', autorId: 'user1' },
    { id: '2', titulo: 'Publicación secreta', contenido: 'Contenido confidencial...', autorId: 'user2' }
  ];

  obtenerPublicacion(id: string, usuario: Usuario): Publicacion {
    const publicacion = this.publicaciones.find(p => p.id === id);

    if (!publicacion) {
      throw new PublicacionNoEncontradaError();
    }

    // Ejemplo de autorización: solo el autor o un admin pueden ver publicaciones secretas
    if (publicacion.id === '2' && publicacion.autorId !== usuario.id && usuario.rol !== 'admin') {
      throw new AccesoDenegadoError();
    }

    return publicacion;
  }

  actualizarPublicacion(id: string, datos: Partial<Publicacion>, usuario: Usuario): Publicacion {
    const index = this.publicaciones.findIndex(p => p.id === id);

    if (index === -1) {
      throw new PublicacionNoEncontradaError();
    }

    const publicacionExistente = this.publicaciones[index];

    // Solo el autor puede actualizar su publicación
    if (publicacionExistente.autorId !== usuario.id) {
      throw new AccesoDenegadoError("Solo el autor puede actualizar su publicación.");
    }

    // Simular un conflicto de actualización (por ejemplo, versión antigua)
    if (datos.titulo === "Titulo en conflicto") {
      throw new ConflictoActualizacionError("La publicación ya ha sido modificada.");
    }

    this.publicaciones[index] = { ...publicacionExistente, ...datos };
    return this.publicaciones[index];
  }
}
```

Ahora, en la capa de controlador, se invoca el servicio y se manejan las excepciones. Este ejemplo utiliza un pseudocódigo para un controlador web, asumiendo un framework que permite manejar respuestas HTTP.

```typescript
// src/api/publicacion.controller.ts (pseudocódigo)

import { PublicacionService } from '../domain/publicacion.service';
import { PublicacionNoEncontradaError, AccesoDenegadoError, ConflictoActualizacionError } from '../domain/errors';

// Asumiendo un contexto de solicitud/respuesta HTTP
interface HttpRequest {
  params: { id: string };
  body: any;
  user: { id: string; rol: 'admin' | 'editor' | 'lector' }; // Usuario autenticado
}

interface HttpResponse {
  status(code: number): HttpResponse;
  json(data: any): HttpResponse;
  send(message: string): HttpResponse;
}

export class PublicacionController {
  constructor(private publicacionService: PublicacionService) {}

  async obtenerPublicacionHandler(req: HttpRequest, res: HttpResponse): Promise<HttpResponse> {
    try {
      const publicacion = this.publicacionService.obtenerPublicacion(req.params.id, req.user);
      return res.status(200).json(publicacion);
    } catch (error) {
      if (error instanceof PublicacionNoEncontradaError) {
        return res.status(404).json({ message: error.message });
      } else if (error instanceof AccesoDenegadoError) {
        return res.status(403).json({ message: error.message });
      } else {
        // Manejo de errores inesperados
        console.error("Error inesperado:", error);
        return res.status(500).json({ message: "Error interno del servidor." });
      }
    }
  }

  async actualizarPublicacionHandler(req: HttpRequest, res: HttpResponse): Promise<HttpResponse> {
    try {
      const publicacionActualizada = this.publicacionService.actualizarPublicacion(req.params.id, req.body, req.user);
      return res.status(200).json(publicacionActualizada);
    } catch (error) {
      if (error instanceof PublicacionNoEncontradaError) {
        return res.status(404).json({ message: error.message });
      } else if (error instanceof AccesoDenegadoError) {
        return res.status(403).json({ message: error.message });
      } else if (error instanceof ConflictoActualizacionError) {
        return res.status(409).json({ message: error.message });
      } else {
        console.error("Error inesperado:", error);
        return res.status(500).json({ message: "Error interno del servidor." });
      }
    }
  }
}
```

Este enfoque garantiza que la lógica de negocio en `PublicacionService` no tenga conocimiento de HTTP, lo que la hace más limpia, más fácil de probar y más adaptable. El controlador se encarga de la traducción específica para el protocolo web.

## Práctica
Extienda el servicio de gestión de usuarios o productos de una lección anterior. Identifique al menos dos escenarios de error de negocio que puedan ocurrir en una operación de creación o actualización (por ejemplo, un usuario ya existe, un producto no tiene stock, un usuario intenta modificar un campo que no le pertenece). Cree clases de error personalizadas para cada uno de estos escenarios en la capa de dominio.

Luego, modifique el servicio para que lance estas excepciones personalizadas cuando ocurran las condiciones de error. Finalmente, adapte el controlador correspondiente para que capture estas nuevas excepciones y las traduzca a códigos de estado HTTP apropiados. Considere `HTTP 409 Conflict` para un recurso duplicado, `HTTP 403 Forbidden` para un intento de modificación no autorizado, o `HTTP 400 Bad Request` si el error es debido a datos de entrada válidos pero que violan una regla de negocio específica no cubierta por la validación de esquema.

Verifique que el servicio siga siendo independiente del framework web y que el controlador maneje la traducción de errores de manera consistente.

## Comprobaciones
1.  ¿Cuál es la principal ventaja de que la capa de servicio lance excepciones de dominio en lugar de excepciones que contengan códigos de estado HTTP?
Respuesta: La principal ventaja es el desacoplamiento entre la lógica de negocio y la capa de presentación, lo que mejora la reusabilidad del servicio, facilita las pruebas unitarias y permite adaptar la aplicación a diferentes interfaces (web, CLI, etc.) sin modificar la lógica central.
2.  Si un servicio lanza una `PublicacionNoEncontradaError`, ¿qué código de estado HTTP debería devolver el controlador y por qué?
Respuesta: El controlador debería devolver `HTTP 404 Not Found`. Este código de estado es el estándar para indicar que el recurso solicitado no existe en el servidor, lo cual se alinea directamente con el significado de `PublicacionNoEncontradaError`.

## Cierre
La traducción de errores del servicio a HTTP es un paso fundamental para construir APIs robustas y mantenibles. Al mantener la lógica de negocio libre de detalles de infraestructura, se prepara el terreno para sistemas más flexibles. En la próxima lección, exploraremos cómo estandarizar aún más las respuestas de error para los consumidores de la API, proporcionando mensajes claros y útiles.
