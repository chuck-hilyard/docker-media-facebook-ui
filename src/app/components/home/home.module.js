import uiRouter from 'angular-ui-router';
import tooltip from 'angular-ui-bootstrap/src/tooltip';
import component from './home.component';
import './home.scss';


export default angular
  .module('home', [
    uiRouter,
    tooltip
  ])
  .config(($stateProvider) => {
    'ngInject';
    $stateProvider
      .state('home', {
        url: '/',
        component: 'home'
      });
  })
  .component('home', component)
  .name;
