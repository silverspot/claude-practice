# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project

A minimal React app scaffolded with Vite (`create-vite`, `react` template). Plain JavaScript (JSX), no TypeScript, no router, no state library.

- React 19, Vite 8 with `@vitejs/plugin-react`
- Linting with `oxlint` (config in `.oxlintrc.json`)
- Node 22+ recommended

## Commands

```bash
npm install        # install dependencies
npm run dev        # start dev server with HMR at http://localhost:5173
npm run build      # production build to dist/
npm run preview    # serve the production build locally
npm run lint       # run oxlint
```

There is no test runner set up yet. If tests are added, prefer Vitest (it shares Vite's config).

## Layout

```
index.html          # HTML entry; loads /src/main.jsx
public/             # static files served as-is from / (e.g. /icons.svg, /favicon.svg)
src/main.jsx        # mounts <App /> into #root inside <StrictMode>
src/App.jsx         # root component
src/App.css         # component styles
src/index.css       # global styles and CSS variables (light/dark)
src/assets/         # images imported from JS (bundled + hashed by Vite)
vite.config.js      # Vite config
```

## Conventions

- Function components and hooks only; one component per file, PascalCase filenames (`MyWidget.jsx`).
- Import assets from `src/assets/` so Vite fingerprints them; use `public/` only for files that must keep a fixed URL.
- Keep global styles in `src/index.css`; component-specific styles next to the component.
- Run `npm run lint` and `npm run build` before committing; both should pass cleanly.
- Don't commit `node_modules/` or `dist/` (already in `.gitignore`).
