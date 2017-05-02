import Template from './modal.html';


class Controller {
  constructor($scope) {
    'ngInject';
    $scope.$watch(() => this.end, (newValue) => {
      this.options.start.maxDate = newValue;
    });
  }

  $onInit() {
    this.start = angular.copy(this.resolve.start);
    this.end = angular.copy(this.resolve.end);
    this.options = {
      start: {
        maxDate: this.end,
        showWeeks: false
      },
      end: {
        maxDate: new Date(),
        showWeeks: false
      }
    };
  }

  cancel() {
    this.dismiss();
  }

  update() {
    this.close({
      $value: {
        start: this.start,
        end: this.end
      }
    });
  }

}

export default {
  template: Template,
  controller: Controller,
  bindings: {
    close: '&',
    dismiss: '&',
    resolve: '<'
  }
};
