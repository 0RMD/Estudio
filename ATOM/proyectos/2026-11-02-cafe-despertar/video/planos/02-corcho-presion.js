import * as k from "#kit";
import { v } from "#voz";

export const desde = v.frase(3).inicio;

const Ttapa = v.frase(3).t("tapa");
const Tcorcho = v.frase(3).t("corcho");
const Tmediodia = v.frase(3).t("mediodia");
const Tsalta = v.frase(3).t("salta");

export function dibuja(g, t) {
  const uCorcho = k.entra(k.tramo(t, desde, Tcorcho + 0.05));
  const uPresion = k.suave(k.tramo(t, Ttapa, Tmediodia));
  const uSalta = k.entra(k.tramo(t, Tsalta - 0.06, Tsalta + 0.45));

  k.fondoClaro(g, {
    tono: uSalta > 0.1 ? "255,195,195" : "210,225,255",
    luz: [540, 960],
    fuerza: 1.15,
  });

  const cx = 540, cy = 1160, tw = 400, th = 540;
  k.sombraSuave(g, cx, cy + th / 2 + 55, 440, 70, 0.26);

  g.save();
  k.redondo(g, cx - tw / 2, cy - th / 2, tw, th, 46);
  g.fillStyle = "#eef2f9";
  g.fill();
  g.strokeStyle = "rgba(15,23,42,0.18)";
  g.lineWidth = 6;
  g.stroke();

  const nBolas = 12;
  for (let i = 0; i < nBolas; i++) {
    const col = i % 3;
    const fila = Math.floor(i / 3);
    const temblor = (1 - uSalta) * uPresion * Math.sin(t * 28 + i * 2) * 8;
    const bx = cx - 105 + col * 105 + (fila % 2) * 18 + temblor + uSalta * (col - 1) * 150;
    const byBase = cy + 180 - fila * 84 - uPresion * 22;
    const by = byBase - uSalta * (190 + fila * 38);
    const rad = 42;

    const bg = g.createRadialGradient(bx - 12, by - 14, 6, bx, by, rad);
    bg.addColorStop(0, "#c084fc");
    bg.addColorStop(0.65, "#7c3aed");
    bg.addColorStop(1, "#4c1d95");
    g.fillStyle = bg;
    g.beginPath();
    g.arc(bx, by, rad, 0, Math.PI * 2);
    g.fill();
  }

  // Corcho gigante "CAFEÍNA" que tapona el tubo y luego salta
  const yCorcho = (cy - th / 2 - 120) + uCorcho * 145 - uSalta * 220;
  const rotCorcho = uSalta * 0.35;
  g.save();
  g.translate(cx + uSalta * 80, yCorcho);
  g.rotate(rotCorcho);

  g.beginPath();
  g.moveTo(-185, -72);
  g.lineTo(185, -72);
  g.lineTo(155, 72);
  g.lineTo(-155, 72);
  g.closePath();
  const gc = g.createLinearGradient(-185, -72, 185, 72);
  gc.addColorStop(0, "#f59e0b");
  gc.addColorStop(0.6, "#d97706");
  gc.addColorStop(1, "#92400e");
  g.fillStyle = gc;
  g.fill();
  g.strokeStyle = "#78350f";
  g.lineWidth = 5;
  g.stroke();

  g.fillStyle = "#ffffff";
  g.font = "800 36px Figtree";
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.fillText("CORCHO · CAFEÍNA", 0, 0);
  g.restore();

  k.redondo(g, cx - tw / 2, cy - th / 2, tw, th, 46);
  k.vidrio(g, cx - tw / 2, cx + tw / 2);
  k.reflejo(g, cx + tw / 2 - 44, cy - th / 2 + 40, 18, th - 80, 0.65);

  k.redondo(g, cx - 270, cy + th / 2 + 80, 540, 86, 24);
  g.fillStyle = uSalta > 0.1 ? "#dc2626" : "#4c1d95";
  g.fill();
  g.fillStyle = "#ffffff";
  g.font = "800 34px Figtree";
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.fillText(uSalta > 0.1 ? "12:00 PM · CAE TODO EL SUEÑO" : "CANSANCIO ACUMULADO", cx, cy + th / 2 + 123);
  g.restore();
}
