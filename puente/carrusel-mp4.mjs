#!/usr/bin/env node
// puente/carrusel-mp4.mjs: aplica el generador de carruseles 1080x1350 de ATOM a cualquier video .mp4 (por ejemplo, de PuraPrueba).
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
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
const { ANCHO, argumentos, fallo } = comunMod;
const { legible, marca, redondeado, rgba, titular, trocear, velo } = rotulosMod;

const { op } = argumentos();
const videoPath = op.video ? resolve(String(op.video)) : "";
const jsonPath = op.json ? resolve(String(op.json)) : (videoPath ? join(dirname(videoPath), "carrusel.json") : "");

if (!videoPath || !existsSync(videoPath)) fallo('Indica el video .mp4: --video "ruta/al/video.mp4" --json "ruta/a/carrusel.json"');
if (!jsonPath || !existsSync(jsonPath)) fallo(`Falta ${jsonPath}. Crea carrusel.json con portada, diapos y cierre.`);

let C, M;
try { C = JSON.parse(readFileSync(jsonPath, "utf8")); } catch (x) { fallo(`carrusel.json inválido: ${x.message}`); }
try { M = marca({ acento: op.acento }); } catch (x) { fallo(x.message); }
{ const L = legible(M.acento, M.oscuro); if (L.cambiado) console.log(`Aviso: ${M.acento} ajustado a ${L.color}.`); M.acento = L.color; }
if (!C.portada || !Array.isArray(C.diapos) || !C.diapos.length) fallo("carrusel.json necesita portada y diapos.");

const H = 1350, Y0 = (1920 - H) / 2;
const carpeta = op.out ? resolve(String(op.out)) : join(dirname(videoPath), "carrusel");
mkdirSync(carpeta, { recursive: true });
const total = C.diapos.length + 1 + (C.cierre ? 1 : 0);

async function extraerCuadro(ruta, t) {
  const buf = execFileSync("ffmpeg", ["-v", "error", "-ss", String(Math.max(0, t)), "-i", ruta, "-frames:v", "1", "-f", "image2pipe", "-vcodec", "png", "-"], { maxBuffer: 25 * 1024 * 1024 });
  return loadImage(buf);
}

async function base(t) {
  const img = await extraerCuadro(videoPath, t);
  const c = createCanvas(ANCHO, H), g = c.getContext("2d");
  g.drawImage(img, 0, Y0, ANCHO, H, 0, 0, ANCHO, H);
  return { c, g };
}

function numero(g, n) {
  g.save();
  g.font = "800 34px Figtree";
  const s = `${n}/${total}`, w = g.measureText(s).width + 36;
  redondeado(g, ANCHO - w - 40, 40, w, 58, 29); g.fillStyle = rgba(M.oscuro, 0.7); g.fill();
  g.fillStyle = "#FFFFFF"; g.fillText(s, ANCHO - w - 22, 81);
  g.restore();
}

function cuerpo(g, texto) {
  const tam = 62, ancho = 920, x0 = 80;
  g.font = `700 ${tam}px Figtree`;
  const trozos = trocear(texto, []);
  const hayMarca = /\*/.test(texto);
  if (!hayMarca) trozos.forEach((t) => (t.marca = false));
  const sp = g.measureText(" ").width, L = [];
  let l = [], w = 0;
  for (const t of trozos) {
    const pw = g.measureText(t.p).width;
    if (l.length && w + sp + pw > ancho) { L.push(l); l = []; w = 0; }
    w += (l.length ? sp : 0) + pw; l.push({ ...t, pw });
  }
  if (l.length) L.push(l);
  const alto = tam * 1.22, y0 = H - 110 - L.length * alto;
  velo(g, y0 - 30, H, M.oscuro, 0.82);
  g.textBaseline = "alphabetic";
  L.forEach((linea, i) => {
    let x = x0;
    for (const t of linea) {
      g.fillStyle = t.marca ? M.acento : M.texto;
      g.shadowColor = "rgba(0,0,0,0.6)"; g.shadowBlur = 16;
      g.fillText(t.p, x, y0 + tam + i * alto);
      x += t.pw + sp;
    }
  });
  g.shadowBlur = 0;
}

const salen = [];
const guarda = (c, n) => { const f = join(carpeta, `${String(n).padStart(2, "0")}.jpg`); writeFileSync(f, c.toBuffer("image/jpeg", 92)); salen.push({ c, f }); };

{
  const { c, g } = await base(Number(C.portada.segundo || 1));
  const op1 = { y0: 150, ancho: 900, marcar: C.portada.marca || [], acento: M.acento, tinta: M.oscuro, color: M.texto, tam: 104 };
  const { alto } = titular(g, C.portada.titulo, { ...op1, dibujar: false });
  velo(g, 110, 150 + alto + 40, M.oscuro);
  titular(g, C.portada.titulo, op1);
  g.save(); g.font = "800 36px Figtree"; g.fillStyle = M.acento; g.fillText("Desliza →", ANCHO - 260, H - 70); g.restore();
  numero(g, 1); guarda(c, 1);
}
for (let i = 0; i < C.diapos.length; i++) {
  const d = C.diapos[i], { c, g } = await base(Number(d.segundo));
  cuerpo(g, String(d.texto || "")); numero(g, i + 2); guarda(c, i + 2);
}
if (C.cierre) {
  const { c, g } = await base(Number(C.cierre.segundo || 30));
  const op2 = { ancho: 900, marcar: C.cierre.marca || [], acento: M.acento, tinta: M.oscuro, color: M.texto, tam: 96 };
  const { alto } = titular(g, C.cierre.titulo, { ...op2, dibujar: false });
  const y0 = (H - alto) / 2;
  velo(g, y0 - 40, y0 + alto + 40, M.oscuro, 0.8);
  titular(g, C.cierre.titulo, { ...op2, y0 });
  numero(g, total); guarda(c, total);
}

const w = 270, h = 338, s = 10, cols = Math.min(4, salen.length), filas = Math.ceil(salen.length / cols);
const r = createCanvas(cols * w + (cols + 1) * s, filas * h + (filas + 1) * s), gr = r.getContext("2d");
gr.fillStyle = "#0B0B0F"; gr.fillRect(0, 0, r.width, r.height);
salen.forEach((x, i) => gr.drawImage(x.c, s + (i % cols) * (w + s), s + Math.floor(i / cols) * (h + s), w, h));
const todas = join(carpeta, "todas.jpg");
writeFileSync(todas, r.toBuffer("image/jpeg", 90));
salen.forEach((x) => console.log(x.f));
console.log(todas);
