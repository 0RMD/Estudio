// Plano 07 (Frase 8):
// «Por eso, antes de vender o regalar tu celular, no borres fotos una por una.»
// Mostrador oscuro de madera caoba con etiqueta "$ EN VENTA":
// Un dedo intenta borrar fotos a mano en la pantalla, aparece un gran sello rojo "✕ NO BASTA BORRAR UNA POR UNA"
// mientras la ventana de rayos X inferior muestra en rojo vivo que la foto sigue recuperable en el chip.
import * as k from "#kit";
import { v } from "#voz";
import {
  camino2D,
  capaSuperiorMarca,
  dibujarCelularGaleria,
  dibujarDedo,
  pildoraEstado,
  redondo,
  relojPlano,
  sinVista,
  vista,
  vineta,
} from "../mundo.js";

export const desde = (v) => v.frase(8).inicio - 0.04;

const { suave, tramo, entra, mez } = k;

export function dibuja(g, t) {
  const f8 = v.frase(8);
  const t0 = f8.inicio - 0.04;
  const tCorte = v.frase(9).inicio - 0.04;
  const tr = relojPlano(t, tCorte, 0.16, 0.24);

  const tVender = f8.t("vender");
  const tNo = f8.t("no");
  const tBorres = f8.t("borres");
  const tUna = f8.t("una");

  // Fondo nocturno cálido de mostrador de compraventa
  g.save();
  sinVista(g);
  const bg = g.createLinearGradient(0, 0, 0, 1920);
  bg.addColorStop(0, "#080911");
  bg.addColorStop(0.55, "#191118");
  bg.addColorStop(1, "#120a0d");
  g.fillStyle = bg;
  g.fillRect(0, 0, 1080, 1920);

  k.brillo(g, 540, 1140, 820, "248, 113, 113", 0.24);
  g.restore();

  const cam = camino2D([
    [t0, [1.02, 540, 1040]],
    [tVender, [1.06, 540, 1060]],
    [tBorres + 0.2, [1.11, 540, 1110]],
    [tCorte - 0.18, [1.11, 540, 1110]],
  ]);
  const [Z, cx, cy] = cam(tr);

  const slideY = (1 - entra(tramo(tr, t0, t0 + 0.22))) * 32;
  const pulsoToque1 = suave(tramo(tr, tVender - 0.1, tVender + 0.15)) * (1 - suave(tramo(tr, tVender + 0.18, tVender + 0.4)));
  const pulsoToque2 = suave(tramo(tr, tBorres - 0.25, tBorres)) * (1 - suave(tramo(tr, tBorres + 0.05, tBorres + 0.3)));
  const uProhibido = entra(tramo(tr, tNo - 0.04, tBorres + 0.22));

  g.save();
  vista(g, Z, cx, cy);
  g.translate(0, slideY);

  const info = dibujarCelularGaleria(g, 540, 1065, 550, 960, {
    borradaArriba: suave(tramo(tr, tVender, tBorres + 0.2)),
    rayosX: 1,
    fotoEnChip: 1,
    alertaChip: true,
    etiquetaVenta: true,
    t: tr,
  });

  // Dedo intentando borrar fotos repetidamente una por una
  const alDedo = 1 - suave(tramo(tr, tBorres + 0.15, tUna));
  if (alDedo > 0.02) {
    g.save();
    g.globalAlpha = alDedo;
    const oscX = Math.sin((tr - t0) * 6.5) * 28;
    const pres = Math.max(pulsoToque1, pulsoToque2);
    dibujarDedo(g, info.botonX + 46 + oscX, info.botonY + 12 - pres * 10, -0.3, pres, 0.94);
    g.restore();
  }

  // Sello rojo contundente «✕ NO BORRES UNA POR UNA» sobre la mitad superior del celular
  if (uProhibido > 0.02) {
    g.save();
    g.globalAlpha = uProhibido;
    const sc = 0.85 + 0.15 * uProhibido;
    g.translate(540, 885);
    g.scale(sc, sc);

    redondo(g, -235, -62, 470, 124, 28);
    g.fillStyle = "rgba(38, 8, 14, 0.95)";
    g.fill();
    g.strokeStyle = "#ef4444";
    g.lineWidth = 4.5;
    g.stroke();

    g.textAlign = "center";
    g.textBaseline = "middle";
    g.font = "800 33px Figtree";
    g.fillStyle = "#fca5a5";
    g.fillText("✕ NO BORRES UNA POR UNA", 0, -14);
    g.font = "700 24px Figtree";
    g.fillStyle = "#fecaca";
    g.fillText("Tus fotos siguen abajo en el chip", 0, 26);
    g.restore();
  }

  g.restore();

  sinVista(g);
  const alPil = entra(tramo(tr, tNo - 0.06, tBorres + 0.2));
  pildoraEstado(g, 540, 1705, "ANTES DE VENDERLO · NO USES LA PAPELERA", "248, 113, 113", alPil, 35);

  vineta(g, 0.55);
  capaSuperiorMarca(g, 0.62);
}
