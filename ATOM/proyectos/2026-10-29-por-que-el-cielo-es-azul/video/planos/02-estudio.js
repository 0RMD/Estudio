// Plano 02 (02-estudio.js): El escritorio de estudio nocturno en 1871, el prisma 3D y las olas de cada color.
// «En 1871, el físico Lord Rayleigh resolvió el misterio.
//  La luz del Sol parece blanca, pero al cruzar un cristal se abre en todos los colores.
//  Cada color viaja haciendo olas: el rojo en olas largas y suaves, y el azul en olas cortas y rápidas.»
import * as k from "#kit";
import { v } from "#voz";
import { AZUL_CLARO, AZUL_RGB, ROJO_RGB, acabarCine, latidoRitmo, mesaEstudio, molecula3D } from "../mundo.js";

export const desde = "en";
export const entrada = "fundido";

const { CINE, suave, tramo, entra, pulso, mez, redondo, manchas, causticas } = k;

const f4 = v.frase(4), f5 = v.frase(5), f6 = v.frase(6);
const T1871 = f4.t("1871");
const Tlord = f4.t("lord");
const Tmisterio = f4.t("misterio");

const Tla = f5.t("la");
const Tblanca = f5.t("blanca");
const Tcristal = f5.t("cristal");
const Tcolores = f5.t("colores");

const Tcada = f6.t("cada");
const Tolas = f6.t("olas");
const Trojo = f6.t("rojo");
const Tlargas = f6.t("largas");
const Tazul = f6.t("azul");
const Tcortas = f6.t("cortas");
const Trapidas = f6.t("rapidas");

// Dibuja la hoja crema del estudio de 1871 de Lord Rayleigh con textura de papel antiguo y pluma 3D
function documento1871(g, x, y, t, lat) {
  const zoomDoc = mez(0.92, 1.15, suave(tramo(t, f4.inicio, Tmisterio + 0.35))) + 0.008 * lat;
  const giroDoc = mez(-0.04, 0.015, suave(tramo(t, f4.inicio, Tmisterio + 0.35)));
  g.save();
  g.translate(x, y);
  g.scale(zoomDoc, zoomDoc);
  g.rotate(giroDoc);

  // Carpeta de cuero marrón oscuro debajo con pespunte dorado
  g.fillStyle = "#261811";
  g.strokeStyle = "rgba(242,166,90,0.38)";
  g.lineWidth = 3;
  redondo(g, -395, -345, 790, 700, 24);
  g.fill();
  g.stroke();

  // Sombra 3D de la hoja de papel levantada por las esquinas
  g.fillStyle = "rgba(0,0,0,0.62)";
  g.beginPath();
  g.moveTo(-312, -298);
  g.lineTo(312, -298);
  g.lineTo(352, 316);
  g.lineTo(-352, 316);
  g.closePath();
  g.fill();

  // Hoja crema con perspectiva trapezoidal y textura de pergamino
  g.save();
  g.beginPath();
  g.moveTo(-305, -305);
  g.lineTo(305, -305);
  g.lineTo(338, 295);
  g.lineTo(-338, 295);
  g.closePath();
  g.clip();

  const pg = g.createLinearGradient(0, -310, 0, 300);
  pg.addColorStop(0, "#F7F2EC");
  pg.addColorStop(0.72, "#EAE1D8");
  pg.addColorStop(1, "#D2C5B8");
  g.fillStyle = pg;
  g.fillRect(-350, -320, 700, 630);

  g.globalCompositeOperation = "multiply";
  g.globalAlpha = 0.22;
  g.drawImage(manchas, -340, -310, 680, 620);
  g.restore();

  g.textAlign = "center";
  g.fillStyle = "#3A322D";
  g.font = "700 22px Figtree";
  g.fillText("PHILOSOPHICAL MAGAZINE · VOL. XLI · 1871", 0, -235);

  g.fillStyle = CINE.rojo;
  g.font = "800 38px Figtree";
  g.fillText("ON THE LIGHT FROM THE SKY", 0, -175);

  g.strokeStyle = "#5E534B";
  g.lineWidth = 2;
  g.beginPath();
  g.moveTo(-250, -145);
  g.lineTo(250, -145);
  g.stroke();

  const subAutor = suave(tramo(t, Tlord - 0.25, Tlord + 0.35));
  if (subAutor > 0.01) {
    g.fillStyle = "rgba(232,131,58,0.34)";
    redondo(g, -230, -122, 460 * subAutor, 44, 8);
    g.fill();
  }
  g.fillStyle = "#1E1916";
  g.font = "800 29px Figtree";
  g.fillText("LORD RAYLEIGH (J. W. STRUTT)", 0, -92);

  const subMisterio = suave(tramo(t, f4.t("resolvio") - 0.15, Tmisterio + 0.2));
  const lineas = [-20, 22, 64, 106, 148, 190, 232];
  lineas.forEach((ly, i) => {
    const w = i === 6 ? 320 : 470 - (i % 2) * 35;
    if (i === 1 && subMisterio > 0.01) {
      g.fillStyle = "rgba(232,131,58,0.52)";
      redondo(g, -235, ly - 24, 470 * subMisterio, 34, 6);
      g.fill();
    }
    g.fillStyle = i === 1 ? "#241C18" : "rgba(60,50,45,0.35)";
    redondo(g, -235, ly - 10, w, 12, 4);
    g.fill();
  });

  if (subMisterio > 0.05) {
    g.fillStyle = "#1E1916";
    g.font = "800 24px Figtree";
    g.fillText("LA LUZ REBOTA EN LAS PARTÍCULAS DEL AIRE", 0, 21);
  }

  // Pluma estilográfica 3D de caoba y latón moviéndose mientras subraya
  const xPluma = mez(348, 292, subMisterio);
  g.save();
  g.translate(xPluma, 20);
  g.rotate(-0.08 + 0.06 * subMisterio);
  g.fillStyle = "rgba(0,0,0,0.45)";
  redondo(g, -5, -172, 26, 355, 12);
  g.fill();
  redondo(g, -12, -180, 24, 350, 10);
  k.metal(g, -12, 12, ["#3A2316", "#8A5436", "#4A2E1B", "#A86B47", "#24150D"]);
  redondo(g, -14, -120, 28, 72, 6);
  k.metal(g, -14, 14, ["#7A5828", "#F2C878", "#B58942", "#FFE2A8", "#5E421B"]);
  g.restore();

  const alEti = suave(tramo(t, Tlord - 0.15, Tlord + 0.25));
  if (alEti > 0.01) {
    g.save();
    g.globalAlpha = alEti;
    redondo(g, 90, -70, 280, 56, 28);
    g.fillStyle = "rgba(11,10,13,0.92)";
    g.fill();
    g.strokeStyle = "rgba(242,166,90,0.65)";
    g.lineWidth = 2.5;
    g.stroke();
    g.fillStyle = CINE.texto;
    g.font = "700 26px Figtree";
    g.fillText("estudio original", 230, -34);
    g.restore();
  }

  g.restore();
}

// Dibuja el prisma 3D de cristal tallado con cáusticas internas y dispersión espectral sincronizada al beat
function escenaPrisma(g, x, y, t, lat) {
  const zoomP = mez(0.92, 1.18, suave(tramo(t, Tla, Tcolores + 0.35))) + 0.012 * lat;
  g.save();
  g.translate(x, y);
  g.scale(zoomP, zoomP);

  const uBlanca = entra(tramo(t, f5.t("luz") - 0.15, Tblanca + 0.15));
  const uAbre = entra(tramo(t, Tcristal - 0.12, Tcolores + 0.1));

  // Haz incidente de luz solar blanca
  if (uBlanca > 0.01) {
    g.save();
    g.globalCompositeOperation = "lighter";
    const xFin = mez(-520, -78, uBlanca);
    const yFin = mez(-115, -18, uBlanca);
    const wg = g.createLinearGradient(-520, -115, -78, -18);
    wg.addColorStop(0, "rgba(255,248,235,0.28)");
    wg.addColorStop(0.5, "rgba(255,250,240,0.95)");
    wg.addColorStop(1, "rgba(255,255,255,1)");
    g.strokeStyle = wg;
    g.lineWidth = 36;
    g.lineCap = "round";
    g.beginPath();
    g.moveTo(-520, -115);
    g.lineTo(xFin, yFin);
    g.stroke();
    k.brillo(g, xFin, yFin, 195 * (1 + 0.12 * lat), "255,245,220", 0.92 * uBlanca);
    g.restore();
  }

  const BANDAS = [
    { col: "#C9372C", rgb: "201,55,44", dy: -190 },
    { col: "#E8833A", rgb: "232,131,58", dy: -114 },
    { col: "#F2A65A", rgb: "242,166,90", dy: -38 },
    { col: "#52B788", rgb: "82,183,136", dy: 36 },
    { col: "#56CFE1", rgb: "86,207,225", dy: 112 },
    { col: "#4B90C8", rgb: "75,144,200", dy: 188 },
  ];

  if (uAbre > 0.01) {
    g.save();
    g.globalCompositeOperation = "lighter";
    BANDAS.forEach((b, idx) => {
      const x2 = mez(55, 545, uAbre);
      const y2 = mez(0, b.dy + Math.sin(t * 4.5 + idx) * 8, uAbre);
      const bg = g.createLinearGradient(50, -5, x2, y2);
      bg.addColorStop(0, `rgba(${b.rgb},0.98)`);
      bg.addColorStop(0.75, `rgba(${b.rgb},0.8)`);
      bg.addColorStop(1, `rgba(${b.rgb},0.14)`);
      g.strokeStyle = bg;
      g.lineWidth = 40;
      g.lineCap = "round";
      g.beginPath();
      g.moveTo(50, -5);
      g.lineTo(x2, y2);
      g.stroke();
    });
    g.restore();
  }

  // Sombra proyectada y cáustica refractada sobre la mesa debajo del prisma 3D
  g.fillStyle = "rgba(0,0,0,0.68)";
  g.beginPath();
  g.moveTo(12, -230);
  g.lineTo(245, 185);
  g.lineTo(-215, 185);
  g.closePath();
  g.fill();

  // Cuerpo 3D del prisma de cristal óptico (cara frontal + cara lateral derecha en perspectiva)
  // Cara lateral 3D (profundidad)
  g.beginPath();
  g.moveTo(0, -245);
  g.lineTo(52, -215);
  g.lineTo(238, 138);
  g.lineTo(195, 160);
  g.closePath();
  const lgLat = g.createLinearGradient(0, -245, 238, 160);
  lgLat.addColorStop(0, "rgba(180,220,255,0.38)");
  lgLat.addColorStop(0.5, "rgba(75,144,200,0.22)");
  lgLat.addColorStop(1, "rgba(242,166,90,0.34)");
  g.fillStyle = lgLat;
  g.fill();
  g.strokeStyle = "rgba(244,240,238,0.62)";
  g.lineWidth = 3;
  g.stroke();

  // Cara triangular principal con cáusticas internas y refracción
  g.save();
  g.beginPath();
  g.moveTo(0, -245);
  g.lineTo(195, 160);
  g.lineTo(-205, 160);
  g.closePath();
  g.clip();

  const cg = g.createLinearGradient(-195, -215, 195, 160);
  cg.addColorStop(0, "rgba(255,255,255,0.34)");
  cg.addColorStop(0.45, "rgba(155,208,248,0.2)");
  cg.addColorStop(1, "rgba(242,166,90,0.3)");
  g.fillStyle = cg;
  g.fillRect(-220, -250, 430, 420);

  g.globalCompositeOperation = "screen";
  g.globalAlpha = 0.35 + 0.25 * uAbre;
  g.drawImage(causticas, -200 + t * 18, -220, 420, 380);

  // Haz refractado abriéndose dentro del cristal
  if (uBlanca > 0.5) {
    g.globalCompositeOperation = "lighter";
    g.globalAlpha = 0.85;
    const rgInt = g.createLinearGradient(-82, -18, 70, 10);
    rgInt.addColorStop(0, "rgba(255,255,255,0.95)");
    rgInt.addColorStop(0.5, "rgba(242,190,120,0.85)");
    rgInt.addColorStop(1, "rgba(95,172,235,0.95)");
    g.fillStyle = rgInt;
    g.beginPath();
    g.moveTo(-82, -26);
    g.lineTo(75, -45);
    g.lineTo(75, 42);
    g.lineTo(-82, -8);
    g.closePath();
    g.fill();
  }
  g.restore();

  // Biseles especulares del cristal
  g.beginPath();
  g.moveTo(0, -245);
  g.lineTo(195, 160);
  g.lineTo(-205, 160);
  g.closePath();
  k.vidrio(g, -205, 195, 0.82);

  // Destello en el choque con el cristal
  k.fogonazo(g, -70, -15, t - Tcristal, 520, "255,240,210");

  k.rotuloCine(g, 0, -360, "luz del Sol", uAbre > 0.3 ? "TODOS LOS COLORES" : "LUZ BLANCA", 1, 54);

  g.restore();
}

// Dibuja los dos paneles 3D comparando la ola roja larga y la ola azul corta con cintas volumétricas y moléculas
function escenaOlas(g, x, y, t, lat) {
  g.save();
  g.translate(x, y);

  // Freno C1 continuo antes del fundido hacia 03-rebote.js en 32.32 s
  const uFreno = tramo(t, 31.6, 32.1);
  const tFase = t < 31.6 ? t : 31.6 + 0.5 * (uFreno - 0.5 * uFreno * uFreno);

  const uRojo = suave(tramo(t, Tcada - 0.1, Trojo + 0.25));
  const uAzul = suave(tramo(t, Tazul - 0.25, Tcortas + 0.2));

  // ---------------- Panel 1: OLA ROJA (700 nm)
  g.save();
  g.translate(0, -210);
  redondo(g, -435, -168, 870, 316, 28);
  g.fillStyle = "rgba(18,13,13,0.9)";
  g.fill();
  g.strokeStyle = `rgba(${ROJO_RGB},${0.48 + 0.42 * uRojo})`;
  g.lineWidth = 3.5;
  g.stroke();

  g.fillStyle = CINE.texto;
  g.font = "800 34px Figtree";
  g.textAlign = "left";
  g.fillText("ROJO · OLA LARGA Y SUAVE", -385, -102);
  g.fillStyle = CINE.ambar;
  g.font = "700 28px Figtree";
  g.textAlign = "right";
  g.fillText("700 nm", 385, -102);

  const wRojo = mez(80, 760, entra(tramo(t, Tcada, Tlargas + 0.2)));
  // Cinta 3D secundaria (volumen posterior)
  g.save();
  g.strokeStyle = "rgba(232,131,58,0.38)";
  g.lineWidth = 22;
  g.lineCap = "round";
  g.beginPath();
  for (let i = 0; i <= wRojo; i += 8) {
    const wx = -380 + i;
    const wy = 28 + Math.sin(i * 0.022 - tFase * 4.2 - 0.45) * 58;
    if (i === 0) g.moveTo(wx, wy);
    else g.lineTo(wx, wy);
  }
  g.stroke();

  // Cinta 3D principal roja brillante
  g.strokeStyle = CINE.rojo;
  g.lineWidth = 13 + 3 * lat * (1 - uFreno);
  g.shadowColor = CINE.rojo;
  g.shadowBlur = 26;
  g.beginPath();
  for (let i = 0; i <= wRojo; i += 6) {
    const wx = -380 + i;
    const wy = 25 + Math.sin(i * 0.022 - tFase * 4.2) * 68;
    if (i === 0) g.moveTo(wx, wy);
    else g.lineTo(wx, wy);
  }
  g.stroke();
  g.restore();

  // Molécula 3D de referencia a la derecha (muestra que la ola roja es enorme frente al gas)
  molecula3D(g, 330, 25, 22, tFase, 1, 0, 0);
  g.restore();

  // ---------------- Panel 2: OLA AZUL (450 nm)
  g.save();
  g.translate(0, 210);
  g.globalAlpha = Math.max(0.25, uAzul);
  redondo(g, -435, -168, 870, 316, 28);
  g.fillStyle = "rgba(12,17,24,0.9)";
  g.fill();
  g.strokeStyle = `rgba(${AZUL_RGB},${0.38 + 0.55 * uAzul})`;
  g.lineWidth = 3.5;
  g.stroke();

  g.fillStyle = CINE.texto;
  g.font = "800 34px Figtree";
  g.textAlign = "left";
  g.fillText("AZUL · OLA CORTA Y RÁPIDA", -385, -102);
  g.fillStyle = AZUL_CLARO;
  g.font = "700 28px Figtree";
  g.textAlign = "right";
  g.fillText("450 nm", 385, -102);

  const wAzul = mez(40, 760, entra(tramo(t, Tazul - 0.15, Trapidas + 0.1)));
  g.save();
  // Cinta 3D posterior azul profunda
  g.strokeStyle = "rgba(75,144,200,0.42)";
  g.lineWidth = 18;
  g.lineCap = "round";
  g.beginPath();
  for (let i = 0; i <= wAzul; i += 5) {
    const wx = -380 + i;
    const wy = 28 + Math.sin(i * 0.085 - tFase * 11.5 - 0.5) * 52;
    if (i === 0) g.moveTo(wx, wy);
    else g.lineTo(wx, wy);
  }
  g.stroke();

  // Cinta 3D principal azul eléctrica cinematográfica
  g.strokeStyle = AZUL_CLARO;
  g.lineWidth = 10.5 + 2.5 * lat * (1 - uFreno);
  g.shadowColor = AZUL_CLARO;
  g.shadowBlur = 26;
  g.beginPath();
  for (let i = 0; i <= wAzul; i += 4) {
    const wx = -380 + i;
    const wy = 25 + Math.sin(i * 0.085 - tFase * 11.5) * 62;
    if (i === 0) g.moveTo(wx, wy);
    else g.lineTo(wx, wy);
  }
  g.stroke();
  g.restore();

  // Molécula 3D iluminándose en azul al chocar con la onda corta
  molecula3D(g, 330, 25, 24, tFase, 4, uAzul, pulso(t, Trapidas, 0.22));
  g.restore();

  g.restore();
}

export function dibuja(g, t) {
  const uFreno = tramo(t, 31.6, 32.1);
  const tFase = t < 31.6 ? t : 31.6 + 0.5 * (uFreno - 0.5 * uFreno * uFreno);
  const lat = latidoRitmo(tFase);

  const pan1 = suave(tramo(t, Tla - 0.15, Tla + 0.55));
  const pan2 = suave(tramo(t, Tcada - 0.15, Tolas + 0.25));
  const camX = pan1 * 1120 + pan2 * 1120;

  const luzX = 540 + Math.sin(tFase * 1.4) * 70 * (1 - suave(tramo(t, 31.4, 32.1)));
  mesaEstudio(g, camX, 0, luzX, 1060, tFase);

  g.save();
  g.translate(-camX, 0);

  if (camX < 1080) {
    const entraDoc = entra(tramo(t, f4.inicio, T1871 + 0.25));
    const yDoc = mez(1320, 1140, entraDoc);
    k.rotuloCine(g, 540, 640, "publicado en", "1871", 1, 72);
    documento1871(g, 540, yDoc, t, lat);
  }

  if (camX > 40 && camX < 2200) {
    escenaPrisma(g, 1660, 1080, t, lat);
  }

  if (camX > 1160) {
    k.rotuloCine(g, 2780, 620, "longitud de onda", "EL TAMAÑO DE LA OLA", pan2, 54);
    escenaOlas(g, 2780, 1090, t, lat);
  }

  g.restore();

  acabarCine(g, t, 0.3);
}

export const momentosEstudio = {
  entra1871: T1871,
  subraya: Tmisterio,
  entraBlanca: Tblanca,
  abrePrisma: Tcristal,
  olaRoja: Trojo,
  olaAzul: Tazul,
};
