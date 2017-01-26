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
        <nav class="navbar navbar-inverse navbar-fixed-top">
          <div class="container">
            <div class="navbar-header">
              <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
              <a class="navbar-brand" href="#">Sample App</a>
            </div>
          </div>
        </nav>
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
