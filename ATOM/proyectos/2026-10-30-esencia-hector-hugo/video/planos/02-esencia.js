// «Tu esencia no se diseña, se descubre, y se descubre en tres lugares: las heridas que te formaron, los momentos que
// te transformaron y las verdades que hoy defiendes.»
import * as k from "#kit";
import { v } from "#voz";
import {
  METAL_CHAMPAGNE,
  METAL_LAVANDA,
  PAL,
  PALETA_CONEXION,
  fondoMundo,
  nucleoEsencia,
  velo,
  vineta,
} from "../mundo.js";

export const desde = (vz) => vz.frase(3).inicio;

const { suave: su, tramo: tr, mez, entra, redondo } = k;
const f3 = v.frase(3), f4 = v.frase(4);

const T0 = f3.inicio,
  Tese = f3.t("esencia"),
  Tno = f3.t("no"),
  Tdis = f3.t("disena"),
  Tdes = f3.t("descubre");

const Ttres = f4.t("tres"),
  Tlug = f4.t("lugares"),
  Ther = f4.t("heridas"),
  Tfor = f4.t("formaron"),
  Tmom = f4.t("momentos"),
  Ttra = f4.t("transformaron"),
  Tver = f4.t("verdades"),
  Tdef = f4.t("defiendes"),
  Fin = f4.fin;

export const momentos = {
  disena: Tdis,
  descubre: Tdes,
  tres: Ttres,
  heridas: Ther,
  formaron: Tfor,
  momentos: Tmom,
  transformaron: Ttra,
  verdades: Tver,
  defiendes: Tdef,
};

// Dibuja un brazo de compás técnico en la mesa de diseño
function compas(g, x, y, ang, esc, al) {
  if (al <= 0.01) return;
  g.save();
  g.translate(x, y);
  g.rotate(ang);
  g.scale(esc, esc);
  g.globalAlpha *= al;

  // Brazo izquierdo y derecho
  for (const lado of [-1, 1]) {
    g.save();
    g.rotate(lado * 0.24);
    g.beginPath();
    g.moveTo(-16, 0);
    g.lineTo(16, 0);
    g.lineTo(6, 380);
    g.lineTo(-6, 380);
    g.closePath();
    k.metal(g, -16, 16, METAL_LAVANDA);
    g.restore();
  }
  // Cabezal del compás
  g.beginPath();
  g.arc(0, 0, 34, 0, 6.2832);
  k.metal(g, -34, 34, METAL_CHAMPAGNE);
  g.restore();
}

// Lugar 1: Esfera de roca agrietada cuyas heridas se llenan de oro kintsugi («las heridas que te formaron»)
function lugarHeridas(g, x, y, r, t, uKintsugi, al) {
  if (al <= 0.01) return;
  g.save();
  g.globalAlpha *= al;

  if (uKintsugi > 0.02) {
    k.brillo(g, x, y, r * 3.4, PAL.champagneRgb, 0.7 * uKintsugi);
  }
  k.planeta(g, x, y, r, t * 0.25, -0.7, -0.5, [PAL.violetLight, PAL.violet, PAL.aubergine]);

  // Grietas de oro kintsugi que se encienden en «heridas» y «formaron»
  g.save();
  g.translate(x, y);
  g.beginPath();
  g.arc(0, 0, r * 0.98, 0, 6.2832);
  g.clip();
  const vetas = [
    [[-r * 0.65, -r * 0.35], [-r * 0.15, -r * 0.08], [r * 0.25, r * 0.12], [r * 0.72, r * 0.45]],
    [[r * 0.45, -r * 0.62], [r * 0.08, -r * 0.12], [-r * 0.32, r * 0.48]],
    [[-r * 0.15, -r * 0.08], [r * 0.05, -r * 0.68]],
  ];
  g.lineCap = "round";
  g.lineJoin = "round";
  for (const v0 of vetas) {
    g.strokeStyle = PAL.aubergine;
    g.lineWidth = r * 0.1;
    g.beginPath();
    v0.forEach((p, i) => (i ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1])));
    g.stroke();

    if (uKintsugi > 0.01) {
      g.save();
      g.globalCompositeOperation = "lighter";
      g.strokeStyle = `rgba(${PAL.champagneRgb},${0.95 * uKintsugi})`;
      g.lineWidth = r * 0.075 * uKintsugi;
      g.stroke();
      g.strokeStyle = `rgba(${PAL.creamSoftRgb},${0.95 * uKintsugi})`;
      g.lineWidth = r * 0.03 * uKintsugi;
      g.stroke();
      g.restore();
    }
  }
  g.restore();

  // Aro de oro cuando termina de formarse
  if (uKintsugi > 0.05) {
    g.strokeStyle = `rgba(${PAL.champagneLightRgb},${0.75 * uKintsugi})`;
    g.lineWidth = 4;
    g.beginPath();
    g.arc(x, y, r * 1.04, 0, 6.2832);
    g.stroke();
  }
  g.restore();
}

// Lugar 2: Roca que se calienta al rojo y se transforma en estrella de luz («los momentos que te transformaron»)
function lugarMomentos(g, x, y, r, t, uCalor, uTransf, al) {
  if (al <= 0.01) return;
  g.save();
  g.globalAlpha *= al;

  // Mientras es crisálida de roca (se calienta y se abre)
  if (uTransf < 0.98) {
    const rRoca = r * (1 - 0.35 * uTransf);
    k.roca(g, x, y, rRoca, t * 0.6, 55, -0.5, -0.7, uCalor);
  }
  // Anillo de llamas y nueva esfera luminosa al transformarse
  if (uTransf > 0.02) {
    k.anilloDeLlamas(g, x, y + r * 0.25, r * 0.95, r * 0.32, t, 0.85, false, 18, 75 * (1 - 0.35 * uTransf));
    k.estrellaTransparente(g, PALETA_CONEXION, x, y, r * mez(0.4, 1.0, uTransf), -t * 0.5, 0.5, uTransf);
    k.anilloDeLlamas(g, x, y + r * 0.25, r * 0.95, r * 0.32, t, 0.85, true, 18, 75 * (1 - 0.35 * uTransf));
  }
  g.restore();
}

// Lugar 3: Escudo / Monolito de cristal y oro («y las verdades que hoy defiendes»)
function lugarVerdades(g, x, y, r, t, uDefiende, al) {
  if (al <= 0.01) return;
  g.save();
  g.translate(x, y);
  g.globalAlpha *= al;

  if (uDefiende > 0.01) {
    k.brillo(g, 0, 0, r * 3.8, PAL.champagneLightRgb, 0.75 * uDefiende);
  }

  // Escudo/monolito octogonal de oro y cristal
  const w = r * 0.95, h = r * 1.12;
  const trazarEscudo = () => {
    g.beginPath();
    g.moveTo(0, -h);
    g.lineTo(w, -h * 0.45);
    g.lineTo(w * 0.82, h * 0.48);
    g.lineTo(0, h);
    g.lineTo(-w * 0.82, h * 0.48);
    g.lineTo(-w, -h * 0.45);
    g.closePath();
  };

  g.save();
  g.shadowColor = "rgba(8,3,18,0.8)";
  g.shadowBlur = 36;
  g.shadowOffsetY = 16;
  trazarEscudo();
  k.metal(g, -w, w, METAL_CHAMPAGNE);
  g.restore();

  g.save();
  g.scale(0.86, 0.86);
  trazarEscudo();
  const eg = g.createLinearGradient(-w, -h, w, h);
  eg.addColorStop(0, PAL.violet);
  eg.addColorStop(0.5, PAL.aubergineSoft);
  eg.addColorStop(1, PAL.champagneDark);
  g.fillStyle = eg;
  g.fill();
  k.vidrio(g, -w, w, 0.65);
  g.restore();

  // Diamante / estrella de la verdad dentro del escudo
  g.save();
  g.globalCompositeOperation = "lighter";
  g.fillStyle = PAL.champagneLight;
  g.beginPath();
  g.moveTo(0, -h * 0.62);
  g.lineTo(w * 0.28, 0);
  g.lineTo(0, h * 0.62);
  g.lineTo(-w * 0.28, 0);
  g.closePath();
  g.fill();
  g.strokeStyle = PAL.creamSoft;
  g.lineWidth = 5 + 4 * uDefiende;
  g.stroke();
  g.restore();

  g.restore();
}

export function dibuja(g, t) {
  const abreDesc = su(tr(t, Tdes - 0.25, Tdes + 0.35));
  const enTres = su(tr(t, Ttres - 0.2, Tlug + 0.25));

  fondoMundo(g, t, {
    cx: 540,
    cy: mez(980, 740, enTres),
    luz: 0.48 + 0.2 * abreDesc,
    colorLuz: PAL.violetRgb,
    colorSec: PAL.champagneRgb,
  });

  // --- PARTE 1 (15.00 a 17.60 s): La mesa de diseño que se rompe en «no se diseña, se descubre»
  if (abreDesc < 0.999) {
    const alPlano = 1 - abreDesc;
    g.save();
    g.globalAlpha = alPlano;

    // Cuadrícula de boceto arquitectónico sobre la pantalla
    const cx = 540, cy = 980;
    g.save();
    g.translate(cx, cy);
    g.scale(1 + 0.35 * abreDesc, 1 + 0.35 * abreDesc);

    // Papel/tablero de diseño en berenjena profundo con borde lavanda
    redondo(g, -430, -480, 860, 960, 32);
    g.fillStyle = "rgba(26,15,46,0.92)";
    g.fill();
    g.strokeStyle = `rgba(${PAL.lavenderRgb},0.55)`;
    g.lineWidth = 4;
    g.stroke();

    // Líneas de cuadrícula técnica
    g.strokeStyle = `rgba(${PAL.violetLightRgb},0.22)`;
    g.lineWidth = 2;
    for (let x = -360; x <= 360; x += 90) {
      g.beginPath();
      g.moveTo(x, -440);
      g.lineTo(x, 440);
      g.stroke();
    }
    for (let y = -360; y <= 360; y += 90) {
      g.beginPath();
      g.moveTo(-390, y);
      g.lineTo(390, y);
      g.stroke();
    }

    // Círculo técnico que el compás intenta diseñar
    const trazo = su(tr(t, T0, Tdis));
    g.strokeStyle = PAL.lavender;
    g.lineWidth = 5;
    g.setLineDash([18, 12]);
    g.beginPath();
    g.arc(0, 0, 240, -Math.PI / 2, -Math.PI / 2 + trazo * Math.PI * 2);
    g.stroke();
    g.setLineDash([]);

    // Cotas técnicas y etiqueta «DISEÑANDO ESENCIA...»
    g.fillStyle = PAL.lavender;
    g.font = "700 34px Figtree";
    g.textAlign = "center";
    g.fillText("BOCETO: ESENCIA DISEÑADA", 0, -370);

    // En «no se diseña»: la grieta de luz dorada rompe el boceto desde el centro y las reglas saltan
    const quiebra = su(tr(t, Tno - 0.05, Tdis + 0.2));
    if (quiebra > 0.01) {
      g.save();
      g.globalCompositeOperation = "lighter";
      const rg = g.createRadialGradient(0, 0, 10, 0, 0, 360 * quiebra);
      rg.addColorStop(0, `rgba(${PAL.creamSoftRgb},${0.95 * quiebra})`);
      rg.addColorStop(0.5, `rgba(${PAL.champagneRgb},${0.65 * quiebra})`);
      rg.addColorStop(1, `rgba(${PAL.champagneRgb},0)`);
      g.fillStyle = rg;
      g.beginPath();
      g.arc(0, 0, 360 * quiebra, 0, 6.2832);
      g.fill();
      g.restore();
    }

    // Regla graduada inferior que se aparta al quebrarse el diseño
    g.save();
    g.translate(0, 220 + quiebra * 180);
    g.rotate(quiebra * 0.18);
    redondo(g, -320, -24, 640, 48, 8);
    k.metal(g, -320, 320, METAL_LAVANDA);
    g.fillStyle = PAL.aubergine;
    for (let rx = -280; rx <= 280; rx += 28) {
      g.fillRect(rx, -24, 3, rx % 56 === 0 ? 22 : 13);
    }
    g.restore();

    if (quiebra > 0.01) {
      k.etiqueta(g, -210, 270, "NO SE DISEÑA", PAL.champagneLightRgb, quiebra, 52);
    }

    // Compás técnico que gira y sale despedido al romperse el diseño
    const sepCompas = quiebra * 220;
    const giroCompas = -0.4 + trazo * 0.9 + quiebra * 0.6;
    compas(g, sepCompas, -240 - sepCompas * 0.5, giroCompas, 1, 1);
    g.restore();
    g.restore();
  }

  // --- PARTE 2 (desde «se descubre» 17.00 s hasta 26.76 s): El núcleo de tu Esencia y los 3 lugares
  const entraEsencia = su(tr(t, Tdes - 0.3, Tdes + 0.25));
  if (entraEsencia > 0.01) {
    g.save();
    g.globalAlpha = entraEsencia;

    // Posición y radio del núcleo central (sube un poco cuando se abren los 3 lugares abajo)
    const ex = 540, ey = mez(980, 720, enTres);
    const er = mez(255, 165, enTres);
    const latidoEsencia =
      0.9 * k.pulso(t, Tdes + 0.06, 0.22) +
      0.5 * k.pulso(t, Ttres + 0.05, 0.2) +
      0.6 * k.pulso(t, Tdef + 0.08, 0.25);

    // Anillos orbitales de los 3 lugares
    if (enTres > 0.01) {
      g.save();
      g.globalCompositeOperation = "lighter";
      g.strokeStyle = `rgba(${PAL.lavenderRgb},${0.28 * enTres})`;
      g.lineWidth = 3;
      g.setLineDash([14, 14]);
      g.beginPath();
      g.arc(540, 1080, 340, 0, 6.2832);
      g.stroke();
      g.setLineDash([]);
      g.restore();
    }

    // Posiciones de los tres lugares alrededor del núcleo
    const p1x = 250, p1y = 1130;
    const p2x = 830, p2y = 1130;
    const p3x = 540, p3y = 1430;

    // Haces de luz que conectan cada lugar descubierto con tu Esencia central
    const u1 = entra(tr(t, Ther - 0.2, Ther + 0.22));
    const u2 = entra(tr(t, Tmom - 0.2, Tmom + 0.22));
    const u3 = entra(tr(t, Tver - 0.2, Tver + 0.22));

    const hazConexion = (x0, y0, x1, y1, u, col) => {
      if (u <= 0.01) return;
      g.save();
      g.globalCompositeOperation = "lighter";
      g.strokeStyle = `rgba(${col},${0.38 * u})`;
      g.lineWidth = 32;
      g.lineCap = "round";
      g.beginPath();
      g.moveTo(x0, y0);
      g.lineTo(mez(x0, x1, u), mez(y0, y1, u));
      g.stroke();
      g.strokeStyle = `rgba(${PAL.creamSoftRgb},${0.88 * u})`;
      g.lineWidth = 6;
      g.beginPath();
      g.moveTo(x0, y0);
      g.lineTo(mez(x0, x1, u), mez(y0, y1, u));
      g.stroke();
      g.restore();
    };

    hazConexion(p1x, p1y, ex, ey, su(tr(t, Tfor - 0.1, Tfor + 0.25)), PAL.champagneRgb);
    hazConexion(p2x, p2y, ex, ey, su(tr(t, Ttra - 0.1, Ttra + 0.25)), PAL.violetLightRgb);
    hazConexion(p3x, p3y, ex, ey, su(tr(t, Tdef - 0.1, Tdef + 0.25)), PAL.champagneLightRgb);

    // Si «defiendes» ya se encendió, haz vertical triunfal hacia el núcleo
    const uDef = su(tr(t, Tdef - 0.1, Tdef + 0.25));
    if (uDef > 0.01) {
      k.haz(g, 540, p3y, ey - 120, PAL.champagneLightRgb, 0.65 * uDef, 56, true);
    }

    // Dibujar el núcleo central de tu Esencia
    nucleoEsencia(g, ex, ey, er, t, { latido: latidoEsencia });
    k.fogonazo(g, ex, ey, t - Tdes, 1300, PAL.champagneLightRgb);

    // Etiqueta del núcleo (se apaga antes de que entre «3 LUGARES»)
    const alEtEse = su(tr(t, Tdes - 0.05, Tdes + 0.2)) * (1 - su(tr(t, Ttres - 0.35, Ttres - 0.1)));
    if (alEtEse > 0.01) {
      k.pastilla(g, 540, ey + er + 120, "SE DESCUBRE", "", PAL.champagneLightRgb, alEtEse, 76);
    }
    const alTres = su(tr(t, Ttres - 0.08, Ttres + 0.14)) * (1 - su(tr(t, Ther - 0.38, Ther - 0.16)));
    if (alTres > 0.01) {
      k.pastilla(g, 540, 1140, "3 LUGARES", "", PAL.lavenderRgb, alTres, 92);
    }

    // --- LUGAR 1: «las heridas que te formaron»
    if (u1 > 0.01) {
      const y1 = mez(1360, p1y, u1);
      const uKint = su(tr(t, Ther, Tfor + 0.2));
      lugarHeridas(g, p1x, y1, 128, t, uKint, u1);
      k.fogonazo(g, p1x, y1, t - Tfor, 700, PAL.champagneRgb);
      k.etiqueta(g, p1x - 145, y1 + 142, "1. HERIDAS", PAL.champagneLightRgb, u1, 42);
    }

    // --- LUGAR 2: «los momentos que te transformaron»
    if (u2 > 0.01) {
      const y2 = mez(1360, p2y, u2);
      const uCal = su(tr(t, Tmom - 0.1, Ttra));
      const uTr = su(tr(t, Ttra - 0.08, Ttra + 0.32));
      lugarMomentos(g, p2x, y2, 128, t, uCal, uTr, u2);
      k.fogonazo(g, p2x, y2, t - Ttra, 820, PAL.champagneLightRgb);
      k.etiqueta(g, p2x - 175, y2 + 142, "2. MOMENTOS", PAL.lavenderRgb, u2, 42);
    }

    // --- LUGAR 3: «y las verdades que hoy defiendes»
    if (u3 > 0.01) {
      const y3 = mez(1720, p3y, u3);
      lugarVerdades(g, p3x, y3, 128, t, uDef, u3);
      k.fogonazo(g, p3x, y3, t - Tdef, 900, PAL.champagneLightRgb);
      k.etiqueta(g, p3x - 165, y3 + 148, "3. VERDADES", PAL.champagneRgb, u3, 42);
    }

    g.restore();
  }

  vineta(g, 0.55);
  velo(g, 0.68);
}
