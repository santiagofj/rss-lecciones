---
schemaVersion: 1
id: 260130bf-8f28-40c3-bdd8-829011e9f2c1
sequence: 41
course: fullstack
stepId: formularios-datos
title: Seguir los datos de un formulario
publishedAt: 2026-11-19T13:20:02.666Z
generationDate: 2026-11-15
summary: Entender cómo se construyen y transmiten los pares nombre‑valor de un
  formulario permite predecir qué información llega al servidor y separar la
  presentación de la validación confiable.
generation:
  model: openai/gpt-oss-120b
  promptVersion: v5
  contextHash: c96d3224aed8f1ffa61c376ce268dc8e3db2ebbc3436c924daf018292e4f1d54
---

## Por qué ahora

Comprender exactamente qué datos envía un formulario es necesario antes de poder validar o procesar la información en el servidor. En lecciones anteriores se ha estudiado la autorización y la semántica de los elementos HTML; sin embargo, la transmisión de los valores del formulario constituye la conexión entre la capa de presentación y la capa de lógica de negocio. Sin una visión clara de los nombres y valores que llegan al backend, cualquier regla de autorización o de consistencia carece de base fiable. Además, distinguir entre lo que se muestra al usuario y lo que realmente se envía permite detectar vulnerabilidades de confianza excesiva en la interfaz. Por ello, en este punto del temario se profundiza en el ciclo completo de envío de datos.

## Explicación y ejemplo

### Problema básico

Una aplicación de notas compartidas necesita recoger del usuario el título y el contenido de una nueva nota. El desafío no es solo mostrar campos de entrada, sino asegurar que el servidor reciba de forma predecible los valores que el usuario ha introducido.

### Responsabilidad del formulario

* **Control**: elemento HTML que permite al usuario introducir o seleccionar datos (`<input>`, `<textarea>`, `<select>`).
* **Nombre (`name`)**: identificador que el navegador utiliza como clave al serializar los datos.
* **Valor (`value`)**: contenido actual del control en el momento del envío.
* **Método**: `GET` o `POST` determina si los pares se envían en la línea de petición o en el cuerpo.

Solo los controles que poseen atributo `name` participan en la serialización. Los controles sin `name`, deshabilitados (`disabled`) o sin valor no aparecen en la petición.

### Serialización paso a paso

1. El usuario rellena los campos.
2. El usuario pulsa el botón de envío (`<button type="submit">`).
3. El navegador recorre el árbol DOM del formulario.
4. Para cada control con `name` y que no esté `disabled`, extrae su `value`.
5. Concatena pares `name=value` usando la codificación `application/x-www-form-urlencoded`.
6. Según el método, inserta la cadena en la URL (GET) o en el cuerpo (POST).

### Ejemplo concreto

```html
<form id="nota" action="/notas" method="POST">
  <label for="t">Título</label>
  <input id="t" type="text" name="title" value="Mi primera nota">
  <label for="c">Contenido</label>
  <textarea id="c" name="content">Contenido de la nota</textarea>
  <button type="submit">Guardar</button>
</form>
```

Supongamos que el usuario mantiene los valores mostrados y pulsa **Guardar**. El navegador genera la siguiente petición HTTP (formato abreviado):

```
POST /notas HTTP/1.1
Host: ejemplo.com
Content-Type: application/x-www-form-urlencoded
Content-Length: 53

title=Mi+primera+nota&content=Contenido+de+la+nota
```

Observaciones clave:

* La cadena del cuerpo está codificada; los espacios se convierten en `+` y los caracteres especiales en `%XX`.
* El nombre del control (`title`, `content`) aparece tal cual en la clave del par.
* Si se añadiera un `<input type="checkbox" name="public" checked>`, el par `public=on` se añadiría.
* Si se elimina el atributo `name` del segundo campo, el cuerpo resultante sería `title=Mi+primera+nota` y el contenido de la nota no se enviaría.

### Diferencias entre presentación y datos confiables

| Aspecto                     | Presentación (HTML)                              | Datos enviados al servidor                     |
|-----------------------------|--------------------------------------------------|-----------------------------------------------|
| Nombre del control          | Texto visible, etiqueta, placeholder            | Valor del atributo `name`                     |
| Valor visible al usuario    | Texto dentro del `<input>` o `<textarea>`       | Valor actual del control en el momento del envío |
| Validación visual           | `required`, `pattern`, mensajes de error CSS    | Debe repetirse en el servidor; la UI no garantiza integridad |
| Estado deshabilitado        | Apariencia gris, no interactivo                 | No se incluye en la petición                  |

### Flujo completo con diagrama textual

```
[Usuario] -> (rellena) -> [Navegador]
[Browser] -> (serializa) -> HTTP request
HTTP request -> (recepción) -> [Servidor]
[Servidor] -> (parsea cuerpo) -> pares nombre‑valor
```

El servidor, independientemente del lenguaje, debe interpretar la cadena del cuerpo según la misma codificación (`application/x-www-form-urlencoded`). En pseudocódigo genérico:

```pseudocode
params = parseUrlEncoded(request.body)
title  = params["title"]
content = params["content"]
// aplicar lógica de autorización y persistencia
```

Este flujo muestra que la única fuente fiable de información son los pares nombre‑valor; cualquier regla de autorización basada en la UI (por ejemplo, confiar en que un campo oculto indica el propietario) es insegura.

### Puntos de fallo comunes

* Olvidar el atributo `name` en un control nuevo → dato perdido.
* Usar el mismo `name` en varios controles sin comprender que el servidor recibirá varios valores bajo la misma clave.
* Confiar en campos `readonly` para evitar manipulaciones → el cliente puede modificar el valor antes de enviarlo.
* No especificar `method="POST"` para datos sensibles → los valores aparecen en la URL y pueden quedar registrados en logs.

### Resumen del proceso

1. Definir claramente cada control y su `name`.
2. Verificar que los valores relevantes tengan `name` y no estén `disabled`.
3. Seleccionar el método adecuado (POST para datos que no deben exponerse).
4. En el servidor, parsear la carga según la especificación y validar nuevamente.

Este análisis permite al alumno predecir con seguridad qué información llega al backend y por qué la capa de presentación no constituye una garantía de integridad.

## Práctica

**Tarea práctica**

1. Copie el siguiente fragmento HTML en un archivo local llamado `formulario.html` y ábralo en un navegador.

```html
<form action="/procesar" method="GET">
  <label>Usuario:<input type="text" name="user" value="alice"></label>
  <label>Edad:<input type="number" name="age" value="30"></label>
  <label>Comentario:<textarea>Sin comentario</textarea></label>
  <input type="checkbox" name="subscribe" checked>
  <button type="submit">Enviar</button>
</form>
```

2. Sin modificar el código, rellene los campos con valores diferentes y pulse **Enviar**. Observe la URL resultante en la barra de direcciones.

3. Anote la cadena de consulta completa. Identifique cuál de los controles no aparece en la URL y explique por qué.

4. Modifique el HTML añadiendo el atributo `name="comment"` al `<textarea>` y cambie el método del formulario a `POST`. Guarde los cambios y vuelva a enviar el formulario.

5. Abra las herramientas de desarrollo del navegador (pestaña *Network*), localice la petición y copie el cuerpo de la solicitud.

6. Redacte, en un documento de texto, las dos versiones de la petición (GET y POST) indicando claramente los pares nombre‑valor que el servidor recibiría en cada caso.

**Comprobación**

- Verifique que la cadena de consulta del primer envío contiene `user` y `age` pero no `comment`.
- Confirme que el cuerpo de la petición POST incluye los tres pares `user`, `age` y `comment` codificados correctamente.

Esta actividad permite al alumno predecir, observar y comparar el comportamiento real del navegador, reforzando la relación entre controles, nombres y valores enviados.

## Comprobaciones

1. ¿Qué pares nombre‑valor aparecen en la URL cuando el formulario del ejercicio se envía con método GET y el `<textarea>` no tiene atributo `name`?
Respuesta: `user=<valor>&age=<valor>` (solo los controles que poseen `name`).
2. Al cambiar el método a POST y añadir `name="comment"` al `<textarea>`, ¿cómo se envía la información de `comment`?
Respuesta: Como parte del cuerpo codificado `application/x-www-form-urlencoded`, por ejemplo `user=alice&age=30&comment=Sin+comentario&subscribe=on`.

## Cierre

La predicción precisa de los datos enviados permite diseñar validaciones y autorizaciones robustas. En la próxima lección se abordará el nombrado sistemático de cada control, lo que simplifica la extracción de información en el servidor y mejora la mantenibilidad del código.
