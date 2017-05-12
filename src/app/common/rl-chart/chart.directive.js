import Chart from 'chart.js';

function link(scope, element) {
  scope.$watch('data', createChart, true);

  function createChart(data) {
    if (!validateData(data)) {
      return;
    }
    if (scope.chart) {
      scope.chart.destroy();
    }
    scope.chart = new Chart(element[0], angular.copy(data));
  }

  function validateData(newValue) {
    if (typeof newValue !== 'object') {
      return false;
    }
    if (!newValue.hasOwnProperty('type')) {
      return false;
    }
    if (!newValue.hasOwnProperty('data')) {
      return false;
    }
    return true;
  }
}

export default function rlChart() {

  return {
    restrict: 'E',
    template: '<canvas></canvas>',
    replace: true,
    scope: {
      data: '<'
    },
    link: link
  };

}
