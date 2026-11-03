// Plano 05 (05-cta.js) en estilo Datos Neón (52.40 a 64.00 s).
import * as k from "#kit";
import { v } from "#voz";
import { cabeceraNeon, fondoNeon, latidoRitmo } from "../mundo.js";

const f10 = v.frase(10), f11 = v.frase(11);
export const desde = () => f10.inicio;
export const entrada = "fundido";

const { NEON, suave, tramo, entra, pulso, mez } = k;

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

  fondoNeon(g, tFase);

  cabeceraNeon(g, "ACCESO A LA INMERSIÓN · EN VIVO", "CONECTA DE VERDAD", NEON.verde);

  k.panelNeon(g, 80, 725, 920, 310, NEON.verde, 1);
  const vVerdad = entra(tramo(t, f10.inicio, Tverdad + 0.25));
  k.textoMono(g, "CONECTAR DESDE TU VERDAD", 120, 790, 30, NEON.verde, { brillo: true });
  k.barraNeon(g, 120, 815, 640, 34, vVerdad, NEON.verde);
  k.textoMono(g, "100%", 790, 844, 34, NEON.verde, { brillo: true });

  const vDiseno = 1 - 0.85 * suave(tramo(t, Tdisenando - 0.2, f10.fin));
  k.textoMono(g, "DISEÑAR UNA VERSIÓN DE TI", 120, 925, 28, NEON.tenue);
  k.barraNeon(g, 120, 948, 640, 28, 0.45 * vDiseno, NEON.magenta);
  k.textoMono(g, "OFF", 790, 972, 30, NEON.magenta);

  const uBoton = suave(tramo(t, f11.inicio - 0.15, Tboton + 0.25));
  if (uBoton > 0.01) {
    k.panelNeon(g, 80, 1075, 920, 580, NEON.ambar, uBoton);
    k.textoMono(g, "ESTADO DE LA CONVOCATORIA", 120, 1135, 26, NEON.tenue, { al: uBoton });

    const vCupos = mez(0.65, 0.94, suave(tramo(t, Tlugar, Tlimitados + 0.2)));
    k.textoMono(g, "CUPOS OCUPADOS (EN VIVO)", 120, 1200, 30, NEON.ambar, { al: uBoton });
    k.barraNeon(g, 120, 1222, 660, 30, vCupos * uBoton, NEON.ambar);
    k.textoMono(g, `${Math.round(vCupos * 100)}%`, 810, 1248, 32, NEON.ambar, { al: uBoton, brillo: true });

    const esc = 1 + 0.05 * pulso(t, Tlugar, 0.2) + 0.01 * lat;
    k.chipNeon(g, "[ TOCA EL BOTÓN · APARTA TU LUGAR ]", 540, 1385, NEON.verde, 34 * esc, uBoton);
    k.chipNeon(g, "EN VIVO · CUPOS LIMITADOS", 540, 1495, NEON.ambar, 28, uBoton);

    const dy = Math.sin(tFase * 6) * 10 * (1 - uFreno);
    k.lineaNeon(
      g,
      [
        [540, 1555 + dy],
        [540, 1620 + dy],
      ],
      NEON.verde,
      7,
      uBoton
    );

    k.fogonazo(g, 540, 1385, t - Tlugar, 640, NEON.verdeRgb);
  }
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
