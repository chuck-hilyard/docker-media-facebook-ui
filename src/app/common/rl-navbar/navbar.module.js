import uiRouter from 'angular-ui-router';
import collapse from 'angular-ui-bootstrap/src/collapse';
import dropdown from 'angular-ui-bootstrap/src/dropdown';
import component from './navbar.component';
import './navbar.scss';


export default angular
  .module('common.navbar', [
    uiRouter,
    collapse,
    dropdown
  ])
  .component('rlNavbar', component)
  .name;
