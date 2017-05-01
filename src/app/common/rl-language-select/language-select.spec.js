describe('common.language-select', () => {

  let $ctrl;
  let $cookies;
  let mockTranslate = {
    use: () => {
      return 'en';
    }
  };

  beforeEach(() => {
    angular.mock.module('common.language-select');

    angular.mock.inject(($injector) => {
      $cookies = $injector.get('$cookies');
      let locals = {
        $translate: mockTranslate
      };
      let $componentController = $injector.get('$componentController');
      $ctrl = $componentController('rlLanguageSelect', locals);
    });
  });

  it('constructs', () => {
    $ctrl.$onInit();
    expect($ctrl.language).toBe('en');
  });

  it('update language', () => {
    spyOn($cookies, 'put');
    spyOn(mockTranslate, 'use');
    $ctrl.language = 'es';
    $ctrl.update();
    expect($cookies.put).toHaveBeenCalled();
    expect(mockTranslate.use).toHaveBeenCalledWith('es');
  });

});
