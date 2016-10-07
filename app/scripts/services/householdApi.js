'use strict';

app.service('householdApi', [ '$http', '$urlBase', '$rootScope', '$window', '$timeout', 
    function ($http, $urlBase, $rootScope, $window, $timeout) {

    var obj = {};
    var token = JSON.parse(localStorage.getItem('userLogged'));

    if (token) {
        token = JSON.parse(localStorage.getItem('userLogged')).token        
    }else{
        token = localStorage.getItem('userToken');
    }

    obj.getHuseholds = function(callback) {
        if(token){
           $http.get($urlBase+'/user/household', {headers: {'token': token}}).success(function(data) {
                callback(data);
            }).error(function(error) {
                console.log('Error getHuseholds: ', error);
            }); 
        }
    };

    obj.sendActivation = function(household, callback){
		var action = household.active == 'Y' ? 'deactivate' : 'activate';

		$http.post($urlBase+'/user/household/'+action, {user_household_id: household.user_household_id}, {headers: {'token': token}}).success(function(data){
			callback(data);
		}).error(function(error) {
            console.log('Error sendActivate: ', error);
        }); 
	}

    obj.sendHouseholdEdit = function(household, callback){
        var data = {nickname: household.nickname, gender: household.gender, user_household_id: household.user_household_id, birthyear: household.birthyear, birthmonth: household.birthmonth}
        $http.post($urlBase+'/user/household/update', data, {headers: {'token': token}}).success(function(data, status){
            callback(data);
        }).error(function(data, status){
            console.log('Error sendHouseholdEdit: ', error);
        });
    }

    obj.sendNewHousehold = function(household, callback){
        $http.post($urlBase+'/user/household', household, {headers: {'token': token}}).success(function(data, status){
            callback(data);
        }).error(function(data, status){
            console.log('Error sendNewHousehold: ', error);
        });
    }

    return obj;
}]);