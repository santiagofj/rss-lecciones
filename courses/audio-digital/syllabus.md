---
schemaVersion: 1
steps:
  - id: verificar-signal-path
    unitId: ruta-digital
    topicId: bit-perfect
    title: Verificar el Signal Path
    objective: Detectar exactamente dónde una reproducción deja de ser bit-perfect.
    brief: Leer el Signal Path de Roon y separar fuente, procesamiento, transporte y DAC mediante una prueba reproducible.
  - id: construir-caso-control
    unitId: ruta-digital
    topicId: prueba-controlada
    title: Construir un caso de control
    objective: Preparar una pista y una configuración conocidas para comparar cambios.
    brief: Elegir material de prueba, desactivar DSP y registrar formato de entrada y salida.
  - id: interpretar-indicadores-roon
    unitId: ruta-digital
    topicId: roon
    title: Interpretar cada etapa de Roon
    objective: Explicar qué transforma cada bloque visible del Signal Path.
    brief: Distinguir archivo, decodificación, DSP, salida y dispositivo sin asumir que una luz verde prueba todo.
  - id: modos-salida-foobar
    unitId: ruta-digital
    topicId: foobar2000
    title: Comparar los modos de salida de foobar2000
    objective: Reconocer cuándo Windows mezcla o remuestrea la señal.
    brief: Comparar salida compartida y exclusiva y observar el formato recibido por el DAC.
  - id: frecuencia-y-profundidad
    unitId: formatos
    topicId: formato-pcm
    title: Seguir frecuencia y profundidad de bits
    objective: Rastrear qué formato entra y cuál sale en cada aplicación.
    brief: Usar ejemplos de 44.1, 48, 96 kHz y 16 o 24 bits sin confundir contenedor con contenido.
  - id: detectar-remuestreo
    unitId: formatos
    topicId: resampling
    title: Detectar un remuestreo involuntario
    objective: Probar si una etapa cambia la frecuencia de muestreo.
    brief: Diseñar una comparación simple entre varias pistas y la frecuencia mostrada por el DAC.
  - id: volumen-digital
    unitId: procesamiento
    topicId: volumen
    title: Entender el volumen digital en la ruta
    objective: Identificar cuándo el control de volumen modifica los datos de audio.
    brief: Comparar volumen fijo, volumen DSP y control del dispositivo con señales observables.
  - id: headroom-en-practica
    unitId: procesamiento
    topicId: headroom
    title: Aplicar headroom sin perder la referencia
    objective: Configurar margen cuando el DSP puede superar 0 dBFS.
    brief: Relacionar ecualización, clipping y Headroom Management con una prueba A/B.
  - id: sample-peak-true-peak
    unitId: procesamiento
    topicId: picos
    title: Diferenciar sample peak y true peak
    objective: Entender por qué puede aparecer clipping durante la reconstrucción.
    brief: Usar una explicación visual y una decisión práctica de margen, sin profundizar aún en teoría de cuantización.
  - id: exclusive-mode
    unitId: sistema
    topicId: exclusividad
    title: Saber qué garantiza el modo exclusivo
    objective: Delimitar qué problemas evita y cuáles no resuelve.
    brief: Revisar mezclador del sistema, otras aplicaciones, control de volumen y formato final.
  - id: drivers-y-dispositivo
    unitId: sistema
    topicId: controladores
    title: Separar aplicación, driver y DAC
    objective: Ubicar responsabilidades cuando la señal recibida no coincide con la esperada.
    brief: Trazar la ruta completa y decidir qué evidencia pedir en cada frontera.
  - id: diagnostico-por-capas
    unitId: diagnostico
    topicId: aislamiento
    title: Diagnosticar por capas
    objective: Aislar una transformación sin cambiar varias variables al mismo tiempo.
    brief: Aplicar una secuencia fuente-aplicación-sistema-driver-DAC y registrar resultados.
  - id: checklist-bit-perfect
    unitId: diagnostico
    topicId: checklist
    title: Crear un checklist bit-perfect
    objective: Repetir una verificación completa en pocos minutos.
    brief: Consolidar una lista breve con estado esperado, prueba y evidencia para Roon y foobar2000.
  - id: caso-final-audio
    unitId: diagnostico
    topicId: caso-integrador
    title: Resolver un caso completo
    objective: Encontrar una conversión oculta y justificar la corrección.
    brief: Resolver un escenario realista con datos de formato, Signal Path, sistema y DAC.
---

# Recorrido

El curso comienza con una verificación visible de la ruta digital y avanza hacia un método de diagnóstico repetible. Cada lección debe dejar una prueba pequeña que pueda hacerse en el equipo real.
