// «Si estudiaste PNL y ya te pagan por lo que sabes, seguro sientes que para mostrarte tienes que ser otra mujer,
// más segura, más preparada, con un nombre bonito para lo que haces, y por eso mismo no te la crees ni tú.»
import * as k from "#kit";
import { v } from "#voz";
import { METAL_CHAMPAGNE, PAL, fondoMundo, mascaraFalsa, nucleoEsencia, placaCristal, velo, vineta } from "../mundo.js";

export const desde = 0;

const { suave: su, tramo: tr, mez, entra, sale, azar, proyecta, F, redondo } = k;
const f1 = v.frase(1), f2 = v.frase(2);

const Tpnl = f1.t("pnl"),
  Tpag = f1.t("pagan"),
  Tsab = f1.t("sabes"),
  Tmos = f1.t("mostrarte"),
  Totra = f1.t("otra");

const Tseg = f2.t("segura"),
  Tpre = f2.t("preparada"),
  Tnom = f2.t("nombre"),
  Tbon = f2.t("bonito"),
  Tno = f2.t("no"),
  Tcre = f2.t("crees");

export const rompe = Tcre + 0.02;
export const momentos = {
  pnl: Tpnl,
  pagan: Tpag,
  mostrarte: Tmos,
  mascara: Totra - 0.04,
  placas: [Tseg, Tpre, Tnom],
  grieta: Tno,
  rompe,
};

// ---------------------------------------------------------------- 1. Túnel de rayos + Cerebro 3D de PNL
const azT = azar(101);
const COLS_TUNEL = [PAL.champagneRgb, PAL.violetLightRgb, PAL.lavenderRgb, PAL.champagneLightRgb];
const RAYOS = Array.from({ length: 340 }, () => {
  const a = azT() * 6.2832, r = 1.1 + Math.pow(azT(), 0.65) * 8.5;
  return { x: Math.cos(a) * r, y: Math.sin(a) * r, z0: azT() * 55, c: COLS_TUNEL[Math.floor(azT() * 4)], w: 1.2 + azT() * 2.2 };
});

// Nube 3D del cerebro de PNL
const azC = azar(202), PUNTOS_PNL = [];
const pliegue = (x, y, z) => Math.sin(9 * x + 3 * Math.sin(5 * z + 1)) * Math.sin(8 * y + 2 * Math.sin(6 * x)) + 0.5 * Math.sin(13 * z + 4 * y);
while (PUNTOS_PNL.length < 7500) {
  const x = (azC() - 0.5) * 2.1, y = (azC() - 0.5) * 1.45, z = (azC() - 0.5) * 1.65;
  const e = (x / 1.0) ** 2 + (y / 0.72) ** 2 + (z / 0.82) ** 2;
  if (e > 1 || Math.abs(z) < 0.035 || y < (x < 0.35 && x > -0.75 ? -0.56 : -0.32)) continue;
  const sup = e > 0.76 || y < -0.26;
  if (!sup && azC() > 0.05) continue;
  if (sup && Math.abs(pliegue(x, y, z)) > 0.52) continue;
  PUNTOS_PNL.push({
    p: [x, y, z],
    b: 0.5 + azC() * 0.5,
    c: azC() < 0.62 ? PAL.champagneLightRgb : PAL.lavenderRgb,
  });
}

// ---------------------------------------------------------------- 2. Trozos de cristal para cuando revienta la máscara
const azR = azar(404);
const TROZOS = [];
const NX = 6, NY = 8, PW = 760, PH = 960;
const ptsGrid = [];
for (let j = 0; j <= NY; j++) {
  for (let i = 0; i <= NX; i++) {
    const b = i === 0 || j === 0 || i === NX || j === NY;
    ptsGrid.push([
      -PW / 2 + (i / NX) * PW + (b ? 0 : (azR() - 0.5) * (PW / NX) * 0.65),
      -PH / 2 + (j / NY) * PH + (b ? 0 : (azR() - 0.5) * (PH / NY) * 0.65),
    ]);
  }
}
const PG = (i, j) => ptsGrid[j * (NX + 1) + i];
for (let j = 0; j < NY; j++) {
  for (let i = 0; i < NX; i++) {
    const tris = [
      [PG(i, j), PG(i + 1, j), PG(i + 1, j + 1)],
      [PG(i, j), PG(i + 1, j + 1), PG(i, j + 1)],
    ];
    for (const tri of tris) {
      const c = [(tri[0][0] + tri[1][0] + tri[2][0]) / 3, (tri[0][1] + tri[1][1] + tri[2][1]) / 3];
      const d = Math.hypot(c[0], c[1]) || 1;
      TROZOS.push({
        tri: tri.map((p) => [p[0] - c[0], p[1] - c[1]]),
        c,
        dir: [c[0] / d, c[1] / d],
        vel: 550 + azR() * 880 + 380 * (1 - d / 750),
        gira: (azR() - 0.5) * 9,
        escV: 0.5 + azR() * 1.6,
        col: azR() < 0.5 ? PAL.lavenderSoft : PAL.lavender,
      });
    }
  }
}

// Tarjeta 3D de cristal y oro («ya te pagan por lo que sabes»)
function tarjetaPago(g, x, y, esc, giro, t, al) {
  if (al <= 0.005) return;
  g.save();
  g.translate(x, y);
  g.scale(esc * Math.cos(giro * 0.35), esc);
  g.rotate(Math.sin(giro) * 0.05);
  g.globalAlpha *= al;

  const w = 680, h = 360;
  g.save();
  g.shadowColor = "rgba(10,4,22,0.8)";
  g.shadowBlur = 55;
  g.shadowOffsetY = 24;
  redondo(g, -w / 2, -h / 2, w, h, 38);
  g.fillStyle = PAL.aubergineSoft;
  g.fill();
  g.restore();

  // Marco de metal champagne
  redondo(g, -w / 2, -h / 2, w, h, 38);
  k.metal(g, -w / 2, w / 2, METAL_CHAMPAGNE);

  // Interior berenjena profundo con cristal
  redondo(g, -w / 2 + 10, -h / 2 + 10, w - 20, h - 20, 30);
  const bg = g.createLinearGradient(-w / 2, -h / 2, w / 2, h / 2);
  bg.addColorStop(0, PAL.aubergine);
  bg.addColorStop(0.55, PAL.aubergineSoft);
  bg.addColorStop(1, PAL.violet);
  g.fillStyle = bg;
  g.fill();
  k.vidrio(g, -w / 2 + 10, w / 2 - 10, 0.35);

  // Sello dorado de validación a la izquierda
  const sx = -w / 2 + 125, sy = 0;
  k.brillo(g, sx, sy, 220, PAL.champagneRgb, 0.85);
  g.beginPath();
  g.arc(sx, sy, 68, 0, 6.2832);
  k.metal(g, sx - 68, sx + 68, METAL_CHAMPAGNE);
  g.strokeStyle = PAL.aubergine;
  g.lineWidth = 10;
  g.lineCap = "round";
  g.lineJoin = "round";
  g.beginPath();
  g.moveTo(sx - 28, sy + 2);
  g.lineTo(sx - 6, sy + 24);
  g.lineTo(sx + 32, sy - 20);
  g.stroke();

  // Texto claro y grande
  g.textAlign = "left";
  g.textBaseline = "middle";
  g.fillStyle = PAL.champagneLight;
  g.font = "800 34px Figtree";
  g.fillText("CERTIFICACIÓN PNL", -w / 2 + 225, -56);
  g.fillStyle = PAL.creamSoft;
  g.font = "800 58px Figtree";
  g.fillText("YA TE PAGAN", -w / 2 + 225, 10);
  g.fillStyle = PAL.lavender;
  g.font = "700 34px Figtree";
  g.fillText("por lo que sabes", -w / 2 + 225, 68);

  // Reflejo diagonal que cruza la tarjeta (recortado dentro de la tarjeta)
  g.save();
  redondo(g, -w / 2 + 10, -h / 2 + 10, w - 20, h - 20, 30);
  g.clip();
  const barrido = ((t * 1.1) % 2.2) - 0.6;
  k.reflejo(g, -w / 2 + barrido * w, -h / 2 + 20, 46, h - 40, 0.25);
  g.restore();
  g.restore();
}

export function dibuja(g, t) {
  const salePnl = su(tr(t, Tmos - 0.35, Tmos + 0.35));
  const entraMasc = entra(tr(t, Totra - 0.28, Totra + 0.12));
  const uRompe = t - rompe;

  // Fondo con luz que pasa de violeta/champagne a frío lavanda cuando baja la máscara, y vuelve a oro al romper
  const frio = entraMasc * (1 - su(tr(t, rompe, rompe + 0.35)));
  fondoMundo(g, t, {
    cx: 540,
    cy: 1020,
    luz: 0.52,
    colorLuz: k.mezRgb(PAL.violetRgb, PAL.lavenderRgb, frio * 0.5),
    colorSec: PAL.champagneRgb,
  });

  // --- TRAMO A (0.00 a 5.60 s): Viaje por el túnel + Cerebro 3D de PNL + Tarjeta de pago
  if (salePnl < 0.999) {
    const alPnl = 1 - salePnl;
    g.save();
    g.globalAlpha = alPnl;

    // Túnel de rayos en el primer segundo y medio (para el scroll desde el fotograma 0)
    const alTunel = 1 - su(tr(t, 0.9, 1.85));
    if (alTunel > 0.01) {
      g.save();
      g.globalCompositeOperation = "lighter";
      g.lineCap = "round";
      const d = 42 * t, d0 = 42 * Math.max(0, t - 1 / 30);
      for (const r of RAYOS) {
        const z = (((r.z0 - d) % 55) + 55) % 55 + 0.5, z0 = z + (d - d0) * 1.8;
        const x1 = 540 + (F * r.x) / z / 3, y1 = 980 + (F * r.y) / z / 3;
        const x0 = 540 + (F * r.x) / z0 / 3, y0 = 980 + (F * r.y) / z0 / 3;
        if (x1 < -160 || x1 > 1240 || y1 < -160 || y1 > 2080) continue;
        const a = alTunel * Math.min(1, 10 / z);
        g.strokeStyle = `rgba(${r.c},${a})`;
        g.lineWidth = r.w * Math.min(8, 12 / z) + 1;
        g.beginPath();
        g.moveTo(x0, y0);
        g.lineTo(x1, y1);
        g.stroke();
      }
      g.restore();
    }

    // Cámara 3D girando alrededor del cerebro de luz de PNL
    const dist = k.mez(3.4, 2.35, entra(tr(t, 0, 1.1))) + 0.45 * su(tr(t, Tpag - 0.2, Tpag + 0.5));
    const subY = su(tr(t, Tpag - 0.25, Tpag + 0.45)) * 0.42;
    const ang = -0.35 + t * 0.28;
    const cam = k.mira(k.orbita(ang, dist, subY, [0, 0, 0]), [0, subY * 0.7, 0]);

    const C0 = proyecta(cam, [0, 0, 0]);
    if (C0) {
      k.brillo(g, C0.x, C0.y, (F * 1.35) / C0.z, PAL.champagneRgb, 0.42 + 0.35 * k.pulso(t, Tpnl, 0.22));
    }

    g.save();
    g.globalCompositeOperation = "lighter";
    for (const q of PUNTOS_PNL) {
      const P = proyecta(cam, q.p);
      if (!P || P.x < 0 || P.x > 1080 || P.y < 0 || P.y > 1920) continue;
      const s = Math.max(2.2, Math.min(9.5, (F * 0.009) / P.z));
      const a = Math.min(1, 2.5 / P.z) * q.b;
      g.fillStyle = `rgba(${q.c},${a * 0.9})`;
      g.fillRect(P.x - s / 2, P.y - s / 2, s, s);
    }
    g.restore();

    // Etiqueta «PNL»
    const alEtPnl = su(tr(t, Tpnl - 0.18, Tpnl + 0.12)) * (1 - su(tr(t, Tpag - 0.1, Tpag + 0.25)));
    if (alEtPnl > 0.01 && C0) {
      k.pastilla(g, 540, C0.y + 340, "PNL", "", PAL.champagneLightRgb, alEtPnl, 108);
    }

    // Tarjeta 3D «YA TE PAGAN POR LO QUE SABES»
    const uTar = entra(tr(t, Tpag - 0.18, Tpag + 0.25));
    if (uTar > 0.01) {
      const ty = mez(1520, 1210, uTar);
      tarjetaPago(g, 540, ty, mez(0.65, 1, uTar), (t - Tpag) * 1.4, t, uTar);
      k.fogonazo(g, 540, ty, t - Tpag, 950, PAL.champagneLightRgb);
    }
    g.restore();
  }

  // --- TRAMO B (desde «mostrarte» 5.10 s hasta 15.00 s): Tu esencia viva encerrada por «otra mujer» y las 3 placas
  const entraEscena = su(tr(t, Tmos - 0.45, Tmos + 0.15));
  if (entraEscena > 0.01) {
    g.save();
    g.globalAlpha = entraEscena;

    const zoomCam = 1 + 0.08 * su(tr(t, Tseg - 0.2, Tcre - 0.1)) - 0.05 * su(tr(t, rompe, rompe + 0.5));
    const cx = 540, cy = 1020;

    // 1. Tu núcleo de Esencia real (al principio libre en «mostrarte», luego tapado por la máscara, y libre al romper)
    const tapado = entraMasc * (uRompe < 0 ? 1 : Math.exp(-uRompe * 8));
    const latido =
      0.65 * k.pulso(t, Tmos + 0.1, 0.25) +
      0.5 * k.pulso(t, Tno + 0.05, 0.2) +
      1.1 * k.pulso(t, rompe + 0.06, 0.28);
    const radioNucleo = mez(250, 190, tapado) * zoomCam;
    nucleoEsencia(g, cx, cy, radioNucleo, t, {
      latido,
      al: 1 - 0.45 * tapado,
    });

    // 2. La coraza facetada («otra mujer») y sus tres placas («más segura», «más preparada», «nombre bonito»)
    if (entraMasc > 0.005 && uRompe < 0) {
      const yMasc = mez(320, cy, entraMasc);
      const rMasc = 265 * zoomCam;
      const aprieta = su(tr(t, Tbon + 0.1, Tno - 0.05));
      const grieta = su(tr(t, Tno - 0.65, Tcre - 0.02));
      const temblor = grieta * Math.sin(t * 58) * 7;

      // Haces de luz dorada que intentan escapar de la coraza entre «haces» y «crees»
      if (aprieta > 0.05) {
        g.save();
        g.translate(cx + temblor, yMasc);
        g.globalCompositeOperation = "lighter";
        for (let i = 0; i < 8; i++) {
          const a = i * 0.785 + t * 0.9, L = (340 + 240 * grieta) * aprieta;
          const gr = g.createLinearGradient(0, 0, Math.cos(a) * L, Math.sin(a) * L);
          gr.addColorStop(0, `rgba(${PAL.champagneLightRgb},${0.55 * aprieta})`);
          gr.addColorStop(1, `rgba(${PAL.champagneRgb},0)`);
          g.strokeStyle = gr;
          g.lineWidth = 18 + 16 * grieta;
          g.beginPath();
          g.moveTo(0, 0);
          g.lineTo(Math.cos(a) * L, Math.sin(a) * L);
          g.stroke();
        }
        g.restore();
      }

      mascaraFalsa(g, cx + temblor, yMasc, rMasc, t, {
        al: Math.min(1, entraMasc * 1.4),
        cierre: aprieta,
        grieta,
      });

      // Choque al bajar la máscara en «otra»
      k.fogonazo(g, cx, cy, t - (Totra - 0.02), 1150, PAL.lavenderRgb);

      // Etiqueta «OTRA MUJER» sobre la frente antes de las tres placas
      const alOtra = su(tr(t, Totra - 0.05, Totra + 0.18)) * (1 - su(tr(t, Tseg - 0.15, Tseg + 0.1)));
      if (alOtra > 0.01) {
        k.etiqueta(g, cx - 190, cy - 410, "«OTRA MUJER»", PAL.lavenderRgb, alOtra, 52);
      }

      // Las 3 placas que llegan, frenan y se quedan sumándose
      const p1 = entra(tr(t, Tseg - 0.16, Tseg + 0.18));
      if (p1 > 0.01) {
        const px = mez(120, 330, p1) + temblor, py = cy - 330;
        placaCristal(g, px, py, 480, 112, "MÁS SEGURA", "POSE PERFECTA", PAL.lavenderRgb, p1);
        k.brillo(g, px, py, 420, PAL.lavenderRgb, 0.55 * k.pulso(t, Tseg + 0.04, 0.12));
      }

      const p2 = entra(tr(t, Tpre - 0.16, Tpre + 0.18));
      if (p2 > 0.01) {
        const px = mez(960, 730, p2) + temblor, py = cy + 250;
        placaCristal(g, px, py, 520, 112, "MÁS PREPARADA", "MÁS TÍTULOS", PAL.violetLightRgb, p2);
        k.brillo(g, px, py, 420, PAL.violetLightRgb, 0.55 * k.pulso(t, Tpre + 0.04, 0.12));
      }

      const p3 = entra(tr(t, Tnom - 0.12, Tbon + 0.12));
      if (p3 > 0.01) {
        const px = cx + temblor, py = mez(1580, cy + 410, p3);
        placaCristal(g, px, py, 640, 120, "«NOMBRE BONITO»", "MARCA DISEÑADA", PAL.champagneLightRgb, p3);
        k.brillo(g, px, py, 500, PAL.champagneLightRgb, 0.65 * k.pulso(t, Tbon + 0.04, 0.14));
      }

      // Destello cuando empieza a agrietarse en «no»
      k.brillo(g, cx, cy, 700, PAL.champagneRgb, 0.7 * k.pulso(t, Tno + 0.04, 0.12));
    }

    // 3. El estallido en «crees» (13.78 s): la máscara y las placas revientan en cristales
    if (uRompe >= 0 && uRompe < 0.85) {
      k.fogonazo(g, cx, cy, uRompe, 1450, PAL.champagneLightRgb);
      k.brillo(g, cx, cy, 2200, PAL.champagneRgb, 1.15 * Math.exp(-uRompe * 6.5));

      for (const tz of TROZOS) {
        const w = uRompe;
        const s = 1 + tz.escV * w * 1.4;
        const x = cx + tz.c[0] * s + tz.dir[0] * tz.vel * w;
        const y = cy + tz.c[1] * s + tz.dir[1] * tz.vel * w + 2100 * w * w;
        const al = Math.max(0, 1 - w * 1.45);
        if (al <= 0.01) continue;

        g.save();
        g.translate(x, y);
        g.rotate(tz.gira * w);
        g.scale(s, s);
        g.globalAlpha = al;
        g.beginPath();
        g.moveTo(tz.tri[0][0], tz.tri[0][1]);
        g.lineTo(tz.tri[1][0], tz.tri[1][1]);
        g.lineTo(tz.tri[2][0], tz.tri[2][1]);
        g.closePath();
        g.fillStyle = tz.col;
        g.fill();
        g.strokeStyle = PAL.creamSoft;
        g.lineWidth = 2.5 / s;
        g.stroke();
        g.restore();
      }
    }
    g.restore();
  }

  // Fogonazo inicial en el fotograma 0 para impacto inmediato
  k.brillo(g, 540, 980, 1600, PAL.champagneLightRgb, 0.6 * Math.exp(-t * 5));

  vineta(g, 0.55);
  velo(g, 0.68);
}
