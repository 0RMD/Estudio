---
name: puraprueba-viral
description: >-
  Receta maestra V2 Viral del canal PuraPrueba (Myth-Busting de 45-56s a 1080x1920 60 fps,
  14 ilustraciones 16:9 en DualIllustrationStage, scorecard 10/10 de ganchos, voz rápida
  masterizada a -14 LUFS con Foley de estudio y autopublicación gratuita en Buffer).
  Úsala siempre que el usuario quiera continuar con PuraPrueba, crear un nuevo episodio
  de desmitificación viral, evaluar ganchos con scorecard_hook.mjs o autopublicar episodios.
---

# PuraPrueba · Estándar V2 Viral y Autopublicación

Antes de producir o publicar un episodio de **PuraPrueba**, lee siempre:
1. `PuraPrueba/CONTINUAR_EN_NUEVO_EQUIPO.md` (estado actual, episodios terminados, kit gráfico oficial y comandos).
2. `PuraPrueba/docs-sesion/estrategia_myth_busting_viral.md` (arquitectura segundo a segundo de 55s y banco de 12 ganchos `10/10`).
3. `PuraPrueba/workspace/library/myth-busting/plantilla_guion_55s.md`.

## Flujo de producción V2 en Windows (`C:\Estudio\PuraPrueba`)

1. **Filtro de Gancho (`10/10`):**
   Valida siempre el gancho antes de producir corriendo desde `C:\Estudio\PuraPrueba`:
   `node workspace/library/myth-busting/scorecard_hook.mjs "<gancho>"`
2. **Motor Visual (`1080x1920 @ 60 fps`):**
   - Ubicación: `PuraPrueba/engine/full-visual/reels/<slug>/` (toma como referencia directa `battery-myth` y `closing-apps-myth`).
   - Estética Cyber-Neon (`#060911` / `#EDF3FF`, acentos `#00F0FF`, `#00E699`, `#FF1E56`, `#FFB800`).
   - **14 ilustraciones `16:9` sin texto incrustado** por episodio (2 por escena en `DualIllustrationStage` alternando modos `whip` con PiP y `split` 50/50), gráficas SVG vivas, tamaño mínimo de texto `>= 32 px` y bucle continuo (*Seamless Loop*) conectando el cierre con la primera frase.
3. **Voz y Mastering Foley:**
   - Voz: `Snap - Fast-paced Viral Narrator` (`gWaDC0oXAheKoZfljzuI`) en `eleven_v3` (`lang: "es"`), aplicando `tighten.py --cap 0.16` + `atempo=1.12` (ver scripts de referencia en `PuraPrueba/docs-sesion/scripts/`).
   - Nota Windows: usa `python` en lugar de `python3` si algún script auxiliar de Mac invocaba `python3`.
   - Cadena vocal broadcast (`-14 LUFS`, `-0.8 dB` true peak) + efectos Foley reales (`PuraPrueba/assets/talking-head/sfx/`).
4. **Entrega y Cruce Opcional con ATOM:**
   - Guarda el resultado en `PuraPrueba/workspace/output/<fecha>-full-visual-<slug>/` (`<slug>.mp4`, `cover.jpg`, `caption.txt`).
   - Si el creador quiere potenciar el episodio con herramientas de ATOM, usa `atom-portadas` (`node puente/portada-mp4.mjs`), `atom-descripciones` o `atom-repurposing` (`node puente/carrusel-mp4.mjs`).
5. **Autopublicación Gratuita (`$0` con Buffer):**
   - Script: `node workspace/library/auto-publish/publish_reel.mjs <carpeta_output>` (ejecutado desde `C:\Estudio\PuraPrueba`, solo cuando el creador pida publicarlo).
