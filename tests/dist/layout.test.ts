import { describe, expect, it } from 'vitest';
import { cssOf, page, text } from './helpers';

const SITE = 'https://tomzv.com.ar';

describe('<head>', () => {
  it('el primer script es el inline de tema y está en <head>', () => {
    const head = page('/').querySelector('head')!;
    const first = page('/').querySelector('script')!;
    expect(head.querySelectorAll('script')[0]).toBeDefined();
    expect(first.getAttribute('src')).toBeUndefined();
    expect(first.text).toContain("classList.add('js')");
    expect(first.text).toContain('data-theme');
    expect(head.innerHTML.indexOf(first.text)).toBeGreaterThan(-1);
  });

  it('canonical y hreflang apuntan a la página y su par', () => {
    for (const [route, es, en] of [['/', `${SITE}/`, `${SITE}/en/`], ['/en/', `${SITE}/`, `${SITE}/en/`]]) {
      const root = page(route);
      expect(root.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(route === '/' ? es : en);
      expect(root.querySelector('link[hreflang="es"]')?.getAttribute('href')).toBe(es);
      expect(root.querySelector('link[hreflang="en"]')?.getAttribute('href')).toBe(en);
      expect(root.querySelector('link[hreflang="x-default"]')?.getAttribute('href')).toBe(es);
    }
  });

  it('precarga las dos fuentes', () => {
    const hrefs = page('/').querySelectorAll('link[rel="preload"][as="font"]').map((l) => l.getAttribute('href'));
    expect(hrefs).toEqual([
      '/fonts/space-grotesk-latin-wght-normal.woff2',
      '/fonts/ibm-plex-mono-latin-400-normal.woff2',
    ]);
  });
});

describe('nav', () => {
  it('tiene las cinco anclas y el cambio de idioma', () => {
    const es = page('/');
    expect(es.querySelectorAll('.anchors a').map((a) => a.getAttribute('href'))).toEqual([
      '/#inicio', '/#que-hago', '/#trabajo', '/#sobre-mi', '/#contacto',
    ]);
    expect(es.querySelector('a.lang')?.getAttribute('href')).toBe('/en/');
    expect(page('/en/').querySelector('a.lang')?.getAttribute('href')).toBe('/');
    expect(text(es.querySelector('.av'))).toBe('Disponible');
  });

  it('el toggle de tema es un botón con aria-pressed', () => {
    const btn = page('/').querySelector('button[data-theme-toggle]')!;
    expect(btn.getAttribute('aria-pressed')).toBe('false');
    expect(btn.getAttribute('aria-label')).toBe('Modo claro');
  });
});

describe('sin JS', () => {
  it('.rv solo se oculta bajo html.js', () => {
    const css = cssOf('/');
    expect(css).toMatch(/\.js \.rv\{[^}]*opacity:0/);
    expect(css).not.toMatch(/(?:^|[},])\.rv\{[^}]*opacity:\s*0/);
  });
});
