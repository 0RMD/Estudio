// Escena 3 Híbrida V3 (PuraPrueba V2 + ATOM Cryo-RAM Vault 60fps): `ram`, light
// "Cuando sales de una aplicación, tu teléfono la congela en la memoria RAM: queda en pausa total usando 0% de procesador."
import React from "react";
import { countTo, useScene } from "../../../src/engine";
import { LEAD } from "../../../src/engine/Stage";
import {
  AtomHybridStage,
  AtomNeonDeck,
  CryoFrostOverlay,
  ImpactRig,
  KineticStamp,
  ShockwaveBurst,
  TECH,
  TechLabBackdrop,
  TechTelemetryStrip,
} from "./parts";

export const Ram: React.FC = () => {
  const { f, theme, scene, cue } = useScene();
  const t0 = scene.from - LEAD;
  const cCongela = cue("congela");
  const cRam = cue("RAM");
  const cPausa = cue("pausa");
  const c0 = cue("0%");

  const frozen = f >= cCongela - 3;
  const zeroed = f >= c0 - 3;
  const cpuPct = !frozen
    ? Math.round(countTo(f, t0 + 2, 16, 68, 54))
    : !zeroed
      ? Math.round(countTo(f, cCongela - 3, 22, 54, 4))
      : 0;

  return (
    <ImpactRig triggers={[cCongela - 2, cRam - 2, cPausa - 2, c0 - 3]} intensity={10}>
      <TechLabBackdrop emerald={zeroed} />

      <TechTelemetryStrip
        at={t0}
        label="SUSPENSIÓN RAM"
        verdict={zeroed ? "0.0% CPU" : frozen ? "CONGELADA" : "APP ACTIVA"}
        pct={cpuPct}
        unit="% CPU"
        status="safe"
      />

      <AtomHybridStage
        srcA="app-03.jpg"
        srcB="app-10.jpg"
        at={t0 + 2}
        atomAt={cCongela - 4}
        splitAt={c0 - 3}
        climaxAt={c0}
        punches={[cRam - 2, cPausa - 2, c0 - 3]}
        accentA={TECH.cyanBright}
        accentAtom={TECH.cyanBright}
        accentB={TECH.emerald}
        vfx={<CryoFrostOverlay active={frozen} />}
      >
        <div
          style={{
            position: "absolute",
            left: 16,
            top: 14,
            padding: "7px 16px",
            borderRadius: 14,
            background: "rgba(7, 11, 20, 0.92)",
            boxShadow: `inset 0 0 0 2.5px ${zeroed ? TECH.emerald : TECH.cyanBright}`,
            fontFamily: theme.font.mono,
            fontSize: 31,
            fontWeight: 900,
            color: zeroed ? TECH.emerald : "#67E8F9",
            zIndex: 15,
          }}
        >
          🧊 RAM · {zeroed ? "0.0% PROCESADOR" : "CONGELANDO"}
        </div>

        <KineticStamp
          at={cPausa - 3}
          text="⏸️ PAUSA TOTAL · CERO GASTO"
          bg={TECH.emerald}
          ink="#042217"
          tilt={-2}
        />
      </AtomHybridStage>

      <ShockwaveBurst at={c0 - 3} x={540} y={840} color={TECH.emerald} size={265} />

      <AtomNeonDeck
        at={t0 + 5}
        tag="OSCILOSCOPIO"
        title="Uso de CPU al Salir"
        rightText={`${cpuPct}% CPU`}
        accent={zeroed ? "#059669" : "#0284C7"}
        borderAccent={zeroed ? TECH.emerald : TECH.cyan}
      />
    </ImpactRig>
  );
};
