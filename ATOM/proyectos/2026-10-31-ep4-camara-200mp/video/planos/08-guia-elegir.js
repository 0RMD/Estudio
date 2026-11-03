// Plano 08 (Frase 9):
// «Al elegir celular, busca el tamaño físico del sensor antes de pagar por más megapíxeles.»
// Estudio claro ("menta") de alto contraste tras el banco óptico oscuro:
// Guía limpia y guardable en 2 tarjetas físicas:
// - Tarjeta 1: Busca el tamaño físico del sensor (1/1.3″ o 1″) en la ficha técnica (check esmeralda).
// - Tarjeta 2: No pagues extra solo porque la caja presuma 200 MP en sensor pequeño.
import * as k from "#kit";
import { v } from "#voz";
import {
  camino2D,
  capaSuperiorMarca,
  dibujarSensorCMOS,
  fondoMesaClara,
  pildoraEstado,
  redondo,
  relojPlano,
  sinVista,
  vista,
  vineta,
} from "../mundo.js";

export const desde = (v) => v.frase(9).inicio - 0.04;

const { suave, tramo, entra, mez } = k;

export function dibuja(g, t) {
  const f9 = v.frase(9);
  const t0 = f9.inicio - 0.04;
  const tCorte = v.frase(10).inicio - 0.04;
  const tr = relojPlano(t, tCorte, 0.16, 0.24);

  const tTamano = f9.t("tamaño");
  const tSensor = f9.t("sensor");
  const tPagar = f9.t("pagar");
  const tMegapixeles = f9.t("megapíxeles");

  fondoMesaClara(g, tr, "menta");

  const cam = camino2D([
    [t0, [1.0, 540, 1085]],
    [tPagar, [1.02, 540, 1145]],
    [tCorte - 0.18, [1.05, 540, 1165]],
  ]);
  const [Z, cx, cy] = cam(tr);

  const slide1 = (1 - entra(tramo(tr, t0, t0 + 0.22))) * 34;
  const uCard2 = entra(tramo(tr, tPagar - 0.35, tPagar + 0.18));
  const uTacha = suave(tramo(tr, tPagar, tMegapixeles + 0.15));

  g.save();
  vista(g, Z, cx, cy);

  // ---------------- TARJETA 1: LO QUE SÍ IMPORTA AL ELEGIR CELULAR ----------------
  g.save();
  g.translate(0, slide1);

  const cX = 88;
  const c1Y = 610;
  const cW = 904;
  const cH = 445;

  g.shadowColor = "rgba(15, 45, 38, 0.22)";
  g.shadowBlur = 36;
  g.shadowOffsetY = 16;
  redondo(g, cX, c1Y, cW, cH, 34);
  g.fillStyle = "#0d1b22";
  g.fill();
  g.shadowBlur = 0;
  g.shadowOffsetY = 0;
  g.strokeStyle = "#10b981";
  g.lineWidth = 4.5;
  g.stroke();

  // Sensor grande ilustrado a la izquierda
  dibujarSensorCMOS(g, cX + 165, c1Y + 225, 200, 155, {
    divisiones: 4,
    opacidadMalla: 0.9,
    luzCelda: 0.85,
    t: tr,
  });

  redondo(g, cX + 320, c1Y + 52, 325, 54, 16);
  g.fillStyle = "rgba(16, 185, 129, 0.18)";
  g.fill();
  g.strokeStyle = "#34d399";
  g.lineWidth = 2.5;
  g.stroke();

  g.textAlign = "center";
  g.textBaseline = "middle";
  g.font = "800 24px Figtree";
  g.fillStyle = "#6ee7b7";
  g.fillText("REGLA 1 · LO QUE SÍ IMPORTA", cX + 482, c1Y + 79);

  g.textAlign = "left";
  g.font = "800 42px Figtree";
  g.fillStyle = "#ffffff";
  g.fillText("Tamaño del sensor", cX + 320, c1Y + 166);

  g.font = "800 34px Figtree";
  g.fillStyle = "#fde047";
  g.fillText('Busca: 1/1.3" o 1"', cX + 320, c1Y + 232);

  const wBar = mez(160, 510, suave(tramo(tr, t0 + 0.15, tSensor + 0.25)));
  redondo(g, cX + 320, c1Y + 292, 510, 24, 12);
  g.fillStyle = "#1e293b";
  g.fill();
  redondo(g, cX + 320, c1Y + 292, wBar, 24, 12);
  g.fillStyle = "#22e39b";
  g.fill();

  g.font = "800 25px Figtree";
  g.fillStyle = "#6ee7b7";
  g.fillText("LUZ REAL DE NOCHE Y MENOS RUIDO", cX + 320, c1Y + 362);
  g.restore();

  // ---------------- TARJETA 2: NO PAGUES SOLO POR MÁS MEGAPÍXELES ----------------
  if (uCard2 > 0.01) {
    g.save();
    g.globalAlpha = uCard2;
    g.translate(0, (1 - uCard2) * 58);

    const c2Y = 1100;

    g.shadowColor = "rgba(15, 45, 38, 0.24)";
    g.shadowBlur = 36;
    g.shadowOffsetY = 16;
    redondo(g, cX, c2Y, cW, cH, 34);
    g.fillStyle = "#171118";
    g.fill();
    g.shadowBlur = 0;
    g.shadowOffsetY = 0;
    g.strokeStyle = "#f87171";
    g.lineWidth = 4.5;
    g.stroke();

    // Etiqueta dorada "200 MP" siendo tachada a la izquierda
    redondo(g, cX + 46, c2Y + 95, 236, 255, 26);
    g.fillStyle = "#0e0a12";
    g.fill();
    g.strokeStyle = "#fbbf24";
    g.lineWidth = 3;
    g.stroke();

    g.textAlign = "center";
    g.font = "800 64px Figtree";
    g.fillStyle = "#fbbf24";
    g.fillText("200", cX + 164, c2Y + 195);
    g.font = "800 32px Figtree";
    g.fillStyle = "#cbd5e1";
    g.fillText("MP", cX + 164, c2Y + 255);

    if (uTacha > 0.02) {
      g.strokeStyle = "#ef4444";
      g.lineWidth = 10;
      g.lineCap = "round";
      g.beginPath();
      g.moveTo(cX + 72, c2Y + 130);
      g.lineTo(cX + 72 + 184 * uTacha, c2Y + 130 + 185 * uTacha);
      g.stroke();
    }

    redondo(g, cX + 320, c2Y + 52, 310, 54, 16);
    g.fillStyle = "rgba(239, 68, 68, 0.18)";
    g.fill();
    g.strokeStyle = "#f87171";
    g.lineWidth = 2.5;
    g.stroke();

    g.font = "800 24px Figtree";
    g.fillStyle = "#fca5a5";
    g.fillText("REGLA 2 · TRAMPA DE MARKETING", cX + 475, c2Y + 79);

    g.textAlign = "left";
    g.font = "800 40px Figtree";
    g.fillStyle = "#ffffff";
    g.fillText("Más MP en sensor chico", cX + 320, c2Y + 168);

    g.font = "700 29px Figtree";
    g.fillStyle = "#fda4af";
    g.fillText("Píxeles más apretados y oscuros", cX + 320, c2Y + 228);

    g.font = "800 25px Figtree";
    g.fillStyle = "#fde047";
    g.fillText("48 O 50 MP EN SENSOR GRANDE GANAN", cX + 320, c2Y + 332);
    g.restore();
  }

  g.restore();

  sinVista(g);
  const alPil = entra(tramo(tr, tTamano - 0.1, tSensor + 0.2));
  pildoraEstado(g, 540, 1715, "ELIGE TAMAÑO DE SENSOR ANTES QUE MEGAPÍXELES", "16, 185, 129", alPil, 34, true);

  vineta(g, 0.3);
  capaSuperiorMarca(g, 0.68);
}
