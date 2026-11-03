// «Pesa poco, pero gasta como una bombilla encendida todo el dia.» + «Cuando piensas mucho, no gasta mucho mas.»
// Otro sitio: un cuarto a oscuras con una bombilla colgando. Un solo plano: no se corta, la cámara se aleja para
// que quepan las dos barras cuando la voz pasa a lo de pensar.
// - «bombilla»: se enciende de golpe y se queda encendida; su luz llena el cuarto.
// - «todo el dia»: el reloj de la pared da la vuelta entera mientras la bombilla sigue igual.
// - «piensas mucho»: entran las dos barras, en reposo y pensando, las dos casi llenas.
// - «mas»: la de pensar sube un pelo y se queda ahí: la diferencia es mínima, y se ve que lo es.
import * as k from "#kit";
import { v } from "#voz";
import { bombilla, barra } from "../mundo.js";

export const desde = "Pesa";
export const entrada = "corte";

const f2 = v.frase(2), f3 = v.frase(3);
const Tbombilla = f2.t("bombilla"), Ttodo = f2.t("todo"), Tdia = f2.t("dia");
const Tpiensas = f3.t("piensas"), Tmas = f3.t("mas");
const BX = 540, BY = 790;

export function dibuja(g, t) {
  const enc = k.suave(k.tramo(t, Tbombilla - 0.05, Tbombilla + 0.16));
  const aleja = k.de(t, Tpiensas - 0.2, Tpiensas + 0.6, 1, 0.84);

  g.fillStyle = "#07070a";
  g.fillRect(0, 0, 1080, 1920);
  // la pared, que solo se ve cuando hay luz
  const pared = g.createLinearGradient(0, 380, 0, 1920);
  pared.addColorStop(0, `rgba(48,38,31,${0.20 + 0.72 * enc})`);
  pared.addColorStop(1, `rgba(14,11,10,${0.3 + 0.3 * enc})`);
  g.fillStyle = pared;
  g.fillRect(0, 0, 1080, 1920);

  g.save();
  g.translate(BX, BY);
  g.scale(aleja, aleja);
  g.translate(-BX, -BY);

  // el cable
  g.strokeStyle = `rgba(30,26,22,${0.55 + 0.4 * enc})`;
  g.lineWidth = 11;
  g.beginPath();
  g.moveTo(BX, 0);
  g.lineTo(BX, BY - 240);
  g.stroke();

  // el reloj de la pared: da la vuelta entera en «todo el dia»
  const rel = k.suave(k.tramo(t, Ttodo - 0.25, Ttodo + 0.05));
  if (rel > 0.01 && enc > 0.05) {
    const rx = 858, ry = 690, rr = 86;
    g.save();
    g.globalAlpha = rel * 0.9;
    g.beginPath();
    g.arc(rx, ry, rr, 0, Math.PI * 2);
    g.fillStyle = "rgba(24,20,17,0.92)";
    g.fill();
    g.strokeStyle = `rgba(${k.CINE.ambarRgb},0.75)`;
    g.lineWidth = 7;
    g.stroke();
    const vuelta = k.suave(k.tramo(t, Ttodo, Tdia + 0.30)) * Math.PI * 2;
    for (const [largo, giro, ancho] of [[rr * 0.55, vuelta, 8], [rr * 0.78, vuelta * 12, 5]]) {
      g.strokeStyle = "rgba(241,236,232,0.9)";
      g.lineWidth = ancho;
      g.lineCap = "round";
      g.beginPath();
      g.moveTo(rx, ry);
      g.lineTo(rx + Math.sin(giro) * largo, ry - Math.cos(giro) * largo);
      g.stroke();
    }
    g.restore();
  }

  bombilla(g, BX, BY, 1.45, enc);
  g.restore();

  // las dos barras: el gasto en reposo y el gasto pensando
  const b = k.suave(k.tramo(t, Tpiensas - 0.05, Tpiensas + 0.35));
  if (b > 0.01) {
    g.save();
    g.globalAlpha = b;
    const W = 700, X = 190;
    barra(g, X, 1452, W, 54, 0.78, "En reposo", k.CINE.ambarRgb);
    const sube = k.suave(k.tramo(t, Tmas - 0.06, Tmas + 0.34));
    barra(g, X, 1626, W, 54, 0.78 + 0.035 * sube, "Pensando a tope", "232,131,58");
    // la diferencia, marcada: una llave finita entre las dos puntas
    if (sube > 0.3) {
      const x0 = X + W * 0.78, x1 = X + W * (0.78 + 0.035 * sube);
      g.strokeStyle = "rgba(241,236,232,0.75)";
      g.lineWidth = 4;
      g.beginPath();
      g.moveTo(x0, 1712);
      g.lineTo(x1, 1712);
      g.stroke();
      g.font = "600 36px Figtree";
      g.fillStyle = "rgba(241,236,232,0.7)";
      g.fillText("casi nada", x0 - 62, 1768);
    }
    g.restore();
  }

  k.vineta(g, 0.66);
  k.grano(g, t, 0.055);
}
