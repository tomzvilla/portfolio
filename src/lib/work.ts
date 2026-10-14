import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/types';

export type WorkEntry = CollectionEntry<'work'>;
export interface WorkPageProps { entry: WorkEntry; prev: WorkEntry | null; next: WorkEntry | null }

/** Los ids del loader son "es/hunters-gallery": el slug es la segunda parte. */
export function slugOf(entry: WorkEntry): string {
  return entry.id.split('/')[1];
}

export async function getWork(lang: Lang): Promise<WorkEntry[]> {
  const entries = await getCollection('work', (e) => e.id.startsWith(`${lang}/`));
  return entries.sort((a, b) => a.data.order - b.data.order);
}

export async function workStaticPaths(lang: Lang) {
  const entries = await getWork(lang);
  return entries.map((entry, i) => ({
    params: { slug: slugOf(entry) },
    props: { entry, prev: entries[i - 1] ?? null, next: entries[i + 1] ?? null } satisfies WorkPageProps,
  }));
}
