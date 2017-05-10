import Template from './expanding-header.html';


class Controller {
  constructor() {
    'ngInject';
    this.open = false;
  }

  toggle() {
    this.open = !this.open;
  }
}

export default {
  template: Template,
  controller: Controller,
  transclude: true,
  bindings: {
    data: '<'
  }
};
