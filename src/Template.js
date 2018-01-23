export default class {
  constructor(config, data) {
    this.html = config.html || '';
    this.data = Object.assign({}, config.data, data);
    this.events = config.events || {};
    this.listeners = config.listeners || {};
    this.methods = config.methods || {};
  }

  /**
   * Check if the template has events.
   * @return {boolean}
   */
  hasEvents() {
    return (
      this.events.constructor === [].constructor &&
      this.events.length
    );
  }

  /**
   * Render main template.
   * @return {string}
   */
  render() {
    return this.build(this.html, this.data);
  }

  /**
   * Make template replacements.
   * Source: Kristof Neirynck @ https://stackoverflow.com/a/378000
   * @param {string} tpl Template.
   * @param {object} data Replacements.
   * @return {string}
   */
  build(tpl, data) {
    return tpl.replace(/{([^{}]+)}/g, function(m, key) {
      return data.hasOwnProperty(key) ? data[key] : '';
    });
  }
}
