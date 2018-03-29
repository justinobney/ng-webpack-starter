const template = `
<div>
  Build Environment: {{$ctrl.environment}}
</div>
`;

export function controller($q) {
  const ctrl = this;

  ctrl.environment = process.env.NODE_ENV;

  // example function to show testing
  ctrl.formatName = formatName;
  ctrl.formatNameAsync = formatNameAsync;

  function formatName(userObject) {
    return `${userObject.firstName} ${userObject.lastName}`;
  }

  function formatNameAsync(userObject) {
    return $q.resolve(`${userObject.firstName} ${userObject.lastName}`);
  }
}

export default angular.module('ng-starter.components.sample-component', []).component('sampleComponent', {
  template,
  controller,
}).name;
