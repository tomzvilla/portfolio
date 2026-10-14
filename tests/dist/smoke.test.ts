import { describe, expect, it } from 'vitest';
import { exists, page } from './helpers';

describe('build', () => {
  it('genera la home en español y en inglés', () => {
    expect(exists('/')).toBe(true);
    expect(exists('/en/')).toBe(true);
  });

  it('declara el idioma en <html>', () => {
    expect(page('/').querySelector('html')?.getAttribute('lang')).toBe('es');
    expect(page('/en/').querySelector('html')?.getAttribute('lang')).toBe('en');
  });
});
