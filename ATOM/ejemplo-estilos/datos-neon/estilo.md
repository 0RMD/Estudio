# Datos Neón

Una infografía animada de noche. Un panel de datos oscuro donde los gráficos se dibujan solos mientras habla la voz:
dos opciones compiten, una en verde y otra en magenta, y las cifras aparecen justo cuando se dicen. Claro, preciso y
adictivo. Ideal para dinero, comparaciones, velocidades, tiempos, «¿qué conviene más?» y todo lo que se entiende mejor
con un gráfico.

Ejemplo: `datos-neon.mp4` (123 s), sobre cuánto tiempo ahorras de verdad yendo más rápido.
Mira `hoja.jpg` (un fotograma cada 3 s) y `fotogramas/`.

**El ejemplo está recortado al final a propósito.** Se quitó su cierre original. Tus vídeos siempre terminan con el
cierre del creador (`preferencias.md`), con su remate y un reposo final: nunca de golpe.

## La paleta (`k.NEON`)

- Fondo azul casi negro (#0C0F16), plano y limpio. Paneles un poco más claros (#121821) con borde fino gris (#2A313B).
- **Verde neón (#22E39B):** la opción A, lo que gana, lo que sube.
- **Magenta (#FF2E88):** la opción B, lo que cuesta, lo que pierde.
- **Ámbar (#F5B83D):** lo que se señala (una ruta, un tramo, un momento).
- Texto claro (#E6EDF5) y gris (#5B6573) para lo secundario.
- Todo lo de color brilla (halo suave): `k.lineaNeon`, `k.barraNeon`, `k.chipNeon`.

## Cómo se ve

- **2D, plano, como un panel de control.** Nada de 3D ni texturas. Rejilla fina de fondo: `k.rejilla`.
- **Letra monoespaciada** (JetBrains Mono, incluida) para cifras, ejes y rótulos: `k.textoMono`. Títulos de panel
  pequeños y grises arriba («¿Qué ahorra más?», «Un solo kilómetro»).
- **Lo que se usa:**
  - carreras de barras horizontales (cada fila, una opción, con su tiempo que corre);
  - gráficos de barras que crecen y se convierten en una curva (`k.lineaNeon` con `progreso`);
  - dos curvas que se cruzan, con un punto brillante en el cruce;
  - velocímetros y relojes de aguja;
  - un mapa visto desde arriba con una ruta que se ilumina en ámbar y destellos en los destinos;
  - una carretera vista desde arriba con dos coches (verde y magenta) y su velocidad en una etiqueta;
  - etiquetas con borde de color para el dato clave («-5 min», «71 km/h», «t = d / v»): `k.chipNeon`.
- **Cada cifra aparece cuando la voz la dice** y se queda quieta medio segundo. Las barras y las curvas se dibujan
  mientras se explican, no antes.

## El ritmo

- Constante y explicativo: el gráfico se construye paso a paso con la voz.
- La cámara casi no se mueve; lo que cambia es el panel (se transforma, se desliza, se divide en dos). Un panel nuevo
  para cada idea nueva.
- Un punto brillante o un destello marca el momento clave (el cruce, la meta, el resultado).

## Qué evitar

- Más de tres colores de dato a la vez. Gráficos quietos. Cifras sin unidad.
- Texto largo dentro del panel: lo dice la voz; en pantalla, solo números y rótulos cortos.
- Copiar los gráficos del ejemplo (velocidades, kilómetros): se copian la paleta, las piezas y el ritmo, con los datos
  de tu tema.
