var app = angular.module('FnyApp', ['ngRoute', 'pressController', 'fluNewsController']);

app.config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/press', {
      templateUrl: 'templates/press.html',
      controller: 'PressCtrl'
    })
    .when('/flu-news', {
      templateUrl: 'templates/flu-news.html',
      controller: 'FluNewsCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
}]);
