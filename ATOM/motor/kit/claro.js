// El modo claro (guion.json "tema": "claro"): fondos blancos con luz de día, sombras suaves que se multiplican en vez
// de brillos que se suman. Sobre blanco, "lighter" no se ve: aquí la profundidad la dan la sombra y el color.
import { lienzo } from "./base.js";
import { ruido } from "./texturas.js";

// Un papel muy fino, hecho una vez: se multiplica encima del fondo para que el blanco no sea un plano de ordenador.
const papel = (() => {
  const n = ruido(512, 41, 9, 4, "manchas"), l = lienzo(512), cx = l.getContext("2d");
  cx.fillStyle = "#ffffff"; cx.fillRect(0, 0, 512, 512);
  cx.globalAlpha = 0.022; cx.drawImage(n, 0, 0);
  return l;
})();

// El fondo del modo claro: blanco cálido, una mancha de luz de color que viene de `luz` ([x, y] en pantalla) y un
// borde apenas gris que lleva la mirada al centro. tono: "r,g,b" de la luz del sitio (cielo, sol, pantalla).
export function fondoClaro(g, { tono = "205,222,255", luz = [540, 700], fuerza = 1 } = {}) {
  g.save();
  g.globalCompositeOperation = "source-over";
  g.fillStyle = "#fbfaf7"; g.fillRect(0, 0, 1080, 1920);
  const m = g.createRadialGradient(luz[0], luz[1], 0, luz[0], luz[1], 1300);
  m.addColorStop(0, `rgba(${tono},${0.42 * fuerza})`); m.addColorStop(0.55, `rgba(${tono},${0.12 * fuerza})`); m.addColorStop(1, `rgba(${tono},0)`);
  g.fillStyle = m; g.fillRect(0, 0, 1080, 1920);
  g.globalCompositeOperation = "multiply";
  g.drawImage(papel, 0, 0, 1080, 1920); // de una pieza: en mosaico se verían las juntas
  const b = g.createRadialGradient(540, 860, 700, 540, 960, 1350);
  b.addColorStop(0, "rgba(255,255,255,1)"); b.addColorStop(1, "rgba(214,216,222,1)");
  g.fillStyle = b; g.fillRect(0, 0, 1080, 1920);
  g.restore();
}

// La sombra de algo apoyado (o flotando) en el suelo: una elipse que se multiplica. Más alto flota, más grande y suave.
export function sombraSuave(g, x, y, ancho, alto = ancho * 0.18, al = 0.22) {
  if (al <= 0.003 || ancho < 1) return;
  g.save();
  g.globalCompositeOperation = "multiply";
  g.translate(x, y); g.scale(1, alto / ancho);
  const s = g.createRadialGradient(0, 0, 0, 0, 0, ancho / 2);
  s.addColorStop(0, `rgba(40,44,60,${al})`); s.addColorStop(1, "rgba(40,44,60,0)");
  g.fillStyle = s; g.beginPath(); g.arc(0, 0, ancho / 2, 0, Math.PI * 2); g.fill();
  g.restore();
}
