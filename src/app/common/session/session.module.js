class Session {
  constructor() {
    'ngInject';
  }
}

export default angular
  .module('common.session', [])
  .service('Session', Session)
  .name;
