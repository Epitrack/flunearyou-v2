'use strict';

app.controller('ModalThanksCtrl', [ '$scope', '$uibModalInstance', 'items', '$http', '$urlBase',
	function ($scope, $uibModalInstance, items, $http, $urlBase) {

		/*
		*	Init
		*/ 
		if (localStorage.getItem('userLogged')){
			var user  = JSON.parse(localStorage.getItem('userLogged')),
				token = user.token;
		}else{
			return false;
		}

		/*
		*	Get infos report card
		*/
		$http.get($urlBase+'/stats.json', {headers: {'token': token}}).success(function(data){
			$scope.reportCard = data;
		}); 

		$scope.ok = function () {
			$uibModalInstance.close($scope.selected.item);
		};

		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};


		
}]);