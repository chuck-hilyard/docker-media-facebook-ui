import navbarTemplate from './navbar.html';


class NavbarController {

  constructor($state) {
    'ngInject';
    this.collapsed = true;
    this.$state = $state;
  }

  // Close menu after clicking link
  // @return void
  //
  collapse() {
    this.collapsed = true;
  }

  // Toggle menu in mobile view
  // @return void
  //
  toggle() {
    this.collapsed = !this.collapsed;
  }

  // Campaign state checker
  // @return bool
  //
  get campaign() {
    return this.$state.current.name.indexOf('campaign') > -1;
  }

}

export default {
  template: navbarTemplate,
  controller: NavbarController
};
