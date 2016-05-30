/*
*
*/

'use strict';

app.controller('unsubscribeCtrl', ['$scope','$http','$urlBase', '$window','$timeout','$rootScope', 'session', function($scope, $http, $urlBase, $window, $timeout, $rootScope, session){
	session.then( function() {
		
	/*
	*	Get user account
	*/ 
	var user  = JSON.parse(localStorage.getItem('userLogged')),
		token = user.token;

	$scope.sendUnsubscribe = function(reason, reasonTxt){
		
		var objUnsubscribe = {
			'token' : token,
			'pauseoption' : reason,
			'reason' : reasonTxt
		}
		$http.post($urlBase+'/user/unsubscribe?t='+token, objUnsubscribe).success(function(data, status){
			$scope.unsubscribeSuccess = true;
			$timeout(function(){
				$scope.unsubscribeSuccess = false;
				$window.location.href = '/#';
				localStorage.removeItem('userLogged');
				$rootScope.$emit("IS_LOGGED")
			}, 1000);
		});	
	}
	
	});
}]);