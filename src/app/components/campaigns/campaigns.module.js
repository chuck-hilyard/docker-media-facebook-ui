import uiRouter from 'angular-ui-router';
import component from './campaigns.component';

export default angular
  .module('campaigns', [
    uiRouter
  ])
  .config(($stateProvider) => {
    'ngInject';
    $stateProvider
      .state('campaigns', {
        url: '/campaigns',
        component: 'campaigns'
      });
  })
  .component('campaigns', component)
  .name;
