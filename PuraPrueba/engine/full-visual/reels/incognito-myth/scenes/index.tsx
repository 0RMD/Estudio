import type { SceneMap } from "../../../src/engine/Stage";
import { Hook } from "./Hook";
import { Lawsuit } from "./Lawsuit";
import { Local } from "./Local";
import { Isp } from "./Isp";
import { Fingerprint } from "./Fingerprint";
import { Rule } from "./Rule";
import { Cta } from "./Cta";

export const scenes: SceneMap = {
  hook: Hook,
  lawsuit: Lawsuit,
  local: Local,
  isp: Isp,
  fingerprint: Fingerprint,
  rule: Rule,
  cta: Cta,
};
