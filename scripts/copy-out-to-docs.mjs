import { cpSync, existsSync, rmSync } from "node:fs";
import { join } from "node:path";
import { cwd } from "node:process";

const root = cwd();
const outDir = join(root, "out");
const docsDir = join(root, "docs");

if (!existsSync(outDir)) {
  throw new Error("No existe la carpeta out. Ejecuta primero next build.");
}

if (existsSync(docsDir)) {
  rmSync(docsDir, { recursive: true, force: true });
}

cpSync(outDir, docsDir, { recursive: true });

console.log("Export estatico copiado de out/ a docs/ para GitHub Pages.");
