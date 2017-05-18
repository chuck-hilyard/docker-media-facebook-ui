import trendChart from './trend-chart.service';

export default angular
  .module('campaign.detail.charts', [])
  .service('CampaignTrendChart', trendChart)
  .name;
