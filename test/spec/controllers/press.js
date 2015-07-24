'use strict';

describe('Controller: PressCtrl', function () {

  // load the controller's module
  beforeEach(module('flunearyouV2App'));

  var PressCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PressCtrl = $controller('PressCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PressCtrl.awesomeThings.length).toBe(3);
  });
});
