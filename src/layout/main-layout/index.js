// import styles from './index.scss';
import template from './index.html';

export default angular
  .module('ng-starter.layout.mainLayout', [])
  .component('mainLayout', {
    template,
    transclude: true
  })
  .name;
