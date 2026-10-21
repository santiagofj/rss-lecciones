---
schemaVersion: 1
id: 0e0d2e27-6117-4f6f-950c-dc8c458073c2
sequence: 16
course: fullstack
stepId: url-dns-conexion
title: Del enlace a la conexión
publishedAt: 2026-10-21T08:23:55.896Z
generationDate: 2026-10-21
summary: Esta lección explica cómo una URL permite localizar y contactar un
  servicio web. Se detalla el proceso de resolución de nombres de dominio a
  direcciones IP, la identificación de puertos para servicios específicos y el
  establecimiento de una conexión TCP. Se distingue claramente entre dominio,
  servidor y aplicación, y se ilustra el flujo completo desde la entrada de una
  URL en el navegador hasta el inicio de la comunicación HTTP con el servidor,
  utilizando un ejemplo concreto del sistema de notas compartidas.
generation:
  model: gemini-2.5-flash
  promptVersion: v3
  contextHash: 42cbcba100bbdfdfa7d516d968c8eaed3bc8bd7c7542d91e32ac73b94b2efc9e
---

## Por qué ahora
En lecciones anteriores, como "Seguir una aplicación de extremo a extremo", hemos trazado el flujo de una solicitud HTTP desde el navegador hasta el servidor y la base de datos. También hemos diseñado endpoints protegidos, como en "Diseñar un endpoint protegido completo", asumiendo que el navegador ya sabe cómo comunicarse con el servidor. Sin embargo, no hemos profundizado en el paso inicial y fundamental: cómo el navegador, a partir de una simple URL, logra identificar y establecer contacto con la máquina y el proceso correctos en la red. Comprender este mecanismo es esencial, ya que sienta las bases para entender la seguridad y el rendimiento de las comunicaciones web, y es un prerrequisito para abordar cómo HTTPS protege esta conexión.

## Explicación y ejemplo
Una URL, como `https://notas.ejemplo.com/notas/123`, es más que una dirección; es una instrucción completa para localizar y contactar un recurso. Para que el navegador pueda solicitar la nota con ID `123`, debe primero encontrar el servidor que aloja `notas.ejemplo.com` y luego establecer una comunicación con él. Este proceso se descompone en varios pasos clave.

Primero, es crucial diferenciar entre **dominio**, **servidor** y **aplicación**:
*   **Dominio**: `notas.ejemplo.com` es un nombre legible para humanos. Facilita recordar y acceder a recursos en internet. Un dominio puede apuntar a uno o varios servidores.
*   **Servidor**: Es la máquina física o virtual que está conectada a la red y que aloja el software de la aplicación. Un único servidor puede alojar múltiples dominios o aplicaciones.
*   **Aplicación**: Es el software específico (por ejemplo, el programa que gestiona las notas compartidas) que se ejecuta en el servidor y que es responsable de procesar las solicitudes HTTP para el dominio `notas.ejemplo.com`.

El navegador inicia el proceso con la parte del dominio de la URL: `notas.ejemplo.com`. Dado que las máquinas en la red se comunican usando direcciones numéricas (direcciones IP), el navegador necesita traducir este nombre de dominio a una dirección IP. Este proceso se conoce como **resolución de nombre** y es gestionado por el Sistema de Nombres de Dominio (DNS).

1.  **Resolución DNS**: El navegador consulta a un servidor DNS (generalmente configurado en el sistema operativo del usuario o por el proveedor de internet) para obtener la dirección IP asociada a `notas.ejemplo.com`. Si el servidor DNS local no tiene la información, la consulta se propaga a servidores DNS de nivel superior hasta encontrar el servidor autoritativo para `ejemplo.com`, que finalmente proporcionará la dirección IP. Por ejemplo, `notas.ejemplo.com` podría resolverse a `203.0.113.42`.

Una vez que el navegador tiene la dirección IP (`203.0.113.42`), necesita saber a qué **puerto** conectarse. El puerto es un número que identifica un proceso o servicio específico dentro de una máquina. Para HTTP, el puerto por defecto es `80`; para HTTPS, es `443`. Dado que nuestra URL es `https://`, el navegador sabe que debe intentar conectarse al puerto `443` en la dirección IP `203.0.113.42`.

2.  **Establecimiento de la conexión TCP**: Con la dirección IP y el puerto, el navegador puede iniciar una conexión de red. La mayoría de las comunicaciones web utilizan el Protocolo de Control de Transmisión (TCP) para establecer una conexión fiable. TCP garantiza que los datos se entreguen en orden y sin errores. El establecimiento de una conexión TCP implica un "apretón de manos" (handshake) de tres vías:
    *   El navegador envía un paquete SYN (Synchronize) al servidor.
    *   El servidor responde con un paquete SYN-ACK (Synchronize-Acknowledge).
    *   El navegador finaliza el establecimiento de la conexión con un paquete ACK (Acknowledge).

    Una vez completado este intercambio, se ha establecido un canal de comunicación bidireccional fiable entre el navegador y el servidor en el puerto `443`.

3.  **Envío de la solicitud HTTP**: Con la conexión TCP establecida, el navegador puede enviar la solicitud HTTP real. Esta solicitud incluye el método (GET, POST, etc.), la ruta del recurso (`/notas/123`), las cabeceras HTTP (como `Host: notas.ejemplo.com` y `User-Agent`), y opcionalmente un cuerpo de la solicitud. El servidor, que está escuchando en el puerto `443`, recibe esta solicitud y la pasa a la aplicación de notas compartidas para su procesamiento.

En resumen, el flujo para `https://notas.ejemplo.com/notas/123` es:

```text
[Navegador] --(1. Consulta DNS)--> [Servidor DNS] --(Respuesta IP: 203.0.113.42)--> [Navegador]
[Navegador] --(2. Conexión TCP a 203.0.113.42:443)--> [Servidor (203.0.113.42)]
[Navegador] --(3. Solicitud HTTP GET /notas/123)--> [Aplicación de Notas]
```

Este proceso convierte un nombre de dominio en una conexión directa a un servicio específico en una máquina remota, permitiendo la comunicación de la aplicación.

## Práctica
Considere la URL `http://blog.ejemplo.org/articulos/reciente`. Imagine que usted es un navegador que intenta acceder a este recurso. Describa paso a paso el proceso completo que seguiría el navegador para establecer la conexión con el servidor y enviar la solicitud HTTP, asumiendo que no hay información en caché y que el servidor DNS autoritativo para `ejemplo.org` tiene un registro A para `blog.ejemplo.org` que apunta a la dirección IP `198.51.100.10`. Incluya los detalles de la resolución de nombre, la dirección IP y el puerto utilizados, y el tipo de conexión. Identifique también qué componente de la URL indica el nombre de dominio, cuál la ruta del recurso y cuál el protocolo.

## Comprobaciones
1.  ¿Qué protocolo de red se utiliza para establecer una conexión fiable entre el navegador y el servidor antes de enviar la solicitud HTTP?
Respuesta: TCP (Protocolo de Control de Transmisión).
2.  Si una URL es `https://api.miempresa.com/v1/usuarios`, ¿qué número de puerto intentará usar el navegador por defecto para contactar al servidor?
Respuesta: 443.

## Cierre
Hemos explorado cómo una URL se traduce en una conexión de red funcional, desde la resolución de nombres hasta el establecimiento de un canal de comunicación. Este proceso, aunque fundamental, ocurre en texto plano y es susceptible a la interceptación. En la próxima lección, abordaremos cómo HTTPS añade una capa de seguridad a esta conexión, protegiendo la integridad y confidencialidad de los datos intercambiados.
