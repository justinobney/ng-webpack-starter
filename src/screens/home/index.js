import styles from './index.scss';
import template from './index.html';

function controller($stateParams, $transitions){
  const home = this;

  home.$onInit = () => {
    console.log('home init', $stateParams, $transitions);
  }
}

export default angular
  .module('ng-starter.home', [])
  .component('home', { template, controller })
  .name;
