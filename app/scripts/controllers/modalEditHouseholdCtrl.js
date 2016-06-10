'use strict';

app.controller('ModalEditHouseholdCtrl', [ '$scope', '$uibModalInstance', '$translate', 'growl', 'householdApi', 'household', 'getHouseholds', '$rootScope', 
	function ($scope, $uibModalInstance, $translate, growl, householdApi, household, getHouseholds, $rootScope) {
	
	/*
	*	Init
	*/ 
	$rootScope.$emit("IS_LOGGED");
	$rootScope.$emit("SCROLL_TOP");


	$scope.household = household;

	var index = $scope.household.dob.indexOf('/');
	$scope.household.birthyear  = $scope.household.dob.slice(index+1);
	$scope.household.birthmonth = $scope.household.dob.slice(0,index);

	var showMessage = function(data){
		if ($translate.proposedLanguage() == 'es' && data.message_es){
			growl.addSuccessMessage(data.message_es);
		}else{
			growl.addSuccessMessage(data.message);
		}
	}

	$scope.ok = function () {
		$uibModalInstance.close();
	};

	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};

	$scope.sendHouseholdEdit = function(){
		householdApi.sendHouseholdEdit($scope.household, function(result){
			if (result){
				$scope.ok();
				getHouseholds();
				showMessage(result);
			}
		});
	}
}]);