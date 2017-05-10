import uiRouter from 'angular-ui-router';
import component from './advertisers.component';

export default angular
  .module('advertisers', [
    uiRouter
  ])
  .config(($stateProvider) => {
    'ngInject';
    $stateProvider
      .state('advertisers', {
        url: '/advertisers',
        component: 'advertisers'
      });
  })
  .component('advertisers', component)
  .name;
