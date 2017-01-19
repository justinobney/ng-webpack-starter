// npm
import 'angular';

import uibs from 'angular-ui-bootstrap';
import uiRouter from 'angular-ui-router';

import core from '../core/index.js'

// config
import routeConfig from './config/route.js';

import screens from './screens/index.js';
import components from './components/index.js'
import services from './services/index.js';

const deps = [
  uibs,
  uiRouter,
  core,
  screens,
  components,
  services
];

export default angular.module('ng-starter', deps)
  .value('config', {})
  .name;
