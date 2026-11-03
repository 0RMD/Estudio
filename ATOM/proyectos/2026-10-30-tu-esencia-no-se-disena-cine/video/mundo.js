// Piezas compartidas de «Tu esencia no se diseña» con la paleta oficial de www.hectorhugo.mx
// y el recurso 3D fotorrealista de la máscara de porcelana y kintsugi champagne.
import * as k from "#kit";
import { obtenerRecursosMascara } from "./mascara-real.js";

const { redondo, mez, azar, red, causticas } = k;

// Paleta exacta extraída de www.hectorhugo.mx (.hh-root)
export const HH = {
  cream: "#F4EDE4",
  creamSoft: "#FAF6F0",
  creamDeep: "#EDE4D5",
  aubergine: "#1A0F2E",
  aubergineSoft: "#2A1B45",
  violet: "#4F2D7F",
  violetMid: "#7A5BA1",
  violetLight: "#A88BC9",
  lavender: "#D9C7E8",
  lavenderSoft: "#EBE0F2",
  champagne: "#E8B57A",
  champagneLight: "#F0CDA0",
  champagneDark: "#C99355",
  coral: "#E89B8C",
  ink: "#1A0F2E",
  inkSoft: "#4A3F5E",
};

export const ORO_RGB = "232,181,122";      // --champagne (#E8B57A)
export const VIOLETA_RGB = "168,139,201";  // --violet-light (#A88BC9)
export const LAVANDA_RGB = "217,199,232";  // --lavender (#D9C7E8)
export const ROJO_RGB = "232,155,140";     // --coral (#E89B8C)
export const CREMA_RGB = "244,237,228";    // --cream (#F4EDE4)

const ACENTOS = [
  0.08, 0.80, 2.16, 2.88, 4.04, 4.80, 6.32, 6.64,
  7.68, 8.64, 9.92, 10.28, 11.16, 12.48, 13.44, 13.92,
  14.96, 15.92, 16.96,
  18.36, 19.12, 19.44, 20.72, 21.28, 22.48, 23.28, 24.72, 25.72,
  26.96, 28.04, 29.60, 30.20, 31.44,
  32.76, 33.52, 34.48, 35.25, 35.76,
  36.76, 37.60, 39.28, 39.92, 40.64,
  41.95, 42.56, 43.84, 44.32, 45.92,
  47.44, 49.08, 50.64, 51.60,
  52.92, 54.12, 54.64, 56.16, 57.00,
  58.12, 58.48, 59.32, 59.80, 60.88, 61.68, 62.32,
];

export function latidoRitmo(t) {
  const compas = Math.pow(0.5 + 0.5 * Math.sin((t * Math.PI * 2) / 0.545), 3) * 0.35;
  let acento = 0;
  for (let i = 0; i < ACENTOS.length; i++) {
    const dt = (t - ACENTOS[i]) / 0.14;
    if (Math.abs(dt) < 3) acento += Math.exp(-dt * dt);
  }
  return Math.min(1, compas + acento * 0.78);
}

// Rótulo editorial inspirado en .hh-root .section-dark (.eyebrow champagne + titular cream sobre aubergine)
export function rotuloHH(g, x, y, pequeno, grande, al = 1, tam = 64) {
  if (al <= 0.003) return;
  g.save();
  g.globalAlpha *= al;
  const upPeq = String(pequeno).toUpperCase();
  g.font = `700 ${tam * 0.36}px Figtree`;
  const w1 = g.measureText(upPeq).width + 90;
  g.font = `800 ${tam}px Figtree`;
  const w2 = g.measureText(grande).width;
  const w = Math.max(w1, w2) + 76;
  const h = tam * 1.72;

  // Sombra editorial aubergine
  g.fillStyle = "rgba(15, 8, 28, 0.55)";
  redondo(g, x - w / 2 + 4, y - h / 2 + 8, w, h, 28);
  g.fill();

  // Fondo aubergine traslúcido con borde champagne
  const bg = g.createLinearGradient(x - w / 2, y - h / 2, x + w / 2, y + h / 2);
  bg.addColorStop(0, "rgba(26, 15, 46, 0.90)");
  bg.addColorStop(1, "rgba(42, 27, 69, 0.90)");
  redondo(g, x - w / 2, y - h / 2, w, h, 28);
  g.fillStyle = bg;
  g.fill();
  g.strokeStyle = "rgba(232, 181, 122, 0.62)";
  g.lineWidth = 3;
  g.stroke();

  // Eyebrow estilo hectorhugo.mx con líneas laterales en champagne
  const eyY = y - tam * 0.25;
  g.fillStyle = HH.champagne;
  g.font = `700 ${tam * 0.35}px Figtree`;
  g.textAlign = "center";
  g.fillText(upPeq, x, eyY);

  const halfText = g.measureText(upPeq).width / 2 + 14;
  g.strokeStyle = "rgba(232, 181, 122, 0.65)";
  g.lineWidth = 2;
  g.beginPath();
  g.moveTo(x - halfText - 26, eyY - tam * 0.11);
  g.lineTo(x - halfText, eyY - tam * 0.11);
  g.moveTo(x + halfText, eyY - tam * 0.11);
  g.lineTo(x + halfText + 26, eyY - tam * 0.11);
  g.stroke();

  // Titular en --cream (#F4EDE4)
  g.fillStyle = HH.cream;
  g.font = `800 ${tam}px Figtree`;
  g.fillText(grande, x, y + tam * 0.60);
  g.restore();
}

export function acabarCine(g, t, veloFuerza = 0.38) {
  if (veloFuerza > 0.01) {
    const vg = g.createLinearGradient(0, 140, 0, 620);
    vg.addColorStop(0, `rgba(26,15,46,${0.72 * veloFuerza})`);
    vg.addColorStop(0.6, `rgba(26,15,46,${0.44 * veloFuerza})`);
    vg.addColorStop(1, "rgba(26,15,46,0)");
    g.fillStyle = vg;
    g.fillRect(0, 0, 1080, 620);
  }
  k.vineta(g, 0.62);
  k.grano(g, t, 0.055);
}

const MOTAS = (() => {
  const az = azar(411);
  return Array.from({ length: 65 }, () => ({
    x: az() * 1080,
    y: 420 + az() * 1420,
    r: 2.2 + az() * 3.8,
    f: az() * 6.28,
    esLavanda: az() > 0.55,
  }));
})();

export function mesaEstudio(g, camX = 0, camY = 0, luzX = 540, luzY = 1060, t = 0) {
  // Fondo nocturno editorial con la paleta de www.hectorhugo.mx (--aubergine #1A0F2E -> --aubergine-soft #2A1B45)
  const bg = g.createLinearGradient(0, 0, 0, 1920);
  bg.addColorStop(0, "#120920");
  bg.addColorStop(0.52, HH.aubergine);
  bg.addColorStop(1, HH.aubergineSoft);
  g.fillStyle = bg;
  g.fillRect(0, 0, 1080, 1920);

  // Orbes atmosféricos de hectorhugo.mx (.hero-orb.o1 en --violet #4F2D7F y .o2 en --champagne #E8B57A)
  k.luzCalida(g, 820 + Math.sin(t * 0.7) * 45, 580 + Math.cos(t * 0.6) * 35, 680, 0.52, "79,45,127");
  k.luzCalida(g, 260 + Math.cos(t * 0.65) * 40, 1480 + Math.sin(t * 0.55) * 35, 620, 0.34, ORO_RGB);

  const despX = camX + t * 95;
  const despY = camY + t * 65;

  // Textura viva deslizándose con el movimiento de cámara
  g.save();
  g.globalCompositeOperation = "overlay";
  g.globalAlpha = 0.24;
  const offX = ((-despX * 0.6) % 768 + 768) % 768;
  const offY = ((-despY * 0.4) % 768 + 768) % 768;
  g.drawImage(red, offX - 768, offY - 400, 768, 1560);
  g.drawImage(red, offX, offY - 400, 768, 1560);
  g.drawImage(red, offX + 768, offY - 400, 768, 1560);
  g.drawImage(red, offX - 768, offY + 1160, 768, 1560);
  g.drawImage(red, offX, offY + 1160, 768, 1560);
  g.restore();

  // Rejilla editorial en lavanda y champagne sobre la mesa
  g.save();
  g.strokeStyle = "rgba(217, 199, 232, 0.085)";
  g.lineWidth = 2.0;
  const paso = 120;
  const ox = ((-despX % paso) + paso) % paso;
  const oy = ((-despY % paso) + paso) % paso;
  for (let x = ox - paso; x < 1200; x += paso) {
    g.beginPath();
    g.moveTo(x, 0);
    g.lineTo(x, 1920);
    g.stroke();
  }
  for (let y = oy - paso; y < 2040; y += paso) {
    g.beginPath();
    g.moveTo(0, y);
    g.lineTo(1080, y);
    g.stroke();
  }
  g.restore();

  // Rayos volumétricos en tono champagne (#E8B57A) y lavanda (#D9C7E8)
  k.rayos(g, t * 1.4, 1680, 0.30, 7, ORO_RGB);

  const lat = 1 + 0.08 * latidoRitmo(t);
  const lx = luzX + Math.sin(t * 2.2) * 38;
  const ly = luzY + Math.cos(t * 1.8) * 28;
  k.luzCalida(g, lx, ly, 680 * lat, 0.65, "122,91,161");
  k.luzCalida(g, lx, ly, 540 * lat, 0.82, ORO_RGB);

  // Anillos de compás girando sobre la mesa en champagne y lavanda
  g.save();
  g.translate(luzX, luzY);
  g.rotate(t * 0.35);
  g.strokeStyle = "rgba(232, 181, 122, 0.20)";
  g.lineWidth = 2.5;
  g.setLineDash([28, 18]);
  g.beginPath();
  g.arc(0, 0, 390, 0, Math.PI * 2);
  g.stroke();
  g.rotate(-t * 0.7);
  g.strokeStyle = "rgba(217, 199, 232, 0.16)";
  g.beginPath();
  g.arc(0, 0, 470, 0, Math.PI * 2);
  g.stroke();
  g.setLineDash([]);
  g.restore();

  g.save();
  g.globalCompositeOperation = "lighter";
  for (const m of MOTAS) {
    const mx = ((m.x - despX * 0.45 + Math.sin(t * 1.8 + m.f) * 28) % 1080 + 1080) % 1080;
    const my = ((m.y - despY * 0.25 + Math.cos(t * 1.5 + m.f) * 22 - 420) % 1420 + 1420) % 1420 + 420;
    const dist = Math.hypot(mx - lx, my - ly);
    if (dist < 640) {
      const alMota = (1 - dist / 640) * (0.45 + 0.45 * Math.sin(t * 4.2 + m.f));
      g.fillStyle = m.esLavanda
        ? `rgba(${LAVANDA_RGB},${alMota})`
        : `rgba(${ORO_RGB},${alMota})`;
      g.beginPath();
      g.arc(mx, my, m.r, 0, Math.PI * 2);
      g.fill();
    }
  }
  g.restore();
}

// Recurso fotorrealista 3D de la máscara veneciana de porcelana y kintsugi champagne
export function mascaraPorcelana3D(g, x, y, esc = 1, t = 0, grieta = 0, rayosX = 0) {
  const { W, H, rostroCanvas, mascIzqCanvas, mascDerCanvas } = obtenerRecursosMascara();

  g.save();
  g.translate(x, y + Math.sin(t * 2.6) * 8);
  g.rotate(Math.sin(t * 1.8) * 0.022);
  g.scale(esc, esc);

  // Halo circular de diagnóstico en champagne / coral
  g.save();
  g.rotate(t * 0.85);
  g.strokeStyle = grieta > 0.2 ? "rgba(232, 155, 140, 0.55)" : "rgba(232, 181, 122, 0.40)";
  g.lineWidth = 3;
  g.setLineDash([22, 16]);
  g.beginPath();
  g.arc(0, 0, 260, 0, Math.PI * 2);
  g.stroke();
  g.setLineDash([]);
  g.restore();

  // Sombra proyectada profunda sobre la mesa aubergine
  g.fillStyle = "rgba(10, 5, 20, 0.76)";
  g.beginPath();
  g.ellipse(12, 26, 178, 228, 0, 0, Math.PI * 2);
  g.fill();

  // Resplandor interior cuando la máscara se agrieta o entra en rayos X
  const apertura = Math.max(grieta, rayosX * 0.65);
  if (apertura > 0.01) {
    k.luzCalida(g, 0, 0, 290, 0.92 * apertura, ORO_RGB);
    k.luzCalida(g, 0, 0, 210, 0.65 * apertura, ROJO_RGB);
  }

  const drawW = 460;
  const drawH = (drawW * H) / W; // ~558 px
  const dx0 = -drawW / 2;
  const dy0 = -drawH / 2;

  // 1. El rostro interior de esencia real (siempre debajo de las dos mitades de porcelana)
  g.save();
  g.drawImage(rostroCanvas, dx0, dy0, drawW, drawH);
  g.restore();

  // 2. Las dos mitades 3D de la máscara de porcelana veneciana separándose al agrietarse
  const sepPx = mez(0, 26, Math.min(1, grieta));
  const rotMitad = mez(0, 0.058, Math.min(1, grieta));
  const alPorcelana = rayosX > 0.4 ? mez(1, 0.58, (rayosX - 0.4) / 0.6) : 1;

  // Mitad izquierda
  g.save();
  g.globalAlpha *= alPorcelana;
  g.translate(-sepPx, grieta * 4);
  g.rotate(-rotMitad);
  g.drawImage(mascIzqCanvas, dx0, dy0, drawW, drawH);
  g.restore();

  // Mitad derecha
  g.save();
  g.globalAlpha *= alPorcelana;
  g.translate(sepPx, grieta * 4);
  g.rotate(rotMitad);
  g.drawImage(mascDerCanvas, dx0, dy0, drawW, drawH);
  g.restore();

  // 3. Barrido de luz especular vivo recorriendo el esmalte de la porcelana
  const yScan = -200 + ((t * 175) % 400);
  g.save();
  g.beginPath();
  g.ellipse(0, 0, 165 + sepPx, 215, 0, 0, Math.PI * 2);
  g.clip();
  g.globalCompositeOperation = "lighter";
  const sg = g.createLinearGradient(0, yScan - 36, 0, yScan + 36);
  sg.addColorStop(0, "rgba(232,181,122,0)");
  sg.addColorStop(0.5, "rgba(240,205,160,0.32)");
  sg.addColorStop(1, "rgba(232,181,122,0)");
  g.fillStyle = sg;
  g.fillRect(-220, yScan - 36, 440, 72);
  g.restore();

  // 4. Filamento incandescente en la fractura central cuando se rompe («no te la crees ni tú»)
  if (grieta > 0.01) {
    const ptsGrieta = [
      [3, -214],
      [-7, -135],
      [8, -58],
      [-9, 18],
      [6, 94],
      [-5, 162],
      [2, 214],
    ];
    const nSeg = ptsGrieta.length - 1;
    const hasta = nSeg * Math.min(1, grieta * 1.15);

    g.save();
    g.globalCompositeOperation = "lighter";
    g.strokeStyle = HH.coral;
    g.lineWidth = 7;
    g.shadowColor = HH.champagne;
    g.shadowBlur = 26;
    g.beginPath();
    g.moveTo(ptsGrieta[0][0], ptsGrieta[0][1]);
    for (let i = 1; i <= nSeg; i++) {
      if (i <= hasta) {
        g.lineTo(ptsGrieta[i][0], ptsGrieta[i][1]);
      } else if (i - 1 < hasta) {
        const u = hasta - (i - 1);
        g.lineTo(
          mez(ptsGrieta[i - 1][0], ptsGrieta[i][0], u),
          mez(ptsGrieta[i - 1][1], ptsGrieta[i][1], u)
        );
      }
    }
    g.stroke();
    g.strokeStyle = HH.creamSoft;
    g.lineWidth = 2.5;
    g.stroke();
    g.restore();
  }

  g.restore();
}

export function nucleoEsencia3D(g, x, y, r, t, fuerza = 1, kintsugi = 0) {
  if (fuerza <= 0.01) return;
  g.save();
  g.translate(x, y);

  const lat = 1 + 0.08 * latidoRitmo(t) + 0.04 * Math.sin(t * 4.2);
  const R = r * lat;

  k.luzCalida(g, 0, 0, R * 3.5, 0.85 * fuerza, "122,91,161");
  k.luzCalida(g, 0, 0, R * 2.6, 0.92 * fuerza, ORO_RGB);
  k.luzCalida(g, 0, 0, R * 1.6, 0.80 * fuerza, "240,205,160");

  // Anillos orbitales en champagne y lavanda girando alrededor del núcleo
  g.save();
  g.globalCompositeOperation = "lighter";
  for (let i = 0; i < 2; i++) {
    g.save();
    g.rotate(t * (0.9 + i * 0.5) * (i % 2 === 0 ? 1 : -1));
    g.strokeStyle = i === 0 ? `rgba(${ORO_RGB},${0.48 * fuerza})` : `rgba(${LAVANDA_RGB},${0.38 * fuerza})`;
    g.lineWidth = 3;
    g.beginPath();
    g.ellipse(0, 0, R * (1.35 + i * 0.22), R * 0.58, 0, 0, Math.PI * 2);
    g.stroke();
    g.restore();
  }
  g.restore();

  g.save();
  g.beginPath();
  g.arc(0, 0, R, 0, Math.PI * 2);
  g.clip();

  const ng = g.createRadialGradient(-R * 0.28, -R * 0.28, R * 0.08, 0, 0, R);
  ng.addColorStop(0, HH.creamSoft);
  ng.addColorStop(0.28, HH.champagneLight);
  ng.addColorStop(0.58, HH.champagne);
  ng.addColorStop(0.82, HH.coral);
  ng.addColorStop(0.95, HH.violet);
  ng.addColorStop(1, HH.aubergine);
  g.fillStyle = ng;
  g.fillRect(-R, -R, R * 2, R * 2);

  g.globalCompositeOperation = "screen";
  g.globalAlpha = 0.52;
  const offC = (t * 85) % (R * 2);
  g.drawImage(causticas, -R - offC, -R, R * 4, R * 2.2);

  if (kintsugi > 0.02) {
    g.globalCompositeOperation = "lighter";
    g.globalAlpha = Math.min(1, kintsugi);
    g.strokeStyle = HH.creamSoft;
    g.lineWidth = 4.5;
    g.shadowColor = HH.champagne;
    g.shadowBlur = 18;
    g.beginPath();
    g.moveTo(-R * 0.65, -R * 0.45);
    g.quadraticCurveTo(-R * 0.1, 0, R * 0.72, R * 0.35);
    g.moveTo(R * 0.45, -R * 0.68);
    g.quadraticCurveTo(0, -R * 0.1, -R * 0.55, R * 0.6);
    g.stroke();
  }
  g.restore();

  g.strokeStyle = "rgba(240, 205, 160, 0.88)";
  g.lineWidth = 3.5;
  g.beginPath();
  g.arc(0, 0, R, 0, Math.PI * 2);
  g.stroke();

  g.restore();
}
