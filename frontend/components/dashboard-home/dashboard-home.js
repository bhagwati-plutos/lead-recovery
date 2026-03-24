import { getComponentTemplates } from '../../js/lib/components/loader.js';

class DashboardHome extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  async connectedCallback() {
    const templates = await getComponentTemplates('dashboard-home');
    const templateNode = document.createElement('template');
    templateNode.innerHTML = `<style>${templates.style}</style>${templates.template}`;
    this.shadowRoot.appendChild(templateNode.content.cloneNode(true));
  }
}

if (!window.customElements.get('dashboard-home')) {
  window.customElements.define('dashboard-home', DashboardHome);
}
