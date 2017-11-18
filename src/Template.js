export default class {
  constructor(config, data) {
    this.html = config.html || '';
    this.data = Object.assign({}, config.data, data);
    this.events = config.events || {};
    this.listeners = config.listeners || {};
    this.methods = config.methods || {};
  }

  hasEvents() {
    return (
      this.events.constructor === [].constructor &&
      this.events.length
    );
  }

  // Source: Kristof Neirynck @ https://stackoverflow.com/a/378000
  render() {
    return this.html.replace(/{([^{}]+)}/g, (m, key) => {
      return this.data.hasOwnProperty(key) ? this.data[key] : '';
    });
  }
}
