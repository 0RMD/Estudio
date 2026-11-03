// Plano 02 (Frase 2):
// «Desaparece de tu galería al instante, pero sus píxeles siguen guardados abajo.»
// Mesa técnica clara ("fria") de alto contraste tras el plano oscuro:
// Dos estratos físicos separados en altura: arriba la capa cristalina de la Galería queda vacía ("0 FOTOS"),
// mientras abajo la placa de memoria NAND mantiene todos los bloques de píxeles RGB de la foto latiendo intactos.
import * as k from "#kit";
import { v } from "#voz";
import {
  camino2D,
  capaSuperiorMarca,
  dibujarFotoRecuerdo,
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

  const tGaleria = f2.t("galería");
  const tInstante = f2.t("instante");
  const tPero = f2.t("pero");
  const tPixeles = f2.t("píxeles");
  const tAbajo = f2.t("abajo");

  fondoMesaClara(g, tr, "fria");

  const cam = camino2D([
    [t0, [1.02, 540, 990]],
    [tPero, [1.04, 540, 1080]],
    [tAbajo + 0.15, [1.1, 540, 1190]],
    [tCorte - 0.18, [1.1, 540, 1190]],
  ]);
  const [Z, cx, cy] = cam(tr);

  const slideY = (1 - entra(tramo(tr, t0, t0 + 0.22))) * 34;
  const uDesaparece = suave(tramo(tr, t0 + 0.12, tInstante + 0.08));
  const uRevelaAbajo = suave(tramo(tr, tPero - 0.1, tPixeles + 0.28));

  g.save();
  vista(g, Z, cx, cy);
  g.translate(0, slideY);

  // ---------------- ESTRATO SUPERIOR: CAPA DE GALERÍA VISIBLE ----------------
  const cX = 115;
  const topY = 610;
  const cW = 850;
  const topH = 400;

  g.save();
  g.shadowColor = "rgba(15, 23, 42, 0.22)";
  g.shadowBlur = 36;
  g.shadowOffsetY = 16;
  redondo(g, cX, topY, cW, topH, 34);
  g.fillStyle = "rgba(255, 255, 255, 0.9)";
  g.fill();
  g.shadowBlur = 0;
  g.shadowOffsetY = 0;
  g.strokeStyle = "#94a3b8";
  g.lineWidth = 3.5;
  g.stroke();

  // Encabezado estrato superior
  redondo(g, cX + 34, topY + 28, 340, 48, 14);
  g.fillStyle = "#e2e8f0";
  g.fill();
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.font = "800 23px Figtree";
  g.fillStyle = "#1e293b";
  g.fillText("CAPA 1 · TU GALERÍA", cX + 204, topY + 52);

  // Miniatura desvaneciéndose al instante
  if (uDesaparece < 0.98) {
    g.save();
    g.globalAlpha = 1 - uDesaparece;
    const sc = 1 - uDesaparece * 0.22;
    g.translate(540, topY + 228);
    g.scale(sc, sc);
    dibujarFotoRecuerdo(g, 0, 0, 340, 220, { marco: true, t: tr });
    g.restore();
  }

  // Marco punteado de «Sin fotos visibles»
  if (uDesaparece > 0.35) {
    g.save();
    g.globalAlpha = (uDesaparece - 0.35) / 0.65;
    redondo(g, 330, topY + 118, 420, 224, 24);
    g.strokeStyle = "#64748b";
    g.setLineDash([12, 10]);
    g.lineWidth = 3.5;
    g.stroke();
    g.setLineDash([]);

    g.fillStyle = "#334155";
    g.font = "800 34px Figtree";
    g.fillText("0 FOTOS VISIBLES", 540, topY + 214);
    g.font = "700 24px Figtree";
    g.fillStyle = "#64748b";
    g.fillText("Oculta de la pantalla al instante", 540, topY + 258);
    g.restore();
  }
  g.restore();

  // Conectores verticales punteados entre la pantalla arriba y el chip abajo
  g.save();
  g.strokeStyle = "rgba(15, 23, 42, 0.35)";
  g.lineWidth = 4;
  g.setLineDash([10, 10]);
  for (const px of [310, 540, 770]) {
    g.beginPath();
    g.moveTo(px, topY + topH + 8);
    g.lineTo(px, 1095);
    g.stroke();
  }
  g.setLineDash([]);
  g.restore();

  // ---------------- ESTRATO INFERIOR: MEMORIA FÍSICA CON PÍXELES GUARDADOS ----------------
  const botY = 1095;
  const botH = 515;

  g.save();
  g.shadowColor = "rgba(15, 23, 42, 0.34)";
  g.shadowBlur = 44;
  g.shadowOffsetY = 20;
  redondo(g, cX, botY, cW, botH, 36);
  g.fillStyle = "#091522";
  g.fill();
  g.shadowBlur = 0;
  g.shadowOffsetY = 0;

  redondo(g, cX, botY, cW, botH, 36);
  g.strokeStyle = mez(0, 1, uRevelaAbajo) > 0.3 ? "#22e39b" : "#334155";
  g.lineWidth = 4.5;
  g.stroke();

  redondo(g, cX + 34, botY + 28, 410, 50, 14);
  g.fillStyle = "rgba(34, 227, 155, 0.16)";
  g.fill();
  g.strokeStyle = "#22e39b";
  g.lineWidth = 2;
  g.stroke();

  g.textAlign = "center";
  g.textBaseline = "middle";
  g.font = "800 23px Figtree";
  g.fillStyle = "#6ee7b7";
  g.fillText("CAPA 2 · CHIP DE MEMORIA ABAJO", cX + 239, botY + 53);

  // Halo verde sobre los píxeles vivos cuando la voz dice «pero sus píxeles siguen guardados abajo»
  k.brillo(g, 540, botY + 290, 520, "34, 227, 155", 0.25 + uRevelaAbajo * 0.45);

  const escPix = 0.94 + 0.08 * uRevelaAbajo;
  g.save();
  g.translate(540, botY + 285);
  g.scale(escPix, escPix);
  dibujarFotoRecuerdo(g, 0, 0, 480, 300, {
    marco: false,
    rejilla: 0.45 + 0.55 * uRevelaAbajo,
    etiqueta: "4,032 × 3,024 PÍXELES INTACTOS",
    t: tr,
  });
  g.restore();

  // Destellos individuales recorriendo los bloques de píxeles
  if (uRevelaAbajo > 0.1) {
    const pasoX = Math.floor((tr * 6) % 8);
    const pasoY = Math.floor((tr * 3.5) % 5);
    const bx = 540 - 240 + pasoX * 60 + 30;
    const by = botY + 285 - 150 + pasoY * 60 + 30;
    k.brillo(g, bx, by, 78, "250, 204, 21", uRevelaAbajo * 0.85);
  }

  g.restore();
  g.restore();

  sinVista(g);
  const alPil = entra(tramo(tr, tPixeles - 0.08, tPixeles + 0.22));
  pildoraEstado(g, 540, 1720, "ARRIBA NO SE VE · ABAJO SIGUE GUARDADA", "34, 227, 155", alPil, 36, true);

  vineta(g, 0.32);
  capaSuperiorMarca(g, 0.68);
}
