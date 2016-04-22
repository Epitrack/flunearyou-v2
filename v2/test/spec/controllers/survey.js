'use strict';

describe('Controller: SurveyCtrl', function () {

  // load the controller's module
  beforeEach(module('flunearyouV2App'));

  var SurveyCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SurveyCtrl = $controller('SurveyCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SurveyCtrl.awesomeThings.length).toBe(3);
  });
});
