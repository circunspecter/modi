---
layout: default
title: Notification template
meta_description: "Modi: notification template"
prev_page_title: Actions template
prev_page_path: templates/actions/
---

<link href="{{ site.baseurl }}/assets/css/templates/notification/styles.min.css" rel="stylesheet">
<script src="{{ site.baseurl }}/assets/js/templates/notification/config.js"></script>

<div markdown="1" class="minitabs">
  <ul class="tabnames">
    <li>Config</li>
    <li>Styles</li>
  </ul>
  <div markdown="1" class="tabcontent">
```js
var modiNotificationTplConfig = {

  hideTimer: null,

  html: `
  <div class="{class}" data-element="modal" data-small-width="500" data-delay="{delay}">
    <span data-element="close">&Cross;</span>
    <div data-element="content"></div>
  </div>
  `,

  data: {
    class: 'modi-notification',
    delay: 2000
  },

  listeners: {

    'modal:show': (detail) => {
      clearTimeout(detail.instance.template.hideTimer);
      detail.instance.template.hideTimer = setTimeout(() => {
        detail.instance.hide();
      }, parseInt(detail.modal.dataset.delay, 10));
    }
  },

  methods: {

    show: (contents, instance) => {
      instance.hide();
      setTimeout(function() {
        instance.show(contents, true);
      }, 10);
    }
  }
};
```
  </div>
  <div markdown="1" class="tabcontent">
```scss
$white: #fff;
$black: #333;
$black-alpha: rgba($black, .3);
$black-light: #666;
$gray: #ccc;

.modi-notification {
  background-color: $white;
  box-shadow: 0 0 3px $black-alpha;
  color: $black-light;
  display: none;
  font-size: .9em;
  margin: 20px;
  padding: 15px 30px;
  position: fixed;
  right: 0;
  top: 0;
  width: 300px;
  z-index: 999;

  [data-element='close'] {
    color: $gray;
    cursor: pointer;
    height: 15px;
    line-height: 15px;
    position: absolute;
    right: 5px;
    text-align: center;
    top: 5px;
    width: 15px;

    &:hover,
    &:active,
    &:focus {
      color: $black-light;
    }
  }

  &[data-small-width-flag='true'] {
    left: 0;
    margin: 10px auto;
    right: 0;
    width: 97%;
  }

  &[data-visible='true'] {
    animation-direction: alternate;
    animation-duration: .5s;
    animation-iteration-count: 1;
    animation-name: test;
    display: block;
  }

  &[data-effect='trans'] {
    animation-direction: alternate;
    animation-duration: .5s;
    animation-iteration-count: 1;
    animation-name: test;
  }
}

@keyframes test {
  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.1);
  }
}
```
  </div>
</div>

Create and show notification:

```js
var notification = new Modi({ template: modiNotificationTplConfig });
```
```html
<button class="button" onclick="notification.show('Eh! I am not supposed to be a notification!')">
  Show notification
</button>
<button class="button" onclick="notification.show('But now you are some sort of a notification :)')">
  Replace notification
</button>
```
<script style="text/javascript">
var notification = new Modi({ template: modiNotificationTplConfig });
</script>
<button class="button" onclick="notification.show('Eh! I am not supposed to be a notification!')">
  Show notification
</button>
<button class="button" onclick="notification.show('But now you are some sort of a notification :)')">
  Replace notification
</button>

Changing the life time:

```js
var notification = new Modi({
  template: modiNotificationTplConfig,
  data: { delay: 500 },
  content: 'Buuuu!'
});
```
<script style="text/javascript">
var notificationDelay = new Modi({
  template: modiNotificationTplConfig,
  data: { delay: 500 },
  content: "Buuuu!"
});
</script>
<button class="button" onclick="notificationDelay.show()">notification.show();</button>

Changing the color:

```css
.modi-notification-color {
  background-color: #f0ffd6;
}
```
<style>
.modi-notification-color {
  background-color: #f0ffd6;
}
</style>
```js
var notification = new Modi({
  template: modiNotificationTplConfig,
  data: { class: 'modi-notification modi-notification-color' },
  content: 'How do I look? :)'
});
```
<script style="text/javascript">
var notificationColor = new Modi({
  template: modiNotificationTplConfig,
  data: { class: 'modi-notification modi-notification-color' },
  content: 'How do I look? :)'
});
</script>
<button class="button" onclick="notificationColor.show()">notification.show();</button>

<div markdown="1" class="note">
On this page, as there are multiple notificatons and no stacking, only the current one is shown:

```js
var notifications = document.body.querySelectorAll('.modi-notification');
notifications.forEach((notification) => {
  notification.addEventListener('modal:show', (e) => {
    [].forEach.call(notifications, (notification) => {
      if (notification.dataset.visible === 'true' && e.detail.modal !== notification) {
        notification._Modi.hide();
      }
    });
  });
});
```
</div>

<script style="text/javascript">
var notifications = document.body.querySelectorAll('.modi-notification');
notifications.forEach((notification) => {
  notification.addEventListener('modal:show', (e) => {
    [].forEach.call(notifications, (notification) => {
      if (notification.dataset.visible === 'true' && e.detail.modal !== notification) {
        notification._Modi.hide();
      }
    });
  });
});
</script>
