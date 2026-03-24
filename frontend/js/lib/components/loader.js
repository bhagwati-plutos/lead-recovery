/**
 * @module ComponentLoader
 * Manages the loading, caching, and mounting of web components.
 */

// --- CACHING LOGIC ---

// Global cache for component templates (HTML and CSS)
const templateCache = new Map();

// Set of component names that should never be cached
let doNotCache = new Set();

/**
 * Fetches and caches the HTML and CSS templates for a component.
 * This is the core function that components will call to get their templates.
 * It respects the do-not-cache list and caches lazily.
 * @param {string} name - The name of the component.
 * @returns {Promise<{style: string, template: string}>} The templates for the component.
 */
export async function getComponentTemplates(name) {
  const shouldCache = !doNotCache.has(name);

  // If it's already in the cache, return it immediately.
  if (shouldCache && templateCache.has(name)) {
    return templateCache.get(name);
  }

  try {
    // Fetch both templates concurrently for efficiency.
    const [styleResponse, templateResponse] = await Promise.all([
      fetch(`components/${name}/${name}.css`),
      fetch(`components/${name}/${name}.html`)
    ]);

    if (!styleResponse.ok || !templateResponse.ok) {
      throw new Error(`Network response was not ok for component '${name}'.`);
    }

    const templates = {
      style: await styleResponse.text(),
      template: await templateResponse.text(),
    };

    // If caching is enabled for this component, store the result.
    if (shouldCache) {
      templateCache.set(name, templates);
    }

    return templates;
  } catch (error) {
    console.error(`Failed to load templates for component '${name}':`, error);
    // Return empty templates to prevent the component from breaking completely.
    return { style: '', template: '<p>Error loading template.</p>' };
  }
}

/**
 * Proactively loads and caches templates for a list of components,
 * typically on application startup.
 * @param {string[]} names - An array of component names to precache.
 */
export async function precacheComponents(names = []) {
  const precacheableNames = names.filter(name => !doNotCache.has(name));
  
  const precachePromises = precacheableNames.map(name => getComponentTemplates(name));

  try {
    await Promise.all(precachePromises);
  } catch (error) {
    console.error("An error occurred during component precaching:", error);
  }
}

/**
 * Configures the caching behavior, such as specifying components that should never be cached.
 * @param {{doNotCache: string[]}} options - Configuration options.
 *   - `doNotCache`: An array of component names to exclude from caching.
 */
export function configureComponentCaching(options = {}) {
  if (options.doNotCache && Array.isArray(options.doNotCache)) {
    doNotCache = new Set(options.doNotCache);
  }
}

// --- EXISTING LOADER LOGIC ---

/**
 * Dynamically loads a component's JS module and mounts it into a target element with a fade transition.
 * Note: This function now relies on the component itself calling `getComponentTemplates`.
 * @param {string} name - The name of the component to load.
 * @param {string|HTMLElement} target - The selector or element to load the component into.
 */
export async function load(name, target) {
  const targetElement = typeof target === 'string' ? document.querySelector(target) : target;
  if (!targetElement) {
    console.error('Loader: Target element not found.');
    return;
  }

  // Do nothing if the same component is already the current child
  if (targetElement.firstElementChild && targetElement.firstElementChild.tagName.toLowerCase() === name) {
    return;
  }

  const oldElement = targetElement.firstElementChild;
  const transitionDuration = 300; // in ms

  // 1. Fade out the old element if it exists
  if (oldElement) {
    oldElement.style.opacity = '0';
    oldElement.style.transition = `opacity ${transitionDuration}ms ease-out`;
    await new Promise(resolve => setTimeout(resolve, transitionDuration));
  }

  // 2. Clear target and load the new component module
  targetElement.innerHTML = '';
  try {
    // The component's JS module must be loaded. The module should then
    // use getComponentTemplates() to fetch its own view.
    await import(`/components/${name}/${name}.js`);
  } catch (error) {
    console.error(`Error loading component module for '${name}':`, error);
    targetElement.innerHTML = '<p>Error loading component.</p>';
    return;
  }
  
  // 3. Create the new element and prepare for fade-in
  const newElement = document.createElement(name);
  newElement.style.opacity = '0';
  newElement.style.transition = `opacity ${transitionDuration}ms ease-in`;
  
  targetElement.appendChild(newElement);

  // 4. Trigger the fade-in after a short delay
  requestAnimationFrame(() => {
    // Use a minimal timeout to allow the browser to paint the new element
    // before starting the transition.
    setTimeout(() => {
      newElement.style.opacity = '1';
      
      // Re-initialize Lucide icons, scoped to the new component.
      if (window.lucide) {
        const iconContext = newElement.shadowRoot || newElement;
        window.lucide.createIcons({ context: iconContext });
      }

    }, 50); // A small delay is sufficient
  });

  // 5. Update the state
  targetElement.dataset.loadedComponent = name;
}

/**
 * Returns an array of component names that are currently in the cache.
 * @returns {string[]} A list of cached component names.
 */
export function getCachedComponentNames() {
  return Array.from(templateCache.keys());
}
