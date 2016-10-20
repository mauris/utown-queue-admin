describe('directives', () => {

  beforeEach(module('app'));
  let element = null;
  let outerScope = null;
  let innerScope = null;

  beforeEach(inject(($rootScope, $compile) => {
    element = angular.element('<welcome-box></welcome-box>');

    outerScope = $rootScope;
    $compile(element)(outerScope);

    innerScope = element.isolateScope();

    outerScope.$digest();
  }));

});
