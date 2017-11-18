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
   * @return {Array} Elements collection.
   */
  appendElements(elements, container) {
    let elementsCopy = [].slice.call(elements);
    let fragment = document.createDocumentFragment();

    Array.from(elements).forEach((element) => {
      fragment.appendChild(element);
    });
    (container || this.container).appendChild(fragment);
    return elementsCopy;
  },

  /**
   * Append HTML string to DOM.
   * @param {string} html HTML content.
   * @param {Element} container Element container.
   * @return {Array} Elements collection.
   */
  appendHtml(html, container) {
    return this.appendElements(this.stringToElements(html), container);
  },

  /**
   * Get element by attr selector.
   * @param {string} selector Selector.
   * @param {Element} container Element container.
   * @return {NodeList}
   */
  getByAttr(selector, container) {
    container = container || this.container;
    return container.querySelectorAll(selector);
  },

  style: {

    /**
     * Set style property.
     * @param {Element} element Element.
     * @param {DOMString} property Style property.
     * @param {DOMString} value Property value.
     */
    set(element, property, value) {
      element.style.setProperty(property, value);
    },

    /**
     * Remove style property.
     * @param {Element} element Element.
     * @param {DOMString} property Style property.
     */
    remove(element, property) {
      element.style.removeProperty(property);
    }
  },

  event: {

    /**
     * Dispatch custom envent.
     * @param {Element} element Target element.
     * @param {string} name Event name.
     * @param {object} data Event detail data.
     */
    dispatch(element, name, data) {
      element.dispatchEvent(new CustomEvent(name, {
        detail: data
      }));
    }
  },

  data: {

    /**
     * Get data attribute.
     * @param {Element} element Element.
     * @param {string} name Attribute.
     * @return {string|undefined}
     */
    get(element, name) {
      return ((element || {}).dataset) ?
        element.dataset[name] :
        undefined;
    },

    /**
     * Set data attribute.
     * @param {Element} element Element.
     * @param {string} name Attribute.
     * @param {string} value Value.
     */
    set(element, name, value) {
      if ((element || {}).dataset) {
        element.dataset[name] = value;
      }
    }
  }
};
