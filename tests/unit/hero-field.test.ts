import { describe, expect, it } from 'vitest';
import { breathe, FIELD, layoutField, lens, ring, step } from '../../src/scripts/hero-field';

describe('layoutField', () => {
  it('grilla centrada y determinística', () => {
    const a = layoutField(480, 600);
    expect(a.cols).toBe(24);
    expect(a.rows).toBe(30);
    expect(a.dots).toHaveLength(25 * 31);
    expect(layoutField(480, 600)).toEqual(a);
    expect(a.dots[1].x - a.dots[0].x).toBe(FIELD.spacing);
  });

  it('el peso es máximo cerca del centro y nulo en el borde izquierdo', () => {
    const { cols, dots } = layoutField(480, 600);
    const at = (i: number, j: number) => dots[j * (cols + 1) + i];
    const center = at(14, 15);
    expect(center.w).toBeGreaterThan(0.8);
    expect(at(0, 15).w).toBe(0);
    expect(at(14, 0).w).toBeLessThan(0.05);
    expect(dots.every((d) => d.w >= 0 && d.w <= 1)).toBe(true);
  });

  it('una caja vacía no rompe', () => {
    expect(layoutField(0, 0).dots).toHaveLength(1);
  });
});

describe('lente', () => {
  it('aparta el punto del cursor y lo enciende, más cuanto más cerca', () => {
    const near = lens({ x: 110, y: 100 }, { x: 100, y: 100 });
    const far = lens({ x: 180, y: 100 }, { x: 100, y: 100 });
    expect(near.dx).toBeGreaterThan(0);
    expect(near.dy).toBe(0);
    expect(near.g).toBeGreaterThan(far.g);
    expect(near.dx).toBeGreaterThan(far.dx);
  });

  it('fuera del radio o sin cursor no hace nada', () => {
    expect(lens({ x: 100 + FIELD.lensRadius, y: 100 }, { x: 100, y: 100 })).toEqual({ dx: 0, dy: 0, g: 0 });
    expect(lens({ x: 1, y: 1 }, null)).toEqual({ dx: 0, dy: 0, g: 0 });
  });
});

describe('anillo', () => {
  it('enciende los puntos que alcanza el frente y se apaga al terminar', () => {
    const r = { x: 0, y: 0, t: 0 };
    const half = FIELD.ringMs / 2;
    const front = (half / FIELD.ringMs) * FIELD.ringReach;
    expect(ring({ x: front, y: 0 }, r, half).g).toBeGreaterThan(0.4);
    expect(ring({ x: front + FIELD.ringWidth * 2, y: 0 }, r, half).g).toBe(0);
    expect(ring({ x: front, y: 0 }, r, FIELD.ringMs).g).toBe(0);
    expect(ring({ x: 10, y: 0 }, r, -1).g).toBe(0);
  });
});

describe('step', () => {
  it('sin cursor ni anillos el campo queda quieto', () => {
    const f = layoutField(200, 200);
    expect(step(f, null, [], 0)).toBe(false);
    expect(f.dots.every((d) => d.dx === 0 && d.dy === 0 && d.glow === 0)).toBe(true);
  });

  it('con el cursor los puntos cercanos se mueven y al soltarlo vuelven', () => {
    const f = layoutField(200, 200);
    const target = f.dots[Math.floor(f.dots.length / 2)];
    const cursor = { x: target.x - 20, y: target.y };
    for (let i = 0; i < 60; i++) step(f, cursor, [], 0);
    expect(target.dx).toBeGreaterThan(1);
    expect(target.glow).toBeGreaterThan(0.2);
    let busy = true;
    for (let i = 0; i < 200 && busy; i++) busy = step(f, null, [], 0);
    expect(busy).toBe(false);
    expect(Math.abs(target.dx)).toBeLessThan(0.1);
  });
});

describe('breathe', () => {
  it('oscila entre .5 y 1', () => {
    for (let t = 0; t < 20; t += 0.7) {
      const b = breathe(t, 37, 91);
      expect(b).toBeGreaterThanOrEqual(0.5);
      expect(b).toBeLessThanOrEqual(1);
    }
  });
});
