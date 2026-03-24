import { getComponentTemplates } from '../../js/lib/components/loader.js';

class WorkspaceDashboard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  async connectedCallback() {
    const templates = await getComponentTemplates('workspace-dashboard');
    const templateNode = document.createElement('template');
    templateNode.innerHTML = `<style>${templates.style}</style>${templates.template}`;
    this.shadowRoot.appendChild(templateNode.content.cloneNode(true));
  }
}

if (!window.customElements.get('workspace-dashboard')) {
  window.customElements.define('workspace-dashboard', WorkspaceDashboard);
}
