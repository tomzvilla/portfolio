import { EMAIL } from '../config';
import { en } from './en';
import { es } from './es';
import type { Dict, Lang } from './types';

const dicts: Record<Lang, Dict> = { es, en };

export const LANGS: Lang[] = ['es', 'en'];

export function t(lang: Lang): Dict {
  return dicts[lang];
}

export function otherLang(lang: Lang): Lang {
  return lang === 'es' ? 'en' : 'es';
}

export function homePath(lang: Lang): string {
  return lang === 'es' ? '/' : '/en/';
}

export function workPath(lang: Lang, slug: string): string {
  return lang === 'es' ? `/trabajo/${slug}/` : `/en/work/${slug}/`;
}

export function langFromPath(pathname: string): Lang {
  return /^\/en(\/|$)/.test(pathname) ? 'en' : 'es';
}

/** La misma página en el otro idioma; si la ruta no es conocida, la home del otro idioma. */
export function altLangPath(pathname: string): string {
  const path = pathname.split(/[?#]/)[0];
  const esWork = path.match(/^\/trabajo\/([^/]+)\/?$/);
  if (esWork) return workPath('en', esWork[1]);
  const enWork = path.match(/^\/en\/work\/([^/]+)\/?$/);
  if (enWork) return workPath('es', enWork[1]);
  return homePath(otherLang(langFromPath(path)));
}

export function mailtoHref(lang: Lang): string {
  return `mailto:${EMAIL}?subject=${encodeURIComponent(t(lang).mailSubject)}`;
}

export function cvHref(lang: Lang): string {
  return lang === 'es' ? '/cv/Villarreal-Tomas-CV-ES.pdf' : '/cv/Villarreal-Tomas-CV-EN.pdf';
}
