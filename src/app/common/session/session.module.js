class Session {
  constructor() {
    'ngInject';
    this.dateRange = {};
  }
}

export default angular
  .module('common.session', [])
  .service('Session', Session)
  .name;
