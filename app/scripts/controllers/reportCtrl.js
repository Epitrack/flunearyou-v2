/*
*	Report Controller
*/

'use strict';

app.controller('reportCtrl', ['$scope', '$rootScope', '$window', '$location', '$uibModal', 'reportApi',function($scope, $rootScope, $window, $location, $uibModal, reportApi){
	/*
	*	Init
	*/ 
	$('#modal-join-us, #modal-login').modal('hide');
	$rootScope.$emit("IS_LOGGED");
	$rootScope.$emit("SCROLL_TOP");

	$scope.optionsDate = new Date();
	$scope.options = { format: 'dd/mm/yy', selectYears: true };

	// Arrays 
	$scope.page_members = true;
	$scope.members = [];
	$scope.seleted_members = [];
	$scope.current_id = null;
	$scope.survey = {symptoms: []};
	$scope.travel_where = null;

	var openModalThanks = function(){
		var modalInstance = $uibModal.open({
	      animation: $scope.animationsEnabled,
	      templateUrl: 'views/partials/modal-thanks.html',
	      controller: 'ModalThanksCtrl',
	      size: 'lg',
	      resolve: {
	        items: function () {
	        	return $scope.items;
	        }
	      }
	    });
	};

	var getUser = function(){
		reportApi.getUser(function(result){
			if (result.info){
				$scope.user = result.info.basic;
				$scope.households = result.info.household;
				console.log($scope.user.current_survey);
			}
		});
	};

	var successReport = function(){
		openModalThanks();
		$location.path( "/map" );
	};

	$scope.goBack = function(){
		$scope.page_members = true;		
	}

	$scope.everyoneHealthy = function(){
		reportApi.everyoneHealthy(function(result){
			if (result){
				console.log('everyone is healthy');
				successReport();
			}
		});
	};

	$scope.selectMembers = function(){
		if ($scope.members.length > 0){
			$scope.openSymtoms();
		}else{
			$scope.error = 'You must select at least one member';
		}
	};

	$scope.openSymtoms = function(){
		if ($scope.members.length <= 0){
			successReport();
		}else{
			$scope.page_members = false;
			$scope.current_id = $scope.members.shift();
			angular.forEach($scope.households, function(value, key){
				if (value.user_household_id == $scope.current_id){
					$scope.user_name = value.nickname;
				}
			});
		}
	};

	$scope.sendReport = function(){
		// console.log('$scope.current_id', $scope.current_id);
		reportApi.sendReport($scope.survey, $scope.user.user_id, $scope.current_id, $scope.members, $scope.user.current_survey, function(result){
			console.log(result);
		});
		// $scope.openSymtoms();
	}


	getUser();
	
}]) 