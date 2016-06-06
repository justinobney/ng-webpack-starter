describe('Service: workflowService', () => {
    let $injector, $rootScope;
    let sample;

    beforeEach(() => {
      angular.mock.module(
        'ng-starter.services.sample'
      );

      angular.mock.inject(
        _$injector_ => {
          $injector = _$injector_;
          $rootScope = $injector.get('$rootScope');
          sample = $injector.get('sample');
        }
      );
    });

    it('FUBAR', () => {
      expect(sample.foo).toEqual('bar');
  });
});
