class Session {
  constructor() {
    'ngInject';
    this.dateRange = null;
  }
}

export default angular
  .module('common.session', [])
  .factory('Session', () => new Session())
  .name;
