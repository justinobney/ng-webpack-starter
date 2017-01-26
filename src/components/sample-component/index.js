const template = `
<div>
  Build Environment: {{$ctrl.environment}}
</div>
`;

export function controller(){
  const ctrl = this;

  ctrl.environment = process.env.NODE_ENV;
}


export default angular.module('ng-starter.components.sample-component', [])
  .component('sampleComponent', {
    template,
    controller
  })
  .name
