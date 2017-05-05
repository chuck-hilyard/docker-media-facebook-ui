import uiRouter from 'angular-ui-router';
import chartJs from 'angular-chart.js';
import component from './detail.component';
import './detail.scss';

export default angular
  .module('campaign.detail', [
    uiRouter,
    chartJs
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
