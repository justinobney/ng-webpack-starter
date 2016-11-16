import 'angular';
import 'angular-oauth2';

function onAppStart(){
  console.log('core: foo');
};

const deps = [
  'angular-oauth2'
];

export default angular.module('ng-starter.core', deps)
  .component('coreLogin', {
    template: 'CORE LOGIN',
    controller(OAuth){
      OAuth.getAccessToken({
        username: 'foo',
        password: 'bar'
      });
    }
  })
  .config((OAuthProvider) => {
    OAuthProvider.configure({
      baseUrl: 'http://auth.example.com',
      clientId: 'CLIENT_ID',
      clientSecret: 'CLIENT_SECRET' // optional
    });
  })
  .run(onAppStart)
  .name;
