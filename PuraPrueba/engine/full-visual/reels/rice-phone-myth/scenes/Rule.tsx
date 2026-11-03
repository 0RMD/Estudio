// Escena 6 Híbrida V3: `rule`, light (AtomHybridStage Turbina Ventilador 60fps + Protocolo Guardable de Emergencia)
// "Haz esto si se moja: apágalo de inmediato, dale golpecitos con el puerto hacia abajo y déjalo frente a un ventilador por 24 horas."
import React from "react";
import { arrive, ease, pop, prog, useScene } from "../../../src/engine";
import { LEAD } from "../../../src/engine/Stage";
import {
  AtomHybridStage,
  EvidenceHeader,
  ImpactRig,
  KineticStamp,
  ShockwaveBurst,
  STAGE,
  TECH,
  TechLabBackdrop,
  TechTelemetryStrip,
  WaterCorrosionOverlay,
} from "./parts";

export const Rule: React.FC = () => {
  const { f, theme, ground, scene, cue } = useScene();
  const t0 = scene.from - LEAD;
  const cInmediato = cue("inmediato");
  const cAbajo = cue("abajo");
  const cVentilador = cue("ventilador");
  const c24 = cue("24");

  const doneCount =
    (f >= cInmediato - 3 ? 1 : 0) + (f >= cAbajo - 3 ? 1 : 0) + (f >= cVentilador - 3 ? 1 : 0);

  return (
    <ImpactRig triggers={[t0 + 4, cInmediato - 2, cAbajo - 2, cVentilador - 2]} intensity={9}>
      <TechLabBackdrop emerald />

      <TechTelemetryStrip
        at={t0}
        label="RESCATE OFICIAL"
        verdict={`${doneCount}/3 PASOS`}
        pct={100}
        status="safe"
      />

      <AtomHybridStage
        srcA="rice-06.jpg"
        srcB="rice-13.jpg"
        at={t0 + 2}
        atomAt={cInmediato - 2}
        splitAt={cVentilador - 3}
        climaxAt={c24 - 2}
        punches={[cAbajo - 2, cVentilador - 2, c24 - 2]}
        top={632}
        height={368}
        accentA={TECH.cyan}
        accentAtom={TECH.emerald}
        accentB={TECH.emerald}
        vfx={<WaterCorrosionOverlay active={f >= cVentilador - 3} mode="air" />}
      >
        <KineticStamp
          at={t0 + 6}
          text="📸 GUARDA ESTE PROTOCOLO SOS"
          bg="#070B14"
          ink="#00E699"
          tilt={-1.5}
        />
      </AtomHybridStage>

      <ShockwaveBurst at={c24 - 2} x={540} y={820} color={TECH.emerald} size={255} />

      <div
        style={{
          position: "absolute",
          left: STAGE.left,
          top: 1014,
          width: STAGE.safeWidth,
          height: 422,
          borderRadius: 28,
          padding: "20px 26px",
          boxSizing: "border-box",
          background: TECH.lightCard,
          boxShadow: `0 24px 58px rgba(15,23,42,0.13), inset 0 0 0 3px ${TECH.emerald}`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          transform: `translateY(${((1 - arrive(f, t0 + 4, 15)) * 105).toFixed(1)}px)`,
          opacity: prog(f, t0 + 4, 4, ease.linear),
        }}
      >
        <EvidenceHeader tag="RESCATE" title="Qué Hacer si se Moja Hoy" rightText="SALVA TU CEL" accent="#059669" />

        {[
          { trig: cInmediato - 3, icon: "1", txt: "Apágalo ya y NO conectes cable" },
          { trig: cAbajo - 3, icon: "2", txt: "Golpecitos con puerto hacia abajo" },
          { trig: cVentilador - 3, icon: "3", txt: "Frente a ventilador frío por 24 h" },
        ].map((r) => {
          const ok = f >= r.trig;
          return (
            <div
              key={r.icon}
              style={{
                padding: "13px 18px",
                borderRadius: 18,
                background: ok ? "#ECFDF5" : "#F8FAFC",
                boxShadow: `inset 0 0 0 2.5px ${ok ? TECH.emerald : "#CBD5E1"}`,
                display: "flex",
                alignItems: "center",
                gap: 14,
                ...(ok ? pop(f, r.trig, { dur: 9, from: 0.91 }) : {}),
              }}
            >
              <span
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 13,
                  background: ok ? "#059669" : "#94A3B8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: theme.font.mono,
                  fontSize: 32,
                  fontWeight: 900,
                  color: "#FFFFFF",
                  flex: "none",
                }}
              >
                {ok ? "✓" : r.icon}
              </span>
              <span style={{ fontFamily: theme.font.ui, fontSize: 32, fontWeight: 800, color: ground.ink }}>
                {r.txt}
              </span>
            </div>
          );
        })}
      </div>
    </ImpactRig>
  );
};
