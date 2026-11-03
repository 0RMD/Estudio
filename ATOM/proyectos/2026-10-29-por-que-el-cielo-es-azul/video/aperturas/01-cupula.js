// Hook Apertura B (aperturas/01-cupula.js):
// En el observatorio nocturno, junto a un telescopio rojo (#C9372C), desde el fotograma 0 un potente haz solar
// impacta una gran cúpula de cristal 3D llena de moléculas diatómicas de aire que hierven de luz azul;
// en «aire que respiras no tiene color», la cúpula pasa a modo rayos X mostrando las moléculas 3D neutras;
// en «sales al espacio», la cúpula se levanta dejando a la Tierra en el vacío negro;
// en «¿de dónde sale ese azul?», la cúpula baja y las moléculas 3D vuelven a encenderse de azul.
import * as k from "#kit";
import { v } from "#voz";
import { AZUL_RGB, acabarCine, latidoRitmo, mesaEstudio, molecula3D, solCine } from "../mundo.js";

export const desde = 0;

const { CINE, suave, tramo, entra, pulso, mez, redondo, azar } = k;

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

const az = azar(109);
const PARTICULAS = Array.from({ length: 85 }, () => {
  const a = az() * Math.PI, r = 40 + Math.sqrt(az()) * 320;
  return {
    dx: Math.cos(a) * r * (az() > 0.5 ? 1 : -1),
    dy: -Math.abs(Math.sin(a)) * r * 0.85 - 20,
    s: 4.5 + az() * 6,
    f: az() * 6.28,
  };
});
const MOLECULAS_CUPULA = Array.from({ length: 14 }, (_, i) => {
  const a = 0.2 + (i / 13) * (Math.PI - 0.4);
  const r = 115 + (i % 3) * 85;
  return {
    dx: Math.cos(a) * r * (i % 2 === 0 ? 1 : -1),
    dy: -Math.sin(a) * r * 0.82 - 30,
    r: 16 + (i % 3) * 5,
    sem: i + 1,
  };
});
const ESTRELLAS_FONDO = Array.from({ length: 110 }, () => ({
  x: az() * 1080,
  y: az() * 1400,
  r: 1.2 + az() * 2,
  a: 0.3 + az() * 0.6,
}));

function telescopioRojo(g, x, y, esc = 1) {
  g.save();
  g.translate(x, y);
  g.scale(esc, esc);
  g.strokeStyle = "#2B231E";
  g.lineWidth = 14;
  g.lineCap = "round";
  for (const dx of [-75, 0, 75]) {
    g.beginPath();
    g.moveTo(0, 0);
    g.lineTo(dx, 185);
    g.stroke();
  }
  g.save();
  g.rotate(-0.42);
  const tg = g.createLinearGradient(0, -34, 0, 34);
  tg.addColorStop(0, "#E44B3E");
  tg.addColorStop(0.5, CINE.rojo);
  tg.addColorStop(1, "#872018");
  g.fillStyle = tg;
  redondo(g, -110, -32, 220, 64, 14);
  g.fill();
  g.strokeStyle = "rgba(242,166,90,0.45)";
  g.lineWidth = 2.5;
  g.stroke();
  g.fillStyle = CINE.crema;
  redondo(g, 92, -36, 26, 72, 6);
  g.fill();
  g.restore();
  g.restore();
}

export function dibuja(g, t) {
  const uFreno = tramo(t, 12.45, 13.0);
  const tFase = t < 12.45 ? t : 12.45 + 0.55 * (uFreno - 0.5 * uFreno * uFreno);
  const lat = latidoRitmo(tFase);

  const uVacio = suave(tramo(t, Tsales - 0.08, Tespacio + 0.32)) * (1 - suave(tramo(t, Tentonces - 0.08, Tdonde + 0.2)));
  mesaEstudio(g, 0, 0, 540, 1220, tFase);

  if (uVacio > 0.01) {
    g.fillStyle = `rgba(3,3,6,${0.95 * uVacio})`;
    g.fillRect(0, 0, 1080, 1920);
    for (const s of ESTRELLAS_FONDO) {
      g.fillStyle = `rgba(244,240,238,${s.a * uVacio})`;
      g.beginPath();
      g.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      g.fill();
    }
  }

  const cx = 540, baseY = 1320, R = 385;

  // El Sol arriba brillando desde el fotograma 0
  const solY = mez(560, 610, uVacio);
  solCine(g, cx, solY, 88 + 24 * pulso(t, Tsol, 0.3), tFase, 1);

  const levanta = suave(tramo(t, Tsales - 0.06, Tespacio + 0.35)) * (1 - suave(tramo(t, Tentonces - 0.06, Tdonde + 0.15)));
  const cupulaY = baseY - levanta * 920;
  const alCupula = 1 - suave(tramo(levanta, 0.55, 0.95));

  const modoRayosX = suave(tramo(t, Tsi - 0.05, Taire + 0.2)) * (1 - suave(tramo(t, Tsales - 0.15, Tsales + 0.15)));
  const reenciende = suave(tramo(t, Tdonde - 0.1, Tazul2 + 0.15));
  const azulBase = (0.82 + 0.18 * entra(tramo(t, 0, Tazul + 0.1)) + 0.18 * pulso(t, Tazul, 0.2) + 0.06 * lat) * (1 - modoRayosX) * (1 - levanta);
  const azulFuerza = Math.min(1, azulBase + reenciende);

  // Haz de luz solar que baja desde el Sol hasta la Tierra
  g.save();
  g.globalCompositeOperation = "lighter";
  const hg = g.createLinearGradient(cx, solY, cx, baseY);
  hg.addColorStop(0, "rgba(255,244,220,0.88)");
  hg.addColorStop(0.6, `rgba(242,166,90,${0.32 * (1 - 0.55 * uVacio)})`);
  hg.addColorStop(1, "rgba(242,166,90,0.04)");
  g.fillStyle = hg;
  g.beginPath();
  g.moveTo(cx - 32, solY);
  g.lineTo(cx - 125, baseY);
  g.lineTo(cx + 125, baseY);
  g.lineTo(cx + 32, solY);
  g.closePath();
  g.fill();
  g.restore();

  if (uVacio < 0.98) {
    g.save();
    g.globalAlpha = 1 - 0.75 * uVacio;
    g.fillStyle = "#1D1714";
    g.strokeStyle = "rgba(242,166,90,0.45)";
    g.lineWidth = 4;
    g.beginPath();
    g.ellipse(cx, baseY, R + 36, 74, 0, 0, Math.PI * 2);
    g.fill();
    g.stroke();
    g.restore();
  }

  const rTierra = mez(124, 155, uVacio);
  k.tierra(g, cx, baseY - 24, rTierra, tFase * 0.06, 0, -1);

  // ---------------- LA CÚPULA 3D DE AIRE Y MOLÉCULAS
  if (alCupula > 0.01) {
    g.save();
    g.globalAlpha = alCupula;
    g.translate(cx, cupulaY);

    g.beginPath();
    g.arc(0, 0, R, Math.PI, 0);
    g.ellipse(0, 0, R, 56, 0, 0, Math.PI);
    g.closePath();

    if (azulFuerza > 0.01) {
      g.save();
      g.clip();
      const bg = g.createRadialGradient(0, -R * 0.55, 20, 0, 0, R * 1.1);
      bg.addColorStop(0, `rgba(170,222,255,${0.95 * azulFuerza})`);
      bg.addColorStop(0.5, `rgba(75,144,200,${0.76 * azulFuerza})`);
      bg.addColorStop(1, `rgba(28,64,104,${0.38 * azulFuerza})`);
      g.fillStyle = bg;
      g.fillRect(-R, -R, R * 2, R + 70);

      g.globalCompositeOperation = "lighter";
      for (const p of PARTICULAS) {
        const latP = 0.5 + 0.5 * Math.sin(tFase * 7 + p.f);
        k.brillo(g, p.dx, p.dy, p.s * 10, AZUL_RGB, azulFuerza * latP);
      }
      g.restore();
    }

    // Moléculas diatómicas 3D flotando dentro de la cúpula (neutras en rayos X, excitadas en azul cuando hay dispersión)
    for (const m of MOLECULAS_CUPULA) {
      const mx = m.dx + Math.sin(tFase * 1.8 + m.sem) * 8;
      const my = m.dy + Math.cos(tFase * 1.5 + m.sem) * 8;
      molecula3D(g, mx, my, m.r, tFase, m.sem, azulFuerza, pulso(t, Tazul, 0.2) + pulso(t, Tazul2, 0.2));
    }

    g.beginPath();
    g.arc(0, 0, R, Math.PI, 0);
    if (modoRayosX > 0.35) {
      g.setLineDash([16, 12]);
      g.strokeStyle = `rgba(${CINE.ambarRgb},0.9)`;
      g.lineWidth = 4;
    } else {
      g.strokeStyle = `rgba(241,236,232,${0.55 + 0.35 * azulFuerza})`;
      g.lineWidth = 5;
    }
    g.stroke();
    g.setLineDash([]);

    g.beginPath();
    g.ellipse(0, 0, R, 56, 0, 0, Math.PI * 2);
    g.strokeStyle = modoRayosX > 0.35 ? `rgba(${CINE.ambarRgb},0.75)` : "rgba(241,236,232,0.4)";
    g.lineWidth = 3.5;
    g.stroke();

    g.restore();
  }

  if (uVacio < 0.95) {
    g.save();
    g.globalAlpha = 1 - uVacio;
    telescopioRojo(g, 205, 1480, 1.08);
    g.restore();
  }

  if (modoRayosX > 0.05) {
    const esc = 1 + 0.08 * pulso(t, Tcolor, 0.2);
    k.rotuloCine(g, 540, 810, "aire puro", "0% COLOR", modoRayosX, 64 * esc);
  }
  const alNegro = suave(tramo(t, f2.t("todo") - 0.1, Tnegro + 0.05)) * (1 - suave(tramo(t, Tentonces - 0.05, Tentonces + 0.25)));
  if (alNegro > 0.01) {
    k.rotuloCine(g, 540, 910, "sin atmósfera", "CIELO NEGRO", alNegro, 64);
  }
  const alPregunta = suave(tramo(t, Tentonces + 0.05, Tdonde + 0.15));
  if (alPregunta > 0.01) {
    k.rotuloCine(g, 540, 810, "¿de dónde sale?", "EL AZUL", alPregunta, 68);
  }

  acabarCine(g, t, 0.45);
}
