import { getComponentTemplates } from '../../js/lib/components/loader.js';

class WorkspacePhone extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  async connectedCallback() {
    const templates = await getComponentTemplates('workspace-phone');
    const templateNode = document.createElement('template');
    templateNode.innerHTML = `<style>${templates.style}</style>${templates.template}`;
    this.shadowRoot.appendChild(templateNode.content.cloneNode(true));
  }
}

if (!window.customElements.get('workspace-phone')) {
  window.customElements.define('workspace-phone', WorkspacePhone);
}
