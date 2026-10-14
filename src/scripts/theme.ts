export const THEME_KEY = 'theme';
export type Theme = 'light' | 'dark';

type ThemeRoot = Pick<HTMLElement, 'getAttribute' | 'setAttribute'>;

/**
 * Script inline del <head>: marca que hay JS (habilita las animaciones de entrada)
 * y aplica el tema antes del primer pintado. Si el bundle no carga (no llega `rv-ready`),
 * a los 3 s quita `js` para que el contenido oculto para animar vuelva a verse.
 * Se inyecta como string: debe ser autocontenido.
 */
export const THEME_INIT = `(function(){var d=document.documentElement;d.classList.add('js');var t=null;try{t=localStorage.getItem('${THEME_KEY}')}catch(e){}if(t!=='light'&&t!=='dark'){t=window.matchMedia&&matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}d.setAttribute('data-theme',t);setTimeout(function(){if(!d.classList.contains('rv-ready'))d.classList.remove('js')},3000)})();`;

export function currentTheme(root: ThemeRoot = document.documentElement): Theme {
  return root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
}

export function applyTheme(
  theme: Theme,
  root: ThemeRoot = document.documentElement,
  storage: Pick<Storage, 'setItem'> | null = safeLocalStorage(),
): void {
  root.setAttribute('data-theme', theme);
  try {
    storage?.setItem(THEME_KEY, theme);
  } catch {
    // Storage bloqueado: el tema igual se aplica en esta visita.
  }
}

function safeLocalStorage(): Storage | null {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}
