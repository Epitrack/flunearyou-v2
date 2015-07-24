'use strict';

describe('Controller: FluNewsCtrl', function () {

  // load the controller's module
  beforeEach(module('flunearyouV2App'));

  var FluNewsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FluNewsCtrl = $controller('FluNewsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(FluNewsCtrl.awesomeThings.length).toBe(3);
  });
});
