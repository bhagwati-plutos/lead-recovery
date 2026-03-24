import { getComponentTemplates } from '../../js/lib/components/loader.js';

class WorkFloorAgentTraining extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  async connectedCallback() {
    const templates = await getComponentTemplates('work-floor-agent-training');
    const templateNode = document.createElement('template');
    templateNode.innerHTML = `<style>${templates.style}</style>${templates.template}`;
    this.shadowRoot.appendChild(templateNode.content.cloneNode(true));
  }
}

if (!window.customElements.get('work-floor-agent-training')) {
  window.customElements.define('work-floor-agent-training', WorkFloorAgentTraining);
}
