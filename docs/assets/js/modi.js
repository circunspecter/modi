/*! modi 2.0.1 | github.com/circunspecter/modi */
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
  function _class() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var initialize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    _classCallCheck(this, _class);

    // Modal config
    this.config = Object.assign({
      container: document.body,
      eventsNamespace: 'modal',
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
          var _template$methods;

          var args = [this];
          if (action === 'show') {
            args.unshift(contents);
          }
          (_template$methods = this.template.methods)[action].apply(_template$methods, args);
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

  }, {
    key: 'relocate',
    value: function relocate() {
      if (this.isVisible()) {
        this.setFlags();
        this.dispatchEvent('relocate');
      }
    }

    /**
     * Create modal.
     * @param {string} contents Modal content.
     */

  }, {
    key: 'create',
    value: function create() {
      var _this = this;

      var contents = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      if (!this.elements.length) {
        // Append modal and store its elements.
        this.elements = _Dom2.default.appendHtml(this.template.render());

        // Store instance reference inside parent template elements
        this.elements.forEach(function (element) {
          Object.defineProperty(element, '_Modi', { value: _this });
        });

        // Set content
        this.content = contents;

        // Close element handler
        if (this.element(close)) {
          this.addListener('click', function () {
            _this.hide();
          }, this.element(close));
        }

        // Overlay close handler
        if (_Dom2.default.data.get(this.element(overlay), 'outsideClose') === 'true') {
          this.addListener('click', function (e) {
            if (e.target.dataset.element === 'overlay') {
              _this.hide();
            }
          }, this.element(overlay));
        }

        // Window resize handler for modal relocation
        this.resizeTimer = null;
        this.addListener('resize', function () {
          clearTimeout(_this.resizeTimer);
          _this.resizeTimer = setTimeout(function () {
            _this.relocate();
          }, 300);
        }, window);

        // Template events
        if (this.template.hasEvents()) {
          // Add listeners to dispatch custom events
          this.template.events.forEach(function (ev) {
            var element = _this.elements.map(function (parent) {
              return _Dom2.default.getByAttr(ev.selector, parent)[0];
            }).filter(function (result) {
              return _Dom2.default.isElement(result);
            })[0];
            if (element) {
              _this.addListener(ev.type, function () {
                // Check for custom element dispatcher
                if (ev.dispatcher === 'instance') {
                  element = _this.elements[0];
                } else if (ev.dispatcher && _this.element(ev.dispatcher)) {
                  element = _this.element(ev.dispatcher);
                }
                _this.dispatchEvent(ev.name, {}, element);
              }, element);
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
      // Clean references
      this.listeners = [];
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
        })[0];
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
     * @param {string} type Event type.
     * @param {function|EventListener} listener Event handler.
     * @param {Element} element Target element.
     */

  }, {
    key: 'addListener',
    value: function addListener(type, listener) {
      var element = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.elements[0];

      if (_Dom2.default.isElement(element) || element === window) {
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

  }, {
    key: 'dispatchEvent',
    value: function dispatchEvent(name, detail, element) {
      var nameWithNamespace = this.config.eventsNamespace + ':' + name;
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
      var targetElements = [[element], this.listeners.filter(function (l) {
        return l.type === nameWithNamespace;
      }).map(function (l) {
        return l.element;
      }), [this.elements[0]]].filter(function (coll) {
        return coll.filter(function (item) {
          return _Dom2.default.isElement(item);
        }).length;
      })[0];

      if (targetElements && targetElements.length) {
        // Dispatch custom event ignoring repeated targets.
        new Set(targetElements).forEach(function (target) {
          _Dom2.default.event.dispatch(target, nameWithNamespace, detail);
        });
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

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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
   * @return {Array|undefined} Elements collection.
   */
  appendElements: function appendElements(elements) {
    var container = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.container;

    if (this.isElement(container)) {
      var elementsCopy = Array.from(elements);
      var fragment = document.createDocumentFragment();

      Array.from(elements).forEach(function (element) {
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
  appendHtml: function appendHtml(html, container) {
    return this.appendElements(this.stringToElements(html), container);
  },


  /**
   * Get elements by attr selector.
   * @param {string} selector Selector.
   * @param {Element} container Element container.
   * @return {NodeList|undefined}
   */
  getByAttr: function getByAttr(selector) {
    var container = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.container;

    if (this.isElement(container)) {
      return container.querySelectorAll(selector);
    }
  },


  /**
   * Get element siblings.
   * @param {Element} element Element.
   * @return {array} Siblings.
   */
  getSiblings: function getSiblings(element) {
    return this.isElement(element) ? Array.from(element.parentNode.children).filter(function (sibling) {
      return element.isEqualNode(sibling) === false;
    }) : [];
  },


  /**
   * Checks for an element node.
   * @param {Element} element Element.
   * @return {boolean}
   */
  isElement: function isElement(element) {
    return element !== null && (typeof element === 'undefined' ? 'undefined' : _typeof(element)) === 'object' && element.nodeType === Node.ELEMENT_NODE;
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
      set: function set(element, property, value) {
        if (this.parent.isElement(element)) {
          element.style.setProperty(property, value);
        }
      },


      /**
       * Remove style property.
       * @param {Element} element Element.
       * @param {DOMString} property Style property.
       */
      remove: function remove(element, property) {
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
      dispatch: function dispatch(element, name, data) {
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
      get: function get(element, name) {
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
      set: function set(element, name, value) {
        if (this.parent.isElement(element)) {
          element.dataset[name] = value;
        }
      }
    };
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