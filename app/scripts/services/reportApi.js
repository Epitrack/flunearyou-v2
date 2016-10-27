'use strict'; 

app.service('reportApi', [ '$http', '$urlBase', '$rootScope', '$window', '$timeout', '$uibModal',
    function ($http, $urlBase, $rootScope, $window, $timeout, $uibModal) {

    var obj = {};
    var token = JSON.parse(localStorage.getItem('userLogged'));

    if (token) {
        token = JSON.parse(localStorage.getItem('userLogged')).token;        
    }else{
        token = localStorage.getItem('userToken');
    }

    obj.getChecks = function(callback){
        $http.get($urlBase+'/checks.json', {headers: {'token': token}}).success(function(data) {
            callback(data);
        }).error(function(error) {
            console.log('Error getChecks: ', error);
        }); 
    }

    obj.getReportsThisWeek = function(callback){
        $http.get($urlBase+'/reports-this-week.json', {headers: {'token': token}}).success(function(data) {
            callback(data);
        }).error(function(error) {
            console.log('Error getReportsThisWeek: ', error);
        }); 
    }

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
            'healthy_members': members.join()
        }

        if (no_symptoms == 1) {data.no_symptoms = no_symptoms}

        if (survey.ill_date){
            data.ill_date = new Date(survey.ill_date).toISOString().substring(0, 10);
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
        console.log(data);
        $http.post(url, data, {headers: {'token': token}}).success(function(data) {
            callback(true);
        }).error(function(error) {
            console.log('Error sendReport: ', error);
        });
    };

    obj.sendVaccine = function(data, callback){
        data.token = token;

        $http.post($urlBase+'/survey/vaccine', data, {headers: {'token': token}}).success(function(data) {
            callback(true);
        }).error(function(error) {
            console.log('Error sendVaccine: ', error);
        });
    };

    obj.sendReminder = function(callback){
        $http.post($urlBase+'/user/reminder/disable', {}, {headers: {'token': token}}).success(function(data) {
            callback(true);
        }).error(function(error) {
            console.log('Error sendReminder: ', error);
        });
    };

    return obj;
}]);
