import { getComponentTemplates } from '../../js/lib/components/loader.js';

class SampleChild extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  async connectedCallback() {
    const templates = await getComponentTemplates('sample-child');
    const templateNode = document.createElement('template');
    templateNode.innerHTML = `<style>${templates.style}</style>${templates.template}`;
    this.shadowRoot.appendChild(templateNode.content.cloneNode(true));
  }
}

// Define the custom element if it's not already defined
if (!window.customElements.get('sample-child')) {
  window.customElements.define('sample-child', SampleChild);
}
