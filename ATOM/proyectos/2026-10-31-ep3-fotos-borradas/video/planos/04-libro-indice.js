// Plano 04 (Frase 5):
// «Es como arrancar un renglón del índice de un libro, dejando la página con la foto intacta.»
// Analogía física cotidiana sobre mesa cálida luminosa ("calida"):
// Un libro de tapa dura abierto de par en par. En la página izquierda ("ÍNDICE") se arranca la tira de papel
// del renglón "Pág. 24 · Foto playa", y la cámara se desplaza a la página derecha ("PÁGINA 24") donde la foto
// sigue impresa a todo color e intacta.
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

export const desde = (v) => v.frase(5).inicio - 0.04;

const { suave, tramo, entra, mez } = k;

export function dibuja(g, t) {
  const f5 = v.frase(5);
  const t0 = f5.inicio - 0.04;
  const tCorte = v.frase(6).inicio - 0.04;
  const tr = relojPlano(t, tCorte, 0.16, 0.24);

  const tArrancar = f5.t("arrancar");
  const tIndice = f5.t("índice");
  const tDejando = f5.t("dejando");
  const tFoto = f5.t("foto");
  const tIntacta = f5.t("intacta");

  fondoMesaClara(g, tr, "calida");

  // Cámara encuadra primero la página izquierda del ÍNDICE y luego viaja a la derecha con la FOTO INTACTA
  const cam = camino2D([
    [t0, [1.14, 370, 1145]],
    [tIndice + 0.1, [1.14, 390, 1145]],
    [tFoto, [1.12, 685, 1145]],
    [tCorte - 0.18, [1.04, 540, 1145]],
  ]);
  const [Z, cx, cy] = cam(tr);

  const slideY = (1 - entra(tramo(tr, t0, t0 + 0.22))) * 34;
  const uArranca = suave(tramo(tr, tArrancar - 0.05, tIndice + 0.32));
  const uBrilloFoto = suave(tramo(tr, tDejando, tIntacta + 0.15));

  g.save();
  vista(g, Z, cx, cy);
  g.translate(0, slideY);

  // ---------------- LIBRO FÍSICO DE TAPA DURA ABIERTO (x = 70..1010, y = 760..1520) ----------------
  const bX = 70;
  const bY = 765;
  const bW = 940;
  const bH = 740;

  // Sombra y tapas de cuero marrón oscuro
  g.save();
  g.shadowColor = "rgba(45, 25, 10, 0.35)";
  g.shadowBlur = 46;
  g.shadowOffsetY = 24;
  redondo(g, bX, bY, bW, bH, 28);
  g.fillStyle = "#451a03";
  g.fill();
  g.shadowBlur = 0;
  g.shadowOffsetY = 0;
  g.strokeStyle = "#78350f";
  g.lineWidth = 5;
  g.stroke();

  // Páginas color marfil izquierda y derecha
  const pW = (bW - 52) / 2;
  const pH = bH - 44;
  const pY = bY + 22;
  const pIzqX = bX + 24;
  const pDerX = 540 + 2;

  // Página izquierda
  redondo(g, pIzqX, pY, pW, pH, 16);
  const pgL = g.createLinearGradient(pIzqX, 0, 540, 0);
  pgL.addColorStop(0, "#fffbeb");
  pgL.addColorStop(0.88, "#fef3c7");
  pgL.addColorStop(1, "#d6c3a5");
  g.fillStyle = pgL;
  g.fill();

  // Página derecha
  redondo(g, pDerX, pY, pW, pH, 16);
  const pgR = g.createLinearGradient(540, 0, pDerX + pW, 0);
  pgR.addColorStop(0, "#d6c3a5");
  pgR.addColorStop(0.12, "#fef3c7");
  pgR.addColorStop(1, "#fffbeb");
  g.fillStyle = pgR;
  g.fill();

  // Pliegue central del lomo
  g.fillStyle = "rgba(69, 26, 3, 0.28)";
  g.fillRect(536, pY, 8, pH);

  // ---------------- CONTENIDO PÁGINA IZQUIERDA: ÍNDICE ----------------
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.font = "800 32px Figtree";
  g.fillStyle = "#451a03";
  g.fillText("ÍNDICE", pIzqX + pW / 2, pY + 72);

  g.strokeStyle = "rgba(120, 53, 15, 0.25)";
  g.lineWidth = 2;
  g.beginPath();
  g.moveTo(pIzqX + 40, pY + 106);
  g.lineTo(pIzqX + pW - 40, pY + 106);
  g.stroke();

  const renglones = [
    "1. Portada ................. 04",
    "2. Viaje norte ............ 12",
    "3. Foto playa ............. 24", // <- este renglón se arranca
    "4. Cumpleaños .......... 31",
    "5. Notas .................... 40",
  ];

  renglones.forEach((txt, idx) => {
    const ry = pY + 170 + idx * 96;
    if (idx === 2) {
      // Hueco gris rugoso que queda debajo cuando se arranca la tira del renglón 3
      redondo(g, pIzqX + 28, ry - 30, pW - 56, 60, 10);
      g.fillStyle = "#e7dcc8";
      g.fill();
      g.strokeStyle = "rgba(120, 53, 15, 0.3)";
      g.setLineDash([8, 6]);
      g.lineWidth = 2;
      g.stroke();
      g.setLineDash([]);

      if (uArranca > 0.35) {
        g.fillStyle = "#dc2626";
        g.font = "800 20px Figtree";
        g.textAlign = "center";
        g.fillText("RENGLÓN ARRANCADO", pIzqX + pW / 2, ry + 1);
      }
    } else {
      g.textAlign = "left";
      g.font = "700 25px Figtree";
      g.fillStyle = "#573b26";
      g.fillText(txt, pIzqX + 42, ry);
    }
  });

  // ---------------- CONTENIDO PÁGINA DERECHA: PÁGINA 24 CON LA FOTO INTACTA ----------------
  g.textAlign = "center";
  g.font = "800 28px Figtree";
  g.fillStyle = "#451a03";
  g.fillText("PÁGINA 24", pDerX + pW / 2, pY + 72);

  if (uBrilloFoto > 0.05) {
    k.brillo(g, pDerX + pW / 2, pY + 345, 360, "34, 227, 155", uBrilloFoto * 0.45);
  }

  dibujarFotoRecuerdo(g, pDerX + pW / 2, pY + 335, pW - 96, 330, {
    marco: true,
    t: tr,
  });

  // Sello verde «FOTO INTACTA» debajo de la foto en la página 24
  if (uBrilloFoto > 0.05) {
    g.save();
    g.globalAlpha = uBrilloFoto;
    const sc = 0.88 + 0.12 * uBrilloFoto;
    g.translate(pDerX + pW / 2, pY + 575);
    g.scale(sc, sc);
    redondo(g, -155, -30, 310, 60, 16);
    g.fillStyle = "#064e3b";
    g.fill();
    g.strokeStyle = "#34d399";
    g.lineWidth = 3;
    g.stroke();
    g.fillStyle = "#6ee7b7";
    g.font = "800 25px Figtree";
    g.fillText("✓ PÁGINA Y FOTO INTACTAS", 0, 1);
    g.restore();
  }

  // Tira de papel del renglón 3 despegándose y volando hacia arriba a la izquierda en «arrancar un renglón»
  g.save();
  const tx = mez(pIzqX + pW / 2, pIzqX + 70, uArranca);
  const ty = mez(pY + 170 + 2 * 96, pY - 95, uArranca);
  const rot = -uArranca * 0.34;
  g.translate(tx, ty);
  g.rotate(rot);
  g.globalAlpha = 1 - suave(tramo(uArranca, 0.82, 1.0)) * 0.35;
  g.shadowColor = "rgba(0,0,0,0.28)";
  g.shadowBlur = 22;
  g.shadowOffsetY = 12 + uArranca * 18;
  redondo(g, -(pW - 56) / 2, -30, pW - 56, 60, 8);
  g.fillStyle = "#fffbeb";
  g.fill();
  g.shadowBlur = 0;
  g.strokeStyle = "#d97706";
  g.lineWidth = 2.5;
  g.stroke();

  g.textAlign = "left";
  g.textBaseline = "middle";
  g.font = "800 25px Figtree";
  g.fillStyle = "#9a3412";
  g.fillText("3. Foto playa ............. 24", -(pW - 56) / 2 + 16, 0);
  g.restore();

  g.restore();
  g.restore();

  sinVista(g);
  const alPil = entra(tramo(tr, tFoto - 0.15, tIntacta + 0.15));
  pildoraEstado(g, 540, 1710, "BORRAS EL ÍNDICE · NO LA PÁGINA CON LA FOTO", "16, 185, 129", alPil, 35, true);

  vineta(g, 0.32);
  capaSuperiorMarca(g, 0.68);
}
