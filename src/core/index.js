function onAppStart(){
  console.log('core: foo');
};

const deps = [];

export default angular.module('ng-starter.core', deps)
  .component('coreLogin', {
    template: 'CORE LOGIN'
  })
  .run(onAppStart)
  .name;
