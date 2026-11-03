// «Si quieres descubrir desde dónde conectas de verdad en vez de seguir diseñando una versión de ti, toca el botón de
// abajo y aparta tu lugar, es en vivo y los cupos son limitados.»
import * as k from "#kit";
import { v } from "#voz";
import {
  METAL_CHAMPAGNE,
  PAL,
  PALETA_CONEXION,
  fondoMundo,
  mascaraFalsa,
  nucleoEsencia,
  pilotoVivo,
  velo,
  vineta,
} from "../mundo.js";

export const desde = (vz) => vz.frase(8).inicio;

const { suave: su, tramo: tr, mez, entra, redondo } = k;
const f8 = v.frase(8);

const T0 = f8.inicio,
  Tdes = f8.t("descubrir"),
  Tcon = f8.t("conectas"),
  Tver = f8.t("verdad"),
  Tdis = f8.t("disenando"),
  Tver2 = f8.t("version"),
  Ttoca = f8.t("toca"),
  Tbot = f8.t("boton"),
  Taba = f8.t("abajo"),
  Tapa = f8.t("aparta"),
  Tlug = f8.t("lugar"),
  Tviv = f8.t("vivo"),
  Tcup = f8.t("cupos"),
  Tlim = f8.t("limitados");

export const momentos = {
  conectas: Tcon,
  disenando: Tdis,
  toca: Ttoca,
  boton: Tbot,
  lugar: Tlug,
  vivo: Tviv,
  cupos: [Tcup - 0.1, Tcup + 0.12, Tcup + 0.34, Tlim - 0.05, Tlim + 0.18],
};

const NODOS_RED = [
  [-280, -110],
  [280, -110],
  [-340, 70],
  [340, 70],
  [-210, 190],
  [210, 190],
];

// Dibuja el gran botón 3D de llamada a la acción («APARTA TU LUGAR ↓»)
function botonCTA(g, x, y, pulsoClick, t, al) {
  if (al <= 0.01) return;
  g.save();
  g.translate(x, y + pulsoClick * 14);
  const esc = 1 - 0.05 * pulsoClick + 0.02 * Math.sin(t * 4.5);
  g.scale(esc, esc);
  g.globalAlpha *= al;

  const w = 780, h = 168;

  // Halo detrás del botón
  k.brillo(g, 0, 0, 950, PAL.champagneRgb, 0.55 + 0.4 * pulsoClick);

  // Sombra y base 3D del botón
  g.save();
  g.shadowColor = "rgba(8,3,18,0.9)";
  g.shadowBlur = 55;
  g.shadowOffsetY = 24 - pulsoClick * 12;
  redondo(g, -w / 2, -h / 2 + 12, w, h, 84);
  g.fillStyle = "#593d20";
  g.fill();
  g.restore();

  // Cuerpo metálico champagne brillante
  redondo(g, -w / 2, -h / 2, w, h, 84);
  k.metal(g, -w / 2, w / 2, METAL_CHAMPAGNE);

  // Cubierta de cristal con brillo que barre de izquierda a derecha (recortado dentro del botón)
  redondo(g, -w / 2 + 6, -h / 2 + 6, w - 12, h - 12, 78);
  const bg = g.createLinearGradient(-w / 2, -h / 2, w / 2, h / 2);
  bg.addColorStop(0, PAL.champagneLight);
  bg.addColorStop(0.5, PAL.champagne);
  bg.addColorStop(1, PAL.champagneDark);
  g.fillStyle = bg;
  g.fill();
  k.vidrio(g, -w / 2 + 6, w / 2 - 6, 0.65);

  g.save();
  redondo(g, -w / 2 + 6, -h / 2 + 6, w - 12, h - 12, 78);
  g.clip();
  const barrido = ((t * 0.95) % 2.2) - 0.6;
  k.reflejo(g, -w / 2 + barrido * w, -h / 2 + 16, 65, h - 32, 0.38);
  g.restore();

  // Texto en el color --aubergine oficial de www.hectorhugo.mx para máximo contraste
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.fillStyle = PAL.aubergine;
  g.font = "900 58px Figtree";
  g.fillText("APARTA TU LUGAR ↓", 0, 3);

  // Anillo de toque cuando se presiona el botón
  if (pulsoClick > 0.02) {
    g.strokeStyle = `rgba(${PAL.creamSoftRgb},${0.9 * (1 - pulsoClick * 0.5)})`;
    g.lineWidth = 6;
    redondo(g, -w / 2 - 24 * pulsoClick, -h / 2 - 24 * pulsoClick, w + 48 * pulsoClick, h + 48 * pulsoClick, 96);
    g.stroke();
  }
  g.restore();
}

export function dibuja(g, t) {
  const uCon = 0.55 + 0.45 * su(tr(t, Tcon - 0.2, Tver + 0.25));
  const uDis = su(tr(t, Tdis - 0.2, Tver2 + 0.15));
  const uBoton = 0.45 + 0.55 * entra(tr(t, Ttoca - 0.25, Tbot + 0.2));
  const uCupos = entra(tr(t, Tviv - 0.1, Tcup + 0.2));

  // Escenario luminoso dorado champagne desde el fotograma 0 para diferenciar el plano final desde el corte
  fondoMundo(g, t, {
    cx: 540,
    cy: 760,
    luz: 0.72,
    colorLuz: PAL.champagneRgb,
    colorSec: PAL.violetLightRgb,
  });

  const cx = 540, cy = 750;

  // 1. En «en vez de seguir diseñando una versión de ti» (54.0 a 56.2 s): la coraza fría se aparta y se desvanece detrás
  const alDis = su(tr(t, Tdis - 0.35, Tdis + 0.15)) * (1 - su(tr(t, Ttoca - 0.1, Tbot + 0.2)));
  if (alDis > 0.01) {
    const dx = mez(760, 880, uDis), dy = cy + 40;
    mascaraFalsa(g, dx, dy, 130, t, { al: alDis * 0.65, cierre: 1, grieta: 0.5 });
    k.etiqueta(g, dx - 185, dy + 175, "VERSIÓN DISEÑADA", PAL.lavenderRgb, alDis, 36);
  }

  // 2. Red luminosa de «desde dónde conectas de verdad» ya visible alrededor de tu Esencia desde el fotograma 0
  if (uCon > 0.01) {
    for (let i = 0; i < NODOS_RED.length; i++) {
      const [ox, oy] = NODOS_RED[i];
      const escN = 0.85 + 0.15 * Math.sin(t * 2 + i);
      const nx = cx + ox * 0.86, ny = cy + oy * 0.86;
      g.save();
      g.globalCompositeOperation = "lighter";
      g.strokeStyle = `rgba(${PAL.champagneLightRgb},${0.6 * uCon})`;
      g.lineWidth = 6;
      g.beginPath();
      g.moveTo(cx, cy);
      g.lineTo(mez(cx, nx, uCon), mez(cy, ny, uCon));
      g.stroke();
      g.restore();

      k.estrellaTransparente(g, PALETA_CONEXION, nx, ny, 40 * escN * uCon, t * 0.5 + i, 0.35, uCon);
    }
  }

  // El núcleo central de tu Esencia
  const rNucleo = 152;
  const latNucleo =
    0.8 * k.pulso(t, Tcon + 0.05, 0.22) +
    0.85 * k.pulso(t, Tlug + 0.05, 0.25) +
    0.6 * k.pulso(t, Tlim + 0.08, 0.28);
  nucleoEsencia(g, cx, cy, rNucleo, t, {
    latido: latNucleo,
    grieta: 1,
    oroGrieta: 1,
  });
  k.fogonazo(g, cx, cy, t - Tcon, 1200, PAL.champagneLightRgb);

  // 3. El gran botón 3D «APARTA TU LUGAR ↓» ya presente abajo desde el inicio del plano y acercándose en «toca el botón»
  if (uBoton > 0.01) {
    const by = mez(1210, 1140, entra(tr(t, Ttoca - 0.25, Tbot + 0.2)));
    const pulsoClick =
      0.85 * k.pulso(t, Tbot + 0.06, 0.14) +
      1.0 * k.pulso(t, Tlug + 0.06, 0.16);

    // Piloto «EN VIVO · 2 DÍAS» encima del botón
    pilotoVivo(g, 540, by - 155, 22, 0.7 + 0.3 * Math.sin(t * 7), "EN VIVO · 2 DÍAS", 1);

    // Botón principal
    botonCTA(g, 540, by, pulsoClick, t, 1);
    k.fogonazo(g, 540, by, t - Tlug, 1350, PAL.champagneLightRgb);

    // Flechas luminosas apuntando hacia abajo (bajan cuando entra la barra de cupos para no solaparse nunca)
    const yFlechas = mez(by + 135, 1435, uCupos);
    g.save();
    g.globalAlpha = uBoton;
    g.globalCompositeOperation = "lighter";
    for (let i = 0; i < 2; i++) {
      const fy = yFlechas + i * 36 + Math.sin(t * 6 - i) * 7;
      g.strokeStyle = i === 0 ? PAL.champagneLight : PAL.lavender;
      g.lineWidth = 8;
      g.lineCap = "round";
      g.lineJoin = "round";
      g.beginPath();
      g.moveTo(505, fy - 16);
      g.lineTo(540, fy + 10);
      g.lineTo(575, fy - 16);
      g.stroke();
    }
    g.restore();

    // Barra visual de «los cupos son limitados» (8 asientos/lugares de los cuales 6 se reservan rápido y quedan 2 brillando)
    if (uCupos > 0.01) {
      const cyCupos = 1345;
      g.save();
      g.globalAlpha = uCupos;
      const nCupos = 8, cw = 72, gap = 16;
      const x0 = 540 - ((nCupos * cw + (nCupos - 1) * gap) / 2);

      for (let i = 0; i < nCupos; i++) {
        const x = x0 + i * (cw + gap);
        const tReserva = Tcup - 0.15 + i * 0.11;
        const ocupado = i < 6 ? su(tr(t, tReserva, tReserva + 0.18)) : 0;
        const libreBrilla = i >= 6 ? 0.7 + 0.3 * Math.sin(t * 8 + i) : 0;

        redondo(g, x, cyCupos - 24, cw, 48, 14);
        if (i >= 6) {
          k.brillo(g, x + cw / 2, cyCupos, 130, PAL.champagneRgb, 0.8 * libreBrilla);
          g.fillStyle = PAL.champagne;
          g.fill();
          g.strokeStyle = PAL.creamSoft;
          g.lineWidth = 3;
          g.stroke();
        } else {
          g.fillStyle = k.mezColor(PAL.champagne, PAL.aubergineSoft, ocupado);
          g.fill();
          g.strokeStyle = `rgba(${PAL.lavenderRgb},${0.6 - 0.35 * ocupado})`;
          g.lineWidth = 2.5;
          g.stroke();
        }
      }

      g.textAlign = "center";
      g.textBaseline = "middle";
      g.fillStyle = PAL.champagneLight;
      g.font = "800 34px Figtree";
      g.fillText("CUPOS LIMITADOS · ÚLTIMOS LUGARES", 540, cyCupos - 50);
      g.restore();
    }
  }

  vineta(g, 0.55);
  velo(g, 0.68);
}
