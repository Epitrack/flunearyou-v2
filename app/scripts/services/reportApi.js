'use strict';

app.service('reportApi', function ($http, $urlBase) {

    var obj = {};
    var token = JSON.parse(localStorage.getItem('userLogged')).token;
    

    obj.getUser = function(callback) {
      $http.get($urlBase+'/user', {headers: {'token': token}})
        .success(function(data) {
          callback(data);
        }).error(function(error) {
          console.log('Error getUser: ', error);
        });
    };

    obj.everyoneHealthy = function(callback){
      $http.post($urlBase+'/survey/all', {}, {headers: {'token': token}})
        .success(function(data) {
          callback(true);
        }).error(function(error) {
          console.log('Error getUser: ', error);
        });

    };

    return obj;
  });
