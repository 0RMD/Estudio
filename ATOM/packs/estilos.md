# Estilos visuales: ATOM, Cine Nocturno y Datos Neón

ATOM Élite hace vídeos en tres estilos. **Antes de cada vídeo, pregunta siempre cuál quiere**, en una línea, salvo que
ya lo haya dicho en su petición:

> ¿En qué estilo lo hago? **ATOM** (dibujado, con luz y color, como los ejemplos), **Cine Nocturno** (escenas 3D de
> noche con look de documental) o **Datos Neón** (infografía animada con gráficos y cifras en neón). Si quieres
> verlos antes, están en `ejemplo-estilos/`.

Si no sabe cuál elegir, recomienda según el tema:
- **ATOM:** ciencia, cuerpo humano, naturaleza, curiosidades: cosas que se ven y se mueven.
- **Cine Nocturno:** historias, misterios, psicología, hábitos, «¿te ha pasado que...?», casos reales.
- **Datos Neón:** dinero, comparaciones, cifras, velocidades, «¿qué conviene más?», todo lo que se explica con un
  gráfico.

Apunta el estilo en el `plan.md` del proyecto. El método es siempre `METODO.md`: el estilo cambia cómo se ve, no cómo
se hace ni la calidad que se exige.

## Lo que no cambia en ningún estilo

- **El cierre.** Todos los vídeos terminan con el cierre del creador (`preferencias.md`), tal cual, con su remate y un
  reposo final. **Los vídeos de `ejemplo-estilos/` están recortados al final a propósito** (se quitó su cierre
  original): no significa que los vídeos acaben de golpe. Nunca termines un vídeo sin el CTA del creador.
- El hook en el primer segundo, la voz, los subtítulos arriba, las zonas seguras y las revisiones de `METODO.md`.

## Antes de dibujar en Cine Nocturno o Datos Neón

1. Lee `ejemplo-estilos/<estilo>/estilo.md` entero.
2. Mira `ejemplo-estilos/<estilo>/hoja.jpg` y los fotogramas de `ejemplo-estilos/<estilo>/fotogramas/`: es el nivel.
3. Mira `guia/muestras-estilos.jpg`: las piezas del kit para ese estilo (`motor/kit/estilos.js`). Se usan con
   `import * as k from "#kit"`: `k.CINE`, `k.nocheCine`, `k.luzCalida`, `k.vineta`, `k.grano`, `k.rotuloCine`;
   `k.NEON`, `k.rejilla`, `k.panelNeon`, `k.lineaNeon`, `k.barraNeon`, `k.textoMono`, `k.chipNeon`.
4. Los ejemplos de estilo son solo vídeos (no tienen planos): se copian la paleta, la luz, la cámara y el ritmo, nunca
   sus escenas ni sus temas. Cómo se construye un plano lo enseñan `ejemplo/alcohol` y `ejemplo/estrella-verde`.

Al terminar el vídeo, como siempre: su portada (`packs/portadas.md`, con el color de su marca) y sus descripciones
(`packs/captions.md`).
