import styles from './index.scss';
import template from './index.html';

function controller(){
  const home = this;

  home.$onInit = () => {
    console.log('home init');
  }
}

export default angular
  .module('ng-starter.home', [])
  .component('home', { template, controller })
  .name;
