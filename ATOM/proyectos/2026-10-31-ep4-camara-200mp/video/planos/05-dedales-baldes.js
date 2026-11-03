// Plano 05 (Frase 6):
// «Es como salir bajo una llovizna con 200 dedales finitos en vez de 12 baldes anchos.»
// Analogía física cotidiana estilo Sovera en un patio nocturno oscuro bajo llovizna real:
// - A la izquierda: una bandeja llena de dedales angostos que apenas atrapan una gotita.
// - A la derecha: baldes metálicos anchos que recogen toda la lluvia y se llenan de agua luminosa.
import * as k from "#kit";
import { v } from "#voz";
import {
  camino2D,
  capaSuperiorMarca,
  pildoraEstado,
  redondo,
  relojPlano,
  sinVista,
  vista,
  vineta,
} from "../mundo.js";

export const desde = (v) => v.frase(6).inicio - 0.04;

const { suave, tramo, entra, mez, azar } = k;

const LLUVIA = (() => {
  const az = azar(606);
  const arr = [];
  for (let i = 0; i < 64; i++) {
    arr.push({ x: az() * 1160 - 40, fase: az(), vel: 0.9 + az() * 0.55, largo: 26 + az() * 24 });
  }
  return arr;
})();

export function dibuja(g, t) {
  const f6 = v.frase(6);
  const t0 = f6.inicio - 0.04;
  const tCorte = v.frase(7).inicio - 0.04;
  const tr = relojPlano(t, tCorte, 0.16, 0.24);

  const tDedales = f6.t("dedales");
  const t12 = f6.t("12");
  const tBaldes = f6.t("baldes");
  const tAnchos = f6.t("anchos");

  // Cielo nocturno lluvioso con tablón de madera en la parte baja
  g.save();
  sinVista(g);
  const bg = g.createLinearGradient(0, 0, 0, 1920);
  bg.addColorStop(0, "#050a14");
  bg.addColorStop(0.65, "#0d1f33");
  bg.addColorStop(1, "#081320");
  g.fillStyle = bg;
  g.fillRect(0, 0, 1080, 1920);
  k.brillo(g, 540, 1220, 920, "56, 189, 248", 0.22);
  g.restore();

  // Paneo desde los dedales finitos (izquierda) hacia los baldes anchos (derecha) y plano completo final
  const cam = camino2D([
    [t0, [1.1, 380, 1180]],
    [tDedales + 0.15, [1.1, 390, 1180]],
    [tBaldes, [1.1, 700, 1180]],
    [tCorte - 0.18, [1.0, 540, 1160]],
  ]);
  const [Z, cx, cy] = cam(tr);

  const uLlena = suave(tramo(tr, t0 + 0.2, tAnchos + 0.2));

  g.save();
  vista(g, Z, cx, cy);

  // Hilos plateados de llovizna cayendo en diagonal suave
  g.save();
  g.strokeStyle = "rgba(186, 230, 253, 0.42)";
  g.lineWidth = 2.5;
  g.lineCap = "round";
  for (const gt of LLUVIA) {
    const fy = ((tr * gt.vel + gt.fase) % 1 + 1) % 1;
    const gx = gt.x - fy * 45;
    const gy = 540 + fy * 940;
    g.beginPath();
    g.moveTo(gx, gy);
    g.lineTo(gx - 6, gy + gt.largo);
    g.stroke();
  }
  g.restore();

  // Mesa rústica de madera del patio (y = 1440..1640)
  redondo(g, 36, 1445, 1008, 150, 24);
  const mg = g.createLinearGradient(0, 1445, 0, 1595);
  mg.addColorStop(0, "#5c3a21");
  mg.addColorStop(0.3, "#7c4d2b");
  mg.addColorStop(1, "#3b2313");
  g.fillStyle = mg;
  g.fill();
  g.strokeStyle = "rgba(255, 225, 190, 0.22)";
  g.lineWidth = 3;
  g.stroke();

  // ---------------- IZQUIERDA: BANDEJA DE 200 DEDALES FINITOS ----------------
  redondo(g, 72, 915, 425, 92, 20);
  g.fillStyle = "rgba(15, 23, 42, 0.92)";
  g.fill();
  g.strokeStyle = "#f87171";
  g.lineWidth = 3;
  g.stroke();
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.font = "800 28px Figtree";
  g.fillStyle = "#fca5a5";
  g.fillText("200 DEDALES FINITOS", 284, 946);
  g.font = "700 21px Figtree";
  g.fillStyle = "#cbd5e1";
  g.fillText("Casi secos (píxeles diminutos)", 284, 981);

  // Fila doble de 14 dedales angostos sobre la mesa izquierda
  for (let i = 0; i < 12; i++) {
    const dx = 94 + i * 34;
    const dy = 1445;
    const dw = 22;
    const dh = 66;

    redondo(g, dx - dw / 2, dy - dh, dw, dh, 5);
    g.fillStyle = "#64748b";
    g.fill();
    g.strokeStyle = "#cbd5e1";
    g.lineWidth = 1.5;
    g.stroke();

    // Apenas un hilito mínimo de agua al fondo
    g.fillStyle = "#38bdf8";
    g.fillRect(dx - dw / 2 + 3, dy - 10, dw - 6, 7);
  }

  // ---------------- DERECHA: BALDES METÁLICOS ANCHOS LLENÁNDOSE DE AGUA ----------------
  const uDestacaBaldes = suave(tramo(tr, t12 - 0.25, tBaldes + 0.25));
  redondo(g, 565, 915, 445, 92, 20);
  g.fillStyle = "rgba(8, 34, 32, 0.94)";
  g.fill();
  g.strokeStyle = "#22e39b";
  g.lineWidth = 3.5;
  g.stroke();
  g.font = "800 28px Figtree";
  g.fillStyle = "#6ee7b7";
  g.fillText("12 BALDES ANCHOS", 787, 946);
  g.font = "700 21px Figtree";
  g.fillStyle = "#d1fae5";
  g.fillText("Atrapan mucha lluvia (píxeles grandes)", 787, 981);

  // 3 grandes baldes galvanizados anchos en primer plano representando la boca ancha
  for (let b = 0; b < 3; b++) {
    const bx = 642 + b * 146;
    const by = 1445;
    const wTop = 128;
    const wBot = 98;
    const bH = 215;

    if (uDestacaBaldes > 0.05) {
      k.brillo(g, bx, by - bH * 0.55, 190, "56, 189, 248", uDestacaBaldes * 0.45);
    }

    // Cuerpo trapezoidal del balde
    g.save();
    g.beginPath();
    g.moveTo(bx - wTop / 2, by - bH);
    g.lineTo(bx + wTop / 2, by - bH);
    g.lineTo(bx + wBot / 2, by);
    g.lineTo(bx - wBot / 2, by);
    g.closePath();
    g.fillStyle = "#1e293b";
    g.fill();
    g.clip();

    // Nivel alto de agua azul luminosa subiendo dentro del balde ancho
    const hAgua = bH * (0.28 + 0.58 * uLlena);
    const yAgua = by - hAgua + Math.sin(tr * 7 + b) * 4;
    const ag = g.createLinearGradient(0, yAgua, 0, by);
    ag.addColorStop(0, "#7dd3fc");
    ag.addColorStop(0.3, "#38bdf8");
    ag.addColorStop(1, "#0284c7");
    g.fillStyle = ag;
    g.fillRect(bx - wTop, yAgua, wTop * 2, hAgua + 20);
    g.restore();

    // Borde metálico del balde y asa
    g.beginPath();
    g.moveTo(bx - wTop / 2, by - bH);
    g.lineTo(bx + wTop / 2, by - bH);
    g.lineTo(bx + wBot / 2, by);
    g.lineTo(bx - wBot / 2, by);
    g.closePath();
    g.strokeStyle = "#e2e8f0";
    g.lineWidth = 4;
    g.stroke();
  }

  g.restore();

  sinVista(g);
  const alPil = entra(tramo(tr, tBaldes - 0.12, tAnchos + 0.16));
  pildoraEstado(g, 540, 1710, "BOCA MÁS ANCHA = MUCHA MÁS LUZ ATRAPADA", "56, 189, 248", alPil, 36);

  vineta(g, 0.54);
  capaSuperiorMarca(g, 0.62);
}
