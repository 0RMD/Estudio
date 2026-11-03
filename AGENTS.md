# Estudio Maestro · PuraPrueba + ATOM Élite

Este espacio une tus dos sistemas de creación de videos bajo un solo techo para que puedas usar y cruzar **todas sus habilidades en la misma conversación**:

- **`PuraPrueba/`** — Tu proyecto de GitHub (`Keyframes V2` a `60 fps`, marca **PuraPrueba**, Episodios 1 y 2 listos, ilustraciones `16:9`, pantalla dividida/PiP, `Split Explainer`, `Talking Head`, evaluador de ganchos `10/10` y autopublicador gratuito con Buffer).
- **`ATOM/`** — Tu sistema **ATOM Élite** (conectado en tiempo real a `C:\ATOM`: 3 estilos dibujados/3D/Neón y 9 packs de estrategia, portadas clickbait, descripciones SEO para 4 redes, carruseles/repurposing y venta de videos a negocios).
- **`puente/`** — Herramientas que aplican el generador de portadas clickbait y el creador de carruseles de ATOM sobre cualquier `.mp4` terminado (incluidos los videos a `60 fps` de `PuraPrueba/`).

## Idioma y comunicación con el creador

- Comunícate siempre en **español de Latinoamérica** («video», «celular», «computadora», «ustedes», «manejar»; nunca «vídeo», «móvil», «ordenador», «vosotros» ni «coche»).
- **Corto y claro** en todo lo que escribas: una frase donde iban dos.
- Lo técnico es tuyo: no abrumes al creador con nombres internos de scripts o mediciones; muéstrale el avance, el guion, las imágenes o el video terminado, y pregúntale solo lo que él debe decidir.

## Reglas sagradas

- **Nunca pidas una clave en el chat.** Nunca abras, leas, muestres ni copies `.env.local` ni `ATOM/PEGA-AQUI-TU-CLAVE-ELEVENLABS.txt`.
  - Para verificar el estado de `ATOM/`, ejecuta `node motor/doctor.mjs` desde `ATOM/`.
  - Para configurar o verificar claves en `PuraPrueba/`, usa `node scripts/doctor.mjs` o abre la página local de claves con `node scripts/keys/server.mjs` desde `PuraPrueba/`.
- **Nunca le pidas al creador que ejecute un comando:** tú tienes terminal en su computadora. Instalar dependencias, correr renders, verificar audio o preparar archivos es tu trabajo. Lo único suyo es autorizar permisos del sistema o iniciar sesión en una ventana que tú le abras.
- **Nunca publiques ni envíes nada sin su orden explícita.**

## Cómo elegir o combinar ambos motores

Cuando el creador pida un **video nuevo** y no haya especificado qué motor o estilo quiere, pregúntale en una sola línea cuál de sus opciones prefiere:

1. **PuraPrueba Viral V2 (`60 fps` con ilustraciones + pruebas + Foley)** — ideal para desmitificación (*Myth-Busting*), tecnología, salud, dinero y ciencia viral (`PuraPrueba/`). Usa la skill `puraprueba-viral` y `full-visual`.
2. **Con cámara (`Split Explainer` o `Talking Head`)** — su rostro + animaciones o edición dinámica (`PuraPrueba/`). Usa `split-explainer` o `talking-head`.
3. **Estilos dibujados / 3D de ATOM (`ATOM`, `Cine Nocturno` o `Datos Neón`)** — explicaciones dibujadas, historias nocturnas o infografías en neón (`ATOM/`). Usa la skill `atom-video`.

### Cruce libre de habilidades (lo mejor de ambos mundos)

Puedes combinar herramientas de `ATOM/` y `PuraPrueba/` en cualquier proyecto:
- **Ideas y planeación:** usa el **Calendario de 30 días** (`atom-calendario`), los **100 temas y 11 nichos** (`atom-temas-nichos`), el **Modo Series** (`atom-series`) o el **Evaluador de ganchos `10/10`** (`PuraPrueba/workspace/library/myth-busting/scorecard_hook.mjs`).
- **Empaque multi-red para cualquier video (de PuraPrueba o de ATOM):**
  - **Portada clickbait (`1080x1920`):** skill `atom-portadas` (`node motor/portada.mjs` para proyectos ATOM, o `node puente/portada-mp4.mjs` para cualquier `.mp4` de `PuraPrueba/`).
  - **Descripciones con SEO + CTA para las 4 redes** (Instagram Reels, TikTok, YouTube Shorts y Facebook): skill `atom-descripciones`.
  - **Repurposing (carrusel `1080x1350`, hilo de X/Threads, post de LinkedIn y guion corto de 15s):** skill `atom-repurposing` (`node motor/carrusel.mjs` para proyectos ATOM, o `node puente/carrusel-mp4.mjs` para cualquier `.mp4` de `PuraPrueba/`).
- **Autopublicación gratuita (`$0` con Buffer):** usa `PuraPrueba/workspace/library/auto-publish/publish_reel.mjs` para enviar a TikTok, Instagram Reels (+ Facebook) y YouTube Shorts cualquier video terminado (sea de `PuraPrueba/` o de `ATOM/`).
- **Monetización con clientes:** usa la skill `atom-negocios` y ofrece a negocios videos hechos tanto con el motor de `ATOM/` como con el motor `60 fps` de `PuraPrueba/`.

## Directorios de trabajo al ejecutar comandos

- Todo comando del motor **PuraPrueba / Keyframes** debe ejecutarse situándote en `C:\Estudio\PuraPrueba` (`Set-Location C:\Estudio\PuraPrueba; ...`). Lee `PuraPrueba/CONTINUAR_EN_NUEVO_EQUIPO.md` para recordar el estado exacto del canal **PuraPrueba**.
- Todo comando del motor **ATOM** debe ejecutarse situándote en `C:\Estudio\ATOM` (`Set-Location C:\Estudio\ATOM; ...`).
