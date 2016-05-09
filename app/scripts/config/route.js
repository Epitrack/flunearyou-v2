app.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'homeCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'homeCtrl'
      })
      .when('/map', {
        templateUrl: 'views/map.html',
        controller: 'mapCtrl'
      })
      .when('/flu-news', {
        templateUrl: 'views/flu-news.html',
        controller: 'fluNewsCtrl'
      })
      .when('/press', {
        templateUrl: 'views/press.html',
        controller: 'homeCtrl'
      })
      .when('/faq', {
        templateUrl: 'views/faq.html',
        controller: 'homeCtrl'
      })
      .when('/privacy', {
        templateUrl: 'views/privacy.html',
        controller: 'homeCtrl'
      })
      .when('/terms', {
        templateUrl: 'views/terms.html',
        controller: 'homeCtrl'
      })
      .when('/survey', {
        templateUrl: 'views/survey.html',
        controller: 'surveyCtrl'
      })
      .when('/report', {
        templateUrl: 'views/report.html',
        controller: 'reportCtrl'
      })
      .when('/reports', {
        templateUrl: 'views/reports.html',
        controller: 'homeCtrl'
      })
      .when('/settings', {
        templateUrl: 'views/settings.html',
        controller: 'homeCtrl'
      })
      .when('/unsubscribe', {
        templateUrl: 'views/unsubscribe.html',
        controller: 'homeCtrl'
      })
  });