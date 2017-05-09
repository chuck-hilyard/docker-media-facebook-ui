import ngMockE2E from 'angular-mocks/ngMockE2E';
import impressionsSpend from './trend-data/impressions-spend';
import impressionsClicks from './trend-data/impressions-clicks';
import clicksSpend from './trend-data/clicks-spend';


export default angular
  .module('mocks.campaign.getTrend', [
    ngMockE2E
  ])
  .run(($httpBackend) => {
    'ngInject';

    $httpBackend
      .when('GET', /\/campaign\/123456\/trend-data\?dates=[0-9]{4}-[0-9]{2}-[0-9]{2},[0-9]{4}-[0-9]{2}-[0-9]{2}&metrics=impressions,spend$/)
      .respond(impressionsSpend);

    $httpBackend
      .when('GET', /\/campaign\/123456\/trend-data\?dates=[0-9]{4}-[0-9]{2}-[0-9]{2},[0-9]{4}-[0-9]{2}-[0-9]{2}&metrics=impressions,clicks$/)
      .respond(impressionsClicks);

    $httpBackend
      .when('GET', /\/campaign\/123456\/trend-data\?dates=[0-9]{4}-[0-9]{2}-[0-9]{2},[0-9]{4}-[0-9]{2}-[0-9]{2}&metrics=clicks,spend$/)
      .respond(clicksSpend);

  })
  .name;
