// Diseño sonoro sincronizado a cada acción física de MITOS DE TU CELULAR · EP. 4
// Todos los tiempos nacen de `v.frase(n).t(...)`, lejos de los cortes y sin huecos > 2 s.
export default function sonidos(v) {
  const e = [];
  const pon = (sonido, t, o = {}) => e.push({ sonido, t, ...o });

  const f1 = v.frase(1);
  const f2 = v.frase(2);
  const f3 = v.frase(3);
  const f4 = v.frase(4);
  const f5 = v.frase(5);
  const f6 = v.frase(6);
  const f7 = v.frase(7);
  const f8 = v.frase(8);
  const f9 = v.frase(9);
  const f10 = v.frase(10);
  const f11 = v.frase(11);

  // ---------------- Plano 01 (0.00 - 6.36 s): Duelo nocturno 200 MP vs. 48 MP ----------------
  pon("clic", 0.14, { db: -13, que: "se posa la insignia MITOS DE TU CELULAR · EP. 4" });
  pon("aire", f1.t("celular") + 0.12, { ancla: "empieza", db: -14, vel: 0.9, que: "se encuadran los dos celulares de noche" });
  pon("pitido", f1.t("200") + 0.08, { db: -13, lp: 5000, que: "brilla la etiqueta dorada 200 MP" });
  pon("clic", f1.t("peores") - 0.04, { db: -9, vel: 1.12, que: "disparo del obturador nocturno en ambos celulares" });
  pon("cruje", f1.t("fotos") + 0.08, { db: -12, vel: 1.25, que: "brota ruido y grano oscuro en la foto de 200 MP" });
  pon("timbre", f1.t("48") + 0.04, { db: -10.5, lp: 5200, corta: f2.inicio - 0.14, que: "brilla clara y nítida la foto nocturna de 48 MP" });

  // ---------------- Plano 02 (6.36 - 11.40 s): Caja gigante 200 MP vs. sensor diminuto ----------------
  pon("cuadro", f2.t("marcas") + 0.04, { db: -11.5, que: "entra la caja comercial gigante ULTRA 200 MP" });
  pon("lingote", f2.t("gigante") + 0.04, { db: -11, vel: 1.05, que: "destello dorado en el número gigante 200" });
  pon("desliza", f2.t("pero") + 0.06, { db: -11, vel: 0.96, que: "la caja se aparta a la izquierda" });
  pon("clic", f2.t("tamaño") + 0.06, { db: -12, que: "aparecen las cotas milimétricas de 7 mm" });
  pon("pitido", f2.t("sensor") + 0.04, { db: -11.5, lp: 4800, corta: f3.inicio - 0.14, que: "se señala el sensor diminuto real" });

  // ---------------- Plano 03 (11.40 - 21.80 s): Subdivisión en micro-píxeles + Lluvia de sol ----------------
  pon("aire", f3.t("sensor") + 0.06, { ancla: "empieza", db: -14, vel: 0.88, que: "acercamiento macro a la oblea del sensor CMOS" });
  pon("tic", f3.t("pequeño") + 0.06, { db: -13, que: "referencia del marco pequeño del sensor" });
  pon("desliza", f3.t("200") + 0.04, { db: -11.5, vel: 1.15, que: "primera subdivisión láser de la malla de píxeles" });
  pon("desliza", f3.t("píxeles") + 0.04, { db: -11, vel: 1.28, que: "segunda subdivisión dejando micro-celdas de 0.56 µm" });
  pon("aprieta", f3.t("diminutos") + 0.04, { db: -11.5, que: "las celdas quedan apretadísimas y diminutas" });
  pon("sube", f4.t("sol") - 0.08, { db: -10.5, vel: 0.94, que: "se enciende el sol radiante arriba en la cámara óptica" });
  pon("cristal", f4.t("luz") + 0.06, { db: -11.5, vel: 1.15, que: "lluvia de fotones dorados llena cada micro-celda" });
  pon("tic", f4.t("puntito") + 0.08, { db: -13, vel: 1.18, que: "cada puntito carga señal luminosa completa" });
  pon("desliza", f4.t("foto") - 0.04, { db: -11.5, que: "entra la fotografía diurna al costado derecho" });
  pon("timbre", f4.t("detalle") - 0.04, { db: -11, lp: 5200, corta: f5.inicio - 0.14, que: "confirmación PLENO SOL: NITIDEZ TOTAL" });

  // ---------------- Plano 04 (21.80 - 27.32 s): De noche falta luz y brota ruido RGB ----------------
  pon("hueco", f5.t("noche") + 0.04, { db: -11.5, que: "cae la oscuridad en el banco de pruebas nocturno" });
  pon("tic", f5.t("luz") + 0.08, { db: -13, vel: 0.88, que: "caen apenas 4 fotones solitarios" });
  pon("pitido", f5.t("minúsculo") + 0.08, { db: -12.5, lp: 4200, que: "marca alerta roja 4 % LUZ por píxel" });
  pon("cruje", f5.t("atrapa") + 0.12, { db: -11.5, vel: 1.2, que: "chisporrotea ganancia eléctrica en las celdas vacías" });
  pon("aviso", f5.t("ruido") - 0.06, { db: -9.5, corta: f6.inicio - 0.14, que: "el monitor nocturno se llena de grano y ruido RGB" });

  // ---------------- Plano 05 (27.32 - 32.84 s): Llovizna nocturna: 200 dedales vs. 12 baldes anchos ----------------
  pon("aire", f6.t("salir") + 0.04, { ancla: "empieza", db: -13, vel: 0.8, que: "ambiente de llovizna nocturna en el patio" });
  pon("tic", f6.t("llovizna") + 0.18, { db: -13.5, vel: 1.2, que: "gotas finas cayendo sobre la mesa de madera" });
  pon("metal", f6.t("dedales") + 0.04, { db: -11.5, vel: 1.3, que: "tintineo metálico en los 200 dedales casi secos" });
  pon("aire", f6.t("vez") + 0.04, { ancla: "empieza", db: -13, vel: 0.88, que: "paneo hacia los baldes metálicos anchos" });
  pon("sube", f6.t("baldes") + 0.04, { db: -10.5, vel: 0.92, corta: f7.inicio - 0.14, que: "los baldes anchos se llenan de agua azul brillante" });

  // ---------------- Plano 06 (32.84 - 39.32 s): Fusión 16 en 1 (Pixel Binning a 12 MP) ----------------
  pon("desliza", f7.t("noche") + 0.04, { db: -12.5, que: "entra el sensor con contador de 200 MP" });
  pon("tic", f7.t("celular") + 0.06, { db: -13.5, que: "se enmarca el bloque central de 4x4 (16 píxeles)" });
  pon("enganche", f7.t("une") + 0.04, { db: -9.5, vel: 0.96, que: "se derriban los tabiques y 16 píxeles se unen en 1" });
  pon("sube", f7.t("uno") - 0.04, { db: -11, vel: 1.05, que: "los super-píxeles se iluminan en dorado intenso" });
  pon("clic", f7.t("dispara") + 0.06, { db: -11, que: "disparo en modo noche automático" });
  pon("timbre", f7.t("12") + 0.04, { db: -10.5, lp: 5200, corta: f8.inicio - 0.14, que: "el contador marca 12 MP REALES" });

  // ---------------- Plano 07 (39.32 - 45.16 s): Sensor físico más grande de 1 pulgada ----------------
  pon("aire", f8.t("mejora") + 0.06, { ancla: "empieza", db: -13.5, vel: 0.85, que: "banco óptico comparando ambos sensores" });
  pon("hueco", f8.t("no") + 0.04, { db: -12, que: "cono estrecho y pobre en el sensor chico" });
  pon("clic", f8.t("megapíxeles") + 0.12, { db: -13, que: "marca X sobre el sensor pequeño" });
  pon("sube", f8.t("sensor") + 0.04, { db: -10.5, vel: 0.88, que: "gran cono dorado baña el sensor físico grande" });
  pon("lingote", f8.t("grande") - 0.04, { db: -10, corta: f9.inicio - 0.14, que: "brilla el sensor de 1 pulgada con +300 % luz" });

  // ---------------- Plano 08 (45.16 - 50.68 s): Guía al elegir celular ----------------
  pon("desliza", f9.t("elegir") + 0.04, { db: -12, que: "entra Tarjeta 1: Tamaño del sensor (1/1.3″ o 1″)" });
  pon("timbre", f9.t("tamaño") + 0.08, { db: -11, lp: 5200, que: "sube la barra verde de luz real nocturna" });
  pon("clic", f9.t("sensor") + 0.08, { db: -12.5, que: "sello LO QUE SÍ DEBES BUSCAR" });
  pon("desliza", f9.t("pagar") - 0.12, { db: -12, vel: 1.04, que: "entra Tarjeta 2: Trampa de marketing" });
  pon("golpe", f9.t("megapíxeles") - 0.08, { db: -10, corta: f10.inicio - 0.14, que: "trazo rojo tacha 200 MP en sensor pequeño" });

  // ---------------- Plano 09 (50.68 - 61.04 s): Compartir + Serie Completa EP. 1–4 + Loop ----------------
  pon("sube", f10.t("Envíaselo") + 0.12, { db: -11, vel: 1.05, que: "entra emblema de avión de papel para compartir" });
  pon("clic", f10.t("amigo") + 0.14, { db: -12, que: "ondas azules de enviar al amigo" });
  pon("aire", f10.t("mirando") + 0.08, { ancla: "empieza", db: -14, vel: 0.88, que: "retroceso suave de cámara hacia encuadre general" });
  pon("tic", f10.t("megapíxeles") + 0.12, { db: -13.5, que: "pulso en la etiqueta 200 MP" });
  pon("clic", f10.t("caja") + 0.12, { db: -13.5, que: "transición hacia el cierre de temporada" });
  pon("golpe", f11.t("perfil") - 0.04, { db: -9.5, que: "entra la insignia SERIE COMPLETA EN MI PERFIL · EP. 1–4" });
  pon("desliza", f11.t("cuatro") + 0.04, { db: -11, que: "despliega la barra con los 4 episodios de la serie" });
  pon("timbre", f11.t("Mitos") + 0.06, { db: -11.5, lp: 5200, que: "brillo final en las 4 cápsulas de Mitos de tu Celular" });
  pon("aire", 60.4, { ancla: "empieza", db: -14, vel: 0.9, corta: 60.96, que: "se pliega la insignia cerrando el loop al Fotograma 0" });

  return e;
}
