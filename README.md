# Refract UI

Standalone visualization for the [Refract](https://github.com/refract-org/refract) observation engine.

Web app (vanilla TS + Vite) that loads JSONL event data compatible with `@refract-org/evidence-graph` and renders timelines, diffs, citation graphs, and event-type breakdowns.

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

[Refract Engine](https://github.com/refract-org/refract) · [Docs](https://refract-org.github.io/refract-docs/) · [npm](https://www.npmjs.com/org/refract-org)
