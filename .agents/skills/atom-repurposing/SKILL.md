---
name: atom-repurposing
description: >-
  Convierte cualquier video terminado (de ATOM o de PuraPrueba) en 5 piezas adicionales:
  carrusel visual 1080x1350 para Instagram/LinkedIn, hilo de X/Threads, post largo de
  LinkedIn/Facebook, guion corto de 15 segundos y 3 ideas derivadas.
---

# Pack Repurposing: Un Video, Cinco Publicaciones

1. Lee completo `ATOM/packs/repurposing.md` y `ATOM/preferencias.md`.
2. Para generar las diapositivas visuales del **carrusel `1080 × 1350`**:
   - **Si es un proyecto de `ATOM/`:** crea `ATOM/proyectos/<proyecto>/carrusel.json` y ejecuta desde `C:\Estudio\ATOM`:
     `node motor/carrusel.mjs <proyecto>`
   - **Si es un video `.mp4` de `PuraPrueba/` (o cualquier `.mp4`):** crea `carrusel.json` dentro de la carpeta del video en `PuraPrueba/workspace/output/<carpeta>/carrusel.json` (con el mismo formato `{ "portada": {...}, "diapos": [...], "cierre": {...} }`) y ejecuta desde `C:\Estudio`:
     `node puente/carrusel-mp4.mjs --video "PuraPrueba/workspace/output/<carpeta>/<archivo>.mp4" --json "PuraPrueba/workspace/output/<carpeta>/carrusel.json"`
3. Revisa siempre `carrusel/todas.jpg` para comprobar legibilidad y encuadre.
4. Genera también `carrusel.md`, `hilo.md`, `publicacion.md`, `guion-15s.md` e `ideas.md` usando solo datos verificados del video, y muéstralos en el chat listos para copiar.
