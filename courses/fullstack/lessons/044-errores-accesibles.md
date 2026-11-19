---
schemaVersion: 1
id: d1c7cb52-6493-45ae-b3de-b0066e1d72fd
sequence: 44
course: fullstack
stepId: errores-accesibles
title: Comunicar errores de formulario
publishedAt: 2026-11-19T13:27:19.061Z
generationDate: 2026-11-18
summary: Diseño de mensajes claros y estructurados para errores de validación de
  campos y fallos del servidor, sin depender exclusivamente de colores o
  notificaciones temporales.
generation:
  model: openai/gpt-oss-120b
  promptVersion: v5
  contextHash: fe2a9451364f63df2e87cd2c5c096ff89e688f8badb6a85d164aad7fd50f7e1d
---

## Por qué ahora

En una aplicación web, la interacción con formularios es una de las vías principales para que el usuario envíe datos al servidor. Cuando la información enviada no cumple con los requisitos de negocio o la lógica del servidor, la respuesta debe indicar de forma precisa qué elemento es problemático y cómo corregirlo. Un mensaje ambiguo o únicamente visual (por ejemplo, un cambio de color) no garantiza que el usuario con discapacidad visual o con dispositivos de asistencia perciba el problema. Además, los errores de servidor pueden ocurrir después de la validación del cliente, por lo que el mecanismo de notificación debe cubrir ambos casos. Comunicar el error asociado al campo y a la acción que lo corrige reduce la fricción, disminuye la tasa de abandono y mejora la accesibilidad, aspectos críticos en cualquier producto orientado a usuarios reales.

## Explicación y ejemplo

### Problema
Los formularios pueden fallar por dos razones principales:
1. **Validación del cliente**: datos que no cumplen reglas de formato, longitud o requisitos de dominio antes de enviarse.
2. **Validación del servidor**: reglas de negocio, integridad referencial o errores inesperados que solo el backend puede detectar.
En ambos casos, el usuario necesita saber cuál campo está involucrado y qué acción debe tomar.

### Responsabilidades y flujo
1. **El cliente** recopila pares nombre‑valor y los envía mediante una petición HTTP `POST` o `PUT`.
2. **El servidor** procesa la petición, ejecuta validaciones y, si alguna falla, responde con un código de estado `400` (solicitud incorrecta) o `422` (entidad no procesable). El cuerpo incluye una estructura que asocia cada error con el nombre del campo.
3. **El cliente** recibe la respuesta, extrae la lista de errores y los muestra junto al control correspondiente. Para usuarios de lectores de pantalla, los mensajes deben estar en un *live region* ARIA.

```
Cliente → POST /notas
   {"title":"","content":"Texto"}
Server → 400 Bad Request
   {
     "errors": {
       "title": "El título es obligatorio.",
       "general": "No se pudo guardar la nota."
     }
   }
``` 

### Ejemplo concreto
A continuación se muestra una implementación mínima en HTML y JavaScript que ilustra el ciclo completo.

```html
<form id="noteForm" novalidate>
  <div>
    <label for="title">Título</label>
    <input type="text" id="title" name="title" aria-describedby="titleError" />
    <span id="titleError" class="error" role="alert" aria-live="assertive"></span>
  </div>
  <div>
    <label for="content">Contenido</label>
    <textarea id="content" name="content" aria-describedby="contentError"></textarea>
    <span id="contentError" class="error" role="alert" aria-live="assertive"></span>
  </div>
  <button type="submit">Guardar</button>
  <div id="formError" class="error" role="alert" aria-live="assertive"></div>
</form>
```

```javascript
document.getElementById('noteForm').addEventListener('submit', async e => {
  e.preventDefault();
  // 1. Construir pares nombre‑valor
  const data = new FormData(e.target);
  const payload = Object.fromEntries(data);
  // 2. Enviar petición
  const response = await fetch('/api/notas', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload)
  });
  // 3. Procesar respuesta
  const result = await response.json();
  // 4. Limpiar mensajes anteriores
  document.querySelectorAll('.error').forEach(el => el.textContent = '');
  if (!response.ok) {
    // 5. Mostrar errores de campo
    for (const [field, msg] of Object.entries(result.errors || {})) {
      const errEl = document.getElementById(field + 'Error') || document.getElementById('formError');
      errEl.textContent = msg;
    }
  } else {
    // 6. Acción de éxito (no requerida en esta lección)
    alert('Nota guardada');
  }
});
```

#### Detalle del contrato de error
| Campo | Tipo de error | Mensaje de ejemplo |
|-------|---------------|--------------------|
| `title` | Validación cliente / servidor | "El título es obligatorio."
| `content` | Validación cliente | "El contenido debe tener al menos 10 caracteres."
| `general` | Error de servidor | "No se pudo guardar la nota debido a un error interno."

- **Campo**: nombre exacto usado en el atributo `name` del control.
- **Tipo de error**: indica si la causa es pre‑o post‑validación.
- **Mensaje**: texto breve, sin jerga, que explica la corrección requerida.

### Consideraciones de accesibilidad
- Cada mensaje está dentro de un elemento `<span>` con `role="alert"` y `aria-live="assertive"` para que los lectores de pantalla lo anuncien inmediatamente.
- El atributo `aria-describedby` enlaza el control con su mensaje, permitiendo que la asociación sea clara tanto visual como programáticamente.
- No se confía únicamente en colores; el texto del mensaje es el elemento definitivo.

### Manejo de errores inesperados
Si el servidor devuelve un código `500` o una respuesta que no contiene la estructura `errors`, el cliente debe mostrar un mensaje genérico en `formError` indicando que ocurrió un problema inesperado y sugerir volver a intentar.

Este enfoque separa la lógica de negocio (servidor) de la presentación (cliente) y garantiza que cualquier capa que consuma la API pueda interpretar los errores de manera uniforme.

## Práctica

**Objetivo**: diseñar la estrategia de comunicación de errores para un formulario de registro de usuario.

1. **Especificar los campos** del formulario: `username`, `email`, `password` y `confirmPassword`.
2. **Definir las reglas de validación** que el servidor debe aplicar (por ejemplo, `username` único, `email` con formato RFC 5322, `password` mínimo 8 caracteres, coincidencia de `password` y `confirmPassword`).
3. **Redactar la estructura JSON** que el servidor enviará cuando alguna regla falle. Utilice el mismo formato mostrado en la sección de explicación, incluyendo un campo `general` para errores que no estén asociados a un control específico.
4. **Crear el fragmento HTML** de los cuatro controles, agregando los elementos `<span>` para los mensajes de error y los atributos `aria-describedby` correspondientes.
5. **Escribir el fragmento JavaScript** que, tras recibir la respuesta de error, asigne cada mensaje al `<span>` apropiado y limpie los mensajes anteriores.
6. **Comprobar manualmente** que, al enviar datos erróneos, los mensajes aparecen junto a cada campo y que un error genérico se muestra en un contenedor de nivel de formulario.

Entregable: un documento de texto que contenga (a) la tabla de errores esperados, (b) el ejemplo de JSON de error y (c) el código HTML y JavaScript descritos. No es necesario ejecutar el código; el alumno debe poder leer y verificar la lógica de asignación de mensajes.

**Forma de verificación**: comparar el JSON redactado con la tabla de reglas y asegurar que cada regla tiene una clave idéntica al atributo `name` del control. Revisar que los IDs de los elementos `<span>` siguen la convención `<nombreCampo>Error` y que el atributo `aria-describedby` apunta a ese ID.

Esta tarea refuerza la capacidad de predecir la interacción entre capas y de diseñar contratos de error independientes del stack concreto.

## Comprobaciones

1. ¿Cuál es el nombre exacto del atributo HTML que debe enlazar un control con su mensaje de error accesible?
Respuesta: aria-describedby
2. Si el servidor responde con un objeto `{ "errors": { "email": "Formato inválido.", "general": "Error interno." } }`, ¿en qué elemento del formulario debe mostrarse el mensaje "Error interno."?
Respuesta: en el elemento `<span>` o contenedor asociado al error general, típicamente con id="formError" o similar, fuera de los controles individuales.

## Cierre

La correcta comunicación de errores prepara al alumno para validar la entrada en tiempo real y para detectar fallos de servidor sin ambigüedad. El siguiente tema abordará la revisión de una interfaz de edición, donde se aplicarán los mismos principios de feedback pero en un contexto de actualización de datos existentes.
