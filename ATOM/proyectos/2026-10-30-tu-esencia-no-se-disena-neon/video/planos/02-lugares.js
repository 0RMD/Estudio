// Plano 02 (02-lugares.js) en estilo Datos Neón (14.80 a 26.72 s).
import * as k from "#kit";
import { v } from "#voz";
import { cabeceraNeon, fondoNeon, latidoRitmo } from "../mundo.js";

const f3 = v.frase(3), f4 = v.frase(4);
export const desde = () => f3.inicio;
export const entrada = "fundido";

const { NEON, suave, tramo, entra, pulso } = k;

const Tdisena = f3.t("disena");
const Tdescubre = f3.t("descubre");

const Ttres = f4.t("tres");
const Theridas = f4.t("heridas");
const Tmomentos = f4.t("momentos");
const Tverdades = f4.t("verdades");

export function dibuja(g, t) {
  const uFreno = tramo(t, 26.0, 26.5);
  const tFase = t < 26.0 ? t : 26.0 + 0.5 * (uFreno - 0.5 * uFreno * uFreno);

  fondoNeon(g, tFase);

  const uDescubre = suave(tramo(t, Tdescubre - 0.3, Tdescubre + 0.25));
  cabeceraNeon(
    g,
    "ORIGEN DE TU ESENCIA",
    uDescubre > 0.2 ? "SE DESCUBRE EN 3 LUGARES" : "NO SE DISEÑA [ERROR]",
    uDescubre > 0.2 ? NEON.verde : NEON.magenta
  );

  k.panelNeon(g, 80, 720, 440, 210, NEON.magenta, 1);
  k.textoMono(g, "DISEÑAR PERSONAJE", 115, 775, 26, NEON.tenue);
  k.chipNeon(g, "FALSO · 0%", 300, 855, NEON.magenta, 34, 1);

  k.panelNeon(g, 560, 720, 440, 210, NEON.verde, Math.max(0.25, uDescubre));
  k.textoMono(g, "DESCUBRIR ESENCIA", 595, 775, 26, NEON.tenue, { al: Math.max(0.25, uDescubre) });
  k.chipNeon(g, "REAL · 100%", 780, 855, NEON.verde, 34, Math.max(0.25, uDescubre));

  const u1 = entra(tramo(t, Theridas - 0.25, Theridas + 0.3));
  const u2 = entra(tramo(t, Tmomentos - 0.25, Tmomentos + 0.3));
  const u3 = entra(tramo(t, Tverdades - 0.25, Tverdades + 0.3));

  const LUGARES = [
    { y: 970, id: "LUGAR 01", tit: "LAS HERIDAS QUE TE FORMARON", chip: "RAÍZ", col: NEON.ambar, u: u1 },
    { y: 1210, id: "LUGAR 02", tit: "MOMENTOS QUE TRANSFORMARON", chip: "GIRO", col: NEON.verde, u: u2 },
    { y: 1450, id: "LUGAR 03", tit: "VERDADES QUE HOY DEFIENDES", chip: "VOZ", col: NEON.verde, u: u3 },
  ];

  for (const l of LUGARES) {
    const al = Math.max(0.18, l.u);
    k.panelNeon(g, 80, l.y, 920, 205, l.u > 0.1 ? l.col : null, al);
    k.textoMono(g, l.id, 120, l.y + 56, 26, l.col, { al });
    k.textoMono(g, l.tit, 120, l.y + 112, 33, NEON.texto, { al, brillo: l.u > 0.5 });
    k.barraNeon(g, 120, l.y + 142, 620, 28, l.u, l.col);
    k.chipNeon(g, l.chip, 865, l.y + 135, l.col, 30, l.u);
  }

  k.fogonazo(g, 780, 855, t - Tdescubre, 540, NEON.verdeRgb);
}

export const momentosLugares = {
  disena: Tdisena,
  descubre: Tdescubre,
  tres: Ttres,
  heridas: Theridas,
  momentos: Tmomentos,
  verdades: Tverdades,
};
