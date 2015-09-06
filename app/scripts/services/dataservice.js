'use strict';

/**
 * @ngdoc service
 * @name flunearyouV2App.dataService
 * @description
 * # dataService
 * Service in the flunearyouV2App.
 */
angular.module('flunearyouV2App')
  .service('dataService', [function ($scope, socket) {

    var socket = io.connect();
    var obj = {};
    var feeds = [];

    obj.getFeeds = function(callback) {
      socket.on('stream', function(tweetJSON){
        feeds = tweetJSON;
        callback(tweetJSON)
      });
    };

    return obj;
  }]);
