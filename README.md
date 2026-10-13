# NicoDev · AI portfolio

Bilingual (ES/EN) portfolio of six deployed Python AI projects — RAG, computer vision,
tool-use agents, recommendation and LoRA fine-tuning — with a case study per project,
live demos, and the cross-cutting lessons that came out of building and shipping them.

- **Stack**: [Astro](https://astro.build) 7 · Tailwind CSS v4 · static output
- **i18n**: route-based (`/es/…`, `/en/…`), language button in the header, choice remembered in `localStorage`
- **Live demos**: Gradio apps on Render's free tier. Opening a project page *pre-warms* the
  service (a cold start takes ~70 s) by polling its CORS-enabled `/config`, and the
  "Launch demo" button loads the embed as soon as the server is genuinely up.
- **Content**: all copy lives in [`src/data/`](src/data) (`projects.ts`, `lessons.ts`, `ui.ts`) — one place, both languages.

## Develop

```bash
npm install
npm run dev      # http://localhost:4321/ai-portfolio/
npm run build
```

The contact form uses [Web3Forms](https://web3forms.com). Copy `.env.example` to `.env`
and set `PUBLIC_WEB3FORMS_ACCESS_KEY` (also add it as a repository secret for CI).

## Deploy

Pushing to `main` builds and publishes to GitHub Pages via
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). With a custom domain,
drop `base` from [`astro.config.mjs`](astro.config.mjs) and update `site`.

## Related

- Study deck (54 slides): [NicoDevGod/study-deck](https://github.com/NicoDevGod/study-deck)
- Previous, web-development portfolio: [NicoDevGod/porfolioAstro](https://github.com/NicoDevGod/porfolioAstro)
