function onAppStart(){
  console.log('core: foo');
};

const deps = [];

export default angular.module('ng-starter.core', deps)
  .run(onAppStart)
  .name;
