// Escena 2: `test`, light (Split 50/50: mano izquierda tronada con chispas | mano derecha quieta)
// "Se tronó solo la izquierda, nunca la derecha."
import React from "react";
import { arrive, countTo, ease, pop, prog, useScene } from "../../../src/engine";
import { LEAD } from "../../../src/engine/Stage";
import { DualIllustrationStage, ImpactRig, ShockwaveBurst, STAGE, TECH, TechLabBackdrop } from "./parts";

const fmt = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

export const Test: React.FC = () => {
  const { f, theme, ground, scene, cue } = useScene();
  const t0 = scene.from - LEAD;
  const cIzq = cue("izquierda");
  const cNunca = cue("nunca");
  const cDer = cue("derecha");

  // al menos 2 veces al día x 365 días x 60 años = 43.800 chasquidos
  const cracks = Math.round(countTo(f, cIzq - 4, 50, 0, 43800));
  const rightOn = f >= cDer - 4;

  const tag = (text: string, color: string, side: "left" | "right", at: number) => (
    <div
      style={{
        position: "absolute",
        [side]: 14,
        bottom: 14,
        padding: "7px 16px",
        borderRadius: 14,
        background: "rgba(7, 11, 20, 0.9)",
        boxShadow: `inset 0 0 0 2.5px ${color}`,
        fontFamily: theme.font.mono,
        fontSize: 32,
        fontWeight: 900,
        color,
        zIndex: 15,
        ...pop(f, at, { dur: 10, from: 0.8 }),
      }}
    >
      {text}
    </div>
  );

  return (
    <ImpactRig triggers={[cIzq - 2, cDer - 2]} intensity={9}>
      <TechLabBackdrop emerald={rightOn} />

      <DualIllustrationStage
        srcA="knu-03.jpg"
        srcB="knu-04.jpg"
        at={t0}
        flipAt={cDer - 4}
        mode="split"
        top={526}
        height={470}
        accentA={TECH.cyanBright}
        accentB={TECH.amber}
      >
        {f >= cIzq - 2 && tag("IZQ · SÍ", TECH.cyanBright, "left", cIzq - 2)}
        {rightOn && tag("DER · NUNCA", TECH.amber, "right", cDer - 2)}
      </DualIllustrationStage>

      <ShockwaveBurst at={cIzq - 2} x={330} y={760} color={TECH.cyanBright} size={220} />
      <ShockwaveBurst at={cDer - 2} x={760} y={760} color={TECH.amber} size={220} />

      {/* Contador de chasquidos: izquierda sube, derecha se queda en 0 */}
      <div
        style={{
          position: "absolute",
          left: STAGE.left,
          top: 1012,
          width: STAGE.safeWidth,
          height: 424,
          borderRadius: 28,
          padding: "22px 26px",
          boxSizing: "border-box",
          background: TECH.lightCard,
          boxShadow: `0 22px 52px rgba(15, 23, 42, 0.14), inset 0 0 0 2.5px ${rightOn ? TECH.amber : TECH.cyan}`,
          display: "flex",
          flexDirection: "column",
          gap: 16,
          transform: `translateY(${((1 - arrive(f, t0 + 3, 15)) * 100).toFixed(1)}px)`,
          opacity: prog(f, t0 + 3, 4, ease.linear),
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: theme.font.ui, fontSize: 36, fontWeight: 900, color: ground.ink }}>Chasquidos en 60 años</span>
          <span
            style={{
              padding: "4px 14px",
              borderRadius: 12,
              background: TECH.cyan,
              color: "#041622",
              fontFamily: theme.font.mono,
              fontSize: 32,
              fontWeight: 900,
            }}
          >
            2 AL DÍA
          </span>
        </div>

        <div style={{ display: "flex", gap: 16, flex: 1 }}>
          <div
            style={{
              flex: 1,
              borderRadius: 22,
              padding: "18px 20px",
              background: "linear-gradient(145deg, rgba(0,210,255,0.16) 0%, rgba(0,230,153,0.06) 100%)",
              boxShadow: `inset 0 0 0 2.5px ${TECH.cyan}`,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <span style={{ fontFamily: theme.font.mono, fontSize: 32, fontWeight: 900, color: "#0284C7" }}>MANO IZQ</span>
            <span style={{ fontFamily: theme.font.mono, fontSize: 64, fontWeight: 900, color: ground.ink, fontVariantNumeric: "tabular-nums" }}>
              +{fmt(cracks)}
            </span>
            <span style={{ fontFamily: theme.font.ui, fontSize: 32, fontWeight: 700, color: ground.dim }}>¡crac, crac!</span>
          </div>
          <div
            style={{
              flex: 1,
              borderRadius: 22,
              padding: "18px 20px",
              background: f >= cNunca - 2 ? "linear-gradient(145deg, rgba(255,184,0,0.20) 0%, rgba(255,184,0,0.06) 100%)" : "#F1F5F9",
              boxShadow: `inset 0 0 0 2.5px ${f >= cNunca - 2 ? TECH.amber : TECH.borderLight}`,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              ...(f >= cNunca - 2 ? pop(f, cNunca - 2, { dur: 10, from: 0.88 }) : {}),
            }}
          >
            <span style={{ fontFamily: theme.font.mono, fontSize: 32, fontWeight: 900, color: "#B45309" }}>MANO DER</span>
            <span style={{ fontFamily: theme.font.mono, fontSize: 64, fontWeight: 900, color: ground.ink }}>0</span>
            <span style={{ fontFamily: theme.font.ui, fontSize: 32, fontWeight: 700, color: ground.dim }}>Ni una vez</span>
          </div>
        </div>
      </div>
    </ImpactRig>
  );
};
