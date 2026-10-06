/* =========================================================
   SIN REMEDIO — Base de datos de poemas
   Cada registro incluye:
     - titulo, autor, capitulo, orden (ubicación en la novela)
     - numeroVersos (contados uno a uno)
     - emocion: categoría según Cowen & Keltner (2017), 27 emociones
     - color (hex) + nombreColor: según asociaciones empíricas color-emoción
       de Jonauskaite et al. (2020)
     - bpm: pulso cardíaco, calculado como 100 − versos × 1.1,
       acotado entre 55 y 95 bpm (rango humano real: AHA + Kreibig 2010)
     - texto: el poema completo
   ========================================================= */

const POEMAS = {

  "sol": {
    titulo: "Al sol",
    autor: "Ignacio Escobar",
    capitulo: "I",
    orden: 1,
    numeroVersos: 4,
    emocion: "Apreciación estética",
    emocionEN: "Aesthetic appreciation",
    color: "#E8CB4F",
    nombreColor: "amarillo pálido",
    bpm: 95,
    texto: `Sol puntual, sol igual,
sol fatal
lento sol caracol
sol de Colombia.`
  },

  "recien-nacido": {
    titulo: "Desde antes de nacer",
    autor: "Ignacio Escobar",
    capitulo: "I",
    orden: 2,
    numeroVersos: 3,
    emocion: "Tristeza",
    emocionEN: "Sadness",
    color: "#7A8794",
    nombreColor: "gris azulado",
    bpm: 95,
    texto: `Desde antes de nacer
(parece que fue ayer)
estoy muerto.`
  },

  "espejo": {
    titulo: "Palabras",
    autor: "Ignacio Escobar",
    capitulo: "I",
    orden: 3,
    numeroVersos: 18,
    emocion: "Encantamiento",
    emocionEN: "Entrancement",
    color: "#8B86A8",
    nombreColor: "lavanda apagado",
    bpm: 80,
    texto: `Palabras.
En vez de un mar de luz,
el río de la forma:
reflujo en el flujo
ir y volver intercambiables.
La realidad no se repite:
es nuestro, y no real,
ese afán frívolo de simetría…

Tarea de lo irreal:
reproducir reflejos,
reiterar con espejos los espejos.

El cielo no señala
el dedo que señala el cielo.
El dedo no dibuja
sino un cielo en el cielo.
Y ese cielo no es cielo,
ni es el cielo.

Pero esto ya no es más que explicación: sombra de lo ya dicho.`
  },

  "mujer-dormida": {
    titulo: "Soneto a Cecilia",
    autor: "Ignacio Escobar",
    capitulo: "I",
    orden: 4,
    numeroVersos: 14,
    emocion: "Deseo intenso",
    emocionEN: "Craving",
    color: "#B8623D",
    nombreColor: "terracota",
    bpm: 85,
    texto: `Cecilia, mi amor te esquiva.
Ya lo ves: se finge inerte.
De tanto querer quererte
no te quiere fugitiva:

Te quiere tener cautiva
de cepo más cierto y fuerte
que ese remedo de muerte
del amor: te quiere viva.

Me dirás, si te despiertas,
que estás dormida y no muerta.
Me dirás "metala ¿oquei?"

Querrás imponer tu ley.
Y mi amor quiere ser rey
y no buey, niña casquivana.`
  },

  "mujer-sombrilla": {
    titulo: "A una dama",
    autor: "Ricardito Patiño",
    capitulo: "IV",
    orden: 5,
    numeroVersos: 10,
    emocion: "Nostalgia",
    emocionEN: "Nostalgia",
    color: "#C9A26A",
    nombreColor: "sepia claro",
    bpm: 89,
    nota: "Versión en español del propio Ricardito; el original fue escrito en francés.",
    texto: `… Ah, sí, señora: érais hermosa
esta mañana tras la misa.
Se hinchaba vuestro seno rosa
como agitado por la brisa
y una sombrilla vaporosa
difuminaba vuestra risa…
Érais hermosa
como una diosa.
Y ante vuestra mirada desdeñosa
yo era sólo una alfombra que se pisa.`
  },

  "partenon": {
    titulo: "Al Partenón",
    autor: "Ricardito Patiño",
    capitulo: "IV",
    orden: 6,
    numeroVersos: 14,
    emocion: "Admiración",
    emocionEN: "Admiration",
    color: "#4A7554",
    nombreColor: "verde profundo",
    bpm: 85,
    texto: `El clásico perfil del arquitrabe
sus apotegmas traza en la segura
confianza de perenne arquitectura
que encierra todo cuanto Fidias sabe.

Cuajada en piedra y luz, marmórea nave
que incólume surcó la edad oscura;
de su ruina resurge, casta y pura,
intacta hasta que el universo acabe.

Encarnación feliz del pensamiento
firme y eterna bajo el firmamento
donde lucen inquietas las estrellas.

Temerosas e inquietas: porque cabe
la inextinguible columnata grave
las que pasan y mueren ¡ay! son ellas.`
  },

  "monserrate": {
    titulo: "Al señor de Monserrate",
    autor: "Ricardito Patiño",
    capitulo: "IV",
    orden: 7,
    numeroVersos: 4,
    emocion: "Compasión",
    emocionEN: "Sympathy",
    color: "#B088A0",
    nombreColor: "malva suave",
    bpm: 95,
    texto: `Pobre señor de Monserrate:
en vez de palio, un mal petate;
y promeseros de alpargate
le ofrecen yuca y aguacate.`
  },

  "calavera": {
    titulo: "¿La muerte, ya?",
    autor: "Ricardito Patiño",
    capitulo: "IV",
    orden: 8,
    numeroVersos: 14,
    emocion: "Ansiedad",
    emocionEN: "Anxiety",
    color: "#7A8559",
    nombreColor: "verde oliva",
    bpm: 85,
    texto: `¿La muerte, ya? ¡Oh, Dios! ¿Y si me hubiera
olvidado la vida, y ya pasara?
¿Si tan sólo la muerte me esperara
desde el mismo momento en que naciera?

¿La muerte, ya? ¡Oh hado cruel!
¡Quimera infeliz fue esta vida que anhelara!
¡Ilusión que perdí sin que me hallara?
¡Sonrisa de mi propia calavera!

Ayer nací: por mucho que viviera
soy sólo lo que fui: y aún más llorara
viendo de mi cenizas calcinadas.

Un día viví: ya viene la tijera
de la Parca fatal. ¡Ah, si cortara
de la muerte las alas desplegadas!`
  },

  "pajaros-hierro": {
    titulo: "Vietnam",
    autor: "Ignacio Escobar / Hermes",
    capitulo: "V",
    orden: 9,
    numeroVersos: 6,
    emocion: "Horror",
    emocionEN: "Horror",
    color: "#6B2626",
    nombreColor: "rojo oscuro",
    bpm: 93,
    texto: `Sobre la tierra de gente
cruzan pájaros de hierro.
Dejan caer una lluvia
de sangre en mitad del vuelo.
La lluvia cae como lluvia.
Los muertos están ya muertos.`
  },

  "bogota": {
    titulo: "La Bogoteida",
    subtitulo: "Canto Primero",
    autor: "Ignacio Escobar",
    capitulo: "VI",
    orden: 10,
    numeroVersos: 31,
    emocion: "Ira",
    emocionEN: "Anger",
    color: "#B03838",
    nombreColor: "rojo intenso",
    bpm: 66,
    texto: `¡Oh madre! ¡Oh mi ciudad! Poeta fuera
quien cantara lisonjas, y galanas,
de tu envidiada situación cimera
entre las mil ciudades colombianas.
Pero poeta yo, que a la primera
estrofa se me mueren ya las ganas,
no soy. Y quedarías tan malparada
que tal vez sea mejor no cantar nada.

Negros la guardan envidiosos montes;
dura la ciñe la tenaz miseria;
odios, no amores, son sus horizontes:

Ciudad arriñonada que se extiende
de norte a sur quemando la pradera,
devorando el paisaje: cual se tiende
negra morcilla en verde ensaladera…

Ciudad de sangre, en sangre amortajada;
ciudad que arroja sangre y sangre encierra;
ciudad ensangrentada y desangrada
en sórdida, secreta, sorda guerra;
al sur o meridión, la plebe hambreada
de todos los malditos de la tierra;
al norte o septentrión, la oligarquía
rodeada de guardianes noche y día.

No cantaré del norte las bellezas
pues la belleza injusta es vil patraña:
el lujo, la opulencia, la riqueza,
pueden cegar, pero jamás engañan.
Voy a cantar el sur y su pobreza,
sus trucos, y sus artes, y sus mañas:
el sur de los sufridos bogotanos
que tienen muchos pies, y muchas manos.`
  },

  "ojos-barcos": {
    titulo: "Tus ojos son dos barcos",
    autor: "— canción —",
    capitulo: "X",
    orden: 11,
    numeroVersos: 8,
    emocion: "Romance",
    emocionEN: "Romance",
    color: "#D08B82",
    nombreColor: "rosa cálido",
    bpm: 91,
    texto: `Tus ojos son dos barcos
en el agua profunda.
Tus ojos son el agua
clara y profunda.
Agua y agua cambiante.
Tus ojos no los tiene
mi niña nadie
mi niña nadie.`
  },

  "pajaro-red": {
    titulo: "Cuaderno de hacer cuentas",
    autor: "Ignacio Escobar",
    capitulo: "XI",
    orden: 12,
    numeroVersos: 43,
    emocion: "Tristeza",
    emocionEN: "Sadness",
    color: "#2E4A75",
    nombreColor: "azul profundo",
    bpm: 55,
    texto: `Las cosas son iguales a las cosas.
Aquello que no puede ser dicho, hay que callarlo.
El ojo ve, y olvida.

(¿Y me diré otra vez: quién soy, que ya me he visto
y sigo siendo yo?)
tiempos, vientos, olores, voces, fugas, silencios.
(¿Quién soy, que no me veo y no me he visto?)

Ahora, ahora, afuera:
el silbido del aire en los oídos, como seda rasgada,
el agrio olor del miedo.
Todo cuerpo
el hoyo en el espacio donde la ida se convierte en vuelta
y el viaje es ya regreso.

— Mira, mira: ¿qué ves?
— Todo es lo mismo siempre: las cosas son las cosas.

No se conoce sino la propia voluntad. Y no es mucho:
un ojo de agua.
Apenas se conoce la propia voluntad. Y no es nada:
un río de agua.

Vasta armazón de fuerzas disparada hacia el cielo
(red atrapando el cielo
que se escapa, aleteante, por entre las junturas),
oscilante estructura de cañas y de cuerdas,
de gritos y de plumas, entrechocar de picos y de garras.

Colgado ahora, joya del inmenso armatoste
(no muy claro en su rumbo
y muy difícilmente maniobrable),
por un pie o una mano mordidos hasta el hueso,
ahorcado como un perro.

Toda pregunta es un malentendido
y el artilugio entero se viene cielo abajo
con un solo crujido.

Nada queda:
Sólo se conoce la propia voluntad. Y no es nada.
Es todo lo que hay.

El mal es sin remedio: toparnos cara a cara.
La ética, como la metafísica,
remata en este campo ya vivido, regado de otras muertes.

Aquí termina el mundo.
Las cosas, que antes fueron iguales a las cosas
—luz en la luz, memoria en la memoria—
Porque se pierde siempre.
Pero el fin es palabra todavía.`
  },

  "cuerpo-amado": {
    titulo: "Oye lo que te digo",
    autor: "Ignacio Escobar",
    capitulo: "XIV",
    orden: 13,
    numeroVersos: 14,
    emocion: "Deseo sexual",
    emocionEN: "Sexual desire",
    color: "#A83A58",
    nombreColor: "carmesí",
    bpm: 85,
    texto: `Oye lo que te digo: no te duermas.
Tus senos como ojos,
tus fingidos enojos,
el insistente vello entre tus piernas.

Tu piel bajo mi lengua,
la trampa de tus ojos, tus sonrojos,
tus súbitos antojos,
y bajo mis dos manos tus nalgas frescas, tiernas.

El peso de tu cuerpo
y el recuerdo
del sabor de tu ombligo.

Para que tú lo sepas te lo digo:
si de esta diaria muerte no me he muerto
quiero hacer el amor sólo contigo.`
  },

  "mano-corazon": {
    titulo: "Pena de amor",
    autor: "— bolero —",
    capitulo: "IX",
    orden: 14,
    numeroVersos: 8,
    emocion: "Tristeza",
    emocionEN: "Sadness",
    color: "#5A7495",
    nombreColor: "azul apagado",
    bpm: 91,
    texto: `¡Dime cómo me arranco del alma
esta pena de amor!
¡Esta pena de amor!
¡Esta pena de amor!

¡Dime cómo me arranco del alma
este inmenso dolor!
¡De esta pena de amor!
¡De esta pena de amor…!`
  },

  "bolerista": {
    titulo: "Yo lo que quiero",
    autor: "— bolero —",
    capitulo: "I",
    orden: 15,
    numeroVersos: 3,
    emocion: "Nostalgia",
    emocionEN: "Nostalgia",
    color: "#C68B4A",
    nombreColor: "ámbar",
    bpm: 95,
    texto: `Yo lo que quiero es que vuelva,
que vuelva conmigo
la que se fue…`
  }

};
