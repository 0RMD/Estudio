// «Por eso nunca descansa de verdad.»
// Otro sitio: el cuarto de noche, visto de lado. Él duerme; dentro de su cabeza sigue encendido lo mismo de antes.
// - «Por eso nunca»: solo la ventana azul y el bulto de la cama, casi a oscuras.
// - «descansa»: la cabeza se enciende por dentro, con el mismo naranja del cerebro, y late hasta el final.
import * as k from "#kit";
import { v } from "#voz";

export const desde = (v) => v.frase(5).inicio - 0.04;
export const entrada = "corte";

const f5 = v.frase(5);
const Tnunca = f5.t("nunca"), Tdescansa = f5.t("descansa");
const az = k.azar(5);
const POLVO = [];
for (let i = 0; i < 70; i++) POLVO.push({ x: az() * 1080, y: 520 + az() * 900, s: 1 + az() * 2.2, v: 0.2 + az() * 0.5, f: az() * 6.3 });

export function dibuja(g, t) {
  g.fillStyle = "#05070e";
  g.fillRect(0, 0, 1080, 1920);

  // la ventana: la única luz del cuarto, fría
  const vx = 96, vy = 470, vw = 420, vh = 560;
  const luz = g.createLinearGradient(vx, vy, vx + vw, vy + vh);
  luz.addColorStop(0, "rgba(96,132,196,0.42)");
  luz.addColorStop(1, "rgba(40,62,110,0.16)");
  g.fillStyle = luz;
  g.fillRect(vx, vy, vw, vh);
  g.strokeStyle = "rgba(10,12,20,0.95)";
  g.lineWidth = 22;
  g.strokeRect(vx, vy, vw, vh);
  g.beginPath();
  g.moveTo(vx + vw / 2, vy); g.lineTo(vx + vw / 2, vy + vh);
  g.moveTo(vx, vy + vh / 2); g.lineTo(vx + vw, vy + vh / 2);
  g.lineWidth = 14;
  g.stroke();
  // el charco de luz de la ventana en el suelo
  g.save();
  g.globalCompositeOperation = "lighter";
  g.fillStyle = "rgba(70,100,160,0.10)";
  g.beginPath();
  g.moveTo(vx, vy + vh); g.lineTo(vx + vw, vy + vh); g.lineTo(vx + vw + 320, 1920); g.lineTo(vx - 90, 1920);
  g.closePath();
  g.fill();
  g.restore();

  // el polvo en el haz
  for (const p of POLVO) {
    const y = p.y + Math.sin(t * p.v + p.f) * 26;
    k.brillo(g, p.x * 0.55 + 60, y, p.s * 9, "azul", 0.13);
  }

  // la cama, de lado: el colchón, la almohada, el bulto de la manta y la cabeza
  g.fillStyle = "#0b0e16";
  g.fillRect(0, 1392, 1080, 528);
  g.fillStyle = "#121724";
  k.redondo(g, 60, 1300, 960, 110, 26);
  g.fill();
  // la manta
  g.fillStyle = "#161c2c";
  g.beginPath();
  g.moveTo(330, 1312);
  g.bezierCurveTo(470, 1192, 760, 1206, 930, 1300);
  g.lineTo(930, 1316);
  g.lineTo(330, 1316);
  g.closePath();
  g.fill();
  // la almohada y la cabeza
  g.fillStyle = "#1a2132";
  k.redondo(g, 132, 1232, 240, 84, 30);
  g.fill();

  const CX = 288, CY = 1198, CR = 78;
  const dentro = k.suave(k.tramo(t, Tdescansa - 0.12, Tdescansa + 0.42));
  const late = 0.62 + 0.38 * (0.5 + 0.5 * Math.sin((t - Tdescansa) * 3.0));

  // el resplandor de dentro de la cabeza, antes de la cabeza, para que se vea que sale de ella
  if (dentro > 0.01) {
    k.brillo(g, CX, CY - 6, 420, "sodio", 0.46 * dentro * late);
    k.brillo(g, CX, CY - 6, 180, "naranja", 0.55 * dentro * late);
  }
  // la cabeza y el cuello, silueta
  g.fillStyle = "#0e1320";
  g.beginPath();
  g.ellipse(CX, CY, CR, CR * 1.06, -0.18, 0, Math.PI * 2);
  g.fill();
  g.beginPath();
  g.moveTo(CX + 36, CY + 58);
  g.quadraticCurveTo(CX + 72, CY + 104, CX + 150, CY + 112);
  g.lineTo(CX + 150, CY + 150);
  g.lineTo(CX + 10, CY + 150);
  g.closePath();
  g.fill();
  // lo que sigue encendido, visto a través de la silueta
  if (dentro > 0.01) {
    g.save();
    g.beginPath();
    g.ellipse(CX, CY, CR, CR * 1.06, -0.18, 0, Math.PI * 2);
    g.clip();
    g.globalCompositeOperation = "lighter";
    const gr = g.createRadialGradient(CX - 6, CY - 10, 4, CX, CY, CR * 1.1);
    gr.addColorStop(0, `rgba(255,190,120,${0.80 * dentro * late})`);
    gr.addColorStop(1, "rgba(255,120,60,0)");
    g.fillStyle = gr;
    g.fillRect(CX - CR * 1.3, CY - CR * 1.3, CR * 2.6, CR * 2.6);
    g.restore();
  }

  const oscuro = 1 - k.suave(k.tramo(t, Tnunca - 0.4, Tnunca));
  if (oscuro > 0.01) {
    g.fillStyle = `rgba(0,0,0,${0.55 * oscuro})`;
    g.fillRect(0, 0, 1080, 1920);
  }
  k.vineta(g, 0.8);
  k.grano(g, t, 0.06);
}
