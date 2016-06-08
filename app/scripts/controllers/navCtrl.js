/*
*	Controller: homeCtrl
*/ 

'use strict';

app.controller('navCtrl', ['$scope', '$rootScope', '$translate', function($scope, $rootScope, $translate){	

	/*
	*	Init
	*/ 
	$scope.isLogged = function(){
		// Hide Join Us button 
		if(localStorage.getItem('userLogged')){
			var userLogged = JSON.parse(localStorage.getItem('userLogged'));
			$scope.userLogged = true;
			$scope.userLoggedEmail = userLogged.email;
		}else{
			$scope.userLogged = false;
			$scope.userLoggedEmail = '';
		};
	};

	$rootScope.$on("IS_LOGGED", $scope.isLogged);

	$scope.logout = function(){
		$scope.custom = false
		localStorage.removeItem('userLogged');
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
		$translate.use(lng);
	} 








}]);