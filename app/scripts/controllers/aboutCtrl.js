/*
*	About Controller
*/ 

'use strict';

app.controller('aboutCtrl', ['$scope', 'session', function($scope, session){
	session.then( function() {
	/*
	*	Init
	*/ 
	$rootScope.$emit("SCROLL_TOP");
	});
}]);