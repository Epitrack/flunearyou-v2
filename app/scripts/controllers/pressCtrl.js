/*
*	About Controller
*/ 

'use strict';

app.controller('pressCtrl', ['$scope','$http','$urlBase', function($scope, $http, $urlBase){

	$http.get($urlBase+'/press.json').success(function(data, status){
		var press2015 = [],
			press2014 = [];
		
		for(var i = 0; i < data.length; i++){
			var press = data[i]
			if(press.publicationDateYear == '2015'){
				press2015.push(press);
			}else{
				press2014.push(press);
			}
		}

		$scope.press2015 = press2015;
		$scope.press2014 = press2014;
		
	}).error(function(data, status){
		console.log(data)
	})
}]);