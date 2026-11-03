#!/usr/bin/env node
// portada.mjs: el flyer (portada) de un vídeo, desde cualquiera de sus momentos y sin subtítulos
// (pack Élite: Generador de portadas).
import { mkdirSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";
import { createCanvas } from "@napi-rs/canvas";
import { ALTO, ANCHO, RAIZ, argumentos, ayuda, carpetaProyecto, fallo } from "./lib/comun.mjs";
import { abrir } from "./lib/proyecto.mjs";
import { ajusta, contraste, etiqueta, fotograma, legible, marca, preparar, redondeado, rgb, rgba, titular, velo, zonas } from "./lib/rotulos.mjs";

ayuda(`
node motor/portada.mjs <proyecto> --titulo "Tu tuerca *se afloja* sola" [--segundos 1.2,8,15] [--estilo impacto|limpio|bloque]
                       [--etiqueta "aunque la aprietes|con todas tus fuerzas"] [--dy 0] [--acento #hex]

Un flyer de 1080 × 1920 por cada segundo, en salida/<proyecto>/portadas/portada-1.jpg, -2...; para cada uno,
portada-N-zonas.jpg con las zonas seguras dibujadas (solo para revisar), y portadas/rejilla.jpg: cómo se ven en la
cuadrícula del perfil (3:4), una al lado de otra. Míralas siempre.
--titulo     de 3 a 9 palabras. *Entre asteriscos* la palabra o frase clave (en el color de acento); sin asteriscos, la
             última palabra.
--segundos   de qué momentos sale la imagen (el vídeo se dibuja sin subtítulos). Sin nada: 1 s, la mitad y el 70 %.
--estilo     impacto: banda oscura arriba que se funde con la imagen, título blanco enorme, la clave en color y una
                      etiqueta inclinada.
             limpio:  la imagen casi entera; el título en una tarjeta clara redondeada.
             bloque:  un bloque de color arriba cortado en diagonal; la clave con fondo de acento; etiqueta con borde.
             Sin nada, el de marca.json (o impacto).
--etiqueta   opcional, de 2 a 6 palabras: remata la curiosidad sin dar la respuesta. «|» parte en dos líneas.
--dy         baja la imagen esos píxeles para que lo importante quede debajo del título (entre y 750 y 1450).
--acento #hex: el color de la palabra clave solo para esta vez (el de la marca está en marca.json).
Solo cambia el color de la palabra clave: el fondo, el texto blanco y la etiqueta son siempre los de ATOM, para que se
lean. Si el color de la marca no tiene contraste suficiente (4,5:1), se aclara u oscurece lo justo y se avisa.
`);

const { sueltos, op } = argumentos();
const dir = carpetaProyecto(sueltos[0]);
const titulo = op.titulo && String(op.titulo);
if (!titulo || titulo === "true") fallo('Falta el título: --titulo "Tu tuerca *se afloja* sola"');
let M;
try { M = marca({ estilo: op.estilo, acento: op.acento }); } catch (e) { fallo(e.message); }
// La palabra clave lleva el color de la marca, pero siempre legible: se mide contra lo que tiene detrás en cada estilo
// (la banda oscura en impacto, la tarjeta clara en limpio; en bloque es el fondo de la caja, con letra oscura).
{
  const detras = M.estilo === "limpio" ? M.claro : M.oscuro;
  const L = legible(M.acento, detras, M.estilo === "bloque" ? 4.5 : 4.5);
  if (L.cambiado) console.log(`Aviso: el color ${M.acento} no se leía bien sobre ${detras} (contraste ${L.antes.toFixed(1)}:1). Uso ${L.color} (${L.ratio.toFixed(1)}:1), el más parecido que se lee bien.`);
  M.acento = L.color;
  // Si la palabra clave quedó del mismo color que la etiqueta amarilla, la etiqueta pasa a blanca para que no se confundan.
  if (contraste(M.acento, M.sticker) < 1.6) M.sticker = "#FFFFFF";
}
const proy = await abrir(dir), est = preparar(proy), D = proy.duracion;
const segundos = op.segundos ? String(op.segundos).split(",").map(Number).filter(Number.isFinite) : [Math.min(1, D / 2), D * 0.5, D * 0.7];
if (!segundos.length) fallo("--segundos: números separados por comas, por ejemplo 1.2,8,15");
const dy = Number(op.dy || 0), tiene = op.etiqueta && op.etiqueta !== true;
const nombre = basename(dir), carpeta = join(RAIZ, "salida", nombre, "portadas");
mkdirSync(carpeta, { recursive: true });

// La zona verde (libre en TikTok, Reels y Shorts) va de x 60 a 900: los botones de la derecha la estrechan. Todo el
// texto se centra en ella (x 480) y no pasa de 800 px de ancho, con margen para la sombra.
const Y0 = 300, CX = 480, ANCHO_T = 800;

// Una frase en líneas que caben en `ancho`: lo más grande posible (de max a min). Si ni al mínimo cabe, se parte por
// palabras en dos; una palabra sola que no cabe se encoge lo que haga falta.
function enLineas(g, txt, max, min, ancho) {
  const t = ajusta(g, txt, max, min, ancho);
  g.font = `800 ${t}px Figtree`;
  if (g.measureText(txt).width <= ancho) return [{ txt, t }];
  const p = txt.split(" ");
  if (p.length === 1) return [{ txt, t: ajusta(g, txt, t, 24, ancho) }];
  const mitad = Math.ceil(p.length / 2);
  return [...enLineas(g, p.slice(0, mitad).join(" "), max, min, ancho), ...enLineas(g, p.slice(mitad).join(" "), max, min, ancho)];
}

// La etiqueta para que quepa en la zona verde: si en una fila no cabe a buen tamaño, en dos; y el tamaño (como mucho
// `tam`) con el que cabe. Devuelve { texto, tam }.
function prepEtiqueta(g, texto, tam) {
  const cabe = (txt, t) => { g.font = `800 ${t}px Figtree`; return Math.max(...String(txt).split("|").map((f) => g.measureText(f.trim()).width)) + 88 <= 760; };
  const p = String(texto).trim().split(/\s+/);
  if (!String(texto).includes("|") && p.length > 2 && !cabe(texto, tam * 0.85)) {
    const mitad = Math.ceil(p.length / 2); texto = p.slice(0, mitad).join(" ") + "|" + p.slice(mitad).join(" ");
  }
  while (tam > 30 && !cabe(texto, tam)) tam -= 2;
  return { texto, tam };
}

function flyer(t) {
  const c = createCanvas(ANCHO, ALTO), g = c.getContext("2d");
  g.fillStyle = M.oscuro; g.fillRect(0, 0, ANCHO, ALTO);
  g.drawImage(fotograma(proy, est, t), 0, dy);
  const medida = titular(g, titulo, { x: CX, y0: Y0, ancho: ANCHO_T, dibujar: false, modo: M.estilo === "bloque" ? "caja" : "color", tam: 132 });
  const fin = Y0 + medida.alto;
  if (M.estilo === "impacto") {
    // como las portadas de packs/portadas-ejemplos/: una línea blanca, la CLAVE enorme en mayúsculas y en el color de
    // acento con su sombra sólida, otra línea blanca; la banda oscura arriba que se funde con la imagen.
    const m = titulo.match(/^(.*?)\*([^*]+)\*(.*)$/), w = titulo.replace(/\*/g, "").trim().split(/\s+/);
    let pre = m ? m[1].trim() : w.slice(0, -1).join(" "), clave = (m ? m[2] : w[w.length - 1]).trim().toUpperCase(), post = m ? m[3].trim() : "";
    // un signo suelto («?», «!», «¿») no va solo en una línea: se pega a la clave
    if (/^[?!.,:;…»"')]+$/.test(post)) { clave += post; post = ""; }
    if (/^[¿¡«"(]+$/.test(pre)) { clave = pre + clave; pre = ""; }
    const lineas = [];
    const blanca = (txt) => { if (txt) for (const l of enLineas(g, txt, 118, 72, ANCHO_T)) lineas.push({ ...l, clave: false }); };
    blanca(pre);
    const claves = enLineas(g, clave, 236, 100, ANCHO_T), tc = Math.min(...claves.map((l) => l.t)); // la clave, toda del mismo tamaño
    for (const l of claves) lineas.push({ txt: l.txt, t: tc, clave: true });
    blanca(post);
    let y = 270;
    const pos = lineas.map((l) => { const base = y + l.t * 0.82; y += l.t * (l.clave ? 1.02 : 1.18); return base; });
    const fin = y;
    const banda = fin + 300, gr = g.createLinearGradient(0, 0, 0, banda);
    gr.addColorStop(0, rgba(M.oscuro, 1)); gr.addColorStop((fin + 40) / banda, rgba(M.oscuro, 1)); gr.addColorStop(1, rgba(M.oscuro, 0));
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
    if (tiene) { const E = prepEtiqueta(g, op.etiqueta, 64); etiqueta(g, E.texto, { x: CX, y: Math.max(fin + 80, 1290), tam: E.tam, fondo: M.sticker, tinta: M.sticker_texto, giro: -0.035, sombraColor: M.sticker_texto }); }
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
segundos.forEach((t, i) => {
  const c = flyer(t), f = join(carpeta, `portada-${i + 1}.jpg`);
  writeFileSync(f, c.toBuffer("image/jpeg", 92));
  const z = createCanvas(ANCHO, ALTO), gz = z.getContext("2d");
  gz.drawImage(c, 0, 0); zonas(gz);
  writeFileSync(join(carpeta, `portada-${i + 1}-zonas.jpg`), z.toBuffer("image/jpeg", 80));
  hechas.push({ c, f, t });
});

// la cuadrícula del perfil: cada flyer recortado a 3:4 (1080 × 1440, centrado), como lo enseña Instagram
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
console.log(`Estilo ${M.estilo}. Mira cada portada y su -zonas.jpg. La elegida se copia como salida/${nombre}/flyer.jpg (la portada.jpg original no se toca).`);
