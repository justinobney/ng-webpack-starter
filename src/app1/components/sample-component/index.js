const template = `
<div>
  {{$ctrl.data}}
</div>
`;

function controller(){
  const ctrl = this;

  ctrl.data = 'Sample Component'
}


export default angular.module('ng-starter.components.sample-component', [])
  .component('sampleComponent', {
    template,
    controller
  })
  .name
