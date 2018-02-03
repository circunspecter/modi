---
layout: default
title: Reference
meta_description: "Modi: reference"
prev_page_title: Configuration
prev_page_path: configuration/
next_page_title: Default template
next_page_path: templates/default/
---

#### constructor <code>Object: config, Boolean: initialize</code>

{: .list .indent}
- <code>config</code>: optional. Modal configuration.
- <code>initialize</code>: optional. Sets whether the modal has to be initialized. Default: true.

### Properties

#### config

Configuration object.

#### template

Template config.

#### content

Get/set content. Requires [<code>content</code> element]({{ site.baseurl }}/configuration/#html "Configuration").

### Methods

#### show <code>String: contents, Boolean: runDefault</code>

Shows the modal.

{: .list .indent}
- <code>contents</code>: optional. Contents to show.
- <code>runDefault</code>: optional. Defines when the default method will be called. By default <code>false</code>, so the template method has preference when its defined.

Dispatches <code>modal:show</code> event.

Inside [template]({{ site.baseurl }}/configuration/#methods "Configuration"), the method definition will be <code>String: contents, Modi: instance</code>.

#### hide <code>Boolean: runDefault</code>

Hides the modal.

{: .list .indent}
- <code>runDefault</code>: optional. Defines when the default method will be called. By default <code>false</code>, so the template method has preference when its defined.

Dispatches <code>modal:hide</code> event.

Inside [template]({{ site.baseurl }}/configuration/#methods "Configuration"), the method definition will be <code>Modi: instance</code>.

#### relocate

Sets <code>small-width</code> and <code>small-height</code> [flags]({{ site.baseurl }}/configuration/#html "Configuration"), and it's triggered on window resize.

Dispatches <code>modal:relocate</code> event.

#### create <code>String: contents</code>

Initialize the modal. Appends elements to the DOM and attaches listeners. Triggered on instantiation by default.

#### remove

Removes the elements and the listeners.

#### element <code>String: name</code>

Returns the specified [template element]({{ site.baseurl }}/configuration/#html "Configuration"). <code>undefined</code> otherwise.

#### isVisible

Check if the modal is visible.

#### addListener <code>String: type, EventListener: listener, Element: element</code>

Adds specified event listener and stores it inside listeners collection.

{: .list .indent}
- <code>type</code>: Event type.
- <code>listener</code>: Event handler.
- <code>element</code>: optional. Target element. Default: first template's element.

```js
myModal.addListener('modal:show', (e) => {
  console.log('show dispatched!');
});
```

### Events

[Dispatched events](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent "MDN CustomEvent") have the <code>detail</code> property, which contains:

{: .list .indent}
- <code>instance</code>: modal's instance.
- <code>overlay</code>: overlay element.
- <code>modal</code>: modal element.

```js
myModal.addListener('modal:hide', (e) => {
  console.log(e.detail.instance);
});
```

#### show

Triggered when the modal is shown.

#### hide

Triggered when the modal hides.

#### relocate

Triggered on window resize and <code>relocate</code> method call.

{: .note}
Events collection can be extended using [template events]({{ site.baseurl }}/configuration#events "Template events").
