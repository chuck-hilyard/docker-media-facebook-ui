import uiRouter from 'angular-ui-router';
import ngCookies from 'angular-cookies';
import collapse from 'angular-ui-bootstrap/src/collapse';
import tooltip from 'angular-ui-bootstrap/src/tooltip';
import sidebarComponent from './sidebar.component';
import './sidebar.scss';

export default angular
  .module('common.sidebar', [
    uiRouter,
    ngCookies,
    collapse,
    tooltip
  ])
  .component('rlSidebar', sidebarComponent)
  .name;
