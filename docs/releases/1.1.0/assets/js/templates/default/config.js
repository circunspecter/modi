export default {

  html: `
  <div class="{class}" data-element="overlay" data-visible="false" data-outside-close="{outsideClose}">
    <div data-element="modal" data-small-width="500">
      <span data-element="close">×</span>
      <div data-element="content"></div>
    </div>
  </div>
  `,

  data: {
    class: 'modi',
    outsideClose: true
  }
};
