import angular from 'angular';
import ngMockE2E from 'angular-mocks/ngMockE2E';


export default angular
  .module('mocks.campaign.get', [
    ngMockE2E
  ])
  .run(($httpBackend) => {
    'ngInject';

    $httpBackend
      .when('GET', /\/campaign\/123456$/)
      .respond({
        advertiser: {
          name: 'JJ\'s Plumbing',
          maid: 123456,
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
              start: new Date(2017, 4, 1),
              end: new Date(),
            },
            {
              start: new Date(2017, 3, 1),
              end: new Date(2017, 4, 1)
            },
            {
              start: new Date(2017, 2, 1),
              end: new Date(2017, 3, 1)
            },
            {
              start: new Date(2017, 1, 1),
              end: new Date(2017, 2, 1)
            }
          ]

        },
        order: {
          oid: 123456,
          payment: 'Credit Card',
          budget: 1500,
          cycle: '7 of 9',
          renew: 'On-Immediately'
        }
      });
  })
  .name;