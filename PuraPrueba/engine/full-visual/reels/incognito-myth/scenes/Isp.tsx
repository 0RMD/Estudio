// Escena 4 Híbrida V3 (PuraPrueba V2 + ATOM Nodos Router Wi-Fi e ISP 60fps): `isp`, dark
// "Pero en cuanto sales a internet, tu proveedor de red y el router Wi-Fi de tu trabajo o escuela ven cada dominio que abres en tiempo real."
import React from "react";
import { countTo, useScene } from "../../../src/engine";
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

export const Isp: React.FC = () => {
  const { f, theme, scene, cue } = useScene();
  const t0 = scene.from - LEAD;
  const cInternet = cue("internet");
  const cWifi = cue("Wi-Fi");
  const cDominio = cue("dominio");
  const cReal = cue("real");

  const logged = f >= cDominio - 3;
  const visPct = Math.round(countTo(f, cInternet - 2, 26, 42, 100));

  return (
    <ImpactRig triggers={[cInternet - 2, cWifi - 2, cDominio - 2, cReal - 2]} intensity={11}>
      <TechLabBackdrop alert />

      <TechTelemetryStrip
        at={t0}
        label="TRÁFICO EXTERIOR"
        verdict={logged ? "DOMINIO VISTO" : "ISP + WI-FI"}
        pct={visPct}
        unit="% VIS"
        status="warn"
      />

      <AtomHybridStage
        srcA="inc-04.jpg"
        srcB="inc-11.jpg"
        at={t0 + 2}
        atomAt={cWifi - 4}
        splitAt={cDominio - 3}
        climaxAt={cReal - 2}
        punches={[cInternet - 2, cWifi - 2, cReal - 2]}
        accentA={TECH.amber}
        accentAtom={TECH.crimson}
        accentB={TECH.crimson}
        vfx={<RadarMatrixOverlay active alert />}
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
          📡 DNS SIN CIFRAR · EN VIVO
        </div>

        <KineticStamp
          at={cDominio - 3}
          text="🔍 ROUTER + OPERADOR VEN TODO"
          bg={TECH.crimson}
          ink="#FFFFFF"
          tilt={-2}
        />
      </AtomHybridStage>

      <ShockwaveBurst at={cDominio - 2} x={540} y={840} color={TECH.crimson} size={280} />

      <AtomNeonDeck
        at={t0 + 4}
        tag="DNS EN VIVO"
        title="Operador y Wi-Fi de Oficina"
        rightText="TIEMPO REAL"
        accent={TECH.crimson}
        borderAccent={TECH.crimson}
      />
    </ImpactRig>
  );
};
