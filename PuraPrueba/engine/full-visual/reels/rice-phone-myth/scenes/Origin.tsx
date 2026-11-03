// Escena 2 Híbrida V3 (PuraPrueba V2 + ATOM Alerta Oficial Apple: Arroz vs Aire Libre a 60fps): `origin`, light
// "Apple publicó una alerta oficial prohibiendo el arroz, y pruebas de laboratorio demostraron que absorbe menos humedad que dejarlo al aire libre."
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
  WaterCorrosionOverlay,
} from "./parts";

export const Origin: React.FC = () => {
  const { f, theme, scene, cue } = useScene();
  const t0 = scene.from - LEAD;
  const cApple = cue("Apple");
  const cArroz = cue("arroz");
  const cLab = cue("laboratorio");
  const cMenos = cue("menos");
  const cAire = cue("aire");

  const airMode = f >= cMenos - 2;
  const effPct = airMode ? Math.round(countTo(f, cMenos - 2, 20, 38, 92)) : 38;

  return (
    <ImpactRig triggers={[cApple, cArroz - 2, cLab - 2, cAire - 2]} intensity={10}>
      <TechLabBackdrop alert={!airMode} emerald={airMode} />

      <TechTelemetryStrip
        at={t0}
        label="SOPORTE APPLE"
        verdict={airMode ? "AIRE 2x MEJOR" : "ARROZ PROHIBIDO"}
        pct={effPct}
        status={airMode ? "safe" : "warn"}
      />

      <AtomHybridStage
        srcA="rice-02.jpg"
        srcB="rice-09.jpg"
        at={t0 + 2}
        atomAt={cArroz - 2}
        splitAt={cMenos - 2}
        climaxAt={cAire - 2}
        punches={[cApple, cLab - 2, cAire - 2]}
        accentA={TECH.crimson}
        accentAtom={airMode ? TECH.emerald : TECH.crimson}
        accentB={TECH.emerald}
        vfx={<WaterCorrosionOverlay active={airMode} mode="air" />}
      >
        <div
          style={{
            position: "absolute",
            left: 16,
            top: 14,
            padding: "7px 16px",
            borderRadius: 14,
            background: "rgba(7, 11, 20, 0.92)",
            boxShadow: `inset 0 0 0 2.5px ${airMode ? TECH.emerald : TECH.crimson}`,
            fontFamily: theme.font.mono,
            fontSize: 31,
            fontWeight: 900,
            color: airMode ? TECH.emerald : "#FDA4AF",
            zIndex: 15,
          }}
        >
          🍎 APPLE 2024 · NO USAR ARROZ
        </div>

        <KineticStamp
          at={cMenos - 2}
          text="💨 AIRE LIBRE SECA 2x MÁS RÁPIDO"
          bg={TECH.emerald}
          ink="#042217"
          tilt={-2}
        />
      </AtomHybridStage>

      <ShockwaveBurst at={cAire - 2} x={540} y={840} color={TECH.emerald} size={265} />

      <AtomNeonDeck
        at={t0 + 5}
        tag="LABORATORIO"
        title="Evaporación: Arroz vs Aire Libre"
        rightText={airMode ? "AIRE GANA" : "38% LENTO"}
        accent={airMode ? "#059669" : TECH.crimson}
        borderAccent={airMode ? TECH.emerald : TECH.crimson}
      />
    </ImpactRig>
  );
};
