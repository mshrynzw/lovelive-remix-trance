import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fallback = path.join(root, "scripts", "windows-symlink-fallback.mjs");
const cli = path.join(
  root,
  "node_modules",
  "@opennextjs",
  "cloudflare",
  "dist",
  "cli",
  "index.js"
);

const child = spawn(
  process.execPath,
  ["--import", pathToFileURL(fallback).href, cli, ...process.argv.slice(2)],
  { stdio: "inherit", cwd: root, env: process.env, shell: false }
);

child.on("exit", (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  process.exit(code ?? 1);
});
