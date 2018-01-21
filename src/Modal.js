import Dom from './Dom';
import Template from './Template';
import templateDefaultConfig from './templates/default/config.js';

const overlay = 'overlay';
const modal = 'modal';
const close = 'close';
const content = 'content';

export default class {
  constructor(config, initialize) {
    config = config || {};

    // Modal config
    this.config = Object.assign({
      container: document.body,
      content: null,
      template: null,
      data: Object.assign({}, config.data)
    }, config);

    // Template
    this.template = new Template(this.config.template || templateDefaultConfig, this.config.data);

    // Dom config
    Dom.container = this.config.container;

    // Storage of modal elements
    this.elements = [];
    this.references = {};
    // Storage of modal listeners
    this.listeners = [];

    if (initialize !== false) {
      this.create(this.config.content);
    }
  }

  /**
   * Get modal content.
   * @return {string|undefined}
   */
  get content() {
    return this.element(content) ?
      this.element(content).innerHTML :
      undefined;
  }

  /**
   * Set modal content.
   * @param {string} contents Modal new content.
   */
  set content(contents) {
    if (contents && this.element(content)) {
      this.element(content).innerHTML = contents;
    }
  }

  /**
   * Show modal.
   * @param {string} contents Modal content.
   * @param {boolean} runDefault "true" runs default method, "false" the template's one.
   */
  show(contents, runDefault) {
    this.setVisible(true, runDefault, contents);
  }

  /**
   * Hide modal.
   * @param {boolean} runDefault "true" runs default method, "false" the template's one.
   */
  hide(runDefault) {
    this.setVisible(false, runDefault);
  }

  /**
   * Show modal.
   * @param {boolean} visible Visible state.
   * @param {boolean} runDefault "true" runs default method, "false" the template's one.
   * @param {string} contents Modal content.
   */
  setVisible(visible, runDefault, contents) {
    if (this.elements.length) {
      let action = (visible === true) ? 'show' : 'hide';
      // By default, try to run template's method
      if (runDefault !== true && this.template.methods[action]) {
        if (action === 'show') {
          this.template.methods.show(contents, this);
        } else {
          this.template.methods.hide(this);
        }
      } else if (visible !== this.isVisible()) {
        if (action === 'show' && contents) {
          this.content = contents;
        }
        this.setFlags(visible);
        this.dispatchEvent(this.element(modal), `modal:${action}`);
      }
    }
  }

  /**
   * Relocate modal.
   */
  relocate() {
    if (this.isVisible()) {
      this.setFlags();
      this.dispatchEvent(this.element(modal), 'modal:relocate');
    }
  }

  /**
   * Create modal.
   * @param {string} contents Modal content.
   */
  create(contents) {
    if (!this.elements.length) {
      // Append modal and store its elements.
      this.elements = Dom.appendHtml(this.template.render());

      // Store instance reference inside parent template elements
      this.elements.forEach((element) => {
        Object.defineProperty(element, '_Modi', { value: this });
      });

      // Set content
      this.content = contents || '';

      // Close element handler
      if (this.element(close)) {
        this.addListener(this.element(close), 'click', () => {
          this.hide();
        });
      }

      // Overlay close handler
      if (Dom.data.get(this.element(overlay), 'outsideClose') === 'true') {
        this.addListener(this.element(overlay), 'click', (e) => {
          if (e.target.dataset.element === 'overlay') {
            this.hide();
          }
        });
      }

      // Window resize handler for modal relocation
      this.resizeTimer = null;
      this.addListener(window, 'resize', () => {
        clearTimeout(this.resizeTimer);
        this.resizeTimer = setTimeout(() => {
          this.relocate();
        }, 300);
      });

      // Template events
      if (this.template.hasEvents()) {
        // Add listeners to dispatch custom events
        this.template.events.forEach((ev) => {
          let element = Dom.getByAttr(ev.selector, this.element(modal))[0];

          if (element) {
            this.addListener(element, ev.type, () => {
              // Check for custom element dispatcher
              if (['overlay', 'modal'].indexOf(ev.dispatcher) !== -1) {
                element = this.element(ev.dispatcher);
              }
              this.dispatchEvent(element, ev.name);
            });
          }
        });
      }
    }
  }

  /**
   * Remove modal.
   */
  remove() {
    this.hide();
    // Remove listeners.
    this.listeners.forEach((listener) => {
      listener.element.removeEventListener(listener.type, listener.listener);
    });
    // Remove elements from DOM.
    this.elements.forEach((element) => {
      Dom.container.removeChild(element);
    });
    // Clean modal elements references
    this.elements = [];
    this.references = {};
  }

  /**
   * Check if the modal is visible.
   */
  isVisible() {
    return (Dom.data.get(this.element(modal), 'visible') === 'true');
  }

  /**
   * Searches the specified element.
   * @param {string} name Element name.
   * @return {Element|undefined}
   */
  element(name) {
    if (!this.references[name]) {
      this.references[name] =
        // Search it inside the "parents" collection.
        this.elements.filter((el) => el.dataset.element === name)[0] ||
        // Search it inside each "parent" element.
        this.elements.map((el) => this.getSubElement(name, el))[0] ||
        // Search it inside the body.
        this.getSubElement(name, Dom.container);
    }
    return this.references[name];
  }

  /**
   * Searches the specified element inside a parent.
   * @param {string} name Element name.
   * @param {Element} parent Parent element.
   * @return {Element|undefined}
   */
  getSubElement(name, parent) {
    return Dom.getByAttr(`[data-element="${name}"]`, parent)[0];
  }

  /**
   * Set modal flags.
   */
  setFlags(visible = this.isVisible()) {
    let smallHeight = false;
    let smallWidth = false;

    [overlay, modal].forEach((element) => {
      Dom.data.set(this.element(element), 'visible', visible);
    });
    Dom.data.set(Dom.container, 'modalVisible', visible);

    if (this.element(modal)) {
      smallHeight = window.innerHeight < this.element(modal).offsetHeight;
      smallWidth = parseInt(this.element(modal).dataset.smallWidth || 0, 10);
      smallWidth = (smallWidth > 0 && window.matchMedia(`(max-width: ${smallWidth}px)`).matches);
    }

    [overlay, modal].forEach((element) => {
      Dom.data.set(this.element(element), 'smallHeightFlag', smallHeight);
      Dom.data.set(this.element(element), 'smallWidthFlag', smallWidth);
    });
  }

  /**
   * Adds specified event listener and stores it inside listeners collection.
   * @param {Element} element Target element.
   * @param {string} type Event type.
   * @param {function|EventListener} listener Event handler.
   */
  addListener(element, type, listener) {
    if (element) {
      element.addEventListener(type, listener);
      this.listeners.push({
        element: element,
        type: type,
        listener: listener
      });
    }
  }

  /**
   * Dispatch custom envent.
   * @param {Element} element Target element.
   * @param {string} name Event name.
   * @param {object} detail Event detail data.
   */
  dispatchEvent(element, name, detail) {
    if (element) {
      detail = Object.assign({
        instance: this,
        overlay: this.element(overlay),
        modal: this.element(modal)
      }, detail);

      // Run template's event
      if (this.template.listeners[name]) {
        this.template.listeners[name](detail);
      }

      // Dispatch custom event
      Dom.event.dispatch(element, name, detail);
    }
  }
}
