---
schemaVersion: 1
id: c9507b32-9856-47e5-bb31-c0d00b92c5e7
sequence: 7
course: ia-conceptos-y-usos
stepId: contexto-historial-y-memoria
title: Ventana de contexto, historial y memoria
publishedAt: 2026-11-24T13:26:55.300Z
generationDate: 2026-11-24
summary: Esta lección analiza qué información debe estar disponible para que un
  modelo de lenguaje la utilice en un turno de interacción. Se comparan los
  datos mostrados en la interfaz de chat con los que el sistema puede
  seleccionar y pasar al modelo, y se describen los mecanismos de resumen y
  memoria gestionada por la aplicación como estrategias para ampliar la ventana
  de contexto.
generation:
  model: openai/gpt-oss-120b
  promptVersion: v5
  contextHash: 5ca44c855a308b3f347edad61229a2fb1189f3d8dc8d51686efe03ef5e3d1a17
---

## Por qué ahora

En los últimos años la capacidad de los modelos de lenguaje para manejar grandes volúmenes de texto ha mejorado significativamente, pero la ventana de contexto sigue siendo limitada por arquitectura y coste computacional. Los desarrolladores que integran estos modelos en aplicaciones de asistencia programática necesitan decidir con precisión qué fragmentos de información incluir en cada petición, de modo que el modelo produzca respuestas coherentes y útiles. Además, la gestión explícita del historial y de la memoria permite crear experiencias de conversación continuas sin perder información esencial, un requisito cada vez más frecuente en entornos productivos donde los usuarios dependen de respuestas consistentes a lo largo de sesiones prolongadas.

## Explicación y ejemplo

### Ventana de contexto y su limitación
La ventana de contexto es la cantidad máxima de tokens que el modelo puede procesar en una única llamada. Por ejemplo, un modelo con una ventana de 8 000 tokens puede recibir como entrada hasta ese número, combinando el prompt del sistema, los mensajes del historial y cualquier dato adicional. Si la suma supera el límite, el modelo recortará los tokens más antiguos o menos relevantes, lo que puede provocar pérdida de información crucial.

### Diferencia entre lo que muestra la interfaz y lo que el modelo recibe
Una interfaz de chat suele presentar al usuario una lista completa de mensajes anteriores. Sin embargo, el backend que envía la solicitud al modelo decide qué mensajes incluir. En una aplicación típica, se pueden aplicar políticas como:
- **Mantener los últimos N mensajes** (p. ej., los últimos 5 intercambios).
- **Incluir siempre el mensaje inicial del sistema** que establece el rol y las instrucciones.
- **Agregar datos externos** (fragmentos de documentos, resultados de búsqueda) que el modelo necesita para la respuesta actual.

### Caso práctico: versión de Node que cambia durante la conversación
Supongamos que el usuario inicia una sesión con el mensaje:
```
[Usuario] Necesito un script que detecte la versión de Node instalada y, si es menor que 16, indique cómo actualizarla.
``` 
El asistente responde con un fragmento de código y, al final, incluye la versión detectada (por ejemplo, "Node v14.17.0"). En un turno posterior, el usuario dice:
```
[Usuario] Ahora quiero añadir una verificación para que, si la versión es 16 o superior, el script imprima "Entorno compatible".
``` 
Si la aplicación solo envía al modelo los últimos dos mensajes, el modelo olvidará la versión detectada inicialmente y no podrá comparar correctamente. Para evitarlo, la aplicación debe **persistir la información de la versión** en el prompt o en una memoria estructurada y volver a inyectarla en la solicitud.

### Estrategias de manejo de información
1. **Resúmenes** – Cuando el historial completo supera la ventana, se puede generar un resumen condensado de los intercambios anteriores y enviarlo como parte del prompt. El resumen debe contener los hechos relevantes (por ejemplo, "versión detectada: v14.17.0").
2. **Memoria gestionada por la aplicación** – En lugar de confiar en que el modelo recuerde datos, la aplicación almacena pares clave‑valor (por ejemplo, `{"node_version":"v14.17.0"}`) y los incluye explícitamente en cada petición que lo requiera.
3. **Chunking de documentos** – Si se necesita consultar un documento extenso, se divide en fragmentos y se envía solo el fragmento más relevante al modelo, junto con un breve contexto que indique su posición dentro del documento.

### Flujo de datos típico
1. **Entrada del usuario** → mensaje de texto.
2. **Recopilación de contexto** → historial recortado, datos persistidos, resúmenes, fragmentos externos.
3. **Construcción del prompt** → concatenación de sistema, historial, contexto adicional.
4. **Llamada al modelo** → envío de `messages` (lista de objetos `role`/`content`).
5. **Respuesta** → se muestra al usuario y, opcionalmente, se actualiza la memoria de la aplicación.

### Límites y consideraciones
- **Costo**: Cada token adicional incrementa el coste de la llamada y el tiempo de respuesta.
- **Latencia**: Incluir grandes bloques de texto aumenta la latencia; los resúmenes reducen este efecto.
- **Consistencia**: La forma en que se decide qué información conservar afecta la reproducibilidad de la conversación. Es recomendable definir políticas determinísticas (p. ej., siempre incluir el mensaje de sistema y los últimos N mensajes).
- **Privacidad**: Cuando se manejan datos sensibles, la aplicación debe filtrar o anonimizar la información antes de enviarla al modelo.

### Implementación mínima en JavaScript (Node.js)
```js
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const fetch = require('node-fetch');

let memory = { node_version: null };
let history = [];

async function chat(userMessage) {
  // Actualizar historial
  history.push({ role: 'user', content: userMessage });

  // Preparar contexto adicional
  const extra = [];
  if (memory.node_version) {
    extra.push(`Versión de Node almacenada: ${memory.node_version}`);
  }

  // Construir prompt limitado a 3000 tokens (aprox.)
  const prompt = [
    { role: 'system', content: 'Eres un asistente de programación que ayuda a gestionar versiones de Node.' },
    ...history.slice(-5), // últimos 5 intercambios
    ...extra.map(text => ({ role: 'assistant', content: text }))
  ];

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({ model: 'gpt-4o-mini', messages: prompt })
  });

  const data = await response.json();
  const answer = data.choices[0].message.content;
  history.push({ role: 'assistant', content: answer });

  // Detectar versión en la respuesta (expresión regular simple)
  const match = answer.match(/v(\d+\.\d+\.\d+)/);
  if (match) {
    memory.node_version = `v${match[1]}`;
  }

  return answer;
}
```
En este ejemplo la variable `memory` actúa como memoria gestionada por la aplicación: conserva la versión detectada y la re‑inyecta en cada solicitud posterior. El historial se recorta a los últimos cinco intercambios para respetar la ventana de contexto, mientras que el mensaje del sistema permanece constante.

### Resumen de los mecanismos
- **Ventana de contexto**: límite técnico que obliga a seleccionar cuidadosamente la información enviada.
- **Historial recortado**: estrategia sencilla pero que puede perder datos críticos.
- **Resumen**: compresión de información pasada para mantener la esencia dentro del límite.
- **Memoria gestionada**: almacenamiento explícito de datos estructurados que se añaden a cada prompt según sea necesario.
- **Chunking**: división de documentos extensos en fragmentos relevantes.

Estos mecanismos combinados permiten que la aplicación ofrezca respuestas coherentes aun cuando la ventana de contexto sea restringida, garantizando que la información esencial permanezca accesible para el modelo en cada turno.

## Práctica

1. **Configura el entorno**
   - Instala Node.js (versión 18 o superior) y el paquete `node-fetch`.
   - Crea un archivo `chat.js` y copia el fragmento de código proporcionado en la sección de explicación.
2. **Ejecuta una conversación inicial**
   - Inicia el proceso con la pregunta: "¿Cuál es la versión de Node instalada en este sistema?".
   - Observa que el asistente responde con la versión detectada y que la variable `memory.node_version` se actualiza.
3. **Amplía la interacción**
   - Envía un segundo mensaje: "Si la versión es menor que 16, muestra cómo actualizarla; si es 16 o mayor, indica que el entorno es compatible".
   - Verifica que la respuesta del asistente utilice la versión almacenada en `memory` para decidir el flujo lógico.
4. **Implementa un resumen**
   - Modifica el código para que, después de tres intercambios, el historial completo se reemplace por un resumen breve que incluya la versión de Node y los objetivos de la conversación.
   - Prueba enviando un cuarto mensaje que dependa del resumen (por ejemplo, "¿Cuál era el objetivo de la última instrucción?").
5. **Comprueba la consistencia**
   - Añade al final del script una impresión de la variable `memory` y del contenido del resumen generado.
   - Asegúrate de que los datos persisten y que el modelo sigue respondiendo correctamente.

Realiza estos pasos en tu máquina local y registra los resultados. La evidencia observable debe ser la salida en consola que muestra la versión detectada, la respuesta condicional basada en esa versión y el contenido del resumen después de recortar el historial. Esta práctica consolida la comprensión de cómo seleccionar y preservar información relevante dentro de la ventana de contexto.

**Entrega**: captura de pantalla o registro de consola que demuestre los tres intercambios y la actualización de la memoria, junto con el resumen final.

## Comprobaciones

1. ¿Qué mecanismo permite que una aplicación conserve información importante entre turnos sin depender de la capacidad de memoria interna del modelo?
Respuesta: Memoria gestionada por la aplicación (almacenamiento explícito de datos estructurados que se inyectan en cada petición).
2. Si la ventana de contexto es de 8 000 tokens y el historial acumulado supera ese número, ¿cuál es una estrategia recomendada para evitar la pérdida de datos críticos?
Respuesta: Generar un resumen condensado del historial que incluya los hechos relevantes y enviarlo como parte del prompt en lugar de transmitir todos los mensajes originales.

## Cierre

En la siguiente lección se profundizará en los mecanismos de resumen automático y en cómo diseñar prompts que integren información estructurada de forma eficiente. Se presentarán patrones para combinar resúmenes con memoria gestionada, facilitando conversaciones largas sin exceder los límites de la ventana de contexto. Continúe explorando la interacción entre historial, resúmenes y memoria para optimizar la fiabilidad de los asistentes de programación.
