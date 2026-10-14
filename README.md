# Portfolio — Tomás Villarreal

Sitio estático en [Astro 5](https://astro.build), en español (`/`) e inglés (`/en/`).
Spec: `docs/superpowers/specs/2026-10-13-portfolio-redesign-design.md`.

## Comandos

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo en `http://localhost:4321` |
| `npm run build` | Genera `dist/` |
| `npm run preview` | Sirve `dist/` |
| `npm test` | Tests unitarios (lógica de islas, i18n, schema) |
| `npm run test:dist` | Build + tests sobre el HTML generado |
| `npm run check:names` | Falla si aparece un nombre confidencial en `dist/`, `src/` o `public/` |
| `npm run og` | Regenera las imágenes Open Graph |
| `npm run verify` | Todo lo anterior antes de deployar |

`check:names` solo lee texto: no mira dentro de PDFs ni imágenes. Cuando cambien los CV de `public/cv/` o las capturas, revisarlos a mano. La lista de nombres prohibidos está codificada a propósito en `scripts/check-names.mjs` (el repo es público). Si cambia el copy del hero, volver a correr `npm run og`.

## Dónde está cada cosa

- Textos de la home: `src/i18n/es.ts` y `src/i18n/en.ts`.
- Proyectos: `src/content/work/{es,en}/<slug>.md`; capturas en `src/assets/work/<slug>/`.
- Mapa de servicios: `src/data/graph.ts` (ids y aristas).
- Colores: `src/styles/tokens.css` (los componentes solo usan variables).
- Dominio: `SITE` en `src/config.ts`.

## Deploy

Antes de deployar: poner en `SITE` (`src/config.ts`) el dominio real y correr `npm run verify` (canonical, hreflang, og:image, sitemap y robots salen de ahí).

`npm run verify && npm run build` y subir `dist/` (Vercel o Netlify, sin configuración ni variables de entorno).
