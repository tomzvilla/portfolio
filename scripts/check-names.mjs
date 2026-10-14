// Busca nombres que el sitio nunca debe publicar (spec §10). Uso: node scripts/check-names.mjs <dir>
// La lista vive fuera de git (.superpowers/forbidden-names.json): el repo es público y los nombres no pueden estar acá.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const LIST = fileURLToPath(new URL('../.superpowers/forbidden-names.json', import.meta.url));

// Binarios que no se pueden leer como texto; todo lo demás (incluso sin extensión) se escanea.
const BINARY_EXT = new Set([
  '.png', '.jpg', '.jpeg', '.webp', '.avif', '.gif', '.ico',
  '.webm', '.mp4', '.woff', '.woff2', '.ttf', '.otf', '.pdf', '.zip',
]);

function loadPatterns() {
  const { patterns } = JSON.parse(readFileSync(LIST, 'utf8'));
  return Object.entries(patterns).map(([name, source]) => [name, new RegExp(source, 'i')]);
}

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) yield* walk(path);
    else yield path;
  }
}

function scan(dir, patterns) {
  const hits = [];
  for (const file of walk(dir)) {
    if (BINARY_EXT.has(extname(file).toLowerCase())) continue;
    const text = readFileSync(file, 'utf8');
    const names = patterns.filter(([, re]) => re.test(text)).map(([name]) => name);
    if (names.length) hits.push({ file, names });
  }
  return hits;
}

const dir = process.argv[2] ?? 'dist';
if (!existsSync(LIST)) {
  console.warn(`check:names: sin lista local (${LIST}), no se revisa ${dir}`);
  process.exit(0);
}
const hits = scan(dir, loadPatterns());
for (const h of hits) console.error(`${h.file}: ${h.names.join(', ')}`);
if (hits.length) process.exit(1);
console.log(`check:names OK (${dir})`);
