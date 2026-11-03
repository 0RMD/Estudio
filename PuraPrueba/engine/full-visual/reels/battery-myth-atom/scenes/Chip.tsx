// Escena 3 Híbrida V3 (PuraPrueba V2 + ATOM Válvula PMIC 60fps): `chip`, light
// "Hoy tu teléfono tiene un chip inteligente que frena la carga al 80% mientras duermes y corta la corriente al llegar al 100%, como una válvula automática."
import React from "react";
import { countTo, useScene } from "../../../src/engine";
import { LEAD } from "../../../src/engine/Stage";
import {
  AtomHybridStage,
  AtomNeonDeck,
  ElectricArcOverlay,
  ImpactRig,
  KineticStamp,
  ShockwaveBurst,
  TECH,
  TechLabBackdrop,
  TechTelemetryStrip,
} from "./parts";

export const Chip: React.FC = () => {
  const { f, theme, scene, cue } = useScene();
  const t0 = scene.from - LEAD;
  const cChip = cue("chip");
  const c80 = cue("80%");
  const cCorta = cue("corta");
  const c100 = cue("100%");
  const cValvula = cue("válvula");

  const pct =
    f < c100 - 10
      ? Math.round(countTo(f, c80 - 18, 24, 52, 80))
      : Math.round(countTo(f, c100 - 10, 16, 80, 100));
  const cut = f >= cCorta - 2;
  const watts = cut ? 0.0 : f >= c80 ? 2.4 : 22.5;

  return (
    <ImpactRig triggers={[cChip - 2, c80 - 2, cCorta - 2, cValvula - 2]} intensity={11}>
      <TechLabBackdrop emerald={cut} />

      <TechTelemetryStrip
        at={t0}
        label="CHIP GESTOR PMIC"
        verdict={cut ? "0.0 W · CORTE" : "CARGA ACTIVA"}
        pct={pct}
        status="safe"
      />

      <AtomHybridStage
        srcA="tech-03.jpg"
        srcB="tech-10.jpg"
        at={t0 + 2}
        atomAt={cChip - 2}
        splitAt={c100 - 3}
        climaxAt={cValvula - 2}
        punches={[c80 - 2, cCorta - 2, cValvula - 2]}
        accentA={TECH.cyan}
        accentAtom={cut ? TECH.emerald : TECH.cyanBright}
        accentB={TECH.emerald}
        vfx={<ElectricArcOverlay active={!cut} color={TECH.cyanBright} />}
      >
        <div
          style={{
            position: "absolute",
            left: 16,
            top: 14,
            padding: "7px 16px",
            borderRadius: 14,
            background: "rgba(7, 11, 20, 0.92)",
            boxShadow: `inset 0 0 0 2.5px ${cut ? TECH.emerald : TECH.cyanBright}`,
            fontFamily: theme.font.mono,
            fontSize: 31,
            fontWeight: 900,
            color: cut ? TECH.emerald : "#67E8F9",
            zIndex: 15,
          }}
        >
          ⚡ {watts.toFixed(1)} W {cut ? "· BLOQUEADO" : "· FLUJO"}
        </div>

        <KineticStamp
          at={cValvula - 6}
          text="🔒 VÁLVULA CERRADA AL 100%"
          bg={TECH.emerald}
          ink="#042217"
          tilt={-2}
        />
      </AtomHybridStage>

      <ShockwaveBurst at={cCorta - 2} x={540} y={840} color={TECH.emerald} size={270} />

      <AtomNeonDeck
        at={t0 + 5}
        tag="TELEMETRÍA"
        title="Curva Nocturna y Corriente"
        rightText={cut ? "0.0 W" : `${pct}%`}
        accent={cut ? "#059669" : "#0284C7"}
        borderAccent={cut ? TECH.emerald : TECH.cyan}
      />
    </ImpactRig>
  );
};
