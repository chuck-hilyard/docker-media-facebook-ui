import angular from 'angular';
import ngMockE2E from 'angular-mocks/ngMockE2E';


export default angular
  .module('mocks.campaign.get', [
    ngMockE2E
  ])
  .run(($httpBackend) => {
    'ngInject';

    $httpBackend
      .when('GET', /\/campaign\/123456/)
      .respond({
        advertiser: {
          name: 'JJ\'s Plumbing',
          maid: 23456,
          caid: 56978,
          business: 14785
        },
        campaign: {
          name: 'My Campaign 00',
          mcid: 123456,
          ccid: 555555,
          offerName: 'Search Engine Marketing',
          offerId: 1873,
          category: 'Home & Home Improvement',
          subCategory: 'Plumbing',
          cycles: [
            {
              start: new Date(2017, 0, 1),
              end: new Date(2017, 0, 31),
            },
            {
              start: new Date(2017, 1, 1),
              end: new Date(2017, 1, 28)
            },
            {
              start: new Date(2017, 2, 1),
              end: new Date(2017, 2, 31)
            }
          ]

        },
        offer: {
          oid: 63258,
          payment: 'Credit Card',
          budget: 1500,
          cycle: '7 of 9',
          renew: 'On-Immediately'
        }
      });
  })
  .name;