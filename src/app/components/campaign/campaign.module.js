import uiRouter from 'angular-ui-router';
import component from './campaign.component';
import sidebar from './campaign.sidebar';
import detail from './detail/detail.module';

export default angular
  .module('campaign', [
    uiRouter,
    detail
  ])
  .config(($stateProvider) => {
    'ngInject';
    $stateProvider
      .state('campaign', {
        redirectTo: 'campaign.detail',
        url: '/campaign/:mcid',
        component: 'campaign',
        resolve: {
          campaign: ($http, $stateParams) => $http.get(`/campaign/${$stateParams.mcid}`)
        }
      });
  })
  .component('campaign', component)
  .service('CampaignSidebar', sidebar)
  .name;
