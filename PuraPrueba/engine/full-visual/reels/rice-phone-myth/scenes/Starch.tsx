// Escena 3 Híbrida V3 (PuraPrueba V2 + ATOM Polvo de Almidón + Agua en Puerto USB-C a 60fps): `starch`, light
// "El grano suelta polvo fino de almidón que entra por el puerto de carga y al mezclarse con el agua forma una pasta espesa dentro del conector."
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

export const Starch: React.FC = () => {
  const { f, theme, scene, cue } = useScene();
  const t0 = scene.from - LEAD;
  const cAlmidon = cue("almidón");
  const cPuerto = cue("puerto");
  const cPasta = cue("pasta");
  const cConector = cue("conector");

  const clogged = f >= cPasta - 3;
  const clogPct = Math.round(countTo(f, cAlmidon - 2, 42, 18, 94));

  return (
    <ImpactRig triggers={[cAlmidon - 2, cPuerto - 2, cPasta - 2, cConector - 2]} intensity={10}>
      <TechLabBackdrop alert={clogged} />

      <TechTelemetryStrip
        at={t0}
        label="PUERTO USB-C"
        verdict={clogged ? "PASTA ESPESA" : "POLVO ALMIDÓN"}
        pct={clogPct}
        status="warn"
      />

      <AtomHybridStage
        srcA="rice-03.jpg"
        srcB="rice-10.jpg"
        at={t0 + 2}
        atomAt={cAlmidon - 2}
        splitAt={cPasta - 3}
        climaxAt={cConector - 2}
        punches={[cPuerto - 2, cPasta - 2, cConector - 2]}
        accentA={TECH.amber}
        accentAtom={TECH.amber}
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
            boxShadow: `inset 0 0 0 2.5px ${clogged ? TECH.crimson : TECH.amber}`,
            fontFamily: theme.font.mono,
            fontSize: 31,
            fontWeight: 900,
            color: "#FDE047",
            zIndex: 15,
          }}
        >
          🌾 ALMIDÓN + AGUA = ENGRUDO
        </div>

        <KineticStamp
          at={cPasta - 3}
          text="🔌 OBSTRUYE PINES DEL CONECTOR"
          bg={TECH.crimson}
          ink="#FFFFFF"
          tilt={-2}
        />
      </AtomHybridStage>

      <ShockwaveBurst at={cPasta - 2} x={540} y={840} color={TECH.amber} size={265} />

      <AtomNeonDeck
        at={t0 + 5}
        tag="CONECTOR"
        title="Obstrucción por Pasta de Arroz"
        rightText={`${clogPct}% TAPADO`}
        accent={clogged ? TECH.crimson : "#D97706"}
        borderAccent={clogged ? TECH.crimson : TECH.amber}
      />
    </ImpactRig>
  );
};
