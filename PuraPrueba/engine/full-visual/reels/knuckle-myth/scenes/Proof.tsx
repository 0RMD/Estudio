// Escena 3: `proof`, dark (Doble Ilustración: radiografías sanas de ambas manos -> burbuja de gas en la articulación)
// "¿El resultado? Cero artritis en las dos. Ese crujido es solo una burbuja de gas."
import React from "react";
import { arrive, countTo, ease, pop, prog, useScene } from "../../../src/engine";
import { LEAD } from "../../../src/engine/Stage";
import {
  DualIllustrationStage,
  EvidenceHeader,
  ImpactRig,
  KineticStamp,
  lerp,
  ShockwaveBurst,
  STAGE,
  TECH,
  TechLabBackdrop,
} from "./parts";

/** Burbujas de gas que suben dentro del líquido sinovial a 60 fps. */
const GasBubbles: React.FC<{ active: boolean }> = ({ active }) => {
  const { f } = useScene();
  if (!active) return null;
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {Array.from({ length: 12 }).map((_, i) => {
        const cycle = ((f * (1.1 + (i % 3) * 0.35) + i * 47) % 200) / 200;
        const x = 300 + ((i * 53) % 270) + Math.sin(f * 0.1 + i) * 16;
        const y = lerp(380, 40, cycle);
        const sz = 10 + (i % 4) * 5;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: sz,
              height: sz,
              borderRadius: 999,
              border: "2.5px solid #E0FFFF",
              background: "rgba(0,240,255,0.25)",
              boxShadow: "0 0 12px #00F0FF",
              opacity: (1 - cycle) * 0.9,
            }}
          />
        );
      })}
    </div>
  );
};

const Bar: React.FC<{ label: string; sub: string; pct: number; color: string }> = ({ label, sub, pct, color }) => {
  const { theme, ground } = useScene();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span style={{ fontFamily: theme.font.ui, fontSize: 34, fontWeight: 900, color: ground.ink }}>
          {label} <span style={{ fontSize: 32, fontWeight: 700, color: ground.dim }}>{sub}</span>
        </span>
        <span style={{ fontFamily: theme.font.mono, fontSize: 36, fontWeight: 900, color: pct <= 0 ? TECH.emerald : TECH.crimson, fontVariantNumeric: "tabular-nums" }}>
          {pct <= 0 ? "0%" : "¿?"}
        </span>
      </div>
      <div style={{ width: "100%", height: 16, borderRadius: 999, background: "rgba(255,255,255,0.10)", overflow: "hidden" }}>
        <div
          style={{
            width: `${Math.max(pct, 0).toFixed(1)}%`,
            height: "100%",
            borderRadius: 999,
            background: color,
            boxShadow: `0 0 14px ${color}`,
          }}
        />
      </div>
    </div>
  );
};

export const Proof: React.FC = () => {
  const { f, theme, ground, scene, cue } = useScene();
  const t0 = scene.from - LEAD;
  const cCero = cue("cero");
  const cDos = cue("dos");
  const cCrujido = cue("crujido");
  const cBurbuja = cue("burbuja");
  const cGas = cue("gas");

  const cleared = f >= cCero - 2;
  const bubble = f >= cBurbuja - 2;
  const pctL = cleared ? countTo(f, cCero - 2, 16, 62, 0) : 62;
  const pctR = f >= cDos - 4 ? countTo(f, cDos - 4, 14, 58, 0) : 58;

  return (
    <ImpactRig triggers={[cCero - 2, cBurbuja - 2]} intensity={10}>
      <TechLabBackdrop emerald={cleared && !bubble} />

      <DualIllustrationStage
        srcA="knu-05.jpg"
        srcB="knu-06.jpg"
        at={t0}
        flipAt={cBurbuja - 2}
        mode="whip"
        top={526}
        height={430}
        accentA={cleared ? TECH.emerald : TECH.cyanBright}
        accentB={TECH.cyanBright}
        vfx={<GasBubbles active={bubble} />}
      >
        {!bubble ? (
          <KineticStamp at={cCero - 2} text="✓ CERO ARTRITIS EN AMBAS" bg={TECH.emerald} ink="#042217" tilt={-2.5} />
        ) : (
          <KineticStamp at={cGas - 2} text="🫧 SOLO UNA BURBUJA DE GAS" bg={TECH.cyanBright} ink="#041622" tilt={-2} />
        )}
      </DualIllustrationStage>

      <ShockwaveBurst at={cCero - 2} x={540} y={740} color={TECH.emerald} size={260} />
      <ShockwaveBurst at={cBurbuja - 2} x={540} y={740} color={TECH.cyanBright} size={260} />

      {/* Resultado final del expediente + mecanismo del crujido */}
      <div
        style={{
          position: "absolute",
          left: STAGE.left,
          top: 972,
          width: STAGE.safeWidth,
          height: 464,
          borderRadius: 28,
          padding: "20px 26px",
          boxSizing: "border-box",
          background: TECH.darkCard,
          boxShadow: `0 24px 58px rgba(0,0,0,0.58), 0 0 26px ${cleared ? "rgba(0,230,153,0.18)" : "rgba(0,240,255,0.12)"}, inset 0 0 0 2.5px ${
            bubble ? TECH.cyanBright : cleared ? TECH.emerald : TECH.borderDark
          }`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          transform: `translateY(${((1 - arrive(f, t0 + 3, 15)) * 100).toFixed(1)}px)`,
          opacity: prog(f, t0 + 3, 4, ease.linear),
        }}
      >
        <EvidenceHeader
          tag="RESULTADO"
          title="Tras 60 años"
          rightText={cleared ? "0 / 2" : "¿?"}
          accent={cleared ? TECH.emerald : TECH.cyanBright}
        />

        <Bar label="IZQ" sub="(tronada)" pct={pctL} color={pctL <= 0 ? TECH.emerald : TECH.crimson} />
        <Bar label="DER" sub="(nunca)" pct={pctR} color={pctR <= 0 ? TECH.emerald : TECH.crimson} />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "12px 16px",
            borderRadius: 18,
            background: f >= cCrujido - 2 ? "rgba(0,240,255,0.10)" : "rgba(255,255,255,0.03)",
            boxShadow: `inset 0 0 0 2px ${f >= cCrujido - 2 ? TECH.cyanBright : TECH.borderDark}`,
            ...(f >= cCrujido - 2 ? pop(f, cCrujido - 2, { dur: 10, from: 0.9 }) : {}),
          }}
        >
          <span style={{ fontSize: 40 }}>{bubble ? "🫧" : "💥"}</span>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontFamily: theme.font.ui, fontSize: 32, fontWeight: 900, color: ground.ink }}>
              {bubble ? "Gas en el líquido sinovial" : f >= cCrujido - 2 ? "¿Y el crujido?" : "Radiografía de ambas manos"}
            </span>
            <span style={{ fontFamily: theme.font.mono, fontSize: 32, fontWeight: 700, color: ground.dim }}>
              {bubble ? "Resonancia · PLOS ONE 2015" : "Unger · Arthritis & Rheum. 1998"}
            </span>
          </div>
        </div>
      </div>
    </ImpactRig>
  );
};
