export default function routeConfig( $stateProvider, $urlRouterProvider ) {

  $stateProvider
    .state('app', {
      abstract: true,
      url: '/',
      component: 'mainLayout'
    })
    .state('app.home', {
      url: 'home',
      component: 'home',
      data: {requiresAuth:true}
    })
    .state('app.login', {
      url: 'login',
      component: 'coreLogin'
    });

  $urlRouterProvider.otherwise("/home");
}
