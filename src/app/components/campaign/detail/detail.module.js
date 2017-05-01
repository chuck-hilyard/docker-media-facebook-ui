import uiRouter from 'angular-ui-router';
import component from './detail.component';

export default angular
  .module('campaign.detail', [
    uiRouter
  ])
  .config(($stateProvider) => {
    'ngInject';
    $stateProvider
      .state('campaign.detail', {
        url: '',
        component: 'campaign.detail'
      });
  })
  .component('campaign.detail', component)
  .name;
