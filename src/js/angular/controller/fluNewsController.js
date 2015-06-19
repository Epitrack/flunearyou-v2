(function() {
  'use strict';

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

})();
