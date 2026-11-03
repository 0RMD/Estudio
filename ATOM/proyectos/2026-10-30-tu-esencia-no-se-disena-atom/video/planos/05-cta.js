// Plano 05 (05-cta.js) en estilo ATOM (52.40 a 64.00 s).
import * as k from "#kit";
import { v } from "#voz";
import { CORAL_RGB, SOL_RGB, acabarAtom, esferaEsenciaAtom, fondoAtom, latidoRitmo, rotuloAtom } from "../mundo.js";

const f10 = v.frase(10), f11 = v.frase(11);
export const desde = () => f10.inicio;
export const entrada = "fundido";

const { suave, tramo, entra, pulso, mez, redondo } = k;

const Tdescubrir = f10.t("descubrir");
const Tverdad = f10.t("verdad");
const Tdisenando = f10.t("disenando");

const Ttoca = f11.t("toca");
const Tboton = f11.t("boton");
const Tlugar = f11.t("lugar");
const Tvivo = f11.t("vivo");
const Tlimitados = f11.t("limitados");

export function dibuja(g, t) {
  const uFreno = tramo(t, 62.6, 63.3);
  const tFase = t < 62.6 ? t : 62.6 + 0.7 * (uFreno - 0.5 * uFreno * uFreno);
  const lat = latidoRitmo(tFase) * (1 - uFreno);

  fondoAtom(g, tFase, 0.9);
  k.rayos(g, tFase, 1400, 0.45, 7, SOL_RGB);

  const uBoton = suave(tramo(t, f11.inicio - 0.1, Tboton + 0.25));
  const yNucleo = mez(1080, 905, uBoton);
  const rNucleo = mez(162, 122, uBoton);

  g.save();
  g.globalCompositeOperation = "lighter";
  for (let i = 0; i < 8; i++) {
    const ang = (i / 8) * Math.PI * 2 + tFase * 0.28;
    const rx = 540 + Math.cos(ang) * 295;
    const ry = yNucleo + Math.sin(ang) * 160;
    g.strokeStyle = `rgba(${SOL_RGB},0.48)`;
    g.lineWidth = 4;
    g.beginPath();
    g.moveTo(540, yNucleo);
    g.lineTo(rx, ry);
    g.stroke();
    k.brillo(g, rx, ry, 65, SOL_RGB, 0.85);
  }
  g.restore();

  esferaEsenciaAtom(g, 540, yNucleo, rNucleo, tFase, 1, 1);
  k.fogonazo(g, 540, yNucleo, t - Tverdad, 740, SOL_RGB);

  if (uBoton > 0.01) {
    const pClick = pulso(t, Tboton, 0.18) + pulso(t, Tlugar, 0.2);
    const escBtn = mez(0.86, 1.0, entra(uBoton)) + 0.06 * pClick + 0.012 * lat;

    g.save();
    g.globalAlpha = uBoton;
    g.translate(540, 1255);
    g.scale(escBtn, escBtn);

    k.brillo(g, 0, 0, 520, CORAL_RGB, 0.65);

    const bg = g.createLinearGradient(-330, -76, 330, 76);
    bg.addColorStop(0, "#F43F5E");
    bg.addColorStop(0.5, "#E11D48");
    bg.addColorStop(1, "#FB923C");
    g.fillStyle = bg;
    redondo(g, -335, -76, 670, 154, 46);
    g.fill();
    g.strokeStyle = "#FDE68A";
    g.lineWidth = 4.5;
    g.stroke();

    g.fillStyle = "#FFFFFF";
    g.font = "800 42px Figtree";
    g.textAlign = "center";
    g.fillText("APARTA TU LUGAR AQUÍ", 0, -4);

    g.fillStyle = "#FEF3C7";
    g.font = "700 26px Figtree";
    g.fillText("● INMERSIÓN 2 DÍAS EN VIVO · CUPOS LIMITADOS", 0, 42);

    const dyFlecha = Math.sin(tFase * 6) * 10 * (1 - uFreno);
    g.strokeStyle = "#FBBF24";
    g.lineWidth = 6.5;
    g.lineCap = "round";
    g.lineJoin = "round";
    g.beginPath();
    g.moveTo(0, 102 + dyFlecha);
    g.lineTo(0, 154 + dyFlecha);
    g.lineTo(-24, 130 + dyFlecha);
    g.moveTo(0, 154 + dyFlecha);
    g.lineTo(24, 130 + dyFlecha);
    g.stroke();

    g.restore();

    k.fogonazo(g, 540, 1255, t - Tlugar, 700, CORAL_RGB);
  }

  const textoSup = uBoton > 0.25 ? "TOCA EL BOTÓN DE ABAJO" : "CONECTA DE VERDAD";
  const esc = 1 + 0.06 * pulso(t, Tlimitados, 0.22);
  rotuloAtom(g, 540, 625, "inmersión en vivo", textoSup, "#FBBF24", 1, 58 * esc);

  acabarAtom(g, 0.35);
}

export const momentosCta = {
  descubrir: Tdescubrir,
  verdad: Tverdad,
  disenando: Tdisenando,
  toca: Ttoca,
  boton: Tboton,
  lugar: Tlugar,
  vivo: Tvivo,
  limitados: Tlimitados,
};
