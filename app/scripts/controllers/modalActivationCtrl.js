'use strict';

app.controller('ModalActivationCtrl', [ '$scope', '$uibModalInstance', '$translate', 'growl', 'householdApi', 'household', 'getHouseholds', '$rootScope', 
	function ($scope, $uibModalInstance, $translate, growl, householdApi, household, getHouseholds, $rootScope) {
	/*
	*	Init
	*/ 
	$rootScope.$emit("IS_LOGGED");
	$rootScope.$emit("SCROLL_TOP");

	$scope.household = household;

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

	$scope.sendActivation = function(){
		householdApi.sendActivation($scope.household, function(result){
			if (result){
				$scope.ok();
				getHouseholds();
				showMessage(result);
			}
		});
	}
}]);