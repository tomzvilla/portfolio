import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { gzipSync } from 'node:zlib';
import { describe, expect, it } from 'vitest';
import { DIST, page } from './helpers';

describe('presupuesto de JS', () => {
  it('todo el JS del sitio más los scripts inline de la home pesa menos de 15 kB gz', () => {
    const bundles = readdirSync(join(DIST, '_astro'))
      .filter((f) => f.endsWith('.js'))
      .map((f) => readFileSync(join(DIST, '_astro', f)));
    const inline = page('/')
      .querySelectorAll('script')
      .filter((s) => !s.getAttribute('src'))
      .map((s) => Buffer.from(s.text));
    const total = [...bundles, ...inline].reduce((sum, b) => sum + gzipSync(b).length, 0);
    expect(total).toBeGreaterThan(0);
    expect(total).toBeLessThan(15_000);
  });
});
