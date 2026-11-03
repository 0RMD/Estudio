// Plano 05 (Frase 6):
// «La imagen queda ahí hasta que tomas fotos o videos nuevos que escriben encima.»
// Cámara oscura azul medianoche sobre la bandeja física del chip:
// La foto vieja («ESPACIO LIBRE») aguarda luminosa en el fondo; en «fotos» y «videos nuevos que escriben encima»
// tres bloques pesados de archivos nuevos caen desde arriba y aplastan/sobrescriben sus píxeles de verdad.
import * as k from "#kit";
import { v } from "#voz";
import {
  camino2D,
  capaSuperiorMarca,
  dibujarFotoRecuerdo,
  pildoraEstado,
  redondo,
  relojPlano,
  sinVista,
  vista,
  vineta,
} from "../mundo.js";

export const desde = (v) => v.frase(6).inicio - 0.04;

const { suave, tramo, entra, mez } = k;

export function dibuja(g, t) {
  const f6 = v.frase(6);
  const t0 = f6.inicio - 0.04;
  const tCorte = v.frase(7).inicio - 0.04;
  const tr = relojPlano(t, tCorte, 0.16, 0.24);

  const tFotos = f6.t("fotos");
  const tVideos = f6.t("videos");
  const tEscriben = f6.t("escriben");
  const tEncima = f6.t("encima");

  // Fondo nocturno profundo de cámara de memoria
  g.save();
  sinVista(g);
  const bg = g.createLinearGradient(0, 0, 0, 1920);
  bg.addColorStop(0, "#050914");
  bg.addColorStop(0.55, "#0d1a30");
  bg.addColorStop(1, "#070f1d");
  g.fillStyle = bg;
  g.fillRect(0, 0, 1080, 1920);
  k.brillo(g, 540, 1180, 880, "56, 189, 248", 0.22);
  g.restore();

  const cam = camino2D([
    [t0, [1.08, 540, 1170]],
    [tFotos, [1.03, 540, 1130]],
    [tEncima + 0.2, [1.06, 540, 1150]],
    [tCorte - 0.18, [1.06, 540, 1150]],
  ]);
  const [Z, cx, cy] = cam(tr);

  // Tres bloques nuevos cayendo en cascada sobre los 3 tercios de la foto antigua
  const uB1 = entra(tramo(tr, tFotos - 0.1, tFotos + 0.26));
  const uB2 = entra(tramo(tr, tVideos - 0.1, tVideos + 0.26));
  const uB3 = entra(tramo(tr, tEscriben - 0.06, tEncima + 0.16));
  const cubierto = (uB1 + uB2 + uB3) / 3;

  g.save();
  vista(g, Z, cx, cy);

  // Bandeja del sector de memoria 0x4F2A
  const bx = 110;
  const by = 780;
  const bw = 860;
  const bh = 680;

  redondo(g, bx, by, bw, bh, 38);
  g.fillStyle = "#0a1322";
  g.fill();
  g.strokeStyle = cubierto > 0.85 ? "#38bdf8" : "#22e39b";
  g.lineWidth = 4;
  g.stroke();

  g.textAlign = "center";
  g.textBaseline = "middle";
  g.font = "800 27px Figtree";
  g.fillStyle = cubierto > 0.85 ? "#7dd3fc" : "#6ee7b7";
  g.fillText(
    cubierto > 0.85 ? "SECTOR 0x4F2A · SOBRESCRITO CON DATOS NUEVOS" : "SECTOR 0x4F2A · MARCADO LIBRE (FOTO AÚN AHÍ)",
    540,
    by + 58
  );

  // Foto antigua al fondo esperando ser pisada
  const fW = 740;
  const fH = 470;
  const fY = by + 365;
  dibujarFotoRecuerdo(g, 540, fY, fW, fH, {
    marco: false,
    rejilla: 0.7,
    t: tr,
  });

  // Los 3 nuevos archivos cayendo verticalmente como losas sólidas que pisan cada tercio de la foto vieja
  const bloques = [
    { u: uB1, variante: "ciudad", titulo: "FOTO NUEVA 1", col: "#38bdf8" },
    { u: uB2, variante: "ciudad", titulo: "FOTO NUEVA 2", col: "#34d399" },
    { u: uB3, variante: "video", titulo: "VIDEO 4K NUEVO", col: "#c084fc" },
  ];

  const colW = (fW - 24) / 3;
  bloques.forEach((b, idx) => {
    if (b.u <= 0.01) return;
    const cxB = 540 - fW / 2 + colW / 2 + idx * (colW + 12);
    const cyB = mez(fY - 560, fY, b.u);

    g.save();
    g.globalAlpha = Math.min(1, b.u * 1.25);
    g.shadowColor = "rgba(0, 0, 0, 0.65)";
    g.shadowBlur = 30;
    g.shadowOffsetY = 14;
    redondo(g, cxB - colW / 2, cyB - fH / 2, colW, fH, 22);
    g.fillStyle = "#111c2f";
    g.fill();
    g.shadowBlur = 0;
    g.shadowOffsetY = 0;

    dibujarFotoRecuerdo(g, cxB, cyB - 24, colW - 20, fH - 96, {
      marco: false,
      variante: b.variante,
      t: tr,
    });

    redondo(g, cxB - colW / 2, cyB - fH / 2, colW, fH, 22);
    g.strokeStyle = b.col;
    g.lineWidth = 4;
    g.stroke();

    g.textAlign = "center";
    g.font = "800 21px Figtree";
    g.fillStyle = "#ffffff";
    g.fillText(b.titulo, cxB, cyB + fH / 2 - 34);
    g.restore();

    // Onda luminosa al impactar y sobrescribir el sector
    if (b.u > 0.85 && b.u < 0.999) {
      k.brillo(g, cxB, fY, 220, "56, 189, 248", (1 - b.u) * 3.5);
    }
  });

  g.restore();

  sinVista(g);
  const alPil = entra(tramo(tr, tEscriben - 0.1, tEncima + 0.2));
  pildoraEstado(g, 540, 1705, "SOLO SE BORRA CUANDO ALGO NUEVO ESCRIBE ENCIMA", "56, 189, 248", alPil, 34);

  vineta(g, 0.54);
  capaSuperiorMarca(g, 0.62);
}
