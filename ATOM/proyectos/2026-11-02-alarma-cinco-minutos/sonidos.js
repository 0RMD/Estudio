export default (v) => [
  { t: 0.08, sonido: "timbre", db: -5 },
  { t: v.frase(1).t("5"), sonido: "clic", db: -4 },
  { t: v.frase(1).t("cansado"), sonido: "aviso", db: -4 },
  { t: v.frase(2).t("dormirte"), sonido: "desliza", db: -6 },
  { t: v.frase(2).t("inicia"), sonido: "sube", db: -5 },
  { t: v.frase(2).t("profundo"), sonido: "golpe-hondo", db: -5 },
  { t: v.frase(3).t("golpe"), sonido: "metal", db: -4 },
  { t: v.frase(3).t("aturdido"), sonido: "aviso", db: -4 },
  { t: v.frase(4).t("sola"), sonido: "timbre", db: -5 },
  { t: v.frase(4).t("enviaselo"), sonido: "toque", db: -5 },
  { t: v.frase(4).t("diez"), sonido: "clic", db: -5 },
];
