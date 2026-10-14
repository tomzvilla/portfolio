import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { SITE } from '../../src/config';
import { WORK_SLUGS } from '../../src/data/graph';
import { exists, fileFor, page } from './helpers';

const png = (route: string) => {
  const buf = readFileSync(fileFor(route));
  return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
};

describe('SEO', () => {
  it('robots.txt permite todo y apunta al sitemap', () => {
    const robots = readFileSync(fileFor('/robots.txt'), 'utf8');
    expect(robots).toContain('User-agent: *');
    expect(robots).toContain(`Sitemap: ${SITE}/sitemap-index.xml`);
  });

  it('el sitemap lista las dos homes y los 16 proyectos', () => {
    expect(exists('/sitemap-index.xml')).toBe(true);
    const xml = readFileSync(fileFor('/sitemap-0.xml'), 'utf8');
    expect(xml.match(/<loc>/g)).toHaveLength(18);
    for (const slug of WORK_SLUGS) {
      expect(xml).toContain(`<loc>${SITE}/trabajo/${slug}/</loc>`);
      expect(xml).toContain(`<loc>${SITE}/en/work/${slug}/</loc>`);
    }
  });

  it('una imagen OG de 1200×630 por idioma, referenciada con URL absoluta', () => {
    for (const lang of ['es', 'en']) {
      expect(png(`/og/og-${lang}.png`)).toEqual({ w: 1200, h: 630 });
    }
    expect(page('/').querySelector('meta[property="og:image"]')?.getAttribute('content')).toBe(`${SITE}/og/og-es.png`);
    expect(page('/en/work/analisis-reuniones/').querySelector('meta[property="og:image"]')?.getAttribute('content')).toBe(`${SITE}/og/og-en.png`);
  });
});
