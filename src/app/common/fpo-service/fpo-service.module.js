class service {

  constructor($http) {
    'ngInject';
    this.$http = $http;
  }

  get(address) {
    return this.$http({
      method: 'GET',
      url: 'https://maps.googleapis.com/maps/api/geocode/json',
      params: {
        address: address
      }
    });
  }

}

export default angular
  .module('common.fpoService', [])
  .service('FpoService', service)
  .name;
