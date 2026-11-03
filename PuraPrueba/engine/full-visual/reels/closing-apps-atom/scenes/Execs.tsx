// Escena 2 Híbrida V3 (PuraPrueba V2 + ATOM Dual Flagships iOS/Android 60fps): `execs`, light
// "Tanto Craig Federighi en Apple como los ingenieros de Android confirmaron que deslizar tus apps hacia arriba es un mito inútil."
import React from "react";
import { useScene } from "../../../src/engine";
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

export const Execs: React.FC = () => {
  const { f, theme, scene, cue } = useScene();
  const t0 = scene.from - LEAD;
  const cApple = cue("Apple");
  const cAndroid = cue("Android");
  const cDeslizar = cue("deslizar");
  const cMito = cue("mito");

  const busted = f >= cMito - 3;

  return (
    <ImpactRig triggers={[cApple - 2, cAndroid - 2, cDeslizar - 2, cMito - 3]} intensity={10}>
      <TechLabBackdrop alert={busted} />

      <TechTelemetryStrip
        at={t0}
        label="VEREDICTO OFICIAL"
        verdict={busted ? "MITO INÚTIL" : "iOS + ANDROID"}
        pct={busted ? 100 : f >= cAndroid - 2 ? 100 : 50}
        status={busted ? "myth" : "safe"}
      />

      <AtomHybridStage
        srcA="app-02.jpg"
        srcB="app-09.jpg"
        at={t0 + 2}
        atomAt={cApple - 4}
        splitAt={cMito - 3}
        climaxAt={cMito - 1}
        punches={[cAndroid - 2, cDeslizar - 2]}
        accentA={TECH.cyan}
        accentAtom={TECH.emerald}
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
            boxShadow: `inset 0 0 0 2.5px ${TECH.cyanBright}`,
            fontFamily: theme.font.mono,
            fontSize: 31,
            fontWeight: 900,
            color: "#FFFFFF",
            zIndex: 15,
          }}
        >
          🍎 iOS + 🤖 ANDROID · OFICIAL
        </div>

        <KineticStamp
          at={cMito - 3}
          text="🚫 MITO INÚTIL CONFIRMADO"
          bg={TECH.crimson}
          ink="#FFFFFF"
          tilt={-2}
        />
      </AtomHybridStage>

      <ShockwaveBurst at={cMito - 3} x={540} y={850} color={TECH.crimson} size={265} />

      <AtomNeonDeck
        at={t0 + 4}
        tag="FUENTES"
        title="Ingeniería Apple y Android"
        rightText={busted ? "DESMENTIDO" : "2 GIGANTES"}
        accent={busted ? TECH.crimson : "#0284C7"}
        borderAccent={busted ? TECH.crimson : TECH.cyan}
      />
    </ImpactRig>
  );
};
