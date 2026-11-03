// «Te lo digo porque a mí me pasó: yo sentía que mi brillo era demasiado para otras personas, que si me mostraba en
// redes sociales, mi familia se iba a burlar de mí, pero resulta que esa herida es desde donde hoy conecto con mujeres
// como tú.»
import * as k from "#kit";
import { v } from "#voz";
import {
  METAL_LAVANDA,
  PAL,
  PALETA_CONEXION,
  PALETA_VIOLETA,
  fondoMundo,
  nucleoEsencia,
  pilotoVivo,
  velo,
  vineta,
} from "../mundo.js";

export const desde = (vz) => vz.frase(5).inicio;

const { suave: su, tramo: tr, mez, entra, redondo } = k;
const f5 = v.frase(5), f6 = v.frase(6);

const T0 = f5.inicio,
  Tpas = f5.t("paso"),
  Tbri = f5.t("brillo"),
  Tdem = f5.t("demasiado"),
  Tper = f5.t("personas"),
  Tmos = f5.t("mostraba"),
  Tred = f5.t("redes"),
  Tfam = f5.t("familia"),
  Tbur = f5.t("burlar"),
  Tmi = f5.t("mi", 4);

const Ther = f6.t("herida"),
  Tdon = f6.t("donde"),
  Tcon = f6.t("conecto"),
  Tmuj = f6.t("mujeres"),
  Ttu = f6.t("tu");

export const momentos = {
  brillo: Tbri,
  demasiado: Tdem,
  redes: Tred,
  burla1: Tfam + 0.1,
  burla2: Tbur,
  herida: Ther,
  conecto: Tcon,
  mujeres: Tmuj,
  tu: Ttu,
};

// Constelación de 6 esferas («mujeres como tú») alrededor del núcleo central
const MUJERES = [
  { x: 210, y: 690, r: 78, pal: PALETA_CONEXION, retraso: 0.0 },
  { x: 870, y: 690, r: 78, pal: PALETA_VIOLETA, retraso: 0.08 },
  { x: 165, y: 1030, r: 84, pal: PALETA_VIOLETA, retraso: 0.16 },
  { x: 915, y: 1030, r: 84, pal: PALETA_CONEXION, retraso: 0.24 },
  { x: 260, y: 1360, r: 80, pal: PALETA_CONEXION, retraso: 0.32 },
  { x: 820, y: 1360, r: 80, pal: PALETA_VIOLETA, retraso: 0.4 },
];

// Siluetas a contraluz que se apartan cuando el brillo es «demasiado»
function siluetasPersonas(g, t, uDemasiado, al) {
  if (al <= 0.01) return;
  g.save();
  g.globalAlpha *= al;
  const xs = [130, 290, 790, 950];
  for (let i = 0; i < xs.length; i++) {
    const lado = i < 2 ? -1 : 1;
    const x = xs[i] + lado * uDemasiado * 55;
    const y = 1480;
    const inclina = lado * uDemasiado * 0.22;
    g.save();
    g.translate(x, y);
    g.rotate(inclina);

    // Cuerpo oscuro berenjena con borde de luz champagne del brillo central
    g.fillStyle = "#120920";
    g.strokeStyle = `rgba(${PAL.champagneLightRgb},${0.4 + 0.45 * uDemasiado})`;
    g.lineWidth = 4;

    // Cabeza
    g.beginPath();
    g.arc(0, -250, 42, 0, 6.2832);
    g.fill();
    g.stroke();

    // Torso
    redondo(g, -54, -195, 108, 220, 44);
    g.fill();
    g.stroke();

    // Brazo levantado tapándose del brillo
    if (uDemasiado > 0.05) {
      g.lineWidth = 22;
      g.lineCap = "round";
      g.strokeStyle = "#120920";
      g.beginPath();
      g.moveTo(-lado * 30, -150);
      g.lineTo(-lado * 68, -240 * uDemasiado - 120 * (1 - uDemasiado));
      g.stroke();
    }
    g.restore();
  }
  g.restore();
}

// Dardo/bocadillo afilado de burla («mi familia se iba a burlar de mí»)
function dardoBurla(g, x, y, ang, texto, u, al, apuntaDer = true) {
  if (al <= 0.01 || u <= 0.01) return;
  g.save();
  g.translate(x, y);
  g.rotate(ang);
  g.globalAlpha *= al;

  const w = 310, h = 92, dir = apuntaDer ? 1 : -1;
  g.save();
  g.shadowColor = "rgba(8,3,18,0.85)";
  g.shadowBlur = 28;
  g.beginPath();
  if (apuntaDer) {
    g.moveTo(w / 2 + 45, 0);
    g.lineTo(w / 2, -h / 2);
    g.lineTo(-w / 2, -h / 2);
    g.lineTo(-w / 2, h / 2);
    g.lineTo(w / 2, h / 2);
  } else {
    g.moveTo(-w / 2 - 45, 0);
    g.lineTo(-w / 2, -h / 2);
    g.lineTo(w / 2, -h / 2);
    g.lineTo(w / 2, h / 2);
    g.lineTo(-w / 2, h / 2);
  }
  g.closePath();
  g.fillStyle = PAL.aubergine;
  g.fill();
  g.restore();

  g.strokeStyle = PAL.lavender;
  g.lineWidth = 3.5;
  g.stroke();

  g.fillStyle = PAL.lavenderSoft;
  g.font = "800 32px Figtree";
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.fillText(texto, -dir * 6, 2);
  g.restore();
}

export function dibuja(g, t) {
  const uBrillo = 0.45 + 0.55 * su(tr(t, Tbri - 0.3, Tdem + 0.35));
  const uMovil = su(tr(t, Tmos - 0.15, Tred + 0.25)) * (1 - su(tr(t, Ther - 0.45, Ther + 0.05)));
  const uImpacto = su(tr(t, Tbur - 0.1, Tmi + 0.15));
  const uOro = su(tr(t, Ther - 0.05, Tdon + 0.25));
  const uConecto = su(tr(t, Tcon - 0.2, Tmuj + 0.35));

  // Fondo cálido dorado desde el fotograma 0 para que el sitio se sienta distinto desde el corte
  fondoMundo(g, t, {
    cx: 540,
    cy: 920,
    luz: 0.65 * (1 - 0.45 * uImpacto) + 0.3 * uOro,
    colorLuz: PAL.champagneRgb,
    colorSec: PAL.violetRgb,
  });

  // Suelo oscuro en la parte inferior del salón (presente desde el fotograma 0 mientras están las siluetas)
  const alPersonas = 1 - su(tr(t, Tmos - 0.15, Tred + 0.15));
  if (alPersonas > 0.01) {
    g.save();
    g.globalAlpha = alPersonas;
    const sg = g.createLinearGradient(0, 1340, 0, 1920);
    sg.addColorStop(0, "rgba(18,9,32,0)");
    sg.addColorStop(0.25, "rgba(18,9,32,0.88)");
    sg.addColorStop(1, "#0a0414");
    g.fillStyle = sg;
    g.fillRect(0, 1340, 1080, 580);
    g.restore();
  }

  const cx = 540, cy = 920;

  // 1. Rayos de luz intensos ya encendidos desde el fotograma 0 y creciendo en «mi brillo era demasiado»
  const alRayos = uBrillo * (1 - su(tr(t, Tmos - 0.1, Tred + 0.2)));
  if (alRayos > 0.01) {
    g.save();
    g.translate(cx, cy);
    g.globalCompositeOperation = "lighter";
    for (let i = 0; i < 14; i++) {
      const a = (i / 14) * 6.2832 + t * 0.45;
      const L = 460 + 340 * uBrillo;
      const gr = g.createLinearGradient(0, 0, Math.cos(a) * L, Math.sin(a) * L);
      gr.addColorStop(0, `rgba(${PAL.champagneLightRgb},${0.58 * alRayos})`);
      gr.addColorStop(1, `rgba(${PAL.champagneRgb},0)`);
      g.fillStyle = gr;
      g.beginPath();
      g.moveTo(0, 0);
      g.lineTo(Math.cos(a - 0.065) * L, Math.sin(a - 0.065) * L);
      g.lineTo(Math.cos(a + 0.065) * L, Math.sin(a + 0.065) * L);
      g.closePath();
      g.fill();
    }
    g.restore();
  }

  // Siluetas de «otras personas» ya presentes desde el fotograma 0 (26.80 s)
  siluetasPersonas(g, t, su(tr(t, Tbri - 0.1, Tper + 0.2)), alPersonas);

  // 2. El marco 3D del celular («si me mostraba en redes sociales, mi familia se iba a burlar de mí»)
  if (uMovil > 0.01) {
    g.save();
    g.translate(cx, cy + 30);
    const escM = mez(1.25, 1.0, uMovil);
    g.scale(escM, escM);
    g.globalAlpha = uMovil;

    const W = 620, H = 1180;
    g.save();
    g.shadowColor = "rgba(8,3,18,0.85)";
    g.shadowBlur = 70;
    g.shadowOffsetY = 34;
    redondo(g, -W / 2, -H / 2, W, H, 84);
    k.metal(g, -W / 2, W / 2, METAL_LAVANDA);
    g.restore();

    // Pantalla interior del celular
    const sw = W - 36, sh = H - 36;
    redondo(g, -sw / 2, -sh / 2, sw, sh, 68);
    g.fillStyle = "rgba(20,10,36,0.92)";
    g.fill();
    k.vidrio(g, -sw / 2, sw / 2, 0.45);

    // Barra superior «REDES SOCIALES»
    pilotoVivo(g, 0, -sh / 2 + 86, 20, 1, "REDES SOCIALES", uMovil);
    g.restore();
  }

  // 3. Puentes de luz dorada en «desde donde hoy conecto con mujeres como tú»
  if (uConecto > 0.01) {
    for (let i = 0; i < MUJERES.length; i++) {
      const m = MUJERES[i];
      const uM = entra(tr(t, Tcon - 0.1 + m.retraso, Tcon + 0.45 + m.retraso));
      if (uM <= 0.01) continue;

      const mx = mez(cx, m.x, uM), my = mez(cy, m.y, uM);

      // Puente de luz que sale directamente de la herida dorada central
      g.save();
      g.globalCompositeOperation = "lighter";
      const pg = g.createLinearGradient(cx, cy, mx, my);
      pg.addColorStop(0, `rgba(${PAL.creamSoftRgb},${0.9 * uM})`);
      pg.addColorStop(0.5, `rgba(${PAL.champagneRgb},${0.75 * uM})`);
      pg.addColorStop(1, `rgba(${PAL.lavenderRgb},${0.65 * uM})`);
      g.strokeStyle = pg;
      g.lineWidth = 18 * uM;
      g.lineCap = "round";
      g.beginPath();
      g.moveTo(cx, cy);
      g.lineTo(mx, my);
      g.stroke();

      g.strokeStyle = `rgba(${PAL.creamSoftRgb},${0.95 * uM})`;
      g.lineWidth = 5 * uM;
      g.stroke();
      g.restore();

      // Esfera luminosa de cada mujer conectada
      const latM = 0.6 * k.pulso(t, Ttu + 0.05, 0.25);
      k.brillo(g, mx, my, m.r * 3.4, PAL.champagneRgb, (0.55 + 0.35 * latM) * uM);
      k.estrellaTransparente(g, m.pal, mx, my, m.r * (1 + 0.08 * latM), t * 0.4 + i, 0.35 + latM, uM);
    }
  }

  // 4. El núcleo central de tu Esencia (crece en «brillo», se agrieta en «burlar», se baña de oro en «herida»)
  const rBase = mez(205, 275, uBrillo * (1 - uMovil * 0.45)) * mez(1, 0.78, uImpacto * (1 - uOro)) * mez(1, 0.85, uConecto);
  const sacudida =
    (k.pulso(t, Tfam + 0.15, 0.08) + k.pulso(t, Tbur + 0.04, 0.09) + k.pulso(t, Tmi + 0.04, 0.09)) *
    Math.sin(t * 70) *
    14;
  const latNucleo =
    0.8 * k.pulso(t, Tbri + 0.05, 0.22) +
    0.9 * k.pulso(t, Ther + 0.06, 0.24) +
    0.85 * k.pulso(t, Tcon + 0.06, 0.24) +
    0.9 * k.pulso(t, Ttu + 0.06, 0.28);

  nucleoEsencia(g, cx + sacudida, cy, rBase, t, {
    latido: latNucleo,
    grieta: su(tr(t, Tbur - 0.12, Tmi + 0.1)),
    oroGrieta: uOro,
    al: 1 - 0.25 * uImpacto * (1 - uOro),
  });

  // Fogonazos de cada momento fuerte
  k.fogonazo(g, cx, cy, t - Tbri, 1250, PAL.champagneLightRgb);
  k.fogonazo(g, cx, cy, t - Tbur, 950, PAL.lavenderRgb);
  k.fogonazo(g, cx, cy, t - Ther, 1350, PAL.champagneRgb);
  k.fogonazo(g, cx, cy, t - Tcon, 1450, PAL.champagneLightRgb);

  // 5. Dardos de burla («mi familia se iba a burlar de mí», 33.9 a 36.4 s)
  const alBurlas = 1 - su(tr(t, Ther - 0.25, Ther + 0.1));
  if (alBurlas > 0.01) {
    const b1 = entra(tr(t, Tfam - 0.05, Tfam + 0.25));
    if (b1 > 0.01) {
      dardoBurla(g, mez(110, 235, b1), cy - 230, 0.25, "«¿QUIÉN SE CREE?»", b1, alBurlas, true);
    }
    const b2 = entra(tr(t, Tbur - 0.12, Tbur + 0.18));
    if (b2 > 0.01) {
      dardoBurla(g, mez(970, 845, b2), cy - 150, -0.22, "«SE BURLAN»", b2, alBurlas, false);
    }
    const b3 = entra(tr(t, Tmi - 0.15, Tmi + 0.15));
    if (b3 > 0.01) {
      dardoBurla(g, mez(120, 245, b3), cy + 230, -0.25, "«JAJAJA»", b3, alBurlas, true);
    }
  }

  // Etiquetas de apoyo visual
  const alDem = su(tr(t, Tdem - 0.1, Tdem + 0.15)) * (1 - su(tr(t, Tmos - 0.2, Tmos + 0.05)));
  if (alDem > 0.01) {
    k.pastilla(g, 540, 1340, "«DEMASIADO BRILLO»", "", PAL.champagneLightRgb, alDem, 64);
  }
  const alHer = su(tr(t, Ther - 0.05, Ther + 0.18)) * (1 - su(tr(t, Tcon - 0.2, Tcon + 0.05)));
  if (alHer > 0.01) {
    k.pastilla(g, 540, 1340, "ESA HERIDA", "", PAL.champagneRgb, alHer, 78);
  }
  const alCon = su(tr(t, Tcon - 0.05, Tcon + 0.22));
  if (alCon > 0.01) {
    k.pastilla(g, 540, 1560, "CONECTO CONTIGO", "", PAL.champagneLightRgb, alCon, 68);
  }

  vineta(g, 0.55);
  velo(g, 0.68);
}
