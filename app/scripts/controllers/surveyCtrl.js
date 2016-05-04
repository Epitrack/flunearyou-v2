/*
*
*/

'use strict';

app.controller('surveyCtrl', ['$scope', '$rootScope', '$window', function($scope, $rootScope, $window){
	$rootScope.$emit("IS_LOGGED");


	// Toggle disabledSymptoms
	$scope.disabledSymptoms = false
	$scope.toggleDisabledSymptoms = function(){
		$scope.temperature = false
		$scope.disabledSymptoms = $scope.disabledSymptoms === false ? true: false;
	}

	// Toggle temperature
	$scope.temperature = false
	$scope.toggleTemperature = function(){
		$scope.temperature = $scope.temperature === false ? true: false;
	}

	// Toggle Treveling
	$scope.treveling = false
	$scope.toggleTreveling = function(){
		$scope.treveling = $scope.treveling === false ? true: false;
	}

	$scope.sendSurvey = function(){
		$window.location.href = '#/map';
	}
}]); 