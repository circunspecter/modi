(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Modi", [], factory);
	else if(typeof exports === 'object')
		exports["Modi"] = factory();
	else
		root["Modi"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Dom = __webpack_require__(1);

var _Dom2 = _interopRequireDefault(_Dom);

var _Template = __webpack_require__(2);

var _Template2 = _interopRequireDefault(_Template);

var _config = __webpack_require__(3);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var overlay = 'overlay';
var modal = 'modal';
var close = 'close';
var content = 'content';

var _class = function () {
  function _class(config, initialize) {
    _classCallCheck(this, _class);

    config = config || {};

    // Modal config
    this.config = Object.assign({
      container: document.body,
      content: null,
      template: null,
      data: Object.assign({}, config.data)
    }, config);

    // Template
    this.template = new _Template2.default(this.config.template || _config2.default, this.config.data);

    // Dom config
    _Dom2.default.container = this.config.container;

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


  _createClass(_class, [{
    key: 'show',


    /**
     * Show modal.
     * @param {string} contents Modal content.
     * @param {boolean} runDefault "true" runs default method, "false" the template's one.
     */
    value: function show(contents, runDefault) {
      this.setVisible(true, runDefault, contents);
    }

    /**
     * Hide modal.
     * @param {boolean} runDefault "true" runs default method, "false" the template's one.
     */

  }, {
    key: 'hide',
    value: function hide(runDefault) {
      this.setVisible(false, runDefault);
    }

    /**
     * Show modal.
     * @param {boolean} visible Visible state.
     * @param {boolean} runDefault "true" runs default method, "false" the template's one.
     * @param {string} contents Modal content.
     */

  }, {
    key: 'setVisible',
    value: function setVisible(visible, runDefault, contents) {
      if (this.elements.length) {
        var action = visible === true ? 'show' : 'hide';
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
          this.dispatchEvent(this.element(modal), 'modal:' + action);
        }
      }
    }

    /**
     * Relocate modal.
     */

  }, {
    key: 'relocate',
    value: function relocate() {
      if (this.isVisible()) {
        this.setFlags();
        this.dispatchEvent(this.element(modal), 'modal:relocate');
      }
    }

    /**
     * Create modal.
     * @param {string} contents Modal content.
     */

  }, {
    key: 'create',
    value: function create(contents) {
      var _this = this;

      if (!this.elements.length) {
        // Append modal and store its elements.
        this.elements = _Dom2.default.appendHtml(this.template.render());

        // Store instance reference inside parent template elements
        this.elements.forEach(function (element) {
          Object.defineProperty(element, '_Modi', { value: _this });
        });

        // Set content
        this.content = contents || '';

        // Close element handler
        if (this.element(close)) {
          this.addListener(this.element(close), 'click', function () {
            _this.hide();
          });
        }

        // Overlay close handler
        if (_Dom2.default.data.get(this.element(overlay), 'outsideClose') === 'true') {
          this.addListener(this.element(overlay), 'click', function (e) {
            if (e.target.dataset.element === 'overlay') {
              _this.hide();
            }
          });
        }

        // Window resize handler for modal relocation
        this.resizeTimer = null;
        this.addListener(window, 'resize', function () {
          clearTimeout(_this.resizeTimer);
          _this.resizeTimer = setTimeout(function () {
            _this.relocate();
          }, 300);
        });

        // Template events
        if (this.template.hasEvents()) {
          // Add listeners to dispatch custom events
          this.template.events.forEach(function (ev) {
            var element = _Dom2.default.getByAttr(ev.selector, _this.element(modal))[0];

            if (element) {
              _this.addListener(element, ev.type, function () {
                // Check for custom element dispatcher
                if (['overlay', 'modal'].indexOf(ev.dispatcher) !== -1) {
                  element = _this.element(ev.dispatcher);
                }
                _this.dispatchEvent(element, ev.name);
              });
            }
          });
        }
      }
    }

    /**
     * Remove modal.
     */

  }, {
    key: 'remove',
    value: function remove() {
      this.hide();
      // Remove listeners.
      this.listeners.forEach(function (listener) {
        listener.element.removeEventListener(listener.type, listener.listener);
      });
      // Remove elements from DOM.
      this.elements.forEach(function (element) {
        _Dom2.default.container.removeChild(element);
      });
      // Clean modal elements references
      this.elements = [];
      this.references = {};
    }

    /**
     * Check if the modal is visible.
     */

  }, {
    key: 'isVisible',
    value: function isVisible() {
      return _Dom2.default.data.get(this.element(modal), 'visible') === 'true';
    }

    /**
     * Searches the specified element.
     * @param {string} name Element name.
     * @return {Element|undefined}
     */

  }, {
    key: 'element',
    value: function element(name) {
      var _this2 = this;

      if (!this.references[name]) {
        this.references[name] =
        // Search it inside the "parents" collection.
        this.elements.filter(function (el) {
          return el.dataset.element === name;
        })[0] ||
        // Search it inside each "parent" element.
        this.elements.map(function (el) {
          return _this2.getSubElement(name, el);
        })[0] ||
        // Search it inside the body.
        this.getSubElement(name, _Dom2.default.container);
      }
      return this.references[name];
    }

    /**
     * Searches the specified element inside a parent.
     * @param {string} name Element name.
     * @param {Element} parent Parent element.
     * @return {Element|undefined}
     */

  }, {
    key: 'getSubElement',
    value: function getSubElement(name, parent) {
      return _Dom2.default.getByAttr('[data-element="' + name + '"]', parent)[0];
    }

    /**
     * Set modal flags.
     */

  }, {
    key: 'setFlags',
    value: function setFlags() {
      var _this3 = this;

      var visible = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.isVisible();

      var smallHeight = false;
      var smallWidth = false;

      [overlay, modal].forEach(function (element) {
        _Dom2.default.data.set(_this3.element(element), 'visible', visible);
      });
      _Dom2.default.data.set(_Dom2.default.container, 'modalVisible', visible);

      if (this.element(modal)) {
        smallHeight = window.innerHeight < this.element(modal).offsetHeight;
        smallWidth = parseInt(this.element(modal).dataset.smallWidth || 0, 10);
        smallWidth = smallWidth > 0 && window.matchMedia('(max-width: ' + smallWidth + 'px)').matches;
      }

      [overlay, modal].forEach(function (element) {
        _Dom2.default.data.set(_this3.element(element), 'smallHeightFlag', smallHeight);
        _Dom2.default.data.set(_this3.element(element), 'smallWidthFlag', smallWidth);
      });
    }

    /**
     * Adds specified event listener and stores it inside listeners collection.
     * @param {Element} element Target element.
     * @param {string} type Event type.
     * @param {function|EventListener} listener Event handler.
     */

  }, {
    key: 'addListener',
    value: function addListener(element, type, listener) {
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

  }, {
    key: 'dispatchEvent',
    value: function dispatchEvent(element, name, detail) {
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
        _Dom2.default.event.dispatch(element, name, detail);
      }
    }
  }, {
    key: 'content',
    get: function get() {
      return this.element(content) ? this.element(content).innerHTML : undefined;
    }

    /**
     * Set modal content.
     * @param {string} contents Modal new content.
     */
    ,
    set: function set(contents) {
      if (contents && this.element(content)) {
        this.element(content).innerHTML = contents;
      }
    }
  }]);

  return _class;
}();

exports.default = _class;
module.exports = exports['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {

  container: document.body,

  /**
   * Converts html string into elements.
   * @param {string} html HTML content.
   * @return {HTMLCollection} Elements collection.
   */
  stringToElements: function stringToElements(html) {
    var element = document.createElement('div');

    element.innerHTML = html;
    return element.children;
  },


  /**
   * Append elements to DOM.
   * @param {Array} elements Elements collection.
   * @param {Element} container Element container.
   * @return {Array} Elements collection.
   */
  appendElements: function appendElements(elements, container) {
    var elementsCopy = [].slice.call(elements);
    var fragment = document.createDocumentFragment();

    Array.from(elements).forEach(function (element) {
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
  appendHtml: function appendHtml(html, container) {
    return this.appendElements(this.stringToElements(html), container);
  },


  /**
   * Get element by attr selector.
   * @param {string} selector Selector.
   * @param {Element} container Element container.
   * @return {NodeList}
   */
  getByAttr: function getByAttr(selector, container) {
    container = container || this.container;
    return container.querySelectorAll(selector);
  },


  /**
   * Get element siblings.
   * @param {Element} element Element.
   * @return {array} Siblings.
   */
  getSiblings: function getSiblings(element) {
    var coll = [];

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = element.parentNode.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var sibling = _step.value;

        if (element.isEqualNode(sibling) === false) {
          coll.push(sibling);
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return coll;
  },


  style: {

    /**
     * Set style property.
     * @param {Element} element Element.
     * @param {DOMString} property Style property.
     * @param {DOMString} value Property value.
     */
    set: function set(element, property, value) {
      element.style.setProperty(property, value);
    },


    /**
     * Remove style property.
     * @param {Element} element Element.
     * @param {DOMString} property Style property.
     */
    remove: function remove(element, property) {
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
    dispatch: function dispatch(element, name, data) {
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
    get: function get(element, name) {
      return (element || {}).dataset ? element.dataset[name] : undefined;
    },


    /**
     * Set data attribute.
     * @param {Element} element Element.
     * @param {string} name Attribute.
     * @param {string} value Value.
     */
    set: function set(element, name, value) {
      if ((element || {}).dataset) {
        element.dataset[name] = value;
      }
    }
  }
};
module.exports = exports['default'];

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(config, data) {
    _classCallCheck(this, _class);

    this.html = config.html || '';
    this.data = Object.assign({}, config.data, data);
    this.events = config.events || {};
    this.listeners = config.listeners || {};
    this.methods = config.methods || {};
  }

  /**
   * Check if the template has events.
   * @return {boolean}
   */


  _createClass(_class, [{
    key: 'hasEvents',
    value: function hasEvents() {
      return this.events.constructor === [].constructor && this.events.length;
    }

    /**
     * Render main template.
     * @return {string}
     */

  }, {
    key: 'render',
    value: function render() {
      return this.build(this.html, this.data);
    }

    /**
     * Make template replacements.
     * Source: Kristof Neirynck @ https://stackoverflow.com/a/378000
     * @param {string} tpl Template.
     * @param {object} data Replacements.
     * @return {string}
     */

  }, {
    key: 'build',
    value: function build(tpl, data) {
      return tpl.replace(/{([^{}]+)}/g, function (m, key) {
        return data.hasOwnProperty(key) ? data[key] : '';
      });
    }
  }]);

  return _class;
}();

exports.default = _class;
module.exports = exports['default'];

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {

  html: '\n  <div class="{class}" data-element="overlay" data-visible="false" data-outside-close="{outsideClose}">\n    <div data-element="modal" data-small-width="500">\n      <span data-element="close">\xD7</span>\n      <div data-element="content"></div>\n    </div>\n  </div>\n  ',

  data: {
    class: 'modi',
    outsideClose: true
  }
};
module.exports = exports['default'];

/***/ })
/******/ ]);
});
//# sourceMappingURL=modi.js.map