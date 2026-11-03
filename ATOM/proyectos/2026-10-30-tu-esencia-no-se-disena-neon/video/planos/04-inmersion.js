// Plano 04 (04-inmersion.js) en estilo Datos Neón (41.36 a 52.40 s).
import * as k from "#kit";
import { v } from "#voz";
import { cabeceraNeon, fondoNeon, latidoRitmo } from "../mundo.js";

const f8 = v.frase(8), f9 = v.frase(9);
export const desde = () => f8.inicio;
export const entrada = "fundido";

const { NEON, suave, tramo, entra, pulso } = k;

const Tinmersion = f8.t("inmersion");
const Tdos = f8.t("dos");
const Tvivo = f8.t("vivo");
const Tesencia = f8.t("esencia");

const Tcomuniques = f9.t("comuniques");
const Tviviste = f9.t("viviste");
const Tcrees9 = f9.t("crees");

export function dibuja(g, t) {
  const uFreno = tramo(t, 51.7, 52.2);
  const tFase = t < 51.7 ? t : 51.7 + 0.5 * (uFreno - 0.5 * uFreno * uFreno);
  const lat = latidoRitmo(tFase) * (1 - uFreno);

  fondoNeon(g, tFase);

  cabeceraNeon(g, "PROGRAMA DE INMERSIÓN · 2 DÍAS", "EMPEZAMOS POR TU ESENCIA", NEON.verde);

  const uDias = entra(tramo(t, Tdos - 0.2, Tvivo + 0.25));
  k.panelNeon(g, 80, 720, 440, 230, NEON.ambar, Math.max(0.25, uDias));
  k.textoMono(g, "DÍA 01 · EN VIVO", 115, 780, 28, NEON.ambar);
  k.textoMono(g, "TU ESENCIA REAL", 115, 835, 34, NEON.texto, { brillo: true });
  k.barraNeon(g, 115, 875, 370, 26, uDias, NEON.ambar);

  k.panelNeon(g, 560, 720, 440, 230, NEON.verde, Math.max(0.25, uDias));
  k.textoMono(g, "DÍA 02 · EN VIVO", 595, 780, 28, NEON.verde);
  k.textoMono(g, "VOZ Y CONEXIÓN", 595, 835, 34, NEON.texto, { brillo: true });
  k.barraNeon(g, 595, 875, 370, 26, uDias, NEON.verde);

  k.panelNeon(g, 80, 985, 920, 680, NEON.verde, 1);
  k.textoMono(g, "ORIGEN DE TU COMUNICACIÓN", 120, 1045, 26, NEON.tenue);

  const pCurva = entra(tramo(t, Tesencia - 0.2, Tcrees9 + 0.2));

  const ptsMag = [
    [130, 1140],
    [350, 1180],
    [540, 1320],
    [740, 1500],
    [940, 1545],
  ];
  k.lineaNeon(g, ptsMag, NEON.magenta, 6, pCurva);

  const ptsVer = [
    [130, 1540],
    [350, 1480],
    [540, 1320],
    [740, 1155],
    [940, 1110],
  ];
  k.lineaNeon(g, ptsVer, NEON.verde, 8 + 2 * lat, pCurva);

  k.chipNeon(g, "LO QUE VIVISTE · 100%", 730, 1125, NEON.verde, 32, suave(tramo(t, Tviviste - 0.2, Tviviste + 0.25)));
  k.chipNeon(g, "LO QUE DEBERÍAS SER · 0%", 710, 1585, NEON.magenta, 28, suave(tramo(t, Tcrees9 - 0.2, Tcrees9 + 0.25)));

  k.fogonazo(g, 540, 1320, t - Tesencia, 620, NEON.verdeRgb);
  k.fogonazo(g, 730, 1125, t - Tviviste, 580, NEON.verdeRgb);
}

export const momentosInmersion = {
  inmersion: Tinmersion,
  dos: Tdos,
  vivo: Tvivo,
  esencia: Tesencia,
  viviste: Tviviste,
  crees9: Tcrees9,
};
