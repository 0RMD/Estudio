// Los estilos visuales extra de ATOM Élite: Cine Nocturno y Datos Neón (guía: packs/estilos.md).
// Paletas y piezas para dibujar en cada estilo. Todo sale de t y de semillas: nada de Math.random.
import { GlobalFonts } from "@napi-rs/canvas";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { azar, fijar, lienzo, redondo } from "./base.js";

const LETRA = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "letra");
for (const p of ["Medium", "Bold"]) {
  const f = join(LETRA, `JetBrainsMono-${p}.ttf`);
  if (existsSync(f)) GlobalFonts.registerFromPath(f, "JetBrains Mono");
}

// ---------------------------------------------------------------- las paletas
// Cine Nocturno: de noche, como un documental; casi negro cálido, luz de farola ámbar, un rojo protagonista.
export const CINE = {
  fondo: "#0B0A0D", fondo2: "#17120F", niebla: "26,19,16",
  ambar: "#F2A65A", ambarRgb: "242,166,90", naranja: "#E8833A", rojo: "#C9372C", crema: "#F1ECE8",
  verdeFrio: "#2F6F6A", gris: "#5E534B", texto: "#F4F0EE",
};
// Datos Neón: un panel de datos de noche; azul casi negro, verde neón (lo bueno, lo que sube), magenta (lo que
// cuesta, lo que baja), ámbar para lo que se señala, y letra monoespaciada.
export const NEON = {
  fondo: "#0C0F16", panel: "#121821", linea: "#2A313B", tenue: "#5B6573",
  verde: "#22E39B", verdeRgb: "34,227,155", magenta: "#FF2E88", magentaRgb: "255,46,136",
  ambar: "#F5B83D", ambarRgb: "245,184,61", texto: "#E6EDF5", mono: "JetBrains Mono",
};

// ---------------------------------------------------------------- Cine Nocturno
// Grano de película: cambia cada fotograma (semilla = fotograma), suave. Va al final de todo.
const granos = [0, 1, 2, 3].map((s) => {
  const c = lienzo(360, 640), g = c.getContext("2d"), r = azar(900 + s), img = g.createImageData(360, 640);
  for (let i = 0; i < img.data.length; i += 4) { const v = 128 + (r() - 0.5) * 110; img.data[i] = img.data[i + 1] = img.data[i + 2] = v; img.data[i + 3] = 255; }
  g.putImageData(img, 0, 0);
  return fijar(c);
});
export function grano(g, t, fuerza = 0.07) {
  g.save();
  g.globalAlpha = fuerza; g.globalCompositeOperation = "overlay";
  g.drawImage(granos[Math.floor(t * 24) % 4], 0, 0, 1080, 1920);
  g.restore();
}

// Viñeta: oscurece los bordes, centra la mirada. fuerza 0..1.
export function vineta(g, fuerza = 0.65, cx = 540, cy = 980) {
  const gr = g.createRadialGradient(cx, cy, 300, cx, cy, 1250);
  gr.addColorStop(0, "rgba(0,0,0,0)"); gr.addColorStop(1, `rgba(0,0,0,${fuerza})`);
  g.save(); g.fillStyle = gr; g.fillRect(0, 0, 1080, 1920); g.restore();
}

// Un charco de luz cálida (farola, lámpara, faro) en (x, y), de radio r. Se suma a lo de debajo.
export function luzCalida(g, x, y, r = 420, al = 1, color = CINE.ambarRgb) {
  if (al <= 0.003) return;
  const gr = g.createRadialGradient(x, y, 0, x, y, r);
  gr.addColorStop(0, `rgba(${color},${0.55 * al})`); gr.addColorStop(0.35, `rgba(${color},${0.22 * al})`); gr.addColorStop(1, `rgba(${color},0)`);
  g.save(); g.globalCompositeOperation = "lighter"; g.fillStyle = gr; g.fillRect(x - r, y - r, 2 * r, 2 * r); g.restore();
}

// Un fondo nocturno con profundidad: degradado cálido de abajo arriba y niebla suave.
export function nocheCine(g, brillo = 1) {
  const gr = g.createLinearGradient(0, 0, 0, 1920);
  gr.addColorStop(0, CINE.fondo); gr.addColorStop(0.65, CINE.fondo2); gr.addColorStop(1, "#21170F");
  g.fillStyle = gr; g.fillRect(0, 0, 1080, 1920);
  const n = g.createRadialGradient(540, 1250, 0, 540, 1250, 900);
  n.addColorStop(0, `rgba(${CINE.niebla},${0.5 * brillo})`); n.addColorStop(1, `rgba(${CINE.niebla},0)`);
  g.fillStyle = n; g.fillRect(0, 0, 1080, 1920);
}

// Un dato de documental: «se llama» pequeño encima y la palabra grande, en una píldora oscura.
export function rotuloCine(g, x, y, pequeño, grande, al = 1, tam = 64) {
  if (al <= 0.003) return;
  g.save(); g.globalAlpha *= al;
  g.font = `700 ${tam * 0.42}px Figtree`; const w1 = g.measureText(pequeño).width;
  g.font = `800 ${tam}px Figtree`; const w2 = g.measureText(grande).width;
  const w = Math.max(w1, w2) + 70, h = tam * 1.7;
  redondo(g, x - w / 2, y - h / 2, w, h, 26); g.fillStyle = "rgba(11,10,13,0.78)"; g.fill();
  g.strokeStyle = `rgba(${CINE.ambarRgb},0.55)`; g.lineWidth = 3; g.stroke();
  g.textAlign = "center"; g.fillStyle = "rgba(244,240,238,0.7)"; g.font = `700 ${tam * 0.42}px Figtree`;
  g.fillText(pequeño, x, y - tam * 0.22);
  g.fillStyle = CINE.texto; g.font = `800 ${tam}px Figtree`; g.fillText(grande, x, y + tam * 0.62);
  g.restore();
}

// ---------------------------------------------------------------- Datos Neón
// La rejilla de fondo de un panel, con su desvanecido. paso en px.
export function rejilla(g, x, y, w, h, paso = 60, al = 1) {
  g.save(); g.globalAlpha *= 0.5 * al; g.strokeStyle = NEON.linea; g.lineWidth = 1.5;
  for (let i = x; i <= x + w + 0.1; i += paso) { g.beginPath(); g.moveTo(i, y); g.lineTo(i, y + h); g.stroke(); }
  for (let j = y; j <= y + h + 0.1; j += paso) { g.beginPath(); g.moveTo(x, j); g.lineTo(x + w, j); g.stroke(); }
  g.restore();
}

// Un panel oscuro con borde fino (y borde de color si `color`).
export function panelNeon(g, x, y, w, h, color = null, al = 1) {
  if (al <= 0.003) return;
  g.save(); g.globalAlpha *= al;
  redondo(g, x, y, w, h, 22); g.fillStyle = NEON.panel; g.fill();
  g.lineWidth = color ? 4 : 2; g.strokeStyle = color || NEON.linea; g.stroke();
  if (color) { g.shadowColor = color; g.shadowBlur = 30; g.stroke(); }
  g.restore();
}

// Una línea de neón por los puntos [[x, y], ...], dibujada hasta `progreso` (0..1), con brillo y punto en la punta.
export function lineaNeon(g, puntos, color = NEON.verde, ancho = 7, progreso = 1) {
  if (progreso <= 0 || puntos.length < 2) return;
  const largos = [0];
  for (let i = 1; i < puntos.length; i++) largos.push(largos[i - 1] + Math.hypot(puntos[i][0] - puntos[i - 1][0], puntos[i][1] - puntos[i - 1][1]));
  const hasta = largos[largos.length - 1] * Math.min(1, progreso);
  const camino = [puntos[0]];
  let punta = puntos[0];
  for (let i = 1; i < puntos.length; i++) {
    if (largos[i] <= hasta) { camino.push(puntos[i]); punta = puntos[i]; continue; }
    const u = (hasta - largos[i - 1]) / (largos[i] - largos[i - 1]);
    punta = [puntos[i - 1][0] + (puntos[i][0] - puntos[i - 1][0]) * u, puntos[i - 1][1] + (puntos[i][1] - puntos[i - 1][1]) * u];
    camino.push(punta); break;
  }
  g.save(); g.lineCap = "round"; g.lineJoin = "round";
  for (const [w, a, b] of [[ancho * 4, 0.12, 40], [ancho, 1, 18]]) {
    g.beginPath(); camino.forEach((p, i) => (i ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1])));
    g.strokeStyle = color; g.globalAlpha = a; g.lineWidth = w; g.shadowColor = color; g.shadowBlur = b; g.stroke();
  }
  g.globalAlpha = 1; g.shadowBlur = 30; g.fillStyle = "#FFFFFF";
  g.beginPath(); g.arc(punta[0], punta[1], ancho * 1.3, 0, Math.PI * 2); g.fill();
  g.restore();
}

// Una barra horizontal de neón que crece hasta `valor` (0..1) de `w`.
export function barraNeon(g, x, y, w, h, valor, color = NEON.verde) {
  g.save();
  redondo(g, x, y, w, h, h / 2); g.fillStyle = "rgba(255,255,255,0.05)"; g.fill();
  if (valor > 0.002) {
    redondo(g, x, y, Math.max(h, w * Math.min(1, valor)), h, h / 2);
    g.fillStyle = color; g.shadowColor = color; g.shadowBlur = 26; g.fill();
  }
  g.restore();
}

// Texto monoespaciado (cifras, rótulos de panel). brillo: halo del color.
export function textoMono(g, texto, x, y, tam = 44, color = NEON.texto, { alinear = "left", peso = 700, brillo = false, al = 1 } = {}) {
  if (al <= 0.003) return;
  g.save(); g.globalAlpha *= al;
  g.font = `${peso} ${tam}px "JetBrains Mono", monospace`; g.textAlign = alinear; g.textBaseline = "alphabetic";
  if (brillo) { g.shadowColor = color; g.shadowBlur = 22; }
  g.fillStyle = color; g.fillText(texto, x, y);
  g.restore();
}

// Una etiqueta de dato con borde de color («-5 min», «71 km/h»).
export function chipNeon(g, texto, x, y, color = NEON.magenta, tam = 40, al = 1) {
  if (al <= 0.003) return;
  g.save(); g.globalAlpha *= al;
  g.font = `700 ${tam}px "JetBrains Mono", monospace`;
  const w = g.measureText(texto).width + 40, h = tam + 26;
  redondo(g, x - w / 2, y - h / 2, w, h, 10); g.fillStyle = "rgba(12,15,22,0.85)"; g.fill();
  g.strokeStyle = color; g.lineWidth = 3; g.shadowColor = color; g.shadowBlur = 16; g.stroke();
  g.shadowBlur = 0; g.fillStyle = color; g.textAlign = "center"; g.fillText(texto, x, y + tam * 0.36);
  g.restore();
}
