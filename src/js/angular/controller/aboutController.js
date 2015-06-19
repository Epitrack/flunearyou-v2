(function() {
  'use strict';

  //
  // About
  //

  var aboutController = angular.module('aboutController', []);

  aboutController.controller('AboutCtrl', AboutCtrl);

  function AboutCtrl($scope) {
    document.body.setAttribute('data-view', 'about');
  }

})();
