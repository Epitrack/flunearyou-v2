'use strict';

app.service('reportApi', [ '$http', '$urlBase', '$rootScope', '$window', '$timeout', 
    function ($http, $urlBase, $rootScope, $window, $timeout) {

    var obj = {};
    var token = JSON.parse(localStorage.getItem('userLogged'));

    if (token) {
        token = JSON.parse(localStorage.getItem('userLogged')).token        
    }else{
        token = '';
    }

    obj.getUser = function(callback) {
        if(token){
           $http.get($urlBase+'/user', {headers: {'token': token}}).success(function(data) {
                callback(data);
            }).error(function(error) {
                console.log('Error getUser: ', error);
            }); 
        }
    };

    obj.everyoneHealthy = function(callback){
        $http.post($urlBase+'/survey/all', {}, {headers: {'token': token}}).success(function(data) {
            callback(true);
        }).error(function(error) {
            console.log('Error getUser: ', error);
        });

    };
    return obj;
}]);
