---
schemaVersion: 1
steps:
  - id: brisca
    unitId: primeros-juegos
    topicId: bazas-y-triunfo
    title: Brisca
    objective: Jugar una partida de Brisca para dos, distinguiendo jerarquía y puntuación.
    game:
      key: brisca
      aliases: [Brisca, Briscola]
      sources: [https://www.nhfournier.es/como-jugar/brisca/]
    brief: >-
      Variante española para dos según Fournier, sin dinero. Baraja española de 40;
      tres cartas por persona, siguiente descubierta bajo el mazo marca triunfo.
      Sale quien no reparte. Jerarquía A,3,rey,caballo,sota,7,6,5,4,2;
      puntos 11,10,4,3,2 y cero las restantes: 120 en total.
      Se puede jugar cualquier carta, sin asistir ni fallar obligatoriamente,
      también cuando se agota el mazo. Gana el triunfo mayor o, sin triunfos,
      la mayor del palo inicial. Ganador roba primero y sale; el otro roba después.
      La carta descubierta es la última que se roba. Jugar las tres finales sin reposición.
      Explicar el cambio del triunfo descubierto: tras ganar baza y antes de robar,
      siete por as/tres/figura, dos por siete o inferior; no después de la penúltima baza.
      Más puntos gana la mano; 60-60 la anula. Convención del curso: partida al mejor
      de tres, gana quien obtenga dos victorias, sin contar anuladas. Desarrollar ejemplo con un triunfo
      bajo que vence a un as de otro palo. Fuente: https://www.nhfournier.es/como-jugar/brisca/.
      Próximo juego: Tute.
  - id: tute
    unitId: primeros-juegos
    topicId: obligaciones-y-cantes
    title: Tute por parejas
    objective: Resolver las obligaciones de una baza y contar una mano de Tute por parejas.
    game:
      key: tute
      aliases: [Tute]
      sources: [https://www.ludoteka.com/juegos/tute/reglas]
    brief: >-
      Modalidad de cuatro en parejas opuestas de Ludoteka. Española40, diez cartas
      por persona; juego antihorario. Primera mano triunfo oros y empieza quien tiene
      el dos de oros; siguientes manos última repartida marca triunfo.
      Orden A,3,rey,caballo,sota,7,6,5,4,2; puntos11,10,4,3,2,resto0.
      Seguir palo y superar si se puede; sin ese palo, jugar triunfo que supere
      los ya jugados si se puede; si no se puede superar triunfo, descarte libre.
      Gana mayor triunfo o mayor del palo inicial; ganador sale.
      Rey+caballo de triunfo canta40; de otro palo20, conservando ambas cartas,
      después de ganar baza; un cante por baza,40 antes de20.
      Cuatro reyes o caballos de una persona: tute tras primera baza de su pareja,
      fin inmediato y dos puntos de partida. Última baza añade10 tantos.
      La pareja con más tantos gana; empate lo gana quien hizo últimas.
      Victoria vale2 puntos si supera100 tantos,1 si no. Meta6 puntos.
      Separar tantos de cartas de puntos de partida. Fuente: https://www.ludoteka.com/juegos/tute/reglas.
      Próximo: Cinquillo.
  - id: cinquillo
    unitId: primeros-juegos
    topicId: secuencias-y-bloqueos
    title: Cinquillo
    objective: Completar escaleras por palos y reconocer cuándo es obligatorio pasar.
    game:
      key: cinquillo
      aliases: [Cinquillo]
      sources: [https://www.ludoteka.com/juegos/cinquillo/reglas]
    brief: >-
      Cinquillo clásico de Ludoteka, cuatro personas y española40, diez cartas cada una.
      Empieza cinco de oros. Cada turno se coloca una carta: otro cinco inicia palo,
      o carta contigua amplía una escalera existente. Secuencia A,2,3,4,5,6,7,sota,
      caballo,rey; no hay8/9. No saltar huecos ni cambiar de palo. Pasar sólo sin jugada.
      Sentido horario como convención de mesa explícita. Primera persona sin cartas
      termina la mano. Gana5 puntos más uno por cada carta ajena pendiente; demás
      restan una por carta propia pendiente. Meta30 puntos.
      Explicar bloqueo reteniendo una carta intermedia, sin pasar ilegalmente.
      Fuente: https://www.ludoteka.com/juegos/cinquillo/reglas. Próximo: Corazones.
  - id: corazones
    unitId: primeros-juegos
    topicId: evitar-bazas
    title: Corazones
    objective: Jugar una mano de Corazones, gestionar el pase y contar penalizaciones.
    game:
      key: hearts
      aliases: [Hearts, Corazones, Black Lady]
      sources: [https://www.pagat.com/reverse/hearts.html, https://bicyclecards.com/how-to-play/hearts]
    brief: >-
      Variante de cuatro, francesa52 sin comodines,13 cartas. Sentido horario,
      A alto. Pasar tres a izquierda, siguiente mano derecha, después enfrente,
      cuarta sin pase; repetir ciclo. Elegir el pase antes de recoger lo recibido.
      Abre2 de tréboles. Asistir obligatorio; sin palo, descartar.
      No triunfo; mayor del palo inicial gana y sale. Primera baza no admite
      corazón ni Q de picas salvo que sólo haya penalizaciones disponibles.
      No salir con corazones hasta que se descarte un corazón, salvo sólo tener
      corazones; no usar la variante donde la Q rompe corazones.
      Corazón1 penalización, Q de picas13. Capturar los26 permite, en esta versión,
      sumar26 a cada rival y cero al captor. Al alcanzar alguien100, gana menor total;
      empate de mínimos: victoria compartida como convención explícita.
      Fuentes: https://www.pagat.com/reverse/hearts.html y https://bicyclecards.com/how-to-play/hearts.
      Próximo: Ocho loco.
  - id: ocho-loco
    unitId: primeros-juegos
    topicId: descarte-y-comodines
    title: Ocho loco
    objective: Resolver los turnos y el cambio de palo en Ocho loco sin reglas de UNO.
    game:
      key: crazy-eights
      aliases: [Crazy Eights, Ocho loco, Ochos locos]
      sources: [https://bicyclecards.com/how-to-play/crazy-eights]
    brief: >-
      Crazy Eights básico de Bicycle para cuatro; francesa52, cinco cartas cada uno,
      mazo y un descarte inicial. Si sale8, reinsertarlo y descubrir otra carta.
      Horario desde izquierda de quien reparte. Jugar una del palo o rango visible;
      cualquier8 permite anunciar palo, nunca número. Ante8 seguir palo anunciado u otro8.
      Sin jugada robar hasta poder jugar o agotar mazo; se permite robar aun teniendo
      jugada. Sin mazo ni jugada, pasar. No reciclar descartes en esta versión.
      Primero sin cartas gana esa mano; anotar valores ajenos:8=50,figuras/10=10,
      A=1,resto número. Convención de sesión: jugar cuatro manos alternando reparto,
      gana mayor total; empate compartido. Si todos pasan sin mazo, anular esa mano
      y repartir de nuevo: convención explícita para el bloqueo.
      No añadir saltos, reversas ni +2. Fuente: https://bicyclecards.com/how-to-play/crazy-eights.
      Próximo: Presidente.
  - id: presidente
    unitId: primeros-juegos
    topicId: combinaciones-y-pases
    title: Presidente
    objective: Superar combinaciones del mismo tamaño y gestionar pases en Presidente.
    game:
      key: president
      aliases: [President, Presidente, Daifugo, Dai Hin Min]
      sources: [https://www.pagat.com/climbing/president.html]
    brief: >-
      Versión básica de Pagat, cuatro personas, francesa52, reparto completo horario.
      2>A>K>Q>J>10>9>8>7>6>5>4>3; palos no cuentan.
      Sale izquierda del dador con carta o grupo de iguales; superar con mismo número
      de cartas de rango mayor, o pasar aun pudiendo jugar. Pasar permite volver en
      la misma ronda. Tras pasar todos los otros, retirar montón; último que jugó abre.
      Si ya se quedó sin cartas, siguiente activo abre. Orden de salida define rangos.
      Primero2 puntos,segundo1,resto0; meta11. Para siguiente mano último da su mayor
      carta al primero y recibe una elegida por éste; primero abre. No intercambiar
      dos cartas ni hacer revoluciones. Usar nombres respetuosos para los rangos.
      Convención de empate de partida: comparar puntos al terminar la mano;
      si comparten máximo, continuar otra mano. Fuente: https://www.pagat.com/climbing/president.html.
      Próximo: Mentiroso.
  - id: mentiroso
    unitId: primeros-juegos
    topicId: declaraciones-y-desafios
    title: Mentiroso
    objective: Resolver una declaración y su desafío, incluyendo la última carta.
    game:
      key: cheat
      aliases: [Cheat, Mentiroso, Bullshit, I Doubt It]
      sources: [https://www.pagat.com/beating/cheat.html]
    brief: >-
      Variante Cheat de rango ascendente de Pagat, cuatro, francesa52 repartida
      completa, horario. Inicio al azar. Declaraciones obligadas A,2,...10,J,Q,K,A;
      cada turno una o más cartas tapadas diciendo cantidad y rango exigido.
      Se puede mentir; sin cartas del rango también debe jugar.
      Cualquiera desafía antes del siguiente turno. Revelar sólo el último grupo:
      si alguna carta no coincide, autor recoge todo el montón; si todas coinciden,
      desafiante recoge todo. Continúa la persona a izquierda del autor desafiado,
      con siguiente rango; el desafío no reinicia en ases.
      Primero sin cartas gana sólo después de superar el posible desafío final.
      Sin puntos ni apuestas; cada partida tiene un ganador. No mezclar la modalidad
      que mantiene el mismo rango hasta el desafío. Fuente: https://www.pagat.com/beating/cheat.html.
      Próximo: Spades.
  - id: spades
    unitId: juegos-del-mundo
    topicId: prediccion-por-parejas
    title: Spades
    objective: Declarar bazas por parejas y contar contrato, bolsas y nil.
    game:
      key: spades
      aliases: [Spades, Espadas]
      sources: [https://www.pagat.com/auctionwhist/spades.html]
    brief: >-
      Spades básico de cuatro en parejas de Pagat; francesa52,13 cartas,horario,
      A alto,picas siempre triunfo. Una declaración0–13 por persona sin pasar;
      sumar declaraciones de pareja;0 es nil individual, no simple ausencia de aporte.
      Izquierda del dador abre sin picas salvo sólo tener picas. Asistir obligatorio;
      sin palo jugar cualquier carta. Mayor triunfo o mayor palo inicial gana y sale.
      No salir picas hasta romperlas o sólo tenerlas. Cumplir contrato:+10 por baza
      declarada,+1 por excedente; incumplir:-10 por declarada. Cada10 bolsas:-100,
      conservar excedente. Nil:+100 si cero bazas,-100 si toma alguna;
      sus bazas fallidas cuentan bolsas, no ayudan al contrato del compañero.
      Sin blind nil ni comodines. Meta500 al terminar mano, mayor total gana;
      empate: otra mano como convención. Fuente: https://www.pagat.com/auctionwhist/spades.html.
      Próximo: Whist.
  - id: whist
    unitId: juegos-del-mundo
    topicId: bazas-sin-subasta
    title: Whist
    objective: Jugar Whist por parejas y puntuar bazas por encima de seis.
    game:
      key: whist
      aliases: [Whist, Short Whist]
      sources: [https://bicyclecards.com/how-to-play/whist]
    brief: >-
      Whist corto para cuatro en parejas opuestas. Francesa52,13 por persona,
      reparto horario; última carta del dador visible marca triunfo y pertenece a
      su mano. A alto. Izquierda del dador abre. Asistir obligatorio, sin obligación
      de superar; sin palo cualquier carta. Mayor triunfo gana, o mayor palo inicial;
      ganador sale. Cada pareja anota una por baza que exceda seis, no por carta.
      Meta5 puntos, sin honores. No hay subasta ni muerto. Reparto pasa a izquierda.
      Explicar por qué7 bazas da1 punto y10 da4. Al llegar a meta al final de mano,
      gana esa pareja; no puede haber empate de puntos ganados en esa mano.
      Fuente: https://bicyclecards.com/how-to-play/whist. Próximo: Cribbage.
  - id: cribbage
    unitId: juegos-del-mundo
    topicId: puntuacion-en-dos-fases
    title: Cribbage
    objective: Diferenciar puntos durante el juego y puntos de mano y crib.
    game:
      key: cribbage
      aliases: [Cribbage]
      sources: [https://www.cribbage.org/NewSite/rules/rulebook_2020.pdf, https://bicyclecards.com/how-to-play/cribbage]
    brief: >-
      Dos personas, francesa52, seis cartas cada una; cada cual descarta dos al crib
      del dador; cuatro en mano. Rival corta y descubre starter; J da2 al dador.
      A=1,figuras=10,números su valor para sumar; A bajo para escaleras. Alternar reparto.
      Rival comienza juego alternado hasta31 sin exceder.15=2,31=2,pares consecutivos2,
      tres iguales6,cuatro12,racha reciente de3+ rangos distintos sin huecos vale longitud.
      Go sólo si no se puede jugar: otro sigue mientras pueda; último antes del reinicio
      gana1 salvo31 ya puntuado; contrario al último comienza nueva cuenta. No reciclar
      cartas, conservarlas para recuento. Orden de recuento: rival,dador,crib; cada uno
      usa starter. Cada combinación15=2,cada par=2,escaleras máximas por longitud con
      multiplicidad,colores4 en mano y5 si coincide starter; en crib sólo color de5.
      J del palo del starter en mano/crib=1. Meta121 inmediata; papel sustituye tablero.
      Sin muggins. Verificar go y color con ACC, no copiar el ejemplo aritmético erróneo
      de Bicycle. Fuentes: https://www.cribbage.org/NewSite/rules/rulebook_2020.pdf y
      https://bicyclecards.com/how-to-play/cribbage. Próximo: Scopa.
  - id: scopa
    unitId: juegos-del-mundo
    topicId: captura-por-igualdad
    title: Scopa
    objective: Aplicar la captura por igualdad y calcular la primiera en Scopa.
    game:
      key: scopa
      aliases: [Scopa]
      sources: [https://www.pagat.com/fishing/scopa.html]
    brief: >-
      Scopa básica para dos, italiana40 o española40 equivalente;A1,sota8,caballo9,rey10.
      Tres cartas cada uno,cuatro al centro; abre quien no reparte. Si hay3/4 reyes
      iniciales,volver a repartir. Una carta propia captura una del mismo valor;
      si no existe,grupo de suma igual; prioridad obligatoria a carta individual.
      Elegir entre capturas válidas; no capturar si la carta jugada no lo permite.
      Barrer centro=1 scopa; última jugada de toda la mano nunca puntúa scopa.
      Repartir tres nuevas sin reponer centro; sobrantes para último captor.
      Puntos:scopas,mayoría cartas,mayoría oros,7oros,primiera; empates sin punto.
      Primiera mejor carta de cada palo sumada:7=21,6=18,A=16,5=15,4=14,3=13,2=12,
      figuras10; requiere cuatro palos. Meta11 al cerrar mano,mayor total;
      empate otra mano. Comparar brevemente con Escoba conocida: aquí no sumar15.
      Fuente: https://www.pagat.com/fishing/scopa.html. Próximo: Belote.
  - id: belote
    unitId: juegos-del-mundo
    topicId: contratos-y-jerarquias
    title: Belote
    objective: Resolver un contrato de Belote con sus jerarquías y obligaciones.
    game:
      key: belote
      aliases: [Belote]
      sources: [https://www.pagat.com/jass/belote.html]
    brief: >-
      Belote francesa de cuatro por parejas, opción documentada sin anuncios excepto
      belote-rebelote;sin coinche. Francesa32(A,K,Q,J,10,9,8,7),antihorario.
      Repartir3+2 y descubrir una; primera vuelta tomar su palo o pasar,segunda elegir
      otro palo o pasar;si todos pasan otra vez,repartir siguiente. Tomador recibe
      descubierta y2 más,resto3 más. Ocho bazas;abre derecha del dador.
      Triunfo J20,9=14,A11,10=10,K4,Q3,8/7=0;otros A11,10=10,K4,Q3,J2,9/8/7=0,
      en ese orden. Asistir;sin palo fallar si rival gana;si compañero gana descarte
      libre. Al jugar triunfo superar si posible,incluso compañero;sin superior y
      rival manda,se debe subfallar. Últimas10,total162. K+Q triunfo:belote al
      jugar primera,rebelote segunda,+20. Contrato cumple con al menos tantos como
      rival incluyendo belote;si falla,rival162+ambas belotes. Capot252+belotes.
      Meta1000;ambos llegan misma mano=empate según fuente.
      Fuente: https://www.pagat.com/jass/belote.html. Próximo: Durak.
  - id: durak
    unitId: juegos-del-mundo
    topicId: ataque-y-defensa
    title: Durak
    objective: Atacar, defender y reponer cartas en Durak sin transferencias.
    game:
      key: podkidnoy-durak
      aliases: [Durak, Podkidnoy Durak, Dureń]
      sources: [https://www.pagat.com/beating/podkidnoy_durak.html]
    brief: >-
      Podkidnoy para dos,francesa36 desde6 hastaA,A alto,seis cartas cada uno,
      siguiente visible bajo mazo marca triunfo. Primera mano abre menor triunfo
      repartido. Atacante juega carta;defensor cubre mayor mismo palo o triunfo;
      triunfo sólo con triunfo mayor. No hay obligación de seguir palo.
      Añadir ataques de rangos ya presentes,contando cartas de ataque y defensa;
      máximo seis o cartas que tenía defensor al empezar,lo menor.
      Si cubre todo,cartas fuera y defensor ataca siguiente;si recoge,toma todo
      incluyendo añadidos legales y pierde turno de ataque. Reponer hasta seis:
      atacante primero,defensor último;descubierta se roba al final.
      Sin mazo no reponer;último con cartas pierde,si ambos vacían en última defensa
      es empate. No puntos de cartas ni transferencia de ataque ni prendas.
      Fuente: https://www.pagat.com/beating/podkidnoy_durak.html. Próximo: Skat.
  - id: skat
    unitId: juegos-del-mundo
    topicId: uno-contra-dos
    title: Skat
    objective: Entender una subasta, un contrato y el recuento básico del Skat de tres.
    game:
      key: skat
      aliases: [Skat]
      sources: [https://www.pagat.com/schafkopf/skat.html, https://ispacanada.org/docs/rules/505fc8_e561984976a345bc8404e4474ce066ef.pdf]
    brief: >-
      Skat de tres,reglas internacionales sin extras de torneo ni Kontra/Ramsch.
      Francesa32,horario,reparto3 por persona,dos skat,4 por persona,3 por persona.
      Subasta numérica mano-media primero,luego ganador contra postre;mano sostiene
      igualdad;quien pasa no vuelve;si todos pasan,mano acepta18 o siguiente reparte.
      Declararante recoge skat y descarta2 o juega Hand sin mirarlo.
      Palo:cuatroJ son triunfos mayores trébol,pica,corazón,diamante,luego A,10,K,Q,9,8,7
      del palo elegido. Grand sóloJ triunfos. Null sin triunfo orden A,K,Q,J,10,9,8,7.
      Asistir obligatorio,losJ pertenecen a triunfo,no a palo impreso;sin palo,cualquiera.
      Sale mano;ganador sale siguiente. Palo/Grand requieren61 de120 puntos contando
      skat;A11,10=10,K4,Q3,J2,resto0. Null exige cero bazas.
      Explicar puntos de cartas versus valor de juego,matadores con/sin desde Jtrébol
      contando skat,bases palo9/10/11/12 yGrand24,multiplicador matadores+1,juegoHand+1,
      Schneider(90)+1,Schwarz(todas bazas)+1;anuncios sólo Hand añaden nivel adicional
      y obligan cumplirlo. Null23,Hand35,Ouvert46,HandOuvert59.
      Ganar suma valor,perder resta doble;sobrepuja pierde aunque haga61 y se liquida
      al menor múltiplo de base que cubra puja. Convención de sesión:tres repartos,
      mayor total gana,empate compartido. Desarrollar un contrato sencillo y tabla
      de cálculo consultando https://www.pagat.com/schafkopf/skat.html y
      https://ispacanada.org/docs/rules/505fc8_e561984976a345bc8404e4474ce066ef.pdf.
      Próximo: Bridge.
  - id: bridge
    unitId: juegos-del-mundo
    topicId: subasta-y-carteo
    title: Bridge
    objective: Jugar una sesión de cuatro manos con subasta, muerto y puntuación completa.
    game:
      key: contract-bridge
      aliases: [Bridge, Contract Bridge, Bridge de contrato]
      sources: [https://www.pagat.com/auctionwhist/bridge.html, https://acbl.org/learn/]
    brief: >-
      Chicago de cuatro manos con puntuación duplicada,cuatro por parejas,francesa52,
      13 por persona,horario,A alto. Dadores N,E,S,O;vulnerabilidad ninguna,NS,EO,ambas.
      Cuatro pases iniciales:repartir de nuevo mismo dador según Chicago.
      Subasta desde dador,niveles1–7 equivalen6+n bazas;orden trébol,diamante,corazón,
      pica,ST;superar contrato o pasar,doblar rival,redoblar propio doblado;
      tres pases tras propuesta cierran. Declararante primero de pareja en nombrar
      denominación final;izquierda ataca;compañero expone muerto tras salida,
      lo juega declarante. Asistir,si no cualquiera;mayor triunfo o palo inicial gana.
      Fuente de modalidad y procedimiento: https://www.pagat.com/auctionwhist/bridge.html.
      Tabla de puntos según ACBL https://acbl.org/learn/:contrato cumplido,
      menores20 por nivel,mayores30,ST40 primera y30 restantes;doblo×2,redoblo×4.
      Base>=100 da bonus300/500 noV/V;si no50. Cumplir doblado+50,redoblado+100.
      Extras sin doblar valor ordinario;dobladas100/200,redobladas200/400.
      Slam6 anunciado+500/750;slam7+1000/1500. Caídas sin doblar50/100 cada una;
      dobladas noV100,200,200,300 cada posterior;V200 primera,300 posteriores;
      redobladas doble. No sumar extras a base para alcanzar manga ni acumular
      parciales entre manos. Sumar cuatro manos,mayor total gana;empate compartido.
      Separar reglas de convenciones de subasta;no exigir sistema avanzado ni dinero.
      El recorrido continúa:nombrar siguiente juego sólo si ya está planificado.
---
# Un juego de naipes por día

Reserva inicial revisada el 2026-11-07. Brisca es la primera entrega.
Este recorrido no termina al llegar a Bridge: la continuación automática añade
lotes documentados antes de agotar la reserva. Sin solitarios, casino ni Escoba.
