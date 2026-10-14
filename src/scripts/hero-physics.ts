import { curve } from './curve';

/** Adorno del hero (spec §7.1): composición fija, física simple. */
export const VIEW = { w: 460, h: 680 } as const;

export const HOME: ReadonlyArray<readonly [number, number]> = [
  [50, 210], [50, 350], [50, 490],
  [215, 110], [215, 230], [215, 350], [215, 470], [215, 590],
  [380, 220], [380, 350], [380, 480],
];

export const EDGES: ReadonlyArray<readonly [number, number]> = [
  [0, 3], [0, 4], [1, 5], [1, 6], [2, 6], [2, 7], [3, 9], [4, 8], [5, 9], [6, 10], [7, 10],
];

export const PHYS = {
  spring: 0.045,
  radius: 190,
  pull: 0.9,
  damping: 0.82,
  hoverRadius: 120,
  clickRadius: 260,
  waveStepMs: 180,
  waveHoldMs: 520,
} as const;

export interface Point { x: number; y: number }
export interface Body { hx: number; hy: number; x: number; y: number; vx: number; vy: number }

export function createBodies(): Body[] {
  return HOME.map(([x, y]) => ({ hx: x, hy: y, x, y, vx: 0, vy: 0 }));
}

export function nodeRadius(i: number): number {
  return i >= 3 && i < 8 ? 4.5 : 3.5;
}

/**
 * Avanza un frame: resorte al origen + atracción al cursor + damping.
 * Devuelve true mientras algún nodo tenga velocidad o fuerza neta apreciable.
 */
export function step(bodies: Body[], cursor: Point | null): boolean {
  let moving = false;
  for (const n of bodies) {
    let ax = (n.hx - n.x) * PHYS.spring;
    let ay = (n.hy - n.y) * PHYS.spring;
    if (cursor) {
      const dx = cursor.x - n.x;
      const dy = cursor.y - n.y;
      const d = Math.hypot(dx, dy);
      if (d < PHYS.radius && d > 1) {
        const f = (1 - d / PHYS.radius) * PHYS.pull;
        ax += (dx / d) * f;
        ay += (dy / d) * f;
      }
    }
    n.vx = (n.vx + ax) * PHYS.damping;
    n.vy = (n.vy + ay) * PHYS.damping;
    n.x += n.vx;
    n.y += n.vy;
    if (Math.abs(n.vx) + Math.abs(n.vy) > 0.02 || Math.abs(ax) + Math.abs(ay) > 0.01) moving = true;
  }
  return moving;
}

export function nearest(bodies: Body[], pt: Point, radius: number): number | null {
  let best: number | null = null;
  let bestD = radius * radius;
  bodies.forEach((n, i) => {
    const dd = (n.x - pt.x) ** 2 + (n.y - pt.y) ** 2;
    if (dd < bestD) {
      bestD = dd;
      best = i;
    }
  });
  return best;
}

export function adjacency(): number[][] {
  const adj: number[][] = HOME.map(() => []);
  for (const [a, b] of EDGES) {
    adj[a].push(b);
    adj[b].push(a);
  }
  return adj;
}

/** Profundidad de cada nodo desde `start` (-1 si no se alcanza). */
export function bfsDepths(start: number, adj: number[][] = adjacency()): number[] {
  const depth = adj.map(() => -1);
  depth[start] = 0;
  const queue = [start];
  while (queue.length) {
    const u = queue.shift()!;
    for (const v of adj[u]) {
      if (depth[v] < 0) {
        depth[v] = depth[u] + 1;
        queue.push(v);
      }
    }
  }
  return depth;
}

export function edgePath(bodies: Body[], [a, b]: readonly [number, number]): string {
  const p = bodies[a];
  const q = bodies[b];
  return curve(p.x, p.y, q.x, q.y);
}
