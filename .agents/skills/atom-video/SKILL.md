---
name: atom-video
description: >-
  Crea reels explicativos dibujados y animados con el motor ATOM Élite en cualquiera de sus
  3 estilos visuales: ATOM (dibujado con luz y color), Cine Nocturno (escenas 3D de noche
  estilo documental) o Datos Neón (infografía animada con gráficos y cifras en neón).
  Úsala cuando el usuario elija uno de los estilos de ATOM o pida un reel dibujado en ATOM/.
---

# Motor de Video ATOM Élite (`C:\Estudio\ATOM`)

Cuando el creador quiera hacer un video con el motor de **ATOM Élite**:

1. Lee completos estos archivos dentro de `ATOM/`:
   - `ATOM/AGENTS.md`
   - `ATOM/packs/estilos.md` (estilos **ATOM**, **Cine Nocturno**, **Datos Neón** y **Modo Claro** con `"tema": "claro"` en `guion.json` + `k.fondoClaro` / `k.sombraSuave`)
   - `ATOM/METODO.md` y las guías de `ATOM/guia/` (`guion.md`, `dibujo.md`, `sonido.md`)
   - `ATOM/preferencias.md` y `ATOM/marca.json`
2. Todos los comandos de `motor/` deben ejecutarse situándote en `C:\Estudio\ATOM` (`Set-Location C:\Estudio\ATOM`).
3. Sigue paso a paso `ATOM/METODO.md` sin saltarte ninguna revisión visual ni de audio.
4. Todo video de ATOM termina con el cierre del creador (`ATOM/preferencias.md`) y se entrega en `ATOM/salida/<proyecto>/` junto con:
   - Su portada clickbait `flyer.jpg` (usando `atom-portadas`).
   - Sus descripciones para las 4 redes `descripciones.md` (usando `atom-descripciones`).
