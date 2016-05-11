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

    obj.sendReport = function(symptoms, user_id, current_user_id, members, realtime, travel_where, callback){
        var url = realtime ? $urlBase+'/survey/now' : $urlBase+'/survey/new';
        var no_symptoms = symptoms.length == 0 ? 1 : 0;
        var data = {
            'platform': 'web',
            'user_id': user_id,
            'current_member': current_user_id,
            'healthy_members': members.join(),
            'no_symptoms': no_symptoms
        }
        if (travel_where){
            data.travel_where = travel_where;
            data.traveling = 'Y';
        }
        angular.forEach(symptoms, function(value, key){
            data[value] = 1;
        });

        $http.post(url, data, {headers: {'token': token}}).success(function(data) {
            callback(true);
        }).error(function(error) {
            console.log('Error getUser: ', error);
        });
    };

    return obj;
}]);
