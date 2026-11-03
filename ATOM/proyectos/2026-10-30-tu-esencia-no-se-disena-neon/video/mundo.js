// Piezas compartidas de «Tu esencia no se diseña» en estilo Datos Neón.
import * as k from "#kit";

const { NEON, redondo, mez, tramo, suave, pulso, azar } = k;

const ACENTOS = [
  0.08, 0.80, 2.16, 2.88, 4.04, 4.80, 6.32, 6.64,
  7.68, 8.64, 9.92, 10.28, 11.16, 12.48, 13.44, 13.92,
  14.96, 15.92, 16.96,
  18.36, 19.12, 19.44, 20.72, 21.28, 22.48, 23.28, 24.72, 25.72,
  26.96, 28.04, 29.60, 30.20, 31.44,
  32.76, 33.52, 34.48, 35.25, 35.76,
  36.76, 37.60, 39.28, 39.92, 40.64,
  41.95, 42.56, 43.84, 44.32, 45.92,
  47.44, 49.08, 50.64, 51.60,
  52.92, 54.12, 54.64, 56.16, 57.00,
  58.12, 58.48, 59.32, 59.80, 60.88, 61.68, 62.32,
];

export function latidoRitmo(t) {
  const compas = Math.pow(0.5 + 0.5 * Math.sin((t * Math.PI * 2) / 0.545), 3) * 0.35;
  let acento = 0;
  for (let i = 0; i < ACENTOS.length; i++) {
    const dt = (t - ACENTOS[i]) / 0.14;
    if (Math.abs(dt) < 3) acento += Math.exp(-dt * dt);
  }
  return Math.min(1, compas + acento * 0.78);
}

const PULSOS_DATOS = (() => {
  const az = azar(512);
  return Array.from({ length: 48 }, () => ({
    x: 60 + Math.floor(az() * 16) * 60,
    y0: az() * 1920,
    vel: 180 + az() * 240,
    col: az() > 0.45 ? NEON.verde : NEON.ambar,
  }));
})();

// Fondo oscuro con rejilla técnica animada, flujos de datos y barrido de escáner de telemetría
export function fondoNeon(g, t = 0) {
  g.fillStyle = NEON.fondo;
  g.fillRect(0, 0, 1080, 1920);

  const paso = 60;
  const ox = (t * 68) % paso;
  const oy = (t * 54) % paso;
  g.save();
  g.strokeStyle = "#334155";
  g.globalAlpha = 0.65;
  g.lineWidth = 2;
  for (let x = ox; x < 1080; x += paso) {
    g.beginPath();
    g.moveTo(x, 0);
    g.lineTo(x, 1920);
    g.stroke();
  }
  for (let y = oy; y < 1920; y += paso) {
    g.beginPath();
    g.moveTo(0, y);
    g.lineTo(1080, y);
    g.stroke();
  }

  // Paquetes de telemetría corriendo por la matriz de fondo
  g.globalCompositeOperation = "lighter";
  for (const p of PULSOS_DATOS) {
    const py = ((p.y0 + t * p.vel) % 1920 + 1920) % 1920;
    g.strokeStyle = p.col;
    g.globalAlpha = 0.35;
    g.lineWidth = 3.5;
    g.beginPath();
    g.moveTo(p.x, py);
    g.lineTo(p.x, py + 42);
    g.stroke();
  }

  // Doble barrido de escáner luminoso recorriendo el panel de datos
  for (const [idx, colRgb] of [
    [0, NEON.verdeRgb],
    [1, NEON.magentaRgb],
  ]) {
    const yScan = 480 + (((t * 320 + idx * 620) % 1280 + 1280) % 1280);
    const sg = g.createLinearGradient(0, yScan - 75, 0, yScan + 75);
    sg.addColorStop(0, `rgba(${colRgb},0)`);
    sg.addColorStop(0.5, `rgba(${colRgb},0.26)`);
    sg.addColorStop(1, `rgba(${colRgb},0)`);
    g.globalAlpha = 1;
    g.fillStyle = sg;
    g.fillRect(40, yScan - 75, 1000, 150);
  }
  g.restore();
}

export function cabeceraNeon(g, tag, titulo, color = NEON.verde, al = 1) {
  if (al <= 0.01) return;
  g.save();
  g.globalAlpha *= al;
  k.panelNeon(g, 80, 560, 920, 130, color, 1);
  k.textoMono(g, tag, 120, 612, 26, NEON.tenue, { peso: 700 });
  k.textoMono(g, titulo, 120, 662, 42, color, { peso: 700, brillo: true });
  g.restore();
}
