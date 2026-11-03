// Lo que comparten los planos: la paleta oficial de www.hectorhugo.mx, el fondo con profundidad berenjena y violeta,
// el núcleo vivo de tu Esencia (en oro champagne), la máscara de porcelana lavanda («otra mujer»), las insignias de
// cristal y metal, y el piloto de transmisión EN VIVO.
import * as k from "#kit";

const { azar, lienzo, fijar, redondo, mezColor, mezRgb } = k;

// ---------------------------------------------------------------- Paleta oficial de www.hectorhugo.mx
export const PAL = {
  aubergine: "#1A0F2E",
  aubergineRgb: "26,15,46",
  aubergineSoft: "#2A1B45",
  aubergineSoftRgb: "42,27,69",
  violet: "#4F2D7F",
  violetRgb: "79,45,127",
  violetMid: "#7A5BA1",
  violetMidRgb: "122,91,161",
  violetLight: "#A88BC9",
  violetLightRgb: "168,139,201",
  lavender: "#D9C7E8",
  lavenderRgb: "217,199,232",
  lavenderSoft: "#EBE0F2",
  lavenderSoftRgb: "235,224,242",
  champagne: "#E8B57A",
  champagneRgb: "232,181,122",
  champagneLight: "#F0CDA0",
  champagneLightRgb: "240,205,160",
  champagneDark: "#C99355",
  champagneDarkRgb: "201,147,85",
  cream: "#F4EDE4",
  creamRgb: "244,237,228",
  creamSoft: "#FAF6F0",
  creamSoftRgb: "250,246,240",
  creamDeep: "#EDE4D5",
  creamDeepRgb: "237,228,213",
  inkSoft: "#4A3F5E",
  inkSoftRgb: "74,63,94",
};

// Paletas para k.estrella y cuerpos luminosos
export const PALETA_ESENCIA = [PAL.creamSoft, PAL.champagneLight, PAL.champagne, PAL.champagneDark, PAL.champagneRgb];
export const PALETA_VIOLETA = [PAL.lavenderSoft, PAL.lavender, PAL.violetMid, PAL.aubergineSoft, PAL.violetLightRgb];
export const PALETA_CONEXION = [PAL.creamSoft, PAL.lavender, PAL.champagne, PAL.violet, PAL.champagneLightRgb];

// Tonos de metal para k.metal
export const METAL_CHAMPAGNE = ["#6b4c2b", "#f0cda0", "#c99355", "#faf6f0", "#593d20"];
export const METAL_LAVANDA = ["#3b2c54", "#ebe0f2", "#7a5ba1", "#faf6f0", "#2a1b45"];

// ---------------------------------------------------------------- Cámara 2D auxiliar
export function vista(g, Z, cx, cy) {
  g.setTransform(Z, 0, 0, Z, 540 - cx * Z, 960 - cy * Z);
}
export const sinVista = (g) => g.setTransform(1, 0, 0, 1, 0, 0);

// ---------------------------------------------------------------- Fondo con profundidad y nebulosa berenjena/violeta
const nebulosaHH = (() => {
  const n1 = k.ruido(256, 31, 3, 4, "manchas"), n2 = k.ruido(256, 37, 2.2, 4, "manchas");
  const l = lienzo(1400, 2400), cx = l.getContext("2d");
  cx.fillStyle = PAL.aubergine;
  cx.fillRect(0, 0, 1400, 2400);
  cx.globalCompositeOperation = "lighter";
  cx.globalAlpha = 0.65;
  cx.drawImage(k.tenir(n1, PAL.violet), 0, 0, 1400, 2400);
  cx.globalAlpha = 0.42;
  cx.drawImage(k.tenir(n2, PAL.champagneDark), -200, -150, 1800, 2700);
  return fijar(l);
})();

const MOTAS = (() => {
  const az = azar(717), l = [];
  for (let i = 0; i < 180; i++) {
    l.push({
      x: az() * 1080,
      y: az() * 1920,
      r: 1.4 + az() * 3.2,
      v: 14 + az() * 28,
      f: az() * 6.28,
      col: az() < 0.55 ? PAL.champagneLightRgb : az() < 0.85 ? PAL.lavenderRgb : PAL.creamSoftRgb,
      al: 0.22 + az() * 0.45,
    });
  }
  return l;
})();

export function fondoMundo(g, t, { cx = 540, cy = 980, luz = 0.45, colorLuz = PAL.violetRgb, colorSec = PAL.champagneRgb, motas = 1, dx = 0, dy = 0 } = {}) {
  g.save();
  sinVista(g);
  g.fillStyle = PAL.aubergine;
  g.fillRect(0, 0, 1080, 1920);
  const mx = Math.max(-140, Math.min(140, dx)), my = Math.max(-200, Math.min(200, dy));
  g.globalAlpha = 0.85;
  g.drawImage(nebulosaHH, -160 + mx, -240 + my);
  g.globalAlpha = 1;

  // Luz radial principal y secundaria
  const bg = g.createRadialGradient(cx, cy, 60, cx, cy, 1150);
  bg.addColorStop(0, `rgba(${colorLuz},${luz})`);
  bg.addColorStop(0.55, `rgba(${PAL.aubergineSoftRgb},${luz * 0.6})`);
  bg.addColorStop(1, "rgba(26,15,46,0)");
  g.fillStyle = bg;
  g.fillRect(0, 0, 1080, 1920);

  if (luz > 0.05) {
    g.save();
    g.globalCompositeOperation = "lighter";
    const cg = g.createRadialGradient(cx, cy, 20, cx, cy, 720);
    cg.addColorStop(0, `rgba(${colorSec},${luz * 0.28})`);
    cg.addColorStop(1, `rgba(${colorSec},0)`);
    g.fillStyle = cg;
    g.fillRect(0, 0, 1080, 1920);
    g.restore();
  }

  // Textura sutil
  g.save();
  g.globalCompositeOperation = "screen";
  g.globalAlpha = 0.07;
  g.drawImage(k.manchas, -120, -120, 1320, 2160);
  g.restore();

  // Motas flotantes en champagne y lavanda
  if (motas > 0.01) {
    g.save();
    g.globalCompositeOperation = "lighter";
    for (const m of MOTAS) {
      const x = (m.x + Math.sin(t * 0.9 + m.f) * 18 + mx * 0.5 + 1080) % 1080;
      const y = (m.y - t * m.v + my * 0.5 + 19200) % 1920;
      const a = motas * m.al * (0.6 + 0.4 * Math.sin(t * 2.4 + m.f));
      g.fillStyle = `rgba(${m.col},${a})`;
      g.beginPath();
      g.arc(x, y, m.r, 0, 6.2832);
      g.fill();
    }
    g.restore();
  }
  g.restore();
}

export function vineta(g, al = 0.55) {
  g.save();
  sinVista(g);
  const vg = g.createRadialGradient(540, 960, 480, 540, 960, 1260);
  vg.addColorStop(0, "rgba(26,15,46,0)");
  vg.addColorStop(1, `rgba(12,6,24,${al})`);
  g.fillStyle = vg;
  g.fillRect(0, 0, 1080, 1920);
  g.restore();
}

// Velo oscuro berenjena arriba para proteger siempre la lectura del subtítulo (y 318..482)
export function velo(g, al = 0.68) {
  if (al <= 0.01) return;
  g.save();
  sinVista(g);
  const vg = g.createLinearGradient(0, 140, 0, 660);
  vg.addColorStop(0, `rgba(18,9,34,${al})`);
  vg.addColorStop(0.65, `rgba(18,9,34,${al * 0.72})`);
  vg.addColorStop(1, "rgba(18,9,34,0)");
  g.fillStyle = vg;
  g.fillRect(0, 0, 1080, 660);
  g.restore();
}

// ---------------------------------------------------------------- El núcleo vivo de tu Esencia
// Una esfera de luz champagne hirviendo con anillos cálidos y opción de herida kintsugi (oscura o bañada en oro).
export function nucleoEsencia(g, x, y, r, t, { latido = 0, grieta = 0, oroGrieta = 0, al = 1 } = {}) {
  if (al <= 0.003 || r < 1) return;
  g.save();
  g.globalAlpha *= al;
  const rad = r * (1 + 0.06 * latido + 0.02 * Math.sin(t * 3.4));

  // Halo exterior violeta + champagne
  k.brillo(g, x, y, rad * (3.6 + 0.8 * latido), PAL.violetLightRgb, 0.45);
  k.brillo(g, x, y, rad * (2.8 + 0.9 * latido), PAL.champagneRgb, 0.65 + 0.25 * latido);

  // Esfera hirviendo del kit con la paleta champagne de Héctor Hugo
  k.estrella(g, PALETA_ESENCIA, x, y, rad, t * 0.38, 0.25 + 0.6 * latido);

  // Anillo de luz sutil girando alrededor
  g.save();
  g.translate(x, y);
  g.rotate(t * 0.25);
  g.globalCompositeOperation = "lighter";
  g.strokeStyle = `rgba(${PAL.champagneLightRgb},${0.35 + 0.3 * latido})`;
  g.lineWidth = Math.max(2, rad * 0.03);
  g.beginPath();
  g.ellipse(0, 0, rad * 1.28, rad * 0.42, 0.35, 0, 6.2832);
  g.stroke();
  g.restore();

  // Si tiene herida (grieta > 0): kintsugi que puede ser sombrío (cuando duele) o de oro radiante (cuando conecta)
  if (grieta > 0.01) {
    g.save();
    g.translate(x, y);
    g.beginPath();
    g.arc(0, 0, rad * 0.98, 0, 6.2832);
    g.clip();
    const pts = [
      [-rad * 0.15, -rad * 0.68],
      [-rad * 0.04, -rad * 0.32],
      [rad * 0.14, -rad * 0.08],
      [-rad * 0.08, rad * 0.22],
      [rad * 0.12, rad * 0.52],
      [rad * 0.02, rad * 0.72],
    ];
    const ramas = [
      [[-rad * 0.04, -rad * 0.32], [-rad * 0.36, -rad * 0.18], [-rad * 0.52, -rad * 0.24]],
      [[rad * 0.14, -rad * 0.08], [rad * 0.44, -rad * 0.22], [rad * 0.62, -rad * 0.10]],
      [[-rad * 0.08, rad * 0.22], [-rad * 0.42, rad * 0.38]],
    ];
    const nPts = Math.max(2, Math.ceil(pts.length * Math.min(1, grieta)));

    // Sombra/borde de la herida (oscura cuando duele; borde violeta/bronce profundo cuando se llena de oro para que destaque)
    g.lineCap = "round";
    g.lineJoin = "round";
    g.strokeStyle = mezColor(PAL.aubergine, PAL.violet, oroGrieta * 0.7);
    g.lineWidth = rad * (0.11 + 0.05 * oroGrieta);
    g.beginPath();
    g.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < nPts; i++) g.lineTo(pts[i][0], pts[i][1]);
    g.stroke();
    if (grieta > 0.5) {
      for (const rm of ramas) {
        g.lineWidth = rad * (0.065 + 0.025 * oroGrieta);
        g.beginPath();
        g.moveTo(rm[0][0], rm[0][1]);
        for (let i = 1; i < rm.length; i++) g.lineTo(rm[i][0], rm[i][1]);
        g.stroke();
      }
    }

    // Vena de oro kintsugi radiante
    if (oroGrieta > 0.01) {
      g.globalCompositeOperation = "lighter";
      g.strokeStyle = `rgba(${PAL.champagneRgb},${0.98 * oroGrieta})`;
      g.lineWidth = rad * 0.085;
      g.beginPath();
      g.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < nPts; i++) g.lineTo(pts[i][0], pts[i][1]);
      g.stroke();

      g.strokeStyle = `rgba(255,255,255,${0.98 * oroGrieta})`;
      g.lineWidth = rad * 0.038;
      g.stroke();

      for (const rm of ramas) {
        g.strokeStyle = `rgba(255,255,255,${0.92 * oroGrieta})`;
        g.lineWidth = rad * 0.028;
        g.beginPath();
        g.moveTo(rm[0][0], rm[0][1]);
        for (let i = 1; i < rm.length; i++) g.lineTo(rm[i][0], rm[i][1]);
        g.stroke();
      }
      k.brillo(g, 0, 0, rad * 2.4, PAL.champagneRgb, 0.85 * oroGrieta);
    }
    g.restore();
  }
  g.restore();
}

// ---------------------------------------------------------------- La coraza/vitrina facetada de «otra mujer»
// Una estructura 3D de cristal tallado, facetas de porcelana lavanda y costillas de metal frío que encierra tu esencia
// como un escaparate artificial («otra mujer más segura, más preparada, con un nombre bonito»).
export function mascaraFalsa(g, x, y, r, t, { al = 1, cierre = 1, grieta = 0 } = {}) {
  if (al <= 0.003 || r < 2) return;
  g.save();
  g.translate(x, y);
  g.globalAlpha *= al;

  const w = r * 1.08, h = r * 1.28;
  const giro = t * 0.45;

  // Sombra profunda detrás de la coraza de cristal
  g.save();
  g.shadowColor = "rgba(8,3,18,0.88)";
  g.shadowBlur = r * 0.38;
  g.shadowOffsetY = r * 0.14;

  const trazarDomo = () => {
    g.beginPath();
    g.moveTo(0, -h);
    g.lineTo(w * 0.72, -h * 0.62);
    g.lineTo(w, 0);
    g.lineTo(w * 0.72, h * 0.68);
    g.lineTo(0, h);
    g.lineTo(-w * 0.72, h * 0.68);
    g.lineTo(-w, 0);
    g.lineTo(-w * 0.72, -h * 0.62);
    g.closePath();
  };

  trazarDomo();
  const fg = g.createLinearGradient(-w, -h, w, h);
  fg.addColorStop(0, "rgba(250,246,240,0.42)");
  fg.addColorStop(0.32, "rgba(217,199,232,0.52)");
  fg.addColorStop(0.68, "rgba(122,91,161,0.62)");
  fg.addColorStop(1, "rgba(26,15,46,0.82)");
  g.fillStyle = fg;
  g.fill();
  g.restore();

  // Facetas 3D que giran lentamente mostrando las caras del cristal tallado
  g.save();
  trazarDomo();
  g.clip();

  // Textura fina sobre el cristal frío
  g.save();
  g.globalCompositeOperation = "multiply";
  g.globalAlpha *= 0.28;
  g.drawImage(k.red, -r * 1.5, -r * 1.5, r * 3, r * 3);
  g.restore();

  const nCaras = 6;
  for (let i = 0; i < nCaras; i++) {
    const a0 = (i / nCaras) * Math.PI * 2 + giro * 0.35;
    const a1 = a0 + (Math.PI * 2) / nCaras;
    const x0 = Math.sin(a0) * w * 0.92, x1 = Math.sin(a1) * w * 0.92;
    if (x1 < x0) continue; // cara trasera
    const luzCara = 0.5 + 0.5 * Math.cos((a0 + a1) * 0.5 - 0.6);
    const cg = g.createLinearGradient(x0, -h, x1, h);
    const cTop = k.mezRgb(PAL.aubergineSoftRgb, PAL.creamSoftRgb, luzCara * 0.85);
    const cBot = k.mezRgb(PAL.aubergineRgb, PAL.lavenderRgb, luzCara * 0.55);
    cg.addColorStop(0, `rgba(${cTop},${0.22 + 0.28 * luzCara})`);
    cg.addColorStop(1, `rgba(${cBot},${0.35 + 0.25 * luzCara})`);
    g.fillStyle = cg;
    g.beginPath();
    g.moveTo(0, -h);
    g.lineTo(x1, -h * 0.42);
    g.lineTo(x1 * 1.05, h * 0.42);
    g.lineTo(0, h);
    g.lineTo(x0 * 1.05, h * 0.42);
    g.lineTo(x0, -h * 0.42);
    g.closePath();
    g.fill();
    g.strokeStyle = `rgba(${PAL.creamSoftRgb},${0.25 + 0.35 * luzCara})`;
    g.lineWidth = 2.5;
    g.stroke();
  }

  // Aros metálicos de contención que aprietan la coraza (cierre de 0 a 1)
  const ap = 0.78 + 0.22 * cierre;
  for (const ky of [-0.46, 0, 0.46]) {
    const yy = h * ky;
    const rw = w * (ky === 0 ? 0.98 : 0.74) * ap;
    g.beginPath();
    g.rect(-rw, yy - 12, rw * 2, 24);
    k.metal(g, -rw, rw, METAL_LAVANDA);
    g.strokeStyle = "rgba(26,15,46,0.7)";
    g.lineWidth = 2;
    g.strokeRect(-rw, yy - 12, rw * 2, 24);
  }

  // Silueta escultórica interna de maniquí perfecto
  g.save();
  g.strokeStyle = `rgba(${PAL.creamSoftRgb},0.65)`;
  g.lineWidth = 4;
  g.beginPath();
  g.arc(0, -h * 0.18, r * 0.28, 0, 6.2832);
  g.moveTo(-r * 0.52, h * 0.55);
  g.bezierCurveTo(-r * 0.48, h * 0.15, r * 0.48, h * 0.15, r * 0.52, h * 0.55);
  g.stroke();
  g.restore();

  // Reflejos de vidrio del kit
  k.reflejo(g, -w * 0.62, -h * 0.65, w * 0.16, h * 1.15, 0.42);
  k.reflejo(g, w * 0.38, -h * 0.45, w * 0.08, h * 0.75, 0.24);

  // Grietas de luz dorada champagne cuando la esencia rompe el molde desde dentro
  if (grieta > 0.01) {
    const grs = [
      [[0, 0], [-w * 0.42, -h * 0.44], [-w * 0.85, -h * 0.72]],
      [[0, 0], [w * 0.48, -h * 0.34], [w * 0.88, -h * 0.58]],
      [[0, 0], [-w * 0.54, h * 0.32], [-w * 0.92, h * 0.62]],
      [[0, 0], [w * 0.45, h * 0.38], [w * 0.82, h * 0.74]],
      [[0, 0], [0.08 * w, -h * 0.58], [-0.06 * w, -h * 0.96]],
      [[0, 0], [-0.06 * w, h * 0.56], [0.08 * w, h * 0.96]],
    ];
    g.save();
    g.globalCompositeOperation = "lighter";
    for (const lin of grs) {
      g.strokeStyle = `rgba(${PAL.champagneRgb},${0.92 * grieta})`;
      g.lineWidth = r * 0.065 * grieta;
      g.beginPath();
      g.moveTo(lin[0][0], lin[0][1]);
      g.lineTo(lin[1][0], lin[1][1]);
      if (grieta > 0.35) g.lineTo(lin[2][0], lin[2][1]);
      g.stroke();

      g.strokeStyle = `rgba(${PAL.creamSoftRgb},${0.98 * grieta})`;
      g.lineWidth = r * 0.024 * grieta;
      g.stroke();
    }
    g.restore();
  }
  g.restore();

  // Marco exterior de vidrio tallado
  trazarDomo();
  k.vidrio(g, -w, w, 0.65);

  // Corona metálica superior e inferior
  g.beginPath();
  redondo(g, -w * 0.52, -h - 18, w * 1.04, 34, 14);
  k.metal(g, -w * 0.52, w * 0.52, METAL_LAVANDA);
  g.beginPath();
  redondo(g, -w * 0.58, h - 16, w * 1.16, 36, 14);
  k.metal(g, -w * 0.58, w * 0.58, METAL_LAVANDA);

  g.restore();
}

// ---------------------------------------------------------------- Placa / Insignia 3D de cristal y metal
// Para las etiquetas de «MÁS SEGURA», «MÁS PREPARADA», «NOMBRE BONITO» y sellos del mundo.
export function placaCristal(g, x, y, w, h, titulo, subtitulo, colorRgb = PAL.champagneRgb, al = 1) {
  if (al <= 0.003) return;
  g.save();
  g.translate(x, y);
  g.globalAlpha *= al;

  // Sombra
  g.save();
  g.shadowColor = "rgba(10,4,22,0.75)";
  g.shadowBlur = 36;
  g.shadowOffsetY = 14;
  redondo(g, -w / 2, -h / 2, w, h, 28);
  g.fillStyle = "rgba(26,15,46,0.88)";
  g.fill();
  g.restore();

  // Marco y vidrio
  redondo(g, -w / 2, -h / 2, w, h, 28);
  k.vidrio(g, -w / 2, w / 2, 0.55);

  // Borde interior del color indicado
  redondo(g, -w / 2 + 4, -h / 2 + 4, w - 8, h - 8, 24);
  g.strokeStyle = `rgba(${colorRgb},0.75)`;
  g.lineWidth = 3;
  g.stroke();

  // Punto luminoso a la izquierda
  k.brillo(g, -w / 2 + 48, 0, 90, colorRgb, 0.85);
  g.fillStyle = `rgb(${colorRgb})`;
  g.beginPath();
  g.arc(-w / 2 + 48, 0, 14, 0, 6.2832);
  g.fill();

  // Textos en Figtree
  g.textAlign = "left";
  g.textBaseline = "middle";
  g.fillStyle = PAL.creamSoft;
  g.font = `800 ${Math.round(h * 0.34)}px Figtree`;
  g.fillText(titulo, -w / 2 + 82, subtitulo ? -h * 0.14 : 2);

  if (subtitulo) {
    g.fillStyle = `rgb(${colorRgb})`;
    g.font = `700 ${Math.round(h * 0.22)}px Figtree`;
    g.fillText(subtitulo, -w / 2 + 82, h * 0.22);
  }
  g.restore();
}

// ---------------------------------------------------------------- Piloto EN VIVO con estética Héctor Hugo
export function pilotoVivo(g, x, y, r, luz, etiquetaTexto = "EN VIVO", al = 1) {
  if (al <= 0.003) return;
  g.save();
  g.globalAlpha *= al;
  g.font = `800 ${Math.round(r * 1.55)}px Figtree`;
  const tw = g.measureText(etiquetaTexto).width;
  const pw = r * 3.4 + tw + 36, ph = r * 2.6;

  g.save();
  g.shadowColor = "rgba(10,4,22,0.7)";
  g.shadowBlur = 28;
  redondo(g, x - pw / 2, y - ph / 2, pw, ph, ph / 2);
  g.fillStyle = "rgba(26,15,46,0.88)";
  g.fill();
  g.restore();

  redondo(g, x - pw / 2, y - ph / 2, pw, ph, ph / 2);
  g.strokeStyle = `rgba(${PAL.champagneRgb},${0.45 + 0.4 * luz})`;
  g.lineWidth = 3;
  g.stroke();

  const cx = x - pw / 2 + r * 1.6;
  if (luz > 0.02) k.brillo(g, cx, y, r * 6.5, PAL.champagneRgb, 0.85 * luz);
  g.fillStyle = `rgb(${mezRgb(PAL.violetMidRgb, PAL.champagneRgb, luz)})`;
  g.beginPath();
  g.arc(cx, y, r * 0.78, 0, 6.2832);
  g.fill();

  g.fillStyle = PAL.creamSoft;
  g.textAlign = "left";
  g.textBaseline = "middle";
  g.fillText(etiquetaTexto, cx + r * 1.35, y + 2);
  g.restore();
}
