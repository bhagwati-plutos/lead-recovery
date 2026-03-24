import { getComponentTemplates } from '../../js/lib/components/loader.js';

class WorkFloorWorkforceManagement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  async connectedCallback() {
    const templates = await getComponentTemplates('work-floor-workforce-management');
    const templateNode = document.createElement('template');
    templateNode.innerHTML = `<style>${templates.style}</style>${templates.template}`;
    this.shadowRoot.appendChild(templateNode.content.cloneNode(true));
  }
}

if (!window.customElements.get('work-floor-workforce-management')) {
  window.customElements.define('work-floor-workforce-management', WorkFloorWorkforceManagement);
}
