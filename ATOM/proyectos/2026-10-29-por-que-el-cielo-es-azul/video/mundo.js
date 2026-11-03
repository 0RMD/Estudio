// Piezas compartidas de «Por qué el cielo es azul» en estilo Cine Nocturno (3D hiperrealista).
import * as k from "#kit";

const { CINE, redondo, mez, mezColor, tramo, suave, pulso, azar, lienzo, fijar, red, red2, manchas, causticas } = k;

// Paleta de azul atmosférico compatible con Cine Nocturno (cinematográfico, nunca neón).
export const AZUL_CIELO = "#4B90C8";
export const AZUL_CLARO = "#8CC6F2";
export const AZUL_RGB = "95,172,235";
export const ROJO_RGB = "201,55,44";

// Tiempos de acento musical y de voz para sincronizar movimientos, luces y cámara al compás (beat).
const ACENTOS = [
  0.08, 0.56, 1.12, 2.16, 2.60, 3.88,
  4.88, 5.40, 6.88, 8.00, 9.12,
  10.00, 11.16, 12.00,
  13.36, 15.20, 16.24, 16.88, 17.48,
  18.76, 19.84, 21.36, 22.16, 23.28,
  24.64, 26.04, 26.88, 27.84, 29.52, 30.48, 31.12,
  32.56, 34.08, 35.04, 35.72, 36.88,
  38.56, 39.84, 40.80, 41.36, 41.92, 42.64, 43.60,
  44.56, 45.48, 46.24, 47.12, 47.76, 49.20, 49.84, 50.56,
  52.08, 53.48, 54.40, 55.64, 56.96,
  58.48, 59.28, 60.56, 61.84, 62.16, 62.96,
  64.00, 64.80, 65.52, 66.40, 67.28, 68.08,
];

// Pulso rítmico continuo (~112 BPM) sumado a los acentos exactos de la narración y efectos.
export function latidoRitmo(t) {
  const compas = Math.pow(0.5 + 0.5 * Math.sin((t * Math.PI * 2) / 0.5357), 3) * 0.35;
  let acento = 0;
  for (let i = 0; i < ACENTOS.length; i++) {
    const dt = (t - ACENTOS[i]) / 0.14;
    if (Math.abs(dt) < 3) acento += Math.exp(-dt * dt);
  }
  return Math.min(1, compas + acento * 0.75);
}

// Acabado de cada escena en Cine Nocturno: velo suave arriba si hay luz detrás del subtítulo, viñeta y grano.
export function acabarCine(g, t, veloFuerza = 0.35) {
  if (veloFuerza > 0.01) {
    const vg = g.createLinearGradient(0, 140, 0, 620);
    vg.addColorStop(0, `rgba(11,10,13,${0.65 * veloFuerza})`);
    vg.addColorStop(0.6, `rgba(11,10,13,${0.4 * veloFuerza})`);
    vg.addColorStop(1, "rgba(11,10,13,0)");
    g.fillStyle = vg;
    g.fillRect(0, 0, 1080, 620);
  }
  k.vineta(g, 0.65);
  k.grano(g, t, 0.07);
}

// ============================================================================
// 1. CORDILLERA 3D HIPERREALISTA (3 capas con paralaje, facetas de roca y niebla)
// ============================================================================
function crearCapaCordillera({ sem, yBase, hMax, colLuz, colSombra, colNieve, detalle }) {
  const W = 1440, H = 560;
  const l = lienzo(W, H), c = l.getContext("2d");
  const az = azar(sem);

  // Generamos los vértices de la cresta principal con ruido fractal crestado (ridged noise)
  const nPicos = detalle;
  const pts = [];
  for (let i = 0; i <= nPicos; i++) {
    const x = (i / nPicos) * W;
    const u = i / nPicos;
    // Valle central suave cerca del centro (u ~ 0.5) para que la carretera respire, y grandes cumbres a los lados
    const valleCentro = 1 - 0.42 * Math.exp(-Math.pow((u - 0.5) / 0.16, 2));
    const onda1 = Math.abs(Math.sin(u * Math.PI * 3.2 + sem * 0.7));
    const onda2 = Math.abs(Math.cos(u * Math.PI * 7.5 + sem * 1.3)) * 0.45;
    const rugosidad = (az() - 0.45) * 0.22;
    const alt = Math.max(0.12, Math.min(1, (0.38 + 0.52 * onda1 + onda2 + rugosidad) * valleCentro));
    const y = yBase - alt * hMax;
    pts.push({ x, y, alt });
  }

  // 1) Silueta base de la montaña
  c.save();
  c.beginPath();
  c.moveTo(0, H);
  for (const p of pts) c.lineTo(p.x, p.y);
  c.lineTo(W, H);
  c.closePath();
  c.clip();

  const bg = c.createLinearGradient(0, yBase - hMax, 0, H);
  bg.addColorStop(0, colLuz);
  bg.addColorStop(0.55, colSombra);
  bg.addColorStop(1, "#07090C");
  c.fillStyle = bg;
  c.fillRect(0, 0, W, H);

  // 2) Facetas 3D de roca: aristas que bajan desde cada cumbre dividiendo caras iluminadas y caras en sombra
  for (let i = 1; i < pts.length - 1; i++) {
    const p = pts[i];
    const pIzq = pts[i - 1];
    const pDer = pts[i + 1];
    const crestaX = p.x + (az() - 0.5) * 28;
    const pieX = p.x + (az() - 0.5) * 90;
    const pieY = H;

    // Cara izquierda (recibe luz cenital/lateral fría y reflejos de roca)
    c.beginPath();
    c.moveTo(pIzq.x, pIzq.y);
    c.lineTo(p.x, p.y);
    c.lineTo(crestaX, (p.y + pieY) * 0.48);
    c.lineTo(pieX, pieY);
    c.lineTo(pIzq.x - 30, pieY);
    c.closePath();
    const fg1 = c.createLinearGradient(p.x, p.y, pIzq.x, pieY);
    fg1.addColorStop(0, colLuz);
    fg1.addColorStop(0.45, colSombra);
    fg1.addColorStop(1, "rgba(7,9,12,0.92)");
    c.fillStyle = fg1;
    c.fill();

    // Cara derecha (en sombra profunda con estrías minerales)
    c.beginPath();
    c.moveTo(p.x, p.y);
    c.lineTo(pDer.x, pDer.y);
    c.lineTo(pDer.x + 30, pieY);
    c.lineTo(pieX, pieY);
    c.lineTo(crestaX, (p.y + pieY) * 0.48);
    c.closePath();
    const fg2 = c.createLinearGradient(p.x, p.y, pDer.x, pieY);
    fg2.addColorStop(0, colSombra);
    fg2.addColorStop(0.6, "#090C10");
    fg2.addColorStop(1, "#050608");
    c.fillStyle = fg2;
    c.fill();

    // Arista rocosa iluminada (ridge highlight) y grietas secundarias
    if (p.alt > 0.35) {
      c.strokeStyle = colNieve;
      c.lineWidth = 1.8;
      c.beginPath();
      c.moveTo(p.x, p.y);
      c.lineTo(crestaX, (p.y + pieY) * 0.48);
      c.lineTo(pieX, pieY);
      c.stroke();

      // Couloirs / vetas de nieve o cuarzo en las cumbres altas
      for (let j = 0; j < 3; j++) {
        const sx = mez(p.x, pIzq.x, 0.2 + j * 0.25);
        const sy = mez(p.y, pIzq.y, 0.2 + j * 0.25);
        c.strokeStyle = colNieve;
        c.lineWidth = 1.2;
        c.beginPath();
        c.moveTo(sx, sy);
        c.lineTo(sx + (az() - 0.5) * 35, sy + 45 + az() * 65);
        c.stroke();
      }
    }
  }

  // 3) Textura geológica hiperrealista con k.red (fracturas de roca) y k.manchas (granito)
  c.globalCompositeOperation = "multiply";
  c.globalAlpha = 0.52;
  c.drawImage(red, 0, 0, W * 0.55, H);
  c.drawImage(red, W * 0.5, 0, W * 0.55, H);
  c.globalCompositeOperation = "overlay";
  c.globalAlpha = 0.34;
  c.drawImage(manchas, 0, 0, W, H);
  c.restore();

  // 4) Borde de luz atmosférica sobre la cresta superior
  c.save();
  c.strokeStyle = colNieve;
  c.lineWidth = 2.4;
  c.lineJoin = "round";
  c.beginPath();
  for (let i = 0; i < pts.length; i++) {
    if (i === 0) c.moveTo(pts[i].x, pts[i].y);
    else c.lineTo(pts[i].x, pts[i].y);
  }
  c.stroke();
  c.restore();

  l.pts = pts;
  return fijar(l);
}

const CORDILLERA_LEJOS = crearCapaCordillera({
  sem: 101,
  yBase: 480,
  hMax: 390,
  colLuz: "#29465B",
  colSombra: "#14232E",
  colNieve: "rgba(175,220,250,0.42)",
  detalle: 38,
});

const CORDILLERA_MEDIA = crearCapaCordillera({
  sem: 202,
  yBase: 500,
  hMax: 310,
  colLuz: "#1F3644",
  colSombra: "#0E1820",
  colNieve: "rgba(145,198,238,0.34)",
  detalle: 32,
});

const CORDILLERA_CERCA = crearCapaCordillera({
  sem: 303,
  yBase: 520,
  hMax: 220,
  colLuz: "#192830",
  colSombra: "#0B1014",
  colNieve: "rgba(242,166,90,0.26)",
  detalle: 26,
});

// Dibuja la cordillera 3D completa con paralaje, niebla entre valles y luz de borde reactiva al cielo o atardecer.
export function cordillera3D(g, yHorizonte = 1020, luzCielo = 0.8, luzCalida = 0.5, camX = 0, luzRoja = 0) {
  const yTop = yHorizonte - 430;
  g.save();

  // Capa 1: Cumbres lejanas
  const x1 = -180 - (camX * 0.12) % 180;
  g.drawImage(CORDILLERA_LEJOS, x1, yTop, 1440, 560);

  // Niebla atmosférica entre la cordillera lejana y la media
  const n1 = g.createLinearGradient(0, yHorizonte - 240, 0, yHorizonte + 40);
  const colNiebla1 = luzRoja > 0.1
    ? `rgba(232,131,58,${0.24 * luzRoja})`
    : `rgba(110,175,228,${0.12 + 0.22 * luzCielo})`;
  n1.addColorStop(0, "rgba(11,10,13,0)");
  n1.addColorStop(0.55, colNiebla1);
  n1.addColorStop(1, "rgba(11,10,13,0)");
  g.fillStyle = n1;
  g.fillRect(-100, yHorizonte - 240, 1280, 280);

  // Capa 2: Montañas medias escarpadas
  const x2 = -180 - (camX * 0.24) % 180;
  g.drawImage(CORDILLERA_MEDIA, x2, yTop + 35, 1440, 560);

  // Bruma cálida/fría en la garganta del valle
  const n2 = g.createLinearGradient(0, yHorizonte - 150, 0, yHorizonte + 80);
  const colNiebla2 = luzRoja > 0.1
    ? `rgba(201,55,44,${0.28 * luzRoja})`
    : `rgba(242,166,90,${0.08 + 0.14 * luzCalida})`;
  n2.addColorStop(0, "rgba(11,10,13,0)");
  n2.addColorStop(0.5, colNiebla2);
  n2.addColorStop(1, "rgba(11,10,13,0)");
  g.fillStyle = n2;
  g.fillRect(-100, yHorizonte - 150, 1280, 230);

  // Capa 3: Estribaciones rocosas cercanas y suelo nocturno
  const x3 = -180 - (camX * 0.4) % 180;
  g.drawImage(CORDILLERA_CERCA, x3, yTop + 70, 1440, 560);

  // Suelo rocoso desde el horizonte hasta abajo con textura 3D
  const sg = g.createLinearGradient(0, yHorizonte, 0, 1960);
  sg.addColorStop(0, "#0D1216");
  sg.addColorStop(0.4, "#0A0D10");
  sg.addColorStop(1, "#060709");
  g.fillStyle = sg;
  g.fillRect(-120, yHorizonte + 40, 1320, 1000);

  g.save();
  g.globalCompositeOperation = "multiply";
  g.globalAlpha = 0.42;
  g.drawImage(red, 0, yHorizonte + 20, 1080, 920);
  g.restore();

  g.restore();
}

// ============================================================================
// 2. PINOS 3D HIPERREALISTAS (Agujas detalladas, oclusión ambiental y balanceo)
// ============================================================================
function crearSpritePino(luzDir = 1) {
  const W = 320, H = 440, cx = 160, baseY = 390;
  const l = lienzo(W, H), g = l.getContext("2d");
  const az = azar(luzDir > 0 ? 701 : 702);

  // Tronco 3D con corteza texturizada y raíces en la base
  const tg = g.createLinearGradient(cx - 18, 0, cx + 18, 0);
  if (luzDir > 0) {
    tg.addColorStop(0, "#150E0A");
    tg.addColorStop(0.55, "#2E1E16");
    tg.addColorStop(0.88, "#5C3B28");
    tg.addColorStop(1, "#8A5638");
  } else {
    tg.addColorStop(0, "#8A5638");
    tg.addColorStop(0.15, "#5C3B28");
    tg.addColorStop(0.45, "#2E1E16");
    tg.addColorStop(1, "#150E0A");
  }
  g.fillStyle = tg;
  g.beginPath();
  g.moveTo(cx - 8, 90);
  g.lineTo(cx + 8, 90);
  g.lineTo(cx + 16, baseY - 12);
  g.lineTo(cx + 26, baseY + 8);
  g.lineTo(cx - 26, baseY + 8);
  g.lineTo(cx - 16, baseY - 12);
  g.closePath();
  g.fill();

  // 7 niveles de ramaje 3D (de abajo hacia la cúspide)
  const niveles = [
    { y0: 345, y1: 255, w: 124, nRamas: 26 },
    { y0: 300, y1: 215, w: 110, nRamas: 24 },
    { y0: 255, y1: 175, w: 95, nRamas: 22 },
    { y0: 212, y1: 138, w: 80, nRamas: 20 },
    { y0: 170, y1: 102, w: 64, nRamas: 18 },
    { y0: 132, y1: 70, w: 48, nRamas: 15 },
    { y0: 96, y1: 36, w: 30, nRamas: 12 },
  ];

  for (const [idx, niv] of niveles.entries()) {
    // Sombra de oclusión ambiental debajo de cada manto de ramas
    const og = g.createRadialGradient(cx, niv.y0 - 8, 8, cx, niv.y0, niv.w * 0.95);
    og.addColorStop(0, "rgba(4,8,9,0.85)");
    og.addColorStop(0.65, "rgba(6,13,14,0.55)");
    og.addColorStop(1, "rgba(6,13,14,0)");
    g.fillStyle = og;
    g.beginPath();
    g.ellipse(cx, niv.y0 + 4, niv.w * 0.92, 24, 0, 0, Math.PI * 2);
    g.fill();

    // Volumen interior oscuro del piso de follaje
    g.beginPath();
    g.moveTo(cx, niv.y1);
    g.quadraticCurveTo(cx - niv.w * 0.65, (niv.y0 + niv.y1) * 0.52, cx - niv.w, niv.y0);
    g.quadraticCurveTo(cx, niv.y0 + 22, cx + niv.w, niv.y0);
    g.quadraticCurveTo(cx + niv.w * 0.65, (niv.y0 + niv.y1) * 0.52, cx, niv.y1);
    g.closePath();
    const fg = g.createLinearGradient(cx - niv.w * luzDir, niv.y1, cx + niv.w * luzDir, niv.y0);
    fg.addColorStop(0, "#0D201F");
    fg.addColorStop(0.52, "#193D3A");
    fg.addColorStop(0.85, "#2A645F");
    fg.addColorStop(1, "#3A807A");
    g.fillStyle = fg;
    g.fill();

    // Racimos de agujas 3D en abanico (sombra, medio tono, luz cenital azulada y reborde cálido)
    for (let r = 0; r < niv.nRamas; r++) {
      const u = (r / (niv.nRamas - 1)) * 2 - 1; // -1 a +1
      const ladoIluminado = u * luzDir; // > 0 si está en el lado de la luz cálida
      const rx = cx + u * niv.w * (0.85 + 0.15 * az());
      const ry = mez(niv.y1 + 12, niv.y0 + 6, Math.pow(Math.abs(u), 0.72) * 0.75 + 0.25 * az());
      const largoRama = (22 + (1 - idx / niveles.length) * 18) * (0.8 + 0.35 * az());
      const angBase = Math.PI * 0.5 + u * 0.92 + (az() - 0.5) * 0.18;

      // Racimo de acículas
      for (let a = -3; a <= 3; a++) {
        const ang = angBase + a * 0.11;
        const xFin = rx + Math.cos(ang) * largoRama;
        const yFin = ry + Math.sin(ang) * largoRama * 0.75;

        if (ladoIluminado > 0.25 && a >= 1) {
          // Agujas bañadas por el borde cálido de los faros / lámpara (#F2A65A)
          g.strokeStyle = a === 3 ? "rgba(242,175,100,0.75)" : "#3C7D76";
        } else if (a <= -2 && idx >= 3) {
          // Luz cenital del cielo azul en las agujas superiores
          g.strokeStyle = "rgba(130,192,232,0.52)";
        } else if (ladoIluminado < -0.15) {
          g.strokeStyle = a < 0 ? "#0C1D1C" : "#163533";
        } else {
          g.strokeStyle = a < 0 ? "#1B423F" : "#2F6F6A";
        }
        g.lineWidth = a === 0 ? 3.2 : 2.1;
        g.lineCap = "round";
        g.beginPath();
        g.moveTo(rx, ry);
        g.lineTo(xFin, yFin);
        g.stroke();
      }
    }
  }

  return fijar(l);
}

const PINO_LUZ_DER = crearSpritePino(1);
const PINO_LUZ_IZQ = crearSpritePino(-1);

// Pino 3D hiperrealista de Cine Nocturno con balanceo orgánico al viento y al compás.
export function pinoCine(g, x, y, esc = 1, luzDir = 1, t = 0, id = 0) {
  g.save();
  g.translate(x, y);
  g.scale(esc, esc);

  // Sombra proyectada en el suelo
  g.fillStyle = "rgba(3,4,6,0.68)";
  g.beginPath();
  g.ellipse(luzDir * -24, 10, 62, 20, 0, 0, Math.PI * 2);
  g.fill();

  // Balanceo suave de la copa con el viento
  const mece = Math.sin(t * 1.9 + id * 1.7 + x * 0.01) * 0.018;
  g.rotate(mece);

  const sprite = luzDir >= 0 ? PINO_LUZ_DER : PINO_LUZ_IZQ;
  g.drawImage(sprite, -160, -390, 320, 440);
  g.restore();
}

// ============================================================================
// 3. CARRETERA 3D CON TEXTURA DE ASFALTO, GUARDARRAÍLES Y COCHE ROJO 3D
// ============================================================================
export function carretera3D(g, t, yHorizonte = 995, farosFuerza = 1, luzCielo = 0.7) {
  g.save();

  // Polígono en perspectiva de la calzada con curva suave en S
  const definirCalzada = (escalaAncho = 1) => {
    const wTop = 34 * escalaAncho;
    const wMid = 195 * escalaAncho;
    const wBot = 460 * escalaAncho;
    g.beginPath();
    g.moveTo(540 - wTop, yHorizonte);
    g.quadraticCurveTo(455 - wMid, (yHorizonte + 1960) * 0.48, 575 - wBot, 1980);
    g.lineTo(575 + wBot, 1980);
    g.quadraticCurveTo(455 + wMid, (yHorizonte + 1960) * 0.48, 540 + wTop, yHorizonte);
    g.closePath();
  };

  // Arcén de grava oscura
  definirCalzada(1.16);
  g.fillStyle = "#141213";
  g.fill();

  // Calzada de asfalto con gradiente 3D y textura granulada
  g.save();
  definirCalzada(1.0);
  g.clip();

  const ag = g.createLinearGradient(0, yHorizonte, 0, 1980);
  ag.addColorStop(0, "#181B20");
  ag.addColorStop(0.35, "#211E1D");
  ag.addColorStop(1, "#161314");
  g.fillStyle = ag;
  g.fillRect(0, yHorizonte, 1080, 1000);

  // Reflejo especular húmedo del cielo azul y de los faros cálidos sobre el asfalto
  if (luzCielo > 0.05) {
    const rgCielo = g.createRadialGradient(520, yHorizonte + 220, 20, 520, yHorizonte + 360, 420);
    rgCielo.addColorStop(0, `rgba(110,180,235,${0.26 * luzCielo})`);
    rgCielo.addColorStop(1, "rgba(110,180,235,0)");
    g.fillStyle = rgCielo;
    g.fillRect(0, yHorizonte, 1080, 980);
  }
  if (farosFuerza > 0.05) {
    const rgFaros = g.createRadialGradient(515, 1320, 30, 520, 1380, 380);
    rgFaros.addColorStop(0, `rgba(242,166,90,${0.34 * farosFuerza})`);
    rgFaros.addColorStop(0.6, `rgba(232,131,58,${0.14 * farosFuerza})`);
    rgFaros.addColorStop(1, "rgba(232,131,58,0)");
    g.fillStyle = rgFaros;
    g.fillRect(0, yHorizonte, 1080, 980);
  }

  // Textura micro-porosa del asfalto corriendo hacia cámara
  const despY = (t * 420) % 520;
  g.globalCompositeOperation = "multiply";
  g.globalAlpha = 0.55;
  g.drawImage(red, 80, yHorizonte - 520 + despY, 920, 760);
  g.drawImage(red, 80, yHorizonte + 240 + despY, 920, 760);
  g.globalCompositeOperation = "overlay";
  g.globalAlpha = 0.28;
  g.drawImage(manchas, 100, yHorizonte - 520 + despY, 880, 960);
  g.restore();

  // Líneas laterales continuas de arcén (ámbar/crema)
  for (const lado of [-1, 1]) {
    g.strokeStyle = "rgba(242,190,120,0.38)";
    g.lineWidth = 4.5;
    g.beginPath();
    g.moveTo(540 + lado * 30, yHorizonte + 4);
    g.quadraticCurveTo(455 + lado * 178, (yHorizonte + 1960) * 0.48, 575 + lado * 425, 1980);
    g.stroke();
  }

  // Línea central discontinua en perspectiva
  g.save();
  g.strokeStyle = "rgba(244,238,230,0.78)";
  g.lineWidth = 9;
  g.lineCap = "round";
  g.setLineDash([68, 56]);
  g.lineDashOffset = -t * 420;
  g.beginPath();
  g.moveTo(540, yHorizonte + 10);
  g.quadraticCurveTo(455, (yHorizonte + 1960) * 0.48, 575, 1980);
  g.stroke();
  g.restore();

  // Hitos catadióptricos reflectantes en los bordes de la carretera
  for (let i = 0; i < 6; i++) {
    const u = ((i / 6 + (t * 0.38) % 1) % 1);
    const p = u * u; // perspectiva cuadrática
    const yPoste = mez(yHorizonte + 18, 1920, p);
    const xCentro = (1 - p) * (1 - p) * 540 + 2 * (1 - p) * p * 455 + p * p * 575;
    const semiancho = mez(34, 445, p);
    const hPoste = mez(8, 42, p);
    const wPoste = mez(2, 7, p);

    for (const lado of [-1, 1]) {
      const xp = xCentro + lado * semiancho;
      g.fillStyle = "#2A2628";
      g.fillRect(xp - wPoste / 2, yPoste - hPoste, wPoste, hPoste);
      g.fillStyle = lado < 0 ? CINE.rojo : CINE.ambar;
      g.fillRect(xp - wPoste / 2, yPoste - hPoste * 0.85, wPoste, hPoste * 0.28);
    }
  }

  g.restore();
}

// El coche rojo protagonista (#C9372C) en 3D con carrocería esculpida, faros volumétricos y reflejos.
export function cocheRojo(g, x, y, esc = 1, ang = 0, faros = 1) {
  g.save();
  g.translate(x, y);
  g.rotate(ang);
  g.scale(esc, esc);

  // Conos de luz cálida volumétrica de los faros hacia delante (-y)
  if (faros > 0.02) {
    g.save();
    g.globalCompositeOperation = "lighter";
    for (const fx of [-44, 44]) {
      const lg = g.createLinearGradient(fx, -110, fx, -580);
      lg.addColorStop(0, `rgba(255,235,190,${0.72 * faros})`);
      lg.addColorStop(0.28, `rgba(242,166,90,${0.38 * faros})`);
      lg.addColorStop(0.68, `rgba(232,131,58,${0.14 * faros})`);
      lg.addColorStop(1, "rgba(242,166,90,0)");
      g.fillStyle = lg;
      g.beginPath();
      g.moveTo(fx - 12, -108);
      g.lineTo(fx - 155, -580);
      g.lineTo(fx + 155, -580);
      g.lineTo(fx + 12, -108);
      g.closePath();
      g.fill();
    }
    // Resplandor rojo de las luces de freno sobre el asfalto detrás (+y)
    for (const fx of [-40, 40]) {
      k.brillo(g, fx, 130, 95, ROJO_RGB, 0.55 * faros);
    }
    g.restore();
  }

  // Sombra de contacto 3D bajo el chasis
  g.fillStyle = "rgba(2,2,4,0.78)";
  redondo(g, -78, -124, 156, 260, 34);
  g.fill();

  // Neumáticos 3D con llanta metálica lateral
  for (const [rx, ry] of [[-72, -80], [56, -80], [-72, 50], [56, 50]]) {
    g.fillStyle = "#121114";
    redondo(g, rx, ry, 16, 46, 5);
    g.fill();
    g.strokeStyle = "rgba(242,166,90,0.28)";
    g.lineWidth = 1.5;
    g.stroke();
  }

  // Carrocería principal esculpida (#C9372C con sombreado cilíndrico 3D y laca brillante)
  const cg = g.createLinearGradient(-68, -120, 68, 120);
  cg.addColorStop(0, "#A8241C");
  cg.addColorStop(0.22, "#E84C3D");
  cg.addColorStop(0.5, CINE.rojo);
  cg.addColorStop(0.82, "#9E241C");
  cg.addColorStop(1, "#63130E");
  g.fillStyle = cg;
  redondo(g, -68, -120, 136, 240, 28);
  g.fill();
  g.strokeStyle = "rgba(255,205,155,0.45)";
  g.lineWidth = 2.2;
  g.stroke();

  // Nervaduras aerodinámicas del capó delantero
  g.strokeStyle = "rgba(255,215,185,0.35)";
  g.lineWidth = 2;
  for (const signo of [-1, 1]) {
    g.beginPath();
    g.moveTo(signo * 26, -112);
    g.lineTo(signo * 38, -64);
    g.stroke();
  }

  // Habitáculo acristalado (parabrisas, ventanillas laterales y luneta trasera con reflejo del cielo)
  const vg = g.createLinearGradient(-50, -68, 50, 82);
  vg.addColorStop(0, "#243546");
  vg.addColorStop(0.45, "#141A22");
  vg.addColorStop(1, "#211618");
  g.fillStyle = vg;
  redondo(g, -54, -68, 108, 152, 18);
  g.fill();
  g.strokeStyle = "rgba(175,215,245,0.35)";
  g.lineWidth = 1.5;
  g.stroke();

  // Techo metálico 3D sobre el habitáculo
  const tg = g.createLinearGradient(-46, -24, 46, 44);
  tg.addColorStop(0, "#F05A4B");
  tg.addColorStop(0.45, CINE.rojo);
  tg.addColorStop(1, "#8C1F18");
  g.fillStyle = tg;
  redondo(g, -46, -22, 92, 68, 14);
  g.fill();
  k.reflejo(g, -34, -16, 12, 54, 0.25);

  // Espejos retrovisores 3D
  for (const signo of [-1, 1]) {
    g.fillStyle = CINE.rojo;
    redondo(g, signo > 0 ? 64 : -80, -50, 16, 11, 4);
    g.fill();
  }

  // Ópticas delanteras LED cálidas y pilotos traseros rojos brillantes
  g.fillStyle = "#FFF9EC";
  redondo(g, -56, -120, 28, 9, 4);
  g.fill();
  redondo(g, 28, -120, 28, 9, 4);
  g.fill();

  g.fillStyle = "#FF3B30";
  redondo(g, -54, 112, 30, 8, 3);
  g.fill();
  redondo(g, 24, 112, 30, 8, 3);
  g.fill();

  g.restore();
}

// ============================================================================
// 4. MOLÉCULAS DIATÓMICAS 3D HIPERREALISTAS (N2 / O2 con rotación 3D y enlace)
// ============================================================================
function crearEsferaAtomo(excitado = false) {
  const N = 160, cx = 80, cy = 80, r = 68;
  const l = lienzo(N, N), g = l.getContext("2d");

  g.save();
  g.beginPath();
  g.arc(cx, cy, r, 0, Math.PI * 2);
  g.clip();

  // Sombreado 3D con dispersión subsuperficial (SSS) y especular intenso
  const sg = g.createRadialGradient(cx - r * 0.36, cy - r * 0.38, r * 0.06, cx, cy, r);
  if (excitado) {
    sg.addColorStop(0, "#FFFFFF");
    sg.addColorStop(0.18, "#D6F0FF");
    sg.addColorStop(0.52, "#4B90C8");
    sg.addColorStop(0.84, "#153656");
    sg.addColorStop(1, "#3A88C8"); // Borde Fresnel azul
  } else {
    sg.addColorStop(0, "#FFF9F2");
    sg.addColorStop(0.16, "#E5D8CE");
    sg.addColorStop(0.52, "#6E6259");
    sg.addColorStop(0.85, "#1C181B");
    sg.addColorStop(1, "#8A6548"); // Borde Fresnel ámbar cálido
  }
  g.fillStyle = sg;
  g.fillRect(0, 0, N, N);

  // Micro-textura cuántica en la superficie de la esfera
  g.globalCompositeOperation = "overlay";
  g.globalAlpha = 0.42;
  g.drawImage(red2, 0, 0, N, N);
  g.globalCompositeOperation = "screen";
  g.globalAlpha = 0.25;
  g.drawImage(manchas, 0, 0, N, N);

  // Anillo Fresnel 3D en todo el contorno esférico
  const fg = g.createRadialGradient(cx, cy, r * 0.72, cx, cy, r);
  fg.addColorStop(0, "rgba(255,255,255,0)");
  fg.addColorStop(0.75, excitado ? "rgba(140,210,255,0.25)" : "rgba(242,166,90,0.18)");
  fg.addColorStop(1, excitado ? "rgba(185,235,255,0.85)" : "rgba(242,166,90,0.65)");
  g.globalCompositeOperation = "source-over";
  g.globalAlpha = 1;
  g.fillStyle = fg;
  g.fillRect(0, 0, N, N);

  // Brillo especular directo de lente
  const bg = g.createRadialGradient(cx - r * 0.35, cy - r * 0.38, 1, cx - r * 0.35, cy - r * 0.38, r * 0.28);
  bg.addColorStop(0, "rgba(255,255,255,0.95)");
  bg.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = bg;
  g.fillRect(0, 0, N, N);

  g.restore();
  return fijar(l);
}

const ATOMO_NEUTRO = crearEsferaAtomo(false);
const ATOMO_EXCITADO = crearEsferaAtomo(true);

// Dibuja una molécula diatómica de gas (N2 / O2) rotando en 3D real con nube electrónica y dispersión Rayleigh.
export function molecula3D(g, x, y, r, t, sem = 1, brilloAzul = 0, impacto = 0) {
  g.save();
  g.translate(x, y);

  // Orientación 3D de los dos átomos enlazados
  const angY = t * 1.9 + sem * 2.3;
  const angX = 0.52 * Math.sin(t * 1.35 + sem * 1.7);
  const ux = Math.cos(angY) * Math.cos(angX);
  const uy = Math.sin(angX);
  const uz = Math.sin(angY) * Math.cos(angX); // profundidad (-1 a +1)

  const sep = r * 0.56 * (1 + 0.14 * Math.sin(t * 18 + sem) * impacto);
  const rAtom = r * 0.68;

  // Halo de nube electrónica / dispersión de Rayleigh cuando choca la onda azul
  if (brilloAzul > 0.02 || impacto > 0.02) {
    const fTotal = Math.min(1, brilloAzul + impacto * 0.8);
    k.brillo(g, 0, 0, r * (4.2 + 2.2 * impacto), AZUL_RGB, fTotal * 0.88);
  }

  // Sombra proyectada de la molécula
  g.fillStyle = "rgba(2,4,8,0.52)";
  g.beginPath();
  g.ellipse(8, 14, r * 1.05, r * 0.68, Math.atan2(uy, ux), 0, Math.PI * 2);
  g.fill();

  // Anillo orbital electrónico 3D (nube de van der Waals) alrededor del enlace
  const angPlano = Math.atan2(uy, ux);
  g.save();
  g.rotate(angPlano);
  g.strokeStyle = brilloAzul > 0.15
    ? `rgba(155,218,255,${0.32 + 0.48 * brilloAzul})`
    : "rgba(242,166,90,0.22)";
  g.lineWidth = 2.2;
  g.beginPath();
  g.ellipse(0, 0, r * 1.18, r * 0.52, 0, 0, Math.PI * 2);
  g.stroke();
  g.restore();

  // Ordenamos los dos átomos por su coordenada Z para que el delantero tape al trasero y al puente covalente
  const atomos = [
    { x: -ux * sep, y: -uy * sep, z: -uz },
    { x: ux * sep, y: uy * sep, z: uz },
  ].sort((a, b) => a.z - b.z);

  const dibujaAtomo = (at) => {
    const escZ = 1 + at.z * 0.14;
    const tam = rAtom * 2 * escZ * (160 / 136);
    g.drawImage(ATOMO_NEUTRO, at.x - tam / 2, at.y - tam / 2, tam, tam);
    if (brilloAzul > 0.02) {
      g.save();
      g.globalAlpha *= Math.min(1, brilloAzul);
      g.drawImage(ATOMO_EXCITADO, at.x - tam / 2, at.y - tam / 2, tam, tam);
      g.restore();
    }
  };

  // 1) Átomo trasero
  dibujaAtomo(atomos[0]);

  // 2) Enlace covalente 3D cilíndrico entre los dos núcleos
  g.save();
  const bg = g.createLinearGradient(atomos[0].x, atomos[0].y, atomos[1].x, atomos[1].y);
  bg.addColorStop(0, brilloAzul > 0.2 ? "#3572A5" : "#4A4039");
  bg.addColorStop(0.5, brilloAzul > 0.2 ? "#BCE4FF" : "#D8CFC8");
  bg.addColorStop(1, brilloAzul > 0.2 ? "#3572A5" : "#4A4039");
  g.strokeStyle = bg;
  g.lineWidth = r * 0.34;
  g.lineCap = "round";
  g.beginPath();
  g.moveTo(atomos[0].x, atomos[0].y);
  g.lineTo(atomos[1].x, atomos[1].y);
  g.stroke();
  g.restore();

  // 3) Átomo delantero
  dibujaAtomo(atomos[1]);

  g.restore();
}

// ============================================================================
// 5. CÁPSULA DE AIRE EN RAYOS X, MESA DE ESTUDIO 3D Y SOL CINE
// ============================================================================
export function capsulaAire(g, x, y, esc = 1, t = 0, al = 1) {
  if (al <= 0.01) return;
  g.save();
  g.globalAlpha *= al;
  g.translate(x, y);
  g.scale(esc, esc);

  k.luzCalida(g, 0, 0, 290, 0.75 * al);

  // Cilindro de cristal 3D en rayos X
  redondo(g, -135, -175, 270, 350, 52);
  g.fillStyle = "rgba(18,16,16,0.74)";
  g.fill();
  k.vidrio(g, -135, 135, 0.35);

  g.strokeStyle = `rgba(${CINE.ambarRgb},0.88)`;
  g.lineWidth = 3.5;
  g.setLineDash([14, 10]);
  g.stroke();
  g.setLineDash([]);

  // Anillos elípticos arriba y abajo (perspectiva 3D maqueta)
  g.strokeStyle = "rgba(241,236,232,0.48)";
  g.lineWidth = 2.5;
  g.beginPath();
  g.ellipse(0, -138, 114, 24, 0, 0, Math.PI * 2);
  g.stroke();
  g.beginPath();
  g.ellipse(0, 138, 114, 24, 0, 0, Math.PI * 2);
  g.stroke();

  // Moléculas diatómicas 3D neutras (sin color) flotando dentro de la muestra de aire
  const az = azar(404);
  for (let i = 0; i < 9; i++) {
    const px = (az() - 0.5) * 165 + Math.sin(t * 1.6 + i) * 12;
    const py = (az() - 0.5) * 195 + Math.cos(t * 1.4 + i * 2) * 12;
    const r = 13 + az() * 7;
    molecula3D(g, px, py, r, t, i + 1, 0, 0);
  }

  // Círculo de interrogación «?» arriba
  g.fillStyle = "rgba(11,10,13,0.92)";
  g.strokeStyle = CINE.ambar;
  g.lineWidth = 3;
  g.beginPath();
  g.arc(0, -212, 34, 0, Math.PI * 2);
  g.fill();
  g.stroke();
  g.fillStyle = CINE.texto;
  g.font = "800 40px Figtree";
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.fillText("?", 0, -210);

  // Etiqueta fina naranja abajo: «AIRE · 0% COLOR»
  redondo(g, -148, 198, 296, 54, 27);
  g.fillStyle = "rgba(11,10,13,0.9)";
  g.fill();
  g.strokeStyle = CINE.naranja;
  g.lineWidth = 2.5;
  g.stroke();
  g.fillStyle = CINE.ambar;
  g.font = "700 28px Figtree";
  g.fillText("AIRE · 0% COLOR", 0, 226);

  g.restore();
}

// Mesa de estudio oscura con textura 3D de cuero/madera, rejilla técnica y motas de polvo en la luz cálida.
const MOTAS_MESA = (() => {
  const az = azar(909);
  return Array.from({ length: 42 }, () => ({
    x: az() * 1080,
    y: 480 + az() * 1320,
    r: 1.5 + az() * 2.8,
    f: az() * 6.28,
  }));
})();

export function mesaEstudio(g, camX = 0, camY = 0, luzX = 540, luzY = 1050, t = 0) {
  k.nocheCine(g, 0.92);

  // Veta sutil de madera y cuero oscuro en el tablero del escritorio
  g.save();
  g.globalCompositeOperation = "overlay";
  g.globalAlpha = 0.22;
  const offX = ((-camX * 0.5) % 768 + 768) % 768;
  g.drawImage(red, offX - 768, 360, 768, 1560);
  g.drawImage(red, offX, 360, 768, 1560);
  g.drawImage(red, offX + 768, 360, 768, 1560);
  g.restore();

  // Rejilla técnica del escritorio al fondo
  g.save();
  g.strokeStyle = "rgba(241,236,232,0.065)";
  g.lineWidth = 2;
  const paso = 130;
  const ox = ((-camX % paso) + paso) % paso;
  const oy = ((-camY % paso) + paso) % paso;
  for (let x = ox - paso; x < 1200; x += paso) {
    g.beginPath();
    g.moveTo(x, 0);
    g.lineTo(x, 1920);
    g.stroke();
  }
  for (let y = oy - paso; y < 2040; y += paso) {
    g.beginPath();
    g.moveTo(0, y);
    g.lineTo(1080, y);
    g.stroke();
  }
  g.restore();

  // Charco de luz cálida de la lámpara de estudio con pulso rítmico sutil
  const lat = 1 + 0.06 * latidoRitmo(t);
  k.luzCalida(g, luzX, luzY, 660 * lat, 0.96);

  // Motas de polvo flotando en el cono cálido de la lámpara
  g.save();
  g.globalCompositeOperation = "lighter";
  for (const m of MOTAS_MESA) {
    const mx = ((m.x - camX * 0.35 + Math.sin(t * 1.1 + m.f) * 18) % 1080 + 1080) % 1080;
    const my = m.y + Math.cos(t * 0.9 + m.f) * 14;
    const dist = Math.hypot(mx - luzX, my - luzY);
    if (dist < 580) {
      const alMota = (1 - dist / 580) * (0.35 + 0.35 * Math.sin(t * 3.2 + m.f));
      g.fillStyle = `rgba(242,188,120,${alMota})`;
      g.beginPath();
      g.arc(mx, my, m.r, 0, Math.PI * 2);
      g.fill();
    }
  }
  g.restore();
}

// Sol cálido 3D para escenas de atmósfera/espacio en Cine Nocturno con corona solar y destello.
export function solCine(g, x, y, r, t = 0, al = 1) {
  if (al <= 0.01) return;
  g.save();
  g.globalAlpha *= al;
  const lat = 1 + 0.08 * latidoRitmo(t);
  const R = r * lat;
  k.luzCalida(g, x, y, R * 4.1, 0.95 * al, "255,185,105");
  k.luzCalida(g, x, y, R * 2.3, 0.88 * al, "255,230,180");

  // Esfera solar con granulación ardiente sutil
  const sg = g.createRadialGradient(x - R * 0.15, y - R * 0.15, R * 0.08, x, y, R);
  sg.addColorStop(0, "#FFFFFF");
  sg.addColorStop(0.55, "#FFF0CC");
  sg.addColorStop(0.86, CINE.ambar);
  sg.addColorStop(1, "rgba(232,131,58,0)");
  g.fillStyle = sg;
  g.beginPath();
  g.arc(x, y, R, 0, Math.PI * 2);
  g.fill();
  g.restore();
}
