import { getComponentTemplates } from '../../js/lib/components/loader.js';

class WorkspaceCommunication extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  async connectedCallback() {
    const templates = await getComponentTemplates('workspace-communication');
    const templateNode = document.createElement('template');
    templateNode.innerHTML = `<style>${templates.style}</style>${templates.template}`;
    this.shadowRoot.appendChild(templateNode.content.cloneNode(true));
  }
}

if (!window.customElements.get('workspace-communication')) {
  window.customElements.define('workspace-communication', WorkspaceCommunication);
}
