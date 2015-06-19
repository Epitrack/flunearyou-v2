(function() {
  'use strict';

  //
  // About
  //

  var aboutController = angular.module('aboutController', []);

  aboutController.controller('AboutCtrl', AboutCtrl);

  function AboutCtrl($scope) {
    document.body.setAttribute('data-view', 'about');
  }

  //
  // Flu News
  //

  var fluNewsController = angular.module('fluNewsController', []);

  fluNewsController.controller('FluNewsCtrl', FluNewsCtrl);

  function FluNewsCtrl($scope, $http) {
    document.body.setAttribute('data-view', 'flu-news');

    $http
      .get('http://dev.flunearyou.org/flu-news.json')
      .success(function(data) {
        $scope.newsFeeds = data;
      })
      .error(function(err) {
        console.warn(err);
      });
  }

  //
  // Press
  //

  var pressController = angular.module('pressController', []);

  pressController.controller('PressCtrl', PressCtrl);

  function PressCtrl($scope, $http) {
    document.body.setAttribute('data-view', 'press');

    $http
      .get('assets/press.json')
      .success(function(data) {
        $scope.pressFeeds = data;

        // angular.extend($scope, {
        //   day: '03',
        //   month: 'Feb'
        // });
      })
      .error(function(err) {
        console.warn(err);
      });

    // angular.extend($scope, {
    //   // print in html {{ getValue() }}
    //   getValue: function() {
    //     return $scope.day + ' ' + $scope.month;
    //   }
    // });
  }

  //
  // FAQ
  //

  var faqController = angular.module('faqController', []);

  faqController.controller('FaqCtrl', FaqCtrl);

  function FaqCtrl($scope, $http) {
    document.body.setAttribute('data-view', 'faq');

    $http
      .get('assets/faq.json')
      .success(function(data) {
        $scope.faqFeeds = data;
      })
      .error(function(err) {
        console.warn(err);
      });

    $scope.showContent = function(id) {
      console.log($scope);
    }
  }

  //
  // Terms
  //

  var termsController = angular.module('termsController', []);

  termsController.controller('TermsCtrl', TermsCtrl);

  function TermsCtrl($scope) {
    document.body.setAttribute('data-view', 'terms');
  }

  //
  // Privacy
  //

  var privacyController = angular.module('privacyController', []);

  privacyController.controller('PrivacyCtrl', PrivacyCtrl);

  function PrivacyCtrl($scope) {
    document.body.setAttribute('data-view', 'privacy');
  }

  //
  // Home
  //

  var homeController = angular.module('homeController', []);

  homeController.controller('HomeCtrl', HomeCtrl);

  function HomeCtrl($scope) {
    document.body.setAttribute('data-view', 'home');
  }

})();
