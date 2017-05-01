export default class Sidebar {
  constructor() {
    this.links = [
      {
        translateKey: 'campaign.detail',
        state: 'campaign.detail',
        icon: 'fa-line-chart',
        order: 0,
        children: []
      },
      {
        translateKey: 'campaign.edit',
        state: 'campaign.edit',
        icon: 'fa-pencil',
        order: 1,
        children: []
      },
      {
        translateKey: 'campaign.test',
        state: 'home',
        icon: 'fa-star',
        order: 1,
        children: [
          {
            translateKey: 'campaign.sub',
            state: 'campaign.sub',
            order: 0
          }
        ]
      }
    ];
  }
}
