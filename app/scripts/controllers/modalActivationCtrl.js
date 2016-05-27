'use strict';

app.controller('ModalActivationCtrl', function ($scope, $uibModalInstance, householdApi, household, getHouseholds) {
	$scope.household = household;

	$scope.ok = function () {
		$uibModalInstance.close();
	};

	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};

	$scope.sendActivation = function(){
		householdApi.sendActivation($scope.household, function(result){
			if (result){
				$scope.ok();
				getHouseholds();
			}
		});
	}
});