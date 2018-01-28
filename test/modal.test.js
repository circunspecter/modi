require('./jsdom');
const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

const Modal = require('../src/Modal');

describe('Modal', () => {
  let modal;
  let modalContent = 'Test content';

  beforeEach(function() {
    document.body.innerHTML = '';
    modal = new Modal({ content: modalContent });
  });

  describe('constructor()', () => {
    it('Initializes.', () => {
      if (!document.body.children.length || document.body.children[0].className !== 'modi') {
        throw new Error('Initialization fails.');
      }
    });

    it('Prevent initialization.', () => {
      document.body.innerHTML = '';
      modal = new Modal({}, false);
      if (document.body.children.length) {
        throw new Error('Prevent initialization fails.');
      }
    });

    it('All parameters are optional.', () => {
      new Modal();
    });

    it('Not fail when empty template provided.', () => {
      new Modal({ template: {} });
    });
  });

  describe('content', () => {
    it('Gets modal content.', () => {
      assert.strictEqual(modal.content, modalContent);
    });

    it('Sets modal content.', () => {
      modal.content = 'New content';
      assert.strictEqual(modal.content, 'New content');
    });

    it('Calling get without "content" element returns undefined.', () => {
      let template = {
        html: '<div id="foobar"></div>'
      };
      document.body.innerHTML = '';
      modal = new Modal({ template: template });
      assert.strictEqual(modal.content, undefined);
    });
  });

  describe('show()', () => {
    it('Shows modal.', () => {
      modal.show();
      expect().to.satisfy(() => {
        return document.body.dataset.modalVisible === 'true' &&
          document.body.children[0].dataset.visible === 'true';
      });
    });

    it('Updates content when provided.', () => {
      modal.show('New content');
      assert.strictEqual(modal.content, 'New content');
    });

    it('The method is ignored after modal removal.', () => {
      modal.remove();
      modal.show();
    });

    it("Runs template's method first when it's present.", () => {
      let success;
      let template = {
        html: '<div></div>',
        methods: {
          show: () => {
            success = true;
          }
        }
      };
      modal = new Modal({ template: template });
      modal.show();
      assert.strictEqual(success, true);
    });
  });

  describe('hide()', () => {
    it('Hides modal.', () => {
      let success = true;
      modal.show();
      success = (
        document.body.dataset.modalVisible === 'true' &&
        document.body.children[0].dataset.visible === 'true'
      );
      modal.hide();
      success = (
        success === true &&
        document.body.dataset.modalVisible === 'false' &&
        document.body.children[0].dataset.visible === 'false'
      );
      assert.strictEqual(success, true);
    });

    it("Runs template's method first when it's present.", () => {
      let success;
      let template = {
        html: '<div></div>',
        methods: {
          hide: () => {
            success = true;
          }
        }
      };
      modal = new Modal({ template: template });
      modal.hide();
      assert.strictEqual(success, true);
    });

    it('Hides when "close" clicked.', () => {
      let success = true;
      let clickEvent = new MouseEvent('click', {
        view: window,
        bubbles: true
      });

      modal.show();
      success = (
        document.body.dataset.modalVisible === 'true' &&
        document.body.children[0].dataset.visible === 'true'
      );

      modal.element('close').dispatchEvent(clickEvent);
      success = (
        success === true &&
        document.body.dataset.modalVisible === 'false' &&
        document.body.children[0].dataset.visible === 'false'
      );
      assert.strictEqual(success, true);
    });

    it('Hides when "overlay" clicked; and not his contents.', () => {
      let success = true;
      let clickEvent = new MouseEvent('click', {
        view: window,
        bubbles: true
      });

      modal.show();
      success = (
        document.body.dataset.modalVisible === 'true' &&
        document.body.children[0].dataset.visible === 'true'
      );

      modal.element('modal').dispatchEvent(clickEvent);
      success = (
        success === true &&
        document.body.dataset.modalVisible === 'true' &&
        document.body.children[0].dataset.visible === 'true'
      );

      modal.element('overlay').dispatchEvent(clickEvent);
      success = (
        success === true &&
        document.body.dataset.modalVisible === 'false' &&
        document.body.children[0].dataset.visible === 'false'
      );
      assert.strictEqual(success, true);
    });
  });

  describe('relocate()', () => {
    it('Dispatches relocate.', () => {
      let success;
      document.body.children[0].addEventListener('modal:relocate', () => {
        success = true;
      });
      modal.show();
      modal.relocate();
      assert.strictEqual(success, true);
    });

    it('Dispatches relocate only when visible.', () => {
      let success = false;
      document.body.children[0].addEventListener('modal:relocate', () => {
        success = true;
      });
      modal.relocate();
      assert.strictEqual(success, false);
    });
  });

  describe('create()', () => {
    it('Creates modal.', () => {
      let success;
      document.body.innerHTML = '';
      modal = new Modal({}, false);
      success = document.body.children.length === 0;
      modal.create();
      success = success && document.body.children.length !== 0;
      assert.strictEqual(success, true);
    });

    it('Process a template event without dispatcher.', () => {
      let success;
      let template = {
        html: '<div id="foo"><div id="bar">foo:bar</div></div>',
        events: [
          {
            name: 'event:dispatch',
            type: 'event:listento',
            selector: '[id="bar"]'
          }
        ]
      };
      new Modal({ template: template });
      document.getElementById('bar').addEventListener('modal:event:dispatch', () => {
        success = true;
      });
      document.getElementById('bar').dispatchEvent(new CustomEvent('event:listento'));
      assert.strictEqual(success, true);
    });

    it('Process a template event with "instance" dispatcher.', () => {
      let success;
      let template = {
        html: '<div id="foo"><div id="bar">foo:bar</div></div>',
        events: [
          {
            name: 'event:dispatch',
            type: 'event:listento',
            selector: '[id="bar"]',
            dispatcher: 'instance'
          }
        ]
      };
      new Modal({ template: template });
      document.getElementById('foo').addEventListener('modal:event:dispatch', () => {
        success = true;
      });
      document.getElementById('bar').dispatchEvent(new CustomEvent('event:listento'));
      assert.strictEqual(success, true);
    });

    it('Process a template event with "element" dispatcher.', () => {
      let success;
      let template = {
        html: `
          <div id="foo"><div id="bar">foo:bar</div></div>
          <div data-element="foobar" id="foobar">foobar</div>
        `,
        events: [
          {
            name: 'event:dispatch',
            type: 'event:listento',
            selector: '[id="bar"]',
            dispatcher: 'foobar'
          }
        ]
      };
      new Modal({ template: template });
      document.getElementById('foobar').addEventListener('modal:event:dispatch', () => {
        success = true;
      });
      document.getElementById('bar').dispatchEvent(new CustomEvent('event:listento'));
      assert.strictEqual(success, true);
    });

    it('Ignores template event when his element is not reachable or not exists.', () => {
      let template = {
        html: '<div id="foo"><div id="bar">foo:bar</div></div>',
        events: [
          {
            name: 'event:dispatch',
            type: 'event:listento',
            selector: '[id="foobar"]'
          }
        ]
      };
      modal.remove();
      modal = new Modal({ template: template });
      assert.strictEqual(modal.listeners.filter(l => l.element !== window).length, 0);
    });

    it('An empty string will be used when replacement is not provided.', () => {
      let template = {
        html: '<div id="foobar" data-foo="{bar}"></div>',
        data: {}
      };
      new Modal({ template: template });
      assert.strictEqual(document.getElementById('foobar').dataset.foo, '');
    });

    it('Ignored when the modal has already been created.', () => {
      let success;
      success = document.body.children.length === 1;
      modal.create();
      success = success && document.body.children.length === 1;
      assert.strictEqual(success, true);
    });

    it('Listens to window size changes.', (done) => {
      modal.show();
      document.body.children[0].addEventListener('modal:relocate', () => {
        done();
      });
      window.dispatchEvent(new CustomEvent('resize'));
    }).timeout(500);
  });

  describe('remove()', () => {
    it('Removes modal.', () => {
      modal.remove();
      if (
        document.body.children.length !== 0 ||
        !Array.isArray(modal.elements) || modal.elements.length !== 0 ||
        !Array.isArray(modal.listeners) || modal.listeners.length !== 0 ||
        JSON.stringify(modal.references) !== JSON.stringify({})
      ) {
        throw new Error('Remove modal fails.');
      }
    });
  });

  describe('isVisible()', () => {
    it('Checks if the modal is visible.', () => {
      let success = modal.isVisible() === false;
      modal.show();
      success = success && modal.isVisible() === true;
      assert.strictEqual(success, true);
    });
  });

  describe('element()', () => {
    it('Returns undefined when nothing found.', () => {
      assert.strictEqual(modal.element('foo'), undefined);
    });

    it('Finds overlay.', () => {
      assert.strictEqual(document.body.children[0].isEqualNode(modal.element('overlay')), true);
    });

    it('Finds modal.', () => {
      let success = (
        document.body.children[0] &&
        document.body.children[0].children[0] &&
        document.body.children[0].children[0].isEqualNode(modal.element('modal'))
      );
      assert.strictEqual(success, true);
    });
  });

  describe('getSubElement()', () => {
    it('Returns undefined when nothing found.', () => {
      assert.strictEqual(modal.getSubElement('foo', document.body), undefined);
    });

    it('Finds modal under overlay.', () => {
      let success = (
        document.body.children[0] &&
        document.body.children[0].children[0] &&
        document.body.children[0].children[0].isEqualNode(
          modal.getSubElement('modal', document.body.children[0])
        )
      );
      assert.strictEqual(success, true);
    });
  });

  describe('setFlags()', () => {
    it('smallWidth and smallHeight flags are "false" when the "modal" element does not exists.', () => {
      let template = {
        html: '<div id="foo" data-element="overlay"></div>'
      };
      modal = new Modal({ template: template });
      modal.show();
      expect().to.satisfy(() => {
        let element = document.getElementById('foo');
        return element.dataset.smallWidthFlag === 'false' && element.dataset.smallHeightFlag === 'false';
      });
    });
  });

  describe('addListener()', () => {
    it('Ignores non elment targets.', () => {
      [null, undefined, 1, true, 'str', {}]
        .map(target => modal.addListener('test:event', () => {}, target));
    });

    it('Adds element listeners.', () => {
      let success = false;
      modal.addListener('test:event', () => {
        success = true;
      }, document.body.children[0].children[0]);
      document.body.children[0].children[0].dispatchEvent(new CustomEvent('test:event'));
      assert.strictEqual(success, true);
    });

    it('Optional element parameter. Defaults to overlay.', () => {
      let success = false;
      modal.addListener('test:event', () => {
        success = true;
      });
      document.body.children[0].dispatchEvent(new CustomEvent('test:event'));
      assert.strictEqual(success, true);
    });
  });

  describe('dispatchEvent()', () => {
    it('Ignores non elment targets.', () => {
      [null, undefined, 1, true, 'str', {}]
        .map(target => modal.dispatchEvent('test:event', () => {}, target));
    });

    it('Dispatches event with namespace.', () => {
      let success = false;
      let modalElement = document.body.children[0].children[0];
      modalElement.addEventListener('modal:test:event', () => {
        success = true;
      });
      modal.dispatchEvent('test:event', {}, modalElement);
      assert.strictEqual(success, true);
    });

    it('Optional element parameter. Defaults to overlay.', () => {
      let success = false;
      document.body.children[0].addEventListener('modal:test:event', () => {
        success = true;
      });
      modal.dispatchEvent('test:event', {});
      assert.strictEqual(success, true);
    });

    it("Template's listeners are triggered.", () => {
      let success;
      let template = {
        html: '<div></div>',
        listeners: {
          show: () => {
            success = true;
          }
        }
      };
      modal = new Modal({ template: template });
      modal.show();
      assert.strictEqual(success, true);
    });
  });
});
