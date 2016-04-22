'use strict';

describe('Controller: FaqCtrl', function () {

  // load the controller's module
  beforeEach(module('flunearyouV2App'));

  var FaqCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FaqCtrl = $controller('FaqCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(FaqCtrl.awesomeThings.length).toBe(3);
  });
});
