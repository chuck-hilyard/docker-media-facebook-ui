import Template from './date-range.html';


class Controller {
  constructor($uibModal) {
    'ngInject';
    this.$uibModal = $uibModal;
  }

  $onInit() {
    if(angular.isUndefined(this.ranges)) {
      throw new Error('Date range is required.');
    }
    this.dateRanges = angular.copy(this.ranges);
    if(angular.isDefined(this.cycles)) {
      let thisCycle = angular.copy(this.cycles[0]);
      thisCycle.name = 'This Cycle';
      let lastCycle = angular.copy(this.cycles[1]);
      lastCycle.name = 'Last Cycle';
      this.dateRanges.unshift(thisCycle, lastCycle);
    }
    if(!this.range){
      this.dateRange = angular.copy(this.dateRanges[0]);
      this.callback({dateRange: this.dateRange});
    }
  }

  dateModal() {
    let instance = this.$uibModal.open({
      component: 'rlDateRangeModal',
      size: 'lg',
      resolve: {
        cycles: () => this.cycles,
        range: () => this.dateRange,
        ranges: () => this.dateRanges
      }
    });

    instance.result
      .then((response) => {
        this.dateRange = angular.copy(response.range);
        this.callback({dateRange: this.dateRange});
      })
      .catch(() => {
        // Prevent unhandled rejection error
        angular.noop();
      });
  }
}

export default {
  template: Template,
  controller: Controller,
  bindings: {
    callback: '&',
    cycles: '<',
    range: '<',
    ranges: '<'
  }
};
