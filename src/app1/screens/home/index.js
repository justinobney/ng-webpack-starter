import './index.scss';
import template from './index.html';

function controller(auth){
  const ctrl = this;

  ctrl.$onInit = () => {
    console.log('home init');
  }
}

export default angular
  .module('ng-starter.home', [])
  .component('home', { template, controller })
  .name;
