// Escena 1: `hook`, dark (Doble Ilustración: manos tronando nudillos -> médico anciano con 60 años de prueba)
// "Tronarte los dedos no te da artritis: un médico lo probó 60 años con una sola mano."
import React from "react";
import { arrive, countTo, ease, pop, prog, useScene } from "../../../src/engine";
import { LEAD } from "../../../src/engine/Stage";
import {
  DualIllustrationStage,
  ElectricArcOverlay,
  EvidenceHeader,
  ImpactRig,
  KineticStamp,
  ShockwaveBurst,
  STAGE,
  TECH,
  TechLabBackdrop,
  TechTelemetryStrip,
} from "./parts";

export const Hook: React.FC = () => {
  const { f, theme, ground, scene, cue } = useScene();
  const t0 = scene.from - LEAD;
  const cNo = cue("no");
  const cMedico = cue("médico");
  const c60 = cue("60");
  const cMano = cue("mano");

  const busted = f >= cNo - 2;
  const doctor = f >= cMedico - 2;
  const strikeW = prog(f, cNo - 2, 10, ease.out) * 100;
  const risk = busted ? Math.round(countTo(f, cNo - 2, 20, 100, 0)) : Math.round(countTo(f, t0 + 2, 30, 20, 100));
  const years = Math.round(countTo(f, c60 - 6, 22, 0, 60));
  const handFocus = f >= cMano - 2;

  return (
    <ImpactRig triggers={[cNo - 2, cMedico - 2, c60 - 2]} intensity={11}>
      <TechLabBackdrop alert={!busted} emerald={busted} />

      <TechTelemetryStrip
        at={t0}
        label={doctor ? "EXPERIMENTO REAL" : busted ? "TRONAR = ARTRITIS" : "LO QUE TODOS CREEN"}
        verdict={doctor ? (handFocus ? "1 SOLA MANO" : "1 MÉDICO") : busted ? "MITO FALSO" : "ANALIZANDO"}
        pct={doctor ? years : risk}
        unit={doctor ? " AÑOS" : "%"}
        status={busted ? "safe" : "warn"}
      />

      <DualIllustrationStage
        srcA="knu-01.jpg"
        srcB="knu-02.jpg"
        at={t0 + 2}
        flipAt={cMedico - 2}
        mode="whip"
        top={636}
        height={404}
        accentA={busted ? TECH.emerald : TECH.crimson}
        accentB={TECH.amber}
        vfx={<ElectricArcOverlay active={!busted} color={TECH.cyanBright} />}
      >
        {/* Píldora del mito, tachada en vivo en "no" */}
        {!doctor && (
          <div
            style={{
              position: "absolute",
              left: 18,
              top: 16,
              padding: "8px 18px",
              borderRadius: 14,
              background: "rgba(7, 11, 20, 0.92)",
              boxShadow: `inset 0 0 0 2.5px ${busted ? TECH.crimson : TECH.cyanBright}`,
              zIndex: 15,
            }}
          >
            <div style={{ position: "relative" }}>
              <span style={{ fontFamily: theme.font.mono, fontSize: 32, fontWeight: 900, color: busted ? "#FDA4AF" : "#FFFFFF" }}>
                TRONAR = ARTRITIS
              </span>
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
            </div>
          </div>
        )}

        {!doctor ? (
          <KineticStamp at={cNo - 2} text="✗ MITO FALSO" bg={TECH.emerald} ink="#042217" tilt={-2.5} />
        ) : (
          <KineticStamp at={c60 - 2} text="⏳ 60 AÑOS DE PRUEBA" bg={TECH.amber} ink="#2A1A00" tilt={-2} />
        )}
      </DualIllustrationStage>

      <ShockwaveBurst at={cNo - 2} x={430} y={940} color={TECH.emerald} size={230} />
      <ShockwaveBurst at={c60 - 2} x={540} y={840} color={TECH.amber} size={270} />

      {/* Expediente del experimento: mano izquierda (se truena) vs mano derecha (nunca) */}
      <div
        style={{
          position: "absolute",
          left: STAGE.left,
          top: 1054,
          width: STAGE.safeWidth,
          height: 382,
          borderRadius: 28,
          padding: "20px 26px",
          boxSizing: "border-box",
          background: TECH.darkCard,
          boxShadow: `0 24px 58px rgba(0,0,0,0.58), 0 0 26px ${doctor ? "rgba(255,184,0,0.18)" : "rgba(0,240,255,0.12)"}, inset 0 0 0 2.5px ${
            doctor ? TECH.amber : TECH.borderDark
          }`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          transform: `translateY(${((1 - arrive(f, t0 + 4, 15)) * 105).toFixed(1)}px)`,
          opacity: prog(f, t0 + 4, 4, ease.linear),
        }}
      >
        <EvidenceHeader
          tag="EXPEDIENTE"
          title="Dr. Unger"
          rightText="IZQ vs DER"
          accent={doctor ? TECH.amber : TECH.cyanBright}
        />

        {/* Línea de tiempo del experimento: se llena hasta 60 años en "60" */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontFamily: theme.font.mono, fontSize: 32, fontWeight: 900, color: doctor ? TECH.amber : ground.dim }}>AÑOS</span>
          <div style={{ flex: 1, height: 16, borderRadius: 999, background: "rgba(255,255,255,0.10)", overflow: "hidden" }}>
            <div
              style={{
                width: `${((years / 60) * 100).toFixed(1)}%`,
                height: "100%",
                borderRadius: 999,
                background: "linear-gradient(90deg, #00F0FF 0%, #FFB800 100%)",
                boxShadow: `0 0 14px ${TECH.amber}`,
              }}
            />
          </div>
          <span style={{ fontFamily: theme.font.mono, fontSize: 34, fontWeight: 900, color: ground.ink, fontVariantNumeric: "tabular-nums", minWidth: 96, textAlign: "right" }}>
            {years}/60
          </span>
        </div>

        <div style={{ display: "flex", gap: 16 }}>
          <div
            style={{
              flex: 1,
              padding: "16px 20px",
              borderRadius: 22,
              background: handFocus
                ? "linear-gradient(145deg, rgba(0,240,255,0.22) 0%, rgba(0,230,153,0.08) 100%)"
                : "rgba(255,255,255,0.04)",
              boxShadow: `inset 0 0 0 2.5px ${handFocus ? TECH.cyanBright : TECH.borderDark}`,
              display: "flex",
              flexDirection: "column",
              gap: 9,
              ...(handFocus ? pop(f, cMano - 2, { dur: 10, from: 0.88 }) : {}),
            }}
          >
            <span style={{ fontFamily: theme.font.mono, fontSize: 32, fontWeight: 900, color: TECH.cyanBright }}>MANO IZQ</span>
            <span style={{ fontFamily: theme.font.ui, fontSize: 38, fontWeight: 900, color: ground.ink }}>La truena</span>
            <span style={{ fontFamily: theme.font.ui, fontSize: 32, fontWeight: 700, color: ground.dim }}>2 veces al día</span>
          </div>
          <div
            style={{
              flex: 1,
              padding: "16px 20px",
              borderRadius: 22,
              background: handFocus ? "linear-gradient(145deg, rgba(255,184,0,0.18) 0%, rgba(255,184,0,0.05) 100%)" : "rgba(255,255,255,0.04)",
              boxShadow: `inset 0 0 0 2.5px ${handFocus ? TECH.amber : TECH.borderDark}`,
              display: "flex",
              flexDirection: "column",
              gap: 9,
            }}
          >
            <span style={{ fontFamily: theme.font.mono, fontSize: 32, fontWeight: 900, color: TECH.amber }}>MANO DER</span>
            <span style={{ fontFamily: theme.font.ui, fontSize: 38, fontWeight: 900, color: ground.ink }}>Nunca</span>
            <span style={{ fontFamily: theme.font.ui, fontSize: 32, fontWeight: 700, color: ground.dim }}>Mano control</span>
          </div>
        </div>
      </div>
    </ImpactRig>
  );
};
