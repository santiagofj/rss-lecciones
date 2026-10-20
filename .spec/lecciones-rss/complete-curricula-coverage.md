# Cobertura de los cursos ampliados

Implementación de [la enmienda aprobada](complete-curricula.spec.md). Cada fila define un paso del recorrido; no acredita que se haya generado o estudiado. Las primeras 14 se conservan íntegramente.

## audio-digital: 86 lecciones en total

Resultado: Comprender la representación y reproducción del audio digital, documentar una cadena y justificar diagnósticos y comparaciones con evidencia y límites claros.

### Señal, nivel y representación (15–20)

| Lección | Paso | Objetivo observable |
|---|---|---|
| 15 | Leer amplitud y frecuencia | Relacionar una onda con su nivel y altura sin confundirlos. |
| 16 | Comprender período y fase | Predecir qué ocurre al desplazar o invertir una señal. |
| 17 | Separar canales y escena estéreo | Explicar qué contienen los canales izquierdo y derecho. |
| 18 | Entender una escala en decibelios | Interpretar relaciones de nivel sin tratar los decibelios como unidades absolutas. |
| 19 | Separar dBFS de volumen acústico | Explicar por qué un mismo archivo puede escucharse a distintos niveles. |
| 20 | Integrar el vocabulario de la señal | Describir una señal usando magnitudes y referencias correctas. |

### Muestreo y reconstrucción (21–27)

| Lección | Paso | Objetivo observable |
|---|---|---|
| 21 | Qué representa una muestra | Interpretar una secuencia de muestras como medidas en instantes definidos. |
| 22 | Relacionar banda y frecuencia de muestreo | Justificar el límite de banda de una representación muestreada. |
| 23 | Reconocer aliasing | Predecir una frecuencia aparente al muestrear una señal inadecuadamente. |
| 24 | Por qué se filtra antes de muestrear | Ubicar el filtrado necesario antes de una conversión o reducción de frecuencia. |
| 25 | Reconstruir una onda continua | Explicar por qué el audio reconstruido no es una escalera de muestras. |
| 26 | Elegir una frecuencia de muestreo | Justificar una elección según contenido, procesamiento y destino. |
| 27 | Diagnosticar un problema de muestreo | Separar aliasing, remuestreo y diferencias de visualización. |

### Cuantización, profundidad y dither (28–34)

| Lección | Paso | Objetivo observable |
|---|---|---|
| 28 | Representar amplitudes con valores finitos | Calcular un redondeo sencillo y explicar el error resultante. |
| 29 | Escuchar e interpretar el error de cuantización | Distinguir error dependiente de la señal de un ruido idealizado. |
| 30 | Relacionar bits y rango dinámico | Explicar qué permite una mayor profundidad y qué no mejora por sí sola. |
| 31 | Seguir una señal de nivel muy bajo | Razonar sobre detalle, ruido y audibilidad sin usar la imagen de escalones audibles. |
| 32 | Para qué sirve el dither | Explicar cómo añadir ruido controlado puede reducir distorsión de cuantización. |
| 33 | Separar dither y noise shaping | Distinguir la aleatorización del error de su distribución espectral. |
| 34 | Preparar una reducción de profundidad | Decidir dónde y cuándo aplicar dither en una cadena concreta. |

### Formatos y compresión (35–40)

| Lección | Paso | Objetivo observable |
|---|---|---|
| 35 | Separar muestras, códec y contenedor | Explicar qué describe PCM y qué aporta un archivo WAV o AIFF. |
| 36 | Qué conserva FLAC o ALAC | Verificar conceptualmente la igualdad de muestras tras decodificar. |
| 37 | Cómo funciona la compresión con pérdidas | Relacionar bitrate, decisiones perceptuales y descarte irreversible. |
| 38 | Separar máster y formato de distribución | Identificar variables confundidas al comparar dos ediciones. |
| 39 | Situar DSD y PCM | Describir diferencias de representación y procesamiento sin jerarquías automáticas. |
| 40 | Diseñar una política de archivos | Justificar formatos para archivo, reproducción y entrega. |

### Procesamiento de señal (41–47)

| Lección | Paso | Objetivo observable |
|---|---|---|
| 41 | Seguir una ganancia digital | Predecir cómo una ganancia cambia muestras y picos. |
| 42 | Entender el margen de procesamiento | Distinguir representación interna de límites de entrada y salida. |
| 43 | Leer un ecualizador paramétrico | Relacionar frecuencia, ganancia y ancho de banda con una intervención. |
| 44 | Relacionar filtro y respuesta | Reconocer paso bajo, paso alto y variaciones de pendiente. |
| 45 | Evaluar una conversión de frecuencia | Identificar filtrado, aliasing y límites de una prueba de remuestreo. |
| 46 | Decidir el orden del procesamiento | Justificar por qué el orden de algunas operaciones importa. |
| 47 | Preparar una cadena DSP controlada | Documentar transformaciones, margen y comparación de nivel. |

### Dinámica y sonoridad (48–53)

| Lección | Paso | Objetivo observable |
|---|---|---|
| 48 | Separar nivel medio y pico | Explicar por qué dos señales con igual pico pueden sonar distintas. |
| 49 | Interpretar medidas de sonoridad | Distinguir medidas momentáneas, de corto plazo e integradas. |
| 50 | Describir dinámica y factor de cresta | Separar contraste musical, rango medido y diferencia entre picos y promedio. |
| 51 | Aplicar normalización sin confusiones | Explicar una corrección de ganancia por pista o por álbum. |
| 52 | Entender compresor y limitador | Predecir cambios de envolvente y picos según una regla simple. |
| 53 | Comparar dos versiones con nivel controlado | Preparar una comparación sin confundir más fuerte con mejor. |

### Conversión e interfaces (54–60)

| Lección | Paso | Objetivo observable |
|---|---|---|
| 54 | Ubicar la conversión analógica digital | Explicar qué responsabilidades tiene cada etapa de captura. |
| 55 | Ubicar la conversión digital analógica | Separar recepción de datos, reconstrucción y etapa de salida. |
| 56 | Separar reloj y datos | Explicar el concepto de jitter y dónde importa su efecto temporal. |
| 57 | Seguir una ruta USB de audio | Distinguir datos, buffers, sincronización y alimentación. |
| 58 | Comparar transportes S/PDIF | Identificar restricciones de formato, sincronización y aislamiento. |
| 59 | Distinguir ruido digital y analógico | Aislar un zumbido o interferencia sin cambiar varias variables. |
| 60 | Elegir una interfaz por requisitos | Justificar una ruta por compatibilidad y evidencia. |

### Reproducción local y por red (61–66)

| Lección | Paso | Objetivo observable |
|---|---|---|
| 61 | Organizar una biblioteca verificable | Distinguir identidad musical, archivos y etiquetas. |
| 62 | Relacionar buffer, latencia y cortes | Explicar el compromiso entre tolerancia a retrasos y respuesta. |
| 63 | Seguir audio por una red | Separar transferencia de archivos, reproducción y conversión. |
| 64 | Inspeccionar una ruta de streaming | Reconocer procesamiento y conversiones declaradas por la aplicación. |
| 65 | Documentar perfiles de reproducción | Preparar una configuración de referencia y otra con procesamiento intencional. |
| 66 | Resolver cortes sin perder la referencia | Diseñar un diagnóstico de fuente, red, buffer y salida. |

### Medición y comparación (67–72)

| Lección | Paso | Objetivo observable |
|---|---|---|
| 67 | Interpretar una forma de onda | Reconocer límites de una vista de amplitud en el tiempo. |
| 68 | Leer un espectro | Relacionar ejes, picos y resolución con el análisis realizado. |
| 69 | Leer un espectrograma | Seguir contenido espectral a lo largo del tiempo. |
| 70 | Diseñar una prueba de nulidad | Comparar señales alineadas e interpretar el residuo. |
| 71 | Verificar equivalencia de audio | Elegir una comprobación según el objeto que se compara. |
| 72 | Redactar un informe de medición | Separar método, resultado e interpretación. |

### Escucha crítica (73–77)

| Lección | Paso | Objetivo observable |
|---|---|---|
| 73 | Controlar nivel en una comparación | Explicar cómo la diferencia de ganancia altera un juicio. |
| 74 | Reconocer límites de la comparación subjetiva | Identificar expectativas y cambios de contexto que confunden una prueba. |
| 75 | Diseñar una prueba ABX | Describir condiciones, aleatorización y decisión antes de escuchar. |
| 76 | Interpretar un resultado de escucha | Delimitar qué demuestra una identificación o su ausencia. |
| 77 | Unir medición y escucha | Elegir evidencias adecuadas para una afirmación sonora. |

### Sistema y entorno de escucha (78–82)

| Lección | Paso | Objetivo observable |
|---|---|---|
| 78 | Seguir la cadena hasta el sonido | Ubicar ganancia, amplificación, transductor y entorno. |
| 79 | Interpretar respuesta en frecuencia | Relacionar una curva con el sistema y las condiciones de medida. |
| 80 | Reconocer la influencia de sala y posición | Identificar reflexiones y variaciones de graves en un escenario. |
| 81 | Relacionar auriculares y condiciones de uso | Separar ajuste, sellado, respuesta y fuente. |
| 82 | Priorizar una mejora por evidencia | Justificar qué problema investigar primero y cómo comprobarlo. |

### Integración final (83–86)

| Lección | Paso | Objetivo observable |
|---|---|---|
| 83 | Auditar una biblioteca musical | Preparar un inventario de formatos, procedencia y metadatos. |
| 84 | Documentar una cadena reproducible | Crear un registro de fuente, procesamiento, salida y condiciones. |
| 85 | Resolver fallos en capas distintas | Elegir pruebas mínimas para tres síntomas independientes. |
| 86 | Defender un diagnóstico completo | Justificar conclusiones y límites con evidencia trazable. |

## fullstack: 130 lecciones en total

Resultado: Explicar y justificar un diseño web completo, desde la interacción hasta los datos y la operación, mediante contratos, diagramas, escenarios y verificaciones, sin stack obligatorio.

### Mapa completo de una aplicación (15–20)

| Lección | Paso | Objetivo observable |
|---|---|---|
| 15 | Seguir una aplicación de extremo a extremo | Ubicar navegador, servidor y base de datos en una operación. |
| 16 | Del enlace a la conexión | Explicar cómo una URL permite localizar y contactar un servicio. |
| 17 | Qué protege HTTPS | Separar transporte cifrado, identidad del servidor y permisos del usuario. |
| 18 | Entender un servidor como proceso | Explicar cómo un programa recibe solicitudes y conserva o pierde estado. |
| 19 | Dibujar las fronteras de confianza | Identificar datos controlados por el cliente y decisiones del servidor. |
| 20 | Reconstruir una petición completa | Explicar el flujo con responsabilidades y fallos posibles. |

### Lenguaje y razonamiento de programas (21–27)

| Lección | Paso | Objetivo observable |
|---|---|---|
| 21 | Distinguir valores y referencias | Predecir cuándo dos variables observan el mismo dato mutable. |
| 22 | Razonar con funciones y contratos | Separar entradas, salidas y efectos de una operación. |
| 23 | Seguir el ámbito de una variable | Determinar qué datos puede usar una función y durante cuánto tiempo. |
| 24 | Elegir cómo organizar una colección | Comparar lista, mapa y conjunto según una consulta. |
| 25 | Cubrir decisiones y casos límite | Identificar caminos no cubiertos en una regla de negocio. |
| 26 | Dividir un programa en módulos | Justificar límites y dependencias de responsabilidades. |
| 27 | Seguir un error sin perder el contexto | Distinguir resultado esperado, fallo e impacto parcial. |

### Asincronía y tipos (28–34)

| Lección | Paso | Objetivo observable |
|---|---|---|
| 28 | Separar orden del código y orden de finalización | Predecir una secuencia con operaciones que esperan entradas externas. |
| 29 | Componer resultados futuros | Explicar cómo una operación depende del resultado de otra. |
| 30 | Elegir qué operaciones pueden concurrir | Separar dependencias de trabajo independiente. |
| 31 | Propagar fallos asíncronos | Ubicar quién observa un rechazo y quién debe responder. |
| 32 | Separar cancelación y timeout | Explicar qué puede continuar después de dejar de esperar. |
| 33 | Separar tipos de validación real | Explicar qué garantías existen antes y durante la ejecución. |
| 34 | Diseñar estados de una operación | Representar inicio, espera, éxito y fallo sin estados contradictorios. |

### Entorno y control de versiones (35–39)

| Lección | Paso | Objetivo observable |
|---|---|---|
| 35 | Distinguir código y entorno | Explicar por qué el mismo programa puede comportarse distinto en dos equipos. |
| 36 | Entender dependencias y archivos de bloqueo | Explicar qué hace reproducible una instalación. |
| 37 | Leer cambios antes de guardarlos | Distinguir copia de trabajo, índice e historial. |
| 38 | Razonar sobre ramas e integración | Identificar qué se combina y por qué aparece un conflicto. |
| 39 | Preparar una entrega reproducible | Definir qué información necesita otra persona para reproducir un fallo. |

### HTML y accesibilidad (40–45)

| Lección | Paso | Objetivo observable |
|---|---|---|
| 40 | Usar estructura con significado | Elegir elementos según su función en una página. |
| 41 | Seguir los datos de un formulario | Relacionar controles, nombres, valores y envío. |
| 42 | Dar nombre a cada control | Detectar controles cuyo propósito no puede identificarse. |
| 43 | Seguir una interacción por teclado | Explicar orden de foco y señales de ubicación. |
| 44 | Comunicar errores de formulario | Relacionar el problema con el campo y la acción que lo corrige. |
| 45 | Revisar una interfaz de edición | Justificar mejoras semánticas y de interacción. |

### CSS y diseño adaptable (46–51)

| Lección | Paso | Objetivo observable |
|---|---|---|
| 46 | Explicar qué regla CSS se aplica | Resolver un conflicto de estilos con su origen y prioridad. |
| 47 | Razonar sobre tamaño y espacio | Calcular el espacio ocupado por una caja sencilla. |
| 48 | Elegir unidades según su referencia | Explicar tamaños relativos y límites legibles. |
| 49 | Entender distribución en un eje | Predecir cómo se reparte el espacio de una fila o columna. |
| 50 | Entender una cuadrícula de interfaz | Elegir filas y columnas para relacionar áreas. |
| 51 | Diseñar adaptación por contenido | Definir cómo una interfaz cambia sin perder funciones. |

### Navegador y HTTP (52–58)

| Lección | Paso | Objetivo observable |
|---|---|---|
| 52 | Separar HTML y documento vivo | Explicar cómo cambia el árbol que representa una página. |
| 53 | Seguir un evento de usuario | Identificar origen, propagación y acción predeterminada. |
| 54 | Leer una solicitud y su respuesta | Distinguir URL, método, cabeceras, cuerpo y resultado. |
| 55 | Elegir un método HTTP | Relacionar lectura y cambios con seguridad e idempotencia. |
| 56 | Distinguir almacenamiento del navegador | Separar memoria, cookies y almacenamiento persistente. |
| 57 | Razonar sobre una respuesta almacenada | Explicar cuándo se reutiliza y cuándo se revalida. |
| 58 | Diagnosticar una interacción web | Elegir evidencia de red, documento o consola según el síntoma. |

### Backend y contratos de API (59–65)

| Lección | Paso | Objetivo observable |
|---|---|---|
| 59 | Modelar recursos y operaciones | Separar entidades de acciones específicas del negocio. |
| 60 | Distribuir responsabilidades del backend | Ubicar transporte, reglas y acceso a datos sin duplicarlos. |
| 61 | Escribir un contrato de datos | Especificar campos, ausencia, nulabilidad y restricciones. |
| 62 | Diseñar errores consumibles | Separar estado HTTP, código de aplicación y detalle seguro. |
| 63 | Paginar sin perder el sentido del listado | Comparar página por desplazamiento y continuación por cursor. |
| 64 | Evolucionar consultas y contratos | Distinguir cambios compatibles de cambios que rompen consumidores. |
| 65 | Elegir una forma de API | Justificar un contrato según consumidores y operaciones. |

### Datos y SQL (66–73)

| Lección | Paso | Objetivo observable |
|---|---|---|
| 66 | Pasar del dominio al modelo de datos | Identificar entidades y relaciones antes de crear tablas. |
| 67 | Proteger identidad e invariantes | Justificar claves primarias, foráneas y unicidad. |
| 68 | Interpretar ausencia y NULL | Distinguir valor vacío, desconocido y relación inexistente. |
| 69 | Representar uno a muchos y muchos a muchos | Elegir una representación según cardinalidad y reglas. |
| 70 | Leer una consulta de selección | Seguir filtrado, proyección y orden con datos dados. |
| 71 | Combinar y resumir datos | Explicar qué filas produce un join y qué resume una agrupación. |
| 72 | Evitar inconsistencias del modelo | Detectar datos duplicados que pueden contradecirse. |
| 73 | Relacionar acceso, índices y modelo | Explicar cuándo una estructura acelera una consulta y qué cuesta mantenerla. |

### Persistencia y evolución (74–79)

| Lección | Paso | Objetivo observable |
|---|---|---|
| 74 | Separar consulta y parámetros | Reconocer una construcción insegura y explicar la alternativa. |
| 75 | Entender conexiones y pools | Explicar por qué las conexiones son un recurso limitado. |
| 76 | Separar modelo de aplicación y persistencia | Comparar SQL directo y una capa de mapeo. |
| 77 | Evolucionar datos con migraciones | Planificar un cambio compatible con datos existentes. |
| 78 | Razonar sobre aislamiento | Identificar qué puede cambiar entre dos lecturas concurrentes. |
| 79 | Revisar una evolución completa de datos | Justificar modelo, restricciones, consultas y migración. |

### Identidad y seguridad aplicada (80–86)

| Lección | Paso | Objetivo observable |
|---|---|---|
| 80 | Separar cuenta e identidad autenticada | Explicar el flujo de alta e inicio de sesión y sus fronteras. |
| 81 | Entender cómo se verifican contraseñas | Distinguir hash de contraseña, cifrado y texto plano. |
| 82 | Comparar sesiones y tokens | Ubicar quién conserva estado y cómo caduca o revoca una credencial. |
| 83 | Relacionar cookies y CSRF | Explicar el riesgo de solicitudes con credenciales automáticas. |
| 84 | Seguir datos hasta una salida activa | Identificar cuándo contenido controlado se interpreta como código. |
| 85 | Separar origen, acceso y secretos | Explicar qué controla CORS y qué debe proteger el servidor. |
| 86 | Auditar el flujo de identidad y permisos | Recuperar autenticación, sesión, ownership y rol en un mismo caso. |

### Interfaz con componentes (87–93)

| Lección | Paso | Objetivo observable |
|---|---|---|
| 87 | Dividir una interfaz en componentes | Justificar límites según responsabilidad y reutilización. |
| 88 | Separar datos recibidos y eventos emitidos | Explicar cómo una interacción produce un cambio observable. |
| 89 | Elegir una fuente para cada dato | Distinguir estado propio, compartido y derivado. |
| 90 | Relacionar estado y representación | Predecir qué interfaz corresponde a un estado dado. |
| 91 | Modelar una edición en curso | Separar borrador, datos guardados y validación. |
| 92 | Representar navegación en la URL | Distinguir estado navegable y estado efímero. |
| 93 | Comparar dónde se renderiza una página | Justificar renderizado en cliente, servidor o generación estática. |

### Integración de cliente y servidor (94–99)

| Lección | Paso | Objetivo observable |
|---|---|---|
| 94 | Separar borrador y estado remoto | Explicar qué dato conoce cada lado y cuándo puede estar desactualizado. |
| 95 | Diseñar carga, vacío y error | Evitar que estados distintos se representen como una lista vacía. |
| 96 | Manejar respuestas fuera de orden | Detectar cuándo una respuesta antigua puede reemplazar una nueva. |
| 97 | Decidir cuándo reintentar | Distinguir lectura fallida y escritura de resultado desconocido. |
| 98 | Comparar actualización inmediata y confirmada | Justificar cómo representar éxito provisional y rechazo. |
| 99 | Revisar una funcionalidad vertical | Conectar interacción, contrato, permiso y persistencia. |

### Pruebas y depuración (100–105)

| Lección | Paso | Objetivo observable |
|---|---|---|
| 100 | Elegir qué comprobar primero | Relacionar pruebas con consecuencias de un fallo. |
| 101 | Aislar una regla para probarla | Definir entrada, salida y casos límite de una unidad. |
| 102 | Probar la colaboración entre capas | Identificar fallos que una prueba aislada no observa. |
| 103 | Verificar un recorrido completo | Elegir un flujo de usuario y evidencias observables. |
| 104 | Usar sustitutos sin perder garantías | Explicar qué demuestra un mock y qué queda sin comprobar. |
| 105 | Depurar mediante hipótesis comprobables | Localizar una causa con evidencia y una reproducción mínima. |

### Rendimiento y observabilidad (106–111)

| Lección | Paso | Objetivo observable |
|---|---|---|
| 106 | Separar tiempos de una operación | Ubicar esperas de navegador, red, servidor y datos. |
| 107 | Detectar consultas repetidas | Explicar el coste de cargar relaciones una por una. |
| 108 | Razonar sobre un plan de consulta | Relacionar filtro, orden e índice con trabajo realizado. |
| 109 | Definir una política de caché | Explicar clave, vigencia e invalidación con datos privados. |
| 110 | Elegir una señal de observabilidad | Distinguir evento, agregado y recorrido de una solicitud. |
| 111 | Comprobar una mejora de rendimiento | Comparar antes y después con una métrica y condiciones estables. |

### Integraciones y arquitectura (112–118)

| Lección | Paso | Objetivo observable |
|---|---|---|
| 112 | Modelar un servicio externo | Distinguir disponibilidad propia y dependencia remota. |
| 113 | Entender una notificación por webhook | Explicar recepción, validación y procesamiento de un evento. |
| 114 | Separar respuesta y trabajo diferido | Elegir qué debe completarse antes de responder. |
| 115 | Razonar sobre una cola de tareas | Explicar entrega repetida, reintento y trabajo fallido. |
| 116 | Explicar consistencia diferida | Distinguir estado confirmado, proyección pendiente y contradicción permanente. |
| 117 | Organizar un monolito con límites | Justificar módulos por responsabilidades y dependencias. |
| 118 | Evaluar separar servicios | Comparar despliegue, comunicación y operación con un problema concreto. |

### Entrega y mantenimiento (119–125)

| Lección | Paso | Objetivo observable |
|---|---|---|
| 119 | Separar construcción y ejecución | Explicar qué se prepara antes de ejecutar y qué depende del entorno. |
| 120 | Trazar una publicación completa | Ubicar dominio, HTTPS, proceso, datos y configuración. |
| 121 | Entender integración continua | Elegir qué verificaciones bloquean una entrega. |
| 122 | Coordinar código y esquema | Planificar cambios compatibles durante una publicación. |
| 123 | Distinguir backup y recuperación comprobada | Definir qué datos se conservan y cómo verificar su restauración. |
| 124 | Preparar una reversión segura | Separar revertir código de revertir datos y efectos externos. |
| 125 | Definir la operación mínima de una aplicación | Integrar señales, responsabilidades y procedimientos de mantenimiento. |

### Caso integrador y revisión (126–130)

| Lección | Paso | Objetivo observable |
|---|---|---|
| 126 | Definir el problema antes de diseñar | Escribir alcance y criterios observables de una aplicación pequeña. |
| 127 | Conectar modelo y contratos | Justificar datos persistentes, permisos y solicitudes necesarias. |
| 128 | Explicar recorridos de usuario y fallo | Integrar estado de interfaz con respuestas y persistencia. |
| 129 | Revisar un diseño con casos negativos | Identificar fallos relevantes y elegir cómo demostrar su control. |
| 130 | Defender una arquitectura completa | Explicar decisiones y límites de extremo a extremo. |

## musica-clasica: 95 lecciones en total

Resultado: Escuchar obras completas, reconocer sus recursos y formas, situarlas históricamente y comparar interpretaciones con argumentos auditivos sin requerir lectura musical.

### Afinar las herramientas de escucha (15–19)

| Lección | Paso | Objetivo observable |
|---|---|---|
| 15 | Separar pulso, compás y acento | Distinguir regularidad de base y agrupación de los tiempos. |
| 16 | Escuchar velocidad y flexibilidad | Distinguir un tempo de sus variaciones expresivas. |
| 17 | Escuchar un acento desplazado | Reconocer tensión entre pulso esperado y articulación. |
| 18 | Oír estabilidad dentro de un contexto | Explicar tensión y reposo sin clasificar cada acorde por nombre. |
| 19 | Construir un mapa de escucha más preciso | Relacionar pulso, frase, textura y tensión con señales audibles. |

### Instrumentos y conjuntos (20–25)

| Lección | Paso | Objetivo observable |
|---|---|---|
| 20 | Seguir distintas funciones de las cuerdas | Distinguir melodía, acompañamiento y articulación en una misma familia. |
| 21 | Escuchar el diálogo de las maderas | Reconocer cambios de color y relevo melódico. |
| 22 | Situar metales y percusión | Explicar cómo refuerzan, contrastan o transforman una textura. |
| 23 | Comparar piano, clave y órgano | Describir diferencias audibles de ataque, duración y función. |
| 24 | Distinguir solista, coro y conjunto | Seguir quién lleva el discurso y cómo se combinan las voces. |
| 25 | Comparar cámara y orquesta | Justificar cómo tamaño y distribución cambian la escucha. |

### De la monodia a la polifonía (26–31)

| Lección | Paso | Objetivo observable |
|---|---|---|
| 26 | Escuchar una línea sin acompañamiento | Reconocer continuidad melódica y relación con la palabra. |
| 27 | Abordar melodías modales | Describir centro y recorrido sin forzar funciones tonales posteriores. |
| 28 | Seguir más de una voz | Reconocer simultaneidad y diferencias de movimiento. |
| 29 | Escuchar entradas imitativas | Seguir una idea que pasa de una voz a otra. |
| 30 | Relacionar texto y gesto musical | Reconocer recursos que refuerzan palabras o imágenes. |
| 31 | Comparar modos de organizar voces | Distinguir monodia, diálogo e imitación en contextos diferentes. |

### Barroco instrumental (32–38)

| Lección | Paso | Objetivo observable |
|---|---|---|
| 32 | Escuchar una base armónica activa | Reconocer bajo y realización del acompañamiento. |
| 33 | Relacionar carácter y organización de una danza | Distinguir pulso, acentos y retorno en una suite. |
| 34 | Seguir un retorno en un concierto | Distinguir episodios y material que vuelve. |
| 35 | Escuchar grupos dentro del conjunto | Seguir contraste entre pequeño grupo y conjunto amplio. |
| 36 | Seguir continuidad sin un tema cantable | Describir cómo una figura organiza el movimiento. |
| 37 | Abordar una fuga por sus entradas | Reconocer una idea que reaparece entre voces. |
| 38 | Comparar formas de continuidad barroca | Justificar diferencias entre danza, concierto y fuga. |

### Voz, palabra y escena barroca (39–43)

| Lección | Paso | Objetivo observable |
|---|---|---|
| 39 | Escuchar el avance de una escena | Distinguir declamación narrativa y expansión lírica. |
| 40 | Seguir una emoción en forma musical | Relacionar retorno, variación y expresión vocal. |
| 41 | Situar una cantata y sus secciones | Distinguir función del solista, coro y conjunto instrumental. |
| 42 | Escuchar palabra y contraste en una cantata | Justificar cambios de carácter con señales musicales. |
| 43 | Seguir una narración sin escena teatral | Relacionar aria, recitativo y coro dentro de un oratorio. |

### Clasicismo y formas amplias (44–50)

| Lección | Paso | Objetivo observable |
|---|---|---|
| 44 | Escuchar equilibrio y expectativa | Reconocer presentación, continuación y cierre de una frase. |
| 45 | Seguir un movimiento en forma sonata | Distinguir presentación, transformación y regreso sin usar una plantilla rígida. |
| 46 | Reconocer un estribillo instrumental | Distinguir retornos de una idea y contraste de episodios. |
| 47 | Seguir identidad a través de cambios | Explicar qué conserva una variación cuando cambia su superficie. |
| 48 | Escuchar relaciones entre movimientos | Describir funciones y contrastes de un ciclo sinfónico. |
| 49 | Seguir el diálogo entre solista y orquesta | Reconocer alternancia, integración y momentos de protagonismo. |
| 50 | Escuchar conversación en un cuarteto | Seguir relevos y argumentos musicales entre cuatro voces. |

### Beethoven y las transformaciones del lenguaje (51–55)

| Lección | Paso | Objetivo observable |
|---|---|---|
| 51 | Seguir un motivo a gran escala | Reconocer transformaciones que mantienen una relación audible. |
| 52 | Escuchar expansión y expectativa | Describir duración y peso de una sección dentro del movimiento. |
| 53 | Seguir contraste y continuidad | Justificar cómo una interrupción o transición modifica la atención. |
| 54 | Oír continuidad entre movimientos | Relacionar contraste local y recorrido de una obra entera. |
| 55 | Comparar soluciones formales | Argumentar una diferencia entre obras sin usar sólo etiquetas históricas. |

### Romanticismo: piano y canción (56–61)

| Lección | Paso | Objetivo observable |
|---|---|---|
| 56 | Escuchar una pieza breve como un mundo completo | Relacionar gesto, registro y cierre en una miniatura. |
| 57 | Escuchar una melodía al piano | Distinguir canto, acompañamiento y flexibilidad del pulso. |
| 58 | Escuchar técnica como recurso expresivo | Separar dificultad aparente, textura y función musical. |
| 59 | Seguir un poema transformado en música | Relacionar narración, voces y acompañamiento. |
| 60 | Escuchar una canción desde sus detalles | Justificar la relación entre texto, frase y acompañamiento. |
| 61 | Relacionar piezas dentro de un ciclo | Describir contrastes y vínculos entre números distintos. |

### Romanticismo: cámara y orquesta (62–67)

| Lección | Paso | Objetivo observable |
|---|---|---|
| 62 | Escuchar tiempo y diálogo en cámara | Seguir una melodía que cambia de función y de instrumento. |
| 63 | Seguir tres instrumentos con roles cambiantes | Describir protagonismo y colaboración en un trío. |
| 64 | Escuchar desarrollo dentro de una forma amplia | Relacionar una idea inicial con sus transformaciones posteriores. |
| 65 | Comparar expresión solista y estructura | Justificar cómo participa la orquesta en un concierto. |
| 66 | Separar relato y organización audible | Distinguir una guía narrativa de señales musicales verificables. |
| 67 | Seguir un recorrido orquestal narrativo | Integrar timbre, tema y contraste sin depender sólo del argumento. |

### Ópera y teatro musical (68–73)

| Lección | Paso | Objetivo observable |
|---|---|---|
| 68 | Leer musicalmente una escena | Separar situación dramática, texto y acción sonora. |
| 69 | Seguir personajes que cantan juntos | Distinguir simultaneidad de perspectivas en un conjunto. |
| 70 | Escuchar línea vocal y ornamentación | Relacionar respiración, frase y expresión sin reducirlas a virtuosismo. |
| 71 | Escuchar voz y situación dramática | Justificar cambios de carácter por recursos musicales concretos. |
| 72 | Seguir continuidad y asociaciones temáticas | Reconocer retornos significativos sin convertirlos en un diccionario fijo. |
| 73 | Comparar cómo la música organiza el drama | Argumentar diferencias entre números cerrados y continuidad. |

### Diversidad del siglo XIX y cambio de siglo (74–78)

| Lección | Paso | Objetivo observable |
|---|---|---|
| 74 | Relacionar estilo y contexto sin estereotipos | Distinguir material musical, etiqueta nacional e historia de circulación. |
| 75 | Escuchar una transformación de color | Separar material musical y distribución instrumental. |
| 76 | Escuchar dirección mediante timbre y textura | Reconocer organización sin exigir una progresión tonal familiar. |
| 77 | Seguir cambios con un patrón persistente | Explicar cómo cambia una obra aunque el material se repita. |
| 78 | Escuchar convivencia de materiales | Describir contrastes y asociaciones sin reducir una obra a su época. |

### Siglo XX y música reciente (79–86)

| Lección | Paso | Objetivo observable |
|---|---|---|
| 79 | Seguir energía y desplazamientos rítmicos | Reconocer capas y acentos sin exigir identificar un compás escrito. |
| 80 | Escuchar transformación de modelos previos | Relacionar claridad formal, ritmo y lenguaje del siglo XX. |
| 81 | Escuchar sin esperar una tónica estable | Describir gesto, registro, duración y contraste como organizadores. |
| 82 | Separar técnica compositiva y experiencia audible | Explicar una regla de organización sin afirmar que toda ella se reconoce al escuchar. |
| 83 | Escuchar diálogo entre tradiciones | Relacionar recursos sin reducir una obra a la biografía de su autora. |
| 84 | Escuchar repetición como proceso | Reconocer cambios graduales y atención a patrones. |
| 85 | Escuchar sonidos sin una fuente instrumental visible | Describir timbre, espacio y montaje como recursos de organización. |
| 86 | Abordar una obra contemporánea desconocida | Construir preguntas de escucha antes de emitir una valoración. |

### Interpretación y grabación (87–91)

| Lección | Paso | Objetivo observable |
|---|---|---|
| 87 | Comparar dos decisiones de tempo | Justificar efectos en carácter y proporción sin elegir por velocidad sola. |
| 88 | Escuchar decisiones de fraseo | Describir cómo articulación, duración y balance modelan una línea. |
| 89 | Situar criterios de interpretación histórica | Distinguir instrumento, tamaño de conjunto y decisiones interpretativas. |
| 90 | Separar interpretación y presentación grabada | Reconocer que micrófonos, sala y mezcla afectan lo que se escucha. |
| 91 | Escribir una comparación argumentada | Sostener una preferencia con observaciones y reconocer sus límites. |

### Escuchar obras completas con autonomía (92–95)

| Lección | Paso | Objetivo observable |
|---|---|---|
| 92 | Preparar la escucha de una obra de cámara | Relacionar movimientos, textura y carácter en una obra completa. |
| 93 | Seguir un ciclo orquestal | Explicar relaciones y contrastes entre movimientos. |
| 94 | Organizar la escucha de un recorrido vocal | Relacionar texto y música a escala mayor que una canción. |
| 95 | Construir un método propio de escucha | Elegir preguntas, contexto y comparaciones útiles para una obra nueva. |
