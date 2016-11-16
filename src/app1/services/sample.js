function SampleService(){
    this.foo = 'bar';
}

export default angular
  .module('ng-starter.services.sample', [])
  .service('sample', SampleService)
  .name;
