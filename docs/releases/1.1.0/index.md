---
layout: release
release: 1.1.0
title: Quick start
meta_description: "Modi: flexible and configurable modals. They don't make you the food."
next_page_title: Configuration
next_page_path: configuration/
---

<link href="{{ site.baseurl }}/releases/{{ page.release }}/assets/css/templates/default/styles.min.css" rel="stylesheet">

Flexible and configurable modals. They don't make you the food.

### Installation

#### Browser

```html
<script src="/path/to/modi.min.js"></script>
```

<div markdown="1" class="note">
[unpkg CDN](https://unpkg.com "unpkg"):

```html
//unpkg.com/@circunspecter/modi@1.1.0/dist/modi.min.js
```
</div>

#### npm

```shell
npm install @circunspecter/modi
```

{: .note}
It's also necessary to add the styles. You can take a look under <code>templates</code> folder. Templates examples: [default]({{ site.baseurl }}/releases/{{ page.release }}/templates/default "Default template"), [actions]({{ site.baseurl }}/releases/{{ page.release }}/templates/actions "Actions template"), [notification]({{ site.baseurl }}/releases/{{ page.release }}/templates/notification "Notification template").

### Usage

```js
var modal = new Modi({ content: 'Hi world!' });
```
<script style="text/javascript">
var modal = new Modi({ content: 'Hi world!' });
</script>
<button class="button" onclick="modal.show()">modal.show();</button>
