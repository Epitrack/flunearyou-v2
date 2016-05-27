/*
*	Setting Controller
*/

'use strict';

app.controller('settingCtrl', ['$scope', '$http', '$urlBase', '$uibModal', '$timeout', '$translate', '$rootScope', '$route', 'growl', 'userApi', 'householdApi',  
	function($scope, $http, $urlBase, $uibModal, $timeout, $translate, $rootScope, $route, growl, userApi, householdApi){
	
	/*
	*	Init
	*/ 
	$rootScope.$emit("IS_LOGGED");
	$rootScope.$emit("SCROLL_TOP");
	$scope.showUserUpdate = false;
	$scope.households = [];

	/*
	*	Get user account
	*/ 
	if (localStorage.getItem('userLogged')){
		var user  = JSON.parse(localStorage.getItem('userLogged')),
			token = user.token;
	}else{
		return false;
	}

	$scope.openModalConfirm = function(household){
		var modalInstance = $uibModal.open({
	      animation: $scope.animationsEnabled,
	      templateUrl: 'views/partials/modal-confirm-activation.html',
	      controller: 'ModalActivationCtrl',
	      resolve: {
	        household: function () {
	        	return household;
	        },
	        getHouseholds: function(){
	        	return getHouseholds;
	        }
	      }
	    });
	};

	$scope.openModalEdit = function(household){
		var modalInstance = $uibModal.open({
	      animation: $scope.animationsEnabled,
	      templateUrl: 'views/partials/modal-edit-household.html',
	      controller: 'ModalEditHouseholdCtrl',
	      resolve: {
	        household: function () {
	        	return household;
	        },
	        getHouseholds: function(){
	        	return getHouseholds;
	        }
	      }
	    });
	};

	var showMessage = function(data){
		if ($translate.proposedLanguage() == 'es' && data.message_es){
			growl.addSuccessMessage(data.message_es);
		}else{
			growl.addSuccessMessage(data.message);
		}
	}

	var getUser = function(){
		userApi.getUser(function(data){
			$scope.user = data.info.basic;
			$scope.user.zip = data.info.place.zip;
			
			// Get month and year birthdate
			var index = $scope.user.dob.indexOf('/');
			$scope.user.birthyear  = $scope.user.dob.slice(index+1);
			$scope.user.birthmonth = $scope.user.dob.slice(0,index);
		});
	}
	
	var getHouseholds = function(){
		householdApi.getHuseholds(function(data){
			if (data.household){
				$scope.households = data.household;	
			}
		});
	}

	$scope.sendNewHousehold = function(){
		console.log($scope.newHousehold);
		householdApi.sendNewHousehold($scope.newHousehold, function(data){
			if (data){
				getHouseholds();
				$scope.addMember = false;
				$rootScope.$emit("SCROLL_TOP");
				showMessage(data);
				
			}
		});
	}

	$scope.userEdit = function(){
		userApi.userEdit($scope.user, function(data){
			if (data){
				$scope.showUserUpdate = false;
				$scope.user.dob = $scope.user.birthmonth + '/' + $scope.user.birthyear;
				showMessage(data);
			}
		});
	}

	$scope.sendPassword = function(){
		var objPass = {
			'old_password'     : $scope.old_password,
			'password'         : $scope.password,
			'confirm_password' : $scope.confirm_password
		};
		userApi.sendPassword(objPass, function(data){
			if (data){
				$scope.changePass = false;
				showMessage(data);
			}
		});
	};

	getUser();
	getHouseholds();
}]);