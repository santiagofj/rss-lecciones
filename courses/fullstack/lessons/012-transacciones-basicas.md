---
schemaVersion: 1
id: 609b4501-acae-454b-8b8a-084baacc60c4
sequence: 12
course: fullstack
stepId: transacciones-basicas
title: Proteger cambios relacionados
publishedAt: 2026-10-01T09:54:39.109Z
generationDate: 2026-09-30
summary: Esta lección aborda la necesidad de asegurar que múltiples operaciones
  de escritura, que están lógicamente conectadas, se completen de forma atómica.
  Se explora el riesgo de inconsistencia de datos cuando una falla intermedia
  interrumpe una secuencia de actualizaciones interdependientes, como una
  transferencia bancaria. Se introduce el concepto de transacciones para
  garantizar que todas las partes de una operación compleja se confirmen o se
  reviertan juntas, manteniendo la integridad del sistema. El objetivo es
  comprender cómo prevenir estados inválidos mediante la gestión coordinada de…
generation:
  model: gemini-2.5-flash
  promptVersion: v3
  contextHash: 776d1eb1f5eed87c112556137994e19487fa9f8a41ff39570d4a941826bccedd
---

## Por qué ahora
En lecciones anteriores, se ha establecido la importancia de validar la entrada en la frontera del sistema y de traducir los errores del servicio a respuestas HTTP adecuadas. Estas prácticas son fundamentales para la seguridad y la robustez de una aplicación. Sin embargo, existen escenarios donde una operación lógica requiere múltiples modificaciones de datos que deben ser tratadas como una unidad indivisible. Si una de estas modificaciones falla, las otras no deben persistir. Ignorar esta necesidad puede llevar a un estado de datos inconsistente y a fallos de negocio significativos. Es crucial entender cuándo y cómo agrupar estas escrituras para garantizar que el sistema siempre mantenga un estado válido, incluso frente a fallos inesperados.

## Explicación y ejemplo
Considere una operación común en sistemas financieros: la transferencia de fondos entre dos cuentas. Lógicamente, esta operación implica dos pasos esenciales: debitar una cantidad de la cuenta de origen y acreditar la misma cantidad a la cuenta de destino. Para que la transferencia sea exitosa, ambos pasos deben completarse. Si solo uno de ellos se ejecuta, el sistema queda en un estado inconsistente: el dinero podría haber desaparecido de la cuenta de origen sin aparecer en la de destino, o viceversa.

Para ilustrar este problema, supongamos un servicio de transferencia simplificado. Tenemos una función `transferirFondos` que recibe un ID de cuenta de origen, un ID de cuenta de destino y una cantidad. Internamente, esta función podría intentar realizar las siguientes operaciones:

1.  Restar la cantidad de la cuenta de origen.
2.  Sumar la cantidad a la cuenta de destino.

Si la primera operación (débito) se completa con éxito, pero la segunda operación (crédito) falla por alguna razón (por ejemplo, un error de red, un fallo de la base de datos, o una restricción de la cuenta de destino), el dinero se habrá restado de la cuenta de origen pero no se habrá añadido a la cuenta de destino. El sistema ha perdido dinero y se encuentra en un estado inválido.

Este tipo de problema se resuelve mediante el uso de transacciones de base de datos. Una transacción es una secuencia de operaciones que se ejecutan como una única unidad lógica de trabajo. Las transacciones garantizan las propiedades ACID (Atomicidad, Consistencia, Aislamiento, Durabilidad):

*   **Atomicidad:** Todas las operaciones dentro de la transacción se completan con éxito, o ninguna de ellas lo hace. Si alguna parte falla, toda la transacción se revierte (rollback) a su estado inicial, como si nunca hubiera ocurrido.
*   **Consistencia:** La transacción lleva la base de datos de un estado válido a otro estado válido, manteniendo todas las reglas y restricciones definidas.
*   **Aislamiento:** Las transacciones concurrentes se ejecutan de forma aislada, sin interferir entre sí. Los resultados intermedios de una transacción no son visibles para otras transacciones hasta que la primera se confirma.
*   **Durabilidad:** Una vez que una transacción se confirma, sus cambios son permanentes y sobreviven a cualquier fallo del sistema.

En la práctica, la mayoría de las bases de datos relacionales y algunas NoSQL ofrecen soporte transaccional. El flujo para una transferencia de fondos con transacciones sería el siguiente:

1.  **Iniciar transacción:** Se marca el comienzo de una nueva unidad de trabajo.
2.  **Debitar cuenta de origen:** Se actualiza el saldo de la cuenta de origen.
3.  **Acreditar cuenta de destino:** Se actualiza el saldo de la cuenta de destino.
4.  **Confirmar transacción (commit):** Si ambas operaciones anteriores tuvieron éxito, se confirman todos los cambios de forma permanente.
5.  **Revertir transacción (rollback):** Si alguna de las operaciones falla en cualquier punto, se deshacen todos los cambios realizados desde el inicio de la transacción, restaurando el estado original de la base de datos.

Consideremos un pseudocódigo para ilustrar esto:

```javascript
async function transferirFondosTransaccional(origenId, destinoId, cantidad) {
  const transaccion = await db.iniciarTransaccion();
  try {
    // 1. Validar fondos suficientes en origen (ejemplo simplificado)
    const cuentaOrigen = await transaccion.obtenerCuenta(origenId);
    if (cuentaOrigen.saldo < cantidad) {
      throw new Error("Fondos insuficientes");
    }

    // 2. Debitar cuenta de origen
    await transaccion.actualizarSaldo(origenId, -cantidad);

    // 3. Simular un fallo intermedio (ejemplo didáctico)
    // if (Math.random() < 0.5) { 
    //   throw new Error("Fallo simulado en el crédito"); 
    // }

    // 4. Acreditar cuenta de destino
    await transaccion.actualizarSaldo(destinoId, cantidad);

    // 5. Confirmar la transacción si todo fue bien
    await transaccion.confirmar();
    return { exito: true, mensaje: "Transferencia completada" };
  } catch (error) {
    // 6. Revertir la transacción si algo falla
    await transaccion.revertir();
    return { exito: false, mensaje: `Transferencia fallida: ${error.message}` };
  }
}
```

En este ejemplo, `db.iniciarTransaccion()`, `transaccion.obtenerCuenta()`, `transaccion.actualizarSaldo()`, `transaccion.confirmar()` y `transaccion.revertir()` representan operaciones abstractas proporcionadas por el ORM o el driver de la base de datos. La clave es que, si la línea que simula un fallo se activa, o si cualquier otra operación dentro del bloque `try` lanza una excepción, el bloque `catch` se encargará de llamar a `transaccion.revertir()`, asegurando que el débito de la cuenta de origen se deshaga y el sistema permanezca en un estado consistente.

## Práctica
Para esta práctica, se propone simular el comportamiento transaccional en un entorno de desarrollo. No es necesario conectar a una base de datos real, sino modelar la lógica de una transferencia y observar cómo un fallo intermedio afecta el estado.

1.  **Definir un estado inicial:** Cree un objeto JavaScript que represente un conjunto de cuentas bancarias. Cada cuenta debe tener un `id` y un `saldo`. Por ejemplo:
    ```javascript
    let cuentas = {
      "cuentaA": { id: "cuentaA", saldo: 1000 },
      "cuentaB": { id: "cuentaB", saldo: 500 }
    };
    ```

2.  **Implementar una función de transferencia no transaccional:** Escriba una función `transferirSinTransaccion(origenId, destinoId, cantidad)` que modifique directamente el objeto `cuentas`. Dentro de esta función, después de debitar la cuenta de origen, introduzca una condición para simular un fallo. Por ejemplo, si `Math.random() < 0.5`, lance un error. Luego, intente acreditar la cuenta de destino. Ejecute esta función varias veces y observe el estado de `cuentas` después de un fallo simulado.

3.  **Implementar una función de transferencia transaccional simulada:** Escriba una función `transferirConTransaccion(origenId, destinoId, cantidad)`. Esta función debe:
    *   Crear una copia del objeto `cuentas` al inicio de la operación para simular el estado inicial de la transacción.
    *   Realizar las operaciones de débito y crédito sobre esta copia.
    *   Si todas las operaciones en la copia tienen éxito, actualizar el objeto `cuentas` original con los cambios de la copia (simulando un `commit`).
    *   Si alguna operación falla (por ejemplo, el mismo `Math.random() < 0.5`), no actualizar el objeto `cuentas` original, dejando el estado original intacto (simulando un `rollback`).

4.  **Verificar el resultado:** Ejecute `transferirConTransaccion` varias veces, incluyendo casos donde se simula un fallo. Compare el estado final de `cuentas` con el estado inicial. El objetivo es confirmar que, incluso con fallos intermedios, el objeto `cuentas` original no queda en un estado inconsistente (es decir, el dinero no se pierde ni se duplica).

Esta práctica refuerza la comprensión de la atomicidad al observar directamente cómo la gestión de un estado intermedio previene la corrupción de datos ante errores.

## Comprobaciones
1.  ¿Qué propiedad de las transacciones garantiza que, si una operación de débito se completa pero la operación de crédito falla, el débito también se deshace?
Respuesta: Atomicidad.
2.  Si una transferencia de fondos se realiza sin transacciones y la operación de crédito falla, ¿qué estado de datos se esperaría observar en el sistema?
Respuesta: La cuenta de origen tendría el débito aplicado, pero la cuenta de destino no recibiría el crédito, resultando en una pérdida de fondos en el sistema.

## Cierre
La protección de cambios relacionados mediante transacciones es un pilar para la integridad de los datos en sistemas complejos. Asegura que las operaciones críticas se comporten como unidades indivisibles, previniendo estados inconsistentes. En la próxima lección, se explorará cómo estas transacciones se integran con la gestión de errores y la comunicación con el cliente, especialmente en escenarios de concurrencia.
