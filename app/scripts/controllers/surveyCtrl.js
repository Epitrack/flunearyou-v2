/*
*
*/

'use strict';

app.controller('surveyCtrl', ['$scope', '$rootScope', function($scope, $rootScope){
	$rootScope.$emit("IS_LOGGED");
}]); 