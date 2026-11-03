import * as k from "#kit";
import { v } from "#voz";
import { dibujarTaza } from "../mundo.js";

export const desde = v.frase(4).inicio;

const Tdespertar = v.frase(4).t("despertar");
const Tenviaselo = v.frase(4).t("enviaselo");

export function dibuja(g, t) {
  k.fondoClaro(g, { tono: "185,235,215", luz: [540, 820], fuerza: 1.15 });

  const uArco = k.suave(k.tramo(t, desde, Tdespertar + 0.1));
  const uCierre = k.entra(k.tramo(t, Tenviaselo - 0.1, Tenviaselo + 0.35));

  const cx = 540, cy = 830, rad = 185;
  k.sombraSuave(g, cx, cy + rad + 45, 340, 56, 0.22);

  g.save();
  g.fillStyle = "#ffffff";
  g.strokeStyle = "#e2e8f0";
  g.lineWidth = 22;
  g.beginPath();
  g.arc(cx, cy, rad, 0, Math.PI * 2);
  g.fill();
  g.stroke();

  g.strokeStyle = "#10b981";
  g.lineWidth = 24;
  g.lineCap = "round";
  g.beginPath();
  g.arc(cx, cy, rad, -Math.PI / 2, -Math.PI / 2 + Math.max(0.15, uArco) * Math.PI * 1.5);
  g.stroke();

  g.fillStyle = "#111317";
  g.font = "800 72px Figtree";
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.fillText("+90 MIN", cx, cy - 10);
  g.fillStyle = "#059669";
  g.font = "700 30px Figtree";
  g.fillText("ESPERA AL DESPERTAR", cx, cy + 52);
  g.restore();

  dibujarTaza(g, 540, 1290, 0.92, t);

  if (uCierre > 0.01) {
    g.save();
    g.globalAlpha = uCierre;
    g.translate(540, 1580 - (1 - uCierre) * 40);
    k.redondo(g, -330, -48, 660, 96, 26);
    g.fillStyle = "#111317";
    g.fill();
    g.fillStyle = "#ffffff";
    g.font = "800 36px Figtree";
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.fillText("ENERGÍA ESTABLE TODO EL DÍA", 0, 2);
    g.restore();
  }
}
