var pressController = angular.module('pressController', []);

pressController.controller('PressCtrl', ['$scope', '$http',
  function ($scope, $http) {
    $http.get('assets/press.json').success(function(data) {
      $scope.pressFeeds = data;
  });
}]);
