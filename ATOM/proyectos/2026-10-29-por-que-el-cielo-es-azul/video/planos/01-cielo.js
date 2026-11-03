// Hook Apertura A (01-cielo.js):
// «¿Por qué el cielo se ve azul, si el aire que respiras no tiene color?
//  Si sales al espacio, con el mismo Sol brillando, todo alrededor se ve negro.
//  Entonces, ¿de dónde sale ese azul?»
import * as k from "#kit";
import { v } from "#voz";
import {
  AZUL_RGB,
  acabarCine,
  capsulaAire,
  carretera3D,
  cocheRojo,
  cordillera3D,
  latidoRitmo,
  molecula3D,
  pinoCine,
  solCine,
} from "../mundo.js";

export const desde = 0;

const { suave, tramo, entra, pulso, mez, azar, red, manchas } = k;

const f1 = v.frase(1), f2 = v.frase(2), f3 = v.frase(3);
const Tazul = f1.t("azul");
const Tsi = f1.t("si");
const Taire = f1.t("aire");
const Tcolor = f1.t("color");
const Tsales = f2.t("sales");
const Tespacio = f2.t("espacio");
const Tsol = f2.t("sol");
const Tnegro = f2.t("negro");
const Tentonces = f3.t("entonces");
const Tdonde = f3.t("donde");
const Tazul2 = f3.t("azul");

// Bosque de pinos 3D en tres planos de profundidad a ambos lados de la carretera de montaña
const PINOS = [
  { x: 255, y: 1065, s: 0.72, l: 1 },
  { x: 830, y: 1055, s: 0.70, l: -1 },
  { x: 155, y: 1185, s: 0.94, l: 1 },
  { x: 920, y: 1165, s: 0.92, l: -1 },
  { x: 92, y: 1380, s: 1.16, l: 1 },
  { x: 980, y: 1360, s: 1.14, l: -1 },
  { x: 145, y: 1595, s: 1.32, l: 1 },
  { x: 935, y: 1575, s: 1.30, l: -1 },
  { x: 68, y: 1810, s: 1.48, l: 1 },
  { x: 1005, y: 1795, s: 1.46, l: -1 },
];

const az = azar(71);
const ESTRELLAS_ESP = Array.from({ length: 165 }, () => ({
  x: az() * 1080,
  y: az() * 1480,
  r: 1.1 + az() * 2.4,
  a: 0.25 + az() * 0.7,
  f: az() * 6.28,
}));

const CHISPAS_AIRE = Array.from({ length: 85 }, () => ({
  ang: (az() - 0.5) * 1.16,
  rr: 990 + az() * 118,
  tam: 3.8 + az() * 5.2,
  fase: az() * 6.28,
}));

// Moléculas 3D visibles en la corona atmosférica cuando preguntamos «¿de dónde sale ese azul?»
const MOLECULAS_BORDE = Array.from({ length: 11 }, (_, i) => {
  const ang = -0.52 + (i / 10) * 1.04;
  return {
    ang,
    rr: 1030 + (i % 3) * 28,
    r: 22 + (i % 3) * 5,
    sem: i + 1,
  };
});

export function dibuja(g, t) {
  k.nocheCine(g, 1);

  // Freno suave con continuidad C1 antes del fundido hacia el plano 02 (13.20 s)
  const uFreno = tramo(t, 12.45, 13.0);
  const tFase = t < 12.45 ? t : 12.45 + 0.55 * (uFreno - 0.5 * uFreno * uFreno);
  const latBeat = latidoRitmo(tFase);

  // Subida dramática al espacio en la frase 2 y descenso hacia la capa atmosférica en la frase 3
  const uEspacio = suave(tramo(t, Tsales - 0.08, Tespacio + 0.42));
  const uBaja = suave(tramo(t, Tentonces - 0.05, Tdonde + 0.25));
  const camY = uEspacio * 1580 - uBaja * 330;

  // ---------------- 1. EL CIELO AZUL, LA CORDILLERA 3D Y LA CARRETERA (0.00 a 5.50 s)
  if (camY < 1520) {
    g.save();
    // Ligero acercamiento 3D de cámara sincronizado con el ritmo antes de saltar al espacio
    const zoomValle = 1 + 0.045 * suave(tramo(t, 0, Tsales)) + 0.012 * latBeat * (1 - uEspacio);
    g.translate(540, 960 + camY);
    g.scale(zoomValle, zoomValle);
    g.translate(-540, -960);

    // Desde el fotograma 0 la bóveda celeste está encendida en azul y late al compás en «azul»
    const pulsoAzul = 0.8 + 0.2 * entra(tramo(t, 0, Tazul + 0.1)) + 0.24 * pulso(t, Tazul, 0.22) + 0.08 * latBeat;
    const apagaPorRayosX = suave(tramo(t, Tsi - 0.05, Taire + 0.22));
    const luzCielo = Math.min(1, pulsoAzul) * (1 - 0.82 * apagaPorRayosX) * (1 - suave(tramo(t, Tsales - 0.1, Tsales + 0.35)));

    if (luzCielo > 0.01) {
      // Gran bóveda atmosférica 3D iluminada desde el cenit
      const cg = g.createRadialGradient(540, 110, 50, 540, 480, 980);
      cg.addColorStop(0, `rgba(175,225,255,${0.94 * luzCielo})`);
      cg.addColorStop(0.42, `rgba(78,152,216,${0.78 * luzCielo})`);
      cg.addColorStop(0.78, `rgba(30,72,118,${0.38 * luzCielo})`);
      cg.addColorStop(1, "rgba(11,10,13,0)");
      g.fillStyle = cg;
      g.fillRect(-80, -220, 1240, 1400);

      // Textura de cáusticas atmosféricas sutiles en el cielo azul
      g.save();
      g.globalCompositeOperation = "screen";
      g.globalAlpha = 0.22 * luzCielo;
      g.drawImage( k.causticas, -60 + Math.sin(tFase * 0.4) * 30, -80, 1200, 960);
      g.restore();

      // Haces volumétricos solares que nacen fuera de pantalla arriba (y = -240) y respiran con el beat
      g.save();
      g.globalCompositeOperation = "lighter";
      for (let i = -3; i <= 3; i++) {
        const ang = i * 0.18 + Math.sin(tFase * 1.5 + i) * 0.032;
        const x0 = 540 + i * 36;
        const y0 = -240;
        const x2 = x0 + Math.sin(ang) * 1360;
        const y2 = y0 + Math.cos(ang) * 1360;
        const rg = g.createLinearGradient(x0, 0, x2, 1020);
        rg.addColorStop(0, `rgba(200,234,255,${(0.26 + 0.08 * latBeat) * luzCielo})`);
        rg.addColorStop(0.65, `rgba(95,172,235,${0.15 * luzCielo})`);
        rg.addColorStop(1, "rgba(75,144,200,0)");
        g.strokeStyle = rg;
        g.lineWidth = 96;
        g.beginPath();
        g.moveTo(x0, y0);
        g.lineTo(x2, y2);
        g.stroke();
      }
      // Partículas de dispersión Rayleigh brillando en la bóveda
      for (let i = 0; i < 48; i++) {
        const px = 110 + ((i * 197) % 860) + Math.sin(tFase * 2.1 + i) * 14;
        const py = 490 + ((i * 131) % 430) + Math.cos(tFase * 1.8 + i) * 10;
        const lat = 0.45 + 0.55 * Math.sin(tFase * 5.2 + i * 1.3);
        k.brillo(g, px, py, 38 * (1 + 0.2 * latBeat), AZUL_RGB, luzCielo * lat * 0.68);
      }
      g.restore();

      // Fogonazo sutil sincronizado con la palabra «azul» (1.12 s)
      k.fogonazo(g, 540, 520, t - Tazul, 780, AZUL_RGB);
    }

    // Cordillera 3D hiperrealista con 3 capas de paralaje, facetas de roca y bruma en los valles
    cordillera3D(g, 995, luzCielo, 0.85, tFase * 24, 0);

    // Carretera 3D con textura de asfalto, reflejos húmedos y catadióptricos
    carretera3D(g, tFase, 995, 1, luzCielo);

    // Pinos 3D hiperrealistas ordenados de lejos a cerca con balanceo al viento
    for (const [idx, p] of PINOS.entries()) {
      pinoCine(g, p.x, p.y, p.s, p.l, tFase, idx);
    }

    // El coche rojo protagonista avanzando en 3D con sus faros cálidos
    const cocheY = 1565 - 155 * suave(tramo(t, 0, Tsi));
    const cocheX = 532 - 14 * suave(tramo(t, 0, Tsi));
    k.luzCalida(g, cocheX, cocheY - 105, 490 * (1 + 0.06 * latBeat), 0.95);
    cocheRojo(g, cocheX, cocheY, 1.12, -0.07, 1);

    // En «si el aire que respiras no tiene color»: cápsula 3D en rayos X con moléculas diatómicas neutras
    const alCapsula = suave(tramo(t, Tsi - 0.05, Taire + 0.16)) * (1 - suave(tramo(t, Tsales - 0.12, Tsales + 0.18)));
    if (alCapsula > 0.01) {
      const escCap = mez(0.88, 1.24, entra(tramo(t, Tsi - 0.05, Taire + 0.28))) + 0.08 * pulso(t, Tcolor, 0.18);
      capsulaAire(g, 540, 805, escCap, tFase, alCapsula);
    }

    g.restore();
  }

  // ---------------- 2. EL ESPACIO EXTERIOR Y LA CAPA DE AIRE 3D (4.65 a 13.20 s)
  if (uEspacio > 0.01) {
    const alEsp = uEspacio;
    g.save();
    g.globalAlpha = alEsp;

    const oscureceNegro = suave(tramo(t, Tnegro - 0.5, Tnegro + 0.15));
    g.fillStyle = `rgba(3,3,5,${0.8 + 0.18 * oscureceNegro})`;
    g.fillRect(0, 0, 1080, 1920);

    for (const s of ESTRELLAS_ESP) {
      const centelleo = 0.75 + 0.25 * Math.sin(tFase * 3.2 + s.f);
      g.fillStyle = `rgba(244,240,238,${s.a * centelleo * (1 - 0.35 * oscureceNegro)})`;
      g.beginPath();
      g.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      g.fill();
    }

    const solBrillo = 0.82 + 0.36 * suave(tramo(t, Tsol - 0.2, Tsol + 0.3));
    const solX = 230, solY = 680 - uBaja * 70;
    solCine(g, solX, solY, 122 * solBrillo, tFase, alEsp);

    const alHaces = suave(tramo(t, Tsol - 0.15, Tsol + 0.35));
    if (alHaces > 0.01) {
      g.save();
      g.strokeStyle = `rgba(242,166,90,${(0.28 + 0.08 * latBeat) * alHaces})`;
      g.lineWidth = 3.5;
      g.setLineDash([18, 14]);
      g.lineDashOffset = -tFase * 220;
      for (let i = 0; i < 5; i++) {
        g.beginPath();
        g.moveTo(solX + 70, solY + 40);
        g.lineTo(360 + i * 135, 1380 - uBaja * 120);
        g.stroke();
      }
      g.restore();
    }

    const cyTierra = 2360 - uBaja * 190;
    const rTierra = 980;
    const rAtm = 1098;

    const apagaAtm = suave(tramo(t, Tnegro - 0.45, Tnegro + 0.1)) * (1 - suave(tramo(t, Tentonces, Tdonde)));
    const enciendeAzul = suave(tramo(t, Tentonces + 0.1, Tazul2 + 0.15)) + 0.38 * pulso(t, Tazul2, 0.22);
    const fuerzaAtm = Math.max(0.12, (1 - 0.85 * apagaAtm) * 0.55 + 0.68 * enciendeAzul);

    // Resplandor multicapa de la atmósfera terrestre vista desde la órbita
    const ag = g.createRadialGradient(540, cyTierra, rTierra - 12, 540, cyTierra, rAtm + 80);
    ag.addColorStop(0, `rgba(165,220,255,${0.92 * fuerzaAtm})`);
    ag.addColorStop(0.45, `rgba(75,144,200,${0.55 * fuerzaAtm})`);
    ag.addColorStop(0.78, `rgba(28,72,126,${0.24 * fuerzaAtm})`);
    ag.addColorStop(1, "rgba(75,144,200,0)");
    g.fillStyle = ag;
    g.beginPath();
    g.arc(540, cyTierra, rAtm + 80, 0, Math.PI * 2);
    g.fill();

    // Arco indicador del espesor atmosférico
    g.strokeStyle = enciendeAzul > 0.1 ? `rgba(140,198,242,${0.65 + 0.3 * enciendeAzul})` : "rgba(242,166,90,0.45)";
    g.lineWidth = 3;
    g.setLineDash([14, 12]);
    g.beginPath();
    g.arc(540, cyTierra, rAtm - 10, -Math.PI * 0.78, -Math.PI * 0.22);
    g.stroke();
    g.setLineDash([]);

    // Globo 3D de la Tierra con relieve continental texturizado y terminador nocturno
    g.save();
    g.beginPath();
    g.arc(540, cyTierra, rTierra, 0, Math.PI * 2);
    g.clip();

    const tg = g.createRadialGradient(380, cyTierra - rTierra * 0.88, 60, 540, cyTierra, rTierra);
    tg.addColorStop(0, "#2B4650");
    tg.addColorStop(0.38, "#182830");
    tg.addColorStop(0.75, "#0B1116");
    tg.addColorStop(1, "#050608");
    g.fillStyle = tg;
    g.fillRect(0, cyTierra - rTierra, 1080, rTierra * 1.2);

    // Relieve 3D de nubes y corteza terrestre sobre el horizonte curvado
    g.globalCompositeOperation = "overlay";
    g.globalAlpha = 0.42;
    g.drawImage(manchas, -80 + tFase * 12, cyTierra - rTierra - 40, 1240, 680);
    g.globalCompositeOperation = "multiply";
    g.globalAlpha = 0.48;
    g.drawImage(red, 0, cyTierra - rTierra, 1080, 620);
    g.restore();

    // Borde especular atmosférico sobre la curvatura de la Tierra
    g.strokeStyle = `rgba(155,212,252,${0.5 + 0.45 * fuerzaAtm})`;
    g.lineWidth = 5.5;
    g.beginPath();
    g.arc(540, cyTierra, rTierra, -Math.PI * 0.85, -Math.PI * 0.15);
    g.stroke();

    const alNegro = suave(tramo(t, f2.t("todo") - 0.1, Tnegro + 0.05)) * (1 - suave(tramo(t, Tentonces - 0.05, Tentonces + 0.3)));
    if (alNegro > 0.01) {
      k.rotuloCine(g, 640, 910, "sin aire", "CIELO NEGRO", alNegro, 62);
    }

    // En «¿de dónde sale ese azul?»: se iluminan las moléculas 3D de gas y las chispas azules en la atmósfera
    const alPregunta = suave(tramo(t, Tentonces + 0.05, Tdonde + 0.15));
    if (alPregunta > 0.01) {
      g.save();
      g.globalCompositeOperation = "lighter";
      for (const c of CHISPAS_AIRE) {
        const x = 540 + Math.sin(c.ang) * c.rr;
        const y = cyTierra - Math.cos(c.ang) * c.rr;
        const latido = 0.55 + 0.45 * Math.sin(tFase * 6 + c.fase);
        k.brillo(g, x, y, c.tam * 9.5, AZUL_RGB, alPregunta * latido);
      }
      g.restore();

      // Moléculas 3D flotando en la franja atmosférica anticipando la explicación científica
      g.save();
      g.globalAlpha = alPregunta * 0.92;
      for (const m of MOLECULAS_BORDE) {
        const mx = 540 + Math.sin(m.ang) * m.rr;
        const my = cyTierra - Math.cos(m.ang) * m.rr;
        molecula3D(g, mx, my, m.r, tFase, m.sem, enciendeAzul, pulso(t, Tazul2, 0.2));
      }
      g.restore();

      k.fogonazo(g, 540, cyTierra - rTierra - 40, t - Tazul2, 720, AZUL_RGB);
      const escAz = 1 + 0.06 * pulso(t, Tazul2, 0.2);
      k.rotuloCine(g, 540, 875, "¿de dónde sale?", "EL AZUL", alPregunta, 68 * escAz);
    }

    g.restore();
  }

  acabarCine(g, t, 0.55);
}

export const momentosHook = {
  abreCielo: 0.08,
  capsula: Tsi,
  pulsoColor: Tcolor,
  subeEspacio: Tsales,
  negro: Tnegro,
  preguntaAzul: Tdonde,
};
