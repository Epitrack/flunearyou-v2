/*
*	Controller: homeCtrl
*/ 

'use strict';

app.controller('homeCtrl', ['$scope', '$rootScope','$http', '$urlBase','$window', 'session', function($scope, $rootScope, $http, $urlBase, $window, session){
	session.then( function() {
	/*
	*	Init
	*/ 
	if (!localStorage.getItem('userLogged')) {
		$("#modal-join-us").modal()
	}
	localStorage.removeItem('landing')
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

	// Url
	var url = window.location.href;
	if (url.indexOf('landing') != -1) {
		$scope.urlLogo = '#/';
	}else{
		$scope.urlLogo = '#/landing';
	}

	/*
	*	Calls
	*/ 
	$rootScope.$emit("NEWS");
	$rootScope.$emit("IS_LOGGED");
	$rootScope.$emit("SCROLL_TOP");
	
	/*
	*	Redirect for the map
	*/ 
	$scope.mapZipCode = function(zip){
		sessionStorage.setItem('zip', zip);
		$window.location.href = '#/map';
	};

	/*
	*	Get states databox
	*/ 
	$http.get($urlBase+'/states').success(function(data, status, headers, config){
		$scope.stateList = data; // State list

		var illness_count    = data[0].data.ili,
			illness_count_lw = data[0].last_week_data.ili;

		// Change arrow in "Flu-Like Symptoms"  
	    if (illness_count > illness_count_lw) {
	        $scope.arrowUp = true;
	        $scope.fewer_greater = 'Greater';
	    } else {
	        $scope.arrowDown = true;
	        $scope.fewer_greater = 'Fewer';
	    };

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
