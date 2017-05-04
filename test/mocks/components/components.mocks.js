import getAdvertiser from './advertiser/get_advertiser';
import getCampaign from './campaign/get_campaign';
import getOrder from './order/get_order';

export default angular
  .module('mocks.components', [
    getAdvertiser,
    getCampaign,
    getOrder
  ])
  .name;
