import type { EvidenceEvent } from "../types.js";

interface SourceChange {
  revisionId: number;
  timestamp: string;
  section: string;
  changeType: string;
  detail: string;
}

export class SourceChangeTable {
  private container: HTMLElement;
  private events: EvidenceEvent[] = [];

  constructor(container: HTMLElement) {
    this.container = container;
  }

  setData(events: EvidenceEvent[]): void {
    this.events = events;
    this.render();
  }

  render(): void {
    this.container.innerHTML = "";

    const title = document.createElement("div");
    title.className = "panel-title";
    title.textContent = "Source Changes";
    this.container.appendChild(title);

    const changes = this.computeChanges();

    if (changes.length === 0) {
      const empty = document.createElement("div");
      empty.style.cssText = "color:var(--text-dim);font-size:0.85rem;padding:1rem 0;";
      empty.textContent = "No source/citation changes found.";
      this.container.appendChild(empty);
      return;
    }

    const table = document.createElement("table");
    table.className = "data-table";

    const thead = document.createElement("thead");
    thead.innerHTML = `
      <tr>
        <th>Rev</th>
        <th>Date</th>
        <th>Type</th>
        <th>Section</th>
        <th>Detail</th>
      </tr>
    `;
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    for (const ch of changes) {
      const tr = document.createElement("tr");
      const ts = new Date(ch.timestamp);
      tr.innerHTML = `
        <td>r${ch.revisionId}</td>
        <td>${ts.toLocaleDateString()}</td>
        <td>${ch.changeType}</td>
        <td>${ch.section}</td>
        <td>${ch.detail}</td>
      `;
      tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    this.container.appendChild(table);
  }

  private computeChanges(): SourceChange[] {
    const citationEvents = this.events.filter(
      (e) =>
        e.eventType === "citation_added" ||
        e.eventType === "citation_removed" ||
        e.eventType === "citation_replaced"
    );

    return citationEvents.map((e) => ({
      revisionId: e.toRevisionId,
      timestamp: e.timestamp,
      section: e.section,
      changeType: e.eventType.replace("citation_", ""),
      detail:
        e.deterministicFacts.length > 0
          ? e.deterministicFacts[0].fact
          : e.eventType,
    }));
  }
}
