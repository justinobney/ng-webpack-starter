import angularLock from 'angular-lock';
import angularJwt from 'angular-jwt';
import uiRouter from 'angular-ui-router';

import auth from './auth.js'

function onAppStart(auth, lock){
  auth.registerAuthenticationListener();

  // Register the synchronous hash parser when using UI Router
  lock.interceptHash();
};

const deps = [
  'auth0.lock',
  angularJwt,
  uiRouter,
  auth
];

export default angular.module('ng-starter.core', deps)
  .component('coreLogin', {
    template: `
      <button ng-click="$ctrl.login()">
        Login
      </button>
    `,
    controller(auth){
      const ctrl = this;

      ctrl.login = () => {
        auth.login()
      }
    }
  })
  .config(($transitionsProvider, lockProvider) => {

    lockProvider.init({
      clientID: 'LAu3aKVtPEdks0oNMIFzAOwynLaE84YP',
      domain: 'elevator2.auth0.com',
      options: {
        auth: { sso: true },
        rememberLastLogin: false
      }
    });

    registerAuthHook();
    function registerAuthHook(){
      let requiresAuthCriteria = {
        to: (state) => state.data && state.data.requiresAuth
      };

      let redirectToLogin = (transition) => {
        let $rootScope = transition.injector().get('$rootScope');
        let $state = transition.router.stateService;
        if (!$rootScope.isAuthenticated) {
          return $state.target('app.login', undefined, { location: true });
        }
      };

      // Register the "requires auth" hook with the TransitionsService
      $transitionsProvider.onBefore(
        requiresAuthCriteria,
        redirectToLogin,
        {priority: 10}
      );
    }
  })
  .run(onAppStart)
  .name;
