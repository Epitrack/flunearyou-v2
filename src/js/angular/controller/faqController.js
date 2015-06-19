(function() {
  'use strict';

  //
  // FAQ
  //

  var faqController = angular.module('faqController', []);

  faqController.controller('FaqCtrl', FaqCtrl);

  function FaqCtrl($scope, $http) {
    document.body.setAttribute('data-view', 'faq');

    $http
      .get('http://dev.flunearyou.org/faq.json')
      .success(function(data) {
        $scope.faqFeeds = data.data;
      })
      .error(function(err) {
        console.warn(err);
      });
    }

    // run app.js modules when angular is ready
    angular.element(document).ready(function() {
      APP.Help.filterFaq();
    });

})();
