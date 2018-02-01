[![Build Status](https://travis-ci.org/circunspecter/modi.svg?branch=master)](https://travis-ci.org/circunspecter/modi)
[![Coverage Status](https://coveralls.io/repos/github/circunspecter/modi/badge.svg?branch=master)](https://coveralls.io/github/circunspecter/modi?branch=master)

# Modi
Flexible and configurable modals.

[Documentation and examples](https://circunspecter.github.io/modi/ "Documentation and examples")

### Installation

#### Browser

```html
<script src="/path/to/modi.min.js"></script>
```

[unpkg CDN](https://unpkg.com "unpkg"):

```html
//unpkg.com/@circunspecter/modi@latest/dist/modi.min.js
```

#### npm

```shell
npm install @circunspecter/modi
```

### Basic usage

```js
var modal = new Modi({ content: 'Hi world!' });
modal.show();
```
