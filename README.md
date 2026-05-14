# varia-ui

Generic visualization interface for the [Varia](https://github.com/var-ia/var-ia) observation engine.

Standalone web app built with vanilla TypeScript and Vite. Loads JSONL event data (compatible with `@var-ia/evidence-graph`) and renders timeline, diff, citation, and certainty visualizations.

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

Built and maintained by [NextConsensus](https://nextconsensus.com).
