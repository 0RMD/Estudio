# Pack Repurposing: un video, cinco publicaciones

Se usa cuando el creador dice algo como «reutiliza este video», «repurposing», «hazme el carrusel», «sácale más
contenido», «el hilo», «versión para LinkedIn».

De un vídeo ya terminado (en `salida/`) salen piezas para otros formatos, sin volver a hacer el vídeo. Pregunta cuáles
quiere (por defecto, todas) y sus redes si no están en `preferencias.md`.

## Lo que sale

Todo en `salida/<proyecto>/repurposing/` (y el carrusel en `salida/<proyecto>/carrusel/`):

1. **Carrusel de Instagram o LinkedIn** (1080 × 1350, de 5 a 9 diapositivas).
   - Escribe `<proyecto>/carrusel.json` (formato: `node motor/carrusel.mjs --ayuda`):
     - **portada:** el gancho del vídeo como título, con la palabra clave marcada, sobre su mejor fotograma;
     - **diapos:** una idea por diapositiva, en el orden del vídeo, con su fotograma (el vídeo se dibuja sin
       subtítulos); *entre asteriscos* lo que va en color; frases cortas, como mucho 20 palabras;
     - **cierre:** el CTA del creador («Guárdalo y envíaselo a...»).
   - `node motor/carrusel.mjs <proyecto>` y mira `carrusel/todas.jpg`: cada diapositiva se entiende sola, el texto no
     tapa lo importante y la historia engancha desde la portada.
   - Con Cine Nocturno o Datos Neón, `--acento` del estilo (como en `packs/portadas.md`).
2. **Texto del carrusel** (`carrusel.md`): la descripción con su gancho, como en `packs/captions.md`, y «Desliza →».
3. **Hilo para X y Threads** (`hilo.md`): de 5 a 8 publicaciones. La primera es el gancho y promete el final; cada una,
   una idea con un dato del vídeo; la última, el remate y el CTA. Cada publicación, como mucho 280 caracteres.
4. **Publicación de LinkedIn o Facebook** (`publicacion.md`): una historia de 120 a 200 palabras. La primera línea
   engancha sola; párrafos de una o dos líneas; una lección o reflexión al final y una pregunta para comentar.
5. **Guion corto de 15 segundos** (`guion-15s.md`): el hook y el dato más fuerte del vídeo para hacer un segundo vídeo
   más corto (una versión «parte 2» o un teaser). Si lo quiere hacer, se hace con `METODO.md` como cualquier vídeo.
6. **Ideas derivadas** (`ideas.md`): 3 vídeos nuevos que salen de este (una pregunta que dejó abierta, un dato que no
   cupo, el mito contrario), listos para pedírselos a ATOM.

## Reglas

- Solo datos del vídeo y de sus fuentes (`idea.md`). Nada inventado.
- En su idioma, su tono y su cantidad de emojis (`preferencias.md`).
- Cada pieza tiene su propio gancho al principio: nadie ha visto el vídeo.

## Entregar

Enséñale `carrusel/todas.jpg` y pega en el chat los textos, por pieza, para copiar directo. Una línea final con dónde
quedó cada archivo.
