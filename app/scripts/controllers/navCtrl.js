/*
*	Controller: homeCtrl
*/ 

'use strict';

app.controller('navCtrl', ['$scope', '$rootScope', '$translate', '$localStorage', 
	function($scope, $rootScope, $translate, $localStorage){	

	/*
	*	Init
	*/ 
	$scope.isLogged = function(){
		// Hide Join Us button 
		if(localStorage.getItem('userLogged')){
			var userLogged = JSON.parse(localStorage.getItem('userLogged'));
			$scope.userLogged = true;
			$scope.userLoggedEmail = userLogged.email;
			$('.btn-cta').addClass('none');
		}else{
			$scope.userLogged = false;
			$scope.userLoggedEmail = '';
			$('.btn-cta').addClass('none');
		};
	};

	$rootScope.$on("IS_LOGGED", $scope.isLogged);

	// Url
	var url = window.location.href;
	if (url.indexOf('landing') != -1) {
		$scope.urlLogo = '#/landing';
	}else{
		$scope.urlLogo = '#/';
	}

	$scope.logout = function(){
		$scope.custom = false;
		localStorage.removeItem('userLogged');
		localStorage.removeItem('userToken');
		localStorage.removeItem('user_household_id');
		localStorage.removeItem('objHouseholdEdit');
		$rootScope.$emit("IS_LOGGED");
	}

	// Toggle dropdown
	$scope.custom = false
	$scope.toggleCustom = function(){
		$scope.custom = $scope.custom === false ? true: false;
	}

	// Change language 
	$scope.changeLanguage = function(lng){
		localStorage.setItem('lng', lng);
		$translate.use(lng);
	} 
	
	$scope.$watch(function(){
		return localStorage.getItem('lng');
	}, function(){
		$scope.lang = localStorage.getItem('lng');
	});

}]);