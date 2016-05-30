'use strict';

/**
 * @ngdoc service
 * @name flunearyouV2App.cdcstates
 * @description
 * # cdcstates
 * Service in the flunearyouV2App.
 */
app.service('cdcstates', ['$http', 
    function ($http) {

    var obj = {};
    var states = [];

    obj.getStates = function(callback) {
      $http.get('../assets/states.geo.json')
        .success(function(data) {
          states = data;
          callback(data);
        }).error(function(error) {
          console.log('Error getStates: ', error);
        })
    };

    obj.getMarkers = function(callback) {
      $http.get('https://flunearyou.org/home.json')
        .success(function(data) {
          states = data;
          callback(data);
        }).error(function(error) {
          console.log('Error getMarkers: ', error);
        })
    };

    return obj;
  }]);
