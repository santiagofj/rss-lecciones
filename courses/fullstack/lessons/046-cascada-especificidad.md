---
schemaVersion: 1
id: 5dd5804a-d0ec-401c-b45b-d9b16d4d7de2
sequence: 46
course: fullstack
stepId: cascada-especificidad
title: "Regla CSS aplicada: origen, prioridad y conflicto de estilos"
publishedAt: 2026-11-20T11:04:28.748Z
generationDate: 2026-11-20
summary: Esta lección explica cómo determinar qué regla CSS se aplica cuando
  varios estilos compiten, describiendo el origen de las reglas, la cascada, la
  especificidad y el orden de aparición. Se incluye un ejemplo concreto de
  conflicto en una pantalla de edición de notas y una práctica para diagnosticar
  y resolver casos similares.
generation:
  model: openai/gpt-oss-120b
  promptVersion: v5
  contextHash: b81874bfd092e88e718bf507efbaed1e94dfd7c5ab7ced7b8ec2bae1eaa562fd
---

## Por qué ahora

En la auditoría de la pantalla de edición de notas se observaron inconsistencias visuales que dificultan la lectura y la interacción. Resolver el conflicto de estilos es necesario para garantizar que los componentes mantengan la apariencia esperada en todos los navegadores y dispositivos. Además, la capacidad de identificar la regla responsable permite corregir problemas sin introducir dependencias innecesarias, lo que mejora la mantenibilidad del proyecto a medida que evoluciona. Por estas razones, dominar el algoritmo de cascada y la especificidad es un paso esencial antes de abordar conceptos de tamaño y espacio.

## Explicación y ejemplo

### Origen de las reglas CSS

Existen cuatro orígenes que pueden aportar declaraciones de estilo:

1. **Estilos del agente de usuario** (estilos por defecto del navegador).\
2. **Estilos externos** vinculados mediante `<link rel="stylesheet">`.\
3. **Estilos internos** declarados dentro de un bloque `<style>` en el documento HTML.\
4. **Estilos en línea** aplicados directamente con el atributo `style` de un elemento.

El algoritmo de la cascada determina cuál de estas fuentes gana cuando hay conflicto. La prioridad de origen sigue el orden anterior, de menor a mayor: los estilos en línea siempre tienen la mayor precedencia.

### Especificidad

Cuando varias reglas provienen del mismo origen, la **especificidad** decide. Cada selector recibe un peso representado como una tupla *(a,b,c,d)*:

- **a**: si el selector está dentro de un estilo en línea, a = 1, de lo contrario 0.\
- **b**: número de selectores de ID.\
- **c**: número de clases, atributos y pseudo‑clases.\
- **d**: número de elementos y pseudo‑elementos.

Se compara de izquierda a derecha; la primera posición que difiere determina la regla ganadora.

### Orden de aparición

Si la especificidad es idéntica, prevalece la regla que aparece **más abajo** en la hoja de estilos o en la cadena de hojas concatenadas. Esta regla se conoce como **último declarado gana**.

### Ejemplo práctico

Supongamos que la pantalla de edición de notas contiene el siguiente fragmento HTML:

```html
<div class="note-editor">
    <textarea id="content" class="input" rows="10"></textarea>
</div>
```

Y las siguientes hojas de estilo se cargan en este orden:

1. `reset.css` (estilos de reinicio).\
2. `layout.css` (estructura general).\
3. `theme.css` (tema visual).\
4. `custom.css` (ajustes específicos del proyecto).

#### Declaraciones conflictivas

- **reset.css**
```css
textarea { font-family: system-ui; font-size: 14px; }
```
- **layout.css**
```css
#content { font-size: 16px; }
```
- **theme.css**
```css
.input { font-size: 15px; }
```
- **custom.css**
```css
.note-editor textarea { font-size: 13px; }
```

Queremos saber cuál valor de `font-size` se aplicará al `<textarea id="content" class="input">`.

1. **Origen**: todas las reglas provienen de hojas externas, por lo que el origen es idéntico.
2. **Especificidad**:
   - `textarea` → (0,0,0,1)
   - `#content` → (0,1,0,0)
   - `.input` → (0,0,1,0)
   - `.note-editor textarea` → (0,0,1,1)
   La regla con mayor peso es `#content` (b=1), por lo tanto su declaración tiene prioridad sobre las demás.
3. **Orden de aparición**: no es necesario comparar porque la especificidad ya diferencia las reglas.

**Resultado**: el `<textarea>` se renderizará con `font-size: 16px;` proveniente de `layout.css`.

#### Caso de empate

Si `layout.css` tuviera la siguiente regla en su lugar:
```css
input { font-size: 16px; }
```
La especificidad sería (0,0,0,1), idéntica a la de `textarea`. En ese caso, el algoritmo revisa el orden de aparición. Como `layout.css` se carga antes que `theme.css`, la regla de `theme.css` (`.input { font-size: 15px; }`) ganaría, produciendo un tamaño de 15 px.

### Diagnóstico paso a paso

1. Listar todas las reglas que afectan la propiedad en cuestión.\
2. Identificar su origen y orden de carga.\
3. Calcular la especificidad de cada selector.\
4. Comparar pesos; si hay empate, aplicar la regla más abajo en la cadena de hojas.

Este proceso permite al desarrollador localizar rápidamente la regla responsable y decidir si se modifica la especificidad, se reordena la hoja o se elimina la regla redundante.

### Relación con la auditoría de la interfaz

En la lección anterior se pidió revisar la pantalla de edición de notas. Uno de los hallazgos fue que los bordes de los campos de texto tenían colores diferentes según el navegador. Aplicar el algoritmo descrito revela que el navegador aplica su estilo de agente de usuario, mientras que la hoja `theme.css` define un borde gris sólo para `.input`. Al aumentar la especificidad a `#content.input` o colocar la regla al final de `custom.css`, se garantiza una apariencia uniforme.

### Buenas prácticas recomendadas

- Mantener la carga de hojas en un orden lógico (reset → layout → theme → custom).\
- Evitar selectores excesivamente específicos que dificulten la sobrescritura futura.\
- Documentar los motivos de cualquier regla con alta especificidad para que otros desarrolladores comprendan su necesidad.

### Resumen del algoritmo

| Paso | Acción |
|------|--------|
| 1 | Determinar el origen de cada regla. |
| 2 | Calcular la especificidad de los selectores. |
| 3 | Seleccionar la regla con mayor peso. |
| 4 | En caso de empate, escoger la última regla declarada. |

Este esquema sirve como referencia rápida durante la auditoría y el desarrollo continuo.

## Práctica

#### Tarea práctica

1. **Descargar el fragmento**
   Copie el siguiente HTML y CSS en dos archivos locales (`index.html` y `styles.css`). No es necesario ejecutar un servidor; basta con abrir el archivo HTML en un navegador.

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Editor de notas</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="note-editor">
        <textarea id="content" class="input" rows="5"></textarea>
    </div>
</body>
</html>
```

```css
/* reset.css */
textarea { font-family: system-ui; font-size: 14px; }

/* layout.css */
#content { font-size: 16px; }

/* theme.css */
.input { font-size: 15px; }

/* custom.css */
.note-editor textarea { font-size: 13px; }
```

2. **Identificar el valor aplicado**
   Abra las herramientas de desarrollo del navegador (F12) y, en la pestaña "Computed" o "Estilos", localice la propiedad `font-size` del `<textarea>`. Anote el valor mostrado.

3. **Alterar la hoja**
   - Modifique `theme.css` cambiando la regla `.input { font-size: 18px; }`.
   - Guarde el archivo y vuelva a inspeccionar el `font-size`.
   - Explique por qué el valor cambió o no cambió.

4. **Crear un conflicto nuevo**
   Añada al final de `custom.css` la siguiente regla:
   ```css
   textarea { font-size: 20px; }
   ```
   Guarde y revise nuevamente el valor.
   - Determine cuál regla tiene prioridad y justifique la respuesta usando los pasos del algoritmo.

5. **Documentar**
   Redacte un breve informe (150‑200 palabras) que incluya:
   - El orden de carga de las hojas.\
   - La especificidad de cada regla involucrada.\
   - La regla ganadora en cada una de las tres inspecciones realizadas.\
   - Una recomendación sobre cómo reorganizar o refactorizar las reglas para evitar futuros conflictos.

Este ejercicio permite aplicar el algoritmo de cascada en un contexto realista, verificar la respuesta del navegador y practicar la documentación de decisiones de estilo.

## Comprobaciones

1. ¿Qué regla gana cuando dos selectores tienen la misma especificidad pero una aparece en una hoja cargada después de la otra?\
Respuesta: La regla que está declarada en la hoja cargada más tarde gana porque el algoritmo usa el orden de aparición como criterio de desempate.\
2. En el ejemplo propuesto, ¿cuál es el valor final de `font-size` después de añadir la regla `textarea { font-size: 20px; }` al final de `custom.css`?\
Respuesta: El valor final es 20 px, ya que la nueva regla tiene la misma especificidad que la regla original `textarea` (0,0,0,1) y, al estar declarada al final, gana por orden de aparición.

## Cierre

Conocer la regla CSS dominante permite resolver de forma estructurada los conflictos de estilo detectados en la auditoría de la pantalla de edición. El siguiente paso abordará cómo el tamaño y el espacio de los elementos influyen en la legibilidad y la interacción, ampliando la capacidad de diseñar interfaces consistentes.
