// Plano 09 (Frases 10 y 11):
// F10: «Envíaselo a ese amigo que está por vender o cambiar su celular viejo.»
// F11: «Y mañana, episodio cuatro: el engaño de las cámaras de 200 megapíxeles de noche.»
// Regresa al mosaico oscuro del Fotograma 0 con un viaje amplio de cámara (1.28 -> 1.0) para mantener acción viva,
// muestra el emblema de avión de papel, luego la insignia `MAÑANA · EP. 4` con un lente nocturno `200 MP`,
// y en los últimos 0.55 s aterriza exactamente en el Fotograma 0 de `01-papelera-chip.js`.
import * as k from "#kit";
import { v } from "#voz";
import {
  camino2D,
  capaSuperiorMarca,
  dibujarCelularGaleria,
  fondoMosaico,
  insigniaEpisodio,
  pildoraEstado,
  redondo,
  sinVista,
  vista,
  vineta,
} from "../mundo.js";

export const desde = (v) => v.frase(10).inicio - 0.04;

const { suave, tramo, entra, mez } = k;

function dibujarAvionCompartir(g, x, y, al, pulso) {
  if (al <= 0.01) return;
  g.save();
  g.translate(x, y);
  g.globalAlpha = al;

  for (let i = 0; i < 2; i++) {
    const f = ((pulso + i * 0.5) % 1 + 1) % 1;
    g.strokeStyle = `rgba(56, 189, 248, ${(1 - f) * 0.6})`;
    g.lineWidth = 4;
    g.beginPath();
    g.arc(0, 0, 74 + f * 96, 0, Math.PI * 2);
    g.stroke();
  }

  g.shadowColor = "rgba(14, 165, 233, 0.55)";
  g.shadowBlur = 32;
  g.fillStyle = "#0f172a";
  g.beginPath();
  g.arc(0, 0, 76, 0, Math.PI * 2);
  g.fill();
  g.shadowBlur = 0;
  g.strokeStyle = "#38bdf8";
  g.lineWidth = 4;
  g.stroke();

  g.fillStyle = "#e0f2fe";
  g.beginPath();
  g.moveTo(-34, 4);
  g.lineTo(34, -28);
  g.lineTo(8, 34);
  g.lineTo(-4, 10);
  g.closePath();
  g.fill();

  g.strokeStyle = "#0284c7";
  g.lineWidth = 3;
  g.beginPath();
  g.moveTo(34, -28);
  g.lineTo(-4, 10);
  g.stroke();
  g.restore();
}

function dibujarAdelantoCamara200(g, x, y, al, t) {
  if (al <= 0.01) return;
  g.save();
  g.translate(x, y);
  g.globalAlpha = al;

  g.shadowColor = "rgba(0, 0, 0, 0.68)";
  g.shadowBlur = 36;
  redondo(g, -260, -105, 520, 210, 28);
  g.fillStyle = "rgba(9, 15, 28, 0.95)";
  g.fill();
  g.shadowBlur = 0;
  g.strokeStyle = "#fbbf24";
  g.lineWidth = 3.5;
  g.stroke();

  // Anillo óptico de cámara nocturna a la izquierda
  const lx = -152;
  g.fillStyle = "#050914";
  g.beginPath();
  g.arc(lx, 0, 72, 0, Math.PI * 2);
  g.fill();
  g.strokeStyle = "#f59e0b";
  g.lineWidth = 6;
  g.stroke();

  // Cristal violeta/azul del objetivo con reflejo rotando
  const lg = g.createRadialGradient(lx - 18, -18, 6, lx, 0, 56);
  lg.addColorStop(0, "#60a5fa");
  lg.addColorStop(0.55, "#1e1b4b");
  lg.addColorStop(1, "#020617");
  g.fillStyle = lg;
  g.beginPath();
  g.arc(lx, 0, 54, 0, Math.PI * 2);
  g.fill();

  k.brillo(g, lx + Math.cos(t * 3) * 16, Math.sin(t * 3) * 16, 75, "250, 204, 21", 0.65);

  g.textAlign = "left";
  g.textBaseline = "middle";
  g.font = "800 32px Figtree";
  g.fillStyle = "#fde047";
  g.fillText("200 MP DE NOCHE", -52, -26);

  g.font = "700 23px Figtree";
  g.fillStyle = "#cbd5e1";
  g.fillText("¿Por qué 48 MP puede ganarle?", -52, 24);
  g.restore();
}

export function dibuja(g, t) {
  const f10 = v.frase(10);
  const f11 = v.frase(11);
  const t0 = f10.inicio - 0.04;
  const tFin = v.duracion;

  const tAmigo = f10.t("amigo");
  const tManana = f11.t("mañana");
  const t200 = f11.t("200");

  const uLoop = suave(tramo(t, tFin - 0.58, tFin - 0.04));

  // Viaje amplio de cámara para mantener movimiento fluido en 47-51 s y aterrizar exacto en [1.0, 540, 960]
  const cam = camino2D([
    [t0, [1.28, 540, 1225]],
    [tAmigo + 0.5, [1.14, 540, 1095]],
    [tManana, [1.03, 540, 980]],
    [tFin - 0.45, [1.0, 540, 960]],
    [tFin, [1.0, 540, 960]],
  ]);
  const [Z, cx, cy] = cam(t);

  // Desplazamiento periódico exacto (1 baldosa de 270 px) para loop invisible al Fotograma 0 sin rebobinado brusco
  const progPlano = tramo(t, t0, tFin);
  const dxMos = -progPlano * 270;
  const dyMos = progPlano * 270;
  const tLuz = Math.sin(progPlano * Math.PI) * 2.4;
  fondoMosaico(g, tLuz, dxMos, dyMos, "47, 124, 246", 0.32);

  g.save();
  vista(g, Z, cx, cy);

  // Durante F10 mostramos el chip en rayos X protegido y luego cerramos rayos X hacia Fotograma 0 exacto
  const rx = (1 - suave(tramo(t, tManana - 0.2, tManana + 0.35))) * 0.85;
  dibujarCelularGaleria(g, 540, 1055, 550, 960, {
    borradaArriba: 0,
    rayosX: rx,
    fotoEnChip: 0,
    alertaChip: false,
    t: tLuz,
  });

  g.restore();

  sinVista(g);

  // Fase F10: Compartir con el amigo que va a vender su celular
  const alShare = entra(tramo(t, t0 + 0.08, t0 + 0.32)) * (1 - suave(tramo(t, f11.inicio - 0.28, f11.inicio - 0.04)));
  dibujarAvionCompartir(g, 540, 650, alShare, (t - t0) * 0.95);
  pildoraEstado(g, 540, 1705, "ENVÍASELO AL AMIGO QUE VA A VENDER SU CELULAR", "56, 189, 248", alShare, 34);

  // Fase F11: Insignia `MAÑANA · EP. 4` + tarjeta de lente 200 MP
  const alEp4 = entra(tramo(t, tManana - 0.08, tManana + 0.22)) * (1 - uLoop);
  const escEp4 = 0.9 + 0.1 * entra(tramo(t, tManana - 0.08, tManana + 0.26));
  insigniaEpisodio(
    g,
    540,
    665,
    "MAÑANA · MITOS DE TU CELULAR",
    "EP. 4",
    "EL ENGAÑO DE LOS 200 MEGAPÍXELES",
    "#FBBF24",
    alEp4,
    escEp4
  );

  const alCam = entra(tramo(t, t200 - 0.45, t200 + 0.1)) * (1 - uLoop);
  dibujarAdelantoCamara200(g, 540, 1625, alCam, t);

  vineta(g, 0.55);
  capaSuperiorMarca(g, 0.62);
}
