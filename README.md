# Estudio Maestro · PuraPrueba (`60 fps`) + ATOM Élite (`Dibujado / 3D / Neón / Modo Claro`)

Repositorio unificado que reúne bajo un solo techo tus dos motores de creación de videos virales, todas sus habilidades (`.agents/skills/`), el puente de portadas/carruseles (`puente/`) y todos los episodios producidos.

---

## Cómo retomar en cualquier computadora en 10 segundos

1. Clona este repositorio:
   ```bash
   git clone https://github.com/0RMD/Estudio.git
   cd Estudio
   ```
2. Instala las dependencias en ambos motores:
   ```bash
   cd PuraPrueba && npm install && cd ..
   cd ATOM && npm install && cd ..
   ```
3. Abre la carpeta `Estudio` como Workspace en **Antigravity** y escribe en el chat:
   > `Lee @AGENTS.md y @README.md para retomar exactamente donde íbamos.`

*(Tus claves privadas en `.env.local` y `ATOM/PEGA-AQUI-TU-CLAVE-ELEVENLABS.txt` están protegidas por `.gitignore` y nunca se suben a GitHub).*

---

## Arquitectura del Estudio

- **`PuraPrueba/`** — Motor **Keyframes V2 Viral a `60 fps`** (`1080x1920`), ilustraciones `16:9` en `DualIllustrationStage` (modos `whip` PiP y `split` 50/50), cadena vocal broadcast a `-14 LUFS` con Foley de estudio, evaluador de ganchos `10/10` (`workspace/library/myth-busting/scorecard_hook.mjs`) y autopublicación gratuita (`workspace/library/auto-publish/`).
- **`ATOM/`** — Motor **ATOM Élite** con escenas dibujadas en Canvas + Three.js 3D + infografías neón + **Modo Claro (estilo DatosMotion)**, generador de portadas clickbait con verificación de contraste y zonas seguras, descripciones SEO para 4 redes, carruseles `1080x1350`, calendario de 30 días, modo series y kit de venta a negocios.
- **`puente/`** — Scripts que aplican el generador de portadas (`puente/portada-mp4.mjs`) y el creador de carruseles (`puente/carrusel-mp4.mjs`) de ATOM directamente sobre cualquier `.mp4` terminado de `PuraPrueba/`.
- **`.agents/skills/`** — Habilidades unificadas para combinar libremente ambos motores en la misma conversación.

---

## Historial de las 3 Sesiones de Trabajo en `Estudio`

### 1. `Viral Video Testing Project` (Unificación del Estudio + Serie Mitos y Pruebas Híbridas)
- Se unificaron **`PuraPrueba/`** y **`ATOM/`** dentro de `C:\Estudio` con las habilidades cruzadas (`puraprueba-viral`, `atom-video`, `atom-portadas`, `atom-descripciones`, `atom-repurposing`, `atom-calendario`, `atom-series`, `atom-temas-nichos`, `atom-negocios`) y las herramientas de `puente/`.
- Se produjeron pruebas híbridas y la serie de 4 episodios de mitos tecnológicos tanto en `ATOM/` (`salida/2026-10-31-ep1-wifi-barra-rapida` a `ep4-camara-200mp`) como en versión combinada `60 fps` dentro de `PuraPrueba/` (`2026-10-31-full-visual-ep1-battery-atom`, `ep2-closing-apps-atom`, `ep3-incognito-atom`, `ep4-rice-phone-atom`) con sus portadas clickbait verificadas y cola de programación (`schedule_4_episodes.mjs`).

### 2. `Modificación De Videos De Prueba` (Ajustes Visuales, Foley y Nuevo Episodio de Salud)
- Refinamiento de sincronización, mezcla de efectos de sonido (`docs-sesion/scripts/mix_viral_sfx_knuckle.py`) y renderizado en `PuraPrueba/` del episodio de desmitificación médica **`knuckle-myth`** (*tronarse los dedos / artritis*) en `PuraPrueba/workspace/output/2026-11-01-full-visual-knuckle-myth/knuckle-myth.mp4` (`60 fps`).
- Ajustes de layout y pruebas comparativas en `PuraPrueba/workspace/output/pruebas-atom-hibrido/`.

### 3. `Analysis Of DATOSMOTION Zip File` (Integración del Estilo DatosMotion / Modo Claro en ATOM)
- Análisis del paquete **DATOSMOTION** e integración del **Modo Claro** en el motor de `ATOM/motor/lib/comun.mjs` (fondo cálido claro, trazos de alto contraste, tarjetas limpias y tipografía editorial).
- Producción completa de **3 episodios nuevos en Modo Claro** dentro de `ATOM/` (con video `.mp4`, audio, efectos de sonido, descripciones SEO para 4 redes y 3 variantes de portada + rejilla para cada uno):
  1. **`2026-11-02-cafe-despertar`** — *Por qué tomar café recién despertado da más sueño a mediodía* (`ATOM/salida/2026-11-02-cafe-despertar/`)
  2. **`2026-11-02-alarma-cinco-minutos`** — *Por qué posponer la alarma 5 minutos te deja más cansado todo el día* (`ATOM/salida/2026-11-02-alarma-cinco-minutos/`)
  3. **`2026-11-02-platos-mano-agua`** — *Por qué lavar los platos a mano gasta 4 veces más agua que el lavavajillas* (`ATOM/salida/2026-11-02-platos-mano-agua/`)
