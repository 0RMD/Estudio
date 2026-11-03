// Escena 5 Híbrida V3 (PuraPrueba V2 + ATOM Radar GPS & 2º Plano Vampiro a 60fps): `culprits`, dark
// "Lo que sí drena tu batería sin tocar el celular son 2 permisos ocultos: la actualización en segundo plano y el GPS activo en modo siempre."
import React from "react";
import { countTo, useScene } from "../../../src/engine";
import { LEAD } from "../../../src/engine/Stage";
import {
  AtomHybridStage,
  AtomNeonDeck,
  ImpactRig,
  KineticStamp,
  RadarMatrixOverlay,
  ShockwaveBurst,
  TECH,
  TechLabBackdrop,
  TechTelemetryStrip,
  ThermalEmbersOverlay,
} from "./parts";

export const Culprits: React.FC = () => {
  const { f, theme, scene, cue } = useScene();
  const t0 = scene.from - LEAD;
  const c2 = cue("2");
  const cAct = cue("actualización");
  const cGps = cue("GPS");
  const cSiempre = cue("siempre");

  const gpsActive = f >= cGps - 3;
  const battDrain = Math.round(countTo(f, t0 + 3, 42, 92, 54));

  return (
    <ImpactRig triggers={[c2 - 2, cAct - 2, cGps - 3, cSiempre - 2]} intensity={11}>
      <TechLabBackdrop alert />

      <TechTelemetryStrip
        at={t0}
        label="DRENAJE OCULTO"
        verdict="2 VAMPIROS"
        pct={battDrain}
        unit="% BAT"
        status="warn"
      />

      <AtomHybridStage
        srcA="app-05.jpg"
        srcB="app-12.jpg"
        at={t0 + 2}
        atomAt={c2 - 2}
        splitAt={cGps - 3}
        climaxAt={cSiempre - 2}
        punches={[cAct - 2, cGps - 3, cSiempre - 2]}
        accentA={TECH.amber}
        accentAtom={TECH.crimson}
        accentB={TECH.crimson}
        vfx={
          <>
            <ThermalEmbersOverlay active />
            <RadarMatrixOverlay active={gpsActive} alert />
          </>
        }
      >
        <div
          style={{
            position: "absolute",
            left: 16,
            top: 14,
            padding: "7px 16px",
            borderRadius: 14,
            background: "rgba(7, 11, 20, 0.92)",
            boxShadow: `inset 0 0 0 2.5px ${TECH.crimson}`,
            fontFamily: theme.font.mono,
            fontSize: 31,
            fontWeight: 900,
            color: "#FDA4AF",
            zIndex: 15,
          }}
        >
          {gpsActive ? "📡 RASTREO GPS · ACTIVO 24/7" : "🪫 RED ACTIVA EN BOLSILLO"}
        </div>

        <KineticStamp
          at={cSiempre - 3}
          text="⚠️ ESTOS 2 SÍ VACÍAN TU BATERÍA"
          bg={TECH.crimson}
          ink="#FFFFFF"
          tilt={-2}
        />
      </AtomHybridStage>

      <ShockwaveBurst at={cGps - 3} x={540} y={840} color={TECH.crimson} size={280} />

      <AtomNeonDeck
        at={t0 + 4}
        tag="CULPABLES"
        title="2 Permisos Vampiro Reales"
        rightText="-42% / DÍA"
        accent={TECH.crimson}
        borderAccent={TECH.crimson}
      />
    </ImpactRig>
  );
};
