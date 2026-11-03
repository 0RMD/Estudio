// Plano 03 (03-brillo.js): El miedo a brillar, la burla en redes y el puente de conexión con paleta www.hectorhugo.mx (26.72 a 41.36 s).
// «Te lo digo porque a mí me pasó: yo sentía que mi brillo era demasiado para otras personas,
//  que si me mostraba en redes sociales, mi familia se iba a burlar de mí,
//  pero resulta que esa herida es desde donde hoy conecto con mujeres como tú.»
import * as k from "#kit";
import { v } from "#voz";
import { HH, LAVANDA_RGB, ORO_RGB, ROJO_RGB, acabarCine, latidoRitmo, mesaEstudio, nucleoEsencia3D, rotuloHH } from "../mundo.js";

const f5 = v.frase(5), f6 = v.frase(6), f7 = v.frase(7);
export const desde = () => f5.inicio;
export const entrada = "fundido";

const { suave, tramo, entra, pulso, mez, redondo } = k;

const Tpaso = f5.t("paso");
const Tbrillo = f5.t("brillo");
const Tdemasiado = f5.t("demasiado");

const Tredes = f6.t("redes");
const Tfamilia = f6.t("familia");
const Tburlar = f6.t("burlar");

const Therida = f7.t("herida");
const Tconecto = f7.t("conecto");
const Tmujeres = f7.t("mujeres");

const NODOS_MUJERES = [
  { x: 205, y: 860, r: 34 },
  { x: 875, y: 860, r: 34 },
  { x: 165, y: 1140, r: 38 },
  { x: 915, y: 1140, r: 38 },
  { x: 245, y: 1410, r: 36 },
  { x: 835, y: 1410, r: 36 },
  { x: 540, y: 1495, r: 40 },
];

export function dibuja(g, t) {
  const uFreno = tramo(t, 40.65, 41.15);
  const tFase = t < 40.65 ? t : 40.65 + 0.5 * (uFreno - 0.5 * uFreno * uFreno);
  const lat = latidoRitmo(tFase) * (1 - uFreno);

  mesaEstudio(g, 0, tFase * 14, 540, 1110, tFase);

  const uRedes = suave(tramo(t, f6.inicio - 0.1, Tredes + 0.3));
  const uConecto = suave(tramo(t, f7.inicio - 0.05, Tconecto + 0.25));

  const cx = 540, cy = 1110;

  // 1) Marco 3D de pantalla de redes sociales y flechas de burla (Frase 6)
  const alBurla = uRedes * (1 - suave(tramo(t, Therida - 0.1, Tconecto + 0.15)));
  if (alBurla > 0.01) {
    g.save();
    g.globalAlpha = alBurla;

    redondo(g, cx - 220, cy - 310, 440, 620, 38);
    g.fillStyle = "rgba(26, 15, 46, 0.90)";
    g.fill();
    g.strokeStyle = HH.coral;
    g.lineWidth = 4;
    g.stroke();

    const uFlechas = entra(tramo(t, Tfamilia - 0.2, Tburlar + 0.2));
    const FLECHAS = [
      { x0: 120, y0: 860, txt: "«¿QUÉ DIRÁN?»" },
      { x0: 960, y0: 860, txt: "«SE VAN A BURLAR»" },
      { x0: 120, y0: 1340, txt: "«ES DEMASIADO»" },
      { x0: 960, y0: 1340, txt: "«QUIÉN SE CREE»" },
    ];
    for (const fl of FLECHAS) {
      const xPunta = mez(fl.x0, cx + (fl.x0 < cx ? -145 : 145), uFlechas);
      const yPunta = mez(fl.y0, cy + (fl.y0 < cy ? -75 : 75), uFlechas);

      g.strokeStyle = HH.coral;
      g.lineWidth = 6;
      g.beginPath();
      g.moveTo(fl.x0, fl.y0);
      g.lineTo(xPunta, yPunta);
      g.stroke();

      redondo(g, fl.x0 - 115, fl.y0 - 28, 230, 56, 14);
      g.fillStyle = "rgba(26, 15, 46, 0.95)";
      g.fill();
      g.strokeStyle = HH.coral;
      g.lineWidth = 2.5;
      g.stroke();
      g.fillStyle = HH.cream;
      g.font = "700 21px Figtree";
      g.textAlign = "center";
      g.fillText(fl.txt, fl.x0, fl.y0 + 7);
    }
    g.restore();
  }

  // 2) En Frase 5 («mi brillo era demasiado»): pantallas intentando contener el brillo central
  const uTapa = suave(tramo(t, Tdemasiado - 0.25, Tdemasiado + 0.35)) * (1 - uConecto);
  if (uTapa > 0.01 && uRedes < 0.8) {
    g.save();
    g.globalAlpha = 1 - uRedes * 0.7;
    const dCierre = mez(280, 125, uTapa);
    g.strokeStyle = HH.violetLight;
    g.lineWidth = 8;
    g.beginPath();
    g.arc(cx, cy, dCierre, -0.7, 0.7);
    g.stroke();
    g.beginPath();
    g.arc(cx, cy, dCierre, Math.PI - 0.7, Math.PI + 0.7);
    g.stroke();
    g.restore();
  }

  // 3) En Frase 7 («esa herida es desde donde hoy conecto con mujeres como tú»):
  // Puentes de luz champagne y lavanda saliendo de la herida hacia los nodos de otras mujeres
  if (uConecto > 0.01) {
    const pRed = entra(tramo(t, Therida, Tmujeres + 0.2));
    g.save();
    g.globalCompositeOperation = "lighter";
    for (const [idx, n] of NODOS_MUJERES.entries()) {
      const xFin = mez(cx, n.x, pRed);
      const yFin = mez(cy, n.y, pRed);

      const lg = g.createLinearGradient(cx, cy, xFin, yFin);
      lg.addColorStop(0, `rgba(250,246,240,${0.95 * uConecto})`);
      lg.addColorStop(0.55, `rgba(${ORO_RGB},${0.85 * uConecto})`);
      lg.addColorStop(1, `rgba(${LAVANDA_RGB},${0.75 * uConecto})`);
      g.strokeStyle = lg;
      g.lineWidth = 7;
      g.beginPath();
      g.moveTo(cx, cy);
      g.lineTo(xFin, yFin);
      g.stroke();

      if (pRed > 0.65) {
        const latNodo = 0.7 + 0.3 * Math.sin(tFase * 5 + idx);
        k.brillo(g, n.x, n.y, n.r * 4.5, idx % 2 === 0 ? ORO_RGB : LAVANDA_RGB, uConecto * latNodo);
        g.fillStyle = HH.creamSoft;
        g.beginPath();
        g.arc(n.x, n.y, n.r * 0.65, 0, Math.PI * 2);
        g.fill();
      }
    }
    g.restore();
  }

  // El núcleo central de tu brillo / tu herida convertida en oro Kintsugi
  const rBrillo = mez(135, 165, pulso(t, Tbrillo, 0.35)) * (1 - 0.22 * uTapa) + 22 * uConecto;
  const kintsugi = suave(tramo(t, Tburlar - 0.1, Therida + 0.2));
  nucleoEsencia3D(g, cx, cy, rBrillo, tFase, 1, kintsugi);

  k.fogonazo(g, cx, cy, t - Tbrillo, 680, ORO_RGB);
  k.fogonazo(g, cx, cy, t - Tburlar, 560, ROJO_RGB);
  k.fogonazo(g, cx, cy, t - Tconecto, 780, ORO_RGB);

  // Rótulo superior según el momento
  if (uConecto > 0.2) {
    const esc = 1 + 0.07 * pulso(t, Tconecto, 0.2) + 0.015 * lat;
    rotuloHH(g, 540, 635, "desde esa herida", "CONECTO CONTIGO", 1, 62 * esc);
  } else if (uRedes > 0.2) {
    rotuloHH(g, 540, 635, "miedo en redes", "«SE VAN A BURLAR»", 1, 58);
  } else {
    rotuloHH(g, 540, 635, "a mí me pasó", "DEMASIADO BRILLO", 1, 60);
  }

  acabarCine(g, t, 0.35);
}

export const momentosBrillo = {
  paso: Tpaso,
  brillo: Tbrillo,
  redes: Tredes,
  burlar: Tburlar,
  herida: Therida,
  conecto: Tconecto,
};
