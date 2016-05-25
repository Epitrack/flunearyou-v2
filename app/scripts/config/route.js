app.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'homeCtrl'
      }).
      when('/landing', {
        templateUrl: 'views/landing.html',
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
        controller: 'pressCtrl'
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
        controller: 'healthReportCtrl'
      })
      .when('/settings', {
        templateUrl: 'views/settings.html',
        controller: 'settingCtrl'
      })
      .when('/unsubscribe', {
        templateUrl: 'views/unsubscribe.html',
        controller: 'unsubscribeCtrl'
      })
  }).animation('.reveal-animation', function() {
    return {
      enter: function(element, done) {
        element.css('display', 'none');
        element.fadeIn(600);
        return function() {
          element.stop();
        }
      },
      leave: function(element, done) {
        element.fadeOut(100)
        return function() {
          element.stop();
        }
      }
    }
});