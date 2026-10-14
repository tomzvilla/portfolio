import { describe, expect, it } from 'vitest';
import { altLangPath, cvHref, homePath, langFromPath, LANGS, mailtoHref, t, workPath } from '../../src/i18n/utils';
import { services, projects, supportCount } from '../../src/data/graph';

describe('rutas', () => {
  it('arma home y proyecto por idioma, con barra final', () => {
    expect(homePath('es')).toBe('/');
    expect(homePath('en')).toBe('/en/');
    expect(workPath('es', 'analisis-reuniones')).toBe('/trabajo/analisis-reuniones/');
    expect(workPath('en', 'analisis-reuniones')).toBe('/en/work/analisis-reuniones/');
  });

  it('detecta el idioma por la ruta', () => {
    expect(langFromPath('/')).toBe('es');
    expect(langFromPath('/trabajo/analisis-reuniones/')).toBe('es');
    expect(langFromPath('/en/')).toBe('en');
    expect(langFromPath('/en')).toBe('en');
    expect(langFromPath('/en/work/analisis-reuniones/')).toBe('en');
    expect(langFromPath('/english/')).toBe('es');
  });

  it('el cambio de idioma lleva a la misma página en el otro idioma', () => {
    expect(altLangPath('/')).toBe('/en/');
    expect(altLangPath('/en/')).toBe('/');
    expect(altLangPath('/en')).toBe('/');
    expect(altLangPath('/trabajo/hunters-gallery/')).toBe('/en/work/hunters-gallery/');
    expect(altLangPath('/trabajo/hunters-gallery')).toBe('/en/work/hunters-gallery/');
    expect(altLangPath('/en/work/analisis-reuniones/')).toBe('/trabajo/analisis-reuniones/');
    expect(altLangPath('/trabajo/analisis-reuniones/?utm=x#contexto')).toBe('/en/work/analisis-reuniones/');
  });

  it('una ruta desconocida cae en la home del otro idioma', () => {
    expect(altLangPath('/algo/')).toBe('/en/');
    expect(altLangPath('/en/algo/')).toBe('/');
  });
});

describe('contacto', () => {
  it('el mailto lleva el asunto del idioma', () => {
    expect(mailtoHref('es')).toBe('mailto:villarrealtomas@hotmail.com?subject=Consulta%20desde%20el%20portfolio');
    expect(mailtoHref('en')).toBe('mailto:villarrealtomas@hotmail.com?subject=Inquiry%20from%20your%20portfolio');
  });

  it('el CV es el del idioma', () => {
    expect(cvHref('es')).toBe('/cv/Villarreal-Tomas-CV-ES.pdf');
    expect(cvHref('en')).toBe('/cv/Villarreal-Tomas-CV-EN.pdf');
  });
});

describe('diccionarios', () => {
  it('el contador concuerda en número', () => {
    expect(t('es').services.count(3)).toBe('3 proyectos lo respaldan');
    expect(t('es').services.count(1)).toBe('1 proyecto lo respalda');
    expect(t('en').services.count(5)).toBe('5 projects back it up');
    expect(t('en').services.count(1)).toBe('1 project backs it up');
  });

  it('cada lista del panel nombra exactamente los proyectos conectados al servicio', () => {
    for (const lang of LANGS) {
      for (const s of services) {
        const listed = t(lang).services.items[s.id].panel.items.map((i) => i.slug).sort();
        const linked = s.to.map((p) => projects.find((x) => x.id === p)!.slug).sort();
        expect(listed, `${lang} ${s.id}`).toEqual(linked);
        expect(listed).toHaveLength(supportCount(s.id));
      }
    }
  });

  it('el titular de la home es el de la spec', () => {
    const h = t('es').hero;
    expect(`${h.titleBefore} ${h.titleAccent} ${h.titleAfter}`).toBe(
      'Desarrollo full stack e integraciones de IA para negocios.',
    );
  });

  it('los anchors de la nav son únicos por idioma', () => {
    for (const lang of LANGS) {
      const ids = Object.values(t(lang).ids);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });
});
