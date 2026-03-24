import { getComponentTemplates } from '../../js/lib/components/loader.js';

class WelcomeSettings extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    // Bind the event handler method to the instance of this class
    this._onHeaderClick = this._onHeaderClick.bind(this);
  }

  /**
   * Called each time the element is added to the document.
   * This is the ideal place to add event listeners and fetch initial data.
   */
  async connectedCallback() {
    // 1. Fetch and apply the component's HTML and CSS using the loader
    const templates = await getComponentTemplates('welcome-settings');
    const templateNode = document.createElement('template');
    templateNode.innerHTML = `<style>${templates.style}</style>${templates.template}`;
    this.shadowRoot.appendChild(templateNode.content.cloneNode(true));

    // 2. Find the h2 element within this component's shadow DOM
    this.headerElement = this.shadowRoot.querySelector('h2');

    // 3. Add a click event listener
    if (this.headerElement) {
      this.headerElement.addEventListener('click', this._onHeaderClick);
    }

    // 4. Load the nested child component
    const childContainer = this.shadowRoot.querySelector('[data-ref="child-container"]');
    if (childContainer) {
      const { load } = await import('../../js/lib/components/loader.js');
      load('sample-child', childContainer);
    }

    // 5. Fetch component-specific data
    this._fetchData();
  }

  /**
   * Called each time the element is removed from the document.
   * This is the ideal place to perform cleanup, like removing event listeners.
   */
  disconnectedCallback() {
    console.log('WelcomeSettings component removed from DOM, cleaning up.');
    // Remove the event listener to prevent memory leaks
    if (this.headerElement) {
      this.headerElement.removeEventListener('click', this._onHeaderClick);
    }
  }

  /**
   * Event handler for the h2 click.
   */
  _onHeaderClick() {
    console.log('Header clicked!');
    alert('You clicked the Welcome Settings header.');
  }

  /**
   * Placeholder method for fetching data for this component.
   */
  async _fetchData() {
    console.log('Fetching data for WelcomeSettings...');
    // Example: Fetching some dummy data
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
      const data = await response.json();
      console.log('Data fetched:', data);
      
      const p = this.shadowRoot.querySelector('p');
      if (p) {
        p.textContent = `Lazy-loaded and data-driven. Fetched title: "${data.title}"`;
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  }
}

customElements.define('welcome-settings', WelcomeSettings);
