import { describe, expect, it } from 'vitest';
import { exists, page, text } from './helpers';

describe('hero', () => {
  it('un solo h1 con el titular y el acento', () => {
    const es = page('/');
    expect(es.querySelectorAll('h1')).toHaveLength(1);
    expect(text(es.querySelector('h1'))).toBe('Desarrollo full stack e integraciones de IA para negocios.');
    expect(text(es.querySelector('h1 b'))).toBe('para');
    expect(text(page('/en/').querySelector('h1'))).toBe('Full stack development and AI integrations for businesses.');
  });

  it('el mail es un mailto con asunto y está antes de los datos', () => {
    const a = page('/').querySelector('.hero a.m')!;
    expect(a.getAttribute('href')).toBe('mailto:villarrealtomas@hotmail.com?subject=Consulta%20desde%20el%20portfolio');
    expect(text(a)).toContain('villarrealtomas@hotmail.com');
  });

  it('el CV es el del idioma y existe', () => {
    expect(page('/').querySelector('.hero .sm a[type="application/pdf"]')?.getAttribute('href')).toBe('/cv/Villarreal-Tomas-CV-ES.pdf');
    expect(page('/en/').querySelector('.hero .sm a[type="application/pdf"]')?.getAttribute('href')).toBe('/cv/Villarreal-Tomas-CV-EN.pdf');
    expect(exists('/cv/Villarreal-Tomas-CV-ES.pdf')).toBe(true);
    expect(exists('/cv/Villarreal-Tomas-CV-EN.pdf')).toBe(true);
  });

  it('tres datos y un adorno oculto para lectores de pantalla', () => {
    const es = page('/');
    expect(es.querySelectorAll('.hero .now dt').map(text)).toEqual(['AHORA', 'DESDE 2023', 'PROYECTOS PROPIOS']);
    const vec = es.querySelector('.vec')!;
    expect(vec.getAttribute('aria-hidden')).toBe('true');
    expect(vec.querySelectorAll('circle')).toHaveLength(11);
    expect(vec.querySelectorAll('path')).toHaveLength(11);
  });
});
