// Lo que comparten portada.mjs y carrusel.mjs: los colores de la marca, el fotograma sin subtítulos y el texto grande
// con su palabra clave.
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { createCanvas } from "@napi-rs/canvas";
import { ALTO, ANCHO, RAIZ } from "./comun.mjs";
import { dibujar, preparar } from "./cuadro.mjs"; // carga también la letra Figtree
export { preparar };

// La marca: marca.json en la carpeta de ATOM (lo escribe el pack de portadas la primera vez). De ahí solo se toman
// `acento` (el color de la palabra clave) y `estilo`: el resto es fijo para que todo se lea bien.
// oscuro: fondo de la banda; acento: la palabra clave; claro: la tarjeta del estilo limpio; tinta_clara: el texto
// sobre esa tarjeta; sticker y sticker_texto: la etiqueta. estilo: impacto, limpio o bloque.
export const MARCA_ATOM = { oscuro: "#28163C", acento: "#FF3B30", texto: "#FFFFFF", claro: "#F7F4FF", tinta_clara: "#120A2A", sticker: "#FFCC00", sticker_texto: "#0B1838", estilo: "impacto" };

export function marca(extra = {}) {
  const f = join(RAIZ, "marca.json");
  let m = { ...MARCA_ATOM };
  if (existsSync(f)) {
    try { const j = JSON.parse(readFileSync(f, "utf8")); if (j.acento) m.acento = j.acento; if (j.estilo) m.estilo = j.estilo; }
    catch (e) { throw new Error(`marca.json no se puede leer: ${e.message}`); }
  }
  for (const [k, v] of Object.entries(extra)) if (v !== undefined && v !== true) m[k] = String(v);
  if (!["impacto", "limpio", "bloque"].includes(m.estilo)) throw new Error(`Estilo «${m.estilo}»: usa impacto, limpio o bloque.`);
  return m;
}

export const rgb = (h) => { const x = String(h).replace("#", ""); return [0, 2, 4].map((i) => parseInt(x.slice(i, i + 2), 16)); };
export const rgba = (h, a) => `rgba(${rgb(h).join(",")},${a})`;

// El fotograma del segundo t, sin subtítulos (ATOM lo dibuja sin ellos: nada que tapar).
export function fotograma(proy, est, t) {
  const c = createCanvas(ANCHO, ALTO);
  c.getContext("2d").drawImage(dibujar(proy, est, Math.max(0, Math.min(proy.duracion - 0.01, t)), { subtitulos: false }), 0, 0);
  return c;
}

const limpia = (p) => p.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9ñ]/g, "");
const PEGA = /^[.,;:!?…»)\]]+$/; // signos que van pegados a la palabra de antes

// Palabras con su marca: "*palabra clave*" o la lista `marcar`.
export function trocear(texto, marcar = []) {
  const lista = new Set((Array.isArray(marcar) ? marcar : String(marcar).split(",")).map(limpia).filter(Boolean));
  const out = [];
  for (const tr of String(texto).split(/(\*[^*]+\*)/).filter(Boolean)) {
    const conAst = tr.startsWith("*") && tr.endsWith("*");
    for (const p of tr.replace(/\*/g, "").split(/\s+/).filter(Boolean)) {
      if (PEGA.test(p) && out.length) { out[out.length - 1].p += p; continue; }
      out.push({ p, marca: conAst || lista.has(limpia(p)) });
    }
  }
  if (!out.some((x) => x.marca) && out.length) out[out.length - 1].marca = true;
  // una frase clave de varias palabras va junta (una sola caja, sin partirse entre líneas)
  const juntas = [];
  for (const x of out) {
    const prev = juntas[juntas.length - 1];
    if (prev && prev.marca && x.marca) prev.p += " " + x.p; else juntas.push({ ...x });
  }
  return juntas;
}

function lineas(g, trozos, peso, tam, ancho, pad) {
  g.font = `${peso} ${tam}px Figtree`;
  const sp = g.measureText(" ").width, out = [];
  let l = [], w = 0;
  for (const t of trozos) {
    const pw = g.measureText(t.p).width + (t.marca && pad ? 2 * pad : 0);
    if (l.length && w + sp + pw > ancho) { out.push(l); l = []; w = 0; }
    w += (l.length ? sp : 0) + pw; l.push({ ...t, pw });
  }
  if (l.length) out.push(l);
  return out;
}

// Texto grande. modo: "caja" (la palabra clave en una caja del color de acento) o "color" (la palabra clave en el
// color de acento, con su sombra). alinear: "centro" (x es el centro) o "izquierda" (x es el borde izquierdo).
// Si `dibujar` es false solo mide. Devuelve { alto, lineas, tam }.
export function titular(g, texto, { x = ANCHO / 2, y0 = 0, ancho = 900, tam = 120, min = 60, maxLineas = 4, marcar = [], acento = "#FFD23F", tinta = "#120A2A", color = "#FFFFFF", modo = "caja", alinear = "centro", peso = 800, sombra = true, dibujar = true }) {
  const trozos = trocear(texto, marcar);
  const pad = modo === "caja" ? 0 : 0;
  let L, t = tam;
  // baja el tamaño hasta que quepa en maxLineas y ninguna línea pase del ancho (una frase clave larga va en una sola
  // caja: si no cabe, se encoge por debajo de min lo que haga falta)
  const anchoDe = (l) => l.reduce((s, w) => s + w.pw, 0) + (l.length - 1) * g.measureText(" ").width;
  for (; t > 36; t -= 4) {
    L = lineas(g, trozos, peso, t, ancho, modo === "caja" ? t * 0.17 : 0);
    if (L.every((l) => anchoDe(l) <= ancho) && (L.length <= maxLineas || t <= min)) break;
  }
  t = Math.max(t, 36);
  const padC = modo === "caja" ? t * 0.17 : 0;
  L = lineas(g, trozos, peso, t, ancho, padC);
  const alto = L.length * t * 1.12;
  if (!dibujar) return { alto, lineas: L.length, tam: t };
  g.save();
  g.font = `${peso} ${t}px Figtree`;
  g.textBaseline = "alphabetic";
  const sp = g.measureText(" ").width;
  L.forEach((linea, i) => {
    const total = linea.reduce((a, b) => a + b.pw, 0) + sp * (linea.length - 1);
    let cx = alinear === "izquierda" ? x : x - total / 2;
    const base = y0 + t * 0.92 + i * t * 1.12;
    for (const w of linea) {
      if (w.marca && modo === "caja") {
        g.save();
        g.fillStyle = acento;
        if (sombra) { g.shadowColor = "rgba(0,0,0,0.45)"; g.shadowBlur = 30; g.shadowOffsetY = 10; }
        redondeado(g, cx, base - t * 0.86, w.pw, t * 1.06, t * 0.2); g.fill();
        g.restore();
        g.fillStyle = tinta; g.fillText(w.p, cx + padC, base);
      } else if (w.marca) {
        const [r, gg, b] = rgb(acento);
        g.save();
        g.fillStyle = `rgb(${(r * 0.45) | 0},${(gg * 0.45) | 0},${(b * 0.45) | 0})`;
        g.fillText(w.p, cx, base + t * 0.045);
        g.fillStyle = acento; g.fillText(w.p, cx, base);
        g.restore();
      } else {
        if (sombra) { g.shadowColor = "rgba(0,0,0,0.7)"; g.shadowBlur = 22; g.shadowOffsetY = 6; }
        g.fillStyle = color; g.fillText(w.p, cx, base);
        g.shadowColor = "rgba(0,0,0,0)"; g.shadowBlur = 0; g.shadowOffsetY = 0;
      }
      cx += w.pw + sp;
    }
  });
  g.restore();
  return { alto, lineas: L.length, tam: t };
}

export function redondeado(g, x, y, w, h, r) {
  g.beginPath();
  g.moveTo(x + r, y); g.lineTo(x + w - r, y); g.quadraticCurveTo(x + w, y, x + w, y + r);
  g.lineTo(x + w, y + h - r); g.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  g.lineTo(x + r, y + h); g.quadraticCurveTo(x, y + h, x, y + h - r);
  g.lineTo(x, y + r); g.quadraticCurveTo(x, y, x + r, y);
  g.closePath();
}

// Un velo vertical del color `hex`: sólido en [a, b] y desvanecido fuera.
export function velo(g, a, b, hex, fuerza = 0.72, ancho = ANCHO) {
  const m = 220, h = b - a + 2 * m, gr = g.createLinearGradient(0, a - m, 0, b + m);
  gr.addColorStop(0, rgba(hex, 0)); gr.addColorStop(m / h, rgba(hex, fuerza));
  gr.addColorStop(1 - m / h, rgba(hex, fuerza)); gr.addColorStop(1, rgba(hex, 0));
  g.fillStyle = gr; g.fillRect(0, a - m, ancho, h);
}

// Una etiqueta tipo sticker (puede tener dos líneas con «|»), centrada en x, arriba en y.
export function etiqueta(g, texto, { x = ANCHO / 2, y, tam = 56, fondo = "#E04FA6", tinta = "#FFFFFF", borde = null, giro = 0, sombraColor = null }) {
  const filas = String(texto).split("|").map((s) => s.trim()).filter(Boolean);
  g.save();
  g.font = `800 ${tam}px Figtree`;
  const w = Math.max(...filas.map((f) => g.measureText(f).width)) + 88, h = filas.length * tam * 1.1 + 48;
  g.translate(x, y + h / 2); g.rotate(giro);
  if (sombraColor) { g.fillStyle = sombraColor; redondeado(g, -w / 2, -h / 2 + 14, w, h, borde ? h / 2 : 28); g.fill(); }
  g.fillStyle = fondo; redondeado(g, -w / 2, -h / 2, w, h, borde ? h / 2 : 28); g.fill();
  if (borde) { g.strokeStyle = borde; g.lineWidth = 6; redondeado(g, -w / 2 + 3, -h / 2 + 3, w - 6, h - 6, h / 2 - 3); g.stroke(); }
  g.fillStyle = tinta; g.textAlign = "center"; g.textBaseline = "alphabetic";
  filas.forEach((f, i) => g.fillText(f, 0, -h / 2 + 24 + tam * 0.9 + i * tam * 1.1));
  g.restore();
  return h;
}

// Las zonas seguras, para revisar: verde, libre de botones y textos de TikTok, Reels y Shorts; amarillo, el recorte
// 3:4 de la cuadrícula del perfil de Instagram. El título y la etiqueta van dentro de las dos.
export function zonas(g) {
  g.save();
  g.setLineDash([22, 14]); g.lineWidth = 5;
  g.strokeStyle = "#FFFF00"; g.strokeRect(2, 240, ANCHO - 4, 1440);
  g.strokeStyle = "#00FF00"; g.strokeRect(60, 150, 840, 1350);
  g.restore();
}

// Una línea de texto ajustada al ancho: baja el tamaño desde `max` hasta que quepa (o hasta `min`). Devuelve el tamaño.
export function ajusta(g, texto, max, min, ancho, peso = 800) {
  let t = max;
  for (; t > min; t -= 2) { g.font = `${peso} ${t}px Figtree`; if (g.measureText(texto).width <= ancho) break; }
  return t;
}

// ---------------------------------------------------------------- contraste
// El color de la marca solo cambia la palabra clave. Para que siempre se lea, se mide su contraste (WCAG) con el
// fondo y, si no llega, se aclara u oscurece manteniendo su tono hasta que llegue.
const lin = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
export const luminancia = (hex) => { const [r, g, b] = rgb(hex); return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b); };
export const contraste = (a, b) => { const x = luminancia(a), y = luminancia(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
function aHsl(hex) {
  let [r, g, b] = rgb(hex).map((v) => v / 255); const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2;
  if (mx === mn) return [0, 0, l];
  const d = mx - mn, s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn);
  const h = mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return [h / 6, s, l];
}
function deHsl(h, s, l) {
  const f = (p, q, t) => { t = (t + 1) % 1; return t < 1 / 6 ? p + (q - p) * 6 * t : t < 1 / 2 ? q : t < 2 / 3 ? p + (q - p) * (2 / 3 - t) * 6 : p; };
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s, p = 2 * l - q;
  const c = s === 0 ? [l, l, l] : [f(p, q, h + 1 / 3), f(p, q, h), f(p, q, h - 1 / 3)];
  return "#" + c.map((v) => Math.round(v * 255).toString(16).padStart(2, "0")).join("").toUpperCase();
}
// Devuelve { color, cambiado, antes, ratio }: el color legible más parecido al de la marca sobre `fondo`.
export function legible(color, fondo, minimo = 4.5) {
  const antes = contraste(color, fondo);
  if (antes >= minimo) return { color, cambiado: false, ratio: antes };
  const [h, s, l0] = aHsl(color), oscuroFondo = luminancia(fondo) < 0.18;
  let mejor = color, r = antes;
  for (let i = 1; i <= 100; i++) {
    const l = oscuroFondo ? Math.min(1, l0 + i * 0.01) : Math.max(0, l0 - i * 0.01);
    const c = deHsl(h, s, l), k = contraste(c, fondo);
    if (k >= minimo) return { color: c, cambiado: true, antes, ratio: k };
    if (k > r) { mejor = c; r = k; }
  }
  return { color: mejor, cambiado: true, antes, ratio: r };
}
