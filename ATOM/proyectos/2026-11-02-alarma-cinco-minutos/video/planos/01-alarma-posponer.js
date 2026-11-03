import * as k from "#kit";
import { v } from "#voz";

export const desde = 0;

const Tposponer = v.frase(1).t("posponer");
const T5 = v.frase(1).t("5");
const Tcansado = v.frase(1).t("cansado");
const Tf2 = v.frase(2).inicio;
const Tinicia = v.frase(2).t("inicia");
const Tprofundo = v.frase(2).t("profundo");

export function dibuja(g, t) {
  const uPos = k.entra(k.tramo(t, Tposponer, T5 + 0.25));
  const uCansado = k.suave(k.tramo(t, Tcansado - 0.1, Tcansado + 0.4));
  const uCiclo = k.suave(k.tramo(t, Tf2 - 0.15, Tf2 + 0.65));
  const uBaja = k.suave(k.tramo(t, Tinicia - 0.1, Tprofundo + 0.25));

  k.fondoClaro(g, {
    tono: uCiclo > 0.5 ? "185,210,255" : uCansado > 0.5 ? "255,205,195" : "255,228,185",
    luz: [540, 820],
    fuerza: 1.15,
  });

  // --- Frase 1: El celular sonando 07:00 y el botón POSPONER +5 MIN ---
  const opCel = 1 - uCiclo;
  if (opCel > 0.02) {
    g.save();
    g.globalAlpha = opCel;
    const vibra = (1 - uPos) * Math.sin(t * 45) * 9;
    const cx = 540 + vibra, cy = 1040 - uCiclo * 300;
    k.sombraSuave(g, 540, cy + 370, 440, 68, 0.26);

    // Cuerpo del celular en Modo Claro
    k.redondo(g, cx - 220, cy - 330, 440, 660, 58);
    g.fillStyle = "#1e293b";
    g.fill();
    k.redondo(g, cx - 202, cy - 312, 404, 624, 44);
    g.fillStyle = "#f8fafc";
    g.fill();

    // Hora gigante
    g.fillStyle = "#111317";
    g.font = "800 108px Figtree";
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.fillText(uPos > 0.6 ? "07:05" : "07:00", cx, cy - 130);

    // Botón gigante naranja POSPONER +5 MIN
    const hundir = 1 - 0.08 * k.pulso(t, T5, 0.22);
    g.save();
    g.translate(cx, cy + 45);
    g.scale(hundir, hundir);
    k.redondo(g, -165, -58, 330, 116, 34);
    g.fillStyle = "#f59e0b";
    g.fill();
    g.fillStyle = "#ffffff";
    g.font = "800 38px Figtree";
    g.fillText("POSPONER +5 MIN", 0, 2);
    g.restore();

    // Barra de energía de todo el día que cae al 15% en rojo
    const nivel = 0.85 - uCansado * 0.7;
    k.redondo(g, cx - 165, cy + 175, 330, 56, 20);
    g.fillStyle = "#e2e8f0";
    g.fill();
    k.redondo(g, cx - 159, cy + 181, Math.max(40, 318 * nivel), 44, 16);
    g.fillStyle = uCansado > 0.4 ? "#dc2626" : "#10b981";
    g.fill();

    g.fillStyle = "#111317";
    g.font = "800 30px Figtree";
    g.fillText(uCansado > 0.4 ? "ENERGÍA DEL DÍA: 15%" : "ENERGÍA DEL DÍA", cx, cy + 265);
    g.restore();
  }

  // --- Frase 2: El cerebro inicia un ciclo nuevo de 90 min y baja profundo ---
  if (uCiclo > 0.02) {
    g.save();
    g.globalAlpha = uCiclo;
    const px = 140, py = 720, pw = 800, ph = 640;
    k.sombraSuave(g, 540, py + ph + 50, 760, 70, 0.24);

    k.redondo(g, px, py, pw, ph, 46);
    g.fillStyle = "#ffffff";
    g.fill();
    g.strokeStyle = "rgba(15,23,42,0.14)";
    g.lineWidth = 5;
    g.stroke();

    // Franja inferior de SUEÑO PROFUNDO
    k.redondo(g, px + 24, py + ph - 210, pw - 48, 186, 30);
    g.fillStyle = "rgba(59,130,246,0.12)";
    g.fill();
    g.fillStyle = "#1d4ed8";
    g.font = "800 32px Figtree";
    g.textAlign = "center";
    g.fillText("ZONA DE SUEÑO PROFUNDO (CICLO 90 MIN)", 540, py + ph - 55);

    // Curva de descenso hacia el sueño profundo
    g.strokeStyle = "#2563eb";
    g.lineWidth = 14;
    g.lineCap = "round";
    g.beginPath();
    const pasos = 40;
    const maxI = Math.max(2, Math.floor(pasos * uBaja));
    let bx = px + 90, by = py + 130;
    for (let i = 0; i <= maxI; i++) {
      const u = i / pasos;
      const x = px + 90 + u * (pw - 180);
      const y = py + 130 + Math.pow(u, 1.35) * 340;
      if (i === 0) g.moveTo(x, y);
      else g.lineTo(x, y);
      bx = x;
      by = y;
    }
    g.stroke();

    // Esfera del cerebro descendiendo
    g.fillStyle = "#1d4ed8";
    g.beginPath();
    g.arc(bx, by, 38, 0, Math.PI * 2);
    g.fill();
    g.fillStyle = "#ffffff";
    g.font = "800 24px Figtree";
    g.textBaseline = "middle";
    g.fillText("Zzz", bx, by);

    // Título del panel
    g.fillStyle = "#111317";
    g.font = "800 38px Figtree";
    g.fillText("NUEVO CICLO INICIADO", 540, py + 68);
    g.restore();
  }
}
