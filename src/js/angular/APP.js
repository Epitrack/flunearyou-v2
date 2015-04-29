var app = angular.module('FnyApp', ['ngRoute', 'pressController']);

app.config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/press', {
      templateUrl: 'templates/press.html',
      controller: 'PressCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
}]);
