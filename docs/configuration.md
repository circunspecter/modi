---
layout: default
title: Configuration
meta_description: "Modi: configuration"
prev_page_title: Download & installation
prev_page_path: 
next_page_title: Reference
next_page_path: reference/
---

Config structure:

```js
cnf = {
  container: {Element},
  content: {String},
  template: {
    html: {String},
    data: {
      class: {String},
      outsideClose: {Boolean}
    },
    events: {Array},
    listeners: {Object},
    methods: {Object}
  }
}
```

### container

Element where the modal will be inserted. Default: <code>document.body</code>.

### content

Modal's content. Can be established after creation. Default: <code>""</code>.

### template

Defines the structure and default behaviour. Some examples can be found under templates section: [default]({{ site.baseurl }}/templates/default "Default template"), [actions]({{ site.baseurl }}/templates/actions "Actions template"), [notification]({{ site.baseurl }}/templates/notification "Notification template").

<div markdown="1" class="indent">

#### html

Default content:

```html
<div class="{class}" data-element="overlay" data-visible="false" data-outside-close="{outsideClose}">
  <div data-element="modal" data-small-width="500">
    <span data-element="close">×</span>
    <div data-element="content"></div>
  </div>
</div>
```
Modi is aware of the following elements:

  {: .list .indent}
  - __overlay__: optional. When inserted manually in the same <code>container</code> and contains the <code>data-element</code> definition, Modi will be aware of the element, allowing you to have a shared overlay between modals.
  - __modal__: required. Modal container.
    - <code>small-width</code>: optional. Defines the break point where <code>small-width-flag</code> data attribute turns <code>true</code> or <code>false</code>.
  - __close__: optional. When present, an event handler will be attached to the element and will trigger the [hide method]({{ site.baseurl }}/reference#methods "Reference").
  - __content__: required if you plan to alter the content through Modi. Otherwise, it can be ignored.

The following boolean flags will be present as data attributes:

  {: .list .indent}
  - <code>modal-visible</code>: modal visible? Present on <code>container</code> element.
  - <code>visible</code>: modal visible? Present on <code>overlay</code> and <code>modal</code> elemens.
  - <code>small-height-flag</code>: window's height smaller than the modal's height? Present on <code>overlay</code> and <code>modal</code> elemens.
  - <code>small-width-flag</code>: window's width smaller than the <code>small-width</code> attribute present on <code>modal</code> element? Present on <code>overlay</code> and <code>modal</code> elements.

#### data

Template replacements. Any placeholder present inside template as <code>{placeholder}</code> will be replaced with the corresponding data property. Allows the customization of a modal during instantiation. Defaults:

```js
data: {
  class: 'modi',
  outsideClose: true
}
```

#### events

Custom events. Definition:

{: .list .indent}
- __name__: required. Name of the event.
- __type__: required. Type of the event.
- __selector__: required. Selector that points to the dispatcher element. The element must be inside the <code>container</code>.
- __dispatcher__: optional. It's possible to set the <code>overlay</code> or <code>modal</code> element as the dispatcher.

For example, [actions template]({{ site.baseurl }}/templates/actions/ "Actions template") have an "accept" button that dispatches a <code>modal:accept</code> event on click.

```js
{
  events: [
    {
      name: 'modal:accept',
      type: 'click',
      selector: '[data-element="actions"] [data-action="accept"]',
      dispatcher: 'modal'
    }
  ]
}
```

#### listeners

Any of the events can be captured by the template. This includes the [default events]({{ site.baseurl }}/reference#events "Events") and the custom ones.

For example:

```js
listeners: {
  'modal:hide': (detail) => {
    console.log('modal:hide dispatched!');
  },
  'modal:accept': (detail) => {
    console.log('modal:accept dispatched!');
  }
}
```

The [notification template]({{ site.baseurl }}/templates/notification "Notification template") contains an example.

#### methods

The <code>show</code> and <code>hide</code> methods can be overriden inside template. Template's methods run first, and it's possible to call the default method from the custom one.

For example:

```js
methods: {
  show: (contents, instance) => {
    // Pritty stuff
    // ...
    // Call default method
    instance.show(contents, true);
  }
}
```

The [notification template]({{ site.baseurl }}/templates/notification "Notification template") contains an example.
</div>
