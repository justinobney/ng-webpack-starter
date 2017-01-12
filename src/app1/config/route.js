export default function routeConfig(
  $stateProvider, $urlRouterProvider, $transitionsProvider
) {

  registerAuthHook();

  $stateProvider
    .state('app', {
      abstract: true,
      url: '/',
      template: `
      <main-layout>
        <nav>Main nav here...</nav>
      </main-layout>
      `
    })
    .state('app.home', {
      url: 'home',
      component: 'home',
    //   data: {requiresAuth:true}
    })
    .state('app.login', {
      url: 'login',
      template: 'login'
    });

  $urlRouterProvider.otherwise("/home");

  function registerAuthHook(){
    let requiresAuthCriteria = {
      to: (state) => state.data && state.data.requiresAuth
    };

    let redirectToLogin = (transition) => {
      // let AuthService = transition.injector().get('AuthService');
      let $state = transition.router.stateService;
      // if (!AuthService.isAuthenticated()) {
        return $state.target('app.login', undefined, { location: true });
      // }
    };

    // Register the "requires auth" hook with the TransitionsService
    $transitionsProvider.onBefore(
      requiresAuthCriteria,
      redirectToLogin,
      {priority: 10}
    );
  }
}
