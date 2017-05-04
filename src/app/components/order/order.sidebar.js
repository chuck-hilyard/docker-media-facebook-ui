export default class Sidebar {
  constructor() {
    this.links = [
      {
        translateKey: 'order.detail',
        state: 'order.detail',
        icon: 'fa-line-chart',
        order: 0,
        children: []
      },
      {
        translateKey: 'order.edit',
        state: 'order.edit',
        icon: 'fa-pencil',
        order: 1,
        children: []
      },
      {
        translateKey: 'order.test',
        state: 'home',
        icon: 'fa-star',
        order: 1,
        children: [
          {
            translateKey: 'order.sub',
            state: 'order.sub',
            order: 0
          }
        ]
      }
    ];
  }
}
