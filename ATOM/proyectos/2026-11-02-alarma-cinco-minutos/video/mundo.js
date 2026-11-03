import * as k from "#kit";

export function dibujarTarjetaAlarma(g, x, y, w, h, hora, activa = true, tachada = false) {
  g.save();
  k.sombraSuave(g, x + w / 2, y + h + 22, w * 0.9, 32, 0.16);
  k.redondo(g, x, y, w, h, 32);
  g.fillStyle = "#ffffff";
  g.fill();
  g.strokeStyle = activa ? "#10b981" : "rgba(15,23,42,0.12)";
  g.lineWidth = activa ? 5 : 3;
  g.stroke();

  g.fillStyle = tachada ? "#94a3b8" : "#111317";
  g.font = "800 52px Figtree";
  g.textAlign = "left";
  g.textBaseline = "middle";
  g.fillText(hora, x + 36, y + h / 2);

  // Interruptor (toggle)
  const tx = x + w - 125, ty = y + h / 2 - 26;
  k.redondo(g, tx, ty, 92, 52, 26);
  g.fillStyle = activa ? "#10b981" : "#cbd5e1";
  g.fill();
  g.fillStyle = "#ffffff";
  g.beginPath();
  g.arc(activa ? tx + 66 : tx + 26, ty + 26, 20, 0, Math.PI * 2);
  g.fill();

  if (tachada) {
    g.strokeStyle = "#ef4444";
    g.lineWidth = 7;
    g.lineCap = "round";
    g.beginPath();
    g.moveTo(x + 24, y + h / 2);
    g.lineTo(x + w - 150, y + h / 2);
    g.stroke();
  }
  g.restore();
}
