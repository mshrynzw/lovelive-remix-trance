import fs from "node:fs";
import fsp from "node:fs/promises";
import { syncBuiltinESMExports } from "node:module";
import path from "node:path";

/**
 * Next.js / OpenNext tracing uses fs.symlink. Windows denies that unless
 * Developer Mode is on, which aborts the build (`EPERM: symlink`).
 * Fall back to a dereferenced copy so the Worker bundle is self-contained.
 */
function resolveTarget(target, dest) {
  return path.isAbsolute(target) ? target : path.resolve(path.dirname(dest), target);
}

function shouldFallback(err) {
  return err?.code === "EPERM" || err?.code === "EACCES";
}

function install() {
  if (process.platform !== "win32" || globalThis.__llTranceSymlinkFallback) return;
  globalThis.__llTranceSymlinkFallback = true;

  const origPromise = fsp.symlink.bind(fsp);
  const origCb = fs.symlink.bind(fs);
  const origSync = fs.symlinkSync.bind(fs);

  async function materialize(target, dest) {
    const absTarget = resolveTarget(target, dest);
    await fsp.mkdir(path.dirname(dest), { recursive: true });
    await fsp.rm(dest, { recursive: true, force: true });
    await fsp.cp(absTarget, dest, { recursive: true, force: true, dereference: true });
  }

  function materializeSync(target, dest) {
    const absTarget = resolveTarget(target, dest);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.rmSync(dest, { recursive: true, force: true });
    fs.cpSync(absTarget, dest, { recursive: true, force: true, dereference: true });
  }

  fsp.symlink = async (target, dest, type) => {
    try {
      await origPromise(target, dest, type);
    } catch (err) {
      if (!shouldFallback(err)) throw err;
      await materialize(String(target), String(dest));
    }
  };

  fs.symlink = (target, dest, type, cb) => {
    const callback = typeof type === "function" ? type : cb;
    const linkType = typeof type === "function" ? undefined : type;
    origCb(target, dest, linkType, (err) => {
      if (!err) {
        callback?.(err);
        return;
      }
      if (!shouldFallback(err)) {
        callback?.(err);
        return;
      }
      materialize(String(target), String(dest)).then(
        () => callback?.(null),
        (copyErr) => callback?.(copyErr)
      );
    });
  };

  fs.symlinkSync = (target, dest, type) => {
    try {
      origSync(target, dest, type);
    } catch (err) {
      if (!shouldFallback(err)) throw err;
      materializeSync(String(target), String(dest));
    }
  };

  // OpenNext imports `{ symlinkSync } from "node:fs"` — refresh ESM named exports.
  syncBuiltinESMExports();
}

install();
