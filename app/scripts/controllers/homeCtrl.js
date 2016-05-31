/*
*	Controller: homeCtrl
*/ 

'use strict';

app.controller('homeCtrl', ['$scope', '$rootScope','$http', '$urlBase','$window', 'session', function($scope, $rootScope, $http, $urlBase, $window, session){
	session.then( function() {
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
	*	Redirect for the map
	*/ 
	$scope.mapZipCode = function(zip){
		sessionStorage.setItem('zip', zip);
		$rootScope.$emit('codeAddress');
		$window.location.href = '#/map';
	};

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
	
	});
}]);
