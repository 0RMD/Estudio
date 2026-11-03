// Lo que comparten los planos: el cerebro (la misma cosa, del mismo tamaño, en todos los planos donde sale) y la
// bombilla. Todo se dibuja desde t; nada se guarda de un fotograma al siguiente.
import * as k from "#kit";

const az = k.azar(7);
// Los pliegues del cerebro: una vez, con semilla, para que sean siempre los mismos.
const PLIEGUES = [];
for (let i = 0; i < 26; i++) {
  const a = az() * Math.PI * 2, r = 0.30 + az() * 0.52;
  PLIEGUES.push({ x: Math.cos(a) * r, y: Math.sin(a) * r * 0.82, g: 0.16 + az() * 0.22, rot: az() * Math.PI, w: 0.5 + az() * 0.6 });
}

// El cerebro: una masa cálida con pliegues, latiendo. calor 0..1 sube el brillo que suelta.
export function cerebro(g, x, y, r, t, calor = 1) {
  const late = 1 + 0.022 * Math.sin(t * 3.1) + 0.012 * Math.sin(t * 5.3 + 1);
  const R = r * late;
  g.save();
  g.translate(x, y);

  g.beginPath();
  g.ellipse(0, -R * 0.06, R, R * 0.86, 0, 0, Math.PI * 2);
  const base = g.createRadialGradient(-R * 0.25, -R * 0.35, R * 0.1, 0, 0, R * 1.08);
  base.addColorStop(0, "rgba(255,214,176,0.95)");
  base.addColorStop(0.45, "rgba(226,140,96,0.95)");
  base.addColorStop(1, "rgba(120,52,44,0.95)");
  g.fillStyle = base;
  g.fill();

  g.save();
  g.clip();
  g.strokeStyle = "rgba(92,38,34,0.55)";
  g.lineWidth = R * 0.055;
  g.beginPath();
  g.moveTo(0, -R * 0.92);
  g.bezierCurveTo(R * 0.10, -R * 0.3, -R * 0.10, R * 0.25, 0, R * 0.84);
  g.stroke();

  g.lineCap = "round";
  for (const p of PLIEGUES) {
    g.save();
    g.translate(p.x * R, p.y * R);
    g.rotate(p.rot + 0.08 * Math.sin(t * 0.6 + p.x * 4));
    g.strokeStyle = `rgba(150,64,54,${0.42 + 0.18 * p.g})`;
    g.lineWidth = R * 0.045 * p.w;
    g.beginPath();
    g.arc(0, 0, R * p.g, -0.2, Math.PI * 1.25);
    g.stroke();
    g.strokeStyle = `rgba(255,206,168,${0.20 + 0.14 * p.g})`;
    g.lineWidth = R * 0.022 * p.w;
    g.beginPath();
    g.arc(0, -R * 0.012, R * p.g, -0.15, Math.PI * 1.15);
    g.stroke();
    g.restore();
  }
  g.restore();

  g.beginPath();
  g.moveTo(-R * 0.16, R * 0.68);
  g.quadraticCurveTo(-R * 0.08, R * 1.06, R * 0.06, R * 1.02);
  g.quadraticCurveTo(R * 0.20, R * 0.98, R * 0.16, R * 0.66);
  g.fillStyle = "rgba(176,92,70,0.95)";
  g.fill();

  g.restore();

  k.brillo(g, x, y - r * 0.05, r * 4.2, "sodio", 0.16 * calor);
  k.brillo(g, x, y - r * 0.05, r * 2.1, "naranja", 0.22 * calor);
}

// La bombilla: el cristal, el filamento y el casquillo. u 0..1 es cuánto está encendida.
export function bombilla(g, x, y, s, u) {
  const R = 150 * s;
  g.save();
  g.translate(x, y);

  g.fillStyle = "#4a443e";
  k.redondo(g, -R * 0.30, -R * 1.62, R * 0.60, R * 0.52, R * 0.08);
  g.fill();
  for (let i = 0; i < 3; i++) {
    g.fillStyle = "rgba(26,23,20,0.75)";
    g.fillRect(-R * 0.30, -R * 1.52 + i * R * 0.15, R * 0.60, R * 0.05);
  }

  g.beginPath();
  g.moveTo(-R * 0.26, -R * 1.14);
  g.quadraticCurveTo(-R * 1.0, -R * 0.78, -R * 0.86, R * 0.06);
  g.quadraticCurveTo(-R * 0.62, R * 0.92, 0, R * 0.98);
  g.quadraticCurveTo(R * 0.62, R * 0.92, R * 0.86, R * 0.06);
  g.quadraticCurveTo(R * 1.0, -R * 0.78, R * 0.26, -R * 1.14);
  g.closePath();
  const vidrio = g.createRadialGradient(-R * 0.22, -R * 0.1, R * 0.05, 0, 0, R * 1.05);
  vidrio.addColorStop(0, `rgba(255,236,196,${0.10 + 0.72 * u})`);
  vidrio.addColorStop(0.6, `rgba(220,190,150,${0.06 + 0.26 * u})`);
  vidrio.addColorStop(1, `rgba(150,160,180,${0.13 + 0.05 * u})`);
  g.fillStyle = vidrio;
  g.fill();
  g.strokeStyle = `rgba(226,232,240,${0.26 + 0.22 * u})`;
  g.lineWidth = R * 0.035;
  g.stroke();

  g.strokeStyle = `rgba(255,${Math.round(170 + 70 * u)},${Math.round(70 + 90 * u)},${0.35 + 0.65 * u})`;
  g.lineWidth = R * 0.05;
  g.lineCap = "round";
  g.beginPath();
  g.moveTo(-R * 0.17, -R * 1.02);
  g.lineTo(-R * 0.17, -R * 0.42);
  for (let i = 0; i < 7; i++) g.lineTo(i % 2 ? -R * 0.19 : R * 0.19, -R * 0.42 + i * R * 0.095);
  g.lineTo(R * 0.17, -R * 0.42);
  g.lineTo(R * 0.17, -R * 1.02);
  g.stroke();
  g.restore();

  if (u > 0.01) {
    k.brillo(g, x, y - R * 0.18, R * 1.5, "amarilla", 0.85 * u);
    k.luzCalida(g, x, y - R * 0.18, R * 4.6, 0.92 * u);
  }
}

// Una barra de gasto tumbada, con su nombre encima. valor 0..1 de lo lleno que está.
export function barra(g, x, y, w, h, valor, nombre, color = "242,166,90") {
  g.save();
  k.redondo(g, x, y, w, h, h / 2);
  g.fillStyle = "rgba(255,255,255,0.09)";
  g.fill();
  const lleno = Math.max(0, Math.min(1, valor)) * w;
  if (lleno > 2) {
    k.redondo(g, x, y, Math.max(h, lleno), h, h / 2);
    g.fillStyle = `rgba(${color},0.95)`;
    g.fill();
  }
  g.font = "600 40px Figtree";
  g.fillStyle = "rgba(241,236,232,0.82)";
  g.textBaseline = "alphabetic";
  g.fillText(nombre, x, y - 24);
  g.restore();
}
