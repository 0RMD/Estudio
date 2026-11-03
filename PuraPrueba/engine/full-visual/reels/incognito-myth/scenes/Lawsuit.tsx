// Escena 2 Híbrida V3 (PuraPrueba V2 + ATOM Demanda Google 5,000M Registros 60fps): `lawsuit`, light
// "En 2024 Google aceptó destruir miles de millones de registros tras una demanda por rastrear usuarios en sesiones privadas."
import React from "react";
import { countTo, useScene } from "../../../src/engine";
import { LEAD } from "../../../src/engine/Stage";
import {
  AtomHybridStage,
  AtomNeonDeck,
  ImpactRig,
  KineticStamp,
  ShockwaveBurst,
  TECH,
  TechLabBackdrop,
  TechTelemetryStrip,
} from "./parts";

export const Lawsuit: React.FC = () => {
  const { f, theme, scene, cue } = useScene();
  const t0 = scene.from - LEAD;
  const c2024 = cue("2024");
  const cMillones = cue("millones");
  const cDemanda = cue("demanda");
  const cPrivadas = cue("privadas");

  const slammed = f >= cDemanda - 2;
  const millions = Math.round(countTo(f, c2024, 34, 150, 5000));

  return (
    <ImpactRig triggers={[c2024, cMillones - 2, cDemanda - 2, cPrivadas - 2]} intensity={10}>
      <TechLabBackdrop alert={slammed} />

      <TechTelemetryStrip
        at={t0}
        label="CASO GOOGLE 2024"
        verdict={slammed ? "DEMANDA REAL" : `+${millions} M`}
        pct={Math.round((millions / 5000) * 100)}
        status={slammed ? "warn" : "myth"}
      />

      <AtomHybridStage
        srcA="inc-02.jpg"
        srcB="inc-09.jpg"
        at={t0 + 2}
        atomAt={cMillones - 3}
        splitAt={cDemanda - 2}
        climaxAt={cPrivadas - 2}
        punches={[c2024, cDemanda - 2, cPrivadas - 2]}
        accentA={TECH.amber}
        accentAtom={TECH.amber}
        accentB={TECH.crimson}
      >
        <div
          style={{
            position: "absolute",
            left: 16,
            top: 14,
            padding: "7px 16px",
            borderRadius: 14,
            background: "rgba(7, 11, 20, 0.92)",
            boxShadow: `inset 0 0 0 2.5px ${slammed ? TECH.crimson : TECH.amber}`,
            fontFamily: theme.font.mono,
            fontSize: 31,
            fontWeight: 900,
            color: "#FDE047",
            zIndex: 15,
          }}
        >
          ⚖️ ACUERDO JUDICIAL 2024
        </div>

        <KineticStamp
          at={cDemanda - 2}
          text="📂 +5,000 MILLONES DE REGISTROS"
          bg={TECH.crimson}
          ink="#FFFFFF"
          tilt={-2}
        />
      </AtomHybridStage>

      <ShockwaveBurst at={cDemanda - 2} x={540} y={840} color={TECH.crimson} size={270} />

      <AtomNeonDeck
        at={t0 + 5}
        tag="BROWN v. GOOGLE"
        title="Registros Privados Destruidos"
        rightText={`+${millions}M`}
        accent={slammed ? TECH.crimson : "#D97706"}
        borderAccent={slammed ? TECH.crimson : TECH.amber}
      />
    </ImpactRig>
  );
};
