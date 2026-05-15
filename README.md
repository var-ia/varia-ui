# varia-ui

Standalone visualization for the [Sequent](https://github.com/var-ia/var-ia) observation engine.

Web app (vanilla TS + Vite) that loads JSONL event data compatible with `@var-ia/evidence-graph` and renders timelines, diffs, citation graphs, and event-type breakdowns.

## Usage

```bash
bun install
bun run dev
```

Open `http://localhost:5173`. Sample data loads automatically. Drag a JSONL file onto the upload zone to inspect your own data.

## Stack

- Vite + vanilla TypeScript
- No framework dependencies
- DOM-based rendering with CSS custom properties

---

[Sequent Engine](https://github.com/var-ia/var-ia) · [Docs](https://var-ia.github.io/varia-docs/) · [npm](https://www.npmjs.com/org/var-ia)
