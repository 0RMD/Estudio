// Los efectos: cada uno en lo que se mueve, en el fotograma en que se mueve (guia/sonido.md).
// Los momentos salen de los planos y de v.t(), sin copiar segundos a mano y sin caer nunca en un corte.
import { v } from "#voz";
import { momentos as m1 } from "./video/planos/01-hook.js";
import { momentos as m2 } from "./video/planos/02-esencia.js";
import { momentos as m3 } from "./video/planos/03-historia.js";
import { momentos as m4 } from "./video/planos/04-inmersion.js";
import { momentos as m5 } from "./video/planos/05-cta.js";

const e = [];
const pon = (sonido, t, o = {}) => e.push({ sonido, t, ...o });

const f1 = v.frase(1),
  f2 = v.frase(2),
  f3 = v.frase(3),
  f4 = v.frase(4),
  f5 = v.frase(5),
  f6 = v.frase(6),
  f7 = v.frase(7),
  f8 = v.frase(8);

// --- PLANO 1: El hook (0.00 a 15.00 s)
pon("aire", 0.08, { ancla: "empieza", db: -10, vel: 0.85, que: "viaje inicial por el túnel hacia el cerebro de PNL" });
pon("clic", m1.pnl, { db: -12, que: "se marca PNL en el cerebro de luz" });
pon("sube", f1.t("ya") - 0.05, { db: -13, vel: 1.0, que: "sube la energía hacia la tarjeta" });
pon("metal", m1.pagan, { db: -10, que: "entra y gira la tarjeta de pago en oro champagne" });
pon("toque", f1.t("sabes") + 0.05, { db: -14, que: "destello del sello de validación" });
pon("aire", f1.t("seguro"), { db: -13, vel: 0.8, que: "transición hacia el núcleo de esencia" });
pon("late", m1.mostrarte + 0.06, { db: -11, que: "late el núcleo vivo al mostrarte" });
pon("empujon", m1.mascara, { db: -8, que: "baja de golpe la coraza facetada de otra mujer" });
pon("cristal", f1.t("mujer") + 0.08, { db: -13, que: "encaja el cristal frío de la coraza" });

// Frase 2: las 3 placas y el estallido
pon("enganche", m1.placas[0], { db: -11, que: "encaja la placa MÁS SEGURA" });
pon("enganche", m1.placas[1], { db: -11, vel: 1.08, que: "encaja la placa MÁS PREPARADA" });
pon("metal", m1.placas[2] + 0.15, { db: -10, que: "se clava la placa NOMBRE BONITO" });
pon("cruje", f2.t("haces") + 0.12, { db: -12, que: "los aros metálicos aprietan la coraza" });
pon("tic", f2.t("mismo"), { db: -14, lp: 5500, que: "primera fisura de luz interna" });
pon("cruje", m1.grieta + 0.05, { db: -10, vel: 1.15, que: "la coraza se llena de grietas doradas" });
pon("estallido", m1.rompe, { db: -7, lp: 1800, corta: f3.inicio - 0.12, que: "revienta la coraza falsa en mil cristales" });

// --- PLANO 2: La mesa de diseño y los 3 lugares (15.04 a 26.76 s)
pon("desliza", f3.t("esencia") + 0.05, { db: -12, que: "el compás traza el boceto frío" });
pon("madera-rota", m2.disena + 0.04, { db: -10, que: "se quiebra el boceto de esencia diseñada" });
pon("empujon", m2.descubre, { db: -8, que: "emerge el núcleo vivo de tu esencia" });
pon("late", m2.descubre + 0.35, { db: -12, que: "late la esfera de esencia descubierta" });

// Frase 4: tres lugares
pon("clic", m2.tres, { db: -11, que: "se enciende la órbita de los 3 lugares" });
pon("roca", m2.heridas, { db: -10, que: "llega la esfera agrietada de las heridas" });
pon("cristal", m2.formaron + 0.08, { db: -11, que: "el oro kintsugi sella las heridas" });
pon("aire", m2.momentos - 0.06, { db: -12, vel: 0.9, que: "llega la roca incandescente de los momentos" });
pon("estallido", m2.transformaron, { db: -9, lp: 1600, vel: 1.15, que: "se abre en llamas y se transforma en luz" });
pon("sube", m2.verdades - 0.05, { db: -12, que: "sube el escudo de cristal de las verdades" });
pon("golpe-hondo", m2.defiendes, { db: -9, corta: f5.inicio - 0.12, que: "el escudo dispara el haz firme de tus verdades" });

// --- PLANO 3: La historia personal, redes sociales y la herida que conecta (26.80 a 41.00 s)
pon("late", f5.t("digo") + 0.1, { db: -12, que: "late el núcleo al empezar la historia" });
pon("aire", f5.t("paso") + 0.1, { db: -13, vel: 0.85, que: "aparecen las siluetas alrededor" });
pon("sube", m3.brillo, { db: -10, vel: 0.9, que: "el brillo crece e ilumina toda la escena" });
pon("empujon", m3.demasiado + 0.08, { db: -11, que: "las siluetas se apartan por demasiado brillo" });
pon("aire", f5.t("personas") + 0.35, { db: -14, vel: 0.9, que: "las siluetas levantan las manos ante la luz" });
pon("desliza", m3.redes - 0.05, { db: -11, que: "entra el marco 3D del celular en redes sociales" });
pon("golpe", m3.burla1, { db: -10, que: "primer dardo de burla" });
pon("roca", m3.burla2, { db: -9, que: "los dardos de burla abren la herida en el núcleo" });
pon("cruje", f5.t("mi", 4) + 0.06, { db: -11, que: "la grieta queda abierta en el centro" });

// Frase 6: la herida conecta con mujeres como tú
pon("aire", f6.t("resulta") + 0.05, { db: -13, vel: 0.85, que: "la cámara se acerca a la herida" });
pon("empujon", m3.herida, { db: -8, que: "de la herida brota luz de oro kintsugi" });
pon("sube", f6.t("donde") + 0.05, { db: -12, que: "se abren los puentes de luz dorada" });
pon("cristal", m3.conecto, { db: -10, que: "los puentes de luz conectan con la constelación" });
pon("late", m3.tu + 0.05, { db: -10, corta: f7.inicio - 0.12, que: "todas las esferas de mujeres laten juntas" });

// --- PLANO 4: La inmersión de 2 días en vivo (41.04 a 51.08 s)
pon("aire", f7.t("hacemos"), { db: -12, vel: 0.85, que: "se ilumina el anfiteatro de la inmersión" });
pon("clic", m4.inmersion + 0.05, { db: -12, que: "destello del escenario de la inmersión" });
pon("golpe", m4.dosDias, { db: -10, que: "se alzan los portales DÍA 1 y DÍA 2" });
pon("pitido", m4.enVivo, { db: -14, que: "se enciende el piloto EN VIVO" });
pon("empujon", m4.esencia, { db: -8, que: "late con fuerza el núcleo de tu esencia en el centro" });
pon("sube", m4.comuniques, { db: -10, vel: 0.85, que: "sube el haz dorado de lo que comuniques" });
pon("late", m4.viviste + 0.05, { db: -11, que: "se encienden las tres raíces de lo que viviste" });
pon("cruje", m4.deberias, { db: -11, corta: f8.inicio - 0.12, que: "se tacha y se apaga el molde de lo que deberías ser" });

// --- PLANO 5: CTA, botón y cupos limitados (51.12 a 62.00 s)
pon("aire", f8.t("descubrir"), { db: -12, vel: 0.85, que: "se abre la red del plano final" });
pon("cristal", m5.conectas, { db: -10, que: "se iluminan los nodos de conexión verdadera" });
pon("late", f8.t("verdad") + 0.1, { db: -12, que: "late la red de verdad" });
pon("desliza", m5.disenando, { db: -12, que: "se aparta la versión diseñada" });
pon("sube", m5.toca - 0.08, { db: -11, que: "sube el botón 3D APARTA TU LUGAR" });
pon("toque", m5.boton + 0.04, { db: -9, que: "se presiona el botón de abajo" });
pon("golpe-hondo", m5.lugar, { db: -8, que: "destello dorado al apartar tu lugar" });
pon("pitido", m5.vivo, { db: -14, que: "parpadea el indicador EN VIVO" });
for (let i = 0; i < m5.cupos.length; i++) {
  pon("tic", m5.cupos[i], { db: -13, vel: 0.95 + i * 0.05, lp: 6000, que: `se ocupa el cupo ${i + 1}` });
}
pon("late", f8.t("limitados") + 0.35, { db: -11, que: "latido final de los últimos lugares disponibles" });

export default e;
