(function() {
  'use strict';

  angular
    .module('FnyApp', ['ngRoute', 'aboutController', 'fluNewsController', 'pressController', 'faqController', 'termsController', 'privacyController', 'homeController'])
    .config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider) {
     $routeProvider
      .when('/about', {
        templateUrl: 'templates/about.html',
        controller: 'AboutCtrl'
      })
      .when('/flu-news', {
        templateUrl: 'templates/flu-news.html',
        controller: 'FluNewsCtrl'
      })
      .when('/press', {
        templateUrl: 'templates/press.html',
        controller: 'PressCtrl'
      })
      .when('/faq', {
        templateUrl: 'templates/faq.html',
        controller: 'FaqCtrl'
      })
      .when('/terms', {
        templateUrl: 'templates/terms.html',
        controller: 'TermsCtrl'
      })
      .when('/privacy', {
        templateUrl: 'templates/privacy.html',
        controller: 'PrivacyCtrl'
      })
      .when('/home', {
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
      })
      .when('/', {
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

      $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      });
  }]);

})();
