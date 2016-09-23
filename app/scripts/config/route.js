app.config(['$routeProvider', function ($routeProvider) {
    
    var teste = {
      check : function($window){

        var getParameterByName = function (name, url) {
          if (!url) url = window.location.href;
          name = name.replace(/[\[\]]/g, "\\$&");
          var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
              results = regex.exec(url);
          if (!results) return null;
          if (!results[2]) return '';
          return decodeURIComponent(results[2].replace(/\+/g, " "));
        };
        
        if (window.location.href.indexOf('report?t=') != -1) {
          var token = getParameterByName('t');
          console.log(token);
          localStorage.setItem('userToken', token);
        }else{
          console.log('home');
          if (!localStorage.getItem('userLogged')){
            $window.location.href = '#/'
          };
        };
      }
    };

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'homeCtrl'
      }).
      when('/home', {
        templateUrl: 'views/main.html',
        controller: 'homeCtrl'
      }).
      when('/landing', {
        templateUrl: 'views/landing.html',
        controller: 'landingCtrl'
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
        controller: 'surveyCtrl',
        resolve : teste
      })
      .when('/report', {
        templateUrl: 'views/report.html',
        controller: 'reportCtrl',
        resolve : teste
      })
      .when('/reports', {
        templateUrl: 'views/reports.html',
        controller: 'healthReportCtrl',
        resolve : teste
      })
      .when('/settings', {
        templateUrl: 'views/settings.html',
        controller: 'settingCtrl',
        resolve : teste
      })
      .when('/unsubscribe', {
        templateUrl: 'views/unsubscribe.html',
        controller: 'unsubscribeCtrl',
        resolve : teste
      })
  }]).animation('.reveal-animation', function() {
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