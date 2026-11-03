// Plano 04 (04-inmersion.js) en estilo ATOM (41.36 a 52.40 s).
import * as k from "#kit";
import { v } from "#voz";
import { CORAL_RGB, SOL_RGB, acabarAtom, corazaMetalAtom, esferaEsenciaAtom, fondoAtom, latidoRitmo, rotuloAtom } from "../mundo.js";

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

function portalDiaAtom(g, x, y, titulo, sub, al) {
  if (al <= 0.01) return;
  g.save();
  g.globalAlpha *= al;
  g.translate(x, y);

  redondo(g, -185, -95, 370, 190, 26);
  g.fillStyle = "rgba(10,14,30,0.92)";
  g.fill();
  g.strokeStyle = "#FBBF24";
  g.lineWidth = 3.5;
  g.shadowColor = "#FBBF24";
  g.shadowBlur = 20;
  g.stroke();
  g.shadowBlur = 0;

  g.textAlign = "center";
  g.fillStyle = "#FBBF24";
  g.font = "800 28px Figtree";
  g.fillText(titulo, 0, -22);
  g.fillStyle = "#FFFFFF";
  g.font = "800 34px Figtree";
  g.fillText(sub, 0, 32);

  g.restore();
}

export function dibuja(g, t) {
  const uFreno = tramo(t, 51.7, 52.2);
  const tFase = t < 51.7 ? t : 51.7 + 0.5 * (uFreno - 0.5 * uFreno * uFreno);
  const lat = latidoRitmo(tFase) * (1 - uFreno);

  fondoAtom(g, tFase, 0.85);
  k.rayos(g, tFase, 1450, 0.4, 7, SOL_RGB);

  const uFrase9 = suave(tramo(t, f9.inicio - 0.1, Tcomuniques + 0.25));

  if (uFrase9 < 0.98) {
    g.save();
    g.globalAlpha = 1 - uFrase9;

    const uDias = entra(tramo(t, Tdos - 0.2, Tvivo + 0.2));
    portalDiaAtom(g, 285, 865, "DÍA 01 · EN VIVO", "DESCUBRIR TU ESENCIA", uDias);
    portalDiaAtom(g, 795, 865, "DÍA 02 · EN VIVO", "TU MENSAJE REAL", uDias);

    const uVivo = entra(tramo(t, Tvivo - 0.2, Tvivo + 0.25));
    if (uVivo > 0.01) {
      g.save();
      g.translate(540, 1435);
      redondo(g, -180, -46, 360, 92, 46);
      g.fillStyle = "#E11D48";
      g.fill();
      g.strokeStyle = "#FFF1F2";
      g.lineWidth = 3.5;
      g.stroke();
      g.fillStyle = "#FFFFFF";
      g.font = "800 34px Figtree";
      g.textAlign = "center";
      g.fillText("● 2 DÍAS EN VIVO", 0, 12);
      g.restore();
    }

    const rEs = mez(120, 172, suave(tramo(t, f8.inicio, Tesencia + 0.2)));
    esferaEsenciaAtom(g, 540, 1155, rEs, tFase, 1, 1);
    k.fogonazo(g, 540, 1155, t - Tesencia, 780, SOL_RGB);

    const esc = 1 + 0.08 * pulso(t, Tesencia, 0.22);
    rotuloAtom(g, 540, 635, "inmersión en vivo", "TU ESENCIA", "#FBBF24", 1 - uFrase9, 66 * esc);
    g.restore();
  }

  if (uFrase9 > 0.01) {
    g.save();
    g.globalAlpha = uFrase9;

    const uViviste = suave(tramo(t, Tviviste - 0.25, Tviviste + 0.3));
    const uDeberias = suave(tramo(t, Tcrees9 - 0.2, f9.fin));

    const xEsencia = mez(340, 420, uDeberias);
    for (let i = 1; i <= 3; i++) {
      const rOnda = 145 + i * 62 + ((tFase * 70) % 62);
      g.strokeStyle = `rgba(${SOL_RGB},${0.6 * (1 - i * 0.22)})`;
      g.lineWidth = 4.5;
      g.beginPath();
      g.arc(xEsencia, 1100, rOnda, 0, Math.PI * 2);
      g.stroke();
    }
    esferaEsenciaAtom(g, xEsencia, 1100, 145 + 18 * uViviste, tFase, 1, 1);
    k.fogonazo(g, xEsencia, 1100, t - Tviviste, 680, SOL_RGB);

    const alFantasma = Math.max(0.18, 1 - 0.75 * uDeberias);
    g.save();
    g.globalAlpha *= alFantasma;
    corazaMetalAtom(g, 815, 1100, 0.78, tFase, 0.9);
    g.restore();

    const esc = 1 + 0.06 * pulso(t, Tviviste, 0.2) + 0.015 * lat;
    rotuloAtom(g, 540, 635, "comunica desde", "LO QUE VIVISTE", "#FBBF24", uFrase9, 64 * esc);
    g.restore();
  }

  acabarAtom(g, 0.35);
}

export const momentosInmersion = {
  inmersion: Tinmersion,
  dos: Tdos,
  vivo: Tvivo,
  esencia: Tesencia,
  viviste: Tviviste,
  crees9: Tcrees9,
};
