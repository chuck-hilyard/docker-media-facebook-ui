export default class Charts {

  constructor($filter) {
    // Chart-JS Attributes
    this.colors = [];
    this.chart = {};

    // Abstractions
    this.optionsAbstract = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            gridLines: {
              display: false,
            }
          }
        ]
      }
    };

    this.yAxisAbstract = {
      gridLines: {
        drawBorder: false,
        drawTicks: false
      }
    };
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

  // Setters for build. Overwrite in child class.
  setLabels(data) {
    return data.map((item) => {
      let parts = item.date.split('-');
      return this.$filter('date')(new Date(parts[0], (parts[1] - 1), parts[2]), 'MMM dd');
    });
  }

  setData() {
    return [];
  }

  setOptions() {
    return {};
  }

}
