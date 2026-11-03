import * as k from "#kit";
import { v } from "#voz";

export const desde = v.frase(3).inicio;

const T5 = v.frase(3).t("5");
const Taturdido = v.frase(3).t("aturdido");
const Thoras = v.frase(3).t("horas");

export function dibuja(g, t) {
  const uCorte = k.entra(k.tramo(t, desde, T5 + 0.15));
  const uNiebla = k.suave(k.tramo(t, Taturdido - 0.15, Thoras + 0.2));

  k.fondoClaro(g, {
    tono: uNiebla > 0.3 ? "255,195,195" : "220,230,255",
    luz: [540, 880],
    fuerza: 1.15,
  });

  const cx = 540, cy = 1040;
  k.sombraSuave(g, cx, cy + 340, 680, 68, 0.26);

  g.save();
  k.redondo(g, cx - 360, cy - 280, 720, 560, 44);
  g.fillStyle = "#ffffff";
  g.fill();
  g.strokeStyle = "#ef4444";
  g.lineWidth = 6;
  g.stroke();

  k.redondo(g, cx - 290, cy - 150, 580, 96, 26);
  g.fillStyle = "#f1f5f9";
  g.fill();
  k.redondo(g, cx - 290, cy - 150, 145, 96, 26);
  g.fillStyle = "#3b82f6";
  g.fill();

  const yCuchilla = (cy - 250) + uCorte * 195;
  g.strokeStyle = "#dc2626";
  g.lineWidth = 12;
  g.beginPath();
  g.moveTo(cx - 145, cy - 250);
  g.lineTo(cx - 145, yCuchilla);
  g.stroke();

  k.redondo(g, cx - 245, cy - 240, 200, 56, 16);
  g.fillStyle = "#dc2626";
  g.fill();
  g.fillStyle = "#ffffff";
  g.font = "800 30px Figtree";
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.fillText("CORTE · 5 MIN", cx - 145, cy - 212);

  g.save();
  g.globalAlpha = 0.35 + uNiebla * 0.65;
  k.redondo(g, cx - 290, cy + 10, 580, 210, 32);
  g.fillStyle = "#fee2e2";
  g.fill();
  g.fillStyle = "#991b1b";
  g.font = "800 42px Figtree";
  g.fillText("INERCIA DEL SUEÑO", cx, cy + 82);
  g.fillStyle = "#dc2626";
  g.font = "700 34px Figtree";
  g.fillText("ATURDIDO DE 2 A 4 HORAS", cx, cy + 148);
  g.restore();

  g.restore();
}
