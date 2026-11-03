import * as k from "#kit";
import { v } from "#voz";
import { dibujarTarjetaAlarma } from "../mundo.js";

export const desde = v.frase(4).inicio;

const Tsola = v.frase(4).t("sola");
const Tdiez = v.frase(4).t("diez");

export function dibuja(g, t) {
  k.fondoClaro(g, { tono: "185,235,215", luz: [540, 860], fuerza: 1.15 });

  const uSola = k.entra(k.tramo(t, desde, Tsola + 0.25));
  const uDiez = k.entra(k.tramo(t, Tdiez - 0.35, Tdiez + 0.25));

  g.save();
  g.translate(540, 740);
  g.scale(0.85 + 0.15 * uSola, 0.85 + 0.15 * uSola);
  dibujarTarjetaAlarma(g, -350, -75, 700, 150, "07:00 AM · ÚNICA", true, false);
  g.restore();

  const horas = ["07:05 AM", "07:10 AM", "07:15 AM", "07:20 AM"];
  horas.forEach((h, i) => {
    const uItem = k.entra(k.tramo(t, desde + 0.6 + i * 0.12, desde + 1.1 + i * 0.12));
    if (uItem <= 0.01) return;
    g.save();
    g.globalAlpha = uItem * 0.92;
    dibujarTarjetaAlarma(g, 220, 960 + i * 145, 640, 118, h, false, uDiez > 0.2);
    g.restore();
  });
}
