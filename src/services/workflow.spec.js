describe('Service: workflowService', () => {
    let $injector, $rootScope;
    let workflow;

    beforeEach(() => {
      angular.mock.module(
        'wintake.digitizr.services.workflow',
        'wintake.digitizr.step.generic'
      );

      angular.mock.inject(
        _$injector_ => {
          $injector = _$injector_;
          $rootScope = $injector.get('$rootScope');
          workflow = $injector.get('workflowService');
        }
      );
    });

    it('transition should throw if stage has not been registered', () => {
      const action = () => workflow.transition('key');
      expect(action).toThrow();
    });

    describe('with stage registered', () => {
      const stage = angular.element('<div></div>');
      beforeEach(() => {
        workflow.registerStage(stage);
      });

      // it('transition should throw if key not found', () => {
      //   const action = () => workflow.transition({key: 'key'});
      //   expect(action).toThrow();
      // });

      it('transition should compile and load step', () => {
        // component and resolve found
        // resolve returns promise
        workflow.transition({
          text: 'Line No',
          key: 'lineNo',
          component: 'generic-step'
        });
        $rootScope.$digest();
        expect(stage.text().indexOf('Line No')).not.toBe(-1)
        const component = angular.element(stage.children()[0]);
        const componentCtrl = component.controller('genericStep');
        spyOn(componentCtrl, '$onDestroy');

        // uses default config
        // resolve returns plain object
        workflow.transition({text: 'Spec', key: 'spec'});
        $rootScope.$digest();
        expect(componentCtrl.$onDestroy).toHaveBeenCalled();
        expect(stage.text().indexOf('Spec')).not.toBe(-1)
      });

      it('should call workflow service when button clicked', () => {
        spyOn(workflow, 'handlePropUpdate').and.callThrough();
        workflow.transition({
          text: 'Line No',
          key: 'lineNo',
          component: 'generic-step'
        });
        $rootScope.$digest();
        let button = stage.find('button');
        button.triggerHandler('click');
        expect(workflow.handlePropUpdate).toHaveBeenCalledWith('foo');
      });
    });
});
