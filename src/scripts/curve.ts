const r = (n: number) => Math.round(n * 10) / 10;

/** Curva cúbica horizontal entre dos puntos: ambos controles en el punto medio en x. */
export function curve(x1: number, y1: number, x2: number, y2: number): string {
  const mx = (x1 + x2) / 2;
  return `M${r(x1)},${r(y1)} C${r(mx)},${r(y1)} ${r(mx)},${r(y2)} ${r(x2)},${r(y2)}`;
}
