// Mundo compartido para MITOS DE TU CELULAR · EP. 4 (Estilo Sovera · ATOM Élite 60 fps · Cierre de Temporada)
// Todo se calcula desde `t` y semillas fijas (`k.azar`), con luz, volumen, lentes de cristal, silicio y texturas reales.
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
export function insigniaEpisodio(g, x, y, antetitulo, grande, subtitulo = "", colorSub = "#FBBF24", al = 1, escala = 1) {
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

  g.font = "800 108px Figtree";
  g.fillStyle = "#FFFFFF";
  g.shadowColor = "rgba(251, 191, 36, 0.42)";
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
    g.fillStyle = "#140d02";
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

// ---------------------------------------------------------------- Foto nocturna o diurna (nítida vs. oscura con grano RGB)
export function dibujarFotoEscena(g, cx, cy, w, h, opts = {}) {
  const {
    modo = "noche-nitida", // "noche-nitida" | "noche-ruido" | "dia-sol"
    ruido = 0,
    flash = 0,
    t = 0,
  } = opts;

  const x0 = cx - w / 2;
  const y0 = cy - h / 2;
  const r = Math.min(24, w * 0.08);

  g.save();
  redondo(g, x0, y0, w, h, r);
  g.clip();

  if (modo === "dia-sol") {
    const sky = g.createLinearGradient(x0, y0, x0, y0 + h);
    sky.addColorStop(0, "#0284c7");
    sky.addColorStop(0.55, "#38bdf8");
    sky.addColorStop(1, "#bae6fd");
    g.fillStyle = sky;
    g.fillRect(x0, y0, w, h);

    // Sol radiante
    g.fillStyle = "#fef08a";
    g.beginPath();
    g.arc(x0 + w * 0.76, y0 + h * 0.24, w * 0.13, 0, Math.PI * 2);
    g.fill();

    // Edificios nítidos a pleno sol
    const cols = ["#cbd5e1", "#94a3b8", "#e2e8f0", "#cbd5e1"];
    for (let i = 0; i < 4; i++) {
      const bw = w * 0.2;
      const bh = h * (0.42 + (i % 2) * 0.18);
      const bx = x0 + w * 0.07 + i * (bw + w * 0.025);
      g.fillStyle = cols[i];
      g.fillRect(bx, y0 + h - bh, bw, bh);
      g.fillStyle = "#0369a1";
      for (let wy = y0 + h - bh + 16; wy < y0 + h - 18; wy += 24) {
        g.fillRect(bx + 10, wy, bw - 20, 10);
      }
    }
  } else {
    // Escena urbana nocturna con luna, farola cálida y silueta de edificios
    const esNitida = modo === "noche-nitida";
    const sky = g.createLinearGradient(x0, y0, x0, y0 + h);
    sky.addColorStop(0, esNitida ? "#0f1e3d" : "#07090e");
    sky.addColorStop(0.6, esNitida ? "#1d335c" : "#0e1118");
    sky.addColorStop(1, esNitida ? "#1e293b" : "#090b10");
    g.fillStyle = sky;
    g.fillRect(x0, y0, w, h);

    // Luna creciente luminosa
    g.fillStyle = esNitida ? "#fef08a" : "rgba(203, 213, 225, 0.35)";
    g.beginPath();
    g.arc(x0 + w * 0.76, y0 + h * 0.22, w * 0.095, 0, Math.PI * 2);
    g.fill();

    // Edificios iluminados de noche
    for (let i = 0; i < 4; i++) {
      const bw = w * 0.19;
      const bh = h * (0.38 + ((i + 1) % 3) * 0.14);
      const bx = x0 + w * 0.07 + i * (bw + w * 0.035);
      g.fillStyle = esNitida ? "#111c30" : "#06080c";
      g.fillRect(bx, y0 + h - bh, bw, bh);

      // Ventanas cálidas encendidas
      g.fillStyle = esNitida ? "#fbbf24" : "rgba(180, 130, 50, 0.28)";
      for (let wy = y0 + h - bh + 18; wy < y0 + h - 22; wy += 28) {
        g.fillRect(bx + 10, wy, bw * 0.32, 12);
        g.fillRect(bx + bw * 0.56, wy, bw * 0.3, 12);
      }
    }

    // Farola cálida en primer plano
    if (esNitida) {
      k.brillo(g, x0 + w * 0.34, y0 + h * 0.62, w * 0.45, "251, 191, 36", 0.68);
    }
  }

  // Estática / Grano digital RGB en fotos nocturnas de píxel diminuto
  if (ruido > 0.02) {
    const paso = Math.floor(t * 14);
    const az = azar(509 + paso * 23);
    const nPuntos = 140;
    for (let i = 0; i < nPuntos; i++) {
      const px = x0 + az() * w;
      const py = y0 + az() * h;
      const col = i % 3 === 0 ? "255, 75, 95" : i % 3 === 1 ? "70, 230, 140" : "90, 140, 255";
      g.fillStyle = `rgba(${col}, ${ruido * (0.35 + az() * 0.5)})`;
      g.fillRect(px, py, 7, 7);
    }
  }

  if (flash > 0.01) {
    g.fillStyle = `rgba(255, 255, 255, ${flash})`;
    g.fillRect(x0, y0, w, h);
  }

  g.restore();
}

// ---------------------------------------------------------------- Celular comparativo de cámara (200 MP vs 48 MP)
export function dibujarCelularCamara(g, cx, cy, w, h, opts = {}) {
  const {
    etiquetaMP = "200 MP",
    esGanador = false,
    disparo = 0, // 0..1 muestra la captura revelada
    flash = 0,
    ruido = 0,
    veredicto = "",
    t = 0,
  } = opts;

  const x0 = cx - w / 2;
  const y0 = cy - h / 2;
  const r = w * 0.135;

  g.save();
  g.shadowColor = "rgba(0, 0, 0, 0.68)";
  g.shadowBlur = 44;
  g.shadowOffsetY = 22;
  redondo(g, x0, y0, w, h, r);
  g.fillStyle = "#121722";
  g.fill();
  g.shadowBlur = 0;
  g.shadowOffsetY = 0;

  redondo(g, x0, y0, w, h, r);
  k.metal(g, x0, x0 + w, ["#4d5666", "#d5deec", "#697588", "#eef3fa", "#373f4d"]);

  const b = Math.max(7, w * 0.028);
  redondo(g, x0 + b, y0 + b, w - b * 2, h - b * 2, r - b * 0.7);
  g.fillStyle = "#06080d";
  g.fill();

  const sx = x0 + b * 1.55;
  const sy = y0 + b * 1.55;
  const sw = w - b * 3.1;
  const sh = h - b * 3.1;
  const sr = Math.max(10, r - b * 1.2);

  g.save();
  redondo(g, sx, sy, sw, sh, sr);
  g.clip();

  g.fillStyle = "#080d18";
  g.fillRect(sx, sy, sw, sh);

  // Pastilla superior indicando megapíxeles del celular
  const colMP = esGanador ? "#22e39b" : "#fbbf24";
  redondo(g, cx - sw * 0.36, sy + sh * 0.05, sw * 0.72, sh * 0.09, 18);
  g.fillStyle = "rgba(15, 23, 42, 0.92)";
  g.fill();
  g.strokeStyle = colMP;
  g.lineWidth = 3;
  g.stroke();

  g.textAlign = "center";
  g.textBaseline = "middle";
  g.font = `800 ${Math.round(sw * 0.082)}px Figtree`;
  g.fillStyle = colMP;
  g.fillText(etiquetaMP, cx, sy + sh * 0.096);

  // Visor de foto nocturna en pantalla
  const vfW = sw * 0.88;
  const vfH = sh * 0.56;
  const vfY = sy + sh * 0.46;
  dibujarFotoEscena(g, cx, vfY, vfW, vfH, {
    modo: esGanador ? "noche-nitida" : "noche-ruido",
    ruido: esGanador ? 0 : ruido,
    flash,
    t,
  });

  redondo(g, cx - vfW / 2, vfY - vfH / 2, vfW, vfH, 20);
  g.strokeStyle = disparo > 0.3 ? (esGanador ? "#22e39b" : "#ef4444") : "rgba(255,255,255,0.22)";
  g.lineWidth = 3.5;
  g.stroke();

  // Botón obturador de cámara abajo o sello de resultado
  if (veredicto && disparo > 0.4) {
    g.save();
    g.globalAlpha = (disparo - 0.4) / 0.6;
    redondo(g, cx - sw * 0.41, sy + sh * 0.8, sw * 0.82, sh * 0.11, 18);
    g.fillStyle = esGanador ? "#064e3b" : "#450a0a";
    g.fill();
    g.strokeStyle = esGanador ? "#34d399" : "#f87171";
    g.lineWidth = 3;
    g.stroke();
    g.font = `800 ${Math.round(sw * 0.062)}px Figtree`;
    g.fillStyle = esGanador ? "#6ee7b7" : "#fca5a5";
    g.fillText(veredicto, cx, sy + sh * 0.855);
    g.restore();
  } else {
    g.strokeStyle = "#ffffff";
    g.lineWidth = 3.5;
    g.beginPath();
    g.arc(cx, sy + sh * 0.85, sw * 0.085, 0, Math.PI * 2);
    g.stroke();
    g.fillStyle = "#f8fafc";
    g.beginPath();
    g.arc(cx, sy + sh * 0.85, sw * 0.065, 0, Math.PI * 2);
    g.fill();
  }

  g.restore();
  g.restore();
}

// ---------------------------------------------------------------- Sensor físico CMOS esmeralda con malla dinámica y Pixel Binning
export function dibujarSensorCMOS(g, cx, cy, w, h, opts = {}) {
  const {
    divisiones = 4,     // p.ej. 4 (grande), 12 (200 MP diminutos)
    opacidadMalla = 1,
    fusion4x4 = 0,      // 0..1 derriba las paredes internas de 4x4 dejando 3x3 super-píxeles
    luzCelda = 0.5,     // 0..1 energía dorada capturada en cada píxel
    ruidoCelda = 0,     // 0..1 estática RGB cuando falta luz
    etiqueta = "",
    t = 0,
  } = opts;

  const x0 = cx - w / 2;
  const y0 = cy - h / 2;

  g.save();
  // Marco cerámico y contactos dorados del sensor CMOS
  g.shadowColor = "rgba(0, 0, 0, 0.52)";
  g.shadowBlur = 34;
  g.shadowOffsetY = 16;
  redondo(g, x0 - 22, y0 - 22, w + 44, h + 44, 24);
  g.fillStyle = "#1e293b";
  g.fill();
  g.shadowBlur = 0;
  g.shadowOffsetY = 0;
  g.strokeStyle = "#fbbf24";
  g.lineWidth = 3.5;
  g.stroke();

  // Pines dorados alrededor del sustrato cerámico
  g.fillStyle = "#facc15";
  const nPines = 8;
  for (let i = 0; i < nPines; i++) {
    const px = x0 + 24 + (i * (w - 48)) / (nPines - 1);
    g.fillRect(px - 6, y0 - 30, 12, 10);
    g.fillRect(px - 6, y0 + h + 20, 12, 10);
  }

  // Oblea activa de silicio esmeralda/azul
  redondo(g, x0, y0, w, h, 14);
  const sg = g.createLinearGradient(x0, y0, x0 + w, y0 + h);
  sg.addColorStop(0, "#064e3b");
  sg.addColorStop(0.5, "#0f766e");
  sg.addColorStop(1, "#022c22");
  g.fillStyle = sg;
  g.fill();

  g.save();
  redondo(g, x0, y0, w, h, 14);
  g.clip();

  // Energía luminosa o ruido dentro de cada celdilla
  const cw = w / divisiones;
  const ch = h / divisiones;
  const az = azar(811 + Math.floor(t * 10));

  for (let rI = 0; rI < divisiones; rI++) {
    for (let cI = 0; cI < divisiones; cI++) {
      const px = x0 + cI * cw;
      const py = y0 + rI * ch;
      if (luzCelda > 0.02) {
        const pulso = 0.78 + 0.22 * Math.sin(t * 5 + rI * 0.7 + cI * 0.9);
        g.fillStyle = `rgba(253, 224, 71, ${luzCelda * 0.72 * pulso})`;
        g.fillRect(px + 2, py + 2, cw - 4, ch - 4);
      }
      if (ruidoCelda > 0.02) {
        const vR = az();
        if (vR > 0.52) {
          const col = vR > 0.84 ? "255, 75, 95" : vR > 0.68 ? "80, 150, 255" : "60, 230, 150";
          g.fillStyle = `rgba(${col}, ${ruidoCelda * 0.75})`;
          g.fillRect(px + 2, py + 2, cw - 4, ch - 4);
        }
      }
    }
  }

  // Paredes de la cuadrícula de píxeles (con fusión 4x4 opcional para Pixel Binning)
  if (opacidadMalla > 0.01) {
    for (let i = 1; i < divisiones; i++) {
      const esBordeMacro = i % 4 === 0;
      const alLinea = esBordeMacro ? opacidadMalla : opacidadMalla * (1 - fusion4x4);
      if (alLinea <= 0.01) continue;

      g.strokeStyle = esBordeMacro && fusion4x4 > 0.2
        ? `rgba(253, 224, 71, ${0.5 + 0.5 * fusion4x4})`
        : `rgba(167, 243, 208, ${alLinea * 0.68})`;
      g.lineWidth = esBordeMacro && fusion4x4 > 0.2 ? 4.5 : 1.8;

      const lx = x0 + i * cw;
      g.beginPath(); g.moveTo(lx, y0); g.lineTo(lx, y0 + h); g.stroke();

      const ly = y0 + i * ch;
      g.beginPath(); g.moveTo(x0, ly); g.lineTo(x0 + w, ly); g.stroke();
    }
  }
  g.restore();

  redondo(g, x0, y0, w, h, 14);
  g.strokeStyle = "#34d399";
  g.lineWidth = 3;
  g.stroke();

  if (etiqueta) {
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.font = "800 25px Figtree";
    g.fillStyle = "#e2e8f0";
    g.fillText(etiqueta, cx, y0 + h + 58);
  }

  g.restore();
}
