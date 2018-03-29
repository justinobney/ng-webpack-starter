export default function routeConfig($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app', {
      abstract: true,
      url: '/',
      template: `
        <main-layout>
          <main-nav></main-nav>
        </main-layout>
      `,
    })
    .state('app.home', {
      url: 'home',
      component: 'home',
    });

  $urlRouterProvider.otherwise('/home');
}
