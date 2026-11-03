// Escena 3 Híbrida V3 (PuraPrueba V2 + ATOM Escáner Borrado Local vs Calle 60fps): `local`, light
// "Esa ventana oscura solo borra el historial, las cookies y los formularios dentro de tu propio teléfono al cerrarla, como limpiar tus huellas dentro de casa."
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

export const Local: React.FC = () => {
  const { f, theme, scene, cue } = useScene();
  const t0 = scene.from - LEAD;
  const cBorra = cue("borra");
  const cCookies = cue("cookies");
  const cCerrarla = cue("cerrarla");
  const cHuellas = cue("huellas");
  const cCasa = cue("casa");

  const cleaned = f >= cCerrarla - 2;
  const cleanPct = Math.round(countTo(f, cBorra - 2, 36, 15, 100));

  return (
    <ImpactRig triggers={[cBorra - 2, cCookies - 2, cHuellas - 2, cCasa - 2]} intensity={10}>
      <TechLabBackdrop emerald={cleaned} />

      <TechTelemetryStrip
        at={t0}
        label="BORRADO LOCAL"
        verdict={cleaned ? "SOLO EN CASA" : "COOKIES + RAM"}
        pct={cleanPct}
        status="safe"
      />

      <AtomHybridStage
        srcA="inc-03.jpg"
        srcB="inc-10.jpg"
        at={t0 + 2}
        atomAt={cBorra - 2}
        splitAt={cHuellas - 2}
        climaxAt={cCasa - 2}
        punches={[cCookies - 2, cCerrarla - 2, cCasa - 2]}
        accentA={TECH.cyan}
        accentAtom={TECH.emerald}
        accentB={TECH.amber}
      >
        <div
          style={{
            position: "absolute",
            left: 16,
            top: 14,
            padding: "7px 16px",
            borderRadius: 14,
            background: "rgba(7, 11, 20, 0.92)",
            boxShadow: `inset 0 0 0 2.5px ${TECH.emerald}`,
            fontFamily: theme.font.mono,
            fontSize: 31,
            fontWeight: 900,
            color: TECH.emerald,
            zIndex: 15,
          }}
        >
          🧹 TU CELULAR · HISTORIAL 0
        </div>

        <KineticStamp
          at={cHuellas - 3}
          text="🏠 LIMPIA TU CELULAR, NO LA RED"
          bg={TECH.emerald}
          ink="#042217"
          tilt={-2}
        />
      </AtomHybridStage>

      <ShockwaveBurst at={cHuellas - 2} x={540} y={840} color={TECH.emerald} size={260} />

      <AtomNeonDeck
        at={t0 + 5}
        tag="ALCANCE"
        title="En tu Celular vs Fuera de Casa"
        rightText={cleaned ? "AFUERA 100%" : "LOCAL OK"}
        accent="#0284C7"
        borderAccent={TECH.cyan}
      />
    </ImpactRig>
  );
};
