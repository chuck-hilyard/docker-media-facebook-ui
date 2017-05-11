export default class Charts {

  constructor($filter) {
    // Chart-JS Attributes
    this.colors = [];
    this.data = [];
    this.labels = [];
    this.options = {};
    this.override = [];

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

  build(data, metrics) {
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
      return this.$filter('date')(new Date(parts[0], (parts[1] - 1), parts[2]), 'MMM dd');
    });
  }

  setOptions() {
    return {};
  }

  setOverride() {
    return [];
  }

}
