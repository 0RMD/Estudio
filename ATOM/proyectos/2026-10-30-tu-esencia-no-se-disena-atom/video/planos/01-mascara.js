// Plano 01 (01-mascara.js) en estilo ATOM (0.00 a 14.80 s).
import * as k from "#kit";
import { v } from "#voz";
import { CIAN_RGB, CORAL_RGB, SOL_RGB, acabarAtom, corazaMetalAtom, esferaEsenciaAtom, fondoAtom, latidoRitmo, rotuloAtom } from "../mundo.js";

export const desde = 0;

const { suave, tramo, entra, pulso, mez, redondo } = k;

const f1 = v.frase(1), f2 = v.frase(2);
const Tpnl = f1.t("pnl");
const Tpagan = f1.t("pagan");
const Tmostrarte = f1.t("mostrarte");
const Totra = f1.t("otra");

const Tsegura = f2.t("segura");
const Tpreparada = f2.t("preparada");
const Tbonito = f2.t("bonito");
const Tno = f2.t("no");
const Tcrees = f2.t("crees");

function insigniaAtom(g, x, y, texto, sub, color, al) {
  if (al <= 0.01) return;
  g.save();
  g.globalAlpha *= al;
  g.translate(x, y);
  redondo(g, -185, -48, 370, 96, 24);
  g.fillStyle = "rgba(8,12,26,0.92)";
  g.fill();
  g.strokeStyle = color;
  g.lineWidth = 3.5;
  g.shadowColor = color;
  g.shadowBlur = 18;
  g.stroke();
  g.shadowBlur = 0;
  g.textAlign = "center";
  g.fillStyle = "rgba(215,230,255,0.72)";
  g.font = "700 21px Figtree";
  g.fillText(sub, 0, -10);
  g.fillStyle = "#FFFFFF";
  g.font = "800 30px Figtree";
  g.fillText(texto, 0, 26);
  g.restore();
}

export function dibuja(g, t) {
  const uFreno = tramo(t, 14.15, 14.6);
  const tFase = t < 14.15 ? t : 14.15 + 0.45 * (uFreno - 0.5 * uFreno * uFreno);
  const lat = latidoRitmo(tFase) * (1 - uFreno);

  const uMascara = suave(tramo(t, Tmostrarte - 0.25, Totra + 0.25));
  fondoAtom(g, tFase, 1 - 0.7 * uMascara);

  const zoomCam = mez(0.95, 1.12, suave(tramo(t, 0, Tcrees + 0.2))) + 0.01 * lat;
  g.save();
  g.translate(540, 1120);
  g.scale(zoomCam, zoomCam);
  g.translate(-540, -1120);

  // Esfera solar de tu conocimiento PNL brillando desde el fotograma 0
  esferaEsenciaAtom(g, 540, 1080, 150, tFase, 1 - 0.45 * uMascara, 0);

  const alSabes = 1 - 0.75 * uMascara;
  const uPnl = entra(tramo(t, 0, Tpnl + 0.25));
  insigniaAtom(g, 295 - uMascara * 90, 860, "CERTIFICACIÓN PNL", "tu maestría", "#FBBF24", uPnl * alSabes);

  const uPagan = entra(tramo(t, Tpnl + 0.15, Tpagan + 0.25));
  insigniaAtom(g, 785 + uMascara * 90, 860, "YA TE PAGAN ✓", "por lo que sabes", "#34D399", uPagan * alSabes);

  // Coraza metálica cromada («OTRA MUJER») cerrándose sobre la esfera
  if (uMascara > 0.01) {
    const escCoraza = mez(1.38, 1.14, entra(tramo(t, Tmostrarte - 0.25, Totra + 0.2)));
    const uGrieta = entra(tramo(t, Tcrees - 0.12, Tcrees + 0.32));

    g.save();
    g.globalAlpha = uMascara;
    corazaMetalAtom(g, 540, 1080, escCoraza, tFase, uGrieta);
    g.restore();

    k.fogonazo(g, 540, 1080, t - Totra, 620, CIAN_RGB);
    k.fogonazo(g, 540, 1080, t - Tcrees, 760, CORAL_RGB);

    const colEti = uGrieta > 0.2 ? "#F43F5E" : "#38BDF8";
    insigniaAtom(g, 250, 910, "MÁS SEGURA", "armadura 01", colEti, entra(tramo(t, Tsegura - 0.18, Tsegura + 0.25)));
    insigniaAtom(g, 830, 910, "MÁS PREPARADA", "armadura 02", colEti, entra(tramo(t, Tpreparada - 0.18, Tpreparada + 0.25)));
    insigniaAtom(g, 540, 1395, "«NOMBRE BONITO»", "etiqueta artificial", colEti, entra(tramo(t, Tbonito - 0.22, Tbonito + 0.25)));
  }

  g.restore();

  const uNoCrees = suave(tramo(t, Tno - 0.15, Tcrees + 0.1));
  if (uNoCrees > 0.05) {
    const esc = 1 + 0.08 * pulso(t, Tcrees, 0.2);
    rotuloAtom(g, 540, 635, "personaje artificial", "NO TE LA CREES NI TÚ", "#F43F5E", uNoCrees, 58 * esc);
  } else if (uMascara > 0.1) {
    rotuloAtom(g, 540, 635, "para mostrarte", "OTRA MUJER", "#38BDF8", uMascara, 62);
  } else {
    rotuloAtom(g, 540, 635, "sabes PNL y te pagan", "TU VALOR REAL", "#FBBF24", 1, 58);
  }

  acabarAtom(g, 0.35);
}

export const momentosMascara = {
  pnl: Tpnl,
  pagan: Tpagan,
  entraMascara: Totra,
  segura: Tsegura,
  preparada: Tpreparada,
  bonito: Tbonito,
  grieta: Tcrees,
};
