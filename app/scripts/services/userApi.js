'use strict';

app.service('userApi', [ '$http', '$urlBase', '$rootScope', '$window', '$timeout', 
    function ($http, $urlBase, $rootScope, $window, $timeout) {

    var obj = {};
    var token = JSON.parse(localStorage.getItem('userLogged'));

    if (token) {
        token = JSON.parse(localStorage.getItem('userLogged')).token;     
    }else{
        token = localStorage.getItem('userToken');
    };

    obj.getUser = function(callback) {
        console.log(token);
        $http.get($urlBase+'/user', {headers: {'token': token}}).success(function(data) {
            callback(data);
        }).error(function(error) {
            console.log('Error getUser: ', error);
        }); 
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
            console.log(data);
            callback(data);
        }).error(function(error) {
            console.log('Error sendPassword: ', error);
        }); 
    }


    return obj;
}]);