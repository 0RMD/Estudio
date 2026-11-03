// Plano 02 (02-lugares.js): «Tu esencia no se diseña, se descubre en tres lugares» con paleta www.hectorhugo.mx (14.80 a 26.72 s).
// «Tu esencia no se diseña, se descubre,
//  y se descubre en tres lugares: las heridas que te formaron, los momentos que te transformaron y las verdades que hoy defiendes.»
import * as k from "#kit";
import { v } from "#voz";
import { HH, LAVANDA_RGB, ORO_RGB, ROJO_RGB, acabarCine, latidoRitmo, mesaEstudio, nucleoEsencia3D, rotuloHH } from "../mundo.js";

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

function pedestalLugar(g, x, y, tipo, al, t, activo) {
  if (al <= 0.01) return;
  g.save();
  g.globalAlpha *= al;
  g.translate(x, y);
  const esc = mez(0.86, 1.0, al) + 0.05 * activo;
  g.scale(esc, esc);

  // Halo de luz cálida bajo el pedestal
  k.luzCalida(g, 0, 0, 240, 0.78 * al, tipo === 2 ? LAVANDA_RGB : ORO_RGB);

  // Tarjeta / pedestal 3D en aubergine con borde champagne / violet-light / coral
  redondo(g, -145, -210, 290, 420, 26);
  const pg = g.createLinearGradient(0, -210, 0, 210);
  pg.addColorStop(0, "rgba(26, 15, 46, 0.94)");
  pg.addColorStop(1, "rgba(42, 27, 69, 0.94)");
  g.fillStyle = pg;
  g.fill();
  g.strokeStyle = tipo === 1 ? HH.coral : tipo === 2 ? HH.lavender : HH.champagne;
  g.lineWidth = 3.5;
  g.stroke();

  // Base elíptica 3D dentro del pedestal
  g.fillStyle = HH.aubergine;
  g.strokeStyle = "rgba(232, 181, 122, 0.42)";
  g.lineWidth = 2.5;
  g.beginPath();
  g.ellipse(0, 65, 96, 26, 0, 0, Math.PI * 2);
  g.fill();
  g.stroke();

  if (tipo === 1) {
    // LUGAR 1: LAS HERIDAS QUE TE FORMARON (Esfera aubergine reparada con oro champagne Kintsugi y coral)
    const sg = g.createRadialGradient(-24, -48, 8, 0, -25, 78);
    sg.addColorStop(0, HH.violetMid);
    sg.addColorStop(0.55, HH.aubergineSoft);
    sg.addColorStop(1, HH.aubergine);
    g.fillStyle = sg;
    g.beginPath();
    g.arc(0, -25, 76, 0, Math.PI * 2);
    g.fill();
    g.strokeStyle = "rgba(232, 181, 122, 0.55)";
    g.lineWidth = 3;
    g.stroke();

    // Costura de oro champagne brillante que une la herida
    g.save();
    g.strokeStyle = HH.champagne;
    g.lineWidth = 6;
    g.shadowColor = HH.champagne;
    g.shadowBlur = 22;
    g.beginPath();
    g.moveTo(-48, -78);
    g.lineTo(-8, -28);
    g.lineTo(18, -12);
    g.lineTo(-14, 34);
    g.lineTo(42, 48);
    g.stroke();
    k.brillo(g, 0, -20, 120, ORO_RGB, 0.85);
    g.restore();

    g.fillStyle = HH.coral;
    g.font = "800 24px Figtree";
    g.textAlign = "center";
    g.fillText("LUGAR 01", 0, 130);
    g.fillStyle = HH.cream;
    g.font = "800 32px Figtree";
    g.fillText("TUS HERIDAS", 0, 168);
  } else if (tipo === 2) {
    // LUGAR 2: LOS MOMENTOS QUE TE TRANSFORMARON (Prisma en violeta, lavanda y champagne)
    g.save();
    g.rotate(Math.sin(t * 1.8) * 0.06);
    const prg = g.createLinearGradient(-65, -95, 65, 45);
    prg.addColorStop(0, HH.lavenderSoft);
    prg.addColorStop(0.48, HH.violetLight);
    prg.addColorStop(1, HH.violet);
    g.fillStyle = prg;
    g.beginPath();
    g.moveTo(0, -108);
    g.lineTo(74, -22);
    g.lineTo(0, 62);
    g.lineTo(-74, -22);
    g.closePath();
    g.fill();
    g.strokeStyle = HH.champagneLight;
    g.lineWidth = 3.5;
    g.stroke();
    k.brillo(g, 0, -22, 135, LAVANDA_RGB, 0.9);
    g.restore();

    g.fillStyle = HH.lavender;
    g.font = "800 24px Figtree";
    g.textAlign = "center";
    g.fillText("LUGAR 02", 0, 130);
    g.fillStyle = HH.cream;
    g.font = "800 32px Figtree";
    g.fillText("MOMENTOS", 0, 168);
  } else {
    // LUGAR 3: LAS VERDADES QUE HOY DEFIENDES (Escudo en champagne y violeta real)
    const eg = g.createLinearGradient(-68, -105, 68, 55);
    eg.addColorStop(0, HH.champagneLight);
    eg.addColorStop(0.48, HH.champagne);
    eg.addColorStop(1, HH.champagneDark);
    g.fillStyle = eg;
    g.beginPath();
    g.moveTo(0, -105);
    g.lineTo(72, -72);
    g.lineTo(62, 4);
    g.quadraticCurveTo(0, 68, 0, 68);
    g.quadraticCurveTo(0, 68, -62, 4);
    g.lineTo(-72, -72);
    g.closePath();
    g.fill();
    g.strokeStyle = HH.creamSoft;
    g.lineWidth = 4;
    g.stroke();

    k.brillo(g, 0, -25, 130, ORO_RGB, 0.95);

    g.fillStyle = HH.champagne;
    g.font = "800 24px Figtree";
    g.textAlign = "center";
    g.fillText("LUGAR 03", 0, 130);
    g.fillStyle = HH.cream;
    g.font = "800 32px Figtree";
    g.fillText("TUS VERDADES", 0, 168);
  }

  g.restore();
}

export function dibuja(g, t) {
  const uFreno = tramo(t, 26.0, 26.5);
  const tFase = t < 26.0 ? t : 26.0 + 0.5 * (uFreno - 0.5 * uFreno * uFreno);
  const lat = latidoRitmo(tFase) * (1 - uFreno);

  mesaEstudio(g, tFase * 18, 0, 540, 1100, tFase);

  const uTres = suave(tramo(t, Ttres - 0.25, Ttres + 0.35));

  // ---------------- 1. «TU ESENCIA NO SE DISEÑA, SE DESCUBRE» (14.80 a 19.12 s)
  if (uTres < 0.98) {
    g.save();
    g.globalAlpha = 1 - uTres;

    const uDescubre = suave(tramo(t, Tdescubre - 0.35, Tdescubre + 0.25));

    const sep = uDescubre * 280;
    g.save();
    g.globalAlpha *= 1 - 0.75 * uDescubre;
    g.strokeStyle = "rgba(217, 199, 232, 0.55)";
    g.lineWidth = 3;
    g.setLineDash([16, 12]);
    redondo(g, 540 - 320 - sep, 860, 280, 440, 18);
    g.stroke();
    redondo(g, 540 + 40 + sep, 860, 280, 440, 18);
    g.stroke();
    g.setLineDash([]);
    g.restore();

    const rNuc = mez(95, 165, entra(tramo(t, f3.inicio, Tdescubre + 0.3)));
    nucleoEsencia3D(g, 540, 1090, rNuc, tFase, 1, uDescubre);
    k.fogonazo(g, 540, 1090, t - Tdescubre, 680, ORO_RGB);

    rotuloHH(
      g,
      540,
      640,
      "tu esencia",
      uDescubre > 0.3 ? "SE DESCUBRE" : "NO SE DISEÑA",
      1 - uTres,
      64
    );
    g.restore();
  }

  // ---------------- 2. LOS TRES LUGARES EN 3D (18.80 a 26.72 s)
  if (uTres > 0.01) {
    g.save();
    g.globalAlpha = uTres;

    const u1 = entra(tramo(t, Theridas - 0.25, Theridas + 0.3));
    const u2 = entra(tramo(t, Tmomentos - 0.25, Tmomentos + 0.3));
    const u3 = entra(tramo(t, Tverdades - 0.25, Tverdades + 0.3));

    g.strokeStyle = `rgba(${ORO_RGB},0.48)`;
    g.lineWidth = 4;
    g.beginPath();
    g.moveTo(210, 1140);
    g.lineTo(870, 1140);
    g.stroke();

    pedestalLugar(g, 205, 1140, 1, Math.max(0.25, u1), tFase, pulso(t, Theridas, 0.25));
    pedestalLugar(g, 540, 1140, 2, Math.max(0.15, u2), tFase, pulso(t, Tmomentos, 0.25));
    pedestalLugar(g, 875, 1140, 3, Math.max(0.15, u3), tFase, pulso(t, Tverdades, 0.25));

    k.fogonazo(g, 205, 1100, t - Theridas, 420, ROJO_RGB);
    k.fogonazo(g, 540, 1100, t - Tmomentos, 420, LAVANDA_RGB);
    k.fogonazo(g, 875, 1100, t - Tverdades, 460, ORO_RGB);

    const esc = 1 + 0.06 * pulso(t, Tdefiendes, 0.22) + 0.015 * lat;
    rotuloHH(g, 540, 640, "se descubre en", "3 LUGARES REALES", uTres, 62 * esc);
    g.restore();
  }

  acabarCine(g, t, 0.35);
}

export const momentosLugares = {
  disena: Tdisena,
  descubre: Tdescubre,
  tres: Ttres,
  heridas: Theridas,
  momentos: Tmomentos,
  verdades: Tverdades,
};
