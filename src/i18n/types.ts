import type { ProjectId, ServiceId, TechId, WorkSlug } from '../data/graph';

export type Lang = 'es' | 'en';

export interface PanelItem { name: string; meta: string; slug: WorkSlug }

export interface Dict {
  htmlLang: string;
  ogLocale: string;
  meta: { title: string; description: string };
  mailSubject: string;
  nav: {
    label: string; skip: string;
    home: string; services: string; work: string; about: string; contact: string;
    available: string; theme: string; otherLang: string; otherLangLabel: string;
  };
  ids: { home: string; services: string; work: string; about: string; contact: string };
  hero: {
    kicker: string; titleBefore: string; titleAccent: string; titleAfter: string;
    sub: string; write: string; cv: string; facts: { k: string; v: string }[];
  };
  services: {
    n: string; title: string; lead: string; count: (n: number) => string;
    colServices: string; colProjects: string; colTechs: string; hint: string;
    caseCta: string; projectKicker: string; projectCta: string; techKicker: string; techBody: string;
    items: Record<ServiceId, {
      title: string; desc: string; node: string;
      panel: { k: string; h: string; p: string; items: PanelItem[] };
    }>;
    projects: Record<ProjectId, { name: string; sub: string }>;
    techs: Record<TechId, string>;
  };
  work: { n: string; title: string; lead: string; see: string };
  /** Los párrafos pueden traer <b>; se renderizan con set:html (texto propio, no de usuarios). */
  about: { n: string; title: string; paragraphs: string[]; facts: { k: string; v: string }[] };
  contact: { title: string; replies: string; also: string; and: string };
  footer: { sign: string; source: string };
  project: { back: string; prev: string; next: string; stack: string; gallery: string; video: string; pager: string; ctaTitle: string };
}
