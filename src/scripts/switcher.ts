export interface Switcher {
  set(id: string): void;
  readonly current: string;
}

/**
 * Crossfade del panel: desvanece, espera `delayMs` y muestra el pedido.
 * Un pedido nuevo cancela el pendiente, así siempre queda el último.
 */
export function createSwitcher(
  initial: string,
  ui: { fadeOut(): void; show(id: string): void },
  delayMs = 220,
): Switcher {
  let current = initial;
  let timer: ReturnType<typeof setTimeout> | null = null;
  return {
    get current() {
      return current;
    },
    set(id) {
      if (id === current) return;
      current = id;
      if (timer) clearTimeout(timer);
      ui.fadeOut();
      timer = setTimeout(() => {
        timer = null;
        ui.show(current);
      }, delayMs);
    },
  };
}
