// Escena 1 Híbrida V3 (PuraPrueba V2 + ATOM Celular en Arroz & Corrosión 24h a 60fps): `hook`, dark
// "Meter tu celular mojado en arroz no salva sus circuitos, este error oculto acelera el daño en 24 horas."
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
  WaterCorrosionOverlay,
} from "./parts";

export const Hook: React.FC = () => {
  const { f, theme, scene, cue } = useScene();
  const t0 = scene.from - LEAD;
  const cArroz = cue("arroz");
  const cNo = cue("no");
  const cError = cue("error");
  const c24 = cue("24");

  const strikeW = prog(f, cNo - 2, 10, ease.out) * 100;
  const alertMode = f >= cError - 2;
  const humPct = alertMode
    ? Math.round(countTo(f, cError - 2, 20, 74, 96))
    : Math.round(countTo(f, t0 + 3, 24, 88, 74));

  return (
    <ImpactRig triggers={[cArroz, cNo - 2, cError - 2, c24 - 2]} intensity={12}>
      <TechLabBackdrop alert={alertMode} emerald={!alertMode && f >= cNo - 2} />

      <TechTelemetryStrip
        at={t0}
        label={alertMode ? "DAÑO EN 24 HORAS" : "CELULAR EN ARROZ"}
        verdict={alertMode ? "CORROSIÓN" : f >= cNo - 2 ? "MITO FALSO" : "HUMEDAD"}
        pct={humPct}
        status={alertMode ? "warn" : "myth"}
      />

      <AtomHybridStage
        srcA="rice-01.jpg"
        srcB="rice-08.jpg"
        at={t0 + 2}
        atomAt={cNo - 2}
        splitAt={cError - 2}
        climaxAt={c24 - 2}
        punches={[cArroz, cNo - 2, c24 - 2]}
        accentA={TECH.cyanBright}
        accentAtom={TECH.crimson}
        accentB={TECH.crimson}
        vfx={<WaterCorrosionOverlay active mode={alertMode ? "starch" : "water"} />}
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
              {alertMode ? "HUMEDAD ATRAPADA 24H" : "EL ARROZ LO SECA"}
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
            text="✗ MITO PELIGROSO · NO LO SALVA"
            bg={TECH.amber}
            ink="#041622"
            tilt={-2.2}
          />
        ) : (
          <KineticStamp
            at={cError - 2}
            text="⚠️ OXIDA TUS CIRCUITOS EN 24H"
            bg={TECH.crimson}
            ink="#FFFFFF"
            tilt={-2}
          />
        )}
      </AtomHybridStage>

      <ShockwaveBurst at={cNo - 2} x={430} y={840} color={TECH.amber} size={235} />
      <ShockwaveBurst at={c24 - 2} x={540} y={840} color={TECH.crimson} size={295} />

      <AtomNeonDeck
        at={t0 + 4}
        tag="EMERGENCIA"
        title="Humedad Atrapada y Oxidación"
        rightText={f >= c24 - 2 ? "24H LETALES" : "86% HUMEDAD"}
        accent={TECH.crimson}
        borderAccent={TECH.crimson}
      />
    </ImpactRig>
  );
};
