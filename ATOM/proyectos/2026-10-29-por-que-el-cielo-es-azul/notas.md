# Por qué el cielo es azul: cómo se hizo

Vídeo en estilo **Cine Nocturno** (`packs/estilos.md`, `ejemplo-estilos/cine-nocturno/estilo.md`): paleta cálida y oscura (`k.nocheCine`), charcos de luz ámbar (`k.luzCalida`), protagonista rojo (`#C9372C`: el coche en la carretera, el telescopio en la apertura B y la linterna en el experimento casero), documentos en papel crema (el estudio de 1871 de Lord Rayleigh) y rótulos de documental (`k.rotuloCine`), con viñeta y grano en todos los planos.

## Revisiones y mejoras hechas

1. **El primer segundo del hook (fotograma 0):**
   - En la primera prueba, tanto la bóveda celeste (`01-cielo.js`) como el haz sobre la cúpula (`01-cupula.js`) arrancaban de cero y el fotograma 0 salía oscuro.
   - Se corrigió para que desde el fotograma 0 la bóveda azul y el haz ya estén encendidos a plena potencia y en movimiento, además de suavizar el origen de los rayos arriba con un velo oscuro para que el subtítulo se lea limpio.
2. **Transición al espacio en la apertura B (`01-cupula.js`):**
   - Al principio la cúpula quedaba flotando a media altura en «sales al espacio». Se ajustó para que suba hasta salir de escena mientras el fondo pasa al vacío estrellado, dejando claro el contraste con el cielo negro sin aire.
3. **El sonido (`sonidos.js`) y continuidad en los cortes:**
   - Se añadieron los efectos de transición en 43.8 s, 44.7 s, 48.2 s y 63.1 s para eliminar todos los huecos de más de 2 s sin tocar ningún corte.
   - Se ajustó la curva de frenado de fase antes de los cortes (31.6 s y 43.9 s) para que sea continua en posición y velocidad, eliminando cualquier salto suelto fuera de los cortes.
