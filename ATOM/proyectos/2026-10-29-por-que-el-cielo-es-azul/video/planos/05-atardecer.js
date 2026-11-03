// Plano 05 (05-atardecer.js): El atardecer 3D, el remate y el cierre del creador.
// «Por eso al atardecer, como la luz cruza mucho más aire, el azul se pierde y solo llega el rojo.
//  Así que el aire no tiene color: lo que ves arriba es luz del Sol rebotando sin parar.
//  Envíaselo a ese amigo que mira el cielo todos los días y no sabe por qué es azul.»
import * as k from "#kit";
import { v } from "#voz";
import {
  AZUL_RGB,
  ROJO_RGB,
  acabarCine,
  carretera3D,
  cocheRojo,
  cordillera3D,
  latidoRitmo,
  molecula3D,
  pinoCine,
  solCine,
} from "../mundo.js";

const f10 = v.frase(10), f11 = v.frase(11), f12 = v.frase(12);
export const desde = () => f10.inicio;
export const entrada = "fundido";

const { CINE, suave, tramo, entra, pulso, mez, redondo, azar, red, manchas, causticas } = k;

const Tatardecer = f10.t("atardecer");
const Tcruza = f10.t("cruza");
const Tpierde = f10.t("pierde");
const Trojo = f10.t("rojo");

const Tasi = f11.t("asi");
const Taire11 = f11.t("aire");
const Tarriba = f11.t("arriba");
const Trebotando = f11.t("rebotando");

const Tenviaselo = f12.t("enviaselo");
const Tamigo = f12.t("amigo");
const Tazul12 = f12.t("azul");

const az = azar(808);
const CHISPAS_BOVEDA = Array.from({ length: 115 }, () => ({
  x: 80 + az() * 920,
  y: 480 + az() * 540,
  s: 4.5 + az() * 6,
  f: az() * 6.28,
}));

const PINOS_FINAL = [
  { x: 265, y: 1110, s: 0.74, l: 1 },
  { x: 820, y: 1100, s: 0.72, l: -1 },
  { x: 165, y: 1255, s: 0.98, l: 1 },
  { x: 915, y: 1240, s: 0.96, l: -1 },
  { x: 105, y: 1480, s: 1.22, l: 1 },
  { x: 965, y: 1465, s: 1.20, l: -1 },
  { x: 155, y: 1735, s: 1.38, l: 1 },
  { x: 925, y: 1720, s: 1.36, l: -1 },
];

// Casa / cabaña 3D en la colina con fachada iluminada, alero en perspectiva, chimenea y ventanas cálidas
function casaNocturna3D(g, x, y, esc = 1) {
  g.save();
  g.translate(x, y);
  g.scale(esc, esc);

  k.luzCalida(g, 0, 20, 240, 0.9);

  // Sombra en la colina
  g.fillStyle = "rgba(3,4,6,0.72)";
  g.beginPath();
  g.ellipse(0, 48, 95, 22, 0, 0, Math.PI * 2);
  g.fill();

  // Pared lateral derecha en perspectiva 3D (en sombra)
  g.fillStyle = "#8C827A";
  g.beginPath();
  g.moveTo(45, -36);
  g.lineTo(82, -24);
  g.lineTo(82, 42);
  g.lineTo(45, 48);
  g.closePath();
  g.fill();

  // Pared frontal iluminada
  const fg = g.createLinearGradient(-68, -36, 45, 48);
  fg.addColorStop(0, "#EAE2DA");
  fg.addColorStop(1, "#C8BEB5");
  g.fillStyle = fg;
  redondo(g, -68, -36, 115, 84, 5);
  g.fill();

  // Chimenea de piedra/ladrillo rojo oscuro
  g.fillStyle = "#7A2019";
  redondo(g, 32, -82, 22, 48, 3);
  g.fill();

  // Tejado a dos aguas 3D en rojo Cine Nocturno (#C9372C)
  const tg = g.createLinearGradient(-82, -92, 88, -24);
  tg.addColorStop(0, "#E64E40");
  tg.addColorStop(0.55, CINE.rojo);
  tg.addColorStop(1, "#821D16");
  g.fillStyle = tg;
  g.beginPath();
  g.moveTo(-84, -30);
  g.lineTo(-10, -92);
  g.lineTo(88, -24);
  g.lineTo(48, -32);
  g.closePath();
  g.fill();

  // Ventanas encendidas con cruceta de madera y resplandor ámbar
  for (const vx of [-46, 2]) {
    g.fillStyle = "#FFF2D6";
    redondo(g, vx, -14, 28, 28, 4);
    g.fill();
    g.strokeStyle = CINE.naranja;
    g.lineWidth = 2.5;
    g.stroke();
    k.brillo(g, vx + 14, 0, 56, CINE.ambarRgb, 0.65);
  }

  g.restore();
}

export function dibuja(g, t) {
  k.nocheCine(g, 1);

  // Freno suave con continuidad C1 antes del final del video (68.2 a 68.9 s)
  const uFreno = tramo(t, 68.2, 68.9);
  const tFase = t < 68.2 ? t : 68.2 + 0.7 * (uFreno - 0.5 * uFreno * uFreno);
  const lat = latidoRitmo(tFase) * (1 - uFreno);

  const uRemate = suave(tramo(t, Tasi - 0.1, Taire11 + 0.3));
  const uRebotando = suave(tramo(t, Tarriba - 0.1, Trebotando + 0.25));
  const uCierre = suave(tramo(t, Tenviaselo - 0.1, Tazul12 + 0.1));

  // ---------------- 1. EL ATARDECER EN 3D (Frase 10: 51.60 a 58.20 s)
  if (uRemate < 0.99) {
    g.save();
    g.globalAlpha = 1 - uRemate;

    // La cámara acompaña al rayo de izquierda a derecha mientras cruza la atmósfera espesa
    const panAtardecer = suave(tramo(t, f10.inicio, Trojo + 0.2));
    const zoomAtardecer = mez(1.02, 1.16, panAtardecer) + 0.01 * lat;
    g.translate(540 - panAtardecer * 85, 1180);
    g.scale(zoomAtardecer, zoomAtardecer);
    g.translate(-540, -1180);

    const uLlegaRojo = suave(tramo(t, Tpierde - 0.2, Trojo + 0.15));
    if (uLlegaRojo > 0.01) {
      const rg = g.createRadialGradient(820, 1180, 40, 820, 1180, 820);
      rg.addColorStop(0, `rgba(232,131,58,${0.76 * uLlegaRojo})`);
      rg.addColorStop(0.5, `rgba(201,55,44,${0.52 * uLlegaRojo})`);
      rg.addColorStop(1, "rgba(11,10,13,0)");
      g.fillStyle = rg;
      g.fillRect(-200, 0, 1480, 1920);
    }

    const cy = 2250, rT = 920, rA = 1150;
    const ag = g.createRadialGradient(540, cy, rT, 540, cy, rA);
    ag.addColorStop(0, "rgba(75,144,200,0.28)");
    ag.addColorStop(0.65, "rgba(232,131,58,0.26)");
    ag.addColorStop(1, "rgba(11,10,13,0)");
    g.fillStyle = ag;
    g.beginPath();
    g.arc(540, cy, rA, 0, Math.PI * 2);
    g.fill();

    g.strokeStyle = "rgba(242,166,90,0.55)";
    g.lineWidth = 3.5;
    g.setLineDash([16, 12]);
    g.beginPath();
    g.arc(540, cy, rA - 10, -Math.PI * 0.82, -Math.PI * 0.18);
    g.stroke();
    g.setLineDash([]);

    const solX = 145;
    const solY = mez(910, 1185, suave(tramo(t, f10.inicio, Tatardecer + 0.45)));
    solCine(g, solX, solY, 98, tFase, 1);

    const progresoRayo = entra(tramo(t, f10.inicio + 0.2, Trojo + 0.05));
    const xFin = mez(solX + 60, 860, progresoRayo);

    // Moléculas diatómicas 3D a lo largo del camino rasante desviando el azul y perdiéndolo
    const uPierde = suave(tramo(t, Tcruza - 0.1, Tpierde + 0.2));
    for (let i = 0; i < 7; i++) {
      const bx = 260 + i * 74;
      const by = 1165 - i * 8;
      if (uPierde > 0.01) {
        g.save();
        g.globalCompositeOperation = "lighter";
        const escY = by - (160 + i * 24) * uPierde;
        const escX = bx + (i % 2 === 0 ? -54 : 54) * uPierde;
        g.strokeStyle = `rgba(${AZUL_RGB},${0.82 * (1 - 0.35 * uLlegaRojo)})`;
        g.lineWidth = 6.5;
        g.beginPath();
        g.moveTo(bx, by);
        g.lineTo(escX, escY);
        g.stroke();
        k.brillo(g, escX, escY, 48, AZUL_RGB, 0.85 * uPierde);
        g.restore();
      }
      // Molécula 3D en cada punto de rebote atmosférico
      molecula3D(g, bx, by, 18, tFase, i + 1, uPierde * (1 - 0.4 * uLlegaRojo), 0);
    }

    // Cinta 3D de onda roja larga atravesando todo el horizonte hasta el coche
    g.save();
    g.globalCompositeOperation = "lighter";
    const rg = g.createLinearGradient(solX + 50, solY, 860, 1210);
    rg.addColorStop(0, "rgba(255,235,190,0.95)");
    rg.addColorStop(0.42, "rgba(232,131,58,0.94)");
    rg.addColorStop(1, "rgba(201,55,44,1)");
    g.strokeStyle = rg;
    g.lineWidth = 22 + 4 * lat;
    g.lineCap = "round";
    g.beginPath();
    for (let x = solX + 50; x <= xFin; x += 10) {
      const u = (x - (solX + 50)) / (860 - (solX + 50));
      const yBase = mez(solY, 1210, u);
      const y = yBase + Math.sin(x * 0.025 - tFase * 6) * 22;
      if (x === solX + 50) g.moveTo(x, y);
      else g.lineTo(x, y);
    }
    g.stroke();
    g.restore();

    // Horizonte curvado 3D con textura geológica
    g.save();
    g.beginPath();
    g.arc(540, cy, rT, 0, Math.PI * 2);
    g.clip();
    g.fillStyle = "#14181C";
    g.fillRect(0, cy - rT, 1200, 600);
    g.globalCompositeOperation = "multiply";
    g.globalAlpha = 0.48;
    g.drawImage(red, 0, cy - rT, 1080, 500);
    g.restore();

    g.strokeStyle = "rgba(232,131,58,0.72)";
    g.lineWidth = 4.5;
    g.beginPath();
    g.arc(540, cy, rT, -Math.PI * 0.85, -Math.PI * 0.15);
    g.stroke();

    pinoCine(g, 710, 1345, 0.82, -1, tFase, 1);
    pinoCine(g, 765, 1355, 0.92, -1, tFase, 2);
    cocheRojo(g, 855, 1365, 0.78, -0.35, 0.9);
    k.fogonazo(g, 855, 1320, t - Trojo, 560, ROJO_RGB);

    g.restore();

    k.rotuloCine(g, 540, 650, "al atardecer", uLlegaRojo > 0.3 ? "SOLO LLEGA EL ROJO" : "10x MÁS AIRE", 1 - uRemate, 58);
  }

  // ---------------- 2. EL REMATE Y EL CIERRE PANORÁMICO 3D (Frases 11 y 12: 57.92 a 69.44 s)
  if (uRemate > 0.01) {
    g.save();
    g.globalAlpha = uRemate;

    const escVista = mez(1.12, 0.88, uCierre) + 0.008 * lat;
    const dyVista = mez(80, -40, uCierre);
    g.translate(540, 1100 + dyVista);
    g.scale(escVista, escVista);
    g.translate(-540, -1100);

    if (uRebotando > 0.01) {
      const bg = g.createRadialGradient(540, 540, 40, 540, 680, 980);
      bg.addColorStop(0, `rgba(175,225,255,${0.92 * uRebotando})`);
      bg.addColorStop(0.48, `rgba(75,144,200,${0.75 * uRebotando})`);
      bg.addColorStop(0.85, `rgba(30,72,118,${0.35 * uRebotando})`);
      bg.addColorStop(1, "rgba(11,10,13,0)");
      g.fillStyle = bg;
      g.fillRect(-150, -150, 1380, 1500);

      // Cáusticas celestes suaves en la bóveda
      g.save();
      g.globalCompositeOperation = "screen";
      g.globalAlpha = 0.24 * uRebotando;
      g.drawImage(causticas, -80 + Math.sin(tFase * 0.4) * 30, 80, 1240, 960);
      g.restore();

      g.save();
      g.globalCompositeOperation = "lighter";
      for (const c of CHISPAS_BOVEDA) {
        const latC = 0.5 + 0.5 * Math.sin(tFase * 5.5 + c.f);
        k.brillo(g, c.x, c.y, c.s * 9.5 * (1 + 0.15 * lat), AZUL_RGB, uRebotando * latC * 0.86);
      }
      g.restore();

      // Moléculas 3D translúcidas en lo alto del cielo recordando visualmente el rebote de Rayleigh
      g.save();
      g.globalAlpha = 0.52 * uRebotando * (1 - 0.35 * uCierre);
      for (let i = 0; i < 7; i++) {
        const mx = 190 + i * 116 + Math.sin(tFase * 1.4 + i) * 10;
        const my = 560 + (i % 2 === 0 ? -38 : 34) + Math.cos(tFase * 1.2 + i) * 8;
        molecula3D(g, mx, my, 17, tFase, i + 10, 1, pulso(t, Trebotando, 0.25));
      }
      g.restore();
    }

    solCine(g, 540, 520, 78, tFase, uRemate);

    // Cordillera 3D hiperrealista al fondo del valle
    cordillera3D(g, 1065, uRebotando, 0.9, tFase * 18, 0);

    // Carretera 3D avanzando hacia la cabaña iluminada
    carretera3D(g, tFase, 1065, 1, uRebotando);

    // Cabaña 3D acogedora en la colina y bosque de pinos 3D a ambos lados
    casaNocturna3D(g, 535, 1048, 1.02);
    for (const [idx, p] of PINOS_FINAL.entries()) {
      pinoCine(g, p.x, p.y, p.s, p.l, tFase, idx);
    }

    const cocheY = mez(1545, 1430, suave(tramo(t, Tasi, Tazul12)));
    k.luzCalida(g, 525, cocheY - 70, 450 * (1 + 0.06 * lat), 0.94);
    cocheRojo(g, 525, cocheY, 1.04, -0.08, 1);

    k.fogonazo(g, 540, 580, t - Trebotando, 760, AZUL_RGB);
    k.fogonazo(g, 540, 580, t - Tazul12, 820, AZUL_RGB);

    g.restore();

    const textoR = uRebotando > 0.25 ? "LUZ REBOTANDO" : "AIRE · 0% COLOR";
    const esc = 1 + 0.07 * pulso(t, Tazul12, 0.22) + 0.015 * lat;
    k.rotuloCine(g, 540, 740, "lo que ves arriba", textoR, uRemate, 60 * esc);
  }

  acabarCine(g, t, 0.45);
}

export const momentosFinal = {
  atardecer: Tatardecer,
  pierdeAzul: Tpierde,
  llegaRojo: Trojo,
  rebotando: Trebotando,
  amigo: Tamigo,
  cierreAzul: Tazul12,
};
