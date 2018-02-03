require('./jsdom');
const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

const Dom = require('../src/Dom');

describe('Dom', () => {
  before(() => {
    document.body.innerHTML = `
      <div id="element-1" data-element="element-1"></div>
      <div id="element-2" data-element="element-2">
        <div id="element-2-1" data-element="element-2-1"></div>
        <div id="element-2-2" data-element="element-2-2"></div>
      </div>
    `;
  });

  beforeEach(function() {
    Dom.container = document.body;
  });

  describe('stringToElements', () => {
    it('Returns HTMLCollection.', () => {
      expect(window.HTMLCollection.prototype).to.satisfy((expected) => {
        return Dom.stringToElements().constructor.prototype === expected &&
          Dom.stringToElements('div').constructor.prototype === expected;
      });
    });
  });

  describe('appendElements()', () => {
    it('Returns Array of Elements.', () => {
      let elements = [document.createElement('div')];
      expect().to.satisfy(() => {
        let response = Dom.appendElements(elements);
        return Array.isArray(response) && elements[0].isEqualNode(response[0]);
      });
    });

    it("Returns undefined if the container isn't an element.", () => {
      Dom.container = null;
      assert.strictEqual(Dom.appendElements([]), undefined);
    });
  });

  describe('appendHtml()', () => {
    it('Returns Array of Elements.', () => {
      expect().to.satisfy(() => {
        let response = Dom.appendHtml('<div>');
        return Array.isArray(response) &&
        document.createElement('div').isEqualNode(response[0]);
      });
    });
  });

  describe('getByAttr()', () => {
    it('Returns NodeList.', () => {
      expect(window.NodeList.prototype).to.satisfy((expected) => {
        let response = Dom.getByAttr('[data-element="element-1"]');
        return (typeof response === 'object') &&
          response.constructor.prototype === expected &&
          response[0].localName === 'div';
      });
    });

    it("Returns undefined if the container isn't an element.", () => {
      Dom.container = null;
      assert.strictEqual(Dom.getByAttr(''), undefined);
    });
  });

  describe('getSiblings()', () => {
    it('Returns element siblings.', () => {
      expect().to.satisfy(() => {
        let response = Dom.getSiblings(document.getElementById('element-2-1'));
        return Array.isArray(response) &&
          response.length === 1 &&
          response[0].isEqualNode(document.getElementById('element-2-2'));
      });
    });

    it('Returns empty array when no element provided.', () => {
      assert.isArray(Dom.getSiblings(null));
    });
  });

  describe('isElement()', () => {
    it(`Checks for an element node:
          <Element> => true
          null, undefined, 1, true, 'str', {} => false`,
      () =>{
        let checks = [document.getElementById('element-1'), null, undefined, 1, true, 'str', {}].map(v => Dom.isElement(v));
        let expected = [true].concat(Array(checks.length - 1).fill(false));
        assert.sameOrderedMembers(checks, expected);
      }
    );
  });

  describe('style', () => {
    describe('set()', () => {
      it('Sets style property.', () => {
        let element = document.getElementById('element-1');
        Dom.style.set(element, 'color', 'red');
        assert.strictEqual(element.style.color, 'red');
      });

      it('Not fail when no element provided.', () => {
        Dom.style.set(null);
      });
    });

    describe('remove()', () => {
      it('Removes style property.', () => {
        let element = document.getElementById('element-1');
        Dom.style.remove(element, 'color');
        assert.strictEqual(element.style.color, '');
      });

      it('Not fail when no element provided.', () => {
        Dom.style.remove(null);
      });
    });
  });

  describe('event', () => {
    describe('dispatch()', () => {
      it('Dispatches event with custom data.', () => {
        let success;
        let element = document.getElementById('element-1');
        element.addEventListener('test:event', (e) => {
          success = (e.detail.foo === 'bar');
        });
        Dom.event.dispatch(element, 'test:event', { foo: 'bar' });
        assert.strictEqual(success, true);
      });

      it('Ignores non element targets.', () => {
        [null, undefined, 1, true, 'str', {}]
          .map(target => Dom.event.dispatch(target, 'test:event', { foo: 'bar' }));
      });
    });
  });

  describe('data', () => {
    describe('get()', () => {
      it('Gets data attribute if exists or returns undefined.', () => {
        expect().to.satisfy(() => {
          let element = document.getElementById('element-1');
          return Dom.data.get(element, 'element') === 'element-1' &&
            Dom.data.get({}, 'element') === undefined;
        });
      });
    });

    describe('set()', () => {
      it('Sets data attribute if element exists.', () => {
        expect().to.satisfy(() => {
          let element = document.getElementById('element-1');
          Dom.data.set(element, 'foo', 'bar');
          return element.dataset.foo === 'bar' &&
            Dom.data.set({}, 'foo', 'bar') === undefined;
        });
      });
    });
  });
});
