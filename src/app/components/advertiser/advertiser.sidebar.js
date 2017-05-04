export default class Sidebar {
  constructor() {
    this.links = [
      {
        translateKey: 'advertiser.detail',
        state: 'campaign.detail',
        icon: 'fa-line-chart',
        order: 0,
        children: []
      },
      {
        translateKey: 'advertiser.edit',
        state: 'advertiser.edit',
        icon: 'fa-pencil',
        order: 1,
        children: []
      },
      {
        translateKey: 'advertiser.test',
        state: 'home',
        icon: 'fa-star',
        order: 1,
        children: [
          {
            translateKey: 'advertiser.sub',
            state: 'advertiser.sub',
            order: 0
          }
        ]
      }
    ];
  }
}
