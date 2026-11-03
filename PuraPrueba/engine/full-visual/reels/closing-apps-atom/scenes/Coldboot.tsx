// Escena 4 Híbrida V3 (PuraPrueba V2 + ATOM Turbina Arranque en Frío 96% CPU a 60fps): `coldboot`, dark
// "Al cerrarla a la fuerza la borras de la memoria, y al volver a abrirla disparas un pico de procesador y batería recargando todo desde cero."
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

export const Coldboot: React.FC = () => {
  const { f, theme, scene, cue } = useScene();
  const t0 = scene.from - LEAD;
  const cBorras = cue("borras");
  const cAbrirla = cue("abrirla");
  const cPico = cue("pico");
  const cCero = cue("cero");

  const spiking = f >= cPico - 3;
  const cpuSpike = spiking
    ? Math.round(countTo(f, cPico - 3, 20, 28, 96))
    : Math.round(countTo(f, cBorras - 2, 16, 12, 28));

  return (
    <ImpactRig triggers={[cBorras - 2, cAbrirla - 2, cPico - 3, cCero - 2]} intensity={12}>
      <TechLabBackdrop alert={spiking} />

      <TechTelemetryStrip
        at={t0}
        label="ARRANQUE EN FRÍO"
        verdict={spiking ? "PICO CRÍTICO" : "RAM BORRADA"}
        pct={cpuSpike}
        unit="% CPU"
        status="warn"
      />

      <AtomHybridStage
        srcA="app-04.jpg"
        srcB="app-11.jpg"
        at={t0 + 2}
        atomAt={cBorras - 3}
        splitAt={cPico - 3}
        climaxAt={cCero - 2}
        punches={[cAbrirla - 2, cPico - 3, cCero - 2]}
        accentA={TECH.amber}
        accentAtom={TECH.crimson}
        accentB={TECH.crimson}
        vfx={
          <>
            <ThermalEmbersOverlay active={spiking} />
            <ElectricArcOverlay active={spiking} color={TECH.crimson} />
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
            boxShadow: `inset 0 0 0 2.5px ${spiking ? TECH.crimson : TECH.amber}`,
            fontFamily: theme.font.mono,
            fontSize: 31,
            fontWeight: 900,
            color: spiking ? "#FDA4AF" : TECH.amber,
            zIndex: 15,
          }}
        >
          {spiking ? `🔥 PICO TÉRMICO · ${cpuSpike}% CPU` : "🗑️ CACHÉ RAM ELIMINADA"}
        </div>

        <KineticStamp
          at={cCero - 4}
          text="💥 RECARGA TOTAL DESDE CERO"
          bg={TECH.crimson}
          ink="#FFFFFF"
          tilt={-2}
        />
      </AtomHybridStage>

      <ShockwaveBurst at={cPico - 3} x={540} y={840} color={TECH.crimson} size={285} />

      <AtomNeonDeck
        at={t0 + 4}
        tag="ENERGÍA"
        title="Reanudar RAM vs Abrir de Cero"
        rightText={spiking ? "+320% GASTO" : "FLASH → RAM"}
        accent={TECH.crimson}
        borderAccent={spiking ? TECH.crimson : TECH.amber}
      />
    </ImpactRig>
  );
};
