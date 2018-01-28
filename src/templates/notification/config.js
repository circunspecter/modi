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

    show: (detail) => {
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
