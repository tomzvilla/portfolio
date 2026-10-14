import { runInNewContext } from 'node:vm';
import { describe, expect, it } from 'vitest';
import { applyTheme, currentTheme, THEME_INIT } from '../../src/scripts/theme';

interface InitOptions { stored?: string | null; prefersLight?: boolean; storageThrows?: boolean }

/** Ejecuta el script inline del <head> en un contexto aislado, como lo haría el navegador. */
function runInit({ stored = null, prefersLight = false, storageThrows = false }: InitOptions) {
  const classes = new Set<string>();
  const attrs: Record<string, string> = {};
  const documentElement = {
    classList: { add: (c: string) => classes.add(c) },
    setAttribute: (k: string, v: string) => { attrs[k] = v; },
  };
  const matchMedia = (q: string) => ({ matches: q.includes('light') && prefersLight });
  const ctx: Record<string, unknown> = { document: { documentElement }, matchMedia };
  ctx.window = ctx;
  Object.defineProperty(ctx, 'localStorage', {
    get() {
      if (storageThrows) throw new Error('SecurityError');
      return { getItem: () => stored };
    },
  });
  runInNewContext(THEME_INIT, ctx);
  return { classes, theme: attrs['data-theme'] };
}

function fakeRoot(theme?: string) {
  const attrs: Record<string, string> = theme ? { 'data-theme': theme } : {};
  return {
    getAttribute: (k: string) => attrs[k] ?? null,
    setAttribute: (k: string, v: string) => { attrs[k] = v; },
  };
}

describe('THEME_INIT', () => {
  it('marca que hay JS', () => {
    expect(runInit({}).classes.has('js')).toBe(true);
  });

  it('respeta la elección guardada', () => {
    expect(runInit({ stored: 'light' }).theme).toBe('light');
    expect(runInit({ stored: 'dark', prefersLight: true }).theme).toBe('dark');
  });

  it('sin elección guardada usa prefers-color-scheme', () => {
    expect(runInit({ prefersLight: true }).theme).toBe('light');
    expect(runInit({}).theme).toBe('dark');
  });

  it('ignora un valor basura', () => {
    expect(runInit({ stored: 'purple', prefersLight: true }).theme).toBe('light');
  });

  it('no rompe si localStorage está bloqueado', () => {
    const r = runInit({ storageThrows: true, prefersLight: true });
    expect(r.theme).toBe('light');
    expect(r.classes.has('js')).toBe(true);
  });
});

describe('applyTheme', () => {
  it('aplica y guarda', () => {
    const root = fakeRoot('dark');
    const saved: Record<string, string> = {};
    applyTheme('light', root, { setItem: (k, v) => { saved[k] = v; } });
    expect(currentTheme(root)).toBe('light');
    expect(saved.theme).toBe('light');
  });

  it('aplica aunque no se pueda guardar', () => {
    const root = fakeRoot('dark');
    expect(() => applyTheme('light', root, { setItem: () => { throw new Error('QuotaExceeded'); } })).not.toThrow();
    expect(currentTheme(root)).toBe('light');
    applyTheme('dark', root, null);
    expect(currentTheme(root)).toBe('dark');
  });

  it('cualquier cosa que no sea light se lee como dark', () => {
    expect(currentTheme(fakeRoot())).toBe('dark');
    expect(currentTheme(fakeRoot('sepia'))).toBe('dark');
  });
});
