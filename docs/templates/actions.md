---
layout: default
title: Actions template
meta_description: "Modi: actions template"
prev_page_title: Default template
prev_page_path: templates/default/
next_page_title: Notification template
next_page_path: templates/notification/
---

<link href="{{ site.baseurl }}/assets/css/templates/actions/styles.min.css" rel="stylesheet">
<script src="{{ site.baseurl }}/assets/js/templates/actions/config.js"></script>

Modal with action buttons and events.

<div markdown="1" class="minitabs">
  <ul class="tabnames">
    <li>Config</li>
    <li>Styles</li>
  </ul>
  <div markdown="1" class="tabcontent">
```js
var modiActionsTplConfig = {

  html: `
  <div class="{class}" data-element="overlay" data-visible="false" data-outside-close="{outsideClose}">
    <div data-element="modal" data-small-width="500">
      <span data-element="close">×</span>
      <div data-element="content"></div>
      <div data-element="actions">
        <button type="button" data-action="accept">{acceptText}</button>
        <button type="button" data-action="cancel">{cancelText}</button>
      </div>
    </div>
  </div>
  `,

  data: {
    class: 'modi',
    outsideClose: true,
    acceptText: 'Accept',
    cancelText: 'Cancel'
  },

  events: [
    {
      name: 'modal:accept',
      type: 'click',
      selector: '[data-element="actions"] [data-action="accept"]',
      dispatcher: 'modal'
    },
    {
      name: 'modal:cancel',
      type: 'click',
      selector: '[data-element="actions"] [data-action="cancel"]',
      dispatcher: 'modal'
    }
  ]
};
```
  </div>
  <div markdown="1" class="tabcontent">
```scss
$overlay-bg: rgba(0, 0, 0, .6);
$white: #fff;
$gray: #ccc;
$gray-light: #eee;
$gray-dark: #999;

body {
  &[data-modal-visible='true'] {
    overflow: hidden;
  }
}

.modi {
  &[data-element='overlay'] {
    align-items: center;
    background: $overlay-bg;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    left: 0;
    overflow-y: auto;
    padding: 0 15px 0 5px;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 999;

    [data-element='modal'] {
      background-color: $white;
      box-sizing: border-box;
      margin: 20px auto;
      position: relative;
      width: 400px;
      z-index: 9999;

      [data-element='close'] {
        background-color: $gray;
        cursor: pointer;
        display: block;
        height: 20px;
        line-height: 20px;
        position: absolute;
        right: 10px;
        text-align: center;
        top: 10px;
        vertical-align: middle;
        width: 20px;
      }

      [data-element='content'] {
        padding: 20px 30px;
      }

      [data-element='actions'] {
        border-top: 1px solid $gray-light;
        text-align: right;

        [data-action] {
          background-color: transparent;
          border: 0;
          color: $gray-dark;
          cursor: pointer;
          float: left;
          padding: 10px;
          text-transform: uppercase;
          width: 50%;

          &:hover,
          &:active,
          &:focus {
            background-color: $gray-light;
          }
        }
      }

      &[data-small-width-flag='true'] {
        width: 100%;
      }
    }

    &[data-small-height-flag='true'] {
      display: block;

      [data-element='modal'] {
        margin: 20px auto;
        overflow: hidden;
        position: relative;
      }
    }

    &[data-visible='false'] {
      display: none;
    }
  }
}
```
  </div>
</div>

Let's try it.

```js
var modal = new Modi({
  template: modiActionsTplConfig,
  content: "Buttons added. Now it is necessary to capture the dispatched events."
});
```

<script style="text/javascript">
  var modal = new Modi({
    template: modiActionsTplConfig,
    content: "Buttons added. Now it is necessary to capture the dispatched events."
  });
</script>

<button class="button" onclick="modal.show()">modal.show();</button>

Capturing the events.

```js
var question = new Modi({
  template: modiActionsTplConfig,
  content: "Are you sure?",
  data: {
    acceptText: 'Yep!',
    cancelText: 'Maybe later'
  }
});
var answer = new Modi();

question.element('modal').addEventListener('modal:accept', (e) => {
  question.hide();
  answer.show('Oops.. something went wrong. Please, try again.');
});
question.element('modal').addEventListener('modal:cancel', (e) => {
  question.hide();
});
```

<script style="text/javascript">
  var question = new Modi({
    template: modiActionsTplConfig,
    content: "Are you sure?",
    data: {
      acceptText: 'Yep!',
      cancelText: 'Maybe later'
    }
  });
  var answer = new Modi();

  question.element('modal').addEventListener('modal:accept', (e) => {
    question.hide();
    answer.show('Oops.. something went wrong. Please, try again.');
  });
  question.element('modal').addEventListener('modal:cancel', (e) => {
    question.hide();
  });
</script>
<button class="button" onclick="question.show()">question.show();</button>
