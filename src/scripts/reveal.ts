/** Un único IntersectionObserver para todo `.rv` y `[data-rv]`: agrega `.in` una sola vez. */
export function initReveal(): void {
  document.documentElement.classList.add('rv-ready');
  const els = document.querySelectorAll<HTMLElement>('.rv, [data-rv]');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    },
    { threshold: 0.15 },
  );
  els.forEach((el) => io.observe(el));
}
