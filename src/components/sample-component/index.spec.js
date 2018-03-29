import {controller} from './index.js';

describe('Component: sample-component', () => {
  let $injector;
  let $rootScope;
  let $controller;
  let sample;

  beforeEach(() => {
    angular.mock.module('ng-starter.components.sample-component');

    angular.mock.inject(_$injector_ => {
      $injector = _$injector_;
      $rootScope = $injector.get('$rootScope');
      $controller = $injector.get('$controller');

      sample = $controller(controller);
    });
  });

  it('method: formatName', () => {
    expect(sample.formatName({firstName: 'Justin', lastName: 'Obney'})).toEqual('Justin Obney');
  });

  it('method: formatNameAsync', () => {
    sample.formatNameAsync({firstName: 'Justin', lastName: 'Obney'}).then(name => {
      expect(name).toEqual('Justin Obney');
    });

    // in angular, while testing, this forces a promise to resolve allowing our assertion inside the callback to execute
    $rootScope.$digest();
  });
});
