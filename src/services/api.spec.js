describe('Service: apiService', () => {
  let $injector;
  let $rootScope;
  let api;

  beforeEach(() => {
    angular.mock.module('ng-starter.services.api');

    angular.mock.inject(_$injector_ => {
      $injector = _$injector_;
      $rootScope = $injector.get('$rootScope');
      api = $injector.get('api');
    });
  });

  it('is defiend', () => {
    expect(api.get).toBeDefined();
  });
});
