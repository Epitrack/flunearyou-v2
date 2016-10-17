'use strict';

app.controller('modalInviteFriends', [ '$scope', '$uibModalInstance', 'items', '$http', '$urlBase', '$rootScope', '$window', '$uibModal',
	function ($scope, $uibModalInstance, items, $http, $urlBase, $rootScope, $window, $uibModal) {
	
		/*
		*	Init
		*/ 
		$rootScope.$emit("IS_LOGGED");
		$rootScope.$emit("SCROLL_TOP");


		// 
		$scope.showMsgError = false;
	 
		if (localStorage.getItem('userLogged')){
			var user  = JSON.parse(localStorage.getItem('userLogged')),
				token = user.token,
				email = user.email;
		}else{
			token = localStorage.getItem('userToken');
		};

		$scope.token = token;
		$scope.email = email;
		$scope.msg   = 'A current Flu Near You user, {{email}}, has invited you to join the cause! I’m helping to track and fight the flu this season - you should too! Check it out: <a href="https://flunearyou.org?campaign=%token%" target="_blank">https://flunearyou.org?campaign=%token%</a> Flu Near You is a community of 60,000 parents, teachers, health officials, and concerned citizens who have come together to help fight the spread of influenza.<br /> Every Monday, a 10-15 second survey is sent out to participants asking them how they felt the week prior and if they had any flu-like symptoms.<br /> Then, in real-time, the anonymous data is plotted on a map for the general public and health officials to better predict--and respond to--outbreaks in our community.<br /> Can you join the cause with me?  It only takes a few seconds to sign up, and your participation could save lives: <a href="https://flunearyou.org?campaign=%token%" target="_blank">https://flunearyou.org?campaign=%token%</a> Thanks in advance. <br />Your Friend';

		$scope.sendInvite = function(){
			var formData = {
					emails: $scope.emails,
					name: $scope.email,
					subject: 'Help track the flu. Save lives.',
					message: 	$scope.msg
				};

			$http.post($urlBase+'/user/raf', formData, {headers: {'token': token}}).success(function(data, status){

				if (status == 200) {
					$scope.showMsgError = true;
					setTimeout(function(){
						$scope.showMsgError = false;
						$uibModalInstance.dismiss('cancel');
					},1000);
				}
				return false;
			});
		}
}]);