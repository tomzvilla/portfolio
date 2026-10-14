// Genera public/og/og-{es,en}.png a partir del copy del hero. Uso: npm run og
import { mkdirSync } from 'node:fs';
import sharp from 'sharp';
import { AUTHOR } from '../src/config.ts';
import { en } from '../src/i18n/en.ts';
import { es } from '../src/i18n/es.ts';

// Valores de src/styles/tokens.css (modo oscuro).
const C = { bg: '#0F1217', dots: '#1A1F28', text: '#D7DBE3', muted: '#7D8594', strong: '#FFFFFF', amber: '#E0B35C' };
const W = 1200;
const H = 630;
const FS = 64;
const MAX_CHARS = 24;

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function wrap(tokens, max) {
  const lines = [[]];
  let len = 0;
  for (const tk of tokens) {
    if (len > 0 && len + 1 + tk.w.length > max) {
      lines.push([]);
      len = 0;
    }
    len += (len > 0 ? 1 : 0) + tk.w.length;
    lines[lines.length - 1].push(tk);
  }
  return lines;
}

function card(d) {
  const h = d.hero;
  const words = (s) => s.split(' ').filter(Boolean).map((w) => ({ w, accent: false }));
  const tokens = [...words(h.titleBefore), { w: h.titleAccent, accent: true }, ...words(h.titleAfter)];
  const title = wrap(tokens, MAX_CHARS)
    .map((line, i) => {
      const body = line
        .map((tk) => (tk.accent ? `<tspan fill="${C.amber}" font-weight="400">${esc(tk.w)}</tspan>` : esc(tk.w)))
        .join(' ');
      return `<text x="80" y="${250 + i * FS * 1.1}" font-size="${FS}" font-weight="300" fill="${C.strong}" letter-spacing="-1.5">${body}</text>`;
    })
    .join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="${C.dots}"/></pattern>
    <radialGradient id="glow" cx="0.85" cy="0.3" r="0.5">
      <stop offset="0" stop-color="${C.amber}" stop-opacity="0.12"/><stop offset="1" stop-color="${C.amber}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="${C.bg}"/>
  <rect width="100%" height="100%" fill="url(#dots)"/>
  <rect width="100%" height="100%" fill="url(#glow)"/>
  <g font-family="Space Grotesk, Arial, Helvetica, sans-serif">
    <text x="80" y="130" font-family="IBM Plex Mono, Consolas, monospace" font-size="20" fill="${C.muted}" letter-spacing="2">${esc(h.kicker)}</text>
    ${title}
    <text x="80" y="560" font-size="28" font-weight="500" fill="${C.text}">${esc(AUTHOR)}</text>
  </g>
</svg>`;
}

mkdirSync('public/og', { recursive: true });
for (const [lang, d] of [['es', es], ['en', en]]) {
  await sharp(Buffer.from(card(d))).png().toFile(`public/og/og-${lang}.png`);
  console.log(`public/og/og-${lang}.png`);
}
