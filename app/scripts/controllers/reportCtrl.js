/*
*
*/

'use strict';

app.controller('reportCtrl', ['$scope', '$rootScope', '$window',function($scope, $rootScope, $window){
	$rootScope.$emit("IS_LOGGED");
	$scope.teste = function(){
		$window.location.href = '#/map'
	}
}]) 