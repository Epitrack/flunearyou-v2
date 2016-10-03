'use strict';

app.service('userApi', [ '$http', '$urlBase', '$rootScope', '$window', '$timeout', 
    function ($http, $urlBase, $rootScope, $window, $timeout) {

    var obj = {};
    var token = JSON.parse(localStorage.getItem('userLogged'));

    if (token) {
        token = JSON.parse(localStorage.getItem('userLogged')).token     
    }else{
         fnyDB.get('userToken').then(function(data){
            token = data.tkn        
        }).catch(function(err){
            console.log(err);
        });
    }

    obj.getUser = function(callback) {
        if(localStorage.getItem('userLogged')){
           $http.get($urlBase+'/user', {headers: {'token': JSON.parse(localStorage.getItem('userLogged')).token}}).success(function(data) {
                callback(data);
            }).error(function(error) {
                console.log('Error getUser: ', error);
            }); 
        }else{
            fnyDB.get('userToken').then(function(data){
                var tkn = data.tkn;
                $http.get($urlBase+'/user', {headers: {'token': tkn}}).success(function(data, status){
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
                        
                        $http.get($urlBase+'/user', {headers: {'token': tkn}}).success(function(data) {
                            callback(data);
                        }).error(function(error) {
                            console.log('Error getUser: ', error);
                        });
                }).error(function(data, status){ console.log(status) });
            }).catch(function (err) {
                console.log(err);
            });

            
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