// Plano 03 (Frases 3 y 4):
// F3: «Como el sensor del celular es pequeño, meter 200 millones de píxeles los vuelve diminutos.»
// F4: «Con buen sol sobra luz y cada puntito logra una foto llena de detalle.»
// Cámara óptica oscura con viaje continuo:
// - En F3 haces láser subdividen el sensor pequeño hasta dejar una malla apretadísima de 12x12 micro-celdas (0.56 µm).
// - En F4 se enciende un sol dorado radiante dentro de la cámara óptica que baña cada micro-celda con cientos
//   de fotones y revela al costado una fotografía diurna llena de detalle.
import * as k from "#kit";
import { v } from "#voz";
import {
  camino2D,
  capaSuperiorMarca,
  dibujarFotoEscena,
  dibujarSensorCMOS,
  pildoraEstado,
  redondo,
  relojPlano,
  sinVista,
  vista,
  vineta,
} from "../mundo.js";

export const desde = (v) => v.frase(3).inicio - 0.04;

const { suave, tramo, entra, mez, azar } = k;

const FOTONES_SOL = (() => {
  const az = azar(403);
  const arr = [];
  for (let i = 0; i < 46; i++) {
    arr.push({ xOff: (az() - 0.5) * 420, fase: az(), vel: 0.85 + az() * 0.65, r: 5 + az() * 5 });
  }
  return arr;
})();

export function dibuja(g, t) {
  const f3 = v.frase(3);
  const f4 = v.frase(4);
  const t0 = f3.inicio - 0.04;
  const tCorte = v.frase(5).inicio - 0.04;
  const tr = relojPlano(t, tCorte, 0.16, 0.24);

  const t200 = f3.t("200");
  const tPixeles = f3.t("píxeles");
  const tDiminutos = f3.t("diminutos");
  const tSol = f4.t("sol");
  const tLuz = f4.t("luz");
  const tFoto = f4.t("foto");
  const tDetalle = f4.t("detalle");

  // Cámara óptica oscura (mantiene y < 510 oscuro limpio para subtítulos y contraste neto con Plano 04 claro)
  g.save();
  sinVista(g);
  const bg = g.createLinearGradient(0, 0, 0, 1920);
  bg.addColorStop(0, "#050912");
  bg.addColorStop(0.5, "#0b1628");
  bg.addColorStop(1, "#060c17");
  g.fillStyle = bg;
  g.fillRect(0, 0, 1080, 1920);

  const uSol = suave(tramo(tr, f4.inicio - 0.1, tLuz + 0.2));
  k.brillo(g, 540, 1060, 940, uSol > 0.3 ? "251, 191, 36" : "34, 211, 238", 0.2 + uSol * 0.18);
  g.restore();

  const cam = camino2D([
    [t0, [1.0, 540, 1120]],
    [tDiminutos, [1.14, 540, 1185]],
    [tSol + 0.3, [1.0, 540, 1090]],
    [tDetalle + 0.1, [1.03, 560, 1105]],
    [tCorte - 0.18, [1.03, 560, 1105]],
  ]);
  const [Z, cx, cy] = cam(tr);

  // Progreso de subdivisión de la malla: 4x4 -> 8x8 -> 14x14 micro-píxeles
  const uSub1 = suave(tramo(tr, t200 - 0.3, t200 + 0.35));
  const uSub2 = suave(tramo(tr, tPixeles - 0.2, tDiminutos + 0.1));
  const divActual = uSub2 > 0.5 ? 14 : uSub1 > 0.4 ? 8 : 4;

  // En F4 el sensor se desplaza suavemente a la izquierda para abrir paso a la foto diurna llena de detalle
  const uFoto = entra(tramo(tr, tFoto - 0.35, tDetalle));
  const xSensor = mez(540, 325, uFoto);
  const escSensor = mez(1.0, 0.78, uFoto);

  g.save();
  vista(g, Z, cx, cy);

  // Sol radiante encendido arriba en F4 bañando de fotones dorados el sensor
  if (uSol > 0.02) {
    g.save();
    g.globalAlpha = uSol;
    const xSol = mez(540, 325, uFoto);
    const ySol = 685;

    k.brillo(g, xSol, ySol, 340, "253, 224, 71", 0.85);
    g.fillStyle = "#fef08a";
    g.beginPath();
    g.arc(xSol, ySol, 62, 0, Math.PI * 2);
    g.fill();

    // Lluvia abundante de fotones dorados cayendo en todas las micro-celdas
    for (const f of FOTONES_SOL) {
      const fy = ((tr * f.vel + f.fase) % 1 + 1) % 1;
      const px = xSol + f.xOff * escSensor;
      const py = mez(ySol + 55, 1185, fy);
      g.fillStyle = `rgba(254, 240, 138, ${(1 - fy * 0.25) * 0.9})`;
      g.beginPath();
      g.arc(px, py, f.r, 0, Math.PI * 2);
      g.fill();
    }
    g.restore();
  }

  // Sensor CMOS subdividiéndose en 200 millones de píxeles diminutos
  g.save();
  g.translate(xSensor, 1205);
  g.scale(escSensor, escSensor);
  dibujarSensorCMOS(g, 0, 0, 470, 470, {
    divisiones: divActual,
    opacidadMalla: 0.95,
    luzCelda: 0.12 + uSol * 0.85,
    etiqueta: divActual >= 14 ? "200 M DE PÍXELES · 0.56 µm (DIMINUTOS)" : "SENSOR DEL CELULAR",
    t: tr,
  });
  g.restore();

  // Tarjeta derecha en F4: Foto diurna radiante y llena de detalle
  if (uFoto > 0.02) {
    g.save();
    g.globalAlpha = uFoto;
    const xF = 790;
    const yF = 1205;
    g.translate(xF, yF);
    g.scale(0.88 + 0.12 * uFoto, 0.88 + 0.12 * uFoto);

    redondo(g, -205, -245, 410, 490, 30);
    g.fillStyle = "#0e1b2e";
    g.fill();
    g.strokeStyle = "#22e39b";
    g.lineWidth = 4;
    g.stroke();

    dibujarFotoEscena(g, 0, -34, 356, 336, {
      modo: "dia-sol",
      t: tr,
    });

    g.textAlign = "center";
    g.textBaseline = "middle";
    g.font = "800 26px Figtree";
    g.fillStyle = "#6ee7b7";
    g.fillText("PLENO SOL: NITIDEZ TOTAL", 0, 184);
    g.restore();
  }

  g.restore();

  sinVista(g);
  const alP1 = entra(tramo(tr, tPixeles - 0.1, tDiminutos + 0.15)) * (1 - suave(tramo(tr, f4.inicio - 0.28, f4.inicio - 0.04)));
  pildoraEstado(g, 540, 1710, "MÁS MEGAPÍXELES EN SENSOR CHICO = PÍXELES DIMINUTOS", "56, 189, 248", alP1, 32);

  const alP2 = entra(tramo(tr, tLuz - 0.05, tFoto + 0.2));
  pildoraEstado(g, 540, 1710, "DE DÍA SOBRA LUZ → CADA PUNTITO FUNCIONA BIEN", "34, 227, 155", alP2, 34);

  vineta(g, 0.52);
  capaSuperiorMarca(g, 0.62);
}
