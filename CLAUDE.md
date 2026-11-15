# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project

A simple to-do list app built with React and Vite (scaffolded from the `create-vite` React template). Plain JavaScript (JSX), no TypeScript, no router, no state library.

Features: add tasks, tick them off, delete them, filter by All / Active / Done, and clear completed tasks. The list is saved to the browser's `localStorage` under the key `todos`, so it survives a reload. There is no backend.

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
public/             # static files served as-is from / (favicon.svg)
src/main.jsx        # mounts <App /> into #root inside <StrictMode>
src/App.jsx         # to-do state, add form, filters, summary, localStorage sync
src/TodoItem.jsx    # one row: checkbox, title, delete button
src/App.css         # to-do app styles
src/index.css       # global styles and colour variables (light/dark)
vite.config.js      # Vite config
```

## Conventions

- Function components and hooks only; one component per file, PascalCase filenames (`MyWidget.jsx`).
- State lives in `App.jsx` and is passed down as props; update it immutably (`map`/`filter`, spread), never by mutating arrays.
- Each to-do is `{ id, title, done }`, with `id` from `crypto.randomUUID()`. If you change this shape, handle lists already saved in `localStorage`.
- Wrap `localStorage` access in try/catch; it can be unavailable (e.g. private browsing).
- Use the colour variables from `src/index.css` (`--text`, `--accent`, ...) rather than hard-coded colours, so dark mode keeps working.
- Put images that JS imports in `src/assets/` so Vite fingerprints them; use `public/` only for files that must keep a fixed URL.
- Keep global styles in `src/index.css`; component-specific styles next to the component.
- Run `npm run lint` and `npm run build` before committing; both should pass cleanly.
- Don't commit `node_modules/` or `dist/` (already in `.gitignore`).
