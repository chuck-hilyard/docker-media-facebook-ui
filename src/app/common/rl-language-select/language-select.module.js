import ngCookies from 'angular-cookies';
import ngTranslate from 'angular-translate';
import config from '../rl-config/rl-config.module';
import component from './language-select.component';

export default angular
  .module('common.language-select', [
    ngCookies,
    ngTranslate,
    config
  ])
  .component('rlLanguageSelect', component)
  .name;
