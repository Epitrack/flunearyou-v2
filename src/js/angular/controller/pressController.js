(function() {
  'use strict';

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

})();
