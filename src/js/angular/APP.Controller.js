// Press
var pressController = angular.module('pressController', []);

pressController.controller('PressCtrl', ['$scope', '$http',
  function ($scope, $http) {
    $http.get('assets/press.json').success(function(data) {
      $scope.pressFeeds = data;
  });
}]);

// Flu News
var fluNewsController = angular.module('fluNewsController', []);

fluNewsController.controller('FluNewsCtrl', ['$scope', '$http',
  function ($scope, $http) {
    $http.get('assets/fluNews.json').success(function(data) {
      $scope.newsFeeds = data;
  });
}]);

// FAQ
var faqController = angular.module('faqController', []);

faqController.controller('FaqCtrl', ['$scope', '$http',
  function ($scope, $http) {
    $http.get('assets/faq.json').success(function(data) {
      $scope.faqFeeds = data;
  });
}]);
