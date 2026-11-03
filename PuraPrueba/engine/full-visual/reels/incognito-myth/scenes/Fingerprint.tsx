// Escena 5 Híbrida V3 (PuraPrueba V2 + ATOM Escáner Biométrico Fingerprint 99% a 60fps): `fingerprint`, dark
// "Peor aún: las páginas cruzan tu dirección IP, tu modelo de pantalla y tu batería para crear una huella digital que te identifica al 99%."
import React from "react";
import { countTo, useScene } from "../../../src/engine";
import { LEAD } from "../../../src/engine/Stage";
import {
  AtomHybridStage,
  AtomNeonDeck,
  ElectricArcOverlay,
  ImpactRig,
  KineticStamp,
  RadarMatrixOverlay,
  ShockwaveBurst,
  TECH,
  TechLabBackdrop,
  TechTelemetryStrip,
} from "./parts";

export const Fingerprint: React.FC = () => {
  const { f, theme, scene, cue } = useScene();
  const t0 = scene.from - LEAD;
  const cIp = cue("IP");
  const cPantalla = cue("pantalla");
  const cBateria = cue("batería");
  const cHuella = cue("huella");
  const c99 = cue("99%");

  const matchPct = Math.round(countTo(f, cIp - 4, 48, 34, 99));
  const locked = f >= cHuella - 3;

  return (
    <ImpactRig triggers={[cIp - 2, cPantalla - 2, cHuella - 2, c99 - 2]} intensity={12}>
      <TechLabBackdrop alert />

      <TechTelemetryStrip
        at={t0}
        label="HUELLA DIGITAL"
        verdict={f >= c99 - 3 ? "99% IDENTIDAD" : "CRUZANDO DATOS"}
        pct={matchPct}
        status="warn"
      />

      <AtomHybridStage
        srcA="inc-05.jpg"
        srcB="inc-12.jpg"
        at={t0 + 2}
        atomAt={cIp - 3}
        splitAt={cHuella - 3}
        climaxAt={c99 - 2}
        punches={[cPantalla - 2, cBateria - 2, c99 - 2]}
        accentA={TECH.cyanBright}
        accentAtom={TECH.crimson}
        accentB={TECH.crimson}
        vfx={
          <>
            <RadarMatrixOverlay active alert />
            <ElectricArcOverlay active={f >= c99 - 4} color={TECH.crimson} />
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
          🧬 IP + PANTALLA + BATERÍA
        </div>

        <KineticStamp
          at={cHuella - 3}
          text={`🎯 IDENTIFICADO AL ${matchPct}%`}
          bg={TECH.crimson}
          ink="#FFFFFF"
          tilt={-2}
        />
      </AtomHybridStage>

      <ShockwaveBurst at={c99 - 2} x={540} y={840} color={TECH.crimson} size={295} />

      <AtomNeonDeck
        at={t0 + 4}
        tag="FINGERPRINT"
        title="Precisión sin Usar Cookies"
        rightText={locked ? `${matchPct}% ÚNICO` : "ESCANEANDO"}
        accent={TECH.crimson}
        borderAccent={TECH.crimson}
      />
    </ImpactRig>
  );
};
