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
      name: 'accept',
      type: 'click',
      selector: '[data-element="actions"] [data-action="accept"]',
      dispatcher: 'instance'
    },
    {
      name: 'cancel',
      type: 'click',
      selector: '[data-element="actions"] [data-action="cancel"]',
      dispatcher: 'modal'
    }
  ]
};
