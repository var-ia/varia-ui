import type { EvidenceEvent, DiffLine } from "../types.js";

function computeDiff(before: string, after: string): DiffLine[] {
  const beforeLines = before.split("\n");
  const afterLines = after.split("\n");
  const lines: DiffLine[] = [];
  const maxLen = Math.max(beforeLines.length, afterLines.length);

  for (let i = 0; i < maxLen; i++) {
    const b = beforeLines[i] ?? "";
    const a = afterLines[i] ?? "";

    if (i >= beforeLines.length) {
      lines.push({ type: "added", content: a, lineNumber: i + 1 });
    } else if (i >= afterLines.length) {
      lines.push({ type: "removed", content: b, lineNumber: i + 1 });
    } else if (b === a) {
      lines.push({ type: "unchanged", content: b, lineNumber: i + 1 });
    } else {
      lines.push({ type: "removed", content: b, lineNumber: i + 1 });
      lines.push({ type: "added", content: a, lineNumber: i + 1 });
    }
  }

  return lines;
}

export class DiffView {
  private container: HTMLElement;
  private event: EvidenceEvent | null = null;

  constructor(container: HTMLElement) {
    this.container = container;
    this.renderEmpty();
  }

  showDiff(event: EvidenceEvent): void {
    this.event = event;
    this.render();
  }

  clear(): void {
    this.event = null;
    this.renderEmpty();
  }

  private renderEmpty(): void {
    this.container.innerHTML = "";
    const title = document.createElement("div");
    title.className = "panel-title";
    title.textContent = "Diff Viewer";
    this.container.appendChild(title);

    const hint = document.createElement("div");
    hint.style.cssText = "color:var(--text-dim);font-size:0.85rem;padding:1rem 0;";
    hint.textContent = "Click an event in the timeline to see the diff.";
    this.container.appendChild(hint);
  }

  private render(): void {
    if (!this.event) {
      this.renderEmpty();
      return;
    }

    const event = this.event;
    this.container.innerHTML = "";

    const title = document.createElement("div");
    title.className = "panel-title";
    title.textContent = `Diff · r${event.fromRevisionId} → r${event.toRevisionId}`;
    this.container.appendChild(title);

    const sectionInfo = document.createElement("div");
    sectionInfo.style.cssText = "font-size:0.78rem;color:var(--text-dim);margin-bottom:0.5rem;font-family:var(--font-mono);";
    sectionInfo.textContent = event.section || "(no section)";
    this.container.appendChild(sectionInfo);

    const diffLines = computeDiff(event.before, event.after);

    const diffContainer = document.createElement("div");
    diffContainer.className = "diff-container";

    const beforePane = document.createElement("div");
    beforePane.className = "diff-pane";
    const beforeHeader = document.createElement("div");
    beforeHeader.className = "diff-pane-header";
    beforeHeader.textContent = "Before";
    beforePane.appendChild(beforeHeader);
    const beforeContent = document.createElement("div");
    beforeContent.className = "diff-lines";
    beforePane.appendChild(beforeContent);

    const afterPane = document.createElement("div");
    afterPane.className = "diff-pane";
    const afterHeader = document.createElement("div");
    afterHeader.className = "diff-pane-header";
    afterHeader.textContent = "After";
    afterPane.appendChild(afterHeader);
    const afterContent = document.createElement("div");
    afterContent.className = "diff-lines";
    afterPane.appendChild(afterContent);

    for (const line of diffLines) {
      if (line.type === "added") {
        afterContent.appendChild(createDiffLine(line, "diff-line-added"));
      } else if (line.type === "removed") {
        beforeContent.appendChild(createDiffLine(line, "diff-line-removed"));
      } else {
        beforeContent.appendChild(createDiffLine(line, "diff-line-unchanged"));
        afterContent.appendChild(createDiffLine(line, "diff-line-unchanged"));
      }
    }

    diffContainer.appendChild(beforePane);
    diffContainer.appendChild(afterPane);
    this.container.appendChild(diffContainer);
  }
}

function createDiffLine(line: DiffLine, className: string): HTMLElement {
  const el = document.createElement("div");
  el.className = className;
  el.textContent = line.content || " ";
  return el;
}
