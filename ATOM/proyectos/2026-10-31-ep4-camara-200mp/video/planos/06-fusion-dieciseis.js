// Plano 06 (Frase 7):
// «Por eso de noche ese mismo celular une 16 píxeles en uno y dispara a solo 12 megapíxeles.»
// Mesa técnica clara ("fria") de alto contraste tras el patio lluvioso oscuro:
// Sobre el sensor de 200 MP (malla 12x12), cada grupo de 4x4 (16 píxeles) derriba sus tabiques internos y se funde
// en un solo super-píxel dorado grande (Pixel Binning), pasando el contador de 200 MP a 12 MP REALES.
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

export const desde = (v) => v.frase(7).inicio - 0.04;

const { suave, tramo, entra, mez } = k;

export function dibuja(g, t) {
  const f7 = v.frase(7);
  const t0 = f7.inicio - 0.04;
  const tCorte = v.frase(8).inicio - 0.04;
  const tr = relojPlano(t, tCorte, 0.16, 0.24);

  const tUne = f7.t("une");
  const t16 = f7.t("16");
  const tUno = f7.t("uno");
  const t12 = f7.t("12");

  fondoMesaClara(g, tr, "fria");

  const cam = camino2D([
    [t0, [1.0, 540, 1130]],
    [t16, [1.06, 540, 1145]],
    [t12 + 0.2, [1.03, 540, 1130]],
    [tCorte - 0.18, [1.03, 540, 1130]],
  ]);
  const [Z, cx, cy] = cam(tr);

  const slideY = (1 - entra(tramo(tr, t0, t0 + 0.22))) * 34;
  const uFusion = suave(tramo(tr, tUne - 0.12, tUno + 0.2));
  const u12 = suave(tramo(tr, t12 - 0.35, t12 + 0.18));

  g.save();
  vista(g, Z, cx, cy);
  g.translate(0, slideY);

  // Tarjeta superior del contador vivo de megapíxeles: baja de 200 MP a 12 MP en modo noche
  const mpActual = Math.round(mez(200, 12, u12));
  redondo(g, 145, 610, 790, 195, 32);
  g.fillStyle = "#0b1524";
  g.fill();
  g.strokeStyle = u12 > 0.4 ? "#22e39b" : "#fbbf24";
  g.lineWidth = 4;
  g.stroke();

  g.textAlign = "center";
  g.textBaseline = "middle";
  g.font = "800 25px Figtree";
  g.fillStyle = "#94a3b8";
  g.fillText("MODO NOCHE AUTOMÁTICO (PIXEL BINNING 16 EN 1)", 540, 658);

  g.font = "800 84px Figtree";
  g.fillStyle = u12 > 0.4 ? "#22e39b" : "#fde047";
  g.fillText(`${mpActual} MP REALES`, 540, 738);

  // Sensor central mostrando la fusión física de 4x4 (16 píxeles) en super-píxeles grandes y luminosos
  const sX = 540;
  const sY = 1210;
  const sTam = 540;

  if (uFusion > 0.1) {
    k.brillo(g, sX, sY, 640, "250, 204, 21", uFusion * 0.42);
  }

  dibujarSensorCMOS(g, sX, sY, sTam, sTam, {
    divisiones: 12,
    opacidadMalla: 1,
    fusion4x4: uFusion,
    luzCelda: 0.14 + uFusion * 0.82,
    etiqueta: uFusion > 0.5 ? "SUPER-PÍXELES GRANDES (16 UNIDOS EN 1)" : "16 PÍXELES SEPARADOS (4 × 4)",
    t: tr,
  });

  // Resaltado explícito del bloque central 4x4 con etiqueta «16 -> 1»
  const tamMacro = sTam / 3;
  redondo(g, sX - tamMacro / 2, sY - tamMacro / 2, tamMacro, tamMacro, 12);
  g.strokeStyle = "#ffffff";
  g.lineWidth = 5;
  g.stroke();

  redondo(g, sX - 88, sY - 30, 176, 60, 16);
  g.fillStyle = "rgba(10, 18, 30, 0.92)";
  g.fill();
  g.strokeStyle = "#fde047";
  g.lineWidth = 3;
  g.stroke();
  g.font = "800 29px Figtree";
  g.fillStyle = "#fef08a";
  g.fillText(uFusion > 0.55 ? "1 GRANDE" : "16 CHICOS", sX, sY + 1);

  g.restore();

  sinVista(g);
  const alPil = entra(tramo(tr, tUne - 0.05, t12 + 0.18));
  pildoraEstado(g, 540, 1720, "TU PROPIO CELULAR BAJA DE 200 A 12 MP DE NOCHE", "16, 185, 129", alPil, 33, true);

  vineta(g, 0.32);
  capaSuperiorMarca(g, 0.68);
}
