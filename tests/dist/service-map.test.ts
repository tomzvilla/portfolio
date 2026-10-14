import { describe, expect, it } from 'vitest';
import { page, text } from './helpers';

describe('mapa de servicios', () => {
  const es = page('/');
  const map = es.querySelector('[data-service-map]')!;

  it('cuatro tarjetas, A presionada, contadores calculados', () => {
    const cards = map.querySelectorAll('button.svc');
    expect(cards).toHaveLength(4);
    expect(cards.map((c) => c.getAttribute('aria-pressed'))).toEqual(['true', 'false', 'false', 'false']);
    expect(cards.map((c) => text(c.querySelector('.c')))).toEqual([
      '3 proyectos lo respaldan', '2 proyectos lo respaldan', '5 proyectos lo respaldan', '2 proyectos lo respaldan',
    ]);
  });

  it('tres columnas con 4, 8 y 7 nodos como botones', () => {
    expect(map.querySelectorAll('.svcol button.nd')).toHaveLength(4);
    expect(map.querySelectorAll('.prjcol button.nd')).toHaveLength(8);
    expect(map.querySelectorAll('.techcol button.nd')).toHaveLength(7);
  });

  it('sin JS se ve el panel de A y las demás variantes están ocultas', () => {
    const variants = map.querySelectorAll('.panel [data-panel]');
    expect(variants).toHaveLength(19);
    const visible = variants.filter((v) => !v.hasAttribute('hidden'));
    expect(visible.map((v) => v.getAttribute('data-panel'))).toEqual(['s1']);
    expect(text(visible[0].querySelector('.k'))).toBe('A · ASISTENTE CON IA');
    expect(visible[0].querySelectorAll('li a').map((a) => a.getAttribute('href'))).toEqual([
      '/trabajo/asistentes-unc/', '/trabajo/hunters-gallery/', '/trabajo/chatbots-eval/',
    ]);
    expect(map.querySelector('.panel')?.getAttribute('aria-live')).toBe('polite');
  });

  it('el panel de un proyecto usa el texto de su página', () => {
    const p1 = map.querySelector('[data-panel="p1"]')!;
    expect(text(p1.querySelector('.p'))).toBe(
      'Empresas que ponen agentes de IA frente a sus clientes sin saber cómo pueden fallar. Desarrollo full stack de una plataforma que prueba agentes de IA de forma automática y reporta cada falla.',
    );
    expect(p1.querySelector('.cta a')?.getAttribute('href')).toBe('/trabajo/chatbots-eval/');
  });

  it('en inglés los contadores y links son del idioma', () => {
    const en = page('/en/').querySelector('[data-service-map]')!;
    expect(text(en.querySelector('button.svc .c'))).toBe('3 projects back it up');
    expect(en.querySelector('[data-panel="s1"] li a')?.getAttribute('href')).toBe('/en/work/asistentes-unc/');
  });
});
