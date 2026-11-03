import * as k from "#kit";
import { v } from "#voz";
import { dibujarTaza } from "../mundo.js";

export const desde = 0;

const Tdespiertas = v.frase(1).t("despiertas");
const Tsueño = v.frase(1).t("sueno");
const Tmediodia = v.frase(1).t("mediodia");
const Tf2 = v.frase(2).inicio;
const Tenciende = v.frase(2).t("enciende");
const Tpico = v.frase(2).t("pico");
const Tenergia = v.frase(2).t("energia");

export function dibuja(g, t) {
  const subeCam = k.suave(k.tramo(t, Tf2 - 0.15, Tf2 + 0.75));
  const bajaSueno = k.suave(k.tramo(t, Tsueño - 0.1, Tmediodia + 0.25));

  const tonoLuz = subeCam > 0.5 ? "190,235,215" : bajaSueno > 0.5 ? "255,205,195" : "255,228,180";
  k.fondoClaro(g, { tono: tonoLuz, luz: [540, 860 - subeCam * 60], fuerza: 1.15 });

  // Taza de café abajo a la izquierda
  const yTaza = 1260 + subeCam * 220;
  const escTaza = 1.05 - subeCam * 0.22;
  dibujarTaza(g, 340 - subeCam * 60, yTaza, escTaza, t);

  // Reloj arriba a la izquierda (en zona segura y >= 760)
  const uSol = k.entra(k.tramo(t, 0, Tdespiertas + 0.3));
  const opReloj = 1 - subeCam * 0.85;
  if (opReloj > 0.02) {
    g.save();
    g.globalAlpha = opReloj * uSol;
    const rx = 340, ry = 800 - (1 - uSol) * 60;
    k.sombraSuave(g, rx, ry + 135, 220, 36, 0.18);
    g.fillStyle = bajaSueno > 0.5 ? "#fee2e2" : "#fef3c7";
    g.strokeStyle = bajaSueno > 0.5 ? "#ef4444" : "#f59e0b";
    g.lineWidth = 8;
    g.beginPath();
    g.arc(rx, ry, 105, 0, Math.PI * 2);
    g.fill();
    g.stroke();

    const angHora = -Math.PI * 0.4 + bajaSueno * Math.PI * 0.9;
    const angMin = -Math.PI * 0.5 + bajaSueno * Math.PI * 4;
    g.strokeStyle = "#111317";
    g.lineCap = "round";
    g.lineWidth = 9;
    g.beginPath();
    g.moveTo(rx, ry);
    g.lineTo(rx + Math.cos(angHora) * 54, ry + Math.sin(angHora) * 54);
    g.stroke();
    g.lineWidth = 6;
    g.beginPath();
    g.moveTo(rx, ry);
    g.lineTo(rx + Math.cos(angMin) * 76, ry + Math.sin(angMin) * 76);
    g.stroke();

    k.redondo(g, rx - 110, ry + 130, 220, 58, 18);
    g.fillStyle = bajaSueno > 0.5 ? "#ef4444" : "#f59e0b";
    g.fill();
    g.fillStyle = "#ffffff";
    g.font = "800 32px Figtree";
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.fillText(bajaSueno > 0.5 ? "12:00 PM" : "07:00 AM", rx, ry + 159);
    g.restore();
  }

  // Batería grande (en zona segura y >= 680 para nunca tocar los subtítulos)
  const cargaNatural = k.suave(k.tramo(t, Tenciende - 0.1, Tenergia + 0.2));
  const nivel = subeCam < 0.5
    ? 0.85 - bajaSueno * 0.71
    : 0.14 + cargaNatural * 0.86;

  const bx = 740 - subeCam * 180;
  const by = 1020 - subeCam * 40;
  const bw = 250 + subeCam * 70;
  const bh = 460 + subeCam * 40;

  k.sombraSuave(g, bx, by + bh / 2 + 55, bw * 1.15, 54, 0.24);

  g.save();
  k.redondo(g, bx - 55, by - bh / 2 - 28, 110, 32, 10);
  k.metal(g, bx - 55, bx + 55);

  k.redondo(g, bx - bw / 2, by - bh / 2, bw, bh, 42);
  g.fillStyle = "#eef2f8";
  g.fill();
  g.strokeStyle = "rgba(15,23,42,0.16)";
  g.lineWidth = 5;
  g.stroke();

  const pad = 18;
  const maxH = bh - pad * 2;
  const curH = Math.max(40, maxH * nivel);
  const esRojo = nivel < 0.35;
  k.redondo(g, bx - bw / 2 + pad, by + bh / 2 - pad - curH, bw - pad * 2, curH, 28);
  const gradE = g.createLinearGradient(0, by - bh / 2, 0, by + bh / 2);
  if (esRojo) {
    gradE.addColorStop(0, "#f87171");
    gradE.addColorStop(1, "#dc2626");
  } else {
    gradE.addColorStop(0, "#34d399");
    gradE.addColorStop(1, "#059669");
  }
  g.fillStyle = gradE;
  g.fill();

  k.redondo(g, bx - bw / 2, by - bh / 2, bw, bh, 42);
  k.vidrio(g, bx - bw / 2, bx + bw / 2);
  k.reflejo(g, bx + bw / 2 - 42, by - bh / 2 + 36, 16, bh - 72, 0.65);

  // Porcentaje grande debajo o dentro de la batería (lejos de subtítulos)
  const pct = Math.round(nivel * 100);
  g.fillStyle = "#111317";
  g.font = "800 64px Figtree";
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.fillText(`${pct}%`, bx, by - bh / 2 - 64);

  if (subeCam > 0.2) {
    g.globalAlpha = subeCam;
    const pulsoPico = 1 + 0.05 * k.pulso(t, Tpico, 0.25);
    g.save();
    g.translate(bx, by + bh / 2 + 125);
    g.scale(pulsoPico, pulsoPico);
    k.redondo(g, -280, -46, 560, 92, 24);
    g.fillStyle = "#059669";
    g.fill();
    g.fillStyle = "#ffffff";
    g.font = "800 36px Figtree";
    g.fillText("PICO NATURAL DE ENERGÍA", 0, 2);
    g.restore();
  }
  g.restore();
}
