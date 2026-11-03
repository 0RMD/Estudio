// Segunda apertura del hook: el espejo monumental de cristal y oro champagne donde tu luz real y tus estudios de PNL
// quedan tapados por la máscara rígida de «otra mujer», hasta que todo el espejo revienta en «no te la crees ni tú».
import * as k from "#kit";
import { v } from "#voz";
import { METAL_CHAMPAGNE, PAL, fondoMundo, mascaraFalsa, nucleoEsencia, placaCristal, velo, vineta } from "../mundo.js";

export const desde = 0;

const { suave: su, tramo: tr, mez, entra, azar, redondo } = k;
const f1 = v.frase(1), f2 = v.frase(2);

const Tpnl = f1.t("pnl"),
  Tpag = f1.t("pagan"),
  Tmos = f1.t("mostrarte"),
  Totra = f1.t("otra");

const Tseg = f2.t("segura"),
  Tpre = f2.t("preparada"),
  Tnom = f2.t("nombre"),
  Tbon = f2.t("bonito"),
  Tno = f2.t("no"),
  Tcre = f2.t("crees");

const rompe = Tcre + 0.02;

const azR = azar(909);
const TROZOS = Array.from({ length: 84 }, () => {
  const a = azR() * 6.2832, d = 40 + azR() * 380;
  const cx = Math.cos(a) * d, cy = Math.sin(a) * d * 1.25;
  const r = 38 + azR() * 54;
  return {
    c: [cx, cy],
    tri: [
      [0, -r],
      [r * 0.85, r * 0.65],
      [-r * 0.85, r * 0.55],
    ],
    dir: [Math.cos(a), Math.sin(a)],
    vel: 520 + azR() * 880,
    gira: (azR() - 0.5) * 9,
    col: azR() < 0.55 ? PAL.lavenderSoft : PAL.champagneLight,
  };
});

export function dibuja(g, t) {
  const uRompe = t - rompe;
  const entraMasc = entra(tr(t, Totra - 0.25, Totra + 0.12));

  fondoMundo(g, t, {
    cx: 540,
    cy: 1000,
    luz: 0.55,
    colorLuz: PAL.violetRgb,
    colorSec: PAL.champagneRgb,
  });

  // Rayos diagonales en el salón desde el fotograma 0
  k.rayos(g, t * 1.4, 1750, 0.75, 7, PAL.champagneLightRgb);

  const cx = 540, cy = 1020;
  const esc = k.mez(1.22, 1.0, entra(tr(t, 0, 1.1))) + 0.06 * su(tr(t, Tseg - 0.2, Tcre - 0.1));

  // El marco del espejo monumental
  g.save();
  g.translate(cx, cy);
  g.scale(esc, esc);

  const mw = 740, mh = 1040;
  g.save();
  g.shadowColor = "rgba(8,3,18,0.85)";
  g.shadowBlur = 70;
  g.shadowOffsetY = 30;
  redondo(g, -mw / 2 - 22, -mh / 2 - 22, mw + 44, mh + 44, 370);
  k.metal(g, -mw / 2 - 22, mw / 2 + 22, METAL_CHAMPAGNE);
  g.restore();

  // Interior del espejo
  g.save();
  redondo(g, -mw / 2, -mh / 2, mw, mh, 350);
  g.clip();
  const eg = g.createRadialGradient(0, -120, 40, 0, 0, 680);
  eg.addColorStop(0, PAL.aubergineSoft);
  eg.addColorStop(0.7, PAL.aubergine);
  eg.addColorStop(1, "#0d0618");
  g.fillStyle = eg;
  g.fillRect(-mw / 2, -mh / 2, mw, mh);

  // Tu núcleo vivo de esencia reflejado dentro del espejo desde el segundo 0
  const tapado = entraMasc * (uRompe < 0 ? 1 : Math.exp(-uRompe * 8));
  nucleoEsencia(g, 0, 0, mez(240, 185, tapado), t, {
    latido: 0.7 * k.pulso(t, 0.2, 0.3) + 0.7 * k.pulso(t, Tmos, 0.25) + 1.1 * k.pulso(t, rompe + 0.05, 0.25),
    al: 1 - 0.45 * tapado,
  });

  // Insignias de PNL y Pago en los primeros 5.5 segundos
  const salePnl = su(tr(t, Tmos - 0.3, Tmos + 0.2));
  if (salePnl < 0.99) {
    const aPnl = 1 - salePnl;
    const uPnl = entra(tr(t, 0.05, 0.45));
    placaCristal(g, 0, -290, 520, 110, "ESTUDIASTE PNL", "CERTIFICACIÓN", PAL.champagneRgb, uPnl * aPnl);
    const uPag = entra(tr(t, Tpag - 0.15, Tpag + 0.2));
    if (uPag > 0.01) {
      placaCristal(g, 0, 290, 560, 116, "YA TE PAGAN", "POR LO QUE SABES", PAL.champagneLightRgb, uPag * aPnl);
      k.fogonazo(g, 0, 290, t - Tpag, 800, PAL.champagneLightRgb);
    }
  }

  // En «otra mujer» baja la máscara rígida dentro del espejo
  if (entraMasc > 0.01 && uRompe < 0) {
    const grieta = su(tr(t, Tno - 0.1, Tcre - 0.02));
    const temblor = grieta * Math.sin(t * 55) * 6;
    mascaraFalsa(g, temblor, mez(-520, 0, entraMasc), 255, t, { al: entraMasc, grieta });
  }

  // Reflejo de cristal del espejo
  k.reflejo(g, -mw * 0.34, -mh * 0.4, 54, mh * 0.8, 0.22);
  g.restore();

  // Las 3 placas que se clavan sobre el marco del espejo
  if (uRompe < 0) {
    const p1 = entra(tr(t, Tseg - 0.16, Tseg + 0.18));
    if (p1 > 0.01) placaCristal(g, mez(-360, -160, p1), -310, 460, 108, "MÁS SEGURA", "POSE PERFECTA", PAL.lavenderRgb, p1);
    const p2 = entra(tr(t, Tpre - 0.16, Tpre + 0.18));
    if (p2 > 0.01) placaCristal(g, mez(360, 160, p2), 230, 500, 108, "MÁS PREPARADA", "MÁS TÍTULOS", PAL.violetLightRgb, p2);
    const p3 = entra(tr(t, Tnom - 0.12, Tbon + 0.12));
    if (p3 > 0.01) placaCristal(g, 0, mez(560, 390, p3), 600, 114, "«NOMBRE BONITO»", "MARCA DISEÑADA", PAL.champagneLightRgb, p3);
  }
  g.restore();

  // Estallido en «crees»
  if (uRompe >= 0 && uRompe < 0.85) {
    k.fogonazo(g, cx, cy, uRompe, 1500, PAL.champagneLightRgb);
    for (const tz of TROZOS) {
      const w = uRompe;
      const x = cx + tz.c[0] + tz.dir[0] * tz.vel * w;
      const y = cy + tz.c[1] + tz.dir[1] * tz.vel * w + 2000 * w * w;
      const al = Math.max(0, 1 - w * 1.45);
      if (al <= 0.01) continue;
      g.save();
      g.translate(x, y);
      g.rotate(tz.gira * w);
      g.globalAlpha = al;
      g.beginPath();
      g.moveTo(tz.tri[0][0], tz.tri[0][1]);
      g.lineTo(tz.tri[1][0], tz.tri[1][1]);
      g.lineTo(tz.tri[2][0], tz.tri[2][1]);
      g.closePath();
      g.fillStyle = tz.col;
      g.fill();
      g.strokeStyle = PAL.creamSoft;
      g.lineWidth = 2;
      g.stroke();
      g.restore();
    }
  }

  vineta(g, 0.55);
  velo(g, 0.68);
}
