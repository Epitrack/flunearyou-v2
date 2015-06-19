(function() {
  'use strict';

  //
  // FAQ
  //

  var faqController = angular.module('faqController', []);

  faqController.controller('FaqCtrl', FaqCtrl);

  function FaqCtrl($scope, $http) {
    document.body.setAttribute('data-view', 'faq');

    $http
      .get('assets/faq.json')
      .success(function(data) {
        $scope.faqFeeds = data;
      })
      .error(function(err) {
        console.warn(err);
      });

    $scope.showContent = function(id) {
      console.log($scope);
    }
  }


})();
