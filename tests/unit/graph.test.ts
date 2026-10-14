import { describe, expect, it } from 'vitest';
import {
  WORK_SLUGS, services, projects, techIds, edges, supportCount, activeSet, isEdgeActive, DEFAULT_SERVICE,
  type NodeId,
} from '../../src/data/graph';

const sorted = (s: Set<string>) => [...s].sort();

describe('grafo', () => {
  it('tiene las aristas de la spec (33 en total)', () => {
    expect(edges()).toHaveLength(33);
    expect(services.map((s) => s.to)).toEqual([
      ['p1', 'p2', 'p5'], ['p3', 'p5'], ['p3', 'p4', 'p5', 'p7', 'p8'], ['p5', 'p8'],
    ]);
    expect(projects.map((p) => p.to)).toEqual([
      ['t1', 't5', 't6'], ['t1', 't2', 't3'], ['t1', 't4', 't5'], ['t5', 't6'],
      ['t1', 't4', 't6', 't7'], ['t5', 't6'], ['t6', 't7'], ['t6', 't7'],
    ]);
  });

  it('todas las aristas apuntan a nodos existentes', () => {
    const ids = new Set<string>([...services.map((s) => s.id), ...projects.map((p) => p.id), ...techIds]);
    for (const [a, b] of edges()) {
      expect(ids.has(a)).toBe(true);
      expect(ids.has(b)).toBe(true);
    }
  });

  it('los proyectos siguen el orden de la sección Trabajo', () => {
    expect(projects.map((p) => p.slug)).toEqual([...WORK_SLUGS]);
  });

  it('los contadores de las tarjetas salen del grafo: 3, 2, 5, 2', () => {
    expect(services.map((s) => supportCount(s.id))).toEqual([3, 2, 5, 2]);
  });

  it('el servicio por defecto es A', () => {
    expect(DEFAULT_SERVICE).toBe('s1');
  });

  it('un servicio ilumina sus proyectos y las tecnologías de esos proyectos', () => {
    expect(sorted(activeSet('s1'))).toEqual(
      ['p1', 'p2', 'p5', 's1', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
    );
    expect(sorted(activeSet('s2'))).toEqual(['p3', 'p5', 's2', 't1', 't4', 't5', 't6', 't7']);
  });

  it('un proyecto ilumina sus tecnologías y los servicios que respalda', () => {
    expect(sorted(activeSet('p3'))).toEqual(['p3', 's2', 's3', 't1', 't4', 't5']);
    expect(sorted(activeSet('p6'))).toEqual(['p6', 't5', 't6']);
  });

  it('una tecnología ilumina los proyectos que la usan', () => {
    expect(sorted(activeSet('t2'))).toEqual(['p2', 't2']);
    expect(sorted(activeSet('t7'))).toEqual(['p5', 'p7', 'p8', 't7']);
  });

  it('una arista está activa solo si sus dos extremos lo están', () => {
    const set = activeSet('s1');
    expect(isEdgeActive(['s1', 'p1'], set)).toBe(true);
    expect(isEdgeActive(['p5', 't4'], set)).toBe(true);
    expect(isEdgeActive(['s3', 'p5'], set)).toBe(false);
    expect(isEdgeActive(['p3', 't1'] as [NodeId, NodeId], set)).toBe(false);
  });
});
