import Template from './date-range.html';


class Controller {
  constructor($uibModal) {
    'ngInject';
    this.$uibModal = $uibModal;
  }

  $onInit() {
    this.range = {
      name: 'This Cycle',
      start: this.getStartDate(),
      end: new Date()
    };
  }

  getStartDate() {
    let date = new Date();
    return date.setDate(date.getDate() - 21);
  }

  dateModal() {
    let instance = this.$uibModal.open({
      component: 'rlDateRangeModal',
      size: 'lg',
      resolve: {
        start: () => {
          return this.range.start;
        },
        end: () => {
          return this.range.end;
        }
      }
    });

    instance.result
      .then((response) => {
        this.range.start = angular.copy(response.start);
        this.range.end = angular.copy(response.end);
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
    data: '<'
  }
};
