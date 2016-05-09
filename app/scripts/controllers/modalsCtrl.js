/*
*	Modas Controller
*/

'use strict';

app.controller('modalsCtrl', ['$scope', '$rootScope', '$http', '$urlBase', '$window', function($scope, $rootScope, $http, $urlBase, $window){
	
	/*
	*	Init
	*/
	$('#register-choose-month').find('option').eq(0).remove(); 
	$scope.resgisterSocial = true;
	$scope.toggleResgisterSocial = function(){
		$scope.resgisterSocial = $scope.resgisterSocial === false ? true: false;
	}

	/*
	*	Login
	*/ 
	$scope.login = function(email, pass){
		
		// loadingBar
		cfpLoadingBar.start();

		var loginObj = {
			"email"     : email,
			"password"  : pass
		}


		$http.post($urlBase+'/user/login', loginObj).success(function(data, status){
			
			var user          = data.info.basic,
				userToken     = data.info.basic.token,
				userLoggedObj = {
					'name'  : user.nickname,
					'email' : user.email,
					'token' : user.token
				};

			localStorage.setItem('userLogged', JSON.stringify(userLoggedObj));
			$rootScope.$emit("IS_LOGGED");
			$('.close').trigger('click');
			$window.location.href = '#/report?token='+userToken;
			cfpLoadingBar.complete();
		}).error(function(data, status){
			console.log(status)
		});
	};

	
	/*
	*	Register new user	
	*/ 
	$scope.sendNewUser = function(){
		var objNewUser = $scope.newUser
		
		if(objNewUser.gender == undefined){
			$scope.isGenderValid = false;
			$scope.errorMsg = 'Gender is empty';
		}else{
			$http.post($urlBase+'/user', objNewUser).success(function(data, status){
				console.log(data);
				console.log(status);
			}).error(function(data, status){
				console.log(data);
				console.log(status);			
			});
		}
		

		return false;
	};

	
	/*
	*	Validation form
	*/ 
	$scope.isEmailValid  = true;
	$scope.isZipEmpty	 = true;
	$scope.isPassEmpty	 = true; 
	$scope.isYearEmpty	 = true;
	$scope.isGenderValid = true;

	$scope.validaEmail = function(email) {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        $scope.isEmailValid = re.test(email);
        $scope.errorMsg = 'Email invalid'
        return $scope.isEmailValid
    }

    $scope.passEmpty = function(pass){
    	if(pass == '' || pass == undefined || pass == null || pass.length < 3 || pass.length > 12 ){
    		$scope.isPassEmpty	= false;
    		$scope.errorMsg = 'Password must have bettwen 3 and 12 caracters' 
    	}else{
    		$scope.isPassEmpty	= true;
    	}
    }

    $scope.zipEmpty = function(val){
    	
    	var zip = String(val);

    	if(zip == '' || zip == undefined || zip == null || zip.length < 5 || zip.length > 5){
    		$scope.errorMsg = 'Zip code must have 5 characters' 
    		$scope.isZipEmpty	= false;
    	}else{
    		$scope.isZipEmpty	= true;
    	}
    };

    $scope.yearEmpty = function(val){
    	
    	var year = String(val);

    	if(year == '' || year == undefined || year == null || year.length < 4 || year.length > 4){
    		$scope.errorMsg = 'Year must have 4 characters'
    		$scope.isYearEmpty	= false; 
    	}else{
    		$scope.isYearEmpty	= true;
    	}
    };
}]); 