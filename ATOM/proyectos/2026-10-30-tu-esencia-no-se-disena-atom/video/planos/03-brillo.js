// Plano 03 (03-brillo.js) en estilo ATOM (26.72 a 41.36 s).
import * as k from "#kit";
import { v } from "#voz";
import { CORAL_RGB, SOL_RGB, acabarAtom, esferaEsenciaAtom, fondoAtom, latidoRitmo, rotuloAtom } from "../mundo.js";

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

const NODOS = [
  { x: 195, y: 850, r: 38 },
  { x: 885, y: 850, r: 38 },
  { x: 155, y: 1140, r: 42 },
  { x: 925, y: 1140, r: 42 },
  { x: 240, y: 1420, r: 38 },
  { x: 840, y: 1420, r: 38 },
  { x: 540, y: 1505, r: 44 },
];

export function dibuja(g, t) {
  const uFreno = tramo(t, 40.65, 41.15);
  const tFase = t < 40.65 ? t : 40.65 + 0.5 * (uFreno - 0.5 * uFreno * uFreno);
  const lat = latidoRitmo(tFase) * (1 - uFreno);

  fondoAtom(g, tFase, 0.8);

  const uRedes = suave(tramo(t, f6.inicio - 0.1, Tredes + 0.3));
  const uConecto = suave(tramo(t, f7.inicio - 0.05, Tconecto + 0.25));
  const cx = 540, cy = 1110;

  const alBurla = uRedes * (1 - suave(tramo(t, Therida - 0.1, Tconecto + 0.15)));
  if (alBurla > 0.01) {
    g.save();
    g.globalAlpha = alBurla;
    redondo(g, cx - 225, cy - 315, 450, 630, 40);
    g.fillStyle = "rgba(8,11,24,0.88)";
    g.fill();
    g.strokeStyle = "#F43F5E";
    g.lineWidth = 4;
    g.stroke();

    const uFlechas = entra(tramo(t, Tfamilia - 0.2, Tburlar + 0.2));
    const FLECHAS = [
      { x0: 120, y0: 855, txt: "«¿QUÉ DIRÁN?»" },
      { x0: 960, y0: 855, txt: "«SE VAN A BURLAR»" },
      { x0: 120, y0: 1345, txt: "«ES DEMASIADO»" },
      { x0: 960, y0: 1345, txt: "«QUIÉN SE CREE»" },
    ];
    for (const fl of FLECHAS) {
      const xP = mez(fl.x0, cx + (fl.x0 < cx ? -150 : 150), uFlechas);
      const yP = mez(fl.y0, cy + (fl.y0 < cy ? -78 : 78), uFlechas);
      g.strokeStyle = "#F43F5E";
      g.lineWidth = 6.5;
      g.beginPath();
      g.moveTo(fl.x0, fl.y0);
      g.lineTo(xP, yP);
      g.stroke();

      redondo(g, fl.x0 - 118, fl.y0 - 28, 236, 56, 16);
      g.fillStyle = "rgba(15,10,24,0.94)";
      g.fill();
      g.strokeStyle = "#F43F5E";
      g.lineWidth = 2.5;
      g.stroke();
      g.fillStyle = "#FFFFFF";
      g.font = "700 21px Figtree";
      g.textAlign = "center";
      g.fillText(fl.txt, fl.x0, fl.y0 + 7);
    }
    g.restore();
  }

  const uTapa = suave(tramo(t, Tdemasiado - 0.25, Tdemasiado + 0.35)) * (1 - uConecto);
  if (uTapa > 0.01 && uRedes < 0.8) {
    g.save();
    g.globalAlpha = 1 - uRedes * 0.7;
    const dCierre = mez(295, 130, uTapa);
    g.strokeStyle = "#64748B";
    g.lineWidth = 10;
    g.beginPath();
    g.arc(cx, cy, dCierre, -0.75, 0.75);
    g.stroke();
    g.beginPath();
    g.arc(cx, cy, dCierre, Math.PI - 0.75, Math.PI + 0.75);
    g.stroke();
    g.restore();
  }

  if (uConecto > 0.01) {
    const pRed = entra(tramo(t, Therida, Tmujeres + 0.2));
    g.save();
    g.globalCompositeOperation = "lighter";
    for (const [idx, n] of NODOS.entries()) {
      const xFin = mez(cx, n.x, pRed);
      const yFin = mez(cy, n.y, pRed);
      const lg = g.createLinearGradient(cx, cy, xFin, yFin);
      lg.addColorStop(0, `rgba(255,235,170,${0.95 * uConecto})`);
      lg.addColorStop(1, `rgba(${CORAL_RGB},${0.8 * uConecto})`);
      g.strokeStyle = lg;
      g.lineWidth = 7.5;
      g.beginPath();
      g.moveTo(cx, cy);
      g.lineTo(xFin, yFin);
      g.stroke();

      if (pRed > 0.65) {
        const latN = 0.7 + 0.3 * Math.sin(tFase * 5.2 + idx);
        k.brillo(g, n.x, n.y, n.r * 5, SOL_RGB, uConecto * latN);
        g.fillStyle = "#FFFBEB";
        g.beginPath();
        g.arc(n.x, n.y, n.r * 0.65, 0, Math.PI * 2);
        g.fill();
      }
    }
    g.restore();
  }

  const rBrillo = mez(142, 174, pulso(t, Tbrillo, 0.35)) * (1 - 0.22 * uTapa) + 24 * uConecto;
  const kintsugi = suave(tramo(t, Tburlar - 0.1, Therida + 0.2));
  esferaEsenciaAtom(g, cx, cy, rBrillo, tFase, 1, kintsugi);

  k.fogonazo(g, cx, cy, t - Tbrillo, 720, SOL_RGB);
  k.fogonazo(g, cx, cy, t - Tburlar, 620, CORAL_RGB);
  k.fogonazo(g, cx, cy, t - Tconecto, 820, SOL_RGB);

  if (uConecto > 0.2) {
    const esc = 1 + 0.07 * pulso(t, Tconecto, 0.2) + 0.015 * lat;
    rotuloAtom(g, 540, 635, "desde esa herida", "CONECTO CONTIGO", "#FBBF24", 1, 62 * esc);
  } else if (uRedes > 0.2) {
    rotuloAtom(g, 540, 635, "miedo en redes", "«SE VAN A BURLAR»", "#F43F5E", 1, 58);
  } else {
    rotuloAtom(g, 540, 635, "a mí me pasó", "DEMASIADO BRILLO", "#FBBF24", 1, 60);
  }

  acabarAtom(g, 0.35);
}

export const momentosBrillo = {
  paso: Tpaso,
  brillo: Tbrillo,
  redes: Tredes,
  burlar: Tburlar,
  herida: Therida,
  conecto: Tconecto,
};
