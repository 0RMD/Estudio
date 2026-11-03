// Plano 01 (Frase 1):
// «¿Sabías que cuando borras una foto de tu celular y vacías la papelera, sigue entera dentro del chip?»
// Mosaico oscuro estilo Sovera con insignia MITOS DE TU CELULAR · EP. 3.
// Un dedo pulsa «Vaciar papelera»: la foto desaparece de la galería superior, pero se abre una ventana
// de rayos X sobre el chip NAND inferior revelando la misma fotografía intacta y encendida.
import * as k from "#kit";
import { v } from "#voz";
import {
  camino2D,
  capaSuperiorMarca,
  dibujarCelularGaleria,
  dibujarDedo,
  fondoMosaico,
  insigniaEpisodio,
  pildoraEstado,
  relojPlano,
  sinVista,
  vista,
  vineta,
} from "../mundo.js";

export const desde = 0;

const { suave, tramo, entra, mez } = k;

export function dibuja(g, t) {
  const f1 = v.frase(1);
  const tCorte = v.frase(2).inicio - 0.04;
  const tr = relojPlano(t, tCorte, 0.16, 0.24);

  const tBorras = f1.t("borras");
  const tVacias = f1.t("vacías");
  const tPapelera = f1.t("papelera");
  const tSigue = f1.t("sigue");
  const tChip = f1.t("chip");

  // Zoom progresivo hacia el chip NAND cuidando que la parte alta del celular no invada subtítulos
  const cam = camino2D([
    [0, [1.0, 540, 960]],
    [tPapelera, [1.03, 540, 1000]],
    [tSigue + 0.1, [1.12, 540, 1140]],
    [tChip + 0.3, [1.18, 540, 1210]],
    [tCorte - 0.18, [1.18, 540, 1210]],
  ]);
  const [Z, cx, cy] = cam(tr);

  const uRayos = suave(tramo(tr, tSigue - 0.12, tChip + 0.1));
  const colLuz = k.mezRgb("47, 124, 246", "34, 227, 155", uRayos);
  fondoMosaico(g, tr, -tr * 24, tr * 16, colLuz, 0.32);

  g.save();
  vista(g, Z, cx, cy);

  const uBorra = suave(tramo(tr, tVacias - 0.04, tPapelera + 0.26));
  const info = dibujarCelularGaleria(g, 540, 1055, 550, 960, {
    borradaArriba: uBorra,
    rayosX: uRayos,
    fotoEnChip: 1,
    alertaChip: false,
    t: tr,
  });

  // Dedo humano entrando a pulsar «Vaciar papelera» y retirándose
  const uEntraDedo = suave(tramo(tr, tBorras + 0.2, tVacias + 0.02));
  const uSaleDedo = suave(tramo(tr, tPapelera - 0.05, tPapelera + 0.42));
  const alDedo = uEntraDedo * (1 - uSaleDedo);
  if (alDedo > 0.01) {
    g.save();
    g.globalAlpha = alDedo;
    const xD = mez(890, info.botonX + 34, uEntraDedo) + uSaleDedo * 220;
    const yD = mez(1430, info.botonY + 12, uEntraDedo) + uSaleDedo * 140;
    const pres = suave(tramo(tr, tVacias - 0.08, tVacias + 0.1)) * (1 - suave(tramo(tr, tVacias + 0.12, tPapelera + 0.05)));
    dibujarDedo(g, xD, yD, -0.32, pres, 0.96);
    g.restore();
  }

  g.restore();

  sinVista(g);
  const alIns = entra(tramo(tr, 0, 0.22)) * (1 - suave(tramo(tr, tVacias - 0.28, tVacias + 0.15)));
  const escIns = 0.88 + 0.12 * entra(tramo(tr, 0, 0.26));
  insigniaEpisodio(g, 540, 645, "MITOS DE TU CELULAR", "EP. 3", "", "#22E39B", alIns, escIns);

  const alPil = entra(tramo(tr, tChip - 0.18, tChip + 0.18));
  pildoraEstado(g, 540, 1700, "PAPELERA VACÍA · FOTO INTACTA EN EL CHIP", "34, 227, 155", alPil, 36);

  vineta(g, 0.55);
  capaSuperiorMarca(g, 0.62);
}
