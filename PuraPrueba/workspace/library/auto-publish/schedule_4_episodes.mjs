#!/usr/bin/env node
/**
 * Programador escalonado (1 episodio por día · 4 días seguidos) vía API Oficial de Meta (`meta-direct`).
 * Protege cuentas nuevas evitando subir los 4 videos de golpe en el mismo minuto.
 *
 * Uso:
 *   node workspace/library/auto-publish/schedule_4_episodes.mjs [--dry-run] [--start-date 2026-11-01] [--hour 19:00] [--tz -05:00]
 */
import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const KF_ROOT = path.resolve(__dirname, "../../..");
const publishScript = path.join(__dirname, "publish_reel.mjs");

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const opt = (flag, def) => (args.includes(flag) ? args[args.indexOf(flag) + 1] : def);

const hour = opt("--hour", "19:00");
const tz = opt("--tz", "-05:00");
const providerOpt = opt("--provider", "");
const platformsOpt = opt("--platforms", "");
const sameTimeAll = args.includes("--same-time-all");

// Default start date: today if 19:00 is still >30m ahead, otherwise tomorrow
function defaultStartDate() {
  const now = new Date();
  const [hh, mm] = hour.split(":").map(Number);
  const candidate = new Date(now);
  candidate.setHours(hh, mm || 0, 0, 0);
  if (candidate.getTime() < now.getTime() + 30 * 60 * 1000) {
    candidate.setDate(candidate.getDate() + 1);
  }
  const pad = (n) => String(n).padStart(2, "0");
  return `${candidate.getFullYear()}-${pad(candidate.getMonth() + 1)}-${pad(candidate.getDate())}`;
}

const startDateStr = opt("--start-date", defaultStartDate());

const EPISODES = [
  "workspace/output/2026-10-31-full-visual-ep1-battery-atom",
  "workspace/output/2026-10-31-full-visual-ep2-closing-apps-atom",
  "workspace/output/2026-10-31-full-visual-ep3-incognito-atom",
  "workspace/output/2026-10-31-full-visual-ep4-rice-phone-atom",
];

function addDays(ymd, days) {
  const [y, m, d] = ymd.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d + days));
  const pad = (n) => String(n).padStart(2, "0");
  return `${dt.getUTCFullYear()}-${pad(dt.getUTCMonth() + 1)}-${pad(dt.getUTCDate())}`;
}

for (let i = 0; i < EPISODES.length; i++) {
  const datePart = sameTimeAll ? startDateStr : addDays(startDateStr, i);
  const isoSchedule = `${datePart}T${hour}:00${tz}`;
  console.log(`\n========================================================`);
  console.log(`EPISODIO ${i + 1}/4 -> Programado para: ${isoSchedule}`);
  console.log(`========================================================`);
  const cmdArgs = [publishScript, EPISODES[i], "--schedule", isoSchedule];
  if (providerOpt) cmdArgs.push("--provider", providerOpt);
  if (platformsOpt) cmdArgs.push("--platforms", platformsOpt);
  if (dryRun) cmdArgs.push("--dry-run");
  execFileSync(process.execPath, cmdArgs, { cwd: KF_ROOT, stdio: "inherit" });
}
