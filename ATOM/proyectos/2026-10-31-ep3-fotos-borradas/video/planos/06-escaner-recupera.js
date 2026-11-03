// Plano 06 (Frase 7):
// «En memorias sin cifrar o celulares mal borrados, un programa recupera esas páginas ocultas.»
// Mesa técnica clara ("fria") de alto contraste tras el plano oscuro:
// Una placa de memoria sin cifrar con 3 bloques marcados como «ESPACIO LIBRE». Un cabezal láser rojo de
// recuperación forense barre de izquierda a derecha y levanta las 3 fotografías ocultas intactas.
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

export const desde = (v) => v.frase(7).inicio - 0.04;

const { suave, tramo, entra, mez } = k;

export function dibuja(g, t) {
  const f7 = v.frase(7);
  const t0 = f7.inicio - 0.04;
  const tCorte = v.frase(8).inicio - 0.04;
  const tr = relojPlano(t, tCorte, 0.16, 0.24);

  const tCifrar = f7.t("cifrar");
  const tPrograma = f7.t("programa");
  const tRecupera = f7.t("recupera");
  const tOcultas = f7.t("ocultas");

  fondoMesaClara(g, tr, "fria");

  const cam = camino2D([
    [t0, [1.04, 470, 1140]],
    [tPrograma, [1.06, 540, 1130]],
    [tOcultas + 0.2, [1.03, 560, 1120]],
    [tCorte - 0.18, [1.03, 560, 1120]],
  ]);
  const [Z, cx, cy] = cam(tr);

  const slideY = (1 - entra(tramo(tr, t0, t0 + 0.22))) * 34;
  const uBarrido = suave(tramo(tr, tCifrar + 0.15, tOcultas + 0.2));
  const xLaser = mez(145, 935, uBarrido);

  g.save();
  vista(g, Z, cx, cy);
  g.translate(0, slideY);

  // Carcasa de memoria sin cifrar sobre la mesa de laboratorio
  const mX = 95;
  const mY = 710;
  const mW = 890;
  const mH = 770;

  g.shadowColor = "rgba(15, 23, 42, 0.3)";
  g.shadowBlur = 42;
  g.shadowOffsetY = 20;
  redondo(g, mX, mY, mW, mH, 36);
  g.fillStyle = "#0d1624";
  g.fill();
  g.shadowBlur = 0;
  g.shadowOffsetY = 0;

  redondo(g, mX, mY, mW, mH, 36);
  g.strokeStyle = "#ef4444";
  g.lineWidth = 4;
  g.stroke();

  // Cabecera de advertencia
  redondo(g, mX + 36, mY + 34, 450, 54, 16);
  g.fillStyle = "rgba(239, 68, 68, 0.16)";
  g.fill();
  g.strokeStyle = "#f87171";
  g.lineWidth = 2;
  g.stroke();

  g.textAlign = "center";
  g.textBaseline = "middle";
  g.font = "800 23px Figtree";
  g.fillStyle = "#fca5a5";
  g.fillText("⚠ MEMORIA SIN CIFRAR · MAL BORRADA", mX + 261, mY + 61);

  // 3 sectores supuestamente «libres» que al pasar el láser levantan su foto oculta
  const tarjetas = [
    { cx: 268, var: "playa", nom: "IMG_2048.JPG" },
    { cx: 540, var: "ciudad", nom: "IMG_2049.JPG" },
    { cx: 812, var: "playa", nom: "IMG_2050.JPG" },
  ];

  tarjetas.forEach((tk) => {
    const cyBase = mY + 435;
    const cw = 236;
    const ch = 360;
    const uRec = suave(tramo(xLaser, tk.cx - 85, tk.cx + 75));

    // Hueco oscuro «ESPACIO LIBRE» abajo
    redondo(g, tk.cx - cw / 2, cyBase - ch / 2, cw, ch, 22);
    g.fillStyle = "#070c14";
    g.fill();
    g.strokeStyle = "rgba(148, 163, 184, 0.3)";
    g.setLineDash([8, 8]);
    g.lineWidth = 2.5;
    g.stroke();
    g.setLineDash([]);

    g.fillStyle = "#475569";
    g.font = "800 22px Figtree";
    g.fillText("ESPACIO", tk.cx, cyBase - 16);
    g.fillText("«LIBRE»", tk.cx, cyBase + 16);

    // Fotografía recuperada emergiendo hacia arriba al paso del escáner
    if (uRec > 0.02) {
      g.save();
      g.globalAlpha = uRec;
      const liftY = cyBase - uRec * 56;
      const sc = 0.88 + 0.12 * uRec;
      g.translate(tk.cx, liftY);
      g.scale(sc, sc);

      k.brillo(g, 0, 0, 230, "248, 113, 113", uRec * 0.55);

      redondo(g, -cw / 2, -ch / 2, cw, ch, 22);
      g.fillStyle = "#181018";
      g.fill();
      g.strokeStyle = "#f87171";
      g.lineWidth = 4;
      g.stroke();

      dibujarFotoRecuerdo(g, 0, -28, cw - 24, ch - 110, {
        marco: false,
        variante: tk.var,
        t: tr,
      });

      redondo(g, -cw / 2 + 16, ch / 2 - 64, cw - 32, 46, 12);
      g.fillStyle = "#dc2626";
      g.fill();
      g.fillStyle = "#ffffff";
      g.font = "800 20px Figtree";
      g.fillText("RECUPERADA", 0, ch / 2 - 41);
      g.restore();
    }
  });

  // Haz láser vertical de escaneo forense
  if (uBarrido > 0.01 && uBarrido < 0.99) {
    g.save();
    g.globalCompositeOperation = "lighter";
    const lg = g.createLinearGradient(xLaser - 70, 0, xLaser + 20, 0);
    lg.addColorStop(0, "rgba(239, 68, 68, 0)");
    lg.addColorStop(0.75, "rgba(239, 68, 68, 0.38)");
    lg.addColorStop(1, "rgba(255, 220, 220, 0.95)");
    g.fillStyle = lg;
    g.fillRect(xLaser - 70, mY + 110, 90, mH - 140);

    g.strokeStyle = "#fecaca";
    g.lineWidth = 5;
    g.beginPath();
    g.moveTo(xLaser, mY + 100);
    g.lineTo(xLaser, mY + mH - 24);
    g.stroke();
    g.restore();
  }

  g.restore();

  sinVista(g);
  const alPil = entra(tramo(tr, tRecupera - 0.1, tRecupera + 0.22));
  pildoraEstado(g, 540, 1710, "SIN CIFRADO → UN ESCÁNER LAS RECUPERA", "239, 68, 68", alPil, 36, true);

  vineta(g, 0.32);
  capaSuperiorMarca(g, 0.68);
}
