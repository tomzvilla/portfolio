import { describe, expect, it } from 'vitest';
import {
  bfsDepths, createBodies, EDGES, edgePath, HOME, nearest, nodeRadius, PHYS, step, type Body,
} from '../../src/scripts/hero-physics';

const run = (bodies: Body[], cursor: { x: number; y: number } | null, frames: number) => {
  let moving = true;
  for (let i = 0; i < frames && moving; i++) moving = step(bodies, cursor);
  return moving;
};

describe('composición', () => {
  it('11 nodos en 3·5·3 y 11 aristas, siempre iguales', () => {
    expect(HOME).toHaveLength(11);
    expect(EDGES).toHaveLength(11);
    expect(createBodies()).toEqual(createBodies());
    expect(createBodies().map((b) => [b.x, b.y])).toEqual(HOME.map(([x, y]) => [x, y]));
    expect([0, 3, 7, 8].map(nodeRadius)).toEqual([3.5, 4.5, 4.5, 3.5]);
  });

  it('la curva de una arista sale de las posiciones actuales', () => {
    expect(edgePath(createBodies(), EDGES[0])).toBe('M50,210 C132.5,210 132.5,110 215,110');
  });
});

describe('step', () => {
  it('en reposo y sin cursor no hay movimiento', () => {
    const bodies = createBodies();
    expect(step(bodies, null)).toBe(false);
    expect(bodies.map((b) => [b.x, b.y])).toEqual(HOME.map(([x, y]) => [x, y]));
  });

  it('el cursor cercano atrae al nodo', () => {
    const bodies = createBodies();
    step(bodies, { x: 315, y: 350 });
    expect(bodies[5].x).toBeGreaterThan(215);
    expect(bodies[5].y).toBeCloseTo(350);
  });

  it('un cursor lejos de la red no mueve nada y el loop se detiene', () => {
    const bodies = createBodies();
    expect(step(bodies, { x: -500, y: 300 })).toBe(false);
    expect(bodies.map((b) => [b.x, b.y])).toEqual(HOME.map(([x, y]) => [x, y]));
  });

  it('con el cursor quieto cerca, la red llega al equilibrio y el loop se detiene', () => {
    const bodies = createBodies();
    expect(run(bodies, { x: 260, y: 350 }, 2000)).toBe(false);
    expect(bodies[5].x).toBeGreaterThan(215);
  });

  it('sin cursor, vuelve a su lugar y se detiene', () => {
    const bodies = createBodies();
    run(bodies, { x: 260, y: 350 }, 200);
    expect(run(bodies, null, 2000)).toBe(false);
    bodies.forEach((b) => {
      expect(Math.abs(b.x - b.hx)).toBeLessThan(0.5);
      expect(Math.abs(b.y - b.hy)).toBeLessThan(0.5);
    });
  });
});

describe('nearest', () => {
  it('devuelve el nodo más cercano dentro del radio', () => {
    expect(nearest(createBodies(), { x: 225, y: 352 }, PHYS.hoverRadius)).toBe(5);
  });

  it('devuelve null fuera del radio', () => {
    expect(nearest(createBodies(), { x: -1000, y: -1000 }, PHYS.clickRadius)).toBeNull();
  });
});

describe('bfsDepths', () => {
  it('la onda alcanza toda la red con la profundidad correcta', () => {
    const depth = bfsDepths(0);
    expect(depth).toEqual([0, 4, 6, 1, 1, 3, 5, 7, 2, 2, 6]);
  });
});
