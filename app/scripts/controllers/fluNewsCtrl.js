/*
*	About Controller
*/ 

'use strict';

app.controller('fluNewsCtrl', ['$scope','$http', '$urlBase', '$window', '$rootScope', function($scope, $http, $urlBase, $window, $rootScope){
	/*
	*	Init
	*/
	$rootScope.$emit("IS_LOGGED"); 
	$rootScope.$emit("SCROLL_TOP");

	$scope.news = function(){
		console.log(123);
		$http.get($urlBase+'/flu-news.json?FNY_Site=flunearyou.org').success(function(data, status){
			$scope.news = data;
		});

		$scope.showReadMore = true;
		if ($window.location.href.indexOf('flu-news') != -1){
			$scope.showReadMore = false;
		}
	}

	$rootScope.$on("NEWS", $scope.news);
	$rootScope.$emit("NEWS");
}]);