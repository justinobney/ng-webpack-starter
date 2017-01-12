import layout from './layout/index.js';

function onAppStart(){
  console.log('core: foo');
};

const deps = [
  layout
];

export default angular.module('ng-starter.core', deps)
  .run(onAppStart)
  .name;
