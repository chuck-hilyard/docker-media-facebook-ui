describe('Foo', () => {

  beforeEach(() => {
    browser.get('index.html#!/foo/category');
  });

  it('should have the title `Foo Categories`', () => {
    let title = element(by.css('h1'));
    expect(title.getText()).toBe('Foo Categories');
  });

  it('should have the correct sidebar links', () => {
    let links = element.all(by.css('.rl-sidebar .list-group-item'));
    expect(links.getText()).toEqual(['Foo Categories', 'Category 1', 'Category 2', 'Category 3', 'Items']);
  });

  it('should have $parentData populated', () => {
    let data = element(by.css('pre'));
    expect(data.getText()).toContain('[{"mocked":true}]');
  });

});
