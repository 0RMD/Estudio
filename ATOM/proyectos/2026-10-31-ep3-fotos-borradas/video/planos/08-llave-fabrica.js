// Plano 08 (Frase 9):
// «Entra a Ajustes y usa Restablecer de fábrica: eso destruye la llave secreta y bloquea todo el chip.»
// Estudio claro ("menta") de alto contraste tras el plano nocturno:
// - Arriba: Tarjeta limpia de Ajustes con botón azul "Restablecer de fábrica" pulsado por el dedo.
// - Abajo: Bóveda del chip donde la llave dorada criptográfica estalla en fragmentos luminosos en «destruye la llave»
//   convirtiendo al instante toda la memoria en nieve cifrada 100 % ilegible.
import * as k from "#kit";
import { v } from "#voz";
import {
  camino2D,
  capaSuperiorMarca,
  dibujarDedo,
  dibujarFotoRecuerdo,
  dibujarLlaveCripto,
  fondoMesaClara,
  pildoraEstado,
  redondo,
  relojPlano,
  sinVista,
  vista,
  vineta,
} from "../mundo.js";

export const desde = (v) => v.frase(9).inicio - 0.04;

const { suave, tramo, entra, mez } = k;

export function dibuja(g, t) {
  const f9 = v.frase(9);
  const t0 = f9.inicio - 0.04;
  const tCorte = v.frase(10).inicio - 0.04;
  const tr = relojPlano(t, tCorte, 0.16, 0.24);

  const tAjustes = f9.t("Ajustes");
  const tRestablecer = f9.t("Restablecer");
  const tFabrica = f9.t("fábrica");
  const tDestruye = f9.t("destruye");
  const tLlave = f9.t("llave");
  const tBloquea = f9.t("bloquea");

  fondoMesaClara(g, tr, "menta");

  const cam = camino2D([
    [t0, [1.02, 540, 1020]],
    [tFabrica, [1.04, 540, 1110]],
    [tBloquea + 0.2, [1.08, 540, 1210]],
    [tCorte - 0.18, [1.08, 540, 1210]],
  ]);
  const [Z, cx, cy] = cam(tr);

  const slideY = (1 - entra(tramo(tr, t0, t0 + 0.22))) * 34;
  const uToque = suave(tramo(tr, tRestablecer - 0.05, tFabrica + 0.1));
  const uRompe = suave(tramo(tr, tDestruye - 0.05, tLlave + 0.45));
  const uCifra = suave(tramo(tr, tLlave - 0.05, tBloquea + 0.25));

  g.save();
  vista(g, Z, cx, cy);
  g.translate(0, slideY);

  // ---------------- TARJETA SUPERIOR: AJUSTES > RESTABLECER DE FÁBRICA ----------------
  const cX = 92;
  const c1Y = 605;
  const cW = 896;
  const c1H = 340;

  g.shadowColor = "rgba(15, 45, 38, 0.22)";
  g.shadowBlur = 36;
  g.shadowOffsetY = 16;
  redondo(g, cX, c1Y, cW, c1H, 34);
  g.fillStyle = "#0d1b22";
  g.fill();
  g.shadowBlur = 0;
  g.shadowOffsetY = 0;
  g.strokeStyle = "#10b981";
  g.lineWidth = 4;
  g.stroke();

  g.textAlign = "left";
  g.textBaseline = "middle";
  g.font = "800 26px Figtree";
  g.fillStyle = "#6ee7b7";
  g.fillText("✓ AJUSTES › GENERAL › TRANSFERIR O RESTABLECER", cX + 42, c1Y + 62);

  // Botón grande «Restablecer de fábrica»
  const btnX = 540;
  const btnY = c1Y + 205;
  const btnW = 790;
  const btnH = 128;

  redondo(g, btnX - btnW / 2, btnY - btnH / 2, btnW, btnH, 26);
  g.fillStyle = uToque > 0.5 ? "#10b981" : "#2563eb";
  g.fill();
  g.strokeStyle = "#ffffff";
  g.lineWidth = 3;
  g.stroke();

  g.textAlign = "center";
  g.font = "800 40px Figtree";
  g.fillStyle = uToque > 0.5 ? "#041812" : "#ffffff";
  g.fillText(uToque > 0.5 ? "✓ Restablecido de fábrica" : "Restablecer de fábrica", btnX, btnY + 2);

  // Dedo pulsando el botón
  const uEntraD = suave(tramo(tr, tAjustes + 0.1, tRestablecer + 0.05));
  const uSaleD = suave(tramo(tr, tFabrica + 0.05, tDestruye));
  const alD = uEntraD * (1 - uSaleD);
  if (alD > 0.02) {
    g.save();
    g.globalAlpha = alD;
    const dx = mez(890, btnX + 160, uEntraD) + uSaleD * 210;
    const dy = mez(1120, btnY + 18, uEntraD) + uSaleD * 120;
    const pres = suave(tramo(tr, tRestablecer, tFabrica)) * (1 - uSaleD);
    dibujarDedo(g, dx, dy, -0.28, pres, 0.92);
    g.restore();
  }

  // ---------------- TARJETA INFERIOR: LLAVE SECRETA AES + CHIP BLOQUEADO ----------------
  const c2Y = 995;
  const c2H = 605;

  g.shadowColor = "rgba(15, 45, 38, 0.26)";
  g.shadowBlur = 40;
  g.shadowOffsetY = 18;
  redondo(g, cX, c2Y, cW, c2H, 36);
  g.fillStyle = "#08131a";
  g.fill();
  g.shadowBlur = 0;
  g.shadowOffsetY = 0;
  g.strokeStyle = uCifra > 0.5 ? "#22e39b" : "#fbbf24";
  g.lineWidth = 4.5;
  g.stroke();

  // Mitad izquierda: Llave criptográfica dorada que se destruye
  g.textAlign = "center";
  g.font = "800 25px Figtree";
  g.fillStyle = uRompe > 0.4 ? "#fca5a5" : "#fde047";
  g.fillText(uRompe > 0.4 ? "LLAVE DESTRUIDA" : "LLAVE SECRETA DEL CHIP", cX + 225, c2Y + 66);

  dibujarLlaveCripto(g, cX + 225, c2Y + 295, 1.08, uRompe, tr);

  g.font = "700 23px Figtree";
  g.fillStyle = "#94a3b8";
  g.fillText(uRompe > 0.4 ? "0 claves restantes" : "Cifrado AES-256", cX + 225, c2Y + 515);

  // Separador vertical
  g.strokeStyle = "rgba(148, 163, 184, 0.22)";
  g.lineWidth = 2.5;
  g.beginPath();
  g.moveTo(540, c2Y + 46);
  g.lineTo(540, c2Y + c2H - 46);
  g.stroke();

  // Mitad derecha: Bloque del chip convirtiéndose en nieve criptográfica bloqueada
  const rxChip = cX + 670;
  g.font = "800 25px Figtree";
  g.fillStyle = uCifra > 0.5 ? "#6ee7b7" : "#cbd5e1";
  g.fillText(uCifra > 0.5 ? "✓ CHIP 100 % BLOQUEADO" : "DATOS EN EL CHIP", rxChip, c2Y + 66);

  dibujarFotoRecuerdo(g, rxChip, c2Y + 295, 340, 310, {
    marco: false,
    rejilla: 0.7,
    cifrado: uCifra,
    t: tr,
  });

  if (uCifra > 0.45) {
    g.save();
    g.globalAlpha = (uCifra - 0.45) / 0.55;
    redondo(g, rxChip - 135, c2Y + 485, 270, 56, 16);
    g.fillStyle = "#064e3b";
    g.fill();
    g.strokeStyle = "#22e39b";
    g.lineWidth = 3;
    g.stroke();
    g.fillStyle = "#6ee7b7";
    g.font = "800 24px Figtree";
    g.fillText("✓ IRRECUPERABLE", rxChip, c2Y + 513);
    g.restore();
  }

  g.restore();

  sinVista(g);
  const alPil = entra(tramo(tr, tDestruye - 0.08, tBloquea + 0.15));
  pildoraEstado(g, 540, 1715, "SIN LLAVE SECRETA → NADIE PUEDE LEER EL CHIP", "16, 185, 129", alPil, 34, true);

  vineta(g, 0.3);
  capaSuperiorMarca(g, 0.68);
}
