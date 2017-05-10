import getAdvertiser from './advertiser/get_advertiser';
import campaign from './campaign/campaign';
import getOrder from './order/get_order';

export default angular
  .module('mocks.components', [
    getAdvertiser,
    campaign,
    getOrder
  ])
  .name;
