export default function routeConfig(
  $stateProvider, $urlRouterProvider,
  $transitionsProvider, authProvider
) {

  authProvider.init({
    domain: 'jobney.auth0.com',
    clientID: '674dbOyKxTpDFg2leTmercsYBLAkVbhq',
    loginUrl: '/#!/login'
  });

  registerAuthHook();

  $stateProvider
    .state('app', {
      abstract: true,
      url: '/',
      template: `
        <main-layout>
          <main-nav></main-nav>
        </main-layout>
      `
    })
    .state('app.home', {
      url: 'home',
      component: 'home',
      data: {requiresAuth:true}
    })
    .state('app.login', {
      url: 'login',
      template: 'login',
      controller: loginController
    });

  function registerAuthHook(){
    let requiresAuthCriteria = {
      to: (state) => state.data && state.data.requiresAuth
    };

    let redirectToLogin = (transition) => {
      let auth = transition.injector().get('auth');
      let $state = transition.router.stateService;
      if (!auth.isAuthenticated) {
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

  $urlRouterProvider.otherwise('/home');

  function loginController($state, auth, store, jwtHelper){
    const ctrl = this;

    ctrl.$onInit = () => {
      const token = store.get('token');
      if (token) {
        if (!jwtHelper.isTokenExpired(token)) {
          if (!auth.isAuthenticated) {
            auth.authenticate(store.get('profile'), token).then(
              (profile) => {
                console.log('Logged in via refresh token and got profile');
                console.log(profile);
                $state.go('app.home');
                // Successful login, now redirect to secured content.
              },
              () => {
                console.log('refresh auth failed');
                login();
              }
            );
          }
        } else {
          console.log('jwt expired');
          login();
        }
      } else {
        console.log('no token');
        login();
      }
    };

    function login(){
      auth.signin({
        authParams: {
          scope: 'openid name email' // Specify the scopes you want to retrieve
        }
      }, function(profile, idToken, accessToken, state, refreshToken) {
        console.log(profile, idToken, accessToken, state, refreshToken); // eslint-disable-line
        store.set('profile', profile);
        store.set('token', idToken);
        $state.go('app.home');
      }, function(err) {
        console.log('Error :(', err); // eslint-disable-line
      });
    }
  }
}
