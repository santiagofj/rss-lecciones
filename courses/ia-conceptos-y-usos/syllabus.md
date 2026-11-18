---
schemaVersion: 1
steps:
  - id: que-llamamos-ia
    unitId: fundamentos
    topicId: que-llamamos-ia
    title: "Qué llamamos IA"
    objective: "Distinguir reglas escritas, clasificación aprendida y generación en tres herramientas conocidas."
    brief: "Comparar un linter con una regla fija, un filtro de spam hipotético entrenado con mensajes etiquetados y un asistente que propone un cambio de código. Identificar entrada, salida, origen del comportamiento y evidencia para comprobar cada resultado."
  - id: reglas-filtros-y-clasificacion
    unitId: fundamentos
    topicId: reglas-filtros-y-clasificacion
    title: "Reglas, filtros y clasificación"
    objective: "Distinguir una regla explícita de una decisión basada en un puntaje y explicar el efecto de cambiar el umbral."
    brief: "Usar seis correos ficticios con clases correctas y puntajes dados. Comparar una regla de remitente con dos umbrales. Contar falsos positivos y falsos negativos y explicar el costo de equivocarse en cada dirección."
  - id: aprender-de-ejemplos
    unitId: fundamentos
    topicId: aprender-de-ejemplos
    title: "Aprender de ejemplos, datos y redes neuronales"
    objective: "Explicar qué se modifica al entrenar un modelo y por qué se lo evalúa con ejemplos que no vio."
    brief: "Introducir datos, etiquetas, parámetros, entrenamiento y generalización mediante clasificación de textos. Describir una red neuronal como una composición de transformaciones con parámetros aprendidos. Mostrar cómo los datos poco representativos pueden afectar la evaluación."
  - id: predecir-y-generar
    unitId: fundamentos
    topicId: predecir-y-generar
    title: "Predecir y generar en un mismo producto"
    objective: "Reconocer tareas de clasificación, estimación y generación en una interfaz que combina varias técnicas."
    brief: "Descomponer una mesa de ayuda en clasificación de tickets, estimación del tiempo de resolución y borrador de respuesta. Explicar cómo cada salida exige una evaluación distinta. Integrar reglas y aprendizaje en el mismo ejemplo."
  - id: entrenamiento-e-inferencia
    unitId: modelos-de-lenguaje
    topicId: entrenamiento-e-inferencia
    title: "Entrenamiento e inferencia"
    objective: "Ubicar entrenamiento, inferencia y contexto al analizar una respuesta de un modelo de lenguaje."
    brief: "Distinguir los parámetros aprendidos de las instrucciones y el contenido que recibe el modelo en una ejecución. Definir LLM y explicar cómo una aplicación puede combinar el modelo con herramientas. Usar un pedido de refactor con requisitos agregados al prompt."
  - id: tokens-y-generacion
    unitId: modelos-de-lenguaje
    topicId: tokens-y-generacion
    title: "Tokens y generación paso a paso"
    objective: "Explicar qué es un token y cómo se produce texto a partir de sucesivas distribuciones de probabilidad."
    brief: "Ilustrar la segmentación con un ejemplo didáctico e indicar que cada tokenizador puede segmentar distinto. Mostrar dos continuaciones posibles para un fragmento breve. Introducir el muestreo y explicar por qué un resultado probable puede ser incorrecto."
  - id: contexto-historial-y-memoria
    unitId: modelos-de-lenguaje
    topicId: contexto-historial-y-memoria
    title: "Ventana de contexto, historial y memoria"
    objective: "Determinar qué información debe estar disponible para que el modelo pueda usarla en un turno."
    brief: "Comparar lo que muestra la interfaz con la información que el sistema puede seleccionar y pasar al modelo. Usar un chat donde una versión de Node aparece al inicio y cambia más tarde. Explicar resúmenes y memoria gestionada por la aplicación como mecanismos posibles."
  - id: elegir-otro-modelo
    unitId: modelos-de-lenguaje
    topicId: elegir-otro-modelo
    title: "Qué puede cambiar al elegir otro modelo"
    objective: "Comparar dos modelos para una tarea específica con criterios que se puedan observar."
    brief: "Usar la misma consigna de programación y los mismos datos para comparar seguimiento de instrucciones, aciertos sobre casos límite y claridad. Explicar qué capacidades dependen del modelo y qué depende de la aplicación. Registrar variantes de salida y evitar generalizar a partir de un solo ejemplo."
  - id: prompts-y-ejemplos
    unitId: usos
    topicId: prompts-y-ejemplos
    title: "Prompts con objetivo, restricciones y ejemplos"
    objective: "Redactar una consigna con una salida verificable y mejorarla a partir de un error concreto."
    brief: "Transformar un pedido vago de resumen en una instrucción con propósito, texto de entrada, límites y un ejemplo. Mantener las restricciones que cambian el resultado. Comparar dos versiones con los mismos casos, incluido un dato ausente."
  - id: api-y-resultado-estructurado
    unitId: usos
    topicId: api-y-resultado-estructurado
    title: "Usar un modelo por API y pedir JSON"
    objective: "Distinguir la validez de un JSON, el cumplimiento de su esquema y la exactitud de sus datos."
    brief: "Usar una solicitud y una respuesta ficticias para extraer campos de un ticket. Explicar API, autenticación como concepto y validación de esquema. Incluir una salida bien formada con un dato inventado y una prueba para detectarlo."
  - id: vision-y-generacion-de-imagenes
    unitId: usos
    topicId: vision-y-generacion-de-imagenes
    title: "Interpretar imágenes y crear imágenes nuevas"
    objective: "Elegir entre describir, extraer información, editar y generar una imagen."
    brief: "Usar una captura ficticia de interfaz y un boceto. Diferenciar la lectura visual de texto, el análisis de una escena y la generación o edición. Verificar etiquetas, cantidades y correspondencia con instrucciones mediante una lista simple."
  - id: transcripcion-sintesis-y-audio
    unitId: usos
    topicId: transcripcion-sintesis-y-audio
    title: "Transcribir, sintetizar y analizar audio"
    objective: "Distinguir audio a texto, texto a voz y análisis del contenido sonoro según entrada y salida."
    brief: "Usar una grabación de ejemplo con un nombre propio y una cifra. Comprobar esos datos escuchando el tramo correspondiente. Integrar las modalidades de este bloque al diseñar una ficha que incluya imagen, transcripción y una salida JSON comprobada."
  - id: consultar-un-pdf
    unitId: informacion
    topicId: consultar-un-pdf
    title: "Consultar un PDF y comprobar las páginas citadas"
    objective: "Preparar una consulta sobre un documento y verificar una respuesta contra el pasaje original."
    brief: "Usar un PDF ficticio de dos páginas. Distinguir archivo con capa de texto y página escaneada que requiere OCR. Pedir citas con número de página, comprobarlas y distinguir falta de evidencia de ausencia confirmada. Examinar permisos e implicaciones de cargar documentos privados."
  - id: buscar-y-verificar-fuentes
    unitId: informacion
    topicId: buscar-y-verificar-fuentes
    title: "Buscar en la web y distinguir fuentes"
    objective: "Rastrear una afirmación hasta una fuente primaria y comprobar si la respalda para la fecha y el contexto pertinentes."
    brief: "Usar un ejemplo de versión de software con un anuncio oficial, una página de documentación y un comentario de terceros. Separar recuperación de información y redacción. Verificar la afirmación en la página original y explicar el límite de una cita que sólo parece pertinente."
  - id: embeddings-y-rag
    unitId: informacion
    topicId: embeddings-y-rag
    title: "Embeddings, recuperación semántica y RAG"
    objective: "Dibujar el flujo de una consulta RAG y localizar si un fallo ocurrió al recuperar o al redactar."
    brief: "Explicar fragmentación, embeddings como representaciones numéricas, similitud, recuperación y generación aumentada por recuperación. Usar una consulta sobre documentación con una excepción en otra sección y revisar qué fragmentos llegaron al modelo."
  - id: contexto-rag-y-ajuste-fino
    unitId: informacion
    topicId: contexto-rag-y-ajuste-fino
    title: "Elegir entre contexto, RAG y ajuste fino"
    objective: "Seleccionar un enfoque para tres problemas según el tamaño de los datos, la necesidad de actualizarlos y el comportamiento buscado."
    brief: "Comparar leer un PDF breve, consultar manuales que cambian y ajustar un estilo de clasificación con ejemplos etiquetados. Explicar ajuste fino como entrenamiento adicional y distinguir el efecto en parámetros, evidencia disponible y mantenimiento."
  - id: herramientas-y-permisos
    unitId: automatizacion
    topicId: herramientas-y-permisos
    title: "Herramientas y permisos para redactar, revisar y enviar"
    objective: "Distinguir texto generado, solicitud de llamada, resultado de la herramienta y efecto externo."
    brief: "Simular un correo con destinatario ficticio. Separar redactar, revisar, confirmar, enviar y verificar el recibo de la API. Explicar que la aplicación controla las herramientas y sus permisos. Incluir el caso en que el envío falla."
  - id: que-conecta-mcp
    unitId: automatizacion
    topicId: que-conecta-mcp
    title: "Qué conecta MCP"
    objective: "Identificar qué hace el protocolo MCP, qué hace el servidor y qué controla la aplicación que usa el modelo."
    brief: "Usar un diagrama textual con una aplicación que consulta una herramienta de documentos. Definir Model Context Protocol en términos de intercambio entre sistemas y explicar sus herramientas y recursos con un ejemplo. Usar como referencia oficial https://modelcontextprotocol.io/docs/getting-started/intro si respalda la explicación."
  - id: flujos-y-agentes
    unitId: automatizacion
    topicId: flujos-y-agentes
    title: "Flujos definidos y agentes con decisiones delegadas"
    objective: "Clasificar dos automatizaciones según quién determina los próximos pasos y bajo qué límites."
    brief: "Comparar un proceso de soporte con pasos predefinidos y un asistente autorizado a decidir qué documentación consultar según la consulta. Describir el ciclo de acción y observación, criterios de finalización y límites de permisos."
  - id: aprobacion-y-verificacion
    unitId: automatizacion
    topicId: aprobacion-y-verificacion
    title: "Diseñar un flujo con aprobación humana"
    objective: "Especificar cuándo debe detenerse un flujo para pedir aprobación y cómo confirmar el resultado de una acción."
    brief: "Reunir herramientas, permisos y decisiones con un borrador de correo revisable. Probar destinatario ambiguo, aprobación rechazada y un envío con respuesta incierta. Explicar cómo identificar una operación previa antes de reintentar para evitar duplicados."
  - id: errores-plausibles-y-evidencia
    unitId: evaluacion
    topicId: errores-plausibles-y-evidencia
    title: "Errores plausibles, pruebas y fuentes primarias"
    objective: "Verificar de forma independiente una respuesta convincente y señalar qué partes siguen sin evidencia."
    brief: "Presentar dos respuestas incompatibles a una misma consulta. Verificar un fragmento de código con casos normales y casos límite, y una afirmación documental con el pasaje que le corresponde. Dar nombre a las alucinaciones sin atribuir intenciones al modelo."
  - id: casos-de-evaluacion
    unitId: evaluacion
    topicId: casos-de-evaluacion
    title: "Diseñar casos de evaluación para código y documentos"
    objective: "Preparar un conjunto pequeño de entradas, resultados esperados y condiciones de aceptación."
    brief: "Construir casos típicos, ambiguos y límite. Incluir la ausencia de un dato y una respuesta que debería expresar incertidumbre. Separar verificaciones automáticas de revisión humana y registrar desacuerdos."
  - id: calidad-privacidad-costo-latencia
    unitId: evaluacion
    topicId: calidad-privacidad-costo-latencia
    title: "Comparar calidad, privacidad, costo y latencia"
    objective: "Elegir una opción de ejecución de un modelo según los requisitos de una tarea definida."
    brief: "Comparar opciones hipotéticas de ejecución local y API con mediciones dadas. Estimar costo a partir de entradas y salidas con tarifas ficticias. Evaluar calidad, tiempo de respuesta, datos que salen del equipo y mantenimiento."
  - id: integrar-y-evaluar-un-asistente
    unitId: evaluacion
    topicId: integrar-y-evaluar-un-asistente
    title: "Integración: elegir y evaluar un asistente para una tarea propia"
    objective: "Justificar un diseño completo a partir de una tarea, sus fuentes, permisos y resultados de prueba."
    brief: "Elegir una consulta de documentación o una tarea de programación. Escribir criterios de éxito, seleccionar modelo y técnicas, definir fuentes y permisos, y ejecutar una comparación pequeña. Documentar resultados y qué información falta antes de automatizar una acción externa."
---

# IA, conceptos y usos

Recorrido diario de 24 pasos. Empieza por mecanismos que aparecen en herramientas conocidas y termina con la evaluación de un asistente en una tarea concreta. Cada entrega incorpora una práctica y dos comprobaciones. Los ejercicios de cierre integran lo aprendido en cada bloque.
