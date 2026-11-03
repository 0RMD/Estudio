// Piezas compartidas de «Tu esencia no se diseña» en estilo ATOM (luz, energía, volumen y materiales).
import * as k from "#kit";

const { redondo, mez, tramo, suave, pulso, azar, lienzo, fijar, red, red2, manchas, causticas } = k;

export const SOL_RGB = "255,195,80";
export const CORAL_RGB = "255,88,120";
export const CIAN_RGB = "95,200,255";

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

const ESTRELLAS_ATOM = (() => {
  const az = azar(777);
  return Array.from({ length: 155 }, () => ({
    x: az() * 1080,
    y: az() * 1920,
    r: 1.4 + az() * 2.8,
    a: 0.3 + az() * 0.65,
    f: az() * 6.28,
  }));
})();

export function fondoAtom(g, t, calidez = 0.6) {
  const bg = g.createLinearGradient(0, 0, 0, 1920);
  bg.addColorStop(0, "#050711");
  bg.addColorStop(0.55, calidez > 0.5 ? "#131024" : "#0B162C");
  bg.addColorStop(1, "#070913");
  g.fillStyle = bg;
  g.fillRect(0, 0, 1080, 1920);

  const col = calidez > 0.5 ? CORAL_RGB : CIAN_RGB;
  const nx = 540 + Math.sin(t * 1.6) * 45;
  const ny = 1060 + Math.cos(t * 1.3) * 35;
  const ng = g.createRadialGradient(nx, ny, 40, nx, ny, 880);
  ng.addColorStop(0, `rgba(${col},0.28)`);
  ng.addColorStop(0.5, `rgba(${SOL_RGB},${0.15 * calidez})`);
  ng.addColorStop(1, "rgba(5,7,17,0)");
  g.fillStyle = ng;
  g.fillRect(0, 0, 1080, 1920);

  // Rayos de energía volumétrica en movimiento continuo
  k.rayos(g, t * 1.5, 1750, 0.38, 7, calidez > 0.5 ? SOL_RGB : CIAN_RGB);

  // Anillos de energía cósmica girando al fondo
  g.save();
  g.translate(540, 1080);
  g.rotate(t * 0.4);
  g.strokeStyle = `rgba(${col},0.22)`;
  g.lineWidth = 2.5;
  g.setLineDash([32, 22]);
  g.beginPath();
  g.arc(0, 0, 410, 0, Math.PI * 2);
  g.stroke();
  g.rotate(-t * 0.8);
  g.beginPath();
  g.arc(0, 0, 490, 0, Math.PI * 2);
  g.stroke();
  g.setLineDash([]);
  g.restore();

  for (const s of ESTRELLAS_ATOM) {
    const sx = ((s.x + t * 48) % 1080 + 1080) % 1080;
    const sy = ((s.y - t * 36) % 1920 + 1920) % 1920;
    const cent = 0.6 + 0.4 * Math.sin(t * 3.5 + s.f);
    g.fillStyle = `rgba(245,248,255,${s.a * cent})`;
    g.beginPath();
    g.arc(sx, sy, s.r, 0, Math.PI * 2);
    g.fill();
  }
}

export function acabarAtom(g, veloFuerza = 0.35) {
  if (veloFuerza > 0.01) {
    const vg = g.createLinearGradient(0, 140, 0, 620);
    vg.addColorStop(0, `rgba(5,7,17,${0.65 * veloFuerza})`);
    vg.addColorStop(0.6, `rgba(5,7,17,${0.38 * veloFuerza})`);
    vg.addColorStop(1, "rgba(5,7,17,0)");
    g.fillStyle = vg;
    g.fillRect(0, 0, 1080, 620);
  }
}

export function rotuloAtom(g, x, y, sub, grande, colorBorde = "#FBBF24", al = 1, tam = 62) {
  if (al <= 0.003) return;
  g.save();
  g.globalAlpha *= al;
  g.font = `700 ${tam * 0.42}px Figtree`;
  const w1 = g.measureText(sub).width;
  g.font = `800 ${tam}px Figtree`;
  const w2 = g.measureText(grande).width;
  const w = Math.max(w1, w2) + 76, h = tam * 1.72;
  redondo(g, x - w / 2, y - h / 2, w, h, 28);
  g.fillStyle = "rgba(8,11,24,0.86)";
  g.fill();
  g.strokeStyle = colorBorde;
  g.lineWidth = 3.5;
  g.stroke();

  g.textAlign = "center";
  g.fillStyle = "rgba(225,235,255,0.78)";
  g.font = `700 ${tam * 0.42}px Figtree`;
  g.fillText(sub, x, y - tam * 0.22);
  g.fillStyle = "#FFFFFF";
  g.font = `800 ${tam}px Figtree`;
  g.fillText(grande, x, y + tam * 0.62);
  g.restore();
}

export function esferaEsenciaAtom(g, x, y, r, t, fuerza = 1, kintsugi = 0) {
  if (fuerza <= 0.01) return;
  g.save();
  g.translate(x, y);

  const lat = 1 + 0.08 * latidoRitmo(t) + 0.04 * Math.sin(t * 4.5);
  const R = r * lat;

  k.brillo(g, 0, 0, R * 5.2, CORAL_RGB, 0.55 * fuerza);
  k.brillo(g, 0, 0, R * 3.6, SOL_RGB, 0.9 * fuerza);

  // Órbitas solares girando rápido alrededor de la esfera
  g.save();
  g.globalCompositeOperation = "lighter";
  for (let i = 0; i < 2; i++) {
    g.save();
    g.rotate(t * (1.1 + i * 0.6) * (i % 2 === 0 ? 1 : -1));
    g.strokeStyle = `rgba(${SOL_RGB},${0.5 * fuerza})`;
    g.lineWidth = 3.5;
    g.beginPath();
    g.ellipse(0, 0, R * (1.38 + i * 0.2), R * 0.55, 0, 0, Math.PI * 2);
    g.stroke();
    g.restore();
  }
  g.restore();

  g.save();
  g.beginPath();
  g.arc(0, 0, R, 0, Math.PI * 2);
  g.clip();

  const sg = g.createRadialGradient(-R * 0.3, -R * 0.3, R * 0.08, 0, 0, R);
  sg.addColorStop(0, "#FFFFFF");
  sg.addColorStop(0.28, "#FFF0A8");
  sg.addColorStop(0.62, "#F59E0B");
  sg.addColorStop(0.88, "#E11D48");
  sg.addColorStop(1, "#4C0519");
  g.fillStyle = sg;
  g.fillRect(-R, -R, R * 2, R * 2);

  g.globalCompositeOperation = "screen";
  g.globalAlpha = 0.55;
  const offC = (t * 95) % (R * 2);
  g.drawImage(causticas, -R - offC, -R, R * 4, R * 2.2);

  if (kintsugi > 0.02) {
    g.globalCompositeOperation = "lighter";
    g.globalAlpha = Math.min(1, kintsugi);
    g.strokeStyle = "#FFFFFF";
    g.lineWidth = 5;
    g.shadowColor = "#FBBF24";
    g.shadowBlur = 20;
    g.beginPath();
    g.moveTo(-R * 0.7, -R * 0.4);
    g.quadraticCurveTo(-R * 0.1, 0.05 * R, R * 0.75, R * 0.35);
    g.moveTo(R * 0.45, -R * 0.7);
    g.quadraticCurveTo(0, -R * 0.1, -R * 0.55, R * 0.65);
    g.stroke();
  }
  g.restore();

  g.strokeStyle = "rgba(255,245,200,0.9)";
  g.lineWidth = 4;
  g.beginPath();
  g.arc(0, 0, R, 0, Math.PI * 2);
  g.stroke();

  g.restore();
}

export function corazaMetalAtom(g, x, y, esc = 1, t = 0, grieta = 0) {
  g.save();
  g.translate(x, y + Math.sin(t * 2.8) * 9);
  g.rotate(Math.sin(t * 1.9) * 0.028);
  g.scale(esc, esc);

  k.brillo(g, 0, 0, 520, CIAN_RGB, 0.45 * (1 - 0.5 * grieta));

  const trazarCoraza = () => {
    g.beginPath();
    g.moveTo(0, -220);
    g.bezierCurveTo(145, -220, 180, -110, 164, 18);
    g.bezierCurveTo(148, 130, 82, 210, 0, 232);
    g.bezierCurveTo(-82, 210, -148, 130, -164, 18);
    g.bezierCurveTo(-180, -110, -145, -220, 0, -220);
    g.closePath();
  };

  g.save();
  trazarCoraza();
  k.metal(g, -180, 180, ["#1E293B", "#94A3B8", "#334155", "#E2E8F0", "#0F172A"]);
  g.clip();

  g.globalCompositeOperation = "multiply";
  g.globalAlpha = 0.32;
  g.drawImage(red, -190, -230, 380, 460);

  // Haz de escaneo láser cian recorriendo la coraza
  const yScan = -215 + ((t * 210) % 440);
  g.globalCompositeOperation = "lighter";
  g.globalAlpha = 0.55;
  const sg = g.createLinearGradient(0, yScan - 30, 0, yScan + 30);
  sg.addColorStop(0, "rgba(56,189,248,0)");
  sg.addColorStop(0.5, "rgba(56,189,248,0.75)");
  sg.addColorStop(1, "rgba(56,189,248,0)");
  g.fillStyle = sg;
  g.fillRect(-190, yScan - 30, 380, 60);

  g.globalCompositeOperation = "source-over";
  g.globalAlpha = 1;

  redondo(g, -118, -68, 236, 48, 24);
  g.fillStyle = "#0F172A";
  g.fill();
  g.strokeStyle = "#38BDF8";
  g.lineWidth = 3.5;
  g.stroke();

  if (grieta > 0.01) {
    const pts = [
      [6, -215],
      [-16, -125],
      [18, -45],
      [-20, 25],
      [14, 105],
      [-10, 175],
      [4, 228],
    ];
    const nSeg = pts.length - 1;
    const hasta = nSeg * Math.min(1, grieta);
    g.strokeStyle = "#F43F5E";
    g.lineWidth = 8;
    g.shadowColor = "#F43F5E";
    g.shadowBlur = 28;
    g.beginPath();
    g.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i <= nSeg; i++) {
      if (i <= hasta) g.lineTo(pts[i][0], pts[i][1]);
      else if (i - 1 < hasta) {
        const u = hasta - (i - 1);
        g.lineTo(mez(pts[i - 1][0], pts[i][0], u), mez(pts[i - 1][1], pts[i][1], u));
      }
    }
    g.stroke();
    g.strokeStyle = "#FFFBEB";
    g.lineWidth = 3;
    g.stroke();
  }

  g.restore();

  trazarCoraza();
  k.vidrio(g, -180, 180, 0.75);
  g.restore();
}
