import uiRouter from 'angular-ui-router';
import component from './orders.component';

export default angular
  .module('orders', [
    uiRouter
  ])
  .config(($stateProvider) => {
    'ngInject';
    $stateProvider
      .state('orders', {
        url: '/orders',
        component: 'orders'
      });
  })
  .component('orders', component)
  .name;
