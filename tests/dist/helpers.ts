import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse, type HTMLElement } from 'node-html-parser';

export const DIST = join(process.cwd(), 'dist');

/** '/', '/en/', '/trabajo/x/' → dist/.../index.html; '/robots.txt' → dist/robots.txt */
export function fileFor(route: string): string {
  const rel = route.replace(/^\/+/, '');
  return join(DIST, rel === '' || rel.endsWith('/') ? join(rel, 'index.html') : rel);
}

export function exists(route: string): boolean {
  return existsSync(fileFor(route));
}

export function page(route: string): HTMLElement {
  return parse(readFileSync(fileFor(route), 'utf8'));
}

export function text(el: HTMLElement | null | undefined): string {
  return (el?.text ?? '').replace(/\s+/g, ' ').trim();
}

/** Todo el CSS que carga una página: <style> inline + <link rel="stylesheet">. */
export function cssOf(route: string): string {
  const root = page(route);
  const inline = root.querySelectorAll('style').map((s) => s.text);
  const linked = root
    .querySelectorAll('link[rel="stylesheet"]')
    .map((l) => readFileSync(join(DIST, l.getAttribute('href')!), 'utf8'));
  return [...inline, ...linked].join('\n');
}
