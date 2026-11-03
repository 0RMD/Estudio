// Plano 02 (Frase 2):
// «Las marcas presumen el número gigante en la caja, pero esconden el tamaño del sensor.»
// Mesa cálida luminosa ("calida") de alto contraste tras el mosaico oscuro:
// Una caja comercial lujosa presume "200 MP" en letras doradas gigantes; en «pero esconden» la caja se desliza
// a la izquierda dejando al descubierto el sensor físico real del tamaño de una uña con cotas milimétricas.
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

export const desde = (v) => v.frase(2).inicio - 0.04;

const { suave, tramo, entra, mez } = k;

export function dibuja(g, t) {
  const f2 = v.frase(2);
  const t0 = f2.inicio - 0.04;
  const tCorte = v.frase(3).inicio - 0.04;
  const tr = relojPlano(t, tCorte, 0.16, 0.24);

  const tGigante = f2.t("gigante");
  const tPero = f2.t("pero");
  const tEsconden = f2.t("esconden");
  const tSensor = f2.t("sensor");

  fondoMesaClara(g, tr, "calida");

  const cam = camino2D([
    [t0, [1.0, 540, 1110]],
    [tPero, [1.03, 560, 1130]],
    [tSensor + 0.15, [1.14, 665, 1165]],
    [tCorte - 0.18, [1.14, 665, 1165]],
  ]);
  const [Z, cx, cy] = cam(tr);

  const slideY = (1 - entra(tramo(tr, t0, t0 + 0.22))) * 34;
  const uAparta = suave(tramo(tr, tPero - 0.08, tSensor));

  g.save();
  vista(g, Z, cx, cy);
  g.translate(0, slideY);

  // ---------------- DERECHA / FONDO: EL SENSOR FÍSICO REAL PEQUEÑITO ----------------
  const xSensor = 700;
  const ySensor = 1155;

  if (uAparta > 0.05) {
    g.save();
    g.globalAlpha = uAparta;

    // Silueta punteada de una moneda/uña como referencia de escala real
    redondo(g, xSensor - 220, ySensor - 250, 440, 500, 32);
    g.fillStyle = "rgba(15, 23, 42, 0.92)";
    g.fill();
    g.strokeStyle = "#38bdf8";
    g.lineWidth = 3.5;
    g.stroke();

    g.textAlign = "center";
    g.textBaseline = "middle";
    g.font = "800 26px Figtree";
    g.fillStyle = "#7dd3fc";
    g.fillText("LO QUE ESCONDEN:", xSensor, ySensor - 188);

    // Sensor CMOS real diminuto (130 x 98 px frente a la caja gigante)
    dibujarSensorCMOS(g, xSensor, ySensor - 10, 136, 102, {
      divisiones: 6,
      opacidadMalla: 0.7,
      luzCelda: 0.35,
      t: tr,
    });

    // Cotas técnicas de medida física
    g.strokeStyle = "#fbbf24";
    g.lineWidth = 3;
    g.beginPath();
    g.moveTo(xSensor - 68, ySensor + 84);
    g.lineTo(xSensor + 68, ySensor + 84);
    g.moveTo(xSensor - 68, ySensor + 72);
    g.lineTo(xSensor - 68, ySensor + 96);
    g.moveTo(xSensor + 68, ySensor + 72);
    g.lineTo(xSensor + 68, ySensor + 96);
    g.stroke();

    g.font = "800 32px Figtree";
    g.fillStyle = "#fde047";
    g.fillText("SOLO 7 mm", xSensor, ySensor + 136);

    g.font = "700 23px Figtree";
    g.fillStyle = "#cbd5e1";
    g.fillText("Más chico que una uña", xSensor, ySensor + 182);
    g.restore();
  }

  // ---------------- CAJA COMERCIAL GIGANTE «ULTRA 200 MP» ----------------
  const xCaja = mez(540, 255, uAparta);
  const escCaja = mez(1.0, 0.86, uAparta);
  const pulsoOro = 1 + 0.04 * Math.sin(tr * 6) * (1 - uAparta);

  g.save();
  g.translate(xCaja, 1135);
  g.scale(escCaja, escCaja);

  g.shadowColor = "rgba(40, 24, 8, 0.38)";
  g.shadowBlur = 46;
  g.shadowOffsetY = 24;
  redondo(g, -255, -390, 510, 780, 38);
  const cg = g.createLinearGradient(-255, -390, 255, 390);
  cg.addColorStop(0, "#171324");
  cg.addColorStop(0.5, "#0d0b14");
  cg.addColorStop(1, "#1e162b");
  g.fillStyle = cg;
  g.fill();
  g.shadowBlur = 0;
  g.shadowOffsetY = 0;

  redondo(g, -255, -390, 510, 780, 38);
  g.strokeStyle = "#f59e0b";
  g.lineWidth = 5;
  g.stroke();

  g.textAlign = "center";
  g.textBaseline = "middle";
  g.font = "800 28px Figtree";
  g.fillStyle = "#fde68a";
  g.fillText("CAJA COMERCIAL · ULTRA PRO", 0, -295);

  k.brillo(g, 0, -45, 390, "251, 191, 36", 0.45);

  g.save();
  g.translate(0, -55);
  g.scale(pulsoOro, pulsoOro);
  g.font = "800 132px Figtree";
  g.fillStyle = "#fbbf24";
  g.fillText("200", 0, -28);
  g.font = "800 54px Figtree";
  g.fillStyle = "#ffffff";
  g.fillText("MEGAPÍXELES", 0, 68);
  g.restore();

  redondo(g, -185, 165, 370, 66, 18);
  g.fillStyle = "rgba(251, 191, 36, 0.16)";
  g.fill();
  g.strokeStyle = "#fbbf24";
  g.lineWidth = 2.5;
  g.stroke();
  g.font = "800 26px Figtree";
  g.fillStyle = "#fde047";
  g.fillText("MARKETING EN GRANDE", 0, 198);

  // Letra chiquita escondida abajo en la caja
  g.font = "700 20px Figtree";
  g.fillStyle = "#64748b";
  g.fillText("*Tamaño del sensor no especificado", 0, 315);

  g.restore();
  g.restore();

  sinVista(g);
  const alPil = entra(tramo(tr, tEsconden - 0.05, tSensor + 0.18));
  pildoraEstado(g, 540, 1715, "NÚMERO GIGANTE EN CAJA · SENSOR DIMINUTO ADENTRO", "245, 158, 11", alPil, 33, true);

  vineta(g, 0.32);
  capaSuperiorMarca(g, 0.68);
}
