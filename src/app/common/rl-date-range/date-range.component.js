import Template from './date-range.html';


class Controller {
  constructor($uibModal, rlDateRangeService, Session) {
    'ngInject';
    this.$uibModal = $uibModal;
    this.service = rlDateRangeService;
    this.session = Session;
  }

  $onInit() {
    if(!this.session.dateRange){
      this.session.dateRange = this.service.ranges[0];
    }
  }

  dateModal() {
    let instance = this.$uibModal.open({
      component: 'rlDateRangeModal',
      size: 'lg',
      resolve: {
        range: () => this.session.dateRange,
        ranges: () => this.service.ranges
      }
    });

    instance.result
      .then((response) => {
        this.session.dateRange = angular.copy(response.range);
      })
      .catch(() => {
        // Prevent unhandled rejection error
        angular.noop();
      });
  }
}

export default {
  template: Template,
  controller: Controller
};
