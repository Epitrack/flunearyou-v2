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

    obj.sendReport = function(symptoms, no_symptoms, user_id, current_user_id, members, realtime, callback){
        var url = realtime ? $urlBase+'/survey/now' : $urlBase+'/survey/new';
        var data = {
            'platform': 'web',
            'user_id': user_id,
            'current_member': current_user_id,
            'healthy_members': members.join(),
            'no_symptoms': no_symptoms
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


    obj.login = function(loginObj){
        $http.post($urlBase+'/user/login', loginObj).success(function(data, status){
            console.log(loginObj);
            console.log(data);
            var user          = data.info.basic,
                userToken     = data.info.basic.token,
                userLoggedObj = {
                    'name'  : user.nickname,
                    'email' : user.email,
                    'token' : user.token
                };

            console.log(userLoggedObj)

            localStorage.setItem('userLogged', JSON.stringify(userLoggedObj));
            $rootScope.$emit("IS_LOGGED");
            $window.location.href = '#/report?token='+userToken;
        }).error(function(data, status){
            console.log(status)
        });
    }

    // 
    obj.registerNewUser = function(objNewUser){
        $http.post($urlBase+'/user', objNewUser).success(function(data, status){
            
            var loginObj = {
                "email"     : objNewUser.email,
                "password"  : objNewUser.password
            }

            obj.login(loginObj);

        }).error(function(data, status){
            console.log(data);
            console.log(status);            
        });
    }

    return obj;
}]);
