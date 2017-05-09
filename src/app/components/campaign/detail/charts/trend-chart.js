export default class TrendChart {

  constructor(data, metrics, $filter) {
    this.$filter = $filter;

    this.colors = ['#23a4a9', '#bdd964'];
    this.data = this.setData(data, metrics);
    this.labels = this.setLabels(data);
    this.options = this.setOptions(metrics);
    this.override = this.setOverride(metrics);
  }

  setData(data, metrics) {
    let output = [];
    metrics.forEach((metric) => {
      output.push(data.map((item) => item[metric.id]));
    });
    return output;
  }

  setLabels(data) {
    return data.map((item) => {
      let parts = item.date.split('-');
      return this.$filter('date')(new Date(parts[0], (parts[1] - 1), parts[2]), 'MMM dd')
    });
  }

  setOptions(metrics) {
    let yAxes = [];
    metrics.forEach((metric, index) => {
      let position = (index === 0) ? 'left' : 'right';
      let axis = {
        id: position,
        position: position,
        gridLines: {
          drawBorder: false,
          drawTicks: false
        }
      };
      switch(metric.format) {
      case 'currency':
        axis.ticks = {
          callback: (dataLabel) => {
            return this.$filter('currency')(dataLabel);
          }
        };
        break;
      }
      yAxes.push(axis);
    });

    return {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: true,
        position: 'bottom'
      },
      scales: {
        xAxes: [{
          gridLines: {
            display: false,
          }
        }],
        yAxes: yAxes
      }
    };
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
