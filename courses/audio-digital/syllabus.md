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
  - id: "amplitud-y-frecuencia"
    unitId: "senal-y-nivel"
    topicId: "amplitud-y-frecuencia"
    title: "Leer amplitud y frecuencia"
    objective: "Relacionar una onda con su nivel y altura sin confundirlos."
    brief: "Retomar el caso de diagnóstico anterior. Comparar dos senoidales con datos de amplitud y frecuencia y dibujar qué cambia. Continuidad: el siguiente paso es «Comprender período y fase»."
  - id: "periodo-y-fase"
    unitId: "senal-y-nivel"
    topicId: "periodo-y-fase"
    title: "Comprender período y fase"
    objective: "Predecir qué ocurre al desplazar o invertir una señal."
    brief: "Usar dos ondas sencillas; distinguir desplazamiento temporal, inversión de polaridad y cancelación al sumarlas. Continuidad: el siguiente paso es «Separar canales y escena estéreo»."
  - id: "canales-y-estereo"
    unitId: "senal-y-nivel"
    topicId: "canales-y-estereo"
    title: "Separar canales y escena estéreo"
    objective: "Explicar qué contienen los canales izquierdo y derecho."
    brief: "Comparar mono, doble mono y estéreo con ejemplos de datos y una prueba de balance reversible. Continuidad: el siguiente paso es «Entender una escala en decibelios»."
  - id: "decibelios-relativos"
    unitId: "senal-y-nivel"
    topicId: "decibelios-relativos"
    title: "Entender una escala en decibelios"
    objective: "Interpretar relaciones de nivel sin tratar los decibelios como unidades absolutas."
    brief: "Comparar relaciones de amplitud y potencia; introducir sólo las cuentas necesarias y distinguir valores relativos de referencias absolutas. Continuidad: el siguiente paso es «Separar dBFS de volumen acústico»."
  - id: "dbfs-y-nivel-acustico"
    unitId: "senal-y-nivel"
    topicId: "dbfs-y-nivel-acustico"
    title: "Separar dBFS de volumen acústico"
    objective: "Explicar por qué un mismo archivo puede escucharse a distintos niveles."
    brief: "Trazar archivo, ganancia, DAC y control analógico. Resolver un caso sin inferir presión sonora desde dBFS. Continuidad: el siguiente paso es «Integrar el vocabulario de la señal»."
  - id: "integracion-senal"
    unitId: "senal-y-nivel"
    topicId: "integracion-senal"
    title: "Integrar el vocabulario de la señal"
    objective: "Describir una señal usando magnitudes y referencias correctas."
    brief: "Interpretar un pequeño informe con onda, canales, frecuencia y niveles. Recuperar la distinción entre datos y reproducción audible. Continuidad: el siguiente paso es «Qué representa una muestra»."
  - id: "muestras-en-el-tiempo"
    unitId: "muestreo-reconstruccion"
    topicId: "muestras-en-el-tiempo"
    title: "Qué representa una muestra"
    objective: "Interpretar una secuencia de muestras como medidas en instantes definidos."
    brief: "Construir una tabla de una onda simple y separar cantidad de muestras, duración y frecuencia de muestreo. Continuidad: el siguiente paso es «Relacionar banda y frecuencia de muestreo»."
  - id: "banda-y-nyquist"
    unitId: "muestreo-reconstruccion"
    topicId: "banda-y-nyquist"
    title: "Relacionar banda y frecuencia de muestreo"
    objective: "Justificar el límite de banda de una representación muestreada."
    brief: "Usar ejemplos de frecuencias por debajo y por encima de la mitad de la frecuencia de muestreo; explicitar las condiciones del teorema. Continuidad: el siguiente paso es «Reconocer aliasing»."
  - id: "aliasing-observable"
    unitId: "muestreo-reconstruccion"
    topicId: "aliasing-observable"
    title: "Reconocer aliasing"
    objective: "Predecir una frecuencia aparente al muestrear una señal inadecuadamente."
    brief: "Comparar tablas o gráficos proporcionados, explicar la ambigüedad y decidir si cambiar la profundidad de bits resolvería el problema. Continuidad: el siguiente paso es «Por qué se filtra antes de muestrear»."
  - id: "filtro-antialias"
    unitId: "muestreo-reconstruccion"
    topicId: "filtro-antialias"
    title: "Por qué se filtra antes de muestrear"
    objective: "Ubicar el filtrado necesario antes de una conversión o reducción de frecuencia."
    brief: "Seguir una cadena con contenido fuera de banda y razonar por qué filtrarlo después no deshace un alias ya incorporado. Continuidad: el siguiente paso es «Reconstruir una onda continua»."
  - id: "reconstruccion-continua"
    unitId: "muestreo-reconstruccion"
    topicId: "reconstruccion-continua"
    title: "Reconstruir una onda continua"
    objective: "Explicar por qué el audio reconstruido no es una escalera de muestras."
    brief: "Comparar puntos de muestra, visualización escalonada y señal reconstruida; distinguir el dibujo del funcionamiento real del conversor. Continuidad: el siguiente paso es «Elegir una frecuencia de muestreo»."
  - id: "elegir-frecuencia"
    unitId: "muestreo-reconstruccion"
    topicId: "elegir-frecuencia"
    title: "Elegir una frecuencia de muestreo"
    objective: "Justificar una elección según contenido, procesamiento y destino."
    brief: "Resolver casos de reproducción musical, audio para video y procesamiento; evitar convertir una frecuencia mayor en garantía de mayor calidad. Continuidad: el siguiente paso es «Diagnosticar un problema de muestreo»."
  - id: "integracion-muestreo"
    unitId: "muestreo-reconstruccion"
    topicId: "integracion-muestreo"
    title: "Diagnosticar un problema de muestreo"
    objective: "Separar aliasing, remuestreo y diferencias de visualización."
    brief: "Resolver tres cadenas con datos suficientes; recuperar la ruta digital inicial y justificar una única intervención por caso. Continuidad: el siguiente paso es «Representar amplitudes con valores finitos»."
  - id: "cuantizacion-redondeo"
    unitId: "cuantizacion-dither"
    topicId: "cuantizacion-redondeo"
    title: "Representar amplitudes con valores finitos"
    objective: "Calcular un redondeo sencillo y explicar el error resultante."
    brief: "Usar pocos niveles y una tabla pequeña antes de pasar a 16 o 24 bits; separar precisión de amplitud y precisión temporal. Continuidad: el siguiente paso es «Escuchar e interpretar el error de cuantización»."
  - id: "error-correlacionado"
    unitId: "cuantizacion-dither"
    topicId: "error-correlacionado"
    title: "Escuchar e interpretar el error de cuantización"
    objective: "Distinguir error dependiente de la señal de un ruido idealizado."
    brief: "Comparar resultados proporcionados de una señal de bajo nivel con y sin tratamiento; no asumir que todo error es ruido blanco. Continuidad: el siguiente paso es «Relacionar bits y rango dinámico»."
  - id: "bits-y-rango"
    unitId: "cuantizacion-dither"
    topicId: "bits-y-rango"
    title: "Relacionar bits y rango dinámico"
    objective: "Explicar qué permite una mayor profundidad y qué no mejora por sí sola."
    brief: "Contrastar la representación digital ideal con el ruido de una cadena real; aclarar las condiciones de cualquier regla numérica aproximada. Continuidad: el siguiente paso es «Seguir una señal de nivel muy bajo»."
  - id: "senales-bajo-nivel"
    unitId: "cuantizacion-dither"
    topicId: "senales-bajo-nivel"
    title: "Seguir una señal de nivel muy bajo"
    objective: "Razonar sobre detalle, ruido y audibilidad sin usar la imagen de escalones audibles."
    brief: "Interpretar un ejemplo de señal atenuada y distinguir resolución estadística, distorsión y condiciones de escucha. Continuidad: el siguiente paso es «Para qué sirve el dither»."
  - id: "dither-funcion"
    unitId: "cuantizacion-dither"
    topicId: "dither-funcion"
    title: "Para qué sirve el dither"
    objective: "Explicar cómo añadir ruido controlado puede reducir distorsión de cuantización."
    brief: "Comparar la misma reducción de bits con y sin dither mediante datos o archivos de prueba; introducir la idea sin matemática avanzada. Continuidad: el siguiente paso es «Separar dither y noise shaping»."
  - id: "dither-noise-shaping"
    unitId: "cuantizacion-dither"
    topicId: "dither-noise-shaping"
    title: "Separar dither y noise shaping"
    objective: "Distinguir la aleatorización del error de su distribución espectral."
    brief: "Leer dos espectros y justificar por qué trasladar energía de ruido no equivale a eliminarla; no recomendar tratamientos por nombre comercial. Continuidad: el siguiente paso es «Preparar una reducción de profundidad»."
  - id: "integracion-profundidad"
    unitId: "cuantizacion-dither"
    topicId: "integracion-profundidad"
    title: "Preparar una reducción de profundidad"
    objective: "Decidir dónde y cuándo aplicar dither en una cadena concreta."
    brief: "Resolver una exportación desde procesamiento de alta precisión a un formato de entrega; recuperar ganancias, clipping y destino final. Continuidad: el siguiente paso es «Separar muestras, códec y contenedor»."
  - id: "pcm-contenedor"
    unitId: "formatos-compresion"
    topicId: "pcm-contenedor"
    title: "Separar muestras, códec y contenedor"
    objective: "Explicar qué describe PCM y qué aporta un archivo WAV o AIFF."
    brief: "Clasificar varias fichas de archivo y distinguir formato de muestras, encapsulado y metadatos. Continuidad: el siguiente paso es «Qué conserva FLAC o ALAC»."
  - id: "compresion-sin-perdidas"
    unitId: "formatos-compresion"
    topicId: "compresion-sin-perdidas"
    title: "Qué conserva FLAC o ALAC"
    objective: "Verificar conceptualmente la igualdad de muestras tras decodificar."
    brief: "Comparar tamaño, datos decodificados y etiquetas. Proponer una prueba válida sin comparar hashes de contenedores distintos. Continuidad: el siguiente paso es «Cómo funciona la compresión con pérdidas»."
  - id: "compresion-perceptual"
    unitId: "formatos-compresion"
    topicId: "compresion-perceptual"
    title: "Cómo funciona la compresión con pérdidas"
    objective: "Relacionar bitrate, decisiones perceptuales y descarte irreversible."
    brief: "Comparar dos codificaciones del mismo máster y explicar por qué transcodificar no recupera la información descartada. Continuidad: el siguiente paso es «Separar máster y formato de distribución»."
  - id: "master-formato"
    unitId: "formatos-compresion"
    topicId: "master-formato"
    title: "Separar máster y formato de distribución"
    objective: "Identificar variables confundidas al comparar dos ediciones."
    brief: "Diseñar una comparación con el mismo origen y nivel; usar un caso donde la edición pesa más que la etiqueta de resolución. Continuidad: el siguiente paso es «Situar DSD y PCM»."
  - id: "dsd-frente-pcm"
    unitId: "formatos-compresion"
    topicId: "dsd-frente-pcm"
    title: "Situar DSD y PCM"
    objective: "Describir diferencias de representación y procesamiento sin jerarquías automáticas."
    brief: "Seguir dos rutas de reproducción con conversión y filtrado explícitos; no exigir un DAC DSD ni afirmar superioridad audible por formato. Continuidad: el siguiente paso es «Diseñar una política de archivos»."
  - id: "integracion-formatos"
    unitId: "formatos-compresion"
    topicId: "integracion-formatos"
    title: "Diseñar una política de archivos"
    objective: "Justificar formatos para archivo, reproducción y entrega."
    brief: "Organizar tres destinos, verificar conservación cuando corresponde y resolver una conversión que evitaría pérdidas acumuladas. Continuidad: el siguiente paso es «Seguir una ganancia digital»."
  - id: "ganancia-y-datos"
    unitId: "procesamiento-senal"
    topicId: "ganancia-y-datos"
    title: "Seguir una ganancia digital"
    objective: "Predecir cómo una ganancia cambia muestras y picos."
    brief: "Aplicar una ganancia a una tabla y separar modificación de datos de degradación audible; recuperar el volumen digital inicial. Continuidad: el siguiente paso es «Entender el margen de procesamiento»."
  - id: "coma-flotante-audio"
    unitId: "procesamiento-senal"
    topicId: "coma-flotante-audio"
    title: "Entender el margen de procesamiento"
    objective: "Distinguir representación interna de límites de entrada y salida."
    brief: "Trazar una cadena en coma flotante con un pico interno superior al techo de entrega y decidir dónde se produce el recorte irreversible. Continuidad: el siguiente paso es «Leer un ecualizador paramétrico»."
  - id: "ecualizacion-parametros"
    unitId: "procesamiento-senal"
    topicId: "ecualizacion-parametros"
    title: "Leer un ecualizador paramétrico"
    objective: "Relacionar frecuencia, ganancia y ancho de banda con una intervención."
    brief: "Interpretar tres filtros y anticipar sus efectos antes de cambiar controles; usar ejemplos sin afirmar correcciones acústicas no medidas. Continuidad: el siguiente paso es «Relacionar filtro y respuesta»."
  - id: "filtros-respuesta"
    unitId: "procesamiento-senal"
    topicId: "filtros-respuesta"
    title: "Relacionar filtro y respuesta"
    objective: "Reconocer paso bajo, paso alto y variaciones de pendiente."
    brief: "Comparar respuestas de frecuencia y un ejemplo de señal; introducir fase sólo cuando ayude a interpretar el comportamiento. Continuidad: el siguiente paso es «Evaluar una conversión de frecuencia»."
  - id: "resampling-calidad"
    unitId: "procesamiento-senal"
    topicId: "resampling-calidad"
    title: "Evaluar una conversión de frecuencia"
    objective: "Identificar filtrado, aliasing y límites de una prueba de remuestreo."
    brief: "Seguir una conversión con tasas distintas y definir una comprobación reproducible sin suponer que múltiplos enteros garantizan calidad. Continuidad: el siguiente paso es «Decidir el orden del procesamiento»."
  - id: "cadena-dsp-orden"
    unitId: "procesamiento-senal"
    topicId: "cadena-dsp-orden"
    title: "Decidir el orden del procesamiento"
    objective: "Justificar por qué el orden de algunas operaciones importa."
    brief: "Comparar ganancia, EQ y limitación en dos órdenes; calcular o describir consecuencias con señales sencillas. Continuidad: el siguiente paso es «Preparar una cadena DSP controlada»."
  - id: "integracion-dsp"
    unitId: "procesamiento-senal"
    topicId: "integracion-dsp"
    title: "Preparar una cadena DSP controlada"
    objective: "Documentar transformaciones, margen y comparación de nivel."
    brief: "Diseñar una cadena para un caso explícito y compararla con bypass; recuperar muestreo, profundidad y límites del formato final. Continuidad: el siguiente paso es «Separar nivel medio y pico»."
  - id: "nivel-medio-pico"
    unitId: "sonoridad-dinamica"
    topicId: "nivel-medio-pico"
    title: "Separar nivel medio y pico"
    objective: "Explicar por qué dos señales con igual pico pueden sonar distintas."
    brief: "Comparar una señal sostenida y una transitoria usando datos de nivel; recuperar la escala de decibelios. Continuidad: el siguiente paso es «Interpretar medidas de sonoridad»."
  - id: "medir-sonoridad"
    unitId: "sonoridad-dinamica"
    topicId: "medir-sonoridad"
    title: "Interpretar medidas de sonoridad"
    objective: "Distinguir medidas momentáneas, de corto plazo e integradas."
    brief: "Leer un informe con unidades explicadas y razonar sobre fragmento frente a obra completa sin inventar objetivos universales. Continuidad: el siguiente paso es «Describir dinámica y factor de cresta»."
  - id: "rango-dinamico-musical"
    unitId: "sonoridad-dinamica"
    topicId: "rango-dinamico-musical"
    title: "Describir dinámica y factor de cresta"
    objective: "Separar contraste musical, rango medido y diferencia entre picos y promedio."
    brief: "Comparar dos registros y argumentar qué describe cada indicador y qué no permite juzgar sobre la interpretación. Continuidad: el siguiente paso es «Aplicar normalización sin confusiones»."
  - id: "normalizacion-reproduccion"
    unitId: "sonoridad-dinamica"
    topicId: "normalizacion-reproduccion"
    title: "Aplicar normalización sin confusiones"
    objective: "Explicar una corrección de ganancia por pista o por álbum."
    brief: "Analizar un álbum con contrastes internos y distinguir normalización, ReplayGain y compresión dinámica. Continuidad: el siguiente paso es «Entender compresor y limitador»."
  - id: "limitacion-compresion"
    unitId: "sonoridad-dinamica"
    topicId: "limitacion-compresion"
    title: "Entender compresor y limitador"
    objective: "Predecir cambios de envolvente y picos según una regla simple."
    brief: "Interpretar umbral, relación, ataque y recuperación con un ejemplo; evitar recomendar procesar toda reproducción por defecto. Continuidad: el siguiente paso es «Comparar dos versiones con nivel controlado»."
  - id: "integracion-sonoridad"
    unitId: "sonoridad-dinamica"
    topicId: "integracion-sonoridad"
    title: "Comparar dos versiones con nivel controlado"
    objective: "Preparar una comparación sin confundir más fuerte con mejor."
    brief: "Usar un informe de pico y sonoridad, fijar un método de igualación y separar cambios de máster, dinámica y formato. Continuidad: el siguiente paso es «Ubicar la conversión analógica digital»."
  - id: "adc-cadena"
    unitId: "conversion-interfaces"
    topicId: "adc-cadena"
    title: "Ubicar la conversión analógica digital"
    objective: "Explicar qué responsabilidades tiene cada etapa de captura."
    brief: "Trazar entrada analógica, acondicionamiento, filtrado y cuantización; relacionarlo con los fundamentos sin exigir un dispositivo de grabación. Continuidad: el siguiente paso es «Ubicar la conversión digital analógica»."
  - id: "dac-cadena"
    unitId: "conversion-interfaces"
    topicId: "dac-cadena"
    title: "Ubicar la conversión digital analógica"
    objective: "Separar recepción de datos, reconstrucción y etapa de salida."
    brief: "Interpretar un diagrama funcional de DAC y ubicar qué transformaciones puede y no puede revelar su indicador. Continuidad: el siguiente paso es «Separar reloj y datos»."
  - id: "reloj-jitter"
    unitId: "conversion-interfaces"
    topicId: "reloj-jitter"
    title: "Separar reloj y datos"
    objective: "Explicar el concepto de jitter y dónde importa su efecto temporal."
    brief: "Comparar reloj de conversión y llegada de paquetes; no equiparar variaciones de red con distorsión analógica sin conocer la arquitectura. Continuidad: el siguiente paso es «Seguir una ruta USB de audio»."
  - id: "usb-audio-transporte"
    unitId: "conversion-interfaces"
    topicId: "usb-audio-transporte"
    title: "Seguir una ruta USB de audio"
    objective: "Distinguir datos, buffers, sincronización y alimentación."
    brief: "Resolver un caso de desconexiones frente a uno de ruido analógico; evitar atribuir cambios de bits a un cable sin una prueba. Continuidad: el siguiente paso es «Comparar transportes S/PDIF»."
  - id: "spdif-optico-coaxial"
    unitId: "conversion-interfaces"
    topicId: "spdif-optico-coaxial"
    title: "Comparar transportes S/PDIF"
    objective: "Identificar restricciones de formato, sincronización y aislamiento."
    brief: "Contrastar una ruta óptica y una coaxial con requisitos explícitos; separar compatibilidad, errores y afirmaciones de audibilidad. Continuidad: el siguiente paso es «Distinguir ruido digital y analógico»."
  - id: "ruido-etapa-analogica"
    unitId: "conversion-interfaces"
    topicId: "ruido-etapa-analogica"
    title: "Distinguir ruido digital y analógico"
    objective: "Aislar un zumbido o interferencia sin cambiar varias variables."
    brief: "Diseñar pruebas reversibles de conexiones y niveles; no sugerir intervenciones eléctricas ni instrumental especializado. Continuidad: el siguiente paso es «Elegir una interfaz por requisitos»."
  - id: "integracion-interfaces"
    unitId: "conversion-interfaces"
    topicId: "integracion-interfaces"
    title: "Elegir una interfaz por requisitos"
    objective: "Justificar una ruta por compatibilidad y evidencia."
    brief: "Comparar dos configuraciones con formatos admitidos y síntomas; recuperar bit-perfect y explicar por qué no describe toda la cadena analógica. Continuidad: el siguiente paso es «Organizar una biblioteca verificable»."
  - id: "biblioteca-metadatos"
    unitId: "biblioteca-y-red"
    topicId: "biblioteca-metadatos"
    title: "Organizar una biblioteca verificable"
    objective: "Distinguir identidad musical, archivos y etiquetas."
    brief: "Resolver duplicados, discos múltiples y numeración sin alterar el audio; proponer nombres y etiquetas consistentes. Continuidad: el siguiente paso es «Relacionar buffer, latencia y cortes»."
  - id: "buffer-latencia"
    unitId: "biblioteca-y-red"
    topicId: "buffer-latencia"
    title: "Relacionar buffer, latencia y cortes"
    objective: "Explicar el compromiso entre tolerancia a retrasos y respuesta."
    brief: "Interpretar una secuencia temporal de lecturas y vaciado del buffer; separar cortes de reproducción y supuesta pérdida gradual de calidad. Continuidad: el siguiente paso es «Seguir audio por una red»."
  - id: "red-transporte-audio"
    unitId: "biblioteca-y-red"
    topicId: "red-transporte-audio"
    title: "Seguir audio por una red"
    objective: "Separar transferencia de archivos, reproducción y conversión."
    brief: "Trazar servidor, aplicación, endpoint y DAC; identificar dónde pedir logs y dónde comprobar el formato recibido. Continuidad: el siguiente paso es «Inspeccionar una ruta de streaming»."
  - id: "streaming-ruta-real"
    unitId: "biblioteca-y-red"
    topicId: "streaming-ruta-real"
    title: "Inspeccionar una ruta de streaming"
    objective: "Reconocer procesamiento y conversiones declaradas por la aplicación."
    brief: "Analizar una ficha de servicio y una ruta observable sin inventar funciones o disponibilidad de planes; usar ejemplos condicionales. Continuidad: el siguiente paso es «Documentar perfiles de reproducción»."
  - id: "roon-foobar-perfiles"
    unitId: "biblioteca-y-red"
    topicId: "roon-foobar-perfiles"
    title: "Documentar perfiles de reproducción"
    objective: "Preparar una configuración de referencia y otra con procesamiento intencional."
    brief: "Relacionar Roon y foobar2000 con rutas, DSP y normalización; describir las funciones sin depender de etiquetas de una versión concreta. Continuidad: el siguiente paso es «Resolver cortes sin perder la referencia»."
  - id: "integracion-reproduccion"
    unitId: "biblioteca-y-red"
    topicId: "integracion-reproduccion"
    title: "Resolver cortes sin perder la referencia"
    objective: "Diseñar un diagnóstico de fuente, red, buffer y salida."
    brief: "Resolver un caso con una sola variable por prueba, registrar evidencia y distinguir solución observada de hipótesis. Continuidad: el siguiente paso es «Interpretar una forma de onda»."
  - id: "leer-forma-onda"
    unitId: "medicion-comparacion"
    topicId: "leer-forma-onda"
    title: "Interpretar una forma de onda"
    objective: "Reconocer límites de una vista de amplitud en el tiempo."
    brief: "Comparar transitorios, silencios y recortes con escalas explícitas; no inferir calidad musical desde el aspecto del dibujo. Continuidad: el siguiente paso es «Leer un espectro»."
  - id: "leer-espectro"
    unitId: "medicion-comparacion"
    topicId: "leer-espectro"
    title: "Leer un espectro"
    objective: "Relacionar ejes, picos y resolución con el análisis realizado."
    brief: "Comparar tono, armónicos y ruido; distinguir lo observado de artefactos de ventana y tamaño de análisis. Continuidad: el siguiente paso es «Leer un espectrograma»."
  - id: "leer-espectrograma"
    unitId: "medicion-comparacion"
    topicId: "leer-espectrograma"
    title: "Leer un espectrograma"
    objective: "Seguir contenido espectral a lo largo del tiempo."
    brief: "Interpretar ejemplos con escalas de tiempo, frecuencia y color; no diagnosticar una codificación sólo por una banda visual. Continuidad: el siguiente paso es «Diseñar una prueba de nulidad»."
  - id: "prueba-nulidad"
    unitId: "medicion-comparacion"
    topicId: "prueba-nulidad"
    title: "Diseñar una prueba de nulidad"
    objective: "Comparar señales alineadas e interpretar el residuo."
    brief: "Corregir ganancia, tiempo y polaridad antes de restar; explicar por qué residuo distinto de cero no demuestra audibilidad. Continuidad: el siguiente paso es «Verificar equivalencia de audio»."
  - id: "comparar-muestras"
    unitId: "medicion-comparacion"
    topicId: "comparar-muestras"
    title: "Verificar equivalencia de audio"
    objective: "Elegir una comprobación según el objeto que se compara."
    brief: "Distinguir hash del archivo, muestras decodificadas y salida capturada; resolver metadatos distintos con contenido musical idéntico. Continuidad: el siguiente paso es «Redactar un informe de medición»."
  - id: "integracion-mediciones"
    unitId: "medicion-comparacion"
    topicId: "integracion-mediciones"
    title: "Redactar un informe de medición"
    objective: "Separar método, resultado e interpretación."
    brief: "Integrar onda, espectro y comparación de muestras en un caso con límites; ofrecer datos de ejemplo para quien no disponga de herramientas. Continuidad: el siguiente paso es «Controlar nivel en una comparación»."
  - id: "igualar-niveles"
    unitId: "escucha-critica"
    topicId: "igualar-niveles"
    title: "Controlar nivel en una comparación"
    objective: "Explicar cómo la diferencia de ganancia altera un juicio."
    brief: "Diseñar una comparación con la misma fuente, segmentos y ajuste de nivel documentado; recuperar sonoridad y máster. Continuidad: el siguiente paso es «Reconocer límites de la comparación subjetiva»."
  - id: "sesgos-y-memoria"
    unitId: "escucha-critica"
    topicId: "sesgos-y-memoria"
    title: "Reconocer límites de la comparación subjetiva"
    objective: "Identificar expectativas y cambios de contexto que confunden una prueba."
    brief: "Analizar un relato de escucha y proponer controles sin invalidar la experiencia personal ni tratarla como prueba causal. Continuidad: el siguiente paso es «Diseñar una prueba ABX»."
  - id: "disenar-abx"
    unitId: "escucha-critica"
    topicId: "disenar-abx"
    title: "Diseñar una prueba ABX"
    objective: "Describir condiciones, aleatorización y decisión antes de escuchar."
    brief: "Preparar un protocolo sencillo con archivos identificables y ensayos definidos; distinguir una impresión de una conclusión estadística. Continuidad: el siguiente paso es «Interpretar un resultado de escucha»."
  - id: "interpretar-escucha"
    unitId: "escucha-critica"
    topicId: "interpretar-escucha"
    title: "Interpretar un resultado de escucha"
    objective: "Delimitar qué demuestra una identificación o su ausencia."
    brief: "Leer resultados proporcionados, considerar azar y condiciones y evitar convertir no detectar en demostrar identidad universal. Continuidad: el siguiente paso es «Unir medición y escucha»."
  - id: "integracion-escucha"
    unitId: "escucha-critica"
    topicId: "integracion-escucha"
    title: "Unir medición y escucha"
    objective: "Elegir evidencias adecuadas para una afirmación sonora."
    brief: "Revisar una supuesta mejora y diseñar una prueba con control de nivel y variable; recuperar límites de nulidad y formatos. Continuidad: el siguiente paso es «Seguir la cadena hasta el sonido»."
  - id: "cadena-hasta-transductor"
    unitId: "sistema-entorno"
    topicId: "cadena-hasta-transductor"
    title: "Seguir la cadena hasta el sonido"
    objective: "Ubicar ganancia, amplificación, transductor y entorno."
    brief: "Dibujar un sistema real o dado; distinguir datos digitales de respuesta electroacústica sin recomendar compras. Continuidad: el siguiente paso es «Interpretar respuesta en frecuencia»."
  - id: "respuesta-frecuencia-sistema"
    unitId: "sistema-entorno"
    topicId: "respuesta-frecuencia-sistema"
    title: "Interpretar respuesta en frecuencia"
    objective: "Relacionar una curva con el sistema y las condiciones de medida."
    brief: "Comparar respuestas de auricular y altavoz con contexto; explicar por qué una curva aislada no describe toda la experiencia. Continuidad: el siguiente paso es «Reconocer la influencia de sala y posición»."
  - id: "sala-posicion"
    unitId: "sistema-entorno"
    topicId: "sala-posicion"
    title: "Reconocer la influencia de sala y posición"
    objective: "Identificar reflexiones y variaciones de graves en un escenario."
    brief: "Proponer cambios reversibles de posición y un registro de observaciones, con alternativa mediante diagramas si no hay altavoces. Continuidad: el siguiente paso es «Relacionar auriculares y condiciones de uso»."
  - id: "auriculares-ajuste"
    unitId: "sistema-entorno"
    topicId: "auriculares-ajuste"
    title: "Relacionar auriculares y condiciones de uso"
    objective: "Separar ajuste, sellado, respuesta y fuente."
    brief: "Comparar dos situaciones de colocación y explicar variables antes de atribuir diferencias al archivo o al DAC. Continuidad: el siguiente paso es «Priorizar una mejora por evidencia»."
  - id: "integracion-prioridades"
    unitId: "sistema-entorno"
    topicId: "integracion-prioridades"
    title: "Priorizar una mejora por evidencia"
    objective: "Justificar qué problema investigar primero y cómo comprobarlo."
    brief: "Ordenar hipótesis sobre fuente, DSP, ruido y entorno; incluir una opción sin coste y una condición para descartar cada hipótesis. Continuidad: el siguiente paso es «Auditar una biblioteca musical»."
  - id: "auditar-biblioteca"
    unitId: "integracion-audio-completa"
    topicId: "auditar-biblioteca"
    title: "Auditar una biblioteca musical"
    objective: "Preparar un inventario de formatos, procedencia y metadatos."
    brief: "Diseñar una muestra representativa y comprobaciones de integridad; conservar originales y no convertir masivamente como prueba. Continuidad: el siguiente paso es «Documentar una cadena reproducible»."
  - id: "documentar-cadena"
    unitId: "integracion-audio-completa"
    topicId: "documentar-cadena"
    title: "Documentar una cadena reproducible"
    objective: "Crear un registro de fuente, procesamiento, salida y condiciones."
    brief: "Integrar capturas o datos de ejemplo con formatos esperados y observados; distinguir ruta de referencia y DSP intencional. Continuidad: el siguiente paso es «Resolver fallos en capas distintas»."
  - id: "resolver-casos-audio"
    unitId: "integracion-audio-completa"
    topicId: "resolver-casos-audio"
    title: "Resolver fallos en capas distintas"
    objective: "Elegir pruebas mínimas para tres síntomas independientes."
    brief: "Resolver un remuestreo, un corte y una diferencia de nivel recuperando fundamentos, buffers y comparación controlada. Continuidad: el siguiente paso es «Defender un diagnóstico completo»."
  - id: "informe-final-audio"
    unitId: "integracion-audio-completa"
    topicId: "informe-final-audio"
    title: "Defender un diagnóstico completo"
    objective: "Justificar conclusiones y límites con evidencia trazable."
    brief: "Redactar un informe de método, resultados y próximos pasos; incluir qué hipótesis quedaron abiertas y un plan personal de mantenimiento. Cierre del recorrido: integrar lo aprendido y proponer una exploración personal sin prometer otra etapa automática."
---

# Recorrido

El curso comienza con una verificación visible de la ruta digital y avanza hacia un método de diagnóstico repetible. Cada lección debe dejar una prueba pequeña que pueda hacerse en el equipo real.

## Recorrido completo

Comprender la representación y reproducción del audio digital, documentar una cadena y justificar diagnósticos y comparaciones con evidencia y límites claros.

Las lecciones 1–14 forman el bloque inicial ya publicado. El curso completo contiene 86 pasos; los siguientes se distribuyen así:

| Lecciones | Módulo |
|---|---|
| 15–20 | Señal, nivel y representación |
| 21–27 | Muestreo y reconstrucción |
| 28–34 | Cuantización, profundidad y dither |
| 35–40 | Formatos y compresión |
| 41–47 | Procesamiento de señal |
| 48–53 | Dinámica y sonoridad |
| 54–60 | Conversión e interfaces |
| 61–66 | Reproducción local y por red |
| 67–72 | Medición y comparación |
| 73–77 | Escucha crítica |
| 78–82 | Sistema y entorno de escucha |
| 83–86 | Integración final |

Cada paso combina explicación, ejemplo y práctica verificable. Los repasos conectan conceptos anteriores; publicar no acredita que el alumno los haya dominado.
