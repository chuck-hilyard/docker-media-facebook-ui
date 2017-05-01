import navbarTemplate from './navbar.html';


class NavbarController {

  constructor($state) {
    'ngInject';
    this.collapsed = true;
    this.$state = $state;
  }

  // Checks if state is for campaigns
  // @returns bool
  //
  campaignState() {
    return this.$state.current.name.indexOf('campaign') > -1;
  }

  // Toggle menu in mobile view
  toggle() {
    this.collapsed = !this.collapsed;
  }

}

export default {
  template: navbarTemplate,
  controller: NavbarController
};
