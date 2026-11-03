#!/usr/bin/env node
// carrusel.mjs: un carrusel de Instagram (1080 × 1350) desde un vídeo terminado (pack Élite: Repurposing).
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";
import { createCanvas } from "@napi-rs/canvas";
import { ANCHO, RAIZ, argumentos, ayuda, carpetaProyecto, fallo } from "./lib/comun.mjs";
import { abrir } from "./lib/proyecto.mjs";
import { fotograma, legible, marca, preparar, redondeado, rgba, titular, trocear, velo } from "./lib/rotulos.mjs";

ayuda(`
node motor/carrusel.mjs <proyecto> [--acento #hex]

Lee <proyecto>/carrusel.json y hace las diapositivas en salida/<proyecto>/carrusel/01.jpg, 02.jpg... (1080 × 1350,
el formato de los carruseles de Instagram y LinkedIn) y carrusel/todas.jpg para verlas juntas. Míralas siempre.

carrusel.json:
{
  "portada":  { "segundo": 1.2, "titulo": "¿Por qué no te acuerdas de nada?", "marca": "nada" },
  "diapos":   [ { "segundo": 6.5, "texto": "Tu cerebro tiene una *grabadora*: el hipocampo." }, ... ],
  "cierre":   { "segundo": 30, "titulo": "Guárdalo y envíaselo a quien lo necesite", "marca": "Guárdalo" }
}
Entre 4 y 8 diapos. Cada texto, una idea en una o dos frases cortas; *entre asteriscos* lo que va en color.
Los colores salen de marca.json (o los de ATOM). El vídeo se dibuja sin subtítulos.
`);

const { sueltos, op } = argumentos();
const dir = carpetaProyecto(sueltos[0]);
const fj = join(dir, "carrusel.json");
if (!existsSync(fj)) fallo(`Falta ${fj}. Mira el formato con: node motor/carrusel.mjs --ayuda`);
let C, M;
try { C = JSON.parse(readFileSync(fj, "utf8")); } catch (x) { fallo(`carrusel.json no se puede leer: ${x.message}`); }
try { M = marca({ acento: op.acento }); } catch (x) { fallo(x.message); }
{ const L = legible(M.acento, M.oscuro); if (L.cambiado) console.log(`Aviso: ${M.acento} no se leía bien; uso ${L.color}.`); M.acento = L.color; }
if (!C.portada || !Array.isArray(C.diapos) || !C.diapos.length) fallo("carrusel.json necesita portada y diapos (mira --ayuda).");
const proy = await abrir(dir), est = preparar(proy);
const H = 1350, Y0 = (1920 - H) / 2;
const nombre = basename(dir), carpeta = join(RAIZ, "salida", nombre, "carrusel");
mkdirSync(carpeta, { recursive: true });
const total = C.diapos.length + 1 + (C.cierre ? 1 : 0);

function base(t) {
  const c = createCanvas(ANCHO, H), g = c.getContext("2d");
  g.drawImage(fotograma(proy, est, t), 0, Y0, ANCHO, H, 0, 0, ANCHO, H);
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
// texto normal con *palabras* en el color del estilo, alineado a la izquierda, abajo
function cuerpo(g, texto) {
  const tam = 62, ancho = 920, x0 = 80;
  g.font = `700 ${tam}px Figtree`;
  const trozos = trocear(texto, []).map((t, k, arr) => t);
  const hayMarca = /\*/.test(texto);
  if (!hayMarca) trozos.forEach((t) => (t.marca = false));
  const sp = g.measureText(" ").width, L = [];
  let l = [], w = 0;
  for (const t of trozos) { const pw = g.measureText(t.p).width; if (l.length && w + sp + pw > ancho) { L.push(l); l = []; w = 0; } w += (l.length ? sp : 0) + pw; l.push({ ...t, pw }); }
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
{ // portada
  const { c, g } = base(Number(C.portada.segundo || 1));
  const op1 = { y0: 150, ancho: 900, marcar: C.portada.marca || [], acento: M.acento, tinta: M.oscuro, color: M.texto, tam: 104 };
  const { alto } = titular(g, C.portada.titulo, { ...op1, dibujar: false });
  velo(g, 110, 150 + alto + 40, M.oscuro);
  titular(g, C.portada.titulo, op1);
  g.save(); g.font = "800 36px Figtree"; g.fillStyle = M.acento; g.fillText("Desliza →", ANCHO - 260, H - 70); g.restore();
  numero(g, 1); guarda(c, 1);
}
C.diapos.forEach((d, i) => { const { c, g } = base(Number(d.segundo)); cuerpo(g, String(d.texto || "")); numero(g, i + 2); guarda(c, i + 2); });
if (C.cierre) {
  const { c, g } = base(Number(C.cierre.segundo || proy.duracion - 1));
  const op2 = { ancho: 900, marcar: C.cierre.marca || [], acento: M.acento, tinta: M.oscuro, color: M.texto, tam: 96 };
  const { alto } = titular(g, C.cierre.titulo, { ...op2, dibujar: false });
  const y0 = (H - alto) / 2;
  velo(g, y0 - 40, y0 + alto + 40, M.oscuro, 0.8);
  titular(g, C.cierre.titulo, { ...op2, y0 });
  numero(g, total); guarda(c, total);
}
// todas juntas, para mirarlas
const w = 270, h = 338, s = 10, cols = Math.min(4, salen.length), filas = Math.ceil(salen.length / cols);
const r = createCanvas(cols * w + (cols + 1) * s, filas * h + (filas + 1) * s), gr = r.getContext("2d");
gr.fillStyle = "#0B0B0F"; gr.fillRect(0, 0, r.width, r.height);
salen.forEach((x, i) => gr.drawImage(x.c, s + (i % cols) * (w + s), s + Math.floor(i / cols) * (h + s), w, h));
const todas = join(carpeta, "todas.jpg");
writeFileSync(todas, r.toBuffer("image/jpeg", 90));
salen.forEach((x) => console.log(x.f));
console.log(todas);
