/**
 * Defines Webpack globals into an Angular Service.
 *
 */

class service {

  constructor() {
    this.languages = LANGUAGES;
  }

}

export default angular
  .module('common.rlConfig', [])
  .service('Config', service)
  .name;
