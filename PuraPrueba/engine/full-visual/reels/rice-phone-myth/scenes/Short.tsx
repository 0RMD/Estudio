// Escena 5 Híbrida V3 (PuraPrueba V2 + ATOM Electrólisis y Cortocircuito al Cargar a 60fps): `short`, dark
// "Pero el golpe mortal ocurre al conectar el cargador antes de tiempo: la corriente hace electrólisis con la humedad y quema el chip de carga al instante."
import React from "react";
import { countTo, useScene } from "../../../src/engine";
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
  ThermalEmbersOverlay,
} from "./parts";

export const Short: React.FC = () => {
  const { f, theme, scene, cue } = useScene();
  const t0 = scene.from - LEAD;
  const cCargador = cue("cargador");
  const cElectro = cue("electrólisis");
  const cQuema = cue("quema");
  const cInstante = cue("instante");

  const shorted = f >= cCargador - 2;
  const burned = f >= cQuema - 2;
  const riskPct = Math.round(countTo(f, cCargador - 4, 24, 30, 100));

  return (
    <ImpactRig triggers={[cCargador - 2, cElectro - 2, cQuema - 2, cInstante - 2]} intensity={13}>
      <TechLabBackdrop alert />

      <TechTelemetryStrip
        at={t0}
        label="GOLPE MORTAL"
        verdict={burned ? "CHIP QUEMADO" : "ELECTRÓLISIS"}
        pct={riskPct}
        status="warn"
      />

      <AtomHybridStage
        srcA="rice-05.jpg"
        srcB="rice-12.jpg"
        at={t0 + 2}
        atomAt={cCargador - 3}
        splitAt={cQuema - 3}
        climaxAt={cInstante - 2}
        punches={[cElectro - 2, cQuema - 2, cInstante - 2]}
        accentA={TECH.amber}
        accentAtom={TECH.crimson}
        accentB={TECH.crimson}
        vfx={
          <>
            <ThermalEmbersOverlay active={shorted} />
            <ElectricArcOverlay active={shorted} color={TECH.crimson} />
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
          ⚡ 5V + AGUA = CORTOCIRCUITO
        </div>

        <KineticStamp
          at={cQuema - 3}
          text="🔥 QUEMA EL CHIP AL INSTANTE"
          bg={TECH.crimson}
          ink="#FFFFFF"
          tilt={-2}
        />
      </AtomHybridStage>

      <ShockwaveBurst at={cQuema - 2} x={540} y={840} color={TECH.crimson} size={300} />

      <AtomNeonDeck
        at={t0 + 4}
        tag="CORTOCIRCUITO"
        title="Electrólisis al Conectar Cable"
        rightText={burned ? "MUERTE SÚBITA" : "ALTO VOLTAJE"}
        accent={TECH.crimson}
        borderAccent={TECH.crimson}
      />
    </ImpactRig>
  );
};
