// Escena 1 Híbrida V3 (PuraPrueba V2 + ATOM 3 Ojos de Vigilancia 60fps): `hook`, dark
// "Abrir el modo incógnito en tu celular no oculta lo que visitas, estos 3 rastreadores te ven igual."
import React from "react";
import { countTo, ease, prog, useScene } from "../../../src/engine";
import { LEAD } from "../../../src/engine/Stage";
import {
  AtomHybridStage,
  AtomNeonDeck,
  ImpactRig,
  KineticStamp,
  RadarMatrixOverlay,
  ShockwaveBurst,
  TECH,
  TechLabBackdrop,
  TechTelemetryStrip,
} from "./parts";

export const Hook: React.FC = () => {
  const { f, theme, scene, cue } = useScene();
  const t0 = scene.from - LEAD;
  const cIncognito = cue("incógnito");
  const cNo = cue("no");
  const c3 = cue("3");
  const cIgual = cue("igual");

  const strikeW = prog(f, cNo - 2, 10, ease.out) * 100;
  const alertMode = f >= c3 - 2;
  const expPct = alertMode
    ? Math.round(countTo(f, c3 - 2, 18, 25, 100))
    : Math.round(countTo(f, t0 + 3, 24, 0, 25));

  return (
    <ImpactRig triggers={[cIncognito, cNo - 2, c3 - 2, cIgual - 2]} intensity={12}>
      <TechLabBackdrop alert={alertMode} emerald={!alertMode && f >= cNo - 2} />

      <TechTelemetryStrip
        at={t0}
        label={alertMode ? "3 RASTREADORES" : "MODO INCÓGNITO"}
        verdict={alertMode ? "TE VEN IGUAL" : f >= cNo - 2 ? "MITO FALSO" : "ESCANEANDO"}
        pct={expPct}
        unit="% VIS"
        status={alertMode ? "warn" : "myth"}
      />

      <AtomHybridStage
        srcA="inc-01.jpg"
        srcB="inc-08.jpg"
        at={t0 + 2}
        atomAt={cNo - 2}
        splitAt={c3 - 2}
        climaxAt={cIgual - 2}
        punches={[cIncognito, cNo - 2, cIgual - 2]}
        accentA={TECH.cyanBright}
        accentAtom={TECH.crimson}
        accentB={TECH.crimson}
        vfx={<RadarMatrixOverlay active={f >= cNo - 2} alert />}
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
              {alertMode ? "ISP · WI-FI · HUELLA IP" : "INCÓGNITO = INVISIBLE"}
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
            text="✗ FALSO · NO OCULTA TU TRÁFICO"
            bg={TECH.amber}
            ink="#041622"
            tilt={-2.2}
          />
        ) : (
          <KineticStamp
            at={c3 - 2}
            text="👁️ 3 RASTREADORES TE VEN EN VIVO"
            bg={TECH.crimson}
            ink="#FFFFFF"
            tilt={-2}
          />
        )}
      </AtomHybridStage>

      <ShockwaveBurst at={cNo - 2} x={430} y={840} color={TECH.amber} size={235} />
      <ShockwaveBurst at={c3 - 2} x={540} y={840} color={TECH.crimson} size={295} />

      <AtomNeonDeck
        at={t0 + 4}
        tag="VIGILANCIA"
        title="Visibilidad Real en Incógnito"
        rightText={f >= cIgual - 2 ? "100% EXPUESTO" : "3 NODOS"}
        accent={TECH.crimson}
        borderAccent={TECH.crimson}
      />
    </ImpactRig>
  );
};
