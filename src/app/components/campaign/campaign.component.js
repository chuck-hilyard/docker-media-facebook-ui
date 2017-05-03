import template from './campaign.html';


class Controller {
  constructor(CampaignSidebar) {
    'ngInject';
    this.sidebar = CampaignSidebar;
    this.header = {};
  }

  $onInit() {
    this.setHeader();
  }

  setHeader() {
    this.header = {
      type: 'Campaign',
      title: 'My Campaign 01',
      subType: 'Advertiser',
      subTitle: 'JJ\'s Plumbing',
      subLink: `advertiser.detail({maid:${this.campaign.data.advertiser.maid}})`,
      columns: [
        {
          title: 'Advertiser',
          rows: [
            {
              name: 'Advertiser Name',
              value: this.campaign.data.advertiser.name,
              link: `advertiser.detail({maid:${this.campaign.data.advertiser.maid}})`
            },
            {
              name: 'Master Advertiser ID',
              value: this.campaign.data.advertiser.maid
            },
            {
              name: 'Current Advertiser ID',
              value: this.campaign.data.advertiser.caid,
            },
            {
              name: 'Advertiser Business',
              value: this.campaign.data.advertiser.business
            }
          ]
        },
        {
          title: 'Campaign',
          rows: [
            {
              name: 'Master Campaign ID',
              value: this.campaign.data.campaign.mcid
            },
            {
              name: 'Current Campaign ID',
              value: this.campaign.data.campaign.ccid
            },
            {
              name: 'Offer Name',
              value: this.campaign.data.campaign.offerName
            },
            {
              name: 'Offer ID',
              value: this.campaign.data.campaign.offerId
            },
            {
              name: 'Business Category',
              value: this.campaign.data.campaign.category
            },
            {
              name: 'Business Sub Category',
              value: this.campaign.data.campaign.subCategory
            }
          ]
        },
        {
          title: 'Order Information',
          rows: [
            {
              name: 'Order ID',
              value: this.campaign.data.offer.oid,
              link: `order.detail({oid:${this.campaign.data.offer.oid}})`
            },
            {
              name: 'Payment Type',
              value: this.campaign.data.offer.payment
            },
            {
              name: 'Current Budget',
              value: this.campaign.data.offer.budget
            },
            {
              name: 'Current Cycle',
              value: this.campaign.data.offer.cycle
            },
            {
              name: 'Auto Renew Type',
              value: this.campaign.data.offer.renew
            }
          ]
        }
      ]
    };
  }



}

export default {
  template: template,
  controller: Controller,
  bindings: {
    campaign: '<'
  }
};
