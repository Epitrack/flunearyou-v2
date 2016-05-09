/*
*
*/

'use strict';

app.controller('modalsCtrl', ['$scope', '$rootScope', '$route', '$http', '$urlBase', '$window',function($scope, $rootScope, $route, $http, $urlBase, $window){
	
	/*
	*	Login
	*/ 
	$scope.login = function(email, pass){
		var loginObj = {
			"email"     : email,
			"password"  : pass
		}


		$http.post($urlBase+'/user/login', loginObj).success(function(data, status){
			
			var user          = data.info.basic,
				userToken     = data.info.basic.token,
				userLoggedObj = {
					'name'  : user.nickname,
					'email' : user.email,
					'token' : user.token
				};

			localStorage.setItem('userLogged', JSON.stringify(userLoggedObj));
			$rootScope.$emit("IS_LOGGED");
			$('.close').trigger('click');
			$window.location.href = '#/report?token='+userToken;
		}).error(function(data, status){
			console.log(status)
		});
	};
}]); 