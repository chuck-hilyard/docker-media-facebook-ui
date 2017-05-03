import Template from './modal.html';


class Controller {
  constructor($scope) {
    'ngInject';
    $scope.$watchCollection(() => this.range, (newValue) => {
      this.getRangeName();
      this.options.start.maxDate = newValue.end;
      this.options.end.minDate = newValue.start;
    });
  }

  $onInit() {
    this.range = angular.copy(this.resolve.range);
    this.ranges = angular.copy(this.resolve.ranges);
    this.options = {
      start: {
        maxDate: this.range.end,
        showWeeks: false
      },
      end: {
        minDate: this.range.start,
        maxDate: new Date(),
        showWeeks: false
      }
    };
  }

  cancel() {
    this.dismiss();
  }

  getRangeName() {
    let match = this.ranges.find((range) => {
      let start = this.range.start.getTime() === range.start.getTime();
      let end = this.range.end.getTime() === range.end.getTime();
      return start && end;
    });
    this.range.name = angular.isDefined(match) ? match.name : null;
  }

  setRange(range) {
    this.range = angular.copy(range);
  }

  update() {
    this.close({
      $value: {
        range: this.range
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
