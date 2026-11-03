// Efectos de sonido para «Tu esencia no se diseña, se descubre».
// Sincronizados a cada movimiento y acento de la voz, sin huecos > 2 s y nunca sobre un corte.
import { v } from "#voz";
import { momentosMascara } from "./video/planos/01-mascara.js";
import { momentosLugares } from "./video/planos/02-lugares.js";
import { momentosBrillo } from "./video/planos/03-brillo.js";
import { momentosInmersion } from "./video/planos/04-inmersion.js";
import { momentosCta } from "./video/planos/05-cta.js";

const e = [];
const pon = (sonido, t, o = {}) => e.push({ sonido, t, ...o });

const f1 = v.frase(1), f2 = v.frase(2), f3 = v.frase(3);
const f4 = v.frase(4), f5 = v.frase(5), f6 = v.frase(6);
const f7 = v.frase(7), f8 = v.frase(8), f9 = v.frase(9);
const f10 = v.frase(10), f11 = v.frase(11);

// --- Plano 01: Diploma PNL, pagos y la máscara de «otra mujer» (0.00 a 14.70 s)
pon("aire", 0.0, { ancla: "empieza", db: -12, vel: 0.85, que: "se enciende la mesa con el diploma PNL" });
pon("papel", momentosMascara.pnl + 0.05, { db: -11, que: "aparece la certificación de PNL" });
pon("clic", momentosMascara.pagan + 0.05, { db: -11, que: "entra la tarjeta de pago recibido" });
pon("aire", f1.t("seguro") + 0.05, { ancla: "empieza", db: -14, vel: 0.8, que: "la cámara se acerca al centro" });
pon("desliza", f1.t("mostrarte") + 0.05, { db: -11, que: "empieza a bajar la máscara de porcelana" });
pon("golpe-hondo", momentosMascara.entraMascara, { db: -9, que: "se encaja la máscara de otra mujer" });
pon("clic", momentosMascara.segura, { db: -11, que: "sello: más segura" });
pon("clic", momentosMascara.preparada, { db: -11, vel: 1.08, que: "sello: más preparada" });
pon("clic", momentosMascara.bonito, { db: -11, vel: 1.15, que: "sello: nombre bonito" });
pon("aire", f2.t("haces") + 0.25, { ancla: "empieza", db: -13, vel: 0.75, que: "pasa a modo rayos X" });
pon("cristal", momentosMascara.grieta, { db: -8, que: "la máscara se agrieta: no te la crees ni tú" });

// --- Plano 02: Se descubre en 3 lugares (14.80 a 26.65 s)
pon("desliza", f3.inicio + 0.22, { db: -12, que: "entran los planos técnicos de diseño" });
pon("sube", momentosLugares.disena, { db: -12, que: "se abren los planos de diseño" });
pon("late", momentosLugares.descubre, { db: -9, que: "emerge el núcleo dorado: se descubre" });
pon("aire", f4.inicio + 0.18, { ancla: "empieza", db: -13, vel: 0.8, que: "se despliegan los tres pedestales" });
pon("clic", momentosLugares.tres, { db: -11, que: "marca los tres lugares" });
pon("cristal", momentosLugares.heridas, { db: -10, vel: 0.9, que: "lugar 1: las heridas reparadas con oro" });
pon("aire", f4.t("formaron") + 0.2, { ancla: "empieza", db: -14, vel: 0.85, que: "transición al segundo pedestal" });
pon("sube", momentosLugares.momentos, { db: -10, que: "lugar 2: los momentos que te transformaron" });
pon("tic", f4.t("transformaron") + 0.25, { db: -14, que: "destello del crisol" });
pon("golpe", momentosLugares.verdades, { db: -10, que: "lugar 3: las verdades que hoy defiendes" });
pon("late", f4.t("defiendes") + 0.08, { db: -11, que: "quedan encendidos los tres lugares" });

// --- Plano 03: El brillo, la burla y la conexión (26.72 a 41.30 s)
pon("aire", f5.inicio + 0.2, { ancla: "empieza", db: -13, vel: 0.75, que: "entra el núcleo de brillo personal" });
pon("clic", momentosBrillo.paso, { db: -13, que: "a mí me pasó" });
pon("late", momentosBrillo.brillo, { db: -9, que: "late con fuerza mi brillo" });
pon("desliza", f5.t("demasiado") + 0.1, { db: -12, que: "barreras intentan tapar el brillo" });
pon("aire", f5.t("personas") + 0.1, { ancla: "empieza", db: -14, vel: 0.8, que: "se cierra el cerco" });
pon("clic", momentosBrillo.redes, { db: -11, que: "aparece el marco de redes sociales" });
pon("desliza", f6.t("familia") + 0.05, { db: -12, que: "entran las flechas de juicio" });
pon("golpe", momentosBrillo.burlar, { db: -9, que: "impacto en burlar de mí" });
pon("aire", f7.t("resulta"), { ancla: "empieza", db: -13, vel: 0.85, que: "pero resulta que esa herida" });
pon("sube", momentosBrillo.herida, { db: -11, que: "la herida se ilumina en oro" });
pon("late", momentosBrillo.conecto, { db: -8, que: "salen los puentes de luz: hoy conecto" });
pon("cristal", f7.t("mujeres") + 0.1, { db: -11, vel: 1.1, que: "se encienden los nodos de mujeres como tú" });

// --- Plano 04: Inmersión 2 días EN VIVO y lo que viviste (41.36 a 52.30 s)
pon("aire", f8.inicio + 0.22, { ancla: "empieza", db: -13, vel: 0.8, que: "se abre la mesa de la inmersión" });
pon("clic", momentosInmersion.inmersion, { db: -12, que: "rótulo inmersión" });
pon("desliza", momentosInmersion.dos, { db: -11, que: "entran las tarjetas de Día 1 y Día 2" });
pon("clic", momentosInmersion.vivo, { db: -10, que: "se enciende el piloto rojo EN VIVO" });
pon("late", momentosInmersion.esencia, { db: -8, que: "empezamos por tu ESENCIA" });
pon("aire", f9.inicio + 0.2, { ancla: "empieza", db: -13, vel: 0.75, que: "ondas de comunicación" });
pon("sube", f9.t("comuniques") + 0.1, { db: -12, que: "se expande la voz real" });
pon("late", momentosInmersion.viviste, { db: -9, que: "salga de lo que viviste" });
pon("desliza", momentosInmersion.crees9, { db: -12, que: "se desvanece el molde de lo que deberías ser" });
pon("tic", f9.t("ser") + 0.05, { db: -15, que: "cierre del molde" });

// --- Plano 05: Conectar de verdad y CTA (52.40 a 64.00 s)
pon("aire", f10.inicio + 0.22, { ancla: "empieza", db: -13, vel: 0.75, que: "se abre la constelación de conexión" });
pon("sube", momentosCta.descubrir + 0.1, { db: -12, que: "descubrir desde dónde conectas" });
pon("late", momentosCta.verdad, { db: -9, que: "conectas de verdad" });
pon("desliza", momentosCta.disenando, { db: -13, que: "dejar de diseñar una versión" });
pon("aire", f10.t("ti") + 0.05, { ancla: "empieza", db: -14, vel: 0.8, que: "baja la cámara hacia el botón" });
pon("empujon", momentosCta.boton, { db: -8, que: "entra el botón rojo de abajo" });
pon("clic", momentosCta.lugar, { db: -9, que: "aparta tu lugar" });
pon("tic", momentosCta.vivo, { db: -12, que: "es en vivo" });
pon("late", momentosCta.limitados, { db: -9, que: "los cupos son limitados" });

export default e;
