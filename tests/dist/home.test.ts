import { describe, expect, it } from 'vitest';
import { page, text } from './helpers';

describe('home completa', () => {
  for (const [route, ids] of [
    ['/', ['inicio', 'que-hago', 'trabajo', 'sobre-mi', 'contacto']],
    ['/en/', ['home', 'services', 'work', 'about', 'contact']],
  ] as const) {
    it(`${route}: secciones en orden y cada ancla de la nav tiene destino`, () => {
      const root = page(route);
      expect(root.querySelectorAll('main > section').map((s) => s.getAttribute('id'))).toEqual([...ids]);
      for (const a of root.querySelectorAll('.anchors a')) {
        const id = a.getAttribute('href')!.split('#')[1];
        expect(root.querySelector(`#${id}`), id).not.toBeNull();
      }
    });

    it(`${route}: cada sección está rotulada por un encabezado que existe`, () => {
      const root = page(route);
      for (const s of root.querySelectorAll('main > section')) {
        const id = s.getAttribute('aria-labelledby')!;
        expect(root.querySelector(`#${id}`), id).not.toBeNull();
      }
      expect(root.querySelectorAll('h1')).toHaveLength(1);
    });
  }

  it('sobre mí: dos párrafos y la ficha', () => {
    const about = page('/').querySelector('#sobre-mi')!;
    expect(about.querySelectorAll('p.rv')).toHaveLength(2);
    expect(text(about.querySelector('b'))).toBe('UTN FRC');
    expect(about.querySelectorAll('dt').map(text)).toEqual(['FORMACIÓN', 'PREMIO', 'IDIOMAS', 'CÓMO TRABAJO', 'UBICACIÓN']);
  });

  it('contacto: mailto grande y links', () => {
    const contact = page('/').querySelector('#contacto')!;
    expect(text(contact.querySelector('h2'))).toBe('¿Tenés algo entre manos?');
    expect(contact.querySelector('a.big')?.getAttribute('href')).toBe(
      'mailto:villarrealtomas@hotmail.com?subject=Consulta%20desde%20el%20portfolio',
    );
    expect(text(contact.querySelector('p'))).toBe('Respondo en el día. Me encontrás también en LinkedIn y GitHub.');
  });
});
