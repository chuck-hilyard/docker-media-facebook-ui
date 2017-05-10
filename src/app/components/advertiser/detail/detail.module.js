import uiRouter from 'angular-ui-router';
import component from './detail.component';

export default angular
  .module('advertiser.detail', [
    uiRouter
  ])
  .config(($stateProvider) => {
    'ngInject';
    $stateProvider
      .state('advertiser.detail', {
        url: '',
        component: 'advertiser.detail'
      });
  })
  .component('advertiser.detail', component)
  .name;
