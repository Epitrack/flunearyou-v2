/*
*	Modals Controller
*/

'use strict';

app.controller('modalsCtrl', ['$scope', '$rootScope', '$http', '$urlBase', '$window', '$fny', 'Facebook',
	function($scope, $rootScope, $http, $urlBase, $window, $fny, Facebook){
	
	/*
	*	Init
	*/

	$scope.resgisterSocial = true;
	$scope.toggleResgisterSocial = function(){
		Facebook.login(function(response) {
			if (response.status == 'connected') {
				$scope.resgisterSocial = $scope.resgisterSocial === false ? true: false;
			}
		});
		
	}

	/*
	*	Login
	*/ 
	$scope.login = function(email, pass, event){
		var loginObj = {
			"email"     : email,
			"password"  : pass
		}
		
		$fny.login(loginObj);
	};

	/*
	*	Login by Facebook
	*/ 
	$scope.loginFacebook = function(){
		Facebook.login(function(response) {
			if (response.status == 'connected') {
				var token = response.authResponse.accessToken;
                $http.post($urlBase+'/user/login/facebook', {"access_token": token}).success(function(data, status, result){
                	if (status == 200){
                		var nickname  = data.info.basic.nickname,
			                userToken = data.info.basic.token,
			                userEmail = data.info.basic.email,
			                userLoggedObj = {
			                    'name'  : nickname,
			                    'email' : userEmail,
			                    'token' : userToken
			                };

                		localStorage.setItem('userLogged', JSON.stringify(userLoggedObj));
                		$rootScope.$emit("IS_LOGGED");
                		$('.modal').modal('hide');
                	}
                }).error(function(data, status, result){
                	
                });
            }
		});
	} 

	
	/*
	*	Register new user	
	*/ 
	$scope.sendNewUser = function(){
		var objNewUser = $scope.newUser
		
		if(objNewUser.gender == undefined){
			$scope.isGenderValid = false;
			$scope.errorMsg = 'Gender is empty';
		}else{
			$fny.registerNewUser(objNewUser)
		}
		return false;
	};

	/*
	*	Register by FB
	*/ 
	$scope.registerFacebook = function(zip){
		var zipCode = zip;
		Facebook.api('/me', function(response) {
			console.log(response);
			var genderFB = response.gender,
                email    = response.email;

            if (genderFB == 'male'){
            	var gender = 'M'
            }else{
            	var gender = 'F'
            }

            var objNewUserFB = {
            	'birthmonth' : '',
				'birthyear'  : '',
				'email'      : email,   
				'gender'     : gender,
				'password'   : '',
				'zip'        : zipCode
            }

            if (zipCode) {
            	$http.post($urlBase+'/user', objNewUserFB).success(function(data, status){
	            	console.log(data);
	            	$('.modal').modal('hide');
	            }).error(function(data, status){ console.log(data); console.log(status); });
            }

            console.log(objNewUserFB);
		});
	} 

	
	/*
	*
	*	Validation form
	*
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