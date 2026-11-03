// Escena 1 Híbrida V3 (PuraPrueba V2 + ATOM 60fps): `hook`, dark
// "Dejar cargando tu celular toda la noche no daña la batería, pero estos 2 hábitos diarios sí."
import React from "react";
import { countTo, ease, prog, useScene } from "../../../src/engine";
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

export const Hook: React.FC = () => {
  const { f, theme, scene, cue } = useScene();
  const t0 = scene.from - LEAD;
  const cCargando = cue("cargando");
  const cNoche = cue("noche");
  const cNo = cue("no");
  const c2 = cue("2");
  const cSi = cue("sí");

  const strikeW = prog(f, cNo - 2, 10, ease.out) * 100;
  const alertMode = f >= c2 - 2;
  const chargePct = alertMode
    ? Math.round(countTo(f, c2 - 2, 18, 100, 14))
    : Math.round(countTo(f, t0 + 3, 28, 84, 100));

  return (
    <ImpactRig triggers={[cCargando, cNoche - 4, cNo - 2, c2 - 2, cSi - 2]} intensity={12}>
      <TechLabBackdrop alert={alertMode} emerald={!alertMode && f >= cNo - 2} />

      <TechTelemetryStrip
        at={t0}
        label={alertMode ? "HÁBITOS DAÑINOS" : "CARGA NOCTURNA"}
        verdict={alertMode ? "2 ASESINOS" : f >= cNo - 2 ? "MITO FALSO" : "TESTEANDO"}
        pct={chargePct}
        status={alertMode ? "warn" : "safe"}
      />

      <AtomHybridStage
        srcA="tech-01.jpg"
        srcB="tech-08.jpg"
        at={t0 + 2}
        atomAt={cNoche - 4}
        splitAt={c2 - 2}
        climaxAt={cSi - 2}
        punches={[cCargando, cNo - 2, cSi - 2]}
        accentA={TECH.cyanBright}
        accentAtom={TECH.emerald}
        accentB={TECH.crimson}
        vfx={<ThermalEmbersOverlay active={alertMode} />}
      >
        <div
          style={{
            position: "absolute",
            left: 16,
            top: 14,
            padding: "7px 16px",
            borderRadius: 14,
            background: "rgba(7, 11, 20, 0.92)",
            boxShadow: `inset 0 0 0 2.5px ${f >= cNo - 2 ? TECH.crimson : TECH.cyanBright}`,
            display: "flex",
            alignItems: "center",
            zIndex: 15,
          }}
        >
          <div style={{ position: "relative" }}>
            <span
              style={{
                fontFamily: theme.font.mono,
                fontSize: 31,
                fontWeight: 900,
                color: f >= cNo - 2 ? "#FDA4AF" : "#FFFFFF",
              }}
            >
              {alertMode ? "2 CULPABLES REALES" : "CARGAR DE NOCHE"}
            </span>
            {!alertMode && (
              <div
                style={{
                  position: "absolute",
                  left: -4,
                  top: "51%",
                  width: `${strikeW.toFixed(1)}%`,
                  height: 6,
                  borderRadius: 99,
                  background: TECH.crimson,
                  boxShadow: `0 0 12px ${TECH.crimson}`,
                }}
              />
            )}
          </div>
        </div>

        {!alertMode ? (
          <KineticStamp
            at={cNo - 2}
            text="✓ MITO DESTRUIDO · 100% SEGURO"
            bg={TECH.emerald}
            ink="#042217"
            tilt={-2.2}
          />
        ) : (
          <KineticStamp
            at={c2 - 2}
            text="⚠️ ESTOS 2 SÍ DAÑAN TU BATERÍA"
            bg={TECH.crimson}
            ink="#FFFFFF"
            tilt={-2}
          />
        )}
      </AtomHybridStage>

      <ShockwaveBurst at={cNo - 2} x={430} y={840} color={TECH.emerald} size={240} />
      <ShockwaveBurst at={c2 - 2} x={540} y={840} color={TECH.crimson} size={295} />

      <AtomNeonDeck
        at={t0 + 4}
        tag="VEREDICTO"
        title={alertMode ? "Lo que SÍ degrada tu batería" : "Simulación Nocturna en Vivo"}
        rightText={f >= cSi - 2 ? "CONFIRMADO" : alertMode ? "2 CAUSAS" : "0% DAÑO"}
        accent={alertMode ? TECH.crimson : TECH.emerald}
        borderAccent={alertMode ? TECH.crimson : TECH.emerald}
      />
    </ImpactRig>
  );
};
