export class SchemaViewer {
  private container: HTMLElement;
  private events: Record<string, unknown>[] = [];

  constructor(container: HTMLElement) {
    this.container = container;
    this.render();
  }

  setData(events: Record<string, unknown>[]): void {
    this.events = events;
    this.render();
  }

  render(): void {
    this.container.innerHTML = "";

    const title = document.createElement("div");
    title.className = "panel-title";
    title.textContent = "Event Schema Inspector";
    this.container.appendChild(title);

    if (this.events.length === 0) {
      const empty = document.createElement("div");
      empty.style.cssText = "color:var(--text-dim);font-size:0.85rem;padding:1rem 0;";
      empty.textContent = "Upload data to inspect schema.";
      this.container.appendChild(empty);
      return;
    }

    const keys = this.collectKeys();

    const schema = document.createElement("div");
    schema.className = "schema-viewer";

    const headerEl = document.createElement("div");
    headerEl.style.cssText = "color:var(--text-dim);margin-bottom:0.5rem;font-weight:600;";
    headerEl.textContent = `Schema (${this.events.length} events, ${keys.length} fields)`;
    schema.appendChild(headerEl);

    for (const key of keys) {
      const row = document.createElement("div");
      row.style.cssText = "display:flex;gap:0.5rem;padding:0.15rem 0;";

      const keyName = document.createElement("span");
      keyName.style.cssText = "color:var(--accent);min-width:200px;";
      keyName.textContent = key;
      row.appendChild(keyName);

      const typeInfo = this.getTypeInfo(key);
      const typeName = document.createElement("span");
      typeName.style.cssText = "color:var(--text-dim);min-width:100px;";
      typeName.textContent = typeInfo.type;
      row.appendChild(typeName);

      const presence = document.createElement("span");
      presence.style.cssText = "color:var(--text-dim);";
      presence.textContent = `${typeInfo.presence}% present`;
      row.appendChild(presence);

      schema.appendChild(row);
    }

    this.container.appendChild(schema);
  }

  private collectKeys(): string[] {
    const keySet = new Set<string>();
    for (const event of this.events) {
      for (const key of Object.keys(event)) {
        keySet.add(key);
      }
    }
    const keys = Array.from(keySet);
    keys.sort();
    return keys;
  }

  private getTypeInfo(key: string): { type: string; presence: number } {
    let present = 0;
    const types = new Set<string>();

    for (const event of this.events) {
      if (key in event) {
        present++;
        const val = event[key];
        if (val === null) types.add("null");
        else if (Array.isArray(val)) types.add("array");
        else types.add(typeof val);
      }
    }

    const typeStr = Array.from(types).join(" | ");
    const pct = Math.round((present / this.events.length) * 100);
    return { type: typeStr, presence: pct };
  }
}
