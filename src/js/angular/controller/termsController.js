(function() {
  'use strict';

  //
  // Terms
  //

  var termsController = angular.module('termsController', []);

  termsController.controller('TermsCtrl', TermsCtrl);

  function TermsCtrl($scope) {
    document.body.setAttribute('data-view', 'terms');
  }

})();
