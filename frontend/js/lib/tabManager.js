/**
 * @module TabManager
 * Manages the state and rendering of the main view's tab bar.
 */
export class TabManager {
  /**
   * @param {HTMLElement} tabsContainer - The DOM element that will contain the tabs.
   */
  constructor(tabsContainer) {
    if (!tabsContainer) {
      throw new Error('TabManager: A container element is required.');
    }
    this.container = tabsContainer;
    this.openTabs = []; // Array to store tab objects, e.g., { id, title, active }
  }

  /**
   * Opens a new tab or switches to an existing one.
   * @param {{id: string, title: string}} tabData - The data for the tab to open.
   */
  openTab({ id, title }) {
    // Deactivate all other tabs first.
    this.openTabs.forEach(tab => tab.active = false);

    let existingTab = this.openTabs.find(tab => tab.id === id);

    if (existingTab) {
      // If tab already exists, just make it active.
      existingTab.active = true;
    } else {
      // Otherwise, add a new tab and make it active.
      this.openTabs.push({ id, title, active: true });
    }
    
    // The component loader should be called by the main script after this.
  }

  /**
   * Sets a tab as active based on its ID.
   * @param {string} id - The ID of the tab to make active.
   */
  setActiveTab(id) {
    const tabExists = this.openTabs.some(tab => tab.id === id);
    if (!tabExists) return;

    this.openTabs.forEach(tab => {
      tab.active = (tab.id === id);
    });
  }

  /**
   * Clears all open tabs.
   */
  clearTabs() {
    this.openTabs = [];
  }

  /**
   * Renders the tab bar UI based on the current state.
   */
  render() {
    // If one or fewer tabs are "open", hide the container.
    if (this.openTabs.length <= 1) {
      this.container.style.display = 'none';
      // Still render the single tab so it exists in the DOM, just hidden
      if (this.openTabs.length === 1) {
        this.container.innerHTML = `<div class="tab active" data-id="${this.openTabs[0].id}">${this.openTabs[0].title}</div>`;
      } else {
        this.container.innerHTML = '';
      }
      return;
    }

    // Otherwise, show the container and render the tabs.
    this.container.style.display = 'flex';
    let html = '';
    this.openTabs.forEach(tab => {
      html += `<div class="tab ${tab.active ? 'active' : ''}" data-id="${tab.id}">${tab.title}</div>`;
    });
    this.container.innerHTML = html;
  }

  /**
   * Returns the currently active tab object.
   * @returns {{id: string, title: string, active: boolean} | undefined}
   */
  getActiveTab() {
    return this.openTabs.find(tab => tab.active);
  }
}
