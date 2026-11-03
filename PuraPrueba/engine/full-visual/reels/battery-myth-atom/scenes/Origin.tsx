// Escena 2 Híbrida V3 (PuraPrueba V2 + ATOM Cine Nocturno 60fps): `origin`, light
// "Ese miedo nació en los años 90 con las viejas pilas de níquel, que sí sufrían sobrecarga si no las desconectabas a tiempo."
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

export const Origin: React.FC = () => {
  const { f, theme, scene, cue } = useScene();
  const t0 = scene.from - LEAD;
  const c90 = cue("90");
  const cNiquel = cue("níquel");
  const cSobre = cue("sobrecarga");
  const cDesc = cue("desconectabas");

  const yr = Math.round(countTo(f, c90 - 8, 20, 2026, 1995));
  const overPct = f >= cSobre - 3 ? Math.round(countTo(f, cSobre - 3, 18, 100, 118)) : 100;
  const overloaded = f >= cSobre - 3;

  return (
    <ImpactRig triggers={[c90 - 2, cNiquel - 2, cSobre - 2, cDesc - 2]} intensity={10}>
      <TechLabBackdrop alert={overloaded} />

      <TechTelemetryStrip
        at={t0}
        label="ORIGEN DEL MITO"
        verdict={`AÑO ${yr}`}
        pct={100}
        status={overloaded ? "warn" : "safe"}
      />

      <AtomHybridStage
        srcA="tech-02.jpg"
        srcB="tech-09.jpg"
        at={t0 + 2}
        atomAt={c90 - 2}
        splitAt={cSobre - 3}
        climaxAt={cDesc - 2}
        punches={[cNiquel - 2, cDesc - 2]}
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
            background: "rgba(7, 11, 20, 0.90)",
            boxShadow: `inset 0 0 0 2px ${TECH.amber}`,
            fontFamily: theme.font.mono,
            fontSize: 31,
            fontWeight: 900,
            color: "#FDE047",
            zIndex: 15,
          }}
        >
          1995 · NÍQUEL
        </div>

        {overloaded && (
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
            2026 · LITIO
          </div>
        )}

        <KineticStamp
          at={cSobre - 3}
          text={`⚡ 1995: SOBRECARGA AL ${overPct}%`}
          bg={TECH.crimson}
          ink="#FFFFFF"
          tilt={-2}
        />
      </AtomHybridStage>

      <ShockwaveBurst at={cSobre - 2} x={540} y={840} color={TECH.amber} size={255} />

      <AtomNeonDeck
        at={t0 + 5}
        tag="EVOLUCIÓN"
        title="Voltaje: Años 90 vs Hoy"
        rightText={overloaded ? `${overPct}% vs 100%` : "NiCd vs Li-Ion"}
        accent={overloaded ? TECH.crimson : "#D97706"}
        borderAccent={overloaded ? TECH.crimson : TECH.amber}
      />
    </ImpactRig>
  );
};
