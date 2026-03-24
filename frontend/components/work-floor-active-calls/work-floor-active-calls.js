import { getComponentTemplates } from '../../js/lib/components/loader.js';

class WorkFloorActiveCalls extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  async connectedCallback() {
    const templates = await getComponentTemplates('work-floor-active-calls');
    const templateNode = document.createElement('template');
    templateNode.innerHTML = `<style>${templates.style}</style>${templates.template}`;
    this.shadowRoot.appendChild(templateNode.content.cloneNode(true));
  }
}

if (!window.customElements.get('work-floor-active-calls')) {
  window.customElements.define('work-floor-active-calls', WorkFloorActiveCalls);
}
