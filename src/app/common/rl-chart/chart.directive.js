import Chart from 'chart.js';

export default class rlChart {
  constructor() {
    'ngInject';
    this.restrict = 'E';
    this.template = '<canvas></canvas>';
    this.replace = true;
    this.scope = {
      data: '<'
    };
  }

  link(scope, element) {
    let _this = this;
    scope.$watch('data', watchData, true);
    function watchData(newValue, oldValue) {
      if (_this.validateData(newValue, oldValue)) {
        let ctx = element[0];
        _this.createChart(ctx, newValue);
      }
    }
  }

  createChart(ctx, data) {
    if(this.chart) {
      this.chart.destroy();
    }
    this.chart = new Chart(ctx, angular.copy(data));
  }

  validateData(newValue, oldValue) {
    if (typeof newValue !== 'object') {
      return false;
    }
    if (JSON.stringify(newValue) === JSON.stringify(oldValue)) {
      return false;
    }
    if (!newValue.hasOwnProperty('type')) {
      return false;
    }
    if (!newValue.hasOwnProperty('data')) {
      return false;
    }
    if (!newValue.hasOwnProperty('options')) {
      return false;
    }
    return true;
  }

};
