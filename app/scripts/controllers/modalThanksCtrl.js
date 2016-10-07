'use strict';

app.controller('ModalThanksCtrl', [ '$scope', '$uibModalInstance', 'items', '$http', '$urlBase', '$rootScope', '$window',
	function ($scope, $uibModalInstance, items, $http, $urlBase, $rootScope, $window) {

		/*
		*	Init
		*/ 
		$rootScope.$emit("IS_LOGGED");
		$rootScope.$emit("SCROLL_TOP");
	 
		if (localStorage.getItem('userLogged')){
			var user  = JSON.parse(localStorage.getItem('userLogged')),
				token = user.token;
		}else{
			token = localStorage.getItem('userToken');
		}

		/*
		*	Get infos report card
		*/
		$http.get($urlBase+'/stats.json', {headers: {'token': token}}).success(function(data){
			$scope.reportCard = data;
		}); 

		$http.get($urlBase+'/user/thanks', {headers: {'token': token}}).success(function(data){
			console.log(data);
			$scope.msgThanks = data;
		}); 

		$scope.ok = function () {
			localStorage.removeItem('redirectMap');
			$uibModalInstance.close($scope.selected.item);
		};

		$scope.cancel = function () {
			localStorage.removeItem('redirectMap');
			$uibModalInstance.dismiss('cancel');
		};
}]);