// Plano 07 (Frase 8):
// «Lo que mejora tus fotos nocturnas no son más megapíxeles: es un sensor físico más grande.»
// Banco óptico oscuro:
// A la izquierda un sensor físico pequeño atrapa un cono estrecho de luz; a la derecha una lente de cristal
// abierta proyecta un cono dorado enorme sobre un sensor físico grande de 1 pulgada (+300 % área de luz).
import * as k from "#kit";
import { v } from "#voz";
import {
  camino2D,
  capaSuperiorMarca,
  dibujarSensorCMOS,
  pildoraEstado,
  redondo,
  relojPlano,
  sinVista,
  vista,
  vineta,
} from "../mundo.js";

export const desde = (v) => v.frase(8).inicio - 0.04;

const { suave, tramo, entra } = k;

function dibujarLenteCristal(g, cx, cy, ancho, alto) {
  g.save();
  const lg = g.createLinearGradient(cx - ancho / 2, cy, cx + ancho / 2, cy);
  lg.addColorStop(0, "rgba(125, 211, 252, 0.25)");
  lg.addColorStop(0.5, "rgba(224, 242, 254, 0.72)");
  lg.addColorStop(1, "rgba(56, 189, 248, 0.28)");
  g.fillStyle = lg;
  g.strokeStyle = "#bae6fd";
  g.lineWidth = 3.5;

  g.beginPath();
  g.ellipse(cx, cy, ancho / 2, alto / 2, 0, 0, Math.PI * 2);
  g.fill();
  g.stroke();
  g.restore();
}

export function dibuja(g, t) {
  const f8 = v.frase(8);
  const t0 = f8.inicio - 0.04;
  const tCorte = v.frase(9).inicio - 0.04;
  const tr = relojPlano(t, tCorte, 0.16, 0.24);

  const tNo = f8.t("no");
  const tSensor = f8.t("sensor");
  const tGrande = f8.t("grande");

  // Cámara óptica nocturna oscura
  g.save();
  sinVista(g);
  const bg = g.createLinearGradient(0, 0, 0, 1920);
  bg.addColorStop(0, "#050912");
  bg.addColorStop(0.55, "#0d182b");
  bg.addColorStop(1, "#060c18");
  g.fillStyle = bg;
  g.fillRect(0, 0, 1080, 1920);
  k.brillo(g, 690, 1180, 880, "250, 204, 21", 0.24);
  g.restore();

  const cam = camino2D([
    [t0, [1.04, 470, 1150]],
    [tSensor, [1.02, 575, 1160]],
    [tGrande + 0.2, [1.06, 615, 1175]],
    [tCorte - 0.18, [1.06, 615, 1175]],
  ]);
  const [Z, cx, cy] = cam(tr);

  const uGrande = suave(tramo(tr, tSensor - 0.25, tGrande + 0.15));

  g.save();
  vista(g, Z, cx, cy);

  // ---------------- IZQUIERDA: SENSOR PEQUEÑO (200 MP MARKETING) ----------------
  const xIzq = 265;
  const yLente = 735;
  const yBase = 1325;

  // Cono estrecho y tenue de luz
  g.save();
  const cIzq = g.createLinearGradient(xIzq, yLente, xIzq, yBase);
  cIzq.addColorStop(0, "rgba(148, 163, 184, 0.28)");
  cIzq.addColorStop(1, "rgba(248, 113, 113, 0.18)");
  g.fillStyle = cIzq;
  g.beginPath();
  g.moveTo(xIzq - 72, yLente);
  g.lineTo(xIzq + 72, yLente);
  g.lineTo(xIzq + 78, yBase - 60);
  g.lineTo(xIzq - 78, yBase - 60);
  g.closePath();
  g.fill();
  g.restore();

  dibujarLenteCristal(g, xIzq, yLente, 165, 38);

  dibujarSensorCMOS(g, xIzq, yBase, 155, 118, {
    divisiones: 12,
    opacidadMalla: 0.85,
    luzCelda: 0.12,
    t: tr,
  });

  g.textAlign = "center";
  g.textBaseline = "middle";
  g.font = "800 26px Figtree";
  g.fillStyle = "#fca5a5";
  g.fillText("SENSOR CHICO", xIzq, yBase + 135);
  g.font = "700 22px Figtree";
  g.fillStyle = "#94a3b8";
  g.fillText("Aunque diga 200 MP", xIzq, yBase + 172);

  // ---------------- DERECHA: SENSOR FÍSICO GRANDE DE 1 PULGADA ----------------
  const xDer = 735;
  const escDer = 0.9 + 0.12 * uGrande;

  // Gran cono dorado luminoso bañando toda la superficie del sensor grande
  g.save();
  g.globalCompositeOperation = "lighter";
  const cDer = g.createLinearGradient(xDer, yLente, xDer, yBase);
  cDer.addColorStop(0, `rgba(254, 240, 138, ${0.32 + 0.35 * uGrande})`);
  cDer.addColorStop(1, `rgba(34, 227, 155, ${0.25 + 0.35 * uGrande})`);
  g.fillStyle = cDer;
  g.beginPath();
  g.moveTo(xDer - 185, yLente);
  g.lineTo(xDer + 185, yLente);
  g.lineTo(xDer + 195 * escDer, yBase - 140);
  g.lineTo(xDer - 195 * escDer, yBase - 140);
  g.closePath();
  g.fill();
  g.restore();

  dibujarLenteCristal(g, xDer, yLente, 390, 56);

  g.save();
  g.translate(xDer, yBase - 25);
  g.scale(escDer, escDer);
  k.brillo(g, 0, 0, 460, "250, 204, 21", 0.35 + 0.4 * uGrande);
  dibujarSensorCMOS(g, 0, 0, 380, 285, {
    divisiones: 5,
    opacidadMalla: 0.9,
    luzCelda: 0.45 + 0.5 * uGrande,
    t: tr,
  });
  g.restore();

  redondo(g, xDer - 210, yBase + 150, 420, 96, 22);
  g.fillStyle = "rgba(6, 48, 36, 0.95)";
  g.fill();
  g.strokeStyle = "#22e39b";
  g.lineWidth = 3.5;
  g.stroke();

  g.font = "800 29px Figtree";
  g.fillStyle = "#6ee7b7";
  g.fillText("SENSOR FÍSICO GRANDE", xDer, yBase + 182);
  g.font = "700 23px Figtree";
  g.fillStyle = "#d1fae5";
  g.fillText("Tipo 1 pulgada · +300 % luz real", xDer, yBase + 218);

  g.restore();

  sinVista(g);
  const alPil = entra(tramo(tr, tNo - 0.05, tGrande + 0.16));
  pildoraEstado(g, 540, 1710, "MÁS SUPERFICIE FÍSICA = MEJORES FOTOS DE NOCHE", "34, 227, 155", alPil, 33);

  vineta(g, 0.52);
  capaSuperiorMarca(g, 0.62);
}
