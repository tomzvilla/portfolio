import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createSwitcher } from '../../src/scripts/switcher';

describe('createSwitcher', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  const setup = () => {
    const ui = { fadeOut: vi.fn(), show: vi.fn() };
    return { ui, sw: createSwitcher('s1', ui, 220) };
  };

  it('desvanece y muestra el nuevo después del delay', () => {
    const { ui, sw } = setup();
    sw.set('s2');
    expect(ui.fadeOut).toHaveBeenCalledTimes(1);
    expect(ui.show).not.toHaveBeenCalled();
    vi.advanceTimersByTime(220);
    expect(ui.show).toHaveBeenCalledWith('s2');
    expect(sw.current).toBe('s2');
  });

  it('pedir el actual no hace nada', () => {
    const { ui, sw } = setup();
    sw.set('s1');
    vi.advanceTimersByTime(500);
    expect(ui.fadeOut).not.toHaveBeenCalled();
    expect(ui.show).not.toHaveBeenCalled();
  });

  it('cambios rápidos: gana el último y se muestra una sola vez', () => {
    const { ui, sw } = setup();
    sw.set('p1');
    vi.advanceTimersByTime(100);
    sw.set('p2');
    vi.advanceTimersByTime(100);
    sw.set('t3');
    vi.advanceTimersByTime(220);
    expect(ui.show).toHaveBeenCalledTimes(1);
    expect(ui.show).toHaveBeenLastCalledWith('t3');
  });

  it('ir y volver antes de que termine el fade deja el original', () => {
    const { ui, sw } = setup();
    sw.set('p5');
    vi.advanceTimersByTime(50);
    sw.set('s1');
    vi.advanceTimersByTime(220);
    expect(ui.show).toHaveBeenCalledTimes(1);
    expect(ui.show).toHaveBeenLastCalledWith('s1');
  });

  it('con delay 0 (reduced motion) muestra en el próximo tick', () => {
    const ui = { fadeOut: vi.fn(), show: vi.fn() };
    createSwitcher('s1', ui, 0).set('s3');
    vi.advanceTimersByTime(0);
    expect(ui.show).toHaveBeenCalledWith('s3');
  });
});
