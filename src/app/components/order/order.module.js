import uiRouter from 'angular-ui-router';
import component from './order.component';
import sidebar from './order.sidebar';
import detail from './detail/detail.module';

export default angular
  .module('order', [
    uiRouter,
    detail
  ])
  .config(($stateProvider) => {
    'ngInject';
    $stateProvider
      .state('order', {
        redirectTo: 'order.detail',
        url: '/order/:oid',
        component: 'order',
        resolve: {
          order: ($http, $stateParams) => $http.get(`/order/${$stateParams.oid}`)
        }
      });
  })
  .component('order', component)
  .service('OrderSidebar', sidebar)
  .name;
