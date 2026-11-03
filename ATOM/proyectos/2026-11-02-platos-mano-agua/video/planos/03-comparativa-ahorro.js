import * as k from "#kit";
import { v } from "#voz";

export const desde = v.frase(4).inicio;

const Tamigo = v.frase(4).t("amigo");

export function dibuja(g, t) {
  k.fondoClaro(g, { tono: "190,230,255", luz: [540, 860], fuerza: 1.15 });

  const u = k.entra(k.tramo(t, desde, Tamigo + 0.35));

  const izqX = 310, derX = 770, base = 1380, maxH = 540, w = 280;

  k.sombraSuave(g, izqX, base + 45, 320, 54, 0.24);
  k.sombraSuave(g, derX, base + 45, 320, 54, 0.24);

  const h50 = Math.max(60, maxH * Math.max(0.2, u));
  k.redondo(g, izqX - w / 2, base - maxH, w, maxH, 40);
  g.fillStyle = "#ffffff";
  g.fill();
  k.redondo(g, izqX - w / 2 + 14, base - h50 + 14, w - 28, h50 - 28, 28);
  g.fillStyle = "#ef4444";
  g.fill();
  k.redondo(g, izqX - w / 2, base - maxH, w, maxH, 40);
  k.vidrio(g, izqX - w / 2, izqX + w / 2);

  g.fillStyle = "#111317";
  g.font = "800 58px Figtree";
  g.textAlign = "center";
  g.fillText("50 L", izqX, base - maxH - 45);
  g.fillStyle = "#dc2626";
  g.font = "800 36px Figtree";
  g.fillText("A MANO", izqX, base + 95);

  const h12 = Math.max(50, maxH * 0.26 * Math.max(0.2, u));
  k.redondo(g, derX - w / 2, base - maxH, w, maxH, 40);
  g.fillStyle = "#ffffff";
  g.fill();
  k.redondo(g, derX - w / 2 + 14, base - h12 + 14, w - 28, h12 - 28, 28);
  g.fillStyle = "#10b981";
  g.fill();
  k.redondo(g, derX - w / 2, base - maxH, w, maxH, 40);
  k.vidrio(g, derX - w / 2, derX + w / 2);

  g.fillStyle = "#111317";
  g.font = "800 58px Figtree";
  g.fillText("12 L", derX, base - maxH - 45);
  g.fillStyle = "#059669";
  g.font = "800 36px Figtree";
  g.fillText("LAVAVAJILLAS", derX, base + 95);
}
