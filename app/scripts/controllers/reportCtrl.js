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
	
	// Arrays 
	$scope.page_members = true;
	$scope.members = [];
	$scope.seleted_members = [];
	$scope.current_id = null;
	$scope.symptoms = [];

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
			}
		});
	};

	$scope.goBack = function(){
		$scope.page_members = true;		
	}

	$scope.everyoneHealthy = function(){
		reportApi.everyoneHealthy(function(result){
			if (result){
				console.log('everyone is healthy');
				openModalThanks();
				$location.path( "/map" );
			}
		});
	};

	$scope.selectMembers = function(){
		if ($scope.members.length > 0){
			angular.forEach($scope.members, function(value, key){
				$scope.seleted_members.push(key);
			});
			$scope.openSymtoms();
		}else{
			$scope.error = 'You must select at least one member';
		}
	};

	$scope.openSymtoms = function(){
		if ($scope.members.length <= 0){
			$location.path( "/map" );
		}else{
			$scope.page_members = false;
			$scope.current_id = $scope.seleted_members.shift();
		}
	};

	$scope.sendReport = function(){
		console.log('$scope.current_id', $scope.current_id);
		console.log($scope.symptoms);
		$scope.openSymtoms();
	}


	getUser();
	
}]) 