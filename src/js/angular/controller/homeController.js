(function() {
  'use strict';

  //
  // Home
  //

  var homeController = angular.module('homeController', []);

  homeController.controller('HomeCtrl', HomeCtrl);

  function HomeCtrl($scope) {
    document.body.setAttribute('data-view', 'home');
  }

})();
