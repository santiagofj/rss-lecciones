---
schemaVersion: 1
id: c0f18053-6267-41c3-90f6-71df96af6903
sequence: 44
course: audio-digital
stepId: filtros-respuesta
title: Relacionar filtro y respuesta
publishedAt: 2026-11-19T13:22:09.784Z
generationDate: 2026-11-18
summary: Comprender la diferencia entre filtros paso bajo y paso alto,
  identificar su pendiente y observar cómo influyen en la señal de audio
  mediante Roon y foobar2000.
generation:
  model: openai/gpt-oss-120b
  promptVersion: v5
  contextHash: 83f8641470cb3e1158a09395fdb6c9e72e7581648c6281abf3e203895428139e
---

## Por qué ahora

Después de haber trabajado con ganancia digital y margen de procesamiento, el alumno ya reconoce cómo los valores de muestra pueden sobrepasar el rango PCM y cómo la saturación afecta la señal. El siguiente paso lógico es observar cómo los filtros modifican esa señal en el dominio de frecuencia. Identificar visualmente un filtro paso bajo o paso alto permite anticipar su efecto antes de aplicar ecualizaciones más complejas. Además, la relación entre la forma del filtro y su respuesta de fase influye en la coherencia de los transitorios, aspecto clave para la escucha crítica en entornos controlados como los que ofrece Roon y foobar2000.

## Explicación y ejemplo

### Definición de filtro y respuesta
Un filtro es una función matemática que altera la amplitud de los componentes de frecuencia de una señal. La **respuesta de frecuencia** describe, para cada frecuencia, el factor de ganancia que el filtro aplica. Cuando la ganancia es menor a 0 dB, la frecuencia se atenúa; cuando es mayor, se refuerza.

### Filtro paso bajo
Un filtro paso bajo (LPF) permite el paso de frecuencias inferiores a un punto de corte y atenua progresivamente las superiores. En su forma más simple, un LPF de primer orden tiene una caída de **‑6 dB por octava** (‑20 dB por década) a partir del punto de corte. Si el punto de corte se sitúa en 2 kHz, una señal de 4 kHz será reducida aproximadamente a la mitad de su amplitud (‑6 dB), mientras que a 8 kHz la atenuación será de ‑12 dB.

### Filtro paso alto
El filtro paso alto (HPF) opera de manera inversa: deja pasar frecuencias superiores al punto de corte y atenúa las inferiores. Un HPF de primer orden también tiene una pendiente de **‑6 dB por octava**, pero la caída se produce hacia frecuencias bajas. Por ejemplo, con un punto de corte en 200 Hz, una señal de 100 Hz será atenuada en ‑6 dB y una de 50 Hz en ‑12 dB.

### Pendiente y orden del filtro
La pendiente está directamente relacionada con el **orden** del filtro. Cada orden adicional duplica la caída: un filtro de segundo orden proporciona ‑12 dB por octava, un tercer orden ‑18 dB, etc. La pendiente determina la rapidez con la que el filtro separa la zona de paso de la zona de atenuación. Un filtro más abrupto (orden superior) puede introducir más fase y mayor complejidad en la respuesta temporal.

### Ejemplo práctico con foobar2000
1. Abra foobar2000 y cargue una pista de referencia que contenga contenido amplio de frecuencia (por ejemplo, una grabación de prueba con ruido rosa y un pulso de clic).
2. Active el DSP **"Equalizer"** y seleccione el preset **"Low‑pass 2 kHz"** (disponible en la lista de presets estándar). Este preset configura un filtro paso bajo de segundo orden con punto de corte en 2 kHz.
3. Abra la ventana de **"Spectrum Analyzer"** (Visualización → Spectrum). Observe la forma de la curva: hasta aproximadamente 2 kHz la amplitud se mantiene constante; a partir de ese punto la caída sigue una pendiente de ‑12 dB por octava, visible en la inclinación de la curva.
4. Cambie el preset a **"High‑pass 200 Hz"**. La curva mostrará una zona plana por encima de 200 Hz y una caída progresiva hacia frecuencias más bajas, también con pendiente de ‑12 dB por octava.
5. Para visualizar la pendiente, habilite la opción **"Show dB scale"** y marque la cuadrícula de octavas. Cada salto de una octava (por ejemplo, de 100 Hz a 200 Hz) mostrará una reducción de 12 dB, confirmando el orden del filtro.

### Observación de fase (cuando sea útil)
La fase describe el desfase temporal introducido por el filtro a cada frecuencia. En un filtro de primer orden, la fase cambia aproximadamente **‑45°** en el punto de corte; en un filtro de segundo orden el máximo desfase puede acercarse a **‑90°**. En la práctica, foobar2000 permite activar la visualización de **"Phase Plot"** en el analizador espectral. Observe que, mientras la amplitud se mantiene estable en la banda de paso, la fase comienza a variar cerca del punto de corte. Este comportamiento explica por qué los transitorios pueden sonar menos definidos cuando se aplican filtros con orden elevado.

### Resumen de observaciones clave
- Un filtro paso bajo atenúa frecuencias superiores al punto de corte; un paso alto atenúa las inferiores.
- La pendiente (‑6 dB/octava por orden) determina la rapidez de la atenuación.
- El orden del filtro afecta tanto a la pendiente como a la fase introducida.
- Foobar2000 y su analizador espectral permiten observar simultáneamente amplitud y fase, facilitando la correlación entre la configuración del filtro y su efecto audible.

## Práctica

### Objetivo de la práctica
Aplicar filtros paso bajo y paso alto en una pista de prueba, observar su respuesta de frecuencia y comparar la percepción auditiva con la representación gráfica.

### Material necesario
- foobar2000 instalado con los componentes estándar (DSP y Spectrum Analyzer).
- Roon configurado para reproducir la misma pista de prueba que se usará en foobar2000.
- Archivo de prueba que incluya ruido rosa (banda ancha) y un pulso de clic breve a 1 kHz.

### Procedimiento paso a paso
1. **Cargar la pista** en foobar2000 y en Roon simultáneamente, asegurándose de que la cadena de reproducción sea idéntica (misma nivel de volumen y mismo punto de inicio).
2. **Configurar el filtro paso bajo** en foobar2000:
   - Abra *Preferences → Playback → DSP Manager*.
   - Active el *Equalizer* y elija el preset "Low‑pass 2 kHz".
   - Marque la casilla *Enable real‑time spectrum*.
3. **Observar la respuesta**:
   - Abra *Visualización → Spectrum*.
   - Anote la forma de la curva en la zona de 1‑4 kHz.
   - Active la cuadrícula de octavas y registre la caída de dB por octava.
4. **Escuchar** la pista durante 30 s y describir cualquier cambio perceptible en la claridad de los agudos y la presencia de los transitorios.
5. **Repetir con filtro paso alto**:
   - Cambie el preset a "High‑pass 200 Hz".
   - Observe la nueva curva y repita la escucha.
6. **Comparar en Roon**:
   - En Roon, abra la misma pista y utilice el *Equalizer* para crear manualmente un filtro paso bajo de 2 kHz (tipo "Low‑Shelf" con ganancia -12 dB y frecuencia de corte 2 kHz).
   - Observe la representación de la curva en la sección *Audio Settings → Equalizer*.
   - Escuche la pista y contraste la sensación con la obtenida en foobar2000.
7. **Documentar**:
   - Capture una captura de pantalla de cada curva (foobar2000 y Roon).
   - Anote en un bloc de notas los valores de atenuación observados en las octavas relevantes.
   - Registre una breve descripción de la diferencia auditiva entre los dos entornos.

### Evaluación de la tarea
- La curva gráfica debe mostrar una pendiente cercana a ‑12 dB por octava para los filtros de segundo orden.
- La percepción auditiva debe coincidir con la atenuación esperada: reducción de los agudos en el paso bajo y mayor presencia de los graves en el paso alto.
- La comparación entre foobar2000 y Roon debe evidenciar que, aunque la implementación difiere (DSP vs. Equalizer), el principio de respuesta de frecuencia es idéntico.

Al completar la práctica, el alumno habrá visualizado y escuchado directamente cómo la forma del filtro determina la respuesta de frecuencia y, de manera indirecta, la respuesta de fase.

## Comprobaciones

1. ¿Cuál es la caída típica en dB por octava de un filtro paso bajo de primer orden?
Respuesta: ‑6 dB por octava.
2. Si se aplica un filtro paso alto de segundo orden con punto de corte en 200 Hz, ¿cuánta atenuación se espera aproximadamente a 50 Hz?
Respuesta: Aproximadamente ‑12 dB por octava, lo que corresponde a una caída de 24 dB (dos octavas) respecto a 200 Hz.

## Cierre

Esta lección ha consolidado la capacidad de identificar visual y auditivamente la respuesta de filtros paso bajo y paso alto, así como de relacionar la pendiente con el orden del filtro. En el próximo módulo se abordará la evaluación de una conversión de frecuencia, donde esos conceptos serán esenciales para interpretar la integridad del proceso de muestreo y reconversión.
