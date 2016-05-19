/*
*	Controller: homeCtrl
*/ 

'use strict';

app.controller('homeCtrl', ['$scope', '$rootScope','$http', '$urlBase', function($scope, $rootScope, $http, $urlBase){

	/*
	*	Init
	*/ 
	$scope.isLogged = function(){
		var userLogged = localStorage.getItem('userLogged');
		if(userLogged){
			$('.btn-cta').addClass('none');
		}else{
			$('.btn-cta').removeClass('none');
		};
	};
	$rootScope.$on("IS_LOGGED", $scope.isLogged);

	// ScrollTop all pages
	$scope.scrolltop = function(){
		document.body.scrollTop = document.documentElement.scrollTop = 0;
	};
	$rootScope.$on('SCROLL_TOP', $scope.scrolltop);

	/*
	*	Calls
	*/ 
	$rootScope.$emit("IS_LOGGED");
	$rootScope.$emit("NEWS");
	$rootScope.$emit("SCROLL_TOP");
	

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

	/*
	*	Flu News
	*/
	$http.get($urlBase+'/flu-news.json?FNY_Site=flunearyou.org').success(function(data, status){
		$scope.news = data;
	});

	$scope.showReadMore = true;

	/*
	*	Tabs about
	*/ 
	$scope.tab1 = true;
	$scope.tab2 = false;
	$scope.changeTab = function(tab){
		if(tab == 'tab1'){
			$scope.tab1 = true;
			$scope.tab2 = false;
		}else{
			$scope.tab1 = false;
			$scope.tab2 = true;
		};
	};
}]);
