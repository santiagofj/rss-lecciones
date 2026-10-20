---
title: Recorridos completos para Audio digital, Full Stack y Música clásica
status: APPROVED
created: 2026-10-20
updated: 2026-10-20
approved: 2026-10-20
---

# Ampliación de los tres cursos iniciales

## Objetivo y criterio de completitud

Transformar los bloques iniciales de 14 lecciones en cursos con fundamentos, desarrollo, aplicación, repaso e integración final. Usuario: el lector actual de los feeds. El resultado educativo debe poder describirse y comprobarse; la cantidad de publicaciones no constituye por sí sola un curso completo.

Los mapas siguientes fueron aprobados por el usuario el 2026-10-20. La implementación los descompone en pasos de producción, cada uno con un objetivo observable y una práctica que pueda comprobarse. No se exige una cantidad idéntica de lecciones por módulo ni una fecha de finalización.

## Estado comprobado y compatibilidad

- En GitHub, al 2026-10-20, Audio digital, Full Stack y Música clásica tienen 14 pasos y 14 lecciones cada uno. Sus últimos pasos se publicaron el 2026-10-02; sus cursores están en `null`.
- Filosofía tiene 63 pasos y 33 lecciones. Continúa con Hume. Su recorrido queda fuera de esta ampliación.
- La copia local estaba en `f461f99`, del 2026-09-25. Antes de implementar se actualizó mediante fast-forward a `694f689`, con el historial de GitHub del 2026-10-20. No se trasladan cursores antiguos sobre ese historial.
- El modelo actual de datos ya permite agregar pasos con `id`, `unitId`, `topicId`, `title`, `objective` y `brief`. Cada paso produce una lección.
- El validador calcula el siguiente paso usando el punto de inicio y las lecciones existentes. Ampliar el syllabus de un curso agotado exige actualizar también `cursor.nextStepId`; `lastLessonId` y `startStepId` deben conservarse.
- El selector recupera fechas sin lección desde `schedule.startDate`. Incorporar temas nuevos sin otra decisión haría recuperables también las fechas desde el 2026-10-03. El máximo actual es 40 lecciones por ejecución, compartido por todos los cursos.
- Publicar acredita avance editorial, no comprensión ni realización de ejercicios por el alumno. No existe un canal de respuestas del lector RSS que permita adaptar automáticamente el curso.

## Requisitos

| ID | Requisito |
|---|---|
| CC-REQ-001 | Conservar el prefijo publicado de cada syllabus, todos los Markdown existentes, IDs, fechas, rutas, GUID y orden. |
| CC-REQ-002 | Preparar para cada curso un mapa con resultado final, módulos, prerrequisitos, prácticas e integración; descomponerlo en pasos antes de activarlo. |
| CC-REQ-003 | Definir una habilidad o comprensión observable por lección. No inflar temas ni duplicarlos para cumplir una cuota de publicaciones. |
| CC-REQ-004 | Incluir repaso espaciado en prácticas posteriores e integración al cierre de los módulos. No exigir confirmación de estudio ni suponer ejercicios completados. |
| CC-REQ-005 | Mantener el calendario diario y el contrato de calidad de las lecciones futuras, salvo cambio solicitado por el usuario. |
| CC-REQ-006 | Reanudar desde el primer paso nuevo con progreso coherente, conservando el contexto real del alumno. |
| CC-REQ-007 | Reanudar con una entrega normal diaria por curso desde su fecha local de reactivación, sin recuperar el intervalo agotado desde el 2026-10-03. Conservar la recuperación de fallos posteriores a la reactivación. |
| CC-REQ-008 | Verificar cada mapa contra sus resultados finales y comprobar la continuidad de los primeros pasos nuevos con las lecciones publicadas. |
| CC-REQ-009 | Full Stack debe ser conceptual e independiente de un stack concreto, según la elección del usuario. Usar ejemplos concretos y ejercicios de razonamiento sin exigir construir una aplicación ni instalar un framework. |

## Audio digital práctico

### Resultado final propuesto

Comprender la representación y reproducción del audio digital, configurar y documentar una ruta con Roon o foobar2000, diagnosticar fallos mediante pruebas controladas y distinguir cambios de datos, mediciones y diferencias audibles. No requiere formación matemática avanzada ni equipos nuevos.

Las primeras 14 lecciones quedan como bloque inicial de ruta y diagnóstico. La continuación explica gradualmente los fundamentos que ese bloque utilizó y los amplía hacia formatos, procesamiento, medición y escucha crítica.

| Orden nuevo | Módulo | Contenido y resultado observable |
|---|---|---|
| A1 | Señal, nivel y representación | Amplitud, frecuencia, fase, período, canales y escala de decibelios. Leer una forma de onda y distinguir nivel digital de volumen acústico sin equipararlos. |
| A2 | Muestreo y reconstrucción | Muestras, señal de banda limitada, Nyquist, aliasing, filtros de entrada y reconstrucción. Explicar por qué una señal reconstruida no es una escalera y anticipar cuándo aparece aliasing. |
| A3 | Cuantización, profundidad y dither | Redondeo, error de cuantización, ruido, resolución a bajo nivel y dither. Comparar casos controlados de reducción de profundidad; justificar cuándo corresponde aplicar dither. |
| A4 | Formatos y compresión | PCM, WAV/AIFF, FLAC/ALAC, compresión con pérdidas, bitrate y metadatos. Verificar una conversión sin pérdidas y separar calidad del máster, formato y tamaño. DSD se compara con PCM sin exigir equipamiento compatible. |
| A5 | Procesamiento de señal | Ganancia, procesamiento en coma flotante, ecualización, filtros y resampling. Preparar una comparación con margen suficiente y explicar cada transformación antes de activarla. |
| A6 | Dinámica y sonoridad | Pico, pico reconstruido, nivel medio, sonoridad integrada, rango dinámico y normalización. Interpretar mediciones y distinguir normalización de compresión dinámica. |
| A7 | Conversión e interfaces | Responsabilidades del ADC y DAC, reloj, jitter, USB y S/PDIF. Separar transporte de datos, conversión y etapa analógica; reconocer qué prueba sirve para cada hipótesis. |
| A8 | Reproducción local y por red | Biblioteca, metadatos, buffers, latencia, dropouts y rutas de streaming. Diagnosticar interrupciones y conversiones sin atribuir propiedades sonoras a la red sin evidencia. |
| A9 | Medición y comparación | Forma de onda, espectro, espectrograma, prueba de nulidad y comparación de archivos. Registrar una medición reproducible y explicar qué permite concluir y qué no. |
| A10 | Escucha crítica | Igualación de nivel, memoria auditiva, sesgos y pruebas ciegas o ABX. Diseñar una comparación que cambie una sola variable sin afirmar audibilidad a partir del formato. |
| A11 | Sistema y entorno de escucha | Cadena hasta amplificación, altavoces o auriculares; respuesta en frecuencia, sala y límites de las conclusiones digitales. Priorizar una intervención por evidencia, con alternativas sin compras. |
| A12 | Integración final | Auditar una biblioteca y una cadena real; preparar configuraciones reproducibles, resolver casos con fallos de distintas capas y redactar un informe con resultados y límites. |

La práctica de cada módulo debe poder hacerse con archivos y herramientas disponibles o mediante un ejemplo con datos suficientes. No se presupone que el alumno dispone de micrófono de medición, osciloscopio u otro instrumental especializado.

## Full Stack progresivo

### Resultado final propuesto

Comprender el recorrido completo de una aplicación web, explicar las responsabilidades de sus capas y razonar sobre datos, contratos, seguridad, fallos, pruebas, publicación y mantenimiento. El resultado final será poder analizar y justificar un diseño completo mediante escenarios y evidencia; no se exige implementar una aplicación ni se pretende abarcar todas las especialidades de ingeniería de software.

**Decisión del usuario, 2026-10-20:** enfoque conceptual, sin depender de un stack concreto. Las prácticas usarán diagramas, trazas de peticiones, ejemplos de datos, HTTP, HTML/CSS, SQL o pseudocódigo cuando ayuden a observar el concepto. Se explicará cada fragmento. No se incorporan dependencias al repositorio RSS ni se exige un entorno de desarrollo para seguir el curso.

Las 14 lecciones publicadas se conservan como bloque de autorización y consistencia. Los fundamentos previamente mencionados en el contexto no se consideran dominados: se recuperan en ejercicios de aplicación, sin reiniciar el feed ni imponer un examen de acceso.

| Orden nuevo | Módulo | Contenido y resultado observable |
|---|---|---|
| F1 | Mapa completo de una aplicación | Navegador, servidor, red, DNS, HTTPS, procesos y base de datos; petición y respuesta; contratos y responsabilidades. Trazar un caso real de lectura y escritura de extremo a extremo. |
| F2 | Lenguaje y razonamiento de programas | Valores, referencias, funciones, ámbito, closures, estructuras, módulos y errores. Seguir el estado de un programa pequeño y explicar sus decisiones sin aprender un lenguaje entero como requisito. |
| F3 | Asincronía y tipos | Operaciones asíncronas, promesas, concurrencia, cancelación y tratamiento de fallos; tipos y validación en ejecución. Razonar sobre operaciones dependientes e independientes sin confundir tipado con validación. |
| F4 | Entorno y control de versiones | Terminal, paquetes, scripts, variables de entorno, Git, commits, ramas y revisión. Interpretar cómo se reproduce un entorno y revisar un cambio pequeño antes de integrarlo. |
| F5 | HTML y accesibilidad | Estructura semántica, formularios, etiquetas, foco, teclado y errores. Evaluar una interfaz y justificar cambios para que pueda usarse sin depender del mouse. |
| F6 | CSS y diseño adaptable | Cascada, caja, unidades, layout, Flexbox, Grid y adaptación a tamaños de pantalla. Explicar el resultado de reglas sencillas y diagnosticar un problema de disposición. |
| F7 | Navegador y HTTP | DOM, eventos, formularios, Fetch, estados de carga, caché y semántica HTTP. Diagnosticar una interacción con herramientas de desarrollo y solicitudes observables. |
| F8 | Backend y contratos de API | Rutas, controladores, servicios, validación, errores, paginación y filtros; REST y otras formas de contrato. Diseñar un recurso con contrato explícito y razonar sobre sus respuestas. |
| F9 | Datos y SQL | Modelado relacional, claves, restricciones, relaciones, consultas, joins e índices; criterios para comparar con otros modelos de datos. Diseñar un esquema y justificar consultas e invariantes. |
| F10 | Persistencia y evolución | Conexiones, consultas parametrizadas, migraciones, transacciones y concurrencia. Evolucionar el esquema y manejar conflictos sin perder coherencia. |
| F11 | Identidad y seguridad aplicada | Registro, almacenamiento de contraseñas, sesiones, cookies, CSRF, XSS, CORS, permisos y secretos. Conectar el bloque inicial con un flujo de identidad completo y casos negativos verificables. |
| F12 | Interfaz con componentes | Componentes, datos, eventos, estado, formularios, composición y navegación; renderizado en cliente y servidor. Organizar una interfaz con una fuente clara para cada dato sin depender de React u otro framework. |
| F13 | Integración de cliente y servidor | Contratos, estado remoto, cargas, errores, reintentos, accesibilidad y concurrencia de interacción. Completar una funcionalidad vertical sin asumir éxito de red. |
| F14 | Pruebas y depuración | Pruebas unitarias, de integración y de extremo a extremo; dobles de prueba y diagnóstico. Elegir verificaciones según el riesgo y diseñar una reproducción de un defecto antes de proponer una corrección. |
| F15 | Rendimiento y observabilidad | Consultas e índices, paginación, recursos del navegador, caché, logs y métricas. Encontrar un cuello de botella con mediciones y comprobar la mejora. |
| F16 | Integraciones y arquitectura | Servicios externos, webhooks, colas, trabajos en segundo plano, idempotencia y eventos. Comparar un monolito modular con servicios separados y justificar una solución proporcionada al problema. |
| F17 | Entrega y mantenimiento | Construcción de producción, configuración, HTTPS, despliegue, CI, backups, restauración y rollback. Explicar una entrega completa, sus evidencias y su recuperación ante fallos sin exigir una cuenta en un proveedor. |
| F18 | Caso integrador y revisión | Especificación, modelo de datos, cortes verticales, permisos, interfaz, pruebas y operación. Elaborar y revisar un diseño completo mediante diagramas, contratos y escenarios positivos y negativos, con límites y mejoras justificados. |

Se propone un caso transversal pequeño de gestión de recursos con usuarios y permisos como hilo explicativo, no como trabajo de programación obligatorio. Cada lección incluirá los datos y contratos necesarios para su ejercicio: el motor sólo recibe resúmenes de las últimas tres lecciones y no conserva íntegramente un proyecto acumulado. Una práctica conceptual debe exigir explicar, predecir, comparar o diagnosticar; no basta una pregunta de memoria.

## Escuchar música clásica desde cero

### Resultado final propuesto

Escuchar obras completas con atención, reconocer sus principales recursos y formas, situarlas históricamente sin reducirlas a etiquetas y comparar interpretaciones con argumentos auditivos. No exige tocar un instrumento, leer partituras ni memorizar un catálogo de compositores.

Las primeras 14 lecciones quedan como vocabulario inicial de escucha. La continuación une ese vocabulario con repertorio, prácticas históricas y recorridos de obras completas.

| Orden nuevo | Módulo | Contenido y resultado observable |
|---|---|---|
| M1 | Afinar las herramientas de escucha | Compás, acento, tempo, síncopa, registro, consonancia y disonancia. Construir un mapa auditivo con señales reconocibles, retomando conceptos de las primeras lecciones. |
| M2 | Instrumentos y conjuntos | Cuerdas, vientos, percusión, teclado, voz, cámara y orquesta. Seguir una entrada o un relevo y distinguir instrumentos de su función musical. |
| M3 | De la monodia a la polifonía | Canto, modos, voces, imitación y contrapunto; repertorio medieval y renacentista contextualizado. Comparar texturas sin presentar la historia como una mejora lineal. |
| M4 | Barroco instrumental | Bajo continuo, danza, suite, concierto, ritornello, preludio y fuga. Seguir contraste, retorno e imitación en ejemplos de distintos compositores. |
| M5 | Voz, palabra y escena barroca | Recitativo, aria, coro, cantata y oratorio. Escuchar la relación entre texto, forma y expresión sin exigir conocer el idioma. |
| M6 | Clasicismo y formas amplias | Sonata, rondó, variaciones, sinfonía, concierto y cuarteto. Seguir temas, contrastes y retornos en un movimiento completo. |
| M7 | Beethoven y las transformaciones del lenguaje | Desarrollo motívico, proporciones, continuidad y contraste. Comparar obras y justificar qué se transforma respecto de los modelos previos. |
| M8 | Romanticismo: piano y canción | Carácter, miniatura, ciclos, lied y música de salón. Relacionar detalle musical, texto y escala de la obra. |
| M9 | Romanticismo: cámara y orquesta | Sinfonía, concierto, música programática y poema sinfónico. Diferenciar descripción extramusical y organización audible. |
| M10 | Ópera y teatro musical | Escena, dramaturgia, voz, orquesta, números y continuidad. Seguir una escena con libreto o sinopsis y explicar cómo la música participa en la acción. |
| M11 | Diversidad del siglo XIX y cambio de siglo | Tradiciones nacionales, circulación cultural, timbre y distintas relaciones con la tonalidad. Comparar soluciones sin convertir las etiquetas históricas en recetas. |
| M12 | Siglo XX y música reciente | Ritmo, color, atonalidad, serialismo, neoclasicismo, minimalismo, electrónica y pluralidad contemporánea. Abordar una escucha desconocida con preguntas útiles antes de juzgarla. |
| M13 | Interpretación y grabación | Tempo, fraseo, articulación, balance, acústica y criterios históricos. Comparar dos versiones con ejemplos audibles sin afirmar que existe una única interpretación correcta. |
| M14 | Escuchar obras completas con autonomía | Planificar escuchas sucesivas de una obra de cámara, una obra orquestal y una obra vocal; integrar contexto, forma y expresión en un cuaderno de escucha razonado. |

El repertorio incorporará compositoras y tradiciones menos representadas en los módulos correspondientes. Cada práctica identificará obra, compositor y movimiento o sección localizable. No se inventarán enlaces, disponibilidad de grabaciones, marcas temporales ni citas. Habrá alternativas de escucha sin exigir una suscripción concreta.

## Diseño, alternativas y límites

| ID | Decisión propuesta | Alternativa y motivo |
|---|---|---|
| CC-DEC-001 | Ampliar los tres recorridos mediante pasos editoriales explícitos. | Autogenerar temas al agotarse elimina el control de cobertura y contradice el contrato actual; no se incorpora. |
| CC-DEC-002 | Conservar las 14 lecciones y agregar una continuación por módulos. | Reiniciar los cursos o reordenar el pasado rompe la continuidad y no es necesario. |
| CC-DEC-003 | Derivar el número final de lecciones de los objetivos y las prácticas. | Igualar arbitrariamente todos los módulos a cierta cantidad produce duplicaciones o comprime temas. |
| CC-DEC-004 | Separar ampliación editorial y activación de generación. | Generar durante la preparación impide revisar el mapa y puede provocar una recuperación masiva no decidida. |
| CC-DEC-005 | Usar `schedule.startDate` como inicio del nuevo tramo de entregas debidas en los tres cursos reactivados. | Agregar intervalos excluidos al esquema y al selector introduce lógica innecesaria para esta reactivación. El historial editorial conserva sus fechas originales y Git conserva la configuración anterior. |

No se cambia el proveedor, la clave, el prompt global, la frecuencia, los reintentos ni el motor en esta fase. No se crean automatizaciones ni chats nuevos. Los avisos automáticos de agotamiento pueden abordarse como mejora separada; la ampliación editorial no se presenta como una solución indefinida a la finalización de un curso.

### Reactivación sin entregas acumuladas

**Decisión del usuario, 2026-10-20:** una lección diaria por curso desde la reactivación, sin recuperar el intervalo detenido.

La implementación propuesta reutiliza el calendario existente. Sólo en Audio digital, Full Stack y Música clásica se fijará `schedule.startDate` a la fecha local de reactivación, calculada con la zona ya configurada del curso, `America/Argentina/Buenos_Aires`. No se fija automáticamente el 2026-10-20: si se activa otro día, debe usarse ese día. Se conservan `schedule.days`, la zona horaria y las fuentes históricas.

`startDate` será el comienzo del tramo de entregas actualmente debidas; no reescribe la fecha de creación del curso ni de sus lecciones. No se mueve diariamente, al reintentar, al recuperar un fallo ni en un rerun. De ese modo, la primera planificación sólo debe incluir la fecha de activación para cada curso reanudado; las fechas posteriores que fallen seguirán pendientes según el comportamiento ya aprobado. Esa recuperación posterior puede publicar varias entregas juntas, como sucedía antes; no se recupera el intervalo agotado anterior a la reactivación.

El validador actual comprueba secuencia, identidad y cursor sin exigir que las lecciones históricas sean posteriores a `schedule.startDate`. El selector sólo busca fechas debidas desde ese campo. Por tanto, este diseño no requiere añadir campos ni cambiar código TypeScript. La compatibilidad se comprobó mediante inspección, validación de fuentes y simulación de planificación sin API.

### Archivos previstos

- `courses/{audio-digital,fullstack,musica-clasica}/syllabus.md`: conservar los 14 pasos iniciales y añadir los pasos de los módulos aprobados.
- `courses/{audio-digital,fullstack,musica-clasica}/progress.json`: actualizar únicamente `cursor.nextStepId` al primer paso nuevo, conservando `lastLessonId`, `startStepId` y el contexto real del alumno.
- `courses/{audio-digital,fullstack,musica-clasica}/course.yml`: nueva fecha del tramo de entregas; ampliar descripción e instrucciones docentes de acuerdo con el recorrido y el enfoque conceptual de Full Stack.
- Documentación de esta enmienda y, cuando corresponda, la explicación del calendario en `.spec/lecciones-rss/data-model.md` y `operations.md`.

Los archivos definitivos se compararán con el estado remoto reciente antes de editarlos. No se prevén cambios en `src/`, en `.github/` ni en los archivos de Filosofía para este diseño.

## Criterios de aceptación y verificación

| ID | Criterio y trazabilidad | Verificación prevista |
|---|---|---|
| CC-AC-001 | El historial y el prefijo publicado se conservan byte a byte. [CC-REQ-001] | Comparar con un SHA reciente de GitHub; inspeccionar el diff y comprobar IDs, fechas, rutas y orden. |
| CC-AC-002 | Todos los módulos tienen resultado, pasos, objetivos, práctica e integración o repaso justificado. [CC-REQ-002, CC-REQ-003, CC-REQ-004, CC-REQ-008] | Matriz editorial de cobertura; revisión de prerrequisitos y ausencia de duplicaciones con las primeras 14 lecciones. |
| CC-AC-003 | Cada curso agotado queda listo en el primer paso agregado; el resto de su progreso se conserva. [CC-REQ-006] | `npm run validate`; inspección de cursores contra historial remoto, sin llamada a Gemini. |
| CC-AC-004 | El calendario diario y las protecciones de generación mantienen su comportamiento. [CC-REQ-005] | Diff de configuración; typecheck y pruebas existentes. |
| CC-AC-005 | En la fecha local de activación, cada curso reanudado tiene exactamente una tarea normal para ese día y ninguna anterior. Tras aceptar esa entrega, repetir la planificación del día no añade otra. Un fallo del día siguiente permanece recuperable, sin cambiar `startDate`. Filosofía mantiene su planificación. [CC-REQ-007] | Simulación de planificación sin API, con fecha explícita, casos de cambio de fecha en Buenos Aires y reporte por curso; pruebas existentes de recuperación y unicidad. |
| CC-AC-006 | Full Stack permite explicar y resolver escenarios sin stack obligatorio, sin instalación requerida y sin depender de un proyecto que el generador no recibe. [CC-REQ-009, CC-REQ-008] | Revisión del mapa, los briefs y el contexto efectivo del prompt. |

La revisión editorial es evidencia de cobertura prevista, no prueba de aprendizaje. Una generación simulada no acredita que Gemini redactará correctamente ni que las lecciones estén publicadas.

## Entrega y migración previstas

1. Revisar y aprobar los mapas y el diseño de reactivación. El enfoque conceptual de Full Stack y la ausencia de recuperación del intervalo agotado ya fueron elegidos por el usuario.
2. Obtener el estado remoto reciente sin pisar cambios y establecer el SHA base. Revisar contenido publicado necesario para enlazar la continuación.
3. Descomponer los mapas aprobados en pasos concretos. Actualizar los tres `syllabus.md`, los cursores correspondientes y las instrucciones docentes de sus `course.yml`.
4. Antes de activar, fijar `schedule.startDate` al día local de reactivación de los tres cursos. Documentar el comienzo del nuevo tramo sin alterar metadata ni archivos publicados. Si la activación se pospone, revisar la fecha antes de publicar los cambios.
5. Validar fuentes, compatibilidad, cobertura y planificación sin API. Presentar el diff concreto antes de la activación remota.
6. Tras la activación autorizada, comprobar el run real, los archivos conservados y los feeds servidos. La primera entrega nueva por curso debe corresponder al día local de reactivación; el intervalo agotado no debe producir deuda.

La implementación se limitará a los archivos que requiera el diseño aprobado. No se publican nuevas lecciones en la fase de especificación. Antes de aceptar contenido nuevo puede revertirse sólo la ampliación y restaurar el cursor previo; después de publicarlo no se borran lecciones ni se reutilizan números.

## Decisiones pendientes y aprobación

- CC-Q-001 [RESUELTA, 2026-10-20]: Full Stack conceptual, sin depender de un stack concreto. Elección explícita del usuario en esta conversación.
- CC-Q-002 [RESUELTA, 2026-10-20]: una lección diaria por curso desde la reactivación, sin recuperar el intervalo detenido. Elección explícita del usuario en esta conversación; representación propuesta en CC-DEC-005.
- CC-Q-003 [RESUELTA, 2026-10-20]: el usuario aprobó explícitamente aplicar los tres recorridos y el diseño de reactivación: «si apruebo».

Estado: **APPROVED**, 2026-10-20. Aprobación explícita del usuario para implementar los tres mapas, Full Stack conceptual y la reactivación diaria sin recuperar el intervalo detenido, usando `schedule.startDate` y conservando el historial. Las comprobaciones de implementación y publicación se registran por separado; la aprobación no constituye evidencia de entrega remota.

## Evidencia de implementación, 2026-10-20

Base remota: `694f689`. El [mapa de cobertura](complete-curricula-coverage.md) detalla las lecciones nuevas y sus objetivos.

| Curso | Prefijo conservado | Pasos añadidos | Total | Primer paso nuevo |
|---|---:|---:|---:|---|
| Audio digital | 14 | 72 | 86 | `amplitud-y-frecuencia` |
| Full Stack conceptual | 14 | 116 | 130 | `recorrido-aplicacion-web` |
| Música clásica | 14 | 81 | 95 | `compas-y-acento` |

- CC-AC-001: comparación de las 75 lecciones publicadas con Git; contenido y entradas RSS conservados. Los 14 pasos iniciales de cada temario ampliado también coinciden con la base.
- CC-AC-002: los 44 módulos aprobados están desglosados en 269 pasos nuevos con objetivo y práctica; el mapa de cobertura registra sus rangos. Los briefs incluyen el siguiente paso real para dar continuidad al cierre sin requerir cambios en el prompt global. La revisión comprueba cobertura editorial prevista, no calidad efectiva de las lecciones todavía no redactadas ni aprendizaje.
- CC-AC-003: `npm run validate` pasa para los cuatro cursos y los tres cursores reanudados apuntan al primer paso nuevo. Contexto, último ID y punto de inicio permanecen iguales a Git.
- CC-AC-004: `npm run typecheck` y las 32 pruebas existentes pasan. La primera ejecución de pruebas en sandbox no pudo cargar archivos temporales; la repetición autorizada fuera del sandbox pasó sin cambios al código. Frecuencia, proveedor, prompt, límites y workflow no cambian.
- CC-AC-005: simulación sin API: ninguna entrega de los tres cursos antes de la fecha local preparada; una tarea por curso el 2026-10-20; ninguna repetición del día después de una aceptación simulada; cambio de día a las 03:00 UTC; recuperación de un fallo posterior sin mover `startDate`. Configuración y fuentes de Filosofía conservadas.
- CC-AC-006: instrucciones de Full Stack y briefs orientados a explicar, predecir, comparar y diagnosticar sin stack ni instalación obligatorios. Todos los prompts futuros permanecen dentro del límite de entrada configurado.
- Construcción local de HTML y RSS completada sin llamar a Gemini; cada feed contiene el número de lecciones realmente publicadas, no todos los pasos del temario.

La fecha preparada de reactivación es `2026-10-20`, en la zona local de los cursos. La comprobación de primera generación y publicación remota se registra después del run real.

## Fuentes de contraste para los mapas

Fuentes primarias consultadas el 2026-10-20; orientan la cobertura, sin atribuirles aprobación de estos cursos ni copiar sus lecciones:

- [MDN Curriculum: Core modules](https://developer.mozilla.org/en-US/curriculum/core/): fundamentos web, semántica, CSS, JavaScript, accesibilidad y control de versiones. Es una referencia de frontend, no un programa completo de backend.
- [Xiph.Org: Digital Show & Tell](https://xiph.org/video/vid2.shtml): demostraciones de muestreo, cuantización, profundidad y dither.
- [MIT OpenCourseWare: Introduction to Western Music, syllabus](https://ocw.mit.edu/courses/21m-011-introduction-to-western-music-fall-2024/pages/syllabus/): amplitud histórica y repertorio desde el canto hasta la música reciente; enfoque de escucha e interpretación contextualizada.
