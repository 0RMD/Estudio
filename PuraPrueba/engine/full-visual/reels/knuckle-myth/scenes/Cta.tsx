// Escena 4: `cta`, dark (Doble Ilustración: trofeo Ig Nobel -> manos tronando del gancho = bucle continuo)
// "Sígueme para más pruebas: este médico ganó un Ig Nobel por probar que..." -> (loop) "Tronarte los dedos no te da artritis"
import React from "react";
import { Cursor, arrive, ease, pop, prog, useScene } from "../../../src/engine";
import { LEAD } from "../../../src/engine/Stage";
import {
  DualIllustrationStage,
  ImpactRig,
  KineticStamp,
  ShockwaveBurst,
  STAGE,
  TECH,
  TechLabBackdrop,
} from "./parts";

export const Cta: React.FC = () => {
  const { f, theme, ground, scene, cue } = useScene();
  const t0 = scene.from - LEAD;
  const cSigueme = cue("sígueme");
  const cPruebas = cue("pruebas");
  const cGano = cue("ganó");
  const cNobel = cue("nobel");
  const cProbar = cue("probar");

  const followed = f >= cPruebas - 2;
  const award = f >= cGano - 2;

  return (
    <ImpactRig triggers={[cPruebas - 2, cNobel - 2, cProbar - 2]} intensity={10}>
      <TechLabBackdrop emerald={followed && !award} />

      <DualIllustrationStage
        srcA="knu-07.jpg"
        srcB="knu-01.jpg"
        at={t0}
        flipAt={cProbar - 2}
        mode="whip"
        top={526}
        height={430}
        accentA={TECH.amber}
        accentB={TECH.emerald}
        showPip={false}
      >
        {f < cProbar - 2 ? (
          <KineticStamp at={cNobel - 2} text="🏆 IG NOBEL 2009" bg={TECH.amber} ink="#2A1A00" tilt={-2.5} />
        ) : (
          <KineticStamp at={cProbar - 2} text="TRONAR ≠ ARTRITIS" bg={TECH.emerald} ink="#042217" tilt={-2} />
        )}
      </DualIllustrationStage>

      <ShockwaveBurst at={cNobel - 2} x={540} y={740} color={TECH.amber} size={270} />
      <ShockwaveBurst at={cProbar - 2} x={540} y={740} color={TECH.emerald} size={250} />

      {/* Tarjeta del premio: aparece en "ganó", sello en "Nobel" */}
      <div
        style={{
          position: "absolute",
          left: STAGE.left,
          top: 972,
          width: STAGE.safeWidth,
          height: 196,
          borderRadius: 26,
          padding: "18px 24px",
          boxSizing: "border-box",
          background: TECH.darkCard,
          boxShadow: `0 18px 46px rgba(0,0,0,0.52), 0 0 24px ${award ? "rgba(255,184,0,0.22)" : "rgba(0,240,255,0.10)"}, inset 0 0 0 2.5px ${
            award ? TECH.amber : TECH.borderDark
          }`,
          display: "flex",
          alignItems: "center",
          gap: 22,
          transform: `translateY(${((1 - arrive(f, t0 + 3, 15)) * 90).toFixed(1)}px)`,
          opacity: prog(f, t0 + 3, 4, ease.linear),
        }}
      >
        <div
          style={{
            width: 132,
            height: 132,
            flex: "none",
            borderRadius: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 72,
            background: award ? "radial-gradient(circle, rgba(255,184,0,0.35) 0%, rgba(255,184,0,0.05) 70%)" : "rgba(255,255,255,0.05)",
            boxShadow: `inset 0 0 0 3px ${award ? TECH.amber : TECH.borderDark}`,
            ...(f >= cNobel - 2 ? pop(f, cNobel - 2, { dur: 12, from: 0.7 }) : {}),
          }}
        >
          {award ? "🏆" : "🔬"}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontFamily: theme.font.ui, fontSize: 38, fontWeight: 900, color: ground.ink }}>
            {award ? "Premio Ig Nobel" : "Más pruebas reales"}
          </span>
          <span style={{ fontFamily: theme.font.mono, fontSize: 32, fontWeight: 800, color: award ? TECH.amber : ground.dim }}>
            {award ? "Medicina 2009 · D. Unger" : "Mitos con fuentes"}
          </span>
        </div>
      </div>

      {/* Perfil + botón Seguir pulsado por el cursor en "pruebas" */}
      <div
        style={{
          position: "absolute",
          left: STAGE.left,
          top: 1184,
          width: STAGE.safeWidth,
          height: 222,
          borderRadius: 28,
          padding: "22px 26px",
          boxSizing: "border-box",
          background: TECH.darkCard,
          boxShadow: `0 24px 58px rgba(0,0,0,0.58), inset 0 0 0 3px ${followed ? TECH.emerald : TECH.cyanBright}`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          transform: `translateY(${((1 - arrive(f, t0 + 6, 16)) * 105).toFixed(1)}px)`,
          opacity: prog(f, t0 + 6, 4, ease.linear),
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 84,
              height: 84,
              borderRadius: 999,
              background: "linear-gradient(135deg, #FF1E56 0%, #00F0FF 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: theme.font.ui,
              fontSize: 38,
              fontWeight: 900,
              color: "#FFFFFF",
              flex: "none",
            }}
          >
            PP
          </div>
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <span style={{ fontFamily: theme.font.ui, fontSize: 36, fontWeight: 900, color: ground.ink }}>@puraprueba</span>
            <span style={{ fontFamily: theme.font.ui, fontSize: 32, fontWeight: 700, color: ground.dim }}>Mitos vs. pruebas</span>
          </div>
          <div
            style={{
              height: 66,
              padding: "0 26px",
              borderRadius: 999,
              background: followed ? TECH.emerald : TECH.crimson,
              boxShadow: `0 0 18px ${followed ? TECH.emerald : TECH.crimson}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: theme.font.ui,
              fontSize: 32,
              fontWeight: 900,
              color: followed ? "#042217" : "#FFFFFF",
              ...(followed ? pop(f, cPruebas - 2, { dur: 10, from: 0.85 }) : {}),
            }}
          >
            {followed ? "Siguiendo ✓" : "Seguir"}
          </div>
        </div>
        <span style={{ fontFamily: theme.font.ui, fontSize: 32, fontWeight: 800, color: followed ? TECH.emerald : ground.dim }}>
          {followed ? "✓ No te pierdas la próxima prueba" : "Toca Seguir para más pruebas"}
        </span>
      </div>

      <Cursor
        path={[
          { f: cSigueme - 6, x: 900, y: 1470 },
          { f: cPruebas - 4, x: 850, y: 1262 },
          { f: cPruebas + 10, x: 850, y: 1262 },
          { f: cGano + 30, x: 900, y: 1400 },
        ]}
        until={cProbar - 4}
      />
    </ImpactRig>
  );
};
