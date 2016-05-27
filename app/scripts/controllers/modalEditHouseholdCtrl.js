'use strict';

app.controller('ModalEditHouseholdCtrl', function ($scope, $uibModalInstance, householdApi, household, getHouseholds) {
	$scope.household = household;

	var index = $scope.household.dob.indexOf('/');
	$scope.household.birthyear  = $scope.household.dob.slice(index+1);
	$scope.household.birthmonth = $scope.household.dob.slice(0,index);

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
			}
		});
	}
});