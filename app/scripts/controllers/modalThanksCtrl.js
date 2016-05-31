'use strict';

app.controller('ModalThanksCtrl', [ '$scope', '$uibModalInstance', 'items', 
	function ($scope, $uibModalInstance, items) {

		$scope.ok = function () {
			$uibModalInstance.close($scope.selected.item);
		};

		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
}]);