import Template from './expanding-header.html';


class Controller {
  constructor() {
    'ngInject';
    this.column;
    this.open = false;
  }

  $onInit() {
    switch(this.data.columns.length) {
    case(4):
      this.column = 'col-sm-3';
      break;
    case(3):
      this.column = 'col-sm-4';
      break;
    case(2):
      this.column = 'col-sm-6';
      break;
    default:
      this.column = 'col-xs-12';
    }
  }

  toggle() {
    this.open = !this.open;
  }
}

export default {
  template: Template,
  controller: Controller,
  bindings: {
    data: '<'
  }
};
