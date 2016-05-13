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

    obj.sendReport = function(survey, user_id, current_user_id, members, realtime, callback){
        var url = realtime ? $urlBase+'/survey/now' : $urlBase+'/survey/new';
        var no_symptoms = survey.symptoms.length == 0 ? 1 : 0;
        var data = {
            'platform': 'web',
            'user_id': user_id,
            'current_member': current_user_id,
            'healthy_members': members.join(),
            'no_symptoms': no_symptoms
        }

        if (survey.was_traveling){
            data.traveling = 'Y';
            data.travel_where = survey.travel_where;
        }

        angular.forEach(survey.medical, function(value, key){
            data[key] = 'Y';
        });

        angular.forEach(survey.symptoms, function(value, key){
            data[value] = 1;
        });

        console.log('data', data);

        // $http.post(url, data, {headers: {'token': token}}).success(function(data) {
        //     callback(true);
        // }).error(function(error) {
        //     console.log('Error getUser: ', error);
        // });
    };

    return obj;
}]);
