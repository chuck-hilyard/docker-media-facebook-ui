import mocks from './foo.mocks';

describe('components.foo', () => {

  let $ctrl;

  beforeEach(() => {

    angular.mock.inject(($injector) => {
      let $componentController = $injector.get('$componentController');
      $ctrl = $componentController('campaign');
    });
  });

  it('constructs', () => {
    expect($ctrl.sidebar).toEqual(mocks.links);
  });

});
