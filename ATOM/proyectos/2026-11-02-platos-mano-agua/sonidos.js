export default (v) => [
  { t: 0.08, sonido: "aire", db: -5 },
  { t: v.frase(1).t("platos"), sonido: "cristal", db: -5 },
  { t: v.frase(1).t("4"), sonido: "aviso", db: -4 },
  { t: v.frase(2).t("abierta"), sonido: "desliza", db: -5 },
  { t: v.frase(2).t("50"), sonido: "sube", db: -4 },
  { t: v.frase(2).t("desague"), sonido: "hueco", db: -4 },
  { t: v.frase(3).t("12"), sonido: "timbre", db: -5 },
  { t: v.frase(3).t("recicla"), sonido: "desliza", db: -5 },
  { t: v.frase(3).t("vez"), sonido: "toque", db: -6 },
  { t: v.frase(4).t("amigo"), sonido: "toque", db: -5 },
  { t: v.frase(4).t("ahorrar"), sonido: "timbre", db: -5 },
];
