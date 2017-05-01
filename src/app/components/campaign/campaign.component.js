import template from './campaign.html';


class Controller {
  constructor(CampaignSidebar) {
    'ngInject';

    this.sidebar = CampaignSidebar;
  }


}

export default {
  template: template,
  controller: Controller,
  bindings: {
    campaign: '<'
  }
};
