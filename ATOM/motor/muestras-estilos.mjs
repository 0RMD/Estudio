#!/usr/bin/env node
// muestras-estilos.mjs: rehace guia/muestras-estilos.jpg, una escena de prueba de cada estilo extra hecha con las
// piezas de motor/kit/estilos.js. Sirve para ver cómo se ven antes de usarlas.
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { createCanvas } from "@napi-rs/canvas";
import { RAIZ, ayuda } from "./lib/comun.mjs";
import "./lib/subtitulos.mjs"; // la letra Figtree
import * as k from "./kit/index.js";

ayuda(`node motor/muestras-estilos.mjs: hace guia/muestras-estilos.jpg (Cine Nocturno y Datos Neón, una al lado de otra).`);

function cine(g, t = 2) {
  k.nocheCine(g);
  // una carretera que se pierde y un coche rojo bajo una farola
  g.save(); g.strokeStyle = "#2A2420"; g.lineWidth = 260; g.lineCap = "round";
  g.beginPath(); g.moveTo(980, 1900); g.quadraticCurveTo(420, 1300, 610, 600); g.stroke();
  g.strokeStyle = "rgba(244,240,238,0.55)"; g.lineWidth = 6; g.setLineDash([60, 50]);
  g.beginPath(); g.moveTo(980, 1900); g.quadraticCurveTo(420, 1300, 610, 600); g.stroke(); g.restore();
  k.luzCalida(g, 560, 1150, 520, 1);
  g.save(); g.translate(560, 1180); g.rotate(-0.5);
  k.redondo(g, -80, -150, 160, 300, 34); g.fillStyle = k.CINE.rojo; g.fill();
  k.redondo(g, -62, -80, 124, 110, 16); g.fillStyle = "#3A1F1B"; g.fill();
  g.restore();
  k.rotuloCine(g, 540, 760, "se llama", "1963");
  k.vineta(g, 0.7); k.grano(g, t, 0.08);
}

function neon(g, t = 2) {
  g.fillStyle = k.NEON.fondo; g.fillRect(0, 0, 1080, 1920);
  k.textoMono(g, "Lo que tardas en 1 km", 540, 620, 40, k.NEON.tenue, { alinear: "center" });
  k.panelNeon(g, 110, 680, 860, 760);
  k.rejilla(g, 150, 720, 780, 680, 68);
  const pts = []; for (let i = 0; i <= 20; i++) { const x = 170 + i * 37, v = 40 + i * 4.5; pts.push([x, 1380 - 52000 / v / 2.2]); }
  k.lineaNeon(g, pts, k.NEON.verde, 7, 0.85);
  k.chipNeon(g, "t = d / v", 760, 900, k.NEON.verde, 38);
  k.chipNeon(g, "-5 min", 330, 1540, k.NEON.magenta, 46);
  k.barraNeon(g, 160, 1620, 760, 34, 0.62, k.NEON.verde);
  k.barraNeon(g, 160, 1680, 760, 34, 0.9, k.NEON.magenta);
  k.textoMono(g, "130 km/h", 160, 1780, 44, k.NEON.magenta, { brillo: true });
}

const c = createCanvas(2 * 540 + 30, 960 + 60), g = c.getContext("2d");
g.fillStyle = "#0B0B0F"; g.fillRect(0, 0, c.width, c.height);
for (const [i, [f, nombre]] of [[cine, "Cine Nocturno"], [neon, "Datos Neón"]].entries()) {
  const l = createCanvas(1080, 1920), gl = l.getContext("2d"); f(gl);
  g.drawImage(l, 10 + i * 550, 10, 540, 960);
  g.fillStyle = "#D2C9EE"; g.font = "700 28px Figtree"; g.fillText(nombre, 20 + i * 550, 1005);
}
const sale = join(RAIZ, "guia", "muestras-estilos.jpg");
writeFileSync(sale, c.toBuffer("image/jpeg", 90));
console.log(sale);
