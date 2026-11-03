// Plano 03 (03-brillo.js) en estilo Datos Neón (26.72 a 41.36 s).
import * as k from "#kit";
import { v } from "#voz";
import { cabeceraNeon, fondoNeon, latidoRitmo } from "../mundo.js";

const f5 = v.frase(5), f6 = v.frase(6), f7 = v.frase(7);
export const desde = () => f5.inicio;
export const entrada = "fundido";

const { NEON, suave, tramo, entra, pulso, mez } = k;

const Tpaso = f5.t("paso");
const Tbrillo = f5.t("brillo");
const Tdemasiado = f5.t("demasiado");

const Tredes = f6.t("redes");
const Tburlar = f6.t("burlar");

const Therida = f7.t("herida");
const Tconecto = f7.t("conecto");
const Tmujeres = f7.t("mujeres");

const NODOS_RED = [
  [210, 1020],
  [870, 1020],
  [175, 1260],
  [905, 1260],
  [250, 1500],
  [830, 1500],
  [540, 1560],
];

export function dibuja(g, t) {
  const uFreno = tramo(t, 40.65, 41.15);
  const tFase = t < 40.65 ? t : 40.65 + 0.5 * (uFreno - 0.5 * uFreno * uFreno);
  const lat = latidoRitmo(tFase) * (1 - uFreno);

  fondoNeon(g, tFase);

  const uRedes = suave(tramo(t, f6.inicio - 0.1, Tredes + 0.3));
  const uConecto = suave(tramo(t, f7.inicio - 0.05, Tconecto + 0.25));

  cabeceraNeon(
    g,
    "CASO REAL · SEÑAL DE EXPOSICIÓN",
    uConecto > 0.2 ? "HERIDA = PUENTE DE CONEXIÓN" : uRedes > 0.2 ? "RIESGO: BURLA EN REDES" : "ALERTA: BRILLO EXCESIVO",
    uConecto > 0.2 ? NEON.verde : NEON.magenta
  );

  k.panelNeon(g, 80, 720, 920, 210, uConecto > 0.2 ? NEON.verde : NEON.ambar, 1);
  const vBrillo = entra(tramo(t, f5.inicio, Tbrillo + 0.3));
  k.textoMono(g, "INTENSIDAD DE TU BRILLO", 120, 780, 28, NEON.texto);
  k.barraNeon(g, 120, 805, 580, 32, vBrillo, uConecto > 0.2 ? NEON.verde : NEON.ambar);
  k.chipNeon(
    g,
    uConecto > 0.2 ? "CONECTADO" : uRedes > 0.2 ? "BLOQUEADO" : "DEMASIADO",
    845,
    820,
    uConecto > 0.2 ? NEON.verde : NEON.magenta,
    30,
    1
  );

  k.panelNeon(g, 80, 960, 920, 710, uConecto > 0.2 ? NEON.verde : NEON.magenta, 1);
  const cx = 540, cy = 1260;

  if (uConecto > 0.01) {
    const pCon = entra(tramo(t, Therida, Tmujeres + 0.2));
    for (const [nx, ny] of NODOS_RED) {
      k.lineaNeon(g, [[cx, cy], [nx, ny]], NEON.verde, 6, pCon);
      if (pCon > 0.7) {
        k.chipNeon(g, "MUJER COMO TÚ", nx, ny, NEON.verde, 22, uConecto);
      }
    }
  } else if (uRedes > 0.01) {
    const pBurla = entra(tramo(t, Tredes, Tburlar + 0.2));
    for (const [nx, ny] of NODOS_RED.slice(0, 4)) {
      k.lineaNeon(g, [[nx, ny], [cx, cy]], NEON.magenta, 6, pBurla);
      k.chipNeon(g, "BURLA FAMILIAR", nx, ny, NEON.magenta, 22, uRedes);
    }
  } else {
    const pts = [];
    for (let i = 0; i <= 40; i++) {
      const px = 140 + (i / 40) * 800;
      const py = cy + Math.sin(i * 0.45 - tFase * 8) * (95 + 25 * lat);
      pts.push([px, py]);
    }
    k.lineaNeon(g, pts, NEON.ambar, 7, vBrillo);
  }

  k.chipNeon(
    g,
    uConecto > 0.2 ? "ESA HERIDA · HOY CONECTO" : "TU BRILLO",
    cx,
    cy,
    uConecto > 0.2 ? NEON.verde : NEON.ambar,
    34,
    1
  );

  k.fogonazo(g, cx, cy, t - Tconecto, 680, NEON.verdeRgb);
}

export const momentosBrillo = {
  paso: Tpaso,
  brillo: Tbrillo,
  redes: Tredes,
  burlar: Tburlar,
  herida: Therida,
  conecto: Tconecto,
};
