// Plano 01 (Frase 1):
// «¿Sabías que un celular de 200 megapíxeles puede tomar peores fotos de noche que uno de 48?»
// Mosaico nocturno oscuro estilo Sovera con insignia MITOS DE TU CELULAR · EP. 4.
// Duelo lado a lado: a la izquierda un celular de 200 MP y a la derecha uno de 48 MP disparan de noche;
// en «peores fotos de noche», el visor de 200 MP queda oscuro y lleno de ruido RGB mientras el de 48 MP brilla nítido.
import * as k from "#kit";
import { v } from "#voz";
import {
  camino2D,
  capaSuperiorMarca,
  dibujarCelularCamara,
  fondoMosaico,
  insigniaEpisodio,
  pildoraEstado,
  relojPlano,
  sinVista,
  vista,
  vineta,
} from "../mundo.js";

export const desde = 0;

const { suave, tramo, entra } = k;

export function dibuja(g, t) {
  const f1 = v.frase(1);
  const tCorte = v.frase(2).inicio - 0.04;
  const tr = relojPlano(t, tCorte, 0.16, 0.24);

  const t200 = f1.t("200");
  const tPeores = f1.t("peores");
  const tNoche = f1.t("noche");
  const t48 = f1.t("48");

  const cam = camino2D([
    [0, [1.0, 540, 960]],
    [tPeores, [1.05, 515, 1110]],
    [t48 + 0.3, [1.08, 540, 1140]],
    [tCorte - 0.18, [1.08, 540, 1140]],
  ]);
  const [Z, cx, cy] = cam(tr);

  const uDisparo = suave(tramo(tr, tPeores - 0.1, tNoche + 0.15));
  const flash = suave(tramo(tr, tPeores - 0.12, tPeores + 0.04)) * (1 - suave(tramo(tr, tPeores + 0.05, tPeores + 0.32)));
  const colLuz = k.mezRgb("47, 124, 246", "251, 191, 36", suave(tramo(tr, t200, tNoche)));
  fondoMosaico(g, tr, -tr * 24, tr * 16, colLuz, 0.32);

  g.save();
  vista(g, Z, cx, cy);

  // Izquierda: Celular 200 MP (oscuro y con ruido de noche)
  dibujarCelularCamara(g, 295, 1165, 420, 780, {
    etiquetaMP: "200 MP",
    esGanador: false,
    disparo: uDisparo,
    flash: flash * 0.7,
    ruido: 0.2 + 0.8 * uDisparo,
    veredicto: "OSCURA Y CON RUIDO",
    t: tr,
  });

  // Derecha: Celular 48 MP (clara y luminosa de noche)
  const uGana48 = suave(tramo(tr, tNoche - 0.05, t48 + 0.2));
  dibujarCelularCamara(g, 785, 1165, 420, 780, {
    etiquetaMP: "48 MP",
    esGanador: true,
    disparo: uGana48,
    flash: flash * 0.85,
    ruido: 0,
    veredicto: "CLARA Y NÍTIDA",
    t: tr,
  });

  g.restore();

  sinVista(g);
  const alIns = entra(tramo(tr, 0, 0.22)) * (1 - suave(tramo(tr, tPeores - 0.3, tPeores + 0.12)));
  const escIns = 0.88 + 0.12 * entra(tramo(tr, 0, 0.26));
  insigniaEpisodio(g, 540, 645, "MITOS DE TU CELULAR", "EP. 4", "", "#FBBF24", alIns, escIns);

  const alPil = entra(tramo(tr, tNoche - 0.08, t48 + 0.18));
  pildoraEstado(g, 540, 1710, "DE NOCHE: 48 MP PUEDE SUPERAR A 200 MP", "251, 191, 36", alPil, 36);

  vineta(g, 0.55);
  capaSuperiorMarca(g, 0.62);
}
