// Efectos de sonido para «Por qué el cielo es azul» (Cine Nocturno).
// Cada sonido va en lo que se mueve, sin huecos > 2 s y nunca encima de un corte.
import { v } from "#voz";
import { momentosHook } from "./video/planos/01-cielo.js";
import { momentosEstudio } from "./video/planos/02-estudio.js";
import { choquesAire, momentosRebote } from "./video/planos/03-rebote.js";
import { momentosLinterna } from "./video/planos/04-linterna.js";
import { momentosFinal } from "./video/planos/05-atardecer.js";

const e = [];
const pon = (sonido, t, o = {}) => e.push({ sonido, t, ...o });

const f1 = v.frase(1), f2 = v.frase(2), f3 = v.frase(3);
const f4 = v.frase(4), f5 = v.frase(5), f6 = v.frase(6);
const f7 = v.frase(7), f8 = v.frase(8), f9 = v.frase(9);
const f10 = v.frase(10), f11 = v.frase(11), f12 = v.frase(12);

// --- Plano 01: La carretera nocturna y el espacio (0.00 a 13.15 s)
pon("aire", 0.0, { ancla: "empieza", db: -11, vel: 0.85, que: "el coche avanza bajo la bóveda azul" });
pon("late", f1.t("azul") + 0.05, { db: -10, que: "late la bóveda azul" });
pon("clic", momentosHook.capsula + 0.1, { db: -12, que: "se abre la cápsula de aire en rayos X" });
pon("tic", f1.t("respiras") + 0.1, { db: -16, que: "partículas de aire en rayos X" });
pon("clic", momentosHook.pulsoColor, { db: -13, vel: 0.9, que: "0% color" });
pon("empujon", momentosHook.subeEspacio + 0.35, { db: -8, que: "la cámara sube disparada al espacio" });
pon("aire", f2.t("sol") - 0.1, { ancla: "empieza", db: -14, vel: 0.7, que: "el Sol brilla en el vacío" });
pon("clic", f2.t("todo") + 0.1, { db: -14, que: "aparece el rótulo sin aire" });
pon("golpe-hondo", momentosHook.negro, { db: -10, que: "el cielo entero queda negro" });
pon("aire", f3.inicio + 0.15, { ancla: "empieza", db: -13, vel: 0.75, que: "la cámara baja hacia la atmósfera" });
pon("sube", momentosHook.preguntaAzul - 0.05, { db: -11, que: "se encienden las chispas azules" });
pon("late", f3.t("azul") + 0.08, { db: -10, que: "pulso azul en la atmósfera" });

// --- Plano 02: El estudio de 1871, el prisma y las olas (13.20 a 32.25 s)
pon("papel", momentosEstudio.entra1871 + 0.15, { db: -11, que: "entra el documento de 1871" });
pon("clic", f4.t("fisico") + 0.1, { db: -14, que: "rótulo 1871" });
pon("desliza", f4.t("lord") + 0.05, { db: -14, que: "subraya Lord Rayleigh" });
pon("desliza", momentosEstudio.subraya, { db: -12, vel: 1.1, que: "subraya el misterio en naranja" });
pon("aire", f5.inicio + 0.15, { ancla: "empieza", db: -13, vel: 0.75, que: "la cámara se desliza hacia el prisma" });
pon("sube", momentosEstudio.entraBlanca, { db: -12, vel: 1.1, que: "entra el haz de luz blanca" });
pon("cristal", momentosEstudio.abrePrisma, { db: -10, que: "el haz choca en el prisma de cristal" });
pon("aire", f5.t("todos") - 0.05, { ancla: "empieza", db: -12, vel: 0.9, que: "se abre el abanico de colores" });
pon("desliza", f6.inicio + 0.2, { db: -13, que: "la cámara avanza hacia las olas" });
pon("clic", f6.t("olas") + 0.05, { db: -13, que: "aparecen los paneles de olas" });
pon("aire", momentosEstudio.olaRoja, { ancla: "empieza", db: -13, vel: 0.65, que: "ondula la ola roja larga y suave" });
pon("tic", f6.t("suaves") + 0.15, { db: -16, que: "marca 700 nm" });
pon("sube", momentosEstudio.olaAzul, { db: -12, vel: 1.2, que: "vibra la ola azul corta y rápida" });
pon("tic", f6.t("rapidas") + 0.05, { db: -15, vel: 1.2, que: "marca 450 nm" });

// --- Plano 03: El rebote en el aire (32.32 a 44.50 s)
pon("aire", momentosRebote.entraRoja + 0.1, { ancla: "empieza", db: -13, vel: 0.65, que: "entran las olas rojas en el aire" });
pon("clic", f7.t("rojas") + 0.05, { db: -14, que: "rótulo ola roja larga" });
pon("aire", momentosRebote.esquiva - 0.1, { ancla: "empieza", db: -12, vel: 0.8, que: "las olas rojas esquivan los gases" });
pon("desliza", f7.t("largo"), { db: -14, que: "pasan de largo" });
pon("sube", momentosRebote.entraAzul, { db: -11, vel: 1.1, que: "entran las olas azules cortas" });
pon("tic", f8.t("pequenas") + 0.05, { db: -15, que: "ondas pequeñas acercándose" });
choquesAire.slice(0, 5).forEach((tc, i) => {
  pon(i === 0 ? "golpe-hondo" : "cristal", tc, { db: i === 0 ? -9 : -13 - (i % 2), vel: 0.95 + i * 0.08, que: "choque y rebote azul en molécula" });
});
pon("late", momentosRebote.nueve, { db: -9, que: "9 veces más" });
pon("aire", f8.t("todo") - 0.1, { ancla: "empieza", db: -13, vel: 0.7, que: "el azul llena todo el cielo" });
pon("clic", f8.t("cielo") + 0.12, { db: -14, que: "cielo encendido" });

// --- Plano 04: La linterna y el vaso en la mesa (44.56 a 51.55 s)
pon("desliza", f9.inicio + 0.18, { db: -14, que: "entra el vaso sobre la mesa" });
pon("clic", momentosLinterna.enciende - 0.05, { db: -10, que: "se enciende la linterna roja" });
pon("cristal", f9.t("vaso") + 0.05, { db: -13, que: "el haz cruza el vaso de cristal" });
pon("toque", momentosLinterna.gota1, { db: -12, vel: 1.1, que: "cae la primera gota de leche" });
pon("toque", momentosLinterna.gota2 + 0.08, { db: -12, vel: 0.95, que: "cae la segunda gota de leche" });
pon("aire", f9.t("agua", 2) - 0.1, { ancla: "empieza", db: -14, vel: 0.75, que: "la nube de leche se abre en el agua" });
pon("sube", momentosLinterna.azulVaso - 0.1, { db: -11, que: "el agua atrapa y enciende el azul" });
pon("late", f9.t("reparte") + 0.05, { db: -11, que: "el azul se reparte por todo el vaso" });

// --- Plano 05: El atardecer, el remate y el cierre (51.60 a 69.44 s)
pon("aire", momentosFinal.atardecer - 0.1, { ancla: "empieza", db: -12, vel: 0.65, que: "el Sol baja al horizonte" });
pon("desliza", f10.t("cruza") + 0.05, { db: -13, que: "el rayo cruza mucho más aire" });
pon("sube", momentosFinal.pierdeAzul - 0.1, { db: -12, vel: 1.1, que: "el azul rebota y se pierde por el camino" });
pon("golpe", momentosFinal.llegaRojo, { db: -10, que: "solo llega el rojo al atardecer" });
pon("aire", f11.inicio + 0.2, { ancla: "empieza", db: -13, vel: 0.7, que: "sube la cámara hacia la bóveda" });
pon("clic", f11.t("color") + 0.05, { db: -13, que: "el aire no tiene color" });
pon("sube", f11.t("arriba") + 0.05, { db: -11, que: "los rayos del Sol entran arriba" });
pon("late", momentosFinal.rebotando, { db: -9, que: "luz del Sol rebotando sin parar" });
pon("aire", f11.t("parar") + 0.05, { ancla: "empieza", db: -14, vel: 0.7, que: "resplandor continuo en la bóveda" });
pon("aire", f12.inicio + 0.2, { ancla: "empieza", db: -13, vel: 0.6, que: "la cámara se abre en el cierre" });
pon("clic", momentosFinal.amigo, { db: -13, que: "envíaselo a ese amigo" });
pon("aire", f12.t("dias") + 0.1, { ancla: "empieza", db: -15, vel: 0.65, que: "bóveda celeste encendida" });
pon("late", momentosFinal.cierreAzul + 0.05, { db: -9, que: "remate final en azul" });

export default e;
