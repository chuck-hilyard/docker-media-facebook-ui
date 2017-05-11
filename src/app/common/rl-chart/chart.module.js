import ChartsDirective from './chart.directive';

export default angular
  .module('common.chart', [])
  .directive('rlChart', () => new ChartsDirective())
  .name;
