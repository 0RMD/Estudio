#!/usr/bin/env node
// puente/portada-mp4.mjs: aplica el generador de portadas clickbait de ATOM a cualquier video .mp4 (por ejemplo, de PuraPrueba).
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const atomRoot = existsSync(join(__dirname, "..", "ATOM", "motor"))
  ? join(__dirname, "..", "ATOM")
  : "C:\\ATOM";

const canvasMod = await import(pathToFileURL(join(atomRoot, "node_modules", "@napi-rs", "canvas", "index.js")).href);
const comunMod = await import(pathToFileURL(join(atomRoot, "motor", "lib", "comun.mjs")).href);
const rotulosMod = await import(pathToFileURL(join(atomRoot, "motor", "lib", "rotulos.mjs")).href);

const { createCanvas, loadImage } = canvasMod;
const { ALTO, ANCHO, argumentos, fallo } = comunMod;
const { ajusta, contraste, etiqueta, legible, marca, redondeado, rgb, rgba, titular, velo, zonas } = rotulosMod;

const { op } = argumentos();
const videoPath = op.video ? resolve(String(op.video)) : "";
const titulo = op.titulo && String(op.titulo);
if (!videoPath || !existsSync(videoPath)) {
  fallo('Indica el video .mp4: --video "PuraPrueba/workspace/output/.../video.mp4" --titulo "Tu frase *clave* aquí"');
}
if (!titulo || titulo === "true") {
  fallo('Falta el título: --titulo "Tu frase *clave* aquí"');
}

let M;
try { M = marca({ estilo: op.estilo, acento: op.acento }); } catch (e) { fallo(e.message); }
{
  const detras = M.estilo === "limpio" ? M.claro : M.oscuro;
  const L = legible(M.acento, detras, 4.5);
  if (L.cambiado) console.log(`Aviso: el color ${M.acento} se ajustó a ${L.color} (${L.ratio.toFixed(1)}:1) para lectura clara.`);
  M.acento = L.color;
  if (contraste(M.acento, M.sticker) < 1.6) M.sticker = "#FFFFFF";
}

function duracionMp4(ruta) {
  try {
    const out = execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", ruta], { encoding: "utf8" });
    return Number(out.trim()) || 30;
  } catch {
    return 30;
  }
}

async function extraerCuadro(ruta, t) {
  const buf = execFileSync("ffmpeg", ["-v", "error", "-ss", String(Math.max(0, t)), "-i", ruta, "-frames:v", "1", "-f", "image2pipe", "-vcodec", "png", "-"], { maxBuffer: 25 * 1024 * 1024 });
  return loadImage(buf);
}

const D = duracionMp4(videoPath);
const segundos = op.segundos
  ? String(op.segundos).split(",").map(Number).filter(Number.isFinite)
  : [Math.min(1.5, D / 2), Number((D * 0.5).toFixed(1)), Number((D * 0.75).toFixed(1))];
const dy = Number(op.dy || 0);
const tiene = op.etiqueta && op.etiqueta !== true;
const carpeta = op.out ? resolve(String(op.out)) : join(dirname(videoPath), "portadas");
mkdirSync(carpeta, { recursive: true });

const Y0 = 300, CX = 480, ANCHO_T = 800;

function enLineas(g, txt, max, min, ancho) {
  const t = ajusta(g, txt, max, min, ancho);
  g.font = `800 ${t}px Figtree`;
  if (g.measureText(txt).width <= ancho) return [{ txt, t }];
  const p = txt.split(" ");
  if (p.length === 1) return [{ txt, t: ajusta(g, txt, t, 24, ancho) }];
  const mitad = Math.ceil(p.length / 2);
  return [...enLineas(g, p.slice(0, mitad).join(" "), max, min, ancho), ...enLineas(g, p.slice(mitad).join(" "), max, min, ancho)];
}

function prepEtiqueta(g, texto, tam) {
  const cabe = (txt, t) => { g.font = `800 ${t}px Figtree`; return Math.max(...String(txt).split("|").map((f) => g.measureText(f.trim()).width)) + 88 <= 760; };
  const p = String(texto).trim().split(/\s+/);
  if (!String(texto).includes("|") && p.length > 2 && !cabe(texto, tam * 0.85)) {
    const mitad = Math.ceil(p.length / 2); texto = p.slice(0, mitad).join(" ") + "|" + p.slice(mitad).join(" ");
  }
  while (tam > 30 && !cabe(texto, tam)) tam -= 2;
  return { texto, tam };
}

async function flyer(t) {
  const img = await extraerCuadro(videoPath, t);
  const c = createCanvas(ANCHO, ALTO), g = c.getContext("2d");
  g.fillStyle = M.oscuro; g.fillRect(0, 0, ANCHO, ALTO);
  g.drawImage(img, 0, dy, ANCHO, ALTO);
  const medida = titular(g, titulo, { x: CX, y0: Y0, ancho: ANCHO_T, dibujar: false, modo: M.estilo === "bloque" ? "caja" : "color", tam: 132 });
  const fin = Y0 + medida.alto;
  if (M.estilo === "impacto") {
    const m = titulo.match(/^(.*?)\*([^*]+)\*(.*)$/), w = titulo.replace(/\*/g, "").trim().split(/\s+/);
    let pre = m ? m[1].trim() : w.slice(0, -1).join(" "), clave = (m ? m[2] : w[w.length - 1]).trim().toUpperCase(), post = m ? m[3].trim() : "";
    if (/^[?!.,:;…»"')]+$/.test(post)) { clave += post; post = ""; }
    if (/^[¿¡«"(]+$/.test(pre)) { clave = pre + clave; pre = ""; }
    const lineas = [];
    const blanca = (txt) => { if (txt) for (const l of enLineas(g, txt, 118, 72, ANCHO_T)) lineas.push({ ...l, clave: false }); };
    blanca(pre);
    const claves = enLineas(g, clave, 236, 100, ANCHO_T), tc = Math.min(...claves.map((l) => l.t));
    for (const l of claves) lineas.push({ txt: l.txt, t: tc, clave: true });
    blanca(post);
    let y = 270;
    const pos = lineas.map((l) => { const base = y + l.t * 0.82; y += l.t * (l.clave ? 1.02 : 1.18); return base; });
    const finB = y, banda = finB + 300, gr = g.createLinearGradient(0, 0, 0, banda);
    gr.addColorStop(0, rgba(M.oscuro, 1)); gr.addColorStop((finB + 40) / banda, rgba(M.oscuro, 1)); gr.addColorStop(1, rgba(M.oscuro, 0));
    g.fillStyle = gr; g.fillRect(0, 0, ANCHO, banda);
    g.save(); g.textAlign = "center"; g.textBaseline = "alphabetic";
    try { g.letterSpacing = "-2px"; } catch {}
    const [r, gg, b] = rgb(M.acento);
    lineas.forEach((l, i) => {
      g.font = `800 ${l.t}px Figtree`;
      if (l.clave) {
        g.fillStyle = `rgb(${(r * 0.55) | 0},${(gg * 0.2) | 0},${(b * 0.2) | 0})`;
        g.fillText(l.txt, CX + l.t * 0.02, pos[i] + l.t * 0.05);
        g.fillStyle = M.acento; g.fillText(l.txt, CX, pos[i]);
      } else { g.fillStyle = M.texto; g.fillText(l.txt, CX, pos[i]); }
    });
    g.restore();
    if (tiene) { const E = prepEtiqueta(g, op.etiqueta, 64); etiqueta(g, E.texto, { x: CX, y: Math.max(finB + 80, 1290), tam: E.tam, fondo: M.sticker, tinta: M.sticker_texto, giro: -0.035, sombraColor: M.sticker_texto }); }
  } else if (M.estilo === "limpio") {
    velo(g, 0, fin + 60, M.oscuro, 0.45);
    g.save(); g.shadowColor = "rgba(0,0,0,0.35)"; g.shadowBlur = 60; g.shadowOffsetY = 24;
    redondeado(g, CX - 420, Y0 - 50, 840, medida.alto + 100, 44); g.fillStyle = M.claro; g.fill(); g.restore();
    titular(g, titulo, { x: CX, y0: Y0, ancho: ANCHO_T - 80, modo: "color", acento: M.acento, color: M.tinta_clara, tam: medida.tam, sombra: false });
    if (tiene) { const E = prepEtiqueta(g, op.etiqueta, 56); etiqueta(g, E.texto, { x: CX, y: Math.max(fin + 120, 1180), tam: E.tam, fondo: M.sticker, tinta: M.sticker_texto }); }
  } else {
    const alto = fin + 140;
    g.save(); g.beginPath(); g.moveTo(0, 0); g.lineTo(ANCHO, 0); g.lineTo(ANCHO, alto * 0.88); g.lineTo(0, alto); g.closePath();
    g.fillStyle = M.oscuro; g.fill(); g.restore();
    titular(g, titulo, { x: CX, y0: Y0, ancho: ANCHO_T, modo: "caja", acento: M.acento, tinta: M.oscuro, color: M.texto, tam: 132 });
    if (tiene) { const E = prepEtiqueta(g, op.etiqueta, 56); etiqueta(g, E.texto, { x: CX, y: Math.max(alto + 60, 1180), tam: E.tam, fondo: rgba(M.oscuro, 0.85), tinta: M.texto, borde: M.acento }); }
  }
  return c;
}

const hechas = [];
for (let i = 0; i < segundos.length; i++) {
  const t = segundos[i], c = await flyer(t), f = join(carpeta, `portada-${i + 1}.jpg`);
  writeFileSync(f, c.toBuffer("image/jpeg", 92));
  const z = createCanvas(ANCHO, ALTO), gz = z.getContext("2d");
  gz.drawImage(c, 0, 0); zonas(gz);
  writeFileSync(join(carpeta, `portada-${i + 1}-zonas.jpg`), z.toBuffer("image/jpeg", 80));
  hechas.push({ c, f, t });
}

const W = 360, H = 480, sep = 12;
const r = createCanvas(hechas.length * W + (hechas.length + 1) * sep, H + 2 * sep + 50), gr = r.getContext("2d");
gr.fillStyle = "#0B0B0F"; gr.fillRect(0, 0, r.width, r.height);
hechas.forEach((h, i) => {
  gr.drawImage(h.c, 0, (ALTO - 1440) / 2, ANCHO, 1440, sep + i * (W + sep), sep, W, H);
  gr.fillStyle = "#D2C9EE"; gr.font = "700 26px Figtree";
  gr.fillText(`${i + 1} · ${h.t.toFixed(1)} s`, sep + i * (W + sep) + 8, H + sep + 36);
});
const rej = join(carpeta, "rejilla.jpg");
writeFileSync(rej, r.toBuffer("image/jpeg", 90));
hechas.forEach((h) => console.log(h.f));
console.log(rej);
