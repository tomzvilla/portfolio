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

## Dónde está cada cosa

- Textos de la home: `src/i18n/es.ts` y `src/i18n/en.ts`.
- Proyectos: `src/content/work/{es,en}/<slug>.md`; capturas en `src/assets/work/<slug>/`.
- Mapa de servicios: `src/data/graph.ts` (ids y aristas).
- Colores: `src/styles/tokens.css` (los componentes solo usan variables).
- Dominio: `SITE` en `src/config.ts`.

## Deploy

`npm run verify && npm run build` y subir `dist/` (Vercel o Netlify, sin configuración ni variables de entorno).
