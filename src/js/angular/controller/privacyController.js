(function() {
  'use strict';

  //
  // Privacy
  //

  var privacyController = angular.module('privacyController', []);

  privacyController.controller('PrivacyCtrl', PrivacyCtrl);

  function PrivacyCtrl($scope) {
    document.body.setAttribute('data-view', 'privacy');
  }

})();
