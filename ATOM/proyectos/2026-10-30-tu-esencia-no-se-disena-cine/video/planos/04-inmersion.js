// Plano 04 (04-inmersion.js): La inmersión de 2 días EN VIVO y comunicar desde lo vivido con paleta www.hectorhugo.mx (41.36 a 52.40 s).
// «Eso es lo que hacemos en mi inmersión: dos días EN VIVO donde empezamos por tu ESENCIA,
//  para que lo que comuniques salga de lo que viviste y no de lo que crees que deberías ser.»
import * as k from "#kit";
import { v } from "#voz";
import { HH, LAVANDA_RGB, ORO_RGB, acabarCine, latidoRitmo, mascaraPorcelana3D, mesaEstudio, nucleoEsencia3D, rotuloHH } from "../mundo.js";

const f8 = v.frase(8), f9 = v.frase(9);
export const desde = () => f8.inicio;
export const entrada = "fundido";

const { suave, tramo, entra, pulso, mez, redondo } = k;

const Tinmersion = f8.t("inmersion");
const Tdos = f8.t("dos");
const Tvivo = f8.t("vivo");
const Tesencia = f8.t("esencia");

const Tcomuniques = f9.t("comuniques");
const Tviviste = f9.t("viviste");
const Tcrees9 = f9.t("crees");

function tarjetaDia(g, x, y, titulo, sub, al, esDia2 = false) {
  if (al <= 0.01) return;
  g.save();
  g.globalAlpha *= al;
  g.translate(x, y);

  redondo(g, -185, -95, 370, 190, 24);
  const bg = g.createLinearGradient(0, -95, 0, 95);
  bg.addColorStop(0, "rgba(26, 15, 46, 0.94)");
  bg.addColorStop(1, "rgba(42, 27, 69, 0.94)");
  g.fillStyle = bg;
  g.fill();
  g.strokeStyle = esDia2 ? HH.lavender : HH.champagne;
  g.lineWidth = 3.5;
  g.stroke();

  g.textAlign = "center";
  g.fillStyle = esDia2 ? HH.lavender : HH.champagne;
  g.font = "800 28px Figtree";
  g.fillText(titulo, 0, -22);
  g.fillStyle = HH.cream;
  g.font = "800 34px Figtree";
  g.fillText(sub, 0, 32);

  g.restore();
}

export function dibuja(g, t) {
  const uFreno = tramo(t, 51.7, 52.2);
  const tFase = t < 51.7 ? t : 51.7 + 0.5 * (uFreno - 0.5 * uFreno * uFreno);
  const lat = latidoRitmo(tFase) * (1 - uFreno);

  mesaEstudio(g, tFase * 15, 0, 540, 1100, tFase);

  const uFrase9 = suave(tramo(t, f9.inicio - 0.1, Tcomuniques + 0.25));

  // ---------------- 1. INMERSIÓN 2 DÍAS EN VIVO (Frase 8: 41.36 a 47.20 s)
  if (uFrase9 < 0.98) {
    g.save();
    g.globalAlpha = 1 - uFrase9;

    const uDias = entra(tramo(t, Tdos - 0.2, Tvivo + 0.2));
    tarjetaDia(g, 285, 865, "DÍA 01 · EN VIVO", "DESCUBRIR TU ESENCIA", uDias, false);
    tarjetaDia(g, 795, 865, "DÍA 02 · EN VIVO", "TU MENSAJE REAL", uDias, true);

    // Insignia estilo .btn-accent de www.hectorhugo.mx («● 2 DÍAS EN VIVO»)
    const uVivo = entra(tramo(t, Tvivo - 0.2, Tvivo + 0.25));
    if (uVivo > 0.01) {
      g.save();
      g.translate(540, 1435);
      redondo(g, -185, -46, 370, 92, 46);
      const vg = g.createLinearGradient(-185, -46, 185, 46);
      vg.addColorStop(0, HH.violet);
      vg.addColorStop(1, HH.aubergineSoft);
      g.fillStyle = vg;
      g.fill();
      g.strokeStyle = HH.champagne;
      g.lineWidth = 3.5;
      g.stroke();
      g.fillStyle = HH.cream;
      g.font = "800 34px Figtree";
      g.textAlign = "center";
      g.fillText("● 2 DÍAS EN VIVO", 0, 12);
      g.restore();
    }

    const rEs = mez(115, 165, suave(tramo(t, f8.inicio, Tesencia + 0.2)));
    nucleoEsencia3D(g, 540, 1155, rEs, tFase, 1, 1);
    k.fogonazo(g, 540, 1155, t - Tesencia, 740, ORO_RGB);

    const esc = 1 + 0.08 * pulso(t, Tesencia, 0.22);
    rotuloHH(g, 540, 635, "inmersión en vivo", "TU ESENCIA", 1 - uFrase9, 66 * esc);
    g.restore();
  }

  // ---------------- 2. LO QUE VIVISTE vs LO QUE DEBERÍAS SER (Frase 9: 46.96 a 52.40 s)
  if (uFrase9 > 0.01) {
    g.save();
    g.globalAlpha = uFrase9;

    const uViviste = suave(tramo(t, Tviviste - 0.25, Tviviste + 0.3));
    const uDeberias = suave(tramo(t, Tcrees9 - 0.2, f9.fin));

    const xEsencia = mez(340, 405, uDeberias);
    for (let i = 1; i <= 3; i++) {
      const rOnda = 140 + i * 58 + ((tFase * 65) % 58);
      g.strokeStyle = i % 2 === 1
        ? `rgba(${ORO_RGB},${0.55 * (1 - i * 0.22)})`
        : `rgba(${LAVANDA_RGB},${0.48 * (1 - i * 0.22)})`;
      g.lineWidth = 4;
      g.beginPath();
      g.arc(xEsencia, 1100, rOnda, 0, Math.PI * 2);
      g.stroke();
    }
    nucleoEsencia3D(g, xEsencia, 1100, 138 + 16 * uViviste, tFase, 1, 1);
    k.fogonazo(g, xEsencia, 1100, t - Tviviste, 640, ORO_RGB);

    // Derecha: La máscara fotorrealista de porcelana partida («LO QUE DEBERÍAS SER») desvaneciéndose
    const alFantasma = Math.max(0.22, 1 - 0.68 * uDeberias);
    g.save();
    g.globalAlpha *= alFantasma;
    mascaraPorcelana3D(g, 815, 1100, 0.76, tFase, 0.92, 1);
    g.restore();

    const esc = 1 + 0.06 * pulso(t, Tviviste, 0.2) + 0.015 * lat;
    rotuloHH(g, 540, 635, "comunica desde", "LO QUE VIVISTE", uFrase9, 64 * esc);
    g.restore();
  }

  acabarCine(g, t, 0.35);
}

export const momentosInmersion = {
  inmersion: Tinmersion,
  dos: Tdos,
  vivo: Tvivo,
  esencia: Tesencia,
  viviste: Tviviste,
  crees9: Tcrees9,
};
