// Plano 03 (03-rebote.js): Dentro del aire en 3D hiperrealista (moléculas diatómicas N2/O2 y dispersión de Rayleigh).
// «Al entrar en el aire, las olas rojas son tan largas que esquivan los gases y pasan de largo.
//  Pero las azules, al ser tan pequeñas, chocan y rebotan nueve veces más por todo el cielo.»
import * as k from "#kit";
import { v } from "#voz";
import { AZUL_CLARO, AZUL_RGB, ROJO_RGB, acabarCine, latidoRitmo, molecula3D } from "../mundo.js";

const f7 = v.frase(7), f8 = v.frase(8);
export const desde = () => f7.inicio;
export const entrada = "fundido";

const { CINE, suave, tramo, entra, pulso, mez, azar, causticas } = k;

const Tentrar = f7.t("entrar");
const Trojas = f7.t("rojas");
const Tesquivan = f7.t("esquivan");
const Tlargo = f7.t("largo");

const Tpero = f8.t("pero");
const Tazules = f8.t("azules");
const Tchocan = f8.t("chocan");
const Trebotan = f8.t("rebotan");
const Tnueve = f8.t("nueve");
const Tcielo = f8.t("cielo");

// Moléculas diatómicas 3D en segundo plano (profundidad Z lejana)
const MOLECULAS_FONDO = [
  { x: 165, y: 740, r: 24, f: 0.8 },
  { x: 390, y: 690, r: 22, f: 1.9 },
  { x: 720, y: 720, r: 25, f: 2.7 },
  { x: 920, y: 780, r: 21, f: 3.5 },
  { x: 190, y: 1180, r: 23, f: 4.1 },
  { x: 540, y: 1190, r: 26, f: 5.0 },
  { x: 890, y: 1150, r: 22, f: 5.8 },
  { x: 510, y: 1440, r: 24, f: 1.3 },
];

// Moléculas diatómicas 3D protagonistas en primer plano y plano medio
const MOLECULAS = [
  { x: 250, y: 920, r: 50, f: 0.4 },
  { x: 430, y: 1120, r: 58, f: 1.2 },
  { x: 540, y: 860, r: 64, f: 2.1 },
  { x: 660, y: 1060, r: 56, f: 3.0 },
  { x: 830, y: 900, r: 52, f: 4.2 },
  { x: 340, y: 1320, r: 48, f: 5.1 },
  { x: 750, y: 1290, r: 54, f: 1.8 },
];

const az = azar(303);
const REBOTES = [];
MOLECULAS.forEach((m, idx) => {
  const tChoque = Tchocan - 0.15 + idx * 0.12;
  for (let i = 0; i < 9; i++) {
    const ang = (i / 9) * Math.PI * 2 + (az() - 0.5) * 0.32;
    const largo = 250 + az() * 310;
    REBOTES.push({
      x0: m.x,
      y0: m.y,
      x1: m.x + Math.cos(ang) * largo,
      y1: m.y + Math.sin(ang) * largo,
      t0: tChoque,
      sem: az() * 6.28,
    });
  }
});

export function dibuja(g, t) {
  // Antes del fundido hacia 04-linterna.js en 44.56 s, el movimiento frena con continuidad C1 desde 43.9 s
  const uFreno = tramo(t, 43.9, 44.35);
  const tFase = t < 43.9 ? t : 43.9 + 0.45 * (uFreno - 0.5 * uFreno * uFreno);
  const lat = latidoRitmo(tFase) * (1 - uFreno);

  // Fondo de cámara atmosférica nocturna 3D
  const bg = g.createLinearGradient(0, 0, 0, 1920);
  bg.addColorStop(0, "#080E16");
  bg.addColorStop(0.55, "#101E2E");
  bg.addColorStop(1, "#151210");
  g.fillStyle = bg;
  g.fillRect(0, 0, 1080, 1920);

  const uCieloAzul = suave(tramo(t, Trebotan - 0.1, Tcielo + 0.1));
  if (uCieloAzul > 0.01) {
    const cg = g.createRadialGradient(540, 1020, 50, 540, 1020, 960);
    cg.addColorStop(0, `rgba(110,185,245,${0.68 * uCieloAzul})`);
    cg.addColorStop(0.55, `rgba(52,115,178,${0.42 * uCieloAzul})`);
    cg.addColorStop(1, "rgba(11,10,13,0)");
    g.fillStyle = cg;
    g.fillRect(0, 0, 1080, 1920);

    // Cáusticas volumétricas de luz azul rebotando por todo el aire
    g.save();
    g.globalCompositeOperation = "screen";
    g.globalAlpha = 0.28 * uCieloAzul;
    g.drawImage(causticas, -60 + Math.sin(tFase * 0.6) * 35, 360, 1200, 1200);
    g.restore();
  }

  k.luzCalida(g, 540, 1060, 580 * (1 + 0.05 * lat), 0.78 * (1 - 0.55 * uCieloAzul));

  // Cámara 3D acercándose suavemente hacia el interior del gas
  const zoomCam = mez(0.96, 1.06, suave(tramo(t, f7.inicio, Tcielo))) + 0.01 * lat;
  g.save();
  g.translate(540, 1050);
  g.scale(zoomCam, zoomCam);
  g.translate(-540, -1050);

  // ---------------- 0. MOLÉCULAS 3D DE FONDO (Profundidad Z lejana con paralaje)
  g.save();
  g.globalAlpha = 0.45;
  for (const [i, mf] of MOLECULAS_FONDO.entries()) {
    const dx = Math.sin(tFase * 1.1 + mf.f) * 6;
    const dy = Math.cos(tFase * 0.95 + mf.f) * 6;
    molecula3D(g, mf.x + dx, mf.y + dy, mf.r, tFase * 0.8, i + 20, uCieloAzul * 0.85, 0);
  }
  g.restore();

  // ---------------- 1. LAS OLAS ROJAS LARGAS EN 3D (esquivan las moléculas)
  const alRoja = 1 - 0.82 * suave(tramo(t, Tpero - 0.05, Tazules + 0.25));
  const avanceRoja = entra(tramo(t, f7.inicio, Tlargo + 0.1));

  if (alRoja > 0.01) {
    g.save();
    g.globalAlpha = alRoja;
    const xMax = mez(420, 1060, avanceRoja);

    for (const [idx, yBase] of [760, 1020, 1240].entries()) {
      // Cinta 3D secundaria (volumen cálido detrás)
      g.strokeStyle = "rgba(232,131,58,0.36)";
      g.lineWidth = 26;
      g.lineCap = "round";
      g.beginPath();
      for (let x = 20; x <= xMax; x += 10) {
        const y = yBase + 6 + Math.sin(x * 0.012 - tFase * 4.8 + idx * 1.1 - 0.4) * 105;
        if (x === 20) g.moveTo(x, y);
        else g.lineTo(x, y);
      }
      g.stroke();

      // Cinta 3D principal roja (#C9372C)
      g.strokeStyle = CINE.rojo;
      g.lineWidth = 15 + 3 * lat;
      g.shadowColor = CINE.rojo;
      g.shadowBlur = 28;
      g.beginPath();
      for (let x = 20; x <= xMax; x += 8) {
        const y = yBase + Math.sin(x * 0.012 - tFase * 4.8 + idx * 1.1) * 115;
        if (x === 20) g.moveTo(x, y);
        else g.lineTo(x, y);
      }
      g.stroke();
    }
    g.restore();
  }

  // ---------------- 2. LAS OLAS AZULES CORTAS Y EL REBOTE EN CADENA 3D
  const alAzul = suave(tramo(t, Tpero - 0.05, Tazules + 0.2));
  if (alAzul > 0.01) {
    const llegaChoque = entra(tramo(t, Tpero, Tchocan + 0.05));
    g.save();
    g.globalAlpha = alAzul;

    for (const [idx, m] of MOLECULAS.slice(0, 5).entries()) {
      const xFin = mez(30, m.x - m.r * 0.6, llegaChoque);
      g.strokeStyle = "rgba(75,144,200,0.42)";
      g.lineWidth = 18;
      g.lineCap = "round";
      g.beginPath();
      for (let x = 30; x <= xFin; x += 5) {
        const y = m.y + Math.sin(x * 0.095 - tFase * 14 + idx - 0.45) * 32;
        if (x === 30) g.moveTo(x, y);
        else g.lineTo(x, y);
      }
      g.stroke();

      g.strokeStyle = AZUL_CLARO;
      g.lineWidth = 10 + 2.5 * lat;
      g.shadowColor = AZUL_CLARO;
      g.shadowBlur = 24;
      g.beginPath();
      for (let x = 30; x <= xFin; x += 4) {
        const y = m.y + Math.sin(x * 0.095 - tFase * 14 + idx) * 36;
        if (x === 30) g.moveTo(x, y);
        else g.lineTo(x, y);
      }
      g.stroke();
    }

    // Rayos 3D de dispersión Rayleigh saliendo disparados de cada molécula en todas direcciones
    g.globalCompositeOperation = "lighter";
    for (const r of REBOTES) {
      const u = tramo(t, r.t0, r.t0 + 0.55);
      if (u <= 0) continue;
      const p = entra(u);
      const x = mez(r.x0, r.x1, p);
      const y = mez(r.y0, r.y1, p);
      const ondX = Math.sin(tFase * 10 + r.sem) * 8;
      const ondY = Math.cos(tFase * 10 + r.sem) * 8;

      const rg = g.createLinearGradient(r.x0, r.y0, x + ondX, y + ondY);
      rg.addColorStop(0, `rgba(200,238,255,${0.85 * alAzul})`);
      rg.addColorStop(1, `rgba(${AZUL_RGB},${0.25 * alAzul})`);
      g.strokeStyle = rg;
      g.lineWidth = 5.5;
      g.beginPath();
      g.moveTo(r.x0, r.y0);
      g.lineTo(x + ondX, y + ondY);
      g.stroke();

      k.brillo(g, x + ondX, y + ondY, 38 * (1 + 0.15 * lat), AZUL_RGB, 0.85 * alAzul);
    }
    g.restore();
  }

  // ---------------- 3. MOLÉCULAS DIATÓMICAS 3D PROTAGONISTAS Y ONDAS DE CHOQUE
  MOLECULAS.forEach((m, idx) => {
    const tChoque = Tchocan - 0.15 + idx * 0.12;
    const imp = pulso(t, tChoque + 0.04, 0.16);
    const bAzul = suave(tramo(t, tChoque, tChoque + 0.25)) + 0.5 * imp;
    const dx = Math.sin(tFase * 1.6 + m.f) * 9;
    const dy = Math.cos(tFase * 1.4 + m.f) * 9;

    // Fogonazo volumétrico sincronizado con el impacto de cada molécula
    if (idx < 5) {
      k.fogonazo(g, m.x + dx, m.y + dy, t - tChoque, 460, AZUL_RGB);
    }

    molecula3D(g, m.x + dx, m.y + dy, m.r, tFase, idx + 1, Math.min(1, bAzul), imp);
  });

  g.restore();

  const alRotRojo = 1 - suave(tramo(t, Tpero - 0.1, Tazules));
  if (alRotRojo > 0.01) {
    k.rotuloCine(g, 540, 640, "ola roja larga", "ESQUIVA EL AIRE", alRotRojo, 58);
  }

  const alRotAzul = suave(tramo(t, Tchocan - 0.1, Tnueve + 0.1));
  if (alRotAzul > 0.01) {
    const esc = 1 + 0.09 * pulso(t, Tnueve, 0.2) + 0.02 * lat;
    k.rotuloCine(g, 540, 650, "el azul rebota", "9 VECES MÁS", alRotAzul, 68 * esc);
  }

  acabarCine(g, t, 0.35);
}

export const choquesAire = MOLECULAS.map((_, idx) => Tchocan - 0.15 + idx * 0.12);
export const momentosRebote = {
  entraRoja: Tentrar,
  esquiva: Tesquivan,
  entraAzul: Tazules,
  nueve: Tnueve,
};
