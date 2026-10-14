/** Mapa de servicios (spec §7.2): solo ids y aristas. Los textos viven en src/i18n. */

export const WORK_SLUGS = [
  'chatbots-eval',
  'asistentes-unc',
  'tramites-vehiculares',
  'validacion-infracciones',
  'hunters-gallery',
  'analisis-reuniones',
  'sistemas-unc',
  'cienciaconecta',
] as const;
export type WorkSlug = (typeof WORK_SLUGS)[number];

export type ServiceId = 's1' | 's2' | 's3' | 's4';
export type ProjectId = 'p1' | 'p2' | 'p3' | 'p4' | 'p5' | 'p6' | 'p7' | 'p8';
export type TechId = 't1' | 't2' | 't3' | 't4' | 't5' | 't6' | 't7';
export type NodeId = ServiceId | ProjectId | TechId;

export interface ServiceNode { id: ServiceId; letter: 'A' | 'B' | 'C' | 'D'; to: ProjectId[] }
export interface ProjectNode { id: ProjectId; slug: WorkSlug; to: TechId[] }

export const services: ServiceNode[] = [
  { id: 's1', letter: 'A', to: ['p1', 'p2', 'p5'] },
  { id: 's2', letter: 'B', to: ['p3', 'p5'] },
  { id: 's3', letter: 'C', to: ['p3', 'p4', 'p5', 'p7', 'p8'] },
  { id: 's4', letter: 'D', to: ['p5', 'p8'] },
];

export const projects: ProjectNode[] = [
  { id: 'p1', slug: 'chatbots-eval', to: ['t1', 't5', 't6'] },
  { id: 'p2', slug: 'asistentes-unc', to: ['t1', 't2', 't3'] },
  { id: 'p3', slug: 'tramites-vehiculares', to: ['t1', 't4', 't5'] },
  { id: 'p4', slug: 'validacion-infracciones', to: ['t5', 't6'] },
  { id: 'p5', slug: 'hunters-gallery', to: ['t1', 't4', 't6', 't7'] },
  { id: 'p6', slug: 'analisis-reuniones', to: ['t5', 't6'] },
  { id: 'p7', slug: 'sistemas-unc', to: ['t6', 't7'] },
  { id: 'p8', slug: 'cienciaconecta', to: ['t6', 't7'] },
];

export const techIds: TechId[] = ['t1', 't2', 't3', 't4', 't5', 't6', 't7'];

export const DEFAULT_SERVICE: ServiceId = 's1';

const outgoing = new Map<NodeId, NodeId[]>([
  ...services.map((s) => [s.id, s.to] as [NodeId, NodeId[]]),
  ...projects.map((p) => [p.id, p.to] as [NodeId, NodeId[]]),
]);

export function targets(id: NodeId): NodeId[] {
  return outgoing.get(id) ?? [];
}

export function sources(id: NodeId): NodeId[] {
  return [...outgoing].filter(([, to]) => to.includes(id)).map(([from]) => from);
}

export function edges(): [NodeId, NodeId][] {
  return [...outgoing].flatMap(([from, to]) => to.map((t) => [from, t] as [NodeId, NodeId]));
}

export function supportCount(id: ServiceId): number {
  return targets(id).length;
}

/** El nodo, lo que alcanza hacia la derecha (dos saltos) y quien lo apunta (un salto). */
export function activeSet(id: NodeId): Set<NodeId> {
  const set = new Set<NodeId>([id]);
  for (const t of targets(id)) {
    set.add(t);
    for (const u of targets(t)) set.add(u);
  }
  for (const s of sources(id)) set.add(s);
  return set;
}

export function isEdgeActive([a, b]: [NodeId, NodeId], set: Set<NodeId>): boolean {
  return set.has(a) && set.has(b);
}
