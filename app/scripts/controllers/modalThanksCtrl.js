'use strict';

app.controller('ModalThanksCtrl', [ '$scope', '$uibModalInstance', 'items', '$http', '$urlBase', '$rootScope', '$window', '$uibModal',
	function ($scope, $uibModalInstance, items, $http, $urlBase, $rootScope, $window, $uibModal) {
		
		/*
		*	Init
		*/ 
		$rootScope.$emit("IS_LOGGED");
		$rootScope.$emit("SCROLL_TOP");
	 
		if (localStorage.getItem('userLogged')){
			var user  = JSON.parse(localStorage.getItem('userLogged')),
				token = user.token,
				email = user.email;
		}else{
			token = localStorage.getItem('userToken');
		}

		var openModalInviteFriends = function(emails){
			var modalInstance = $uibModal.open({
			    templateUrl: 'views/partials/modal-refer-a-friend.html',
			    controller: 'modalInviteFriends',
			    size: 'lg',
			    resolve: {
			      items: function () {
			      	return $scope.items;
			      	return false;
			      }
			    }
		    });
		};

		/*
		*	Get infos report card
		*/
		$http.get($urlBase+'/stats.json', {headers: {'token': token}}).success(function(data){
			$scope.reportCard = data;
		}); 

		$http.get($urlBase+'/user/thanks', {headers: {'token': token}}).success(function(data){
			console.log(data);
			$scope.msgThanks = data;

			var lng = localStorage.getItem('lng');

			if (lng == 'en') {
				$scope.msgThanksHeader = ''+data.stats.weeks_reported+'th Survey!'
				$scope.msgThanksTxt    = 'Congratulations, you sent your '+data.stats.weeks_reported+'th survey!'
			}else{
				$scope.msgThanksHeader = ''+data.stats.weeks_reported+'º encuesta!'
				$scope.msgThanksTxt    = '¡Felicidades, envió su '+data.stats.weeks_reported+'º informe!'
			}
			
		}); 

		$scope.ok = function () {
			localStorage.removeItem('redirectMap');
			$uibModalInstance.close($scope.selected.item);
		};

		$scope.cancel = function () {
			localStorage.removeItem('redirectMap');
			$uibModalInstance.dismiss('cancel');
			angular.element('.modal-backdrop').remove();
		};

		$scope.callInvite = function(emails){
			openModalInviteFriends();
			$rootScope.emails = emails;
			return false;
		};
}]);