import * as k from "#kit";

// Dibuja una taza de café 3D sobre fondo claro con sombra suave, vapor animado y reflejo cerámico
export function dibujarTaza(g, cx, cy, escala = 1, t = 0) {
  g.save();
  g.translate(cx, cy);
  g.scale(escala, escala);

  // Sombra en el suelo blanco
  k.sombraSuave(g, 0, 175, 360, 68, 0.28);

  // Plato base cerámico
  g.fillStyle = "#e2e7f0";
  g.beginPath();
  g.ellipse(0, 155, 190, 36, 0, 0, Math.PI * 2);
  g.fill();
  g.fillStyle = "#f8fafc";
  g.beginPath();
  g.ellipse(0, 148, 175, 30, 0, 0, Math.PI * 2);
  g.fill();

  // Asa de la taza
  g.strokeStyle = "#cbd5e1";
  g.lineWidth = 28;
  g.lineCap = "round";
  g.beginPath();
  g.arc(135, 25, 62, -Math.PI * 0.42, Math.PI * 0.42);
  g.stroke();
  g.strokeStyle = "#f1f5f9";
  g.lineWidth = 16;
  g.beginPath();
  g.arc(132, 25, 62, -Math.PI * 0.42, Math.PI * 0.42);
  g.stroke();

  // Cuerpo de la taza con volumen 3D
  k.redondo(g, -140, -90, 280, 240, 56);
  const gradTaza = g.createLinearGradient(-140, -90, 140, 150);
  gradTaza.addColorStop(0, "#ffffff");
  gradTaza.addColorStop(0.65, "#f1f5f9");
  gradTaza.addColorStop(1, "#cbd5e1");
  g.fillStyle = gradTaza;
  g.fill();
  g.strokeStyle = "rgba(15,23,42,0.12)";
  g.lineWidth = 4;
  g.stroke();

  // Boca de la taza y café expreso adentro
  g.fillStyle = "#cbd5e1";
  g.beginPath();
  g.ellipse(0, -86, 138, 38, 0, 0, Math.PI * 2);
  g.fill();

  const gradCafe = g.createRadialGradient(-25, -92, 10, 0, -86, 130);
  gradCafe.addColorStop(0, "#78350f");
  gradCafe.addColorStop(0.7, "#451a03");
  gradCafe.addColorStop(1, "#270e02");
  g.fillStyle = gradCafe;
  g.beginPath();
  g.ellipse(0, -84, 126, 31, 0, 0, Math.PI * 2);
  g.fill();

  // Crema / espuma dorada
  g.strokeStyle = "rgba(217,119,6,0.55)";
  g.lineWidth = 6;
  g.beginPath();
  g.ellipse(0, -84, 112, 24, 0, 0.2, Math.PI * 1.65);
  g.stroke();

  // Brillo lateral en la cerámica
  k.reflejo(g, -105, -55, 16, 160, 0.7);

  // Vapor que sube continuamente
  for (let i = 0; i < 3; i++) {
    const fase = (t * 0.9 + i * 0.33) % 1;
    const vy = -120 - fase * 130;
    const vx = (i - 1) * 48 + Math.sin(t * 3 + i * 2) * 14;
    const al = Math.sin(fase * Math.PI) * 0.32;
    g.strokeStyle = `rgba(100,116,139,${al.toFixed(3)})`;
    g.lineWidth = 10;
    g.lineCap = "round";
    g.beginPath();
    g.moveTo(vx, vy + 35);
    g.quadraticCurveTo(vx + 18, vy + 15, vx - 8, vy - 15);
    g.stroke();
  }

  g.restore();
}
