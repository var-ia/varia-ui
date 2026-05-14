# varia-ui — Agent Instructions

Standalone visualization UI for Varia. Not part of the monorepo — no `@var-ia/*` package imports.

## Commands

```bash
bun run dev      # vite dev server
bun run build    # tsc + vite build
bun run preview  # vite preview
```

## Conventions

- Each component is a class with a `render()` method.
- Components take a container `HTMLElement` and data, manipulate DOM directly.
- No framework. No JSX. No virtual DOM.
- Types mirror `@var-ia/evidence-graph` schemas (defined locally in `src/types.ts`).
- CSS custom properties in `main.css` — no CSS framework.
- Sample data in `public/sample-data.jsonl` — valid `EvidenceEvent` objects.
