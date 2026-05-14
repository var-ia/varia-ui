import type { EvidenceEvent } from "../types.js";

export type ExportFormat = "json" | "jsonl" | "csv";

export class TimelineExport {
  private container: HTMLElement;
  private events: EvidenceEvent[] = [];

  constructor(container: HTMLElement) {
    this.container = container;
    this.render();
  }

  setData(events: EvidenceEvent[]): void {
    this.events = events;
  }

  private render(): void {
    this.container.innerHTML = "";

    const jsonBtn = document.createElement("button");
    jsonBtn.className = "export-btn";
    jsonBtn.textContent = "Export JSON";
    jsonBtn.addEventListener("click", () => this.export("json"));

    const jsonlBtn = document.createElement("button");
    jsonlBtn.className = "export-btn";
    jsonlBtn.textContent = "Export JSONL";
    jsonlBtn.addEventListener("click", () => this.export("jsonl"));

    const csvBtn = document.createElement("button");
    csvBtn.className = "export-btn";
    csvBtn.textContent = "Export CSV";
    csvBtn.addEventListener("click", () => this.export("csv"));

    this.container.appendChild(jsonBtn);
    this.container.appendChild(jsonlBtn);
    this.container.appendChild(csvBtn);
  }

  private export(format: ExportFormat): void {
    if (this.events.length === 0) {
      alert("No data to export. Upload a JSONL file first.");
      return;
    }

    let content: string;
    let mimeType: string;
    let extension: string;

    switch (format) {
      case "json":
        content = JSON.stringify(this.events, null, 2);
        mimeType = "application/json";
        extension = "json";
        break;
      case "jsonl":
        content = this.events.map((e) => JSON.stringify(e)).join("\n");
        mimeType = "application/jsonl";
        extension = "jsonl";
        break;
      case "csv": {
        const headers = [
          "eventType", "timestamp", "section", "fromRevisionId", "toRevisionId",
          "claimId", "layer", "before", "after",
        ];
        const rows = this.events.map((e) =>
          headers
              .map((h) => {
              const val = (e as unknown as Record<string, unknown>)[h];
              if (val === undefined || val === null) return "";
              const str = String(val);
              return str.includes(",") || str.includes('"') || str.includes("\n")
                ? `"${str.replace(/"/g, '""')}"`
                : str;
            })
            .join(",")
        );
        content = [headers.join(","), ...rows].join("\n");
        mimeType = "text/csv";
        extension = "csv";
        break;
      }
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `varia-timeline.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}
