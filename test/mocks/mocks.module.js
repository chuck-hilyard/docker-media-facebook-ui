import ngMockE2E from 'angular-mocks/ngMockE2E';
import appRoot from '../../src/app/root.module';
import component from './components/components.mocks';

export default angular
  .module('mocks', [
    appRoot,
    ngMockE2E,
    component
  ])
  .name;
