const template = `
<div>
  {{$ctrl.data}}
</div>
`;

export function controller(sample){
  const ctrl = this;

  ctrl.data = 'Sample Component';
  ctrl.onClick = onClick;

  function onClick(){
    sample.method();
  }
}


export default angular.module('ng-starter.components.sample-component', [])
  .component('sampleComponent', {
    template,
    controller
  })
  .name
