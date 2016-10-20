// npm
import 'lodash';
import 'angular';


import uibs from 'angular-ui-bootstrap';
import uiRouter from 'angular-ui-router';

// config
import routeConfig from './config/route.js';

import screens from './screens/index.js';
import components from './components/index.js'
import services from './services/index.js';

// app template
import appTemplate from './screens/app.html';

// style
import styles from 'index.scss';

function onAppStart (config) {
  config.apiHeader = localStorage.getItem('apiHeader');
}

const deps = [
  uibs,
  uiRouter,
  screens,
  components,
  services
];


export default angular.module('ng-starter', deps)
  .component('app', {
    template: appTemplate
  })
  .value('config', {})
  .config(routeConfig)
  .run(onAppStart);

angular.bootstrap(document, ['ng-starter']);
