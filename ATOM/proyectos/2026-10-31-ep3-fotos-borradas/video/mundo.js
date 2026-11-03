// Mundo compartido para MITOS DE TU CELULAR · EP. 3 (Estilo Sovera · ATOM Élite 60 fps)
// Todo se calcula desde `t` y semillas fijas (`k.azar`), con luz, volumen, cristal, silicio y texturas reales.
import * as k from "#kit";

const { azar, lienzo, fijar, redondo, suave, tramo, mez, mezColor } = k;
export { redondo };

// ---------------------------------------------------------------- Cámara 2D logarítmica y frenado C^1 antes de corte
export function vista(g, Z, cx, cy) {
  g.setTransform(Z, 0, 0, Z, 540 - cx * Z, 960 - cy * Z);
}

export function sinVista(g) {
  g.setTransform(1, 0, 0, 1, 0, 0);
}

export function camino2D(claves) {
  const Zs = k.claves(claves.map(([t, c]) => [t, Math.log(c[0])]));
  const Xs = k.claves(claves.map(([t, c]) => [t, c[1]]));
  const Ys = k.claves(claves.map(([t, c]) => [t, c[2]]));
  return (t) => [Math.exp(Zs(t)), Xs(t), Ys(t)];
}

export function relojPlano(t, tCorte, reposo = 0.16, freno = 0.24) {
  const b = tCorte - reposo;
  const a = b - freno;
  if (t <= a) return t;
  if (t >= b) return a + 0.5 * freno;
  const u = (t - a) / freno;
  return a + freno * (u - u * u * u + 0.5 * u * u * u * u);
}

export function capaSuperiorMarca(g, fuerzaVelo = 0.6) {
  g.save();
  sinVista(g);
  if (fuerzaVelo > 0.01) {
    const vg = g.createLinearGradient(0, 0, 0, 610);
    vg.addColorStop(0, `rgba(5, 8, 16, ${Math.min(0.94, fuerzaVelo * 1.15)})`);
    vg.addColorStop(0.62, `rgba(5, 8, 16, ${fuerzaVelo * 0.74})`);
    vg.addColorStop(1, "rgba(5, 8, 16, 0)");
    g.fillStyle = vg;
    g.fillRect(0, 0, 1080, 610);
  }
  g.font = "700 28px Figtree";
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.fillStyle = "rgba(232, 240, 255, 0.62)";
  g.shadowColor = "rgba(0, 0, 0, 0.65)";
  g.shadowBlur = 12;
  g.fillText("p u r a   p r u e b a", 540, 212);
  g.restore();
}

export function vineta(g, fuerza = 0.56) {
  g.save();
  sinVista(g);
  const vg = g.createRadialGradient(540, 980, 430, 540, 980, 1280);
  vg.addColorStop(0, "rgba(0,0,0,0)");
  vg.addColorStop(1, `rgba(0,0,0,${fuerza})`);
  g.fillStyle = vg;
  g.fillRect(0, 0, 1080, 1920);
  g.restore();
}

// ---------------------------------------------------------------- Fondos (Mosaico Sovera oscuro + Mesas claras)
const BALDOSA = (() => {
  const c = lienzo(270, 270);
  const g = c.getContext("2d");
  const bg = g.createLinearGradient(0, 0, 270, 270);
  bg.addColorStop(0, "#1d293d");
  bg.addColorStop(0.5, "#162032");
  bg.addColorStop(1, "#101827");
  g.fillStyle = bg;
  g.fillRect(0, 0, 270, 270);

  g.globalCompositeOperation = "screen";
  g.globalAlpha = 0.16;
  g.drawImage(k.manchas, -40, -40, 360, 360);

  g.globalCompositeOperation = "multiply";
  g.globalAlpha = 0.28;
  g.drawImage(k.red, -20, -20, 320, 320);

  g.globalCompositeOperation = "source-over";
  g.globalAlpha = 1;
  g.fillStyle = "#080c14";
  g.fillRect(0, 0, 270, 10);
  g.fillRect(0, 0, 10, 270);
  g.fillStyle = "rgba(160, 195, 255, 0.14)";
  g.fillRect(10, 10, 258, 3);
  g.fillRect(10, 10, 3, 258);
  return fijar(c);
})();

export function fondoMosaico(g, t, desplazaX = 0, desplazaY = 0, luzColor = "47, 124, 246", luzAl = 0.3) {
  g.save();
  sinVista(g);
  g.fillStyle = "#0a0f1a";
  g.fillRect(0, 0, 1080, 1920);
  const ox = ((desplazaX % 270) + 270) % 270 - 270;
  const oy = ((desplazaY % 270) + 270) % 270 - 270;
  for (let y = oy; y < 1920; y += 270) {
    for (let x = ox; x < 1080; x += 270) {
      g.drawImage(BALDOSA, x, y);
    }
  }
  if (luzAl > 0.005) {
    const lx = 540 + Math.sin(t * 0.7) * 70;
    const ly = 1120 + Math.cos(t * 0.5) * 60;
    const lg = g.createRadialGradient(lx, ly, 40, lx, ly, 860);
    lg.addColorStop(0, `rgba(${luzColor}, ${luzAl})`);
    lg.addColorStop(0.55, `rgba(${luzColor}, ${luzAl * 0.35})`);
    lg.addColorStop(1, "rgba(0, 0, 0, 0)");
    g.globalCompositeOperation = "lighter";
    g.fillStyle = lg;
    g.fillRect(0, 0, 1080, 1920);
  }
  g.restore();
}

export function fondoMesaClara(g, t, paleta = "fria") {
  g.save();
  sinVista(g);
  const colores = paleta === "calida"
    ? { top: "#120d08", mid: "#3b2a1a", mesaA: "#f7ebd9", mesaB: "#e6cfb0", borde: "#fff7eb", rej: "rgba(120, 78, 36, 0.10)" }
    : paleta === "menta"
    ? { top: "#071715", mid: "#153d38", mesaA: "#e3f7f2", mesaB: "#bfe6dc", borde: "#f2fcf9", rej: "rgba(18, 90, 76, 0.10)" }
    : { top: "#091322", mid: "#1c3554", mesaA: "#e4eef9", mesaB: "#bfd3ea", borde: "#f5f9ff", rej: "rgba(30, 64, 110, 0.10)" };

  const bg = g.createLinearGradient(0, 0, 0, 1920);
  bg.addColorStop(0, colores.top);
  bg.addColorStop(0.26, colores.mid);
  bg.addColorStop(0.34, colores.mesaA);
  bg.addColorStop(1, colores.mesaB);
  g.fillStyle = bg;
  g.fillRect(0, 0, 1080, 1920);

  redondo(g, 32, 535, 1016, 1335, 44);
  const tg = g.createLinearGradient(0, 535, 0, 1870);
  tg.addColorStop(0, colores.mesaA);
  tg.addColorStop(1, colores.mesaB);
  g.fillStyle = tg;
  g.fill();
  g.strokeStyle = colores.borde;
  g.lineWidth = 4;
  g.stroke();

  g.save();
  redondo(g, 32, 535, 1016, 1335, 44);
  g.clip();
  g.strokeStyle = colores.rej;
  g.lineWidth = 2;
  const dx = (t * 18) % 90;
  for (let x = -90 + dx; x < 1120; x += 90) {
    g.beginPath(); g.moveTo(x, 535); g.lineTo(x, 1870); g.stroke();
  }
  for (let y = 580; y < 1870; y += 90) {
    g.beginPath(); g.moveTo(32, y); g.lineTo(1048, y); g.stroke();
  }
  g.globalCompositeOperation = "multiply";
  g.globalAlpha = 0.08;
  g.drawImage(k.manchas, -80, 500, 1250, 1450);
  g.restore();
  g.restore();
}

// ---------------------------------------------------------------- Insignias y píldoras estilo @sovera.ia
export function insigniaEpisodio(g, x, y, antetitulo, grande, subtitulo = "", colorSub = "#22E39B", al = 1, escala = 1) {
  if (al <= 0.005) return;
  g.save();
  g.translate(x, y);
  g.scale(escala, escala);
  g.globalAlpha *= al;

  const w = subtitulo ? 800 : 720;
  const h = subtitulo ? 300 : 250;
  const x0 = -w / 2;
  const y0 = -h / 2;

  g.shadowColor = "rgba(0, 0, 0, 0.72)";
  g.shadowBlur = 46;
  g.shadowOffsetY = 18;
  redondo(g, x0, y0, w, h, 38);
  const fg = g.createLinearGradient(0, y0, 0, y0 + h);
  fg.addColorStop(0, "rgba(18, 25, 38, 0.94)");
  fg.addColorStop(1, "rgba(9, 13, 22, 0.96)");
  g.fillStyle = fg;
  g.fill();

  g.shadowBlur = 0;
  g.shadowOffsetY = 0;
  redondo(g, x0 + 2, y0 + 2, w - 4, h - 4, 36);
  g.strokeStyle = "rgba(255, 255, 255, 0.34)";
  g.lineWidth = 3.5;
  g.stroke();

  g.textAlign = "center";
  g.textBaseline = "middle";
  g.font = "800 34px Figtree";
  g.fillStyle = "rgba(230, 238, 252, 0.88)";
  g.fillText(antetitulo, 0, y0 + 54);

  g.font = "800 116px Figtree";
  g.fillStyle = "#FFFFFF";
  g.shadowColor = "rgba(47, 124, 246, 0.45)";
  g.shadowBlur = 24;
  g.fillText(grande, 0, y0 + (subtitulo ? 152 : 158));
  g.shadowBlur = 0;

  if (subtitulo) {
    g.font = "800 28px Figtree";
    const sw = g.measureText(subtitulo).width + 54;
    const sh = 50;
    redondo(g, -sw / 2, y0 + h - 72, sw, sh, 16);
    g.fillStyle = colorSub;
    g.fill();
    g.fillStyle = "#06120e";
    g.fillText(subtitulo, 0, y0 + h - 47);
  }
  g.restore();
}

export function pildoraEstado(g, x, y, texto, colorRgb = "34, 227, 155", al = 1, tam = 44, fondoClaro = false) {
  if (al <= 0.005) return;
  g.save();
  g.globalAlpha *= al;
  g.font = `800 ${tam}px Figtree`;
  const w = g.measureText(texto).width + 68;
  const h = tam + 34;
  const x0 = x - w / 2;
  const y0 = y - h / 2;

  g.shadowColor = fondoClaro ? "rgba(15, 23, 42, 0.25)" : "rgba(0, 0, 0, 0.62)";
  g.shadowBlur = 26;
  g.shadowOffsetY = 10;
  redondo(g, x0, y0, w, h, 24);
  g.fillStyle = "rgba(10, 15, 26, 0.94)";
  g.fill();

  g.shadowBlur = 0;
  g.shadowOffsetY = 0;
  redondo(g, x0 + 1.5, y0 + 1.5, w - 3, h - 3, 22.5);
  g.strokeStyle = `rgba(${colorRgb}, 0.78)`;
  g.lineWidth = 3.5;
  g.stroke();

  g.textAlign = "center";
  g.textBaseline = "middle";
  g.shadowColor = `rgba(${colorRgb}, 0.5)`;
  g.shadowBlur = 14;
  g.fillStyle = `rgb(${colorRgb})`;
  g.fillText(texto, x, y + 2);
  g.restore();
}

// ---------------------------------------------------------------- Chispas eléctricas deterministas
export function dibujarChispas(g, x, y, t, intensidad = 1, semilla = 41, colorRgb = "56, 189, 248") {
  if (intensidad <= 0.01) return;
  g.save();
  g.globalCompositeOperation = "lighter";
  k.brillo(g, x, y, 240 * (0.7 + 0.3 * Math.sin(t * 22)), colorRgb, intensidad * 0.72);

  const paso = Math.floor(t * 18);
  const az = azar(semilla + paso * 17);
  for (let i = 0; i < 7; i++) {
    const ang = az() * Math.PI * 2;
    const largo = (44 + az() * 105) * intensidad;
    const mx = x + Math.cos(ang + 0.28) * largo * 0.52;
    const my = y + Math.sin(ang + 0.28) * largo * 0.52;
    const fx = x + Math.cos(ang) * largo;
    const fy = y + Math.sin(ang) * largo;

    g.strokeStyle = `rgba(${colorRgb}, ${0.85 * intensidad})`;
    g.lineWidth = 4.2;
    g.lineCap = "round";
    g.beginPath();
    g.moveTo(x, y);
    g.lineTo(mx, my);
    g.lineTo(fx, fy);
    g.stroke();

    g.strokeStyle = `rgba(255, 250, 220, ${0.9 * intensidad})`;
    g.lineWidth = 1.8;
    g.stroke();
  }
  g.restore();
}

// ---------------------------------------------------------------- Fotografía reconocible (atardecer dorado, montañas, mar y silueta)
// Puede mostrarse normal, en rejilla de píxeles (`rejilla = 0..1`), o convertirse en nieve cifrada (`cifrado = 0..1`).
export function dibujarFotoRecuerdo(g, cx, cy, w, h, opts = {}) {
  const {
    marco = true,
    rejilla = 0,
    cifrado = 0,
    tinteAlerta = 0,
    etiqueta = "",
    t = 0,
    variante = "playa", // "playa" | "ciudad" | "video"
  } = opts;

  const x0 = cx - w / 2;
  const y0 = cy - h / 2;
  const r = Math.min(26, w * 0.08);

  g.save();
  if (marco) {
    g.shadowColor = "rgba(0, 0, 0, 0.45)";
    g.shadowBlur = 28;
    g.shadowOffsetY = 12;
    redondo(g, x0 - 10, y0 - 10, w + 20, h + 20, r + 6);
    g.fillStyle = "#f8fafc";
    g.fill();
    g.shadowBlur = 0;
    g.shadowOffsetY = 0;
  }

  redondo(g, x0, y0, w, h, r);
  g.clip();

  if (variante === "playa") {
    const sky = g.createLinearGradient(x0, y0, x0, y0 + h);
    sky.addColorStop(0, "#1d4ed8");
    sky.addColorStop(0.45, "#f97316");
    sky.addColorStop(0.72, "#fde047");
    sky.addColorStop(1, "#0284c7");
    g.fillStyle = sky;
    g.fillRect(x0, y0, w, h);

    // Sol cálido
    g.fillStyle = "#fef08a";
    g.beginPath();
    g.arc(cx + w * 0.16, y0 + h * 0.36, w * 0.14, 0, Math.PI * 2);
    g.fill();

    // Montañas sobre el mar
    g.fillStyle = "#1e1b4b";
    g.beginPath();
    g.moveTo(x0, y0 + h * 0.68);
    g.lineTo(x0 + w * 0.28, y0 + h * 0.42);
    g.lineTo(x0 + w * 0.56, y0 + h * 0.62);
    g.lineTo(x0 + w * 0.8, y0 + h * 0.46);
    g.lineTo(x0 + w, y0 + h * 0.68);
    g.lineTo(x0 + w, y0 + h);
    g.lineTo(x0, y0 + h);
    g.closePath();
    g.fill();

    // Franja turquesa del mar abajo
    const sea = g.createLinearGradient(x0, y0 + h * 0.68, x0, y0 + h);
    sea.addColorStop(0, "#0ea5e9");
    sea.addColorStop(1, "#0f172a");
    g.fillStyle = sea;
    g.fillRect(x0, y0 + h * 0.68, w, h * 0.32);

    // Silueta de retrato en primer plano izquierdo
    g.fillStyle = "#090d16";
    g.beginPath();
    g.arc(x0 + w * 0.3, y0 + h * 0.56, w * 0.085, 0, Math.PI * 2);
    g.fill();
    redondo(g, x0 + w * 0.17, y0 + h * 0.66, w * 0.26, h * 0.36, w * 0.1);
    g.fill();
  } else if (variante === "ciudad") {
    const bg = g.createLinearGradient(x0, y0, x0 + w, y0 + h);
    bg.addColorStop(0, "#0f766e");
    bg.addColorStop(1, "#1e3a8a");
    g.fillStyle = bg;
    g.fillRect(x0, y0, w, h);
    g.fillStyle = "#34d399";
    for (let i = 0; i < 5; i++) {
      const bw = w * 0.14;
      const bh = h * (0.32 + (i % 3) * 0.16);
      g.fillRect(x0 + w * 0.1 + i * (bw + w * 0.03), y0 + h - bh, bw, bh);
    }
  } else {
    const bg = g.createLinearGradient(x0, y0, x0 + w, y0 + h);
    bg.addColorStop(0, "#7c3aed");
    bg.addColorStop(1, "#db2777");
    g.fillStyle = bg;
    g.fillRect(x0, y0, w, h);
    // Triángulo Play de video nuevo
    g.fillStyle = "#ffffff";
    g.beginPath();
    g.moveTo(cx - w * 0.08, cy - h * 0.14);
    g.lineTo(cx + w * 0.14, cy);
    g.lineTo(cx - w * 0.08, cy + h * 0.14);
    g.closePath();
    g.fill();
  }

  // Rejilla de píxeles RGB cuando se mira como datos crudos en el chip
  if (rejilla > 0.02) {
    g.save();
    g.globalAlpha = rejilla * 0.72;
    g.strokeStyle = "rgba(15, 23, 42, 0.75)";
    g.lineWidth = 2;
    const paso = Math.max(18, Math.round(w / 10));
    for (let px = x0; px <= x0 + w; px += paso) {
      g.beginPath(); g.moveTo(px, y0); g.lineTo(px, y0 + h); g.stroke();
    }
    for (let py = y0; py <= y0 + h; py += paso) {
      g.beginPath(); g.moveTo(x0, py); g.lineTo(x0 + w, py); g.stroke();
    }
    g.restore();
  }

  // Tinte rojo de foto oculta pero recuperable
  if (tinteAlerta > 0.02) {
    g.fillStyle = `rgba(239, 68, 68, ${tinteAlerta * 0.36})`;
    g.fillRect(x0, y0, w, h);
  }

  // Nieve criptográfica ilegible cuando se destruye la llave AES
  if (cifrado > 0.02) {
    g.save();
    g.globalAlpha = cifrado;
    g.fillStyle = "#071318";
    g.fillRect(x0, y0, w, h);
    const cols = 10;
    const rows = 10;
    const cw = w / cols;
    const ch = h / rows;
    const az = azar(901 + Math.floor(t * 10));
    for (let rI = 0; rI < rows; rI++) {
      for (let cI = 0; cI < cols; cI++) {
        const vL = az();
        g.fillStyle = vL > 0.65 ? "#10b981" : vL > 0.3 ? "#1e293b" : "#0f172a";
        g.fillRect(x0 + cI * cw + 1, y0 + rI * ch + 1, cw - 2, ch - 2);
      }
    }
    g.restore();
  }

  if (etiqueta) {
    redondo(g, x0 + 12, y0 + 12, g.measureText(etiqueta).width + 44, 38, 12);
    g.fillStyle = "rgba(9, 13, 22, 0.86)";
    g.fill();
    g.font = "800 20px Figtree";
    g.textAlign = "left";
    g.textBaseline = "middle";
    g.fillStyle = "#e2e8f0";
    g.fillText(etiqueta, x0 + 26, y0 + 31);
  }

  g.restore();
}

// ---------------------------------------------------------------- Celular con Galería / Papelera + Rayos X del Chip NAND Flash
export function dibujarCelularGaleria(g, cx, cy, w, h, opts = {}) {
  const {
    borradaArriba = 0, // 0..1 la foto cae a la papelera y desaparece de la pantalla
    rayosX = 0,        // 0..1 ventana interior sobre el chip NAND Flash
    fotoEnChip = 1,    // 1 = intacta y brillante en el chip; 0 = cifrada
    alertaChip = false,// true = rojo recuperable, false = esmeralda vivo
    etiquetaVenta = false,
    t = 0,
  } = opts;

  const x0 = cx - w / 2;
  const y0 = cy - h / 2;
  const r = w * 0.135;

  g.save();
  g.shadowColor = "rgba(0, 0, 0, 0.68)";
  g.shadowBlur = 50;
  g.shadowOffsetY = 24;
  redondo(g, x0, y0, w, h, r);
  g.fillStyle = "#121722";
  g.fill();
  g.shadowBlur = 0;
  g.shadowOffsetY = 0;

  redondo(g, x0, y0, w, h, r);
  k.metal(g, x0, x0 + w, ["#4d5666", "#d5deec", "#697588", "#eef3fa", "#373f4d"]);

  const b = Math.max(8, w * 0.026);
  redondo(g, x0 + b, y0 + b, w - b * 2, h - b * 2, r - b * 0.7);
  g.fillStyle = "#06080d";
  g.fill();

  const sx = x0 + b * 1.55;
  const sy = y0 + b * 1.55;
  const sw = w - b * 3.1;
  const sh = h - b * 3.1;
  const sr = Math.max(12, r - b * 1.2);

  g.save();
  redondo(g, sx, sy, sw, sh, sr);
  g.clip();

  const pGrad = g.createLinearGradient(sx, sy, sx, sy + sh);
  pGrad.addColorStop(0, "#101c33");
  pGrad.addColorStop(1, "#070c17");
  g.fillStyle = pGrad;
  g.fillRect(sx, sy, sw, sh);

  // Dynamic Island
  const iw = sw * 0.29;
  const ih = Math.max(14, sh * 0.028);
  redondo(g, cx - iw / 2, sy + sh * 0.022, iw, ih, ih / 2);
  g.fillStyle = "#020306";
  g.fill();

  // Encabezado de Galería / Papelera
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.font = `800 ${Math.round(sw * 0.056)}px Figtree`;
  g.fillStyle = "#e2e8f0";
  g.fillText(borradaArriba > 0.65 ? "Papelera · 0 fotos" : "Galería · IMG_2048", cx, sy + sh * 0.095);

  // Área superior de la foto en pantalla
  const fotoY = sy + sh * 0.27 + borradaArriba * 125;
  const escFoto = 1 - borradaArriba * 0.75;
  if (borradaArriba < 0.96) {
    g.save();
    g.globalAlpha = 1 - borradaArriba;
    g.translate(cx, fotoY);
    g.scale(escFoto, escFoto);
    dibujarFotoRecuerdo(g, 0, 0, sw * 0.64, sh * 0.24, { marco: true, t });
    g.restore();
  }

  if (borradaArriba > 0.55) {
    g.save();
    g.globalAlpha = (borradaArriba - 0.55) / 0.45;
    redondo(g, cx - sw * 0.34, sy + sh * 0.16, sw * 0.68, sh * 0.22, 22);
    g.strokeStyle = "rgba(148, 163, 184, 0.35)";
    g.setLineDash([10, 10]);
    g.lineWidth = 3;
    g.stroke();
    g.setLineDash([]);
    g.fillStyle = "#94a3b8";
    g.font = `700 ${Math.round(sw * 0.048)}px Figtree`;
    g.fillText("Papelera vaciada", cx, sy + sh * 0.27);
    g.restore();
  }

  // Botón táctil «Vaciar papelera»
  const btnX = cx;
  const btnY = sy + sh * 0.47;
  const btnW = sw * 0.72;
  const btnH = sh * 0.082;
  redondo(g, btnX - btnW / 2, btnY - btnH / 2, btnW, btnH, 20);
  g.fillStyle = borradaArriba > 0.4 ? "rgba(30, 41, 59, 0.9)" : "#ef4444";
  g.fill();
  g.fillStyle = "#ffffff";
  g.font = `800 ${Math.round(sw * 0.046)}px Figtree`;
  g.fillText(borradaArriba > 0.4 ? "✓ Papelera vacía" : "✕ Vaciar papelera", btnX, btnY + 1);

  // Ventana Rayos X inferior revelando el CHIP NAND FLASH con la foto aún entera adentro
  const rxX = cx;
  const rxY = sy + sh * 0.75;
  if (rayosX > 0.01) {
    const rxW = sw * 0.86;
    const rxH = sh * 0.37;

    g.save();
    g.globalAlpha = rayosX;
    redondo(g, rxX - rxW / 2, rxY - rxH / 2, rxW, rxH, 26);
    g.fillStyle = "#061018";
    g.fill();
    g.clip();

    const colPista = alertaChip ? "#f87171" : "#22e39b";
    g.strokeStyle = colPista;
    g.lineWidth = 3.5;
    for (let i = -3; i <= 3; i++) {
      g.beginPath();
      g.moveTo(rxX - rxW / 2, rxY + i * 28);
      g.lineTo(rxX + rxW / 2, rxY + i * 28);
      g.stroke();
    }

    // Encapsulado negro del chip NAND Flash
    const chipW = rxW * 0.76;
    const chipH = rxH * 0.78;
    redondo(g, rxX - chipW / 2, rxY - chipH / 2, chipW, chipH, 20);
    g.fillStyle = "#0d1726";
    g.fill();
    g.strokeStyle = colPista;
    g.lineWidth = 3.5;
    g.stroke();

    k.brillo(g, rxX, rxY, chipW * 0.95, alertaChip ? "248, 113, 113" : "34, 227, 155", 0.48 + 0.2 * Math.sin(t * 7));

    // La misma fotografía brillando intacta dentro de las celdas del chip
    dibujarFotoRecuerdo(g, rxX, rxY - 12, chipW * 0.68, chipH * 0.58, {
      marco: false,
      rejilla: 0.7,
      cifrado: 1 - fotoEnChip,
      tinteAlerta: alertaChip ? 0.5 : 0,
      t,
    });

    g.fillStyle = alertaChip ? "#fca5a5" : "#6ee7b7";
    g.font = `800 ${Math.round(sw * 0.039)}px Figtree`;
    g.fillText(alertaChip ? "CHIP NAND · AÚN RECUPERABLE" : "CHIP NAND · FOTO ENTERA", rxX, rxY + chipH * 0.36);
    g.restore();

    g.save();
    g.globalAlpha = rayosX;
    redondo(g, rxX - rxW / 2, rxY - rxH / 2, rxW, rxH, 26);
    g.strokeStyle = alertaChip ? "rgba(248, 113, 113, 0.85)" : "rgba(34, 227, 155, 0.82)";
    g.lineWidth = 3.5;
    g.stroke();
    g.restore();
  }

  // Reflejo diagonal de cristal
  g.save();
  g.globalAlpha = 0.08;
  g.fillStyle = "#ffffff";
  g.beginPath();
  g.moveTo(sx + sw * 0.14, sy);
  g.lineTo(sx + sw * 0.5, sy);
  g.lineTo(sx - sw * 0.1, sy + sh);
  g.lineTo(sx - sw * 0.42, sy + sh);
  g.closePath();
  g.fill();
  g.restore();

  g.restore();

  // Etiqueta colgante opcional «EN VENTA»
  if (etiquetaVenta) {
    g.save();
    g.translate(x0 + w - 26, y0 + 82);
    g.rotate(0.14);
    redondo(g, -110, -34, 220, 68, 16);
    g.fillStyle = "#f59e0b";
    g.fill();
    g.strokeStyle = "#fef3c7";
    g.lineWidth = 3;
    g.stroke();
    g.fillStyle = "#1c1917";
    g.font = "800 28px Figtree";
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.fillText("$ EN VENTA", 0, 1);
    g.restore();
  }

  g.restore();

  return {
    botonX: btnX,
    botonY: btnY,
    chipX: rxX,
    chipY: rxY,
  };
}

// ---------------------------------------------------------------- Llave dorada criptográfica (entera o partiéndose en fragmentos)
export function dibujarLlaveCripto(g, cx, cy, escala = 1, rotura = 0, t = 0) {
  g.save();
  g.translate(cx, cy);
  g.scale(escala, escala);

  if (rotura < 0.04) {
    k.brillo(g, 0, 0, 210, "250, 204, 21", 0.5 + 0.2 * Math.sin(t * 6));
    const lg = g.createLinearGradient(-150, -60, 150, 60);
    lg.addColorStop(0, "#b45309");
    lg.addColorStop(0.35, "#fef08a");
    lg.addColorStop(0.65, "#f59e0b");
    lg.addColorStop(1, "#78350f");
    g.fillStyle = lg;
    g.strokeStyle = "#fef9c3";
    g.lineWidth = 3;

    // Cabeza anular de la llave
    g.beginPath();
    g.arc(-78, 0, 56, 0, Math.PI * 2);
    g.fill();
    g.stroke();

    g.fillStyle = "#0d1b22";
    g.beginPath();
    g.arc(-78, 0, 22, 0, Math.PI * 2);
    g.fill();

    // Tallo y dientes de la llave
    g.fillStyle = lg;
    redondo(g, -28, -14, 172, 28, 10);
    g.fill();
    g.stroke();
    redondo(g, 76, 10, 24, 34, 6);
    g.fill();
    redondo(g, 112, 10, 24, 46, 6);
    g.fill();
  } else {
    // Fragmentos dorados separándose y desvaneciéndose al destruir la llave
    const az = azar(733);
    const al = Math.max(0, 1 - rotura * 0.85);
    k.fogonazo(g, 0, 0, rotura * 0.6, 360, "250, 204, 21");
    for (let i = 0; i < 14; i++) {
      const xBase = -110 + (i / 13) * 240;
      const ang = (az() - 0.5) * Math.PI * 2;
      const dist = rotura * (95 + az() * 190);
      const px = xBase + Math.cos(ang) * dist;
      const py = Math.sin(ang) * dist;
      g.save();
      g.globalAlpha = al;
      g.translate(px, py);
      g.rotate(rotura * (2 + i * 0.4));
      redondo(g, -18, -12, 36, 24, 6);
      g.fillStyle = i % 2 === 0 ? "#fde047" : "#f59e0b";
      g.fill();
      g.restore();
    }
  }

  g.restore();
}

// ---------------------------------------------------------------- Dedo humano realista
export function dibujarDedo(g, xPunta, yPunta, ang = -0.38, presion = 0, escala = 1) {
  g.save();
  g.translate(xPunta, yPunta);

  if (presion > 0.02) {
    g.save();
    g.globalCompositeOperation = "lighter";
    const r = 24 + presion * 54;
    g.strokeStyle = `rgba(140, 200, 255, ${(1 - presion * 0.5) * 0.78})`;
    g.lineWidth = 5;
    g.beginPath();
    g.arc(0, 0, r, 0, Math.PI * 2);
    g.stroke();
    g.restore();
  }

  g.rotate(ang);
  g.scale(escala * (1 - presion * 0.03), escala * (1 + presion * 0.02));

  const w = 116;
  const L = 540;

  g.shadowColor = "rgba(0, 0, 0, 0.5)";
  g.shadowBlur = 28;
  g.shadowOffsetX = -10;
  g.shadowOffsetY = 16;

  g.beginPath();
  g.moveTo(0, -w / 2);
  g.quadraticCurveTo(-w * 0.56, -w / 2, -w * 0.56, 0);
  g.quadraticCurveTo(-w * 0.56, w / 2, 0, w / 2);
  g.lineTo(L, w * 0.58);
  g.lineTo(L, -w * 0.58);
  g.closePath();

  const piel = g.createLinearGradient(0, -w * 0.58, 0, w * 0.58);
  piel.addColorStop(0, "#f5c6a5");
  piel.addColorStop(0.4, "#eab08a");
  piel.addColorStop(0.8, "#cf8e68");
  piel.addColorStop(1, "#a66846");
  g.fillStyle = piel;
  g.fill();
  g.shadowBlur = 0;

  g.beginPath();
  redondo(g, -w * 0.38, -w * 0.33, w * 0.72, w * 0.66, 24);
  g.fillStyle = "#fbd5bf";
  g.fill();
  g.strokeStyle = "rgba(255, 255, 255, 0.45)";
  g.lineWidth = 2;
  g.stroke();

  g.restore();
}
