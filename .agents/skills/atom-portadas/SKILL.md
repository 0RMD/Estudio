---
name: atom-portadas
description: >-
  Generador de portadas clickbait 1080x1920 estilo ATOM (impacto, limpio o bloque) con
  contraste verificado, zonas seguras de TikTok/Reels/Shorts y vista previa de cuadrícula 3:4.
  Funciona tanto con proyectos de ATOM como con cualquier video .mp4 de PuraPrueba.
---

# Generador de Portadas Clickbait (`ATOM` + `PuraPrueba`)

Antes de crear portadas, lee `ATOM/packs/portadas.md` y revisa `ATOM/marca.json` (y los ejemplos en `ATOM/packs/portadas-ejemplos/`).

## Cómo generar las 3 opciones, revisar zonas seguras y elegir la mejor

- **Si el video es un proyecto de `ATOM/`:**
  Ejecuta desde `C:\Estudio\ATOM`:
  ```powershell
  node motor/portada.mjs <proyecto> --titulo "Tu frase *clave* aquí" --etiqueta "remate corto"
  ```
  Revisa las imágenes y sus `-zonas.jpg` + `rejilla.jpg` en `ATOM/salida/<proyecto>/portadas/`, y copia la mejor como `ATOM/salida/<proyecto>/flyer.jpg`.

- **Si el video es un `.mp4` terminado de `PuraPrueba/` (o cualquier `.mp4` externo):**
  Ejecuta el puente desde `C:\Estudio`:
  ```powershell
  node puente/portada-mp4.mjs --video "PuraPrueba/workspace/output/<carpeta>/<archivo>.mp4" --titulo "Tu frase *clave* aquí" --etiqueta "remate corto" --segundos 2,18,35
  ```
  *(Opcional: `--estilo impacto|limpio|bloque`, `--acento "#00F0FF"`, `--dy 0`, `--out "<carpeta_destino>"`).*
  Revisa `portada-1.jpg`, `portada-N-zonas.jpg` y `rejilla.jpg` en la carpeta `portadas/` generada junto al video, y copia la mejor como `flyer.jpg`.
