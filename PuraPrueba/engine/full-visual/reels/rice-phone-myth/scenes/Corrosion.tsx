// Escena 4 Híbrida V3 (PuraPrueba V2 + ATOM Corrosión Verde en Placa Madre a 60fps): `corrosion`, dark
// "Mientras esperas dos días con el teléfono enterrado, los minerales del líquido oxidan el cobre de la placa madre en silencio."
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

export const Corrosion: React.FC = () => {
  const { f, theme, scene, cue } = useScene();
  const t0 = scene.from - LEAD;
  const cEnterrado = cue("enterrado");
  const cMinerales = cue("minerales");
  const cCobre = cue("cobre");
  const cSilencio = cue("silencio");

  const oxidized = f >= cCobre - 2;
  const hrs = Math.round(countTo(f, t0 + 3, 45, 2, 48));

  return (
    <ImpactRig triggers={[cEnterrado - 2, cMinerales - 2, cCobre - 2, cSilencio - 2]} intensity={11}>
      <TechLabBackdrop alert />

      <TechTelemetryStrip
        at={t0}
        label="PLACA MADRE"
        verdict={oxidized ? "COBRE OXIDADO" : `${hrs}H EN ARROZ`}
        pct={Math.round((hrs / 48) * 100)}
        status="warn"
      />

      <AtomHybridStage
        srcA="rice-04.jpg"
        srcB="rice-11.jpg"
        at={t0 + 2}
        atomAt={cEnterrado - 2}
        splitAt={cCobre - 2}
        climaxAt={cSilencio - 2}
        punches={[cMinerales - 2, cCobre - 2, cSilencio - 2]}
        accentA={TECH.amber}
        accentAtom={TECH.crimson}
        accentB={TECH.crimson}
        vfx={<WaterCorrosionOverlay active mode="starch" />}
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
          🦠 SULFATACIÓN EN SILENCIO
        </div>

        <KineticStamp
          at={cCobre - 2}
          text="💀 MINERALES CORROEN EL COBRE"
          bg={TECH.crimson}
          ink="#FFFFFF"
          tilt={-2}
        />
      </AtomHybridStage>

      <ShockwaveBurst at={cCobre - 2} x={540} y={840} color={TECH.crimson} size={275} />

      <AtomNeonDeck
        at={t0 + 4}
        tag="MICROSCOPÍA"
        title="Avance de Corrosión en Pistas"
        rightText={`${hrs} HORAS`}
        accent={TECH.crimson}
        borderAccent={TECH.crimson}
      />
    </ImpactRig>
  );
};
