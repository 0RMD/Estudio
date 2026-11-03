import * as k from "#kit";
import { v } from "#voz";
import { dibujarPlato } from "../mundo.js";

export const desde = 0;

const T4 = v.frase(1).t("4");
const Tagua = v.frase(1).t("agua");
const Tf2 = v.frase(2).inicio;
const T50 = v.frase(2).t("50");
const Tdesague = v.frase(2).t("desague");

export function dibuja(g, t) {
  const uX4 = k.entra(k.tramo(t, T4 - 0.1, Tagua + 0.2));
  const uBaja = k.suave(k.tramo(t, Tf2 - 0.1, Tf2 + 0.65));
  const uLitros = k.suave(k.tramo(t, Tf2, Tdesague));

  k.fondoClaro(g, {
    tono: uBaja > 0.5 ? "255,205,195" : "185,225,255",
    luz: [540, 820],
    fuerza: 1.15,
  });

  // Grifo metálico arriba al centro
  const gy = 620 - uBaja * 80;
  g.save();
  k.redondo(g, 490, gy, 100, 95, 22);
  k.metal(g, 490, 590);
  k.redondo(g, 380, gy - 45, 320, 52, 24);
  k.metal(g, 380, 700);
  g.restore();

  // Chorro de agua azul corriendo sin parar hacia abajo
  g.save();
  const gradAgua = g.createLinearGradient(500, gy + 90, 580, 1480);
  gradAgua.addColorStop(0, "#38bdf8");
  gradAgua.addColorStop(0.5, "#0284c7");
  gradAgua.addColorStop(1, "#0369a1");
  g.fillStyle = gradAgua;
  g.fillRect(508, gy + 88, 64, 1420 - (gy + 88));

  // Líneas de caudal bajando rápido
  g.strokeStyle = "rgba(255,255,255,0.65)";
  g.lineWidth = 6;
  g.lineCap = "round";
  for (let i = 0; i < 6; i++) {
    const fy = ((t * 580 + i * 130) % 680) + gy + 100;
    const fx = 524 + (i % 3) * 16;
    g.beginPath();
    g.moveTo(fx, fy);
    g.lineTo(fx, fy + 55);
    g.stroke();
  }
  g.restore();

  // Platos blancos a los lados
  dibujarPlato(g, 310, 1040 - uBaja * 90, 125);
  dibujarPlato(g, 770, 1040 - uBaja * 90, 125);

  // Etiqueta X4 MÁS AGUA en la frase 1
  if (uX4 > 0.01 && uBaja < 0.85) {
    g.save();
    g.globalAlpha = uX4 * (1 - uBaja);
    g.translate(540, 1040);
    k.redondo(g, -210, -64, 420, 128, 34);
    g.fillStyle = "#dc2626";
    g.fill();
    g.fillStyle = "#ffffff";
    g.font = "800 58px Figtree";
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.fillText("4X MÁS AGUA", 0, 2);
    g.restore();
  }

  // Desagüe abajo y contador subiendo a 50 LITROS en la frase 2
  k.sombraSuave(g, 540, 1445, 520, 90, 0.28);
  g.fillStyle = "#1e293b";
  g.beginPath();
  g.ellipse(540, 1430, 220, 48, 0, 0, Math.PI * 2);
  g.fill();
  g.strokeStyle = "#38bdf8";
  g.lineWidth = 7;
  g.beginPath();
  g.ellipse(540, 1430, 150 + Math.sin(t * 12) * 14, 28, 0, 0, Math.PI * 2);
  g.stroke();

  if (uBaja > 0.1) {
    const litros = Math.round(12 + uLitros * 38);
    g.save();
    g.globalAlpha = uBaja;
    k.redondo(g, 240, 1520, 600, 118, 30);
    g.fillStyle = "#dc2626";
    g.fill();
    g.fillStyle = "#ffffff";
    g.font = "800 52px Figtree";
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.fillText(`${litros} LITROS AL DESAGÜE`, 540, 1579);
    g.restore();
  }
}
