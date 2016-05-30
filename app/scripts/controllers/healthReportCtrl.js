/*
*	Health Report Controller
*/

'use strict';

app.controller('healthReportCtrl', ['$scope', '$rootScope','$http', '$urlBase', 'session', function($scope, $rootScope, $http, $urlBase, session){
	session.then( function() {
	/*
	*	Init
	*/ 
	if (localStorage.getItem('userLogged')){
		var user  = JSON.parse(localStorage.getItem('userLogged')),
			token = user.token;
	}else{
		return false;
	}


	/*
	*	Calls
	*/ 
	$rootScope.$emit("IS_LOGGED");
	$rootScope.$emit("SCROLL_TOP");

	/*
	*	Get infos report card
	*/
	$http.get($urlBase+'/stats.json', {headers: {'token': token}}).success(function(data){
		$scope.reportCard = data;
	}); 

	/*
	*	Get infos health report
	*/
	 $http.get($urlBase+'/reports.json', {headers: {'token': token}}).success(function(data){
	 	console.log(data);
		$scope.healthReports = data;
		$scope.healthReportsSurveys = data.surveys;
	}); 

	});
}]);