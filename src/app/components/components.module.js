import home from './home/home.module';
import campaigns from './campaigns/campaigns.module';
import campaign from './campaign/campaign.module';

export default angular
  .module('components', [
    home,
    campaigns,
    campaign
  ])
  .name;
