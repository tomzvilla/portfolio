import { describe, expect, it } from 'vitest';
import { WORK_SLUGS } from '../../src/data/graph';
import { page, text } from './helpers';

describe('sección Trabajo', () => {
  it('ocho filas en el orden de la spec, cada una con link a su página', () => {
    expect(page('/').querySelectorAll('.work a.row').map((a) => a.getAttribute('href'))).toEqual(
      WORK_SLUGS.map((s) => `/trabajo/${s}/`),
    );
    expect(page('/en/').querySelectorAll('.work a.row').map((a) => a.getAttribute('href'))).toEqual(
      WORK_SLUGS.map((s) => `/en/work/${s}/`),
    );
  });

  it('cada fila muestra el problema en negrita', () => {
    const first = page('/').querySelector('.work a.row')!;
    expect(text(first.querySelector('.d b'))).toBe('Una startup de IA necesitaba medir si sus asistentes responden bien.');
    expect(text(first.querySelector('.t small'))).toBe('Startup de IA · Europa');
  });

  it('Manent no muestra stack', () => {
    const manent = page('/').querySelector('a.row[href="/trabajo/manent/"]')!;
    expect(manent.querySelector('.r br')).toBeNull();
  });
});
