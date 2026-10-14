import { describe, expect, it } from 'vitest';
import { curve } from '../../src/scripts/curve';

describe('curve', () => {
  it('pone los dos controles en el punto medio horizontal', () => {
    expect(curve(0, 0, 100, 50)).toBe('M0,0 C50,0 50,50 100,50');
  });

  it('redondea a un decimal', () => {
    expect(curve(0.123, 1.06, 10.55, 2)).toBe('M0.1,1.1 C5.3,1.1 5.3,2 10.6,2');
  });
});
