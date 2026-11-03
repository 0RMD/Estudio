// Plano 05 (05-cta.js): Invitación final y botón de acción con la paleta de www.hectorhugo.mx (52.40 a 64.00 s).
// «Si quieres descubrir desde dónde conectas de verdad en vez de seguir diseñando una versión de ti,
//  toca el botón de abajo y aparta tu lugar, es en vivo y los cupos son limitados.»
import * as k from "#kit";
import { v } from "#voz";
import { HH, LAVANDA_RGB, ORO_RGB, acabarCine, latidoRitmo, mesaEstudio, nucleoEsencia3D, rotuloHH } from "../mundo.js";

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

  mesaEstudio(g, 0, tFase * 10, 540, 1080, tFase);

  const uBoton = suave(tramo(t, f11.inicio - 0.1, Tboton + 0.25));

  const yNucleo = mez(1080, 910, uBoton);
  const rNucleo = mez(155, 118, uBoton);

  g.save();
  g.globalCompositeOperation = "lighter";
  for (let i = 0; i < 8; i++) {
    const ang = (i / 8) * Math.PI * 2 + tFase * 0.25;
    const rx = 540 + Math.cos(ang) * 290;
    const ry = yNucleo + Math.sin(ang) * 155;
    g.strokeStyle = i % 2 === 0 ? `rgba(${ORO_RGB},0.46)` : `rgba(${LAVANDA_RGB},0.40)`;
    g.lineWidth = 3.5;
    g.beginPath();
    g.moveTo(540, yNucleo);
    g.lineTo(rx, ry);
    g.stroke();
    k.brillo(g, rx, ry, 58, i % 2 === 0 ? ORO_RGB : LAVANDA_RGB, 0.78);
  }
  g.restore();

  nucleoEsencia3D(g, 540, yNucleo, rNucleo, tFase, 1, 1);
  k.fogonazo(g, 540, yNucleo, t - Tverdad, 680, ORO_RGB);

  // ---------------- BOTÓN 3D ESTILO .btn-accent DE WWW.HECTORHUGO.MX (--champagne #E8B57A + texto --aubergine #1A0F2E)
  if (uBoton > 0.01) {
    const pClick = pulso(t, Tboton, 0.18) + pulso(t, Tlugar, 0.2);
    const escBtn = mez(0.86, 1.0, entra(uBoton)) + 0.06 * pClick + 0.012 * lat;

    g.save();
    g.globalAlpha = uBoton;
    g.translate(540, 1255);
    g.scale(escBtn, escBtn);

    // Sombra editorial bajo el botón (box-shadow rgba(201, 147, 85, 0.5))
    g.fillStyle = "rgba(15, 8, 28, 0.75)";
    redondo(g, -340, -72, 680, 166, 76);
    g.fill();

    // Cuerpo 3D del botón en Champagne de www.hectorhugo.mx (#F0CDA0 -> #E8B57A -> #C99355)
    const bg = g.createLinearGradient(0, -76, 0, 76);
    bg.addColorStop(0, HH.champagneLight);
    bg.addColorStop(0.52, HH.champagne);
    bg.addColorStop(1, HH.champagneDark);
    g.fillStyle = bg;
    redondo(g, -335, -76, 670, 152, 76);
    g.fill();
    g.strokeStyle = HH.creamSoft;
    g.lineWidth = 3.5;
    g.stroke();

    // Texto principal en --aubergine (#1A0F2E), idéntico a .hh-root .btn-accent
    g.fillStyle = HH.aubergine;
    g.font = "800 41px Figtree";
    g.textAlign = "center";
    g.fillText("APARTA TU LUGAR AQUÍ →", 0, -4);

    g.fillStyle = "#2A1B45";
    g.font = "700 25px Figtree";
    g.fillText("● INMERSIÓN 2 DÍAS EN VIVO · CUPOS LIMITADOS", 0, 40);

    // Flecha luminosa en champagne/lavanda indicando «toca el botón de abajo»
    const dyFlecha = Math.sin(tFase * 6) * 10 * (1 - uFreno);
    g.strokeStyle = HH.champagneLight;
    g.lineWidth = 6;
    g.lineCap = "round";
    g.lineJoin = "round";
    g.beginPath();
    g.moveTo(0, 102 + dyFlecha);
    g.lineTo(0, 152 + dyFlecha);
    g.lineTo(-22, 130 + dyFlecha);
    g.moveTo(0, 152 + dyFlecha);
    g.lineTo(22, 130 + dyFlecha);
    g.stroke();

    g.restore();

    k.fogonazo(g, 540, 1255, t - Tlugar, 640, ORO_RGB);
  }

  const textoSup = uBoton > 0.25 ? "TOCA EL BOTÓN DE ABAJO" : "CONECTA DE VERDAD";
  const esc = 1 + 0.06 * pulso(t, Tlimitados, 0.22);
  rotuloHH(g, 540, 625, "inmersión en vivo", textoSup, 1, 58 * esc);

  acabarCine(g, t, 0.4);
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
