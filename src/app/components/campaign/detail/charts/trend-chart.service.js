export default class TrendChart{

  constructor($filter, rlColors) {
    'ngInject';
    this.$filter = $filter;
    this.chart = {};
    this.colors = [
      rlColors.charts[4].shades[0],
      rlColors.charts[2].shades[0]
    ];
    this.hoverColors = [
      rlColors.charts[4].shades[1],
      rlColors.charts[2].shades[1]
    ];
  }

  build(type, data, metrics) {
    let _this = this;
    this.chart = {
      type: type,
      data: {
        labels: _this.setLabels(data),
        datasets: _this.setData(data, metrics)
      },
      options: _this.setOptions(metrics)
    };
  }

  setLabels(data) {
    return data.map((item) => {
      let parts = item.date.split('-');
      return this.$filter('date')(new Date(parts[0], (parts[1] - 1), parts[2]), 'MMM dd');
    });
  }

  setData(data, metrics) {
    return [
      {
        backgroundColor: this.colors[0],
        borderColor: this.colors[0],
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
        hoverBackgroundColor: this.hoverColors[1],
        hoverBorderColor: this.hoverColors[1],
        label: metrics[1].label,
        yAxisID: 'right'
      }
    ];
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
          callback: (dataLabel) => this.$filter('currency')(dataLabel)
        };
        break;
      }
      yAxes.push(axis);
    });

    return {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              display: false,
            }
          }
        ],
        yAxes: yAxes
      },
      tooltips: {
        bodySpacing: 4,
        mode: 'index'
      }
    };
  }

}
