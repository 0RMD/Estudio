import * as k from "#kit";

export function dibujarPlato(g, cx, cy, r = 115) {
  g.save();
  k.sombraSuave(g, cx, cy + r * 0.85, r * 2.1, r * 0.38, 0.2);
  g.fillStyle = "#ffffff";
  g.strokeStyle = "#cbd5e1";
  g.lineWidth = 6;
  g.beginPath();
  g.arc(cx, cy, r, 0, Math.PI * 2);
  g.fill();
  g.stroke();

  g.strokeStyle = "#e2e8f0";
  g.lineWidth = 4;
  g.beginPath();
  g.arc(cx, cy, r * 0.68, 0, Math.PI * 2);
  g.stroke();
  g.restore();
}
