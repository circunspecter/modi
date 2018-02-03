import Dom from './Dom';
import Template from './Template';
import templateDefaultConfig from './templates/default/config.js';

const overlay = 'overlay';
const modal = 'modal';
const close = 'close';
const content = 'content';

export default class {
  constructor(config = {}, initialize = true) {
    // Modal config
    this.config = Object.assign({
      container: document.body,
      eventsNamespace: 'modal',
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
        let args = [this];
        if (action === 'show') {
          args.unshift(contents);
        }
        this.template.methods[action](...args);
      } else if (visible !== this.isVisible()) {
        if (action === 'show' && contents) {
          this.content = contents;
        }
        this.setFlags(visible);
        this.dispatchEvent(action);
      }
    }
  }

  /**
   * Relocate modal.
   */
  relocate() {
    if (this.isVisible()) {
      this.setFlags();
      this.dispatchEvent('relocate');
    }
  }

  /**
   * Create modal.
   * @param {string} contents Modal content.
   */
  create(contents = '') {
    if (!this.elements.length) {
      // Append modal and store its elements.
      this.elements = Dom.appendHtml(this.template.render());

      // Store instance reference inside parent template elements
      this.elements.forEach((element) => {
        Object.defineProperty(element, '_Modi', { value: this });
      });

      // Set content
      this.content = contents;

      // Close element handler
      if (this.element(close)) {
        this.addListener('click', () => {
          this.hide();
        }, this.element(close));
      }

      // Overlay close handler
      if (Dom.data.get(this.element(overlay), 'outsideClose') === 'true') {
        this.addListener('click', (e) => {
          if (e.target.dataset.element === 'overlay') {
            this.hide();
          }
        }, this.element(overlay));
      }

      // Window resize handler for modal relocation
      this.resizeTimer = null;
      this.addListener('resize', () => {
        clearTimeout(this.resizeTimer);
        this.resizeTimer = setTimeout(() => {
          this.relocate();
        }, 300);
      }, window);

      // Template events
      if (this.template.hasEvents()) {
        // Add listeners to dispatch custom events
        this.template.events.forEach((ev) => {
          let element = this.elements
            .map(parent => Dom.getByAttr(ev.selector, parent)[0])
            .filter(result => Dom.isElement(result))[0];
          if (element) {
            this.addListener(ev.type, () => {
              // Check for custom element dispatcher
              if (ev.dispatcher === 'instance') {
                element = this.elements[0];
              } else if (ev.dispatcher && this.element(ev.dispatcher)) {
                element = this.element(ev.dispatcher);
              }
              this.dispatchEvent(ev.name, {}, element);
            }, element);
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
    // Clean references
    this.listeners = [];
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
        this.elements.map((el) => this.getSubElement(name, el))[0];
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
   * @param {string} type Event type.
   * @param {function|EventListener} listener Event handler.
   * @param {Element} element Target element.
   */
  addListener(type, listener, element = this.elements[0]) {
    if (Dom.isElement(element) || element === window) {
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
   * @param {string} name Event name.
   * @param {object} detail Event detail data.
   * @param {Element} element Target element.
   */
  dispatchEvent(name, detail, element) {
    let nameWithNamespace = `${this.config.eventsNamespace}:${name}`;
    detail = Object.assign({
      instance: this,
      overlay: this.element(overlay),
      modal: this.element(modal)
    }, detail);

    // Run template's event.
    if (this.template.listeners[name]) {
      this.template.listeners[name](detail);
    }

    // Determine target elements.
    let targetElements = [
      [element],
      this.listeners.filter(l => l.type === nameWithNamespace).map(l => l.element),
      [this.elements[0]]
    ].filter(coll => coll.filter(item => Dom.isElement(item)).length)[0];

    if (targetElements && targetElements.length) {
      // Dispatch custom event ignoring repeated targets.
      (new Set(targetElements)).forEach((target) => {
        Dom.event.dispatch(target, nameWithNamespace, detail);
      });
    }
  }
}
