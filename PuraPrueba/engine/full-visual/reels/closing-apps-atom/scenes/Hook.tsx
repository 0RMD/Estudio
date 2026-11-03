// Escena 1 Híbrida V3 (PuraPrueba V2 + ATOM 3D Swipe & CPU Fire 60fps): `hook`, dark
// "Cerrar todas las apps de tu celular no ahorra batería, abrirlas desde cero gasta más."
import React from "react";
import { countTo, ease, prog, useScene } from "../../../src/engine";
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
  ThermalEmbersOverlay,
} from "./parts";

export const Hook: React.FC = () => {
  const { f, theme, scene, cue } = useScene();
  const t0 = scene.from - LEAD;
  const cTodas = cue("todas");
  const cNo = cue("no");
  const cDesde = cue("desde");
  const cMas = cue("más");

  const strikeW = prog(f, cNo - 2, 10, ease.out) * 100;
  const alertMode = f >= cDesde - 2;
  const cpuLoad = alertMode
    ? Math.round(countTo(f, cDesde - 2, 18, 12, 96))
    : Math.round(countTo(f, t0 + 3, 24, 48, 0));

  return (
    <ImpactRig triggers={[cTodas, cNo - 2, cDesde - 2, cMas - 2]} intensity={12}>
      <TechLabBackdrop alert={alertMode} emerald={!alertMode && f >= cNo - 2} />

      <TechTelemetryStrip
        at={t0}
        label={alertMode ? "ABRIR DE CERO" : "CERRAR APPS"}
        verdict={alertMode ? "4x GASTO" : f >= cNo - 2 ? "MITO FALSO" : "ANALIZANDO"}
        pct={cpuLoad}
        unit="% CPU"
        status={alertMode ? "warn" : "safe"}
      />

      <AtomHybridStage
        srcA="app-01.jpg"
        srcB="app-08.jpg"
        at={t0 + 2}
        atomAt={cNo - 2}
        splitAt={cDesde - 2}
        climaxAt={cMas - 2}
        punches={[cTodas, cNo - 2, cMas - 2]}
        startWithAtom={true}
        accentA={f >= cNo - 2 ? TECH.emerald : TECH.cyanBright}
        accentAtom={TECH.cyanBright}
        accentB={TECH.crimson}
        vfx={
          <>
            <ThermalEmbersOverlay active={alertMode} />
            <ElectricArcOverlay active={alertMode} color={TECH.crimson} />
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
              {alertMode ? "PICO DE CPU AL REABRIR" : "CERRAR APPS = AHORRO"}
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
            text="✗ MITO FALSO · NO AHORRA NADA"
            bg={TECH.emerald}
            ink="#042217"
            tilt={-2.2}
          />
        ) : (
          <KineticStamp
            at={cDesde - 2}
            text="🔥 ABRIR DESDE CERO GASTA MÁS"
            bg={TECH.crimson}
            ink="#FFFFFF"
            tilt={-2}
          />
        )}
      </AtomHybridStage>

      <ShockwaveBurst at={cNo - 2} x={430} y={840} color={TECH.emerald} size={235} />
      <ShockwaveBurst at={cDesde - 2} x={540} y={840} color={TECH.crimson} size={295} />

      <AtomNeonDeck
        at={t0 + 4}
        tag="PRUEBA"
        title="Consumo Real al Volver"
        rightText={f >= cMas - 2 ? "4x PICO" : "COMPARATIVA"}
        accent={alertMode ? TECH.crimson : TECH.emerald}
        borderAccent={alertMode ? TECH.crimson : TECH.emerald}
      />
    </ImpactRig>
  );
};
