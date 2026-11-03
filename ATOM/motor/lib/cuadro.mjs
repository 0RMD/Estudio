// Dibuja el fotograma del segundo t: el plano que toca y, encima, los subtítulos.
import { createCanvas } from "@napi-rs/canvas";
import { ALTO, ANCHO } from "./comun.mjs";
import { bloques, dibujarSubtitulos } from "./subtitulos.mjs";

export const FUNDIDO = 0.3;

export function preparar(proy) {
  const lienzo = createCanvas(ANCHO, ALTO), g = lienzo.getContext("2d");
  const aparte = createCanvas(ANCHO, ALTO);
  const subs = bloques(proy.v.palabras, proy.duracion);
  const modo = proy.guion.subtitulos || "arriba";
  const tema = proy.guion.tema === "claro" ? "claro" : "oscuro";
  return { lienzo, g, aparte, subs, modo, tema };
}

export function planoEn(proy, t) {
  const ps = proy.planos;
  let i = 0;
  while (i + 1 < ps.length && t >= ps[i + 1].desde) i++;
  return i;
}

function limpiar(g, tema) {
  g.setTransform(1, 0, 0, 1, 0, 0);
  g.globalAlpha = 1; g.globalCompositeOperation = "source-over"; g.filter = "none";
  g.shadowBlur = 0; g.shadowColor = "rgba(0,0,0,0)"; g.shadowOffsetX = 0; g.shadowOffsetY = 0;
  g.setLineDash([]); g.lineCap = "butt"; g.lineJoin = "miter";
  g.fillStyle = tema === "claro" ? "#ffffff" : "#000000"; g.fillRect(0, 0, ANCHO, ALTO);
}

function plano(p, g, t, tema) {
  limpiar(g, tema);
  g.save();
  try { p.dibuja(g, t); }
  catch (e) { e.message = `plano ${p.id}, segundo ${t.toFixed(3)}: ${e.message}`; throw e; }
  g.restore();
}

// opciones: { subtitulos: false } para verlo sin ellos.
export function dibujar(proy, est, t, opciones = {}) {
  const i = planoEn(proy, t), p = proy.planos[i];
  plano(p, est.g, t, est.tema);
  if (p.entrada === "fundido" && i > 0 && t < p.desde + FUNDIDO) {
    const ga = est.aparte.getContext("2d");
    plano(proy.planos[i - 1], ga, t, est.tema);
    const u = (t - p.desde) / FUNDIDO, k = u * u * (3 - 2 * u);
    // lo de antes encima, apagándose
    est.g.globalAlpha = 1 - k; est.g.drawImage(est.aparte, 0, 0); est.g.globalAlpha = 1;
  }
  if (opciones.subtitulos !== false) dibujarSubtitulos(est.g, t, est.subs, est.modo, est.tema);
  return est.lienzo;
}

// El lienzo en pequeño (w × h, RGBA) leyendo sus píxeles, sin drawImage: con @napi-rs/canvas, dibujar el lienzo grande
// guarda una copia de él cada vez y en un vídeo largo la memoria se acaba.
export function reducir(lienzo, w, h) {
  const W = lienzo.width, H = lienzo.height, src = lienzo.data(), out = new Uint8ClampedArray(w * h * 4);
  const sx = W / w, sy = H / h, px = Math.max(1, Math.floor(sx / 3)), py = Math.max(1, Math.floor(sy / 3));
  for (let y = 0; y < h; y++) {
    const y0 = Math.floor(y * sy), y1 = Math.max(y0 + 1, Math.min(H, Math.floor((y + 1) * sy)));
    for (let x = 0; x < w; x++) {
      const x0 = Math.floor(x * sx), x1 = Math.max(x0 + 1, Math.min(W, Math.floor((x + 1) * sx)));
      let r = 0, g = 0, b = 0, a = 0, n = 0;
      for (let yy = y0; yy < y1; yy += py) for (let xx = x0; xx < x1; xx += px) { const i = (yy * W + xx) * 4; r += src[i]; g += src[i + 1]; b += src[i + 2]; a += src[i + 3]; n++; }
      const o = (y * w + x) * 4; out[o] = r / n; out[o + 1] = g / n; out[o + 2] = b / n; out[o + 3] = a / n;
    }
  }
  return out;
}

