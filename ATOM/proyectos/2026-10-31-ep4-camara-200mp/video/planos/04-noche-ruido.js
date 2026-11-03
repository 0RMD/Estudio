// Plano 04 (Frase 5):
// «Pero de noche falta luz: un píxel minúsculo casi no atrapa nada y saca ruido.»
// Mesa técnica clara ("fria") de alto contraste tras el plano oscuro:
// Sobre el banco de pruebas vemos la cámara nocturna del sensor diminuto (caen apenas 4 fotones solitarios,
// dejando el 95 % de las micro-celdas a oscuras) y el monitor de salida llenándose de grano/ruido RGB.
import * as k from "#kit";
import { v } from "#voz";
import {
  camino2D,
  capaSuperiorMarca,
  dibujarFotoEscena,
  dibujarSensorCMOS,
  fondoMesaClara,
  pildoraEstado,
  redondo,
  relojPlano,
  sinVista,
  vista,
  vineta,
} from "../mundo.js";

export const desde = (v) => v.frase(5).inicio - 0.04;

const { suave, tramo, entra } = k;

export function dibuja(g, t) {
  const f5 = v.frase(5);
  const t0 = f5.inicio - 0.04;
  const tCorte = v.frase(6).inicio - 0.04;
  const tr = relojPlano(t, tCorte, 0.16, 0.24);

  const tFalta = f5.t("falta");
  const tPixel = f5.t("píxel");
  const tAtrapa = f5.t("atrapa");
  const tRuido = f5.t("ruido");

  fondoMesaClara(g, tr, "fria");

  const cam = camino2D([
    [t0, [1.0, 540, 1100]],
    [tPixel, [1.05, 520, 1135]],
    [tRuido + 0.2, [1.08, 540, 1195]],
    [tCorte - 0.18, [1.08, 540, 1195]],
  ]);
  const [Z, cx, cy] = cam(tr);

  const slideY = (1 - entra(tramo(tr, t0, t0 + 0.22))) * 34;
  const uRuido = suave(tramo(tr, tAtrapa - 0.2, tRuido + 0.2));

  g.save();
  vista(g, Z, cx, cy);
  g.translate(0, slideY);

  // ---------------- CAJA DE PRUEBA NOCTURNA SUPERIOR: SENSOR SIN LUZ ----------------
  const bX = 95;
  const bY = 595;
  const bW = 890;
  const bH = 470;

  redondo(g, bX, bY, bW, bH, 34);
  g.fillStyle = "#080e1a";
  g.fill();
  g.strokeStyle = "#334155";
  g.lineWidth = 4;
  g.stroke();

  g.textAlign = "left";
  g.textBaseline = "middle";
  g.font = "800 25px Figtree";
  g.fillStyle = "#93c5fd";
  g.fillText("DE NOCHE · ESCASA LUZ ENTRANDO AL SENSOR", bX + 38, bY + 50);

  // Sensor de 14x14 celdas diminutas casi vacías y chisporroteando ruido eléctrico
  dibujarSensorCMOS(g, 315, bY + 265, 290, 290, {
    divisiones: 14,
    opacidadMalla: 0.9,
    luzCelda: 0.04,
    ruidoCelda: uRuido,
    t: tr,
  });

  // Apenas 4 fotones solitarios cayendo despacio
  for (let i = 0; i < 4; i++) {
    const fy = ((tr * 0.48 + i * 0.27) % 1 + 1) % 1;
    const fx = 215 + i * 68;
    const py = bY + 95 + fy * 260;
    k.brillo(g, fx, py, 34, "253, 224, 71", 0.75);
  }

  // Medidor de fotones por píxel a la derecha de la caja superior
  redondo(g, 520, bY + 125, 420, 285, 24);
  g.fillStyle = "#111927";
  g.fill();
  g.strokeStyle = "#ef4444";
  g.lineWidth = 3;
  g.stroke();

  g.textAlign = "center";
  g.font = "800 26px Figtree";
  g.fillStyle = "#fca5a5";
  g.fillText("PÍXEL DE 0.56 µm", 730, bY + 178);

  g.font = "800 62px Figtree";
  g.fillStyle = "#ef4444";
  g.fillText("4 % LUZ", 730, bY + 258);

  g.font = "700 23px Figtree";
  g.fillStyle = "#cbd5e1";
  g.fillText("El chip sube ganancia → RUIDO", 730, bY + 336);

  // ---------------- MONITOR INFERIOR: FOTO NOCTURNA CON GRANO Y RUIDO RGB ----------------
  const mY = 1105;
  const mH = 490;

  redondo(g, bX, mY, bW, mH, 34);
  g.fillStyle = "#120c14";
  g.fill();
  g.strokeStyle = "#ef4444";
  g.lineWidth = 4.5;
  g.stroke();

  dibujarFotoEscena(g, 540, mY + 225, 810, 355, {
    modo: "noche-ruido",
    ruido: 0.25 + 0.75 * uRuido,
    t: tr,
  });

  g.textAlign = "center";
  g.font = "800 27px Figtree";
  g.fillStyle = "#fca5a5";
  g.fillText("RESULTADO A 200 MP PUROS: FOTO OSCURA Y GRANULADA", 540, mY + 444);

  g.restore();

  sinVista(g);
  const alPil = entra(tramo(tr, tAtrapa - 0.05, tRuido + 0.18));
  pildoraEstado(g, 540, 1715, "PÍXEL MINÚSCULO DE NOCHE = POCA LUZ Y MUCHO RUIDO", "239, 68, 68", alPil, 33, true);

  vineta(g, 0.32);
  capaSuperiorMarca(g, 0.68);
}
