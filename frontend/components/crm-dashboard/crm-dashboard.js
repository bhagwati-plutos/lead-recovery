import { getComponentTemplates } from '../../js/lib/components/loader.js';

class CrmDashboard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  async connectedCallback() {
    const templates = await getComponentTemplates('crm-dashboard');
    const templateNode = document.createElement('template');
    templateNode.innerHTML = `<style>${templates.style}</style>${templates.template}`;
    this.shadowRoot.appendChild(templateNode.content.cloneNode(true));
  }
}

if (!window.customElements.get('crm-dashboard')) {
  window.customElements.define('crm-dashboard', CrmDashboard);
}
