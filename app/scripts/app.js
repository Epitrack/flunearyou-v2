'use strict';

/**
 * @ngdoc overview
 * @name flunearyouV2App
 * @description
 * # flunearyouV2App
 *
 * Main module of the application.
 */
angular
  .module('flunearyouV2App', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/flu-news', {
        templateUrl: 'views/flu-news.html',
        controller: 'FluNewsCtrl',
        controllerAs: 'fluNews'
      })
      .when('/press', {
        templateUrl: 'views/press.html',
        controller: 'PressCtrl',
        controllerAs: 'press'
      })
      .when('/faq', {
        templateUrl: 'views/faq.html',
        controller: 'FaqCtrl',
        controllerAs: 'faq'
      })
      .when('/privacy', {
        templateUrl: 'views/privacy.html',
        controller: 'PrivacyCtrl',
        controllerAs: 'privacy'
      })
      .when('/terms', {
        templateUrl: 'views/terms.html',
        controller: 'TermsCtrl',
        controllerAs: 'terms'
      })
      .when('/survey', {
        templateUrl: 'views/survey.html',
        controller: 'SurveyCtrl',
        controllerAs: 'survey'
      })
      .when('/reports', {
        templateUrl: 'views/reports.html',
        controller: 'ReportsCtrl',
        controllerAs: 'reports'
      })
      .when('/settings', {
        templateUrl: 'views/settings.html',
        controller: 'SettingsCtrl',
        controllerAs: 'settings'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
