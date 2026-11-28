---
schemaVersion: 1
id: 083c0595-cf90-4315-9ca6-b2f7a908aa72
sequence: 10
course: ia-conceptos-y-usos
stepId: api-y-resultado-estructurado
title: Usar un modelo por API y pedir JSON
publishedAt: 2026-11-28T11:30:31.774Z
generationDate: 2026-11-27
summary: Esta lección muestra cómo solicitar a un modelo de lenguaje mediante
  una API una respuesta estructurada en JSON, validar su conformidad con un
  esquema y verificar la exactitud de los datos extraídos de un ticket ficticio.
  Se explica el proceso paso a paso, se ofrece un ejemplo reproducible y se
  propone una práctica concreta para afianzar la habilidad de distinguir JSON
  válido, detectar desviaciones y aplicar validaciones automáticas.
generation:
  model: openai/gpt-oss-120b
  promptVersion: v5
  contextHash: 1fc342c87d8bba7ea68ae1e5de562027468167832eb249ca5a0cad044db16b17
---

## Por qué ahora

En entornos de desarrollo profesional la interacción con modelos de lenguaje se realiza frecuentemente a través de servicios web. La capacidad de exigir una respuesta en formato JSON permite integrar la salida del modelo directamente en pipelines de datos, bases de datos o sistemas de tickets. Un JSON bien formado reduce la necesidad de procesamiento posterior y minimiza errores de interpretación que pueden generar retrabajo o decisiones equivocadas. Además, la validación del esquema es una práctica de calidad de software que garantiza que la información requerida está presente y tiene el tipo esperado antes de su uso en producción. Dominar estos conceptos ahora prepara al lector para construir aplicaciones confiables y escalables que dependan de IA.

## Explicación y ejemplo

### Concepto de solicitud a la API

Una API (Application Programming Interface) expone un punto de acceso HTTP al que se envía una petición **POST** con un cuerpo que contiene el *prompt* para el modelo. El encabezado `Content-Type: application/json` indica que la carga está codificada en JSON. En la respuesta, el modelo devuelve un objeto JSON que debe respetar un esquema predefinido.

### Definición del esquema JSON

Para el caso del ticket, el esquema puede describirse como:
```json
{
  "type": "object",
  "properties": {
    "id": {"type": "string"},
    "asunto": {"type": "string"},
    "prioridad": {"type": "string", "enum": ["baja","media","alta"]},
    "fecha": {"type": "string", "format": "date"},
    "estado": {"type": "string", "enum": ["abierto","en progreso","cerrado"]}
  },
  "required": ["id","asunto","prioridad","fecha","estado"]
}
```
El esquema define tipos, valores permitidos y campos obligatorios. La validación asegura que cualquier respuesta que falte un campo o presente un valor fuera del conjunto permitido sea rechazada.

### Ejemplo concreto de petición y respuesta

Supongamos que el asistente recibe la instrucción:
> *"Dame los datos del ticket 8421 en formato JSON siguiendo el esquema anterior"*

El modelo genera la siguiente salida:
```json
{
  "id": "8421",
  "asunto": "Error al exportar informe PDF",
  "prioridad": "alta",
  "fecha": "2023-07-15",
  "estado": "en progreso"
}
```
En este caso, la respuesta cumple con el esquema: todos los campos están presentes, los tipos coinciden y los valores de `prioridad` y `estado` pertenecen a los enumerados. Si el modelo devolviera, por ejemplo, `"prioridad": "urgente"`, la validación fallaría porque `urgente` no está en la lista permitida.

### Proceso de validación automática

En Python se puede usar la biblioteca **jsonschema**:
```python
import json, jsonschema

esquema = { ... }  # esquema anterior
respuesta = '''{...}'''  # cadena JSON devuelta por el modelo

obj = json.loads(respuesta)
try:
    jsonschema.validate(instance=obj, schema=esquema)
    print("JSON válido")
except jsonschema.exceptions.ValidationError as e:
    print("Error de validación:", e.message)
```
Si la validación pasa, el programa continúa con la lógica de negocio (por ejemplo, actualizar la base de tickets). Si falla, se registra el error y se solicita al modelo una corrección, cerrando el ciclo de retroalimentación.

### Observabilidad del resultado

Para comprobar que la información es correcta, se pueden comparar los valores extraídos con datos de referencia conocidos. En el ejemplo, el `id` debe coincidir con el número solicitado, la `fecha` debe respetar el formato ISO (`YYYY-MM-DD`) y la `prioridad` debe reflejar la urgencia asignada en el sistema de gestión. Estas comprobaciones permiten detectar desviaciones sin inspeccionar manualmente todo el JSON.

### Límites del enfoque

* **Longitud del prompt**: si la descripción del esquema es muy extensa, puede consumir parte de la ventana de contexto del modelo y reducir la capacidad de generar la respuesta completa.
* **Ambigüedad del enunciado**: el modelo necesita instrucciones claras que indiquen *exactamente* el formato esperado; de lo contrario puede agregar texto explicativo antes o después del JSON, lo que rompe la parsabilidad.
* **Capacidad de razonamiento**: el modelo no verifica internamente la consistencia de los datos más allá de la forma; por eso la validación estructural es indispensable.

### Resumen del flujo

1. Definir el esquema JSON que describe la salida esperada.
2. Formular la solicitud a la API indicando que la respuesta debe respetar ese esquema.
3. Recibir la cadena JSON y parsearla.
4. Validar contra el esquema con una herramienta automática.
5. Realizar comprobaciones de dominio (coherencia de valores, formato de fechas, etc.).
6. Actuar según el resultado: usar la data o solicitar corrección.

Este flujo constituye una práctica estándar para integrar modelos de lenguaje en sistemas productivos donde la precisión de los datos es crítica.

## Práctica

### Tarea práctica

1. **Crear el esquema**
   - Copie el bloque JSON del apartado "Definición del esquema JSON" en un archivo llamado `esquema_ticket.json`.
2. **Simular una respuesta del modelo**
   - Guarde la siguiente cadena en un archivo `respuesta.json`:
   ```json
   {
     "id": "5274",
     "asunto": "Fallo al sincronizar calendario",
     "prioridad": "media",
     "fecha": "2024-03-02",
     "estado": "abierto"
   }
   ```
   - Modifique manualmente uno de los valores para introducir un error (por ejemplo, cambie `"prioridad": "media"` a `"prioridad": "crítica"`).
3. **Validar con Python**
   - Instale la librería `jsonschema` (`pip install jsonschema`).
   - Escriba el siguiente script `validar_ticket.py`:
   ```python
   import json, jsonschema, sys

   # Cargar esquema y respuesta
   with open('esquema_ticket.json') as f:
       esquema = json.load(f)
   with open('respuesta.json') as f:
       respuesta = json.load(f)

   # Validación estructural
   try:
       jsonschema.validate(instance=respuesta, schema=esquema)
       print('✅ JSON válido según el esquema')
   except jsonschema.exceptions.ValidationError as e:
       print('❌ Error de validación:', e.message)
       sys.exit(1)

   # Comprobaciones de dominio
   if respuesta['id'] != '5274':
       print('❌ El id no coincide con el solicitado')
   else:
       print('✅ El id es correcto')
   ```
   - Ejecute el script. Observe el mensaje de error cuando la prioridad sea incorrecta y corríjalo para obtener la salida "✅ JSON válido según el esquema" seguida de "✅ El id es correcto".
4. **Reflexión**
   - Anote en un breve documento (máximo 200 palabras) qué pasos fueron necesarios para detectar el error y por qué la validación estructural no habría capturado una inconsistencia lógica como una fecha futura que no tiene sentido en su contexto.
   - Comparta el documento con un compañero de estudio o en el foro del curso para recibir retroalimentación.

Esta práctica cubre todo el ciclo: definición del esquema, generación (simulada) de la respuesta, validación automática y verificación de negocio. Al completarla, el alumno habrá adquirido una herramienta reproducible para asegurar la calidad de los datos que provienen de modelos de lenguaje.

## Comprobaciones

1. ¿Qué campo del esquema define los valores aceptados para la prioridad?
Respuesta: El campo `prioridad` incluye la clave `enum` con los valores `"baja","media","alta"`.
2. Si la respuesta JSON contiene la fecha "2024-13-01", ¿qué tipo de error se producirá al validar con jsonschema?
Respuesta: Se producirá un error de validación de formato porque el valor no cumple con el patrón ISO `date` (mes 13 no es válido).

## Cierre

Con la capacidad de solicitar JSON estructurado y validar su conformidad, el alumno dispone de un mecanismo robusto para integrar modelos de lenguaje en procesos automatizados. La siguiente lección ampliará el tema al incorporar recuperación aumentada (RAG), donde la información extraída de documentos externos se combina con la salida del modelo para enriquecer respuestas más complejas.
