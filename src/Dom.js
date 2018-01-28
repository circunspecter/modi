export default {

  container: document.body,

  /**
   * Converts html string into elements.
   * @param {string} html HTML content.
   * @return {HTMLCollection} Elements collection.
   */
  stringToElements(html) {
    let element = document.createElement('div');

    element.innerHTML = html;
    return element.children;
  },

  /**
   * Append elements to DOM.
   * @param {Array} elements Elements collection.
   * @param {Element} container Element container.
   * @return {Array|undefined} Elements collection.
   */
  appendElements(elements, container = this.container) {
    if (this.isElement(container)) {
      let elementsCopy = Array.from(elements);
      let fragment = document.createDocumentFragment();

      Array.from(elements).forEach((element) => {
        fragment.appendChild(element);
      });
      container.appendChild(fragment);
      return elementsCopy;
    }
  },

  /**
   * Append HTML string to DOM.
   * @param {string} html HTML content.
   * @param {Element} container Element container.
   * @return {Array|undefined} Elements collection.
   */
  appendHtml(html, container) {
    return this.appendElements(this.stringToElements(html), container);
  },

  /**
   * Get elements by attr selector.
   * @param {string} selector Selector.
   * @param {Element} container Element container.
   * @return {NodeList|undefined}
   */
  getByAttr(selector, container = this.container) {
    if (this.isElement(container)) {
      return container.querySelectorAll(selector);
    }
  },

  /**
   * Get element siblings.
   * @param {Element} element Element.
   * @return {array} Siblings.
   */
  getSiblings(element) {
    return this.isElement(element) ?
      Array.from(element.parentNode.children).filter(sibling => element.isEqualNode(sibling) === false) :
      [];
  },

  /**
   * Checks for an element node.
   * @param {Element} element Element.
   * @return {boolean}
   */
  isElement(element) {
    return element !== null &&
      typeof element === 'object' &&
      element.nodeType === Node.ELEMENT_NODE;
  },

  get style() {
    return {
      parent: this,

      /**
       * Set style property.
       * @param {Element} element Element.
       * @param {DOMString} property Style property.
       * @param {DOMString} value Property value.
       */
      set(element, property, value) {
        if (this.parent.isElement(element)) {
          element.style.setProperty(property, value);
        }
      },

      /**
       * Remove style property.
       * @param {Element} element Element.
       * @param {DOMString} property Style property.
       */
      remove(element, property) {
        if (this.parent.isElement(element)) {
          element.style.removeProperty(property);
        }
      }
    };
  },

  get event() {
    return {
      parent: this,

      /**
       * Dispatch custom envent.
       * @param {Element} element Target element.
       * @param {string} name Event name.
       * @param {object} data Event detail data.
       */
      dispatch(element, name, data) {
        if (this.parent.isElement(element)) {
          element.dispatchEvent(new CustomEvent(name, {
            detail: data
          }));
        }
      }
    };
  },

  get data() {
    return {
      parent: this,

      /**
       * Get data attribute.
       * @param {Element} element Element.
       * @param {string} name Attribute.
       * @return {string|undefined}
       */
      get(element, name) {
        if (this.parent.isElement(element)) {
          return element.dataset[name];
        }
      },

      /**
       * Set data attribute.
       * @param {Element} element Element.
       * @param {string} name Attribute.
       * @param {string} value Value.
       */
      set(element, name, value) {
        if (this.parent.isElement(element)) {
          element.dataset[name] = value;
        }
      }
    };
  }
};
