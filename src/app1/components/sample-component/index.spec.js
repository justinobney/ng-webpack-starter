import { controller } from './index.js';

describe('Component: sample-component', () => {
    let $injector;
    let $rootScope;
    let $controller;
    let sample;

    beforeEach(() => {
      angular.mock.module(
        'ng-starter.components.sample-component'
      );

      angular.mock.inject(
        _$injector_ => {
          $injector = _$injector_;
          $rootScope = $injector.get('$rootScope');
          $controller = $injector.get('$controller');
        }
      );
    });

    it('FUBAR', () => {

  });
});
