/*
*	Report Controller
*/

'use strict';

app.controller('reportCtrl', ['$scope', '$rootScope', '$window', '$location', '$uibModal', 'reportApi', function($scope, $rootScope, $window, $location, $uibModal, reportApi){
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
	$scope.members_ids = [];
	$scope.current_id = null;
	$scope.survey = {symptoms: []};
	$scope.travel_where = null;
	$scope.checks = [];
	$scope.checks_perm = [];

	// Week of
	var d = new Date();
	var day = d.getDay(), diff = d.getDate() - 7 - day + (day == 0 ? -6:1);
	$scope.week_of = new Date(d.setDate(diff));
	$scope.week_end = new Date(d.setDate(diff + 6));

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

				$scope.members_ids.push($scope.user.user_id);
				angular.forEach($scope.households, function(value, key){
					$scope.members_ids.push(value.user_household_id);
				});

				console.log('RTR:', $scope.user.current_survey);
			}
		});
	};

	var getChecks = function(){
		reportApi.getChecks(function(result){
			if (result){
				$scope.checks = result.checks;
				$scope.members = result.checks;
				$scope.checks_perm = result.checks_perm;
			}
		});
	};

	var getReportsThisWeek = function(){
		reportApi.getReportsThisWeek(function(result){
			if (result){
				console.log(result);
				$scope.reports_this_week = result;
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
		var index = $scope.members_ids.indexOf($scope.current_id);
        if (index > -1) {
            $scope.members_ids.splice(index, 1);
        }
		reportApi.sendReport($scope.survey, $scope.user.user_id, $scope.current_id, $scope.members_ids, $scope.user.current_survey, function(result){
			console.log(result);
		});
		// $scope.openSymtoms();
	}


	getUser();
	getChecks();
	getReportsThisWeek();
	
}]) 