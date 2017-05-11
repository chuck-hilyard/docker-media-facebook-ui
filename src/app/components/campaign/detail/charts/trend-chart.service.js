import Chart from './charts.abstract';

export default class TrendChart extends Chart {

  constructor($filter) {
    'ngInject';
    super();
    this.$filter = $filter;
    this.colors = ['#23a4a9', '#bdd964'];
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

  setOverride(metrics) {
    return [
      {
        borderWidth: 4,
        fill: false,
        label: metrics[0].label,
        lineTension: 0,
        pointRadius: 0,
        type: 'line',
        yAxisID: 'left'
      },
      {
        backgroundColor: this.colors[1],
        hoverBackgroundColor: '#cae183',
        hoverBorderColor: '#cae183',
        label: metrics[1].label,
        yAxisID: 'right'
      }
    ];
  }

}
