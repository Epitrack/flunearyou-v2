(function() {
  'use strict';

  // Press
  var pressController = angular.module('pressController', []);

  pressController.controller('PressCtrl', PressCtrl);

  function PressCtrl($scope, $http) {
    $http
      .get('assets/press.json')
      .success(function(data) {
        $scope.pressFeeds = data;
    });
  }

  // Flu News
  var fluNewsController = angular.module('fluNewsController', []);

  fluNewsController.controller('FluNewsCtrl', FluNewsCtrl);

  function FluNewsCtrl($scope, $http) {
    $http
      .get('assets/fluNews.json')
      .success(function(data) {
        $scope.newsFeeds = data;
    });
  }

  // FAQ
  var faqController = angular.module('faqController', []);

  faqController.controller('FaqCtrl', FaqCtrl);

  function FaqCtrl($scope, $http) {
    $http
      .get('assets/faq.json')
      .success(function(data) {
        $scope.faqFeeds = data;
    });
  }

})();
