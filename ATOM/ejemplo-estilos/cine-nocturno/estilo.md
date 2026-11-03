# Cine Nocturno

Un documental de noche. Un mundo 3D oscuro y cálido donde la luz cuenta la historia: lo que importa aparece dentro de
un charco de luz ámbar, como bajo una farola o el faro de un coche. Calmado, íntimo, con misterio. Ideal para
historias, casos reales, psicología, hábitos y «¿te ha pasado que...?».

Ejemplo: `cine-nocturno.mp4` (67 s), sobre por qué a veces llegas a casa conduciendo sin recordar el camino.
Mira `hoja.jpg` (un fotograma cada 3 s) y `fotogramas/`.

**El ejemplo está recortado al final a propósito.** Se quitó su cierre original. Tus vídeos siempre terminan con el
cierre del creador (`preferencias.md`), con su remate y un reposo final: nunca de golpe.

## La paleta (`k.CINE`)

- Fondo casi negro y cálido (#0B0A0D), con niebla marrón (#17120F → #21170F) y profundidad: `k.nocheCine(g)`.
- La luz: ámbar (#F2A65A) y naranja (#E8833A), siempre cálida, en charcos: `k.luzCalida(g, x, y, radio)`.
- Un protagonista rojo (#C9372C): el coche del ejemplo. Un solo objeto con color fuerte por escena.
- Lo de casa, crema (#F1ECE8): papel, documentos, el cuaderno, la pantalla del celular.
- El entorno, frío y apagado: pinos verde azulado (#2F6F6A), asfalto gris pardo.
- Nada saturado fuera de la luz. Nada de neón.

## Cómo se ve

- **Modelos 3D sencillos y limpios** (estilo maqueta, pocas caras, sin texturas recargadas), con sombra suave y el
  borde iluminado por la luz cálida.
- **La cámara:** cenital o tres cuartos (desde arriba y en diagonal), lejos y luego cerca. Sigue al protagonista,
  baja hacia el objeto que se nombra, gira despacio alrededor. Nunca tiembla ni corre.
- **Rayos X o fantasma:** para enseñar lo que no se ve (quién conduce, qué pasa por dentro), el objeto se vuelve
  translúcido y aparece un icono pequeño («?», un círculo).
- **Objetos de la vida diaria** sobre una mesa oscura de cuero o madera, iluminados desde arriba: un cuaderno con
  líneas resaltadas en naranja, un celular con su interfaz oscura y botones naranjas, un documento antiguo, un zapato
  en un círculo, un volante, un reloj.
- **Las cifras y los años, grandes y blancos,** solos en el centro («1963», «2011», «1/2»), con un rótulo pequeño
  encima en una píldora oscura: `k.rotuloCine(g, x, y, "se llama", "1963")`.
- **Pequeñas interfaces dibujadas** (un contador «0 min», un indicador de esfuerzo, «vuelta 3», «semana 4») en líneas
  finas y naranja.
- **Al final de cada escena:** `k.vineta(g, 0.65)` y `k.grano(g, t, 0.07)`: la viñeta centra la mirada y el grano da
  el aire de cine.

## El ritmo

- Pausado y continuo: la misma noche, el mismo mundo, de una idea a la siguiente casi siempre moviendo la cámara, no
  cortando.
- Cada idea nueva trae un objeto nuevo a la luz; lo anterior se queda en la sombra.
- Los subtítulos, como en todo ATOM (arriba, la palabra clave marcada).

## Qué evitar

- Escenas planas o de día. Colores chillones. Más de un objeto rojo a la vez.
- Copiar las escenas del ejemplo (la carretera, el coche, el cuaderno): se copian la luz, la paleta, la cámara y el
  ritmo, con las cosas de tu tema.
