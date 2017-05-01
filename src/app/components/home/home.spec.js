describe('components.home', () => {

  let $ctrl;

  beforeEach(() => {
    angular.mock.module('components.home');

    angular.mock.inject(($injector) => {
      let $componentController = $injector.get('$componentController');
      $ctrl = $componentController('home');
    });
  });

  it('constructs', () => {
    expect($ctrl).toBeDefined();
  });

});
