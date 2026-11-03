// Plano 02 (02-lugares.js) en estilo ATOM (14.80 a 26.72 s).
import * as k from "#kit";
import { v } from "#voz";
import { CIAN_RGB, CORAL_RGB, SOL_RGB, acabarAtom, esferaEsenciaAtom, fondoAtom, latidoRitmo, rotuloAtom } from "../mundo.js";

const f3 = v.frase(3), f4 = v.frase(4);
export const desde = () => f3.inicio;
export const entrada = "fundido";

const { suave, tramo, entra, pulso, mez, redondo } = k;

const Tdisena = f3.t("disena");
const Tdescubre = f3.t("descubre");

const Ttres = f4.t("tres");
const Theridas = f4.t("heridas");
const Tmomentos = f4.t("momentos");
const Tverdades = f4.t("verdades");
const Tdefiendes = f4.t("defiendes");

function mundoLugarAtom(g, x, y, tipo, al, t, activo) {
  if (al <= 0.01) return;
  g.save();
  g.globalAlpha *= al;
  g.translate(x, y);
  const esc = mez(0.84, 1.0, al) + 0.06 * activo;
  g.scale(esc, esc);

  const col = tipo === 1 ? "#FBBF24" : tipo === 2 ? "#38BDF8" : "#F43F5E";
  const rgb = tipo === 1 ? SOL_RGB : tipo === 2 ? CIAN_RGB : CORAL_RGB;

  k.brillo(g, 0, -25, 290, rgb, 0.78 * al);

  redondo(g, -145, -210, 290, 420, 28);
  g.fillStyle = "rgba(8,12,26,0.9)";
  g.fill();
  g.strokeStyle = col;
  g.lineWidth = 3.5;
  g.stroke();

  if (tipo === 1) {
    esferaEsenciaAtom(g, 0, -25, 76, t, 1, 1);
    g.fillStyle = col;
    g.font = "800 24px Figtree";
    g.textAlign = "center";
    g.fillText("LUGAR 01", 0, 128);
    g.fillStyle = "#FFFFFF";
    g.font = "800 32px Figtree";
    g.fillText("TUS HERIDAS", 0, 168);
  } else if (tipo === 2) {
    g.save();
    g.translate(0, -25);
    g.rotate(t * 0.7);
    for (let i = 0; i < 2; i++) {
      g.rotate(Math.PI / 4);
      redondo(g, -58, -58, 116, 116, 18);
      const pg = g.createLinearGradient(-58, -58, 58, 58);
      pg.addColorStop(0, "#E0F2FE");
      pg.addColorStop(0.5, "#38BDF8");
      pg.addColorStop(1, "#0284C7");
      g.fillStyle = pg;
      g.fill();
      g.strokeStyle = "#FFFFFF";
      g.lineWidth = 3;
      g.stroke();
    }
    g.restore();

    g.fillStyle = col;
    g.font = "800 24px Figtree";
    g.textAlign = "center";
    g.fillText("LUGAR 02", 0, 128);
    g.fillStyle = "#FFFFFF";
    g.font = "800 32px Figtree";
    g.fillText("MOMENTOS", 0, 168);
  } else {
    const eg = g.createLinearGradient(-68, -105, 68, 55);
    eg.addColorStop(0, "#FDA4AF");
    eg.addColorStop(0.5, "#F43F5E");
    eg.addColorStop(1, "#9F1239");
    g.fillStyle = eg;
    g.beginPath();
    g.moveTo(0, -108);
    g.lineTo(74, -72);
    g.lineTo(64, 6);
    g.quadraticCurveTo(0, 72, 0, 72);
    g.quadraticCurveTo(0, 72, -64, 6);
    g.lineTo(-74, -72);
    g.closePath();
    g.fill();
    g.strokeStyle = "#FFF1F2";
    g.lineWidth = 4;
    g.stroke();

    g.fillStyle = col;
    g.font = "800 24px Figtree";
    g.textAlign = "center";
    g.fillText("LUGAR 03", 0, 128);
    g.fillStyle = "#FFFFFF";
    g.font = "800 32px Figtree";
    g.fillText("TUS VERDADES", 0, 168);
  }

  g.restore();
}

export function dibuja(g, t) {
  const uFreno = tramo(t, 26.0, 26.5);
  const tFase = t < 26.0 ? t : 26.0 + 0.5 * (uFreno - 0.5 * uFreno * uFreno);
  const lat = latidoRitmo(tFase) * (1 - uFreno);

  fondoAtom(g, tFase, 0.75);
  k.rayos(g, tFase, 1450, 0.45, 7, SOL_RGB);

  const uTres = suave(tramo(t, Ttres - 0.25, Ttres + 0.35));

  if (uTres < 0.98) {
    g.save();
    g.globalAlpha = 1 - uTres;
    const uDescubre = suave(tramo(t, Tdescubre - 0.35, Tdescubre + 0.25));
    const sep = uDescubre * 310;

    g.save();
    g.globalAlpha *= 1 - 0.8 * uDescubre;
    g.strokeStyle = "#38BDF8";
    g.lineWidth = 3.5;
    g.setLineDash([16, 12]);
    redondo(g, 540 - 330 - sep, 850, 290, 460, 20);
    g.stroke();
    redondo(g, 540 + 40 + sep, 850, 290, 460, 20);
    g.stroke();
    g.setLineDash([]);
    g.restore();

    const rNuc = mez(105, 180, entra(tramo(t, f3.inicio, Tdescubre + 0.3)));
    esferaEsenciaAtom(g, 540, 1090, rNuc, tFase, 1, uDescubre);
    k.fogonazo(g, 540, 1090, t - Tdescubre, 760, SOL_RGB);

    rotuloAtom(
      g,
      540,
      635,
      "tu esencia",
      uDescubre > 0.3 ? "SE DESCUBRE" : "NO SE DISEÑA",
      uDescubre > 0.3 ? "#FBBF24" : "#38BDF8",
      1 - uTres,
      64
    );
    g.restore();
  }

  if (uTres > 0.01) {
    g.save();
    g.globalAlpha = uTres;

    const u1 = entra(tramo(t, Theridas - 0.25, Theridas + 0.3));
    const u2 = entra(tramo(t, Tmomentos - 0.25, Tmomentos + 0.3));
    const u3 = entra(tramo(t, Tverdades - 0.25, Tverdades + 0.3));

    g.strokeStyle = `rgba(${SOL_RGB},0.55)`;
    g.lineWidth = 5;
    g.beginPath();
    g.moveTo(205, 1140);
    g.lineTo(875, 1140);
    g.stroke();

    mundoLugarAtom(g, 205, 1140, 1, Math.max(0.25, u1), tFase, pulso(t, Theridas, 0.25));
    mundoLugarAtom(g, 540, 1140, 2, Math.max(0.15, u2), tFase, pulso(t, Tmomentos, 0.25));
    mundoLugarAtom(g, 875, 1140, 3, Math.max(0.15, u3), tFase, pulso(t, Tverdades, 0.25));

    k.fogonazo(g, 205, 1100, t - Theridas, 460, SOL_RGB);
    k.fogonazo(g, 540, 1100, t - Tmomentos, 460, CIAN_RGB);
    k.fogonazo(g, 875, 1100, t - Tverdades, 480, CORAL_RGB);

    const esc = 1 + 0.06 * pulso(t, Tdefiendes, 0.22) + 0.015 * lat;
    rotuloAtom(g, 540, 635, "se descubre en", "3 LUGARES REALES", "#FBBF24", uTres, 62 * esc);
    g.restore();
  }

  acabarAtom(g, 0.35);
}

export const momentosLugares = {
  disena: Tdisena,
  descubre: Tdescubre,
  tres: Ttres,
  heridas: Theridas,
  momentos: Tmomentos,
  verdades: Tverdades,
};
