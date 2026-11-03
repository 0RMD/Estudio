import React from "react";
import { Hook } from "./Hook";
import { Test } from "./Test";
import { Proof } from "./Proof";
import { Cta } from "./Cta";

export const scenes: Record<string, React.FC> = {
  hook: Hook,
  test: Test,
  proof: Proof,
  cta: Cta,
};
