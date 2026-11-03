import type { SceneMap } from "../../../src/engine/Stage";
import { Hook } from "./Hook";
import { Origin } from "./Origin";
import { Starch } from "./Starch";
import { Corrosion } from "./Corrosion";
import { Short } from "./Short";
import { Rule } from "./Rule";
import { Cta } from "./Cta";

export const scenes: SceneMap = {
  hook: Hook,
  origin: Origin,
  starch: Starch,
  corrosion: Corrosion,
  short: Short,
  rule: Rule,
  cta: Cta,
};
