import { z } from 'astro/zod';
import { describe, expect, it } from 'vitest';
import { workSchema } from '../../src/content/work-schema';

const schema = workSchema(() => z.string());
const base = {
  title: 'X', client: 'Y', period: '2026', order: 1, role: 'Full stack', stack: ['Node'],
  problem: 'Un problema.', summary: 'Lo que hice.', confidential: false,
};

describe('workSchema', () => {
  it('acepta una entrada mínima', () => {
    expect(schema.safeParse(base).success).toBe(true);
  });

  it('acepta imágenes, video y links en un proyecto público', () => {
    const r = schema.safeParse({
      ...base,
      images: [{ src: 'a.png', alt: 'Captura' }],
      video: 'demo.webm',
      links: [{ label: 'Sitio', href: 'https://example.com' }],
    });
    expect(r.success).toBe(true);
  });

  it('rechaza un proyecto confidencial con imágenes', () => {
    const r = schema.safeParse({ ...base, confidential: true, images: [{ src: 'a.png', alt: 'Captura' }] });
    expect(r.success).toBe(false);
    expect(r.error?.issues[0].message).toMatch(/confidencial/);
  });

  it('rechaza un proyecto confidencial con video o links', () => {
    expect(schema.safeParse({ ...base, confidential: true, video: 'x.webm' }).success).toBe(false);
    expect(schema.safeParse({ ...base, confidential: true, links: [{ label: 'a', href: 'https://a.com' }] }).success).toBe(false);
  });

  it('exige alt en las imágenes y URLs válidas en los links', () => {
    expect(schema.safeParse({ ...base, images: [{ src: 'a.png', alt: '' }] }).success).toBe(false);
    expect(schema.safeParse({ ...base, links: [{ label: 'a', href: 'no-es-url' }] }).success).toBe(false);
  });
});
