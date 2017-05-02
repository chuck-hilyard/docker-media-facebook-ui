import dateRange from '../rl-date-range/date-range.module';
import component from './expanding-header.component';
import './expanding-header.scss';

export default angular
  .module('common.export-header', [
    dateRange
  ])
  .component('rlExpandingHeader', component)
  .name;
