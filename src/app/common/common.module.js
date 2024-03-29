import sso from './rl-sso/sso.module';
import config from './rl-config/rl-config.module';
import navbar from './rl-navbar/navbar.module';
import sidebar from './rl-sidebar/sidebar.module';
import footer from './rl-footer/footer.module';
import expandingHeader from './rl-expanding-header/expanding-header.module';
import chart from './rl-chart/chart.module';
import languageSelect from './rl-language-select/language-select.module';
import session from './session/session.module';
import colors from './rl-colors/colors.module';


export default angular
  .module('common', [
    sso,
    config,
    navbar,
    sidebar,
    footer,
    expandingHeader,
    chart,
    languageSelect,
    session,
    colors
  ])
  .name;
