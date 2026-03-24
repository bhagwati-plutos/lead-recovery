import { getComponentTemplates } from '../../js/lib/components/loader.js';

class IntegrationsTelephony extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  async connectedCallback() {
    const templates = await getComponentTemplates('integrations-telephony');
    const templateNode = document.createElement('template');
    templateNode.innerHTML = `<style>${templates.style}</style>${templates.template}`;
    this.shadowRoot.appendChild(templateNode.content.cloneNode(true));

    this.shadowRoot.addEventListener('submit', this.handleFormSubmit.bind(this));
    this.loadAllCredentials();
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const service = form.closest('.integration-card').dataset.service;
    if (!service) return;

    const credentials = {};
    const inputs = form.querySelectorAll('[data-credential]');
    inputs.forEach(input => {
      const key = input.dataset.credential;
      credentials[key] = input.value;
    });

    this.saveCredentials(service, credentials);

    const statusEl = this.shadowRoot.querySelector(`.status[data-status="${service}"]`);
    if (statusEl) {
        statusEl.textContent = 'Saved!';
        statusEl.classList.add('configured');
        setTimeout(() => {
            statusEl.textContent = 'Configured';
        }, 2000);
    }
  }

  saveCredentials(service, credentials) {
    try {
      localStorage.setItem(`telephony.${service}.credentials`, JSON.stringify(credentials));
    } catch (error) {
      console.error(`Could not save credentials for ${service}:`, error);
    }
  }

  loadCredentials(service) {
    try {
      const stored = localStorage.getItem(`telephony.${service}.credentials`);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error(`Could not load credentials for ${service}:`, error);
      return null;
    }
  }

  loadAllCredentials() {
    const cards = this.shadowRoot.querySelectorAll('.integration-card');
    cards.forEach(card => {
      const service = card.dataset.service;
      const credentials = this.loadCredentials(service);
      if (credentials) {
        let isConfigured = false;
        Object.entries(credentials).forEach(([key, value]) => {
          const input = card.querySelector(`[data-credential="${key}"]`);
          if (input && value) {
            input.value = value;
            isConfigured = true;
          }
        });

        if (isConfigured) {
          const statusEl = this.shadowRoot.querySelector(`.status[data-status="${service}"]`);
          statusEl.textContent = 'Configured';
          statusEl.classList.add('configured');
        }
      }
    });
  }
}

if (!window.customElements.get('integrations-telephony')) {
  window.customElements.define('integrations-telephony', IntegrationsTelephony);
}
