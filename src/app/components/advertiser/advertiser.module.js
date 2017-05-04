import uiRouter from 'angular-ui-router';
import component from './advertiser.component';
import sidebar from './advertiser.sidebar';
import detail from './detail/detail.module';

export default angular
  .module('advertiser', [
    uiRouter,
    detail
  ])
  .config(($stateProvider) => {
    'ngInject';
    $stateProvider
      .state('advertiser', {
        redirectTo: 'advertiser.detail',
        url: '/advertiser/:maid',
        component: 'advertiser',
        resolve: {
          advertiser: ($http, $stateParams) => $http.get(`/advertiser/${$stateParams.maid}`)
        }
      });
  })
  .component('advertiser', component)
  .service('AdvertiserSidebar', sidebar)
  .name;
