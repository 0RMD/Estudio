// Diseño sonoro sincronizado a cada acción física de MITOS DE TU CELULAR · EP. 3
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

  // ---------------- Plano 01 (0.00 - 6.04 s): Papelera vaciada + Rayos X del chip NAND ----------------
  pon("clic", 0.14, { db: -13, que: "se posa la insignia MITOS DE TU CELULAR · EP. 3" });
  pon("aire", f1.t("borras") + 0.12, { ancla: "empieza", db: -14, vel: 0.92, que: "entra el dedo hacia el botón Vaciar papelera" });
  pon("clic", f1.t("foto") + 0.35, { db: -14, que: "selección de la foto en galería" });
  pon("toque", f1.t("vacías") + 0.04, { db: -9.5, que: "el dedo pulsa Vaciar papelera" });
  pon("papel", f1.t("papelera") + 0.04, { db: -12, vel: 1.08, que: "la foto cae y desaparece de la pantalla" });
  pon("desliza", f1.t("sigue") + 0.04, { db: -11, que: "se abre la ventana de rayos X sobre el chip NAND" });
  pon("late", f1.t("chip") + 0.04, { db: -10, corta: f2.inicio - 0.14, que: "late encendida la foto intacta dentro del chip" });

  // ---------------- Plano 02 (6.04 - 10.72 s): Estrato Galería vacía vs. Píxeles vivos abajo ----------------
  pon("desliza", f2.t("Desaparece") + 0.12, { db: -13, que: "entran los dos estratos de cristal y silicio" });
  pon("aire", f2.t("galería") + 0.06, { ancla: "empieza", db: -13, vel: 1.05, que: "se esfuma la miniatura de la capa superior" });
  pon("clic", f2.t("instante") + 0.04, { db: -13, que: "queda el marco punteado 0 FOTOS VISIBLES" });
  pon("sube", f2.t("píxeles") + 0.04, { db: -11, vel: 0.96, que: "se ilumina la matriz de píxeles RGB abajo" });
  pon("pitido", f2.t("guardados") + 0.08, { db: -13, lp: 4800, corta: f3.inicio - 0.14, que: "destellos recorriendo los bloques guardados" });

  // ---------------- Plano 03 (10.72 - 20.52 s): Desgaste eléctrico de celdas + Tachado de dirección ----------------
  pon("aire", f3.t("memoria") + 0.08, { ancla: "empieza", db: -14, vel: 0.88, que: "encuadre macro dentro del chip NAND" });
  pon("estallido", f3.t("desgasta") + 0.04, { db: -10, vel: 1.4, lp: 2600, que: "descarga eléctrica golpea las celdas de silicio" });
  pon("cruje", f3.t("borra") + 0.12, { db: -12, vel: 1.15, que: "se agrieta el óxido y baja la barra de vida útil" });
  pon("estallido", f3.t("electricidad") + 0.04, { db: -10.5, vel: 1.45, lp: 2700, que: "segundo arco de borrado eléctrico" });
  pon("late", f3.t("momento") + 0.18, { db: -14, que: "pulso de advertencia de desgaste" });
  pon("aire", f4.t("sistema") - 0.08, { ancla: "empieza", db: -13, vel: 0.84, que: "la cámara sube a la Tabla de Direcciones" });
  pon("desliza", f4.t("tacha") + 0.04, { db: -10.5, vel: 1.12, que: "trazo rojo tacha la dirección 0x4F2A -> IMG_2048" });
  pon("clic", f4.t("marca") + 0.06, { db: -11, que: "se estampa el sello verde ESPACIO LIBRE" });
  pon("timbre", f4.t("libre") - 0.06, { db: -12, lp: 5000, corta: f5.inicio - 0.14, que: "queda marcado libre mientras las celdas siguen intactas" });

  // ---------------- Plano 04 (20.52 - 25.44 s): Libro abierto: renglón arrancado vs. página intacta ----------------
  pon("madera", f5.t("como") + 0.02, { db: -12, que: "reposa el libro abierto de tapa dura sobre la mesa" });
  pon("papel", f5.t("arrancar") + 0.08, { db: -9.5, vel: 0.96, que: "se arranca la tira de papel del renglón 3 del índice" });
  pon("aire", f5.t("libro") + 0.06, { ancla: "empieza", db: -13, vel: 0.85, que: "la cámara viaja del índice a la Página 24" });
  pon("timbre", f5.t("foto") + 0.04, { db: -11.5, lp: 5200, que: "reluce la fotografía impresa intacta en la Página 24" });
  pon("clic", f5.t("intacta") + 0.06, { db: -12, corta: f6.inicio - 0.14, que: "sello verde PÁGINA Y FOTO INTACTAS" });

  // ---------------- Plano 05 (25.44 - 29.96 s): Fotos y videos nuevos escribiendo encima ----------------
  pon("late", f6.t("imagen") + 0.06, { db: -13, que: "la foto antigua aguarda en el sector 0x4F2A" });
  pon("tic", f6.t("hasta") + 0.06, { db: -14, que: "sector listo para recibir datos nuevos" });
  pon("golpe", f6.t("fotos") + 0.06, { db: -10, vel: 1.06, que: "cae FOTO NUEVA 1 pisando el primer tercio" });
  pon("golpe", f6.t("videos") + 0.06, { db: -10, vel: 1.0, que: "cae FOTO NUEVA 2 pisando el segundo tercio" });
  pon("golpe-hondo", f6.t("escriben") + 0.12, { db: -9.5, corta: f7.inicio - 0.14, que: "cae VIDEO 4K NUEVO sobrescribiendo toda la foto" });

  // ---------------- Plano 06 (29.96 - 35.68 s): Escáner forense recuperando fotos ocultas ----------------
  pon("desliza", f7.t("memorias") + 0.06, { db: -13, que: "entra la memoria sin cifrar al banco de escaneo" });
  pon("sube", f7.t("cifrar") + 0.18, { db: -12, vel: 0.86, que: "arranca el barrido láser rojo de recuperación" });
  pon("pitido", f7.t("celulares") + 0.22, { db: -11.5, lp: 4600, que: "el láser levanta y recupera la primera foto oculta" });
  pon("pitido", f7.t("programa") + 0.08, { db: -11, vel: 1.05, lp: 4800, que: "el láser levanta la segunda foto oculta" });
  pon("aviso", f7.t("recupera") + 0.45, { db: -10, corta: f8.inicio - 0.14, que: "el láser recupera la tercera foto con alerta roja" });

  // ---------------- Plano 07 (35.68 - 40.68 s): Celular en venta · no borrar una por una ----------------
  pon("cuadro", f8.t("eso") + 0.04, { db: -12, que: "entra el celular con etiqueta $ EN VENTA" });
  pon("toque", f8.t("vender") + 0.04, { db: -10.5, que: "primer toque intentando borrar foto a mano" });
  pon("papel", f8.t("celular") + 0.04, { db: -13, que: "se vacía arriba pero el chip rojo sigue encendido" });
  pon("toque", f8.t("borres") - 0.04, { db: -10.5, que: "segundo toque inútil en la papelera" });
  pon("aviso", f8.t("fotos") + 0.04, { db: -9.5, corta: f9.inicio - 0.14, que: "sello rojo NO BORRES UNA POR UNA" });

  // ---------------- Plano 08 (40.68 - 47.32 s): Ajustes > Restablecer de fábrica destruye la llave ----------------
  pon("desliza", f9.t("Ajustes") - 0.08, { db: -12, que: "entran las tarjetas de Ajustes y bóveda AES" });
  pon("aire", f9.t("usa") - 0.04, { ancla: "empieza", db: -14, vel: 0.95, que: "se acerca el dedo al botón Restablecer de fábrica" });
  pon("toque", f9.t("Restablecer") + 0.12, { db: -9, que: "el dedo pulsa Restablecer de fábrica" });
  pon("clic", f9.t("fábrica") + 0.12, { db: -11, que: "confirmación verde Restablecido de fábrica" });
  pon("cristal", f9.t("destruye") + 0.06, { db: -9, vel: 1.05, que: "la llave dorada secreta estalla en fragmentos" });
  pon("metal", f9.t("bloquea") + 0.04, { db: -10, vel: 1.08, que: "el chip entero se sella en nieve cifrada" });
  pon("timbre", f9.t("chip") - 0.04, { db: -12, lp: 5200, corta: f10.inicio - 0.14, que: "sello verde IRRECUPERABLE" });

  // ---------------- Plano 09 (47.32 - 57.52 s): Compartir al amigo + Gancho EP. 4 + Loop ----------------
  pon("sube", f10.t("Envíaselo") + 0.12, { db: -11, vel: 1.05, que: "entra emblema de avión de papel para compartir" });
  pon("clic", f10.t("amigo") + 0.14, { db: -12, que: "ondas azules de enviar al amigo" });
  pon("aire", f10.t("vender") + 0.25, { ancla: "empieza", db: -14, vel: 0.88, que: "retroceso suave de cámara hacia encuadre general" });
  pon("tic", f10.t("viejo") + 0.1, { db: -14, que: "cierra rayos X preparando el anuncio" });
  pon("golpe", f11.t("mañana") + 0.12, { db: -10, que: "entra la insignia MAÑANA · EP. 4" });
  pon("clic", f11.t("cuatro") + 0.18, { db: -12, que: "subtítulo EL ENGAÑO DE LOS 200 MEGAPÍXELES" });
  pon("enganche", f11.t("cámaras") + 0.06, { db: -11, que: "entra el anillo óptico del lente nocturno 200 MP" });
  pon("cristal", f11.t("megapíxeles") + 0.06, { db: -12, vel: 1.15, que: "destello dorado en el cristal del lente 200 MP" });
  pon("late", f11.t("noche") + 0.12, { db: -13, que: "pulso nocturno del sensor" });
  pon("aire", 56.9, { ancla: "empieza", db: -14, vel: 0.9, corta: 57.44, que: "se pliega la insignia cerrando el loop al Fotograma 0" });

  return e;
}
