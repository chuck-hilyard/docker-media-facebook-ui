import modal from 'angular-ui-bootstrap/src/modal';
import component from './date-range.component';
import dateRangeModal from './modal/modal.module';


export default angular
  .module('common.date-range', [
    modal,
    dateRangeModal
  ])
  .component('rlDateRange', component)
  .name;
