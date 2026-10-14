import { describe, expect, it } from 'vitest';
import { WORK_SLUGS } from '../../src/data/graph';
import { page, text } from './helpers';

const FEATURED = ['chatbots-eval', 'tramites-vehiculares', 'hunters-gallery', 'sistemas-unc'];
const REST = WORK_SLUGS.filter((s) => !FEATURED.includes(s));

describe('sección Trabajo', () => {
  it('cuatro destacados y el resto en la lista compacta, en el orden de la spec', () => {
    const hrefs = (path: string, sel: string) =>
      page(path).querySelectorAll(`.work ${sel}`).map((a) => a.getAttribute('href'));
    expect(hrefs('/', 'a.row')).toEqual(FEATURED.map((s) => `/trabajo/${s}/`));
    expect(hrefs('/', 'a.mr')).toEqual(REST.map((s) => `/trabajo/${s}/`));
    expect(hrefs('/en/', 'a.row')).toEqual(FEATURED.map((s) => `/en/work/${s}/`));
    expect(hrefs('/en/', 'a.mr')).toEqual(REST.map((s) => `/en/work/${s}/`));
  });

  it('cada destacado muestra el problema en negrita', () => {
    const first = page('/').querySelector('.work a.row')!;
    expect(text(first.querySelector('.d b'))).toBe('Empresas que ponen agentes de IA frente a sus clientes sin saber cómo pueden fallar.');
    expect(text(first.querySelector('.t small'))).toBe('Startup de IA · Europa');
  });

  it('la lista compacta tiene título y muestra cliente y período', () => {
    expect(text(page('/').querySelector('.work .more h3'))).toBe('Más trabajos');
    expect(text(page('/en/').querySelector('.work .more h3'))).toBe('More work');
    const meetings = page('/').querySelector('a.mr[href="/trabajo/analisis-reuniones/"]')!;
    expect(text(meetings.querySelector('small'))).toBe('Startup de IA · Italia · 2024–25');
  });
});
