// import styles from './index.scss';
import template from './index.html';
import nav from './nav.html';

export default angular
  .module('ng-starter.layout.mainLayout', [])
  .component('mainLayout', {
    template,
    transclude: true,
  })
  .component('mainNav', {template: nav}).name;
