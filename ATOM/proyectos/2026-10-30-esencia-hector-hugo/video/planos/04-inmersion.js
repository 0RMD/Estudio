// «Eso es lo que hacemos en mi inmersión, dos días en vivo donde empezamos por tu esencia, para que lo que comuniques
// salga de lo que viviste y no de lo que crees que deberías ser.»
import * as k from "#kit";
import { v } from "#voz";
import {
  METAL_CHAMPAGNE,
  PAL,
  PALETA_CONEXION,
  fondoMundo,
  mascaraFalsa,
  nucleoEsencia,
  pilotoVivo,
  placaCristal,
  velo,
  vineta,
} from "../mundo.js";

export const desde = (vz) => vz.frase(7).inicio;

const { suave: su, tramo: tr, mez, entra, redondo } = k;
const f7 = v.frase(7);

const T0 = f7.inicio,
  Tinm = f7.t("inmersion"),
  Tdos = f7.t("dos"),
  Tdias = f7.t("dias"),
  Tviv = f7.t("vivo"),
  Temp = f7.t("empezamos"),
  Tese = f7.t("esencia"),
  Tcom = f7.t("comuniques"),
  Tsal = f7.t("salga"),
  Tviv2 = f7.t("viviste"),
  Tno = f7.t("no"),
  Tcre = f7.t("crees"),
  Tdeb = f7.t("deberias"),
  Tser = f7.t("ser");

export const momentos = {
  inmersion: Tinm,
  dosDias: Tdos,
  enVivo: Tviv,
  esencia: Tese,
  comuniques: Tcom,
  viviste: Tviv2,
  deberias: Tdeb,
};

// Dibuja un portal/columna 3D para DÍA 1 y DÍA 2
function portalDia(g, x, y, w, h, titulo, sub, u, al) {
  if (al <= 0.01 || u <= 0.01) return;
  g.save();
  g.translate(x, y);
  g.globalAlpha *= al * u;

  g.save();
  g.shadowColor = "rgba(8,3,18,0.85)";
  g.shadowBlur = 45;
  g.shadowOffsetY = 20;
  redondo(g, -w / 2, -h / 2, w, h, 34);
  k.metal(g, -w / 2, w / 2, METAL_CHAMPAGNE);
  g.restore();

  redondo(g, -w / 2 + 8, -h / 2 + 8, w - 16, h - 16, 28);
  const pg = g.createLinearGradient(0, -h / 2, 0, h / 2);
  pg.addColorStop(0, PAL.violet);
  pg.addColorStop(0.5, PAL.aubergineSoft);
  pg.addColorStop(1, PAL.aubergine);
  g.fillStyle = pg;
  g.fill();
  k.vidrio(g, -w / 2 + 8, w / 2 - 8, 0.5);

  g.textAlign = "center";
  g.textBaseline = "middle";
  g.fillStyle = PAL.champagneLight;
  g.font = "800 34px Figtree";
  g.fillText(sub, 0, -28);
  g.fillStyle = PAL.creamSoft;
  g.font = "800 56px Figtree";
  g.fillText(titulo, 0, 26);
  g.restore();
}

export function dibuja(g, t) {
  const uDos = entra(tr(t, Tdos - 0.18, Tdias + 0.2));
  const uVivo = su(tr(t, Tviv - 0.15, Tviv + 0.2));
  const uEse = entra(tr(t, Temp - 0.15, Tese + 0.2));
  const uCom = su(tr(t, Tcom - 0.2, Tsal + 0.25));
  const uViviste = su(tr(t, Tviv2 - 0.25, Tviv2 + 0.25));
  const uNo = su(tr(t, Tno - 0.1, Tdeb + 0.15));
  const uApagaFalso = su(tr(t, Tdeb, Tser + 0.25));

  fondoMundo(g, t, {
    cx: 540,
    cy: 1000,
    luz: 0.52 + 0.2 * uEse,
    colorLuz: PAL.violetRgb,
    colorSec: PAL.champagneRgb,
  });

  // Haces de escenario en vivo
  k.rayos(g, t * 0.9, 1750, 0.65, 6, PAL.champagneLightRgb);

  // Suelo del anfiteatro 3D de la inmersión (anillos elípticos luminosos en perspectiva)
  const sy = 1360;
  g.save();
  g.globalCompositeOperation = "lighter";
  for (let i = 1; i <= 4; i++) {
    const rx = i * 195, ry = i * 52;
    const pulsoAro = 0.25 + 0.2 * Math.sin(t * 2.5 - i * 0.8);
    g.strokeStyle = `rgba(${i % 2 ? PAL.champagneRgb : PAL.lavenderRgb},${pulsoAro})`;
    g.lineWidth = 4;
    g.beginPath();
    g.ellipse(540, sy, rx, ry, 0, 0, 6.2832);
    g.stroke();
  }
  g.restore();

  // Indicador superior «INMERSIÓN · EN VIVO» desde el primer fotograma del plano
  const luzPiloto = 0.65 + 0.35 * Math.sin(t * 7);
  pilotoVivo(g, 540, 585, 24, uVivo > 0.05 ? luzPiloto : 0.55, "INMERSIÓN EN VIVO", 1);

  // Portales «DÍA 1» y «DÍA 2» (ya presentes en el escenario al entrar, se encienden en «dos días» y salen antes de «comuniques»)
  const alPortales = 1 - su(tr(t, Tcom - 0.35, Tcom + 0.05));
  if (alPortales > 0.01) {
    const sep = mez(225, 310, uEse);
    const py = mez(890, 820, uEse);
    const escP = 0.88 + 0.12 * uDos;
    portalDia(g, 540 - sep, py, 270 * escP, 190 * escP, "DÍA 1", "INMERSIÓN", 0.55 + 0.45 * uDos, alPortales);
    portalDia(g, 540 + sep, py, 270 * escP, 190 * escP, "DÍA 2", "EN VIVO", 0.55 + 0.45 * uDos, alPortales);
    k.fogonazo(g, 540, py, t - Tdos, 1100, PAL.champagneLightRgb);
  }

  // Posición del núcleo de tu Esencia (ya grande desde el fotograma 0 en el centro del anfiteatro)
  const nx = mez(540, 310, uNo), ny = mez(1130, 1060, uCom);
  const nr = mez(195, 160, uNo);

  // Haz de comunicación que sube desde tu Esencia y lo que viviste («para que lo que comuniques salga de lo que viviste»)
  if (uCom > 0.01) {
    const hTop = mez(ny, 670, uCom);
    k.haz(g, nx, ny, hTop, PAL.champagneLightRgb, 0.85 * uCom, 74, true);

    // Ondas de comunicación doradas que salen hacia arriba
    g.save();
    g.globalCompositeOperation = "lighter";
    for (let i = 0; i < 4; i++) {
      const fase = ((t * 1.3 + i * 0.25) % 1);
      const wy = mez(ny - 120, 690, fase);
      const wr = mez(70, 240, fase);
      const wa = Math.sin(fase * Math.PI) * 0.85 * uCom;
      g.strokeStyle = `rgba(${PAL.creamSoftRgb},${wa})`;
      g.lineWidth = 6;
      g.beginPath();
      g.arc(nx, wy, wr, -Math.PI * 0.8, -Math.PI * 0.2);
      g.stroke();
    }
    g.restore();
  }

  // Las 3 raíces luminosas de «lo que viviste» alimentando el núcleo desde abajo
  if (uViviste > 0.01) {
    const raices = [-120, 0, 120];
    for (let i = 0; i < 3; i++) {
      const rx = nx + raices[i], ry = ny + 220;
      g.save();
      g.globalCompositeOperation = "lighter";
      g.strokeStyle = `rgba(${PAL.champagneRgb},${0.75 * uViviste})`;
      g.lineWidth = 8;
      g.beginPath();
      g.moveTo(rx, ry);
      g.lineTo(nx, ny);
      g.stroke();
      g.restore();
      k.estrellaTransparente(g, PALETA_CONEXION, rx, ry, 42 * uViviste, t * 0.6 + i, 0.4, uViviste);
    }
    k.etiqueta(g, nx - 175, ny + 280, "LO QUE VIVISTE", PAL.champagneLightRgb, uViviste, 42);
  }

  // El núcleo vivo de tu Esencia (presente desde el fotograma 0 y crece en «tu esencia»)
  const latidoEse =
    0.7 * k.pulso(t, Tinm + 0.05, 0.22) +
    0.85 * k.pulso(t, Tese + 0.05, 0.24) +
    0.7 * k.pulso(t, Tcom + 0.05, 0.22) +
    0.8 * k.pulso(t, Tviv2 + 0.05, 0.24);
  nucleoEsencia(g, nx, ny, nr * (0.82 + 0.18 * uEse), t, {
    latido: latidoEse,
    grieta: 1,
    oroGrieta: 1,
    al: 1,
  });
  k.fogonazo(g, nx, ny, t - Tese, 1300, PAL.champagneRgb);

  const alEtEse = uEse * (1 - uCom);
  if (alEtEse > 0.01) {
    k.pastilla(g, nx, ny + 250, "TU ESENCIA", "", PAL.champagneLightRgb, alEtEse, 74);
  }

  // A la derecha, en «y no de lo que crees que deberías ser» (48.80 a 50.88 s): el molde frío que se tacha y se apaga
  if (uNo > 0.01) {
    const fx = 790, fy = 1060 + uApagaFalso * 75;
    const alFalso = uNo * (1 - 0.65 * uApagaFalso);
    mascaraFalsa(g, fx, fy, 145 * (1 - 0.15 * uApagaFalso), t, {
      al: alFalso,
      cierre: 1,
      grieta: uApagaFalso,
    });

    // Aspa sobre «DEBERÍAS SER»
    if (uApagaFalso > 0.05) {
      g.save();
      g.translate(fx, fy);
      g.strokeStyle = PAL.champagne;
      g.lineWidth = 12;
      g.lineCap = "round";
      const d = 110 * uApagaFalso;
      g.beginPath();
      g.moveTo(-d, -d);
      g.lineTo(d, d);
      g.moveTo(d, -d);
      g.lineTo(-d, d);
      g.stroke();
      g.restore();
    }
    k.etiqueta(g, fx - 165, fy + 210, "«DEBERÍAS SER»", PAL.lavenderRgb, uNo, 40);
  }

  vineta(g, 0.55);
  velo(g, 0.68);
}
