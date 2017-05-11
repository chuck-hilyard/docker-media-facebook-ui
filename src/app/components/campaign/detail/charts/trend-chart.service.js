import Chart from '../../../../common/rl-chart/chart.abstract';

export default class TrendChart extends Chart {

  constructor($filter) {
    'ngInject';
    super();
    this.$filter = $filter;
    this.colors = ['#23a4a9', '#bdd964'];
  }

  setData(data, metrics) {
    return [
      {
        backgroundColor: this.colors[0],
        borderColor: this.colors[0],
        borderWidth: 4,
        data: data.map((item) => item[metrics[0].id]),
        fill: false,
        label: metrics[0].label,
        lineTension: 0,
        pointRadius: 0,
        type: 'line',
        yAxisID: 'left'
      },
      {
        backgroundColor: this.colors[1],
        borderColor: this.colors[1],
        data: data.map((item) => item[metrics[1].id]),
        hoverBackgroundColor: '#cae183',
        hoverBorderColor: '#cae183',
        label: metrics[1].label,
        yAxisID: 'right'
      }
    ];
  }

  setOptions(metrics) {
    let yAxes = [];
    metrics.forEach((metric, index) => {
      let position = (index === 0) ? 'left' : 'right';
      let axis = angular.merge({}, this.yAxisAbstract, {
        id: position,
        position: position
      });
      switch(metric.format) {
      case 'currency':
        axis.ticks = {
          callback: (dataLabel) => this.$filter('currency')(dataLabel)
        };
        break;
      }
      yAxes.push(axis);
    });

    return angular.merge({}, this.optionsAbstract, {
      scales: {
        yAxes: yAxes
      }
    });
  }

}
