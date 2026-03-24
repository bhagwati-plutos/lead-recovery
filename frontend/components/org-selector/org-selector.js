class OrgSelector extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.activeIndex = -1;

    // Bind methods
    this._toggleDropdown = this._toggleDropdown.bind(this);
    this._handleDocumentClick = this._handleDocumentClick.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
    this._handleFilter = this._handleFilter.bind(this);
  }

  async connectedCallback() {
    // Load template and styles
    const template = await fetch('components/org-selector/org-selector.html');
    const style = await fetch('components/org-selector/org-selector.css');
    this.shadowRoot.innerHTML = `
      <style>${await style.text()}</style>
      ${await template.text()}
    `;
    
    // After loading, query for elements within the shadow DOM
    this._postRender();
  }
  
  disconnectedCallback() {
    // Clean up global event listeners
    document.removeEventListener("click", this._handleDocumentClick);
    this.trigger.removeEventListener("click", this._toggleDropdown);
    this.input.removeEventListener("keydown", this._handleKeyDown);
    this.input.removeEventListener("input", this._handleFilter);
  }

  _postRender() {
    // Get references to all the necessary elements
    this.pill = this.shadowRoot.querySelector(".resource-pill");
    this.trigger = this.pill.querySelector(".selector-trigger");
    this.input = this.pill.querySelector(".selector-search");
    this.options = Array.from(this.pill.querySelectorAll(".selector-option"));
    this.selectedText = this.pill.querySelector(".selector-selected");
    this.emptyState = this.pill.querySelector(".empty-state");

    // Add event listeners
    this.trigger.addEventListener("click", this._toggleDropdown);
    document.addEventListener("click", this._handleDocumentClick);
    this.input.addEventListener("keydown", this._handleKeyDown);
    this.input.addEventListener("input", this._handleFilter);

    this.options.forEach(opt => {
      opt.addEventListener("click", (e) => {
        if (e.target.closest(".edit-btn")) return;
        this._select(opt);
      });
    });

    this.pill.querySelectorAll(".edit-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        alert("Go to edit page");
      });
    });
    
    // Initialize icons
    if (window.lucide) {
      window.lucide.createIcons({
        root: this.shadowRoot
      });
    }
  }

  _toggleDropdown() {
    this.pill.dataset.state === "open" ? this._closeDropdown() : this._openDropdown();
  }
  
  _openDropdown() {
    this.pill.dataset.state = "open";
    this.trigger.setAttribute("aria-expanded", "true");
    this.input.value = "";
    this._filter("");
    this._setActive(0);
    this.input.focus();
  }

  _closeDropdown() {
    this.pill.dataset.state = "closed";
    this.trigger.setAttribute("aria-expanded", "false");
    this.activeIndex = -1;
  }
  
  _handleDocumentClick(e) {
    if (!this.contains(e.target)) this._closeDropdown();
  }

  _fuzzyMatch(text, query) {
    text = text.toLowerCase();
    query = query.toLowerCase();
    let t = 0, q = 0;
    while (t < text.length && q < query.length) {
      if (text[t] === query[q]) q++;
      t++;
    }
    return q === query.length;
  }

  _filter(query) {
    let visible = [];
    this.options.forEach((opt, i) => {
      const match = this._fuzzyMatch(opt.innerText, query);
      opt.style.display = match ? "flex" : "none";
      if (match) visible.push(i);
    });
    this.emptyState.style.display = visible.length ? "none" : "block";
    this._setActive(visible[0] ?? -1);
  }

  _setActive(index) {
    this.options.forEach(o => o.classList.remove("active"));
    if (index >= 0 && this.options[index]?.style.display !== "none") {
      this.activeIndex = index;
      this.options[index].classList.add("active");
      this.options[index].scrollIntoView({ block: "nearest" });
    }
  }

  _handleKeyDown(e) {
    const visible = this.options.filter(o => o.style.display !== "none");
    if (!visible.length) return;

    let i = visible.indexOf(this.options[this.activeIndex]);

    if (e.key === "ArrowDown") {
      e.preventDefault();
      i = (i + 1) % visible.length;
      this._setActive(this.options.indexOf(visible[i]));
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      i = (i - 1 + visible.length) % visible.length;
      this._setActive(this.options.indexOf(visible[i]));
    }

    if (e.key === "Enter") {
      e.preventDefault();
      if (this.activeIndex >= 0) this._select(this.options[this.activeIndex]);
    }

    if (e.key === "Escape") {
      this._closeDropdown();
    }
  }

  _handleFilter(e) {
    this._filter(e.target.value);
  }

  _select(option) {
    this.selectedText.textContent = option.querySelector("span").textContent;
    this._closeDropdown();
  }
}

customElements.define('org-selector', OrgSelector);
