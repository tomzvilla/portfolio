/**
 * Adorno del hero: un campo de puntos que retoma la grilla del fondo.
 * Se hace más denso hacia el centro, respira despacio, el cursor es una lente
 * que aparta y enciende los puntos, y un click lanza un anillo.
 * Todo es determinístico: la misma caja da siempre el mismo campo.
 */

export const FIELD = {
  spacing: 20,
  lensRadius: 120,
  lensPush: 14,
  ringMs: 1400,
  ringReach: 320,
  ringWidth: 26,
  ringPush: 8,
  follow: 0.2,
  linkMin: 0.08,
} as const;

export interface Point { x: number; y: number }
export interface Ring extends Point { t: number }
export interface Dot { x: number; y: number; w: number; dx: number; dy: number; glow: number }
export interface Field { cols: number; rows: number; dots: Dot[] }

/** Grilla centrada en la caja; `w` (0–1) es el peso de cada punto: máximo al centro, nulo hacia el texto. */
export function layoutField(width: number, height: number): Field {
  const s = FIELD.spacing;
  const cols = Math.max(0, Math.floor(width / s));
  const rows = Math.max(0, Math.floor(height / s));
  const ox = (width - cols * s) / 2;
  const oy = (height - rows * s) / 2;
  const cx = width * 0.58;
  const cy = height * 0.5;
  const dots: Dot[] = [];
  for (let j = 0; j <= rows; j++) {
    for (let i = 0; i <= cols; i++) {
      const x = ox + i * s;
      const y = oy + j * s;
      const rd = Math.hypot((x - cx) / (width * 0.48), (y - cy) / (height * 0.5));
      const w = Math.max(0, 1 - rd) ** 1.3 * Math.min(1, x / (width * 0.35));
      dots.push({ x, y, w, dx: 0, dy: 0, glow: 0 });
    }
  }
  return { cols, rows, dots };
}

/** Desplazamiento y brillo que la lente del cursor le pide a un punto. */
export function lens(dot: Point, cursor: Point | null): { dx: number; dy: number; g: number } {
  if (!cursor) return { dx: 0, dy: 0, g: 0 };
  const ux = dot.x - cursor.x;
  const uy = dot.y - cursor.y;
  const d = Math.hypot(ux, uy);
  if (d >= FIELD.lensRadius || d < 0.1) return { dx: 0, dy: 0, g: 0 };
  const f = (1 - d / FIELD.lensRadius) ** 2;
  return { dx: (ux / d) * f * FIELD.lensPush, dy: (uy / d) * f * FIELD.lensPush, g: f };
}

/** Lo mismo para un anillo lanzado en `ring.t`, visto en el instante `now` (ms). */
export function ring(dot: Point, r: Ring, now: number): { dx: number; dy: number; g: number } {
  const age = (now - r.t) / FIELD.ringMs;
  if (age < 0 || age >= 1) return { dx: 0, dy: 0, g: 0 };
  const radius = age * FIELD.ringReach;
  const ux = dot.x - r.x;
  const uy = dot.y - r.y;
  const d = Math.hypot(ux, uy) || 1;
  const k = Math.max(0, 1 - Math.abs(d - radius) / FIELD.ringWidth) * (1 - age);
  return { dx: (ux / d) * k * FIELD.ringPush, dy: (uy / d) * k * FIELD.ringPush, g: k };
}

/**
 * Avanza un frame: cada punto sigue suavemente su objetivo (lente + anillos).
 * Devuelve true mientras quede algo en movimiento.
 */
export function step(field: Field, cursor: Point | null, rings: Ring[], now: number): boolean {
  let busy = false;
  for (const p of field.dots) {
    let tx = 0;
    let ty = 0;
    let g = 0;
    const l = lens(p, cursor);
    tx += l.dx;
    ty += l.dy;
    g = Math.max(g, l.g);
    for (const r of rings) {
      const o = ring(p, r, now);
      tx += o.dx;
      ty += o.dy;
      g = Math.max(g, o.g);
    }
    p.dx += (tx - p.dx) * FIELD.follow;
    p.dy += (ty - p.dy) * FIELD.follow;
    p.glow += (g - p.glow) * FIELD.follow;
    if (Math.abs(tx - p.dx) > 0.05 || Math.abs(ty - p.dy) > 0.05 || Math.abs(g - p.glow) > 0.01) busy = true;
  }
  return busy;
}

/** Respiración lenta: factor entre .5 y 1 que viaja en diagonal por el campo. */
export function breathe(t: number, x: number, y: number): number {
  return 0.75 + 0.25 * Math.sin(t * 0.9 - x * 0.018 + y * 0.012);
}
