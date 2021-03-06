// npm
import 'angular';

import uibs from 'angular-ui-bootstrap';
import uiRouter from 'angular-ui-router';

// config
import routeConfig from './config/route.js';

import layout from './layout/index.js';
import screens from './screens/index.js';
import components from './components/index.js';
import services from './services/index.js';

// style
import 'bootstrap/dist/css/bootstrap.css';
import './index.scss';

const deps = [uibs, uiRouter, layout, screens, components, services];

export default angular
  .module('ng-starter', deps)
  .value('config', {})
  .config(routeConfig);

angular.bootstrap(document, ['ng-starter']);
