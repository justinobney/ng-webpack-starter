function AuthService($q, lock, authManager){
  const userProfile = JSON.parse(localStorage.getItem('profile')) || null;
  const deferredProfile = $q.defer();

  if (userProfile) {
    deferredProfile.resolve(userProfile);
  }

  this.registerAuthenticationListener = registerAuthenticationListener;
  this.login = login;
  this.getProfileDeferred = getProfileDeferred;

  function login() {
    lock.show();
  }

  function getProfileDeferred() {
    if (!userProfile) {
      const idToken = localStorage.getItem('id_token')
      lock.getProfile(idToken, (error, profile) => {
        if (error) {
          return console.log(error);
        }

        localStorage.setItem('profile', JSON.stringify(profile));
        deferredProfile.resolve(profile);
      });
    }

    return deferredProfile.promise;
  }

  function registerAuthenticationListener() {
    lock.on('authenticated', (authResult) => {
      localStorage.setItem('id_token', authResult.idToken);
      authManager.authenticate();
      getProfileDeferred();
    });
  }
}

export default angular
  .module('ng-starter.services.auth', [])
  .service('auth', AuthService)
  .name;
