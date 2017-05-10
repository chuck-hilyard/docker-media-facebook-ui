import get from './campaign.get';
import getTrend from './campaign.get-trend';

export default angular
  .module('mocks.campaign', [
    get,
    getTrend
  ])
  .name;
