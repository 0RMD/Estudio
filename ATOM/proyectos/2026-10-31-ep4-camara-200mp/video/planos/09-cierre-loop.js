// Plano 09 (Frases 10 y 11 · Cierre de Temporada):
// F10: «Envíaselo a ese amigo que compra celular mirando solo cuántos megapíxeles dice la caja.»
// F11: «Y entra a mi perfil para ver los cuatro episodios completos de Mitos de tu Celular.»
// Regresa al mosaico oscuro del Fotograma 0 con viaje continuo de cámara (1.24 -> 1.0), emblema de compartir,
// luego tarjeta especial de cierre de serie `EN MI PERFIL · EP. 1 AL 4` con las 4 cápsulas de la temporada,
// y retorno periódico exacto (1 baldosa de 270 px) al Fotograma 0 de `01-duelo-noche.js`.
import * as k from "#kit";
import { v } from "#voz";
import {
  camino2D,
  capaSuperiorMarca,
  dibujarCelularCamara,
  fondoMosaico,
  insigniaEpisodio,
  pildoraEstado,
  redondo,
  sinVista,
  vista,
  vineta,
} from "../mundo.js";

export const desde = (v) => v.frase(10).inicio - 0.04;

const { suave, tramo, entra } = k;

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

function dibujarResumenSerie(g, x, y, al) {
  if (al <= 0.01) return;
  g.save();
  g.translate(x, y);
  g.globalAlpha = al;

  g.shadowColor = "rgba(0, 0, 0, 0.7)";
  g.shadowBlur = 36;
  redondo(g, -430, -92, 860, 184, 28);
  g.fillStyle = "rgba(9, 15, 28, 0.96)";
  g.fill();
  g.shadowBlur = 0;
  g.strokeStyle = "#22e39b";
  g.lineWidth = 3.5;
  g.stroke();

  const eps = [
    { n: "EP. 1", tit: "WiFi oculto", col: "#38bdf8" },
    { n: "EP. 2", tit: "Cable barato", col: "#fb923c" },
    { n: "EP. 3", tit: "Fotos en chip", col: "#22e39b" },
    { n: "EP. 4", tit: "200 MP noche", col: "#fbbf24" },
  ];

  eps.forEach((ep, idx) => {
    const ex = -312 + idx * 208;
    redondo(g, ex - 92, -62, 184, 124, 18);
    g.fillStyle = "#131f33";
    g.fill();
    g.strokeStyle = ep.col;
    g.lineWidth = 2.5;
    g.stroke();

    g.textAlign = "center";
    g.textBaseline = "middle";
    g.font = "800 26px Figtree";
    g.fillStyle = ep.col;
    g.fillText(ep.n, ex, -22);

    g.font = "700 20px Figtree";
    g.fillStyle = "#e2e8f0";
    g.fillText(ep.tit, ex, 24);
  });

  g.restore();
}

export function dibuja(g, t) {
  const f10 = v.frase(10);
  const f11 = v.frase(11);
  const t0 = f10.inicio - 0.04;
  const tFin = v.duracion;

  const tAmigo = f10.t("amigo");
  const tPerfil = f11.t("perfil");
  const tCuatro = f11.t("cuatro");

  const uLoop = suave(tramo(t, tFin - 0.58, tFin - 0.04));

  const cam = camino2D([
    [t0, [1.24, 540, 1185]],
    [tAmigo + 0.6, [1.11, 540, 1075]],
    [f11.inicio, [1.03, 540, 980]],
    [tFin - 0.45, [1.0, 540, 960]],
    [tFin, [1.0, 540, 960]],
  ]);
  const [Z, cx, cy] = cam(t);

  // Desplazamiento periódico exacto (1 baldosa de 270 px) hacia el Fotograma 0 de 01-duelo-noche.js
  const progPlano = tramo(t, t0, tFin);
  const dxMos = -progPlano * 270;
  const dyMos = progPlano * 270;
  const tLuz = Math.sin(progPlano * Math.PI) * 2.4;
  fondoMosaico(g, tLuz, dxMos, dyMos, "47, 124, 246", 0.32);

  g.save();
  vista(g, Z, cx, cy);

  // Durante F10 se ven los veredictos y en F11 regresan suavemente al estado inicial (disparo = 0, ruido = 0.2)
  const uReset = suave(tramo(t, f11.inicio, tFin - 0.3));
  const disp = 1 - uReset;

  dibujarCelularCamara(g, 295, 1165, 420, 780, {
    etiquetaMP: "200 MP",
    esGanador: false,
    disparo: disp,
    flash: 0,
    ruido: 0.2 + 0.6 * disp,
    veredicto: "OSCURA Y CON RUIDO",
    t: tLuz,
  });

  dibujarCelularCamara(g, 785, 1165, 420, 780, {
    etiquetaMP: "48 MP",
    esGanador: true,
    disparo: disp,
    flash: 0,
    ruido: 0,
    veredicto: "CLARA Y NÍTIDA",
    t: tLuz,
  });

  g.restore();

  sinVista(g);

  // Fase F10: Emblema de compartir al amigo fan de los megapíxeles
  const alShare = entra(tramo(t, t0 + 0.08, t0 + 0.32)) * (1 - suave(tramo(t, f11.inicio - 0.28, f11.inicio - 0.04)));
  dibujarAvionCompartir(g, 540, 650, alShare, (t - t0) * 0.95);
  pildoraEstado(g, 540, 1710, "ENVÍASELO AL AMIGO QUE MIRA SOLO LOS MEGAPÍXELES", "56, 189, 248", alShare, 33);

  // Fase F11: Insignia de serie completa + fila de los 4 episodios en el perfil
  const alSerie = entra(tramo(t, f11.inicio, tPerfil + 0.15)) * (1 - uLoop);
  const escSerie = 0.9 + 0.1 * entra(tramo(t, f11.inicio, tPerfil + 0.2));
  insigniaEpisodio(
    g,
    540,
    665,
    "SERIE COMPLETA EN MI PERFIL",
    "EP. 1–4",
    "MITOS DE TU CELULAR · 4 EPISODIOS",
    "#22E39B",
    alSerie,
    escSerie
  );

  const alFila = entra(tramo(t, tCuatro - 0.25, tCuatro + 0.2)) * (1 - uLoop);
  dibujarResumenSerie(g, 540, 1645, alFila);

  vineta(g, 0.55);
  capaSuperiorMarca(g, 0.62);
}
