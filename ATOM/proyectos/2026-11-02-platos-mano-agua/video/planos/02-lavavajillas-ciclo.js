import * as k from "#kit";
import { v } from "#voz";
import { dibujarPlato } from "../mundo.js";

export const desde = v.frase(3).inicio;

const T12 = v.frase(3).t("12");
const Trecicla = v.frase(3).t("recicla");

export function dibuja(g, t) {
  const uEntra = k.entra(k.tramo(t, desde, T12 + 0.15));
  const uCiclo = k.suave(k.tramo(t, T12, Trecicla + 0.6));

  k.fondoClaro(g, { tono: "185,235,215", luz: [540, 880], fuerza: 1.15 });

  const cx = 540, cy = 1040, w = 680, h = 680;
  k.sombraSuave(g, cx, cy + h / 2 + 55, 680, 74, 0.25);

  g.save();
  k.redondo(g, cx - w / 2, cy - h / 2, w, h, 48);
  g.fillStyle = "#ffffff";
  g.fill();
  g.strokeStyle = "#10b981";
  g.lineWidth = 7;
  g.stroke();

  const hAgua = Math.max(40, 145 * uEntra);
  k.redondo(g, cx - w / 2 + 20, cy + h / 2 - 20 - hAgua, w - 40, hAgua, 32);
  const ga = g.createLinearGradient(0, cy + h / 2 - 160, 0, cy + h / 2);
  ga.addColorStop(0, "#38bdf8");
  ga.addColorStop(1, "#0284c7");
  g.fillStyle = ga;
  g.fill();

  dibujarPlato(g, cx - 150, cy - 70, 105);
  dibujarPlato(g, cx + 150, cy - 70, 105);

  if (uCiclo > 0.02) {
    g.save();
    g.globalAlpha = uCiclo;
    g.translate(cx, cy - 10);
    g.rotate(t * 2.2);
    g.strokeStyle = "#059669";
    g.lineWidth = 14;
    g.lineCap = "round";
    for (let a = 0; a < 2; a++) {
      const ini = a * Math.PI + 0.25;
      const fin = ini + Math.PI * 0.65;
      g.beginPath();
      g.arc(0, 0, 225, ini, fin);
      g.stroke();
    }
    g.restore();
  }

  k.redondo(g, cx - w / 2, cy - h / 2, w, h, 48);
  k.vidrio(g, cx - w / 2, cx + w / 2);

  k.redondo(g, cx - 300, cy + h / 2 + 75, 600, 96, 28);
  g.fillStyle = "#059669";
  g.fill();
  g.fillStyle = "#ffffff";
  g.font = "800 38px Figtree";
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.fillText("SOLO 12 L · CIRCUITO CERRADO", cx, cy + h / 2 + 123);
  g.restore();
}
