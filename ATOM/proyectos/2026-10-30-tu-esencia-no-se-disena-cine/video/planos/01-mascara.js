// Plano 01 (01-mascara.js): La máscara fotorrealista de «otra mujer» con la paleta de www.hectorhugo.mx (0.00 a 14.80 s).
// «Si estudiaste PNL y ya te pagan por lo que sabes, seguro sientes que para mostrarte tienes que ser otra mujer,
//  más segura, más preparada, con un nombre bonito para lo que haces, y por eso mismo no te la crees ni tú.»
import * as k from "#kit";
import { v } from "#voz";
import { HH, ORO_RGB, ROJO_RGB, acabarCine, latidoRitmo, mascaraPorcelana3D, mesaEstudio, nucleoEsencia3D, rotuloHH } from "../mundo.js";

export const desde = 0;

const { suave, tramo, entra, pulso, mez, redondo } = k;

const f1 = v.frase(1), f2 = v.frase(2);
const Tpnl = f1.t("pnl");
const Tpagan = f1.t("pagan");
const Tmostrarte = f1.t("mostrarte");
const Totra = f1.t("otra");

const Tsegura = f2.t("segura");
const Tpreparada = f2.t("preparada");
const Tbonito = f2.t("bonito");
const Tno = f2.t("no");
const Tcrees = f2.t("crees");

function diplomaPNL(g, x, y, esc, al) {
  if (al <= 0.01) return;
  g.save();
  g.globalAlpha *= al;
  g.translate(x, y);
  g.scale(esc, esc);
  g.rotate(-0.08);

  g.fillStyle = "rgba(15, 8, 28, 0.65)";
  redondo(g, -185, -115, 380, 240, 16);
  g.fill();

  const pg = g.createLinearGradient(-180, -110, 180, 110);
  pg.addColorStop(0, HH.creamSoft);
  pg.addColorStop(1, HH.creamDeep);
  g.fillStyle = pg;
  redondo(g, -180, -115, 360, 230, 14);
  g.fill();
  g.strokeStyle = HH.champagne;
  g.lineWidth = 4;
  g.stroke();

  g.fillStyle = HH.aubergine;
  g.font = "800 32px Figtree";
  g.textAlign = "center";
  g.fillText("CERTIFICACIÓN PNL", 0, -42);

  g.fillStyle = "rgba(74, 63, 94, 0.45)";
  redondo(g, -120, -12, 240, 10, 4);
  g.fill();
  redondo(g, -95, 12, 190, 10, 4);
  g.fill();

  // Sello lacrado en violeta/coral con borde champagne
  g.fillStyle = HH.violet;
  g.beginPath();
  g.arc(105, 52, 34, 0, Math.PI * 2);
  g.fill();
  g.strokeStyle = HH.champagne;
  g.lineWidth = 3.5;
  g.stroke();

  g.restore();
}

function tarjetaPago(g, x, y, esc, al) {
  if (al <= 0.01) return;
  g.save();
  g.globalAlpha *= al;
  g.translate(x, y);
  g.scale(esc, esc);
  g.rotate(0.07);

  g.fillStyle = "rgba(26, 15, 46, 0.94)";
  redondo(g, -165, -62, 330, 124, 22);
  g.fill();
  g.strokeStyle = HH.champagne;
  g.lineWidth = 3;
  g.stroke();

  g.fillStyle = HH.champagne;
  g.font = "800 26px Figtree";
  g.textAlign = "center";
  g.fillText("SESIÓN COBRADA · PNL", 0, -12);
  g.fillStyle = HH.cream;
  g.font = "800 36px Figtree";
  g.fillText("+ PAGO RECIBIDO ✓", 0, 34);

  g.restore();
}

function etiquetaMolde(g, x, y, texto, sub, al, grieta) {
  if (al <= 0.01) return;
  g.save();
  g.globalAlpha *= al;
  g.translate(x, y);

  redondo(g, -185, -46, 370, 92, 20);
  g.fillStyle = "rgba(26, 15, 46, 0.92)";
  g.fill();
  g.strokeStyle = grieta > 0.2 ? HH.coral : HH.champagne;
  g.lineWidth = 3;
  g.stroke();

  g.textAlign = "center";
  g.fillStyle = HH.lavender;
  g.font = "700 21px Figtree";
  g.fillText(sub.toUpperCase(), 0, -10);
  g.fillStyle = grieta > 0.2 ? HH.coral : HH.cream;
  g.font = "800 30px Figtree";
  g.fillText(texto, 0, 26);

  g.restore();
}

export function dibuja(g, t) {
  const uFreno = tramo(t, 14.15, 14.6);
  const tFase = t < 14.15 ? t : 14.15 + 0.45 * (uFreno - 0.5 * uFreno * uFreno);
  const lat = latidoRitmo(tFase) * (1 - uFreno);

  mesaEstudio(g, 0, 0, 540, 1120, tFase);

  // Acercamiento 3D de cámara hacia la máscara a medida que se construye el personaje
  const zoomCam = mez(0.96, 1.12, suave(tramo(t, 0, Tcrees + 0.2))) + 0.01 * lat;
  g.save();
  g.translate(540, 1120);
  g.scale(zoomCam, zoomCam);
  g.translate(-540, -1120);

  // 1) El núcleo cálido original + Diploma PNL y pago recibido desde el fotograma 0
  const uMascara = suave(tramo(t, Tmostrarte - 0.25, Totra + 0.25));
  const alCredenciales = 1 - 0.72 * uMascara;

  nucleoEsencia3D(g, 540, 1080, 125, tFase, 1 - 0.55 * uMascara, 0);

  const escDip = mez(0.88, 1.04, entra(tramo(t, 0, Tpnl + 0.3))) + 0.05 * pulso(t, Tpnl, 0.2);
  diplomaPNL(g, 330 - uMascara * 120, 880 - uMascara * 80, escDip, alCredenciales);

  const uPago = entra(tramo(t, Tpnl + 0.2, Tpagan + 0.25));
  if (uPago > 0.01) {
    tarjetaPago(g, 745 + uMascara * 110, 920 - uMascara * 70, mez(0.8, 1.02, uPago), uPago * alCredenciales);
  }

  // 2) La máscara fotorrealista 3D de porcelana («OTRA MUJER») baja y se parte en dos al final
  if (uMascara > 0.01) {
    const yMascara = mez(720, 1080, entra(tramo(t, Tmostrarte - 0.25, Totra + 0.2)));
    const uRayosX = suave(tramo(t, Tno - 0.2, Tcrees + 0.15));
    const uGrieta = entra(tramo(t, Tcrees - 0.12, Tcrees + 0.32));

    mascaraPorcelana3D(g, 540, yMascara, 1.08, tFase, uGrieta, uRayosX);
    k.fogonazo(g, 540, 1080, t - Tcrees, 680, ORO_RGB);

    // Las 3 etiquetas del molde que se van clavando en la frase 2
    const uSegura = entra(tramo(t, Tsegura - 0.18, Tsegura + 0.25));
    const uPrep = entra(tramo(t, Tpreparada - 0.18, Tpreparada + 0.25));
    const uBonito = entra(tramo(t, Tbonito - 0.22, Tbonito + 0.25));

    etiquetaMolde(g, 240, 910, "MÁS SEGURA", "requisito 01", uSegura, uGrieta);
    etiquetaMolde(g, 840, 910, "MÁS PREPARADA", "requisito 02", uPrep, uGrieta);
    etiquetaMolde(g, 540, 1405, "«NOMBRE BONITO»", "etiqueta diseñada", uBonito, uGrieta);
  }

  g.restore();

  // Rótulo superior estilo www.hectorhugo.mx
  const uNoCrees = suave(tramo(t, Tno - 0.15, Tcrees + 0.1));
  if (uNoCrees > 0.05) {
    const esc = 1 + 0.08 * pulso(t, Tcrees, 0.2);
    rotuloHH(g, 540, 635, "personaje diseñado", "0% CREÍBLE", uNoCrees, 64 * esc);
  } else if (uMascara > 0.1) {
    rotuloHH(g, 540, 635, "para mostrarte", "OTRA MUJER", uMascara, 62);
  } else {
    rotuloHH(g, 540, 635, "sabes PNL y te pagan", "TU CONOCIMIENTO", 1, 56);
  }

  acabarCine(g, t, 0.35);
}

export const momentosMascara = {
  pnl: Tpnl,
  pagan: Tpagan,
  entraMascara: Totra,
  segura: Tsegura,
  preparada: Tpreparada,
  bonito: Tbonito,
  grieta: Tcrees,
};
