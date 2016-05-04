/*
*	Controller: homeCtrl
*/ 

'use strict';

app.controller('homeCtrl', ['$scope', '$rootScope','$http', '$urlBase', function($scope, $rootScope, $http, $urlBase){
	$scope.isLogged = function(){
		var userLogged = localStorage.getItem('userLogged');
		if(userLogged){
			console.log('logado');
			$('.btn-cta').addClass('none');
		}else{
			console.log('deslogado');
			$('.btn-cta').removeClass('none');
		};
	};

	$rootScope.$on("IS_LOGGED", $scope.isLogged);
	

	/*
	*	Get states databox
	*/ 
	$http.get($urlBase+'/states').success(function(data, status, headers, config){
		$scope.stateList = data; // State list

		// Initial position dataBox
		$scope.infoDataBox = {
			'surveys':           data[0].data.total_surveys,
			'nosymptoms':        data[0].data.no_symptoms,
			'nosymptomspercent': data[0].data.none_percentage,
			'symptoms':          data[0].data.symptoms,
			'symptomspercent':   data[0].data.symptoms_percentage,
			'flulike':           data[0].data.ili,
			'flulikepercent':    data[0].data.ili_percentage
		};
	});


	/*
	*	Get info's data box
	*/
	$scope.updateInfoDataBox = function(){

		var center  = JSON.parse(sessionStorage.getItem('centerMap')),
			zoom    = Number(sessionStorage.getItem('zoomMap')),
			lat     = center.latitude,
			lon     = center.longitude;

		$scope.infoDataBox = JSON.parse(sessionStorage.getItem('objDataSurvey'));
		MAP.initMap(lat, lon, zoom);
		$scope.$apply(); // Update $scope
	};

	$rootScope.$on('updateInfoDataBox', $scope.updateInfoDataBox);
}]);
