'use strict';

describe('Controller: UnsubscribeCtrl', function () {

  // load the controller's module
  beforeEach(module('flunearyouV2App'));

  var UnsubscribeCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UnsubscribeCtrl = $controller('UnsubscribeCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(UnsubscribeCtrl.awesomeThings.length).toBe(3);
  });
});
