// Plano 03 (Frases 3 y 4):
// F3: «La memoria de tu celular se desgasta si borra cada celda con electricidad al momento.»
// F4: «Por eso el sistema solo tacha su dirección y marca ese hueco como espacio libre.»
// Interior oscuro 3D del chip NAND Flash con viaje continuo de cámara:
// - En F3 vemos las 6 celdas de silicio abajo: descargas eléctricas golpean y agrietan las paredes de óxido
//   bajando la barra de VIDA ÚTIL (mostrando por qué borrar con voltaje cada vez desgasta el chip).
// - En F4 paran las descargas, las celdas con la foto quedan intactas y la cámara sube a la TABLA DE DIRECCIONES
//   del chip, donde un trazo rojo tacha la ruta `0x4F2A -> IMG_2048` y estampa `ESPACIO LIBRE`.
import * as k from "#kit";
import { v } from "#voz";
import {
  camino2D,
  capaSuperiorMarca,
  dibujarChispas,
  dibujarFotoRecuerdo,
  pildoraEstado,
  redondo,
  relojPlano,
  sinVista,
  vista,
  vineta,
} from "../mundo.js";

export const desde = (v) => v.frase(3).inicio - 0.04;

const { suave, tramo, entra, mez, mezColor } = k;

export function dibuja(g, t) {
  const f3 = v.frase(3);
  const f4 = v.frase(4);
  const t0 = f3.inicio - 0.04;
  const tCorte = v.frase(5).inicio - 0.04;
  const tr = relojPlano(t, tCorte, 0.16, 0.24);

  const tDesgasta = f3.t("desgasta");
  const tElectricidad = f3.t("electricidad");
  const tSistema = f4.t("sistema");
  const tTacha = f4.t("tacha");
  const tDireccion = f4.t("dirección");
  const tMarca = f4.t("marca");
  const tLibre = f4.t("libre");

  // Cámara oscura de silicio profundo
  g.save();
  sinVista(g);
  const bg = g.createLinearGradient(0, 0, 0, 1920);
  bg.addColorStop(0, "#050913");
  bg.addColorStop(0.5, "#0a1728");
  bg.addColorStop(1, "#060e1a");
  g.fillStyle = bg;
  g.fillRect(0, 0, 1080, 1920);

  // Pistas de circuito sutiles de fondo
  g.strokeStyle = "rgba(56, 189, 248, 0.09)";
  g.lineWidth = 2;
  for (let x = 90; x < 1080; x += 150) {
    g.beginPath(); g.moveTo(x, 540); g.lineTo(x, 1860); g.stroke();
  }
  k.brillo(g, 540, 1180, 900, "34, 211, 238", 0.2);
  g.restore();

  // Viaje continuo: primero enfoca las celdas de silicio abajo (F3) y luego sube a la Tabla de Direcciones (F4)
  const cam = camino2D([
    [t0, [1.14, 540, 1345]],
    [tElectricidad + 0.2, [1.16, 540, 1335]],
    [tSistema + 0.15, [1.03, 540, 1075]],
    [tLibre + 0.2, [1.05, 540, 1045]],
    [tCorte - 0.18, [1.05, 540, 1045]],
  ]);
  const [Z, cx, cy] = cam(tr);

  // Envolvente del ataque eléctrico en F3 (se apaga suavemente al entrar F4)
  const uArco = suave(tramo(tr, tDesgasta - 0.2, tElectricidad + 0.15)) * (1 - suave(tramo(tr, f4.inicio - 0.15, tSistema + 0.15)));
  const desgaste = suave(tramo(tr, tDesgasta - 0.15, tElectricidad + 0.35)) * (1 - suave(tramo(tr, f4.inicio - 0.1, tSistema + 0.2)));

  const uTacha = suave(tramo(tr, tTacha - 0.05, tDireccion + 0.22));
  const uLibre = entra(tramo(tr, tMarca + 0.05, tLibre + 0.15));

  g.save();
  vista(g, Z, cx, cy);

  // ---------------- ZONA SUPERIOR (y = 610..1040): TABLA DE DIRECCIONES DEL SISTEMA ----------------
  const tabX = 100;
  const tabY = 615;
  const tabW = 880;
  const tabH = 410;
  const alTabla = suave(tramo(tr, f4.inicio - 0.25, tSistema + 0.12));

  g.save();
  g.globalAlpha = alTabla;
  g.shadowColor = "rgba(0, 0, 0, 0.58)";
  g.shadowBlur = 36;
  redondo(g, tabX, tabY, tabW, tabH, 32);
  g.fillStyle = "#0e1a2b";
  g.fill();
  g.shadowBlur = 0;
  g.strokeStyle = "#38bdf8";
  g.lineWidth = 3.5;
  g.stroke();

  g.textAlign = "left";
  g.textBaseline = "middle";
  g.font = "800 26px Figtree";
  g.fillStyle = "#7dd3fc";
  g.fillText("ÍNDICE DE DIRECCIONES DEL SISTEMA", tabX + 42, tabY + 54);

  const filas = [
    { dir: "0x4F29", nom: "IMG_2047.JPG", est: "OCUPADO", activo: false },
    { dir: "0x4F2A", nom: "IMG_2048.JPG (Tu foto)", est: "OCUPADO", activo: true },
    { dir: "0x4F2B", nom: "NOTAS_VOZ.M4A", est: "OCUPADO", activo: false },
  ];

  filas.forEach((f, idx) => {
    const fy = tabY + 110 + idx * 94;
    redondo(g, tabX + 34, fy, tabW - 68, 76, 18);
    g.fillStyle = f.activo ? "#16263d" : "rgba(15, 23, 42, 0.7)";
    g.fill();
    g.strokeStyle = f.activo ? (uLibre > 0.2 ? "#22e39b" : "#f87171") : "rgba(148, 163, 184, 0.22)";
    g.lineWidth = f.activo ? 3 : 1.5;
    g.stroke();

    g.font = "700 25px Figtree";
    g.fillStyle = "#94a3b8";
    g.fillText(f.dir, tabX + 62, fy + 38);

    g.font = "800 28px Figtree";
    g.fillStyle = f.activo && uTacha > 0.2 ? "#64748b" : "#f1f5f9";
    g.fillText(f.nom, tabX + 195, fy + 38);

    // Trazo rojo tachando solo la dirección en «tacha su dirección»
    if (f.activo && uTacha > 0.02) {
      g.strokeStyle = "#ef4444";
      g.lineWidth = 6;
      g.lineCap = "round";
      g.beginPath();
      g.moveTo(tabX + 188, fy + 38);
      g.lineTo(tabX + 188 + 355 * uTacha, fy + 38);
      g.stroke();
    }

    // Pastilla de estado a la derecha: cambia a «ESPACIO LIBRE»
    if (f.activo && uLibre > 0.02) {
      g.save();
      const sc = 0.85 + 0.15 * uLibre;
      g.translate(tabX + tabW - 180, fy + 38);
      g.scale(sc, sc);
      redondo(g, -128, -24, 256, 48, 14);
      g.fillStyle = "#22e39b";
      g.fill();
      g.textAlign = "center";
      g.font = "800 23px Figtree";
      g.fillStyle = "#04130e";
      g.fillText("ESPACIO LIBRE", 0, 1);
      g.restore();
    } else {
      g.textAlign = "right";
      g.font = "700 23px Figtree";
      g.fillStyle = "#64748b";
      g.fillText(f.est, tabX + tabW - 64, fy + 38);
      g.textAlign = "left";
    }
  });
  g.restore();

  // Conector vertical entre la fila 0x4F2A y las celdas físicas abajo
  g.save();
  g.strokeStyle = uTacha > 0.4 ? "rgba(248, 113, 113, 0.45)" : "rgba(56, 189, 248, 0.55)";
  g.lineWidth = 4;
  g.setLineDash([12, 10]);
  g.beginPath();
  g.moveTo(540, tabY + tabH + 6);
  g.lineTo(540, 1100);
  g.stroke();
  g.setLineDash([]);
  g.restore();

  // ---------------- ZONA INFERIOR (y = 1100..1635): CELDAS DE SILICIO NAND FLASH ----------------
  const celX = 100;
  const celY = 1100;
  const celW = 880;
  const celH = 525;

  g.save();
  redondo(g, celX, celY, celW, celH, 34);
  g.fillStyle = "#091320";
  g.fill();
  g.strokeStyle = desgaste > 0.25 ? "#fb923c" : "#22e39b";
  g.lineWidth = 4;
  g.stroke();

  // Cabecera + Barra de vida útil del óxido de las celdas
  g.textAlign = "left";
  g.textBaseline = "middle";
  g.font = "800 25px Figtree";
  g.fillStyle = desgaste > 0.25 ? "#fdba74" : "#6ee7b7";
  g.fillText(
    desgaste > 0.25 ? "BORRADO ELÉCTRICO (20 V) → DESGASTA CELDAS" : "CELDAS FÍSICAS DEL CHIP · FOTO SIN TOCAR",
    celX + 40,
    celY + 50
  );

  // Barra de salud de la celda durante F3
  const vida = Math.round(100 - desgaste * 36);
  redondo(g, celX + 40, celY + 86, celW - 80, 22, 11);
  g.fillStyle = "#1e293b";
  g.fill();
  redondo(g, celX + 40, celY + 86, ((celW - 80) * vida) / 100, 22, 11);
  g.fillStyle = mezColor("#22e39b", "#f97316", desgaste);
  g.fill();

  // 6 macro-celdas de silicio conteniendo fragmentos vivos de la fotografía
  const cols = 3;
  const rows = 2;
  const bW = 246;
  const bH = 165;
  for (let rI = 0; rI < rows; rI++) {
    for (let cI = 0; cI < cols; cI++) {
      const bx = celX + 48 + cI * (bW + 23);
      const by = celY + 135 + rI * (bH + 22);
      const tiembla = uArco > 0.05 ? Math.sin(tr * 36 + rI * 3 + cI) * uArco * 4 : 0;

      g.save();
      g.translate(tiembla, 0);
      redondo(g, bx, by, bW, bH, 20);
      g.fillStyle = "#0f1e33";
      g.fill();

      // Mini recorte de los píxeles de la foto guardada adentro
      dibujarFotoRecuerdo(g, bx + bW / 2, by + bH / 2, bW - 22, bH - 22, {
        marco: false,
        rejilla: 0.85,
        t: tr,
      });

      redondo(g, bx, by, bW, bH, 20);
      g.strokeStyle = desgaste > 0.2 ? "#fb923c" : "#22e39b";
      g.lineWidth = 3.5;
      g.stroke();

      // Grietas luminosas de desgaste de óxido cuando golpea el voltaje de borrado en F3
      if (desgaste > 0.25) {
        g.strokeStyle = `rgba(255, 180, 90, ${desgaste})`;
        g.lineWidth = 3;
        g.beginPath();
        g.moveTo(bx + 18, by + 12);
        g.lineTo(bx + 46, by + 44);
        g.lineTo(bx + 34, by + 76);
        g.stroke();
      }
      g.restore();

      if (uArco > 0.15 && (cI + rI) % 2 === 0) {
        dibujarChispas(g, bx + bW / 2, by + bH / 2, tr + cI * 0.2, uArco * 0.85, 41 + cI * 13, "251, 146, 60");
      }
    }
  }

  g.restore();
  g.restore();

  sinVista(g);
  const alP1 = entra(tramo(tr, tDesgasta - 0.08, tDesgasta + 0.22)) * (1 - suave(tramo(tr, f4.inicio - 0.28, f4.inicio - 0.04)));
  pildoraEstado(g, 540, 1710, "BORRAR CON VOLTAJE DESGASTA LA MEMORIA", "251, 146, 60", alP1, 36);

  const alP2 = entra(tramo(tr, tLibre - 0.25, tLibre + 0.16));
  pildoraEstado(g, 540, 1710, "SOLO TACHA LA RUTA · LA FOTO QUEDA ABAJO", "34, 227, 155", alP2, 36);

  vineta(g, 0.52);
  capaSuperiorMarca(g, 0.62);
}
