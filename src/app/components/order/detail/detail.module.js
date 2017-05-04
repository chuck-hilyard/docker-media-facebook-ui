import uiRouter from 'angular-ui-router';
import component from './detail.component';

export default angular
  .module('order.detail', [
    uiRouter
  ])
  .config(($stateProvider) => {
    'ngInject';
    $stateProvider
      .state('order.detail', {
        url: '',
        component: 'order.detail'
      });
  })
  .component('order.detail', component)
  .name;
