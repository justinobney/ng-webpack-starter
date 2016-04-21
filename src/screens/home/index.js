import styles from './index.scss';
import template from './index.html';

function HomeController(){
  const home = this;

  home.$postLink = () => {
    console.log('home init');
  }
}

export default angular
  .module('ng-starter.home', [])
  .component('home', {
    template: template,
    controller: HomeController
  })
  .name;
