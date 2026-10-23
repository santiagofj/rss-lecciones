---
schemaVersion: 1
id: 211d2ac6-0f80-4b68-b786-96a3959fa174
sequence: 18
course: fullstack
stepId: proceso-servidor
title: Entender un servidor como proceso
publishedAt: 2026-10-23T08:22:08.231Z
generationDate: 2026-10-23
summary: Esta lección explora el servidor web como un proceso en ejecución,
  diferenciando entre la memoria volátil del proceso y el almacenamiento
  duradero. Se explica cómo un servidor recibe solicitudes y gestiona el estado,
  y se anticipan las implicaciones de un reinicio del servidor en la
  persistencia de los datos. Se utiliza el caso de las notas compartidas para
  ilustrar qué información se mantiene en memoria y cuál se guarda de forma
  permanente, preparando el terreno para diseñar sistemas robustos que manejen
  la continuidad del servicio.
generation:
  model: gemini-2.5-flash
  promptVersion: v3
  contextHash: a0054138cc5960b795cff789267b8353a2afd1ee4343c6631704663e6130f3f6
---

## Por qué ahora
En lecciones anteriores, hemos explorado cómo una URL se traduce en una conexión de red con un servidor y cómo HTTPS protege esa comunicación. También hemos trazado el flujo de una solicitud a través de las capas de una aplicación web, desde el navegador hasta la base de datos. Sin embargo, para construir aplicaciones robustas y predecibles, es fundamental comprender la naturaleza del servidor que procesa estas solicitudes. Un servidor no es una entidad abstracta, sino un programa en ejecución, un proceso. Comprender cómo este proceso gestiona el estado y qué ocurre cuando se reinicia es crucial para diseñar sistemas que mantengan la coherencia y la disponibilidad, independientemente de los eventos del ciclo de vida del servidor.

## Explicación y ejemplo
Un servidor web es, en esencia, un programa de software que se ejecuta continuamente en una máquina. Cuando este programa se inicia, el sistema operativo le asigna recursos, incluyendo una porción de memoria RAM y tiempo de CPU. Este programa se convierte en un *proceso*. El proceso del servidor está diseñado para escuchar en un puerto de red específico (como se vio en "Del enlace a la conexión") y responder a las solicitudes HTTP entrantes.

El estado de un proceso se refiere a toda la información que mantiene mientras está en ejecución. Esta información puede residir en dos lugares principales:

1.  **Memoria del proceso (RAM):** Es una forma de almacenamiento volátil. Cualquier dato almacenado directamente en la memoria RAM del proceso se pierde cuando el proceso termina o se reinicia. Esto incluye variables, cachés en memoria, sesiones de usuario activas que no se han persistido, y cualquier otro dato temporal que el programa necesite para operar rápidamente.
2.  **Almacenamiento duradero:** Es una forma de almacenamiento persistente, como un disco duro, una base de datos (SQL o NoSQL), o un sistema de archivos. Los datos guardados en almacenamiento duradero persisten incluso si el proceso del servidor se detiene, se reinicia o la máquina se apaga. Este es el lugar adecuado para almacenar información crítica como datos de usuarios, notas, configuraciones permanentes, etc.

Consideremos nuestra aplicación de notas compartidas. Cuando un usuario crea una nota, el texto de la nota y su autor deben guardarse de forma duradera. Si estos datos solo existieran en la memoria del proceso del servidor, se perderían al reiniciar el servidor, lo cual es inaceptable. Por lo tanto, la aplicación envía estos datos a una base de datos, que es un sistema de almacenamiento duradero.

Sin embargo, el servidor también puede mantener información en su memoria para optimizar el rendimiento o gestionar el estado temporal. Por ejemplo, al iniciar el servidor, podría cargar en memoria una lista de las últimas 10 notas más populares para servirlas rápidamente sin consultar la base de datos en cada solicitud. O, cuando un usuario inicia sesión, el servidor podría almacenar un objeto de sesión en memoria que asocie el ID de sesión (enviado en una cookie) con los detalles del usuario y sus permisos de autorización. Esto evita tener que consultar la base de datos para cada solicitud autenticada.

**¿Qué ocurre al reiniciar el servidor?**
Cuando el proceso del servidor se detiene y se reinicia, toda la memoria RAM asignada a ese proceso se libera y se borra. El nuevo proceso que se inicia comienza desde cero, con su propia memoria limpia. Esto tiene las siguientes implicaciones:

*   **Pérdida de estado en memoria:** Cualquier caché en memoria, sesiones de usuario no persistidas, o datos temporales se pierden. Si la aplicación dependía de estos datos para funcionar, deberá reconstruirlos o recuperarlos del almacenamiento duradero.
*   **Persistencia de estado duradero:** Los datos en la base de datos o en el disco no se ven afectados por el reinicio del servidor. El nuevo proceso puede acceder a ellos de la misma manera que el proceso anterior.

**Ejemplo de flujo con reinicio:**

1.  **Inicio del servidor (Proceso A):**
    *   Carga configuración inicial en memoria.
    *   Carga las 10 notas más populares en una caché en memoria.
    *   Usuario `Alice` inicia sesión. El servidor crea un objeto de sesión en memoria para `Alice` (ID de sesión `s123`) y envía `s123` en una cookie al navegador de `Alice`.

2.  **Solicitud de `Alice`:**
    *   El navegador de `Alice` envía una solicitud con la cookie `s123`.
    *   El Proceso A encuentra `s123` en su caché de sesiones en memoria, identifica a `Alice` y autoriza la acción (como se vio en lecciones de autorización).

3.  **Reinicio del servidor:**
    *   El Proceso A se detiene. Toda su memoria, incluyendo la caché de notas y la sesión de `Alice`, se pierde.
    *   Un nuevo Proceso B se inicia.
    *   El Proceso B carga la configuración inicial, pero su caché de notas está vacía y no tiene información de la sesión `s123` de `Alice`.

4.  **Nueva solicitud de `Alice`:**
    *   El navegador de `Alice` envía otra solicitud con la cookie `s123`.
    *   El Proceso B recibe la solicitud. Intenta encontrar `s123` en su caché de sesiones en memoria, pero no lo encuentra.
    *   En este punto, la aplicación debe decidir cómo manejar la situación. Una implementación común es intentar validar el ID de sesión `s123` contra una base de datos de sesiones persistentes. Si `s123` es válido y no ha expirado, el Proceso B puede reconstruir la sesión de `Alice` en su memoria. Si no, `Alice` será tratada como no autenticada y se le pedirá que inicie sesión nuevamente.

Este ejemplo ilustra la importancia de diseñar la aplicación para que el estado crítico sea duradero y para que el servidor pueda reconstruir su estado operativo a partir de fuentes duraderas después de un reinicio.

## Práctica
Considere la aplicación de notas compartidas. Imagine que se implementa una funcionalidad para que los usuarios puedan "destacar" una nota, lo que la coloca en una sección especial en la interfaz de usuario. Esta preferencia de "destacado" es personal para cada usuario.

Describa dos enfoques diferentes para almacenar esta preferencia de "destacado": uno que la mantenga exclusivamente en la memoria del proceso del servidor y otro que la almacene de forma duradera. Para cada enfoque, explique qué sucede con las notas destacadas de un usuario si el servidor se reinicia inesperadamente. Luego, argumente cuál de los dos enfoques es más adecuado para una aplicación web y por qué, considerando la experiencia del usuario y la robustez del sistema.

Para comprobar su respuesta, puede simular mentalmente el flujo de eventos: un usuario destaca una nota, el servidor se reinicia, y el usuario vuelve a cargar la página. Observe si la nota sigue destacada o no en cada escenario.

## Comprobaciones
1.  ¿Qué tipo de almacenamiento es adecuado para guardar la lista de usuarios registrados en una aplicación web?
Respuesta: Almacenamiento duradero (por ejemplo, una base de datos), porque los datos de usuario deben persistir a través de reinicios del servidor.
2.  Si un servidor web mantiene una caché en memoria de los resultados de consultas frecuentes a la base de datos, ¿qué sucede con esa caché cuando el proceso del servidor se reinicia?
Respuesta: La caché en memoria se pierde por completo y debe ser reconstruida por el nuevo proceso del servidor a medida que se realizan nuevas consultas.

## Cierre
Hemos examinado el servidor como un proceso con memoria volátil y la necesidad de almacenamiento duradero para la persistencia de datos. Esta distinción es fundamental para comprender cómo se mantiene el estado en una aplicación web. En la próxima lección, profundizaremos en cómo se establecen y gestionan los límites de confianza dentro y alrededor de este proceso del servidor.
