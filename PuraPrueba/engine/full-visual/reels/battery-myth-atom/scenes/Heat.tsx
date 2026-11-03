// Escena 4 Híbrida V3 (PuraPrueba V2 + ATOM Horno Térmico 35°C->43°C a 60fps): `heat`, dark
// "El primer asesino real es el calor: Apple confirma que pasar de 35 grados mientras cargas bajo la almohada o jugando degrada tu capacidad para siempre."
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
  ThermalEmbersOverlay,
} from "./parts";

export const Heat: React.FC = () => {
  const { f, theme, scene, cue } = useScene();
  const t0 = scene.from - LEAD;
  const cCalor = cue("calor");
  const c35 = cue("35");
  const cAlmohada = cue("almohada");
  const cJugando = cue("jugando");
  const cSiempre = cue("siempre");

  const temp = Math.round(countTo(f, cCalor - 6, 44, 24, 43));
  const dialP = Math.min(1, Math.max(0.12, (temp - 18) / (45 - 18)));
  const capPct = f >= cAlmohada - 4 ? Math.round(countTo(f, cAlmohada - 4, 38, 100, 78)) : 100;

  return (
    <ImpactRig triggers={[cCalor - 2, c35 - 2, cAlmohada - 2, cJugando - 2, cSiempre - 3]} intensity={12}>
      <TechLabBackdrop alert />

      <TechTelemetryStrip
        at={t0}
        label="ESTRÉS TÉRMICO"
        verdict={`${temp} °C · PELIGRO`}
        pct={Math.round(dialP * 100)}
        status="warn"
      />

      <AtomHybridStage
        srcA="tech-04.jpg"
        srcB="tech-11.jpg"
        at={t0 + 2}
        atomAt={c35 - 3}
        splitAt={cJugando - 4}
        climaxAt={cSiempre - 3}
        punches={[cCalor - 2, cAlmohada - 2, cSiempre - 3]}
        accentA={TECH.amber}
        accentAtom={TECH.crimson}
        accentB={TECH.crimson}
        vfx={<ThermalEmbersOverlay active />}
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
          🌡️ MÁX. APPLE: 35 °C
        </div>

        <KineticStamp
          at={cAlmohada - 5}
          text={f >= cJugando - 4 ? "🎮 JUGAR CARGANDO = +43 °C" : "🛏️ BAJO ALMOHADA = +41 °C"}
          bg={TECH.crimson}
          ink="#FFFFFF"
          tilt={-2}
        />
      </AtomHybridStage>

      <ShockwaveBurst at={c35 - 2} x={540} y={840} color={TECH.crimson} size={285} />
      <ShockwaveBurst at={cSiempre - 3} x={580} y={1240} color={TECH.amber} size={235} />

      <AtomNeonDeck
        at={t0 + 5}
        tag="APPLE SUPPORT"
        title="Fiebre Térmica y Salud Máxima"
        rightText={`SALUD ${capPct}%`}
        accent={TECH.crimson}
        borderAccent={TECH.crimson}
      />
    </ImpactRig>
  );
};
