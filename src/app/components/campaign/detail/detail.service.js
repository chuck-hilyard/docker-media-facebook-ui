export default class Service {

  constructor($http) {
    'ngInject';
    this.$http = $http;
  }

  getTrendData(mcid, params) {
    let config = {
      params: params
    };
    this.$http.get(`/campaign/${mcid}/trend-data`, config)
      .then((resonse) => {
        console.log('get trend data', resonse);
      });
  }

}
