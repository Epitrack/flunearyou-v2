/*
*	Controller: homeCtrl
*/ 

'use strict';

app.controller('navCtrl', ['$scope', '$rootScope', function($scope, $rootScope){	
	// Flu-map Hide/Show
	$scope.changeShowFluMap = function(){
        localStorage.setItem('showFluMap', 'true');
        $rootScope.$emit("SHOWFLUMAP");
    };
}]);