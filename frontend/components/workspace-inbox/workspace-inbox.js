import { getComponentTemplates } from '../../js/lib/components/loader.js';

class WorkspaceInbox extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  async connectedCallback() {
    const templates = await getComponentTemplates('workspace-inbox');
    const templateNode = document.createElement('template');
    templateNode.innerHTML = `<style>${templates.style}</style>${templates.template}`;
    this.shadowRoot.appendChild(templateNode.content.cloneNode(true));
  }
}

if (!window.customElements.get('workspace-inbox')) {
  window.customElements.define('workspace-inbox', WorkspaceInbox);
}
