// «El gasto grande es mantenerlo vivo.»
// Se vuelve al cerebro, ahora de cerca: por dentro, la red no para de dispararse aunque nadie piense nada.
// - «El gasto grande»: la red se enciende por todas partes, sin orden, continua.
// - «vivo»: todo late a la vez una vez, y sigue.
import * as k from "#kit";
import { v } from "#voz";
import { cerebro } from "../mundo.js";

export const desde = (v) => v.frase(4).inicio - 0.04;
export const entrada = "corte";

const f4 = v.frase(4);
const Tgrande = f4.t("grande"), Tvivo = f4.t("vivo");
const CX = 540, CY = 1090, R = 360;

// la red: nodos dentro del cerebro y los hilos que los unen (con semilla: siempre la misma red)
const az = k.azar(31);
const NODOS = [];
while (NODOS.length < 46) {
  const x = (az() * 2 - 1), y = (az() * 2 - 1) * 0.84;
  if (x * x + (y / 0.84) * (y / 0.84) > 0.86) continue;
  NODOS.push({ x, y, fase: az() * 6.28, vel: 2.4 + az() * 2.6 });
}
const HILOS = [];
for (let i = 0; i < NODOS.length; i++) {
  for (let j = i + 1; j < NODOS.length; j++) {
    const d = Math.hypot(NODOS[i].x - NODOS[j].x, NODOS[i].y - NODOS[j].y);
    if (d < 0.42) HILOS.push({ a: i, b: j, fase: az() * 6.28, vel: 1.6 + az() * 2.2 });
  }
}

export function dibuja(g, t) {
  g.fillStyle = k.CINE.fondo;
  g.fillRect(0, 0, 1080, 1920);
  const bg = g.createRadialGradient(CX, CY, 100, CX, CY, 1050);
  bg.addColorStop(0, "rgba(70,34,22,0.9)");
  bg.addColorStop(1, "rgba(8,7,9,0)");
  g.fillStyle = bg;
  g.fillRect(0, 0, 1080, 1920);

  const zoom = k.de(t, Tgrande - 0.5, Tvivo + 0.7, 1.0, 1.07);
  g.save();
  g.translate(CX, CY);
  g.scale(zoom, zoom);
  g.translate(-CX, -CY);

  cerebro(g, CX, CY, R, t, 0.55);

  // la red, encima del cerebro: siempre encendida, cada nodo a su ritmo
  const red = k.suave(k.tramo(t, Tgrande - 0.35, Tgrande + 0.25));
  const juntos = k.pulso(t, Tvivo + 0.10, 0.22);   // en «vivo» late todo a la vez
  g.save();
  g.globalAlpha = red;
  for (const h of HILOS) {
    const a = NODOS[h.a], b = NODOS[h.b];
    const u = 0.22 + 0.5 * (0.5 + 0.5 * Math.sin(t * h.vel + h.fase)) + 0.45 * juntos;
    g.strokeStyle = `rgba(255,214,164,${0.10 * Math.min(1, u)})`;
    g.lineWidth = 2.2;
    g.beginPath();
    g.moveTo(CX + a.x * R * 0.9, CY + a.y * R * 0.9);
    g.lineTo(CX + b.x * R * 0.9, CY + b.y * R * 0.9);
    g.stroke();
  }
  for (const n of NODOS) {
    const u = Math.max(0, Math.sin(t * n.vel + n.fase)) ** 3;
    const al = Math.min(1, 0.22 + 0.78 * u + juntos);
    k.brillo(g, CX + n.x * R * 0.9, CY + n.y * R * 0.9, 56 + 62 * u + 40 * juntos, "amarilla", al * 0.95);
  }
  g.restore();
  g.restore();

  k.brillo(g, CX, CY, R * 4.0, "sodio", 0.10 + 0.22 * juntos);
  k.vineta(g, 0.74);
  k.grano(g, t, 0.055);
}
