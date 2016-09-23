'use strict';

app.service('userApi', [ '$http', '$urlBase', '$rootScope', '$window', '$timeout', 
    function ($http, $urlBase, $rootScope, $window, $timeout) {

    var obj = {};
    var token = JSON.parse(localStorage.getItem('userLogged'));

    if (token) {
        token = JSON.parse(localStorage.getItem('userLogged')).token     
    }else{
        token = '';
    }

    obj.getUser = function(callback) {
        console.log('ok');
        console.log(localStorage.getItem('userToken'));
        if(localStorage.getItem('userLogged')){
            console.log('1');
           $http.get($urlBase+'/user', {headers: {'token': JSON.parse(localStorage.getItem('userLogged')).token}}).success(function(data) {
                callback(data);
            }).error(function(error) {
                console.log('Error getUser: ', error);
            }); 
        }else if(localStorage.getItem('userToken')){
            console.log('2');

            $http.get($urlBase+'/user', {headers: {'token': localStorage.getItem('userToken')}}).success(function(data, status){
                var nickname  = data.info.basic.nickname,
                    userToken = data.info.basic.token,
                    userEmail = data.info.basic.email,
                    userLoggedObj = {
                        'name'  : nickname,
                        'email' : userEmail,
                        'token' : userToken
                    };
                    
                    localStorage.setItem('userLogged', JSON.stringify(userLoggedObj));
                    $rootScope.$emit("IS_LOGGED");
                    
                    $http.get($urlBase+'/user', {headers: {'token': localStorage.getItem('userToken')}}).success(function(data) {
                        callback(data);
                    }).error(function(error) {
                        console.log('Error getUser: ', error);
                    });
            }).error(function(data, status){ console.log(status) });
        };
    };

    obj.userEdit = function(user, callback){
        var data = {nickname: user.nickname, email: user.email, gender: user.gender, zip: user.zip, birthmonth: user.birthmonth, birthyear: user.birthyear}
        $http.post($urlBase+'/user/update', data, {headers: {'token': token}}).success(function(data){
            callback(data);
        }).error(function(error) {
            console.log('Error userEdit: ', error);
        }); 
    }

    obj.sendPassword = function(data, callback){
        $http.post($urlBase+'/user/update/password', data, {headers: {'token': token}}).success(function(data){
            callback(data);
        }).error(function(error) {
            console.log('Error sendPassword: ', error);
        }); 
    }


    return obj;
}]);