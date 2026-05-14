import type { EventType } from "../types.js";

export interface EventFilterOptions {
  container: HTMLElement;
  allTypes: EventType[];
  onChange: (activeTypes: Set<EventType>) => void;
}

export class EventFilter {
  private container: HTMLElement;
  private allTypes: EventType[];
  private activeTypes: Set<EventType>;
  private onChange: (activeTypes: Set<EventType>) => void;

  constructor(opts: EventFilterOptions) {
    this.container = opts.container;
    this.allTypes = opts.allTypes;
    this.activeTypes = new Set(opts.allTypes);
    this.onChange = opts.onChange;
    this.render();
  }

  setTypes(types: EventType[]): void {
    this.allTypes = types;
    this.activeTypes = new Set(types);
    this.render();
  }

  getActiveTypes(): Set<EventType> {
    return this.activeTypes;
  }

  toggleType(type: EventType): void {
    if (this.activeTypes.has(type)) {
      if (this.activeTypes.size > 1) {
        this.activeTypes.delete(type);
      }
    } else {
      this.activeTypes.add(type);
    }
    this.render();
    this.onChange(this.activeTypes);
  }

  selectAll(): void {
    this.activeTypes = new Set(this.allTypes);
    this.render();
    this.onChange(this.activeTypes);
  }

  clearAll(): void {
    this.activeTypes = new Set();
    this.render();
    this.onChange(this.activeTypes);
  }

  render(): void {
    this.container.innerHTML = "";

    const selectAll = document.createElement("button");
    selectAll.textContent = "All";
    selectAll.className = this.activeTypes.size === this.allTypes.length ? "active" : "";
    selectAll.addEventListener("click", () => this.selectAll());
    this.container.appendChild(selectAll);

    const clearBtn = document.createElement("button");
    clearBtn.textContent = "None";
    clearBtn.className = this.activeTypes.size === 0 ? "active" : "";
    clearBtn.addEventListener("click", () => this.clearAll());
    this.container.appendChild(clearBtn);

    for (const type of this.allTypes) {
      const tag = document.createElement("span");
      tag.className = "filter-tag";
      if (this.activeTypes.has(type)) {
        tag.classList.add("active");
      }
      tag.textContent = formatEventTypeShort(type);
      tag.title = formatEventTypeShort(type);
      tag.addEventListener("click", () => this.toggleType(type));
      this.container.appendChild(tag);
    }
  }
}

function formatEventTypeShort(type: EventType): string {
  return type.replace(/_/g, " ");
}
