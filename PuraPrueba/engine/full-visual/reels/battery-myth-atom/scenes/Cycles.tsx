// Escena 5 Híbrida V3 (PuraPrueba V2 + ATOM Duelo de Ciclos 400 vs +1,050 a 60fps): `cycles`, dark
// "El segundo es agotarla hasta 0%: una descarga total rinde apenas 400 ciclos, pero mantenerla entre 20 y 80% supera los 1000 ciclos de vida."
import React from "react";
import { countTo, pop, useScene } from "../../../src/engine";
import { LEAD } from "../../../src/engine/Stage";
import {
  AtomHybridStage,
  AtomNeonDeck,
  ElectricArcOverlay,
  ImpactRig,
  KineticStamp,
  ShockwaveBurst,
  TECH,
  TechLabBackdrop,
  TechTelemetryStrip,
} from "./parts";

export const Cycles: React.FC = () => {
  const { f, theme, scene, cue } = useScene();
  const t0 = scene.from - LEAD;
  const c0 = cue("0%");
  const c400 = cue("400");
  const c20 = cue("20");
  const c1000 = cue("1000");

  const boostMode = f >= c20 - 3;
  const hiCycles = boostMode ? Math.round(countTo(f, c1000 - 16, 24, 400, 1050)) : 400;

  return (
    <ImpactRig triggers={[c0 - 2, c400 - 2, c20 - 2, c1000 - 2]} intensity={12}>
      <TechLabBackdrop alert={!boostMode} emerald={boostMode} />

      <TechTelemetryStrip
        at={t0}
        label="PRUEBA BU-808"
        verdict={boostMode ? "+1,050 CICLOS" : "COLAPSO A 0%"}
        pct={boostMode ? 96 : 8}
        status={boostMode ? "safe" : "warn"}
      />

      <AtomHybridStage
        srcA="tech-05.jpg"
        srcB="tech-12.jpg"
        at={t0 + 2}
        atomAt={c400 - 6}
        splitAt={c20 - 3}
        climaxAt={c1000 - 2}
        punches={[c0 - 2, c400 - 2, c1000 - 2]}
        accentA={TECH.crimson}
        accentAtom={boostMode ? TECH.emerald : TECH.crimson}
        accentB={TECH.emerald}
        vfx={<ElectricArcOverlay active={f >= c1000 - 4} color={TECH.emerald} />}
      >
        <div
          style={{
            position: "absolute",
            left: 16,
            top: 14,
            padding: "7px 16px",
            borderRadius: 14,
            background: TECH.crimson,
            fontFamily: theme.font.mono,
            fontSize: 31,
            fontWeight: 900,
            color: "#FFFFFF",
            zIndex: 15,
            ...(f >= c0 - 4 ? pop(f, c0 - 4, { dur: 9, from: 0.85 }) : {}),
          }}
        >
          100% → 0%
        </div>

        {boostMode && (
          <div
            style={{
              position: "absolute",
              right: 16,
              top: 14,
              padding: "7px 16px",
              borderRadius: 14,
              background: TECH.emerald,
              fontFamily: theme.font.mono,
              fontSize: 31,
              fontWeight: 900,
              color: "#042217",
              zIndex: 15,
            }}
          >
            80% → 20%
          </div>
        )}

        <KineticStamp
          at={c1000 - 4}
          text="🚀 2.6x MÁS VIDA ÚTIL (20%–80%)"
          bg={TECH.emerald}
          ink="#042217"
          tilt={-2}
        />
      </AtomHybridStage>

      <ShockwaveBurst at={c0 - 2} x={340} y={820} color={TECH.crimson} size={225} />
      <ShockwaveBurst at={c1000 - 2} x={540} y={860} color={TECH.emerald} size={300} />

      <AtomNeonDeck
        at={t0 + 5}
        tag="BATTERY UNIV."
        title="Ciclos Antes de Degradar"
        rightText={boostMode ? `+${hiCycles} CICLOS` : "400 CICLOS"}
        accent={boostMode ? TECH.emerald : TECH.crimson}
        borderAccent={boostMode ? TECH.emerald : TECH.crimson}
      />
    </ImpactRig>
  );
};
