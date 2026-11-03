// «Tu cerebro consume la quinta parte de toda tu energia.»
// El sitio: el cerebro solo, en lo oscuro, latiendo y soltando calor. La cámara entra despacio todo el plano.
// - «Tu cerebro»: está ahí desde el fotograma 0, grande y caliente.
// - «la quinta»: el anillo de toda tu energía se cierra alrededor y se enciende un quinto de él (72°), con su 1/5.
// - «de toda tu energia»: el resto del anillo se ve entero, apagado, para que se compare con lo encendido.
import * as k from "#kit";
import { v } from "#voz";
import { cerebro } from "../mundo.js";

export const desde = 0;

const f1 = v.frase(1);
const Tquinta = f1.t("quinta"), Tparte = f1.t("parte"), Ttoda = f1.t("toda"), Tenergia = f1.t("energia");
const CX = 540, CY = 1130;

export function dibuja(g, t) {
  g.fillStyle = k.CINE.fondo;
  g.fillRect(0, 0, 1080, 1920);
  const bg = g.createRadialGradient(CX, CY, 120, CX, CY, 1150);
  bg.addColorStop(0, "rgba(58,30,20,0.85)");
  bg.addColorStop(1, "rgba(8,7,9,0)");
  g.fillStyle = bg;
  g.fillRect(0, 0, 1080, 1920);

  const zoom = k.de(t, 0, 3.8, 1, 1.09);
  g.save();
  g.translate(CX, CY);
  g.scale(zoom, zoom);
  g.translate(-CX, -CY);

  // el anillo de toda tu energía: llega cerrándose con «la quinta»
  const RA = 430, cierra = k.suave(k.tramo(t, Tquinta - 0.30, Tquinta + 0.10));
  const total = k.suave(k.tramo(t, Ttoda - 0.10, Tenergia + 0.25));
  if (cierra > 0.01) {
    g.save();
    g.lineWidth = 26;
    g.lineCap = "butt";
    g.strokeStyle = `rgba(241,236,232,${(0.10 + 0.17 * total) * cierra})`;
    g.beginPath();
    g.arc(CX, CY, RA, 0, Math.PI * 2 * cierra);
    g.stroke();

    // el quinto encendido: se llena entre «quinta» y «parte»
    const u = k.suave(k.tramo(t, Tquinta, Tparte + 0.14));
    if (u > 0.004) {
      g.strokeStyle = `rgba(${k.CINE.ambarRgb},0.97)`;
      g.lineWidth = 30;
      g.lineCap = "round";
      g.beginPath();
      g.arc(CX, CY, RA, -Math.PI / 2, -Math.PI / 2 + (Math.PI * 2 / 5) * u);
      g.stroke();
      const ang = -Math.PI / 2 + (Math.PI * 2 / 5) * u;
      k.brillo(g, CX + Math.cos(ang) * RA, CY + Math.sin(ang) * RA, 230, "sodio", 0.75 * u);
    }
    g.restore();
  }

  cerebro(g, CX, CY, 268, t, 0.75 + 0.45 * k.tramo(t, Tquinta, Tparte));
  g.restore();

  // el 1/5, debajo del anillo, donde no tapa el trozo encendido
  const et = k.suave(k.tramo(t, Tquinta + 0.12, Tquinta + 0.42));
  if (et > 0.01) k.pastilla(g, 540, 1706, "1/5", "de tu energia", k.CINE.ambarRgb, et, 124);

  k.vineta(g, 0.72);
  k.grano(g, t, 0.055);
}
