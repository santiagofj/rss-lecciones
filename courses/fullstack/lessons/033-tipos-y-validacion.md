---
schemaVersion: 1
id: 03c5a547-ebf9-4c47-bc70-c5ecc51cb841
sequence: 33
course: fullstack
stepId: tipos-y-validacion
title: Separar tipos de validación real
publishedAt: 2026-11-07T21:25:28.299Z
generationDate: 2026-11-07
summary: Esta lección clarifica la distinción entre validación en tiempo de
  desarrollo y en tiempo de ejecución, esencial para aplicaciones web robustas.
  Explica cómo las anotaciones de tipo proporcionan garantías tempranas dentro
  de una base de código, mientras que los datos reales recibidos de fuentes
  externas, como solicitudes de red, requieren validación explícita en tiempo de
  ejecución. Usando la aplicación de notas compartidas como ejemplo, la lección
  ilustra cómo validar datos JSON entrantes contra estructuras y tipos
  esperados, asegurando la integridad de los datos y previniendo errores.…
generation:
  model: gemini-2.5-flash
  promptVersion: v3
  contextHash: b1d283a43e86554d60ebd04d473b0da29b16ae89a0eb8e5798ec838728cb4704
---

## Por qué ahora
Las aplicaciones web modernas interactúan constantemente con datos provenientes de diversas fuentes, siendo la red una de las más comunes y menos predecibles. En el desarrollo, a menudo se utilizan herramientas y convenciones para definir la estructura y los tipos de datos esperados dentro del código. Sin embargo, estas definiciones internas no se extienden automáticamente a los datos que se reciben de una API externa, de un formulario de usuario o de cualquier otra fuente no controlada directamente por la aplicación. Es fundamental comprender que una anotación de tipo en el código fuente, aunque útil para la consistencia interna, no valida los datos que llegan por la red. Ignorar esta distinción puede llevar a errores en tiempo de ejecución, vulnerabilidades de seguridad o comportamientos inesperados de la aplicación. Esta lección aborda la necesidad de diferenciar y aplicar distintos tipos de validación para garantizar la integridad y la robustez de los datos en cada etapa del ciclo de vida de una aplicación.

## Explicación y ejemplo
La validación de datos es un proceso crítico en cualquier aplicación, pero su naturaleza y el momento de su aplicación varían significativamente. Podemos distinguir dos categorías principales: la validación en tiempo de desarrollo (o pre-ejecución) y la validación en tiempo de ejecución.

La **validación en tiempo de desarrollo** se refiere a las comprobaciones que se realizan antes de que el código se ejecute, a menudo durante la escritura o la compilación. Herramientas como TypeScript, JSDoc con editores de código o sistemas de tipos estáticos en otros lenguajes, permiten definir la forma esperada de los datos y sus tipos. Por ejemplo, si se define una interfaz `Nota` con propiedades `id: string`, `titulo: string` y `contenido: string`, el editor de código puede advertir si se intenta asignar un número a `titulo` o si se omite una propiedad requerida. Estas herramientas son extremadamente valiosas para mantener la consistencia interna del código y prevenir errores lógicos antes de que la aplicación se despliegue. Sin embargo, estas garantías se aplican únicamente al código fuente y a los datos que se manipulan internamente; no pueden validar datos que provienen de fuentes externas.

La **validación en tiempo de ejecución**, por otro lado, es el proceso de verificar la estructura, los tipos y los valores de los datos *mientras la aplicación se está ejecutando*. Esto es indispensable para cualquier dato que provenga de una fuente no confiable, como una solicitud HTTP, la entrada de un usuario o una base de datos externa. Cuando una aplicación cliente envía una solicitud para crear una nota, el servidor recibe un cuerpo de solicitud que es, inicialmente, una cadena de texto. Aunque el cliente pueda haber enviado un objeto JSON con `id`, `titulo` y `contenido`, no hay garantía de que el servidor reciba exactamente eso. El JSON podría estar malformado, faltarle propiedades o tener valores de tipos incorrectos (por ejemplo, `titulo: 123` en lugar de `titulo: "Mi título"`).

Consideremos el caso de nuestra aplicación de notas compartidas. Un cliente envía una solicitud `POST /notas` con el siguiente cuerpo JSON:

```json
{
  "titulo": "Mi primera nota",
  "contenido": "Este es el contenido de mi nota."
}
```

En el servidor, el proceso de manejo de esta solicitud implicaría los siguientes pasos de validación en tiempo de ejecución:

1.  **Parseo del cuerpo de la solicitud:** El servidor primero intenta parsear la cadena de texto del cuerpo de la solicitud a un objeto JavaScript. Si la cadena no es un JSON válido, este paso fallará (por ejemplo, con un error HTTP 400 Bad Request).

    ```pseudocodigo
    cuerpo_raw = obtener_cuerpo_solicitud()
    try:
        datos_json = JSON.parse(cuerpo_raw)
    except ErrorParseoJSON:
        responder_con_error(400, "JSON inválido")
        return
    ```

2.  **Validación de estructura y tipos:** Una vez que se tiene un objeto JavaScript, se debe verificar que contenga las propiedades esperadas (`titulo`, `contenido`) y que sus valores sean del tipo correcto (cadenas de texto). Esto es crucial porque `JSON.parse` no impone tipos; solo convierte la cadena en un objeto genérico.

    ```pseudocodigo
    // Definición de la estructura esperada para una nueva nota
    ESQUEMA_NUEVA_NOTA = {
        titulo: { tipo: "string", requerido: true, longitud_max: 100 },
        contenido: { tipo: "string", requerido: true, longitud_max: 5000 }
    }

    // Función de validación genérica
    funcion validar_objeto(objeto, esquema):
        errores = []
        para cada propiedad en esquema:
            si esquema[propiedad].requerido y no (propiedad en objeto):
                agregar_error(errores, propiedad, "es requerido")
                continuar
            si (propiedad en objeto):
                valor = objeto[propiedad]
                si tipo_de(valor) != esquema[propiedad].tipo:
                    agregar_error(errores, propiedad, "tipo incorrecto")
                si esquema[propiedad].tipo == "string" y longitud(valor) > esquema[propiedad].longitud_max:
                    agregar_error(errores, propiedad, "excede longitud máxima")
        retornar errores

    errores_validacion = validar_objeto(datos_json, ESQUEMA_NUEVA_NOTA)

    si longitud(errores_validacion) > 0:
        responder_con_error(400, "Datos de nota inválidos", errores_validacion)
        return
    ```

3.  **Uniones de estados para datos validados:** Para manejar los datos de forma segura, se puede pensar en el objeto recibido como pasando por diferentes estados. Inicialmente, es un `ObjetoSinValidar`. Después de la validación, puede transformarse en un `ObjetoValidado` (si todo es correcto) o en un `ObjetoInvalido` (si hay errores). Esto permite que el resto del código solo opere con datos que ya han sido verificados y se ajustan a las expectativas.

    ```pseudocodigo
    // Tipo de datos antes de la validación
    tipo ObjetoSinValidar = cualquier_objeto_javascript

    // Tipo de datos después de la validación exitosa
    tipo NotaValidada = {
        titulo: string,
        contenido: string
    }

    // Tipo de datos si la validación falla
    tipo ErroresValidacion = {
        campo: string,
        mensaje: string
    }[]

    // Resultado de la validación
    tipo ResultadoValidacion = {
        estado: "exito",
        datos: NotaValidada
    } | {
        estado: "fallo",
        errores: ErroresValidacion
    }

    resultado = realizar_validacion(datos_json, ESQUEMA_NUEVA_NOTA)

    si resultado.estado == "exito":
        // Aquí 'resultado.datos' es de tipo NotaValidada
        guardar_nota(resultado.datos.titulo, resultado.datos.contenido)
        responder_con_exito(201, "Nota creada")
    sino:
        // Aquí 'resultado.errores' es de tipo ErroresValidacion
        responder_con_error(400, "Datos inválidos", resultado.errores)
    ```

Este enfoque garantiza que, aunque el código interno pueda usar anotaciones de tipo para su propia coherencia, los datos que cruzan los límites de la aplicación (especialmente desde la red) son explícitamente verificados en tiempo de ejecución. Esto previene que datos malformados o maliciosos causen fallos o comprometan la seguridad de la aplicación.

## Práctica
Imagine que la aplicación de notas compartidas permite a los usuarios actualizar el título y el contenido de una nota existente mediante una solicitud `PUT /notas/{id}`. El cuerpo de la solicitud puede incluir `titulo`, `contenido` o ambos, pero al menos uno debe estar presente. Además, el `id` de la nota en la URL debe ser una cadena no vacía.

Diseñe el pseudocódigo para la validación en tiempo de ejecución de una solicitud `PUT /notas/{id}`. Considere los siguientes puntos:

1.  **Validación del `id` de la URL:** ¿Cómo verificaría que el `id` es una cadena no vacía?
2.  **Parseo del cuerpo:** Asuma que el cuerpo ya ha sido parseado a un objeto JavaScript `datos_actualizacion`.
3.  **Validación de propiedades:** Verifique que `titulo` (si está presente) sea una cadena no vacía y que `contenido` (si está presente) sea una cadena no vacía. El título no debe exceder los 100 caracteres y el contenido los 5000 caracteres.
4.  **Presencia de al menos una propiedad:** Asegúrese de que al menos `titulo` o `contenido` estén presentes en el cuerpo de la solicitud para que la actualización tenga sentido.
5.  **Manejo de errores:** Si la validación falla, ¿qué tipo de respuesta HTTP y qué información de error devolvería?

Escriba el pseudocódigo que represente esta lógica de validación, incluyendo la estructura de un posible objeto de error.

## Comprobaciones
1.  ¿Cuál es la principal diferencia entre una anotación de tipo en el código fuente y la validación de datos en tiempo de ejecución recibidos por una API?
    Respuesta: La anotación de tipo proporciona garantías de consistencia y corrección dentro del código fuente durante el desarrollo o la compilación, mientras que la validación en tiempo de ejecución verifica la estructura, los tipos y los valores de los datos que llegan de fuentes externas (como la red) para asegurar su conformidad con las expectativas de la aplicación en el momento de su procesamiento.
2.  Si un cliente envía una solicitud `POST /notas` con el cuerpo `{"titulo": 123, "contenido": "Mi nota"}`, ¿qué tipo de validación fallaría primero y qué código de estado HTTP sería una respuesta apropiada?
    Respuesta: La validación en tiempo de ejecución fallaría primero, específicamente la comprobación del tipo de la propiedad `titulo`. Una respuesta HTTP apropiada sería 400 Bad Request, indicando que los datos de la solicitud son inválidos.

## Cierre
Hemos explorado la distinción crucial entre las garantías de tipo en el código y la necesidad de validar explícitamente los datos que provienen de fuentes externas. Comprender cuándo y dónde aplicar cada tipo de validación es fundamental para la robustez de una aplicación. En la próxima lección, profundizaremos en cómo diseñar los estados de una operación, lo cual es esencial para gestionar la complejidad y la fiabilidad de las interacciones en sistemas distribuidos.
