import { describe, expect, it } from 'vitest';
import { WORK_SLUGS } from '../../src/data/graph';
import { exists, page, text } from './helpers';

const SITE = 'https://tomasvillarreal.com.ar';
const CONFIDENTIAL = ['chatbots-eval', 'validacion-infracciones'];

describe('páginas de proyecto', () => {
  it('existen las 8 en cada idioma', () => {
    for (const slug of WORK_SLUGS) {
      expect(exists(`/trabajo/${slug}/`), slug).toBe(true);
      expect(exists(`/en/work/${slug}/`), slug).toBe(true);
    }
  });

  it('cada una enlaza a su par en el otro idioma (nav y hreflang)', () => {
    for (const slug of WORK_SLUGS) {
      const es = page(`/trabajo/${slug}/`);
      expect(es.querySelector('a.lang')?.getAttribute('href')).toBe(`/en/work/${slug}/`);
      expect(es.querySelector('link[hreflang="en"]')?.getAttribute('href')).toBe(`${SITE}/en/work/${slug}/`);
      const en = page(`/en/work/${slug}/`);
      expect(en.querySelector('a.lang')?.getAttribute('href')).toBe(`/trabajo/${slug}/`);
      expect(en.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(`${SITE}/en/work/${slug}/`);
    }
  });

  it('un h1 con el título y las cuatro secciones del cuerpo', () => {
    const es = page('/trabajo/hunters-gallery/');
    expect(es.querySelectorAll('h1').map(text)).toEqual(["Hunter's Gallery"]);
    expect(es.querySelectorAll('.body h2').map(text)).toEqual(['Contexto', 'Qué construí', 'Con qué', 'Resultado']);
    expect(page('/en/work/analisis-reuniones/').querySelectorAll('.body h2').map(text)).toEqual(['Context', 'What I built', 'Built with', 'Outcome']);
    expect(text(es.querySelector('title'))).toBe("Hunter's Gallery · Tomás Villarreal");
  });

  it('los confidenciales no tienen imágenes, video ni links externos', () => {
    for (const slug of CONFIDENTIAL) {
      const main = page(`/trabajo/${slug}/`).querySelector('main')!;
      expect(main.querySelectorAll('img'), slug).toHaveLength(0);
      expect(main.querySelectorAll('video'), slug).toHaveLength(0);
      expect(main.querySelector('.links'), slug).toBeNull();
    }
  });

  it('CienciaConecta: 4 capturas (la primera sin lazy) y el video', () => {
    const main = page('/trabajo/cienciaconecta/').querySelector('main')!;
    const imgs = main.querySelectorAll('.gallery img');
    expect(imgs).toHaveLength(4);
    expect(imgs[0].getAttribute('loading')).not.toBe('lazy');
    expect(imgs.slice(1).map((i) => i.getAttribute('loading'))).toEqual(['lazy', 'lazy', 'lazy']);
    imgs.forEach((i) => expect(i.getAttribute('alt')).toBeTruthy());
    expect(main.querySelector('video')?.getAttribute('src')).toMatch(/\.webm$/);
  });

  it("Hunter's Gallery: collage + 3 capturas del sitio público y link al sitio", () => {
    const main = page('/trabajo/hunters-gallery/').querySelector('main')!;
    expect(main.querySelectorAll('.gallery img')).toHaveLength(4);
    expect(main.querySelector('.links a')?.getAttribute('href')).toBe('https://huntersgallery.com.ar');
  });

  it('Trámites vehiculares: collage + 3 capturas con texto alternativo y sin links', () => {
    const main = page('/trabajo/tramites-vehiculares/').querySelector('main')!;
    const imgs = main.querySelectorAll('.gallery img');
    expect(imgs).toHaveLength(4);
    imgs.forEach((i) => expect(i.getAttribute('alt')).toBeTruthy());
    expect(main.querySelector('.links')).toBeNull();
  });

  it('anterior y siguiente respetan el orden y no dan la vuelta', () => {
    const first = page('/trabajo/chatbots-eval/');
    expect(first.querySelector('a[rel="prev"]')).toBeNull();
    expect(first.querySelector('a[rel="next"]')?.getAttribute('href')).toBe('/trabajo/asistentes-unc/');
    const last = page('/trabajo/cienciaconecta/');
    expect(last.querySelector('a[rel="prev"]')?.getAttribute('href')).toBe('/trabajo/sistemas-unc/');
    expect(last.querySelector('a[rel="next"]')).toBeNull();
  });

  it('análisis de reuniones no muestra chips de stack', () => {
    expect(page('/trabajo/analisis-reuniones/').querySelector('.chips')).toBeNull();
    expect(page('/trabajo/sistemas-unc/').querySelectorAll('.chips li').map(text)).toEqual(['Vue', 'Node', 'MongoDB']);
  });
});
