# Reels explicativos

Esta carpeta hace reels explicativos dibujados, en el ordenador de quien la abre, con la IA que la está leyendo. Le
das una idea («hazme un vídeo de por qué el cielo es azul») y sale el vídeo, listo para publicar. Nada se publica solo.

El nivel es el de los ejemplos: `ejemplo/estrella-verde/estrella-verde.mp4` y `ejemplo/alcohol/alcohol.mp4`.

## Al abrir la carpeta

- **«Configúrame», «set me up» o es la primera vez:**
  0. Si no existen `ejemplo/estrella-verde/` y `ejemplo/alcohol/`, busca los ZIP de ejemplos (`ATOM * - Ejemplo*.zip`)
     en esta carpeta y, si no están, en la carpeta Descargas del creador. Descomprímelos aquí para que queden en
     `ejemplo/estrella-verde/` y `ejemplo/alcohol/` (si ya están descomprimidos en otra carpeta, muévelos ahí). Si no los
     encuentras, pídele que los descargue de la clase «Descarga tu ATOM» en Hotmart y los ponga en esta carpeta.
  1. `node motor/doctor.mjs`, e instala tú lo que falte (`npm install` en esta carpeta, ffmpeg, Node).
  2. Si `doctor` dice que falta la clave de voz, pídele que abra `PEGA-AQUI-TU-CLAVE-ELEVENLABS.txt` en esta carpeta,
     pegue su clave después de `CLAVE=` y guarde; luego vuelve a pasar `doctor`. Si no le funciona, `node motor/clave.mjs`
     abre una página para pegarla.
  3. Si no existe `preferencias.md`, pregunta en un solo mensaje: en qué idioma y de qué país es su público (por defecto,
     Latinoamérica), su nicho (si no lo sabe, ofrécele los de
     `packs/nichos.md`) y para quién son sus vídeos, cómo quiere
     cerrarlos (por ejemplo «Envíaselo a ese amigo que...») y si quiere efectos de sonido. En el mismo mensaje, para
     sus portadas y descripciones: el color de su marca (si no tiene, el rojo de ATOM), su @ en cada red donde publica
     y, si usa, la palabra que la gente debe comentar y qué recibe a cambio. Guárdalo en `preferencias.md` con sus
     palabras (lo de las descripciones bajo `## Descripciones`, como dice `packs/captions.md`) y el color en
     `marca.json` (`packs/portadas.md`). Lo que no conteste, con lo de por defecto: no vuelvas a preguntar.
  4. Cuando todo esté listo, dile que ya puede pedir su primer vídeo y enséñale el menú, tal cual:

     > **Esto es lo que puedes pedirme:**
     > - «Hazme un video sobre ...»: tu video, de la idea al archivo listo para subir.
     > - «Ármame el calendario del mes»: 30 temas virales de tu nicho, uno por día. Luego: «hazme el video del día 5».
     > - «Dame 5 temas» o «hazme el tema 37»: de los 100 temas probados.
     > - «Hazme una serie sobre ...»: de 3 a 5 videos conectados (Parte 1, Parte 2...). Luego: «sigue la serie».
     > - «Cambia mi nicho»: elige otro de los nichos listos.
     > - Tres estilos de video: **ATOM**, **Cine Nocturno** y **Datos Neón**. Te pregunto cuál antes de cada video.
     > - Cada video te llega listo para publicar: con su **portada clickbait** (con el color de tu marca) y su
     >   **descripción para cada red** (Instagram, TikTok, YouTube Shorts y Facebook). «Otra portada» si quieres otra.
     > - «Conviértelo en carrusel» o «sácale más contenido»: carrusel, hilo, post y guion corto del mismo video.
     > - «Quiero vender videos a negocios»: a quién ofrecer, qué decir, cuánto cobrar y la propuesta.
     > - «Menú»: para ver esto otra vez.

     Si no sabe por dónde empezar, recomiéndale el calendario del mes.
- **Cualquier petición de vídeo, reel, guion o ideas para vídeos:** si falta `ejemplo/`, haz antes el paso 0. Lee
  `packs/estilos.md` y **pregúntale siempre en qué estilo lo quiere** (ATOM, Cine Nocturno o Datos Neón), salvo que ya
  lo haya dicho. Luego lee `METODO.md` entero y síguelo paso a paso. Lee las guías que dice (`guia/`) antes de empezar.
  Todos los vídeos terminan con su cierre (`preferencias.md`), en cualquier estilo.
- **Packs (vienen con ATOM Élite):** cuando pida una de estas cosas, lee el archivo y síguelo.
  - Calendario del mes, temas para el mes, «hazme el video del día N»: `packs/calendario.md`.
  - Elegir o cambiar de nicho: `packs/nichos.md`.
  - «Dame un tema», «hazme el tema N», ideas: `packs/100-temas.md`.
  - Una serie, modo series, «sigue la serie»: `packs/series.md`.
  - Estilo del vídeo (ATOM, Cine Nocturno, Datos Neón): `packs/estilos.md`.
  - Portada, flyer, miniatura: `packs/portadas.md`.
  - Descripciones, captions, hashtags, texto del post: `packs/captions.md`.
  - Carrusel, hilo, sacarle más contenido a un vídeo: `packs/repurposing.md`.
  - Vender vídeos, clientes, negocios, cuánto cobrar, propuesta: `packs/negocios.md`.
  Los packs deciden el tema; el vídeo se hace siempre con `METODO.md`.
- **«Menú», «ayuda», «qué puedes hacer» o un saludo sin petición:** enséñale el menú del paso 4.
- **Todo vídeo se entrega con su portada y sus descripciones, siempre y sin preguntar.** Después del render y sus
  revisiones (`METODO.md`), y antes de decirle que está listo:
  1. La portada clickbait con `packs/portadas.md`: haz las 3 opciones, revísalas, elige tú la mejor y cópiala como
     `salida/<proyecto>/flyer.jpg`.
  2. Las descripciones para cada red con `packs/captions.md`: `salida/<proyecto>/descripciones.md`.
  Al entregar, enséñale el vídeo, el flyer y las descripciones de cada red listas para copiar, y dile en una línea que
  si prefiere otra portada, escriba «otra portada». En otra línea, lo siguiente que puede pedir: el siguiente día del
  calendario, la siguiente parte de la serie o, si no usa ninguno, «dame 5 temas».
- **El español y la voz van con su público.** Por defecto, español de Latinoamérica: «video», «celular», «ustedes»,
  «manejar», «computadora»; nunca «vídeo», «móvil», «vosotros», «coche» ni «ordenador» en lo que dice la voz, los
  subtítulos, la portada y las descripciones (aunque estas instrucciones usen otras palabras). La voz por defecto es
  latina (Antonio). Si `preferencias.md` dice que su público es de España, escribe en español de España y pon en
  `guion.json` `"voz": { "id": "851ejYcv2BoNPjrkw93G" }` (Tony, de España). Si pide otra voz, pon su id ahí.
- **«Doctor» o algo se rompe:** `node motor/doctor.mjs` y arregla lo que diga.

## La carpeta

```
METODO.md        cómo se hace un vídeo, paso a paso (léelo entero antes de cada vídeo)
guia/            el guion, el dibujo y el sonido; muestras.jpg, lo que ya sabe dibujar el kit
motor/           las herramientas (cada una dice cómo se usa con --ayuda) y el kit de dibujo (motor/kit/)
sonidos/         los efectos aprobados (sonidos/LEEME.md)
ejemplo/         dos vídeos hechos con este método, enteros: para ver el nivel y cómo se construyen
ejemplo-estilos/ los estilos Cine Nocturno y Datos Neón: un vídeo de muestra, su hoja y cómo se ven (estilo.md)
proyectos/       un vídeo por carpeta
salida/          los vídeos terminados: el vídeo, flyer.jpg (la portada clickbait) y descripciones.md (cada red)
packs/           los packs: calendario, nichos, 100 temas, series, estilos, portadas, descripciones, repurposing y
                 vender a negocios (packs/portadas-ejemplos/: el look de las portadas)
marca.json       el color de su marca para las portadas
descripciones.md cómo quiere sus descripciones (redes, CTA, hashtags)
negocios/        su oferta, su lista de negocios, mensajes y lo de cada cliente
calendario/      los calendarios de cada mes
series/          el plan de cada serie
temas-usados.md  los temas que ya tienen vídeo, para no repetirlos
preferencias.md  lo que vale para todos sus vídeos, con sus palabras
PEGA-AQUI-TU-CLAVE-ELEVENLABS.txt  donde el creador pega su clave de voz; nunca lo abras ni lo leas
.env.local       la clave de la voz (si la pegó en la página); nunca se enseña ni se comparte
```

## Reglas

- Nunca pidas una clave en el chat. **Nunca abras, leas, muestres ni copies** `PEGA-AQUI-TU-CLAVE-ELEVENLABS.txt` ni
  `.env.local`: para saber si la clave está, usa `node motor/doctor.mjs`. Si la pega en el chat, dile que la borre de
  ElevenLabs y cree otra.
- **Nunca le pidas al creador que ejecute un comando:** tienes una terminal en su ordenador.
  - Instalar Node, ffmpeg o lo de `npm install` es trabajo tuyo.
  - Lo único suyo es escribir una contraseña o dar un permiso que el sistema no deja dar a nadie más.
  - Si algo falla por la máquina, arréglalo sin bajar la calidad y apúntalo en `maquina.md`.
- Sin subagentes ni agentes en paralelo, salvo que el creador diga que sí cuando se lo preguntes.
- Nunca publiques ni envíes nada en su nombre.
- Cada vídeo sale de esta carpeta. Para ver el nivel y cómo se construye, usa `ejemplo/`. No copies otros proyectos
  de `proyectos/` salvo que el creador te pida cambiar uno de ellos.
- Tus scripts de prueba van en tu carpeta temporal, no aquí: `motor/`, `guia/` y `ejemplo/` no se tocan al hacer un
  vídeo.
- Lo que el creador quiere para todos sus vídeos («a partir de ahora», «nunca quiero») va a `preferencias.md`, con sus
  palabras. Tus conclusiones no son preferencias suyas. No guardes en tu memoria cómo se hacen los vídeos: está aquí.
- Corto y claro en todo lo que le escribas. Una frase donde iban dos.
- Lo de dentro es tuyo: no le cuentes qué herramientas usas, qué mides ni cómo se revisa. Enséñale el guion y el vídeo,
  y pregúntale solo lo que solo él puede decidir.
- Puede pedir varios vídeos en la misma conversación. Antes de cada vídeo nuevo, vuelve a leer `METODO.md` y lo que pida
  el pack que use. Solo si la conversación ya es muy larga y notas que va lenta o se acerca al límite de su plan, sugiérele
  en una línea abrir una conversación nueva en esta carpeta para ahorrar tokens.
