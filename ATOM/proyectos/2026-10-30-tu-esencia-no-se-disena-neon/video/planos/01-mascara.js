// Plano 01 (01-mascara.js) en estilo Datos Neón (0.00 a 14.80 s).
import * as k from "#kit";
import { v } from "#voz";
import { cabeceraNeon, fondoNeon, latidoRitmo } from "../mundo.js";

export const desde = 0;

const { NEON, suave, tramo, entra, pulso, mez } = k;

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

export function dibuja(g, t) {
  const uFreno = tramo(t, 14.15, 14.6);
  const tFase = t < 14.15 ? t : 14.15 + 0.45 * (uFreno - 0.5 * uFreno * uFreno);
  const lat = latidoRitmo(tFase) * (1 - uFreno);

  fondoNeon(g, tFase);

  const uMascara = suave(tramo(t, Tmostrarte - 0.2, Totra + 0.25));
  const uNoCrees = suave(tramo(t, Tno - 0.15, Tcrees + 0.15));

  cabeceraNeon(
    g,
    "DIAGNÓSTICO DE IDENTIDAD · PNL",
    uNoCrees > 0.2 ? "CREDIBILIDAD INTERNA: 0%" : uMascara > 0.2 ? "MODO: OTRA MUJER" : "NIVEL PNL: PROFESIONAL",
    uNoCrees > 0.2 || uMascara > 0.2 ? NEON.magenta : NEON.verde
  );

  k.panelNeon(g, 80, 725, 920, 290, NEON.verde, 1);
  k.textoMono(g, "01 · CAPACIDAD REAL COMPROBADA", 120, 775, 25, NEON.tenue);

  const vPnl = entra(tramo(t, 0, Tpnl + 0.35));
  k.textoMono(g, "ESTUDIOS PNL", 120, 835, 32, NEON.texto);
  k.barraNeon(g, 430, 808, 390, 32, vPnl, NEON.verde);
  k.textoMono(g, `${Math.round(vPnl * 100)}%`, 845, 835, 32, NEON.verde, { brillo: true });

  const vPagan = entra(tramo(t, Tpnl + 0.15, Tpagan + 0.35));
  k.textoMono(g, "INGRESOS / PAGOS", 120, 915, 32, NEON.texto);
  k.barraNeon(g, 430, 888, 390, 32, vPagan, NEON.ambar);
  k.chipNeon(g, "ACTIVO", 900, 904, NEON.ambar, 26, vPagan);

  if (uMascara > 0.01) {
    k.panelNeon(g, 80, 1050, 920, 620, NEON.magenta, uMascara);
    k.textoMono(g, "02 · MÁSCARA DISEÑADA (OTRA MUJER)", 120, 1105, 25, NEON.magenta, { al: uMascara });

    const vSeg = entra(tramo(t, Tsegura - 0.15, Tsegura + 0.3));
    const vPrep = entra(tramo(t, Tpreparada - 0.15, Tpreparada + 0.3));
    const vBon = entra(tramo(t, Tbonito - 0.15, Tbonito + 0.3));

    const filas = [
      { y: 1170, txt: "+ MÁS SEGURA", v: vSeg },
      { y: 1245, txt: "+ MÁS PREPARADA", v: vPrep },
      { y: 1320, txt: "+ NOMBRE BONITO", v: vBon },
    ];
    for (const fl of filas) {
      k.textoMono(g, fl.txt, 120, fl.y, 30, NEON.texto, { al: uMascara });
      k.barraNeon(g, 490, fl.y - 26, 460, 28, fl.v * uMascara, NEON.magenta);
    }

    const pCaida = entra(tramo(t, Tmostrarte, Tcrees + 0.15));
    const pts = [
      [130, 1425],
      [340, 1435],
      [540, 1495],
      [740, 1585],
      [940, 1615],
    ];
    k.lineaNeon(g, pts, NEON.magenta, 7 + 2 * lat, pCaida);

    if (uNoCrees > 0.05) {
      const esc = 1 + 0.06 * pulso(t, Tcrees, 0.2);
      k.chipNeon(g, "NO TE LA CREES NI TÚ · 0%", 540, 1515, NEON.magenta, 36 * esc, uNoCrees);
      k.fogonazo(g, 540, 1515, t - Tcrees, 620, NEON.magentaRgb);
    }
  }
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
