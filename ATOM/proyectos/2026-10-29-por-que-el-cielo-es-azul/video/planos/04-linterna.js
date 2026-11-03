// Plano 04 (04-linterna.js): La comparación de casa en la mesa de estudio 3D.
// «Compruébalo con una linterna y un vaso de agua con dos gotas de leche: el agua atrapa el azul y lo reparte.»
import * as k from "#kit";
import { v } from "#voz";
import { AZUL_RGB, acabarCine, latidoRitmo, mesaEstudio, molecula3D } from "../mundo.js";

const f9 = v.frase(9);
export const desde = () => f9.inicio;
export const entrada = "fundido";

const { CINE, suave, tramo, entra, pulso, mez, redondo, azar, causticas } = k;

const Tlinterna = f9.t("linterna");
const Tgotas = f9.t("gotas");
const Tleche = f9.t("leche");
const Tatrapa = f9.t("atrapa");
const Tazul = f9.t("azul");

const az = azar(505);
const NUBE_GOTAS = Array.from({ length: 75 }, () => ({
  x: (az() - 0.5) * 265,
  y: (az() - 0.5) * 335,
  r: 5 + az() * 8,
  f: az() * 6.28,
}));

const MICELAS_3D = Array.from({ length: 10 }, (_, i) => ({
  x: (az() - 0.5) * 210,
  y: (az() - 0.5) * 260 + 20,
  r: 15 + (i % 3) * 4,
  sem: i + 1,
}));

function linternaRoja3D(g, x, y, encendida = 1) {
  g.save();
  g.translate(x, y);

  // Sombra 3D proyectada sobre la mesa
  g.fillStyle = "rgba(0,0,0,0.68)";
  redondo(g, -188, -36, 266, 102, 24);
  g.fill();

  // Cuerpo cilíndrico metálico rojo (#C9372C) con sombreado 3D y estrías de agarre
  const lg = g.createLinearGradient(0, -44, 0, 44);
  lg.addColorStop(0, "#9E231B");
  lg.addColorStop(0.25, "#F05648");
  lg.addColorStop(0.55, CINE.rojo);
  lg.addColorStop(0.85, "#781A14");
  lg.addColorStop(1, "#4A0E0A");
  g.fillStyle = lg;
  redondo(g, -182, -40, 198, 80, 16);
  g.fill();
  g.strokeStyle = "rgba(242,166,90,0.45)";
  g.lineWidth = 2.5;
  g.stroke();

  // Anillos de agarre 3D en el mango
  g.strokeStyle = "rgba(20,10,10,0.45)";
  g.lineWidth = 4;
  for (let rx = -145; rx <= -65; rx += 16) {
    g.beginPath();
    g.moveTo(rx, -36);
    g.lineTo(rx, 36);
    g.stroke();
  }

  // Cabezal metálico 3D y lente parabólica
  redondo(g, 6, -56, 64, 112, 12);
  k.metal(g, 6, 70, ["#2A2421", "#6E625B", "#3A322E", "#8A7C73", "#1C1816"]);

  g.fillStyle = encendida > 0.1 ? "#FFF9E8" : "#5E534B";
  g.beginPath();
  g.ellipse(66, 0, 10, 46, 0, 0, Math.PI * 2);
  g.fill();

  // Botón interruptor naranja
  g.fillStyle = CINE.naranja;
  redondo(g, -72, -50, 40, 12, 5);
  g.fill();

  g.restore();
}

export function dibuja(g, t) {
  // Reposo continuo C1 antes del fundido hacia 05-atardecer.js en 51.60 s
  const uFreno = tramo(t, 51.0, 51.4);
  const tFase = t < 51.0 ? t : 51.0 + 0.4 * (uFreno - 0.5 * uFreno * uFreno);
  const lat = latidoRitmo(tFase) * (1 - uFreno);
  const zoomEscena = mez(0.94, 1.13, suave(tramo(t, f9.inicio, Tazul + 0.35))) + 0.01 * lat;

  mesaEstudio(g, 0, 0, 580, 1140, tFase);

  g.save();
  g.translate(540, 1140);
  g.scale(zoomEscena, zoomEscena);
  g.translate(-540, -1140);

  const vasoX = 630, vasoY = 1140, vasoW = 344, vasoH = 465;
  const enciende = mez(0.58, 1.0, suave(tramo(t, f9.inicio, Tlinterna + 0.1)));
  const uGotas = suave(tramo(t, Tgotas - 0.2, Tleche + 0.25));
  const uAzul = suave(tramo(t, Tatrapa - 0.2, Tazul + 0.2));

  if (enciende > 0.01) {
    g.save();
    g.globalCompositeOperation = "lighter";
    // Cono de luz blanca entrando al vaso desde la linterna
    const hg1 = g.createLinearGradient(255, vasoY, vasoX - vasoW / 2, vasoY);
    hg1.addColorStop(0, `rgba(255,248,225,${0.92 * enciende})`);
    hg1.addColorStop(1, `rgba(255,244,215,${0.7 * enciende})`);
    g.fillStyle = hg1;
    g.beginPath();
    g.moveTo(255, vasoY - 42);
    g.lineTo(vasoX - vasoW / 2, vasoY - 98);
    g.lineTo(vasoX - vasoW / 2, vasoY + 98);
    g.lineTo(255, vasoY + 42);
    g.closePath();
    g.fill();

    // Haz anaranjado/rojizo que logra atravesar el vaso tras perder el azul (preludio del atardecer)
    const hg2 = g.createLinearGradient(vasoX + vasoW / 2, vasoY, 1060, vasoY);
    const colSalida = uAzul > 0.3 ? "232,131,58" : "255,240,210";
    hg2.addColorStop(0, `rgba(${colSalida},${0.62 * enciende})`);
    hg2.addColorStop(1, `rgba(${colSalida},0)`);
    g.fillStyle = hg2;
    g.beginPath();
    g.moveTo(vasoX + vasoW / 2, vasoY - 102);
    g.lineTo(1060, vasoY - 155);
    g.lineTo(1060, vasoY + 155);
    g.lineTo(vasoX + vasoW / 2, vasoY + 102);
    g.closePath();
    g.fill();
    g.restore();
  }

  g.save();
  g.translate(vasoX, vasoY);

  // Sombra 3D y cáustica proyectada en la mesa debajo del vaso
  g.fillStyle = "rgba(0,0,0,0.65)";
  g.beginPath();
  g.ellipse(16, vasoH / 2 + 14, vasoW * 0.56, 38, 0, 0, Math.PI * 2);
  g.fill();

  if (enciende > 0.2) {
    g.save();
    g.globalCompositeOperation = "lighter";
    const cgMesa = g.createRadialGradient(70, vasoH / 2 + 12, 10, 70, vasoH / 2 + 12, 165);
    cgMesa.addColorStop(0, uAzul > 0.2 ? "rgba(130,200,255,0.38)" : "rgba(255,230,180,0.32)");
    cgMesa.addColorStop(1, "rgba(0,0,0,0)");
    g.fillStyle = cgMesa;
    g.beginPath();
    g.ellipse(70, vasoH / 2 + 12, 165, 32, 0, 0, Math.PI * 2);
    g.fill();
    g.restore();
  }

  // Base gruesa de cristal 3D del vaso
  g.fillStyle = "rgba(220,235,248,0.22)";
  g.strokeStyle = "rgba(255,255,255,0.48)";
  g.lineWidth = 3;
  g.beginPath();
  g.ellipse(0, vasoH / 2 - 12, vasoW * 0.48, 24, 0, 0, Math.PI * 2);
  g.fill();
  g.stroke();

  // Volumen 3D del líquido dentro del vaso
  redondo(g, -vasoW / 2 + 12, -vasoH / 2 + 45, vasoW - 24, vasoH - 65, 22);
  const ag = g.createRadialGradient(0, 0, 20, 0, 0, vasoW * 0.85);
  if (uAzul > 0.02) {
    ag.addColorStop(0, `rgba(175,228,255,${0.34 + 0.65 * uAzul})`);
    ag.addColorStop(0.55, `rgba(75,144,200,${0.28 + 0.62 * uAzul})`);
    ag.addColorStop(1, `rgba(24,62,108,${0.28 + 0.48 * uAzul})`);
  } else {
    ag.addColorStop(0, "rgba(255,245,230,0.26)");
    ag.addColorStop(1, "rgba(180,195,210,0.14)");
  }
  g.fillStyle = ag;
  g.fill();

  // Cáusticas internas y nube coloidal 3D de leche dispersando el azul (efecto Tyndall / Rayleigh)
  g.save();
  g.clip();
  if (uAzul > 0.05) {
    g.save();
    g.globalCompositeOperation = "screen";
    g.globalAlpha = 0.42 * uAzul;
    g.drawImage(causticas, -220 + Math.sin(tFase * 0.8) * 28, -240, 440, 480);
    g.restore();
  }

  if (uGotas > 0.01) {
    for (const p of NUBE_GOTAS) {
      const px = p.x * entra(uGotas) + Math.sin(tFase * 2.5 + p.f) * 12;
      const py = p.y * entra(uGotas) + Math.cos(tFase * 2.1 + p.f) * 12;
      if (uAzul > 0.1) {
        const latP = 0.55 + 0.45 * Math.sin(tFase * 7 + p.f);
        k.brillo(g, px, py, p.r * 7.8 * (1 + 0.12 * lat), AZUL_RGB, uAzul * latP);
      } else {
        g.fillStyle = `rgba(241,236,232,${0.55 * uGotas})`;
        g.beginPath();
        g.arc(px, py, p.r * 1.15, 0, Math.PI * 2);
        g.fill();
      }
    }

    // Micelas coloidales 3D girando dentro del agua e iluminándose en azul
    for (const m of MICELAS_3D) {
      const mx = m.x * entra(uGotas) + Math.sin(tFase * 1.8 + m.sem) * 10;
      const my = m.y * entra(uGotas) + Math.cos(tFase * 1.6 + m.sem) * 10;
      molecula3D(g, mx, my, m.r, tFase, m.sem, uAzul, pulso(t, Tazul, 0.2));
    }
  }
  g.restore();

  // Menisco elíptico 3D de la superficie del agua
  g.fillStyle = uAzul > 0.1 ? `rgba(160,218,255,${0.25 + 0.35 * uAzul})` : "rgba(255,250,242,0.22)";
  g.strokeStyle = "rgba(255,255,255,0.58)";
  g.lineWidth = 2.5;
  g.beginPath();
  g.ellipse(0, -vasoH / 2 + 48, vasoW * 0.46, 20, 0, 0, Math.PI * 2);
  g.fill();
  g.stroke();

  // Las dos gotas de leche cayendo en 3D y creando ondas concéntricas en el menisco
  for (const [i, tGota] of [Tgotas - 0.15, Tgotas + 0.12].entries()) {
    const u = tramo(t, tGota - 0.28, tGota + 0.12);
    if (u > 0 && u < 1) {
      const gy = mez(-460, -vasoH / 2 + 48, u * u);
      const gx = i === 0 ? -42 : 42;
      const gg = g.createRadialGradient(gx - 5, gy - 6, 2, gx, gy, 22);
      gg.addColorStop(0, "#FFFFFF");
      gg.addColorStop(0.6, CINE.crema);
      gg.addColorStop(1, "#C8BEB4");
      g.fillStyle = gg;
      g.beginPath();
      g.ellipse(gx, gy, 16, 26, 0, 0, Math.PI * 2);
      g.fill();
    }
    const w = t - (tGota + 0.12);
    if (w > 0 && w < 0.52) {
      g.strokeStyle = `rgba(244,240,238,${1 - w / 0.52})`;
      g.lineWidth = 3.5;
      g.beginPath();
      g.ellipse(i === 0 ? -42 : 42, -vasoH / 2 + 48, w * 235, w * 46, 0, 0, Math.PI * 2);
      g.stroke();
    }
  }

  // Paredes cilíndricas de cristal 3D y reflejos especulares
  redondo(g, -vasoW / 2, -vasoH / 2, vasoW, vasoH, 26);
  k.vidrio(g, -vasoW / 2, vasoW / 2, 0.68);
  k.reflejo(g, -vasoW * 0.38, -vasoH * 0.38, 18, vasoH * 0.72, 0.42);
  k.reflejo(g, vasoW * 0.32, -vasoH * 0.34, 10, vasoH * 0.64, 0.22);

  // Boca elíptica superior del vaso
  g.strokeStyle = "rgba(255,255,255,0.82)";
  g.lineWidth = 4;
  g.beginPath();
  g.ellipse(0, -vasoH / 2, vasoW / 2, 22, 0, 0, Math.PI * 2);
  g.stroke();

  k.fogonazo(g, 0, 0, t - Tazul, 520, AZUL_RGB);
  g.restore();

  linternaRoja3D(g, 185, vasoY, enciende);
  g.restore();

  const textoGrande = uAzul > 0.2 ? "ATRAPA EL AZUL" : "AGUA + 2 GOTAS DE LECHE";
  const esc = 1 + 0.08 * pulso(t, Tazul, 0.2) + 0.015 * lat;
  k.rotuloCine(g, 540, 640, "experimento en casa", textoGrande, 1, 56 * esc);

  acabarCine(g, t, 0.3);
}

export const momentosLinterna = {
  enciende: Tlinterna,
  gota1: Tgotas - 0.08,
  gota2: Tgotas + 0.16,
  azulVaso: Tazul,
};
