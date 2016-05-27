/*
*
*/

'use strict';

app.controller('surveyCtrl', ['$scope', '$rootScope', '$window', 'session', function($scope, $rootScope, $window, session){
	session.then( function() {
	/*
	*	Init
	*/ 
	$rootScope.$emit("IS_LOGGED");
	$rootScope.$emit("SCROLL_TOP");

	$scope.optionsDate = new Date();
	$scope.options = { format: 'dd/mm/yy', selectYears: true };


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

	});
}]); 