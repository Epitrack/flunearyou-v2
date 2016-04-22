'use strict';

describe('Controller: PrivacyCtrl', function () {

  // load the controller's module
  beforeEach(module('flunearyouV2App'));

  var PrivacyCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PrivacyCtrl = $controller('PrivacyCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PrivacyCtrl.awesomeThings.length).toBe(3);
  });
});
